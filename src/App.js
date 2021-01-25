import React from 'react';
import MessageField from './components/message-field';
import ChatList from './components/chat-list';
import Layout from './components/layout';

export const App = (props) => { 

  return <Layout chatlist={<ChatList/>}
                currentchat={<MessageField/>}>    
  </Layout>;
}

export default App;