import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Spectacular 3D Hero Visual for RULAX TECHNOLOGY
 * Giant Autonomous Revolving Brilliant-Cut Diamond in Radiant Shining Sky Blue
 * Features:
 * - Radiant Shining Sky-Blue Gemstone Material (IOR: 2.42, transmission: 0.8, emissive cyan glow)
 * - Flat-shaded facets that sparkle with brilliant specular light reflections
 * - Fully non-interactive to cursor: autonomous, smooth, majestic continuous 3D rotation
 * - Inner glowing sky-blue wireframe core
 * - Orbiting miniature sky-blue diamond satellites
 * - Multi-tiered shining sky-blue gyro-rings
 * - Zero pointer-event interference (pointer-events-none)
 * - Antigravity zero-G floating detachment
 */

function createDiamondGroup(radius, tableRatio, crownHeight, pavilionHeight, segments, material, wireMaterial) {
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
  pavilionMesh.rotation.x = Math.PI; // point cone down
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

export default function Hero3DCanvas({ antigravity = true }) {
  const mountRef = useRef(null);
  const antigravityRef = useRef(antigravity);

  useEffect(() => {
    antigravityRef.current = antigravity;
  }, [antigravity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.2;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // 2. High-Intensity Studio Lighting for Brilliant Sky-Blue Diamond Sparkle
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const skyBlueLight1 = new THREE.PointLight(0x00d2ff, 7.5, 35);
    skyBlueLight1.position.set(5, 6, 5);
    scene.add(skyBlueLight1);

    const skyBlueLight2 = new THREE.PointLight(0x38bdf8, 6.0, 35);
    skyBlueLight2.position.set(-5, -4, 4);
    scene.add(skyBlueLight2);

    const specularWhiteLight = new THREE.DirectionalLight(0xffffff, 3.5);
    specularWhiteLight.position.set(3, 8, 6);
    scene.add(specularWhiteLight);

    const bottomCyanLight = new THREE.PointLight(0x7dd3fc, 4.0, 20);
    bottomCyanLight.position.set(0, -5, 2);
    scene.add(bottomCyanLight);

    // 3. Central Giant Shining Sky-Blue Diamond
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Radiant Shining Sky-Blue Diamond Material (IOR: 2.42 diamond refraction)
    const skyBlueDiamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00d2ff,          // Radiant Sky Blue
      emissive: 0x0088cc,       // Luminous Sky-Blue Inner Glow
      emissiveIntensity: 0.55,
      metalness: 0.25,
      roughness: 0.02,          // Ultra-glossy gemstone surface
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      transmission: 0.78,       // Pure crystalline light transmission
      thickness: 2.0,
      ior: 2.42,                // Real diamond refractive index
      sheen: 1.0,
      sheenColor: new THREE.Color(0xbae6fd),
      flatShading: true,        // Sharp facets that sparkle brilliant light
    });

    // Luminous Crystal Silver-Cyan for Core Diamond
    const innerCyanDiamondMat = new THREE.MeshPhysicalMaterial({
      color: 0x7dd3fc,
      emissive: 0x00b4d8,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transmission: 0.7,
      thickness: 1.5,
      ior: 2.42,
      flatShading: true,
    });

    const skyBlueWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    // A. Main Giant Brilliant-Cut Sky-Blue Diamond
    const mainDiamond = createDiamondGroup(1.65, 0.58, 0.65, 1.75, 10, skyBlueDiamondMaterial, skyBlueWireMat);
    // Fixed aesthetic tilt for optimal facet light reflection
    mainDiamond.rotation.z = 0.25;
    mainDiamond.rotation.x = 0.2;
    rootGroup.add(mainDiamond);

    // B. Inner Glowing Laser Core Diamond
    const coreDiamond = createDiamondGroup(0.9, 0.58, 0.35, 0.95, 8, innerCyanDiamondMat);
    mainDiamond.add(coreDiamond);

    // C. Girdle Orbit Ring with Laser Glow
    const girdleGeo = new THREE.TorusGeometry(1.72, 0.03, 16, 64);
    const girdleMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const girdleRing = new THREE.Mesh(girdleGeo, girdleMat);
    girdleRing.rotation.x = Math.PI / 2;
    mainDiamond.add(girdleRing);

    // 4. Orbiting Multi-Tiered Shining Sky-Blue Gyro-Rings
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    const createGyroRing = (radius, tube, rotX, rotY, rotZ, speed, color) => {
      const geo = new THREE.TorusGeometry(radius, tube, 24, 120);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.4,
        metalness: 0.8,
        roughness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      mesh.rotation.z = rotZ;
      mesh.userData = { speed };
      ringGroup.add(mesh);
      return mesh;
    };

    const ring1 = createGyroRing(2.5, 0.035, Math.PI / 3, 0.3, 0, 0.016, 0x00d2ff);
    const ring2 = createGyroRing(3.0, 0.03, -Math.PI / 4, 0.5, 0.4, -0.013, 0x38bdf8);
    const ring3 = createGyroRing(3.5, 0.02, Math.PI / 6, -0.4, -0.2, 0.009, 0x7dd3fc);

    // 5. Orbiting Miniature Faceted Sky-Blue Diamond Satellites
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satellites = [];
    const satDistances = [2.7, 3.2, 3.7, 3.0];
    const satScales = [0.28, 0.32, 0.25, 0.3];

    satDistances.forEach((dist, i) => {
      const s = satScales[i];
      const satDiamond = createDiamondGroup(s, 0.58, s * 0.4, s * 1.1, 8, skyBlueDiamondMaterial);
      satDiamond.userData = {
        angle: (i * Math.PI) / 2,
        distance: dist,
        speed: 0.012 + i * 0.004,
        yOffset: (i % 2 === 0 ? 1 : -1) * 0.85,
        rotSpeed: 0.03,
      };
      satellites.push(satDiamond);
      satelliteGroup.add(satDiamond);
    });

    // 6. Glowing Cosmic Stardust Cloud
    const particleCount = 340;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00d2ff);
    const c2 = new THREE.Color(0x38bdf8);
    const c3 = new THREE.Color(0x7dd3fc);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.4 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const chosen = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colors[i * 3] = chosen.r;
      colors[i * 3 + 1] = chosen.g;
      colors[i * 3 + 2] = chosen.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Autonomous 60 FPS Animation Loop (Zero Cursor Interference)
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const isAntiG = antigravityRef.current;

      // Autonomous Diamond Floating & Spin
      rootGroup.rotation.y += 0.007 * (isAntiG ? 1.6 : 1);
      
      const floatAmp = isAntiG ? 0.35 : 0.15;
      const floatFreq = isAntiG ? 2.0 : 1.2;
      rootGroup.position.y = Math.sin(elapsed * floatFreq) * floatAmp;

      // Diamond Internal Spin & Core Rotation
      mainDiamond.rotation.y += 0.008;
      coreDiamond.rotation.y -= 0.015;
      coreDiamond.rotation.x += 0.008;

      // Zero-G diamond expansion
      const targetScale = isAntiG ? 1.2 : 1.0;
      mainDiamond.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

      // Rings Rotation
      ring1.rotation.z += ring1.userData.speed * (isAntiG ? 1.8 : 1);
      ring2.rotation.z += ring2.userData.speed * (isAntiG ? 1.8 : 1);
      ring3.rotation.z += ring3.userData.speed * (isAntiG ? 1.8 : 1);

      // Diamond Satellites Orbit
      satellites.forEach((sat) => {
        sat.userData.angle += sat.userData.speed * (isAntiG ? 1.5 : 1);
        const dist = sat.userData.distance * (isAntiG ? 1.2 : 1);
        sat.position.x = Math.cos(sat.userData.angle) * dist;
        sat.position.z = Math.sin(sat.userData.angle) * dist;
        sat.position.y = sat.userData.yOffset + Math.sin(elapsed * 2 + sat.userData.angle) * 0.22;
        sat.rotation.x += sat.userData.rotSpeed;
        sat.rotation.y += sat.userData.rotSpeed;
      });

      // Ambient Stardust Cloud
      particles.rotation.y = elapsed * 0.06;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize Handling
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
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px] flex items-center justify-center select-none pointer-events-none">
      {/* 3D Canvas Mount Point - Non-interactive to cursor */}
      <div 
        ref={mountRef} 
        className="w-full h-full pointer-events-none" 
      />

      {/* Floating Futuristic Telemetry Badge */}
      <div className="absolute -bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-full shadow-electric flex items-center gap-2.5 border border-sky-300/60 bg-white/95">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">
            SHINING SKY-BLUE DIAMOND
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
            AUTONOMOUS 3D
          </span>
        </div>
      </div>
    </div>
  );
}
