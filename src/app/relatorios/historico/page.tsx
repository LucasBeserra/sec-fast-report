"use client";
import Link from "next/link";

export default function RelatoriosPage() {
  const links = [
    { href: '/relatorios/qualidade', label: 'Relatório Qualidade' },
    { href: '/clientes', label: 'Histórico Relatórios' },
  ];

  return (
    <div className="flex min-h-screen">
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

      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
        <p className="text-gray-600 mt-2">
          Área onde será possível visualizar o histórico de relatórios gerados.
        </p>
      </main>

    </div>
  );
}
