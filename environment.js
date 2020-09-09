const config = require("./config.js");
const configuration = require('./configuration');


var getEnv = () => {

    if (configuration.RUNENV === "dev") {
        return config.DevURL;
    } else if (configuration.RUNENV === "stg") {
        return config.StgURL;
    } else if (configuration.RUNENV === "prod") {
        return config.ProdURL;
    }
};

module.exports = getEnv;