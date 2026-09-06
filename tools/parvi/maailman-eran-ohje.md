# Maailman karttanostoerän ohje (Fable 6.9.2026)

Omistaja 6.9.2026: "Jatka kartta nostojen tekoa koko maailmaan." Tavoite
per maa: 8 KOHDETTA (tyyppi ei maastoa: historia, kulttuuri, tekniikka,
kaupunki, muu) + 3 MAASTOKOHDETTA (vuori, joki, meri, jarvi, saari) +
1 ELÄINTÄKY + 2 SKANDAALIA. Tee vain se, mikä maalta puuttuu:
`node tools/laske-karttanostot.mjs` kertoo vajeen sarakkeittain.
Pienessä maassa (esim. Singapore, Qatar, Kypros) tee niin monta kuin
lehden ikkuna ja nimiölimitys sallivat (vähintään 5 kohdetta) ja kirjaa
vaje raporttiin.

Lue: docs/moduulit/karttanostot-kattavuus.md kokonaan ("Säännöt, jotka
pätevät joka erässä", "Maailman erät", erien M1–M4 osiot lopussa).

Mallit (mainissa v1624): js/packs/maastokohteet-arg.js, -aus.js, -can.js,
-lka.js (M1–M4: otsikkokommentti, kohteen rakenne id/nimi/tyyppi/
kysymykset/korostukset/nappi/laudat/teksti/lahde, etäisyysmerkinnät).
- Jos maalla on jo js/packs/maastokohteet-<iso>.js, lisää uusi lohko
  sen MAASTOKOHTEET_<ISO>-tauluun (älä toista olemassa olevia
  kohteita äläkä maan fokuskohteet-<iso>.js:n kohteita, jos sellainen
  on). Jos ei ole, luo tiedosto ja rekisteröi se js/packs/maastokohteet.js-
  hakemistoon (import + taulurivi, aakkosjärjestys) sekä sw.js:n SHELL-
  listaan ja tools/build-standalone.mjs:n MODULES-listaan.
- Vain maailmankartta-rivi laudat-kenttään. Koordinaatit koneella:
  import { laudat } from tools/johda-maastokohteet.mjs; lon/lat
  en-Wikipedian coordinates-propista (NODE_USE_ENV_PROXY=1).
- Eläintäky: js/packs/elaintakyt.js, lohko tiedoston loppuun (malli M4:n
  GRL/GTM/NIC: kuvaton, ämpäritunnus elain-<iso>; testi vaatii ≥ 35
  lautayksikön etäisyyden kaupunkimerkeistä). Skandaalit:
  js/packs/skandaalit.js, lohko loppuun (malli "ERÄ M2, OSEANIA"), 2 kpl,
  sama kenttärakenne. ÄLÄ muotoile tai järjestä olemassa olevia rivejä —
  rinnakkaiset erät lisäävät samoihin tiedostoihin. Päivitä
  tests/elaintakyt.test.mjs ja tests/skandaalit.test.mjs lukumäärät
  (Fable laskee ne uudelleen yhdistäessä).
- Säännöt: ei uutta pääkartan merkkiä pelikaupungin kohdalle
  (KAUPUNGIN_KOHDALLA_SADE 7; laske etäisyys jokaiseen
  js/packs/maailmankartta.js CITIES-kaupunkiin, kirjaa lähin
  otsikkokommenttiin); sama nimi kartalla vain kerran (N3:
  maailmankartta-nimet.js, kohdekartat, skandaalit, eläintäyt;
  node tools/tarkista-nimiolimitys.mjs → "NIMIÖ NIMIÖN PÄÄLLÄ: 0");
  kaikki pisteet maan fokuslehden rajauksen sisällä
  (tools/savukkeet/savuke-maastokohteet.mjs vartio 7a — jos maalla ei
  ole FOKUS_POHJAT-rajausta, selvitä miten työkalu käsittelee sen ja
  kirjaa ratkaisu, älä poista vartioita); kuvaton erä; faktat
  en-Wikipedian raakatekstistä, 3–5 virkettä, 2 kysymystä, lyhyt
  nappi, lähderivi osioineen ja päivämäärällä 6.9.2026. Herkät aiheet
  (sodat, diktatuurit, nykypolitiikka) asiallisesti ja lähteen
  katteessa; Lähi-idässä ja Aasiassa noudata docs/aasia-tyoaineisto/
  spec-asia.md:n sitovia linjauksia; artikkelit, joiden nykytila on
  sotaa, jätetään pois (M3:n Myanmar-linja).
- Lopuksi node tools/laske-karttanostot.mjs. Lisää
  docs/moduulit/karttanostot-kattavuus.md:n loppuun osio
  "Erä <tunnus> (tehty 6.9.2026)" maineen ja nimineen; taulukoita ÄLÄ
  päivitä (Fable ajaa).
- Portit: yhteisten sääntöjen portit + tarkista-nostopaikat +
  savuke-maastokohteet 8/8.

Yksi commit, ei pushia. Raportoi SHA ja per maa kohteiden,
maastokohteiden, eläintäyn ja skandaalien nimet sekä kuvaputkelle
tilattavat eläintäkykuvat (laji, tieteellinen nimi, mitä kuvan pitää
esittää).
