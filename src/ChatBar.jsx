import React from 'react';

export function ChatBar(props) {
  return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your name here (optional)" defaultValue={props.currentUser.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  );
}
