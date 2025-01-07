(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_demo.js":
/*!***************************!*\
  !*** ../pkg/wasm_demo.js ***!
  \***************************/
/*! exports provided: __wbg_set_wasm, shared_memory, Chart, __wbg_buffer_61b7ce01341d7f88, __wbg_length_65d1cd11729ced11, __wbg_length_6c8fd4bc685c1c1a, __wbg_log_5f82480ac7a101b6, __wbg_new_31cb5207e607864d, __wbg_new_3ff5b33b1ce712df, __wbg_set_23d69db4e5c66a6e, __wbg_set_626de3d66914f5f3, __wbindgen_memory, __wbindgen_number_new, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbindgen_throw */
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_length_6c8fd4bc685c1c1a", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_length_6c8fd4bc685c1c1a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_log_5f82480ac7a101b6", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_log_5f82480ac7a101b6"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_31cb5207e607864d", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_new_31cb5207e607864d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_3ff5b33b1ce712df", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_new_3ff5b33b1ce712df"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_23d69db4e5c66a6e", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_set_23d69db4e5c66a6e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_626de3d66914f5f3", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_set_626de3d66914f5f3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_memory", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_memory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_number_new", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_number_new"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_object_drop_ref"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_string_new", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_string_new"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return _wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbindgen_throw"]; });




Object(_wasm_demo_bg_js__WEBPACK_IMPORTED_MODULE_1__["__wbg_set_wasm"])(_wasm_demo_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);

/***/ }),

/***/ "../pkg/wasm_demo_bg.js":
/*!******************************!*\
  !*** ../pkg/wasm_demo_bg.js ***!
  \******************************/
/*! exports provided: __wbg_set_wasm, shared_memory, Chart, __wbg_buffer_61b7ce01341d7f88, __wbg_length_65d1cd11729ced11, __wbg_length_6c8fd4bc685c1c1a, __wbg_log_5f82480ac7a101b6, __wbg_new_31cb5207e607864d, __wbg_new_3ff5b33b1ce712df, __wbg_set_23d69db4e5c66a6e, __wbg_set_626de3d66914f5f3, __wbindgen_memory, __wbindgen_number_new, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_wasm", function() { return __wbg_set_wasm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shared_memory", function() { return shared_memory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_buffer_61b7ce01341d7f88", function() { return __wbg_buffer_61b7ce01341d7f88; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_length_65d1cd11729ced11", function() { return __wbg_length_65d1cd11729ced11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_length_6c8fd4bc685c1c1a", function() { return __wbg_length_6c8fd4bc685c1c1a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_log_5f82480ac7a101b6", function() { return __wbg_log_5f82480ac7a101b6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_31cb5207e607864d", function() { return __wbg_new_31cb5207e607864d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_3ff5b33b1ce712df", function() { return __wbg_new_3ff5b33b1ce712df; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_23d69db4e5c66a6e", function() { return __wbg_set_23d69db4e5c66a6e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_set_626de3d66914f5f3", function() { return __wbg_set_626de3d66914f5f3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_memory", function() { return __wbindgen_memory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_number_new", function() { return __wbindgen_number_new; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return __wbindgen_object_drop_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_string_new", function() { return __wbindgen_string_new; });
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

let stack_pointer = 128;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
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
     * @param {number} ra
     * @param {number} dec
     * @param {number} nu
     * @param {number} n_chan
     * @param {number} phi
     * @param {number} duration
     * @param {number} n_times
     * @param {Int32Array} obs_date
     * @param {string} array
     * @param {Uint8Array} antenna_mask
     * @returns {number}
     */
    static plot_interferometer_uvcoverage(ra, dec, nu, n_chan, phi, duration, n_times, obs_date, array, antenna_mask) {
        try {
            const ptr0 = passStringToWasm0(array, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.chart_plot_interferometer_uvcoverage(ra, dec, nu, n_chan, phi, duration, n_times, addBorrowedObject(obs_date), ptr0, len0, addBorrowedObject(antenna_mask));
            return ret >>> 0;
        } finally {
            heap[stack_pointer++] = undefined;
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

function __wbg_length_6c8fd4bc685c1c1a(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

function __wbg_log_5f82480ac7a101b6(arg0, arg1) {
    console.log(getObject(arg0), getObject(arg1));
};

function __wbg_new_31cb5207e607864d(arg0) {
    const ret = new Int32Array(getObject(arg0));
    return addHeapObject(ret);
};

function __wbg_new_3ff5b33b1ce712df(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

function __wbg_set_23d69db4e5c66a6e(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

function __wbg_set_626de3d66914f5f3(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcGtnL3dhc21fZGVtby5qcyIsIndlYnBhY2s6Ly8vLi4vcGtnL3dhc21fZGVtb19iZy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEM7QUFDVjtBQUNpQjtBQUNuRCx1RUFBYyxDQUFDLCtDQUFJLEU7Ozs7Ozs7Ozs7OztBQ0huQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTztBQUNQO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBLHlCQUF5QixrQkFBa0I7O0FBRTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbURBQW1ELCtCQUErQjs7QUFFbEY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLG1CQUFtQixzQkFBc0I7QUFDaEQ7O0FBRU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxXQUFXO0FBQzFCLGVBQWUsT0FBTztBQUN0QixlQUFlLFdBQVc7QUFDMUIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIwLmJvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdhc20gZnJvbSBcIi4vd2FzbV9kZW1vX2JnLndhc21cIjtcbmV4cG9ydCAqIGZyb20gXCIuL3dhc21fZGVtb19iZy5qc1wiO1xuaW1wb3J0IHsgX193Ymdfc2V0X3dhc20gfSBmcm9tIFwiLi93YXNtX2RlbW9fYmcuanNcIjtcbl9fd2JnX3NldF93YXNtKHdhc20pOyIsImxldCB3YXNtO1xuZXhwb3J0IGZ1bmN0aW9uIF9fd2JnX3NldF93YXNtKHZhbCkge1xuICAgIHdhc20gPSB2YWw7XG59XG5cblxuY29uc3QgaGVhcCA9IG5ldyBBcnJheSgxMjgpLmZpbGwodW5kZWZpbmVkKTtcblxuaGVhcC5wdXNoKHVuZGVmaW5lZCwgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xuXG5mdW5jdGlvbiBnZXRPYmplY3QoaWR4KSB7IHJldHVybiBoZWFwW2lkeF07IH1cblxubGV0IGhlYXBfbmV4dCA9IGhlYXAubGVuZ3RoO1xuXG5mdW5jdGlvbiBhZGRIZWFwT2JqZWN0KG9iaikge1xuICAgIGlmIChoZWFwX25leHQgPT09IGhlYXAubGVuZ3RoKSBoZWFwLnB1c2goaGVhcC5sZW5ndGggKyAxKTtcbiAgICBjb25zdCBpZHggPSBoZWFwX25leHQ7XG4gICAgaGVhcF9uZXh0ID0gaGVhcFtpZHhdO1xuXG4gICAgaGVhcFtpZHhdID0gb2JqO1xuICAgIHJldHVybiBpZHg7XG59XG5cbmZ1bmN0aW9uIGRyb3BPYmplY3QoaWR4KSB7XG4gICAgaWYgKGlkeCA8IDEzMikgcmV0dXJuO1xuICAgIGhlYXBbaWR4XSA9IGhlYXBfbmV4dDtcbiAgICBoZWFwX25leHQgPSBpZHg7XG59XG5cbmZ1bmN0aW9uIHRha2VPYmplY3QoaWR4KSB7XG4gICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGlkeCk7XG4gICAgZHJvcE9iamVjdChpZHgpO1xuICAgIHJldHVybiByZXQ7XG59XG5cbmNvbnN0IGxUZXh0RGVjb2RlciA9IHR5cGVvZiBUZXh0RGVjb2RlciA9PT0gJ3VuZGVmaW5lZCcgPyAoMCwgbW9kdWxlLnJlcXVpcmUpKCd1dGlsJykuVGV4dERlY29kZXIgOiBUZXh0RGVjb2RlcjtcblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IGxUZXh0RGVjb2RlcigndXRmLTgnLCB7IGlnbm9yZUJPTTogdHJ1ZSwgZmF0YWw6IHRydWUgfSk7XG5cbmNhY2hlZFRleHREZWNvZGVyLmRlY29kZSgpO1xuXG5sZXQgY2FjaGVkVWludDhBcnJheU1lbW9yeTAgPSBudWxsO1xuXG5mdW5jdGlvbiBnZXRVaW50OEFycmF5TWVtb3J5MCgpIHtcbiAgICBpZiAoY2FjaGVkVWludDhBcnJheU1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVkVWludDhBcnJheU1lbW9yeTAuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjYWNoZWRVaW50OEFycmF5TWVtb3J5MCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRVaW50OEFycmF5TWVtb3J5MDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20wKHB0ciwgbGVuKSB7XG4gICAgcHRyID0gcHRyID4+PiAwO1xuICAgIHJldHVybiBjYWNoZWRUZXh0RGVjb2Rlci5kZWNvZGUoZ2V0VWludDhBcnJheU1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuLyoqXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hhcmVkX21lbW9yeSgpIHtcbiAgICBjb25zdCByZXQgPSB3YXNtLnNoYXJlZF9tZW1vcnkoKTtcbiAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xufVxuXG5sZXQgc3RhY2tfcG9pbnRlciA9IDEyODtcblxuZnVuY3Rpb24gYWRkQm9ycm93ZWRPYmplY3Qob2JqKSB7XG4gICAgaWYgKHN0YWNrX3BvaW50ZXIgPT0gMSkgdGhyb3cgbmV3IEVycm9yKCdvdXQgb2YganMgc3RhY2snKTtcbiAgICBoZWFwWy0tc3RhY2tfcG9pbnRlcl0gPSBvYmo7XG4gICAgcmV0dXJuIHN0YWNrX3BvaW50ZXI7XG59XG5cbmxldCBXQVNNX1ZFQ1RPUl9MRU4gPSAwO1xuXG5jb25zdCBsVGV4dEVuY29kZXIgPSB0eXBlb2YgVGV4dEVuY29kZXIgPT09ICd1bmRlZmluZWQnID8gKDAsIG1vZHVsZS5yZXF1aXJlKSgndXRpbCcpLlRleHRFbmNvZGVyIDogVGV4dEVuY29kZXI7XG5cbmxldCBjYWNoZWRUZXh0RW5jb2RlciA9IG5ldyBsVGV4dEVuY29kZXIoJ3V0Zi04Jyk7XG5cbmNvbnN0IGVuY29kZVN0cmluZyA9ICh0eXBlb2YgY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlSW50byA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gZnVuY3Rpb24gKGFyZywgdmlldykge1xuICAgIHJldHVybiBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGVJbnRvKGFyZywgdmlldyk7XG59XG4gICAgOiBmdW5jdGlvbiAoYXJnLCB2aWV3KSB7XG4gICAgY29uc3QgYnVmID0gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlKGFyZyk7XG4gICAgdmlldy5zZXQoYnVmKTtcbiAgICByZXR1cm4ge1xuICAgICAgICByZWFkOiBhcmcubGVuZ3RoLFxuICAgICAgICB3cml0dGVuOiBidWYubGVuZ3RoXG4gICAgfTtcbn0pO1xuXG5mdW5jdGlvbiBwYXNzU3RyaW5nVG9XYXNtMChhcmcsIG1hbGxvYywgcmVhbGxvYykge1xuXG4gICAgaWYgKHJlYWxsb2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBidWYgPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGUoYXJnKTtcbiAgICAgICAgY29uc3QgcHRyID0gbWFsbG9jKGJ1Zi5sZW5ndGgsIDEpID4+PiAwO1xuICAgICAgICBnZXRVaW50OEFycmF5TWVtb3J5MCgpLnN1YmFycmF5KHB0ciwgcHRyICsgYnVmLmxlbmd0aCkuc2V0KGJ1Zik7XG4gICAgICAgIFdBU01fVkVDVE9SX0xFTiA9IGJ1Zi5sZW5ndGg7XG4gICAgICAgIHJldHVybiBwdHI7XG4gICAgfVxuXG4gICAgbGV0IGxlbiA9IGFyZy5sZW5ndGg7XG4gICAgbGV0IHB0ciA9IG1hbGxvYyhsZW4sIDEpID4+PiAwO1xuXG4gICAgY29uc3QgbWVtID0gZ2V0VWludDhBcnJheU1lbW9yeTAoKTtcblxuICAgIGxldCBvZmZzZXQgPSAwO1xuXG4gICAgZm9yICg7IG9mZnNldCA8IGxlbjsgb2Zmc2V0KyspIHtcbiAgICAgICAgY29uc3QgY29kZSA9IGFyZy5jaGFyQ29kZUF0KG9mZnNldCk7XG4gICAgICAgIGlmIChjb2RlID4gMHg3RikgYnJlYWs7XG4gICAgICAgIG1lbVtwdHIgKyBvZmZzZXRdID0gY29kZTtcbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0ICE9PSBsZW4pIHtcbiAgICAgICAgaWYgKG9mZnNldCAhPT0gMCkge1xuICAgICAgICAgICAgYXJnID0gYXJnLnNsaWNlKG9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgcHRyID0gcmVhbGxvYyhwdHIsIGxlbiwgbGVuID0gb2Zmc2V0ICsgYXJnLmxlbmd0aCAqIDMsIDEpID4+PiAwO1xuICAgICAgICBjb25zdCB2aWV3ID0gZ2V0VWludDhBcnJheU1lbW9yeTAoKS5zdWJhcnJheShwdHIgKyBvZmZzZXQsIHB0ciArIGxlbik7XG4gICAgICAgIGNvbnN0IHJldCA9IGVuY29kZVN0cmluZyhhcmcsIHZpZXcpO1xuXG4gICAgICAgIG9mZnNldCArPSByZXQud3JpdHRlbjtcbiAgICAgICAgcHRyID0gcmVhbGxvYyhwdHIsIGxlbiwgb2Zmc2V0LCAxKSA+Pj4gMDtcbiAgICB9XG5cbiAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBvZmZzZXQ7XG4gICAgcmV0dXJuIHB0cjtcbn1cblxuY29uc3QgQ2hhcnRGaW5hbGl6YXRpb24gPSAodHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJylcbiAgICA/IHsgcmVnaXN0ZXI6ICgpID0+IHt9LCB1bnJlZ2lzdGVyOiAoKSA9PiB7fSB9XG4gICAgOiBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkocHRyID0+IHdhc20uX193YmdfY2hhcnRfZnJlZShwdHIgPj4+IDAsIDEpKTtcblxuZXhwb3J0IGNsYXNzIENoYXJ0IHtcblxuICAgIF9fZGVzdHJveV9pbnRvX3JhdygpIHtcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcbiAgICAgICAgQ2hhcnRGaW5hbGl6YXRpb24udW5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHB0cjtcbiAgICB9XG5cbiAgICBmcmVlKCkge1xuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xuICAgICAgICB3YXNtLl9fd2JnX2NoYXJ0X2ZyZWUocHRyLCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuX2NoYW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGhpXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5fdGltZXNcbiAgICAgKiBAcGFyYW0ge0ludDMyQXJyYXl9IG9ic19kYXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFycmF5XG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBhbnRlbm5hX21hc2tcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBwbG90X2ludGVyZmVyb21ldGVyX3V2Y292ZXJhZ2UocmEsIGRlYywgbnUsIG5fY2hhbiwgcGhpLCBkdXJhdGlvbiwgbl90aW1lcywgb2JzX2RhdGUsIGFycmF5LCBhbnRlbm5hX21hc2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChhcnJheSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IHdhc20uY2hhcnRfcGxvdF9pbnRlcmZlcm9tZXRlcl91dmNvdmVyYWdlKHJhLCBkZWMsIG51LCBuX2NoYW4sIHBoaSwgZHVyYXRpb24sIG5fdGltZXMsIGFkZEJvcnJvd2VkT2JqZWN0KG9ic19kYXRlKSwgcHRyMCwgbGVuMCwgYWRkQm9ycm93ZWRPYmplY3QoYW50ZW5uYV9tYXNrKSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0ID4+PiAwO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaGVhcFtzdGFja19wb2ludGVyKytdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaGVhcFtzdGFja19wb2ludGVyKytdID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX193YmdfYnVmZmVyXzYxYjdjZTAxMzQxZDdmODgoYXJnMCkge1xuICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS5idWZmZXI7XG4gICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19sZW5ndGhfNjVkMWNkMTE3MjljZWQxMShhcmcwKSB7XG4gICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLmxlbmd0aDtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JnX2xlbmd0aF82YzhmZDRiYzY4NWMxYzFhKGFyZzApIHtcbiAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkubGVuZ3RoO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX193YmdfbG9nXzVmODI0ODBhYzdhMTAxYjYoYXJnMCwgYXJnMSkge1xuICAgIGNvbnNvbGUubG9nKGdldE9iamVjdChhcmcwKSwgZ2V0T2JqZWN0KGFyZzEpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19uZXdfMzFjYjUyMDdlNjA3ODY0ZChhcmcwKSB7XG4gICAgY29uc3QgcmV0ID0gbmV3IEludDMyQXJyYXkoZ2V0T2JqZWN0KGFyZzApKTtcbiAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JnX25ld18zZmY1YjMzYjFjZTcxMmRmKGFyZzApIHtcbiAgICBjb25zdCByZXQgPSBuZXcgVWludDhBcnJheShnZXRPYmplY3QoYXJnMCkpO1xuICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX193Ymdfc2V0XzIzZDY5ZGI0ZTVjNjZhNmUoYXJnMCwgYXJnMSwgYXJnMikge1xuICAgIGdldE9iamVjdChhcmcwKS5zZXQoZ2V0T2JqZWN0KGFyZzEpLCBhcmcyID4+PiAwKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19zZXRfNjI2ZGUzZDY2OTE0ZjVmMyhhcmcwLCBhcmcxLCBhcmcyKSB7XG4gICAgZ2V0T2JqZWN0KGFyZzApLnNldChnZXRPYmplY3QoYXJnMSksIGFyZzIgPj4+IDApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fd2JpbmRnZW5fbWVtb3J5KCkge1xuICAgIGNvbnN0IHJldCA9IHdhc20ubWVtb3J5O1xuICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX193YmluZGdlbl9udW1iZXJfbmV3KGFyZzApIHtcbiAgICBjb25zdCByZXQgPSBhcmcwO1xuICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX193YmluZGdlbl9vYmplY3RfZHJvcF9yZWYoYXJnMCkge1xuICAgIHRha2VPYmplY3QoYXJnMCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX193YmluZGdlbl9zdHJpbmdfbmV3KGFyZzAsIGFyZzEpIHtcbiAgICBjb25zdCByZXQgPSBnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSk7XG4gICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diaW5kZ2VuX3Rocm93KGFyZzAsIGFyZzEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpKTtcbn07XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9