import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
type CallListType = 'ended' | 'upcoming' | 'recordings';
interface CallListProps {
    type: CallListType
}
function CallList({ type }: CallListProps) {
    return (
        <div className='w-full bg-dark-1 py-6 px-4 flex flex-col gap-3'>
            <Image
                src={`/icons/upcoming.svg`}
                width={24}
                height={24}
                alt='Upcoming'
            />
            <h1 className='text-2xl font-bold'>Team Styaeja dfasd dfjafadf </h1>
            <p className='text-sm'>12:00 AM - 1:00 PM</p>
            <div>
                <div>

                </div>
                <div className='flex gap-2 '>
                    <Button
                        className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-1/90"
                    >
                        Start
                    </Button>
                    <Button
                        className="bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-1/90"
                    >
                        {/* render button icon */}
                        <Image
                            src={`/icons/copy.svg`}
                            alt="button icon"
                            width={13}
                            height={13}
                        />
                        Copy Invitation
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default CallList
