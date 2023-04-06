/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
      debitSum: 0,
      creditSum: 0,
    };
  }
  async apiCallDebit(){
    let apiLink = 'https://johnnylaicode.github.io/api/debits.json';
    try{
      let response = await axios.get(apiLink);
      //console.log(response.data);
      const data = response.data.map((item) => item.amount);
      const sum = data.reduce((acc, amount) => acc + amount, 0);
      this.setState({
        debitList: response.data,
        debitSum: sum,
        accountBalance: this.state.accountBalance - sum,
      });
    } catch(error){
      if (error.response) {
        //console.log(error.response.data);
        //console.log(error.response.status);
      }    
    }
  }

  async apiCallCredit(){
    let apiLink = 'https://johnnylaicode.github.io/api/credits.json';
    try{
      let response = await axios.get(apiLink);
      //console.log(response.data);
      const data = response.data.map((item) => item.amount);
      const sum = data.reduce((acc, amount) => acc + amount, 0);
      this.setState({
        creditList: response.data,
        creditSum: sum,
        accountBalance: this.state.accountBalance + sum,
      });
    } catch(error){
      if (error.response) {
        //console.log(error.response.data);
        //console.log(error.response.status);
      }    
    }
  }

  componentDidMount(){
    this.apiCallDebit();
    this.apiCallCredit();
  }

  updateAccountBalance = (newBalance) => {
    this.setState({accountBalance: newBalance})
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  addDebit = (debit) => {
    this.setState({debitList: debit})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} accountBalance={this.state.accountBalance} updateAccountBalance={this.updateAccountBalance} addDebit={this.addDebit}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;