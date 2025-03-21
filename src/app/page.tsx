import ActionButtons from '@/app/components/ActionButton';
import MainHeader from '@/app/components/Mainheader';
import QualityCheckTable from '@/app/qualityreport/QualityCheckTable';


export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100 rounded-lg flex flex-col justify-content-center'>
      <MainHeader />
      <QualityCheckTable />
      <ActionButtons />
    </div>
  );
}


