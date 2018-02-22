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
	
	userClear = e => {
		this.setState({ username: e.target.value = "" });
	};
	

	render() {
		console.log("Rendering <ChatBar/>");
	return (
		<div>
			<footer className="chatbar">
				<input
					className="chatbar-username"
					onChange={this.userChanged}
				 	placeholder="Your Name (Optional)"
				 	defaultValue={this.props.currentUser.name}
				 	onClick={this.userClear}
				 	onKeyPress={e => {
				 		if (e.key === "Enter") {
				 			this.submitUser();
				 		}
				 	}}
				 	 />
				<input 
					className="chatbar-message"
					onChange={this.messageChanged}
					placeholder="Type a message and hit ENTER"
					onKeyPress={e => {
						if (e.key === "Enter") {
							this.submitMessage();
							e.target.value = ""
						}				
					}}
					/>
			</footer>
		</div>
	);
	}
	 
  	submitUser = () => {
  		this.props.onSubmit (
  			{
  			type: "postNotification",
  			content: `Anonymous has changed name to ${this.state.username}`
  			}
  		);
  	}

	submitMessage = () => {
		this.props.onSubmit (
	  		{
	  		type: "postMessage",
	  		content: this.state.message,
	  		username: this.state.username
	  		}
	  	);  		
  	}
};
	

export default ChatBar;