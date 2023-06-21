const validateHeader = (req,res,next) => {
 const acceptHeader = req.headers.accept;
  if(acceptHeader !== 'application/json'){
    res.status(406).json({ message : 'Invalid Accept header.Only application/json is allowed.'});
  }
  next();
}

module.exports = validateHeader;
