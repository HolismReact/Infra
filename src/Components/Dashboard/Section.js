const Section = ({
    children
}) => {
    return <div
        className="section flex flex-row w-full"
    >
        <div>
            {children.length}
        </div>
        {children}
    </div>
}

export { Section };