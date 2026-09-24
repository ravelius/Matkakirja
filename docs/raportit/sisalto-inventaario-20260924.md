# Sisältöinventaario: 71 uuden kaupungin täydentävät kentät — 24.9.2026

Menetelmä: `git diff origin/main...origin/<haara> -- js/packs/*.js` kaikille
14:lle avoimelle N-erälle (N7/#3013 on mainissa, ei mukana — sillä on jo
sama peruspaketti kuin muilla). Tarkistetut lähteet: `js/packs/maakartat.js`
(KAUPUNKIKARTAT), `kulttuuri-kategoriat.js` (`matkailijalle:`, `galleria:`,
`ennenNyt:`, `tehtava:`), `js/packs/fokusvirta-*.js` (tiedosto per kaupunki),
`js/packs/saapumispuheet.js` (SAAPUMISPUHEET-äänet), `js/packs/saatiedot.js`,
`js/packs/vanhat-aanet.js`, `js/packs/kohtaamiset.js`.

71 kaupungin lista (N2, N4–N6, N8–N16; N7 pois yllä mainitusta syystä):
managua, noumea, puertomontt, sanjuan, saoluis, galapagos, kongo,
machupicchu, madagaskar, sahara, grandcanyon, iguazu, titicaca, uluru,
yellowstone, bali, hawaii, milfordsound, mountrushmore, ouropreto, angola,
caphorn, namib, norfolk, robinsoncrusoe, appalakit, churchill, karthago,
sierraleone, tanganjika, boavista, kappalmas, kimberley, labrador,
sthelena, ahaggar, gao, kamerun, suakin, viktoria, cayenne, darfur,
mosambik, rashafun, tshadjarvi, bahrelghazal, broome, orjarannikko,
santarem, sepik, bananal, geraldton, joaopessoa, murzuk, nullarbor,
alkufra, campogrande, exmouth, macapa, sanambrosio, birdsville,
cooberpedy, kalgoorlie, mountisa, nome, portovelho.

## 1. Perusresepti — VALMIS 71/71

Masto, esittely, herokuvat, nostot (kulttuurikategoriat) ja
**minitehtävä (`tehtava:`)** ovat kaikilla 71:llä (pistokoe 3 kaupunkia +
laatukierroksen 77/77-läpikäynti 24.9.). Ei toimenpidettä.

## 2. Puuttuu kaikilta 71:ltä — täydentäviä kenttiä, ei baseline

| Kenttä | Lähde | Peittävyys nyt | Huomio |
|---|---|---|---|
| Sää (`js/packs/saatiedot.js`) | lat/lon + kk-normaalit, `tools/hae-saanormaalit.mjs` | 0/71 | **Helpoin korjattava — konemainen työkalu on olemassa, ei tekstityötä.** Ehdotan omaksi eräksi seuraavaksi. |
| Kohdekartta (`KAUPUNKIKARTAT`, maakartat.js) | nähtävyyskartta ison pop-upin 3. lohko | 0/71 | Tekstikirjurin osaa (aihe #3, Fablen tehtävänanto) — vaatii kartta-kuvan ja nähtävyyspisteet, isompi työ per kaupunki. |
| Turistiopas (`matkailijalle:`) | kansiosaston kappale | 0/71 | Enhancement — vertailun vuoksi olemassa olevista web-kaupungeista (~183) 195 mainintaa `matkailijalle:`, mutta ei yhtäkään näistä 71:stä. |
| Galleria (`galleria: [...]`) | nosto teosgalleriana | 0/71 | Harvinainen ominaisuus koko pelissäkin (pilotti: Venetsia); EI yleistä puutetta, ei kiireellinen. |
| Ennen/nyt-pari (`ennenNyt: [...]`) | etusivun pikkurivi | 0/71 | 96/100 vanhasta kaupungista on pari; uusilla ei yhtään. Toistettava resepti, mutta vaatii PD/CC-vedoksen jokaiselle — työläs 71:lle. |
| Vanhat äänet (`vanhat-aanet.js`) | "Ennen"-radionappi | 0/71 | Vain 78/100 vanhasta kaupungista; sama työläs kuvahaku kuin ennenNyt. |
| Fokusvirta (`js/packs/fokusvirta-<id>.js`) | pulman kehystävä juonipolku | 0/71 | Vain n. 50/183 vanhasta kaupungista — EI baseline, valikoiva ominaisuus. Ei yleistä puutetta. |
| Saapumispuhe-ääni (`SAAPUMISPUHEET`, ElevenLabs) | "Kaupunki. Iskulause." -ottoäänite | 0/71 | **Ei Sisältökirjurin työtä** — äänigenerointi on Codexin/Fablen alue (docs/roolitus.md-taulukko). Kirjattu tähän vain inventaarion täydellisyyden vuoksi. |
| Kohtaaminen (`kohtaamiset.js`) | hahmokutsu "Etsi kätkö" -napin tilalla | 0/71 | Harvinainen (pilotti Venetsia); ei yleinen puute. |

## 3. Kartuscha (maalehden kartuscha-rivi) — maatasolla, ei kaupunkitasolla

Kartuscha on maan ominaisuus (paikallinen nimi, lippu, valtiomuoto), ei
kaupungin. 7/71 uudesta kaupungista sijaitsee alueilla, jotka on JO
päätetty pitää PYSYVÄSTI ilman kartuscha-riviä (CLAUDE.md,
BMU/PRI/GUF/FLK/NCL/NFK ja GRL/SHN/HKG):

- bermuda → BMU
- sanjuan → PRI (Puerto Rico)
- cayenne → GUF (Ranskan Guyana)
- falkland → FLK
- noumea → NCL (Uusi-Kaledonia)
- norfolk → NFK
- sthelena → SHN

Näille ei tarvita toimenpidettä — päätös on jo tehty. Loput 64 kaupunkia
ovat vakiintuneiden, olemassa olevien maiden kaupunkeja, joiden
kartuscha-rivi on oletettavasti jo kunnossa aiemman maalehtityön
kautta (ei pistokoetta laajemmin tässä kierroksessa — matalan riskin
oletus, koska maalehtityö on ollut erillinen, kattava kierros).

## 4. Suositus seuraavaksi eräksi

Ehdotan järjestystä kustannuskurin mukaisesti (pilotti ennen skaalaa):

1. **Sää kaikille 71:lle** — mekaaninen, työkalu valmiina, ei tekstiriskiä.
   Yksi erä, ei tarvitse jakaa pienempiin.
2. **Kohdekartat — HUOMIO ennen pilottia:** moni näistä 71:stä on
   luonnonkohde tai alue eikä kävelykaupunki (Sahara, Kongo,
   Madagaskar, Titicaca, Kilimandzaro, Uluru, Grand Canyon,
   Yellowstone…) — kohdekartan resepti (kadut, rakennukset,
   nähtävyyspisteet karttakuvalla) sopii huonosti tällaisiin. Vain
   osa on aitoja pikkukaupunkeja, joilla on katukartta (esim.
   Churchill, Broome, Kalgoorlie, Sitka, Nome, Cooper Pedy). Ehdotan
   pilottia 3 kaupungille TÄSTÄ jälkimmäisestä joukosta ennen
   laajempaa arviota siitä, montako 71:stä ylipäätään tarvitsee
   kohdekartan — kysyn Fablelta vahvistuksen ennen pilottia, koska
   rajaus vaikuttaa koko erän kokoon.
3. Ennen/nyt-parit, galleriat, fokusvirrat ja turistioppaat jätetään
   TOISTAISEKSI — ne ovat valikoivia rikastuksia koko pelissä (eivät
   baseline), eivät nouse kiireellisiksi vain koska kaupunki on uusi.

Ei avoimia omistajan päätöksiä tässä raportissa — kohdat 1–2 sopivat
olemassa oleviin lupiin (sisältötyö, ei uutta ominaisuutta).
