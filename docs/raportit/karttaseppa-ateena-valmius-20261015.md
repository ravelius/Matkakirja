# Ateena pelaajille -valmius: maasto, rantaviiva ja kartta (Karttaseppä 15.10.2026 ilta, PT, juna 195)

Kierroksen 8 pysähdystä (pallokierros-ateena-v8) datasta, ei simua eikä Googlen laattoja. Ämpärin pintamalli (korkeus-ateena, GLO-30
30 m, ±15 km), maanpinta v1/v2 ja uusi v3, natiivin muodot-ateena.json (haara karttaseppa/kierrokset-194), vesi-ateena (ateena1-8m),
pelin puut ja OSM:n korkeuspisteet (236, europe_greece-latest.osm.pbf). Merenpinta 38,25 m ellipsoidista (vesiverkon avovesi) = N.
Kuva: `ateena-maanpinta-v2-v3.jpg`. Kaikki luvut: `tulos-ateena-v3.txt`.

## Korjattu: maanpinta v3 (`_valmiit/maa-ateena-v3-vienti-20261015` → Julkaisija; natiivi poimii -v3:n itse)

| Kohta (m mpy) | pinta | v2 | v3 |
|---|---|---|---|
| Parthenon | 155,0 | 149,0 | 154,8 |
| Erekhtheion | 142,4 | 129,8 | 142,0 |
| Propylaia | 130,9 | 125,9 | 130,8 |
| Akropoliin itäpää (vanha museo) | ~149 | ~120 | ~148 |
| Lykabettoksen huippu | 269 | 254 | 257 |

- Syy: v2:n 20. persentiili söi puuttomien kukkuloiden reunat, ja Akropoliin omat rakennukset (rauniot, vanha museo) laskettiin
  kaupungiksi, jolloin sekoitus veti v1:n (50 m liian matala) takaisin. Lisäksi v1:n P5 120 m:n ikkunassa on rinteellä
  ~0,93 × 60 m × kaltevuus liian matala (Plaka, Anafiotika).
- v3 (T7 `vesimaski/maa-kukkulat.py`, v2 toistuu tavulleen ilman lisäargumentteja): puuttomilla alueilla maa = pintamalli, metsässä
  persentiiliavaus pelin puiden latvuspeiton mukaan; rauniot ja muinaisalueiden (OSM historic=archaeological_site/castle,
  `arkeologiset.py`) rakennukset eivät ole kaupunkia; kaupunkiin rinnekorjaus; yläraja bilineaarinen pintamalli.
- Ajo: `python3 maa-kukkulat.py data/maa-ateena.json data/maa-ateena-lahi.png data/korkeus-ateena.json data
  <kaupunki-ateena-20261013>/rakennukset-raaka-ateena.json <ulos> v3 <…>/puut/peli/puut-ateena.bytes data/muinaisalueet-ateena.json`
  (data = T7 Matkakirja-karttaseppa/kierrostarkistus-20261015/data).
- Tarkistus: OSM:n korkeuspisteisiin |ero| p50 v2 14,6 → v3 13,7 m, mediaani −12,7 → −10,2 m (arvio on yhä mieluummin matala kuin
  korkea: ei kelluvia kohteita). Keinotekoiset portaat (rinne jyrkempi kuin pinnan) keskustassa 0,157 % → 0,018 %. DTM > pinta: 0 %.
  Puiden tyvi v3 − v2: mediaani +1,5 m, p95 +4,7 m (rinteillä; tasaisella +0,3 m). Rantamaa alle meren 5,1 % → 3,0 %.

## Pysähdykset v3:lla (natiivin korostuksen pohja pintamallista vs. maanpinta)

Kallimarmaro +1,6, Zeus −0,6, Tuulten torni +1,1, Agora +0,3, Hefaistos −1,1, Erekhtheion −1,3, Parthenon −4,0 m: kaikki ±4 m.
**Akropolis ja Propylaia −11,9 m**: korostuksen pohja on 12 m maan alla, koska kehän (60 m) mediaani osuu rinteeseen. Koodissa:
LS1:n ehdotus junaan 195 (pohja maanpinnasta, kun DTM on muistissa) korjaa tämän; v3 pitää olla ämpärissä samaan aikaan, muuten
v2:lla Erekhtheionin korostus olisi 12 m kallion sisällä.

## Rantaviiva ja reunat

- Rannat kunnossa: rantamaan mediaani +1,9 m merestä, avovesi tasan merenpinnassa; lähin ranta 6–7 km pysähdyksistä.
- **Löydös, vesi (oma alue, ei korjattu ilman PT:n lupaa):** ateena1-8m loppuu ±8 km:n neliöön. Akropoliin kamerat katsovat
  lounaaseen (225–235°, kaari ±45°) Saroninlahdelle; oman veden reuna on 9–12 km:ssä ~1° vaakatason alla, ja sen takana on Googlen
  meri (eri sävy; vrt. v16:n laikut). Ehdotus: ateena2-8m 20 km:iin (avomeri halpaa) + index-v25; vaatii simun ennen junaa.
- Pintamallin lähi/kauko-saumaa ei ole (ämpärissä vain 30 m:n kauko). DTM loppuu 8 km:iin, mutta puut ja liikenne ovat sen sisällä.
