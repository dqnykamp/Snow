import React, { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function DynamicLoad(props) {
console.log("===DynamicLoad")
  let [components,setComponents] = useState([])


  useEffect(()=>{
      let propsArr = [{text:'im one'}, {text:'im two'}]
      let promises = [];
      for (let rendererName of props.renderers){
        let loader = import(`/renderers/${rendererName}.js`).catch();
        promises.push(loader);
      }

      // let components = [];
      Promise.all(promises).then((resp)=>{
        // resp.map((item)=>{
        //   components.push(item.default({text:'this is from static path'}));
        // })
        // setComponents(components);
        setComponents(resp.map((item,i)=>
          item.default(propsArr[i])
        ))
      });

      // let loader = import(`/renderers/${props.renderers[0]}.js`).catch()
      // loader.then((resp)=>{
      //   // console.log(">>>resp",resp.default)
        // const one = resp.default({text:'this is from static path'});
      //   setComponents([<React.Fragment key='1'>{one}</React.Fragment>])
      // })

  },[])

  // for (let rendererName of props.renderers){
  //    console.log(">>>renderName",rendererName)
  //  }

  // const One = lazy(() => import('/renderers/one.js'));

  // const One = lazy(() => import('/renderers/one.js'));
  // const Two = lazy(() => import('/renderers/two.js'));

  // const many = lazy(()=>{
  //   import('/renderers/one.js')
  //   import('/renderers/two.js')
  // })
  // console.log(">>>many",many[0]);
  return (
    <>
      {/* <Suspense fallback={<div>Components are Loading...</div>}>
        <One />
        <Two />
      </Suspense> */}

      {components}
  
      {/* <p>This is a p tag</p> */}
    </>
  );
}


ReactDOM.render(
    <DynamicLoad renderers={['one','two']}/>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
