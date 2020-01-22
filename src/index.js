import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./containers/App/app";
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import './style.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="app app-wrapper">
                <Header />
                <Switch>
                        <Route exact path= "/" render={() => (
                        <Redirect to="/payment"/>
                        )}/>
                        <Route exact path='/payment' component={App} />
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>, document.getElementById("index"));