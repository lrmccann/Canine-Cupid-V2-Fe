import React from "react";
 
//2 Radiobutton set for 2 options - true or false
// Being used for Vaccinated and Trained fields

function RadioButton (props) {
    console.log("radiobuttonProps", props)
return (
        <div className="radio"
        >
        {/* <label > Vaccinated: </label> */}
        <label > {props.radioLabel} </label>

        Yes
        <input
        type="radio"
        // name="vaccinated"
        name= {props.radioName}
        value="true"
        onChange={props.onChange}
        />

        No
        <input
        type="radio"
        // name="vaccinated"
        name= {props.radioName}
        value="false"
        onChange={props.onChange}
        />
        </div>
    );
};
 
export default RadioButton
