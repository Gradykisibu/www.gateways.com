import React from "react";import HomePage from "@/components/Home/Home";
import ProtectedRoutes from "@/components/ProtectedRoute/ProtectedRoutes";

export default function Home() {
 
  return (
    <div>
      <ProtectedRoutes>
      <HomePage/>
      </ProtectedRoutes>
    </div>
  )
}
