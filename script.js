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
// scene.background = new THREE.Color('#0e1545');

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

const ambientLight = new THREE.AmbientLight('white', 12);
const ambientLight2 = new THREE.HemisphereLight(
    'pink', // bright sky color
    'red', // dim ground color
    100, // intensity
  );


// create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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


// create a ight sky

const scene2 = new THREE.Scene();

scene2.fog = new THREE.FogExp2( 0x8CB4D3, 0.0004 );
var geometry = new THREE.Geometry();

THREE.ImageUtils.crossOrigin = 'anonymous';
var sprite = new THREE.TextureLoader().load('./star1.png');

for (var i = 0; i < 1000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = 2000 * Math.random() - 1000;
    vertex.y = 2000 * Math.random() - 1000;
    vertex.z = 2000 * Math.random() - 1000;

    geometry.vertices.push( vertex );
}

var material = new THREE.PointsMaterial( {  size: 13, map: sprite, transparent:true
} );

var particles = new THREE.Points( geometry, material );

var geometry2 = new THREE.Geometry();
         
             var sprite2 = new THREE.TextureLoader().load( "./cloud10.png" );
             
             for ( i = 0; i < 900; i ++ ) {
         
                var vertex2 = new THREE.Vector3();
                vertex2.x = Math.random() * 4000 - 500;
                vertex2.y = - Math.random() * Math.random() * 400 - 15;
                vertex2.z = i;
            
        
                geometry2.vertices.push( vertex2 );
        
        
            }

            var material2 = new THREE.PointsMaterial( {  size: 400, map: sprite2, 	depthWrite: false,
                depthTest: false,
           transparent: true, opacity:.2

    } );
       
   var particles2 = new THREE.Points( geometry2, material2 );
        particles2.position.set(-800,-270,0);
    scene2.add( particles2 );

console.log("particles", particles);
scene2.position.z = -700;
scene2.add( particles);
console.log("scene2", scene2);
scene2.add(ambientLight2);
scene.add(scene2);

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
                                    const model = data.scene.children[0];

                                    function animate(){
                                        requestAnimationFrame(animate);

                                        model.rotation.y +=  0.0005;
                                        light.position.x += 0.1;
                                        light.position.y += 0.1;

                                        light2.position.x -= 0.1;
                                        light2.position.y -= 0.1;

                                        renderer.render(scene, camera);
                                      }

                                     scene.add(ambientLight);                  
                                     scene.add(model);
                                     scene.add(light);
                                     scene.add(light2);
                                     
                                     console.log("big deal", model);
                                     animate(model); 
                                    
                                     renderer.render(scene, camera);                                 
                                 });

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.render(scene, camera);

// // start the loop
// renderer.setAnimationLoop(() => {
//     renderer.render(scene, camera);
//   });

function reportWindowSize() {
    resizer(container, camera, renderer);
    
  }

window.onresize = reportWindowSize();
