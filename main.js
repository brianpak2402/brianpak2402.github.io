import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Continually rerenders graphics
function animate() {
  requestAnimationFrame( animate );
  
  bagel.rotation.x += 0.005;
  bagel.rotation.y += 0.005;
  bagel.rotation.z += 0.005;
  
  controls.update();
  renderer.render( scene, camera );
}

/* === Building the Scene === */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);  // full screen canvas
camera.position.setZ(30);
const controls = new OrbitControls(camera, renderer.domElement);  // for mouse control

/* === Lighting Controls === */
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,10,10);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

/* === Helpers === */
const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(gridHelper, axesHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper);

/* Shapes and Objects */
// 1. Add bagel to the scene
const bagelGeometry = new THREE.TorusGeometry( 7, 3, 16, 100 );
const bagelMaterial = new THREE.MeshBasicMaterial( { color: 0xE6C29E} );
const bagel = new THREE.Mesh( bagelGeometry, bagelMaterial );
scene.add(bagel);

// 2. Add stars
function generateStar() {
  const starGeometry = new THREE.SphereGeometry(0.25, 20, 20);
  const starMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh( starGeometry, starMaterial );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).forEach(generateStar);

animate();
