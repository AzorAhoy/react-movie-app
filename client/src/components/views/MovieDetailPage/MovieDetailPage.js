import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Button, Row } from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from './Sections/Favorite';

function MovieDetailPage(props) {
    let movieID = props.match.params.movieID;
    const [Movie, setMovie] = useState([]);
    const [Crews, setCrews] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {


        fetch(`${API_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMovie(res);
                fetch(`${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        setCrews(res.crew);
                        setCasts(res.cast)
                    })
            })
            .catch(err => console.log(err));
    }, [])

    const handleClick = () => {
        setActorToggle(!actorToggle)
    }

    return (
        <div>
            {/* Movie main image */}
            {Movie &&
                <MainImage
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Favorite
                        userFrom={localStorage.getItem('userId')}
                        movieID={movieID}
                        movieInfo={Movie}
                    />
                </div>

                <Descriptions title="Movie Info">
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release_Date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="vote_average">{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleClick}>Toggle ActorView</Button>
                </div>

                {/* Cast & Crews */}
                {actorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                {cast.profile_path &&
                                    <GridCard
                                        actor
                                        image={`${IMAGE_URL}w500${cast.profile_path}`}
                                    />
                                }

                            </React.Fragment>
                        ))

                        }
                    </Row>
                }

            </div>

        </div>
    );
}

export default MovieDetailPage;