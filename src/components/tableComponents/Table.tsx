import Customer from "../../core/Customer"

import { iconDelete, iconEdit } from "./Icons";

interface TableProps {
  customers: Customer[];
  customerEdit?: (customer: Customer) => void;
  customerDelete?: (customer: Customer) => void;
}
export default function Table(props: TableProps) {

const   showActions = props.customerDelete || props.customerEdit

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {showActions ?  <th className="p-4">Ações</th> : false}
       
      </tr>
    );
  }
  function renderData() {
    return props.customers?.map((customer, i) => {
      return (
        <tr
          key={customer.id}
          className={`${i % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"} `}
        >
          <td className="text-left p-4">{customer.id}</td>
          <td className="text-left p-4">{customer.name}</td>
          <td className="text-left p-4">{customer.age}</td>
          {showActions ? renderActions(customer) : false}
        </tr>
      );
    });
  }

  function renderActions(customer: Customer) {
    return (
      <td className="flex justify-center">
        {props.customerEdit ? (
          <button onClick={()=> props.customerEdit?.(customer)}
            className={`flex justify-center items-center 
          text-blue-700 rounded-full p-1 m-1 hover:bg-yellow-50`}
          >
            {iconEdit}
          </button>
        ) : (
          false
        )}
        {props.customerDelete ? (
          <button onClick={()=> props.customerDelete?.(customer)}
            className={`flex justify-center items-center
          text-red-700 rounded-full p-1 m-1 hover:bg-yellow-50`}
          >
            {iconDelete}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }
  return (
    <table className=" w-full overflow-hidden rounded-xl">
      <thead
        className={`bg-gradient-to-r from-yellow-500 to-yellow-800 text-gray-100`}
      >
        {renderHeader()}
      </thead>
      <tbody className={``}>{renderData()}</tbody>
    </table>
  );
}
