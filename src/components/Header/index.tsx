'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import LanguageSwitcher from '../LanguageSwitcher'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
  { name: 'Blog', href: '/blog/page/1' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('')

  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    if (href.startsWith('/#')) {
      return activeHash === href.substring(1)
    }
    if (href === '/blog') {
      return pathname.startsWith('/blog')
    }
    return pathname === href
  }

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash.substring(1))
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <header className={twMerge(`transition-all duration-300 bg-white`)}>
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              alt="Logo"
              src="/assets/logo-black.webp"
              className="h-10 w-auto"
              height={40}
              width={40}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={twMerge(
                  "text-base font-medium transition-colors",
                  isActiveRoute(item.href)
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-x-4">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 text-gray-700"
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                alt="Logo"
                src="/assets/logo-black.webp"
                className="h-8 w-auto"
                width={32}
                height={32}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
