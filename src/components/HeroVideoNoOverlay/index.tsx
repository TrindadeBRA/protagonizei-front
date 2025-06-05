"use client";

import dynamic from 'next/dynamic';

const HeroVideoNoOverlay = () => {
    return (
        <section aria-label="Hero Section" id="hero-anchor" style={{ height: 'calc(100svh - 96px)' }} className="w-full relative overflow-hidden">
            {/* Desktop Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
                src="/assets/videos/tiken-video-home-desktop.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
            />
            {/* Mobile Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover block md:hidden"
                src="/assets/videos/tiken-video-home-mobile.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
            />
            {/* Add a noscript tag for users without JavaScript */}
            <noscript>
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-white text-center p-8">
                    <p>This hero section requires JavaScript to display the video background.</p>
                </div>
            </noscript>
        </section>
    );
};

export default dynamic(() => Promise.resolve(HeroVideoNoOverlay), { ssr: false });
