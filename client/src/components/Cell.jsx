import React from 'react';

const Cell = (props) => {
  return props.url ?
    <a className={props.className} href={props.url} target="_blank">{props.item}</a> :
    <div className={props.className}>{props.item}</div>
};

export default Cell;