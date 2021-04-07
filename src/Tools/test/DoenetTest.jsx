import React, { useState, useEffect, useRef } from 'react';
import DoenetViewer from '../../Viewer/DoenetViewer.jsx';
import doenetDefaultML from './defaultCode.doenet';

export default function DoenetTest(){
console.log("===DoenetTest")

  const [doenetML,setDoenetML] = useState("");
 
  //Update doenetML when file changes
  useEffect(()=>{
    if (doenetDefaultML){
      setDoenetML(doenetDefaultML);
    }
  },[doenetDefaultML]);


  const [attemptNumber,setAttemptNumber] = useState(1);
  // const [updateNumber,setUpdateNumber] = useState(1);
  const showCorrectness = true;
  const readOnly = false;
  const solutionDisplayMode = "button";
  const showFeedback = true;
  const showHints = true;
  const ignoreDatabase = true;
  // const requestedVariant = { index: 0 };

  //For Cypress Test Use
  window.onmessage = (e)=>{
    if (e.data.doenetML !== undefined) {
      setDoenetML(e.data.doenetML)
    }
  };


  if (doenetML === ""){
    return null;
  }

  return (
    <>
         <div style={{ backgroundColor: "#e3e3e3" }}><h3>Test Tool</h3>
        <label>Attempt Number: {attemptNumber} <button onClick={
          () => {
            setAttemptNumber((was)=>was+1)
          }
          }>New Attempt</button></label>
      </div>
      <DoenetViewer
        doenetML={doenetML}
        // contentId={"185fd09b6939d867d4faee82393d4a879a2051196b476acdca26140864bc967a"}
        flags={{
          showCorrectness,
          readOnly,
          solutionDisplayMode,
          showFeedback,
          showHints,
        }}
        attemptNumber={attemptNumber}
        ignoreDatabase={ignoreDatabase}
        // requestedVariant={requestedVariant}
      // collaborate={true}
      // viewerExternalFunctions = {{ allAnswersSubmitted: this.setAnswersSubmittedTrueCallback}}
      // functionsSuppliedByChild = {this.functionsSuppliedByChild}
      />
    </>
  )
}

