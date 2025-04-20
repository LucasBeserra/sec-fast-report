'use client';

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ClientesPage() {
  const [nome, setNome] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/clientes", {
        nome,
      });
      alert("Cliente cadastrado com sucesso!");
      setNome(""); // Limpa o campo
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar cliente.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <a href="/relatorios" className="hover:underline">Relatórios</a>
          <a href="/produtos" className="hover:underline">Produtos</a>
          <a href="/clientes" className="hover:underline">Clientes</a>
          <a href="/criterios" className="hover:underline">Critérios</a>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Cliente</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="nome">
              Nome da Empresa (Razão Social)
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Magtek Indústria"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition">
            Cadastrar Cliente
          </button>
        </form>
      </main>
    </div>
  );
}

