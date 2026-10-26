/**
 * MALLIN RIVIMUODON SIETO (6.10.2026, omistaja TF 149: "Pekingin tai Tokion kohdalla opas ei osannut esitellä mitään"):
 * Sonnet jätti joskus pois etuliitteen ("KOHDE:" / "PAIKKA:") ja kirjoitti pelkät putkikentät, jolloin jäsennin löysi
 * 0 riviä ja reitti palautti 502:n (toistettu Nairobilla). Hyväksytään rivi etuliitteellä tai ilman, kun putkella
 * erotettuja kenttiä on vähintään `vahintaan`; listamerkit ja lihavoinnit siivotaan.
 */
export function kenttarivit(teksti, etuliite, vahintaan) {
  const tulos = [];
  const otsake = new RegExp(`^${etuliite}\\s*:\\s*(.*)$`, 'i');
  for (const raaka of String(teksti ?? '').split('\n')) {
    const rivi = raaka.replace(/\*\*/g, '').replace(/^\s*(?:[-*•]|\d+[.)])\s+/, '').trim();
    const m = otsake.exec(rivi);
    if (m) { if (m[1].trim()) tulos.push(m[1].trim()); continue; }
    if (rivi.split('|').length >= vahintaan) tulos.push(rivi);
  }
  return tulos;
}
