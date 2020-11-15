import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import {store} from './redux/store.js'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from './App';
import ClientPanel from './clientView/clientPanel.js';
import Cpanel from './clientView/cpanel.js';
import Login from './lawyerView/login.js';
import {JobExchange} from './lawyerView/jobExchange.js';

import Statistic from './components/statistic.js';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/clientPanel" component={ClientPanel} />
      <Route path="/statistics" component={Statistic} />
      <Route path="/login" component={Login} />
      <Route path="/rFgTdSvSVFgVFrtvvVgVSFvGDVDFVfgBfhGBgdVdFDVV" component={Cpanel} />
      <Route path="/jobExchange" component={JobExchange} />
    </div>
  </Router>
)



ReactDOM.render(<Provider store={store}>
    {routing}
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
