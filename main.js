"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("three"));

var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader.js");

var _OrbitControls = require("three/examples/jsm/controls/OrbitControls");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function resizer(container, camera, renderer) {
  camera.aspect = container.clientWidth / container.clientHeight; // update the camera's frustum

  camera.updateProjectionMatrix(); // update the size of the renderer AND the canvas

  renderer.setSize(container.clientWidth, container.clientHeight); // set the pixel ratio (for mobile devices)

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
} // Get a reference to the container element that will hold our scene


var container = document.querySelector('#scene-container'); // create game loop
// Initialise

var scene = new THREE.Scene();
scene.background = new THREE.Color('#0e1545'); // Create a camera

var fov = 90; // AKA Field of View
// const fov = 180 * ( 2 * Math.atan( window.innerHeight / 2 / perspective ) ) / Math.PI

var aspect = container.clientWidth / container.clientHeight;
var near = 0.1; // the near clipping plane

var far = 1000; // the far clipping plane

var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 950);
var light = new THREE.DirectionalLight('red', 18);
light.position.set(-100, -100, 100);
var light2 = new THREE.DirectionalLight('blue', 28);
light2.position.set(100, 100, 100); // create the renderer

var renderer = new THREE.WebGLRenderer({
  antialias: true
}); // next, set the renderer to the same size as our container element

renderer.setSize(container.clientWidth, container.clientHeight); // finally, set the pixel ratio so that our scene will look good on HiDPI displays

renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true; // create cube 

function cube() {
  var geometry = new THREE.BoxBufferGeometry(700, 700, 700);
  var material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
  });
  var cube = new THREE.Mesh(geometry, material); // cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
} // scene.add(cube(), light);
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


var controls = new _OrbitControls.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
  return renderer.render(scene, camera);
});
var loader = new _GLTFLoader.GLTFLoader();
var loadedData = loader.load('Moon_1_3474.glb', function (data) {
  console.log("big deal", data);
  var model = data.scene.children[0];
  console.log('model', model); // model.position.set(30, 0, 0); 

  model.material.opacity = 0;
  model.scale.set(0.5, 0.5, 0.5); // model.add(sprite); // this centers the glow at the mesh
  // scene.add(cube(), light); 
  //  updateFcts.push(function(delta, now) {
  //     // cloudMesh.rotation.y += 1 / 8 * delta;
  //     model.rotation.y += 1 / 16 * delta;
  //   })                      

  scene.add(model, light);
  scene.add(light2);
  renderer.render(scene, camera);
}); // add the automatically created <canvas> element to the page

container.append(renderer.domElement); // render, or 'create a still image', of the scene

renderer.render(scene, camera); // start the loop

renderer.setAnimationLoop(function () {
  renderer.render(scene, camera);
});

function reportWindowSize() {
  resizer(container, camera, renderer);
}

window.onresize = reportWindowSize();
