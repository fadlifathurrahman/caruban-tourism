import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [user, setUser] = useOutletContext();

  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <main className="flex">
        <form
          className="m-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch("http://localhost:3000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(login),
            });
            if (response.ok) {
              const auth = await response.json();
              localStorage.setItem("token", auth.token);
              setUser(auth.user);
              navigate("/");
            } else {
              const message = await response.text();
              alert(message);
            }
          }}
        >
          <h1 className="text-center text-xl">Login</h1>
          <h1 className="text-center text-lg">Gunakan akun Integer Anda</h1>
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            className="w-full"
            required
            autoFocus
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <TextField
            variant="outlined"
            type="password"
            label="Kata sandi"
            className="w-full"
            required
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <div className="flex justify-between">
            <Button>Buat akun</Button>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </div>
        </form>
      </main>
    );
  }
}
