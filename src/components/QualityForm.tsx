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
import DatePicker from "./DatePicker";
import Image from "next/image";
import QualityCheckTable from "@/components/QualityCheckTable";
import ActionButton from "./ActionButton";
import HidrostaticReport from "./HidrostaticReport";

export function QualityForm() {
  return (
    <Card className="w-[800px] py-6 ">
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
              <h2 >MAGTEK INDÚSTRIA DE PRODUTOS MAGNÉTICOS LTDA - EPP</h2>
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
          <CardTitle className="text-xl ">F32 - Relatório Qualidade Produto</CardTitle>
          <CardDescription className="text-lg text-white">Relatório de inspeção de Qualidade.</CardDescription>
        </CardHeader>


        <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-hidden py-6 px-6 ">
          <div className="flex flex-col space-y-1.5 border-0 ">
            <Input
              className="shadow-xs shadow-blue-500"
              id="name"
              placeholder="Código do Relatório"
            />
          </div>

          <div className="flex flex-col space-y-1.5 border-0 ">
            <Input
              className="shadow-xs shadow-blue-500"
              id="name"
              placeholder="Número de Série"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Input
              className="shadow-xs shadow-blue-500"
              id="client"
              placeholder="Razão Social"
            />
          </div>
        
          <DatePicker />

          <div className="flex flex-col space-y-1.5">
            <Select>
              <SelectTrigger id="equipamento">
                <SelectValue placeholder="Selecione uma familia de equipamento" />
              </SelectTrigger>

              <SelectContent position="popper" className="w-[600px]">
                <SelectItem value="Placa magnetica">
                  Placa Magnética 
                </SelectItem>
                <SelectItem value="Bastao magnetico">
                  Bastão Magnético
                </SelectItem>
                <SelectItem value="Filtro magnetico">
                  Filtro Magnético
                </SelectItem>
                <SelectItem value="Polia magnetica">
                  Polia Magnética
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <QualityCheckTable />

        <HidrostaticReport />

        <ActionButton />


      </CardContent>

    </Card>
  );
}
