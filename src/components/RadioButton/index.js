import React from "react";
 
//  Radiobutton set for 2 options - true or false
// Being used for Vaccinated and Trained fields

function RadioButton(props) {
    console.log("radiobuttonProps", props)
return (
        <div className="radio"
        >
        {/* <label > Vaccinated: </label> */}
        <label > {props.radioLabel} &nbsp;&nbsp; </label>

        Yes &nbsp;&nbsp;
        <input
        type="radio"
        // name="vaccinated/trained"
        name= {props.radioName}
        // defaultChecked 
        value="true"
        // checked={props.defaultChecked}
        defaultChecked={props.radioName === props.defaultChecked}
        onChange={props.onChange}
        />

        &nbsp;&nbsp; No &nbsp;&nbsp;
        <input
        type="radio"
        // name="vaccinated/trained"
        name= {props.radioName}
    //    defaultChecked 
        value="false"
        // checked={props.defaultChecked}
        defaultChecked={!(props.radioName === props.defaultChecked)}
        onChange={props.onChange}
        />
        </div>
    );
};

//////////////////////////////////
export default RadioButton
