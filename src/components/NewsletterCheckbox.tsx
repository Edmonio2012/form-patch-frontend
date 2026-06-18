/**
 * Reusable Newsletter Checkbox Component
 * Beautiful, consistent newsletter subscription checkbox for all forms
 */

interface NewsletterCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function NewsletterCheckbox({
  checked,
  onChange,
  label = 'Subscribe to our newsletter for updates and insights',
}: NewsletterCheckboxProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        background: 'rgba(0, 194, 242, 0.05)',
        border: '1px solid rgba(0, 194, 242, 0.15)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0, 194, 242, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0, 194, 242, 0.05)';
        e.currentTarget.style.borderColor = 'rgba(0, 194, 242, 0.15)';
      }}
    >
      {/* Custom Checkbox */}
      <div
        style={{
          position: 'relative',
          width: '20px',
          height: '20px',
          minWidth: '20px',
          borderRadius: '6px',
          background: checked ? 'linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)' : 'rgba(0, 194, 242, 0.1)',
          border: `2px solid ${checked ? '#00c2f2' : 'rgba(0, 194, 242, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          boxShadow: checked ? '0 4px 12px rgba(0, 194, 242, 0.3)' : 'none',
        }}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: 'scaleIn 0.3s ease',
            }}
          >
            <path
              d="M1 5L4 8L11 1"
              stroke="#001d2e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )}
      </div>

      {/* Label */}
      <label
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'rgba(251, 248, 240, 0.75)',
          cursor: 'pointer',
          userSelect: 'none',
          margin: 0,
          flex: 1,
        }}
        onClick={() => onChange(!checked)}
      >
        {label}
      </label>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
