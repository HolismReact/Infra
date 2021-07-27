import FormContext from "../../Base/FormContext"
import Button from '@material-ui/core/Button'

const defaultActions =
    <>
        <Button>Save</Button>
        <Button>Cancel</Button>
    </>

const Form = (prop) => {
    return <FormContext.Provider value={{}}>
        <form>
            {prop.fields}
            {
                prop.actions || defaultActions
            }
        </form>
    </FormContext.Provider>
}

export default Form;