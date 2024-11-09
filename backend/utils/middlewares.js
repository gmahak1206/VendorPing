const authenticateUser = async (request, response, next) => {
    try {
        const { auth } = request.cookies;


        if(!auth) {
            throw new Error('Not authenticated');
        }

        request.userId = auth;
    } catch (error) {
        console.log(error)
        request.errorInAuth = true;
    }

    next();
};

const unknownEndpoint = async (request, response) => {
    response.status(404).send();
  };
  
const errorHandler = async (error, request, response, next) => {
    response.status(500)

    if (error.name === 'CastError') {
        response.status(400);
    } 

    if (error.name === 'ValidationError') {
        response.status(401);
    } 

    response.send();
    next();
};

module.exports = {
    authenticateUser,
    unknownEndpoint,
    errorHandler
}