'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import '../app/menu-mobile.css'
import { links, linksFooter } from '../utils/links'
import { AnimatePresence, motion } from 'framer-motion'

import logo from '@/src/images/logo.png'

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

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="box-menu-mobile">
        <button onClick={toggleMenu}>
            <svg width="26px" height="16px" viewBox="0 0 26 16" version="1.1">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="home" transform="translate(-408.000000, -56.000000)" fill="#111111">
                        <rect id="Rectangle1" x="408" y="56" width="26" height="2"></rect>
                        <rect id="Rectangle2" x="408" y="63" width="26" height="2"></rect>
                        <rect id="Rectangle3" x="408" y="70" width="26" height="2"></rect>
                    </g>
                </g>
            </svg>
        </button>

        {isOpen && (
            <div className="menu-mobile">
                <div className="mobile-header">
                    <a href="/">
                        <Image src={logo} width={170} height={44} alt=""/>
                    </a>

                    <button onClick={toggleMenu}>
                        <svg 
                            className="close-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
                            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="mobile-body">
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
                                    className="text-white no-underline block text-2xl w-full text-left"
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
                                            className="pt-[5px] w-full text-left"
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
           </div>
        )}
    </div>
  );
};

export default MobileMenu;
