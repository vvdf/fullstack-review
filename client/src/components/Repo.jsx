import React from 'react';
import Cell from './Cell.jsx';

const Repo = (props) => {
  let userUrl = 'https://github.com/' + props.repo.owner.userName;

  return (
  <div className="row">
    <Cell className={'cell' + ' ' + 'user'} item={props.repo.owner.userName} url={userUrl}/>
    <Cell className={'cell' + ' ' + 'name'} item={props.repo.name} url={props.repo.url}/>
    <Cell className={'cell' + ' ' + 'language'} item={props.repo.language}/>
    <Cell className={'cell' + ' ' + 'updated'} item={props.repo.updatedAt.substr(0, 10)}/>
    <Cell className={'cell' + ' ' + 'created'} item={props.repo.createdAt.substr(0, 10)}/>
  </div>
)}

export default Repo;