import { useEffect } from "react";
import * as THREE from "three";

const Background = () => {
  useEffect(() => {
    let camera, scene, renderer;
    const objects = [];
    const container = document.getElementById("canvas-container");

    if (!container) return;

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0c14);
    scene.fog = new THREE.FogExp2(0x0d0c14, 0.002);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const textureLoader = new THREE.TextureLoader();
    const sprite = textureLoader.load("https://threejs.org/examples/textures/sprites/disc.png");

    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      vertices.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      size: 10,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
      color: new THREE.Color(0x6031ff),
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mesh objects
    const geo = new THREE.IcosahedronGeometry(80, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x3713ec,
      emissive: 0x3713ec,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(-200, 100, -200);
    scene.add(mesh);
    objects.push(mesh);

    const geo2 = new THREE.TorusKnotGeometry(60, 20, 100, 16);
    const mat2 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(250, -50, -400);
    scene.add(mesh2);
    objects.push(mesh2);

    const light = new THREE.PointLight(0x3713ec, 500, 1000);
    light.position.set(-200, 100, -150);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);

    function animate() {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0001;

      camera.position.x += -camera.position.x * 0.005;
      camera.position.y += -camera.position.y * 0.005;
      camera.lookAt(scene.position);

      objects.forEach((object, i) => {
        object.rotation.y = time * (i % 2 === 0 ? 0.5 : -0.3);
        object.rotation.x = time * 0.2;
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  return <div id="canvas-container" className="w-full h-full"></div>;
};

export default Background;