export interface Company {
    id?: string;
    name: string;
    cnpj: string;
    image1_url: string;
    image2_url: string;
    measurements: Measurement[];
  }
  
  export interface Measurement {
    id: string;
    description: string;
    value: number;
    unit: string;
  }