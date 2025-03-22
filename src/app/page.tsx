import ActionButtons from '@/components/ActionButton';
import QualityCheckTable from '@/app/qualityreport/QualityCheckTable';
import MainHeader from '../components/MainHeader';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'FastReport App',
  description: 'Aplicação para gerar relatórios de qualidade',
}
 
export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100 rounded-lg flex flex-col justify-content-center'>
      <MainHeader />
      <QualityCheckTable />
      <ActionButtons />
    </div>
  );
}
