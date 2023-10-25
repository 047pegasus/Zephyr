import React, { Component } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import countries from "../assets/custom.geo.json";
import lines from "../assets/lines.json";
import map from "../assets/map.json";

class GlobeComponent extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.init();
        this.initGlobe();
        this.onWindowResize();
        this.animate();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
        document.removeEventListener("mousemove", this.onMouseMove);
    }

    init = () => {
        renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    
    var ambiantLight = new THREE.AmbientLight(0xbbbbbb, 0.3);
    scene.add(ambiantLight);
    scene.background = new THREE.Color(0x040d21);

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
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.autoRotate = false;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;


    this.containerRef.current.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize, false);
    document.addEventListener("mousemove", this.onMouseMove);
    }

    onMouseMove = (event) => {
        this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;
    }

    initGlobe = () => {
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

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate = () => {
        camera.position.x += Math.abs(mouseX) <= windowHalfX / 2
        ? (mouseX / 2 - camera.position.x) * 0.005 : 0;
        camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
        camera.lookAt(scene.position);
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        requestAnimationFrame(this.animate);
    }

    render() {
        return <div ref={this.containerRef} style={{ width: '100%', height: '100%' }} />;
    }
}

export default GlobeComponent;

ReactDOM.render(<App />, document.getElementById('root'));