import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		const webSocket = this.socket;

		this.state = {
  						currentUser: {name: "Anonymous"},
  						messages: []
		};
	}

		// webSocket.onopen = function (event) {
			inputContent = (message) => {
				var msg = {
						type: message.type,
						username: message.username,
						content: message.content
				};

				this.socket.send(JSON.stringify(msg));
		
			}

	componentDidMount() {
  		console.log("componentDidMount <App />");
  		this.socket = new WebSocket("ws:localhost:3001")
  		console.log("Connected to server");
  		


	this.socket.onmessage = (event) => {
		let displayMessage = JSON.parse(event.data);

				const users = displayMessage.online
				const messages = [...this.state.messages, displayMessage]
				console.log("message", messages);
				console.log("on the app side", users);
				this.setState({messages})
				console.log("this state", this.state);
				this.setState({clientCount: users})
				console.log("clientCount", this.state.clientCount)

			}		
	}



	
  render() {
  	console.log("Rendering <App/>");
    return (
    	<div>
    		<nav className="navbar">
  				<a href="/" className="navbar-brand">Chatty</a>
  				<p className="navbar-users">{this.state.clientCount} users online</p>
			</nav>
    			<MessageList messages={this.state.messages} />
    			<ChatBar currentUser={this.state.currentUser} messages={this.state.messages} onSubmit={this.inputContent}/>
    	</div>
    );
  }
}
export default App;
