import { useEffect, useMemo, useState } from 'react';

import './curved-media-slider.css';

interface CurvedMediaSliderProps {
  title?: string;
  images: string[];
  initialIndex?: number;
}

function normalizeDelta(delta: number, length: number) {
  if (length <= 1) return 0;
  let d = delta % length;
  if (d > length / 2) d -= length;
  if (d < -length / 2) d += length;
  return d;
}

export default function CurvedMediaSlider({ title = 'Our Works', images, initialIndex = 0 }: CurvedMediaSliderProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const length = safeImages.length;
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, Math.min(initialIndex, length - 1)));

  useEffect(() => {
    // keep index valid when images change
    setActiveIndex((prev) => Math.max(0, Math.min(prev, Math.max(0, length - 1))));
  }, [length]);

  const goPrev = () => {
    if (length <= 1) return;
    setActiveIndex((i) => (i - 1 + length) % length);
  };

  const goNext = () => {
    if (length <= 1) return;
    setActiveIndex((i) => (i + 1) % length);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  if (length === 0) return null;

  // Keep spacing in sync with CSS slide width so slides don't overlap when resized.
  const slideSpacing = typeof window !== 'undefined' && window.innerWidth >= 768 ? 420 : 320;

  return (
    <section className='mapHero'>
      {title ? <h2 className='mapHeroTitle'>{title}</h2> : null}

      <div className='curvedSlider' role='region' aria-label='Map image slider'>
        <button
          type='button'
          className='curvedNav curvedNavPrev'
          onClick={goPrev}
          disabled={length <= 1}
          aria-label='Previous image'
        >
          <svg className='curvedNavIconSvg curvedNavIconPrev' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
            <path d='M15 18l-6-6 6-6' fill='none' stroke='currentColor' strokeWidth='2.8' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </button>

        <div className='curvedTrack' aria-live='polite'>
          {safeImages.map((src, idx) => {
            const rawDelta = idx - activeIndex;
            const d = normalizeDelta(rawDelta, length);
            const abs = Math.abs(d);

            // only render nearby slides for perf & clarity
            if (abs > 2) return null;

            const x = d * slideSpacing;
            const ry = d * -40;
            const z = abs === 0 ? 180 : abs === 1 ? 90 : 20;
            const s = 1 - abs * 0.1;
            const o = 1 - abs * 0.28;
            const blur = abs === 0 ? 0 : abs === 1 ? 0.35 : 0.8;

            const style = {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              ['--x' as any]: `${x}px`,
              ['--ry' as any]: `${ry}deg`,
              ['--z' as any]: `${z}px`,
              ['--s' as any]: `${s}`,
              ['--o' as any]: `${o}`,
              ['--blur' as any]: `${blur}px`,
              zIndex: 30 - abs,
            } as React.CSSProperties;

            return (
              <button
                key={`${src}-${idx}`}
                type='button'
                className={`curvedSlide ${d === 0 ? 'curvedSlideActive' : ''}`}
                style={style}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Image ${idx + 1} of ${length}`}
              >
                <img
                  src={src}
                  alt={`Map image ${idx + 1}`}
                  loading={d === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </button>
            );
          })}
        </div>

        <button
          type='button'
          className='curvedNav curvedNavNext'
          onClick={goNext}
          disabled={length <= 1}
          aria-label='Next image'
        >
          <svg className='curvedNavIconSvg curvedNavIconNext' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
            <path d='M9 6l6 6-6 6' fill='none' stroke='currentColor' strokeWidth='2.8' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </button>

        <div className='curvedCounter'>
          {activeIndex + 1} / {length}
        </div>

        {length > 1 && (
          <div className='curvedDots' aria-label='Select image'>
            {safeImages.slice(0, Math.min(length, 8)).map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type='button'
                className={`curvedDot ${idx === activeIndex ? 'curvedDotActive' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


