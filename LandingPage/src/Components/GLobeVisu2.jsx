import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import countries from "../assets/custom.geo.json";
import lines from "../assets/lines.json";
import map from "../assets/map.json";



function GlobeComponent2() {
    const containerRef = useRef(null);
    let Globe;
    let camera, scene, renderer, controls;

    useEffect(() => {
        // Variables
        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        function init() {
            // THIS is the best
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;


            renderer = new THREE.WebGLRenderer({alpha : true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(containerWidth, containerHeight);
            containerRef.current.appendChild(renderer.domElement);  // Use ref to attach the renderer

            // ... (rest of the init code is same)
            scene = new THREE.Scene();
    
            var ambiantLight = new THREE.AmbientLight(0xbbbbbb, 0.3);
            scene.add(ambiantLight);
            // scene.background = new THREE.Color(0x040d21);
        
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.updateProjectionMatrix();
        
            var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
            dLight.position.set(-800, 2000, 400);
            camera.add(dLight);
        
            var dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
            dLight1.position.set(-200, 500, 200);
            camera.add(dLight1);
        
            var dLight2 = new THREE.PointLight(0x8566cc, 0.5);
            dLight2.position.set(-200, 500, 200);
            camera.add(dLight2);
        
            camera.position.z = 400;
            camera.position.x = 0;
            camera.position.y = 0;
            scene.add(camera);
            scene.fog = new THREE.Fog(0x535ef3, 400, 2000);
        
            controls = new OrbitControls(camera, renderer.domElement);

            // EDITED
            const distance = camera.position.distanceTo(controls.target);
            controls.minDistance = distance;
            controls.maxDistance = distance;
            // EDITED 
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dynamicDampingFactor = 0.01;
            controls.enablePan = false;
            controls.minDistance = 150;
            controls.maxDistance = 160;
            controls.rotateSpeed = 0.8;
            controls.autoRotate = false;
            controls.minPolarAngle = Math.PI / 3.5;
            controls.maxPolarAngle = Math.PI - Math.PI / 3;
        
            window.addEventListener("resize", onWindowResize, false);
            document.addEventListener("mousemove", onMouseMove);
        }

        function initGlobe() {
            // ... (code for initGlobe remains same)
            Globe = new ThreeGlobe({
                waitForGlobeReady: true,
                animateIn: true
            })
        
        
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(true)
            .atmosphereColor("#3a228a")
            .atmosphereAltitude(0.25)
        
        const Coordinate = async () =>
        {
        
            setTimeout(() =>
            {
                Globe.arcsData(lines.pulls)
                .arcColor((e) => {
                    return e.status?"#9cff00":"ff4000";
                })
                .arcAltitude((e) =>{
                    return e.arcAlt;
                })
                .arcStroke((e) =>
                {
                    return e.status ? 0.5:0.3
                })
                .arcDashLength(0.9)
                .arcDashGap(4)
                .arcDashAnimateTime(1000)
                .arcDashInitialGap((e) => e.order*1)
                .labelsData(map.maps)
                .labelColor(() => "#80ff80")
                
                .labelDotRadius(0.3)
                .labelSize((e) => e.size)
                .labelText("city")
                .labelResolution(6)
                .labelAltitude(0.01)
                .pointsData(map.maps)
                .pointColor(() => "#fffff")
                .pointsMerge(true)
                .pointAltitude(0.07)
                .pointRadius(0.05)
            }, 1000)
            
            setTimeout(() =>
            {
                Globe.arcsData(lines.pulls2)
                .arcColor((e) => {
                    return e.status?"#9cff00":"#4dff4d";
                })
                .arcAltitude((e) =>{
                    return e.arcAlt;
                })
                .arcStroke((e) =>
                {
                    return e.status ? 0.5:0.3
                })
                .arcDashLength(0.9)
                .arcDashGap(4)
                .arcDashAnimateTime(1000)
                .arcDashInitialGap((e) => e.order*1)
                .labelsData(map.maps)
                .labelColor(() => "#80ff80")
                
                .labelDotRadius(0.3)
                .labelSize((e) => e.size)
                .labelText("city")
                .labelResolution(6)
                .labelAltitude(0.01)
                .pointsData(map.maps)
                .pointColor(() => "#fffff")
                .pointsMerge(true)
                .pointAltitude(0.07)
                .pointRadius(0.05)
            }, 3000)
        }
        
        setInterval(() => {
            Coordinate()
        },5000)
        
            Globe.rotateY(-Math.PI * (5 / 9));
            Globe.rotateZ(-Math.PI / 6);
            
            const globalMaterial = Globe.globeMaterial();
            globalMaterial.color = new THREE.Color(0x3a228a);
            globalMaterial.emissive = new THREE.Color(0x220038);
            globalMaterial.emissiveIntensity = 0.1;
            globalMaterial.shininess = 0.7;
        
            scene.add(Globe);
        }

        function onWindowResize() {
            camera.aspect = containerWidth / containerHeight;
            camera.updateProjectionMatrix();
            windowHalfX = containerWidth / 2;
            windowHalfY = containerHeight / 2;
            renderer.setSize(containerWidth, containerHeight);
        }

        function animate() {
            camera.position.x += Math.abs(mouseX) <= windowHalfX / 2
            ? (mouseX / 2 - camera.position.x) * 0.005 : 0;
            camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
            camera.lookAt(scene.position);
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        function onMouseMove(event) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        }

        window.addEventListener("resize", onWindowResize);
        document.addEventListener("mousemove", onMouseMove);

        init();
        initGlobe();
        animate();

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", onWindowResize);
            document.removeEventListener("mousemove", onMouseMove);

            // If there's anything else to clean-up, do it here
        };
    }, []);  // Empty dependency array means it will run once on mount and cleanup on unmount

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
}

export default GlobeComponent2;