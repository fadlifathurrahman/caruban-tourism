import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { createContext, useEffect, useState } from "react";
import { api } from "./utils.js";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    api("/me").then((user) => {
      if (!user) {
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header user={user} />
      <Outlet context={[user, setUser]} />
      <Footer />
    </UserContext.Provider>
  );
}
