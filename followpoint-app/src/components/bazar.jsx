import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Bazar({ data }) {
  const { nodes, materials } = useGLTF("/Bazar.glb");

  //! JANGAN SENTUH APAPUN DISINI
  const getBoothProps = (index) => {
    const booths = [
      {
        geometry: nodes.Mesh60_Model.geometry,
        material: materials["Happy Glow"],
        position: [-576.779, -233.277, -1.75],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        geometry: nodes.Mesh66_Model.geometry,
        material: materials.Nila,
        position: [-576.779, -233.277, -1.75],
        rotation: [Math.PI / 2, 0, 0],
      },
      {
        geometry: nodes.Merged_Objects.geometry,
        material: materials._Color_M01_1,
        position: [-232.518, 179.774, 0.374],
        rotation: undefined,
      },
      {
        geometry: nodes.Merged_Objects_1.geometry,
        material: materials["Good Karma"],
        position: [-95.83, 179.774, 0.374],
        rotation: undefined,
      },
      {
        geometry: nodes.Merged_Objects_2.geometry,
        material: materials["Breath of Spring"],
        position: [43.295, 179.774, 0.374],
        rotation: undefined,
      },
      {
        geometry: nodes.Merged_Objects_3.geometry,
        material: materials["Crocodile Smile"],
        position: [431.803, -1.073, 1.711],
        rotation: undefined,
      },
      {
        geometry: nodes.Merged_Objects_4.geometry,
        material: materials.Bavarian,
        position: [431.803, -111.657, 1.711],
        rotation: undefined,
      },
      {
        geometry: nodes.Merged_Objects_5.geometry,
        material: materials["Pleasant Dream"],
        position: [135.33, -198.55, 0.374],
        rotation: undefined,
      },
      {
        geometry: nodes.Merged_Objects_6.geometry,
        material: materials.Promenade,
        position: [-99.635, -198.55, 0.374],
        rotation: undefined,
      },
      {
        geometry: nodes.Merged_Objects_7.geometry,
        material: materials.Aztec,
        position: [-443.335, -162.159, 0.374],
        rotation: undefined,
      },
    ];

    return booths[index % booths.length];
  };

  return (
    <group dispose={null}>
      <group
        position={[0.25, 0, -0.09]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <mesh //gakepake
          castShadow
          receiveShadow
          geometry={nodes.Mesh1_Group1_Model.geometry}
          material={materials.FrontColor}
          position={[-576.779, -233.277, -1.75]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {data.map((item, index) => {
          const { geometry, material, position, rotation } =
            getBoothProps(index);
          return (
            <mesh
              key={item.id}
              castShadow
              receiveShadow
              geometry={geometry}
              material={material}
              position={position}
              rotation={rotation || [0, 0, 0]}
            />
          );
        })}

        <mesh //gakepake
          castShadow
          receiveShadow
          geometry={nodes.Merged_Objects_8.geometry}
          material={materials._auto_}
          position={[239.422, 178.235, -0.414]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Bazar.glb");
