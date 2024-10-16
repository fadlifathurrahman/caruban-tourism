import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import { api } from "./utils.js";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api("/auth/me")
      .then((user) => setUser(user || null))
      .catch((error) => {
        console.error("Failed to fetch user", error);
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header user={user?.name ? user : null} />
      <Outlet context={[user, setUser]} />
      <Footer />
    </UserContext.Provider>
  );
}
