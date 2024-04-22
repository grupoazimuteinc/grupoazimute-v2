'use client'

import { groq } from 'next-sanity'
import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity.client'
import { Posts } from '@/components/posts'

const perPage = 20; 

export const revalidate = 60

export default function Noticias() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
        };

        const fetchTotalPages = async () => {
            const countQuery = groq`count(*[_type == 'post'])`;
            const totalCount = await client.fetch(countQuery);
            const totalPagesCount = Math.ceil(totalCount / perPage);
            setTotalPages(totalPagesCount);
        };

        fetchPosts();
        fetchTotalPages();
    }, [currentPage]);

    const goToPage = (pageNumber:any) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
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
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    {renderPaginationButtons()}
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Próxima</button>
                </div>
            </main>
        </>
    );
}
