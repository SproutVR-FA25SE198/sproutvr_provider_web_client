'use client';

import ScrollToTopButton from '@/common/components/scroll-to-top';
import useScrollTop from '@/common/hooks/useScrollTop';
import { useScrollReveal } from '@/features/landing/hooks/use-scroll-reveal';

import {
  BookOpen,
  ChevronDown,
  CreditCard,
  Download,
  HelpCircle,
  Monitor,
  Settings,
  ShoppingCart,
  UserPlus,
} from 'lucide-react';
import { useState } from 'react';

import SectionContainer from '../components/common/section-container';
import { SectionHeader } from '../components/common/section-header';

interface FAQItem {
  question: string;
  answer: string;
}

interface GuideSection {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  steps: string[];
}

const guideSections: GuideSection[] = [
  {
    id: 'register',
    icon: UserPlus,
    title: 'Đăng ký tài khoản tổ chức',
    description: 'Hướng dẫn đăng ký tài khoản cho tổ chức giáo dục của bạn',
    steps: [
      'Truy cập trang chủ SproutVR và cuộn xuống phần "Đăng ký tổ chức"',
      'Điền đầy đủ thông tin tổ chức: tên, email, số điện thoại và loại hình tổ chức',
      'Nhấn nút "Đăng ký ngay" để gửi yêu cầu',
      'Chờ đội ngũ SproutVR xác minh thông tin (trong vòng 24-48 giờ)',
      'Nhận email xác nhận và thông tin đăng nhập',
    ],
  },
  {
    id: 'purchase',
    icon: ShoppingCart,
    title: 'Mua nội dung học tập',
    description: 'Hướng dẫn chọn và mua các bản đồ VR cho tổ chức',
    steps: [
      'Đăng nhập vào tài khoản tổ chức của bạn',
      'Truy cập trang Catalog để xem danh sách các bản đồ VR có sẵn',
      'Nhấn vào bản đồ để xem chi tiết, mô tả và video demo',
      'Nhấn "Thêm vào giỏ hàng" để chọn các bản đồ mong muốn',
      'Vào giỏ hàng, kiểm tra lại đơn hàng và nhấn "Thanh toán"',
      'Chọn phương thức thanh toán và hoàn tất đơn hàng',
    ],
  },
  {
    id: 'payment',
    icon: CreditCard,
    title: 'Thanh toán',
    description: 'Các phương thức thanh toán được hỗ trợ',
    steps: [
      'SproutVR hỗ trợ thanh toán qua VNPay (thẻ ATM nội địa, Visa, MasterCard)',
      'Sau khi chọn phương thức thanh toán, bạn sẽ được chuyển đến cổng thanh toán',
      'Nhập thông tin thẻ và xác nhận giao dịch',
      'Sau khi thanh toán thành công, bạn sẽ nhận email xác nhận đơn hàng',
      'Nội dung đã mua sẽ được kích hoạt ngay lập tức trong tài khoản',
    ],
  },
  {
    id: 'download',
    icon: Download,
    title: 'Tải ứng dụng',
    description: 'Hướng dẫn tải và cài đặt ứng dụng SproutVR',
    steps: [
      'Nhấn vào nút "Tải ứng dụng Desktop" ở góc phải màn hình trang chủ',
      'Tải file cài đặt (.exe) về máy tính',
      'Mở file cài đặt và làm theo hướng dẫn trên màn hình',
      'Chờ quá trình cài đặt hoàn tất (khoảng 2-5 phút)',
      'Khởi động ứng dụng SproutVR từ Desktop hoặc Start Menu',
    ],
  },
  {
    id: 'setup',
    icon: Settings,
    title: 'Cấu hình & Thiết lập',
    description: 'Hướng dẫn cấu hình ứng dụng và thiết bị VR',
    steps: [
      'Mở ứng dụng SproutVR Desktop và đăng nhập bằng tài khoản tổ chức',
      'Kết nối thiết bị VR (Meta Quest, HTC Vive...) với máy tính qua cáp Link hoặc Air Link',
      'Trong ứng dụng, vào Cài đặt > Thiết bị để kiểm tra kết nối',
      'Chọn chất lượng đồ họa phù hợp với cấu hình máy tính',
      'Tải về các bản đồ đã mua từ thư viện nội dung',
      'Sẵn sàng trải nghiệm! Đeo kính VR và bắt đầu học tập',
    ],
  },
  {
    id: 'usage',
    icon: Monitor,
    title: 'Sử dụng trong lớp học',
    description: 'Hướng dẫn triển khai SproutVR cho học sinh',
    steps: [
      'Giáo viên đăng nhập và chọn bản đồ bài học từ thư viện',
      'Tạo phiên học mới và mời học sinh tham gia',
      'Học sinh đeo kính VR và nhập mã phiên học',
      'Giáo viên có thể theo dõi và điều khiển bài học từ màn hình',
      'Sử dụng các công cụ tương tác để giảng dạy hiệu quả',
      'Kết thúc phiên và xem báo cáo tiến độ học tập',
    ],
  },
];

const faqData: FAQItem[] = [
  {
    question: 'SproutVR có yêu cầu cấu hình máy tính như thế nào?',
    answer:
      'Yêu cầu tối thiểu: Windows 10/11, CPU Intel i5 hoặc AMD Ryzen 5, RAM 8GB, GPU GTX 1060 hoặc tương đương, 10GB dung lượng trống. Khuyến nghị: CPU i7/Ryzen 7, RAM 16GB, GPU RTX 2060 trở lên để có trải nghiệm tốt nhất.',
  },
  {
    question: 'Những thiết bị VR nào được hỗ trợ?',
    answer:
      'SproutVR hỗ trợ các thiết bị VR phổ biến bao gồm: Meta Quest 2, Meta Quest 3, Meta Quest Pro, HTC Vive, HTC Vive Pro, Valve Index, và các thiết bị tương thích SteamVR khác.',
  },
  {
    question: 'Tôi có thể sử dụng SproutVR mà không có kính VR không?',
    answer:
      'Có, bạn có thể xem trước nội dung và quản lý thư viện trên ứng dụng Desktop mà không cần kính VR. Tuy nhiên, để có trải nghiệm học tập đầy đủ và nhập vai, bạn cần thiết bị VR.',
  },
  {
    question: 'Làm sao để cập nhật ứng dụng SproutVR?',
    answer:
      'Ứng dụng SproutVR sẽ tự động kiểm tra và thông báo khi có bản cập nhật mới. Bạn chỉ cần nhấn "Cập nhật" khi được nhắc. Hoặc bạn có thể tải bản mới nhất từ website.',
  },
  {
    question: 'Nội dung đã mua có thời hạn sử dụng không?',
    answer:
      'Không, nội dung bạn đã mua sẽ thuộc về tài khoản vĩnh viễn. Bạn có thể truy cập và sử dụng bất cứ lúc nào, kể cả khi có bản cập nhật mới.',
  },
  {
    question: 'Tôi có thể cài đặt trên nhiều máy tính không?',
    answer:
      'Có, bạn có thể cài đặt ứng dụng trên nhiều máy tính. Tuy nhiên, mỗi tài khoản chỉ có thể đăng nhập và sử dụng trên một thiết bị tại một thời điểm.',
  },
  {
    question: 'Làm sao để liên hệ hỗ trợ kỹ thuật?',
    answer:
      'Bạn có thể liên hệ đội ngũ hỗ trợ qua email support@sproutvr.com, hotline 1900 xxxx xx (trong giờ làm việc), hoặc truy cập trang Liên hệ để gửi yêu cầu hỗ trợ.',
  },
  {
    question: 'Có bản dùng thử miễn phí không?',
    answer:
      'Có, chúng tôi cung cấp một số nội dung demo miễn phí để bạn trải nghiệm trước khi quyết định mua. Ngoài ra, các tổ chức có thể đăng ký demo trực tiếp với đội ngũ bán hàng.',
  },
];

const Help = () => {
  useScrollTop();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeGuide, setActiveGuide] = useState<string>('register');

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const activeGuideData = guideSections.find((g) => g.id === activeGuide);

  return (
    <>
      <section ref={ref} className='bg-gradient-to-b from-secondary/30 to-background'>
        <SectionContainer>
          <SectionHeader
            heading='Hướng dẫn sử dụng'
            subheading='Tìm hiểu cách đăng ký, mua hàng, cài đặt và sử dụng SproutVR một cách dễ dàng với các hướng dẫn chi tiết bên dưới.'
            isInView={isVisible}
            className='mb-8 text-center w-full'
          />

          {/* Guide Sections */}
          <div className='mb-20'>
            <div className='flex items-center gap-3 mb-8'>
              <BookOpen className='w-8 h-8 text-primary' />
              <h2 className='text-2xl font-bold text-foreground'>Hướng dẫn từng bước</h2>
            </div>

            <div className='grid lg:grid-cols-[280px_1fr] gap-8'>
              {/* Guide Navigation */}
              <div className='flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0'>
                {guideSections.map((guide, index) => (
                  <button
                    key={guide.id}
                    onClick={() => setActiveGuide(guide.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                      activeGuide === guide.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-card border border-border hover:bg-secondary/50'
                    } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <guide.icon className='w-5 h-5 flex-shrink-0' />
                    <span className='font-medium text-sm'>{guide.title}</span>
                  </button>
                ))}
              </div>

              {/* Guide Content */}
              {activeGuideData && (
                <div
                  className={`bg-card rounded-2xl p-8 border border-border transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center'>
                      <activeGuideData.icon className='w-7 h-7 text-primary' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-foreground'>{activeGuideData.title}</h3>
                      <p className='text-muted-foreground'>{activeGuideData.description}</p>
                    </div>
                  </div>

                  <div className='space-y-4 mt-6'>
                    {activeGuideData.steps.map((step, index) => (
                      <div
                        key={index}
                        className='flex gap-4 items-start p-4 bg-background rounded-xl border border-border/50'
                      >
                        <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0'>
                          {index + 1}
                        </div>
                        <p className='text-foreground pt-1'>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className='max-w-4xl mx-auto'>
            <div className='flex items-center gap-3 mb-8'>
              <HelpCircle className='w-8 h-8 text-primary' />
              <h2 className='text-2xl font-bold text-foreground'>Câu hỏi thường gặp</h2>
            </div>

            <div className='space-y-3'>
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-xl border border-border overflow-hidden transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 6) * 50}ms` }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className='w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors'
                  >
                    <span className='font-semibold text-foreground pr-4'>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFaq === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className='px-5 pb-5 text-muted-foreground'>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Still need help */}
          <div
            className={`mt-16 text-center p-8 bg-primary/5 rounded-2xl border border-primary/20 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <HelpCircle className='w-12 h-12 text-primary mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-foreground mb-2'>Vẫn cần hỗ trợ?</h3>
            <p className='text-muted-foreground mb-4'>
              Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, đừng ngần ngại liên hệ với chúng tôi.
            </p>
            <a
              href='/contact'
              className='inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors'
            >
              Liên hệ hỗ trợ
            </a>
          </div>
        </SectionContainer>
      </section>
      <ScrollToTopButton />
    </>
  );
};

export default Help;
