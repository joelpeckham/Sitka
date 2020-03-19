// src/react.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Index = (props) => {
    return <div>Hello React! I'm {props.time}.</div>;
};

ReactDOM.render(<Index time = "Joel"/>, document.getElementById('trash'));
