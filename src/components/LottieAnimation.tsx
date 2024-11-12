"use client";
import React from "react";
import Lottie from "lottie-react";
import loading from "@public/animations/loading.json";
import WIP from "@public/animations/WIP.json";

interface LottieAnimationProps {
  status: "loading" | "WIP";
}

function LottieAnimation({ status }: LottieAnimationProps) {
  return (
    <div className="flex justify-center mb-4">
      <Lottie
        animationData={status === "loading" ? loading : WIP}
        className="w-auto h-auto"
        loop
        autoplay
      />
    </div>
  );
}

export default LottieAnimation;
