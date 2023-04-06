import { useState } from "react";
import Customer from "../../core/Customer";
import Buttons from "../tableComponents/Buttons";
import Input from "./Input";
interface FormProps {
  customer: Customer;
  canceled?:()=>void
  customerChange?: (customer:Customer) => void

}
export default function Form(props: FormProps) {
  const id = props.customer?.id;
  const [name, setName] = useState(props.customer?.name ?? " ");
  const [age, setAge] = useState(props.customer?.age ?? 0 );
  return (
    <div className="bg-gray-200 rounded-lg">
      {id ? <Input readOnly type="text" value={id} text="Código :"></Input> : false }
      <Input readOnly={false} className="mb-3 mt-3 ml-1" type="text" value={name} onChange = {setName} text="Nome :"></Input>
      <Input readOnly={false} type="number" className="mt-3 ml-1" value={age} onChange = {setAge} text="Idade :"></Input>
      <div className="mt-3 flex justify-end">
        <Buttons onClick={()=>props.customerChange?.(new Customer(name,+age,id))} color="blue" className="mr-2 mb-2">{id ? "Alterar " : "Salvar"}</Buttons>
        <Buttons onClick={props.canceled} color="red" className="mr-2 mb-2" >Cancelar</Buttons>
      </div>
    </div>
  );
}
