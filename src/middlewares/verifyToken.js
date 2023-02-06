const jwtVerifier = require('./jwt')

module.exports = {
  verifyToken(req, res, next) {
  try {
    if (req.headers?.authorization) {
      let token = req.headers?.authorization || "";
      console.log("token", token);
      jwtVerifier
        .verify(token)
        .then((decodedToken) => {
          console.log("jwt verified");
          console.log(token,"token")
          req.user = decodedToken.result;
          next();
        })
        .catch((err) => {
          console.log("jwt not verified");
          console.log(err);
          res.status(401).json({
            error: true,
            code: "TOKEN_EXPIRED",
            message: "TOKEN_INVALID_OR_MISSING",
          });
        });
    } else {
      console.log("jwt not verified");

      res.status(401).json({
        error: true,
        code: "TOKEN_EXPIRED",
        message:"TOKEN_INVALID_OR_MISSING",
      });
    }
  } catch (err) {
    console.log(err, "<<-- Error>>");
    res.status(500).json({
      error: true,
      err: err,
      code: "INTERNAL_SERVER_ERROR",
      message:"INTERNAL_SERVER_ERROR",
    });
  }
}
}
