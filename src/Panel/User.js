const User = () => {
    return <div id='user' className='bg-blue-400 flex flex-col items-center justify-center'>
        <div id='profilePicture' className='mt-4 w-16 h-16 rounded-full bordered relative' >
            <img src='https://via.placeholder.com/150' alt='picture' className='rounded-full' />
            <span id='onlineStatus' className='absolute top-0 right-0 w-3 h-3 block bg-green-100 rounded-full'></span>
        </div>
        <div id='fullName' className='mt-2 mb-4 text-l font-bold'>
            Saeed Nemati
        </div>
    </div>
}

export default User;