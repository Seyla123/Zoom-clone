import React from 'react'
type CallListType = 'ended' | 'upcoming' | 'recordings';
interface CallListProps {
    type: CallListType
}
function CallList({ type }: CallListProps) {
    return (
        <div>CallList : {type}</div>
    )
}

export default CallList
