import React, { useEffect, useState, Fragment } from 'react'
import { FaCode } from "react-icons/fa";
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import { Typography, Row } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';
const { Title } = Typography;

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovie(endpoint);
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res);
        //     setMovies(res.results);
        //     console.log(Movies);
        // })
    }, [])


    const handleClick = () => {
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        fetchMovie(endpoint);
    }

    const fetchMovie = (path) => {
        fetch(path)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMovies([...Movies,...res.results]);
                setCurrentPage(res.page)
                console.log(Movies);
            })
    }

    return (
        <div style={{ width: '100%', margin: 0 }}>
            {/* Movie main image */}
            {Movies[0] &&
                <MainImage
                    image={`${IMAGE_URL}w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`}
                    title={Movies[0].original_title}
                    text={Movies[0].overview}
                />
            }


            {/*Body*/}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2}>Movies by latest</Title>
                <hr />
                {/*Grid card*/}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieID={movie.id}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {/*Load more*/}
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={handleClick}
                    >LOAD MORE</button>
                </div>

            </div>
        </div>
    )
}

export default LandingPage
