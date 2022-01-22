import { Text } from './Text';
import LinkIcon from '@mui/icons-material/Link';

const Slug = (props) => {
    const slugFormat = /^[a-z0-9-]*$/;

    return <Text
        column="Slug"
        placeholder="Slug"
        required="Slug is not provided"
        startIcon={LinkIcon}
        regex={slugFormat}
        hint="this-is-a-valid-slug"
        regexError='Slug is not valid. Only dash and lowercase English characters, and numbers are accepted.'
        {...props}
    />
}

export { Slug };