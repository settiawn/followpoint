"use client";

import { Venue } from "@/components/venue";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { ConcertFestival } from "@/components/concert-festival";
import { Bazar } from "@/components/bazar";
import SideBarMap from "@/components/sidebarmap";
import MouseControl from "@/components/mouseControl";
import { useRouter } from "next/navigation";
import { getEventDetails } from "../page";

export default function MapEventPage({ params }) {
  const [venuesData, setVenuesData] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const booth = venuesData.booth;

  const fetchData = async () => {
    const res = await getEventDetails(params.slug);
    setVenuesData(res);
    setLoading(false)
  };

  const toggleSidebarWithTenant = (tenantData) => {
    setCurrentTenant(tenantData);
    setIsSidebarVisible(true);
  };

  const onClose = () => {
    setIsSidebarVisible(false);
  };

  const orbitRef = useRef();

  useEffect(() => {
    if (orbitRef.current) {
      const target = [1, 0, 0];
      orbitRef.current.target.set(...target);
      orbitRef.current.update();
    }
  }, []);
  return (
    <>
    {loading ? (
            <div className="text-white">Loading the tickets...</div>
          ) : (
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [3, 3, 3], fov: 20 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <Venue data={booth} onTenantClick={toggleSidebarWithTenant} />
          {/* <Bazar data={venuesData} onTenantClick={toggleSidebarWithTenant} /> */}
          {/* <ConcertFestival data={venuesData} /> */}
          <OrbitControls ref={orbitRef} />
        </Suspense>
      </Canvas>
      )}
      <MouseControl />
      {isSidebarVisible && (
        <SideBarMap tenantData={currentTenant} onClose={onClose} />
      )}
    </>
  );
}
