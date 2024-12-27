(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: main, setup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"main\", function() { return main; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return setup; });\n// If you only use `npm` you can simply\n// import { Chart } from \"wasm-demo\" and remove `setup` call from `bootstrap.js`.\nclass Chart {}\n\nconst canvas = document.getElementById(\"canvas\");\nconst canvas_div = document.getElementById(\"canvas_div\");\nconst coord = document.getElementById(\"coord\");\nconst plotType = document.getElementById(\"plot-type\");\nconst baseline = document.getElementById(\"baseline\");\nconst pbeam = document.getElementById(\"pbeam\");\n\nconst array_selector = document.getElementById(\"array_selector\");\n\nconst phi = document.getElementById(\"phi\");\nconst duration = document.getElementById(\"duration\");\nconst frequency = document.getElementById(\"frequency\");\nconst frequency_channels = document.getElementById(\"frequency_channels\");\nconst declination = document.getElementById(\"declination\");\nconst zoom = document.getElementById(\"zoom_level\");\n\n//const control = document.getElementById(\"3d-control\");\nconst control = document.getElementById(\"interferometer-control\");\nconst control_uvcov = document.getElementById(\"uvcov-control\");\nconst status = document.getElementById(\"status\");\n\nlet chart = null;\n\n/** Main entry point */\nfunction main() {\n\tlet hash = location.hash.substr(1);\n\tfor(var i = 0; i < plotType.options.length; i++) {\n\t\tif(hash == plotType.options[i].value) {\n\t\t\tplotType.value = hash;\n\t\t}\n\t}\n    setupUI();\n    setupCanvas();\n}\n\n/** This function is used in `bootstrap.js` to setup imports. */\nfunction setup(WasmChart) {\n    Chart = WasmChart;\n}\n\n/** Add event listeners. */\nfunction setupUI() {\n    status.innerText = \"WebAssembly loaded!\";\n    plotType.addEventListener(\"change\", updatePlot);\n\tbaseline.addEventListener(\"change\", updatePlot);\n\tbaseline.addEventListener(\"input\", updatePlot);\n\tpbeam.addEventListener(\"change\", updatePlot);\n\tpbeam.addEventListener(\"input\", updatePlot);\n\tphi.addEventListener(\"change\", updatePlot);\n\tphi.addEventListener(\"input\", updatePlot);\n\tduration.addEventListener(\"change\", updatePlot);\n\tduration.addEventListener(\"input\", updatePlot);\n\tfrequency.addEventListener(\"change\", updatePlot);\n\tfrequency.addEventListener(\"input\", updatePlot);\n\tfrequency_channels.addEventListener(\"change\", updatePlot);\n\tfrequency_channels.addEventListener(\"input\", updatePlot);\n\ttime_channels.addEventListener(\"change\", updatePlot);\n\ttime_channels.addEventListener(\"input\", updatePlot);\n\tdeclination.addEventListener(\"change\", updatePlot);\n\tdeclination.addEventListener(\"input\", updatePlot);\n\tzoom.addEventListener(\"change\", updatePlot);\n\tzoom.addEventListener(\"input\", updatePlot);\n\tarray_selector.addEventListener(\"input\", updatePlot);\n\tarray_selector.addEventListener(\"change\", updatePlot);\n    window.addEventListener(\"resize\", setupCanvas);\n    window.addEventListener(\"mousemove\", onMouseMove);\n}\n\n/** Setup canvas to properly handle high DPI and redraw current plot. */\nfunction setupCanvas() {\n    const aspectRatio = canvas.width / canvas.height;\n    let size = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;\n    canvas.style.height = size + \"px\";\n    canvas.style.width = size / aspectRatio + \"px\";\n    updatePlot();\n}\n\n/** Update displayed coordinates. */\nfunction onMouseMove(event) {\n    if (chart) {\n\t\tvar text = \"Mouse pointer is out of range\";\n\n\t\tif(event.target == canvas) {\n\t\t\tlet actualRect = canvas.getBoundingClientRect();\n\t\t\tlet logicX = event.offsetX * canvas.width / actualRect.width;\n\t\t\tlet logicY = event.offsetY * canvas.height / actualRect.height;\n\t\t\tconst point = chart.coord(logicX, logicY);\n\t\t\ttext = (point) \n\t\t\t\t? `(${point.x.toFixed(3)}, ${point.y.toFixed(3)})`\n\t\t\t\t: text;\n\t\t}\n        coord.innerText = text;\n    }\n}\n\nfunction updatePlotInterferometerMonochrome() {\n\tlet baseline_value = Number(baseline.value) / 10.0;\n\tlet pbeam_value = Number(pbeam.value) / 100.0;\n\tcoord.innerText = `Baseline length: ${baseline_value.toFixed(2)} m \\n Primary beam FWHM:${(pbeam_value * 180/Math.PI).toFixed(2)} deg \\n Fringe spacing: ${(180/Math.PI * (299792456 / 144e6) / baseline_value).toFixed(2)} deg`\n\tChart.plot_interferometer_monochrome(\"canvas\", baseline_value, 144e6, pbeam_value);\n}\n\nfunction updatePlotUvCoverage() {\n\tlet phi_value = Number(phi.value) / 60.0;\n\tlet duration_value = Number(duration.value) / 60.0;\n\tlet t_channels = time_channels.value;\n    const TSLOT_LIMIT = 20;\n    if (t_channels > duration_value * TSLOT_LIMIT) {\n        console.log(`Requested ${t_channels} time slots, but limiting time slots to ${Math.ceil(duration_value * TSLOT_LIMIT)} for performance.`);\n        t_channels = Math.ceil(duration_value * TSLOT_LIMIT);\n    }\n    console.log(`Using ${t_channels} time slots.`);\n\tlet freq_value = Number(frequency.value) * 1e6;\n\tlet freq_channels = frequency_channels.value;\n    let dec_value = Number(declination.value) * Math.PI / 180.0;\n\tcoord.innerText = `Time into observation: ${phi_value.toFixed(2)} h \\n Frequency: ${freq_value.toFixed(2)/1e6} MHz \\n Declination: ${(dec_value * 180.0 / Math.PI).toFixed(2)} deg`\n\n    const array = document.querySelector(\"input[name=array]:checked\");\n    let telescope = document.querySelector(`label[for=${array.id}]`).innerHTML;\n\n    document.getElementById(\"label_dec\").innerText = `Declination: ${(dec_value * 180.0/Math.PI).toFixed(2)} deg`;\n    document.getElementById(\"label_time\").innerText = `Time into observation: ${(phi_value).toFixed(2)} h`;\n    document.getElementById(\"label_itime\").innerText = `Integration time: ${duration_value.toFixed(2)} h`;\n    document.getElementById(\"label_ntimes\").innerText = `Time slots: ${t_channels}`;\n    document.getElementById(\"label_bandwidth\").innerText = `Frequency channels: ${freq_channels}`;\n    document.getElementById(\"label_freq\").innerText = `Observing frequency: ${freq_value / 1e6} MHz`;\n\tChart.plot_interferometer_uvcoverage(\"canvas\", dec_value, freq_value, freq_channels, phi_value, duration_value, t_channels, Number(zoom.value), telescope);\n}\n\n/** Redraw currently selected plot. */\nfunction updatePlot() {\n    const selected = plotType.selectedOptions[0];\n    status.innerText = `Rendering ${selected.innerText}...`;\n    chart = null;\n    const start = performance.now();\n\tswitch(selected.value) {\n\t\tcase \"mandelbrot\":\n\t\t\tcontrol.classList.add(\"hide\");\n\t\t\tchart = Chart.mandelbrot(canvas);\n\t\t\tbreak;\n        case \"interferometer-monochrome\":\n            control.classList.remove(\"hide\");\n            control_uvcov.classList.add(\"hide\");\n            updatePlotInterferometerMonochrome();\n            break;\n        case \"interferometer-uvcoverage\":\n            control.classList.add(\"hide\");\n            control_uvcov.classList.remove(\"hide\");\n            updatePlotUvCoverage();\n            break;\n\t\tdefault:\n\t\t\tcontrol.classList.add(\"hide\");\n\t}\n\t\n    const end = performance.now();\n    status.innerText = `Rendered ${selected.innerText} in ${Math.ceil(end - start)}ms`;\n}\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);