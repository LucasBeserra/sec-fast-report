export default function QualityCheckTable() {
    const activities = [
      "criterio 1",
      "criterio 2",
      "criterio 3",
      "criterio 4",
      "criterio 5",
      "criterio 6",
    ];
  
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Quality Check Table</h2>
        <table className="w-full border-collapse border border-gray-300 rounded-lg bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border border-gray-300"></th>
              <th className="p-3 border border-gray-300">Aprovado</th>
              <th className="p-3 border border-gray-300">Reprovado</th>
              <th className="p-3 border border-gray-300">Não Aplicável</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((criterio, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="p-3 bg-gray-100 font-medium border border-gray-300">
                  {criterio}
                </td>
                <td className="p-3 text-center border border-gray-300">
                  <input type="radio" name={`criterio-${index}`} className="w-4 h-4" />
                </td>
                <td className="p-3 text-center border border-gray-300">
                  <input type="radio" name={`criterio-${index}`} className="w-4 h-4" />
                </td>
                <td className="p-3 text-center border border-gray-300">
                  <input type="radio" name={`criterio-${index}`} className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}