import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function DemoForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const submit = (e) => {
    e.preventDefault();
    console.log(name);
    axios
      .post("http://localhost:5000/login", {
        name: name,
        pass: setPass,
      })
      .then((res) => {
        localStorage.setItem("response", JSON.stringify(res));
        router.push("/");
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
