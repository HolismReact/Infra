const FormElement = ({ inputs }) => {
    return <form
        noValidate
    // onSubmit={handleSubmit}
    >
        <div id='fields'>
            {inputs}
        </div>
    </form>
}

export { FormElement }