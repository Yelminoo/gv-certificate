import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'GV Certificate - Gemstone Certificate Generator'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #8d1b20, #6d1418)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>💎</div>
        <div style={{ marginBottom: 10 }}>GV Certificate</div>
        <div style={{ fontSize: 30, fontWeight: 'normal', opacity: 0.9 }}>
          Gemstone Certificate Generator
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
