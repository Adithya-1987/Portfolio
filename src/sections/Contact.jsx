import { useState } from 'react';
import { Code2, Briefcase, Mail, MessageCircle } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

// lucide-react dropped brand/logo icons — these generic stand-ins are
// placeholders. Swap in real brand SVGs (e.g. simple-icons) later if wanted.
const SOCIAL_LINKS = [
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
];

const FIELD_CLASSES =
  'w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors duration-300 focus:border-accent-blue/60';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up a real submission endpoint later
    console.log('Contact form submitted:', form);
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading text="Contact" />
      <GlassCard className="flex flex-col gap-8 p-8 md:flex-row md:p-12">
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={FIELD_CLASSES}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={FIELD_CLASSES}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={`${FIELD_CLASSES} resize-none`}
          />
          <Button type="submit" accent="blue" className="self-start">
            Send Message
          </Button>
        </form>

        <div className="flex shrink-0 flex-row justify-center gap-4 md:flex-col md:justify-start">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors duration-300 hover:border-accent-purple/50 hover:text-white"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
