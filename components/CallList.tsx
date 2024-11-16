'use client'
import React from 'react'
import MeetingCard from './MeetingCard';
type CallListType = 'ended' | 'upcoming' | 'recordings';
interface CallListProps {
    type: CallListType
}
function CallList({ type }: CallListProps) {
    const clickOn = ()=>{
        console.log('sdfas');
        
    }
    return (
        <div className=''>
            <MeetingCard
                title={'Call'}
                date={ 'Today'}
                icon={'/icons/upcoming.svg'}
                buttonIcon1={ undefined}
                buttonText={'start'}
                handleClick={clickOn}
                link={'/asdfasdf'}
            />
        </div>
    )
}

export default CallList
