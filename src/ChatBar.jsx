import React, {Component} from 'react';

class ChatBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: this.props.currentUser.name,
			message: ""
		}	
	}

	messageChanged = e => {
   		this.setState({ message: e.target.value });
	};

	userChanged = e => {
		this.setState({ username: e.target.value });
	};
	

  render() {
  	console.log("Rendering <ChatBar/>");
    return (
    	<div>
			<footer className="chatbar">
  				<input
  					className="chatbar-username"
  					value={this.state.newUser}
  					onChange={this.userChanged}
  				 	placeholder="Your Name (Optional)"
  				 	defaultValue={this.props.currentUser.name} />
  				<input 
  					className="chatbar-message"
  					value={this.state.newMessage}
  					onChange={this.messageChanged}
  					placeholder="Type a message and hit ENTER"
  					onKeyPress={e => {
  						if (e.key === "Enter") {
  							this.submitMessage();
  						}
  						
  					}}
  				/>
			</footer>
		</div>
    );
  }

  submitMessage = () => {
  	this.props.onSubmit( {
  		content: this.state.message,
  		username: this.state.username
  	});
  }
	




}
export default ChatBar;