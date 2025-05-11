export interface Company {
    id?: string;
    name: string;
    cnpj: string;
  }
  
  export interface Measurement {
    id: string;
    description: string;
    value: number;
    unit: string;
  }