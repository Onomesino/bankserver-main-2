const jwt = require('jsonwebtoken')

const isAuth = (req, res,next) =>{

    try {
    // extract token from authorization header
    const authorizationHeader = req.get('Authorization');
    if(!authorizationHeader)
    throw new Error('unauthenticated');
    const token = authorizationHeader.split(' ')[1];
    //verify token with jwt}
const decodedToken = jwt.verify(token, 'supersecretthatcannotbeeasilyguessed');
if(!decodedToken)
throw new Error('unauthorized');
req.userId = decodedToken.userId

next();
    
    } catch (error) {
            console.log(error);
            res.json({message: error.message});
    
    }
}

module.exports = isAuth;