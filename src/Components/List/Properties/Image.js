import UploadIcon from '@mui/icons-material/Upload';
import { HolismIcon } from '../Exports';

const Image = ({
    url,
    alt,
    uploadUrl
}) => {
    return <div className="relative">
        <img src={url} alt={alt || ''} className="w-8 h-8 object-cover rounded-full cursor-pointer hover:shadow-md hover:shadow-black" />
        {
            uploadUrl &&
            <HolismIcon
                icon={UploadIcon}
                className="absolute bottom-0 left-6 w-4 h-4 cursor-pointer text-slate-900 bg-white  rounded-full p-0.5 hover:bg-slate-900 hover:text-white transition-colors"
            />
        }
    </div>
}

export { Image }