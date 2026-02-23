import Image from 'next/image'
import Link from 'next/link'
import { Phone, Heart, ArrowRight, Facebook, Youtube, Instagram, Linkedin } from 'lucide-react'
import { FOOTER_CONTENT } from '@/constants/layout/footer.constants';



export function FooterWave() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <div className="relative w-full h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56">
        <Image
          src="/footer/footer.png"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

// ── Social Icon Circle ────────────────────────────────────────────────────────
function SocialCircle({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
    >
      {icon}
    </Link>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative w-full mt-8">

      {/* Wave transition */}
      <FooterWave />

      {/* Main footer body */}
      <div className="bg-[#22784E] text-white">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10 pt-10 pb-6">

          {/* ── 3 Column Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-10">

            {/* Col 1 — Logo + About */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src="/home/logo.svg"
                    alt="Bodhi Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-white">Bodhi International</p>
                  <p className="text-xs text-white/70">Montessori School</p>
                </div>
              </Link>
              <p className="text-sm text-white/75 leading-relaxed">
                {FOOTER_CONTENT.description}
              </p>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-base font-bold text-white">Quick Links</h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_CONTENT.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.label === 'Donate' && (
                        <Heart className="w-3.5 h-3.5 fill-white text-white" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Contact + Social */}
            <div className="flex flex-col gap-6">
              {/* Contact */}
              <div className="flex flex-col gap-3">
                <h4 className="text-base font-bold text-white">Contact Us</h4>
                <div className="flex items-center gap-2 text-sm text-white/75">
                  <Phone className="w-4 h-4 shrink-0 text-white/60" />
                  <span>{FOOTER_CONTENT.phone}</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex flex-col gap-3">
                <h4 className="text-base font-bold text-white">Follow Us</h4>
                <div className="flex items-center gap-2.5">
                  <SocialCircle href={FOOTER_CONTENT.socials.facebook} label="Facebook" icon={<Facebook className="w-3.5 h-3.5" />} />
                  <SocialCircle href={FOOTER_CONTENT.socials.youtube}  label="YouTube"  icon={<Youtube  className="w-3.5 h-3.5" />} />
                  <SocialCircle href={FOOTER_CONTENT.socials.instagram} label="Instagram" icon={<Instagram className="w-3.5 h-3.5" />} />
                  <SocialCircle href={FOOTER_CONTENT.socials.linkedin}  label="LinkedIn"  icon={<Linkedin  className="w-3.5 h-3.5" />} />
                </div>
              </div>
            </div>

          </div>

          {/* ── Bottom Bar ── */}
          <div className="border-t border-white/20 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/50">
            <p>{FOOTER_CONTENT.copyright}</p>
            <p className='flex gap-2'>
               <span>
              Website by

              </span>
              <Image
                 src={FOOTER_CONTENT.builtBy}
                 alt='betterschool'
                 width={80}
                 height={80}
               />
            </p>
          </div>

        </div>
      </div>

      {/* ── Floating Donate Button ── */}
      <Link
        href="/donate"
        className="
          fixed bottom-6 right-6 z-50
          bg-[#7B1C1C] hover:bg-[#C0392B]
          text-white text-sm font-semibold
          px-5 py-3 rounded-full shadow-xl
          flex items-center gap-2
          transition-colors duration-200
        "
      >
        Donate
        <Heart className="w-4 h-4 fill-white" />
        <ArrowRight className="w-4 h-4" />
      </Link>

    </footer>
  )
}