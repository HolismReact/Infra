import { DatePart } from './DatePart'
import { TimePart } from './TimePart'
import { ValueWithTitle } from './ValueWithTitle'

const DateTimeTitleAgo = ({ date, timeAgo }) => {
    return <ValueWithTitle
        value={<>
            <DatePart value={date} />
            <br />
            <TimePart value={date} />
        </>}
        title={timeAgo + ' ago'}
    />
}

export { DateTimeTitleAgo }