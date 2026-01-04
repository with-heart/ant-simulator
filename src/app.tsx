import { Application, extend, useApplication, useTick } from '@pixi/react'
import { Container, Graphics } from 'pixi.js'
import { useMemo, useRef, useState, type ReactNode } from 'react'

extend({
  Container,
  Graphics,
})

const WorldRoot = ({
  children,
  width,
  height,
}: {
  children: ReactNode
  width: number
  height: number
}) => {
  const { app } = useApplication()

  const scale = useMemo(() => {
    const s = app.screen
    return Math.min(s.width / width, s.height / height)
  }, [app, width, height])

  return <pixiContainer scale={scale}>{children}</pixiContainer>
}

const AntSprite = () => {
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)

  useTick({
    callback: (ticker) => {
      const deltaX = (Math.random() - 0.5) * ticker.deltaTime
      const deltaY = (Math.random() - 0.5) * ticker.deltaTime

      setX((x) => x + deltaX)
      setY((y) => y + deltaY)
    },
    isEnabled: true,
  })

  return (
    <pixiGraphics
      x={x}
      y={y}
      draw={(g) => {
        g.clear()
        g.rect(-0.5, -0.5, 1, 1).fill('black')
      }}
    />
  )
}

export function App() {
  const parentRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={parentRef}
      style={{
        width: '95vmin',
        aspectRatio: '1 / 1',
        border: '1px solid black',
      }}
    >
      <Application
        resizeTo={parentRef}
        resolution={window.devicePixelRatio || 1}
        backgroundColor={0xffffff}
        autoDensity
      >
        <WorldRoot width={100} height={100}>
          <AntSprite x={50} y={50} />
        </WorldRoot>
      </Application>
    </div>
  )
}
