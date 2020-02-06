import React, { useEffect, useState } from 'react';
import { Descriptions, Button, Row } from 'antd';
import axios from 'axios';
function Favorite(props) {
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const variable = {
        userFrom: props.userFrom,
        movieID: props.movieID,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRuntime: props.movieInfo.runtime
    };

    useEffect(() => {



        axios.post('/api/favorite/favoriteNumber', variable)
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    setFavoriteNumber(res.data.FavoriteNumber);
                } else {
                    alert('Failed to get FavoriteNumber');
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    setFavorited(res.data.favorited);
                } else {
                    alert('Failed to get Favorite info');
                }
            })

    }, [])

    const onClickFavorite = () => {
        if (Favorited) {
            //alredy added to Favorite
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);

                    } else {
                        alert("Failed to remove to Favorite!");
                    }
                })
        } else {
            //not added to Favorite
            axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);

                    } else {
                        alert("Failed to add to Favorite!");
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>
                {Favorited ? "Removed from favorite"
                    : "Add to favorite"} {FavoriteNumber}
            </Button>

        </div>
    )
}

export default Favorite;