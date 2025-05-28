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

  const criterios = [
      "Rebarba(s)",
      "Canto(s) vivo",
      "Risco(s)",
      "Solda(s)",
      "Fixação(ões)",
      "Resina",
      "Altura",
      "Largura",
      "Profundidade",
      "Outras dimensões",
      "Quantidade de Bastões",
      "Recravado",
      "Soldado",
      "Hermético",
      "Simples",
      "Dupla",
      "Outras",
      "Polido",
      "Jateado",
      "Escovado",
      "Eletropolimento",
      "Pintura",
      "Zincado",
      "Teste de Líquido Penetrante",
      "Teste Hidrostático",
      "Teste de carga",
      "Corrente",
      "Corrente eletrônica",
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
                alt="Enterprise logo"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CardHeader className="bg-blue-500px-8 py-4 bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-xl ">
              F32 - Relatório Qualidade Produto
            </CardTitle>
            <CardDescription className="text-lg text-white">
              Relatório de inspeção de Qualidade.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-hidden py-6 px-6 ">
              <div className="flex flex-col space-y-1.5 border-0 ">
                <Input
                  className="shadow-xs shadow-blue-500"
                  id="name"
                  placeholder="Código do Relatório"
                  value={codigoRelatorio}
                  onChange={(e) => setCodigoRelatorio(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5 border-0 ">
                <Input
                  className="shadow-xs shadow-blue-500"
                  id="name"
                  placeholder="Número de Série"
                  value={numeroSerie}
                  onChange={(e) => setNumeroSerie(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Select>
                  <SelectTrigger id="cliente">
                    <SelectValue placeholder="Razão Social" />
                  </SelectTrigger>

                  <SelectContent position="popper" className="w-[600px]">
                    {clientes.map((cliente) => (
                      <SelectItem
                        key={cliente.id}
                        value={String(cliente.razao_social)}
                      >
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
                <Select>
                  <SelectTrigger id="equipamento">
                    <SelectValue placeholder="Selecione uma familia de equipamento" />
                  </SelectTrigger>

                  <SelectContent position="popper" className="w-[600px]">
                    {produtos.map((produto) => (
                      <SelectItem key={produto.id} value={String(produto.nome)}>
                        {produto.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden ">
              <thead>
                <tr className="text-gray-700 text-wrap bg-blue-600 text-white ">
                  <th className="p-3">Critérios</th>
                  <th className="p-3">Aprovado</th>
                  <th className="p-3">Reprovado</th>
                  <th className="p-3">Não Aplicável</th>
                </tr>
              </thead>
              <tbody>
                {criterios.map((criterio, index) => (
                  <tr key={index} >
                    <td className="p-3 bg-blue-500 text-white font-medium">
                      {criterio}
                    </td>
                    <td className="p-3 text-center">
                      <input type="radio" name={`criterio-${index}`} value={"aprovado"} className="w-4 h-4" />
                    </td>
                    <td className="p-3 text-center">
                      <input type="radio" name={`criterio-${index}`} value={"reprovado"} className="w-4 h-4" />
                    </td>
                    <td className="p-3 text-center">
                      <input type="radio" name={`criterio-${index}`} value={"nao_aplicavel"} className="w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>

          <ActionButton />
        </CardContent>
      </Card>
    </div>
  );
}
