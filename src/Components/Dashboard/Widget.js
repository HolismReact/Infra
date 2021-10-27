const Widget = ({
    children
}) => {
    return <div
        className="widget bg-white md:rounded-lg"
    >
        {children}
    </div>
}

export { Widget };