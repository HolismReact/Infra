const Chip = ({ text, className }) => {
    return <span className={"py-1 px-3 rounded-full " + className}>
        {text}
    </span>
}

export { Chip }