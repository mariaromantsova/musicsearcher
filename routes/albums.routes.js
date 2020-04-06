const {Router} = require('express')
const router = Router()
const Album = require('../models/Album')


router.route('/:email/add').post((req, res) => {
  Album.create({album: req.body.album, likedBy: [req.params.email]})
    .then(album => res.send(album))
    .catch(err => res.status(400).send('error: ', err))
})


module.exports = router
