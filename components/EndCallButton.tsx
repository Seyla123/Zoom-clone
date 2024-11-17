'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function EndCallButton() {
    const call = useCall();
    const router = useRouter();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isMeetingOwner = localParticipant &&
        call?.state.createdBy && localParticipant.userId ===
        call?.state.createdBy.id;

    if (!isMeetingOwner) return null;
    const endCall = async () => {
        await call?.endCall();
        router.push('/')
        // Redirect to the meeting list page
        // or perform other necessary actions
    }

    return (
        <Button onClick={endCall} className='bg-red-500'>
            End for everyone
        </Button>
    )
}

export default EndCallButton