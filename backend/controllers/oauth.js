const express = require('express');
const router = express.Router();

router.get('/checkJWT', async (request, response, next) => {
    if(request.errorInAuth) {
        next({ name: "ValidationError" });
        return;
    }

    response.send();
    return;
});

module.exports = router;