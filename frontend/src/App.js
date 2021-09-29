import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MembersList from './components/MembersList';
/*import {Provider} from "react-redux";
import store from "./services/store";*/

class App extends Component {

    state = {
        name: "",
    }

    handleCallback = (childData) =>{
        this.setState({name: childData})
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} render={(props) => (
                        /*<Provider store={store}>*/<Home {...props} parentCallback={this.handleCallback} />/*</Provider>*/
                    )}/>
                    <Route path='/members' exact={true} render={(props) => (
                        /*<Provider store={store}>*/<MembersList {...props} memberName={this.state.name} />/*</Provider>*/
                    )}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
