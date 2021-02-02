import { createStore, applyMiddleware, compose } from 'redux';
import initReducers from './../reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
   key: 'geekmessanger',
   storage,
   stateReconciler: autoMergeLevel2,
   whitelist: ['chatReducer'],
};

function initStore() {
   const innitialStore = {};

   const store = createStore(
      persistReducer(persistConfig, initReducers()),
      innitialStore,
      compose(applyMiddleware(thunk)),
   );

   const persistor = persistStore(store);
   return { store, persistor };
}

export default initStore;