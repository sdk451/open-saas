import { Brokers } from 'wasp/client/crud';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';

const CreateBrokerPage = () => {

  const history = useHistory();
  const createBroker = Brokers.create.useAction()
  const [brokerCode, setBrokerCode] = useState('')
  const [brokerName, setBrokerName] = useState('')
  const [brokerDescription, setBrokerDescription] = useState('')
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const target = event.target as HTMLFormElement
      // setBrokerCode(target.code.value)
      // setBrokerName(target.name.valueOf)
      // setBrokerDescription(target.description.value)  
      handleCreateBroker()
      history.push("/admin/brokers")
    } catch (err: any) {
      window.alert('Error: ' + err.message)
    }

  }

  function handleCreateBroker() {
    createBroker({ name: brokerName, code: brokerCode, description: brokerDescription})
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="New Broker"/>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-8 border-t-4 border-stroke py-4.5 px-4 bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:px-6 '>
            <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Broker Code
              </h3>
            </div>
            <div className="col-start-2 col-span-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
              <input
                id='code'
                name='code'
                value={brokerCode}
                onChange={(e) => setBrokerCode(e.target.value)}
              />
            </div>
            <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Broker Name
              </h3>
            </div>
            <div className="col-start-2 col-span-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
              <input
                id='name'
                name='name'
                value={brokerName}
                onChange={(e) => setBrokerName(e.target.value)}
              />
            </div>
            <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Description
              </h3>
            </div>
            <div className="col-start-2 col-span-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
              <input
                id='description'
                name='description'
                value={brokerDescription}
                onChange={(e) => setBrokerDescription(e.target.value)}
              />
            </div>
            <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
              <button
                className="inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
                type="submit">
                <h3 className="font-medium text-black dark:text-white">
                  Add Broker
                </h3>
              </button>                  
            </div>
          </div>
        </form>
      </DefaultLayout>
  )
}

export default CreateBrokerPage