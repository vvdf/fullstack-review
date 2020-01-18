import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div className="container">
    <h4> Listed Repos </h4>
    {
      props.repos.map((repo, key) => {
        return (<Repo repo={repo} key={key}/>)
      })
    }
  </div>
)

export default RepoList;