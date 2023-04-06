import { table } from "console";
import { useState } from "react";

export default function useTableOrForm(){
    const[observable,setObservable] = useState<'table'|'form'>("table")

    const showTable = ()=> setObservable('table')
    const showForm = ()=> setObservable('form')

return{
    observableForm: observable === 'form',
    observableTable: observable === 'table',
    showTable,
    showForm

}

}