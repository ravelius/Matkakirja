# Viesti Fablelle: Irlannin hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 19.59 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-irl` (pohja origin/main ec319360, v1962). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 25 nostoa (Fablen hyväksymä lista sellaisenaan, ei korvauksia), 52 Commons-kuvaa, 10 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-irl.js` (`HAHMOTELMA_IRL`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.IRL`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-nld-rivien jälkeen.
Irlannissa on jo 17 nykyistä nostoa; uudet lisätään niiden jatkoksi, eikä mikään toista niitä (Carrauntoohil, Irlanninmeri, Shannon, Newgrange, Tarán kukkula, Clonmacnoise, Cashel, Skellig Michael, Céide Fields, Moherin kalliot, Kilkenny, Croagh Patrick, Dún Aonghasa, Glendalough ja muut ovat jo pelissä). Giant's Causeway ei ole mukana (Pohjois-Irlanti).

## Etäisyys IRL-renkaaseen

**Seitsemän rannikkokohdetta on karkean renkaan ULKOPUOLELLA** (rengas on yksinkertaistettu; koordinaatit ovat Wikipedian todelliset): Achill 3,6, Hook Head 2,1, Slieve League 1,1, Cobh 0,9, Malin Head 0,8, Loop Head 0,7, Valentia 0,3 lautayksikköä. Muut 18 ovat sisällä ja osuvat Irlannin fokuslehteen (kaikki 25 `osuuLehteen('IRL')`). Reunalla sisäpuolella Bunratty 0,2, Kinsale 0,6, Carrowmore 1,1, Grianán 1,2, Skibbereen 1,7, Dingle 2,8.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys IRL-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| killarney | Killarney | jarvi | 638 | 2 | Marco Ober, Einaz80 | CC BY-SA 4.0 | 7.1 |
| connemara | Connemara | vuori | 726 | 2 | Bernd Thaller, Lindy Buckley | CC BY 2.0 | 4.6 |
| burren | Burren | vuori | 615 | 2 | Bernard Gagnon, Limnoporus | CC BY-SA 4.0 | 7.7 |
| dingle | Dinglen niemimaa | vuori | 653 | 2 | Einaz80, David Leip | CC BY-SA 4.0, CC BY 2.0 | 2.8 |
| corrib | Lough Corrib | jarvi | 630 | 2 | JoachimKohler-HB, Herbert Ortner | CC BY-SA 4.0, CC BY 4.0 | 9.4 |
| achill | Achill | saari | 720 | 2 | Deejayw, Giuseppe Peronato | CC BY-SA 3.0, CC BY-SA 2.5 | 3.6 (ulkopuolella) |
| powerscourt | Powerscourtin vesiputous | joki | 518 | 2 | DXR, Joe King | CC BY-SA 4.0, CC BY-SA 3.0 | 4.6 |
| slieve-league | Slieve League | vuori | 609 | 2 | Superbass, Thomas Fuhrmann | CC BY-SA 4.0 | 1.1 (ulkopuolella) |
| malin-head | Malin Head | meri | 669 | 3 | Kent Wang, Jamip29, Frederic Leighton | CC BY-SA 2.0, CC BY-SA 4.0, Public domain | 0.8 (ulkopuolella) |
| loop-head | Loop Head | meri | 541 | 2 | Joseph Mischyshyn, Gordon Hatton | CC BY-SA 2.0 | 0.7 (ulkopuolella) |
| cobh | Cobh (Queenstown) | merenkulku | 655 | 2 | Andreas F. Borchert, Colin Park | CC BY-SA 4.0, CC BY-SA 2.0 | 0.9 (ulkopuolella) |
| bunratty | Bunratty | historia | 682 | 2 | DXR, Chris Light | CC BY-SA 4.0 | 0.2 |
| blarney | Blarney | historia | 646 | 2 | Gerd Eichmann, DeFacto | CC BY-SA 4.0 | 5.4 |
| hook | Hook Head | historia | 741 | 2 | Zairon, PatrickByrnePhotography | CC BY 4.0, CC BY-SA 4.0 | 2.1 (ulkopuolella) |
| kinsale | Kinsale | historia | 704 | 3 | N Chadwick, Dieglop, JoachimKohler-HB | CC BY-SA 2.0, CC BY-SA 4.0 | 0.6 |
| carrowmore | Carrowmore | historia | 687 | 2 | Cliffoney, Andreas F. Borchert | CC BY-SA 4.0 | 1.1 |
| loughcrew | Loughcrew | historia | 611 | 2 | Rob Hurson | CC BY-SA 4.0 | 19.4 |
| new-ross | New Ross | merenkulku | 612 | 2 | Gfox228, Suckindiesel | CC BY 3.0, CC BY-SA 3.0 | 6.4 |
| grianan | Grianán of Aileach | historia | 701 | 2 | Silyba, Guyw4444 | CC BY-SA 4.0 | 1.2 |
| lismore | Lismore | historia | 738 | 2 | Raúl Corral, R. Hill | CC BY-SA 3.0, Public domain | 10.3 |
| skibbereen | Skibbereen | historia | 741 | 2 | Kondephy, JohnArmagh | CC BY-SA 4.0, Public domain | 1.7 |
| knock | Knock | kulttuuri | 612 | 2 | Sinéad Mallee, PM Photography and A&D Wejcherts Architects | CC BY-SA 4.0 | 21.1 |
| waterford | Waterford Crystal | kauppa | 619 | 2 | TR001, Mutantchicken14 at English Wikipedia | CC BY 3.0, Public domain | 4.4 |
| valentia | Valentia | tekniikka | 731 | 2 | Podstawko, Phil Champion | CC BY 4.0, CC BY-SA 2.0 | 0.3 (ulkopuolella) |
| birr | Birrin linna | tekniikka | 571 | 2 | DixonD, Ingrid helena | CC BY-SA 4.0 | 34.5 |

Kuvia yhteensä 52; lisenssijakauma: CC BY-SA 4.0 29, CC BY-SA 2.0 6, CC BY-SA 3.0 4, Public domain 4, CC BY 2.0 3, CC BY 4.0 3, CC BY 3.0 2, CC BY-SA 2.5 1.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 2,0,3,0,2,0,1,2,3,1 (tasainen), vastaus noston omasta tekstistä; `fakta` on saman artikkelin muu tieto. Tyypit: jarvi ×1, vuori ×1, joki ×1, merenkulku ×1, historia ×2, kulttuuri ×1, kauppa ×1, tekniikka ×2.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| killarney | jarvi | Mikä eläinlauma elää Killarneyn puistossa ainoana Irlannin mantereella? | Punahirvilauma (2) |
| burren | vuori | Mitä nimi Burren tarkoittaa irlanniksi? | Kivistä aluetta (0) |
| powerscourt | joki | Millainen laakso Glensoulan on, jonka pohjalla Powerscourtin vesiputous sijaitsee? | Riippulaakso (3) |
| cobh | merenkulku | Miksi Cobh nimettiin Queenstowniksi vuonna 1849? | Kuningatar Victorian vierailun aikana (0) |
| hook | historia | Miksi William Marshall rakennutti tornin Hook Headille? | Ohjaamaan laivat hänen uuteen New Rossin satamaansa (2) |
| kinsale | historia | Minkä valtion sotaretkikunta nousi maihin Kinsalessa vuonna 1601? | Espanjan (0) |
| knock | kulttuuri | Ketkä katolisen uskon mukaan ilmestyivät Knockissa 21. elokuuta 1879? | Neitsyt Maria, pyhä Joosef ja pyhä Johannes (1) |
| waterford | kauppa | Ketkä perustivat Waterford Glassworksin vuonna 1783? | George Penrose ja veljenpoika William (2) |
| valentia | tekniikka | Minkä keksinnön itäinen päätepiste Valentia oli? | Atlantin ensimmäisen toimivan lennätinkaapelin (3) |
| birr | tekniikka | Miksi Birrin teleskooppi oli merkittävä valmistuttuaan vuonna 1845? | Se oli maailman suurin teleskooppi (1) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 25 |
| Teksti ≥ 200 merkkiä | 25/25 (518–741 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 25/25 |
| 2 kysymystä pululle | 25/25 |
| ≥ 2 kuvaa | 25/25 (Malin Headilla ja Kinsalella 3, muilla 2) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 52/52 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 52/52; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 52/52 |
| Korostukset löytyvät tekstistä | 25/25 |
| Fokuslehden rajaus (`osuuLehteen('IRL')`) | 25/25 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 25/25 pääkartalla, `kaupunginKohdalla` = null kaikilla (pelikaupunki Dublin; lähin Powerscourt 10,2 merkistä; Dublinin merkki on oikeassa paikassa) |
| Nostojen etäisyys nykyisiin 17 IRL-nostoon (lautayks.) | pienin **Bunratty – Shannon 5,4 (alle 7:n; Fable hyväksyi)**; Powerscourt – Glendalough 7,2, Killarney – Carrauntoohil 7,9, Valentia – Skellig Michael 8,5; muut ≥ 10,6. Nostot keskenään ≥ 8,7 (New Ross – Waterford) |
| Päällekkäisyys nykyisten IRL-nostojen kanssa | ei samoja id:itä eikä nimiä |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, ei selvästi pisin oikea (≤ 1,8 × lyhin) | 10/10 |
| `node --test tests/*.test.mjs` | # tests 3698, # pass 3685, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, teksti muutettu ja kirjattu)

1. **Pudotetut ehdokkaat lähietäisyyden takia** (ennen listaa): Midleton, Cong, Kylemore, Trim, Cahir, Foynes, Great Blasket, Staigue.
2. **Nälänhädän kohteet** (Achill, Skibbereen, New Ross, Connemara, Cobh): asiallinen faktateksti (Achillin Autio kylä, Skibbereenin muistopäivä 2009, Dunbrody-jäljennös, Siirtolaisliekki); ei uhrikuvia eikä hautoja. Skibbereenissä Abbeystreweryn hautakuopat mainitaan tekstissä lukuna, kuvina vain kaupungin keskusaukio ja katedraali. Hylätty kuvaehdokas: ILN 1847 "Funeral at Skibbereen" (kuvituskaiverrus hautajaisista).
3. **Cobh = Queenstown 1873**: nappi ja teksti käyttävät nimeä Queenstown (1849–1920); visa kysyy nimen syyn.
4. **Bunratty**: 1400-luvun tornilinna; teksti pysyy artikkelissa (1558 Radclyffe valtasi, 1956 Gort kunnosti); nappi katsoo vuodesta 1873 (ei mainitse 1956).
5. **Killarney, Connemara, Burren, Dingle**: kaikilla maisematyyppi (jarvi tai vuori); Killarneylla kirjattu 1932/1981-tiedot artikkelin mukaan.
6. **Waterford Crystal**: kaupallinen kohde (tyyppi `kauppa`); piste on Waterfordin kaupungin artikkelista (52,2567 N, 7,1292 W), koska Waterford Crystalin oma artikkeli antaa vain kaupungin. Kuvina kaiverrettu maljakko ja kristallikruunu (Commonsin kuvaus vain "Waterford Crystal Chandelier"; selitteessä ei väitetä paikkaa).
7. **Knock**: teksti ilmestyksestä 1879 uskonnollisena kertomuksena ("katolisen uskon mukaan"); nappi ei viittaa tulevaan ilmestykseen (1873 Knock on pikkukylä).
8. **Malin Head**: kolmas kuva on Frederic Leightonin maalaus (PD); sen tunnistus Malin Headiksi perustuu Commonsin otsikkoon, ei kuvaukseen. **Kinsale**: kolmas kuva Charles Fortin portti.
9. **Kuvat**: ei tunnistettavia yksityishenkilöitä (agenttien ohje ja silmäys; Skibbereenin keskusaukion kuvassa on pieni etäinen ihmisjoukko, pääaiheena kellotorni ja patsas). Lismoren 1833 puupiirroksessa on pieni kuvateksti alareunassa (PD). Dinglen kuvat ovat leveitä panoraamoja (~2,5:1). Kuvista 46 on 1920 px leveitä (Commonsin vakiokoko), pienemmät alkuperäisiä (Achill 1600, Kinsale 1024, Lismore 889, Malin Head 1500, New Ross 1200, Valentia 1600). Hylätyt ehdokkaat ovat agenttien työkansioissa (`irl_a`–`irl_e`, scratchpad).
10. **1873-näkökulma**: nappi-alaotsikot: Achill (ei siltaa vielä; silta 1887), Cobh (Queenstown), Kinsale (1601), Grianán (jälleenrakennus 1870), Lismore (goottilaistaminen 1800-luvun puolivälissä), Valentia (kaapeli 1866), Birr (Leviathan käytössä), Waterford (lasitehdas suljettu 1851), Knock (pikkukylä).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 52 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/irl/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Irlannin nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Rannikkokohteet renkaan ulkopuolella jäävät ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/irl/`: 52 kpl `irl-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
