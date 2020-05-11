import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';



const ConversationTableRow = ({email}) => {
    const {recieverId, reciever, sentTime,subject,_id, status} = email;
    dayjs.extend(relativeTime)
    return (
        <tr>
        <td >{reciever}</td>
        <td>{subject}</td>
        <td>{status}</td>
        <td>{dayjs(sentTime).fromNow()}</td>
        </tr>
    )
}

export default ConversationTableRow;