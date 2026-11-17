const columns = [
  { title: 'COURSE', links: ['Prime', 'Features', 'Pricing', 'FAQs'] },
  { title: 'COMPANY', links: ['Our Journey', 'Our Mentors', 'Contact Us', 'Troubleshooting', 'Careers'] },
  { title: 'FREE RESOURCES', links: ['CP-31 Sheet', 'CP Digest', 'Contest Tracker'] },
]

const WATERMARK_SIZE = 'calc(min(100vw, 1280px) * 0.125)'

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
      <rect x="1" y="4" width="22" height="16" rx="4" fill="#E62117" />
      <path d="M10 8.5v7l6-3.5z" fill="#fff" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#2867B2" />
      <path d="M6.5 9.5h2.6V18H6.5zM7.8 5.4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM10.9 9.5h2.5v1.2c.4-.7 1.3-1.4 2.6-1.4 2.7 0 3.2 1.8 3.2 4.1V18h-2.6v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.2V18h-2.7z" fill="#fff" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0 text-t-primary">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0" stopColor="#FFC107" />
          <stop offset="0.5" stopColor="#F44336" />
          <stop offset="1" stopColor="#9C27B0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" stroke="url(#ig-grad)" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="url(#ig-grad)" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#5865F2" className="w-5 h-5 shrink-0">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

const socials = [
  { label: 'YouTube', Icon: YouTubeIcon },
  { label: 'LinkedIn', Icon: LinkedInIcon },
  { label: 'X', Icon: XIcon },
  { label: 'Instagram', Icon: InstagramIcon },
]

const linkClass = 'text-t-secondary text-[15px] font-medium hover:text-t-primary transition-colors'

export default function Footer() {
  return (
    <footer className="bg-tle-footer relative overflow-hidden">
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-12"
        style={{ paddingBottom: `calc(${WATERMARK_SIZE} * 0.8)` }}
      >
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <img src="/tle-logo.svg" alt="TLE" className="w-10 h-10 rounded-md" />
              <span className="font-display font-bold text-lg text-t-primary">TLE Eliminators</span>
            </div>
            <p className="text-t-primary text-[13px] mb-6 flex flex-wrap items-center gap-y-1">
              <span>&copy; {new Date().getFullYear()} Codelift Academy Private Limited</span>
              <span className="hidden sm:block mx-3 w-px h-3.5 bg-t-tertiary" />
              <span>All rights reserved</span>
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a href="#" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                <DiscordIcon />
                Discord
              </a>
            </div>
            <div className="mt-auto pt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-t-primary text-[13px] font-medium">
              <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
              <span className="text-t-tertiary">&middot;</span>
              <a href="#" className="hover:text-brand-blue transition-colors">Terms &amp; Conditions</a>
              <span className="text-t-tertiary">&middot;</span>
              <a href="#" className="hover:text-brand-blue transition-colors">Cancellation &amp; Refund Policy</a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-12 gap-y-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-brand-blue font-semibold text-[13px] tracking-wider mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className={linkClass}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-brand-blue font-semibold text-[13px] tracking-wider mb-5">SOCIALS</h4>
              <ul className="space-y-3">
                {socials.map(({ label, Icon }) => (
                  <li key={label}>
                    <a href="#" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                      <Icon />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute left-0 right-0 text-center select-none pointer-events-none whitespace-nowrap font-sans font-bold"
        style={{
          fontSize: WATERMARK_SIZE,
          lineHeight: 1,
          bottom: '-0.3em',
          background: 'linear-gradient(0deg, #0052C3 10%, #236AF2 45%, transparent 85%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0.2,
        }}
      >
        TLE Eliminators
      </div>
    </footer>
  )
}
