export const getChats = chatReducer => chatReducer.chats;
export const getMessages = chatReducer => chatReducer.messages;
export const getChatMessages = (chatId) => chatReducer => chatReducer.chats[chatId].messageList.map((msgId) => messages[msgId]);