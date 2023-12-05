const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const userController = {
    getUserById: async (request, response) => {
        try {
            const { userId } = request.params;
            const user = await User.findById(userId);

            if (!user) {
            response.status( 404 ).send({ message: "User Does Not Exist" });
            }
            response.status( 200 ).send({ user });
            
        } catch (error) {
            console.log(error.message)
        }
    },

    getAllScholarSummary: async (request, response) => {
        try {
            const summary = await User.find();

            if (!user) {
                response.status( 404 ).send({ message: "Empty" });
            }
            response.status( 200 ).send({ summary });
            
        } catch (error) {
            console.log(error.message)
        }
    },
    
    changeUserInfo: async (request, response) => {
        try {
            const { userId } = request.params;
            const updates = request.body;
            const options = { new: true };

            const user = await User.findByIdAndUpdate( userId, updates, options );

            if (!user) {
                response.status( 404 ).send({ error: "User Does Not Exist" });
            }
            response.status( 200 ).send({ message: 'Update Success' });
            
        } catch (error) {
            console.log(error.message);
        }
    },

    changePassword: async (request, response) => {
        try {
            const { userId } = request.params;
            const password = request.body.password;


            const hashedPassword = await bcrypt.hash( password, 10 );
                
            const user = await User.findByIdAndUpdate( userId, { password: hashedPassword } );

            if (!user) {
                response.status( 500 ).send({ message: 'Server Error' });
            }
            response.status( 200 ).send({ message: 'Password Updated' });
            
        } catch (error) {
            console.log(error.message);
        }
    },

    deleteAUser: async (request, response) => {
        try {
            const { userId } = request.params;
            const user = await User.findByIdAndDelete( userId, { isDeleted:true } );

            if (!user) {
                response.status( 404 ).send({ message: "User not found" });
            }
            response.status( 200 ).send( { message: 'User deleted' } );
            
        } catch (error) {
            console.log(error.message)
        }
    },
}

module.exports = userController;