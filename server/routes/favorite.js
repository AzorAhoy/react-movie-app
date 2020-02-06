const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/favoriteNumber", auth, (req, res) => {
    //Find Favorite info inside Favorite collection by MovieID
    Favorite.find({ "movieID": req.body.movieID })
    .exec((err, favorite) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({success: true, FavoriteNumber: favorite.length})
    });
});

router.post("/favorited", auth, (req, res) => {
    //Find Favorite info inside favorite collection by MovieID, userFrom
    Favorite.find({ "movieID": req.body.movieID, "userFrom": req.body.userFrom })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err);
            //Check is movie is already a Favorite
            let result = false;
            if (favorite.length !== 0) {
                result = true;
            }
            res.status(200).json({ success: true, favorited: result })
        });
});

router.post("/addToFavorite", auth, (req, res) => {
    //Save info about the movie or 
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/removeFromFavorite", auth, (req, res) => {
    Favorite.findOneAndDelete({movieID: req.body.movieID, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true ,doc})
    })
});

router.post("/getFavoritedMovies", auth, (req, res) => {
    Favorite.find({ userFrom: req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, favorites })
        })
});


module.exports = router;
