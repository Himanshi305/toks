"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user_context";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  }, [setUser, router]);

  return null;
};

export default Logout;
