"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

// 3D Model Component
function Model() {
  const { scene } = useGLTF("/models/scene.gltf");
  return <primitive object={scene} scale={1.5} />;
}

export default function Home(): JSX.Element {
  const { theme } = useTheme();

  return (
    <NextUIProvider>
      <main
        className={`h-screen w-full ${
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        {/* Title Overlay */}
        <div className="absolute top-5 left-5 z-10">
          <h1 className="text-3xl font-bold">
            Context Aware<span className="text-green-500">AR</span> 3D Viewer
          </h1>
        </div>

        {/* 3D Canvas */}
        <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
          
          {/* Lighting */}
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} intensity={1.5} />

          {/* Model with loading fallback */}
          <Suspense fallback={null}>
            <Model />
          </Suspense>

          {/* Controls */}
          <OrbitControls autoRotate />

        </Canvas>
      </main>
    </NextUIProvider>
  );
}
