"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("three"));

var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader.js");

var _OrbitControls = require("three/examples/jsm/controls/OrbitControls");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var loader = new _GLTFLoader.GLTFLoader();
console.log("loader", loader); // Get a reference to the container element that will hold our scene

var container = document.querySelector('#scene-container');
var scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue'); // Create a camera
// var cameraZ = 20
// var perspective = 800

var fov = 90; // AKA Field of View
// const fov = 180 * ( 2 * Math.atan( window.innerHeight / 2 / perspective ) ) / Math.PI

var aspect = container.clientWidth / container.clientHeight;
var near = 0.1; // the near clipping plane

var far = 100; // the far clipping plane

var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10); // create the renderer

var renderer = new THREE.WebGLRenderer();
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshStandardMaterial({
  color: 0x00ff00
});
var cube = new THREE.Mesh(geometry, material);
cube.rotation.set(-0.5, -0.1, 0.8);
var light = new THREE.DirectionalLight('white', 8);
light.position.set(10, 10, 10);
var model = null;
var loadedData = loader.load('Moon_1_3474.glb', function (data) {
  console.log("big deal", data);
  scene.add(cube);
  scene.add(data.scene, light);
  controls.update();
  console.log("controls", controls);
  renderer.render(scene, camera);
}); // next, set the renderer to the same size as our container element

renderer.setSize(container.clientWidth, container.clientHeight); // finally, set the pixel ratio so that our scene will look good on HiDPI displays

renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true; // add the automatically created <canvas> element to the page

container.append(renderer.domElement); // render, or 'create a still image', of the scene

renderer.render(scene, camera);
var controls = new _OrbitControls.OrbitControls(camera, renderer.domElement);
controls.update();
controls.autoRotate = true;
renderer.render(scene, camera);
