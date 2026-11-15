# Pariisin 7 tarinapaikan data-PR, LUONNOS (SK 15.11.2026)

Haara sk/pariisi-7-data (origin/main c7ae6268d8 päällä). Ei pushattu, ei PR:ää.

## Mitä lisättiin mihin
- **js/packs/nahtavyysjutut.js**, `pariisi`-lohkon loppuun (Lumière 1895:n jälkeen): 7 juttua avaimilla `Grand Châtelet`,
  `Temple-torni`, `Palais d'Orsay`, `Palais de l'Industrie`, `Trocadéron palatsi`, `Galerie des Machines`, `Les Hallesin hallit`.
  Kentät: `aika`, `nosto` (pisteen oma hahmotelmatunnus, esim. `hahmotelma-grand-chatelet`), `teksti`, `kuvat` (1 Commons-kuva),
  lähdemuistiinpano koodikommenttina ja pelaajalle näkyvä `lahde` ("Matkakirjan oma teksti · lähteinä … ja Wikipedia").
- **data/aanitysjono.tsv**: 20 riviä (`tarkista.mjs --lisaa`; ÄÄNITYSJONO: OK).
- **docs/raportit/pariisi-7-mediapyynto-20261115.md**: mediapyyntö PT:lle.

## Miksi ei fokusvirtaa, maakarttoja, miniatyyrejä eikä sijainteja (poikkeama Lontoon mallista)
Kaikilla seitsemällä on jo kohdekartan piste (js/packs/maakartat.js, "KADONNUT IHME LOISTONSA AIKANA", omistaja 31.10.2026), jonka
`nosto` on `hahmotelma-…`, sekä miniatyyri (miniatyyrit.js), piirros ja sijaintirivi (data/kohdekartat-sijainnit.json). Pisteet
avasivat tähän asti wiki-artikkelin. Nimellä avaimistettu juttu voittaa wikin (js/nahtavyydet.js), ja ihmekuva tulee jutun ensimmäiseksi
kuvaksi nimellä (matkakirjanIhme). Uusi täkynosto fokusvirta-pariisi.js:ään ja `nosto-…`-piste olisi tehnyt samasta paikasta toisen
merkin, joten niitä ei tehty. `nosto: 'hahmotelma-…'` noudattaa v3:n ehdotusta; tests/nostot-kartalla.test.mjs ei vertaa
hahmotelmatunnusta tekstiin (hahmotelman teksti monumentit-eurooppa.js:ssä on eri, lyhyempi juttu, eikä siihen koskettu).

## Poikkeamat v3:sta (tuoreempi tieto voitti)
1. **Palais de l'Industrie:** "Se purettiin vuosisadan lopulla Grand Palais'n ja Petit Palais'n tieltä." → "Se purettiin 1890-luvun
   lopulla Grand Palais'n tieltä." (PR 6781 -tarkistus: purkuvuosi ERO paris.fr 1897 / fr-WP 1896; Petit Palais vain fr-WP.)
   `aika: '1855–1890-luvun loppu'` (v3 '1855–1897').
2. **Trocadéro:** "se oli mauri-bysanttilaistyylinen," pois (vain WP). "Palatsia ei ollut tarkoitettu kestämään näyttelyn jälkeen,
   mutta se seisoi …" → "Palatsi seisoi …" (aikalaislähde L'art et l'industrie … 1880 kumoaa).
3. **Les Halles:** "purettiin 1971–1973" → "purettiin 1970-luvun alussa" (1971–1973 vain fr-WP); "sai nimen 'Les Hallesin reikä'" →
   "Jäljelle jäänyttä valtavaa työmaata kutsuttiin yksinkertaisesti reiäksi." (hakukierros 4: nimi ERO, paris.fr "trou de Paris",
   WP "trou des Halles"). `aika: '1850-luku–1970-luvun alku'` (v3 '1850–1973': 1973 yhden lähteen varassa, ja rakentaminen alkoi
   lähteiden mukaan 1852, joten "1850" pyöristettiin vuosikymmeneksi).
4. **aika-kentät KK:n päätöksillä:** Châtelet '1100-luku–1802', Temple 'keskiaika–1808', Galerie '1889–1900-luvun alku',
   Orsay '1810–1898', Trocadéro '1876–1935'.
5. Châtelet, Temple, Orsay ja Galerie ovat sanasta sanaan v3 (tarkistettu koneellisesti). Châtelet'n v3-tekstissä ei ole Rue Saint-Denistä
   eikä holvikäytävää eikä 1790-lakkautusta, joten mitään ei lisätty. Temple-tekstissä ei ole vaatetoria. Galerie-tekstissä ei ole
   sähkökäyttöisiä siltoja eikä 15 000 hevosta, ja purku on jo "1900-luvun alussa". Orsayssa ei ole 1838:aa eikä 60 m²:ä.
   Halles-tekstissä ei ole Zolan lempinimilausetta (vain Zolan oma lainaus romaanista).

## Kuvavalinnat (yksi per juttu, kaikki CC0/PD, lisenssi luettu File-sivulta ja kuva katsottu)
| Juttu | Kuva | Lisenssi |
|---|---|---|
| Grand Châtelet | Silvestre, etsaus 1650–1660 (Carnavalet G.283) | CC0 |
| Temple-torni | tuntematon, akvatinta (Carnavalet, Paris Musées 20230619165202) | CC0 |
| Palais d'Orsay | Auguste Constantin, rauniot 1892 (Carnavalet D.455) | CC0 |
| Palais de l'Industrie | Édouard Baldus, valokuva 1850–60-l. (Met) | PD |
| Trocadéron palatsi | Trichon, kaiverrus 1878 (Brown University Library) | PD |
| Galerie des Machines | Hippolyte Blancard, valokuva n. 1889 (Carnavalet PH77410) | CC0 |
| Les Hallesin hallit | Charles Marville, valokuva 1865–1866 (Carnavalet PH10089) | CC0 |
Toista kuvaa ei lisätty mihinkään. Varakuvat ja URL:t: pariisi-7-mediapyynto-20261115.md. Kuvat eivät ole pelin mediassa
(tools/vienti/kuvamitat.json), joten PR pysyy luonnoksena mediaviennin ajan.

## Koordinaatit (ei muutettu)
Pisteet olivat valmiina ja piirrokset on tasattu niihin, joten koordinaatteja ei siirretty. Etäisyys karttapisteestä Wikipedian
koordinaatteihin (/wiki/-sivun wgCoordinates): Châtelet 45 m, Temple 132 m (fr-WP Tour du Temple 48.8642, 2.3614), Orsay 59 m,
Industrie 123 m (WP 48.8669, 2.3142), Trocadéro 28 m, Galerie 148 m (WP 48.8536, 2.3018), Les Halles 70 m (fr-WP Halles de Paris
48.8622, 2.3457). Tehtävänannon ehdotuspisteisiin: 36, 103, 37, 36, 66, 283 ja 162 m. Galerien ehdotus (48.8546, 2.2970) on
kauempana kuin nykyinen piste; nykyinen on lähempänä WP:tä. Jos KK haluaa siirrot, ne tehdään karttatyönä (piirrostasaus).

## Epävarmuudet
- **Industrie, "Toisin kuin Lontoon Kristallipalatsi, halli jäi paikalleen":** v3:n teksti, mutta hakukierroksilla 3–4 ei ole
  omaa kahden lähteen riviä tälle vertailulle. Tarkistajan kannattaa katsoa.
- **Trocadéro, "Salin akustiikka oli huono":** v2:n tilanne, ei uusittu kierroksilla 3–4.
- **Les Halles, Gaumont-Palacen urut Nogentissa** ja **Châtelet "alakerrassa" ruumishuone:** v2/v3:n tilanne, ei uusittu.
- **Temple-kuva** on ajoittamaton akvatinta, joten selite ei anna vuotta.
- **Orsay-kuva:** valittiin Constantinin CC0-piirros; Wulffin 1871-valokuvan PD-peruste on oletus (kuvaajan vuodet tuntemattomat).
- Hahmotelmatekstit (monumentit-eurooppa.js) ja nämä jutut ovat eri tekstejä; jos PR 6781 muuttuu, tarkista Industrie- ja
  Trocadéro-poikkeamat samaan suuntaan.
- Äänitys vasta KK:n hyväksyttyä tekstit (jonorivit lisätty).

## Testit
`npm test`: 5883 testiä, 5864 pass, 0 fail (loput ohitettuja). Kuvan selitteen sanakorjauksen (puupiirros → kaiverrus) jälkeen
ajettiin uudelleen nostot-kartalla, nahtavyydet ja nostokortti-media: 0 fail.
