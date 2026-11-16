import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D WebGL Diamond Objects for Services in Shining Sky-Blue
 * Non-interactive to cursor: autonomous, smooth, continuous 3D rotation
 * - web-dev: Faceted Sky-Blue Diamond with glowing wireframe facets & orbit
 * - software-dev: Shining Cyan-Blue Diamond with inner crystal core & laser rings
 * - ai-solutions: Neural Sky-Blue Diamond with pulsing laser core crystal & neural sparks
 * - mobile-dev: Dual Rotating Sky-Blue Diamonds with circuit tracks
 */

function createFacetedDiamond(radius, tableRatio, crownHeight, pavilionHeight, segments, material, wireMaterial) {
  const group = new THREE.Group();

  const crownGeo = new THREE.CylinderGeometry(
    radius * tableRatio,
    radius,
    crownHeight,
    segments,
    1,
    false
  );
  const pavilionGeo = new THREE.ConeGeometry(
    radius,
    pavilionHeight,
    segments,
    1,
    false
  );

  const crownMesh = new THREE.Mesh(crownGeo, material);
  crownMesh.position.y = crownHeight / 2;

  const pavilionMesh = new THREE.Mesh(pavilionGeo, material);
  pavilionMesh.rotation.x = Math.PI;
  pavilionMesh.position.y = -pavilionHeight / 2;

  group.add(crownMesh);
  group.add(pavilionMesh);

  if (wireMaterial) {
    const crownWire = new THREE.Mesh(crownGeo, wireMaterial);
    crownWire.position.y = crownHeight / 2;
    const pavilionWire = new THREE.Mesh(pavilionGeo, wireMaterial);
    pavilionWire.rotation.x = Math.PI;
    pavilionWire.position.y = -pavilionHeight / 2;
    group.add(crownWire);
    group.add(pavilionWire);
  }

  return group;
}

export default function Service3DObject({ type = 'web-dev' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 180;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Dynamic Shining Sky-Blue Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00d2ff, 5.0, 15);
    blueLight.position.set(3, 3, 3);
    scene.add(blueLight);

    const skyLight = new THREE.PointLight(0x38bdf8, 4.5, 15);
    skyLight.position.set(-3, -2, 2);
    scene.add(skyLight);

    const specularLight = new THREE.DirectionalLight(0xffffff, 3.0);
    specularLight.position.set(2, 4, 3);
    scene.add(specularLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Radiant Shining Sky-Blue Diamond Material (IOR: 2.42)
    const skyBlueDiamondMat = new THREE.MeshPhysicalMaterial({
      color: 0x00d2ff,          // Radiant Sky Blue
      emissive: 0x0088cc,       // Luminous Sky-Blue Inner Glow
      emissiveIntensity: 0.5,
      metalness: 0.25,
      roughness: 0.02,          // Ultra-glossy gemstone surface
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      transmission: 0.75,       // Crystalline light transmission
      thickness: 1.8,
      ior: 2.42,                // Real diamond refractive index
      sheen: 1.0,
      sheenColor: new THREE.Color(0xbae6fd),
      flatShading: true,        // Sparkling diamond facets
    });

    const innerCyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x7dd3fc,
      emissive: 0x00b4d8,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transmission: 0.7,
      thickness: 1.4,
      ior: 2.42,
      flatShading: true,
    });

    const glowWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    let mainDiamond, innerDiamond, ring1, ring2;

    if (type === 'web-dev') {
      // 1. Web: Brilliant Shining Sky-Blue Diamond with glowing facets
      mainDiamond = createFacetedDiamond(1.1, 0.58, 0.42, 1.15, 8, skyBlueDiamondMat, glowWireMat);
      mainDiamond.rotation.z = 0.2;
      rootGroup.add(mainDiamond);

      const ringGeo = new THREE.TorusGeometry(1.4, 0.02, 16, 64);
      ring1 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x00d2ff }));
      ring1.rotation.x = Math.PI / 3;
      rootGroup.add(ring1);

    } else if (type === 'software-dev') {
      // 2. Software: Shining Sky-Blue Diamond with inner crystal core & dual rings
      mainDiamond = createFacetedDiamond(1.15, 0.58, 0.45, 1.2, 10, skyBlueDiamondMat);
      mainDiamond.rotation.z = -0.2;
      rootGroup.add(mainDiamond);

      innerDiamond = createFacetedDiamond(0.65, 0.58, 0.25, 0.65, 8, innerCyanMat);
      mainDiamond.add(innerDiamond);

      const ringGeo = new THREE.TorusGeometry(1.45, 0.025, 16, 64);
      ring1 = new THREE.Mesh(ringGeo, glowWireMat);
      ring1.rotation.y = Math.PI / 4;
      rootGroup.add(ring1);

    } else if (type === 'ai-solutions') {
      // 3. AI: Neural Shining Sky-Blue Diamond with glowing core & sparks
      mainDiamond = createFacetedDiamond(1.1, 0.58, 0.42, 1.15, 8, skyBlueDiamondMat);
      rootGroup.add(mainDiamond);

      innerDiamond = createFacetedDiamond(0.6, 0.58, 0.22, 0.6, 6, innerCyanMat, glowWireMat);
      mainDiamond.add(innerDiamond);

      // Synaptic diamond sparks in sky blue
      const pCount = 35;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 1.35 + Math.random() * 0.25;
        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.055,
        transparent: true,
        opacity: 0.9,
      });
      ring1 = new THREE.Points(pGeo, pMat);
      rootGroup.add(ring1);

    } else {
      // 4. Mobile: Dual Rotating Shining Sky-Blue Diamonds
      mainDiamond = createFacetedDiamond(1.05, 0.58, 0.4, 1.1, 8, skyBlueDiamondMat);
      mainDiamond.rotation.z = 0.3;
      rootGroup.add(mainDiamond);

      innerDiamond = createFacetedDiamond(0.6, 0.58, 0.22, 0.6, 8, innerCyanMat);
      mainDiamond.add(innerDiamond);

      const ringGeo = new THREE.TorusGeometry(1.35, 0.025, 16, 64);
      ring1 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x00d2ff }));
      ring1.rotation.x = Math.PI / 4;
      rootGroup.add(ring1);

      ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      ring2.rotation.y = Math.PI / 3;
      rootGroup.add(ring2);
    }

    // Autonomous 60 FPS Animation Loop (Zero Cursor Interference)
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth autonomous spin and float
      rootGroup.rotation.y = t * 0.7;
      rootGroup.rotation.x = Math.sin(t * 0.5) * 0.15;
      rootGroup.position.y = Math.sin(t * 1.6) * 0.08;

      if (innerDiamond) {
        innerDiamond.rotation.y = -t * 0.9;
        innerDiamond.rotation.x = t * 0.5;
      }
      if (ring1) {
        ring1.rotation.z += 0.015;
      }
      if (ring2) {
        ring2.rotation.z -= 0.018;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none flex items-center justify-center"
    />
  );
}
