import { Button, TextField } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const Register = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  const register = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        console.log("User registered", user);
      })
      .catch((err: any) => {
        console.error(
          `There was an error when registering. Error code ${err.code}. ${err.message}`
        );
      });
  };

  const confirmPassword = (confirmationPassword: string) => {
    setPasswordConfirmed(confirmationPassword === password);
  };

  return (
    <>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <TextField
        onChange={(e) => confirmPassword(e.target.value)}
        placeholder="Repeat password"
      />
      <Button onClick={() => register()}>Register</Button>
    </>
  );
};
