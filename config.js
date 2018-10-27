//File for config information about the site
module.exports =  {
    "name": "Hackathon 2018 API Server",
    "apiVersion": "1.0.0",
    "owner":"The Best Hackathon Team Ever!!! And mason because he is here in spirit",
    "dbUrl": process.env.MONGODB_URI || "mongodb://Test:password1@ds143683.mlab.com:43683/photocenter",
    "path": __dirname
};
