import React from 'react';
import Repo from './Repo.jsx';

let titleRepo = {
  name: 'Repository',
  owner: { userName: 'User'},
  url: '',
  language: 'Language',
  createdAt: 'Created at',
  updatedAt: 'Updated at' 
};

const RepoList = (props) => (
  <div className="container">
    <Repo repo={titleRepo}/>
    {
      props.repos.map((repo, key) => {
        return (<Repo repo={repo} key={key}/>)
      })
    }
  </div>
)

export default RepoList;