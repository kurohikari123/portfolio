import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const Geometries = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-5, 2, -10]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#7aa2f7" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[5, -2, -15]}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#bb9af7" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3, -4, -8]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#9ece6a" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[7, 5, -12]}>
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <meshStandardMaterial color="#f7768e" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#7aa2f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bb9af7" />
        <Geometries />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default Background3D;