'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { links, linksFooter } from '../utils/links'

const variants = {
    open: {
        width: 360,
        height: 600,
        top: '-10px',
        right: '-10px',
        transition: { duration: .6, ease: [0.76, 0, 0.24, 1]}
    },
    closed: {
        width: 100,
        height: 40,
        top: '0px',
        right: '0px',
        transition: { duration: .6, delay: 0.15, ease: [0.76, 0, 0.24, 1]}
    }
}

const perspective = {
    initial: {
        opacity: 0,
        translateY: 40
    },
    enter: (i: number) => ({
        opacity: 1,
        translateY: 0,
        transition: { 
            duration: 0.65,
            delay: 0.5 + (i * 0.1 ),
            ease: [.215, .61, .355, 1]
        }
    }),
    exit: {
        opacity: 0
    }
}

const slideIn = {
    initial: {
        opacity: 0,
        y: 20
    },
    enter: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: .5,
            delay: 0.75 + (i * 0.1),
            ease: [.215, .61, .355, 1]
        }
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
}

const slideUp = {
    initial: {
        opacity: 0,
        y: 20
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .5,
            delay: 0.75,
            ease: [.215, .61, .355, 1]
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
}

export function Menu() {
    const [isActive, setIsActive] = useState(false)

    return(
        <div className="fixed top-[35px] right-5 z-50 block lg:hidden">
            <motion.div
                variants={ variants }
                animate={ isActive ? 'open' : 'closed' }
                initial="closed"
                className="w-[360px] h-[600px] border border-[#454545] bg-[#313131] rounded-3xl relative"
            >
                <AnimatePresence>
                    { isActive && 
                        <div className="h-full pt-[60px] px-[30px] pb-[30px] box-border flex flex-col justify-between">
                            <div className="flex flex-col gap-4 items-start text-left">
                                {
                                    links.map((link: any, i) => (
                                        <motion.div 
                                            key={ i }
                                            custom={ i }
                                            variants={ perspective }
                                            animate="enter"
                                            exit="exit"
                                            initial="initial"
                                        >
                                            <a 
                                                href={ link.href } 
                                                target={ link?.target ? `${ link.target }` : '' }
                                                className="text-white no-underline text-2xl"
                                            >
                                                { link.title }
                                            </a>
                                        
                                            {
                                                link?.children && link?.children.map((children: any, i: number) => (
                                                    <motion.div 
                                                        key={ i }
                                                        custom={ i }
                                                        variants={ perspective }
                                                        animate="enter"
                                                        exit="exit"
                                                        initial="initial"
                                                        className="pt-[5px] pl-[10px]"
                                                    >
                                                        <a 
                                                            href={ children.href } 
                                                            target={ children?.target ? `${ children.target }` : '' }
                                                            className="text-white no-underline text-sm relative after:h-[1px] after:w-full after:absolute after:left-0 after:-bottom-[2px] after:bg-white/10"
                                                        >
                                                            { children.title }
                                                        </a>
                                                    </motion.div>
                                                ))
                                            }
                                        </motion.div>
                                    ))
                                }
                            </div>

                            <div>
                                <div className="flex gap-6">
                                    <div className="flex flex-col">  
                                        <div className="flex flex-col items-start justify-center gap-[5px]">
                                            {
                                                linksFooter.map((link, i) => (
                                                    <motion.div 
                                                        key={ `${ i }_f` }
                                                        custom={ i }
                                                        variants={ slideIn }
                                                        animate="enter"
                                                        exit="exit"
                                                        initial="initial"
                                                        className="w-full text-left"
                                                    >
                                                        <a 
                                                            href={ link.href } 
                                                            target={ link?.target ? `${ link.target }` : '' }
                                                            className="text-white no-underline text-sm w-full text-left" 
                                                            dangerouslySetInnerHTML={{ __html: link.title }} 
                                                        />
                                                    </motion.div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </AnimatePresence>
            </motion.div>

            <div onClick={() => {setIsActive(!isActive)}} className="h-[40px] w-[112px] border border-white rounded-3xl cursor-pointer absolute top-0 right-0 overflow-hidden">
                <motion.div 
                    animate={{ top: isActive ? '-100%' : '0' }} 
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1]}}
                    className="relative h-full w-full"
                >
                    <div className="h-full w-full bg-[#313131] items-center justify-center uppercase">
                        <p className="m-0 text-white text-[16px] h-full flex justify-center items-center">
                            <svg width="26px" height="16px" viewBox="0 0 26 16" version="1.1" xmlns="https://www.w3.org/2000/svg">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="home" transform="translate(-408.000000, -56.000000)" fill="#111111">
                                        <rect id="Rectangle1" x="408" y="56" width="26" height="2"></rect>
                                        <rect id="Rectangle2" x="408" y="63" width="26" height="2"></rect>
                                        <rect id="Rectangle3" x="408" y="70" width="26" height="2"></rect>
                                    </g>
                                </g>
                            </svg>
                        </p>
                    </div>

                    <div className="h-full w-full bg-[#313131] text-white flex items-center justify-center uppercase absolute top-full">
                        <p className="m-0 text-white text-[16px]">
                            <svg viewBox="0 0 24 24" width="24px" height="24px"><path fill="white" d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function PerspectiveText({ label }: { label: string }) {
    return(
        <div className="">
            <p className="m-0 text-white">{ label }</p>
            <p className="m-0 text-white">{ label }</p>
        </div>
    )
}