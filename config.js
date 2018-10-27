//File for config information about the site
module.exports =  {
    "name": "Hackathon 2018 API Server",
    "apiVersion": "1.0.0",
    "owner":"The Best Hackathon Team Ever!!! And mason because he is here in spirit",
    "dbUrl": process.env.MONGODB_URI || "<YOUR MONGODB URL>",
    "path": __dirname
};
