import { useState } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  function clearFormdata() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const addUser = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    if (error) {
      alert(error);
    } else {
      clearFormdata();
      alert("User created");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px",
      }}
    >
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={addUser}>Create user</button>
    </div>
  );
}
