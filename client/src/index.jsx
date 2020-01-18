import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    this.retrieveRepos();
  }

  updateRepoList(repos) {
    console.log(Object.keys(repos[0]));
    this.setState({
      repos: repos
    });
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
    console.log(`${term} was searched`);
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
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));