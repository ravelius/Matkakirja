# B3 Nostot ja esittelyt: Lontoon data Pariisin muotoon (KS 10.11.2026 klo 00.5x, PT:n tehtävä)

Lähteet: proto 934ea6ca9 (juna 224) `UI/Resources/Kohdenostot/`, web `js/packs/maakartat.js` + `nahtavyysjutut.js`,
`Peli-testit/Kultaiset/nosto-kysymykset.tsv` (2.218-testin aineisto), Pulu `pulu/vastaukset/v4/{FRA,GBR}.json` (ämpäri).
Taulukko kohde kohteelta: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/matriisi.json` (skripti `matriisi.mjs` samassa kansiossa).
Muiden haarat tarkistettu: Lontoon 14 3D-noston Pulu-kysymykset (08f48ac73) ja 2.218-testi (2c44703fe) ovat jo junassa 224; muuta
Lontoon nosto-/esittelytyötä ei ole kesken. `pelikoodari/lontoo-maanpinta` a7ad5fc24 (piirretty maanpinta) ei ole junassa.

## TULOS: muoto on jo sama, puutteet ovat samat kuin Pariisissa

| | Pariisi | Lontoo |
|---|---|---|
| Paikat (sijainnit.json, Wikidata) | 42 | 43 |
| Kaupunkikartan kohteet (web) | 38 | 29 |
| 3D-mallinostot (vain natiivissa), Pulun kysymykset 2 kpl/kohde | 4/4 | 14/14 |
| Juttu (teksti) | 31/38 (3 442 sanaa) | 24/29 (1 975 sanaa) |
| Jutussa kuva (Commons, lisenssi rivillä) | 23 | 16 |
| Noston linkki (karttavalo) | 28 | 24 |
| Linkitetyn noston kysymykset ≥ 2 kirjoitettua (2.218) | 17/28 | 16/24 |
| Piirroskartan kuvapiste (piirros-<kaupunki>.json) | 38 | 0 (Lontoossa ei piirroskerrosta junassa 224) |
| Leikkeet (kadonneiden rakennusten kuvat piirrokseen) | 5 | 0 |
| Saapumisen esittelykuvat (esittelypaikat) | 13 | 3 |

Kadonneet rakennukset (hahmotelma-*): Pariisi 7, Lontoo 5. Kummassakin 2 kirjoitettua kysymystä, ei Pulun valmiita eikä juttua.

## Lontoolta puuttuu (määrät aamun korttiin; EI generoitu mitään)

1. **Kysymykset (2.218)**: 8 nostoa ilman yhtään kysymystä (syvennys 2: Cheapside, vuorovesi; skandaali 1: Etelämeren kupla;
   hetki 5: Faraday 1831, Fleming 1928, Tunneli 1827, Palo 1666, Globe 1599) → 16 kirjoitettua + Pulun valmiit 8 × 5 = 40.
   Kadonneet 5 → Pulun valmiit 5 × 5 = 25. Jutun kohteet ilman nostoa ja kysymyksiä 5 (Buckinghamin palatsi, Trafalgar Square,
   Big Ben, Lontoon silmä, Tower Bridge) → jos myös näille: 10 kirjoitettua + 25 valmista.
   (Pariisissa sama aukko: 11 nostoa 0+0, kadonneet 7, nostottomat jutut 11.)
2. **Kuvat olemassa olevista lähteistä (Commons, ei generointia)**: 8 juttua ilman kuvaa (Etelämeren kupla, Vanha London Bridge,
   Faraday 1831, Fleming 1928, Tunneli 1827, Palo 1666, Globe 1599, Exchange Alley). Jokaiseen kuvaan tarvitaan selite (1 lause).
   Voin hakea ehdokkaat lisenssirivein, kun PT sanoo (selite = tekstiä, siksi kysyn). Pariisissa sama määrä: 8.
3. **Generoitavat kuvat**: saapumisen esittelykuvat 10 (13 − 3), kadonneiden leikkeet 5 (vain jos Lontoo saa piirroskerroksen).
4. **Äänet (B4, Äänittäjä)**: kohdenimet 43 (yksi otto), jos Lontoo saa saman nimiotön kuin Pariisi.
5. **Kuvapisteet piirros-lontoo.json**: 0 → teen työkalulla `tyokalut/natiivi-ui/piirros-kohdepaikat.py` heti, kun Lontoon
   piirroskerros on tulossa (ei generointia; nyt turha, koska PiirrosKerros ei tunne Lontoota).
