import React from 'react'
import app from "../Base/App"

const Unify = ({ component }) => {

    if (!component) {
        return <span className="hidden">Component passed to the wrapper is null or undefined</span>
    }
    if (component.type) {
        if (typeof component.type === 'function') {
            const Component = component.type;
            return <Component />
        }
        if (typeof component.type === 'string') {
            return <>
                {component.type}
            </>
        }
        if (typeof component.type === 'symbol') {
            if (component.type.toString() === 'Symbol(react.fragment)') {
                if (component.props && component.props.children && Array.isArray(component.props.children)) {
                    return <>
                        {
                            component.props.children.map(i => <Unify component={i} />)
                        }
                    </>
                }
            }
        }
    }
    if (typeof component === 'function') {
        const Component = component;
        return <Component />
    }
    
    console.log(component)
    return <div>wrapper</div>
}

export default Unify
export { Unify }