import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    setActiveIndex((prev) => Math.max(0, Math.min(prev, Math.max(0, length - 1))));
  }, [length]);

  const goPrev = useCallback(() => {
    if (length <= 1) return;
    setActiveIndex((i) => (i - 1 + length) % length);
  }, [length]);

  const goNext = useCallback(() => {
    if (length <= 1) return;
    setActiveIndex((i) => (i + 1) % length);
  }, [length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goPrev, goNext]);

  // Handle mouse wheel scroll to navigate slides
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (length <= 1) return;

      // Throttle scroll events to prevent too fast navigation
      const now = Date.now();
      if (now - lastScrollTime.current < 200) return;
      lastScrollTime.current = now;

      e.preventDefault();

      if (e.deltaY > 0 || e.deltaX > 0) {
        goNext();
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        goPrev();
      }
    },
    [length, goNext, goPrev],
  );

  if (length === 0) return null;

  const slideSpacing = typeof window !== 'undefined' && window.innerWidth >= 768 ? 380 : 280;

  return (
    <section className='mapHero'>
      {title ? <h2 className='mapHeroTitle'>{title}</h2> : null}

      <div ref={sliderRef} className='curvedSlider' role='region' aria-label='Map image slider' onWheel={handleWheel}>
        <button
          type='button'
          className='curvedNav curvedNavPrev'
          onClick={goPrev}
          disabled={length <= 1}
          aria-label='Previous image'
        >
          <svg className='curvedNavIconSvg curvedNavIconPrev' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
            <path
              d='M15 18l-6-6 6-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <div className='curvedTrack' aria-live='polite'>
          {safeImages.map((src, idx) => {
            const rawDelta = idx - activeIndex;
            const d = normalizeDelta(rawDelta, length);
            const abs = Math.abs(d);

            // Show up to 3 slides on each side (positions -3 to 3)
            if (abs > 3) return null;

            const x = d * slideSpacing * (abs <= 1 ? 1 : 0.7);

            // Curve TOWARDS the center (positive rotation for left, negative for right)
            const ry = d * 45; // Positive multiplier curves inward

            // Stack slides progressively further back
            const z = abs === 0 ? 200 : abs === 1 ? 50 : abs === 2 ? -100 : -200;
            const s = abs === 0 ? 1 : abs === 1 ? 0.88 : abs === 2 ? 0.72 : 0.58;
            const o = abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.55 : 0.35;
            const blur = abs === 0 ? 0 : abs === 1 ? 0.5 : abs === 2 ? 2 : 3.5;

            const style = {
              ['--x' as string]: `${x}px`,
              ['--ry' as string]: `${ry}deg`,
              ['--z' as string]: `${z}px`,
              ['--s' as string]: `${s}`,
              ['--o' as string]: `${o}`,
              ['--blur' as string]: `${blur}px`,
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
                <div className='curvedSlideReflection' />
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
            <path
              d='M9 6l6 6-6 6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
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
