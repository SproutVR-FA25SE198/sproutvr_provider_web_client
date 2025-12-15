'use client';

import ScrollToTopButton from '@/common/components/scroll-to-top';
import { Button } from '@/common/components/ui/button';
import useScrollTop from '@/common/hooks/useScrollTop';
import { useScrollReveal } from '@/features/landing/hooks/use-scroll-reveal';

import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

import SectionContainer from '../components/common/section-container';
import { SectionHeader } from '../components/common/section-header';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Địa chỉ',
    details: ['Lô E2a-7, Đường D1, Khu Công nghệ cao', 'P. Long Thạnh Mỹ, TP. Thủ Đức, TP.HCM'],
  },
  {
    icon: Phone,
    title: 'Điện thoại',
    details: ['Hotline: 1900 xxxx xx', 'Tel: (028) xxxx xxxx'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['support@sproutvr.com', 'sales@sproutvr.com'],
  },
  {
    icon: Clock,
    title: 'Giờ làm việc',
    details: ['Thứ 2 - Thứ 6: 8:00 - 17:30', 'Thứ 7: 8:00 - 12:00'],
  },
];

const Contact = () => {
  useScrollTop();
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
  };

  return (
    <>
      <section ref={ref} className='bg-gradient-to-b from-secondary/30 to-background'>
        <SectionContainer>
          <SectionHeader
            heading='Liên hệ với chúng tôi'
            subheading='Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi qua các kênh bên dưới hoặc gửi tin nhắn trực tiếp.'
            isInView={isVisible}
            className='mb-8 text-center w-full'
          />

          <div className='grid lg:grid-cols-2 gap-16'>
            {/* Contact Form */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className='bg-card rounded-2xl p-8 border border-border shadow-sm'>
                <h3 className='text-2xl font-bold text-foreground mb-6'>Gửi tin nhắn</h3>
                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div className='grid sm:grid-cols-2 gap-5'>
                    <div>
                      <label htmlFor='name' className='block text-sm font-medium text-foreground mb-2'>
                        Họ và tên *
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                        placeholder='Nguyễn Văn A'
                      />
                    </div>
                    <div>
                      <label htmlFor='email' className='block text-sm font-medium text-foreground mb-2'>
                        Email *
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                        placeholder='email@example.com'
                      />
                    </div>
                  </div>

                  <div className='grid sm:grid-cols-2 gap-5'>
                    <div>
                      <label htmlFor='phone' className='block text-sm font-medium text-foreground mb-2'>
                        Số điện thoại
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                        placeholder='0xxx xxx xxx'
                      />
                    </div>
                    <div>
                      <label htmlFor='subject' className='block text-sm font-medium text-foreground mb-2'>
                        Chủ đề *
                      </label>
                      <select
                        id='subject'
                        name='subject'
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                      >
                        <option value=''>Chọn chủ đề</option>
                        <option value='general'>Thông tin chung</option>
                        <option value='support'>Hỗ trợ kỹ thuật</option>
                        <option value='sales'>Tư vấn mua hàng</option>
                        <option value='partnership'>Hợp tác kinh doanh</option>
                        <option value='other'>Khác</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor='message' className='block text-sm font-medium text-foreground mb-2'>
                      Nội dung tin nhắn *
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className='w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none'
                      placeholder='Nhập nội dung tin nhắn của bạn...'
                    />
                  </div>

                  <Button type='submit' className='w-full py-6 text-base font-semibold'>
                    <Send className='w-5 h-5 mr-2' />
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className='text-2xl font-bold text-foreground mb-8'>Thông tin liên hệ</h3>

              <div className='space-y-6 mb-10'>
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-5 bg-card rounded-xl border border-border transition-all duration-500 hover:shadow-md ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <info.icon className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                      <h4 className='font-semibold text-foreground mb-1'>{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className='text-muted-foreground text-sm'>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div
                className={`rounded-2xl overflow-hidden border border-border h-64 bg-muted transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370224!2d106.80730807694562!3d10.841127589311597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1702652400000!5m2!1sen!2s'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='SproutVR Location'
                />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
      <ScrollToTopButton />
    </>
  );
};

export default Contact;
