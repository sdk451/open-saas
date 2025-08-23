import { type AuthUser } from 'wasp/auth';
import Breadcrumb from '../../layout/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useRedirectHomeUnlessUserIsAdmin } from '../../useRedirectHomeUnlessUserIsAdmin';
import { useAction } from 'wasp/client/operations';
import { updateCalendlyLink } from 'wasp/client/operations';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CalendarPage = ({ user }: { user: AuthUser }) => {
  useRedirectHomeUnlessUserIsAdmin({ user });
  const [calendlyLink, setCalendlyLink] = useState(user?.calendlyLink || '');
  const updateCalendlyLinkAction = useAction(updateCalendlyLink);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCalendlyLinkAction({ calendlyLink });
      toast.success('Calendly link updated successfully');
    } catch (error) {
      toast.error('Error updating Calendly link');
    }
  };

  return (
    <DefaultLayout user={user}>
      <Breadcrumb pageName='Calendar' />
      <div className='w-full max-w-full rounded-sm border border-border bg-card shadow-default'>
        <div className='p-6.5'>
          <h4 className='mb-6 text-xl font-semibold text-foreground'>
            Calendly Integration
          </h4>
          <form onSubmit={handleSubmit}>
            <div className='mb-4.5'>
              <label className='mb-2.5 block text-foreground'>
                Calendly Link
              </label>
              <input
                type='text'
                value={calendlyLink}
                onChange={(e) => setCalendlyLink(e.target.value)}
                placeholder='Enter your Calendly link'
                className='w-full rounded border-[1.5px] border-border bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary'
              />
            </div>
            <button
              type='submit'
              className='flex w-full justify-center rounded bg-primary p-3 font-medium text-gray'
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
