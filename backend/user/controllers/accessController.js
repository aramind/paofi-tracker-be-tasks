const Access = require('../models/AccessModel');

const accessController = {
    getUserAccess: async (request, response) => {
        try {
            const { userId } = request.params;
            const access = await Access.findById(userId);

            if (!user) {
            response.status( 404 ).send({ message: "User Does Not Exist" });
            }
            response.status( 200 ).send({ access });
            
        } catch (error) {
            console.log(error.message)
        }
    },
}

module.exports = accessController;