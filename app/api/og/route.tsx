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
              position: 'relative',
              width: '100%',
              minWidth: '400px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-40px',
                right: '0px',
                top: '-30px',
                bottom: '-30px',
                background:
                  'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))',
                borderRadius: '24px',
                filter: 'blur(60px)',
              }}
            />
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  letterSpacing: '0.2em',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                }}
              >
                PRIVATELY
              </div>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  width: '100%',
                  alignItems: 'flex-start',
                }}
              >
                <h1
                  style={{
                    fontSize: '80px',
                    fontWeight: 'bold',
                    margin: '4px 0',
                    padding: 0,
                    color: 'white',
                    display: 'flex',
                    position: 'relative',
                    left: '-4px',
                  }}
                >
                  Find Shared
                </h1>
              </div>
              <div
                style={{
                  fontSize: '24px',
                  letterSpacing: '0.2em',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                }}
              >
                INTERESTS
              </div>
            </div>
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
