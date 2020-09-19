import React from "react";
import "./style.css";

// This file exports the Input, TextArea and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <label style={{fontWeight:"bolder"}} htmlFor={props.label}>{props.label}</label>
      <input className="form-control" {...props} />
    </div>
  );
}

export function Checkbox(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.label}>{props.label}</label>
      <input style={{marginLeft: "3%"}} type="checkbox" {...props}/>     
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      {/* <textarea className="form-control" rows="20" {...props} /> */}
      <label htmlFor={props.name}>{props.label}</label>
      <textarea className="form-control" {...props} />
    
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props}
     className="appbtnpink-1">
      {props.children}
    </button>
  );
}
