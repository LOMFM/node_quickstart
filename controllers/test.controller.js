const successCtrl = (req, res) => {
  res.send({
    status: true
  })
}

const errorCtrl = (req, res) => {
  res.status(400).send({
    status: false,
    error: 'Error is occured'
  })
}

module.exports = {
  successCtrl,
  errorCtrl
}