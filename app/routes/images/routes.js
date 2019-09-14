const express = require('express')
const router = express.Router()
const fs = require('fs')
// const fs = require('../images/')


router.get('/', (req, res) => {
  fs.access(`app/images/${req.query.path}`, fs.F_OK, (hasNoFile) => {
    if (!hasNoFile) { // if file exsist
      fs.createReadStream(`app/images/${req.query.path}`).pipe(res) // -- reponse to client
    } else {
      res.status(404).send('file not found')
    }
  })
})


module.exports = router