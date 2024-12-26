/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bootstrap.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"../pkg/wasm_demo_bg.wasm": function() {
/******/ 			return {
/******/ 				"./wasm_demo_bg.js": {
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_width_9927e6a7adb23d6d": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_width_9927e6a7adb23d6d"](p0i32);
/******/ 					},
/******/ 					"__wbg_height_f36c36e27347cf38": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_height_f36c36e27347cf38"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb": function() {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb"]();
/******/ 					},
/******/ 					"__wbg_static_accessor_WINDOW_ae1c80c7eea8d64a": function() {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_static_accessor_WINDOW_ae1c80c7eea8d64a"]();
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_is_undefined": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbindgen_is_undefined"](p0i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_fd9e4bf8be2bc16d": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_newnoargs_fd9e4bf8be2bc16d"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_b0d8e36992d9900d": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_call_b0d8e36992d9900d"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_static_accessor_GLOBAL_0be7472e492ad3e3": function() {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_static_accessor_GLOBAL_0be7472e492ad3e3"]();
/******/ 					},
/******/ 					"__wbg_static_accessor_SELF_1dc398a895c82351": function() {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_static_accessor_SELF_1dc398a895c82351"]();
/******/ 					},
/******/ 					"__wbg_instanceof_Window_d2514c6a7ee7ba60": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_instanceof_Window_d2514c6a7ee7ba60"](p0i32);
/******/ 					},
/******/ 					"__wbg_document_f11bc4f7c03e1745": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_document_f11bc4f7c03e1745"](p0i32);
/******/ 					},
/******/ 					"__wbg_body_8d7d8c4aa91dcad8": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_body_8d7d8c4aa91dcad8"](p0i32);
/******/ 					},
/******/ 					"__wbg_createElement_89923fcb809656b7": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_createElement_89923fcb809656b7"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_settextContent_0eab7fce6c07d5c9": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_settextContent_0eab7fce6c07d5c9"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setAttribute_148e0e65e20e5f27": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_setAttribute_148e0e65e20e5f27"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__wbg_append_e4116d7166395109": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_append_e4116d7166395109"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_instanceof_HtmlElement_d94ed69c6883a691": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_instanceof_HtmlElement_d94ed69c6883a691"](p0i32);
/******/ 					},
/******/ 					"__wbg_offsetHeight_fd6bd1cef9ee2d02": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_offsetHeight_fd6bd1cef9ee2d02"](p0i32);
/******/ 					},
/******/ 					"__wbg_offsetWidth_8550d6d56c0b93ed": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_offsetWidth_8550d6d56c0b93ed"](p0i32);
/******/ 					},
/******/ 					"__wbg_remove_530b4f3163f72a83": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_remove_530b4f3163f72a83"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_stringify_f4f701bc34ceda61": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_stringify_f4f701bc34ceda61"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_get": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbindgen_string_get"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_getElementById_dcc9f1f3cfdca0bc": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_getElementById_dcc9f1f3cfdca0bc"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_instanceof_HtmlCanvasElement_f764441ef5ddb63f": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_instanceof_HtmlCanvasElement_f764441ef5ddb63f"](p0i32);
/******/ 					},
/******/ 					"__wbg_getContext_5eaf5645cd6acb46": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_getContext_5eaf5645cd6acb46"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_instanceof_CanvasRenderingContext2d_23b21317d73228be": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_instanceof_CanvasRenderingContext2d_23b21317d73228be"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_setfillStyle_d54008d1e987d58a": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_setfillStyle_d54008d1e987d58a"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_fillRect_d17933580f17fcb0": function(p0i32,p1f64,p2f64,p3f64,p4f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_fillRect_d17933580f17fcb0"](p0i32,p1f64,p2f64,p3f64,p4f64);
/******/ 					},
/******/ 					"__wbg_beginPath_18ab569e70788cc1": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_beginPath_18ab569e70788cc1"](p0i32);
/******/ 					},
/******/ 					"__wbg_moveTo_3069b186b2004933": function(p0i32,p1f64,p2f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_moveTo_3069b186b2004933"](p0i32,p1f64,p2f64);
/******/ 					},
/******/ 					"__wbg_lineTo_1321b7a30d82f376": function(p0i32,p1f64,p2f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_lineTo_1321b7a30d82f376"](p0i32,p1f64,p2f64);
/******/ 					},
/******/ 					"__wbg_closePath_f2b82479f22f3aa3": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_closePath_f2b82479f22f3aa3"](p0i32);
/******/ 					},
/******/ 					"__wbg_fill_d04621325e9c029b": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_fill_d04621325e9c029b"](p0i32);
/******/ 					},
/******/ 					"__wbg_setstrokeStyle_b0ba63182729d0b2": function(p0i32,p1i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_setstrokeStyle_b0ba63182729d0b2"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_stroke_0feb24d5e9f9c915": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_stroke_0feb24d5e9f9c915"](p0i32);
/******/ 					},
/******/ 					"__wbg_strokeRect_c0e5c5fa8ee05935": function(p0i32,p1f64,p2f64,p3f64,p4f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_strokeRect_c0e5c5fa8ee05935"](p0i32,p1f64,p2f64,p3f64,p4f64);
/******/ 					},
/******/ 					"__wbg_arc_5886b4a1c9f0a8ed": function(p0i32,p1f64,p2f64,p3f64,p4f64,p5f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_arc_5886b4a1c9f0a8ed"](p0i32,p1f64,p2f64,p3f64,p4f64,p5f64);
/******/ 					},
/******/ 					"__wbg_setlineWidth_03305d3599ca8adb": function(p0i32,p1f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_setlineWidth_03305d3599ca8adb"](p0i32,p1f64);
/******/ 					},
/******/ 					"__wbg_save_2f42b396c1a97535": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_save_2f42b396c1a97535"](p0i32);
/******/ 					},
/******/ 					"__wbg_translate_fe29257d3c848e84": function(p0i32,p1f64,p2f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_translate_fe29257d3c848e84"](p0i32,p1f64,p2f64);
/******/ 					},
/******/ 					"__wbg_rotate_cc1d01a911380d03": function(p0i32,p1f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_rotate_cc1d01a911380d03"](p0i32,p1f64);
/******/ 					},
/******/ 					"__wbg_settextBaseline_33dcd187fb0bc648": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_settextBaseline_33dcd187fb0bc648"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_settextAlign_13ad1c3f136337a6": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_settextAlign_13ad1c3f136337a6"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setfont_b3126b9131bc56b4": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_setfont_b3126b9131bc56b4"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_fillText_f7c6f84859022688": function(p0i32,p1i32,p2i32,p3f64,p4f64) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_fillText_f7c6f84859022688"](p0i32,p1i32,p2i32,p3f64,p4f64);
/******/ 					},
/******/ 					"__wbg_restore_9ac3ed45c09936ff": function(p0i32) {
/******/ 						return installedModules["../pkg/wasm_demo_bg.js"].exports["__wbg_restore_9ac3ed45c09936ff"](p0i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["../pkg/wasm_demo_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../pkg/wasm_demo_bg.wasm":"94a78d42a54dfe1c3970"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bootstrap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bootstrap.js":
/*!**********************!*\
  !*** ./bootstrap.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {init();\n\nasync function init() {\n    if (typeof process == \"object\") {\n        // We run in the npm/webpack environment.\n        const [{Chart}, {main, setup}] = await Promise.all([\n            __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! wasm-demo */ \"../pkg/wasm_demo.js\")),\n            __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./index.js */ \"./index.js\")),\n        ]);\n        setup(Chart);\n        main();\n    } else {\n        const [{Chart, default: init}, {main, setup}] = await Promise.all([\n            __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../pkg/wasm_demo.js */ \"../pkg/wasm_demo.js\")),\n            __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./index.js */ \"./index.js\")),\n        ]);\n        await init();\n        setup(Chart);\n        main();\n    }\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./bootstrap.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ })

/******/ });