import { TextField } from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const[editMode,setEditMode]=useState(false)
    const[title,setTitle]=useState('')

    const enterEditMode = ()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const enterViewMode = () =>{
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?<TextField value={title} onChange={onChangeHandler} onBlur={enterViewMode} autoFocus/>
        :<span onDoubleClick={enterEditMode}>{props.title}</span>
}