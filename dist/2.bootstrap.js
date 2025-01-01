(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_2__);
// Code examples used:
// https://github.com/travisdoesmath/n-pendulum-wasm/
// https://d3fc.io/examples/chart-d3fc-zoom/
// https://blog.scottlogic.com/2020/05/01/rendering-one-million-points-with-d3.html
//
// If you only use `npm` you can simply
// import { Chart } from "wasm-demo" and remove `setup` call from `bootstrap.js`.
class Chart {}




const array_selector = document.getElementById("array_selector");

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


HTMLCanvasElement.prototype.getContext = function(origFn) { return function(type, attribs) { attribs = attribs || {}; attribs.preserveDrawingBuffer = true; return origFn.call(this, type, attribs); }; }(HTMLCanvasElement.prototype.getContext);


var antenna_list = {"LOFAR": ['CS001HBA0', 'CS001HBA1', 'CS002HBA0', 'CS002HBA1', 'CS003HBA0', 'CS003HBA1', 'CS004HBA0', 'CS004HBA1', 'CS005HBA0', 'CS005HBA1', 'CS006HBA0', 'CS006HBA1', 'CS007HBA0', 'CS007HBA1', 'CS011HBA0', 'CS011HBA1', 'CS013HBA0', 'CS013HBA1', 'CS017HBA0', 'CS017HBA1', 'CS021HBA0', 'CS021HBA1', 'CS024HBA0', 'CS024HBA1', 'CS028HBA0', 'CS028HBA1', 'CS030HBA0', 'CS030HBA1', 'CS031HBA0', 'CS031HBA1', 'CS032HBA0', 'CS032HBA1', 'CS101HBA0', 'CS101HBA1', 'CS103HBA0', 'CS103HBA1', 'CS201HBA0', 'CS201HBA1', 'CS301HBA0', 'CS301HBA1', 'CS302HBA0', 'CS302HBA1', 'CS401HBA0', 'CS401HBA1', 'CS501HBA0', 'CS501HBA1', 'RS106HBA', 'RS205HBA', 'RS208HBA', 'RS210HBA', 'RS305HBA', 'RS306HBA', 'RS307HBA', 'RS310HBA', 'RS406HBA', 'RS407HBA', 'RS409HBA', 'RS503HBA', 'RS508HBA', 'RS509HBA', 'DE601HBA', 'DE602HBA', 'DE603HBA', 'DE604HBA', 'DE605HBA', 'FR606HBA', 'SE607HBA', 'UK608HBA', 'DE609HBA', 'PL610HBA', 'PL611HBA', 'PL612HBA', 'IE613HBA', 'LV614HBA', "BG", "IT", "GMRT"].sort(),
    "e-MERLIN": ["Lovell", "MarkII", "Defford", "Knockin", "Pickmere", "Darnhall", "Cambridge"].sort(),
    "LAMBDA": ["Ceduna","Parkes","Narrabri","Hobart","Perth"].sort(),
    "Test": ["PL611HBA", "IE613HBA"].sort()};

function saveimg() {
    console.log("calling html2canvas");
    html2canvas__WEBPACK_IMPORTED_MODULE_2___default()(document.querySelector("#chart"), {
    onrendered: function(canvas) {
        let theCanvas = canvas;
        document.body.appendChild(canvas);

        canvas.toBlob(function(blob) {
                console.log("Downloading image");
            window.saveAs(blob, "Dashboard.png"); 
        });
    }
    });
    //let c = document.getElementById("chart");
    //document.DOM.download(() => serialize(c), undefined, "Save as SVG")
    //var node = document.getElementById('chart');
    //let node = document.getElementsByTagName('body')[0];
    //let snode = rasterize(node);

    //let snode = serialize(node);
    //window.saveAs(snode, 'my-node.png');

    //html2canvas(document.querySelector("#chart")).then(canvas => {
    //    document.body.appendChild(canvas)
    //});


    //var blobUrl = URL.createObjectURL(snode);
    //var link = document.createElement("a"); // Or maybe get it from the current document
    //link.href = blobUrl;
    //link.download = "my-plot.svg";
    //link.click()
    //link.innerText = "Click here to download the file";
    //document.body.appendChild(link); // Or append it whereever you want

    //domtoimage.toBlob(snode)
    ////domtoimage.toBlob(document.getElementById('chart'))
    //.then(function (blob) {
    //    window.saveAs(blob, 'my-node.png');
    //});
}

function serialize(svg) {
    const xmlns = "http://www.w3.org/2000/xmlns/";
    const xlinkns = "http://www.w3.org/1999/xlink";
    const svgns = "http://www.w3.org/2000/svg";
    svg = svg.cloneNode(true);
    const fragment = window.location.href + "#";
    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      for (const attr of walker.currentNode.attributes) {
        if (attr.value.includes(fragment)) {
          attr.value = attr.value.replace(fragment, "#");
        }
      }
    }
    svg.setAttributeNS(xmlns, "xmlns", svgns);
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
    const serializer = new window.XMLSerializer;
    const string = serializer.serializeToString(svg);
    return new Blob([string], {type: "image/svg+xml"});
  }

function rasterize(svg) {
  let resolve, reject;
  const promise = new Promise((y, n) => (resolve = y, reject = n));
  const image = new Image;
  image.onerror = reject;
  image.onload = () => {
    const rect = svg.getBoundingClientRect();
    const context = DOM.context2d(rect.width, rect.height);
    context.drawImage(image, 0, 0, rect.width, rect.height);
    context.canvas.toBlob(resolve);
  };
  image.src = URL.createObjectURL(serialize(svg));
  return promise;
}

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
    antennas = document.getElementById("antennas");

    colour_points.addEventListener("change", updatePlot);
    reset.addEventListener("click", resetSliders);
    btn_save_img.addEventListener("click", saveimg);

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
    var items = d3.select('#chart').selectAll('*').remove();

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


        //if ((i > 0) && (i % 2 == 1)) {
        //    antennas.appendChild(document.createElement("br"));
        //}
    }
    antennas.appendChild(cblist);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUMwQztBQUNOO0FBQ0U7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsMkRBQTJELGlDQUFpQyx5QkFBeUIsc0NBQXNDLHlDQUF5QyxHQUFHLEVBQUU7OztBQUd6TSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGtEQUFXO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87OztBQUdQO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isc0JBQXNCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFNBQVMsbUJBQW1CO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdELFNBQVM7O0FBRWpFLG1CQUFtQixvQ0FBb0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdELFNBQVM7O0FBRWpFLG1CQUFtQixvQ0FBb0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdELFNBQVM7O0FBRWpFLG1CQUFtQixvQ0FBb0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdELFNBQVM7O0FBRWpFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsb0NBQW9DO0FBQ3ZEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLElBQUk7QUFDeEM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0QsU0FBUzs7QUFFakUsOEZBQThGLHVDQUF1QztBQUNySSwyRUFBMkUsdUJBQXVCO0FBQ2xHLDRFQUE0RSwwQkFBMEI7QUFDdEcseUVBQXlFLFdBQVc7QUFDcEYsa0ZBQWtGLGNBQWM7QUFDaEcsOEVBQThFLGlCQUFpQjs7QUFFL0Y7QUFDQSxtQkFBbUIsb0NBQW9DO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0RBQWE7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGtCQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwREFBMEQ7QUFDN0UsbUJBQW1CLDREQUE0RDtBQUMvRSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDBEQUEwRDtBQUM3RSxtQkFBbUIsNERBQTREO0FBQy9FLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELFNBQVM7QUFDckUsa0RBQWtELFFBQVEsaUJBQWlCLHVCQUF1QjtBQUNsRyxLQUFLO0FBQ0wsMENBQTBDLHVCQUF1QjtBQUNqRTtBQUNBIiwiZmlsZSI6IjIuYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29kZSBleGFtcGxlcyB1c2VkOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RyYXZpc2RvZXNtYXRoL24tcGVuZHVsdW0td2FzbS9cbi8vIGh0dHBzOi8vZDNmYy5pby9leGFtcGxlcy9jaGFydC1kM2ZjLXpvb20vXG4vLyBodHRwczovL2Jsb2cuc2NvdHRsb2dpYy5jb20vMjAyMC8wNS8wMS9yZW5kZXJpbmctb25lLW1pbGxpb24tcG9pbnRzLXdpdGgtZDMuaHRtbFxuLy9cbi8vIElmIHlvdSBvbmx5IHVzZSBgbnBtYCB5b3UgY2FuIHNpbXBseVxuLy8gaW1wb3J0IHsgQ2hhcnQgfSBmcm9tIFwid2FzbS1kZW1vXCIgYW5kIHJlbW92ZSBgc2V0dXBgIGNhbGwgZnJvbSBgYm9vdHN0cmFwLmpzYC5cbmNsYXNzIENoYXJ0IHt9XG5pbXBvcnQgeyBzaGFyZWRfbWVtb3J5IH0gZnJvbSBcIndhc20tZGVtb1wiO1xuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgaHRtbDJjYW52YXMgZnJvbSAnaHRtbDJjYW52YXMnO1xuXG5jb25zdCBhcnJheV9zZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXJyYXlfc2VsZWN0b3JcIik7XG5cbmNvbnN0IHBoaSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGhpXCIpO1xuY29uc3QgZHVyYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1cmF0aW9uXCIpO1xuY29uc3QgZnJlcXVlbmN5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmVxdWVuY3lcIik7XG5jb25zdCBmcmVxdWVuY3lfY2hhbm5lbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyZXF1ZW5jeV9jaGFubmVsc1wiKTtcbmNvbnN0IGRlY2xpbmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWNsaW5hdGlvblwiKTtcbmNvbnN0IGNvbG91cl9wb2ludHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoZWNrYm94X2NvbG91cl9ieV9mcmVxXCIpO1xuY29uc3QgcmVzZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bl9yZXNldF9zaW1cIik7XG5jb25zdCBidG5fc2F2ZV9pbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bl9zYXZlX2ltZ1wiKTtcblxuY29uc3QgY29udHJvbF91dmNvdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXZjb3YtY29udHJvbFwiKTtcbmNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzXCIpO1xuXG5cbkhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZS5nZXRDb250ZXh0ID0gZnVuY3Rpb24ob3JpZ0ZuKSB7IHJldHVybiBmdW5jdGlvbih0eXBlLCBhdHRyaWJzKSB7IGF0dHJpYnMgPSBhdHRyaWJzIHx8IHt9OyBhdHRyaWJzLnByZXNlcnZlRHJhd2luZ0J1ZmZlciA9IHRydWU7IHJldHVybiBvcmlnRm4uY2FsbCh0aGlzLCB0eXBlLCBhdHRyaWJzKTsgfTsgfShIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUuZ2V0Q29udGV4dCk7XG5cblxudmFyIGFudGVubmFfbGlzdCA9IHtcIkxPRkFSXCI6IFsnQ1MwMDFIQkEwJywgJ0NTMDAxSEJBMScsICdDUzAwMkhCQTAnLCAnQ1MwMDJIQkExJywgJ0NTMDAzSEJBMCcsICdDUzAwM0hCQTEnLCAnQ1MwMDRIQkEwJywgJ0NTMDA0SEJBMScsICdDUzAwNUhCQTAnLCAnQ1MwMDVIQkExJywgJ0NTMDA2SEJBMCcsICdDUzAwNkhCQTEnLCAnQ1MwMDdIQkEwJywgJ0NTMDA3SEJBMScsICdDUzAxMUhCQTAnLCAnQ1MwMTFIQkExJywgJ0NTMDEzSEJBMCcsICdDUzAxM0hCQTEnLCAnQ1MwMTdIQkEwJywgJ0NTMDE3SEJBMScsICdDUzAyMUhCQTAnLCAnQ1MwMjFIQkExJywgJ0NTMDI0SEJBMCcsICdDUzAyNEhCQTEnLCAnQ1MwMjhIQkEwJywgJ0NTMDI4SEJBMScsICdDUzAzMEhCQTAnLCAnQ1MwMzBIQkExJywgJ0NTMDMxSEJBMCcsICdDUzAzMUhCQTEnLCAnQ1MwMzJIQkEwJywgJ0NTMDMySEJBMScsICdDUzEwMUhCQTAnLCAnQ1MxMDFIQkExJywgJ0NTMTAzSEJBMCcsICdDUzEwM0hCQTEnLCAnQ1MyMDFIQkEwJywgJ0NTMjAxSEJBMScsICdDUzMwMUhCQTAnLCAnQ1MzMDFIQkExJywgJ0NTMzAySEJBMCcsICdDUzMwMkhCQTEnLCAnQ1M0MDFIQkEwJywgJ0NTNDAxSEJBMScsICdDUzUwMUhCQTAnLCAnQ1M1MDFIQkExJywgJ1JTMTA2SEJBJywgJ1JTMjA1SEJBJywgJ1JTMjA4SEJBJywgJ1JTMjEwSEJBJywgJ1JTMzA1SEJBJywgJ1JTMzA2SEJBJywgJ1JTMzA3SEJBJywgJ1JTMzEwSEJBJywgJ1JTNDA2SEJBJywgJ1JTNDA3SEJBJywgJ1JTNDA5SEJBJywgJ1JTNTAzSEJBJywgJ1JTNTA4SEJBJywgJ1JTNTA5SEJBJywgJ0RFNjAxSEJBJywgJ0RFNjAySEJBJywgJ0RFNjAzSEJBJywgJ0RFNjA0SEJBJywgJ0RFNjA1SEJBJywgJ0ZSNjA2SEJBJywgJ1NFNjA3SEJBJywgJ1VLNjA4SEJBJywgJ0RFNjA5SEJBJywgJ1BMNjEwSEJBJywgJ1BMNjExSEJBJywgJ1BMNjEySEJBJywgJ0lFNjEzSEJBJywgJ0xWNjE0SEJBJywgXCJCR1wiLCBcIklUXCIsIFwiR01SVFwiXS5zb3J0KCksXG4gICAgXCJlLU1FUkxJTlwiOiBbXCJMb3ZlbGxcIiwgXCJNYXJrSUlcIiwgXCJEZWZmb3JkXCIsIFwiS25vY2tpblwiLCBcIlBpY2ttZXJlXCIsIFwiRGFybmhhbGxcIiwgXCJDYW1icmlkZ2VcIl0uc29ydCgpLFxuICAgIFwiTEFNQkRBXCI6IFtcIkNlZHVuYVwiLFwiUGFya2VzXCIsXCJOYXJyYWJyaVwiLFwiSG9iYXJ0XCIsXCJQZXJ0aFwiXS5zb3J0KCksXG4gICAgXCJUZXN0XCI6IFtcIlBMNjExSEJBXCIsIFwiSUU2MTNIQkFcIl0uc29ydCgpfTtcblxuZnVuY3Rpb24gc2F2ZWltZygpIHtcbiAgICBjb25zb2xlLmxvZyhcImNhbGxpbmcgaHRtbDJjYW52YXNcIik7XG4gICAgaHRtbDJjYW52YXMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGFydFwiKSwge1xuICAgIG9ucmVuZGVyZWQ6IGZ1bmN0aW9uKGNhbnZhcykge1xuICAgICAgICBsZXQgdGhlQ2FudmFzID0gY2FudmFzO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgICAgICAgY2FudmFzLnRvQmxvYihmdW5jdGlvbihibG9iKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb3dubG9hZGluZyBpbWFnZVwiKTtcbiAgICAgICAgICAgIHdpbmRvdy5zYXZlQXMoYmxvYiwgXCJEYXNoYm9hcmQucG5nXCIpOyBcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIH0pO1xuICAgIC8vbGV0IGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJ0XCIpO1xuICAgIC8vZG9jdW1lbnQuRE9NLmRvd25sb2FkKCgpID0+IHNlcmlhbGl6ZShjKSwgdW5kZWZpbmVkLCBcIlNhdmUgYXMgU1ZHXCIpXG4gICAgLy92YXIgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydCcpO1xuICAgIC8vbGV0IG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIC8vbGV0IHNub2RlID0gcmFzdGVyaXplKG5vZGUpO1xuXG4gICAgLy9sZXQgc25vZGUgPSBzZXJpYWxpemUobm9kZSk7XG4gICAgLy93aW5kb3cuc2F2ZUFzKHNub2RlLCAnbXktbm9kZS5wbmcnKTtcblxuICAgIC8vaHRtbDJjYW52YXMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGFydFwiKSkudGhlbihjYW52YXMgPT4ge1xuICAgIC8vICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgIC8vfSk7XG5cblxuICAgIC8vdmFyIGJsb2JVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHNub2RlKTtcbiAgICAvL3ZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7IC8vIE9yIG1heWJlIGdldCBpdCBmcm9tIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gICAgLy9saW5rLmhyZWYgPSBibG9iVXJsO1xuICAgIC8vbGluay5kb3dubG9hZCA9IFwibXktcGxvdC5zdmdcIjtcbiAgICAvL2xpbmsuY2xpY2soKVxuICAgIC8vbGluay5pbm5lclRleHQgPSBcIkNsaWNrIGhlcmUgdG8gZG93bmxvYWQgdGhlIGZpbGVcIjtcbiAgICAvL2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7IC8vIE9yIGFwcGVuZCBpdCB3aGVyZWV2ZXIgeW91IHdhbnRcblxuICAgIC8vZG9tdG9pbWFnZS50b0Jsb2Ioc25vZGUpXG4gICAgLy8vL2RvbXRvaW1hZ2UudG9CbG9iKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydCcpKVxuICAgIC8vLnRoZW4oZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAvLyAgICB3aW5kb3cuc2F2ZUFzKGJsb2IsICdteS1ub2RlLnBuZycpO1xuICAgIC8vfSk7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShzdmcpIHtcbiAgICBjb25zdCB4bWxucyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIjtcbiAgICBjb25zdCB4bGlua25zID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCI7XG4gICAgY29uc3Qgc3ZnbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG4gICAgc3ZnID0gc3ZnLmNsb25lTm9kZSh0cnVlKTtcbiAgICBjb25zdCBmcmFnbWVudCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIjXCI7XG4gICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihzdmcsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgIGZvciAoY29uc3QgYXR0ciBvZiB3YWxrZXIuY3VycmVudE5vZGUuYXR0cmlidXRlcykge1xuICAgICAgICBpZiAoYXR0ci52YWx1ZS5pbmNsdWRlcyhmcmFnbWVudCkpIHtcbiAgICAgICAgICBhdHRyLnZhbHVlID0gYXR0ci52YWx1ZS5yZXBsYWNlKGZyYWdtZW50LCBcIiNcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgc3ZnLnNldEF0dHJpYnV0ZU5TKHhtbG5zLCBcInhtbG5zXCIsIHN2Z25zKTtcbiAgICBzdmcuc2V0QXR0cmlidXRlTlMoeG1sbnMsIFwieG1sbnM6eGxpbmtcIiwgeGxpbmtucyk7XG4gICAgY29uc3Qgc2VyaWFsaXplciA9IG5ldyB3aW5kb3cuWE1MU2VyaWFsaXplcjtcbiAgICBjb25zdCBzdHJpbmcgPSBzZXJpYWxpemVyLnNlcmlhbGl6ZVRvU3RyaW5nKHN2Zyk7XG4gICAgcmV0dXJuIG5ldyBCbG9iKFtzdHJpbmddLCB7dHlwZTogXCJpbWFnZS9zdmcreG1sXCJ9KTtcbiAgfVxuXG5mdW5jdGlvbiByYXN0ZXJpemUoc3ZnKSB7XG4gIGxldCByZXNvbHZlLCByZWplY3Q7XG4gIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgoeSwgbikgPT4gKHJlc29sdmUgPSB5LCByZWplY3QgPSBuKSk7XG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlO1xuICBpbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IHN2Zy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjb250ZXh0ID0gRE9NLmNvbnRleHQyZChyZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICBjb250ZXh0LmNhbnZhcy50b0Jsb2IocmVzb2x2ZSk7XG4gIH07XG4gIGltYWdlLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc2VyaWFsaXplKHN2ZykpO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLyoqIEFkZCBldmVudCBsaXN0ZW5lcnMuICovXG5mdW5jdGlvbiBzZXR1cFVJKCkge1xuICAgIHN0YXR1cy5pbm5lclRleHQgPSBcIldlYkFzc2VtYmx5IGxvYWRlZCFcIjtcblx0cGhpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdHBoaS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdGR1cmF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdGR1cmF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVQbG90KTtcblx0ZnJlcXVlbmN5LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdGZyZXF1ZW5jeS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdGZyZXF1ZW5jeV9jaGFubmVscy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuXHRmcmVxdWVuY3lfY2hhbm5lbHMuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVBsb3QpO1xuXHR0aW1lX2NoYW5uZWxzLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlUGxvdCk7XG5cdHRpbWVfY2hhbm5lbHMuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHVwZGF0ZVBsb3QpO1xuXHRkZWNsaW5hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVBsb3QpO1xuXHRkZWNsaW5hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdXBkYXRlUGxvdCk7XG5cdGFycmF5X3NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB1cGRhdGVBbnRlbm5hcyk7XG5cdGFycmF5X3NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlQW50ZW5uYXMpO1xuICAgIGFudGVubmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnRlbm5hc1wiKTtcblxuICAgIGNvbG91cl9wb2ludHMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVQbG90KTtcbiAgICByZXNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVzZXRTbGlkZXJzKTtcbiAgICBidG5fc2F2ZV9pbWcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNhdmVpbWcpO1xuXG4gICAgdXBkYXRlQW50ZW5uYXMoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRTbGlkZXJzKCkge1xuICAgIGNvbnNvbGUubG9nKFwiUmVzZXR0aW5nXCIpO1xuICAgIGRlY2xpbmF0aW9uLnZhbHVlID0gNTg7XG4gICAgZHVyYXRpb24udmFsdWUgPSA0ODA7XG4gICAgcGhpLnZhbHVlID0gMTIwO1xuICAgIHRpbWVfY2hhbm5lbHMudmFsdWUgPSAzO1xuICAgIGZyZXF1ZW5jeS52YWx1ZSA9IDE0NDtcbiAgICBmcmVxdWVuY3lfY2hhbm5lbHMudmFsdWUgPSAxO1xuICAgIHVwZGF0ZVBsb3QoKTtcbn1cblxudmFyIGRhdGEgPSBbXVxuXG5jb25zdCB4ID0gZDMuc2NhbGVMaW5lYXIoKS5kb21haW4oWy0xMjUwZTMsIDEyNTBlM10pO1xuY29uc3QgeSA9IGQzLnNjYWxlTGluZWFyKCkuZG9tYWluKFstMTI1MGUzLCAxMjUwZTNdKTtcblxuY29uc3QgcG9pbnRTZXJpZXMgPSBmY1xuICAgIC5zZXJpZXNXZWJnbFBvaW50KCApXG4gICAgLmVxdWFscygocHJldmlvdXNEYXRhLCBjdXJyZW50RGF0YSkgPT4gcHJldmlvdXNEYXRhID09PSBjdXJyZW50RGF0YSlcbiAgICAuY3Jvc3NWYWx1ZShkID0+IGQueClcbiAgICAubWFpblZhbHVlKGQgPT4gZC55KVxuICAgIC5zaXplKDgpO1xuXG4vLyBjcmVhdGUgYSBkM2ZjLXpvb20gdGhhdCBoYW5kbGVzIHRoZSBtb3VzZSAvIHRvdWNoIGludGVyYWN0aW9uc1xuY29uc3Qgem9vbSA9IGZjLnpvb20oKS5vbignem9vbScsIHJlbmRlcik7XG5cbmNvbnN0IGdyaWRsaW5lID0gZmMuYW5ub3RhdGlvbkNhbnZhc0dyaWRsaW5lKCkueFRpY2tzKDQwKS55VGlja3MoNDApO1xuXG5cbmNvbnN0IGF4aXMgPSBmY1xuICAgIC5heGlzQm90dG9tKHgpXG4gICAgLmRlY29yYXRlKHNlbCA9PiB7XG4gICAgICAgIHNlbC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAuYXR0cignZmlsbCcsICdyZWQnKTtcbiAgICB9KTtcblxuLy8gdGhlIGNoYXJ0IVxuY29uc3QgY2hhcnQgPSBmY1xuICAgIC5jaGFydENhcnRlc2lhbih4LCB5KVxuICAgIC5jYW52YXNQbG90QXJlYShncmlkbGluZSlcbiAgICAud2ViZ2xQbG90QXJlYShwb2ludFNlcmllcylcbiAgICAueExhYmVsKFwidSBbzrtdXCIpXG4gICAgLnlMYWJlbChcInYgW867XVwiKVxuICAgIC5kZWNvcmF0ZShzZWwgPT4ge1xuICAgICAgICAvLyBhZGQgdGhlIHpvb20gaW50ZXJhY3Rpb24gb24gdGhlIGVudGVyIHNlbGVjdGlvblxuICAgICAgICAvLyB1c2Ugc2VsZWN0QWxsIHRvIGF2b2lkIGludGVyZmVyaW5nIHdpdGggdGhlIGV4aXN0aW5nIGRhdGEgam9pbnNcbiAgICAgICAgc2VsLmVudGVyKClcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5wbG90LWFyZWEnKVxuICAgICAgICAgICAgLmNhbGwoem9vbSwgeCwgeSk7XG4gICAgICAgIHNlbC5lbnRlcigpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcueC1heGlzJylcbiAgICAgICAgICAgIC5jYWxsKHpvb20sIHgsIG51bGwpO1xuICAgICAgICBzZWwuZW50ZXIoKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnktYXhpcycpXG4gICAgICAgICAgICAuY2FsbCh6b29tLCBudWxsLCB5KTtcbiAgICB9KVxuICAgIC54RGVjb3JhdGUoIHNlbCA9PiB7XG4gICAgICAgIHNlbC5zZWxlY3QoJ3RleHQnKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtMjUpIHRyYW5zbGF0ZSgwIDI1KScpXG4gICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgJzE2cHgnKVxuICAgICAgICAuc3R5bGUoJ2ZvbnQtZmFtaWx5JywgJ1NwZWN0cmFsJyk7XG4gICAgfSlcbiAgICAueURlY29yYXRlKCBzZWwgPT4ge1xuICAgICAgICBzZWwuc2VsZWN0KCd0ZXh0JylcbiAgICAgICAgLy8uYXR0cigndHJhbnNmb3JtJywgJ3JvdGF0ZSgtNDUgMzUgMTUpJylcbiAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCAnMTZweCcpXG4gICAgICAgIC5zdHlsZSgnZm9udC1mYW1pbHknLCAnU3BlY3RyYWwnKVxuICAgIH0pO1xuXG5jb25zdCB3ZWJnbENvbG9yID0gY29sb3IgPT4ge1xuICBjb25zdCB7IHIsIGcsIGIsIG9wYWNpdHkgfSA9IGQzLmNvbG9yKGNvbG9yKS5yZ2IoKTtcbiAgcmV0dXJuIFtyIC8gMjU1LCBnIC8gMjU1LCBiIC8gMjU1LCBvcGFjaXR5XTtcbn07XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAvLyBTZXQgbmV3IGRhdGEgb24geW91ciBjaGFydDpcbiAgICB2YXIgaXRlbXMgPSBkMy5zZWxlY3QoJyNjaGFydCcpLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuXG4gICAgZDMuc2VsZWN0KCcjY2hhcnQnKVxuICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIzMnB4XCIpXG4gICAgICAgIC5zdHlsZShcImZvbnQtZmFtaWx5XCIsIFwiU3BlY3RyYWxcIilcbiAgICAgICAgLmRhdHVtKGRhdGEpXG4gICAgICAgIC5jYWxsKGNoYXJ0KTtcbn1cblxuLyoqIE1haW4gZW50cnkgcG9pbnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICAgIHNldHVwVUkoKTtcbn1cblxuLyoqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCBpbiBgYm9vdHN0cmFwLmpzYCB0byBzZXR1cCBpbXBvcnRzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldHVwKFdhc21DaGFydCkge1xuICAgIENoYXJ0ID0gV2FzbUNoYXJ0O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVCdXR0b25zQ29yZSgpIHtcbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYW50ID0gYW50ZW5uYV9saXN0W3RlbGVzY29wZV1baV07XG4gICAgICAgIGlmIChhbnQuaW5jbHVkZXMoXCJDU1wiKSkge1xuICAgICAgICAgICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW50KTtcbiAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJ1dHRvbnNSZW1vdGUoKSB7XG4gICAgY29uc3QgYXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1hcnJheV06Y2hlY2tlZFwiKTtcbiAgICBsZXQgdGVsZXNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPSR7YXJyYXkuaWR9XWApLmlubmVySFRNTDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW50ZW5uYV9saXN0W3RlbGVzY29wZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGFudCA9IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdW2ldO1xuICAgICAgICBpZiAoYW50LmluY2x1ZGVzKFwiUlNcIikpIHtcbiAgICAgICAgICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFudCk7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlUGxvdCgpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVCdXR0b25zSW50bCgpIHtcbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYW50ID0gYW50ZW5uYV9saXN0W3RlbGVzY29wZV1baV07XG4gICAgICAgIGlmICghYW50LmluY2x1ZGVzKFwiQ1NcIikgJiYgIWFudC5pbmNsdWRlcyhcIlJTXCIpICYmICFhbnQuaW5jbHVkZXMoXCJCR1wiKSAmJiAhYW50LmluY2x1ZGVzKFwiSVRcIikgJiYgIWFudC5pbmNsdWRlcyhcIkdNUlRcIikpIHtcbiAgICAgICAgICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFudCk7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlUGxvdCgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBbnRlbm5hcygpIHtcbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgYW50ZW5uYXMuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IGxlZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgbGVnLmlubmVySFRNTCA9IFwiQW50ZW5uYXNcIjtcbiAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChsZWcpO1xuICAgIFxuICAgIGlmICh0ZWxlc2NvcGUgPT0gXCJMT0ZBUlwiKSB7XG4gICAgICAgIGxldCBidG5fY29yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX2NvcmUudHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bl9jb3JlLmlkID0gXCJidG5fbG9mYXJfY29yZVwiO1xuICAgICAgICBidG5fY29yZS52YWx1ZSA9IFwiVG9nZ2xlXFxuQ1NcIlxuICAgICAgICBidG5fY29yZS5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5fY29yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNDb3JlKTtcblxuICAgICAgICBsZXQgYnRuX3JlbW90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX3JlbW90ZS50eXBlID0gXCJidXR0b25cIjtcbiAgICAgICAgYnRuX3JlbW90ZS5pZCA9IFwiYnRuX2xvZmFyX3JlbW90ZVwiO1xuICAgICAgICBidG5fcmVtb3RlLnZhbHVlID0gXCJUb2dnbGVcXG5SU1wiXG4gICAgICAgIGJ0bl9yZW1vdGUuY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgICAgICAgYnRuX3JlbW90ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNSZW1vdGUpO1xuXG4gICAgICAgIGxldCBidG5faW50bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgYnRuX2ludGwudHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGJ0bl9pbnRsLmlkID0gXCJidG5fbG9mYXJfaW50bFwiO1xuICAgICAgICBidG5faW50bC52YWx1ZSA9IFwiVG9nZ2xlXFxuSW50bC5cIlxuICAgICAgICBidG5faW50bC5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICAgICAgICBidG5faW50bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUJ1dHRvbnNJbnRsKTtcblxuICAgICAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChidG5fY29yZSk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGJ0bl9yZW1vdGUpO1xuICAgICAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChidG5faW50bCk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIGFudGVubmFzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgfVxuXG4gICAgbGV0IGNibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBjYmxpc3QuaWQgPSBcImNoZWNrYm94bGlzdFwiO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW50ZW5uYV9saXN0W3RlbGVzY29wZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGFudCA9IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdW2ldO1xuXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBhbnQ7XG4gICAgICAgIGNoZWNrYm94LmlkID0gYW50O1xuICAgICAgICBjaGVja2JveC52YWx1ZSA9IGBpbmNsdWRlXyR7YW50fWA7XG4gICAgICAgIGlmIChhbnQuaW5jbHVkZXMoXCJDU1wiKSB8fCBhbnQuaW5jbHVkZXMoXCJCR1wiKSB8fCBhbnQuaW5jbHVkZXMoXCJJVFwiKSB8fCBhbnQuaW5jbHVkZXMoXCJHTVJUXCIpKSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVQbG90KTtcblxuICAgICAgICBsZXQgbGFiZWw9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFudCk7XG4gICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGNibGlzdC5hcHBlbmRDaGlsZChsaSk7XG5cblxuICAgICAgICAvL2lmICgoaSA+IDApICYmIChpICUgMiA9PSAxKSkge1xuICAgICAgICAvLyAgICBhbnRlbm5hcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgICAvL31cbiAgICB9XG4gICAgYW50ZW5uYXMuYXBwZW5kQ2hpbGQoY2JsaXN0KTtcbiAgICB1cGRhdGVQbG90KCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsb3RVdkNvdmVyYWdlKCkge1xuXHRsZXQgcGhpX3ZhbHVlID0gTnVtYmVyKHBoaS52YWx1ZSkgLyA2MC4wIC0gNjtcblx0bGV0IGR1cmF0aW9uX3ZhbHVlID0gTnVtYmVyKGR1cmF0aW9uLnZhbHVlKSAvIDYwLjA7XG5cdGxldCB0X2NoYW5uZWxzID0gdGltZV9jaGFubmVscy52YWx1ZTtcbiAgICBjb25zdCBUU0xPVF9MSU1JVCA9IDIwO1xuICAgIGlmICh0X2NoYW5uZWxzID4gZHVyYXRpb25fdmFsdWUgKiBUU0xPVF9MSU1JVCkge1xuICAgICAgICB0X2NoYW5uZWxzID0gTWF0aC5jZWlsKGR1cmF0aW9uX3ZhbHVlICogVFNMT1RfTElNSVQpO1xuICAgIH1cblx0bGV0IGZyZXFfdmFsdWUgPSBOdW1iZXIoZnJlcXVlbmN5LnZhbHVlKSAqIDFlNjtcblx0bGV0IGZyZXFfY2hhbm5lbHMgPSBmcmVxdWVuY3lfY2hhbm5lbHMudmFsdWU7XG4gICAgbGV0IGRlY192YWx1ZSA9IE51bWJlcihkZWNsaW5hdGlvbi52YWx1ZSkgKiBNYXRoLlBJIC8gMTgwLjA7XG5cbiAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgIGxldCB0ZWxlc2NvcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9JHthcnJheS5pZH1dYCkuaW5uZXJIVE1MO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYWJlbF9kZWNcIikuaW5uZXJUZXh0ID0gYERlY2xpbmF0aW9uIHcuci50LiBjZWxlc3RpYWwgZXF1YXRvcjogJHsoZGVjX3ZhbHVlICogMTgwLjAvTWF0aC5QSSkudG9GaXhlZCgyKX0gZGVnYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX3RpbWVcIikuaW5uZXJUZXh0ID0gYE9mZnNldCBmcm9tIG5vb246ICR7KHBoaV92YWx1ZSkudG9GaXhlZCgyKX0gaGA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYWJlbF9pdGltZVwiKS5pbm5lclRleHQgPSBgSW50ZWdyYXRpb24gdGltZTogJHtkdXJhdGlvbl92YWx1ZS50b0ZpeGVkKDIpfSBoYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX250aW1lc1wiKS5pbm5lclRleHQgPSBgVGltZSBzYW1wbGVzOiAke3RfY2hhbm5lbHN9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2JhbmR3aWR0aFwiKS5pbm5lclRleHQgPSBgRnJlcXVlbmN5IGNoYW5uZWxzOiAke2ZyZXFfY2hhbm5lbHN9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2ZyZXFcIikuaW5uZXJUZXh0ID0gYE9ic2VydmluZyBmcmVxdWVuY3k6ICR7ZnJlcV92YWx1ZSAvIDFlNn0gTUh6YDtcblxuICAgIGxldCBhbnRtYXNrID0gbmV3IFVpbnQ4QXJyYXkoYW50ZW5uYV9saXN0W3RlbGVzY29wZV0ubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFudGVubmFfbGlzdFt0ZWxlc2NvcGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICAgICAgbGV0IGNiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYW50KTtcbiAgICAgICAgYW50bWFza1tpXSA9IGNiLmNoZWNrZWQgPyAxIDogMDtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnRtYXNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBhbnQgPSBhbnRlbm5hX2xpc3RbdGVsZXNjb3BlXVtpXTtcbiAgICB9XG5cblx0bGV0IHV2cHRyID0gQ2hhcnQucGxvdF9pbnRlcmZlcm9tZXRlcl91dmNvdmVyYWdlKGRlY192YWx1ZSwgZnJlcV92YWx1ZSwgZnJlcV9jaGFubmVscywgcGhpX3ZhbHVlLCBkdXJhdGlvbl92YWx1ZSwgdF9jaGFubmVscywgdGVsZXNjb3BlLCBhbnRtYXNrKTtcbiAgICB2YXIgTmFudCA9IDA7XG4gICAgaWYgKHRlbGVzY29wZSA9PSBcIkxPRkFSXCIpIHtcbiAgICAgICAgTmFudCA9IDcxO1xuICAgIH0gZWxzZSBpZiAodGVsZXNjb3BlID09IFwiZS1NRVJMSU5cIikge1xuICAgICAgICBOYW50ID0gNztcbiAgICB9XG4gICAgTmFudCA9IGFudG1hc2sucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gICAgbGV0IE5iYXNlbGluZXMgPSBOYW50ICogKE5hbnQgLSAxKSAvIDI7XG4gICAgbGV0IE52YWx1ZXMgPSAoKE5hbnQgKyBOYmFzZWxpbmVzKSkgKiBmcmVxX2NoYW5uZWxzICogdF9jaGFubmVscyAqIDI7XG4gICAgY29uc3QgbWVtb3J5ID0gc2hhcmVkX21lbW9yeSgpO1xuICAgIGxldCB1dl9wb2ludHMgPSBuZXcgRmxvYXQ2NEFycmF5KG1lbW9yeS5idWZmZXIsIHV2cHRyLCBOdmFsdWVzKTtcblxuICAgIGxldCBhcnIgPSBBcnJheS5mcm9tKHV2X3BvaW50cyk7XG4gICAgbGV0IGZ1bGxfdXYgPSBhcnIuZmxhdE1hcCgoY29vcmQpID0+IFtjb29yZCwgLWNvb3JkXSk7XG4gICAgbGV0IGZyZXFzID0gW107XG4gICAgbGV0IGEgPSAwO1xuICAgIGZvcihhOyBhPD1mcmVxX2NoYW5uZWxzOyBhKyspe1xuICAgICAgICBmcmVxcy5wdXNoKGZyZXFfdmFsdWUgKyBhICogNWU2KTtcbiAgICB9XG4gICAgZGF0YSA9IFtdO1xuICAgIGxldCBmcmVxX2lkeCA9IC0xO1xuXG4gICAgLypcbiAgICAvLyBJdGVyYXRlIHBlciAyIGJlY2F1c2Ugd2UgaGF2ZSB1LCAtdSwgdiwgLXYgaW4gdGhlIGFycmF5LlxuICAgIC8vIEZvciBldmVyeSB0aW1lIHNsb3RcbiAgICAvLyBOYmFzZWxpbmVzICsgTmFudCBhbnRlbm5hIHBvaW50c1xuICAgIC8vIGZyZXFfY2hhbm5lbHMgZnJlcXVlbmN5IHBvaW50c1xuICAgIGxldCB0ID0gLTE7XG4gICAgZDMucmFuZ2UoMCwgdXZfcG9pbnRzLmxlbmd0aCsyLCAyKS5mb3JFYWNoKGQgPT4ge1xuICAgICAgICBsZXQgdHJlbSA9IGQgJSAoMiAqICgoKE5iYXNlbGluZXMgKyBOYW50KSAqIGZyZXFfY2hhbm5lbHMpKSk7XG4gICAgICAgIGxldCBmcmVtID0gZCAlICgyICogKCgoTmJhc2VsaW5lcyArIE5hbnQpKSkpO1xuICAgICAgICBpZiAodHJlbSA9PSAwKSB7XG4gICAgICAgICAgICB0ICs9IDE7XG4gICAgICAgICAgICBmcmVxX2lkeCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcmVtID09IDApIHtcbiAgICAgICAgICAgIGZyZXFfaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5wdXNoKHt4OiB1dl9wb2ludHNbZF0sIHk6IHV2X3BvaW50c1tkKzFdLCBmcmVxOiBmcmVxc1tmcmVxX2lkeF19KTtcbiAgICAgICAgZGF0YS5wdXNoKHt4OiAtdXZfcG9pbnRzW2RdLCB5OiAtdXZfcG9pbnRzW2QrMV0sIGZyZXE6IGZyZXFzW2ZyZXFfaWR4XX0pO1xuICAgIH0pO1xuICAgICovXG4gICAgZDMucmFuZ2UoMCwgdXZfcG9pbnRzLmxlbmd0aCwgMikuZm9yRWFjaChpID0+IHtcbiAgICAgICAgZnJlcV9pZHggPSAoaSAlICgyICogZnJlcV9jaGFubmVscykpIC8gMjtcbiAgICAgICAgZGF0YS5wdXNoKHt4OiB1dl9wb2ludHNbaV0sIHk6IHV2X3BvaW50c1tpKzFdLCBmcmVxOiBmcmVxc1tmcmVxX2lkeF19KTtcbiAgICAgICAgZGF0YS5wdXNoKHt4OiAtdXZfcG9pbnRzW2ldLCB5OiAtdXZfcG9pbnRzW2krMV0sIGZyZXE6IGZyZXFzW2ZyZXFfaWR4XX0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvbG91cl9wb2ludHMuY2hlY2tlZCkge1xuICAgICAgICBjb25zdCBmcmVxQ29sb3JTY2FsZSA9IGQzXG4gICAgICAgICAgLnNjYWxlU2VxdWVudGlhbCgpXG4gICAgICAgICAgLy8uZG9tYWluKFtmcmVxX3ZhbHVlICsgNTBlNiwgZnJlcV92YWx1ZV0pXG4gICAgICAgICAgLmRvbWFpbihbZnJlcV92YWx1ZSwgZnJlcV92YWx1ZSArIDUwZTZdKVxuICAgICAgICAgIC5pbnRlcnBvbGF0b3IoZDMuaW50ZXJwb2xhdGVTcGVjdHJhbCk7XG4gICAgICAgICAgLy8uaW50ZXJwb2xhdG9yKGQzLmludGVycG9sYXRlWWxHbkJ1KTtcbiAgICAgICAgICAvLy5pbnRlcnBvbGF0b3IoZDMuaW50ZXJwb2xhdGVSZFlsR24pO1xuXG4gICAgICAgIGxldCBmaWxsQ29sb3IgPSBmY1xuICAgICAgICAgIC53ZWJnbEZpbGxDb2xvcigpXG4gICAgICAgICAgLnZhbHVlKGQgPT4gd2ViZ2xDb2xvcihmcmVxQ29sb3JTY2FsZShkLmZyZXEpKSlcbiAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICBwb2ludFNlcmllcy5kZWNvcmF0ZShwcm9ncmFtID0+IGZpbGxDb2xvcihwcm9ncmFtKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZpbGxDb2xvciA9IGZjXG4gICAgICAgICAgLndlYmdsRmlsbENvbG9yKClcbiAgICAgICAgICAudmFsdWUoZCA9PiBbMCwgMCwgMCwgMV0pXG4gICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgcG9pbnRTZXJpZXMuZGVjb3JhdGUocHJvZ3JhbSA9PiBmaWxsQ29sb3IocHJvZ3JhbSkpO1xuICAgIH1cbiAgICByZW5kZXIoKTtcbiAgICByZXR1cm4gdXZfcG9pbnRzLmxlbmd0aCAvIDI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsb3QoKSB7XG4gICAgc3RhdHVzLmlubmVyVGV4dCA9IGBSZW5kZXJpbmcgLi4uYDtcbiAgICBjb25zdCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGxldCBOcG9pbnRzID0gdXBkYXRlUGxvdFV2Q292ZXJhZ2UoKTtcbiAgICBjb25zdCBlbmQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBpZiAoTnBvaW50cykge1xuICAgICAgICBjb25zdCBhcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPWFycmF5XTpjaGVja2VkXCIpO1xuICAgICAgICBsZXQgdGVsZXNjb3BlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPSR7YXJyYXkuaWR9XWApLmlubmVySFRNTDtcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9IGBVViBwb2ludHMgcmVuZGVyZWQ6ICR7TnBvaW50c31cXG5SZW5kZXIgdGltZTogJHtNYXRoLmNlaWwoZW5kIC0gc3RhcnQpfW1zYDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gYFJlbmRlcmVkIGluICR7TWF0aC5jZWlsKGVuZCAtIHN0YXJ0KX1tc2A7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==