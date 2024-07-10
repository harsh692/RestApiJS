const express = require('express');
// importing the express package

const app = express ();
app.use(express.json());
// Setting up of express to create an app and configuring it to parse requests with json payloads.

const PORT = process.env.PORT || 3000;
// defining server code

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
//Setup server to listen to the specified port.

app.get("/status",(request,response)=>{
    const status = {
        "Status":"Running"
    };

    response.send(status);
});