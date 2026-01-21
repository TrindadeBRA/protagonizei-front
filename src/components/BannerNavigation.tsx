"use client"

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useBanner } from '@/src/contexts/BannerContext'

export default function BannerNavigation() {
  const { isBannerVisible, setIsBannerVisible } = useBanner()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [wasManuallyClosed, setWasManuallyClosed] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      
      const endOfMonth = new Date(year, month + 1, 1, 0, 0, 0, 0)
      
      const difference = endOfMonth.getTime() - now.getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let touchStartY = 0
    let isTouching = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY <= 50) {
        if (!isBannerVisible && !wasManuallyClosed) {
          setIsFadingOut(false)
          setIsBannerVisible(true)
          setHasScrolled(false)
        }
      }
      else if (currentScrollY > lastScrollY && currentScrollY > 50 && isBannerVisible) {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsBannerVisible(false)
          setHasScrolled(true)
        }, 300)
      }
      
      lastScrollY = currentScrollY
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      isTouching = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return
      
      const currentY = e.touches[0].clientY
      const diff = touchStartY - currentY
      
      if (diff < -30) {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsBannerVisible(false)
          setHasScrolled(true)
        }, 300)
        isTouching = false
      }
    }

    const handleTouchEnd = () => {
      isTouching = false
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isBannerVisible, setIsBannerVisible, wasManuallyClosed])

  if (!isBannerVisible) return null

  const formatTime = (value: number) => String(value).padStart(2, '0')

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 isolate flex items-center justify-center md:justify-between gap-x-2 md:gap-x-6 overflow-hidden bg-gradient-to-r from-pink-light via-purple-light to-blue-light px-3 py-1.5 md:px-6 md:py-2.5 border-b border-pink-200 shadow-lg transition-opacity duration-300 ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="hidden md:flex items-center justify-center gap-x-4 flex-1">
        <p className="text-sm/6 text-gray-900">
          <strong className="font-heading font-semibold">
            🎉 <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">Sorteio</span> <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent font-bold">GRÁTIS</span> em andamento!
          </strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          <span className="font-heading">Termina em:</span>
          <span className="font-heading font-bold ml-2 bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
            {timeLeft.days}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
          </span>
        </p>
        <Link
          href="/sorteio"
          className="flex-none rounded-full bg-gradient-to-r from-pink-main to-blue-main px-3.5 py-1 text-sm font-heading font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-main transition-all"
        >
          Participar agora <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="flex md:hidden items-center justify-center gap-x-1.5 flex-1 min-w-0">
        <span className="font-heading text-xs text-black whitespace-nowrap">
          🎉 <span className="font-semibold text-black">Sorteio</span> <span className="font-bold text-black">GRÁTIS</span>
        </span>
        <span className="text-gray-400 text-xs">•</span>
        <span className="font-heading text-xs font-bold bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent whitespace-nowrap">
          {timeLeft.days}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m
        </span>
        <Link
          href="/sorteio"
          className="flex-none rounded-full bg-gradient-to-r from-pink-main to-blue-main px-2.5 py-1 text-xs font-heading font-semibold text-white shadow-sm hover:opacity-90 transition-all whitespace-nowrap"
        >
          Participar
        </Link>
      </div>
      
      {/* Botão Fechar - Mobile */}
      <div className="flex md:hidden flex-none">
        <button 
          type="button" 
          onClick={() => {
            setWasManuallyClosed(true)
            setIsBannerVisible(false)
          }}
          className="-m-3 p-3 focus-visible:-outline-offset-4"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-gray-900 cursor-pointer" />
        </button>
      </div>

      <div className="hidden md:flex flex-none justify-end">
        <button 
          type="button" 
          onClick={() => {
            setWasManuallyClosed(true)
            setIsBannerVisible(false)
          }}
          className="-m-3 p-3 focus-visible:-outline-offset-4"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-gray-900 cursor-pointer" />
        </button>
      </div>
    </div>
  )
}
