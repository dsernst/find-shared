import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const items = searchParams.get('items')?.split(',').filter(Boolean) || []

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            color: '#ededed',
            fontFamily: 'sans-serif',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ opacity: '0.5', fontSize: '24px', fontStyle: 'italic' }}>Privately</div>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                margin: '10px 0',
                opacity: '0.9',
              }}
            >
              Find Shared
            </h1>
            <h3 style={{ fontSize: '32px', opacity: '0.7', marginBottom: '40px' }}>Interests</h3>
          </div>

          {items.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '80%',
                textAlign: 'center',
              }}
            >
              {items.slice(0, 5).map((item, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '28px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {item}
                </div>
              ))}
              {items.length > 5 && (
                <div style={{ fontSize: '24px', opacity: '0.7', marginTop: '8px' }}>
                  + {items.length - 5} more...
                </div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: '24px', opacity: '0.7', textAlign: 'center', maxWidth: '80%' }}>
              Privately mark interests— only mutual overlaps get revealed
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
