"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  return <div>LoginPage</div>;
};

export default LoginPage;
