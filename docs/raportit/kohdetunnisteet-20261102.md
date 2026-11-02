# Kohdetunnisteet ja kohdekarttojen sijainnit (Karttaseppä 2.–3.11.2026)

Tavoite (omistaja 28.10.2026): nostot striimikartalle oikeille paikoilleen. Jokaiselle kohdekartan nähtävyydelle
tunniste (Wikidata-Q tai OSM-kohde) ja tarkistettu sijainti.

## Tulos

`data/kohdekartat-sijainnit.json` (`node tools/sisalto/kohdesijainnit.mjs --kaikki`, 3.11.2026): 2039 kohdetta.

| Sijainnin lähde | Kohteita |
|---|---|
| Wikipedia-artikkelin Wikidata-piste | 343 |
| Automaattinen tunniste (nimi + 250 m säde, varma) | 606 |
| Tarkistettu ehdokas (tapa `ehdokas`) | 479 |
| Käsin lukittu Wikidata-Q | 5 |
| Käsin lukittu OSM-kohde | 3 |
| Käsin lukittu kartan piste (`kartta: true`) | 24 |
| Kartan piste (ei tunnistetta) | 579 |

Ero kartan pisteeseen: 0–50 m 782, 50–150 m 154, 150–300 m 57, yli 300 m 9. Kaikki yhdeksän yli 300 m:n eroa on
tarkistettu: niissä pelin piste on väärä ja Wikidatan oikea (Berliinin Museosaari, Brysselin Maison du Peuple,
Bukarestin Văcărești-luostari, Pietarin Nyenskans, Riian koraalisynagoga, Tampereen Finlayson, Asgabatin Nisa,
Ateenan Iliou Melathron, Pekingin Nanluoguxiang). PT 3.11.: korjattu samaan PR:ään (faktavirhe):
`js/packs/maakartat.js` pisteet Wikidatan paikkaan, Iliou Melathron myös `js/packs/syvennyspaikat.js`:ssä. Văcăreștin
luostari (purettu 1986, nyk. Sun Plazan kohta) siirtyi kainalon ulkopuolelle: kainalon rajaus siirretty ja Bukarestin
kohdekartta ja värikartta piirretty uudelleen (`tools/piirra-kaupunkikartta.mjs bukarest [--vari]`). Uuden ajon jälkeen
yli 300 m:n eroja on 0.

## Työvaiheet

1. `tools/sisalto/kohdetunnisteet.mjs --kaikki` (2.11.2026, valmis 22.57): wikittömille kohteille Wikidatan geohaku
   250 m säteeltä + nimivertailu. 606 varmaa tunnistetta, 535 ehdokasta käsin tarkistettaviksi, 18 KAUKANA-osumaa
   (saman nimen kohde 250 m – 30 km päässä). Neljä käsilukkoa (Nouakchott, Freetown, Bamako, Maseru).
2. Ensimmäinen sijaintiajo (3.11. 00.29): 17 kohdetta yli 300 m kartan pisteestä.
3. Tarkistus (Sonnet-parvi, 5 agenttia; aineisto `proto-3d/_tyo/karttaseppa/kohdetunnisteet-20261102/tarkistus/`):
   - 528 ehdokasta: 479 hyväksytty, 49 hylätty (eri rakennus, katu, osa kohdetta, museo instituutiona, tai id on
     teema/vuosiaihe kuten "Torni 1888", "Faraday 1831"). Hylätyt jäävät kartan pisteeseen.
   - 35 kaukaista (17 + 18) Wikidatasta, Wikipediasta, OSM API:sta ja Nominatimista: 24 kartan piste oikeampi,
     11 Wikidata. Selvät Wikidata-virheet: Abujan Eagle Square (19 km), Mohatta Palace (kaupungin yleispiste),
     Aqua Virgo (akveduktin lähde 12 km idässä), Biete Amanuel, Mount Vaea, Nouakchottin yliopisto ja Rovaniemen
     kaupungintalo (ensimmäinen P625 = yleispiste). Laajoissa kohteissa (Ciutadella, East Side Gallery, Corniche,
     Hermann Park, Monte Titano, Mount Isa Mines, Valparaíson yliopisto) molemmat pisteet ovat kohteen sisällä → kartta.
4. `kohdesijainnit.mjs`: uusi käsilukko `{ kartta: true, tapa: 'käsin' }` pitää kartan pisteen eikä nosto napsahda
   lähimpään wiki-kohteeseen. Toinen sijaintiajo (3.11.) tuotti yllä olevan tuloksen.

## Avoinna

- 579 kohdetta on kartan pisteessä ilman tunnistetta (ei ehdokasta 250 m:n säteellä tai ehdokas hylätty). Niistä
  nostokohteet napsahtavat lähimpään wiki-kohteeseen alle 150 m:n päästä kuten ennenkin.
- Peli ei vielä lue `data/kohdekartat-sijainnit.json`:ia; käyttöönotto (vienti tai pelin data) on erillinen erä.
