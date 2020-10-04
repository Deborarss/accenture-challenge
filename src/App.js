import React, { useState } from "react";
import "./App.css";
import Display from "./componentes/display";
import Button from "./componentes/button";
import Style from "./app.module.css";
import api from "./service/api";

const buttons = [
  {
    number: 1,
    letters: "",
  },
  {
    number: 2,
    letters: "abc",
  },
  {
    number: 3,
    letters: "def",
  },
  {
    number: 4,
    letters: "ghi",
  },
  {
    number: 5,
    letters: "jkl",
  },
  {
    number: 6,
    letters: "mno",
  },
  {
    number: 7,
    letters: "pqrs",
  },
  {
    number: 8,
    letters: "tuv",
  },
  {
    number: 9,
    letters: "wxyz",
  },
  {
    number: 0,
    letters: "_",
  },
  {
    number: "",
    letters: "enter",
  },
];

function App() {
  const [numbers, setNumbers] = useState("");
  const [text, setText] = useState([]);

  const handlerDisplay = (number) => {
    if (
      number !== "" &&
      number !== "*" &&
      number !== "_" &&
      number !== "#" &&
      number !== 1
    ) {
      setNumbers(numbers + number);
    }
  };

  const submit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      api.post("/", { number: numbers }).then((response) => {
        if (response.data.letter === "") {
          setNumbers("");
        }
        setText((prev) => prev + response.data.letter);
        setNumbers("");
      });
    }
  };

  function handleBackspace() {
    const erasedNumber = numbers.substring(0, numbers.length - 1);
    setNumbers(erasedNumber);
  }

  return (
    <div className={Style.phone} onKeyPress={(event) => submit(event)}>
      <Display title={`${numbers} ${text}`}></Display>

      {buttons.map((button) => (
        <Button
          key={button.letters}
          onClick={() => handlerDisplay(button.number)}
          number={button.number}
          letters={button.letters}
        ></Button>
      ))}
      <Button letters="*" onClick={() => handleBackspace()}></Button>
    </div>
  );
}

export default App;
