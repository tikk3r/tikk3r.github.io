let wasm;
export function __wbg_set_wasm(val) {
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

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
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

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
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

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
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

const ChartFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_chart_free(ptr >>> 0, 1));
/**
 * Type used on the JS side to convert screen coordinates to chart
 * coordinates.
 */
export class Chart {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Chart.prototype);
        obj.__wbg_ptr = ptr;
        ChartFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
     * Draw Mandelbrot set on the provided canvas element.
     * Return `Chart` struct suitable for coordinate conversion.
     * @param {HTMLCanvasElement} canvas
     * @returns {Chart}
     */
    static mandelbrot(canvas) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.chart_mandelbrot(retptr, addHeapObject(canvas));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return Chart.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {number} pitch
     * @param {number} yaw
     */
    static plot3d(canvas, pitch, yaw) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.chart_plot3d(retptr, addHeapObject(canvas), pitch, yaw);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} canvas_id
     * @param {number} baseline
     * @param {number} frequency
     * @param {number} beam_width
     * @returns {Chart}
     */
    static plot_interferometer_monochrome(canvas_id, baseline, frequency, beam_width) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(canvas_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.chart_plot_interferometer_monochrome(retptr, ptr0, len0, baseline, frequency, beam_width);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return Chart.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {string} canvas_id
     * @param {number} dec
     * @param {number} nu
     * @param {number} n_chan
     * @param {number} phi
     * @param {number} n_times
     * @returns {Chart}
     */
    static plot_interferometer_uvcoverage(canvas_id, dec, nu, n_chan, phi, n_times) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(canvas_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.chart_plot_interferometer_uvcoverage(retptr, ptr0, len0, dec, nu, n_chan, phi, n_times);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return Chart.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * This function can be used to convert screen coordinates to
     * chart coordinates.
     * @param {number} x
     * @param {number} y
     * @returns {Point | undefined}
     */
    coord(x, y) {
        const ret = wasm.chart_coord(this.__wbg_ptr, x, y);
        return ret === 0 ? undefined : Point.__wrap(ret);
    }
}

const PointFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_point_free(ptr >>> 0, 1));
/**
 * Result of screen to chart coordinates conversion.
 */
export class Point {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Point.prototype);
        obj.__wbg_ptr = ptr;
        PointFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_point_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_point_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_point_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_point_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_point_y(this.__wbg_ptr, arg0);
    }
}

export function __wbg_append_e4116d7166395109() { return handleError(function (arg0, arg1) {
    getObject(arg0).append(getObject(arg1));
}, arguments) };

export function __wbg_arc_5886b4a1c9f0a8ed() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);
}, arguments) };

export function __wbg_beginPath_18ab569e70788cc1(arg0) {
    getObject(arg0).beginPath();
};

export function __wbg_body_8d7d8c4aa91dcad8(arg0) {
    const ret = getObject(arg0).body;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_call_b0d8e36992d9900d() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_closePath_f2b82479f22f3aa3(arg0) {
    getObject(arg0).closePath();
};

export function __wbg_createElement_89923fcb809656b7() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_document_f11bc4f7c03e1745(arg0) {
    const ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_fillRect_d17933580f17fcb0(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
};

export function __wbg_fillText_f7c6f84859022688() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
}, arguments) };

export function __wbg_fill_d04621325e9c029b(arg0) {
    getObject(arg0).fill();
};

export function __wbg_getContext_5eaf5645cd6acb46() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_getElementById_dcc9f1f3cfdca0bc(arg0, arg1, arg2) {
    const ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_height_f36c36e27347cf38(arg0) {
    const ret = getObject(arg0).height;
    return ret;
};

export function __wbg_instanceof_CanvasRenderingContext2d_23b21317d73228be(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof CanvasRenderingContext2D;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_HtmlCanvasElement_f764441ef5ddb63f(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_HtmlElement_d94ed69c6883a691(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof HTMLElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Window_d2514c6a7ee7ba60(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_lineTo_1321b7a30d82f376(arg0, arg1, arg2) {
    getObject(arg0).lineTo(arg1, arg2);
};

export function __wbg_moveTo_3069b186b2004933(arg0, arg1, arg2) {
    getObject(arg0).moveTo(arg1, arg2);
};

export function __wbg_newnoargs_fd9e4bf8be2bc16d(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbg_offsetHeight_fd6bd1cef9ee2d02(arg0) {
    const ret = getObject(arg0).offsetHeight;
    return ret;
};

export function __wbg_offsetWidth_8550d6d56c0b93ed(arg0) {
    const ret = getObject(arg0).offsetWidth;
    return ret;
};

export function __wbg_remove_530b4f3163f72a83(arg0) {
    getObject(arg0).remove();
};

export function __wbg_restore_9ac3ed45c09936ff(arg0) {
    getObject(arg0).restore();
};

export function __wbg_rotate_cc1d01a911380d03() { return handleError(function (arg0, arg1) {
    getObject(arg0).rotate(arg1);
}, arguments) };

export function __wbg_save_2f42b396c1a97535(arg0) {
    getObject(arg0).save();
};

export function __wbg_setAttribute_148e0e65e20e5f27() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setfillStyle_d54008d1e987d58a(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
};

export function __wbg_setfont_b3126b9131bc56b4(arg0, arg1, arg2) {
    getObject(arg0).font = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlineWidth_03305d3599ca8adb(arg0, arg1) {
    getObject(arg0).lineWidth = arg1;
};

export function __wbg_setstrokeStyle_b0ba63182729d0b2(arg0, arg1) {
    getObject(arg0).strokeStyle = getObject(arg1);
};

export function __wbg_settextAlign_13ad1c3f136337a6(arg0, arg1, arg2) {
    getObject(arg0).textAlign = getStringFromWasm0(arg1, arg2);
};

export function __wbg_settextBaseline_33dcd187fb0bc648(arg0, arg1, arg2) {
    getObject(arg0).textBaseline = getStringFromWasm0(arg1, arg2);
};

export function __wbg_settextContent_0eab7fce6c07d5c9(arg0, arg1, arg2) {
    getObject(arg0).textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
};

export function __wbg_static_accessor_GLOBAL_0be7472e492ad3e3() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_static_accessor_SELF_1dc398a895c82351() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_static_accessor_WINDOW_ae1c80c7eea8d64a() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_stringify_f4f701bc34ceda61() { return handleError(function (arg0) {
    const ret = JSON.stringify(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_strokeRect_c0e5c5fa8ee05935(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).strokeRect(arg1, arg2, arg3, arg4);
};

export function __wbg_stroke_0feb24d5e9f9c915(arg0) {
    getObject(arg0).stroke();
};

export function __wbg_translate_fe29257d3c848e84() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).translate(arg1, arg2);
}, arguments) };

export function __wbg_width_9927e6a7adb23d6d(arg0) {
    const ret = getObject(arg0).width;
    return ret;
};

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

