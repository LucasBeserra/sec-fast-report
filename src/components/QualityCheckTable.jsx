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
      <div className="">
        <table className="w-full border border-white border-collapse ">
          <thead>
            <tr className="text-gray-700 text-wrap bg-orange-200 ">
              <th className="p-3 border border-white bg-white"></th>
              <th className="p-3 rounded-tl-3xl">Aprovado</th>
              <th className="p-3 ">Reprovado</th>
              <th className="p-3 rounded-tr-3xl">Não Aplicável</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((criterio, index) => (
              <tr key={index} >
                <td className="p-3 bg-orange-200 font-medium">
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