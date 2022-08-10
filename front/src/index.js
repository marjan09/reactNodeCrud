import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router, BrowserRouter } from 'react-router-dom'

import InpPerson from './comp/inputPerson'
import SendMailEditor from './comp/sendMail';
import UploadFile from './comp/uploadFile';
import UploadCSV from './comp/uploadCSV';
import SearchPerson from './comp/searchPerson';
import SendMessage from './comp/sendMessage';


<Router></Router>
const routes = (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App}/>
      <Route path='/dergoemail' component={SendMailEditor}/>
      <Route path='/shtoperson' component={InpPerson}/>
      <Route path='/uploadpersona' component={UploadFile}/>
      <Route path='/uploadcsv' component={UploadCSV}/>
      <Route path='/kerko' component={SearchPerson}/>
      <Route path='/dergomesazh' component={SendMessage}/>
    </div>
  </BrowserRouter>
)

ReactDOM.render(
  routes,
  document.getElementById('root')
);

