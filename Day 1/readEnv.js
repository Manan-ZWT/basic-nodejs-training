const process = require("process");
const dotenv =require("dotenv").config({path:"../.env"});
const appName= process.env.APP_NAME;
const appEnv= process.env.APP_ENV;
const appPort= process.env.APP_PORT;
const debug= process.env.DEBUG;
console.log(`
Application Name: ${appName}
Application Environment: ${appEnv}
Application Port: ${appPort}
Debug Supported: ${debug}`);