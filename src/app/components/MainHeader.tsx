import { MapPin, Briefcase, Calendar, CalendarPlus } from 'lucide-react';
import Image from 'next/image';

export default function MainHeader() {
    return(
        <div className='rounded-lg bg-gray-100 overflow-hidden w-full'>
                <div className='flex flex-col items-center py-6 text-sm'>
                    <Image className='w-70 h-9' src="/images/logo.png" alt="Enterprise logo"/>
                </div>

                <div className='flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8'>
                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span>São Caetano, SP</span>
                    </div>

                    <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Visita Técnica</span>
                    </div>

                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span>02/03/2025</span>
                    </div>

                    <div className="flex items-center">
                        <CalendarPlus className="h-5 w-5 text-gray-400 mr-2" />
                        <span>02/03/2025</span>
                    </div>
                </div>

            </div>
    )
}