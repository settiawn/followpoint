"use client";

import { Venue } from "@/components/venue";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { ConcertFestival } from "@/components/concert-festival";
import { Bazar } from "@/components/bazar";

export default function MapEventPage() {
  const orbitRef = useRef();

  const venuesData = [
    { id: 1, name: "Venue 1", description: "This is Venue 1." },
    { id: 2, name: "Venue 2", description: "This is Venue 2." },
    { id: 3, name: "Venue 3", description: "This is Venue 3." },
    { id: 4, name: "Venue 4", description: "This is Venue 4." },
    { id: 5, name: "Venue 5", description: "This is Venue 5." },
    { id: 6, name: "Venue 6", description: "This is Venue 6." },
    { id: 6, name: "Venue 6", description: "This is Venue 6." },
    { id: 6, name: "Venue 6", description: "This is Venue 6." },
    { id: 6, name: "Venue 6", description: "This is Venue 6." },
    { id: 6, name: "Venue 6", description: "This is Venue 6." },
  ];

  useEffect(() => {
    if (orbitRef.current) {
      const target = [1, 0, 0];
      orbitRef.current.target.set(...target);
      orbitRef.current.update();
    }
  }, []);
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [3, 3, 3], fov: 20 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        {/* <Venue data={venuesData} /> */}
        <Bazar data={venuesData} />
        {/* <ConcertFestival data={venuesData} /> */}
        <OrbitControls ref={orbitRef} />
      </Suspense>
    </Canvas>
  );
}
