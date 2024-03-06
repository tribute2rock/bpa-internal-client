import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import AppRoutes from './AppRoutes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/configureStore';
import './assets/scss/main.scss';
const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <AppRoutes />
          </React.Suspense>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
