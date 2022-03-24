// Display loading icon
const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));
const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.visibility = visible ? 'visible' : 'hidden';
  //).style.display = visible ? 'block' : 'none';
setVisible('#sidebar', false);

const observer = new MutationObserver((mutations, obs) => {
    const universe = document.getElementById('container');
    if (container) {
        setVisible('#sidebar', true);
        obs.disconnect();
        return;
    }
});

observer.observe(document.querySelector('#container'), {
    childList: true,
    subtree: true
});

import * as THREE from "https://cdn.skypack.dev/three@0.133";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.133/examples/jsm/controls/OrbitControls.js";
import { SVGLoader } from "https://cdn.skypack.dev/three@0.133/examples/jsm/loaders/SVGLoader.js";
import { FontLoader } from "https://cdn.skypack.dev/three@0.133/examples/jsm/loaders/FontLoader.js";
import { VRButton } from 'https://cdn.skypack.dev/three@0.133/examples/jsm/webxr/VRButton.js';

import * as CSV from 'https://cdn.jsdelivr.net/npm/@vanillaes/csv@3.0.1/index.js';

import * as d3 from "https://cdn.skypack.dev/d3@7.3.0";

var scene, camera, renderer, controls, gridHelper;
var galGeometry, particleSystem;
const positions = [];
const sizes = [];
const colours = [];
let uniforms;
let mesh_lofar;


let particles = 10000;
var distanceScaleFactor = 0.1;
var sizeScaleFactor = 1.0;
var viewDistance = 10000;

const hour_labels = [];

var rotate = false;

let clock = new THREE.Clock();
let delta = 0;
// 60 fps
let interval = 1 / 30;

init_lofar_scene();
init_galaxies();
//init_text();

var btn_rot = document.getElementById('btn_rot');
btn_rot.addEventListener('click', toggleRotate);

var btn_cap = document.getElementById('btn_cap');
btn_cap.addEventListener('click', toggleRecord);

function get_filesize(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
                                 //  to get only the header
    xhr.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            callback(parseInt(xhr.getResponseHeader("Content-Length")));
        }
    };
    xhr.send();
}


function scaleDistance(e) {
	var target = (e.target) ? e.target : e.srcElement;
	distanceScaleFactor = target.value;
	particleSystem.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions_initial.map(x => x * distanceScaleFactor), 3));
}

function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function add_galaxies(positions, shader, size, colour) {
	galGeometry = new THREE.BufferGeometry();
	galGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	if (!(typeof size === 'undefined')) {
		galGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colour, 3));
	}
	if (!(typeof size === 'undefined')) {
		galGeometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1).setUsage(THREE.DynamicDrawUsage));
	}
    galGeometry.computeBoundingSphere();
    var material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: THREE.VertexColors
    });

	particleSystem = new THREE.Points(galGeometry, shader);
	scene.add(particleSystem);
}

function setLoadingFinished() {
	const container = document.getElementById('container');
	container.appendChild(renderer.domElement);
	document.body.appendChild( VRButton.createButton( renderer ) );
    document.getElementById('loading').remove();
	animate();
}

function init_lofar_scene() {
	// Set up the scene, camera and controls.
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, viewDistance);
	camera.position.x = 50;
	camera.position.y = 50;
	camera.position.z = 50;
	
	var loader = new THREE.TextureLoader();
	// Load an image file into a custom material
	//var material = new THREE.MeshLambertMaterial({
	var material = new THREE.MeshStandardMaterial({
		map: loader.load('textures/superterp3_crop_small.png'),
		transparent: true,
	});
	var geometry = new THREE.PlaneGeometry(75, 75);
	mesh_lofar = new THREE.Mesh(geometry, material);
	mesh_lofar.position.set(0, 0.1, 0);
	mesh_lofar.rotateX(-Math.PI/2);
	mesh_lofar.renderOrder = -1;
	scene.add(mesh_lofar);
	
	//gridHelper = new THREE.PolarGridHelper(50, 24);
	//scene.add(gridHelper);
	
	// Add a light so we can see.
	var light = new THREE.PointLight(0xffffff, 1, 0);
	light.position.set(0, 10, 0);
	scene.add(light);
	
	renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.xr.enabled = true;
	renderer.setAnimationLoop( function () {
		renderer.render( scene, camera );
	});

	controls = new OrbitControls(camera, renderer.domElement);
}

function init_galaxies() {
	uniforms = {pointTexture: {value: new THREE.TextureLoader().load('textures/spark1.png')}};	
	
	const shaderMaterial = new THREE.ShaderMaterial( {

		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true

	} );

	const color = new THREE.Color();

    //get_filesize("https://public.spider.surfsara.nl/project/lofarvwf/dxyz.csv", function(size) {
    get_filesize("./data/lotss_desi.csv", function(size) {
        let loadtext = document.querySelector('#loading');
        loadtext.innerHTML = '<p>Loading ' + Math.round(size / 1000000) + ' MB for LoTSS DR2 visualisation (~' + Math.ceil(Math.round(size/1000000) / 12.5) + ' seconds on a 100Mbps connection).</br>Scene initialisation afterwards may take a hot minute.</br>Smoothness depends on your device\'s abilities. For best performance use a system with a dedicated GPU.<br/> Created by Frits Sweijen</p>'
    });
	
	//const catalogue = d3.csv('https://public.spider.surfsara.nl/project/lofarvwf/dxyz.csv');
	const catalogue = d3.csv('./data/lotss_desi.csv');
	catalogue.then(function (data) {
			particles = data.length;
			for (let i = 0; i < data.length; i++) {
				// Y and Z are reversed between our and render coordinates.
				positions.push(Number(data[i].X * (data[i].D * distanceScaleFactor)));
				positions.push(Number(data[i].Z * (data[i].D * distanceScaleFactor)));
				positions.push(Number(data[i].Y * (data[i].D * distanceScaleFactor)));
				
				color.setHSL(1.0, 1.0, 1.0);
				colours.push( color.r, color.g, color.b );
				sizes.push(1.0);
			}
			add_galaxies(positions, shaderMaterial, sizes, colours);
			console.log(data.length);
			window.addEventListener('resize', onWindowResize);
			setLoadingFinished();
		});
}

function init_text( ) {
	const loader = new FontLoader();
	loader.load( 'js/vendor/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

		const color = new THREE.Color( 0x006699 );

		const matDark = new THREE.MeshBasicMaterial( {
			color: color,
			side: THREE.DoubleSide
		} );

		const matLite = new THREE.MeshBasicMaterial( {
			color: color,
			transparent: true,
			opacity: 1.0,
			side: THREE.DoubleSide
		} );

		for (let hour = 0; hour < 24; hour++) {
			const message = hour + 'h';

			const shapes = font.generateShapes( message, 1 );
			
			const tgeometry = new THREE.ShapeGeometry( shapes );
			tgeometry.computeBoundingBox();

			const xMid = - 0.5 * ( tgeometry.boundingBox.max.x - tgeometry.boundingBox.min.x );
			const yMid = - 0.5 * ( tgeometry.boundingBox.max.y - tgeometry.boundingBox.min.y );
			const zMid = - 0.5 * ( tgeometry.boundingBox.max.z - tgeometry.boundingBox.min.z );
			
			const interval = 360 / 24;
			const ldist = 55;
			var xl = ldist * Math.cos(deg2rad(hour * interval));
			var zl = ldist * Math.sin(deg2rad(hour * interval));
			tgeometry.rotateY(deg2rad(-hour * interval));
			tgeometry.translate( xl, yMid, zl);

			hour_labels.push([shapes, tgeometry]);
			const text = new THREE.Mesh( tgeometry, matLite );
			scene.add(text);
		}
	});
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function toggleRecord() {
	if (!capturing) {
		capturer.start();
		capturing = true;
	}else{
		capturer.stop();
		capturer.save();
		capturing = false;
	}
}

function toggleRotate() {
	rotate = !rotate;
}

function animate() {
	requestAnimationFrame(animate);
	render();
	controls.update();
	delta += clock.getDelta();
	if (delta  > interval) {
		// The draw or time dependent code are here
		render();
		delta = delta % interval;
	}
}

var glS = new glStats(); // init at any point
var tS = new threeStats( renderer ); // init after WebGLRenderer is created

var rS = new rStats( {
    values: {
        frame: { caption: 'Total frame time (ms)', over: 16 },
        fps: { caption: 'Framerate (FPS)', below: 30 },
        calls: { caption: 'Calls (three.js)', over: 3000 },
        raf: { caption: 'Time since last rAF (ms)' },
        rstats: { caption: 'rStats update (ms)' }
    },
    groups: [
        { caption: 'Framerate', values: [ 'fps', 'raf' ] },
        { caption: 'Frame Budget', values: [ 'frame', 'texture', 'setup', 'render' ] }
    ],
    fractions: [
        { base: 'frame', steps: [ 'UpdateGeometry', 'render' ] }
    ],
    plugins: [
        tS,
        glS
    ]
} );

function render() {
    rS( 'frame' ).start();
    glS.start();

    rS( 'frame' ).start();
    rS( 'rAF' ).tick();
    rS( 'FPS' ).frame();
	const time = Date.now() * 0.005;
    rS( 'render' ).start();
	renderer.render( scene, camera );
    rS( 'render' ).end();
	if (rotate == true) {
		let rotspeed = 0.1 * delta;
		particleSystem.rotation.y = particleSystem.rotation.y + rotspeed;
		//gridHelper.rotation.y = gridHelper.rotation.y + rotspeed;
		mesh_lofar.rotation.z = mesh_lofar.rotation.z + rotspeed;
		mesh_lofar.needsUpdate = true;
		for (let i = 0; i < hour_labels.length; i++) {
			let tgeometry = hour_labels[i][1]
			tgeometry.rotateY(rotspeed);
			
		}
	}else{
		for (let i = 0; i < hour_labels.length; i++) {
			let tgeometry = hour_labels[i][1]
			//tgeometry.lookAt(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z));
		}
	}
    rS( 'UpdateGeometry' ).start();
	//const sizes = galGeometry.attributes.size.array;
	//for (let j = 0; j < particles; j++ ) {
	//	sizes[j] = 1.0 * ( sizes[j] + 0.025 * Math.sin( 0.1 * j + time ) );
	//}
	//galGeometry.attributes.size.needsUpdate = true;
    rS( 'UpdateGeometry' ).end();

	if (capturing) {
		capturer.capture(renderer.domElement);
	}
    rS( 'frame' ).end();
    rS().update();
}

// Create a capturer that exports a WebM video
var capturing = false;
var capturer = new CCapture( { format: 'webm', framerate:30, name:'test' } );
