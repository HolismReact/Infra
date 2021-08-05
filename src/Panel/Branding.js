import Logo from '../Logo';

const Branding = ({onClick}) => {
    return( 
        <div id="logo" className='h-20 flex items-center justify-center' onClick={onClick}>
            <a href="/" className='h-full w-full flex items-center justify-center'>
                <Logo />
            </a>
        </div>
    );
};

export default Branding;