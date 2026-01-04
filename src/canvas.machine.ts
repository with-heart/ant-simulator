import { setup } from 'xstate'
import * as Canvas from './canvas'
import { WORLD_UNITS_SIZE } from './constants'

const getCanvas = () =>
  document.getElementById('simulator') as HTMLCanvasElement
const getCtx = () => getCanvas().getContext('2d')!

const canvasSetup = setup({})

const initialize = canvasSetup.createAction(() => {
  const canvas = getCanvas()
  Canvas.initialize(canvas)

  const ctx = getCtx()
  ctx.save()

  ctx.fillStyle = 'black'
  ctx.fillRect(WORLD_UNITS_SIZE / 2 - 50, WORLD_UNITS_SIZE / 2 - 50, 100, 100)

  ctx.restore()
})

export const canvasMachine = canvasSetup.createMachine({
  id: 'canvas',
  entry: initialize,
})
