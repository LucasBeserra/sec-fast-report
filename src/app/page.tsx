'use client';

import Link from 'next/link';

export default function Home() {
    const links = [
      { href: '/relatorios', label: 'Relatórios' },
      { href: '/produtos', label: 'Cadastro de Produto' },
      { href: '/clientes', label: 'Cadastro de Cliente' },
    ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col py-8 px-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-10 text-center">Menu</h2>

            <nav className="flex flex-col space-y-4">
                {links.map((link) => (
                    <Link key={link.href} href={link.href} className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
                        {link.label}
                    </Link>
                ))}
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
