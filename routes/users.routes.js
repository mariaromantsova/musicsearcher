const {Router} = require('express')
const router = Router()
const User = require('../models/User')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(err => res.status(400).send('error: ', err))
})

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.send('User deleted.'))
    .catch(err => res.status(400).send('Error: ' + err));
});

router.route('/:id/update').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.status = req.body.status;
      user.save()
        .then(() => res.send('User status updated!'))
        .catch(err => res.status(400).send('Error: ' + err));
    })
    .catch(err => res.status(400).send('Error: ' + err));
});


//playlists
router.route('/:id/playlists').get((req, res) => {
  User.findById(req.params.id)
      .then(user => res.send(user.playlists))
      .catch(err => res.status(400).send('error: ', err))
})

router.route('/:id/playlists/:playlistName').get((req, res) => {
  User.findById(req.params.id)
      .then(user => res.send(user.playlists[req.params.playlistName]))
      .catch(err => res.status(400).send('error: ', err))
})

router.route('/:id/playlists/create').post((req, res) => {
  const { playlistName, album } = req.body;

  if (album) {
    User.findByIdAndUpdate(req.params.id,
    {
        [`playlists.${playlistName}`]: [album]
    },
      {lean: true, new: true},
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.send(user.playlists);
        }
      }
    );
  }
});

router.route('/:id/playlists/:name/update').post((req, res) => {
  const { playlistName, currentAlbum } = req.body;

  if (currentAlbum) {
    User.findByIdAndUpdate(req.params.id,
    {
      $addToSet: {
        [`playlists.${playlistName}`]: currentAlbum
      }
    },
      {lean: true, new: true},
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.send(user.playlists);
        }
      }
    );
  }
});

router.route('/:id/playlists/:name/deleteAlbum').post((req, res) => {
  const [playlistName, albumName] = req.body;

  User.findByIdAndUpdate(req.params.id, {
    "$pull": {
      [`playlists.${playlistName}`]: {
        name: albumName
      }
    }
  },
  { lean: true, new: true },
      (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user.playlists);
      }
    }
  );
})

router.route('/:id/playlists/:name/delete').post((req, res) => {
  const playlistName = req.params.name;

  User.findByIdAndUpdate(req.params.id, {
    "$unset": {
      [`playlists.${playlistName}`]: ''
    }
  },
  { lean: true, new: true },
      (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user.playlists);
      }
    }
  );
})

module.exports = router
