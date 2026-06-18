import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Language, getCurrentLanguage, setLanguage, translations } from '@/lib/i18n';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = getCurrentLanguage();

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'hy', name: 'Հայերեն' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
  ];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: '1px solid rgba(0, 194, 242, 0.3)',
          color: '#00c2f2',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 194, 242, 0.1)';
          e.currentTarget.style.borderColor = '#00c2f2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.3)';
        }}
      >
        <Globe size={14} />
        {currentLang.toUpperCase()}
      </button>

      {isOpen && (
        <div
          className="custom-scrollbar"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '8px',
            background: '#001d2e',
            border: '1px solid rgba(0, 194, 242, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            minWidth: '160px',
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: currentLang === lang.code ? 'rgba(0, 194, 242, 0.1)' : 'transparent',
                border: 'none',
                color: currentLang === lang.code ? '#00c2f2' : 'rgba(251, 248, 240, 0.7)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                borderBottom: lang.code !== 'zh' ? '1px solid rgba(0, 194, 242, 0.1)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 194, 242, 0.1)';
                e.currentTarget.style.color = '#00c2f2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = currentLang === lang.code ? 'rgba(0, 194, 242, 0.1)' : 'transparent';
                e.currentTarget.style.color = currentLang === lang.code ? '#00c2f2' : 'rgba(251, 248, 240, 0.7)';
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
