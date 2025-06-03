// ===============================
// LogisTech - alerts.js (Novo)
// ===============================

const EONET_API = "https://eonet.gsfc.nasa.gov/api/v3/events";
const USGS_API =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function buscarAlertas(lat, lon, distanciaA) {
  alertasContainer.innerHTML = "";

  Promise.all([
    fetch(EONET_API).then((res) => res.json()),
    fetch(USGS_API).then((res) => res.json()),
  ])
    .then(([eonetData, usgsData]) => {
      let alertasAtivos = [];

      // Eventos NASA EONET
      eonetData.events.forEach((evento) => {
        const categoria = evento.categories[0].title;
        const titulo = evento.title;
        const [evLon, evLat] = evento.geometry[0].coordinates;
        const dist = calcularDistancia(lat, lon, evLat, evLon).toFixed(2);

        if (dist <= 100) {
          alertasAtivos.push({
            tipo: categoria,
            mensagem: `${categoria} registrado a ${dist} km da cidade.`,
            nivel: categoria.match(/Fire|Volcano|Storm/i)
              ? "vermelho"
              : "amarelo",
          });
        }
      });

      // Terremotos USGS
      usgsData.features.forEach((eq) => {
        const coords = eq.geometry.coordinates;
        const mag = eq.properties.mag;
        const lugar = eq.properties.place;
        const dist = calcularDistancia(lat, lon, coords[1], coords[0]).toFixed(
          2
        );

        if (mag >= 4.5 && dist <= 100) {
          alertasAtivos.push({
            tipo: "Terremoto",
            mensagem: `Terremoto de magnitude ${mag} em ${lugar} (${dist} km).`,
            nivel: mag >= 6 ? "vermelho" : "amarelo",
          });
        }
      });

      if (alertasAtivos.length === 0) {
        alertasContainer.innerHTML = `<div class="alert alert-success text-center">✅ Nenhum alerta ativo no momento.</div>`;
        atualizarStatusOperacional("verde");
      } else {
        alertasAtivos.forEach((alerta) => {
          const alertaDiv = document.createElement("div");
          alertaDiv.className = `alert alert-${
            alerta.nivel === "vermelho" ? "danger" : "warning"
          }`;
          alertaDiv.textContent = alerta.mensagem;
          alertasContainer.appendChild(alertaDiv);
        });

        const nivelFinal = alertasAtivos.some((a) => a.nivel === "vermelho")
          ? "vermelho"
          : "amarelo";
        atualizarStatusOperacional(nivelFinal, "⚠️ Alertas ativos na região.");
      }
    })
    .catch(() => {
      alertasContainer.innerHTML = `<div class="alert alert-danger">Erro ao obter alertas.</div>`;
    });
}
