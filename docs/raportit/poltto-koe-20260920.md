# Poltto-koe 20.9.2026: Ranskan koelaatat (Karttaseppä)

Omistajan kortti (Fable 20.9. ilta): *"testataan ensin miltä kaikki näyttää
ennen kuin poltetaan"*. Koelaatat Ranskan alueesta (lon −6…10, lat 41…51,5),
z6–z8, ajettu paikalliseen peliin (`?lauta=pallo`, paikallinen luettelo,
laatat reititetty koekansioihin) ja kaapattu iPad-koossa 1024 × 1366 @2.

Kaappaukset: `docs/raportit/kaappaukset/poltto-koe-20260920/` (7 kpl webp):

| Tiedosto | Näkymä | Meren käsittely |
|---|---|---|
| saapuminen-viivoitus | saapumisnäkymä (z6) | rannikkoviivoitus (harva, 8 viivaa) |
| saapuminen-vyohyke | saapumisnäkymä | syvyysvyöhykkeet portaina (30/120/600/1500/3000 m) |
| saapuminen-syvyys | saapumisnäkymä | nykyinen jatkuva syvyysramppi ilman litistystä (vertailu) |
| biskaja-viivoitus / -vyohyke / -syvyys | Biskajanlahti + Bretagne (z7) | samat kolme |
| loire-viivoitus | Loire lähikuva (z8) | joet pohjassa, maakunnat pienenä |

Kaikissa: **joet pohjassa** (Seine, Loire, Rhône näkyvät LEVOSSA — v1980:n
Loire-vika korjaantuu tällä), viivataso ilman jokia ja reittejä (pallolla),
**nimiötaso**: 1873-maakunnat ja meret harvennetuin kapiteelein
(js/packs/nimisto-1873.js, Sisältökirjuri/Fable), nostot ämpärin FRA-nostotasosta.

## Mitä koodiin tuli (haara karttaseppa-poltto-koe)

- `tools/generoi-laattapyramidi.mjs`: `--joet-pohjaan` (joet takaisin pohjaan,
  luettelo `pohja.joet: true`), `--eijoet` / `--eireitit` / `--eirajat`
  viivatasolle, `--vesiviivoitus tihea|harva` (patinan VESIVIIVOITUKSET),
  `--syvyysportaat m,m,…` (maailmapiirto.js `syvyysPortaat`), `--resepti-json`
  (reseptin ajokohtainen muutos, esim. litistys), **`--nimiotaso --nimioversio
  <v> [--nimiot <json>]`** (uusi läpinäkyvä taso `nimiot/z…`, luettelokenttä
  `nimiotaso` + Pelikoodarin metadata: luokka, teksti, lon, lat, iso, meri,
  koko, kulma, tasot, laatikot tasoittain asteina).
- `tools/fokuskartta/maailmapiirto.js`: `piirraNimiotaso`, `nimiotasonLadonta`
  (puhdas ladonta piirtoon, peitteeseen ja metadataan), `NIMION_KOOT`
  (ruutupikseliä tasoittain: meri z4–z8 14–46 px, maakunta z5–z8 13–32,
  pieni z7–z8), harvennus 0,32 em, sävyt himmeä muste / viileä meri.
- Peli: `js/laattapyramidi.js` jokitaso + nimiötaso (pallon lepokerros latoo
  viivojen päälle, nostojen alle; `pyramidinNimiot()` Pelikoodarille),
  `js/pallolaatat.js`/`js/pallo.js` portit. Tasokartan nimiötaso on velka.
- Testit: jokitaso, pallolepokerros; SHELL ja niputus. 3774 testiä, 0 fail.

## Havainnot koelaatoista (korjattavaa ennen isoa polttoa)

1. **Merinimiöt kahdesti**: pelin elävä maastonimi (Biskajanlahti, "≈"-merkki)
   piirtyy yhä poltetun BISKAJANLAHTI-nimiön lisäksi → Pelikoodari piilottaa
   elävän, kun `pyramidinNimiot()` sisältää saman meren (`meri`-avain).
2. **Nimiöiden törmäykset**: ORLÉANAIS osuu Loiren nimiöön, AUVERGNE
   Puy de Sancyn nostoon, AUNIS/SAINTONGE rannalle. Korjaus: koordinaattien
   säätö nimistössä (Sisältökirjuri) + pieni sovittelu ladonnassa (siirto
   pois rannasta ≥ ½ kirjainkorkeutta) — tehdään ennen isoa polttoa.
3. **Meren käsittely** (omistaja valitsee): a) viivoitus antaa kaiverretun
   atlasilmeen mutta on rantaetäisyyttä, ei syvyyttä (omistajan 30.8. huomio);
   b) portaat näyttävät mannerjalustan reunan (Biskaja) oikeasta syvyydestä;
   c) nykyinen ramppi on hillitty. Vaihtoehdot voi myös yhdistää (viivoitus
   + portaat), yksi ajo lisää.
4. Saapumisnäkymässä nimiöt ovat z6-koossa (17–24 px) — luettavia iPadilla;
   Elsass-Lothringen kerman päällä toimii.
5. Kesto: Ranska z6–z8 pohja 90 s/variantti (3 rinnakkain), ranta+viivat 25 s,
   nimiöt 11 s. Koko maailma polttosuunnitelman mukaan ≈ 13 ydintuntia /
   ≈ 1 h 15 min seinäkelloa (docs/raportit/polttosuunnitelma-20260920.md);
   nimiötaso lisää ~5 min, viivoitus +10–20 % pohjaan.

## Ei tehty

- Polttoa, luettelon vientiä eikä osoitinta. Koelaatat kansiossa
  `~/pyramidi-poltto/koe-20260920/` (ei ämpäriin).
- Ranta-taso pallolla ei näy (sarja k on rannaton, ranta vektorina) — koeranta
  on olemassa tasokarttaa varten.
