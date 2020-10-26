import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import ErrorHandler from './hoc/Errorhandler/Errorhandle';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilderReducer: burgerBuilderReducer,
    
  })

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <ErrorHandler>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorHandler>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
