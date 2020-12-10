import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create game loop
// Initialise
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

// Create a camera
const fov = 90; // AKA Field of View
// const fov = 180 * ( 2 * Math.atan( window.innerHeight / 2 / perspective ) ) / Math.PI
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 1000; // the far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 900);

const light = new THREE.DirectionalLight('white', 8);
light.position.set(10, 10, 10);

// create the renderer
const renderer = new THREE.WebGLRenderer();
// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);
// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;

// create cube 
function cube (){
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotation.set(-0.5, -0.1, 0.8);
    return cube;
}

// scene.add(cube(), light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => renderer.render(scene, camera));

const loader = new GLTFLoader();
const loadedData = loader.load('Moon_1_3474.glb', 
                                 (data) =>{
                                     console.log("big deal", data); 
                                     var model = data.scene.children[0];
                                     console.log('model', model)
                                     // model.position.set(0, 0, 90); 
                                     // model.scale.set(2, 2, 2);                                 
                                     scene.add(model, light);
                                     renderer.render(scene, camera);                                 
                                 });

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(scene, camera);
