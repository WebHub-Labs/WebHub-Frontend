import React, { useState } from "react";
import axios from "axios";

function DemoForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        name: name,
        pass: setPass,
      })
      .then((res) => {
        localStorage.setItem('response', JSON.stringify(res));
        navigate("http://localhost:8080/");
      });
  };
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit" onClick={submit}>
          submit
        </button>
      </form>
    </>
  );
}

export default DemoForm;
