const shortId = require('shortid');//to generate the shortid
const URL = require('../models/url');//to inser the shortid in the database



async function GenerateShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ message: 'URL is required' });
    }
    // const ShortId = shortId.generate();

    // URL.create({
    //     shortId: ShortId,
    //     redirectURL: body.url,
    //     visitHistory: []
    // })

    // Check if the URL already exists
    let urlEntry = await URL.findOne({ redirectURL: body.url });
    let ShortId;
    if (!urlEntry) {
        // Generate a new short ID if it doesn't exist
        const Shortid = shortId.generate();
        urlEntry = await URL.create({
            ShortId: Shortid,
            redirectURL: body.url,
            visitHistory: []
        });
    }

    const allurls = await URL.find({})
    return res.render("index", {

        id: ShortId,
        originalUrl: body.url,
        urls: allurls,
    });



}




async function GetAnalytics(req, res) {
    const shortId = req.params.shortId;
    try {
        const url = await URL.findOne({ shortId });
        if (url) {
            return res.json({ visitCount: url.visitHistory.length, analytics: url.visitHistory });
        } else {
            return res.status(404).send('URL not found');
        }
    } catch (error) {
        console.error('Error finding URL:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = { GenerateShortURL, GetAnalytics }