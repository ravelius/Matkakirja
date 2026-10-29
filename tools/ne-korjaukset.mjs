// NATURAL EARTHIN ADMIN-1-NIMIVIRHEET (Karttaseppä 28.10.2026, PT: Kroatian Požega-Slavonian lääni puuttui kartan
// alueista). Maakuntavektorit ryhmittelevät alueet NE:n `name`-kentän mukaan (tools/tee-maakuntavektorit.mjs), ja
// kahdella alueella NE:n `name` on naapurin nimi, joten alue sulautui naapuriinsa (kaksi rengasta, kaksinkertainen ala):
//   - Požega-Slavonia (HRV-1604, Q58111): name "Brodsko-Posavska", iso HR-12 → Brod-Posavinan läänin osaksi
//   - Rasinan piirikunta (RS-19, Q1043446): name "Pomoravski" → Pomoravljen piirikunnan osaksi
// Korjaus tunnistaa piirteen wikidata-tunnuksesta (ei nimestä), joten se ei koske muita alueita, ja jos NE korjaa
// virheen, korjaus on tyhjä.

/** wikidataid → oikeat kentät (NE:n kirjoitusasu: kroatialaiset läänit ilman lisämerkkejä kuten naapureissa). */
export const NE_ADMIN1_KORJAUKSET = {
  Q58111: { name: 'Požeško-Slavonska', iso_3166_2: 'HR-11', gn_name: 'Požeško-Slavonska Zupanija', woe_name: 'Požeško-Slavonska',
    name_alt: 'Požega-Slavonia' },
  Q1043446: { name: 'Rasinski', name_alt: 'Rasina' },
};

/** Korjaa NE:n admin-1-aineiston nimivirheet paikallaan; palauttaa korjattujen piirteiden määrän. */
export function korjaaNeAdmin1(ne) {
  let n = 0;
  for (const f of ne.features) {
    const k = NE_ADMIN1_KORJAUKSET[f.properties.wikidataid];
    if (!k || f.properties.name === k.name) continue;
    Object.assign(f.properties, k);
    n += 1;
  }
  return n;
}
