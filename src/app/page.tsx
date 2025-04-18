'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col py-8 px-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-10 text-center">Menu</h2>

        <nav className="flex flex-col space-y-4">
          <Link href="/relatorios" target='_blank' className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
            Relatórios
          </Link>
          <Link href="/produtos" target='_blank' className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
            Cadastro de Produto
          </Link>
          <Link href="/clientes" target='_blank' className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
            Cadastro de Cliente
          </Link>
          <Link href="/criterios" target='_blank' className="hover:bg-bluSe-500 py-2 px-4 rounded-lg transition">
            Cadastro de Critério
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Sistema de Relatórios</h1>
        <p className="text-gray-600 text-lg">
          Utilize o menu lateral para navegar entre as funcionalidades.
        </p>
      </main>

    </div>
  );
}
