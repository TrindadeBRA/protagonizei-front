"use client"

import { useBanner } from '@/src/contexts/BannerContext'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isBannerVisible } = useBanner()
  
  return (
    <div className={`!bg-white !text-black !top-0 ${
      isBannerVisible 
        ? '!pt-20 md:!pt-28' 
        : '!pt-16'
    } overflow-x-hidden`}>
      {children}
    </div>
  )
}
