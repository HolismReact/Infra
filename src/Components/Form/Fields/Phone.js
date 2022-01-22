import { Text } from './Text';

const Phone = (props) => {

    const phoneFormat = /^[\d\(\)-.]*/

    return <Text
        regex={phoneFormat}
        regexError='Phone is not valid'
        {...props}
    />
}

export { Phone }