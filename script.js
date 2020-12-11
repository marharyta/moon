import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


function resizer (container, camera, renderer){
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();
    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);
}

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create game loop
// Initialise
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0e1545');

// Create a camera
const fov = 90; // AKA Field of View
// const fov = 180 * ( 2 * Math.atan( window.innerHeight / 2 / perspective ) ) / Math.PI
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 1000; // the far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 950);

const light = new THREE.DirectionalLight('red', 18);
light.position.set(-100, -100, 100);

const light2 = new THREE.DirectionalLight('blue', 28);
light2.position.set(100, 100, 100);

// create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);
// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;

// create cube 
function cube (){
    const geometry = new THREE.BoxBufferGeometry(700, 700, 700);
    const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    // cube.rotation.set(-0.5, -0.1, 0.8);
    return cube;
}

// scene.add(cube(), light);

// SUPER SIMPLE GLOW EFFECT
// use sprite because it appears the same from all angles
// const spriteMaterial = new THREE.SpriteMaterial( 
//     { 
//       map: new THREE.ImageUtils.loadTexture( 'images/glow.png' ), 
//       useScreenCoordinates: false, 
//       alignment: THREE.SpriteAlignment.center,
//       color: 0x0000ff, 
//       transparent: false, 
//       blending: THREE.AdditiveBlending
//     });
//     var sprite = new THREE.Sprite( spriteMaterial );
//     sprite.scale.set(200, 200, 1.0);
    

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => renderer.render(scene, camera));

const loader = new GLTFLoader();
const loadedData = loader.load('Moon_1_3474.glb', 
                                 (data) =>{
                                     console.log("big deal", data); 
                                     const model = data.scene.children[0];
                                     console.log('model', model)
                                     // model.position.set(30, 0, 0); 
                                     model.material.opacity = 0;  
                                     model.scale.set(0.5, 0.5, 0.5);
                                     // model.add(sprite); // this centers the glow at the mesh
                                     // scene.add(cube(), light); 
                                    //  updateFcts.push(function(delta, now) {
                                    //     // cloudMesh.rotation.y += 1 / 8 * delta;
                                    //     model.rotation.y += 1 / 16 * delta;
                                    //   })                      
                                     scene.add(model, light);
                                     scene.add(light2)
                                     renderer.render(scene, camera);                                 
                                 });

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(scene, camera);

// start the loop
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

function reportWindowSize() {
    resizer(container, camera, renderer);
    
  }

window.onresize = reportWindowSize();
