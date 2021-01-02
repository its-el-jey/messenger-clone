import React, { useState , useEffect } from "react";
import "./App.css";
import {FormControl, Input, InputLabel, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import db from "./firebase";
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id , message: doc.data()})))
    });
  },[])

  useEffect(() => {
    setUsername(prompt('Please enter name: '))
  },[])

  const sendMessage = (event) => {
    event.preventDefault(); //will not refresh
    db.collection('messages').add({
      message: input,
      username : username,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
      //serverTimezone which location we selected to host our database
    })
    setInput("");
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100" alt="img" />
      <h1>Messenger Clone</h1>
      <p> Welcome {username} </p>

      <form className="app__form" action="">
        <FormControl className="app__formControl">
          <InputLabel> Enter a message... </InputLabel>
          <Input
            className="app__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton 
            className="app__iconButton" 
            disabled={!input}
            onClick={sendMessage} 
            type="submit" 
            color="primary" 
            variant="contained">
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({id,message}) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
      

    </div>
  );
}

export default App;
