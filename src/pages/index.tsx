import Layout from "../components//baseComponents/Layout";
import Table from "../components/tableComponents/Table";
import Buttons from "../components/tableComponents/Buttons";
import Form from "../components/formComponents/Form";
import useCustomers from "../hooks/useCustomers";

export default function Home() {

const {customerEdit,customerDelete,customer,customers,newCustomer,observableTable,saveCustomer,showTable} = useCustomers()

  return (
    <div
      className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-red-800 to-yellow-600
    text-white
    `}
    >
      <Layout title="Cadastro Simples">
        {observableTable ? (
          <>
            <div className="flex justify-start">
              <Buttons
                color="green"
                className="mb-4"
                onClick={() => newCustomer()}
              >
                Novo Cliente
              </Buttons>
            </div>
            <Table
              customers={customers}
              customerEdit={customerEdit}
              customerDelete={customerDelete}
            ></Table>
          </>
        ) : (
          <Form
            customer={customer}
            customerChange={saveCustomer}
            canceled={() => showTable()}
          ></Form>
        )}
      </Layout>
    </div>
  );
}
