'use client';

import Link from 'next/link';
import { User, FileInput, FileClock, ReceiptText } from 'lucide-react';
import Image from 'next/image';

export default function Home() {

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white text-white flex flex-col py-8 px-4 shadow-lg">
          <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
        
          <h2 className="text-2xl font-bold mb-10 text-center">Menu</h2>

          <nav className="flex flex-col space-y-4">

            <Link href="/produtos/cadastro" className="flex flex-row text-black hover:bg-blue-500 border bor py-2 px-4 rounded-lg transition">
              <FileInput />
              <span className="ml-2">Cadastro Produtos</span>
            </Link>

            <Link href="/clientes/cadastro" className="flex flex-row text-black hover:bg-blue-500 border py-2 px-4 rounded-lg transition">
              <User />
              <span className="ml-2">Cadastro Clientes</span>
            </Link>

            <Link href="/relatorios/historico" className="flex flex-row text-black hover:bg-blue-500 border py-2 px-4 rounded-lg transition">
              <FileClock />
              <span className="ml-2">Histórico Relatórios</span>
            </Link>

            <Link href="/relatorios/qualidade/type_1" className="flex flex-row text-black hover:bg-blue-500 border py-2 px-4 rounded-lg transition">
              <ReceiptText />
              <span className="ml-2">Relatório Qualidade</span>
            </Link>

          </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Sistema de Relatórios</h1>
        <h2 className="text-gray-600 text-2xl">Nessa tela será exibido o Histórico de Relatórios</h2>
      </main>

    </div>
  );
}
