
# 1. Simulate region status

Start a node server that serves on port 9999( or your choice), which randomly return either 200 or 500 response codes to simulate real status of each region.

```sh
    npm install express
    node node.js
```


# 2. regionUrl and port change

Node server can be replaced with real status of region or another URL by changing below URL from `regionUrl` value in `trafficSimulation.js`

`let regionUrl = 'http://localhost:9999/random-status';`

if you want to change port to different one, update `node.js` file below line to different value and update `regionUrl` accordingly.

`const port = 9999;`



# 3. Run the home.html on any browser 

 Every 30 seconds each region query `regionUrl` and each region gets random response from node server.

 Each region based on the random reponse it got either `200` or ` 500`, color of region and arrow is updated `GREEN` or `RED`.

