const bcrypt = require('bcryptjs');
const User = require('../database/models/User');

const loginController = {
    login: async(req, res) => {
        const data = req.body;
        console.log(data);
        try {
            const user = await User.findOne({
                username: data.username
            });

            if (!user) {
              return res.status(404).json({
                meta: {
                  status: 404,
                  message: "Invalid credentials. Email or password is incorrect",
                },
              });
            }
            else{
                const confirmPassword = await bcrypt.compare(data.password, user.password);
                if(confirmPassword){
                    res.status(200).json({
                        meta: {
                            status: 200,
                            message: "User logged in successfully",
                        },
                        data: {
                          user: {
                            id: user._id
                          }
                        }
                        });
                }
                else{
                    res.status(401).json({
                        meta: {
                            status: 401,
                            message: "Invalid credentials. Email or password is incorrect",
                        }
                        });
                }
            }
          } catch (error) {
            res.status(500).json({
              meta: {
                status: 500,
                message: "Internal Server Error",
              },
              data: {
                error: error.message,
              },
            });
          }
    }
}

module.exports = loginController;