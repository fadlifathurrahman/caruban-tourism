// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

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
      <main className="flex min-h-screen">
        <form
          className="m-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch(
              "http://localhost:3000/api/users/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
              }
            );
            if (response.ok) {
              const auth = await response.json();
              localStorage.setItem("token", auth.token);
              await setUser(auth.user);
              alert("Login success.");
              navigate("/");
            } else {
              const message = await response.text();
              alert(message);
            }
          }}
        >
          <h1 className="text-center text-xl">Login</h1>
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            className="w-full"
            required
            autoFocus
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          {/* <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment
                position="end"
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          /> */}
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
