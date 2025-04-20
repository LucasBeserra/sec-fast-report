"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CadastroCriterios() {
  const [nome, setNome] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Por favor, preencha o nome do critério.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/criterios", {
        nome,
      });
      alert("Critério cadastrado com sucesso!");
      setNome(""); // Limpar o campo
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar critério.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Critério</h1>

        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Critério
          </label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do critério"
          />
        </div>

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}

