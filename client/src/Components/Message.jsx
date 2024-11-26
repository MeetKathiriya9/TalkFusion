import React from 'react';

const Message = ({ text, uid }) => {
  return (
    <div>
      <strong>{uid}</strong>: {text}
    </div>
  );
};

export default Message;
