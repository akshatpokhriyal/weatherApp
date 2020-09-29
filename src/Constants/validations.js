
export default Validations = {
    isEmail: (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    isEmpty: (string) => {
        return string.trim() === ""
    },
    isName: (string) => {
        const re = /^[a-zA-Z ]+$/
        return re.test(string)
    },
    isphoneNumber: (string) => {
        // string.length<15?isNaN(string) ?
        return string.length < 6 || string.length > 14 || isNaN(string) ? false : true
    },
    isAlphabet: (string) => {
        const re = /^[a-zA-Z() ]+$/
        return re.test(string)
    }
}