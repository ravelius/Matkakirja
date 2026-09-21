/*
 * NOSTOINVENTAARIO EUROOPASTA — Fablen tilaus 20.9.2026 (omistaja ottaa
 * nostot takaisin työlistalle: visatarkistus n. joka kolmannessa,
 * havainnekuvia lisää Codexilta). EI SISÄLTÖMUUTOKSIA — pelkkä laskenta.
 *
 * KORJATTU 20.9.2026 ILTA: Pelikoodarin koodista laskema FRA-visaluku
 * (16/64 = 25 %) ei täsmännyt tämän työkalun ensimmäisen version
 * lukuun (51 %). Täsmäytys paljasti KAKSI virhettä täällä, ei
 * eroa määritelmässä:
 *
 *   1. VÄÄRÄ VISA-KENTTÄ. "Visa" EI ole `kysymykset`-taulukko (se on
 *      pöllö-chatin ehdotettuja kysymyksiä, ei pistemäinen tietovisa).
 *      Oikea, pelin lukema kenttä on `nosto.visa` TÄSMÄLLEEN samassa
 *      muodossa kuin lehden tehtävä (js/fokusnosto.js `nostonVisa`):
 *      `{ kysymys, vaihtoehdot: [...], oikea, fakta?, otsake?, vihje? }`,
 *      kelvollinen kun kysymys on ei-tyhjä merkkijono, vaihtoehtoja on
 *      vähintään 2 ja oikea on kelvollinen indeksi. Sama tarkistus on
 *      kopioitu tähän suoraan `nostonVisa`-funktiosta.
 *   2. KAKSINKERTAINEN LASKENTA. `maalehtinostot-<iso>.js` vie sekä
 *      käsitellyn taulun (`MAALEHTINOSTOT_FRA = JAKO.map(...)`) että
 *      raakadatan (`MAALEHTIJAKO_FRA = JAKO`) — syvyyshaku kaikkien
 *      export-arvojen läpi laski siis saman noston kahdesti (36/12
 *      eikä 18/6). Korjattu: skannataan VAIN kunkin tiedoston
 *      kanoninen vienti (nimi johdettu tiedostonimestä,
 *      `maastokohteet-fra.js` -> `MAASTOKOHTEET_FRA`), ei kaikkia
 *      exportteja.
 *
 * Täsmäytyksen jälkeen tämä työkalu antaa FRA:lle täsmälleen
 * Pelikoodarin luvut (17/0 maastokohteet, 27/10 hahmotelma, 18/6
 * maalehtinostot, 2/0 fokuskohteet = 64 nostoa, 16 visaa, 25 %).
 *
 * LÄHDE (kartalla näkyvä nostojoukko, sama kuin Pelikoodarin koodi):
 * kunkin maan ISO-päätteiset paketit maastokohteet-<iso>.js,
 * hahmotelma-<iso>.js, maalehtinostot-<iso>.js, fokuskohteet-<iso>.js
 * — VAIN kanoninen export per tiedosto. `nakyvat-kaupungit-<iso>.js`
 * (kaupunkikortit, oma korttityyppi) ja jaettu `elaintakyt.js` (oma
 * "perhe", ei nosto) EIVÄT kuulu tähän joukkoon — pudotettu tässä
 * korjauksessa, koska Pelikoodarin ryhmittely ei sisältänyt niitä.
 * EI SISÄLLÄ myöskään täky-, syvennys-, skandaali- ja historian
 * hetki -kerroksia (js/fokusnosto.js ja sisarpaketit) — dynaamisesti
 * koottuja lisäkerroksia, ei maakohtaisia sisältöyksiköitä.
 *
 * TYYPPILUOKAT (Fablen pyytämät): vuori, saari, järvi, joki, meri,
 * historia, kulttuuri, ruoka, kauppa, tekniikka, merenkulku, muut.
 * Lähdekentät `tyyppi`/`kategoria`/`symLaji`/`laji` normalisoidaan
 * näihin; tunnistamaton arvo -> muut.
 *
 * HAVAINNEKUVA (generoitu-lippu): EI ole yhtenäistä boolean-kenttää
 * missään paketissa (tarkistettu: "generoitu" esiintyy vain
 * kommenteissa, ei datakentissä). Tunnistus on siis PÄÄTELTY:
 * `lahde`-kentän (kuva.lahde tai ylätason lahde) TÄSMÄLLINEN ALKU
 * "Tekoälyllä tuotettu havainnekuva." on ainoa luotettava merkki —
 * `/karttanostot/`-R2-polku EI kelpaa (aitojakin Commons-kuvia
 * säilytetään siellä, todettu ensimmäisessä versiossa ja korjattu
 * ennen julkaisua).
 *
 * AJO: node tools/nostoinventaario.mjs
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JUURI = new URL('..', import.meta.url).pathname;
const PACKS = join(JUURI, 'js/packs');

const { MAA_KATEGORIAT } = await import('../js/packs/maa-kategoriat.js');

const EUROOPPA = {
  ALB: 'Albania', AND: 'Andorra', AUT: 'Itävalta', BEL: 'Belgia', BGR: 'Bulgaria',
  BIH: 'Bosnia ja Hertsegovina', BLR: 'Valko-Venäjä', CHE: 'Sveitsi', CYP: 'Kypros',
  CZE: 'Tšekki', DEU: 'Saksa', DNK: 'Tanska', ESP: 'Espanja', EST: 'Viro', FIN: 'Suomi',
  FRA: 'Ranska', GBR: 'Britannia', GRC: 'Kreikka', HRV: 'Kroatia', HUN: 'Unkari',
  IRL: 'Irlanti', ISL: 'Islanti', ITA: 'Italia', LTU: 'Liettua', LUX: 'Luxemburg',
  LVA: 'Latvia', MDA: 'Moldova', MKD: 'Pohjois-Makedonia', MLT: 'Malta',
  MNE: 'Montenegro', NLD: 'Alankomaat', NOR: 'Norja', POL: 'Puola', PRT: 'Portugali',
  ROU: 'Romania', RUS: 'Venäjä', SRB: 'Serbia', SVK: 'Slovakia', SVN: 'Slovenia',
  SWE: 'Ruotsi', TUR: 'Turkki', UKR: 'Ukraina', XKX: 'Kosovo',
};

const TIEDOSTOT = readdirSync(PACKS).filter((f) => f.endsWith('.js'));

/* Tyyppinormalisointi Fablen 12 luokkaan. */
const TYYPPI_KARTTA = {
  vuori: 'vuori',
  saari: 'saari',
  jarvi: 'järvi',
  järvi: 'järvi',
  joki: 'joki',
  meri: 'meri',
  historia: 'historia',
  kulttuuri: 'kulttuuri',
  kaupunki: 'kulttuuri',
  ruoka: 'ruoka',
  kauppa: 'kauppa',
  tekniikka: 'tekniikka',
  keksinnot: 'tekniikka',
  keksinnöt: 'tekniikka',
  merenkulku: 'merenkulku',
  luonto: 'muut',
  nosto: 'muut',
};
const luokittele = (raaka) => TYYPPI_KARTTA[String(raaka ?? '').toLowerCase()] ?? 'muut';
const TYYPIT = [
  'vuori', 'saari', 'järvi', 'joki', 'meri', 'historia', 'kulttuuri',
  'ruoka', 'kauppa', 'tekniikka', 'merenkulku', 'muut',
];

/** Onko olio "leaf"-nosto (nimetty kohde, ei aihe-container jolla on oma nostot-lista)? */
function onNosto(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o)) return false;
  const nimi = o.nimi ?? o.nimio ?? o.otsikko;
  if (typeof nimi !== 'string' || !nimi) return false;
  if (Array.isArray(o.nostot)) return false; // aihe-container (MAA_KATEGORIAT-tyyppinen)
  return true;
}

function kuvaTiedot(o) {
  /*
   * KORJATTU 21.9.2026 (iso ajon vaihe 1): puuttui `o.kuva?.tiedosto`
   * (paljas Commons-tiedostonimi kuva-olion sisällä) — tätä muotoa
   * käyttävät mm. maa-kategoriat.js:n nostot JA niistä
   * korttiLehdesta()-funktiolla johdetut maalehtinostot-<iso>.js-kortit
   * (js/packs/maalehtinostot-fra.js). Ilman tätä tarkistusta työkalu
   * merkitsi virheellisesti kuvattomaksi 17 FRA-korttia, joilla oli jo
   * aito Commons-kuva — löytyi kun yksittäistapaus (Roquefort)
   * tarkistettiin käsin suoraan JSON.stringify:llä.
   */
  const onKuva = Boolean(o.tiedosto) || Boolean(o.kuva?.osoite) || Boolean(o.kuva?.tiedosto)
    || Boolean(o.kuvat?.length) || Boolean(o.herokuva);
  /*
   * HUOM: /karttanostot/-polku EI tarkoita tekoälykuvaa — se on vain
   * R2-säilytyspolku, jota käyttävät sekä aidot Commons-valokuvat
   * (esim. hahmotelma-*.js: kuva.lahde "Valokuva: ..., Wikimedia
   * Commons (CC ...)") että oikeat tekoälykuvat. Ainoa luotettava
   * merkki löytyi tekstisisällöstä: lahde-kentän täsmällinen alku
   * "Tekoälyllä tuotettu havainnekuva." (js/packs/elaintakyt.js,
   * kulttuuri-kategoriat.js, maa-kategoriat.js, nahtavyysjutut.js).
   * lahde asuu joko kuva-olion sisällä TAI nostoin ylätasolla
   * riippuen skeemasta, joten molemmat tarkistetaan.
   */
  const lahdeteksti = o.kuva?.lahde ?? o.lahde ?? '';
  const generoitu = /^Tekoälyllä tuotettu/.test(lahdeteksti);
  return { onKuva, generoitu };
}

/** Kerää kaikki leaf-nostot syvyyshaulla, pysähtyen containerin sisään mutta ei nostoon itseensä. */
function keraaSyvyyshaulla(arvo, tulos, kierretyt) {
  if (!arvo || typeof arvo !== 'object') return;
  if (kierretyt.has(arvo)) return;
  kierretyt.add(arvo);
  if (Array.isArray(arvo)) {
    for (const v of arvo) keraaSyvyyshaulla(v, tulos, kierretyt);
    return;
  }
  if (onNosto(arvo)) {
    tulos.push(arvo);
    // Nosto voi kantaa aliobjekteja (esim. galleria) — ei skannata niiden sisään nimenä.
    return;
  }
  for (const v of Object.values(arvo)) keraaSyvyyshaulla(v, tulos, kierretyt);
}

/*
 * Vain nämä neljä tyyppiä lasketaan "nostoiksi" (sama joukko kuin
 * Pelikoodarin koodi). Kanoninen export johdetaan tiedostonimestä:
 * `maastokohteet-fra.js` -> `MAASTOKOHTEET_FRA`.
 */
const NOSTOTIEDOSTOT = ['maastokohteet', 'hahmotelma', 'maalehtinostot', 'fokuskohteet'];

const kanoninenNimi = (tyyppi, iso) => `${tyyppi.toUpperCase().replace(/-/g, '_')}_${iso}`;

/**
 * Onko nostolla kelvollinen visa? Kopioitu suoraan js/fokusnosto.js
 * `nostonVisa`-funktiosta (sama ehto, sama kenttä) — EI `kysymykset`,
 * joka on eri asia (pöllö-chatin ehdotuskysymyksiä).
 */
function onkoVisa(nosto) {
  const visa = nosto?.visa;
  if (!visa || typeof visa.kysymys !== 'string' || !visa.kysymys.trim()) return false;
  if (!Array.isArray(visa.vaihtoehdot) || visa.vaihtoehdot.length < 2) return false;
  if (!Number.isInteger(visa.oikea) || visa.oikea < 0 || visa.oikea >= visa.vaihtoehdot.length) {
    return false;
  }
  return true;
}

async function maanNostot(iso) {
  const isoL = iso.toLowerCase();
  const nostot = [];
  const luetutTiedostot = [];
  for (const tyyppi of NOSTOTIEDOSTOT) {
    const tiedosto = `${tyyppi}-${isoL}.js`;
    if (!TIEDOSTOT.includes(tiedosto)) continue;
    // eslint-disable-next-line no-await-in-loop
    const moduuli = await import(join(PACKS, tiedosto));
    const vientiNimi = kanoninenNimi(tyyppi, iso);
    const vienti = moduuli[vientiNimi];
    if (vienti === undefined) {
      console.warn(`${iso}: ${tiedosto} ei vie nimeä ${vientiNimi} — ohitettu`);
      continue;
    }
    luetutTiedostot.push(tiedosto);
    keraaSyvyyshaulla(vienti, nostot, new WeakSet());
  }
  return { nostot, tiedostot: luetutTiedostot };
}

const rivit = [];
for (const [iso, nimi] of Object.entries(EUROOPPA)) {
  // eslint-disable-next-line no-await-in-loop
  const { nostot: kaikkiNostot, tiedostot } = await maanNostot(iso);

  const tyypit = Object.fromEntries(TYYPIT.map((t) => [t, 0]));
  let visoja = 0;
  let kuvia = 0;
  let generoituja = 0;
  let ilmanKuvaa = 0;
  const ihmeTila = { ihme: 0, rappeutunut: 0, olemassa: 0 };
  for (const n of kaikkiNostot) {
    const luokka = luokittele(n.tyyppi ?? n.kategoria ?? n.symLaji ?? n.laji);
    tyypit[luokka] += 1;
    if (onkoVisa(n)) visoja += 1;
    const { onKuva, generoitu } = kuvaTiedot(n);
    if (onKuva) { kuvia += 1; if (generoitu) generoituja += 1; } else ilmanKuvaa += 1;
    if (n.ihme?.kadonnut === true) ihmeTila.ihme += 1;
    else if (n.ihme?.kadonnut === false) ihmeTila.rappeutunut += 1;
    else ihmeTila.olemassa += 1;
  }

  const yhteensa = kaikkiNostot.length;
  rivit.push({
    iso,
    nimi,
    yhteensa,
    tyypit,
    visoja,
    visaOsuus: yhteensa ? visoja / yhteensa : 0,
    ihmeTila,
    ilmanKuvaa,
    kuvia,
    generoituja,
    kartuschaRiveja: (MAA_KATEGORIAT[iso] ?? []).length,
    tiedostoja: tiedostot.length,
  });
}

/* --------------------------------------------------------- raportti */

const pros = (x) => `${Math.round(x * 1000) / 10}%`;
const rivi = (r) => `| ${r.iso} | ${r.nimi} | ${r.yhteensa} | `
  + `${TYYPIT.map((t) => r.tyypit[t]).join(' / ')} | ${r.visoja} (${pros(r.visaOsuus)}) | `
  + `${r.ihmeTila.ihme} / ${r.ihmeTila.rappeutunut} / ${r.ihmeTila.olemassa} | `
  + `${r.ilmanKuvaa} | ${r.kuvia} | ${r.generoituja} | ${r.kartuschaRiveja} |`;

const yhtVisoja = rivit.reduce((a, r) => a + r.visoja, 0);
const yhtNostot = rivit.reduce((a, r) => a + r.yhteensa, 0);
const yhtKuvia = rivit.reduce((a, r) => a + r.kuvia, 0);
const yhtGeneroituja = rivit.reduce((a, r) => a + r.generoituja, 0);
const yhtIlmanKuvaa = rivit.reduce((a, r) => a + r.ilmanKuvaa, 0);
const yhtIhme = rivit.reduce((a, r) => a + r.ihmeTila.ihme, 0);
const yhtRappeutunut = rivit.reduce((a, r) => a + r.ihmeTila.rappeutunut, 0);
const yhtOlemassa = rivit.reduce((a, r) => a + r.ihmeTila.olemassa, 0);
const allaKolmasosan = rivit.filter((r) => r.yhteensa > 0 && r.visaOsuus < 1 / 3)
  .sort((a, b) => a.visaOsuus - b.visaOsuus);

const md = `# Nostoinventaario Euroopasta — ${new Date().toISOString().slice(0, 10)} (korjattu)

Sisältökirjuri (Sonnet), Fablen tilaus: omistaja ottaa Euroopan maiden
kaikki nostot takaisin työlistalle (tarkistus: noin joka kolmannessa
tietovisa; havainnekuvia lisää Codexilta huomenna). Ei sisältömuutoksia
tässä erässä — pelkkä laskenta, työkalu \`tools/nostoinventaario.mjs\`.

**KORJATTU 20.9.2026 ILTA** täsmäytyksen jälkeen Pelikoodarin (opus)
koodista lasketun FRA-luvun kanssa. Kaksi virhettä ensimmäisessä
versiossa: (1) "visa" luettiin väärästä kentästä (\`kysymykset\`-
taulukko, joka on pöllö-chatin ehdotuskysymyksiä — ei tietovisa) oikean
\`nosto.visa\`-kentän sijaan (sama muoto kuin lehden tehtävä:
\`{kysymys, vaihtoehdot, oikea, fakta?}\`, tarkistettu suoraan
js/fokusnosto.js \`nostonVisa\`-funktion ehdolla); (2)
\`maalehtinostot-<iso>.js\` vie sekä käsitellyn että raakadatan, ja
kaikkien exporttien läpikäynti laski osan nostoista kahdesti.
Täsmäytyksen jälkeen tämä työkalu antaa FRA:lle täsmälleen
Pelikoodarin luvut: 64 nostoa, 16 visaa (25 %). Vanha raportti (51 %
FRA:lle, 94 % kaikille) oli virheellinen — tämä korvaa sen kokonaan.

## Menetelmä ja rajaus

Luvut tulevat kunkin maan ISO-päätteisistä paketeista
(\`maastokohteet-<iso>.js\`, \`hahmotelma-<iso>.js\`,
\`maalehtinostot-<iso>.js\`, \`fokuskohteet-<iso>.js\`) — VAIN kunkin
tiedoston KANONINEN export (esim. \`MAASTOKOHTEET_FRA\`), ei muita
saman tiedoston vientejä. \`nakyvat-kaupungit-<iso>.js\` (kaupunki-
kortit, oma korttityyppi) ja jaettu \`elaintakyt.js\` (oma "perhe")
EIVÄT kuulu tähän joukkoon — pudotettu tässä korjauksessa, koska
Pelikoodarin ryhmittely ei sisältänyt niitä eikä peli käsittele niitä
"nostoina" visan tai tyyppijakauman kannalta. EI SISÄLLÄ myöskään
täky-, syvennys-, skandaali- ja historian hetki -kerroksia
(dynaamisesti koottuja lisäkerroksia, js/fokusnosto.js ja
sisarpaketit) — luvut ovat siis ALARAJA kartalla näkyvien merkkien
kokonaismäärälle, ei koko \`keraaNostot\`-tulos
(tools/fokuskartta/nostot.mjs).

**Havainnekuvan (generoitu-lippu) kenttä EI ole boolean eikä täysin
yhtenäinen, mutta merkintätapa ON yhtenäinen siellä missä sitä
käytetään.** Koko repossa ei ole yhtään boolean-kenttää "generoitu" —
sana esiintyy datassa vain kommenteissa. \`/karttanostot/\`-R2-polku
EI ole luotettava merkki: se on pelkkä säilytyskansio, jota käyttävät
sekä aidot Commons-valokuvat (esim. \`hahmotelma-*.js\`:n
\`kuva.lahde: 'Valokuva: <tekijä>, Wikimedia Commons (CC ...)'\`) että
oikeat tekoälykuvat — tämä oli tämän työkalun ensimmäisen version
virhe, korjattu ennen julkaisua. OIKEA merkki on \`lahde\`-kentän
(joko \`kuva.lahde\` tai noston omalla ylätasolla, skeemasta
riippuen) TÄSMÄLLINEN ALKU **"Tekoälyllä tuotettu havainnekuva."** —
käytössä johdonmukaisesti neljässä paketissa: \`elaintakyt.js\`,
\`kulttuuri-kategoriat.js\`, \`maa-kategoriat.js\`,
\`nahtavyysjutut.js\` — joista YKSIKÄÄN ei kuulu tämän raportin
nostojoukkoon (ks. yllä). "Havainnekuvia"-sarake alla kertoo siis
vain, kuinka moni skannattujen neljän paketin (maastokohteet-,
hahmotelma-, maalehtinostot-, fokuskohteet-) OMISTA kuvista täyttää
tuon lahde-ehdon — se ei kata mainittuja neljää muuta pakettia.

Tyyppiluokat normalisoitu Fablen 12 luokkaan lähdekentistä
\`tyyppi\`/\`kategoria\`/\`symLaji\`/\`laji\`; tunnistamaton arvo → muut.

**Ihme / rappeutunut / olemassa -sarake** (omistajan linjaus, Raamattu
"HAVAINNEKUVAT NOSTOISSA") ei ole PÄÄTELTY tekstistä (avainsanahaku
olisi epäluotettava) vaan luettu suoraan olemassa olevasta
\`ihme\`-kentästä, jota koodi jo käyttää (js/fokuskohteet-gbr.js,
-grc.js ym.): nosto jolla on \`ihme: { kadonnut: true, ... }\` on
kokonaan kadonnut kohde (kortilla vain havainnekuva) → **ihme**; nosto
jolla on \`ihme: { kadonnut: false, ... }\` on rappeutunut/muuttunut
paikka, jolla on sekä nykykuva että kulta-ajan havainnekuva →
**rappeutunut**; nosto ilman \`ihme\`-kenttää → **olemassa** (tavallinen
nosto, havainnekuva vain jos tuo selvästi lisäarvoa). Tämä kattaa vain
neljä skannattua pakettia — \`kulttuuri-kategoriat.js\` ja
\`nahtavyysjutut.js\` saattavat sisältää lisää \`ihme\`-nostoja tämän
ulkopuolella.

## Yhteenveto

- Maita: ${rivit.length}
- Nostoja yhteensä: ${yhtNostot}
- Visoja yhteensä: ${yhtVisoja} (${pros(yhtNostot ? yhtVisoja / yhtNostot : 0)} kaikista)
- Ihme (kadonnut kohde): ${yhtIhme}, rappeutunut (pari): ${yhtRappeutunut}, olemassa: ${yhtOlemassa}
- Kuvallisia: ${yhtKuvia}, joista havainnekuvaksi tulkittuja: ${yhtGeneroituja}
- Ilman kuvaa: ${yhtIlmanKuvaa}
- Maita joissa visaosuus alle 1/3: ${allaKolmasosan.length}

### Maat joissa visaosuus alle 1/3

${allaKolmasosan.map((r) => `- ${r.iso} ${r.nimi}: ${r.visoja}/${r.yhteensa} (${pros(r.visaOsuus)})`).join('\n') || '(ei yhtään)'}

## Taulukko per maa

Tyypit-sarakkeen järjestys: ${TYYPIT.join(' / ')}. Ihme-sarakkeen
järjestys: ihme / rappeutunut / olemassa.

| ISO | Maa | Nostoja | Tyypit | Visoja (osuus) | Ihme/Rap./Ole. | Ilman kuvaa | Kuvia | Havainnekuvia | Kartuschan rivejä |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rivit.map(rivi).join('\n')}
`;

const ULOSPOLKU = join(JUURI, 'docs/raportit/nostoinventaario-20260920.md');
writeFileSync(ULOSPOLKU, md);
console.log(`Kirjoitettu: ${ULOSPOLKU}`);
console.log(`Maita ${rivit.length}, nostoja ${yhtNostot}, visaosuus ${pros(yhtNostot ? yhtVisoja / yhtNostot : 0)}`);
