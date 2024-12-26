// If you only use `npm` you can simply
// import { Chart } from "wasm-demo" and remove `setup` call from `bootstrap.js`.
class Chart {}

const canvas = document.getElementById("canvas");
const canvas_div = document.getElementById("canvas_div");
const coord = document.getElementById("coord");
const plotType = document.getElementById("plot-type");
const pitch = document.getElementById("pitch");
const yaw = document.getElementById("yaw");
const baseline = document.getElementById("baseline");
const pbeam = document.getElementById("pbeam");

const phi = document.getElementById("phi");
const frequency = document.getElementById("frequency");
const frequency_channels = document.getElementById("frequency_channels");
const declination = document.getElementById("declination");

//const control = document.getElementById("3d-control");
const control = document.getElementById("interferometer-control");
const control_uvcov = document.getElementById("uvcov-control");
const status = document.getElementById("status");

let chart = null;

/** Main entry point */
export function main() {
	let hash = location.hash.substr(1);
	for(var i = 0; i < plotType.options.length; i++) {
		if(hash == plotType.options[i].value) {
			plotType.value = hash;
		}
	}
    setupUI();
    setupCanvas();
}

/** This function is used in `bootstrap.js` to setup imports. */
export function setup(WasmChart) {
    Chart = WasmChart;
}

/** Add event listeners. */
function setupUI() {
    status.innerText = "WebAssembly loaded!";
    plotType.addEventListener("change", updatePlot);
	baseline.addEventListener("change", updatePlot);
	baseline.addEventListener("input", updatePlot);
	pbeam.addEventListener("change", updatePlot);
	pbeam.addEventListener("input", updatePlot);
	phi.addEventListener("change", updatePlot);
	phi.addEventListener("input", updatePlot);
	frequency.addEventListener("change", updatePlot);
	frequency.addEventListener("input", updatePlot);
	frequency_channels.addEventListener("change", updatePlot);
	frequency_channels.addEventListener("input", updatePlot);
	time_channels.addEventListener("change", updatePlot);
	time_channels.addEventListener("input", updatePlot);
	declination.addEventListener("change", updatePlot);
	declination.addEventListener("input", updatePlot);
    window.addEventListener("resize", setupCanvas);
    window.addEventListener("mousemove", onMouseMove);
}

/** Setup canvas to properly handle high DPI and redraw current plot. */
function setupCanvas() {
	//const dpr = window.devicePixelRatio || 1.0;
    //const aspectRatio = canvas.width / canvas.height;
    ////const size = canvas_div.parentNode.offsetWidth * 0.8;
    //const size = canvas_div.parentNode.offsetHeight * 0.8;
    //console.log(dpr, aspectRatio, size);
    //canvas.style.height = size + "px";
    //canvas.style.width = size / aspectRatio + "px";
    //canvas.height = size;
    //canvas.width = size / aspectRatio;
    
    //canvas_div.style.height = size + "px";
    //canvas_div.style.width = size / aspectRatio + "px";
    //canvas_div.height = size;
    //canvas_div.width = size / aspectRatio;

    //canvas.style.width = size + "px";
    //canvas.style.height = size / aspectRatio + "px";
    //canvas.width = size;
    //canvas.height = size / aspectRatio;
    updatePlot();
}

/** Update displayed coordinates. */
function onMouseMove(event) {
    if (chart) {
		var text = "Mouse pointer is out of range";

		if(event.target == canvas) {
			let actualRect = canvas.getBoundingClientRect();
			let logicX = event.offsetX * canvas.width / actualRect.width;
			let logicY = event.offsetY * canvas.height / actualRect.height;
			const point = chart.coord(logicX, logicY);
			text = (point) 
				? `(${point.x.toFixed(3)}, ${point.y.toFixed(3)})`
				: text;
		}
        coord.innerText = text;
    }
}

function updatePlotInterferometerMonochrome() {
	let baseline_value = Number(baseline.value) / 10.0;
	let pbeam_value = Number(pbeam.value) / 100.0;
	coord.innerText = `Baseline length: ${baseline_value.toFixed(2)} m \n Primary beam FWHM:${(pbeam_value * 180/Math.PI).toFixed(2)} deg \n Fringe spacing: ${(180/Math.PI * (299792456 / 144e6) / baseline_value).toFixed(2)} deg`
	Chart.plot_interferometer_monochrome("canvas", baseline_value, 144e6, pbeam_value);
}

function updatePlotUvCoverage() {
	let phi_value = Number(phi.value) / 60.0;
	let t_channels = time_channels.value;
	let freq_value = Number(frequency.value) * 1e6;
	let freq_channels = frequency_channels.value;
    let dec_value = Number(declination.value) * Math.PI / 180.0;
	coord.innerText = `Time into observation: ${phi_value.toFixed(2)} h \n Frequency: ${freq_value.toFixed(2)/1e6} MHz \n Declination: ${(dec_value * 180.0 / Math.PI).toFixed(2)} deg`


    document.getElementById("label_dec").innerText = `Declination: ${(dec_value * 180.0/Math.PI).toFixed(2)} deg`;
    document.getElementById("label_time").innerText = `Time into observation: ${(phi_value).toFixed(2)} h`;
    document.getElementById("label_ntimes").innerText = `Time slots: ${t_channels}`;
    document.getElementById("label_bandwidth").innerText = `Frequency channels: ${freq_channels}`;
    document.getElementById("label_freq").innerText = `Observing frequency: ${freq_value / 1e6} MHz`;
	Chart.plot_interferometer_uvcoverage("canvas", dec_value, freq_value, freq_channels, phi_value, t_channels);
}

/** Redraw currently selected plot. */
function updatePlot() {
    const selected = plotType.selectedOptions[0];
    status.innerText = `Rendering ${selected.innerText}...`;
    chart = null;
    const start = performance.now();
	switch(selected.value) {
		case "mandelbrot":
			control.classList.add("hide");
			chart = Chart.mandelbrot(canvas);
			break;
        case "interferometer-monochrome":
            control.classList.remove("hide");
            control_uvcov.classList.add("hide");
            updatePlotInterferometerMonochrome();
            break;
        case "interferometer-uvcoverage":
            control.classList.add("hide");
            control_uvcov.classList.remove("hide");
            updatePlotUvCoverage();
            break;
		default:
			control.classList.add("hide");
	}
	
    const end = performance.now();
    status.innerText = `Rendered ${selected.innerText} in ${Math.ceil(end - start)}ms`;
}
