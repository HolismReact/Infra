import Logo from '../Logo';

const Branding = () => {
    return( 
        <div id="logo" className='h-20 flex items-center justify-center'>
            <a href="Home" className='h-full w-full flex items-center justify-center'>
                <Logo />
            </a>
        </div>
    );
};

export default Branding;