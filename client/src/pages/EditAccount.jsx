import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
// import { api } from "../utils";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { api } from "../utils";

export default function EditAccount() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [editEmail, setEditEmail] = useState(false);
  const { id } = useParams();
  const [newData, setNewData] = useState({
    id: user.id,
    email: "",
    password: "",
    name: "",
    username: "",
    phone: "",
  });

  // const [previousData, setPreviousData] = useState({});

  useEffect(() => {
    api("/auth/me").then((data) => {
      setNewData(data);
    });
  }, []);
  // console.log(newData.id);

  if (user) {
    return (
      <main className="flex min-h-screen pt-24">
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
              setUser(newData);
              alert("Edit success.");
              navigate(`/`);
            }
            const message = await response.text();
            alert(message);
          }}
        >
          <h1 className="text-center text-xl">Edit Account</h1>
          <label>
            <div className="p-2">
              <span className="p-2">{user.email} </span>
              {editEmail === false ? (
                <Button
                  variant="contained"
                  className={editEmail == false ? "" : "hidden"}
                  onClick={() => {
                    setEditEmail(true);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <div></div>
              )}
            </div>
            <input
              type="email"
              className={editEmail == true ? "w-full px-3 py-2" : "hidden"}
              placeholder="Insert your new email"
              required
              onChange={(e) => {
                setNewData({ ...newData, email: e.target.value });
              }}
            />
            <div
              className={
                editEmail == true ? "w-full px-3 py-2 flex gap-4" : "hidden"
              }
            >
              <Button
                variant="contained"
                onClick={() => {
                  setEditEmail(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={() => {
                  setEditEmail(true);
                }}
              >
                Save
              </Button>
            </div>
          </label>
          <input
            type="password"
            placeholder="Insert new password"
            className="w-full px-3 py-2"
            onChange={(e) =>
              setNewData({ ...newData, password: e.target.value })
            }
          />
          <input
            value={user.name}
            type="text"
            className="w-full px-3 py-2"
            required
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
          />
          <input
            // value={user.username}
            type="text"
            className="w-full px-3 py-2"
            required
            onChange={(e) =>
              setNewData({ ...newData, username: e.target.value })
            }
          />
          <input
            value={user.phone}
            type="text"
            className="w-full px-3 py-2"
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
  } else {
    return <Navigate to="/login" />;
  }
}
