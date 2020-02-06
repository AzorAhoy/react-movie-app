import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../Config';
import { Popover } from 'antd';
import './favorite.css';
import axios from 'axios';

function FavoritePage() {
    const variable = {
        userFrom: localStorage.getItem('userId')
    }

    const [Favorites, setFavorites] = useState([]);

    const fetchFavorites = () => {
        axios.post('/api/favorite/getFavoritedMovies', variable)
            .then(res => {
                if (res.data.success) {
                    setFavorites(res.data.favorites);
                } else {
                    alert("Failed to get favorite list")
                }
            })
    }

    useEffect(() => {
        fetchFavorites();
    }, [])

    const onClickRemove = (id) => {
        const variable = {
            movieID: id,
            userFrom: localStorage.getItem('userId')
        }

        axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if (response.data.success) {
                    // setFavoriteNumber(FavoriteNumber - 1);
                    // setFavorited(!Favorited);
                    fetchFavorites();
                } else {
                    alert("Failed to remove to Favorite!");
                }
            })
    }

    const renderTable = Favorites.map((movie, index) => {
        const content = (
            <div>
                {movie.movieImage ?
                    <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="Movie Poster" />
                    : "no Image"
                }
            </div>
        )

        return <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRuntime} mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieID)}>Remove from Favorite</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite movies by me</h3>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie runtime</th>
                        <th>Remove from Favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage;