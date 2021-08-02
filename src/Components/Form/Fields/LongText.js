import Holism from "../../../Base/Holism";

const LongText = () => {

    Holism.on(Holism.formSubmissionEvent, () => {
        console.log('got form submission from long text field');
    });

    return <div>Long text</div>
}

export default LongText;