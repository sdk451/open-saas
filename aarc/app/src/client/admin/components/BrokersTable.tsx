import { updateBrokerById, useQuery, getPaginatedBrokers } from 'wasp/client/operations';
import { useState, useEffect } from 'react';
import Loader from '../common/Loader';
import DropdownEditDelete from './DropdownEditDelete';
import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'wasp/client/router';

const BrokersTable = () => {
  const [skip, setskip] = useState(0);
  const [page, setPage] = useState(1);
  const [name, setName] = useState<string | undefined>(undefined);
  const { data, isLoading, error } = useQuery(getPaginatedBrokers, {
    skip,
    nameContains: name,
  });

  useEffect(() => {
    setPage(1);
  }, [name]);

  useEffect(() => {
    setskip((page - 1) * 10);
  }, [page]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='flex-col flex items-start justify-between p-6 gap-3 w-full bg-gray-100/40 dark:bg-gray-700/50'>
          <span className='text-sm font-medium'>Filters:</span>
          <div className='flex items-center justify-between gap-3 w-full px-2'>
            <div className='relative flex items-center gap-3 '>
              <label htmlFor='name-filter' className='block text-sm text-gray-700 dark:text-white'>
                name:
              </label>
              <input
                type='text'
                id='name-filter'
                placeholder='Binance'
                onChange={(e) => {setName(e.currentTarget.value); }}
                className='rounded border border-stroke py-2 px-5 bg-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
              />
            </div>
            {!isLoading && (
              <div className='max-w-60'>
                <span className='text-md mr-2 text-black dark:text-white'>page</span>
                <input
                  type='number'
                  value={page}
                  min={1}
                  max={data?.totalPages}
                  onChange={(e) => {
                    setPage(parseInt(e.currentTarget.value));
                  }}
                  className='rounded-md border-1 border-stroke bg-transparent  px-4 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary max-w-30'
                />
                <span className='text-md text-black dark:text-white'> / {data?.totalPages} </span>
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-9 border-t-4  border-stroke py-4 px-4 dark:border-strokedark md:px-6 '>
          <div className='col-start-1 flex items-center'>
            <p className='font-medium'>Code</p>
          </div>
          <div className='col-start-2 col-span-2 flex items-center'>
            <p className='font-medium'>Name</p>
          </div>
          <div className='col-start-4 col-span-2 flex items-center'>
            <p className='font-medium'>Description</p>
          </div>
          <div className='col-start-6 col-span-2 flex items-center'>
            <p className='font-medium'>Created</p>
          </div>
          <div className='col-start-8 flex items-center'>
            <Link to='/admin/broker/create'> 
              <table><tr><td>Add Broker</td><td><td> </td><CiCirclePlus /></td></tr></table>
            </Link>  
          </div>
        </div>
        {isLoading && (
          <div className='-mt-40'>
            <Loader />
          </div>
        )}
        {!!data?.brokers &&
          data?.brokers?.length > 0 &&
          data.brokers.map((broker) => (
            <div
              key={broker.id}
              className='grid grid-cols-9 gap-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 '>
                <div className='col-start-1 flex items-left'>
                  <p className='text-sm text-black dark:text-white'>{broker.code}</p>
                </div>
                <div className='col-start-2 col-span-2 flex items-left'>
                  <p className='text-sm text-black dark:text-white'>{broker.name}</p>
                </div>
                <div className='col-start-4 col-span-2 flex items-left'>
                  <p className='text-sm text-black dark:text-white'>{broker.description}</p>
                </div>
                <div className='col-start-6 col-span-2 flex items-left'>
                  <p className='text-sm text-black dark:text-white'>{broker.createdAt.toLocaleString()}</p>
                </div>
                <div className='col-start-8 col-span-2 flex items-left'>
                  <DropdownEditDelete />
                </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BrokersTable;
