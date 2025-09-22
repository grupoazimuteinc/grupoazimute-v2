'use client'

import { groq } from 'next-sanity';
import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity.client';
import { Posts } from '@/components/posts';
import { BlogFilters } from '@/components/blog-filters';
import { getPageMetadata } from '@/lib/metadata';

export const revalidate = 60;
export const metadata = getPageMetadata('blog');

function getPerPage() {
    if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 640) {
            return 5;
        } else if (screenWidth <= 1024) {
            return 10;
        } else {
            return 20;
        }
    }
    return 20; // Default para SSR
}

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const perPage = getPerPage(); // Definindo perPage com base na largura da tela

    useEffect(() => {
        const fetchPosts = async () => {
            if (!client) {
                console.error('Sanity client not available');
                return;
            }
            
            // Construir query baseada no filtro selecionado
            let filterQuery = '*[_type=="post"]';
            if (selectedCategory !== 'all') {
                filterQuery = `*[_type=="post" && "${selectedCategory}" in categories[]->title]`;
            }
            
            const query = groq`
              ${filterQuery} {
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
            if (!client) {
                console.error('Sanity client not available');
                return;
            }
            
            // Construir query de contagem baseada no filtro selecionado
            let countQuery = 'count(*[_type == "post"])';
            if (selectedCategory !== 'all') {
                countQuery = `count(*[_type == "post" && "${selectedCategory}" in categories[]->title])`;
            }
            
            const totalCount = await client.fetch(groq`${countQuery}`);
            const totalPagesCount = Math.ceil(totalCount / perPage);
            setTotalPages(totalPagesCount);
        };

        fetchPosts();
        fetchTotalPages();

        const handleResize = () => {
            // Atualiza perPage com base na nova largura da tela
            const newPerPage = getPerPage();
            if (perPage !== newPerPage) {
                setCurrentPage(1); // Redefine a página atual para 1 ao alterar perPage
                // Atualiza perPage e refetch posts
                fetchPosts();
                fetchTotalPages();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentPage, perPage, selectedCategory]);

    const goToPage = (pageNumber:any) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset para a primeira página ao mudar categoria
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxPagesToShow = typeof window !== 'undefined' && window.innerWidth <= 600 ? 5 : 10;
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
                                <h2 className="text-3xl text-[#6A696A] font-bold p-0 mb-[15px] smartphone:text-xl">Blog</h2>
                                <p className="smartphone:mb-0">Saiba as últimas informações relacionadas aos segmentos do grupo.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container pb-24 smartphone:pb-[20px] monitor:pb-10">
                    <div className="row">
                        {/* Filtros */}
                        <div className="col-12 mb-8">
                            <BlogFilters 
                                selectedCategory={selectedCategory}
                                onCategoryChange={handleCategoryChange}
                            />
                        </div>
                        
                        {/* Posts */}
                        <div className="col-12">
                            {posts.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 text-lg mb-4">
                                        {selectedCategory === 'all' 
                                            ? 'Nenhuma publicação encontrada.' 
                                            : `Nenhuma publicação encontrada para ${selectedCategory}.`
                                        }
                                    </div>
                                    <button
                                        onClick={() => handleCategoryChange('all')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                                    >
                                        Ver Todas as Publicações
                                    </button>
                                </div>
                            ) : (
                                <Posts posts={posts} />
                            )}
                        </div>
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
