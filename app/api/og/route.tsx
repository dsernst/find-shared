import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const items =
      searchParams.get('items')?.split(',').map(decodeURIComponent).filter(Boolean) || []

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#0a0a0a',
            color: '#ededed',
            fontFamily: 'sans-serif',
            padding: '60px',
          }}
        >
          {/* Left column - Header */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: '40px',
            }}
          >
            <div style={{ opacity: '0.5', fontSize: '32px', fontStyle: 'italic', display: 'flex' }}>
              Privately
            </div>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                margin: '16px 0',
                opacity: '0.9',
                display: 'flex',
              }}
            >
              Find Shared
            </h1>
            <h3 style={{ fontSize: '48px', opacity: '0.7', display: 'flex' }}>Interests</h3>
          </div>

          {/* Right column - Items */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              paddingLeft: '60px',
            }}
          >
            {items.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {items.slice(0, 5).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '36px',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {item}
                  </div>
                ))}
                {items.length > 5 && (
                  <div
                    style={{
                      fontSize: '32px',
                      opacity: '0.7',
                      marginTop: '12px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    + {items.length - 5} more...
                  </div>
                )}
              </div>
            ) : (
              <div style={{ fontSize: '32px', opacity: '0.7', maxWidth: '90%', display: 'flex' }}>
                Privately mark interests— only mutual overlaps get revealed
              </div>
            )}
          </div>
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
