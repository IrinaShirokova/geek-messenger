
import update from 'react-addons-update';
import types from '../actions/types';

const initialStore = {
   chats: {
           1: {title: 'Чат 1', messageList: [1], attention: false},
           2: {title: 'Чат 2', messageList: [2], attention: false},
           3: {title: 'Чат 3', messageList: [], attention: false},
       },
    messages: {
        1: { text: "Привет!", sender: 'bot' },
        2: { text: "Здравствуйте!", sender: 'bot' },
    }
};


export default function chatReducer(store = initialStore, action) {
   switch (action.type) {
       case types.SEND_MESSAGE: {
           console.log(store.chats);
           const messageId = Object.keys(store.messages).length + 1;
           return update(store, {
               chats: { $merge: { [action.chatId]: {
                   ...store.chats[action.chatId],
                   messageList: [...store.chats[action.chatId].messageList, messageId]
               } } },
               messages: {$merge: { [messageId]: {
                    text: action.text, 
                    sender: action.sender
                }}},
           });
       }
       case types.ADD_CHAT: {
           const chatId = Object.keys(store.chats).length + 1;
           return update(store, {
              chats: { $merge: {
                  [chatId]: {
                      title: action.title, 
                      messageList: [],
                      attention: false
              } } },
           });
       }
       case types.MARK_CHAT_ATTENTION: {
        return update(store, {
            chats: { $merge: { [action.chatId]: {
                ...store.chats[action.chatId],
                attention: action.attention
            } } },
        });
       }
       case types.REMOVE_MESSAGE: {
            let newMessages = store.messages;
            delete newMessages[action.messageId];
            return update(store, {            
                messages: { $set: newMessages }
            });
       }
       case types.REMOVE_MESSAGE_FROM_CHAT: {
            console.log(action.chatId);
            let oldChat = store.chats[action.chatId];
            let newMessageList = [];
            oldChat.messageList.forEach(item => {
                if (item !== action.messageId) {
                    newMessageList.push(item);
                }
            });
            return update(store, {     
                chats: { $merge: { [action.chatId]: {
                    ...store.chats[action.chatId],
                    messageList: newMessageList
                } } },
             });
       }
       case types.REMOVE_CHAT: {
            let newChats = store.chats;
            delete newChats[action.chatId];
            return update(store, {            
                chats: { $set: newChats }
            });
       }
       default:
           return store;
   }
}