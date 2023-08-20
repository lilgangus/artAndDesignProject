import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()

// the first parameter is the field of view, the second is the aspect ratio, the third is the near clipping plane, and the fourth is the far clipping plane.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// create a renderer with the canvas element, the renderer is what draws the scene onto the canvas element
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')

})

// set the pixel ratio to the device's pixel ratio
renderer.setPixelRatio(window.devicePixelRatio)
// set the size of the renderer to the size of the window
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(300)
camera.position.setX(0)
camera.position.setY(100)

renderer.render(scene, camera)

// const geometry = new THREE.TorusGeometry(10,3,16,100)
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
// const torus = new THREE.Mesh(geometry, material)

// scence.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 10000)
pointLight.position.set(200,200,200)

const pointLight1 = new THREE.PointLight(0xffffff, 10000)
pointLight1.position.set(1, 1, 300)

// this light will illuminate the side of the building that is facing the camera
const pointLight2 = new THREE.PointLight(0xffffff, 100000)
pointLight2.position.set(1, 1, -300)

const pointLight3 = new THREE.PointLight(0xffffff, 100000)
pointLight3.position.set(300, 1, 1)

const pointLight4 = new THREE.PointLight(0xffffff, 100000)
pointLight4.position.set(-300, 1, 1)


scene.add(pointLight, pointLight1, pointLight2 )
scene.add(pointLight3, pointLight4)

// const lightHelper = new THREE.PointLightHelper(pointLight)

// scence.add(lightHelper)

// the grid helper is a plane with grid lines on it, the first parameter is the size of the plane, the second is the number of divisions in the grid
const gridHelper = new THREE.GridHelper(500,100) 
scene.add(gridHelper)

// make the camera rotate when scrolling
const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.5, 32, 32)
//   const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
//   const star = new THREE.Mesh(geometry, material)

//   const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

//   star.position.set(x,y,z)
//   scence.add(star)
// }

// Array(200).fill().forEach(addStar)

const loader = new GLTFLoader();

loader.load(
  'musuem.gltf',
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