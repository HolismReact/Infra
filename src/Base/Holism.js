const Holism = {
    isSomething: value => {
        return !isNothing(value);
    },
    isNothing: value => {
        return value === undefined || value === null || (/^\s*$/g.test(value));
    }
};

export default Holism;