"use client"

import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function PinMap() {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <div className="relative overflow-x-hidden" data-aos="fade-in">
            {isLoading && (
                <div className="absolute inset-0 w-full h-[450px] bg-gray-200 animate-pulse flex items-center justify-center">
                    <ArrowPathIcon className="w-12 h-12 text-gray-400 animate-spin" />
                </div>
            )}
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9445473925052!2d-46.58629143920675!3d-23.713674211360196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce43b088d00001%3A0xcc78a565c4910e12!2sTiken%20Especialidades%20Qu%C3%ADmicas!5e0!3m2!1spt-BR!2sbr!4v1741731956528!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="450" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}