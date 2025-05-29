import React from "react";
import { HowItWorks } from "../components/HowItWorks";
import { HowItWorksRider } from "../components/HowItWorksRider";
import { HowItWorksDriver } from "../components/HowItWorksDriver";

export interface HowItWorks {
  label: string;
  description: string;
  Content: React.ComponentType;
}

export const howItWorksData: HowItWorks[] = [
  {
    label: "Rider",
    description:
      "Download the RideTEGO app from the Play Store, create an account, and book a ride in minutes",
    Content: HowItWorksRider,
  },
  {
    label: "Driver",
    description:
      "Download DriveTEGO app from playstore, create account use your car and drive by yourself. Get ride and earn more money.",
    Content: HowItWorksDriver,
  },
];
