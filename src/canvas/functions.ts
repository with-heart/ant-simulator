import { WORLD_UNITS_SIZE } from '../constants'

export function scaleCanvas(canvas: HTMLCanvasElement): void {
  const scaleFactor = window.devicePixelRatio || 1

  canvas.width = WORLD_UNITS_SIZE * scaleFactor
  canvas.height = WORLD_UNITS_SIZE * scaleFactor

  const ctx = canvas.getContext('2d')!
  ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0)
}
