import { type Webhook } from 'wasp/entities';

import {
  deleteWebhook,
  updateWebhook,
  useQuery,
  getAllWebhooksByUser,
} from 'wasp/client/operations';

import { cn } from '../../shared/utils';
import { useState, useMemo } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useAuth } from "wasp/client/auth";
import { TiDelete } from 'react-icons/ti';
import { Link } from 'wasp/client/router'


export default function AppPage() {

  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            Your <span className='text-yellow-500'>Trading</span> Dashboard
          </h2>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white'>
          List Current Webhooks in a table. If there aren't any, display add webhook link to add webhook form
        </p>
        <div className='my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10'>
          <div className='sm:w-[90%] md:w-[70%] lg:w-[50%] py-10 px-6 mx-auto my-8 space-y-10'>
            <WebhooksTable />
          </div>
        </div>
        <div className='my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10'>
          <div className='sm:w-[90%] md:w-[70%] lg:w-[50%] py-10 px-6 mx-auto my-8 space-y-10'>
            <Link to='/app/webhook/create'> 
              Create Webhook
            </Link>  
          </div>
        </div>
      </div>
    </div>
  );
}

function WebhooksTable() {

//    const [broker, setBroker] = useState<string>('');
//    const [brokerApiUrl, setBrokerUrl] = useState<string>('');
//    const [brokerSecretKey, setBrokerKey] = useState<string>('');
//    const [description, setDescription] = useState<string>('');
//    const { data: user } = useAuth();
    const { data: webhooks, isLoading: isWebhooksLoading } = useQuery(getAllWebhooksByUser);
  
  return (
    <div className='border-t-4 border-stroke py-4 px-4 dark:border-strokedark md:px-6'>
      {isWebhooksLoading && <div>Loading...</div>}
      {webhooks!! && webhooks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Broker</th>
              <th>Api Url</th>
              <th>Api Secret</th>
              <th>Description</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {webhooks.map((webhook) => (
              <TableRow key={webhook.id} id={webhook.id} createdAt={webhook.createdAt} broker={webhook.broker} brokerApiUrl={webhook.brokerApiUrl} brokerSecretKey={webhook.brokerSecretKey} description={webhook.description} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-gray-600 text-center'>Add a webhook to begin</div>
      )}
    </div>
  )
};



type WebhookProps = Pick<Webhook, 'id' | 'createdAt' | 'broker' | 'brokerApiUrl' | 'brokerSecretKey' | 'description'>;

function TableRow({ id, createdAt, broker, brokerApiUrl, brokerSecretKey, description }: WebhookProps) {

  const handleDescriptionChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateWebhook({
      id,
      description: e.currentTarget.value,
    });
  };

  const handleBrokerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateWebhook({
      id,
      broker: e.currentTarget.value,
    });
  };

  const handleBrokerUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateWebhook({
      id,
      brokerApiUrl: e.currentTarget.value,
    });
  };

  const handleBrokerKeyChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateWebhook({
      id,
      brokerSecretKey: e.currentTarget.value,
    });
  };

  const handleDeleteClick = async () => {
    await deleteWebhook({ id });
  };

  return (
    <tr key={id} className='flex-row'>
      <td key={broker} className='flex items-left'>
      <input 
        type='string'
        id='broker'
        placeholder='Binance'
        className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
        value={broker}
        onChange={(e) => handleBrokerChange(e)}
      />
      </td>
      <td key={brokerApiUrl} className='flex items-left'>
        <input
          type='string'
          id='brokerApiUrl'
          placeholder='http://test.url/someapi'
          className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
          value={brokerApiUrl}
          onChange={(e) => handleBrokerUrlChange(e)}
        />
      </td>
      <td key={brokerSecretKey} className='flex items-left'>
        <input
          type='string'
          id='brokerSecretKey'
          placeholder='qAz512b921xTYQ4a87'
          className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
          value={brokerSecretKey}
          onChange={(e) => handleBrokerKeyChange(e)}
        />
      </td>
      <td key={description} className='flex items-left'>
        <input
          type='string'
          id='description'
          placeholder='Enter webhook description'
          className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
          value={description}
          onChange={(e) => handleDescriptionChange(e)}
        />
      </td>
      <td key={createdAt.toLocaleString()} className='flex items-left'>
        <p className='text-sm text-black dark:text-white'>{createdAt.toLocaleString()}</p>
      </td>
      <td className='flex items-center justify-end w-15'>
        <button className='p-1' onClick={handleDeleteClick} title='Remove Webhook'>
          <TiDelete size='20' className='text-red-600 hover:text-red-700' />
        </button>
    </td>
  </tr>
  )
};