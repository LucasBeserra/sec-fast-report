export default function QualityCheckTable() {
    const activities = [
      "Rebarbas e cantos vivos",
      "Qualidade da solda",
      "Trava rosca",
      "Alinhamento",
      "Polimento",
      "Jateamento",
      "Altura",
    ];

    return (
      <div className="py-6">
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
            {activities.map((criterio, index) => (
              <tr key={index} >
                <td className="p-3 bg-blue-500 text-white font-medium">
                  {criterio}
                </td>
                <td className="p-3 text-center">
                  <input type="radio" name={`criterio-${index}`} className="w-4 h-4" />
                </td>
                <td className="p-3 text-center">
                  <input type="radio" name={`criterio-${index}`} className="w-4 h-4" />
                </td>
                <td className="p-3 text-center">
                  <input type="radio" name={`criterio-${index}`} className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}