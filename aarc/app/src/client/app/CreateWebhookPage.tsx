import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DefaultLayout from '../admin/layout/DefaultLayout';
import Breadcrumb from '../admin/components/Breadcrumb';
import { createWebhook } from 'wasp/client/operations';
import { HttpError } from 'wasp/server';
import { useAuth } from "wasp/client/auth";

import { type Webhook } from 'wasp/entities';


// const handleCreateWebhook : typeof createWebhook<CreateWebhookPayload, Webhook> = async (
//   args,
//   context
// ) => {
//   if (!context.user) {
//     throw new HttpError(401)
//   }
//   return context.entities.Webhook.create({
//     data: {
//       broker: args.broker,
//       brokerApiUrl: args.brokerApiUrl, 
//       brokerSecretKey: args.brokerSecretKey,
//       description: args.description,
//       user: { connect: { id: context.user.id } },
//     },
//   })
// }



function NewWebhookForm({ handleCreateWebhook }: { handleCreateWebhook: typeof createWebhook }) {

  type CreateWebhookPayload = Pick<Webhook, 'id' | 'userId' | 'broker' | 'brokerApiUrl' | 'brokerSecretKey' | 'description'>

  const { data: user } = useAuth();
  const history = useHistory();
  
  const [broker, setBroker] = useState<string>('');
  const [brokerApiUrl, setBrokerUrl] = useState<string>('');
  const [brokerSecretKey, setBrokerKey] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  let payload : CreateWebhookPayload
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!user) {
      throw new HttpError(401);
    }

    const target = event.target as HTMLFormElement
    payload = {id: '', userId: user.id, broker: broker, brokerApiUrl: brokerApiUrl, brokerSecretKey: brokerSecretKey, description: description}

    try {
      await handleCreateWebhook(payload);
      setBroker('');
      setBrokerUrl('');
      setBrokerKey('');
      setDescription('');
      // history.push('/app');
    } catch (err: any) {
        window.alert('Error: ' + (err.message || 'Something went wrong'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-8 border-t-4 border-stroke py-4.5 px-4 bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:px-6 '>
        <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <label className="font-medium text-black dark:text-white">
            Broker
          </label>
        </div>
        <div className="col-start-2 col-span-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <input
            id='broker'
            name='broker'
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
          />
        </div>
        <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <label className="font-medium text-black dark:text-white">
            Api Url
          </label>
        </div>
        <div className="col-start-2 col-span-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <input
            id='url'
            name='url'
            value={brokerApiUrl}
            onChange={(e) => setBrokerUrl(e.target.value)}
          />
        </div>
        <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <label className="font-medium text-black dark:text-white">
            Api Key
          </label>
        </div>
        <div className="col-start-2 col-span-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <input
            id='secret'
            name='secret'
            value={brokerSecretKey}
            onChange={(e) => setBrokerKey(e.target.value)}
          />
        </div>
        <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <label className="font-medium text-black dark:text-white">
            Description
          </label>
        </div>
        <div className="col-start-2 col-span-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <input
            id='description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-start-1 border-b border-stroke py-4 px-4 dark:border-strokedark">
          <button
            className="inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="submit">
            <h3 className="font-medium text-black dark:text-white">
              Create Webhook
            </h3>
          </button>                  
        </div>
      </div>
    </form>

  )
}

const CreateWebhookPage = () => {
  
  return (
    <DefaultLayout>
        <Breadcrumb pageName="New Webhook"/>
        <NewWebhookForm handleCreateWebhook={createWebhook} />
    </DefaultLayout>
  )
}

export default CreateWebhookPage