const { app, httpsServer, port } = require("./config/server.js")
const { initializeDB } = require("./config/database.js");
const fs = require("fs");

const routes = fs.readdirSync("./routes");

routes.forEach((route) => {
    if (route.endsWith(".js")) {
        try {
            const { router } = require(`./routes/${route}`);
            app.use("/", router);
            console.log(`Route "${route}" loaded`);
        } catch (error) {
            console.log(`Error loading route "${route}": ${error}`);
        }
    }
});

initializeDB();

httpsServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

