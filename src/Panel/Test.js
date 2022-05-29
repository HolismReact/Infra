import jsxSingleElement from "../Components/React/JsxSingleElement"
import jsxArray from "../Components/React/JsxArray"
import Unify from "../Components/Unify"

const PascalCasedJsxSingleElement = jsxSingleElement

const Test = () => {
    return <div>
        <h1>test</h1>
        <Unify component={jsxSingleElement} />
        {/* <jsxSingleElement /> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter. */}
        {/* <PascalCasedJsxSingleElement /> Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. */}
        <Unify component={jsxArray} />
    </div>
}

export default Test