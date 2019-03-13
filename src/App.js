import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Books/index'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Header from './Components/Header/index'
import Footer from './Components/Footer'
import Manage from './Components/Manage'
import Statistics from './Components/Statistics'
import Orders from './Components/Orders'
import Cart from './Components/Cart'
import { connect } from 'react-redux'
import agent from './agent'

const mapStateToProps = state => ({
  userId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: 'LOAD_BOOKS', payload: agent.Books.show() }),
})

class App extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }
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
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
