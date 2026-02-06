import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Github, Instagram, Linkedin, Send, User, Briefcase, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/use-scroll-animation';

const socialLinks = [
  { icon: Mail, href: 'mailto:your-email@example.com', label: 'Email' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

/**
 * GuestbookEntry 컴포넌트 - 방명록 항목
 *
 * Props:
 * @param {Object} entry - 방명록 데이터 [Required]
 * @param {function} formatDate - 날짜 포맷 함수 [Required]
 *
 * Example usage:
 * <GuestbookEntry entry={entryData} formatDate={formatDate} />
 */
function GuestbookEntry({ entry, formatDate }) {
  return (
    <div className="p-4 rounded-xl bg-white/70 border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center text-white text-sm font-bold">
          {entry.author_name?.charAt(0) || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-semibold text-sm text-gray-800 truncate">
                {entry.author_name || '익명'}
              </span>
              {entry.organization && (
                <span className="text-xs text-gray-400 truncate">
                  {entry.organization}
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-400 shrink-0">
              {formatDate(entry.created_at)}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {entry.message}
          </p>
          {entry.is_email_public && entry.email && (
            <a
              href={`mailto:${entry.email}`}
              className="inline-flex items-center gap-1 mt-1.5 text-xs text-sky-500 hover:text-sky-600"
            >
              <Mail className="w-3 h-3" />
              {entry.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ContactSection 컴포넌트 - 양 옆 레이아웃 연락처
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    message: '',
    organization: '',
    email: '',
    isEmailPublic: false,
  });

  useEffect(() => {
    fetchGuestbook();
  }, []);

  const fetchGuestbook = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuestbookEntries(data || []);
    } catch (error) {
      console.error('방명록 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      alert('메시지를 입력해주세요!');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('portfolio_guestbook')
        .insert([{
          author_name: formData.authorName.trim() || '익명',
          message: formData.message.trim(),
          organization: formData.organization.trim() || null,
          email: formData.email.trim() || null,
          is_email_public: formData.isEmailPublic,
        }]);

      if (error) throw error;

      setFormData({
        authorName: '',
        message: '',
        organization: '',
        email: '',
        isEmailPublic: false,
      });

      await fetchGuestbook();
    } catch (error) {
      console.error('방명록 등록 실패:', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section ref={ref} className="py-12 md:py-20">
      {/* 섹션 헤더 */}
      <div
        className="text-center mb-10 md:mb-14"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Contact Me</h2>
        <p className="text-muted-foreground text-base md:text-lg">
          편하게 연락주세요, 방명록도 남겨주시면 감사하겠습니다
        </p>
      </div>

      {/* 양 옆 레이아웃 */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out 200ms, transform 0.6s ease-out 200ms',
        }}
      >
        {/* 왼쪽: 연락처 + 폼 */}
        <div className="flex flex-col gap-6">
          {/* 연락처 카드 */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/80 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              협업 제안, 채용 문의, 혹은 간단한 인사까지 무엇이든 환영합니다.
            </p>

            {/* SNS 링크 */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-gray-50 hover:bg-sky-50 border border-gray-100 hover:border-sky-200 flex items-center justify-center text-gray-500 hover:text-sky-600 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 방명록 폼 */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/80 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-500" />
              방명록 남기기
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* 이름 + 소속 한 줄 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    이름
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    placeholder="익명"
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:ring-1 focus:ring-sky-100 focus:outline-none transition-all bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    소속
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="선택"
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:ring-1 focus:ring-sky-100 focus:outline-none transition-all bg-white"
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="선택"
                  className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:ring-1 focus:ring-sky-100 focus:outline-none transition-all bg-white"
                />
                {formData.email && (
                  <label className="flex items-center gap-2 text-xs text-gray-400">
                    <input
                      type="checkbox"
                      name="isEmailPublic"
                      checked={formData.isEmailPublic}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 accent-sky-500"
                    />
                    이메일 공개하기
                  </label>
                )}
              </div>

              {/* 메시지 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  메시지 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="따뜻한 메시지를 남겨주세요!"
                  rows={3}
                  required
                  className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-sky-400 focus:ring-1 focus:ring-sky-100 focus:outline-none transition-all bg-white resize-none"
                />
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  '등록 중...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    남기기
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* 오른쪽: 방명록 목록 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-gray-800">
              방명록
            </h3>
            <span className="text-sm text-muted-foreground">
              {guestbookEntries.length}개
            </span>
          </div>

          <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1 scrollbar-thin">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                로딩 중...
              </div>
            ) : guestbookEntries.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-white/60 border-2 border-dashed border-gray-200">
                <p className="text-muted-foreground text-sm">
                  아직 방명록이 없어요
                </p>
                <p className="text-muted-foreground/60 text-xs mt-1">
                  첫 번째 방명록을 남겨주세요!
                </p>
              </div>
            ) : (
              guestbookEntries.map((entry) => (
                <GuestbookEntry
                  key={entry.id}
                  entry={entry}
                  formatDate={formatDate}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
