import './style.css'

import * as THREE from 'three'

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import { inverseLerp } from 'three/src/math/MathUtils'

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
  'museum3.gltf',
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

const spaceTexture = new THREE.TextureLoader().load('space1.jpg')
// scene.background = spaceTexture

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
  end: 15,
  function: () => {
    const ratio = scalePercent(10, 15)
    camera.position.x = linearInterp(-150, -105, ratio)
    camera.position.z = linearInterp(-25, 20, ratio)
    camera.lookAt(linearInterp(0, -80, ratio), 60, linearInterp(0, 135, ratio))
  }
})

animationScripts.push({
  start: 15,
  end: 25,
  function: () => {
    const ratio  = scalePercent(15, 25)

    camera.position.x = linearInterp(-105, -80, ratio)
    camera.position.z = linearInterp(20, 80, ratio)
    camera.lookAt(-80, 60, 135)
  }
})

animationScripts.push({
  start: 25,
  end: 35,
  function: () => {
    const ratio = scalePercent(25, 35)
    
    camera.position.x = linearInterp(-80, -30, ratio)
    camera.position.z = linearInterp(80, 140, ratio)

    camera.lookAt(linearInterp(-80, -95, ratio), 60, linearInterp(135, 180, ratio))
  }
})

animationScripts.push({
  start: 35,
  end: 40,
  function: () => {
    const ratio = scalePercent(35, 40)

    camera.position.x = linearInterp(-30, -8, ratio)
    camera.lookAt(linearInterp(-95, -8, ratio), 60, linearInterp(180, 225, ratio))
  }
})

animationScripts.push({
  start: 40,
  end: 45,
  function: () => {
    const ratio = scalePercent(40, 45)

    camera.position.x = linearInterp(-8, 31, ratio) 
    camera.position.z = linearInterp(140, 130, ratio)
    
    camera.lookAt(linearInterp(-8, 95, ratio), 60, linearInterp(225, 167, ratio))
  }
})

animationScripts.push({
  start: 45,
  end: 50,
  function: () => {
    const ratio = scalePercent(45, 50)

    camera.position.x = linearInterp(31, 61, ratio)
    camera.position.z = linearInterp(130, 65, ratio)

    camera.lookAt(linearInterp(95, 120, ratio), 60, linearInterp(167, 65, ratio))
  }
})

animationScripts.push({
  start: 50,
  end: 55,
  function: () => {
    const ratio = scalePercent(50, 55)

    camera.position.x = linearInterp(61, 91, ratio)
    camera.position.z = linearInterp(65, 10, ratio)

    camera.lookAt(linearInterp(120, 100, ratio), 60, linearInterp(65, -55, ratio))
  }
})

animationScripts.push({
  start: 55, 
  end: 65, 
  function: () => {
    const ratio = scalePercent(55, 65) 

    camera.position.x = linearInterp(90, 195 , ratio)
    camera.position.z = linearInterp(10, -80, ratio)

    // the camera is a bit finiky, maybe try breaking into two parts
    camera.lookAt(linearInterp(100, 192, ratio), 60, linearInterp(-55, -4, ratio))
  }
})

animationScripts.push({
  start: 65, 
  end: 70, 
  function: () => {
    const ratio = scalePercent(65, 70)

    camera.lookAt(linearInterp(192, 270, ratio), 60, linearInterp(-4, -70, ratio))
  }
})

animationScripts.push({
  start: 70, 
  end: 75,
  function: () => {
    const ratio = scalePercent(70, 75)

    camera.position.x = linearInterp(200, 130, ratio)
    camera.position.z = linearInterp(-80 ,-134, ratio)

    camera.lookAt(linearInterp(270, 195, ratio), 60, linearInterp(-70, -200, ratio))
  }
})


animationScripts.push({
  start: 75,
  end: 80,
  function: () => {
    const ratio = scalePercent(75, 80)

    camera.position.x = linearInterp(130, 64, ratio)
    camera.position.z = linearInterp(-134, -200, ratio)

    camera.lookAt(linearInterp(195, 65, ratio), 60, linearInterp(-200, -270, ratio))
  }
}) 

animationScripts.push({
  start: 80,
  end: 85,
  function: () => {
    const ratio = scalePercent(80, 85)

    camera.position.x = linearInterp(64, 80, ratio)

    camera.lookAt(linearInterp(65, 0, ratio), 60, linearInterp(-270, -200, ratio))
  }
})

animationScripts.push({
  start: 85, 
  end: 90,
  function: () => {
    const ratio = scalePercent(85, 90)

    camera.position.x = linearInterp(80, 5, ratio)
    camera.position.z = linearInterp(-200, -145, ratio)

    camera.lookAt(linearInterp(0, 43, ratio), 60, linearInterp(-200, -90, ratio))
  }
}) 

animationScripts.push({
  start: 90, 
  end: 95,
  function: () => {
    const ratio = scalePercent(90, 95)

    camera.position.x = linearInterp(5, 4, ratio)
    camera.position.z = linearInterp(-145, -125, ratio)

    camera.lookAt(linearInterp(43, -55, ratio), 60, linearInterp(-90, -100, ratio))
  } 
})

animationScripts.push({
  start: 95,
  end: 98,
  function: () => {
    const ratio = scalePercent(95, 98)

    camera.position.x = linearInterp(4, -76, ratio)
    camera.position.z = linearInterp(-125, -160, ratio)

    camera. lookAt(linearInterp(-55, -176, ratio), linearInterp(60, 170, ratio), linearInterp(-100, -290, ratio))
  }
})


function playScrollAnimations(scripts) {
  // console.log("scrollPercent", scrollPercent)
  
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
    'Progress : ' + scrollPercent.toFixed(2) + "%";
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