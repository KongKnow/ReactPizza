import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/filterSlice'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'

const Search = () => {
    const [instantInput, setInstantInput] = useState('')
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onInputStopChanging = useCallback(
        debounce((value) => {
            dispatch(setSearchValue(value))
        }, 1000),
        []
    )

    const onInput = (e, value) => {
        setInstantInput(e.target.value)
        onInputStopChanging(value)
    }

    const onClickClear = () => {
        setInstantInput('')
        dispatch(setSearchValue(''))
        inputRef.current.focus()
    }

    return (
        <div className={styles.root}>
            <input ref={inputRef} className={styles.input} onChange={(e) => onInput(e, instantInput)} value={instantInput} placeholder="Поиск пицц ..."/>
            <div className={styles.icon}>
                {
                    instantInput === '' ? null : <svg onClick={onClickClear} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
                }
            </div>
        </div>
    )
}

export default Search