'use client';

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import useGetCallById from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { use, useState } from 'react';

function Meeting({ params }: { params: Promise<{ id: string }> }) {
    // Use React's `use` to unwrap the promise
    const resolvedParams = use(params);

    const { isLoaded } = useUser();
    const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false);
    const { call, isCallLoading } = useGetCallById(resolvedParams.id);

    if (!isLoaded || isCallLoading) return <Loader />;

    return (
        <main>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupCompleted ? (
                        <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    );
}

export default Meeting;
