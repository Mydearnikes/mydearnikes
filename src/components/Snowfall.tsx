// components/Snowfall.tsx
'use client'

import Snowfall from 'react-snowfall'

export default function SnowfallEffect() {
  return (
    <Snowfall
      snowflakeCount={100}
      speed={[0.5, 1.5]}
      wind={[-0.5, 0.5]}
      radius={[0.5, 2.5]}
      color="#a8d8ea" // Soft blue color
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  )
}