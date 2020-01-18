import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div className="sidebarElement">
        <div className="inputBox">
          <input value={this.state.terms} onChange={(e) => this.onChange(e)}/>
        </div>
        <a className="button" onClick={() => this.search()}>[Add User]</a>
    </div>) 
  }
}

export default Search;