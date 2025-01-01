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
const declination = document.getElementById("declination");
const colour_points = document.getElementById("checkbox_colour_by_freq");
const reset = document.getElementById("btn_reset_sim");
const btn_save_img = document.getElementById("btn_save_img");

const control_uvcov = document.getElementById("uvcov-control");
const status = document.getElementById("status");
const antennas = document.getElementById("antennas");

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
	declination.addEventListener("change", updatePlot);
	declination.addEventListener("input", updatePlot);
	array_selector.addEventListener("input", updateAntennas);
	array_selector.addEventListener("change", updateAntennas);

	band_selector.addEventListener("input", updateFrequencies);
	band_selector.addEventListener("change", updateFrequencies);

    colour_points.addEventListener("change", updatePlot);
    reset.addEventListener("click", resetSliders);

    updateAntennas();
}

function resetSliders() {
    console.log("Resetting");
    declination.value = 58;
    duration.value = 480;
    phi.value = 120;
    time_channels.value = 3;
    frequency.value = 144;
    frequency_channels.value = 1;
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
    //const band = document.querySelector(`label[for=${selected_band.id}]`).innerHTML;

    console.log(band);
    if (band == "HBA") {
        frequency.max = 168;
        frequency.min = 120;
        frequency.value = 144;
    }else if (band == "LBA") {
        frequency.max = 90;
        frequency.min = 10;
        frequency.value = 58;
    }

    if (band == "L") {
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
	let phi_value = Number(phi.value) / 60.0 - 6;
	let duration_value = Number(duration.value) / 60.0;
	let t_channels = time_channels.value;
    const TSLOT_LIMIT = 20;
    if (t_channels > duration_value * TSLOT_LIMIT) {
        t_channels = Math.ceil(duration_value * TSLOT_LIMIT);
    }
	let freq_value = Number(frequency.value) * 1e6;
	let freq_channels = frequency_channels.value;
    let dec_value = Number(declination.value) * Math.PI / 180.0;

    const array = document.querySelector("input[name=array]:checked");
    let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;

    document.getElementById("label_dec").innerText = `Declination w.r.t. celestial equator: ${(dec_value * 180.0/Math.PI).toFixed(2)} deg`;
    document.getElementById("label_time").innerText = `Offset from noon: ${(phi_value).toFixed(2)} h`;
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

	let uvptr = Chart.plot_interferometer_uvcoverage(dec_value, freq_value, freq_channels, phi_value, duration_value, t_channels, telescope, antmask);
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
    let uv_points = new Float64Array(memory.buffer, uvptr, Nvalues);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDMEM7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFNBQVMsbUJBQW1CO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBd0QsU0FBUzs7QUFFakUsbUJBQW1CLG9DQUFvQztBQUN2RDtBQUNBO0FB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QUNsRyxLQUFLO0FBQ0wsMENBQTBDLHVCQUF1QjtBQUNqRTtBQUNBIiwiZmlsZSI6IjEuYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29kZSBleGFtcGxlcyB1c2VkOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RyYXZpc2RvZXNtYXRoL24tcGVuZHVsdW0td2FzbS9cbi8vIGh0dHBzOi8vZDNmYy5pby9leGFtcGxlcy9jaGFydC1kM2ZjLXpvb20vXG4vLyBodHRwczovL2Jsb2cuc2NvdHRsb2dpYy5jb20vMjAyMC8wNS8wMS9yZW5kZXJpbmctb25lLW1pbGxpb24tcG9pbnRzLXdpdGgtZDMuaHRtbFxuLy9cbi8vIElmIHlvdSBvbmx5IHVzZSBgbnBtYCB5b3UgY2FuIHNpbXBseVxuLy8gaW1wb3J0IHsgQ2hhcnQgfSBmcm9tIFwid2FzbS1kZW1vXCIgYW5kIHJlbW92ZSBgc2V0dXBgIGNhbGwgZnJvbSBgYm9vdHN0cmFwLmpzYC5cbmNsYXNzIENoYXJ0IHt9XG5pbXBvcnQgeyBzaGFyZWRfbWVtb3J5IH0gZnJvbSBcIndhc20tZGVtb1wiO1xuXG5jb25zdCBhcnJheV9zZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXJyYXlfc2VsZWN0b3JcIik7XG5jb25zdCBiYW5kX3NlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYW5kX3NlbGVjdG9yXCIpO1xuXG5jb25zdCBwaGkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBoaVwiKTtcbmNvbnN0IGR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXJhdGlvblwiKTtcbmNvbnN0IGZyZXF1ZW5jeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJlcXVlbmN5XCIpO1xuY29uc3QgZnJlcXVlbmN5X2NoYW5uZWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmVxdWVuY3lfY2hhbm5lbHNcIik7XG5jb25zdCBkZWNsaW5hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVjbGluYXRpb25cIik7XG5jb25zdCBjb2xvdXJfcG9pbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVja2JveF9jb2xvdXJfYnlfZnJlcVwiKTtcbmNvbnN0IHJlc2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5fcmVzZXRfc2ltXCIpO1xuY29uc3QgYnRuX3NhdmVfaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5fc2F2ZV9pbWdcIik7XG5cbmNvbnN0IGNvbnRyb2xfdXZjb3YgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInV2Y292LWNvbnRyb2xcIik7XG5jb25zdCBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c1wiKTtcbmNvbnN0IGFudGVubmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnRlbm5hc1wiKTtcblxudmFyIGFudGVubmFfbGlzdCA9IHtcIkxPRkFSXCI6IFsnQ1MwMDFIQkEwJywgJ0NTMDAxSEJBMScsICdDUzAwMkhCQTAnLCAnQ1MwMDJIQkExJywgJ0NTMDAzSEJBMCcsICdDUzAwM0hCQTEnLCAnQ1MwMDRIQkEwJywgJ0NTMDA0SEJBMScsICdDUzAwNUhCQTAnLCAnQ1MwMDVIQkExJywgJ0NTMDA2SEJBMCcsICdDUzAwNkhCQTEnLCAnQ1MwMDdIQkEwJywgJ0NTMDA3SEJBMScsICdDUzAxMUhCQTAnLCAnQ1MwMTFIQkExJywgJ0NTMDEzSEJBMCcsICdDUzAxM0hCQTEnLCAnQ1MwMTdIQkEwJywgJ0NTMDE3SEJBMScsICdDUzAyMUhCQTAnLCAnQ1MwMjFIQkExJywgJ0NTMDI0SEJBMCcsICdDUzAyNEhCQTEnLCAnQ1MwMjhIQkEwJywgJ0NTMDI4SEJBMScsICdDUzAzMEhCQTAnLCAnQ1MwMzBIQkExJywgJ0NTMDMxSEJBMCcsICdDUzAzMUhCQTEnLCAnQ1MwMzJIQkEwJywgJ0NTMDMySEJBMScsICdDUzEwMUhCQTAnLCAnQ1MxMDFIQkExJywgJ0NTMTAzSEJBMCcsICdDUzEwM0hCQTEnLCAnQ1MyMDFIQkEwJywgJ0NTMjAxSEJBMScsICdDUzMwMUhCQTAnLCAnQ1MzMDFIQkExJywgJ0NTMzAySEJBMCcsICdDUzMwMkhCQTEnLCAnQ1M0MDFIQkEwJywgJ0NTNDAxSEJBMScsICdDUzUwMUhCQTAnLCAnQ1M1MDFIQkExJywgJ1JTMTA2SEJBJywgJ1JTMjA1SEJBJywgJ1JTMjA4SEJBJywgJ1JTMjEwSEJBJywgJ1JTMzA1SEJBJywgJ1JTMzA2SEJBJywgJ1JTMzA3SEJBJywgJ1JTMzEwSEJBJywgJ1JTNDA2SEJBJywgJ1JTNDA3SEJBJywgJ1JTNDA5SEJBJywgJ1JTNTAzSEJBJywgJ1JTNTA4SEJBJywgJ1JTNTA5SEJBJywgJ0RFNjAxSEJBJywgJ0RFNjAySEJBJywgJ0RFNjAzSEJBJywgJ0RFNjA0SEJBJywgJ0RFNjA1SEJBJywgJ0ZSNjA2SEJBJywgJ1NFNjA3SEJBJywgJ1VLNjA4SEJBJywgJ0RFNjA5SEJBJywgJ1BMNjEwSEJBJywgJ1BMNjExSEJBJywgJ1BMNjEySEJBJywgJ0lFNjEzSEJBJywgJ0xWNjE0SEJBJywgXCJCR1wiLCBcIklUXCIsIFwiR01SVFwiXS5zb3J0KCksXG4gICAgXCJlLU1FUkxJTlwiOiBbXCJMb3ZlbGxcIiwgXCJNYXJrSUlcIiwgXCJEZWZmb3JkXCIsIFwiS25vY2tpblwiLCBcIlBpY2ttZXJlXCIsIFwiRGFybmhhbGxcIiwgXCJDYW1icmlkZ2VcIl0uc29ydCgpLFxuICAgIFwiTEFNQkRBXCI6IFtcIkNlZHVuYVwiLFwiUGFya2VzXCIsXCJOYXJyYWJyaVwiLFwiSG9iYXJ0XCIsXCJQZXJ0aFwiXS5zb3J0KCksXG4gICAgXCJUZXN0XCI6IFtcIlBMNjExSEJBXCIsIFwiSUU2MTNIQkFcIl0uc29ydCgpfTtcblxuLyoqIEFkZCBldmVudCBsaXN0ZW5lcnMuICovXG5mdW5jdGlvbiBzZXR1cFVJKCkge1xuICAgIHN0YXR1cy5pbm5lclRleHQgPSBcIldlYkFzc2VtYmx5IGxvYWRlZCFcIjtcblx0cGhpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdHBoaS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdGR1cmF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdGR1cmF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVQbG90KTtcblx0ZnJlcXVlbmN5LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdGZyZXF1ZW5jeS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdGZyZXF1ZW5jeV9jaGFubmVscy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuXHRmcmVxdWVuY3lfY2hhbm5lbHMuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVBsb3QpO1xuXHR0aW1lX2NoYW5uZWxzLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdHRpbWVfY2hhbm5lbHMuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVBsb3QpO1xuXHRkZWNsaW5hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuXHRkZWNsaW5hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdGFycmF5X3NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVBbnRlbm5hcyk7XG5cdGFycmF5X3NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlQW50ZW5uYXMpO1xuXG5cdGJhbmRfc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZUZyZXF1ZW5jaWVzKTtcblx0YmFuZF9zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZUZyZXF1ZW5jaWVzKTtcblxuICAgIGNvbG91cl9wb2ludHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcbiAgICByZXNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVzZXRTbGlkZXJzKTtcblxuICAgIHVwZGF0ZUFudGVubmFzKCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2xpZGVycygpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJlc2V0dGluZ1wiKTtcbiAgICBkZWNsaW5hdGlvbi52YWx1ZSA9IDU4O1xuICAgIGR1cmF0aW9uLnZhbHVlID0gNDgwO1xuICAgIHBoaS52YWx1ZSA9IDEyMDtcbiAgICB0aW1lX2NoYW5uZWxzLnZhbHVlID0gMztcbiAgICBmcmVxdWVuY3kudmFsdWUgPSAxNDQ7XG4gICAgZnJlcXVlbmN5X2NoYW5uZWxzLnZhbHVlID0gMTtcbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbnZhciBkYXRhID0gW11cblxuY29uc3QgeCA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFstMTI1MGUzLCAxMjUwZTNdKTtcbmNvbnN0IHkgPSBkMy5zY2FsZUxpbmVhcigpLmRvbWFpbihbLTEyNTBlMywgMTI1MGUzXSk7XG5cbmNvbnN0IHBvaW50U2VyaWVzID0gZmNcbiAgICAuc2VyaWVzV2ViZ2xQb2ludCggKVxuICAgIC5lcXVhbHMoKHByZXZpb3VzRGF0YSwgY3VycmVudERhdGEpID0+IHByZXZpb3VzRGF0YSA9PT0gY3VycmVudERhdGEpXG4gICAgLmNyb3NzVmFsdWUoZCA9PiBkLngpXG4gICAgLm1haW5WYWx1ZShkID0+IGQueSlcbiAgICAuc2l6ZSg4KTtcblxuLy8gY3JlYXRlIGEgZDNmYy16b29tIHRoYXQgaGFuZGxlcyB0aGUgbW91c2UgLyB0b3VjaCBpbnRlcmFjdGlvbnNcbmNvbnN0IHpvb20gPSBmYy56b29tKCkub24oJ3pvb20nLCByZW5kZXIpO1xuXG5jb25zdCBncmlkbGluZSA9IGZjLmFubm90YXRpb25DYW52YXNHcmlkbGluZSgpLnhUaWNrcyg0MCkueVRpY2tzKDQwKTtcblxuXG5jb25zdCBheGlzID0gZmNcbiAgICAuYXhpc0JvdHRvbSh4KVxuICAgIC5kZWNvcmF0ZShzZWwgPT4ge1xuICAgICAgICBzZWwuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgLmF0dHIoJ2ZpbGwnLCAncmVkJyk7XG4gICAgfSk7XG5cbi8vIHRoZSBjaGFydCFcbmNvbnN0IGNoYXJ0ID0gZmNcbiAgICAuY2hhcnRDYXJ0ZXNpYW4oeCwgeSlcbiAgICAuY2FudmFzUGxvdEFyZWEoZ3JpZGxpbmUpXG4gICAgLndlYmdsUGxvdEFyZWEocG9pbnRTZXJpZXMpXG4gICAgLnhMYWJlbChcInUgW867XVwiKVxuICAgIC55TGFiZWwoXCJ2IFvOu11cIilcbiAgICAuZGVjb3JhdGUoc2VsID0+IHtcbiAgICAgICAgLy8gYWRkIHRoZSB6b29tIGludGVyYWN0aW9uIG9uIHRoZSBlbnRlciBzZWxlY3Rpb25cbiAgICAgICAgLy8gdXNlIHNlbGVjdEFsbCB0byBhdm9pZCBpbnRlcmZlcmluZyB3aXRoIHRoZSBleGlzdGluZyBkYXRhIGpvaW5zXG4gICAgICAgIHNlbC5lbnRlcigpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucGxvdC1hcmVhJylcbiAgICAgICAgICAgIC5jYWxsKHpvb20sIHgsIHkpO1xuICAgICAgICBzZWwuZW50ZXIoKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLngtYXhpcycpXG4gICAgICAgICAgICAuY2FsbCh6b29tLCB4LCBudWxsKTtcbiAgICAgICAgc2VsLmVudGVyKClcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy55LWF4aXMnKVxuICAgICAgICAgICAgLmNhbGwoem9vbSwgbnVsbCwgeSk7XG4gICAgfSlcbiAgICAueERlY29yYXRlKCBzZWwgPT4ge1xuICAgICAgICBzZWwuc2VsZWN0KCd0ZXh0JylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTI1KSB0cmFuc2xhdGUoMCAyNSknKVxuICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsICcxNnB4JylcbiAgICAgICAgLnN0eWxlKCdmb250LWZhbWlseScsICdTcGVjdHJhbCcpO1xuICAgIH0pXG4gICAgLnlEZWNvcmF0ZSggc2VsID0+IHtcbiAgICAgICAgc2VsLnNlbGVjdCgndGV4dCcpXG4gICAgICAgIC8vLmF0dHIoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTQ1IDM1IDE1KScpXG4gICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgJzE2cHgnKVxuICAgICAgICAuc3R5bGUoJ2ZvbnQtZmFtaWx5JywgJ1NwZWN0cmFsJylcbiAgICB9KTtcblxuY29uc3Qgd2ViZ2xDb2xvciA9IGNvbG9yID0+IHtcbiAgY29uc3QgeyByLCBnLCBiLCBvcGFjaXR5IH0gPSBkMy5jb2xvcihjb2xvcikucmdiKCk7XG4gIHJldHVybiBbciAvIDI1NSwgZyAvIDI1NSwgYiAvIDI1NSwgb3BhY2l0eV07XG59O1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8gU2V0IG5ldyBkYXRhIG9uIHlvdXIgY2hhcnQ6XG4gICAgLy92YXIgaXRlbXMgPSBkMy5zZWxlY3QoJyNjaGFydCcpLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuICAgIGxldCBjdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcnRcIik7XG5cbiAgICBkMy5zZWxlY3QoJyNjaGFydCcpXG4gICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjMycHhcIilcbiAgICAgICAgLnN0eWxlKFwiZm9udC1mYW1pbHlcIiwgXCJTcGVjdHJhbFwiKVxuICAgICAgICAuZGF0dW0oZGF0YSlcbiAgICAgICAgLmNhbGwoY2hhcnQpO1xufVxuXG4vKiogTWFpbiBlbnRyeSBwb2ludCAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgc2V0dXBVSSgpO1xufVxuXG4vKiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGluIGBib290c3RyYXAuanNgIHRvIHNldHVwIGltcG9ydHMuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoV2FzbUNoYXJ0KSB7XG4gICAgQ2hhcnQgPSBXYXNtQ2hhcnQ7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJ1dHRvbnNDb3JlKCkge1xuICAgIGNvbnN0IGFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9YXJyYXldOmNoZWNrZWRcIik7XG4gICAgbGV0IHRlbGVzY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj0ke2FycmF5LmlkfV1gKS5pbm5lckhUTUw7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICAgICAgaWYgKGFudC5pbmNsdWRlcyhcIkNTXCIpKSB7XG4gICAgICAgICAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhbnQpO1xuICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZVBsb3QoKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQnV0dG9uc1JlbW90ZSgpIHtcbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYW50ID0gYW50ZW5uYV9saXN0W3RlbGVzY29wZV1baV07XG4gICAgICAgIGlmIChhbnQuaW5jbHVkZXMoXCJSU1wiKSkge1xuICAgICAgICAgICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW50KTtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJ1dHRvbnNJbnRsKCkge1xuICAgIGNvbnN0IGFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9YXJyYXldOmNoZWNrZWRcIik7XG4gICAgbGV0IHRlbGVzY29wZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj0ke2FycmF5LmlkfV1gKS5pbm5lckhUTUw7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICAgICAgaWYgKCFhbnQuaW5jbHVkZXMoXCJDU1wiKSAmJiAhYW50LmluY2x1ZGVzKFwiUlNcIikgJiYgIWFudC5pbmNsdWRlcyhcIkJHXCIpICYmICFhbnQuaW5jbHVkZXMoXCJJVFwiKSAmJiAhYW50LmluY2x1ZGVzKFwiR01SVFwiKSkge1xuICAgICAgICAgICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW50KTtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZyZXF1ZW5jaWVzKCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX2JhbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1iYW5kXTpjaGVja2VkXCIpO1xuICAgIGNvbnN0IGJhbmQgPSBzZWxlY3RlZF9iYW5kLmlkO1xuICAgIC8vY29uc3QgYmFuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj0ke3NlbGVjdGVkX2JhbmQuaWR9XWApLmlubmVySFRNTDtcblxuICAgIGNvbnNvbGUubG9nKGJhbmQpO1xuICAgIGlmIChiYW5kID09IFwiSEJBXCIpIHtcbiAgICAgICAgZnJlcXVlbmN5Lm1heCA9IDE2ODtcbiAgICAgICAgZnJlcXVlbmN5Lm1pbiA9IDEyMDtcbiAgICAgICAgZnJlcXVlbmN5LnZhbHVlID0gMTQ0O1xuICAgIH1lbHNlIGlmIChiYW5kID09IFwiTEJBXCIpIHtcbiAgICAgICAgZnJlcXVlbmN5Lm1heCA9IDkwO1xuICAgICAgICBmcmVxdWVuY3kubWluID0gMTA7XG4gICAgICAgIGZyZXF1ZW5jeS52YWx1ZSA9IDU4O1xuICAgIH1cblxuICAgIGlmIChiYW5kID09IFwiTFwiKSB7XG4gICAgICAgIGZyZXF1ZW5jeS5tYXggPSAxNzQwO1xuICAgICAgICBmcmVxdWVuY3kubWluID0gMTIzMDtcbiAgICAgICAgZnJlcXVlbmN5LnZhbHVlID0gMTUwMDtcbiAgICB9ZWxzZSBpZiAoYmFuZCA9PSBcIkNcIikge1xuICAgICAgICBmcmVxdWVuY3kubWF4ID0gNzUwMDtcbiAgICAgICAgZnJlcXVlbmN5Lm1pbiA9IDQzMDA7XG4gICAgICAgIGZyZXF1ZW5jeS52YWx1ZSA9IDUwMDA7XG4gICAgfWVsc2UgaWYgKGJhbmQgPT0gXCJLXCIpIHtcbiAgICAgICAgZnJlcXVlbmN5Lm1heCA9IDI1MDAwO1xuICAgICAgICBmcmVxdWVuY3kubWluID0gMTkwMDA7XG4gICAgICAgIGZyZXF1ZW5jeS52YWx1ZSA9IDIyMDAwO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2ZyZXFcIikuaW5uZXJUZXh0ID0gYE9ic2VydmluZyBmcmVxdWVuY3k6ICR7ZnJlcXVlbmN5LnZhbHVlfSBNSHpgO1xuICAgIHVwZGF0ZVBsb3QoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRnJlcXVlbmN5QmFuZHModGVsZXNjb3BlKSB7XG4gICAgdmFyIGJhbmRzID0gW107XG4gICAgaWYgKHRlbGVzY29wZSA9PSBcIkxPRkFSXCIpIHtcbiAgICAgICAgYmFuZHMgPSBbXCJMQkFcIiwgXCJIQkFcIl07XG4gICAgfSBlbHNlIGlmICh0ZWxlc2NvcGUgPT0gXCJlLU1FUkxJTlwiKSB7XG4gICAgICAgIGJhbmRzID0gW1wiTFwiLCBcIkNcIiwgXCJLXCJdO1xuICAgIH1cblxuICAgIGxldCBmcmVxZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyZXFiYW5kc1wiKTtcbiAgICBmcmVxZmllbGQuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IGxlZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgbGVnLmlubmVySFRNTCA9IFwiT2JzZXJ2aW5nIGJhbmRcIjtcbiAgICBmcmVxZmllbGQuYXBwZW5kQ2hpbGQobGVnKTtcblxuICAgIGxldCBjYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgY2JsaXN0LmlkID0gXCJyYWRpb2xpc3RcIjtcblxuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgYmFuZHMuZm9yRWFjaCgoYikgPT4ge1xuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICAgICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBjaGVja2JveC50eXBlID0gXCJyYWRpb1wiO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gXCJiYW5kXCI7XG4gICAgICAgIGNoZWNrYm94LmlkID0gYjtcbiAgICAgICAgaWYgKHRlbGVzY29wZSA9PSBcIkxPRkFSXCIgJiYgYiA9PSBcIkhCQVwiKSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgIH1lbHNlIGlmICh0ZWxlc2NvcGUgPT0gXCJlLU1FUkxJTlwiICYmIGIgPT0gXCJMXCIpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVGcmVxdWVuY2llcyk7XG5cbiAgICAgICAgbGV0IGxhYmVsPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGxhYmVsLmZvciA9IGI7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShiKTtcbiAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgY2JsaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgICBmcmVxZmllbGQuYXBwZW5kQ2hpbGQoY2JsaXN0KTtcbiAgICB1cGRhdGVGcmVxdWVuY2llcygpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbnRlbm5hcygpIHtcbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgYW50ZW5uYXMuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IGxlZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgbGVnLmlubmVySFRNTCA9IFwiQW50ZW5uYXNcIjtcbiAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChsZWcpO1xuICAgIFxuICAgIGlmICh0ZWxlc2NvcGUgPT0gXCJMT0ZBUlwiKSB7XG4gICAgICAgIGxldCBidG5fY29yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX2NvcmUudHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bl9jb3JlLmlkID0gXCJidG5fbG9mYXJfY29yZVwiO1xuICAgICAgICBidG5fY29yZS52YWx1ZSA9IFwiVG9nZ2xlXFxuQ1NcIlxuICAgICAgICBidG5fY29yZS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5fY29yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNDb3JlKTtcblxuICAgICAgICBsZXQgYnRuX3JlbW90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX3JlbW90ZS50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuX3JlbW90ZS5pZCA9IFwiYnRuX2xvZmFyX3JlbW90ZVwiO1xuICAgICAgICBidG5fcmVtb3RlLnZhbHVlID0gXCJUb2dnbGVcXG5SU1wiXG4gICAgICAgIGJ0bl9yZW1vdGUuY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuX3JlbW90ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNSZW1vdGUpO1xuXG4gICAgICAgIGxldCBidG5faW50bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX2ludGwudHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bl9pbnRsLmlkID0gXCJidG5fbG9mYXJfaW50bFwiO1xuICAgICAgICBidG5faW50bC52YWx1ZSA9IFwiVG9nZ2xlXFxuSW50bC5cIlxuICAgICAgICBidG5faW50bC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5faW50bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNJbnRsKTtcblxuICAgICAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChidG5fY29yZSk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGJ0bl9yZW1vdGUpO1xuICAgICAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChidG5faW50bCk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgfVxuXG4gICAgbGV0IGNibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBjYmxpc3QuaWQgPSBcImNoZWNrYm94bGlzdFwiO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW50ZW5uYV9saXN0W3RlbGVzY29wZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGFudCA9IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdW2ldO1xuXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBhbnQ7XG4gICAgICAgIGNoZWNrYm94LmlkID0gYW50O1xuICAgICAgICBjaGVja2JveC52YWx1ZSA9IGBpbmNsdWRlXyR7YW50fWA7XG4gICAgICAgIGlmIChhbnQuaW5jbHVkZXMoXCJDU1wiKSB8fCBhbnQuaW5jbHVkZXMoXCJCR1wiKSB8fCBhbnQuaW5jbHVkZXMoXCJJVFwiKSB8fCBhbnQuaW5jbHVkZXMoXCJHTVJUXCIpKSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVQbG90KTtcblxuICAgICAgICBsZXQgbGFiZWw9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFudCk7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNibGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGNibGlzdCk7XG4gICAgdXBkYXRlRnJlcXVlbmN5QmFuZHModGVsZXNjb3BlKTtcbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsb3RVdkNvdmVyYWdlKCkge1xuXHRsZXQgcGhpX3ZhbHVlID0gTnVtYmVyKHBoaS52YWx1ZSkgLyA2MC4wIC0gNjtcblx0bGV0IGR1cmF0aW9uX3ZhbHVlID0gTnVtYmVyKGR1cmF0aW9uLnZhbHVlKSAvIDYwLjA7XG5cdGxldCB0X2NoYW5uZWxzID0gdGltZV9jaGFubmVscy52YWx1ZTtcbiAgICBjb25zdCBUU0xPVF9MSU1JVCA9IDIwO1xuICAgIGlmICh0X2NoYW5uZWxzID4gZHVyYXRpb25fdmFsdWUgKiBUU0xPVF9MSU1JVCkge1xuICAgICAgICB0X2NoYW5uZWxzID0gTWF0aC5jZWlsKGR1cmF0aW9uX3ZhbHVlICogVFNMT1RfTElNSVQpO1xuICAgIH1cblx0bGV0IGZyZXFfdmFsdWUgPSBOdW1iZXIoZnJlcXVlbmN5LnZhbHVlKSAqIDFlNjtcblx0bGV0IGZyZXFfY2hhbm5lbHMgPSBmcmVxdWVuY3lfY2hhbm5lbHMudmFsdWU7XG4gICAgbGV0IGRlY192YWx1ZSA9IE51bWJlcihkZWNsaW5hdGlvbi52YWx1ZSkgKiBNYXRoLlBJIC8gMTgwLjA7XG5cbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYWJlbF9kZWNcIikuaW5uZXJUZXh0ID0gYERlY2xpbmF0aW9uIHcuci50LiBjZWxlc3RpYWwgZXF1YXRvcjogJHsoZGVjX3ZhbHVlICogMTgwLjAvTWF0aC5QSSkudG9GaXhlZCgyKX0gZGVnYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX3RpbWVcIikuaW5uZXJUZXh0ID0gYE9mZnNldCBmcm9tIG5vb246ICR7KHBoaV92YWx1ZSkudG9GaXhlZCgyKX0gaGA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYWJlbF9pdGltZVwiKS5pbm5lclRleHQgPSBgSW50ZWdyYXRpb24gdGltZTogJHtkdXJhdGlvbl92YWx1ZS50b0ZpeGVkKDIpfSBoYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX250aW1lc1wiKS5pbm5lclRleHQgPSBgVGltZSBzYW1wbGVzOiAke3RfY2hhbm5lbHN9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2JhbmR3aWR0aFwiKS5pbm5lclRleHQgPSBgRnJlcXVlbmN5IGNoYW5uZWxzOiAke2ZyZXFfY2hhbm5lbHN9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2ZyZXFcIikuaW5uZXJUZXh0ID0gYE9ic2VydmluZyBmcmVxdWVuY3k6ICR7ZnJlcV92YWx1ZSAvIDFlNn0gTUh6YDtcblxuICAgIGxldCBhbnRtYXNrID0gbmV3IFVpbnQ4QXJyYXkoYW50ZW5uYV9saXN0W3RlbGVzY29wZV0ubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICAgICAgbGV0IGNiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW50KTtcbiAgICAgICAgYW50bWFza1tpXSA9IGNiLmNoZWNrZWQgPyAxIDogMDtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnRtYXNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICB9XG5cblx0bGV0IHV2cHRyID0gQ2hhcnQucGxvdF9pbnRlcmZlcm9tZXRlcl91dmNvdmVyYWdlKGRlY192YWx1ZSwgZnJlcV92YWx1ZSwgZnJlcV9jaGFubmVscywgcGhpX3ZhbHVlLCBkdXJhdGlvbl92YWx1ZSwgdF9jaGFubmVscywgdGVsZXNjb3BlLCBhbnRtYXNrKTtcbiAgICB2YXIgTmFudCA9IDA7XG4gICAgaWYgKHRlbGVzY29wZSA9PSBcIkxPRkFSXCIpIHtcbiAgICAgICAgTmFudCA9IDcxO1xuICAgIH0gZWxzZSBpZiAodGVsZXNjb3BlID09IFwiZS1NRVJMSU5cIikge1xuICAgICAgICBOYW50ID0gNztcbiAgICB9XG4gICAgTmFudCA9IGFudG1hc2sucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gICAgbGV0IE5iYXNlbGluZXMgPSBOYW50ICogKE5hbnQgLSAxKSAvIDI7XG4gICAgbGV0IE52YWx1ZXMgPSAoKE5hbnQgKyBOYmFzZWxpbmVzKSkgKiBmcmVxX2NoYW5uZWxzICogdF9jaGFubmVscyAqIDI7XG4gICAgY29uc3QgbWVtb3J5ID0gc2hhcmVkX21lbW9yeSgpO1xuICAgIGxldCB1dl9wb2ludHMgPSBuZXcgRmxvYXQ2NEFycmF5KG1lbW9yeS5idWZmZXIsIHV2cHRyLCBOdmFsdWVzKTtcblxuICAgIGxldCBhcnIgPSBBcnJheS5mcm9tKHV2X3BvaW50cyk7XG4gICAgbGV0IGZ1bGxfdXYgPSBhcnIuZmxhdE1hcCgoY29vcmQpID0+IFtjb29yZCwgLWNvb3JkXSk7XG4gICAgbGV0IGZyZXFzID0gW107XG4gICAgbGV0IGEgPSAwO1xuICAgIGZvcihhOyBhPD1mcmVxX2NoYW5uZWxzOyBhKyspe1xuICAgICAgICBmcmVxcy5wdXNoKGZyZXFfdmFsdWUgKyBhICogNWU2KTtcbiAgICB9XG4gICAgZGF0YSA9IFtdO1xuICAgIGxldCBmcmVxX2lkeCA9IC0xO1xuXG4gICAgLypcbiAgICAvLyBJdGVyYXRlIHBlciAyIGJlY2F1c2Ugd2UgaGF2ZSB1LCAtdSwgdiwgLXYgaW4gdGhlIGFycmF5LlxuICAgIC8vIEZvciBldmVyeSB0aW1lIHNsb3RcbiAgICAvLyBOYmFzZWxpbmVzICsgTmFudCBhbnRlbm5hIHBvaW50c1xuICAgIC8vIGZyZXFfY2hhbm5lbHMgZnJlcXVlbmN5IHBvaW50c1xuICAgIGxldCB0ID0gLTE7XG4gICAgZDMucmFuZ2UoMCwgdXZfcG9pbnRzLmxlbmd0aCsyLCAyKS5mb3JFYWNoKGQgPT4ge1xuICAgICAgICBsZXQgdHJlbSA9IGQgJSAoMiAqICgoKE5iYXNlbGluZXMgKyBOYW50KSAqIGZyZXFfY2hhbm5lbHMpKSk7XG4gICAgICAgIGxldCBmcmVtID0gZCAlICgyICogKCgoTmJhc2VsaW5lcyArIE5hbnQpKSkpO1xuICAgICAgICBpZiAodHJlbSA9PSAwKSB7XG4gICAgICAgICAgICB0ICs9IDE7XG4gICAgICAgICAgICBmcmVxX2lkeCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcmVtID09IDApIHtcbiAgICAgICAgICAgIGZyZXFfaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5wdXNoKHt4OiB1dl9wb2ludHNbZF0sIHk6IHV2X3BvaW50c1tkKzFdLCBmcmVxOiBmcmVxc1tmcmVxX2lkeF19KTtcbiAgICAgICAgZGF0YS5wdXNoKHt4OiAtdXZfcG9pbnRzW2RdLCB5OiAtdXZfcG9pbnRzW2QrMV0sIGZyZXE6IGZyZXFzW2ZyZXFfaWR4XX0pO1xuICAgIH0pO1xuICAgICovXG4gICAgZDMucmFuZ2UoMCwgdXZfcG9pbnRzLmxlbmd0aCwgMikuZm9yRWFjaChpID0+IHtcbiAgICAgICAgZnJlcV9pZHggPSAoaSAlICgyICogZnJlcV9jaGFubmVscykpIC8gMjtcbiAgICAgICAgZGF0YS5wdXNoKHt4OiB1dl9wb2ludHNbaV0sIHk6IHV2X3BvaW50c1tpKzFdLCBmcmVxOiBmcmVxc1tmcmVxX2lkeF19KTtcbiAgICAgICAgZGF0YS5wdXNoKHt4OiAtdXZfcG9pbnRzW2ldLCB5OiAtdXZfcG9pbnRzW2krMV0sIGZyZXE6IGZyZXFzW2ZyZXFfaWR4XX0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvbG91cl9wb2ludHMuY2hlY2tlZCkge1xuICAgICAgICBjb25zdCBmcmVxQ29sb3JTY2FsZSA9IGQzXG4gICAgICAgICAgLnNjYWxlU2VxdWVudGlhbCgpXG4gICAgICAgICAgLy8uZG9tYWluKFtmcmVxX3ZhbHVlICsgNTBlNiwgZnJlcV92YWx1ZV0pXG4gICAgICAgICAgLmRvbWFpbihbZnJlcV92YWx1ZSwgZnJlcV92YWx1ZSArIDUwZTZdKVxuICAgICAgICAgIC5pbnRlcnBvbGF0b3IoZDMuaW50ZXJwb2xhdGVTcGVjdHJhbCk7XG4gICAgICAgICAgLy8uaW50ZXJwb2xhdG9yKGQzLmludGVycG9sYXRlWWxHbkJ1KTtcbiAgICAgICAgICAvLy5pbnRlcnBvbGF0b3IoZDMuaW50ZXJwb2xhdGVSZFlsR24pO1xuXG4gICAgICAgIGxldCBmaWxsQ29sb3IgPSBmY1xuICAgICAgICAgIC53ZWJnbEZpbGxDb2xvcigpXG4gICAgICAgICAgLnZhbHVlKGQgPT4gd2ViZ2xDb2xvcihmcmVxQ29sb3JTY2FsZShkLmZyZXEpKSlcbiAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICBwb2ludFNlcmllcy5kZWNvcmF0ZShwcm9ncmFtID0+IGZpbGxDb2xvcihwcm9ncmFtKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZpbGxDb2xvciA9IGZjXG4gICAgICAgICAgLndlYmdsRmlsbENvbG9yKClcbiAgICAgICAgICAudmFsdWUoZCA9PiBbMCwgMCwgMCwgMV0pXG4gICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgcG9pbnRTZXJpZXMuZGVjb3JhdGUocHJvZ3JhbSA9PiBmaWxsQ29sb3IocHJvZ3JhbSkpO1xuICAgIH1cbiAgICByZW5kZXIoKTtcbiAgICByZXR1cm4gdXZfcG9pbnRzLmxlbmd0aCAvIDI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsb3QoKSB7XG4gICAgc3RhdHVzLmlubmVyVGV4dCA9IGBSZW5kZXJpbmcgLi4uYDtcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGxldCBOcG9pbnRzID0gdXBkYXRlUGxvdFV2Q292ZXJhZ2UoKTtcbiAgICBjb25zdCBlbmQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBpZiAoTnBvaW50cykge1xuICAgICAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgICAgICBsZXQgdGVsZXNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPSR7YXJyYXkuaWR9XWApLmlubmVySFRNTDtcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9IGBVViBwb2ludHMgcmVuZGVyZWQ6ICR7TnBvaW50c31cXG5SZW5kZXIgdGltZTogJHtNYXRoLmNlaWwoZW5kIC0gc3RhcnQpfW1zYDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gYFJlbmRlcmVkIGluICR7TWF0aC5jZWlsKGVuZCAtIHN0YXJ0KX1tc2A7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==