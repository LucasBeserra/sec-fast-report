import { CloudUpload } from "lucide-react";

export default function ActionButton() {

    return(
      <div className="mt-6 w-full mx-auto flex justify-between">
        <button
          type="submit"
          label="Enviar Avaliação"
          className="flex-1 bg-blue-600 py-3 px-4 rounded-md text-white font-medium flex items-center justify-center"
        >
          <CloudUpload className="h-5 w-5 mr-2" />
          Gerar Relatório
        </button>
      </div>
    )
}