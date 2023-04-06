interface InputProps{
    text:string
    type?: 'text'|'number'
    value: any
    readOnly?: boolean  
    className?: string
    onChange?: (value: any) => void
}
export default function Input(props:InputProps){
    return(
        <div className={`flex flex-col ${props.className}  `}>
           <label >
              {props.text}
           </label>
           <input 
           className={`border border-yellow-500 rounded-lg 
           focus:outline-none 
         bg-gray-100  
           px-3 py-2 m-0
           ${props.readOnly ? "" : "focus:bg-white"}
           `}
           readOnly = {props.readOnly}
           onChange = {e =>props.onChange?.(e.target.value)}
           value={props.value}
           type= {props.type ?? 'text'}/>
        </div>
    )
}