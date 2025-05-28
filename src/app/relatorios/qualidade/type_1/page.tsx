"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ActionButton from "@/components/ActionButton";
import axios from "axios";
import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
}

interface Cliente {
  id: number;
  razao_social: string;
}

export default function QualityForm() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [produtoId, setProdutoId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [codigoRelatorio, setCodigoRelatorio] = useState("");
  const [dataAvaliacao, setDataAvaliacao] = useState("");
  const [criteriosSelecionados, setCriteriosSelecionados] = useState<
    { nome: string; status: string }[]
  >([]);

  const criterios = [
    {
      id: 1,
      nome: "Rebarba(s)",
    },
    {
      id: 2,
      nome: "Canto(s) vivo",
    },
    {
      id: 3,
      nome: "Risco(s)",
    },
    {
      id: 4,
      nome: "Solda(s)",
    },
    {
      id: 5,
      nome: "Fixação(ões)",
    },
    {
      id: 6,
      nome: "Resina",
    },
    {
      id: 7,
      nome: "Altura",
    },
    {
      id: 8,
      nome: "Largura",
    },
    {
      id: 9,
      nome: "Profundidade",
    },
    {
      id: 10,
      nome: "Outras dimensões",
    },
    {
      id: 11,
      nome: "Quantidade de Bastões",
    },
    {
      id: 12,
      nome: "Recravado",
    },
    {
      id: 13,
      nome: "Soldado",
    },
    {
      id: 14,
      nome: "Hermético",
    },
    {
      id: 15,
      nome: "Simples",
    },
    {
      id: 16,
      nome: "Dupla",
    },
    {
      id: 17,
      nome: "Outras",
    },
    {
      id: 18,
      nome: "Polido",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const [produtosRes, clientesRes] = await Promise.all([
        axios.get("http://localhost:3001/api/produtos"),
        axios.get("http://localhost:3001/api/clientes"),
      ]);

      setProdutos(produtosRes.data);
      setClientes(clientesRes.data);
    }

    fetchData();
  }, []);

  const handleCriterioChange = (criterioId: number, status: string) => {
    setCriteriosSelecionados((prev) => {
      const criterioOriginal = criterios.find((c) => c.id === criterioId);

      if (!criterioOriginal) {
        console.warn(`Critério com ID ${criterioId} não encontrado.`);
        return prev; // Retorna o estado anterior se o critério não for encontrado
      }

      const existingCriterioIndex = prev.findIndex(
        (item) => item.nome === criterioOriginal.nome
      );

      if (existingCriterioIndex !== -1) {
        // Se o critério já existe, atualize seu status
        const updatedCriterios = [...prev];
        updatedCriterios[existingCriterioIndex] = {
          ...updatedCriterios[existingCriterioIndex],
          status: status,
        };
        return updatedCriterios;
      } else {
        // Se o critério não existe, adicione-o
        return [...prev, { nome: criterioOriginal.nome, status: status }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/avaliacoes",
        {
          produtoId,
          clienteId,
          numeroSerie,
          codigoRelatorio,
          dataAvaliacao,
          criterios: criteriosSelecionados,
        }
      );

      console.log(response.data);
      alert("Avaliação cadastrada com sucesso!");

      // Resetar formulário
      setProdutoId("");
      setClienteId("");
      setNumeroSerie("");
      setCodigoRelatorio("");
      setDataAvaliacao("");
      setCriteriosSelecionados([]);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar avaliação.");
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="w-[800px] py-6 justify-items-end">
        <CardHeader>
          <div className="flex flex-row flex-wrap justify-between">
            <div className="flex flex-col justify-between py-8">
              <Image
                width={240}
                height={63}
                src="/images/logo.png"
                alt="Enterprise logo"
              />
              <div className="flex flex-col text-sm font-bold text-black">
                <h2>MAGTEK INDÚSTRIA DE PRODUTOS MAGNÉTICOS LTDA - EPP</h2>
                <h2>CNPJ: 07.938.924/0001-82 I.E: 636.296.759.115</h2>
              </div>
            </div>
            <div className="flex flex-row flex-wrap justify-between items-center py-8 text-sm ">
              <Image
                width={240}
                height={63}
                src="/images/isoLogo2.png"
                alt="ISO logo"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CardHeader className="bg-blue-600 text-white rounded-t-lg py-4">
            <CardTitle className="text-xl">
              F32 - Relatório Qualidade Produto
            </CardTitle>
            <CardDescription className="text-lg text-white">
              Relatório de inspeção de Qualidade.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-hidden py-6 px-6">
              <Input
                className="shadow-xs shadow-blue-500"
                placeholder="Código do Relatório"
                value={codigoRelatorio}
                onChange={(e) => setCodigoRelatorio(e.target.value)}
              />

              <Input
                className="shadow-xs shadow-blue-500"
                placeholder="Número de Série"
                value={numeroSerie}
                onChange={(e) => setNumeroSerie(e.target.value)}
              />

              <div className="flex flex-col space-y-1.5">
                <Select onValueChange={(val) => setClienteId(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Razão Social" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={String(cliente.id)}>
                        {cliente.razao_social}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Avaliação
                </label>
                <Input
                  type="date"
                  value={dataAvaliacao}
                  onChange={(e) => setDataAvaliacao(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Select onValueChange={(val) => setProdutoId(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma família de equipamento" />
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
            </div>

            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden mt-6">
              <thead>
                <tr className="text-gray-700 bg-blue-600 text-white">
                  <th className="p-3">Critérios</th>
                  <th className="p-3">Aprovado</th>
                  <th className="p-3">Reprovado</th>
                  <th className="p-3">Não Aplicável</th>
                </tr>
              </thead>
              <tbody>
                {criterios.map(
                  (
                    criterio 
                  ) => (
                    <tr key={criterio.id}>
                      <td className="p-3 bg-blue-500 text-white font-medium">
                        {criterio.nome} 
                      </td>
                      {["aprovado", "reprovado", "nao_aplicavel"].map(
                        (statusOption) => (
                          <td className="p-3 text-center" key={statusOption}>
                            <input
                              type="radio"
                              name={`criterio-${criterio.id}`} 
                              value={statusOption}
                              className="w-4 h-4"
                              onChange={() =>
                                handleCriterioChange(criterio.id, statusOption)
                              } 
                              checked={criteriosSelecionados.some(
                                (cs) =>
                                  cs.nome === criterio.nome &&
                                  cs.status === statusOption
                              )}
                            />
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="mt-6">
              <ActionButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
