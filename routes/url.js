
const express = require('express');
const router = express.Router();
const { GenerateShortURL, GetAnalytics } = require('../controllers/url')
const URL = require('../models/url');


router.post('/', GenerateShortURL); //when the user hits the /shorten endpoint, the GenerateShortURL function will be called

router.get('/:shortUrl', async (req, res) => { //redirects the user to the original URL when the short URL is provided
    const shortId = req.params.shortUrl;
    try {
        const url = await URL.findOneAndUpdate(
            { shortId },//findig critrtia not updating the shortid
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return the updated document
        );

        if (url) {
            res.redirect(url.redirectURL);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        console.error('Error finding and updating URL:', error);
        res.status(500).send('Internal Server Error');
    }
    // Find the URL in the database
});



router.get("/analytics/:shortId", GetAnalytics); //when the user hits the /:shortId endpoint, the GetAnalytics function will be called
module.exports = router;    //exporting the router to use it in the index.js file

router.get("/", async (req, res) => {
    const allurls = await URL.find({})
    return res.render("index", {
        urls: allurls,
    })
})

module.exports = router;


