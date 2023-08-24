import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Registration() {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    phone: "",
  });

  return (
    <main className="flex min-h-screen">
      <form
        className="m-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch(
            "http://localhost:3000/api/users/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(signUp),
            }
          );
          if (response.ok) {
            alert("Your account is successfully created.");
          } else {
            const message = await response.text();
            alert(message);
          }
        }}
      >
        <h1 className="text-center text-xl">Sign Up</h1>
        <h1 className="text-center text-lg">Register Your Account</h1>
        <TextField
          variant="outlined"
          type="email"
          label="Email"
          className="w-full"
          required
          autoFocus
          onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Kata sandi"
          className="w-full"
          required
          onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
        />
        <TextField
          variant="outlined"
          type="text"
          label="Name"
          className="w-full"
          required
          onChange={(e) => setSignUp({ ...signUp, name: e.target.value })}
        />
        <TextField
          variant="outlined"
          type="text"
          label="Username"
          className="w-full"
          required
          onChange={(e) => setSignUp({ ...signUp, username: e.target.value })}
        />
        <TextField
          variant="outlined"
          type="text"
          label="Phone"
          className="w-full"
          required
          onChange={(e) => setSignUp({ ...signUp, phone: e.target.value })}
        />
        <div className="flex justify-between">
          <Button type="submit" variant="contained">
            Simpan
          </Button>
        </div>
      </form>
    </main>
  );
}
