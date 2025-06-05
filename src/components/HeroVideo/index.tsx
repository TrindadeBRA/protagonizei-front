"use client";

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

interface HeroProps {
    apresentationUrl: string;
    contactHref?: string;
    contactLabel?: string;
    downloadLabel?: string;
}

const Hero = ({
    apresentationUrl,
    contactHref = '/#contato',
    contactLabel = 'fale conosco',
    downloadLabel = 'baixar apresentação',
}: HeroProps) => {
    return (
        <section aria-label="Hero Section" id="hero-anchor" style={{ height: 'calc(100svh - 96px)' }} className="w-full relative overflow-hidden flex flex-col justify-end">
            {/* Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/assets/videos/tiken-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/35 z-10" />
            {/* Buttons container - agora sem absolute */}
            <div className="z-20 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 w-full md:w-auto px-5 md:pl-20 pb-10 md:max-w-2xl">
                <Link
                    href={contactHref}
                    className="flex items-center gap-x-2 rounded-md bg-[#f5d22c] text-black px-4 py-2.5 font-bold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label={contactLabel}
                    data-aos="fade-right"
                    data-aos-anchor="#hero-anchor"
                >
                    {contactLabel} <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                    href={apresentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 text-white font-bold hover:text-[#f5d22c] transition-colors duration-200 focus:outline-none focus:text-[#f5d22c] py-2.5"
                    aria-label={downloadLabel}
                    data-aos="fade-right"
                    data-aos-anchor="#hero-anchor"
                >
                    {downloadLabel} <ArrowRightIcon className="w-4 h-4" />
                </Link>
            </div>
            {/* Add a noscript tag for users without JavaScript */}
            <noscript>
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-white text-center p-8">
                    <p>This hero section requires JavaScript to display the video background.</p>
                </div>
            </noscript>
        </section>
    );
};

export default dynamic(() => Promise.resolve(Hero), { ssr: false });
