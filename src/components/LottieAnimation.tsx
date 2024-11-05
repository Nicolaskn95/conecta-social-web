"use client";
import React from "react";
import Lottie from "lottie-react";
import loading from "@public/animations/loading.json";

function LottieAnimation() {
  return (
    <div className="flex justify-center mb-4">
      <Lottie animationData={loading} className="w-64 h-64" loop autoplay />;
    </div>
  );
}

export default LottieAnimation;
