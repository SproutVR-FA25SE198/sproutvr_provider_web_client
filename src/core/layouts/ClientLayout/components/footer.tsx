import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-primary text-white pt-16 pb-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Thương hiệu */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-10 h-10 bg-secondary rounded-lg flex items-center justify-center'>
                <span className='text-2xl font-bold text-secondary-foreground'>S</span>
              </div>
              <span className='text-2xl font-bold'>SproutVR</span>
            </div>
            <p className='text-white/80 mb-6 leading-relaxed'>
              Giải pháp học tập thực tế ảo toàn diện giúp học sinh Việt Nam khám phá kiến thức một cách sinh động và hấp
              dẫn hơn.
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

          {/* Sản phẩm */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Sản phẩm</h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Gói Bản Đồ Học Tập
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Ứng dụng SproutVR
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Ứng dụng Quản lý Trường Học
                </a>
              </li>
            </ul>
          </div>

          {/* Tài nguyên */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Tài nguyên</h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Hướng dẫn đăng ký
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Trung tâm hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          {/* Công ty */}
          <div>
            <h3 className='text-lg font-bold mb-4'>Về chúng tôi</h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Liên hệ
                </a>
              </li>
              <li>
                <a href='#' className='text-white/80 hover:text-secondary transition-colors'>
                  Đối tác
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dòng cuối */}
        <div className='border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-white/60 text-sm'>© 2025 SproutVR. Mọi quyền được bảo lưu.</p>
          <div className='flex gap-6 text-sm'>
            <a href='#' className='text-white/60 hover:text-secondary transition-colors'>
              Chính sách bảo mật
            </a>
            <a href='#' className='text-white/60 hover:text-secondary transition-colors'>
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
