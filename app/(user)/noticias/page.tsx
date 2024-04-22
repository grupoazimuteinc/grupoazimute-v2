'use client'

import { groq } from 'next-sanity'
import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity.client'
import { Posts } from '@/components/posts'

const perPage = 20; 

export const revalidate = 60

function getMaxPagesToShow() {
    return window.innerWidth <= 600 ? 5 : 10;
}

export default function Noticias() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [maxPagesToShow, setMaxPagesToShow] = useState(getMaxPagesToShow());

    useEffect(() => {
        const fetchPosts = async () => {
            const query = groq`
              *[_type=='post'] {
                ...,
                categories[]->
              } | order(publishedAt desc)[${
                (currentPage - 1) * perPage
              }..${
                currentPage * perPage - 1
              }]
            `;
            const result = await client.fetch(query);
            setPosts(result);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const fetchTotalPages = async () => {
            const countQuery = groq`count(*[_type == 'post'])`;
            const totalCount = await client.fetch(countQuery);
            const totalPagesCount = Math.ceil(totalCount / perPage);
            setTotalPages(totalPagesCount);
        };

        fetchPosts();
        fetchTotalPages();

        const handleResize = () => {
            setMaxPagesToShow(getMaxPagesToShow());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentPage]);

    const goToPage = (pageNumber:any) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => {
                        goToPage(i);
                        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll para o topo da página
                    }}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        if (currentPage > maxPagesToShow && totalPages > maxPagesToShow) {
            buttons.unshift(
                <button key={1} onClick={() => goToPage(1)}>
                    1
                </button>
            );
            buttons.unshift(
                <button key="prevEllipsis" disabled>
                    ...
                </button>
            );
        }

        if (currentPage < totalPages - Math.floor(maxPagesToShow / 2) && totalPages > maxPagesToShow) {
            buttons.push(
                <button key="nextEllipsis" disabled>
                    ...
                </button>
            );
            buttons.push(
                <button key={totalPages} onClick={() => goToPage(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <>
            <main>
                <div className="content o-grupo pt-[175px] smartphone:pt-[120px]">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 text-left">
                                <h2 className="text-3xl text-[#6A696A] font-bold p-0 mb-[15px] smartphone:text-xl">Fique por dentro</h2>
                                <p className="smartphone:mb-0">Saiba as últimas informações relacionadas aos segmentos do grupo.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container pb-24 smartphone:pb-[20px] monitor:pb-10">
                    <div className="row">
                        <Posts posts={posts} />
                    </div>
                </div>

                <div className="pagination">
                    <button onClick={() => { goToPage(currentPage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === 1}>Anterior</button>
                    {renderPaginationButtons()}
                    <button onClick={() => { goToPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === totalPages}>Próxima</button>
                </div>
            </main>
        </>
    );
}





