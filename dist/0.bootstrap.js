(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_demo.js":
/*!***************************!*\
  !*** ../pkg/wasm_demo.js ***!
  \***************************/
/*! exports provided: __wbg_set_wasm, shared_memory, Chart, __wbg_buffer_61b7ce01341d7f88, __wbg_length_65d1cd11729ced11, __wbg_new_3ff5b33b1ce712df, __wbg_set_23d69db4e5c66a6e, __wbindgen_memory, __wbindgen_object_drop_ref, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wasm_demo_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_demo_bg.wasm */ "../pkg/wasm_demo_bg.wasm");
/* harmony import */ var _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasm_demo_bg.js */ "../pkg/wasm_demo_bg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_wasm", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_set_wasm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shared_memory", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["shared_memory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["Chart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_buffer_61b7ce01341d7f88", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_buffer_61b7ce01341d7f88"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_length_65d1cd11729ced11", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_length_65d1cd11729ced11"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_3ff5b33b1ce712df", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_new_3ff5b33b1ce712df"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_23d69db4e5c66a6e", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_set_23d69db4e5c66a6e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_memory", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_memory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_object_drop_ref"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_throw"]; });




Object(_wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_set_wasm"])(_wasm_demo_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);

/***/ }),

/***/ "../pkg/wasm_demo_bg.js":
/*!******************************!*\
  !*** ../pkg/wasm_demo_bg.js ***!
  \******************************/
/*! exports provided: __wbg_set_wasm, shared_memory, Chart, __wbg_buffer_61b7ce01341d7f88, __wbg_length_65d1cd11729ced11, __wbg_new_3ff5b33b1ce712df, __wbg_set_23d69db4e5c66a6e, __wbindgen_memory, __wbindgen_object_drop_ref, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_wasm", function() { return __wbg_set_wasm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shared_memory", function() { return shared_memory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_buffer_61b7ce01341d7f88", function() { return __wbg_buffer_61b7ce01341d7f88; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_length_65d1cd11729ced11", function() { return __wbg_length_65d1cd11729ced11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_3ff5b33b1ce712df", function() { return __wbg_new_3ff5b33b1ce712df; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_23d69db4e5c66a6e", function() { return __wbg_set_23d69db4e5c66a6e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_memory", function() { return __wbindgen_memory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return __wbindgen_object_drop_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return __wbindgen_throw; });
let wasm;
function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
/**
 * @returns {any}
 */
function shared_memory() {
    const ret = wasm.shared_memory();
    return takeObject(ret);
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let stack_pointer = 128;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

const ChartFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_chart_free(ptr >>> 0, 1));

class Chart {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ChartFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_chart_free(ptr, 0);
    }
    /**
     * @param {number} dec
     * @param {number} nu
     * @param {number} n_chan
     * @param {number} phi
     * @param {number} duration
     * @param {number} n_times
     * @param {string} array
     * @param {Uint8Array} antenna_mask
     * @returns {number}
     */
    static plot_interferometer_uvcoverage(dec, nu, n_chan, phi, duration, n_times, array, antenna_mask) {
        try {
            const ptr0 = passStringToWasm0(array, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.chart_plot_interferometer_uvcoverage(dec, nu, n_chan, phi, duration, n_times, ptr0, len0, addBorrowedObject(antenna_mask));
            return ret >>> 0;
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}

function __wbg_buffer_61b7ce01341d7f88(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

function __wbg_length_65d1cd11729ced11(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

function __wbg_new_3ff5b33b1ce712df(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

function __wbg_set_23d69db4e5c66a6e(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "../pkg/wasm_demo_bg.wasm":
/*!********************************!*\
  !*** ../pkg/wasm_demo_bg.wasm ***!
  \********************************/
/*! exports provided: memory, __wbg_chart_free, shared_memory, chart_plot_interferometer_uvcoverage, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];
__webpack_require__.r(exports);
// export exports from WebAssembly module
for(var name in wasmExports) if(name != "__webpack_init__") exports[name] = wasmExports[name];
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_demo_bg.js */ "../pkg/wasm_demo_bg.js");


// exec wasm module
wasmExports["__webpack_init__"]()

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcGtnL3dhc21fZGVtby5qcyIsIndlYnBhY2s6Ly8vLi4vcGtnL3dhc21fZGVtb19iZy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEM7QUFDVjtBQUNpQjtBQUNuRCx1RUFBYyxDQUFDLCtDQUFJLEU7Ozs7Ozs7Ozs7OztBQ0huQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTztBQUNQO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBLHlCQUF5QixrQkFBa0I7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbURBQW1ELCtCQUErQjs7QUFFbEY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFVBQVUsY0FBYztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLG1CQUFtQixzQkFBc0I7QUFDaEQ7O0FBRU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxXQUFXO0FBQzFCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIwLmJvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdhc20gZnJvbSBcIi4vd2FzbV9kZW1vX2JnLndhc21cIjtcbmV4cG9ydCAqIGZyb20gXCIuL3dhc21fZGVtb19iZy5qc1wiO1xuaW1wb3J0IHsgX193Ymdfc2V0X3dhc20gfSBmcm9tIFwiLi93YXNtX2RlbW9fYmcuanNcIjtcbl9fd2JnX3NldF93YXNtKHdhc20pOyIsImxldCB3YXNtO1xuZXhwb3J0IGZ1bmN0aW9uIF9fd2JnX3NldF93YXNtKHZhbCkge1xuICAgIHdhc20gPSB2YWw7XG59XG5cblxuY29uc3QgaGVhcCA9IG5ldyBBcnJheSgxMjgpLmZpbGwodW5kZWZpbmVkKTtcblxuaGVhcC5wdXNoKHVuZGVmaW5lZCwgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xuXG5mdW5jdGlvbiBnZXRPYmplY3QoaWR4KSB7IHJldHVybiBoZWFwW2lkeF07IH1cblxubGV0IGhlYXBfbmV4dCA9IGhlYXAubGVuZ3RoO1xuXG5mdW5jdGlvbiBhZGRIZWFwT2JqZWN0KG9iaikge1xuICAgIGlmIChoZWFwX25leHQgPT09IGhlYXAubGVuZ3RoKSBoZWFwLnB1c2goaGVhcC5sZW5ndGggKyAxKTtcbiAgICBjb25zdCBpZHggPSBoZWFwX25leHQ7XG4gICAgaGVhcF9uZXh0ID0gaGVhcFtpZHhdO1xuXG4gICAgaGVhcFtpZHhdID0gb2JqO1xuICAgIHJldHVybiBpZHg7XG59XG5cbmZ1bmN0aW9uIGRyb3BPYmplY3QoaWR4KSB7XG4gICAgaWYgKGlkeCA8IDEzMikgcmV0dXJuO1xuICAgIGhlYXBbaWR4XSA9IGhlYXBfbmV4dDtcbiAgICBoZWFwX25leHQgPSBpZHg7XG59XG5cbmZ1bmN0aW9uIHRha2VPYmplY3QoaWR4KSB7XG4gICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGlkeCk7XG4gICAgZHJvcE9iamVjdChpZHgpO1xuICAgIHJldHVybiByZXQ7XG59XG5cbmNvbnN0IGxUZXh0RGVjb2RlciA9IHR5cGVvZiBUZXh0RGVjb2RlciA9PT0gJ3VuZGVmaW5lZCcgPyAoMCwgbW9kdWxlLnJlcXVpcmUpKCd1dGlsJykuVGV4dERlY29kZXIgOiBUZXh0RGVjb2RlcjtcblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IGxUZXh0RGVjb2RlcigndXRmLTgnLCB7IGlnbm9yZUJPTTogdHJ1ZSwgZmF0YWw6IHRydWUgfSk7XG5cbmNhY2hlZFRleHREZWNvZGVyLmRlY29kZSgpO1xuXG5sZXQgY2FjaGVkVWludDhBcnJheU1lbW9yeTAgPSBudWxsO1xuXG5mdW5jdGlvbiBnZXRVaW50OEFycmF5TWVtb3J5MCgpIHtcbiAgICBpZiAoY2FjaGVkVWludDhBcnJheU1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVkVWludDhBcnJheU1lbW9yeTAuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRVaW50OEFycmF5TWVtb3J5MDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20wKHB0ciwgbGVuKSB7XG4gICAgcHRyID0gcHRyID4+PiAwO1xuICAgIHJldHVybiBjYWNoZWRUZXh0RGVjb2Rlci5kZWNvZGUoZ2V0VWludDhBcnJheU1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuLyoqXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hhcmVkX21lbW9yeSgpIHtcbiAgICBjb25zdCByZXQgPSB3YXNtLnNoYXJlZF9tZW1vcnkoKTtcbiAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xufVxuXG5sZXQgV0FTTV9WRUNUT1JfTEVOID0gMDtcblxuY29uc3QgbFRleHRFbmNvZGVyID0gdHlwZW9mIFRleHRFbmNvZGVyID09PSAndW5kZWZpbmVkJyA/ICgwLCBtb2R1bGUucmVxdWlyZSkoJ3V0aWwnKS5UZXh0RW5jb2RlciA6IFRleHRFbmNvZGVyO1xuXG5sZXQgY2FjaGVkVGV4dEVuY29kZXIgPSBuZXcgbFRleHRFbmNvZGVyKCd1dGYtOCcpO1xuXG5jb25zdCBlbmNvZGVTdHJpbmcgPSAodHlwZW9mIGNhY2hlZFRleHRFbmNvZGVyLmVuY29kZUludG8gPT09ICdmdW5jdGlvbidcbiAgICA/IGZ1bmN0aW9uIChhcmcsIHZpZXcpIHtcbiAgICByZXR1cm4gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlSW50byhhcmcsIHZpZXcpO1xufVxuICAgIDogZnVuY3Rpb24gKGFyZywgdmlldykge1xuICAgIGNvbnN0IGJ1ZiA9IGNhY2hlZFRleHRFbmNvZGVyLmVuY29kZShhcmcpO1xuICAgIHZpZXcuc2V0KGJ1Zik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVhZDogYXJnLmxlbmd0aCxcbiAgICAgICAgd3JpdHRlbjogYnVmLmxlbmd0aFxuICAgIH07XG59KTtcblxuZnVuY3Rpb24gcGFzc1N0cmluZ1RvV2FzbTAoYXJnLCBtYWxsb2MsIHJlYWxsb2MpIHtcblxuICAgIGlmIChyZWFsbG9jID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYnVmID0gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlKGFyZyk7XG4gICAgICAgIGNvbnN0IHB0ciA9IG1hbGxvYyhidWYubGVuZ3RoLCAxKSA+Pj4gMDtcbiAgICAgICAgZ2V0VWludDhBcnJheU1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGJ1Zi5sZW5ndGgpLnNldChidWYpO1xuICAgICAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBidWYubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH1cblxuICAgIGxldCBsZW4gPSBhcmcubGVuZ3RoO1xuICAgIGxldCBwdHIgPSBtYWxsb2MobGVuLCAxKSA+Pj4gMDtcblxuICAgIGNvbnN0IG1lbSA9IGdldFVpbnQ4QXJyYXlNZW1vcnkwKCk7XG5cbiAgICBsZXQgb2Zmc2V0ID0gMDtcblxuICAgIGZvciAoOyBvZmZzZXQgPCBsZW47IG9mZnNldCsrKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBhcmcuY2hhckNvZGVBdChvZmZzZXQpO1xuICAgICAgICBpZiAoY29kZSA+IDB4N0YpIGJyZWFrO1xuICAgICAgICBtZW1bcHRyICsgb2Zmc2V0XSA9IGNvZGU7XG4gICAgfVxuXG4gICAgaWYgKG9mZnNldCAhPT0gbGVuKSB7XG4gICAgICAgIGlmIChvZmZzZXQgIT09IDApIHtcbiAgICAgICAgICAgIGFyZyA9IGFyZy5zbGljZShvZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIHB0ciA9IHJlYWxsb2MocHRyLCBsZW4sIGxlbiA9IG9mZnNldCArIGFyZy5sZW5ndGggKiAzLCAxKSA+Pj4gMDtcbiAgICAgICAgY29uc3QgdmlldyA9IGdldFVpbnQ4QXJyYXlNZW1vcnkwKCkuc3ViYXJyYXkocHRyICsgb2Zmc2V0LCBwdHIgKyBsZW4pO1xuICAgICAgICBjb25zdCByZXQgPSBlbmNvZGVTdHJpbmcoYXJnLCB2aWV3KTtcblxuICAgICAgICBvZmZzZXQgKz0gcmV0LndyaXR0ZW47XG4gICAgICAgIHB0ciA9IHJlYWxsb2MocHRyLCBsZW4sIG9mZnNldCwgMSkgPj4+IDA7XG4gICAgfVxuXG4gICAgV0FTTV9WRUNUT1JfTEVOID0gb2Zmc2V0O1xuICAgIHJldHVybiBwdHI7XG59XG5cbmxldCBzdGFja19wb2ludGVyID0gMTI4O1xuXG5mdW5jdGlvbiBhZGRCb3Jyb3dlZE9iamVjdChvYmopIHtcbiAgICBpZiAoc3RhY2tfcG9pbnRlciA9PSAxKSB0aHJvdyBuZXcgRXJyb3IoJ291dCBvZiBqcyBzdGFjaycpO1xuICAgIGhlYXBbLS1zdGFja19wb2ludGVyXSA9IG9iajtcbiAgICByZXR1cm4gc3RhY2tfcG9pbnRlcjtcbn1cblxuY29uc3QgQ2hhcnRGaW5hbGl6YXRpb24gPSAodHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJylcbiAgICA/IHsgcmVnaXN0ZXI6ICgpID0+IHt9LCB1bnJlZ2lzdGVyOiAoKSA9PiB7fSB9XG4gICAgOiBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkocHRyID0+IHdhc20uX193YmdfY2hhcnRfZnJlZShwdHIgPj4+IDAsIDEpKTtcblxuZXhwb3J0IGNsYXNzIENoYXJ0IHtcblxuICAgIF9fZGVzdHJveV9pbnRvX3JhdygpIHtcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcbiAgICAgICAgQ2hhcnRGaW5hbGl6YXRpb24udW5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHB0cjtcbiAgICB9XG5cbiAgICBmcmVlKCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xuICAgICAgICB3YXNtLl9fd2JnX2NoYXJ0X2ZyZWUocHRyLCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuX2NoYW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGhpXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5fdGltZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJyYXlcbiAgICAgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGFudGVubmFfbWFza1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIHBsb3RfaW50ZXJmZXJvbWV0ZXJfdXZjb3ZlcmFnZShkZWMsIG51LCBuX2NoYW4sIHBoaSwgZHVyYXRpb24sIG5fdGltZXMsIGFycmF5LCBhbnRlbm5hX21hc2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChhcnJheSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IHdhc20uY2hhcnRfcGxvdF9pbnRlcmZlcm9tZXRlcl91dmNvdmVyYWdlKGRlYywgbnUsIG5fY2hhbiwgcGhpLCBkdXJhdGlvbiwgbl90aW1lcywgcHRyMCwgbGVuMCwgYWRkQm9ycm93ZWRPYmplY3QoYW50ZW5uYV9tYXNrKSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0ID4+PiAwO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaGVhcFtzdGFja19wb2ludGVyKytdID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX193YmdfYnVmZmVyXzYxYjdjZTAxMzQxZDdmODgoYXJnMCkge1xuICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS5idWZmZXI7XG4gICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19sZW5ndGhfNjVkMWNkMTE3MjljZWQxMShhcmcwKSB7XG4gICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLmxlbmd0aDtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JnX25ld18zZmY1YjMzYjFjZTcxMmRmKGFyZzApIHtcbiAgICBjb25zdCByZXQgPSBuZXcgVWludDhBcnJheShnZXRPYmplY3QoYXJnMCkpO1xuICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX193Ymdfc2V0XzIzZDY5ZGI0ZTVjNjZhNmUoYXJnMCwgYXJnMSwgYXJnMikge1xuICAgIGdldE9iamVjdChhcmcwKS5zZXQoZ2V0T2JqZWN0KGFyZzEpLCBhcmcyID4+PiAwKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diaW5kZ2VuX21lbW9yeSgpIHtcbiAgICBjb25zdCByZXQgPSB3YXNtLm1lbW9yeTtcbiAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JpbmRnZW5fb2JqZWN0X2Ryb3BfcmVmKGFyZzApIHtcbiAgICB0YWtlT2JqZWN0KGFyZzApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JpbmRnZW5fdGhyb3coYXJnMCwgYXJnMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSkpO1xufTtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbE1vZHVsZSkge1xuXHRpZiAoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdHZhciBtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG9yaWdpbmFsTW9kdWxlKTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJleHBvcnRzXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=