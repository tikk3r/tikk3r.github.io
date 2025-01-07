(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: main, setup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main", function() { return main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var wasm_demo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-demo */ "../pkg/wasm_demo.js");
// Code examples used:
// https://github.com/travisdoesmath/n-pendulum-wasm/
// https://d3fc.io/examples/chart-d3fc-zoom/
// https://blog.scottlogic.com/2020/05/01/rendering-one-million-points-with-d3.html
//
// If you only use `npm` you can simply
// import { Chart } from "wasm-demo" and remove `setup` call from `bootstrap.js`.
class Chart {}


const array_selector = document.getElementById("array_selector");
const band_selector = document.getElementById("band_selector");

const phi = document.getElementById("phi");
const duration = document.getElementById("duration");
const frequency = document.getElementById("frequency");
const frequency_channels = document.getElementById("frequency_channels");
const right_ascension = document.getElementById("rightascension");
const declination = document.getElementById("declination");
const colour_points = document.getElementById("checkbox_colour_by_freq");
const reset = document.getElementById("btn_reset_sim");
const btn_save_img = document.getElementById("btn_save_img");

const control_uvcov = document.getElementById("uvcov-control");
const status = document.getElementById("status");
const antennas = document.getElementById("antennas");

const year = document.getElementById("inp_year");
const month = document.getElementById("inp_month");
const day = document.getElementById("inp_day");

var antenna_list = {"LOFAR": ['CS001HBA0', 'CS001HBA1', 'CS002HBA0', 'CS002HBA1', 'CS003HBA0', 'CS003HBA1', 'CS004HBA0', 'CS004HBA1', 'CS005HBA0', 'CS005HBA1', 'CS006HBA0', 'CS006HBA1', 'CS007HBA0', 'CS007HBA1', 'CS011HBA0', 'CS011HBA1', 'CS013HBA0', 'CS013HBA1', 'CS017HBA0', 'CS017HBA1', 'CS021HBA0', 'CS021HBA1', 'CS024HBA0', 'CS024HBA1', 'CS028HBA0', 'CS028HBA1', 'CS030HBA0', 'CS030HBA1', 'CS031HBA0', 'CS031HBA1', 'CS032HBA0', 'CS032HBA1', 'CS101HBA0', 'CS101HBA1', 'CS103HBA0', 'CS103HBA1', 'CS201HBA0', 'CS201HBA1', 'CS301HBA0', 'CS301HBA1', 'CS302HBA0', 'CS302HBA1', 'CS401HBA0', 'CS401HBA1', 'CS501HBA0', 'CS501HBA1', 'RS106HBA', 'RS205HBA', 'RS208HBA', 'RS210HBA', 'RS305HBA', 'RS306HBA', 'RS307HBA', 'RS310HBA', 'RS406HBA', 'RS407HBA', 'RS409HBA', 'RS503HBA', 'RS508HBA', 'RS509HBA', 'DE601HBA', 'DE602HBA', 'DE603HBA', 'DE604HBA', 'DE605HBA', 'FR606HBA', 'SE607HBA', 'UK608HBA', 'DE609HBA', 'PL610HBA', 'PL611HBA', 'PL612HBA', 'IE613HBA', 'LV614HBA', "BG", "IT", "GMRT"].sort(),
    "e-MERLIN": ["Lovell", "MarkII", "Defford", "Knockin", "Pickmere", "Darnhall", "Cambridge"].sort(),
    "LAMBDA": ["Ceduna","Parkes","Narrabri","Hobart","Perth"].sort(),
    "Test": ["PL611HBA", "IE613HBA"].sort()};

/** Add event listeners. */
function setupUI() {
    status.innerText = "WebAssembly loaded!";
	phi.addEventListener("change", updatePlot);
	phi.addEventListener("input", updatePlot);
	duration.addEventListener("change", updatePlot);
	duration.addEventListener("input", updatePlot);
	frequency.addEventListener("change", updatePlot);
	frequency.addEventListener("input", updatePlot);
	frequency_channels.addEventListener("change", updatePlot);
	frequency_channels.addEventListener("input", updatePlot);
	time_channels.addEventListener("change", updatePlot);
	time_channels.addEventListener("input", updatePlot);
	right_ascension.addEventListener("change", updatePlot);
	right_ascension.addEventListener("input", updatePlot);
	declination.addEventListener("change", updatePlot);
	declination.addEventListener("input", updatePlot);
	array_selector.addEventListener("input", updateAntennas);
	array_selector.addEventListener("change", updateAntennas);

	band_selector.addEventListener("input", updateFrequencies);
	band_selector.addEventListener("change", updateFrequencies);

    colour_points.addEventListener("change", updatePlot);
    reset.addEventListener("click", resetSliders);

    year.addEventListener("change", updatePlot);
    month.addEventListener("change", updatePlot);
    day.addEventListener("change", updatePlot);

    updateAntennas();
}

function resetSliders() {
    right_ascension.value = 241;
    declination.value = 55;
    duration.value = 480;
    phi.value = 196.8;
    time_channels.value = 3;
    frequency.value = 120;
    frequency_channels.value = 1;
    year.value = 2021;
    month.value = 5;
    day.value = 13;
    updatePlot();
}

var data = []

const x = d3.scaleLinear().domain([-1250e3, 1250e3]);
const y = d3.scaleLinear().domain([-1250e3, 1250e3]);

const pointSeries = fc
    .seriesWebglPoint( )
    .equals((previousData, currentData) => previousData === currentData)
    .crossValue(d => d.x)
    .mainValue(d => d.y)
    .size(8);

// create a d3fc-zoom that handles the mouse / touch interactions
const zoom = fc.zoom().on('zoom', render);

const gridline = fc.annotationCanvasGridline().xTicks(40).yTicks(40);


const axis = fc
    .axisBottom(x)
    .decorate(sel => {
        sel.enter()
            .append('text')
    .attr('fill', 'red');
    });

// the chart!
const chart = fc
    .chartCartesian(x, y)
    .canvasPlotArea(gridline)
    .webglPlotArea(pointSeries)
    .xLabel("u [λ]")
    .yLabel("v [λ]")
    .decorate(sel => {
        // add the zoom interaction on the enter selection
        // use selectAll to avoid interfering with the existing data joins
        sel.enter()
            .selectAll('.plot-area')
            .call(zoom, x, y);
        sel.enter()
            .selectAll('.x-axis')
            .call(zoom, x, null);
        sel.enter()
            .selectAll('.y-axis')
            .call(zoom, null, y);
    })
    .xDecorate( sel => {
        sel.select('text')
        .attr('transform', 'rotate(-25) translate(0 25)')
        .style('font-size', '16px')
        .style('font-family', 'Spectral');
    })
    .yDecorate( sel => {
        sel.select('text')
        //.attr('transform', 'rotate(-45 35 15)')
        .style('font-size', '16px')
        .style('font-family', 'Spectral')
    });

const webglColor = color => {
  const { r, g, b, opacity } = d3.color(color).rgb();
  return [r / 255, g / 255, b / 255, opacity];
};

function render() {
    // Set new data on your chart:
    //var items = d3.select('#chart').selectAll('*').remove();
    let cv = document.getElementById("chart");

    d3.select('#chart')
        .style("font-size", "32px")
        .style("font-family", "Spectral")
        .datum(data)
        .call(chart);
}

/** Main entry point */
function main() {
    setupUI();
}

/** This function is used in `bootstrap.js` to setup imports. */
function setup(WasmChart) {
    Chart = WasmChart;
}

function toggleButtonsCore() {
    const array = document.querySelector("input[name=array]:checked");
    let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;

    for (var i = 0; i < antenna_list[telescope].length; i++) {
        let ant = antenna_list[telescope][i];
        if (ant.includes("CS")) {
            let checkbox = document.getElementById(ant);
            checkbox.checked = !checkbox.checked;
        }
    }
    updatePlot();
}

function toggleButtonsRemote() {
    const array = document.querySelector("input[name=array]:checked");
    let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;

    for (var i = 0; i < antenna_list[telescope].length; i++) {
        let ant = antenna_list[telescope][i];
        if (ant.includes("RS")) {
            let checkbox = document.getElementById(ant);
            checkbox.checked = !checkbox.checked;
        }
    }
    updatePlot();
}

function toggleButtonsIntl() {
    const array = document.querySelector("input[name=array]:checked");
    let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;

    for (var i = 0; i < antenna_list[telescope].length; i++) {
        let ant = antenna_list[telescope][i];
        if (!ant.includes("CS") && !ant.includes("RS") && !ant.includes("BG") && !ant.includes("IT") && !ant.includes("GMRT")) {
            let checkbox = document.getElementById(ant);
            checkbox.checked = !checkbox.checked;
        }
    }
    updatePlot();
}

function updateFrequencies() {
    const selected_band = document.querySelector("input[name=band]:checked");
    const band = selected_band.id;

    if (band == "HBA") {
        frequency.max = 168;
        frequency.min = 120;
        frequency.value = 120;
    }else if (band == "LBA") {
        frequency.max = 90;
        frequency.min = 10;
        frequency.value = 58;
    }else if (band == "L") {
        frequency.max = 1740;
        frequency.min = 1230;
        frequency.value = 1500;
    }else if (band == "C") {
        frequency.max = 7500;
        frequency.min = 4300;
        frequency.value = 5000;
    }else if (band == "K") {
        frequency.max = 25000;
        frequency.min = 19000;
        frequency.value = 22000;
    } else {
        frequency.max = 168;
        frequency.min = 120;
        frequency.value = 144;
    }
    document.getElementById("label_freq").innerText = `Observing frequency: ${frequency.value} MHz`;
    updatePlot();
}

function updateFrequencyBands(telescope) {
    var bands = [];
    if (telescope == "LOFAR") {
        bands = ["LBA", "HBA"];
    } else if (telescope == "e-MERLIN") {
        bands = ["L", "C", "K"];
    } else {
        bands = ["LBA", "HBA"];
    }

    let freqfield = document.getElementById("freqbands");
    freqfield.innerHTML = '';
    let leg = document.createElement("legend");
    leg.innerHTML = "Observing band";
    freqfield.appendChild(leg);

    let cblist = document.createElement("ul");
    cblist.id = "radiolist";

    var first = true;
    bands.forEach((b) => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.name = "band";
        checkbox.id = b;
        if (telescope == "LOFAR" && b == "HBA") {
            checkbox.checked = true;
            first = false;
        }else if (telescope == "e-MERLIN" && b == "L") {
            checkbox.checked = true;
            first = false;
        } else {
            checkbox.checked = true;
            first = false;
        }
        checkbox.addEventListener('change', updateFrequencies);

        let label= document.createElement("label");
        label.for = b;
        label.appendChild(checkbox);

        let description = document.createTextNode(b);
        label.appendChild(description);

        li.appendChild(label);
        cblist.appendChild(li);
    });
    freqfield.appendChild(cblist);
    updateFrequencies();
}

function updateAntennas() {
    const array = document.querySelector("input[name=array]:checked");
    let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;

    antennas.innerHTML = '';
    let leg = document.createElement("legend");
    leg.innerHTML = "Antennas";
    antennas.appendChild(leg);
    
    if (telescope == "LOFAR") {
        let btn_core = document.createElement("input");
        btn_core.type = "button";
        btn_core.id = "btn_lofar_core";
        btn_core.value = "Toggle\nCS"
        btn_core.classList.add("button");
        btn_core.addEventListener('click', toggleButtonsCore);

        let btn_remote = document.createElement("input");
        btn_remote.type = "button";
        btn_remote.id = "btn_lofar_remote";
        btn_remote.value = "Toggle\nRS"
        btn_remote.classList.add("button");
        btn_remote.addEventListener('click', toggleButtonsRemote);

        let btn_intl = document.createElement("input");
        btn_intl.type = "button";
        btn_intl.id = "btn_lofar_intl";
        btn_intl.value = "Toggle\nIntl."
        btn_intl.classList.add("button");
        btn_intl.addEventListener('click', toggleButtonsIntl);

        antennas.appendChild(btn_core);
        antennas.appendChild(btn_remote);
        antennas.appendChild(btn_intl);
        antennas.appendChild(document.createElement("br"));
        antennas.appendChild(document.createElement("br"));
    }

    let cblist = document.createElement("ul");
    cblist.id = "checkboxlist";
    for (var i = 0; i < antenna_list[telescope].length; i++) {
        let ant = antenna_list[telescope][i];

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = ant;
        checkbox.id = ant;
        checkbox.value = `include_${ant}`;
        if (ant.includes("CS") || ant.includes("BG") || ant.includes("IT") || ant.includes("GMRT")) {
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
        }
        checkbox.addEventListener('change', updatePlot);

        let label= document.createElement("label");
        label.appendChild(checkbox);

        let description = document.createTextNode(ant);
        label.appendChild(description);

        li.appendChild(label);
        cblist.appendChild(li);
    }
    antennas.appendChild(cblist);
    updateFrequencyBands(telescope);
    updatePlot();
}

function updatePlotUvCoverage() {
	//let phi_value = Number(phi.value) / 60.0 - 6;
	let phi_value = Number(phi.value) / 10.0;
	let duration_value = Number(duration.value) / 60.0;
	let t_channels = time_channels.value;
    const TSLOT_LIMIT = 20;
    if (t_channels > duration_value * TSLOT_LIMIT) {
        t_channels = Math.ceil(duration_value * TSLOT_LIMIT);
    }
	let freq_value = Number(frequency.value) * 1e6;
	let freq_channels = frequency_channels.value;
    let ra_value = Number(right_ascension.value);
    let dec_value = Number(declination.value) * Math.PI / 180.0;

    const array = document.querySelector("input[name=array]:checked");
    let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;

    let ra_h = ra_value * 24/360;
    document.getElementById("label_ra").innerText = `Right ascension: ${(ra_value).toFixed(2)} deg // ${Math.floor(ra_h)}h${Math.floor(((ra_h - Math.floor(ra_h))*60))}m`;
    document.getElementById("label_dec").innerText = `Declination w.r.t. celestial equator: ${(dec_value * 180.0/Math.PI).toFixed(2)} deg`;
    document.getElementById("label_time").innerText = `Observation start: ${Math.floor(phi_value)}h${Math.floor(((phi_value - Math.floor(phi_value))*60))}m`;
    document.getElementById("label_itime").innerText = `Integration time: ${duration_value.toFixed(2)} h`;
    document.getElementById("label_ntimes").innerText = `Time samples: ${t_channels}`;
    document.getElementById("label_bandwidth").innerText = `Frequency channels: ${freq_channels}`;
    document.getElementById("label_freq").innerText = `Observing frequency: ${freq_value / 1e6} MHz`;

    let antmask = new Uint8Array(antenna_list[telescope].length);
    for (var i = 0; i < antenna_list[telescope].length; i++) {
        let ant = antenna_list[telescope][i];
        let cb = document.getElementById(ant);
        antmask[i] = cb.checked ? 1 : 0;
    }
    for (var i = 0; i < antmask.length; i++) {
        let ant = antenna_list[telescope][i];
    }

    let obs_date = new Int32Array([year.value, month.value, day.value]);

	let uvptr = Chart.plot_interferometer_uvcoverage(ra_value * Math.PI / 180.0, dec_value, freq_value, freq_channels, phi_value, duration_value, t_channels, obs_date, telescope, antmask);
    var Nant = 0;
    if (telescope == "LOFAR") {
        Nant = 71;
    } else if (telescope == "e-MERLIN") {
        Nant = 7;
    }
    Nant = antmask.reduce((a, b) => a + b, 0);
    let Nbaselines = Nant * (Nant - 1) / 2;
    let Nvalues = ((Nant + Nbaselines)) * freq_channels * t_channels * 2;
    const memory = Object(wasm_demo__WEBPACK_IMPORTED_MODULE_0__["shared_memory"])();
    let uv_points = new Float32Array(memory.buffer, uvptr, Nvalues);

    let arr = Array.from(uv_points);
    let full_uv = arr.flatMap((coord) => [coord, -coord]);
    let freqs = [];
    let a = 0;
    for(a; a<=freq_channels; a++){
        freqs.push(freq_value + a * 5e6);
    }
    data = [];
    let freq_idx = -1;

    /*
    // Iterate per 2 because we have u, -u, v, -v in the array.
    // For every time slot
    // Nbaselines + Nant antenna points
    // freq_channels frequency points
    let t = -1;
    d3.range(0, uv_points.length+2, 2).forEach(d => {
        let trem = d % (2 * (((Nbaselines + Nant) * freq_channels)));
        let frem = d % (2 * (((Nbaselines + Nant))));
        if (trem == 0) {
            t += 1;
            freq_idx = -1;
        }
        if (frem == 0) {
            freq_idx += 1;
        }
        data.push({x: uv_points[d], y: uv_points[d+1], freq: freqs[freq_idx]});
        data.push({x: -uv_points[d], y: -uv_points[d+1], freq: freqs[freq_idx]});
    });
    */
    d3.range(0, uv_points.length, 2).forEach(i => {
        freq_idx = (i % (2 * freq_channels)) / 2;
        data.push({x: uv_points[i], y: uv_points[i+1], freq: freqs[freq_idx]});
        data.push({x: -uv_points[i], y: -uv_points[i+1], freq: freqs[freq_idx]});
    });

    if (colour_points.checked) {
        const freqColorScale = d3
          .scaleSequential()
          //.domain([freq_value + 50e6, freq_value])
          .domain([freq_value, freq_value + 50e6])
          .interpolator(d3.interpolateSpectral);
          //.interpolator(d3.interpolateYlGnBu);
          //.interpolator(d3.interpolateRdYlGn);

        let fillColor = fc
          .webglFillColor()
          .value(d => webglColor(freqColorScale(d.freq)))
          .data(data);

        pointSeries.decorate(program => fillColor(program));
    } else {
        let fillColor = fc
          .webglFillColor()
          .value(d => [0, 0, 0, 1])
          .data(data);

        pointSeries.decorate(program => fillColor(program));
    }
    render();
    return uv_points.length / 2;
}

function updatePlot() {
    status.innerText = `Rendering ...`;
    const start = performance.now();
    let Npoints = updatePlotUvCoverage();
    const end = performance.now();
    if (Npoints) {
        const array = document.querySelector("input[name=array]:checked");
        let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;
        status.innerText = `UV points rendered: ${Npoints}\nRender time: ${Math.ceil(end - start)}ms`;
    } else {
        status.innerText = `Rendered in ${Math.ceil(end - start)}ms`;
    }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDMEM7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsU0FBUyxtQkFBbUI7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF3RCxTQUFTOztBQUVqRSxtQkFBbUIsb0NBQW9DO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF3RCxTQUFTOztBQUVqRSxtQkFBbUIsb0NBQW9DO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF3RCxTQUFTOztBQUVqRSxtQkFBbUIsb0NBQW9DO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSxnQkFBZ0I7QUFDOUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdELFNBQVM7O0FBRWpFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0NBQW9DO0FBQ3ZEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLElBQUk7QUFDeEM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0RBQXdELFNBQVM7O0FBRWpFO0FBQ0Esd0VBQXdFLHNCQUFzQixVQUFVLGlCQUFpQixHQUFHLDJDQUEyQztBQUN2Syw4RkFBOEYsdUNBQXVDO0FBQ3JJLDRFQUE0RSxzQkFBc0IsR0FBRyxxREFBcUQ7QUFDMUosNEVBQTRFLDBCQUEwQjtBQUN0Ryx5RUFBeUUsV0FBVztBQUNwRixrRkFBa0YsY0FBYztBQUNoRyw4RUFBOEUsaUJBQWlCOztBQUUvRjtBQUNBLG1CQUFtQixvQ0FBb0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrREFBYTtBQUNoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0JBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDBEQUEwRDtBQUM3RSxtQkFBbUIsNERBQTREO0FBQy9FLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMERBQTBEO0FBQzdFLG1CQUFtQiw0REFBNEQ7QUFDL0UsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsU0FBUztBQUNyRSxrREFBa0QsUUFBUSxpQkFBaUIsdUJBQXVCO0FBQ2xHLEtBQUs7QUFDTCwwQ0FBMEMsdUJBQXVCO0FBQ2pFO0FBQ0EiLCJmaWxlIjoiMS5ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb2RlIGV4YW1wbGVzIHVzZWQ6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdHJhdmlzZG9lc21hdGgvbi1wZW5kdWx1bS13YXNtL1xuLy8gaHR0cHM6Ly9kM2ZjLmlvL2V4YW1wbGVzL2NoYXJ0LWQzZmMtem9vbS9cbi8vIGh0dHBzOi8vYmxvZy5zY290dGxvZ2ljLmNvbS8yMDIwLzA1LzAxL3JlbmRlcmluZy1vbmUtbWlsbGlvbi1wb2ludHMtd2l0aC1kMy5odG1sXG4vL1xuLy8gSWYgeW91IG9ubHkgdXNlIGBucG1gIHlvdSBjYW4gc2ltcGx5XG4vLyBpbXBvcnQgeyBDaGFydCB9IGZyb20gXCJ3YXNtLWRlbW9cIiBhbmQgcmVtb3ZlIGBzZXR1cGAgY2FsbCBmcm9tIGBib290c3RyYXAuanNgLlxuY2xhc3MgQ2hhcnQge31cbmltcG9ydCB7IHNoYXJlZF9tZW1vcnkgfSBmcm9tIFwid2FzbS1kZW1vXCI7XG5cbmNvbnN0IGFycmF5X3NlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcnJheV9zZWxlY3RvclwiKTtcbmNvbnN0IGJhbmRfc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhbmRfc2VsZWN0b3JcIik7XG5cbmNvbnN0IHBoaSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGhpXCIpO1xuY29uc3QgZHVyYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1cmF0aW9uXCIpO1xuY29uc3QgZnJlcXVlbmN5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmVxdWVuY3lcIik7XG5jb25zdCBmcmVxdWVuY3lfY2hhbm5lbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyZXF1ZW5jeV9jaGFubmVsc1wiKTtcbmNvbnN0IHJpZ2h0X2FzY2Vuc2lvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmlnaHRhc2NlbnNpb25cIik7XG5jb25zdCBkZWNsaW5hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVjbGluYXRpb25cIik7XG5jb25zdCBjb2xvdXJfcG9pbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVja2JveF9jb2xvdXJfYnlfZnJlcVwiKTtcbmNvbnN0IHJlc2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5fcmVzZXRfc2ltXCIpO1xuY29uc3QgYnRuX3NhdmVfaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5fc2F2ZV9pbWdcIik7XG5cbmNvbnN0IGNvbnRyb2xfdXZjb3YgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInV2Y292LWNvbnRyb2xcIik7XG5jb25zdCBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c1wiKTtcbmNvbnN0IGFudGVubmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnRlbm5hc1wiKTtcblxuY29uc3QgeWVhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wX3llYXJcIik7XG5jb25zdCBtb250aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wX21vbnRoXCIpO1xuY29uc3QgZGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnBfZGF5XCIpO1xuXG52YXIgYW50ZW5uYV9saXN0ID0ge1wiTE9GQVJcIjogWydDUzAwMUhCQTAnLCAnQ1MwMDFIQkExJywgJ0NTMDAySEJBMCcsICdDUzAwMkhCQTEnLCAnQ1MwMDNIQkEwJywgJ0NTMDAzSEJBMScsICdDUzAwNEhCQTAnLCAnQ1MwMDRIQkExJywgJ0NTMDA1SEJBMCcsICdDUzAwNUhCQTEnLCAnQ1MwMDZIQkEwJywgJ0NTMDA2SEJBMScsICdDUzAwN0hCQTAnLCAnQ1MwMDdIQkExJywgJ0NTMDExSEJBMCcsICdDUzAxMUhCQTEnLCAnQ1MwMTNIQkEwJywgJ0NTMDEzSEJBMScsICdDUzAxN0hCQTAnLCAnQ1MwMTdIQkExJywgJ0NTMDIxSEJBMCcsICdDUzAyMUhCQTEnLCAnQ1MwMjRIQkEwJywgJ0NTMDI0SEJBMScsICdDUzAyOEhCQTAnLCAnQ1MwMjhIQkExJywgJ0NTMDMwSEJBMCcsICdDUzAzMEhCQTEnLCAnQ1MwMzFIQkEwJywgJ0NTMDMxSEJBMScsICdDUzAzMkhCQTAnLCAnQ1MwMzJIQkExJywgJ0NTMTAxSEJBMCcsICdDUzEwMUhCQTEnLCAnQ1MxMDNIQkEwJywgJ0NTMTAzSEJBMScsICdDUzIwMUhCQTAnLCAnQ1MyMDFIQkExJywgJ0NTMzAxSEJBMCcsICdDUzMwMUhCQTEnLCAnQ1MzMDJIQkEwJywgJ0NTMzAySEJBMScsICdDUzQwMUhCQTAnLCAnQ1M0MDFIQkExJywgJ0NTNTAxSEJBMCcsICdDUzUwMUhCQTEnLCAnUlMxMDZIQkEnLCAnUlMyMDVIQkEnLCAnUlMyMDhIQkEnLCAnUlMyMTBIQkEnLCAnUlMzMDVIQkEnLCAnUlMzMDZIQkEnLCAnUlMzMDdIQkEnLCAnUlMzMTBIQkEnLCAnUlM0MDZIQkEnLCAnUlM0MDdIQkEnLCAnUlM0MDlIQkEnLCAnUlM1MDNIQkEnLCAnUlM1MDhIQkEnLCAnUlM1MDlIQkEnLCAnREU2MDFIQkEnLCAnREU2MDJIQkEnLCAnREU2MDNIQkEnLCAnREU2MDRIQkEnLCAnREU2MDVIQkEnLCAnRlI2MDZIQkEnLCAnU0U2MDdIQkEnLCAnVUs2MDhIQkEnLCAnREU2MDlIQkEnLCAnUEw2MTBIQkEnLCAnUEw2MTFIQkEnLCAnUEw2MTJIQkEnLCAnSUU2MTNIQkEnLCAnTFY2MTRIQkEnLCBcIkJHXCIsIFwiSVRcIiwgXCJHTVJUXCJdLnNvcnQoKSxcbiAgICBcImUtTUVSTElOXCI6IFtcIkxvdmVsbFwiLCBcIk1hcmtJSVwiLCBcIkRlZmZvcmRcIiwgXCJLbm9ja2luXCIsIFwiUGlja21lcmVcIiwgXCJEYXJuaGFsbFwiLCBcIkNhbWJyaWRnZVwiXS5zb3J0KCksXG4gICAgXCJMQU1CREFcIjogW1wiQ2VkdW5hXCIsXCJQYXJrZXNcIixcIk5hcnJhYnJpXCIsXCJIb2JhcnRcIixcIlBlcnRoXCJdLnNvcnQoKSxcbiAgICBcIlRlc3RcIjogW1wiUEw2MTFIQkFcIiwgXCJJRTYxM0hCQVwiXS5zb3J0KCl9O1xuXG4vKiogQWRkIGV2ZW50IGxpc3RlbmVycy4gKi9cbmZ1bmN0aW9uIHNldHVwVUkoKSB7XG4gICAgc3RhdHVzLmlubmVyVGV4dCA9IFwiV2ViQXNzZW1ibHkgbG9hZGVkIVwiO1xuXHRwaGkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcblx0cGhpLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVQbG90KTtcblx0ZHVyYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcblx0ZHVyYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVBsb3QpO1xuXHRmcmVxdWVuY3kuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcblx0ZnJlcXVlbmN5LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVQbG90KTtcblx0ZnJlcXVlbmN5X2NoYW5uZWxzLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdGZyZXF1ZW5jeV9jaGFubmVscy5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdHRpbWVfY2hhbm5lbHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcblx0dGltZV9jaGFubmVscy5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdHJpZ2h0X2FzY2Vuc2lvbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuXHRyaWdodF9hc2NlbnNpb24uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVBsb3QpO1xuXHRkZWNsaW5hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuXHRkZWNsaW5hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdGFycmF5X3NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVBbnRlbm5hcyk7XG5cdGFycmF5X3NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlQW50ZW5uYXMpO1xuXG5cdGJhbmRfc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZUZyZXF1ZW5jaWVzKTtcblx0YmFuZF9zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZUZyZXF1ZW5jaWVzKTtcblxuICAgIGNvbG91cl9wb2ludHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcbiAgICByZXNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVzZXRTbGlkZXJzKTtcblxuICAgIHllYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcbiAgICBtb250aC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuICAgIGRheS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuXG4gICAgdXBkYXRlQW50ZW5uYXMoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRTbGlkZXJzKCkge1xuICAgIHJpZ2h0X2FzY2Vuc2lvbi52YWx1ZSA9IDI0MTtcbiAgICBkZWNsaW5hdGlvbi52YWx1ZSA9IDU1O1xuICAgIGR1cmF0aW9uLnZhbHVlID0gNDgwO1xuICAgIHBoaS52YWx1ZSA9IDE5Ni44O1xuICAgIHRpbWVfY2hhbm5lbHMudmFsdWUgPSAzO1xuICAgIGZyZXF1ZW5jeS52YWx1ZSA9IDEyMDtcbiAgICBmcmVxdWVuY3lfY2hhbm5lbHMudmFsdWUgPSAxO1xuICAgIHllYXIudmFsdWUgPSAyMDIxO1xuICAgIG1vbnRoLnZhbHVlID0gNTtcbiAgICBkYXkudmFsdWUgPSAxMztcbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbnZhciBkYXRhID0gW11cblxuY29uc3QgeCA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFstMTI1MGUzLCAxMjUwZTNdKTtcbmNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbLTEyNTBlMywgMTI1MGUzXSk7XG5cbmNvbnN0IHBvaW50U2VyaWVzID0gZmNcbiAgICAuc2VyaWVzV2ViZ2xQb2ludCggKVxuICAgIC5lcXVhbHMoKHByZXZpb3VzRGF0YSwgY3VycmVudERhdGEpID0+IHByZXZpb3VzRGF0YSA9PT0gY3VycmVudERhdGEpXG4gICAgLmNyb3NzVmFsdWUoZCA9PiBkLngpXG4gICAgLm1haW5WYWx1ZShkID0+IGQueSlcbiAgICAuc2l6ZSg4KTtcblxuLy8gY3JlYXRlIGEgZDNmYy16b29tIHRoYXQgaGFuZGxlcyB0aGUgbW91c2UgLyB0b3VjaCBpbnRlcmFjdGlvbnNcbmNvbnN0IHpvb20gPSBmYy56b29tKCkub24oJ3pvb20nLCByZW5kZXIpO1xuXG5jb25zdCBncmlkbGluZSA9IGZjLmFubm90YXRpb25DYW52YXNHcmlkbGluZSgpLnhUaWNrcyg0MCkueVRpY2tzKDQwKTtcblxuXG5jb25zdCBheGlzID0gZmNcbiAgICAuYXhpc0JvdHRvbSh4KVxuICAgIC5kZWNvcmF0ZShzZWwgPT4ge1xuICAgICAgICBzZWwuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgLmF0dHIoJ2ZpbGwnLCAncmVkJyk7XG4gICAgfSk7XG5cbi8vIHRoZSBjaGFydCFcbmNvbnN0IGNoYXJ0ID0gZmNcbiAgICAuY2hhcnRDYXJ0ZXNpYW4oeCwgeSlcbiAgICAuY2FudmFzUGxvdEFyZWEoZ3JpZGxpbmUpXG4gICAgLndlYmdsUGxvdEFyZWEocG9pbnRTZXJpZXMpXG4gICAgLnhMYWJlbChcInUgW867XVwiKVxuICAgIC55TGFiZWwoXCJ2IFvOu11cIilcbiAgICAuZGVjb3JhdGUoc2VsID0+IHtcbiAgICAgICAgLy8gYWRkIHRoZSB6b29tIGludGVyYWN0aW9uIG9uIHRoZSBlbnRlciBzZWxlY3Rpb25cbiAgICAgICAgLy8gdXNlIHNlbGVjdEFsbCB0byBhdm9pZCBpbnRlcmZlcmluZyB3aXRoIHRoZSBleGlzdGluZyBkYXRhIGpvaW5zXG4gICAgICAgIHNlbC5lbnRlcigpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucGxvdC1hcmVhJylcbiAgICAgICAgICAgIC5jYWxsKHpvb20sIHgsIHkpO1xuICAgICAgICBzZWwuZW50ZXIoKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLngtYXhpcycpXG4gICAgICAgICAgICAuY2FsbCh6b29tLCB4LCBudWxsKTtcbiAgICAgICAgc2VsLmVudGVyKClcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy55LWF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoem9vbSwgbnVsbCwgeSk7XG4gICAgfSlcbiAgICAueERlY29yYXRlKCBzZWwgPT4ge1xuICAgICAgICBzZWwuc2VsZWN0KCd0ZXh0JylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTI1KSB0cmFuc2xhdGUoMCAyNSknKVxuICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsICcxNnB4JylcbiAgICAgICAgLnN0eWxlKCdmb250LWZhbWlseScsICdTcGVjdHJhbCcpO1xuICAgIH0pXG4gICAgLnlEZWNvcmF0ZSggc2VsID0+IHtcbiAgICAgICAgc2VsLnNlbGVjdCgndGV4dCcpXG4gICAgICAgIC8vLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTQ1IDM1IDE1KScpXG4gICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgJzE2cHgnKVxuICAgICAgICAuc3R5bGUoJ2ZvbnQtZmFtaWx5JywgJ1NwZWN0cmFsJylcbiAgICB9KTtcblxuY29uc3Qgd2ViZ2xDb2xvciA9IGNvbG9yID0+IHtcbiAgY29uc3QgeyByLCBnLCBiLCBvcGFjaXR5IH0gPSBkMy5jb2xvcihjb2xvcikucmdiKCk7XG4gIHJldHVybiBbciAvIDI1NSwgZyAvIDI1NSwgYiAvIDI1NSwgb3BhY2l0eV07XG59O1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8gU2V0IG5ldyBkYXRhIG9uIHlvdXIgY2hhcnQ6XG4gICAgLy92YXIgaXRlbXMgPSBkMy5zZWxlY3QoJyNjaGFydCcpLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuICAgIGxldCBjdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcnRcIik7XG5cbiAgICBkMy5zZWxlY3QoJyNjaGFydCcpXG4gICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjMycHhcIilcbiAgICAgICAgLnN0eWxlKFwiZm9udC1mYW1pbHlcIiwgXCJTcGVjdHJhbFwiKVxuICAgICAgICAuZGF0dW0oZGF0YSlcbiAgICAgICAgLmNhbGwoY2hhcnQpO1xufVxuXG4vKiogTWFpbiBlbnRyeSBwb2ludCAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgc2V0dXBVSSgpO1xufVxuXG4vKiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGluIGBib290c3RyYXAuanNgIHRvIHNldHVwIGltcG9ydHMuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoV2FzbUNoYXJ0KSB7XG4gICAgQ2hhcnQgPSBXYXNtQ2hhcnQ7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJ1dHRvbnNDb3JlKCkge1xuICAgIGNvbnN0IGFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9YXJyYXldOmNoZWNrZWRcIik7XG4gICAgbGV0IHRlbGVzY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj0ke2FycmF5LmlkfV1gKS5pbm5lckhUTUw7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICAgICAgaWYgKGFudC5pbmNsdWRlcyhcIkNTXCIpKSB7XG4gICAgICAgICAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbnQpO1xuICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZVBsb3QoKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQnV0dG9uc1JlbW90ZSgpIHtcbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYW50ID0gYW50ZW5uYV9saXN0W3RlbGVzY29wZV1baV07XG4gICAgICAgIGlmIChhbnQuaW5jbHVkZXMoXCJSU1wiKSkge1xuICAgICAgICAgICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW50KTtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJ1dHRvbnNJbnRsKCkge1xuICAgIGNvbnN0IGFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9YXJyYXldOmNoZWNrZWRcIik7XG4gICAgbGV0IHRlbGVzY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj0ke2FycmF5LmlkfV1gKS5pbm5lckhUTUw7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICAgICAgaWYgKCFhbnQuaW5jbHVkZXMoXCJDU1wiKSAmJiAhYW50LmluY2x1ZGVzKFwiUlNcIikgJiYgIWFudC5pbmNsdWRlcyhcIkJHXCIpICYmICFhbnQuaW5jbHVkZXMoXCJJVFwiKSAmJiAhYW50LmluY2x1ZGVzKFwiR01SVFwiKSkge1xuICAgICAgICAgICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW50KTtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZyZXF1ZW5jaWVzKCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX2JhbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1iYW5kXTpjaGVja2VkXCIpO1xuICAgIGNvbnN0IGJhbmQgPSBzZWxlY3RlZF9iYW5kLmlkO1xuXG4gICAgaWYgKGJhbmQgPT0gXCJIQkFcIikge1xuICAgICAgICBmcmVxdWVuY3kubWF4ID0gMTY4O1xuICAgICAgICBmcmVxdWVuY3kubWluID0gMTIwO1xuICAgICAgICBmcmVxdWVuY3kudmFsdWUgPSAxMjA7XG4gICAgfWVsc2UgaWYgKGJhbmQgPT0gXCJMQkFcIikge1xuICAgICAgICBmcmVxdWVuY3kubWF4ID0gOTA7XG4gICAgICAgIGZyZXF1ZW5jeS5taW4gPSAxMDtcbiAgICAgICAgZnJlcXVlbmN5LnZhbHVlID0gNTg7XG4gICAgfWVsc2UgaWYgKGJhbmQgPT0gXCJMXCIpIHtcbiAgICAgICAgZnJlcXVlbmN5Lm1heCA9IDE3NDA7XG4gICAgICAgIGZyZXF1ZW5jeS5taW4gPSAxMjMwO1xuICAgICAgICBmcmVxdWVuY3kudmFsdWUgPSAxNTAwO1xuICAgIH1lbHNlIGlmIChiYW5kID09IFwiQ1wiKSB7XG4gICAgICAgIGZyZXF1ZW5jeS5tYXggPSA3NTAwO1xuICAgICAgICBmcmVxdWVuY3kubWluID0gNDMwMDtcbiAgICAgICAgZnJlcXVlbmN5LnZhbHVlID0gNTAwMDtcbiAgICB9ZWxzZSBpZiAoYmFuZCA9PSBcIktcIikge1xuICAgICAgICBmcmVxdWVuY3kubWF4ID0gMjUwMDA7XG4gICAgICAgIGZyZXF1ZW5jeS5taW4gPSAxOTAwMDtcbiAgICAgICAgZnJlcXVlbmN5LnZhbHVlID0gMjIwMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZnJlcXVlbmN5Lm1heCA9IDE2ODtcbiAgICAgICAgZnJlcXVlbmN5Lm1pbiA9IDEyMDtcbiAgICAgICAgZnJlcXVlbmN5LnZhbHVlID0gMTQ0O1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2ZyZXFcIikuaW5uZXJUZXh0ID0gYE9ic2VydmluZyBmcmVxdWVuY3k6ICR7ZnJlcXVlbmN5LnZhbHVlfSBNSHpgO1xuICAgIHVwZGF0ZVBsb3QoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRnJlcXVlbmN5QmFuZHModGVsZXNjb3BlKSB7XG4gICAgdmFyIGJhbmRzID0gW107XG4gICAgaWYgKHRlbGVzY29wZSA9PSBcIkxPRkFSXCIpIHtcbiAgICAgICAgYmFuZHMgPSBbXCJMQkFcIiwgXCJIQkFcIl07XG4gICAgfSBlbHNlIGlmICh0ZWxlc2NvcGUgPT0gXCJlLU1FUkxJTlwiKSB7XG4gICAgICAgIGJhbmRzID0gW1wiTFwiLCBcIkNcIiwgXCJLXCJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbmRzID0gW1wiTEJBXCIsIFwiSEJBXCJdO1xuICAgIH1cblxuICAgIGxldCBmcmVxZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyZXFiYW5kc1wiKTtcbiAgICBmcmVxZmllbGQuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IGxlZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgbGVnLmlubmVySFRNTCA9IFwiT2JzZXJ2aW5nIGJhbmRcIjtcbiAgICBmcmVxZmllbGQuYXBwZW5kQ2hpbGQobGVnKTtcblxuICAgIGxldCBjYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgY2JsaXN0LmlkID0gXCJyYWRpb2xpc3RcIjtcblxuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgYmFuZHMuZm9yRWFjaCgoYikgPT4ge1xuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICAgICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBjaGVja2JveC50eXBlID0gXCJyYWRpb1wiO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gXCJiYW5kXCI7XG4gICAgICAgIGNoZWNrYm94LmlkID0gYjtcbiAgICAgICAgaWYgKHRlbGVzY29wZSA9PSBcIkxPRkFSXCIgJiYgYiA9PSBcIkhCQVwiKSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgIH1lbHNlIGlmICh0ZWxlc2NvcGUgPT0gXCJlLU1FUkxJTlwiICYmIGIgPT0gXCJMXCIpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVGcmVxdWVuY2llcyk7XG5cbiAgICAgICAgbGV0IGxhYmVsPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGxhYmVsLmZvciA9IGI7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShiKTtcbiAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgY2JsaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgICBmcmVxZmllbGQuYXBwZW5kQ2hpbGQoY2JsaXN0KTtcbiAgICB1cGRhdGVGcmVxdWVuY2llcygpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbnRlbm5hcygpIHtcbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgYW50ZW5uYXMuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IGxlZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgbGVnLmlubmVySFRNTCA9IFwiQW50ZW5uYXNcIjtcbiAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChsZWcpO1xuICAgIFxuICAgIGlmICh0ZWxlc2NvcGUgPT0gXCJMT0ZBUlwiKSB7XG4gICAgICAgIGxldCBidG5fY29yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX2NvcmUudHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bl9jb3JlLmlkID0gXCJidG5fbG9mYXJfY29yZVwiO1xuICAgICAgICBidG5fY29yZS52YWx1ZSA9IFwiVG9nZ2xlXFxuQ1NcIlxuICAgICAgICBidG5fY29yZS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5fY29yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNDb3JlKTtcblxuICAgICAgICBsZXQgYnRuX3JlbW90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX3JlbW90ZS50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuX3JlbW90ZS5pZCA9IFwiYnRuX2xvZmFyX3JlbW90ZVwiO1xuICAgICAgICBidG5fcmVtb3RlLnZhbHVlID0gXCJUb2dnbGVcXG5SU1wiXG4gICAgICAgIGJ0bl9yZW1vdGUuY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuX3JlbW90ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNSZW1vdGUpO1xuXG4gICAgICAgIGxldCBidG5faW50bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX2ludGwudHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bl9pbnRsLmlkID0gXCJidG5fbG9mYXJfaW50bFwiO1xuICAgICAgICBidG5faW50bC52YWx1ZSA9IFwiVG9nZ2xlXFxuSW50bC5cIlxuICAgICAgICBidG5faW50bC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5faW50bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNJbnRsKTtcblxuICAgICAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChidG5fY29yZSk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGJ0bl9yZW1vdGUpO1xuICAgICAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChidG5faW50bCk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgfVxuXG4gICAgbGV0IGNibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBjYmxpc3QuaWQgPSBcImNoZWNrYm94bGlzdFwiO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW50ZW5uYV9saXN0W3RlbGVzY29wZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGFudCA9IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdW2ldO1xuXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBhbnQ7XG4gICAgICAgIGNoZWNrYm94LmlkID0gYW50O1xuICAgICAgICBjaGVja2JveC52YWx1ZSA9IGBpbmNsdWRlXyR7YW50fWA7XG4gICAgICAgIGlmIChhbnQuaW5jbHVkZXMoXCJDU1wiKSB8fCBhbnQuaW5jbHVkZXMoXCJCR1wiKSB8fCBhbnQuaW5jbHVkZXMoXCJJVFwiKSB8fCBhbnQuaW5jbHVkZXMoXCJHTVJUXCIpKSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVQbG90KTtcblxuICAgICAgICBsZXQgbGFiZWw9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFudCk7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNibGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGNibGlzdCk7XG4gICAgdXBkYXRlRnJlcXVlbmN5QmFuZHModGVsZXNjb3BlKTtcbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsb3RVdkNvdmVyYWdlKCkge1xuXHQvL2xldCBwaGlfdmFsdWUgPSBOdW1iZXIocGhpLnZhbHVlKSAvIDYwLjAgLSA2O1xuXHRsZXQgcGhpX3ZhbHVlID0gTnVtYmVyKHBoaS52YWx1ZSkgLyAxMC4wO1xuXHRsZXQgZHVyYXRpb25fdmFsdWUgPSBOdW1iZXIoZHVyYXRpb24udmFsdWUpIC8gNjAuMDtcblx0bGV0IHRfY2hhbm5lbHMgPSB0aW1lX2NoYW5uZWxzLnZhbHVlO1xuICAgIGNvbnN0IFRTTE9UX0xJTUlUID0gMjA7XG4gICAgaWYgKHRfY2hhbm5lbHMgPiBkdXJhdGlvbl92YWx1ZSAqIFRTTE9UX0xJTUlUKSB7XG4gICAgICAgIHRfY2hhbm5lbHMgPSBNYXRoLmNlaWwoZHVyYXRpb25fdmFsdWUgKiBUU0xPVF9MSU1JVCk7XG4gICAgfVxuXHRsZXQgZnJlcV92YWx1ZSA9IE51bWJlcihmcmVxdWVuY3kudmFsdWUpICogMWU2O1xuXHRsZXQgZnJlcV9jaGFubmVscyA9IGZyZXF1ZW5jeV9jaGFubmVscy52YWx1ZTtcbiAgICBsZXQgcmFfdmFsdWUgPSBOdW1iZXIocmlnaHRfYXNjZW5zaW9uLnZhbHVlKTtcbiAgICBsZXQgZGVjX3ZhbHVlID0gTnVtYmVyKGRlY2xpbmF0aW9uLnZhbHVlKSAqIE1hdGguUEkgLyAxODAuMDtcblxuICAgIGNvbnN0IGFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9YXJyYXldOmNoZWNrZWRcIik7XG4gICAgbGV0IHRlbGVzY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj0ke2FycmF5LmlkfV1gKS5pbm5lckhUTUw7XG5cbiAgICBsZXQgcmFfaCA9IHJhX3ZhbHVlICogMjQvMzYwO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWxfcmFcIikuaW5uZXJUZXh0ID0gYFJpZ2h0IGFzY2Vuc2lvbjogJHsocmFfdmFsdWUpLnRvRml4ZWQoMil9IGRlZyAvLyAke01hdGguZmxvb3IocmFfaCl9aCR7TWF0aC5mbG9vcigoKHJhX2ggLSBNYXRoLmZsb29yKHJhX2gpKSo2MCkpfW1gO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWxfZGVjXCIpLmlubmVyVGV4dCA9IGBEZWNsaW5hdGlvbiB3LnIudC4gY2VsZXN0aWFsIGVxdWF0b3I6ICR7KGRlY192YWx1ZSAqIDE4MC4wL01hdGguUEkpLnRvRml4ZWQoMil9IGRlZ2A7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYWJlbF90aW1lXCIpLmlubmVyVGV4dCA9IGBPYnNlcnZhdGlvbiBzdGFydDogJHtNYXRoLmZsb29yKHBoaV92YWx1ZSl9aCR7TWF0aC5mbG9vcigoKHBoaV92YWx1ZSAtIE1hdGguZmxvb3IocGhpX3ZhbHVlKSkqNjApKX1tYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2l0aW1lXCIpLmlubmVyVGV4dCA9IGBJbnRlZ3JhdGlvbiB0aW1lOiAke2R1cmF0aW9uX3ZhbHVlLnRvRml4ZWQoMil9IGhgO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWxfbnRpbWVzXCIpLmlubmVyVGV4dCA9IGBUaW1lIHNhbXBsZXM6ICR7dF9jaGFubmVsc31gO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWxfYmFuZHdpZHRoXCIpLmlubmVyVGV4dCA9IGBGcmVxdWVuY3kgY2hhbm5lbHM6ICR7ZnJlcV9jaGFubmVsc31gO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWxfZnJlcVwiKS5pbm5lclRleHQgPSBgT2JzZXJ2aW5nIGZyZXF1ZW5jeTogJHtmcmVxX3ZhbHVlIC8gMWU2fSBNSHpgO1xuXG4gICAgbGV0IGFudG1hc2sgPSBuZXcgVWludDhBcnJheShhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXS5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW50ZW5uYV9saXN0W3RlbGVzY29wZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGFudCA9IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdW2ldO1xuICAgICAgICBsZXQgY2IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbnQpO1xuICAgICAgICBhbnRtYXNrW2ldID0gY2IuY2hlY2tlZCA/IDEgOiAwO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFudG1hc2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGFudCA9IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdW2ldO1xuICAgIH1cblxuICAgIGxldCBvYnNfZGF0ZSA9IG5ldyBJbnQzMkFycmF5KFt5ZWFyLnZhbHVlLCBtb250aC52YWx1ZSwgZGF5LnZhbHVlXSk7XG5cblx0bGV0IHV2cHRyID0gQ2hhcnQucGxvdF9pbnRlcmZlcm9tZXRlcl91dmNvdmVyYWdlKHJhX3ZhbHVlICogTWF0aC5QSSAvIDE4MC4wLCBkZWNfdmFsdWUsIGZyZXFfdmFsdWUsIGZyZXFfY2hhbm5lbHMsIHBoaV92YWx1ZSwgZHVyYXRpb25fdmFsdWUsIHRfY2hhbm5lbHMsIG9ic19kYXRlLCB0ZWxlc2NvcGUsIGFudG1hc2spO1xuICAgIHZhciBOYW50ID0gMDtcbiAgICBpZiAodGVsZXNjb3BlID09IFwiTE9GQVJcIikge1xuICAgICAgICBOYW50ID0gNzE7XG4gICAgfSBlbHNlIGlmICh0ZWxlc2NvcGUgPT0gXCJlLU1FUkxJTlwiKSB7XG4gICAgICAgIE5hbnQgPSA3O1xuICAgIH1cbiAgICBOYW50ID0gYW50bWFzay5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiAgICBsZXQgTmJhc2VsaW5lcyA9IE5hbnQgKiAoTmFudCAtIDEpIC8gMjtcbiAgICBsZXQgTnZhbHVlcyA9ICgoTmFudCArIE5iYXNlbGluZXMpKSAqIGZyZXFfY2hhbm5lbHMgKiB0X2NoYW5uZWxzICogMjtcbiAgICBjb25zdCBtZW1vcnkgPSBzaGFyZWRfbWVtb3J5KCk7XG4gICAgbGV0IHV2X3BvaW50cyA9IG5ldyBGbG9hdDMyQXJyYXkobWVtb3J5LmJ1ZmZlciwgdXZwdHIsIE52YWx1ZXMpO1xuXG4gICAgbGV0IGFyciA9IEFycmF5LmZyb20odXZfcG9pbnRzKTtcbiAgICBsZXQgZnVsbF91diA9IGFyci5mbGF0TWFwKChjb29yZCkgPT4gW2Nvb3JkLCAtY29vcmRdKTtcbiAgICBsZXQgZnJlcXMgPSBbXTtcbiAgICBsZXQgYSA9IDA7XG4gICAgZm9yKGE7IGE8PWZyZXFfY2hhbm5lbHM7IGErKyl7XG4gICAgICAgIGZyZXFzLnB1c2goZnJlcV92YWx1ZSArIGEgKiA1ZTYpO1xuICAgIH1cbiAgICBkYXRhID0gW107XG4gICAgbGV0IGZyZXFfaWR4ID0gLTE7XG5cbiAgICAvKlxuICAgIC8vIEl0ZXJhdGUgcGVyIDIgYmVjYXVzZSB3ZSBoYXZlIHUsIC11LCB2LCAtdiBpbiB0aGUgYXJyYXkuXG4gICAgLy8gRm9yIGV2ZXJ5IHRpbWUgc2xvdFxuICAgIC8vIE5iYXNlbGluZXMgKyBOYW50IGFudGVubmEgcG9pbnRzXG4gICAgLy8gZnJlcV9jaGFubmVscyBmcmVxdWVuY3kgcG9pbnRzXG4gICAgbGV0IHQgPSAtMTtcbiAgICBkMy5yYW5nZSgwLCB1dl9wb2ludHMubGVuZ3RoKzIsIDIpLmZvckVhY2goZCA9PiB7XG4gICAgICAgIGxldCB0cmVtID0gZCAlICgyICogKCgoTmJhc2VsaW5lcyArIE5hbnQpICogZnJlcV9jaGFubmVscykpKTtcbiAgICAgICAgbGV0IGZyZW0gPSBkICUgKDIgKiAoKChOYmFzZWxpbmVzICsgTmFudCkpKSk7XG4gICAgICAgIGlmICh0cmVtID09IDApIHtcbiAgICAgICAgICAgIHQgKz0gMTtcbiAgICAgICAgICAgIGZyZXFfaWR4ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyZW0gPT0gMCkge1xuICAgICAgICAgICAgZnJlcV9pZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLnB1c2goe3g6IHV2X3BvaW50c1tkXSwgeTogdXZfcG9pbnRzW2QrMV0sIGZyZXE6IGZyZXFzW2ZyZXFfaWR4XX0pO1xuICAgICAgICBkYXRhLnB1c2goe3g6IC11dl9wb2ludHNbZF0sIHk6IC11dl9wb2ludHNbZCsxXSwgZnJlcTogZnJlcXNbZnJlcV9pZHhdfSk7XG4gICAgfSk7XG4gICAgKi9cbiAgICBkMy5yYW5nZSgwLCB1dl9wb2ludHMubGVuZ3RoLCAyKS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICBmcmVxX2lkeCA9IChpICUgKDIgKiBmcmVxX2NoYW5uZWxzKSkgLyAyO1xuICAgICAgICBkYXRhLnB1c2goe3g6IHV2X3BvaW50c1tpXSwgeTogdXZfcG9pbnRzW2krMV0sIGZyZXE6IGZyZXFzW2ZyZXFfaWR4XX0pO1xuICAgICAgICBkYXRhLnB1c2goe3g6IC11dl9wb2ludHNbaV0sIHk6IC11dl9wb2ludHNbaSsxXSwgZnJlcTogZnJlcXNbZnJlcV9pZHhdfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoY29sb3VyX3BvaW50cy5jaGVja2VkKSB7XG4gICAgICAgIGNvbnN0IGZyZXFDb2xvclNjYWxlID0gZDNcbiAgICAgICAgICAuc2NhbGVTZXF1ZW50aWFsKClcbiAgICAgICAgICAvLy5kb21haW4oW2ZyZXFfdmFsdWUgKyA1MGU2LCBmcmVxX3ZhbHVlXSlcbiAgICAgICAgICAuZG9tYWluKFtmcmVxX3ZhbHVlLCBmcmVxX3ZhbHVlICsgNTBlNl0pXG4gICAgICAgICAgLmludGVycG9sYXRvcihkMy5pbnRlcnBvbGF0ZVNwZWN0cmFsKTtcbiAgICAgICAgICAvLy5pbnRlcnBvbGF0b3IoZDMuaW50ZXJwb2xhdGVZbEduQnUpO1xuICAgICAgICAgIC8vLmludGVycG9sYXRvcihkMy5pbnRlcnBvbGF0ZVJkWWxHbik7XG5cbiAgICAgICAgbGV0IGZpbGxDb2xvciA9IGZjXG4gICAgICAgICAgLndlYmdsRmlsbENvbG9yKClcbiAgICAgICAgICAudmFsdWUoZCA9PiB3ZWJnbENvbG9yKGZyZXFDb2xvclNjYWxlKGQuZnJlcSkpKVxuICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHBvaW50U2VyaWVzLmRlY29yYXRlKHByb2dyYW0gPT4gZmlsbENvbG9yKHByb2dyYW0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZmlsbENvbG9yID0gZmNcbiAgICAgICAgICAud2ViZ2xGaWxsQ29sb3IoKVxuICAgICAgICAgIC52YWx1ZShkID0+IFswLCAwLCAwLCAxXSlcbiAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICBwb2ludFNlcmllcy5kZWNvcmF0ZShwcm9ncmFtID0+IGZpbGxDb2xvcihwcm9ncmFtKSk7XG4gICAgfVxuICAgIHJlbmRlcigpO1xuICAgIHJldHVybiB1dl9wb2ludHMubGVuZ3RoIC8gMjtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUGxvdCgpIHtcbiAgICBzdGF0dXMuaW5uZXJUZXh0ID0gYFJlbmRlcmluZyAuLi5gO1xuICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgbGV0IE5wb2ludHMgPSB1cGRhdGVQbG90VXZDb3ZlcmFnZSgpO1xuICAgIGNvbnN0IGVuZCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGlmIChOcG9pbnRzKSB7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9YXJyYXldOmNoZWNrZWRcIik7XG4gICAgICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gYFVWIHBvaW50cyByZW5kZXJlZDogJHtOcG9pbnRzfVxcblJlbmRlciB0aW1lOiAke01hdGguY2VpbChlbmQgLSBzdGFydCl9bXNgO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSBgUmVuZGVyZWQgaW4gJHtNYXRoLmNlaWwoZW5kIC0gc3RhcnQpfW1zYDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9