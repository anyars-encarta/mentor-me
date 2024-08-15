import React from 'react'

const MeetingRoom = ({ params }: { params: { id: string } }) => {
    return (
        <div>Meeting Room #: {params.id}</div>
    )
}

export default MeetingRoom;