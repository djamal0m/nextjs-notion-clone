"use client";

import getUserData from "@/lib/server-actions/getUserData";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        throw error;
      }
    };
    fetchUserData();
  }, []);

  return <div>Dashboard</div>;
};

export default DashboardPage;
