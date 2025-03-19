import { useState, useRef, useEffect } from "react"

export const useEditable = () => {

    const [edit, setEdit] = useState(false)
    const editInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (edit) {
            editInputRef.current?.focus()
        }
    }, [edit])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (editInputRef.current && editInputRef.current.parentNode && !editInputRef.current.parentNode.contains(event.target as Node)) {
                setEdit(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setEdit(false)
            }
        }

        document.addEventListener('click', handleClickOutside, true)
        document.addEventListener('keydown', handleKeyDown, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
            document.removeEventListener('keydown', handleKeyDown, true)
        }

    }, [])

    return {editInputRef, edit, setEdit}
}