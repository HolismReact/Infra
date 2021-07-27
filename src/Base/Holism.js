const Holism = {
    isSomething: value => {
        return !this.isNothing(value);
    },
    isNothing: value => {
        return value === undefined || value === null || (/^\s*$/g.test(value));
    }
};

export default Holism;