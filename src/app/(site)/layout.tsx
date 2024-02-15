import TitleSection from "@/components/landing-page/title-section";
import React from "react";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default HomePageLayout;
