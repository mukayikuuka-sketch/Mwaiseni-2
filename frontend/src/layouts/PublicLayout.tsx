// src/layouts/PublicLayout.tsx - CLEAN VERSION
import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbar/PublicNavbar";
import PublicFooter from "../components/footer/PublicFooter";

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
