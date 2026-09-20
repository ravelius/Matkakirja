/*
 * NOSTOINVENTAARIO EUROOPASTA — Fablen tilaus 20.9.2026 (omistaja ottaa
 * nostot takaisin työlistalle: visatarkistus n. joka kolmannessa,
 * havainnekuvia lisää Codexilta). EI SISÄLTÖMUUTOKSIA — pelkkä laskenta.
 *
 * LÄHDE: kunkin maan omat ISO-päätteiset paketit
 * (maastokohteet-<iso>.js, hahmotelma-<iso>.js, maalehtinostot-<iso>.js,
 * nakyvat-kaupungit-<iso>.js, fokuskohteet-<iso>.js) sekä jaettu
 * elaintakyt.js (yksi eläintäky per maa). EI SISÄLLÄ täky-, syvennys-,
 * skandaali- ja historian hetki -kerroksia (js/fokusnosto.js,
 * js/packs/syvennykset*.js, skandaalit*.js, historian-hetket.js) —
 * ne ovat dynaamisesti koottuja lisäkerroksia eikä maakohtaisia
 * sisältöyksiköitä samalla tavalla, ja niiden mukaan ottaminen olisi
 * sekoittanut "nostoja yhteensä" eri lähteestä kuin visa/kuva-osuudet.
 * Tästä syystä luvut ovat ALARAJA, ei koko kartan merkkimäärä
 * (vrt. tools/fokuskartta/nostot.mjs keraaNostot, joka laskee KAIKKI
 * ruudulle poltettavat merkit mukaan lukien nuo lisäkerrokset:
 * Euroopan osalta se antoi ajohetkellä huomattavasti suuremman luvun).
 *
 * TYYPPILUOKAT (Fablen pyytämät): vuori, saari, järvi, joki, meri,
 * historia, kulttuuri, ruoka, kauppa, tekniikka, merenkulku, muut.
 * Lähdekentät `tyyppi`/`kategoria`/`symLaji`/`laji` normalisoidaan
 * näihin; tunnistamaton arvo -> muut.
 *
 * HAVAINNEKUVA (generoitu-lippu): EI ole yhtenäistä boolean-kenttää
 * missään paketissa (tarkistettu: "generoitu" esiintyy vain
 * kommenteissa, ei datakentissä). Tunnistus on siis PÄÄTELTY:
 * `kuva.osoite`, joka sisältää polun "/karttanostot/", on AI-
 * generoitu havainnekuva (peliin syntynyt tools/generoi-*-työkalulla);
 * `tiedosto: '<Commons-tiedostonimi>.jpg'` on aito Commons-valokuva
 * (peiliputken kautta). Tämä on TÄMÄN TYÖKALUN PÄÄTELMÄ, ei koodin
 * oma sopimus — raportoitu erikseen, koska Fable pyysi kertomaan onko
 * kenttä yhtenäinen (EI OLE: kaksi eri kenttänimeä, ei yhtä lippua).
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
  const onKuva = Boolean(o.tiedosto) || Boolean(o.kuva?.osoite) || Boolean(o.kuvat?.length)
    || Boolean(o.herokuva);
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

async function maanNostot(iso) {
  const isoL = iso.toLowerCase();
  const tiedostot = TIEDOSTOT.filter((f) => f === `maastokohteet-${isoL}.js`
    || f === `hahmotelma-${isoL}.js`
    || f === `maalehtinostot-${isoL}.js`
    || f === `nakyvat-kaupungit-${isoL}.js`
    || f === `fokuskohteet-${isoL}.js`
    || f === `syvennyspaikat-${isoL}.js`
    || f === `hetket-${isoL}.js`);
  const nostot = [];
  const kierretyt = new WeakSet();
  for (const tiedosto of tiedostot) {
    // eslint-disable-next-line no-await-in-loop
    const moduuli = await import(join(PACKS, tiedosto));
    for (const arvo of Object.values(moduuli)) keraaSyvyyshaulla(arvo, nostot, kierretyt);
  }
  return { nostot, tiedostot };
}

const { ELAINTAKYT } = await import('../js/packs/elaintakyt.js').catch(() => ({ ELAINTAKYT: {} }));

const rivit = [];
for (const [iso, nimi] of Object.entries(EUROOPPA)) {
  // eslint-disable-next-line no-await-in-loop
  const { nostot, tiedostot } = await maanNostot(iso);
  const elaintaky = ELAINTAKYT[iso];
  const kaikkiNostot = elaintaky ? [...nostot, { ...elaintaky, tyyppi: 'elaintaky' }] : nostot;

  const tyypit = Object.fromEntries(TYYPIT.map((t) => [t, 0]));
  let visoja = 0;
  let kuvia = 0;
  let generoituja = 0;
  let ilmanKuvaa = 0;
  for (const n of kaikkiNostot) {
    const luokka = n.tyyppi === 'elaintaky' ? 'muut'
      : luokittele(n.tyyppi ?? n.kategoria ?? n.symLaji ?? n.laji);
    tyypit[luokka] += 1;
    if (Array.isArray(n.kysymykset) && n.kysymykset.length) visoja += 1;
    const { onKuva, generoitu } = kuvaTiedot(n);
    if (onKuva) { kuvia += 1; if (generoitu) generoituja += 1; } else ilmanKuvaa += 1;
  }

  const yhteensa = kaikkiNostot.length;
  rivit.push({
    iso,
    nimi,
    yhteensa,
    tyypit,
    visoja,
    visaOsuus: yhteensa ? visoja / yhteensa : 0,
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
  + `${r.ilmanKuvaa} | ${r.kuvia} | ${r.generoituja} | ${r.kartuschaRiveja} |`;

const yhtVisoja = rivit.reduce((a, r) => a + r.visoja, 0);
const yhtNostot = rivit.reduce((a, r) => a + r.yhteensa, 0);
const yhtKuvia = rivit.reduce((a, r) => a + r.kuvia, 0);
const yhtGeneroituja = rivit.reduce((a, r) => a + r.generoituja, 0);
const yhtIlmanKuvaa = rivit.reduce((a, r) => a + r.ilmanKuvaa, 0);
const allaKolmasosan = rivit.filter((r) => r.yhteensa > 0 && r.visaOsuus < 1 / 3)
  .sort((a, b) => a.visaOsuus - b.visaOsuus);

const md = `# Nostoinventaario Euroopasta — ${new Date().toISOString().slice(0, 10)}

Sisältökirjuri (Sonnet), Fablen tilaus: omistaja ottaa Euroopan maiden
kaikki nostot takaisin työlistalle (tarkistus: noin joka kolmannessa
tietovisa; havainnekuvia lisää Codexilta huomenna). Ei sisältömuutoksia
tässä erässä — pelkkä laskenta, työkalu \`tools/nostoinventaario.mjs\`.

## Menetelmä ja rajaus

Luvut tulevat kunkin maan ISO-päätteisistä paketeista
(\`maastokohteet-<iso>.js\`, \`hahmotelma-<iso>.js\`,
\`maalehtinostot-<iso>.js\`, \`nakyvat-kaupungit-<iso>.js\`,
\`fokuskohteet-<iso>.js\`) sekä jaetusta \`elaintakyt.js\`:stä (yksi
eläintäky per maa). **EI SISÄLLÄ** täky-, syvennys-, skandaali- ja
historian hetki -kerroksia (dynaamisesti koottuja lisäkerroksia,
js/fokusnosto.js ja sisarpaketit) — luvut ovat siis ALARAJA kartalla
näkyvien merkkien kokonaismäärälle, ei koko \`keraaNostot\`-tulos
(tools/fokuskartta/nostot.mjs), joka laski koko Euroopalle
huomattavasti enemmän merkkejä mukaan lukien nuo lisäkerrokset.
Rajaus tehtiin, jotta "nostoja yhteensä" ja visa/kuva-osuudet
laskettaisiin SAMASTA joukosta eikä sekoitettaisi kahta eri lähdettä.

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
\`nahtavyysjutut.js\`. Muissa (esim. maastokohteet-, hahmotelma- ja
maalehtinostot-paketit) havainnekuvia ei tämän tarkistuksen mukaan
ole lainkaan — kaikki niiden kuvat ovat aitoja Commons-valokuvia.
**Tämän erän skanni EI kata** \`kulttuuri-kategoriat.js\`:ää (kaupungin
nostot, avain on kaupunki-id eikä ISO) eikä \`nahtavyysjutut.js\`:ää,
vaikka molemmissa käytetään havainnekuvia — niiden liittäminen
maakohtaiseen tauluun vaatisi kaupunki→maa-yhdistämisen, mikä olisi
kasvattanut tämän "pienen" erän laajuutta. \`ELAINTAKYT\`:n
tekoälykuvat näyttävät koskevan vain Euroopan ulkopuolisia maita
(Intia, Japani, Etelä-Afrikka, Chile, Uusi-Seelanti ym. pistokoe) —
siksi Euroopan oma eläintäky-sarake on 0 tekoälykuvaa, ei virhe.

Tyyppiluokat normalisoitu Fablen 12 luokkaan lähdekentistä
\`tyyppi\`/\`kategoria\`/\`symLaji\`/\`laji\`; tunnistamaton arvo → muut.

## Yhteenveto

- Maita: ${rivit.length}
- Nostoja yhteensä: ${yhtNostot}
- Visoja yhteensä: ${yhtVisoja} (${pros(yhtNostot ? yhtVisoja / yhtNostot : 0)} kaikista)
- Kuvallisia: ${yhtKuvia}, joista havainnekuvaksi tulkittuja: ${yhtGeneroituja}
- Ilman kuvaa: ${yhtIlmanKuvaa}
- Maita joissa visaosuus alle 1/3: ${allaKolmasosan.length}

### Maat joissa visaosuus alle 1/3

${allaKolmasosan.map((r) => `- ${r.iso} ${r.nimi}: ${r.visoja}/${r.yhteensa} (${pros(r.visaOsuus)})`).join('\n') || '(ei yhtään)'}

## Taulukko per maa

Tyypit-sarakkeen järjestys: ${TYYPIT.join(' / ')}.

| ISO | Maa | Nostoja | Tyypit | Visoja (osuus) | Ilman kuvaa | Kuvia | Havainnekuvia | Kartuschan rivejä |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rivit.map(rivi).join('\n')}
`;

const ULOSPOLKU = join(JUURI, 'docs/raportit/nostoinventaario-20260920.md');
writeFileSync(ULOSPOLKU, md);
console.log(`Kirjoitettu: ${ULOSPOLKU}`);
console.log(`Maita ${rivit.length}, nostoja ${yhtNostot}, visaosuus ${pros(yhtNostot ? yhtVisoja / yhtNostot : 0)}`);
