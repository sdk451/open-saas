import Breadcrumb from '../components/Breadcrumb';
import BrokersTable from '../components/BrokersTable';
import DefaultLayout from '../layout/DefaultLayout';

const Brokers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Brokers" />
      <div className="flex flex-col gap-10">
        <BrokersTable />
      </div>
    </DefaultLayout>
  );
};

export default Brokers;
