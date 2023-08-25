import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { api } from "../utils";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAccount() {
  const { id } = useParams();
  const [newData, setNewData] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    username: "",
    phone: "",
  });

  const [previousData, setPreviousData] = useState({});

  useEffect(() => {
    api("/auth/me").then((data) => {
      setPreviousData(data);
    });
  }, []);
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen">
      <form
        className="m-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:3000/api/auth/edit/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newData),
            }
          );
          if (response.ok) {
            alert("Your account is successfully edited.");
            // const auth = await response.json();
            // setPreviousData(auth.user);
            navigate("/");
          } else {
            const message = await response.text();
            alert(message);
          }
        }}
      >
        <h1 className="text-center text-xl">Edit Account</h1>
        <TextField
          variant="outlined"
          //   value={previousData.email}
          type="email"
          className="w-full"
          required
          onChange={(e) => setNewData({ ...newData, email: e.target.value })}
        />
        <TextField
          variant="outlined"
          type="password"
          placeholder="Insert new password"
          className="w-full"
          onChange={(e) => setNewData({ ...newData, password: e.target.value })}
        />
        <TextField
          variant="outlined"
          value={previousData.name}
          type="text"
          className="w-full"
          required
          onChange={(e) => setNewData({ ...newData, name: e.target.value })}
        />
        <TextField
          variant="outlined"
          value={previousData.username}
          type="text"
          className="w-full"
          required
          onChange={(e) => setNewData({ ...newData, username: e.target.value })}
        />
        <TextField
          variant="outlined"
          value={previousData.phone}
          type="text"
          className="w-full"
          required
          onChange={(e) => setNewData({ ...newData, phone: e.target.value })}
        />
        <div className="flex justify-between">
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button type="reset" variant="contained">
            Reset
          </Button>
        </div>
      </form>
    </main>
  );
}
