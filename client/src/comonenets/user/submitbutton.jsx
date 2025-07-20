import React from 'react';
import UserStore from "../../store/UserStore.js";

const Submitbutton = (props) => {
    const {isFormSubmit}=UserStore()

  if(isFormSubmit===false){
      return <button onClick={props.onClick} type={"submit"} className={props.className}>{props.text}</button>
  }
  else {
      return <button disabled={true} type={"submit"} className={props.className}>
          <div className="spinner-border spinner-border-sm" role="status">
          </div>
      </button>

  }
};

export default Submitbutton;