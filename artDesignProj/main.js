import './style.css'

import * as THREE from 'three'

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()

// the first parameter is the field of view, the second is the aspect ratio, the third is the near clipping plane, and the fourth is the far clipping plane.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// create a renderer with the canvas element, the renderer is what draws the scene onto the canvas element
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
})

// this is to dynamically resize the renderer when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()
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

camera.position.setZ(-200)
camera.position.setX(-325)
camera.position.setY(200)
camera.lookAt(0, 0, 0)

renderer.render(scene, camera)

// a plane to help see the floor
const gridHelper = new THREE.GridHelper(500, 100)
gridHelper.position.x = -300
// gridHelper.position.z = -300

scene.add(gridHelper)

// make the camera rotate when scrolling
// const controls = new OrbitControls(camera, renderer.domElement)

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

// function for linear interpolation between two values with the ratiobetween being the ratio between the two values
function linearInterp(min, max, ratioBetween) {
  return (1 - ratioBetween) * min + ratioBetween * max

}

// used to scale a value between two values for the linear interpolation function
function scalePercent(start, end) {
  return (scrollPercent - start) / (end - start)
}

// using an array to hold the animation scripts, then running the array through a function to run the animation scripts
const animationScripts = []

animationScripts.push({
  start: 0,
  end: 10,
  function: () => {
    const ratio = scalePercent(0, 10)
    // maybe replace 0,0,0 with museum.position
    camera.lookAt(0, 0, 0)
    camera.position.x = linearInterp(-325, -150, ratio)
    camera.position.y = linearInterp(200, 60, ratio)
    camera.position.z = linearInterp(-200, -25, ratio)
    camera.lookAt(0, 60, 0)
  }
})

animationScripts.push({
  start: 10,
  end: 20,
  function: () => {
    const ratio = scalePercent(10, 20)
    camera.position.x = linearInterp(-150, -105, ratio)
    camera.position.z = linearInterp(-25, 20, ratio)
    camera.lookAt(linearInterp(0, -80, ratio), 60, linearInterp(0, 135, ratio))
  }
})

animationScripts.push({
  start: 20,
  end: 30,
  function: () => {
    const ratio  = scalePercent(20, 30)

    camera.position.x = linearInterp(-105, -80, ratio)
    camera.position.z = linearInterp(20, 80, ratio)
  }
})

function playScrollAnimations(scripts) {
  console.log("scrollPercent", scrollPercent)
  
  scripts.forEach((script) => {
    if (scrollPercent >= script.start && scrollPercent <= script.end) {
      script.function()
    }
  })
}

// this var is used to store the scroll percentage
// let scrollPercent = 0

// this function is used to update the scroll percentage
// document.body.onscroll = () => {
//   // scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) /( (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;

//   // (document.getElementById("scrollPercent") as HTMLDivElement).innerText = 'Scroll Progress: ' + scrollPercent.toFixed(2) + '%';

//   scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
//   scrollPercentElement.innerText = 'Scroll Progress: ' + scrollPercent.toFixed(2) + '%';

// }
let scrollPercent = 0;

document.body.onscroll = () => {
  // calculate the current scroll progress as a percentage
  scrollPercent =
    ((document.documentElement.scrollTop || document.body.scrollTop) / ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;

  document.getElementById('scrollProgress').innerText =
    'Scroll Progress : ' + scrollPercent.toFixed(2);
};


// created animate function to render the scene again every time there is a screen refresh
function animate() {
  requestAnimationFrame(animate)

  playScrollAnimations(animationScripts)
  // console.log(scrollPercent)

  renderer.render(scene, camera)

}

window.scrollTo({
  top: 0,
  behavior: 'smooth'
})

animate()