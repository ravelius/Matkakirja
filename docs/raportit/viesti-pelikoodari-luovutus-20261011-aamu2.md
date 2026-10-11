# Pelikoodarin luovutus 11.10.2026 klo 09.3x (nollaus 51 %, PT)

Edellinen: viesti-pelikoodari-luovutus-20261011-aamu.md. Viestit SendMessage nimellä; PÄÄTOIMITTAJA-nimellä on kaksi istuntoa →
käytä "PÄÄTOIMITTAJA (Opus, max) [f8fa28]" (tällä koneella). Muut: "Julkaisija (Opus, high)", "Siirtoseppä (Opus, high)",
"Karttaseppä (Opus, high)", "Natiivi-UI (Opus, high)".

## Tehty 11.10. 07.0x – 09.3x
- Pääkaupungit #4386 MERGED ca470b33e (14 lehteä, maakortin "Lue kaupunkilehti →" = ui.openArrival, natiivi on malli). Kartat Karttasepältä;
  kaukaiset kohteet pois (Andorra Margineda+Madriu, Vaduz Schalun, Reykjavík Viðey), Bern Bundesplatz pois (PT hyväksyi), San Marino Wikidata.
  Kansikuvat peilattu (peilaa 38112652506, 334 kuvaa). Kysymykset/tiedot omissa tauluissa PAAKAUPUNKIEN_KYSYMYKSET/_TIEDOT (EUROPE_FACTS valuu laudalle).
- Olavinlinna (proto pelikoodari/tyrma-tapahtumat): a305f5ea1 tyrmän tapahtumat lähiraja 6 m; 3033a8066 laineiden 2. kerros; 9250fff69 merge
  siirtoseppa/laituri-varoitus (v11 e3c5dd17b); 6dd9ee50e konsolin "compressed samples" (pakattu klippi + SaumatonSilmukka.GetData) → v12.
  Laituri −34 dB = jaettu mikseri linna|maisema 0,23 (worker /mikseri/tasot); PT: JÄTETÄÄN. Tyrmän tapahtumat kuuluvat v11:ssä (100 ms verho).
- ÄÄNISIVUN VALINNAT VALMIS (omistajan toive 09.3x, PT:n KIIRE): https://matkakirja-aanet.pages.dev/ julkaistu (Access ok, /api/* suojattu).
  Sivusto /Users/Shared/Claude/aanisivu-sivusto: valinnat.js + valinnat.css (index.html:n lopussa, varmuuskopio index.html.ennen-valinnat-20261011),
  _worker.js (Pages advanced mode) → D1 aanisivu-valinnat (9af323e4…, sidos DB; KV kokeiltu ja poistettu: luku–kirjoitus hukkasi valintoja).
  Lukutyökalu PR #4388 (haara pelikoodari-aanisivu-valinnat): `source ~/.zshrc && node tools/aanisivu/valinnat.mjs` (--kuiva, --nyt, --json).
  Testattu: puhelinkoko paikallisesti (wrangler pages dev --d1 DB) + tuotannon D1 testirivillä (poistettu). PT:lle ilmoitettu.
  AVOIN: tuotannon /api-kirjoitus varmistuu omistajan ensimmäisestä rastista (Accessin läpi en pääse). aanisivu-OHJE.md:hen lisätty osio.
  PT:n alkuperäinen tilaus sellaisenaan (toteutettu): "OMISTAJA 09.3x: 'saisiko äänisivuille suoraan checkboxit niille jotka ovat hyviä näytteitä
  ja napin ylös "lähetä claudelle" tms'. 1) Jokaiseen näyteriviin valintaruutu … tallentuu heti palvelimelle (Pages Function + KV tai D1, Accessin
  takana) … 2) Ylös nappi 'Lähetä Claudelle (N)' + valinnainen lyhyt viestikenttä … 'Lähetetty klo hh.mm ✓'. 3) Lukutyökalu … tulostaa uudet
  lähetykset ja merkitsee ne luetuiksi."
- Sekoitustarkistus TEHTY: oikea vastaus indeksi 0 koko pelin datassa (EUROPE_QUESTIONS 239/252, pääkaupungit 66/70); web game.js shuffledOrder
  ja natiivi Kysely.Sekoitettu sekoittavat näytettäessä → ei datatestiä. Kerrottu commit-viestissä c721c8112.

## KESKEN: e03-kytkentä (PT, junaan 182; omistajan lupa: loki "OMISTAJA 10.10. 21.55: … PÄÄKAUPUNGIT PILVEEN")
Haara pelikoodari-paakaupungit-e03 (worktree /Users/Shared/Claude/wt/pelikoodari-paakaupungit-e03), c721c8112 pushattu: SK:n
paakaupungit-e03-pilvi cdb797032 kytketty (tbilisi jerevan baku amman beirut abudhabi manama; Beirutilla ei säärivejä), piirtotyökaluun 7 rajausta
(Abu Dhabi, Baku, Beirut, Manama meri). Testit ok paitsi puuttuvat 7 PNG:tä.
Jäljellä: 1) Karttaseppä piirtää 7 karttaa (pyydetty 09.1x; Beirut 4,8 km ja Abu Dhabi 5,6 km leveitä → kaukainen kohde pois kartalta,
tekstit jäävät; muutos maakartat.js + tools/piirra-kaupunkikartta.mjs). 2) Yhdistä Karttasepän haara (binäärit: git checkout --theirs, jos
konflikti), git merge origin/main, npm test (koko). 3) PR Julkaisijalle (juna 182, ei versionostoa; kansikuvat Commonsista → peilaa.yml
hoitaa, tarkista ettei ulkopuolisia kuvia) ja rivi PT:lle. Ramallah tulee SK:lta myöhemmin erikseen (sama kytkentä).

## Opit
- KV ei kelpaa luku–muokkaus–kirjoitus-tallennukseen (nopeat klikkaukset hukkuvat) → D1.
- Laitetestaajan 10 s RMS ei näytä lyhyitä tapahtumia; scratchpad-tapa: ffmpeg → 8 kHz mono → 100 ms verho → piikit yli liukuvan mediaanin.
- Natiivin taso = koodi × jaettu mikseri (muisti linnan-jaettu-mikseri-tasot); AudioSource.volume ≤ 1.
- Pääkaupunkikytkentä: kytke-pilvisisalto.mjs <repo> <kansio, jossa vain uusi erä> (lisää taulujen loppuun; ei ajeta kahdesti samalle erälle).

## Worktreet
wt/pelikoodari-paakaupungit-e03 (KESKEN), wt/pelikoodari-aanisivu-valinnat (#4388), wt/proto-pelikoodari-tyrma-tapahtumat (v12:n jälkeen pois),
wt/pelikoodari-louvre (#4365).
