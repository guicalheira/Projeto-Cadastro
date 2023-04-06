import { useEffect, useState } from "react";
import CustomerCollection from "../backend/db/CustomerCollection";
import Customer from "../core/Customer";
import CustomerRep from "../core/CustomerRep";
import useTableOrForm from "./useTableOrForm";

export default function useCustomers(){
    const repo : CustomerRep = new CustomerCollection()
    const{ observableForm,observableTable, showForm,showTable} = useTableOrForm()
   
    const [customer, setCustomer] = useState<Customer>(Customer.void())
    const [customers, setCustomers] = useState<Customer[]>([])
   useEffect(()=>{
  }, [])
  function getAll(){
    repo.getAll().then(customers=>{
      setCustomers(customers)
      showTable()
    })
    
   }
    function customerEdit(customer: Customer) {
      setCustomer(customer)
      showForm()
    }
     function customerDelete(customer: Customer) {
      repo.delete(customer)
      getAll()
    }
     function saveCustomer(customer: Customer) {
        repo.save(customer)
       getAll()
      
    }
    function newCustomer(){
      setCustomer(Customer.void)
      showForm()
    }
    return{
        saveCustomer,
        customerDelete,
        customerEdit,
        newCustomer,
        getAll,
        customer,
        customers,
       observableTable,
       showTable
    }
}