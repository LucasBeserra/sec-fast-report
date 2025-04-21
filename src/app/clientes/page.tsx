"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Cliente {
  id: number;
  razao_social: string;
  createdAt: string;
}

export default function ClientesPage() {
  const [razaoSocial, setRazaoSocial] = useState(""); // State para requisição post
  const [clientes, setClientes] = useState<Cliente[]>([]); // State para requisição get
  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro na requisção de clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/clientes", { razao_social: razaoSocial }); // Envia a razão social do cliente
      alert("Cliente cadastrado com sucesso!");
      setRazaoSocial(""); // Limpa o campo
      await fetchClientes(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar cliente.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      {/* Conteúdo */}
      <main className="flex-1 w-lg p-10 bg-gray-100">


        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Cadastrar Cliente
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="razaoSocial"
            >
              Nome da Empresa (Razão Social)
            </label>
            <input
              type="text"
              id="razaoSocial"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              placeholder="Ex: Magtek Indústria"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
          >
            Cadastrar Cliente
          </button>
        </form>

        {/* Lista de Produtos */}
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Clientes Cadastrados
          </h2>

          {clientes.length === 0 ? (
            <p className="text-gray-600">Nenhum cliente cadastrado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {clientes.map((cliente) => (
                <li
                  key={cliente.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded hover:shadow transition"
                >
                  <span className="text-gray-700 font-medium">
                    {cliente.razao_social}
                  </span>

                  {/* Aqui pode adicionar futuramente botões de Editar ou Deletar */}

                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
                    Deletar
                  </button>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
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
