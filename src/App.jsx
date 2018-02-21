import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		const webSocket = this.socket;

		this.state = {
  						currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  						messages: []
		};
	}

		// webSocket.onopen = function (event) {
			inputContent = (message) => {
				var msg = {
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
			// console.log("display", displayMessage);
			// console.log(this.state.messages);
				const messages = [...this.state.messages, displayMessage]
				console.log("mes", messages);
				this.setState({messages})
				console.log("this", this.state);

			}	
		
	}



	



  render() {
  	console.log("Rendering <App/>");
    return (
    	<div>
    		<nav className="navbar">
  				<a href="/" className="navbar-brand">Chatty</a>
			</nav>
    			<MessageList messages={this.state.messages} />
    			<ChatBar currentUser={this.state.currentUser} messages={this.state.messages} onSubmit={this.inputContent}/>
    	</div>
    );
  }
}
export default App;
