import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home/index'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import Header from './Components/Header/index'
import Footer from './Components/Footer'
import Manage from './Components/Manage/index'
import Statistics from './Components/Statistics/index'
import Orders from './Components/Orders/index'
import Cart from './Components/Cart/index'
import AddBook from './Components/AddBook'
import { connect } from 'react-redux';

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
            <Route exact path="/AddBook" component={AddBook} />
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
