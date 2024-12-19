import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SantaHead = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. Initialisation de la scène, de la caméra et du renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const ambientLight = new THREE.AmbientLight(0x6bb876, 1.5);
    scene.add(ambientLight);
    scene.rotation.y = Math.PI + Math.PI; // Rotation de 180° de toute la scène

    const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
    directionalLight.position.set(5, 5, 7.5); // Positionner la lumière
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    scene.add(pointLight);

    renderer.setSize(350, 350);
    mountRef.current.appendChild(renderer.domElement);

    // Position de la caméra
    camera.position.set(0, 3, 10);

    // 2. Charger le modèle 3D
    const loader = new GLTFLoader();
    let model;

    loader.load(
      "./models/tree.glb",
      (gltf) => {
        model = gltf.scene;

        // Ajuste la rotation pour que l'avant soit visible
        model.rotation.y = Math.PI; // Rotation de 180° pour afficher l'avant
        model.position.set(0, 0, 0); // Ajuste la position si nécessaire
        model.scale.set(1, 1, 1);

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Erreur de chargement du modèle 3D :", error);
      }
    );

    // 3. Gérer le mouvement de la souris
    const onMouseMove = (event) => {
      if (model) {
        const sensitivity = 10;
        const xRotation =
          ((event.clientY / window.innerHeight) * 2 - 1) / sensitivity;
        const yRotation =
          ((event.clientX / window.innerWidth) * 2 - 1) / sensitivity;

        model.rotation.x = -xRotation; // Rotation en X inversée
        model.rotation.y = Math.PI + yRotation; // Ajoute 180° à l'orientation initiale
      }
    };

    mountRef.current.addEventListener("mousemove", onMouseMove);

    // 4. Animation
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);

      // Vérifier que mountRef.current existe avant d'enlever l'élément
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "full",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    />
  );
};

export default SantaHead;
