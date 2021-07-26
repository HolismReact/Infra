import { NumberInput } from 'react-admin';

const DigitGroupedNumberInput = (props) => {

    const digitGroup = value => {
        if (value === undefined || value === null || /^\s*$/g.test(value)) {
            return '';
        }
        value = value.toString();
        value = value.replace(/,/g, '');
        var str = value.toString().split('.');
        if (str[0].length > 3) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        var result = str.join('.');
        return result;
    };

    const removeGrouping = value => {
        console.log(value);
        if (value.replace) {
            value = value.replace(',', '');
        }
        return value;
    };

    return (
        <NumberInput
            props={props}
            format={removeGrouping}
            parse={digitGroup}
        />
    );
}

export default DigitGroupedNumberInput;