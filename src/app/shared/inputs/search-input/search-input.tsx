import css from './search-input.module.scss';
import React, {useEffect, useRef, useState} from "react";
import {FcSearch} from "react-icons/fc";

interface Props {
    onChange: (event: any) => void;
}

export default function SearchInput({onChange}: Props) {
    const [isFocused, setFocus] = useState<boolean>(false);

    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDownEvent = (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                onChange(inputElement?.current?.value);
            }
        }
        inputElement?.current?.addEventListener('keydown', handleKeyDownEvent);

        return () => inputElement?.current?.removeEventListener('keydown', handleKeyDownEvent);
    }, []);

    const focusField = () => {
        if (inputElement?.current) {
            const value = inputElement.current.value;
            if (value.trim() !== "") {
                onChange(value);
            } else {
                inputElement.current.focus();
            }
        }
    }

    return (
        <div className={[css.inputFieldContainer, isFocused ? css.focused : ''].join(' ')}>
            <input ref={inputElement} onSubmit={onChange} onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <FcSearch className={css.searchIcon} onClick={focusField}/>
        </div>
    );
}
