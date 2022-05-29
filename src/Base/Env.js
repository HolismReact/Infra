const Env = {
    get: (key) => {
        if (!key) {
            return `UNDEFINED_${key}`
        }
        const value = process.env[`REACT_APP_${key}`]
        return value
    },
    isDev: () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return true
        } else {
            return false
        }
    }
}

export default Env