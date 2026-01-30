import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Mail, Github, Instagram, Linkedin, Send, User, Briefcase, MessageSquare } from 'lucide-react';

/**
 * ContactSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    message: '',
    organization: '',
    email: '',
    isEmailPublic: false
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
      [name]: type === 'checkbox' ? checked : value
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
          is_email_public: formData.isEmailPublic
        }]);

      if (error) throw error;

      setFormData({
        authorName: '',
        message: '',
        organization: '',
        email: '',
        isEmailPublic: false
      });

      await fetchGuestbook();
      alert('방명록이 등록되었습니다! 💝');
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
      month: 'long',
      day: 'numeric'
    });
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:your-email@example.com', label: 'Email', color: 'bg-orange-400 hover:bg-orange-500' },
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'bg-pink-400 hover:bg-pink-500' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'bg-yellow-400 hover:bg-yellow-500' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'bg-orange-300 hover:bg-orange-400' }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="flex flex-col gap-8">
        {/* 헤더 */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            언제든지 연락주세요! 방명록도 남겨주시면 감사하겠습니다 💌
          </p>
        </div>

        {/* 이메일 버튼 */}
        <div className="flex justify-center">
          <a
            href="mailto:your-email@example.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-6 h-6" />
            이메일 보내기
          </a>
        </div>

        {/* SNS 링크 */}
        <div className="flex justify-center gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-14 h-14 rounded-full ${social.color} flex items-center justify-center text-white shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* 방명록 폼 */}
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              방명록 남기기
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* 이름 입력 */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  이름 (선택)
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  placeholder="익명"
                  className="px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-white"
                />
              </div>

              {/* 소속/직업 입력 */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  소속/직업 (선택)
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="예: OO대학교 / 프론트엔드 개발자"
                  className="px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-white"
                />
              </div>

              {/* 이메일 입력 */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  이메일 (선택)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-white"
                />
                {formData.email && (
                  <label className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <input
                      type="checkbox"
                      name="isEmailPublic"
                      checked={formData.isEmailPublic}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-orange-400"
                    />
                    이메일 공개하기
                  </label>
                )}
              </div>

              {/* 메시지 입력 */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  메시지 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="따뜻한 메시지를 남겨주세요! 💝"
                  rows={4}
                  required
                  className="px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-white resize-none"
                />
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  '등록 중...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    방명록 남기기
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 방명록 목록 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-orange-600 flex items-center gap-2">
            💌 방명록 ({guestbookEntries.length})
          </h3>

          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              로딩 중...
            </div>
          ) : guestbookEntries.length === 0 ? (
            <Card className="border-2 border-dashed border-orange-200">
              <CardContent className="py-8 text-center text-muted-foreground">
                아직 방명록이 없어요. 첫 번째 방명록을 남겨주세요! 🌟
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {guestbookEntries.map((entry) => (
                <Card
                  key={entry.id}
                  className="border-2 border-orange-100 hover:border-orange-200 transition-colors bg-white"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      {/* 작성자 정보 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-300 to-pink-300 flex items-center justify-center text-white text-sm font-bold">
                            {entry.author_name?.charAt(0) || '익'}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800">
                              {entry.author_name || '익명'}
                            </span>
                            {entry.organization && (
                              <span className="text-sm text-gray-500 ml-2">
                                · {entry.organization}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatDate(entry.created_at)}
                        </span>
                      </div>

                      {/* 메시지 */}
                      <p className="text-gray-700 pl-10 whitespace-pre-wrap">
                        {entry.message}
                      </p>

                      {/* 공개 이메일 */}
                      {entry.is_email_public && entry.email && (
                        <div className="pl-10">
                          <a
                            href={`mailto:${entry.email}`}
                            className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            {entry.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
