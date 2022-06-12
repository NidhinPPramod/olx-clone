import {useState} from "react";

const UseForms = (intitalvalue) => {  //Custom Hook Creation
    const [value, setValue] = useState(intitalvalue)

    return [
        value,
        (event) => {
            setValue({
                ...value, [event.target.name]: event.target.value,
            })
        }
    ]
}

export default UseForms
