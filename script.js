import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const loader = new GLTFLoader();
console.log("loader", loader)

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

const scene = new THREE.Scene();

scene.background = new THREE.Color('skyblue');

// Create a camera
// var cameraZ = 20
// var perspective = 800
const fov = 90; // AKA Field of View
// const fov = 180 * ( 2 * Math.atan( window.innerHeight / 2 / perspective ) ) / Math.PI
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 0, 10);

// create the renderer
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );

const cube = new THREE.Mesh( geometry, material );
cube.rotation.set(-0.5, -0.1, 0.8);

const light = new THREE.DirectionalLight('white', 8);
light.position.set(10, 10, 10);
let model = null;
const loadedData = loader.load('Moon_1_3474.glb', 
                                (data) =>{
                                    console.log("big deal", data);
                                    scene.add(cube);
                                    scene.add(data.scene, light);
                                    controls.update();
                                    console.log("controls", controls)
                                    renderer.render(scene, camera);
                                    
                                });

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
controls.autoRotate = true;
renderer.render( scene, camera );