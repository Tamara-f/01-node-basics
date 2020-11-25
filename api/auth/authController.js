const registrationController = async (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
};

module.exports = { registrationController };
