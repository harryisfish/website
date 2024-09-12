"use client";

import { BallTriangle } from "react-loader-spinner";

export default function CodePage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen ">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#fff"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />

      <h1 className="text-4xl font-bold  mb-4">WIP</h1>
      <p className="text-xl ">此页面正在开发中，敬请期待！</p>
    </div>
  );
}
