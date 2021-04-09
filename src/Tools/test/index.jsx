import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test.jsx';
// import axios from 'axios';


// function DoenetTest(props){

//   axios.post('/api/test.php',{}).then((resp) => console.log('>>>resp', resp.data));

//   return <p>test</p>
// }

ReactDOM.render(
  <Test />,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
