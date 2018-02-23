const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const querystring = require('querystring');
const fetch = require('node-fetch');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
	ws.on('message', function incoming(message) {

		
		wss.clients.forEach(function each(client) {
			if (client.readyState === ws.OPEN) {
				let newMessage = JSON.parse(message);
				newMessage.id = uuidv4();
				newMessage.online = server._connections;
				 
				let matchData = newMessage.content.match(/.*(jpg|png|gif)$/)

				if (matchData) {
					let qs = querystring.stringify(
						{
							api_key: 'FjDfWBX9MSmBbViEZ5Yh1NhK2AyckYRD',
							tag: matchData[1]
						}
					)

					let url = `https://api.giphy.com/v1/gifs/random?${qs}`
					
					fetch(url)
						.then( resp => {
							if (resp.ok) {
								return resp.json()
							}
							throw new Error("Invalid format")
						})
						.then( json => {
							let imageURL = json.data.image_url
							console.log(`IMAGE URL: ${imageURL}`)
							newMessage.content = `<img style="width:40%;height:50%;" src="${imageURL}" />`
							var to_send = JSON.stringify(newMessage);
							client.send(to_send);
							console.log(`Sent: ${to_send}`);
						})
					
				} else {
					var to_send = JSON.stringify(newMessage);
					client.send(to_send);
					console.log(`Sent: ${to_send}`);
				}					
			}
		});
		
	});
  	
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// var message = Json.parse(message_data);

// message.id = uuid.v4();

