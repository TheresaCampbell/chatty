import React from 'react';

export function Message(props) {
  return (
    <div className="message">
      <span className="message-username">{props.username}</span>
      <span className="message-content">{props.content}</span>
    </div>
  )
}