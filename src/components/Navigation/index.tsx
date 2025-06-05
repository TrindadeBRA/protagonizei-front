'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import LanguageSwitcher from '../LanguageSwitcher'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Quem Somos', href: '/quem-somos' },
  { name: 'Produtos', href: '/produtos' },
  { name: 'Mercados', href: '/#mercados' },
  { name: 'Contato', href: '/#contato' },
  { name: 'Blog', href: '/blog/page/1' },
  { name: 'Portal Inove', href: 'https://inove.tiken.com.br/', separator: true, external: true },
]

export default function Navigation() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [isGradient, setIsGradient] = useState(false)
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
    setIsGradient(pathname !== '/')
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50)
    }

    const handleHashChange = () => {
      setActiveHash(window.location.hash.substring(1))
    }

    // Initial hash check
    handleHashChange()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleNavigationClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={twMerge(`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isFixed ? 'shadow-lg' : ''}
      ${isGradient ? 'bg-gradient-custom' : 'bg-white'}
    `)}>
      <nav aria-label="Global" className={`flex p-6 lg:px-8 transition-all duration-300 items-center justify-between ${isFixed ? 'py-4' : 'py-6'}`}>

        {/* Logo */}
        <div className="flex w-auto">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Tiken</span>
            <Image
              alt=""
              src={isGradient ? '/assets/logo-header-white.png' : '/assets/logo-header.png'}
              className="h-12 w-auto"
              height={48}
              width={48}
            />
          </Link>
        </div>

        {/* Menu mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={twMerge("-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer", isGradient && "text-white")}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Menu desktop */}
        <div className="hidden lg:flex gap-x-8 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={twMerge(
                "text-base font-inter font-bold transition-colors",
                isActiveRoute(item.href)
                  ? isGradient 
                    ? "text-white border-b-2 border-white" 
                    : "text-gray-900 border-b-2 border-gray-900"
                  : isGradient
                    ? "text-white/80 hover:text-white"
                    : "text-gray-900/80 hover:text-gray-900",
                item.separator && "border-l border-gray-900 pl-4",
                isGradient && item.separator && "border-white"
              )}
              target={item.external ? '_blank' : '_self'}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Botão fale conosco */}
        <div className="hidden lg:flex items-center">
          <a href={"/#contato"} className={twMerge("mr-4 font-semibold flex items-center gap-x-2 bg-gradient-custom text-white px-3 py-2 rounded-lg", isGradient && "bg-white text-gray-900")}>fale conosco <ArrowRightIcon className="size-4" /></a>
          <LanguageSwitcher isGradient={isGradient} />
        </div>

      </nav>



      {/* Menu mobile - Dialog */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden z-50">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Tiken</span>
              <Image
                alt=""
                src={isGradient ? '/assets/logo-header.png' : '/assets/logo-header.png'}
                className="h-8 w-auto"
                width={32}
                height={32}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 cursor-pointer"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-gray-900 hover:bg-gray-50 font-inter font-bold"
                    target={item.external ? '_blank' : '_self'}
                    onClick={handleNavigationClick}
                  >
                    {item.name}
                  </Link>
                ))}

              </div>
              <div className="py-6">
                <LanguageSwitcher />
              </div>
              <div className="py-6 flex items-center">
                <a href={"/#contato"} className={twMerge("font-semibold flex items-center gap-x-2 text-white px-3 py-2 rounded-lg bg-gradient-custom")}>fale conosco <ArrowRightIcon className="size-4" /></a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
