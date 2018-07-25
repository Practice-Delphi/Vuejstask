const express = require('express')
const router = express.Router()
const path = require('path')

/* GET index html */
router.get('/', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`))
})

module.exports = router
