import { ImageResponse } from 'next/og';

export const alt = 'Mark Taratynov — Fullstack Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#fafafa',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#a1a1aa',
            }}
          >
            Open to work
          </span>
        </div>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          Mark Taratynov
        </div>
        <div
          style={{
            fontSize: '36px',
            color: '#d4d4d8',
            lineHeight: 1.3,
            maxWidth: '900px',
          }}
        >
          Fullstack Software Engineer · React · TypeScript · Python · GCP ACE
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            fontSize: '22px',
            color: '#71717a',
          }}
        >
          marktaratynov.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
