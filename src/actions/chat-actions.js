import types from './types';

export const addChat = (title) => ({
   type: types.ADD_CHAT,
   title: title,
});

export const markChatAttention = (chatId, attention) => ({
   type: types.MARK_CHAT_ATTENTION,
   chatId: chatId,
   attention: attention
});

export const remove = (chatId) => ({
   type: types.REMOVE_CHAT,
   chatId: chatId
});

export const changeChatAttention = (chatId, attention) => (dispatch) => {
   setTimeout(() => {
      dispatch(markChatAttention(chatId, attention));
   }, 3000);
};

export const removeChat = (chatId) => (dispatch) => {
   dispatch(remove(chatId));  
};