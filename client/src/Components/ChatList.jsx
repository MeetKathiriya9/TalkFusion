// import React from 'react';

// const ChatList = ({ chats }) => {
//   return (
//     <div>
//       {chats.map(chat => (
//         <div key={chat.id}>
//           {chat.name}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatList;

import React from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div>
      {chats.map(chat => (
        <div key={chat.id} onClick={() => onSelectChat(chat)}>
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
