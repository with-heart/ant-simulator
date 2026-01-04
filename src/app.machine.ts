import { setup } from 'xstate'
import { canvasMachine } from './canvas.machine'

export const appSetup = setup({
  actors: {
    canvas: canvasMachine,
  },
})

export const appMachine = appSetup.createMachine({
  invoke: {
    src: 'canvas',
    id: 'canvas',
    systemId: 'canvas',
  },
})
