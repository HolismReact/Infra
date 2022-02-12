import { Text } from './Text';

const Link = (props) => {
    const urlFormat = /http(s)?.*/;

    return <Text
        regex={urlFormat}
        regexError='Link is not valid'
        {...props}
    />
}

export { Link };