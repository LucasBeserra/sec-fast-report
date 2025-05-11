"use client";

import { useState, useEffect } from "react";
import axios from "axios";

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
    } catch (error) {
      console.error("Erro na requisção de produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/produtos", { nome }); // Envia o nome do produto
      alert("Produto cadastrado com sucesso!");
      setNome(""); // Limpa o campo
      fetchProdutos(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/produtos/${id}`);
      alert("Produto excluido com sucesso!");
      fetchProdutos(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir produto.");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`http://localhost:3001/api/produtos/${id}`);
      alert("Produto atualizado com sucesso!");
      fetchProdutos(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

      {/* Conteúdo */}
      <main className="flex-1 w-lg p-10 bg-gray-100 ">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl mb-10 "
        >
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Cadastrar Produto
          </h1>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="nome"
            >
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
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Produtos Cadastrados
          </h2>

          {produtos.length === 0 ? (
            <p className="text-gray-600">Nenhum produto cadastrado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {produtos.map((produto) => (
                <li
                  key={produto.id}
                  className="grid grid-cols-3 items-center gap-2 w-full p-4 border border-gray-200 rounded hover:shadow transition"
                >
                  <span className="text-gray-700 font-medium">
                    {produto.nome}
                  </span>

                  <button 
                    onClick={() => handleDelete(produto.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
                    Deletar
                  </button>

                  <button 
                    onClick={() => handleUpdate(produto.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
