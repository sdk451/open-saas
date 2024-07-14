import { type Broker } from 'wasp/entities';
import { useState } from 'react';

const SwitcherBroker = ({ broker, updateBrokerById }: { broker?: Partial<Broker>; updateBrokerById?: any }) => {
  const [name, setName] = useState<string | undefined>(undefined);

  return (
    <div className='relative'>
      <label htmlFor={`toggle1-${broker?.id}`} className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='input'
            id={`name`}
            onChange={(e) => {
              setName(e.currentTarget.value);
              updateBrokerById && updateBrokerById({ id: broker?.id, data: { name: broker?.name } });
            }}
          />
        </div>
      </label>
    </div>
  );
};

export default SwitcherBroker;
