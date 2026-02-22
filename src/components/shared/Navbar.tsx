'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ChevronDown,
  MapPin,
  Phone,
  Menu,
  X,
  Heart,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NAV_LINKS, TOP_BAR_INFO, SITE_NAME, CONTACT_HREF } from '@/constants/layout/navbar.constants'
import { NavLink } from '@/types/layout/navbar.types'

// ── Social Icons (all from lucide-react) ─────────────────────────────────────
function SocialIcon({ icon }: { icon: string }) {
  const cls = 'w-4 h-4'
  switch (icon) {
    case 'facebook':  return <Facebook  className={cls} />
    case 'youtube':   return <Youtube   className={cls} />
    case 'instagram': return <Instagram className={cls} />
    case 'twitter':   return <Twitter   className={cls} />
    default:          return null
  }
}

// ── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="bg-white border-b border-gray-100 py-1.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 text-sm text-gray-600">
        {/* Social Icons */}
        <div className="flex items-center gap-2">
          {TOP_BAR_INFO.socials.map((s) => (
            <Link
              key={s.icon}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#C0392B] transition-colors"
            >
              <SocialIcon icon={s.icon} />
            </Link>
          ))}
        </div>

        <span className="text-gray-300">|</span>

        {/* Address */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3 text-[#C0392B]" />
          <span>{TOP_BAR_INFO.address}</span>
        </div>

        <span className="text-gray-300">|</span>

        {/* Phone */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Phone className="w-3 h-3 text-[#C0392B]" />
          <span>{TOP_BAR_INFO.phone.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

// ── Nav Item ─────────────────────────────────────────────────────────────────
function NavItem({ link, isActive }: { link: NavLink; isActive?: boolean }) {
  const baseClass = `text-sm font-medium transition-colors relative
    after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px]
    after:bg-[#C0392B] after:scale-x-0 after:transition-transform after:origin-left
    hover:after:scale-x-100 hover:text-[#C0392B]
    ${isActive ? 'text-[#C0392B] after:scale-x-100' : 'text-gray-700'}`

  if (link.dropdown?.length) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={`${baseClass} flex items-center gap-0.5 outline-none`}>
            {link.label}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[180px]">
          {link.dropdown.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="cursor-pointer text-gray-700 hover:text-[#C0392B]">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link href={link.href} className={baseClass}>
      {link.label === 'Donate' ? (
        <span className="flex items-center gap-1">
          {link.label}
          <Heart className="w-3.5 h-3.5 fill-[#C0392B] text-[#C0392B]" />
        </span>
      ) : (
        link.label
      )}
    </Link>
  )
}

// ── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (!open) return null

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold text-gray-800 text-sm">{SITE_NAME}</span>
        <button onClick={onClose} className="text-gray-500 hover:text-[#C0392B]">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col px-4 py-4 gap-1 overflow-y-auto flex-1">
        {NAV_LINKS.map((link) => (
          <div key={link.href}>
            {link.dropdown ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === link.href ? null : link.href)}
                  className="w-full flex items-center justify-between py-2.5 text-gray-700 font-medium text-sm border-b border-gray-100"
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expanded === link.href ? 'rotate-180' : ''}`}
                  />
                </button>
                {expanded === link.href && (
                  <div className="pl-4 flex flex-col gap-1 py-1">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onClose}
                        className="py-2 text-sm text-gray-500 hover:text-[#C0392B]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-1 py-2.5 text-gray-700 font-medium text-sm border-b border-gray-100 hover:text-[#C0392B]"
              >
                {link.label}
                {link.label === 'Donate' && (
                  <Heart className="w-3.5 h-3.5 fill-[#C0392B] text-[#C0392B]" />
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="p-4 border-t">
        <Link href={CONTACT_HREF} onClick={onClose}>
          <Button className="w-full bg-[#C0392B] hover:bg-[#a93226] text-white rounded-md">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  )
}

// ── Main Navbar ──────────────────────────────────────────────────────────────
export function Navbar({ activePath = '/' }: { activePath?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-40 shadow-sm">
      {/* Top info bar */}
      <TopBar />

      {/* Main nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* Replace src with your actual logo path */}
            <div className="w-10 h-10 rounded-full bg-[#C0392B] flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">Bodhi International</p>
              <p className="text-xs text-gray-500">Montessori School</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                isActive={activePath === link.href}
              />
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href={CONTACT_HREF} className="hidden md:block">
              <Button className="bg-[#C0392B] hover:bg-[#a93226] text-white text-sm px-5 rounded-md">
                Contact Us
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-600 hover:text-[#C0392B]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}