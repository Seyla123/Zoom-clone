'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import useGetCallById from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

function Meeting({ params }: { params: { id: string } }) {
    const { user, isLoaded } = useUser();
    const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false)
    const {call, isCallLoading} = useGetCallById(params.id);

    if(!isLoaded || isCallLoading) return <Loader/>
    return (
        <main >
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupCompleted ?
                        <MeetingSetup/>
                        :
                        <MeetingRoom/>
                    }
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting