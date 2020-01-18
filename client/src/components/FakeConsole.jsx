import React from 'react';

const FakeConsole = (props) => (
  <div id="console">
    {'# ' + props.text}
  </div>
);

export default FakeConsole;