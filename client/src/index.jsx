import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import FakeConsole from './components/FakeConsole.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      consoleText: ''
    }
  }

  componentDidMount() {
    this.retrieveRepos();
    setInterval(this.fakeConsoleBorderAnimation, 500);
  }

  updateRepoList(repos) {
    this.setState({
      repos: repos
    });
    this.fakeConsoleLog('Repos retrieved');
  }

  fakeConsoleBorderAnimation() {
    let fakeConsole = document.getElementById('console');
    if (fakeConsole.className === 'cursor') {
      fakeConsole.className = '';
    } else {
      fakeConsole.className = 'cursor';
    }
  }

  fakeConsoleLog(text) {
    // beep();
    let typingInterval = 100; // in ms
    for(var i = 0; i < text.length; i++) {
      let displayText = text.substr(0, i + 1);
      setTimeout(() => {
        this.setState({
        consoleText: displayText});
        // beep();
      }, typingInterval * i);
    }
  }

  retrieveRepos() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      data: {}, // data sent to server, build this to send specific filters/sorts
      success: (data) => this.updateRepoList(data),
      error: (err) => console.log(err),
      dataTypes: 'application/json'
    });
  }

  search (term) {
    this.fakeConsoleLog(`INSERT INTO repos (id, name, url, owner, createdAt, updatedAt, description) VALUES (...${term})`);
    var objectToSend = { searchTerm: term };
    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'text/plain',
      data: term,
      success: (data) => console.log('Successful Post', data),
      error: (err) => console.log('Something went wrong', err)
    });
  }

  render () {
    return (
    <div id="main">
      <div id="sidebar">
        <h2>Github Fetcher</h2>
        <Search onSearch={this.search.bind(this)}/>
      </div>
      <div id="display">
        <RepoList repos={this.state.repos}/>
      </div>
      <FakeConsole text={this.state.consoleText}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));