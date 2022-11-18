import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


////////////
//  Base  //
////////////

//Canvas
const canvas = document.querySelector("canvas.webgl");

//Scene

const scene = new THREE.Scene();


//////////////
//  Object  //
//////////////

const wheelGeo = new THREE.BoxGeometry(6, 6, 16);
const wheelMat = new THREE.MeshLambertMaterial({ color: 0xff8000 });
const cabineGeo = new THREE.BoxGeometry(40, 8, 14);
const cabineMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const topGeo = new THREE.BoxGeometry(25, 8, 14);
const topMat = new THREE.MeshLambertMaterial({ color: 0x0000ff });

const wheelFront = new THREE.Mesh(wheelGeo, wheelMat);
wheelFront.position.set(0, 0, 0);
const wheelBack = new THREE.Mesh(wheelGeo, wheelMat);
wheelBack.position.set(-20, 0, 0);
const cabine= new THREE.Mesh(cabineGeo, cabineMat);
cabine.position.set(-8, 3, 0);
const top = new THREE.Mesh(topGeo, topMat);
top.position.set(-8, 10, 0);

const truck = new THREE.Group();
truck.add(wheelFront, wheelBack, cabine, top);
scene.add(truck);


/////////////
//  Sizes  //
/////////////

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//////////////
//  Camera  //
//////////////

/*
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
*/

// Setting up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
  cameraWidth / 2, // right
  cameraHeight / 2, // top
  cameraHeight / -2, // bottom
  0, // near plane
  1000 // far plane
);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

scene.add(camera);

//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true


//////////////
//  Lights  //
//////////////

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);

////////////////
//  Renderer  //
////////////////

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);
