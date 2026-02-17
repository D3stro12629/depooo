export function required(value, message = 'This field is required') {
    console.log(value);
    
    return value && String(value).trim() ? "" : message;
}

export function isEmail(value, message = 'Invalid email address') {
return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(String(value).trim())
    ? ""
    : message; // tor add @gmail.com only
}

export function validate(value, rules = []) {
    console.log(rules);
    console.log('value : ', value);
    for (let rule of rules) {
        const err = rule(value);
        if (err) return err;
    }
    return "";
}