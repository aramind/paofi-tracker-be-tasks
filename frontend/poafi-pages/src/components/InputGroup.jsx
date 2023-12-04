import { useState } from 'react'

function InputGroup({ type, labelName, onInputChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        onInputChange(value); // Call the callback function with the updated value
    };

    return (
        <div className={`form-group mb-4 ${inputValue ? 'field--not-empty' : ''}`}>
            <label>{labelName}</label>
            <input
                type={type}
                className="form-control"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default InputGroup;
