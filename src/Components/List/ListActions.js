const ListActions = (props) => {
    return <div id='listActions' className='bg-yellow-200 m-2 p-2'>
        <div>
            {
                props.creation
                    ?
                    <div>add</div>
                    :
                    null
            }
        </div>
        <div>
            {/* {props.listActions()} */}
        </div>
    </div>
}

export default ListActions;