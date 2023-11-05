import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userData } from "../../apis/rootApi.js";

const MemberRoutes = ({ token }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  useEffect(() => {
    userData().then((res) => {
      setRole(res?.data?.role);
      console.log(res?.data?.role);
    });
  }, []);

  return role === "member" || role === "admin" ? (
    <Outlet />
  ) : (
    // leave()
    navigate("/shop")
  );
};

export default MemberRoutes;
