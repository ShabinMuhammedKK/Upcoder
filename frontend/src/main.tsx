import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from 'react-redux';
import "./utils/axiosConfig.ts"
import { BrowserRouter as Router} from "react-router-dom";import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
      </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);
