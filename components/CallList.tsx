
'use client'
import { useState } from 'react'
import MeetingCard from './MeetingCard';
import useGetCalls from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import Loader from './Loader';
interface CallListProps {
    type: 'ended' | 'upcoming' | 'recordings'
}
function CallList({ type }: CallListProps) {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return callRecordings;
            default:
                return [];
        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous calls.';
            case 'upcoming':
                return 'No upcoming calls yet.';
            case 'recordings':
                return 'No recordings.';
            default:
                return '';
        }
    }
    const getIcon = () => {
        switch (type) {
            case 'ended':
                return '/icons/previous.svg';
            case 'upcoming':
                return '/icons/upcoming.svg';
            case 'recordings':
                return '/icons/recordings.svg';
            default:
                return '/icons/recordings.svg';
        }
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    const icon = getIcon();
    const clickOn = () => {
        console.log('sdfas');
    }
    if (isLoading) return <Loader />
    if (calls) {
        calls.map((meeting: Call | CallRecording) => {
            console.log(meeting);

        })
    }
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {
                (calls && calls.length > 0) ? calls.map((meeting: Call | CallRecording) => {
                    const meetingItem = (meeting as Call)
                    return (
                        <MeetingCard
                            key={meetingItem.id}
                            title={meetingItem.state.custom.description.substring(0, 26) || 'No description'}
                            date={meetingItem.state.startsAt?.toLocaleDateString()
                                || meetingItem.start_time.toLocaleDateString()
                            }
                            isPreviousMeeting={type === 'ended'}
                            icon={icon}
                            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                            buttonText={type === 'recordings' ? 'Play' : 'Start'}
                            handleClick={type === 'recordings' ? () => router.push(`/recordings/${meetingItem.url}`) : () => router.push(`/meeting/${meetingItem.id}`)}
                            link={type === 'recordings' ? `/recordings/${meetingItem.url}` : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingItem.id}`}
                        />
                    )
                })
                    :
                    <h1>{noCallsMessage}</h1>
            }

        </div>
    )
}

export default CallList
