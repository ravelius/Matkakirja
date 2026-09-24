# Sisältöinventaario: 71 uuden kaupungin täydentävät kentät — 24.9.2026

**KORJAUS (24.9. klo 10.4x):** ensimmäinen versio unohti N7:n (#3013,
mainissa) viisi kaupunkia inventaarion listasta, vaikka tarkistukset
alla ajettiin niitä VASTEN OIKEIN (city-lista sisälsi ne koko ajan).
Korjattu: lista ja luvut ovat nyt 71/71 oikein, N7 mukana.

Menetelmä: `git diff origin/main...origin/<haara> -- js/packs/*.js`
kaikille avoimille N-erille (N7 tarkistettu suoraan mainista, koska
se on jo mergetty). Tarkistetut lähteet: `js/packs/maakartat.js`
(KAUPUNKIKARTAT), `kulttuuri-kategoriat.js` (`matkailijalle:`,
`galleria:`, `ennenNyt:`, `tehtava:`), `js/packs/fokusvirta-*.js`
(tiedosto per kaupunki), `js/packs/saapumispuheet.js`
(SAAPUMISPUHEET-äänet), `js/packs/saatiedot.js`,
`js/packs/vanhat-aanet.js`, `js/packs/kohtaamiset.js`,
`js/packs/{northamerica,southamerica,africa,asia,europe,oceania}.js`
(ambience-kenttä paikkaluokitukseen kohtaan 3).

## 1. Perusresepti — VALMIS 71/71

Masto, esittely, herokuvat, nostot (kulttuurikategoriat) ja
**minitehtävä (`tehtava:`)** ovat kaikilla 71:llä (pistokoe 3 kaupunkia +
laatukierroksen 77/77-läpikäynti 24.9., ks.
docs/raportit/lehtien-laatukierros-20260924.md). Ei toimenpidettä.

## 2. Puuttuu kaikilta 71:ltä — täydentäviä kenttiä, ei baseline

| Kenttä | Lähde | Peittävyys nyt | Huomio |
|---|---|---|---|
| Sää (`js/packs/saatiedot.js`) | lat/lon + kk-normaalit, `tools/hae-saanormaalit.mjs` | 0/71 | Mekaaninen, työkalu valmis ylimmälle/alimmalle; keskilämpö/sade haetaan Open-Meteon archive-apista erikseen (ei valmista työkalua kantarivien luontiin). |
| Galleria (`galleria: [...]`) | nosto teosgalleriana | 0/71 | Vaatii PD/CC-kuvahaun per kaupunki (lisenssiportti-kaava). |
| Ennen/nyt-pari (`ennenNyt: [...]`) | etusivun pikkurivi | 0/71 | 96/100 vanhasta kaupungista on pari; vaatii PD/CC-vedoksen. |
| Turistiopas (`matkailijalle:`) | kansiosaston kappale | 0/71 | 195 mainintaa `matkailijalle:` vanhassa paketissa, ei yhtäkään näistä 71:stä. |
| Kohdekartta (`KAUPUNKIKARTAT`, maakartat.js) | nähtävyyskartta ison pop-upin 3. lohko | 0/71 | **Vain kaupungeille/taajamille (kohta 3) — luonnonkohteille EI kävelykarttaa (Fable 24.9.).** |
| Fokusvirta (`js/packs/fokusvirta-<id>.js`) | pulman kehystävä juonipolku | 0/71 | Viimeinen erä, Siirtosepän kaavalla (Fable 24.9.). |
| Vanhat äänet (`vanhat-aanet.js`) | "Ennen"-radionappi | 0/71 | Ei omassa järjestyksessä — sama kuvahaku kuin ennenNyt, liitetään siihen eräksi kun sama kuva löytyy. |
| Saapumispuhe-ääni (`SAAPUMISPUHEET`, ElevenLabs) | "Kaupunki. Iskulause." -ottoäänite | 0/71 | **Ei Sisältökirjurin työtä** — äänigenerointi on Codexin/Fablen alue (docs/roolitus.md-taulukko). |
| Kohtaaminen (`kohtaamiset.js`) | hahmokutsu "Etsi kätkö" -napin tilalla | 0/71 | Harvinainen koko pelissä (pilotti Venetsia); ei osa tätä järjestystä. |

## 3. Paikkaluokitus kohdekarttaa varten (Fable 24.9.: vain oikeille kaupungeille/taajamille)

Luokitus `ambience`-kentän JA maantietotuntemuksen perusteella
(ambience kuvaa tunnelmaa, ei asutusta — esim. Kalgoorlie on
`ambience: 'aavikko'` mutta oikea kaupunki). **Ensimmäinen luokitus,
tarkistettava kaupunkilehden lopullista tekstiä kirjoitettaessa.**

### Kaupunki/taajama (30) — saa kohdekartan aikanaan

managua, noumea, puertomontt, sanjuan, saoluis, ouropreto, bermuda
(Hamilton), norfolk (Kingston), churchill, gao, cayenne, broome,
santarem, geraldton, joaopessoa, murzuk, alkufra, campogrande,
exmouth, macapa, birdsville, cooberpedy, kalgoorlie, mountisa, nome,
portovelho, kimberley, sitka, falkland (Stanley), sthelena
(Jamestown).

### Sekamuotoinen (8) — tarkistettava tapauskohtaisesti

angola, bali, hawaii, madagaskar, mosambik (Mosambikin saarella on
historiallinen linnoituskaupunki), robinsoncrusoe (San Juan
Bautista, hyvin pieni), sierraleone, suakin (raunioitunut
satamakaupunki).

### Luonnonkohde (33) — EI kävelykarttaa; nähtävyydet listana + galleria + ennenNyt

ahaggar, appalakit, bahrelghazal, bananal, boavista, caphorn, darfur,
galapagos, grandcanyon, iguazu, kamerun, kappalmas, karthago,
kilimandzaro, kongo, labrador, machupicchu, milfordsound,
mountrushmore, namib, nullarbor, orjarannikko, rashafun, sahara,
sanambrosio, sepik, tanganjika, titicaca, tshadjarvi, uluru,
viktoria, viktorianputoukset, yellowstone.

## 4. Kartuscha (maalehden kartuscha-rivi) — maatasolla, ei kaupunkitasolla

Kartuscha on maan ominaisuus (paikallinen nimi, lippu, valtiomuoto),
ei kaupungin. 7/71 uudesta kaupungista sijaitsee alueilla, jotka on
JO päätetty pitää PYSYVÄSTI ilman kartuscha-riviä (CLAUDE.md,
BMU/PRI/GUF/FLK/NCL/NFK ja GRL/SHN/HKG):

- bermuda → BMU · sanjuan → PRI · cayenne → GUF · falkland → FLK
- noumea → NCL · norfolk → NFK · sthelena → SHN

Näille ei tarvita toimenpidettä. Loput 64 ovat vakiintuneiden
maiden kaupunkeja, joiden kartuscha-rivi on oletettavasti jo
kunnossa aiemman maalehtityön kautta (ei pistokoetta laajemmin —
matalan riskin oletus).

## 5. Järjestys (Fable 24.9.2026, hyväksytty)

Viiden kohteen erät, PR per erä:

1. **Sää kaikille 71:lle** (mekaaninen — kantarivit Open-Meteosta +
   `tools/hae-saanormaalit.mjs` ylimmälle/alimmalle).
2. **Galleria** (PD/CC, lisenssiportin kaava).
3. **Ennen/nyt** (+ vanhat äänet samalla haulla kun kuva löytyy).
4. **Turistiopas** (`matkailijalle:`).
5. **Kohdekartta** — vain kohdan 3 kaupunki/taajama-listalle (30 +
   sekamuotoisten tarkistetut osat), ei luonnonkohteille.
6. **Fokusvirrat** viimeisenä, Siirtosepän kaavalla.

Churchill-nosto (Arktinen merijää) tehdään erikseen, kun #3016 on
mainissa (docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-c.md
kohta 3).

Ei avoimia omistajan päätöksiä — järjestys on Fablen hyväksymä.
