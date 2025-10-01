import { Facebook, Linkedin, Mail, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-primary text-white pt-16 pb-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-10 h-10 bg-secondary rounded-lg flex items-center justify-center'>
                <span className='text-2xl font-bold text-secondary-foreground'>S</span>
              </div>
              <span className='text-2xl font-bold'>SproutVR</span>
            </div>
            <p className='text-white/80 mb-6 leading-relaxed'>
              Transforming education through immersive virtual reality experiences for the next generation of learners.
            </p>
            <div className='flex gap-3'>
              <a
                href='#'
                className='w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors'
                aria-label='Facebook'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors'
                aria-label='Twitter'
              >
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors'
                aria-label='LinkedIn'
              >
                <Linkedin className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-colors'
                aria-label='YouTube'
              >
                <Youtube className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Products</h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  VR Science Lab
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  History Explorer
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Math Dimensions
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Language Arts VR
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Career Exploration
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Resources</h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Getting Started
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Teacher Training
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Case Studies
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Blog
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Company</h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  About Us
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Careers
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Press Kit
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Contact
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className='border-t border-white/20 pt-8 mb-8'>
          <div className='max-w-md'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
              <Mail className='w-5 h-5' />
              Stay Updated
            </h3>
            <p className='text-white/80 mb-4'>Get the latest VR education insights and product updates</p>
            <div className='flex gap-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary'
              />
              <button className='px-6 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-semibold transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-white/60 text-sm'>© 2025 SproutVR. All rights reserved.</p>
          <div className='flex gap-6 text-sm'>
            <a href='#' className='text-white/60 hover:text-secondary transition-colors'>
              Privacy Policy
            </a>
            <a href='#' className='text-white/60 hover:text-secondary transition-colors'>
              Terms of Service
            </a>
            <a href='#' className='text-white/60 hover:text-secondary transition-colors'>
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
