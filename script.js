import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { CSS2DRenderer, CSS2DObject } from '/renderers/CSS2DRenderer';

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
// // const fov = 180 * ( 2 * Math.atan( window.innerHeight / 2 / perspective ) ) / Math.PI
const aspect = container.clientWidth / container.clientHeight;
const near = 1; // the near clipping plane
const far = 4000; // the far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 950);

// const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
// camera.position.z = 2;

//skybox
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'back.png');
let texture_bk = new THREE.TextureLoader().load( 'front.png');
let texture_up = new THREE.TextureLoader().load( 'up.png');
let texture_dn = new THREE.TextureLoader().load( 'down.png');
let texture_rt = new THREE.TextureLoader().load( 'right.png');
let texture_lf = new THREE.TextureLoader().load( 'left.png');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 3500, 3500, 3500);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );

const light = new THREE.DirectionalLight('red', 18);
light.position.set(-100, -100, 100);

const light2 = new THREE.DirectionalLight('blue', 28);
light2.position.set(100, 100, 100);

const light3 = new THREE.DirectionalLight(0x3b9cf1, 28); // 051f87 2445b3 062399  082bb5
// 6cadd2 from album, darker 27848b
light3.position.set(0, 0, 100);

const ambientLight = new THREE.AmbientLight("white", 1.5);
const ambientLightI = new THREE.AmbientLight("white", 10);
const ambientLight2 = new THREE.HemisphereLight(
    'pink', // bright sky color
    'red', // dim ground color
    10, // intensity
  );


// create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true});
// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);
// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;

// create cube 
// function cube (){
//     const geometry = new THREE.BoxBufferGeometry(700, 700, 700);
//     const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
//     const cube = new THREE.Mesh( geometry, material );
//     return cube;
// }

// create a ight sky
const scene2 = new THREE.Scene({alpha: true});

scene.fog = new THREE.FogExp2( 0x3b9cf1, 0.0002 ); // 27848b 051f87
var geometry = new THREE.Geometry();

// THREE.ImageUtils.crossOrigin = 'anonymous';
var sprite = new THREE.TextureLoader().load('./star1.png');

for (var i = 0; i < 2000; i++) {
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
             
             for ( i = 0; i < 1200; i ++ ) {
         
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

// scene2.add( particles2 );

console.log("particles", particles);
scene2.position.z = -700;
// scene2.add( particles);

scene2.add(ambientLight2);
// scene.add(scene2);

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

                                        // light3.position.x -= 0.1;
                                        // light2.position.y -= 0.1;

                                        renderer.render(scene, camera);
                                      }

                                    scene.add(ambientLight);                  
                                     scene.add(model);
                                    //  scene.add(light);
                                    //  scene.add(light2);
                                     scene.add(light3);
                                     
                                     console.log("big deal", model);
                                     animate(model); 
                                    
                                     renderer.render(scene, camera);                                 
                                 });



const stars = {};
                                                                  //bsc5.dat @ http://tdc-www.harvard.edu/catalogs/bsc5.readme
const bsc5dat = new XMLHttpRequest();
bsc5dat.open('GET', 'bsc5.dat');
bsc5dat.onreadystatechange = function () {
    if (bsc5dat.readyState === 4) {
        const starData = bsc5dat.responseText.split("\n");
        const positions = new Array();
        const colors = new Array();
        const color = new THREE.Color();
        const sizes = new Array();
        starData.forEach(row => {
            let star = {
                id: Number(row.slice(0, 4)),
                name: row.slice(4, 14).trim(),
                gLon: Number(row.slice(90, 96)),
                gLat: Number(row.slice(96, 102)),
                mag: Number(row.slice(102, 107)),
                spectralClass: row.slice(129, 130),
                v: new THREE.Vector3()
            };

           
            console.log("star 1", star);
            if (!isNaN(star.id)){
                console.log("star", star);
                stars[star.id] = star;
                star.v = new THREE.Vector3().setFromSphericalCoords(100, (90 - star.gLat) / 180 * Math.PI, (star.gLon) / 180 * Math.PI);
                // star.v = new THREE.Vector3().setFromSphericalCoords(1, star.gLat, star.gLon);
                positions.push(star.v.x);
                positions.push(star.v.y);
                positions.push(star.v.z);
                switch (star.spectralClass) {
                    case "O":
                        color.setHex(0x91b5ff);
                        break;
                    case "B":
                        color.setHex(0xa7c3ff);
                        break;
                    case "A":
                        color.setHex(0xd0ddff);
                        break;
                    case "F":
                        color.setHex(0xf1f1fd);
                        break;
                    case "G":
                        color.setHex(0xfdefe7);
                        break;
                    case "K":
                        color.setHex(0xffddbb);
                        break;
                    case "M":
                        color.setHex(0xffb466);
                        break;
                    case "L":
                        color.setHex(0xff820e);
                        break;
                    case "T":
                        color.setHex(0xff3a00);
                        break;
                    default:
                        color.setHex(0xffffff);
                }
                const s = (((star.mag) * 26) / 255) + 0.18;
                sizes.push(s);
                colors.push(color.r, color.g, color.b, s);
            }
           
        });

        const starsGeometry = new THREE.BufferGeometry();

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
        starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        const starsMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader(),
            fragmentShader: fragmentShader(),
            transparent: true
        });
        const points = new THREE.Points(starsGeometry, starsMaterial);
        points.position.z = 1000;
        // points.scale(0.5)
        scene.add(points);

        // load constellationlines
        // const constellationLinesDat = new XMLHttpRequest();
        // constellationLinesDat.open('GET', '/data/ConstellationLines.dat');
        // constellationLinesDat.onreadystatechange = function () {
        //     if (constellationLinesDat.readyState === 4) {
        //         const constellationLinesData = constellationLinesDat.responseText.split("\n");
        //         constellationLinesData.forEach(row => {
        //             if (!row.startsWith("#") && row.length > 1) {
        //                 const rowData = row.split(/[ ,]+/);
        //                 var points = [];
        //                 for (let i = 0; i < rowData.length - 2; i++) {
        //                     let starId = parseInt(rowData[i + 2].trim());
        //                     if (starId in stars) {
        //                         const star = stars[starId];
        //                         points.push(star.v);
        //                         var starDiv = document.createElement('div');
        //                         starDiv.className = 'starLabel';
        //                         starDiv.textContent = star.name.substr(0, star.name.length - 3);
        //                         var starLabel = new CSS2DObject(starDiv);
        //                         starLabel.position.set(star.v.x, star.v.y, star.v.z);
        //                         starLabel.userData.type = "starName";
        //                         scene.add(starLabel);
        //                     }
        //                 }
        //                 const constellationGeometry = new THREE.BufferGeometry().setFromPoints(points);
        //                 const constellationMaterial = new THREE.LineBasicMaterial({ color: 0x008888 });
        //                 const constellationLine = new THREE.Line(constellationGeometry, constellationMaterial);
        //                 constellationLine.userData.type = "constellationLine";
        //                 scene.add(constellationLine);
        //                 //constellation label
        //                 let constellationLineBox = new THREE.Box3().setFromObject(constellationLine);
        //                 const center = new THREE.Vector3();
        //                 constellationLineBox.getCenter(center);
        //                 var constellationDiv = document.createElement('div');
        //                 constellationDiv.className = 'constellationLabel';
        //                 constellationDiv.textContent = rowData[0];
        //                 var constellationLabel = new CSS2DObject(constellationDiv);
        //                 constellationLabel.position.set(center.x, center.y, center.z);
        //                 constellationLabel.userData.type = "constellationName";
        //                 scene.add(constellationLabel);
        //             }
        //         });
        //         // scene.rotation.x = 0.5;
        //         // scene.rotation.z = 1.0;
        //     }
        // };
        // constellationLinesDat.send();
    }
};
// bsc5dat.send();

function vertexShader() {
    return `
        attribute float size;
        attribute vec4 color;
        varying vec4 vColor;
        void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_PointSize = size * ( 250.0 / -mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;
        }
    `;
}

function fragmentShader() {
     return `
         varying vec4 vColor;
             void main() {
                 gl_FragColor = vec4( vColor );
             }
    `;
 }

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
