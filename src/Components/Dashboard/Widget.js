const Widget = ({
    title,
    span,
    allSiblingsCount,
    children
}) => {

    return <div
        className={
            "widget bg-white md:rounded-lg p-6"
        }
    >
        {
            title
                ?
                <div
                    className="uppercase text-sm text-gray-800 font-light mb-3 tracking-wider"
                >
                    {title}
                </div>
                :
                null
        }
        {
            allSiblingsCount
        }
        {children}
    </div>
}

export { Widget };