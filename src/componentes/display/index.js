import React from "react";
import Style from "./style.module.css";
export default function Display(props) {
  let { title } = props;
  return (
    <div className={Style.display}>
      <span>{title}</span>
    </div>
  );
}
