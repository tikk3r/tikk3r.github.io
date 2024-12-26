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
