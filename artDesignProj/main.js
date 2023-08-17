import './style.css'

import * as THREE from 'three'

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
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true})
const torus = new THREE.Mesh(geometry, material)

scence.add(torus)

// created animate function to render the scene again every time there is a screen refresh
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scence, camera)
}

animate()