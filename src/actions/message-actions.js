import {markChatAttention} from './chat-actions';
import types from './types';

export const create = (text, sender, chatId) => ({
   type: types.SEND_MESSAGE,
   text: text,
   sender: sender,
   chatId: chatId,
});

export const remove = (messageId) => ({
   type: types.REMOVE_MESSAGE,
   messageId: messageId
});

export const removeFromChat = (messageId, chatId) => ({
   type: types.REMOVE_MESSAGE_FROM_CHAT,
   messageId: messageId,
   chatId: chatId
});

export const sendMessage = (text, sender, chatId) => (dispatch) => {
   dispatch(create(text, sender, chatId));

   if (sender === 'me') {
      setTimeout(() => {
         dispatch(create('Не приставай ко мне, я робот!', 'bot', chatId));
         dispatch(markChatAttention(chatId, true));
      }, 3000);
   }
};

export const removeMessage = (messageId, chatId) => (dispatch) => {
   //console.log('chatId:'+chatId);
   dispatch(removeFromChat(messageId, chatId));
   //dispatch(remove(messageId));   
};