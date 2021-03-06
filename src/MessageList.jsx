import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
  	console.log("Rendering <MessageList/>");
    return (
    		<div className="messages">
    			{this.props.messages.map( (message) => {
    				return <Message key={message.id} type={message.type} message={message}/> 		
    				})		
    			}
  			</div>	
    );
  }
}
export default MessageList;

 