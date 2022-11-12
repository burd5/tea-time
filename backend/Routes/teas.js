let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
// Student Model

// READ Students
router.route('/collection').get((req, res) => {
  TeaSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(res.json(data))
    }
  })
})

module.exports = router;