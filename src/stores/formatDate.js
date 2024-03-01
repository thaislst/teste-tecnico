
export default function formatDate(date) {
  // Mapeia os nomes dos meses
  const meses = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  
  // Obtém as partes da data
  const hora = date.getHours();
  const dia = date.getDate();
  const mes = meses[date.getMonth()];

  // Retorna a data formatada
  return `${dia} ${mes} ${hora}h `;
}