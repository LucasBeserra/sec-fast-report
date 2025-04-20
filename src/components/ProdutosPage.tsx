'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Produto {
  id: number;
  nome: string;
  createdAt: string;
}

export default function ProdutosPage() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/produtos");
      setProdutos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro na requisção de produtos:", error);
    }
  };

  useEffect(() => {fetchProdutos();}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/produtos", { nome });
      alert("Produto cadastrado com sucesso!");
      setNome(""); // Limpa o campo
      fetchProdutos(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col py-8 px-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-10 text-center">Menu</h2>

        <nav className="flex flex-col space-y-4">
          <Link href="/relatorios" className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
            Relatórios
          </Link>
          <Link href="/produtos" className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
            Cadastro de Produto
          </Link>
          <Link href="/clientes" className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
            Cadastro de Cliente
          </Link>
          <Link href="/criterios" className="hover:bg-blue-500 py-2 px-4 rounded-lg transition">
            Cadastro de Critério
          </Link>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Produto</h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mb-10">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="nome">
              Nome do Produto
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Placa Magnética"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
          >
            Cadastrar Produto
          </button>
        </form>

        {/* Lista de Produtos */}
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Produtos Cadastrados</h2>

          {produtos.length === 0 ? (
            <p className="text-gray-600">Nenhum produto cadastrado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {produtos.map((produto) => (
                <li
                  key={produto.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded hover:shadow transition"
                >
                  <span className="text-gray-700 font-medium">{produto.id}</span>
                  <span className="text-gray-700 font-medium">{produto.nome}</span>
                  <span className="text-gray-700 font-medium">{produto.createdAt}</span>
                  {/* Aqui pode adicionar futuramente botões de Editar ou Deletar */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
