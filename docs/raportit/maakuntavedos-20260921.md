# Maakuntavedos: nykyiset hallintoalueet FRA + DEU (Karttaseppä 21.9.2026)

Fablen tilaus 21.9.: Natural Earthin admin-1-aineistosta FRA:n 13 regionia ja
DEU:n 16 osavaltiota koelaattoina Pariisin ja Berliinin ympäristöstä, nimet
harvennettuina kapiteeleina ja aluerajat ohuina himmeinä viivoina. EI
tuotantoon; omistaja päättää kuvien perusteella. Sisältökirjurin 1873-luokan
rivit (Hannover, Oldenburg, Braunschweig, Anhalt) tulevat erikseen.

## Kuvat

`docs/raportit/kaappaukset/maakuntavedos-20260921/<versio>-<alue>-<näkymä>-<lat>_<lng>_<korkeus>.webp`

| versio | sisältö |
|---|---|
| **a** | nykyalueiden nimet + rajat (tuotannon 1873-maakuntanimet FRA/DEU pois, meret ja koristeet jäävät) |
| **b** | vain nykyalueiden nimet |
| c | lisäksi tuotannon nykyiset kulttuurialueiden nimet (PICARDIE, NORMANDIA, RHEINLAND …) samalla kartalla — näyttää päällekkäisyyden |

Näkymät: puhelin 390 × 844 @2 ja työpöytä 1400 × 900 @2; korkeus 0,2
(puhelin z7, työpöytä z6) ja 0,05 (z8, Pariisi / Berliini lähikuva).
Pelaaja Marseillessa (Ranska kohdemaana) ja Berliinissä (Saksa).

## Aineisto ja toteutus

- `nykyalueet-fra-deu.json` (samassa kansiossa): Natural Earth 10m
  admin_1_states_provinces (public domain). FRA:n regionit on yhdistetty
  departementeista (`region`-kenttä); nimen paikka on pinta-alapainotettu
  keskipiste; rajat ovat departementtien/osavaltioiden yhteiset särmät,
  joiden kahta puolta on eri alue (26 polylinea, 9 090 pistettä; rannat ja
  valtionrajat jäävät pois — ne ovat jo kartassa).
- Nimet suomeksi vakiintuneilla eksonyymeillä (Baijeri, Saksi, Ala-Saksi,
  Saksi-Anhalt, Mecklenburg-Etu-Pommeri, Berliini, Hampuri, Normandia,
  Korsika); muut alkukielellä. Sisältökirjuri tarkistaa. Kaupunkivaltiot
  ja Saarland `koko: pieni` (vasta z7:stä).
- Uusi nimiötason luokka **`raja`** (tools/fokuskartta/maailmapiirto.js,
  tools/generoi-laattapyramidi.mjs): `viivat: [[[lon, lat], …], …]`,
  yhtenäinen viiva `RAJAN_VARI` rgba(70,48,29,0,45), leveys z6 1,0 / z7
  1,5 / z8 2,2 px; ei tekstiä, ei väistöä, ei este muille nimiöille;
  peite ja metadata kuten muilla riveillä (tunnus `raja-<iso>`).
- Poltto: `node tools/generoi-laattapyramidi.mjs <ulos> --data
  ~/pyramidi-poltto/gshhs-data --nimiotaso --nimioversio vedos-nykyalueet-a
  --nimiot nimiot-vedos-a.json --tasot 6-8 --alue -1.5,46.5,6.5,51`
  (Berliini 9.5,50.5,16,54.5); 5 s per ajo. Kaappaus: tuotannon luettelo,
  jonka `nimiotaso` korvattu paikallisella, ja nimiölaatat reititetty
  koekansiosta (scratch kaappaa-vedos.mjs).

## Havainnot

1. Rajat ovat z6:lla himmeät mutta luettavat (Ranska työpöydällä), z7–z8
   selvät; ne eivät kilpaile valtionrajan eivätkä jokien kanssa.
2. Nimet törmäävät paikoin nostoihin ja kaupunkeihin: HAUTS-DE-FRANCE
   Amiensin alla, SAKSI-ANHALT Quedlinburgin päällä, BRANDENBURG Berliinin
   kaupunkinimen alla; pitkät nimet (PROVENCE-ALPES-CÔTE D'AZUR,
   AUVERGNE-RHÔNE-ALPES) ovat z6:lla leveitä. Ladonnan väistö toimii, mutta
   nykyalueiden keskipisteet osuvat usein juuri kaupunkeihin — käsin
   säädetyt sijainnit (kuten 1873-nimistössä) tarvitaan tuotantoon.
3. Versio c näyttää, että 1873-kulttuurialueet ja nykyalueet samalla
   kartalla ovat liikaa (PICARDIE + HAUTS-DE-FRANCE, RHEINLAND +
   RHEINLAND-PFALZ): tuotannossa joko toinen tai linssin mukaan.
4. Tuotantopoltto vaatii vain nimiötason uusintapolton (uusi
   `--nimioversio`), ei pohjaa, viivoja eikä pallosarjaa.
