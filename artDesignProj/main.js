import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()

// the first parameter is the field of view, the second is the aspect ratio, the third is the near clipping plane, and the fourth is the far clipping plane.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// create a renderer with the canvas element, the renderer is what draws the scene onto the canvas element
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
})

// set the pixel ratio to the device's pixel ratio
renderer.setPixelRatio(window.devicePixelRatio)
// set the size of the renderer to the size of the window
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.toneMapping = 0
// renderer.useLegacyLights = true
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0x000000, 0)
renderer.outputColorSpace = THREE.SRGBColorSpace;

camera.position.setZ(300)
camera.position.setX(0)
camera.position.setY(100)

renderer.render(scene, camera)

// the grid helper is a plane with grid lines on it, the first parameter is the size of the plane, the second is the number of divisions in the grid
const gridHelper = new THREE.GridHelper(500,100) 
// gridHelper.position.x = 300
// gridHelper.position.z = -300
// scene.add(gridHelper)

// make the camera rotate when scrolling
const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.5, 32, 32)
//   const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
//   const star = new THREE.Mesh(geometry, material)

//   const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

//   star.position.set(x,y,z)
//   scene.add(star)
// }

// Array(200).fill().forEach(addStar)

const loader = new GLTFLoader();

loader.load(
  'museum1.gltf',
  function (gltf) {

    scene.add(gltf.scene);
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  },

  function (error) {
    console.log('An error happened')
  }
);



const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// created animate function to render the scene again every time there is a screen refresh
function animate() {
  requestAnimationFrame(animate)

  // torus.rotation.x += 0.01
  // torus.rotation.y += 0.005
  // torus.rotation.z += 0.01



  controls.update()


  renderer.render(scene, camera)
}

animate()