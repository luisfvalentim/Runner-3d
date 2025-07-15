import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

const textureLoader = new THREE.TextureLoader();

const streetLoader = new GLTFLoader();
streetLoader.load('models/Street Straight.glb', (gltf) => {
  const street = gltf.scene;
  street.scale.set(5, 1, 30);
  street.position.set(0, -1, -25);
  scene.add(street);
});

let player;
let mixer;
let animations;

const loader = new GLTFLoader();
loader.load('/models/Man.glb', (gltf) => {
  player = gltf.scene;
  animations = gltf.animations;
  player.scale.set(0.3, 0.3, 0.3);
  player.position.y = 0.5;
  player.rotation.y = Math.PI;
  scene.add(player);

  mixer = new THREE.AnimationMixer(player);
  const action = mixer.clipAction(animations[5]);
  action.play();
});

const obstacles = [];

const skyTexture = textureLoader.load('/textures/sky.jpg');
const skyGeometry = new THREE.PlaneGeometry(300, 150);
const skyMaterial = new THREE.MeshBasicMaterial({
  map: skyTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.7
});
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
sky.position.set(0, 40, -80);
scene.add(sky);

const fogGeometry = new THREE.PlaneGeometry(300, 50);
const fogMaterial = new THREE.MeshBasicMaterial({
  color: 0xaaaaaa,
  transparent: true,
  opacity: 0.5
});
const fogPlane = new THREE.Mesh(fogGeometry, fogMaterial);
fogPlane.position.set(0, 10, -60);
scene.add(fogPlane);

renderer.setClearColor(0xaaaaaa);
renderer.shadowMap.enabled = true;

const keysPressed = {};
document.addEventListener('keydown', (event) => keysPressed[event.key] = true);
document.addEventListener('keyup', (event) => keysPressed[event.key] = false);

let isGameOver = false;
let deathAnimation = null;
let lastScoreUpdate = 0;
const SCORE_UPDATE_INTERVAL = 100;

const BASE_OBSTACLE_SPEED = 0.2;
const MAX_OBSTACLE_SPEED = 1.0;
const SPEED_INCREMENT = 0.002;

const BASE_SPAWN_INTERVAL = 1500;
const MIN_SPAWN_INTERVAL = 800;

function checkCollision(obj1, obj2) {
  if (!obj1 || !obj2) return false;
  const box1 = new THREE.Box3().setFromObject(obj1);
  const box2 = new THREE.Box3().setFromObject(obj2);
  return box1.intersectsBox(box2);
}

function spawnObstacle() {
  const modelosDeCarro = [
    { path: '/models/CAR Model.glb', scale: 0.010 },
    { path: '/models/CAR.glb', scale: 0.05 },
    //{ path: '/models/cartoon banana car.glb', scale: 0.010 }
  ];

  const modeloEscolhido = modelosDeCarro[Math.floor(Math.random() * modelosDeCarro.length)];

  loader.load(modeloEscolhido.path, (gltf) => {
    const car = gltf.scene;
    car.scale.set(modeloEscolhido.scale, modeloEscolhido.scale, modeloEscolhido.scale);

    const limiteLateral = 4;
    const xPos = (Math.random() * 2 - 1) * limiteLateral;
    car.position.set(xPos, 0.5, -50);

    scene.add(car);
    obstacles.push(car);
  });
}

function playerDeath() {
  isGameOver = true;
  mixer.stopAllAction();

  deathAnimation = mixer.clipAction(animations[1]);
  deathAnimation.setLoop(THREE.LoopOnce);
  deathAnimation.clampWhenFinished = true;
  deathAnimation.play();

  clearInterval(obstacleInterval);

  setTimeout(() => {
    document.getElementById('gameOver').style.display = 'block';
  }, 2000);
}

document.getElementById('playAgainBtn').addEventListener('click', () => {
  document.getElementById('gameOver').style.display = 'none';
  isGameOver = false;
  score = 0;
  document.getElementById('score').textContent = '0';
  obstacles.forEach(obs => scene.remove(obs));
  obstacles.length = 0;

  if (player) {
    player.position.set(0, 0.5, 0);
    mixer.stopAllAction();
    const action = mixer.clipAction(animations[5]);
    action.play();
  }

  obstacleInterval = setInterval(spawnObstacle, BASE_SPAWN_INTERVAL);
});

function calculateObstacleSpeed() {
  return Math.min(
    BASE_OBSTACLE_SPEED + (score * SPEED_INCREMENT),
    MAX_OBSTACLE_SPEED
  );
}

function updateObstacleSpawnInterval() {
  if (obstacleInterval) clearInterval(obstacleInterval);

  const newInterval = Math.max(
    BASE_SPAWN_INTERVAL - (score * 20),
    MIN_SPAWN_INTERVAL
  );

  obstacleInterval = setInterval(spawnObstacle, newInterval);
}

let score = 0;
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  if (!isGameOver) {
    const currentTime = Date.now();
    if (currentTime - lastScoreUpdate >= SCORE_UPDATE_INTERVAL) {
      score += 1;
      document.getElementById("score").innerText = score;
      lastScoreUpdate = currentTime;

      if (score % 10 === 0) {
        updateObstacleSpawnInterval();
      }
    }
  }

  if (player) {
    if (keysPressed['ArrowLeft']) player.position.x -= 0.1;
    if (keysPressed['ArrowRight']) player.position.x += 0.1;

    const limiteLateral = 5;
    if (player.position.x < -limiteLateral) player.position.x = -limiteLateral;
    if (player.position.x > limiteLateral) player.position.x = limiteLateral;
  }

  const currentSpeed = calculateObstacleSpeed();

  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.position.z += currentSpeed;

    if (obs.position.z > camera.position.z + 5) {
      scene.remove(obs);
      obstacles.splice(i, 1);
      continue;
    }

    if (player && checkCollision(player, obs)) {
      if (!isGameOver) {
        playerDeath();
      }
      return;
    }
  }

  renderer.render(scene, camera);
}

let obstacleInterval = setInterval(spawnObstacle, BASE_SPAWN_INTERVAL);
updateObstacleSpawnInterval();
animate();
