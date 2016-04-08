import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

// Layouts
import MainLayout from './components/main-layout';

// Pages
import Home from './components/home';
import Versus from './components/versus';
import Results from './components/results';

import reducer from './reducers';

const store = applyMiddleware(thunk)(createStore)(
    reducer
);

const history = syncHistoryWithStore(browserHistory, store);


export default (
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Route component={MainLayout}>

                    <Route path="/" component={Home} />

                    <Route path="versus/:indexRoute" component={Versus} />

                    <Route path="results" component={Results} />

                </Route>
            </Router>
        </div>
    </Provider>
);
