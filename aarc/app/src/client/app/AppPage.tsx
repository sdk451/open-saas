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
          <div className='mx-auto text-center py-4 px-6'>
            <WebhooksTable />
          </div>
        </div>
        <div className='my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10'>
          <div className='py-4 px-6 mx-auto text-center'>
            <button>
              <Link to='/app/webhook/create'> 
                Create Webhook
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebhooksTable() {

    const { data: webhooks, isLoading: isWebhooksLoading } = useQuery(getAllWebhooksByUser);
  
  return (
    <div>
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
            <tr>
              <div className='border-t-2 border-stroke py-2 px-2 dark:border-strokedark md:px-6'></div>
            </tr>
          </thead>
          <tbody>
            {webhooks.map((webhook) => (
              <TableRow key={webhook.id} 
                        id={webhook.id} 
                        createdAt={webhook.createdAt} 
                        userId={webhook.userId}
                        broker={webhook.broker} 
                        brokerApiUrl={webhook.brokerApiUrl} 
                        brokerSecretKey={webhook.brokerSecretKey} 
                        description={webhook.description}  />
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-gray-600 text-center'>Add a webhook to begin</div>
      )}
    </div>
  )
};

// type WebhookProps = Pick<Webhook, 'id' | 'createdAt' | 'broker' | 'brokerApiUrl' | 'brokerSecretKey' | 'description'>;

function TableRow(webhook : Webhook) {

  const [broker, setBroker] = useState<string>(webhook.broker);
  const [brokerApiUrl, setBrokerUrl] = useState<string>(webhook.brokerApiUrl);
  const [brokerSecretKey, setBrokerKey] = useState<string>(webhook.brokerSecretKey);
  const [description, setDescription] = useState<string>(webhook.description);

  const handleDescriptionChange = async (id: string) => {
    await updateWebhook({
      id,
      description: description,
    });
  };

  const handleBrokerChange = async (id: string) => {
    await updateWebhook({
      id,
      broker: broker,
    });
  };

  const handleBrokerUrlChange = async (id: string) => {
    await updateWebhook({
      id,
      brokerApiUrl: brokerApiUrl,
    });
  };

  const handleBrokerKeyChange = async (id: string) => {
    await updateWebhook({
      id,
      brokerSecretKey: brokerSecretKey,
    });
  };

  const handleDeleteClick = async () => {
    await deleteWebhook({ 'id':webhook.id });
  };

  return (
    <tr key={webhook.id}>
      <td key={broker}>
      <input 
        type='string'
        id='broker'
        placeholder='Binance'
        className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
        value={broker}
        onChange={(e) => setBroker(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleBrokerChange(webhook.id);
          }
        }}
      />
      </td>
      <td key={brokerApiUrl}>
        <input
          type='string'
          id='brokerApiUrl'
          placeholder='http://test.url/someapi'
          className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
          value={brokerApiUrl}
          onChange={(e) => setBrokerUrl(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBrokerUrlChange(webhook.id);
            }
          }}
        />
      </td>
      <td key={brokerSecretKey}>
        <input
          type='string'
          id='brokerSecretKey'
          placeholder='qAz512b921xTYQ4a87'
          className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
          value={brokerSecretKey}
          onChange={(e) => setBrokerKey(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBrokerKeyChange(webhook.id);
            }
          }}
        />
      </td>
      <td key={description}>
        <input
          type='string'
          id='description'
          placeholder='Enter webhook description'
          className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleDescriptionChange(webhook.id);
            }
          }}
        />
      </td>
      <td key={webhook.createdAt.toLocaleString()}>
        <p className='min-w-[7rem] text-gray-800/90 text-center font-medium rounded-md border border-gray-200 bg-yellow-50 hover:bg-yellow-100 shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
        >{webhook.createdAt.toLocaleString()}</p>
      </td>
      <td>
        <button className='p-1' onClick={handleDeleteClick} title='Remove Webhook'>
          <TiDelete size='20' className='text-red-600 hover:text-red-700' />
        </button>
    </td>
  </tr>
  )
};