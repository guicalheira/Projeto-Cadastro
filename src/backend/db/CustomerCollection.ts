import  {dataBase } from '../config'
import firestore, {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import Customer from "../../core/Customer";
import CustomerRep from "../../core/CustomerRep";

export default class CustomerCollection implements CustomerRep{
  // Aqui definimos um objeto para converter dados do Firestore para um objeto Customer e vice-versa.
  // É utilizado no método withConverter() abaixo.
  #converter= {
    toFirestore: (customer : Customer)=> {
      return{
        name: customer.name,
        age: customer.age,
      }
    },
    fromFirestore:(
      snapshot:firestore.QueryDocumentSnapshot, 
      options:firestore.SnapshotOptions,
      ) => {
      const data = snapshot.data(options)
      return new Customer(data.name, data.age, snapshot?.id)
    },
  }
  
  // Aqui criamos uma referência à coleção "customers" com o conversor definido acima.
  #collection = collection(dataBase,'customers').withConverter(this.#converter)

  // Método para salvar um Customer no Firestore.
  async save(customer: Customer): Promise<Customer> {
    if (customer?.id) {
      await setDoc(
        doc(dataBase, 'customers', customer.id).withConverter(this.#converter),
        customer,
      )
      return customer
    } else {
      const docRef = await addDoc(
        this.#collection,
        customer,
      )
      const doc = await getDoc(docRef)
      return doc.data()
    }
  }

  // Método para deletar um Customer do Firestore.
  async delete(customer: Customer):  Promise<void>{
    return await deleteDoc(doc(dataBase,'customers',customer.id ))
  }

  // Método para buscar todos os Customers no Firestore.
  async getAll(): Promise<Customer[]> {
    const customersCol = this.#collection
    const customersSnapshot = await getDocs(customersCol)
    const customersList = customersSnapshot.docs.map((doc)=> doc.data()) ?? []
    return customersList
  }
}
