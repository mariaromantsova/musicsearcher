const {Router} = require('express')
const router = Router()
const User = require('../models/User')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('error: ', err))
})

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.status = req.body.status;
      user.save()
        .then(() => res.json('User status updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/albums').get((req, res) => {
  User.findById(req.params.id)
      .then(user => res.json(user.albums))
      .catch(err => res.status(400).json('error: ', err))
})

router.route('/:id/albums/update').post((req, res) => {
  const album = req.body;
  User.findById(req.params.id)
    .then(user => {

      user.albums.some(x => x.name === album.name) ?
      user.albums = [...user.albums, {...album, isAdded: false}].filter(x => x.name !== album.name) : user.albums = [...user.albums, {...album, isAdded: true}]

      user.save()
        .then(() => res.json(user.albums))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router
