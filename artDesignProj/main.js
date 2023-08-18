import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scence = new THREE.Scene()

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
camera.position.setZ(30)

renderer.render(scence, camera)

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const torus = new THREE.Mesh(geometry, material)

scence.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(0,0,0)

const ambientLight = new THREE.AmbientLight(0xffffff)
scence.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scence.add(lightHelper, gridHelper)


const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32)
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scence.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scence.background = spaceTexture

// created animate function to render the scene again every time there is a screen refresh
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()


  renderer.render(scence, camera)
}

animate()