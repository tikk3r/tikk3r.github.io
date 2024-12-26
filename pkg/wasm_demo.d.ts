/* tslint:disable */
/* eslint-disable */
/**
 * Type used on the JS side to convert screen coordinates to chart
 * coordinates.
 */
export class Chart {
  private constructor();
  free(): void;
  /**
   * Draw Mandelbrot set on the provided canvas element.
   * Return `Chart` struct suitable for coordinate conversion.
   */
  static mandelbrot(canvas: HTMLCanvasElement): Chart;
  static plot3d(canvas: HTMLCanvasElement, pitch: number, yaw: number): void;
  static plot_interferometer_monochrome(canvas_id: string, baseline: number, frequency: number, beam_width: number): Chart;
  static plot_interferometer_uvcoverage(canvas_id: string, dec: number, nu: number, n_chan: number, phi: number, n_times: number): Chart;
  /**
   * This function can be used to convert screen coordinates to
   * chart coordinates.
   */
  coord(x: number, y: number): Point | undefined;
}
/**
 * Result of screen to chart coordinates conversion.
 */
export class Point {
  private constructor();
  free(): void;
  x: number;
  y: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_chart_free: (a: number, b: number) => void;
  readonly __wbg_point_free: (a: number, b: number) => void;
  readonly __wbg_get_point_x: (a: number) => number;
  readonly __wbg_set_point_x: (a: number, b: number) => void;
  readonly __wbg_get_point_y: (a: number) => number;
  readonly __wbg_set_point_y: (a: number, b: number) => void;
  readonly chart_mandelbrot: (a: number, b: number) => void;
  readonly chart_plot3d: (a: number, b: number, c: number, d: number) => void;
  readonly chart_plot_interferometer_monochrome: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly chart_plot_interferometer_uvcoverage: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly chart_coord: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
