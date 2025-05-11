"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Produto {
  id: number;
  nome: string;
}

interface Cliente {
  id: number;
  nome: string;
}

interface Criterio {
  id: number;
  nome: string;
}

export default function CadastroAvaliacao() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [criterios, setCriterios] = useState<Criterio[]>([]);

  const [produtoId, setProdutoId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [codigoRelatorio, setCodigoRelatorio] = useState("");
  const [dataAvaliacao, setDataAvaliacao] = useState("");
  const [avaliacaoCriterios, setAvaliacaoCriterios] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    async function fetchData() {
      const [produtosRes, clientesRes, criteriosRes] = await Promise.all([
        axios.get("http://localhost:3001/api/produtos"),
        axios.get("http://localhost:3001/api/clientes"),
        axios.get("http://localhost:3001/api/criterios"),
      ]);

      setProdutos(produtosRes.data);
      setClientes(clientesRes.data);
      setCriterios(criteriosRes.data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/avaliacoes", {
        produtoId,
        clienteId,
        numeroSerie,
        codigoRelatorio,
        dataAvaliacao,
        criterios: Object.entries(avaliacaoCriterios).map(([criterioId, status]) => ({
          criterioId: Number(criterioId),
          status,
        })),
      });

      console.log(response.data);
      alert("Avaliação cadastrada com sucesso!");
      
      // Resetar formulário
      setProdutoId("");
      setClienteId("");
      setNumeroSerie("");
      setCodigoRelatorio("");
      setDataAvaliacao("");
      setAvaliacaoCriterios({});
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar avaliação.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Avaliação</h1>

        {/* Cabeçalho do formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
            <Select value={produtoId} onValueChange={setProdutoId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {produtos.map((produto) => (
                  <SelectItem key={produto.id} value={String(produto.id)}>
                    {produto.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <Select value={clienteId} onValueChange={setClienteId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={String(cliente.id)}>
                    {cliente.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Série</label>
            <Input
              value={numeroSerie}
              onChange={(e) => setNumeroSerie(e.target.value)}
              placeholder="Digite o número de série"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código do Relatório</label>
            <Input
              value={codigoRelatorio}
              onChange={(e) => setCodigoRelatorio(e.target.value)}
              placeholder="Digite o código do relatório"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Avaliação</label>
            <Input
              type="date"
              value={dataAvaliacao}
              onChange={(e) => setDataAvaliacao(e.target.value)}
            />
          </div>
        </div>
        
        {/* Critérios de Avaliação */}
        <h2 className="text-lg font-semibold mt-8 mb-4">Critérios de Avaliação</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criterios.map((criterio) => (
            <div key={criterio.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{criterio.nome}</label>
              <Select
                value={avaliacaoCriterios[criterio.id] || ""}
                onValueChange={(value) =>
                  setAvaliacaoCriterios((prev) => ({ ...prev, [criterio.id]: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="reprovado">Reprovado</SelectItem>
                  <SelectItem value="nao_aplicavel">Não Aplicável</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full mt-8">
          Cadastrar Avaliação
        </Button>
      </form>
    </div>
  );
}
