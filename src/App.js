import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Books'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Header from './Components/Header/index'
import Manage from './Components/Manage'
import Statistics from './Components/Statistics'
import Orders from './Components/Orders'
import Cart from './Components/Cart'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  userId: state.user.userId,
});

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/SignIn" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/Manage" component={Manage} />
            <Route exact path="/Statistics" component={Statistics} />
            <Route exact path="/Orders" component={Orders} />
            <Route exact path="/Cart" component={Cart} />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(App);
