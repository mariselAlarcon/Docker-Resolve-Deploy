const axios = require('axios');

exports.shareOnFacebook = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/facebook');
    }

    const accessToken = req.user.accessToken;
    const message = 'Check out this awesome gym!';
    const link = 'https://www.google.com';

    try {
       /* await axios.post(`https://graph.facebook.com/me/feed`, {
            message: message,
            link: link,
            access_token: accessToken
        });
        */
       console.log(req.user);

        res.send('Content shared successfully on Facebook!');
    } catch (error) {
        console.error('Error sharing on Facebook:', error);
        res.status(500).send('Error sharing on Facebook');
        console.log(error.message);
    }
};