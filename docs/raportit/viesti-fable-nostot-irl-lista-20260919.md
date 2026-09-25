# Viesti Fablelle: Irlannin hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-irl`
(pohja origin/main ec319360, v1962). **25 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 noston kenttä `visa`).

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu. Waterford Crystalin artikkelilla ei ole koordinaatteja; käytän Waterfordin kaupungin artikkelin koordinaatteja.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('IRL')`): **25/25 osuu Irlannin fokuslehteen.** **Renkaan ulkopuolella 7 rannikkokohdetta**: Achill 3,6, Slieve League 1,1, Cobh 0,9, Hook Head 2,1, Malin Head 0,8, Loop Head 0,7 ja Valentia 0,3 lautayksikköä renkaan reunasta; muut 18 sisällä.
- **Pelikaupunki: Dublin** (`cityCountry`). Lähin ehdotus on Powerscourt 10,2 (raja 7), joten yksikään ei ole kaupungin kohdalla. Dublinin merkki osuu oikein (ei siirtymää).
- **Irlannissa on jo 23 nostoa** (`nostojenKarttapaikat()`): Carrauntoohil, Irlanninmeri, Shannon, **Newgrange, Tarán kukkula, Clonmacnoise, Rock of Cashel, Skellig Michael, Céide Fields, Moherin kalliot, Kilkennyn linna, Croagh Patrick, Dún Aonghasa (Aran), Glendalough**, Dublinin syvennykset (Kellsin kirja, St James's Gate, leijona), kolme skandaalia (Pigottin kirjeet, Parnell, Ouzel Galley) sekä Ardaghin kätkö ja Suovoi.
  Siksi pyytämäsi **Cliffs of Moher, Skellig Michael, Newgrange, Rock of Cashel, Aran-saaret, Glendalough, Kilkenny ja Clonmacnoise ovat jo pelissä eivätkä ole listalla**. Uutta pyytämistäsi: Killarney, Connemara, Burren, Cobh, Bunratty, Dingle. Giant's Causeway ja Pohjois-Irlanti pois.
- **Lähimmät nykyisiin (lautayksikköä)**: **Bunratty – Shannon 5,4 (alle rajan 7; Bunratty pyysit)**, Powerscourt – Glendalough 7,2, Killarney – Carrauntoohil 7,9, Valentia – Skellig Michael 8,5; muut ≥ 9. Nostot keskenään ≥ 8,7 (New Ross – Waterford 8,7).
- **Pudotettu liian lähellä olevana**: Midleton (4,9 Cobhista), Cong (5,1 Lough Corribista), Kylemore (5,4 Connemarasta), Trim (6,0 Tarán kukkulasta), Cahir (6,6 Rock of Cashelista), Foynes (5,4 Ardaghin kätköstä), Great Blasket ja Staigue (lähellä Skelligiä/Valentiaa), Ring of Kerry.
- Ei suuria kaupunkeja: Dublin (pelikaupunki), Cork, Galway, Limerick, Waterford (kaupunkina), Kilkenny jätetty pois; kohteina esim. Waterford Crystal (tehdas), Cobh (satama), Kinsale, Skibbereen.
- Tyypit ovat pelin oman `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri / joki; muut historia, kulttuuri, ruoka, kauppa, tekniikka, merenkulku). Dingle `vuori`.
- **1873-näkökulma (Irlanti Yhdistyneessä kuningaskunnassa, nälänhädän jälkeinen aika)**: nappi-alaotsikoissa Queenstown (Cobhin nimi 1849–1920), nälänhätä 1845–52 (Skibbereen, New Ross), Birrin Leviathan-teleskooppi (3. Earl of Rosse), Valentian kaapeli (1866), Isaac Buttin Home Rule -liike (1873), Grianánin jälleenrakennus 1800-luvulla.
- Lähdesääntö: artikkelien johdanto-osat on luettu ja avainväitteet grep-tarkistettu koko artikkeleista. Vaiheessa 2 kirjoitan tekstit vain artikkelin tukemista väitteistä ja kirjaan poikkeamat.

## Lista

### Luonto (10)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-killarney | Killarney | jarvi | 52,021 / −9,5066 | Killarney National Park | Irlannin ensimmäinen kansallispuisto: Killarneyn järvet, tammi- ja marjakuusimetsät. |
| 2 | hahmotelma-connemara | Connemara | vuori | 53,5 / −9,75 | Connemara | Galwayn länsirannikon alue, Twelve Bens -vuoret ja Connachtin gaeltacht. |
| 3 | hahmotelma-burren | Burren | vuori | 53,0078 / −9,0022 | The Burren | Clarein karstimaisema, Poulnabronen dolmen ja Caherconnellin kivilinna. |
| 4 | hahmotelma-dingle | Dinglen niemimaa | vuori | 52,1933 / −10,0839 | Dingle Peninsula | Irlannin läntisin manner-kärki Dunmore Head; Corca Dhuibhne. |
| 5 | hahmotelma-corrib | Lough Corrib | jarvi | 53,4333 / −9,2333 | Lough Corrib | Tasavallan suurin järvi. |
| 6 | hahmotelma-achill | Achill | saari | 53,964 / −10,003 | Achill Island | Irlannin suurin saari (148 km²), Croaghaunin kalliot. Renkaan ulkopuolella 3,6. |
| 7 | hahmotelma-powerscourt | Powerscourtin vesiputous | joki | 53,146 / −6,211 | Powerscourt Waterfall | Irlannin toiseksi korkein vesiputous (121 m), Dargle-joki. |
| 8 | hahmotelma-slieve-league | Slieve League | vuori | 54,6381 / −8,6814 | Slieve League | Euroopan korkeimpia merikallioita (601 m). Renkaan ulkopuolella 1,1. |
| 9 | hahmotelma-malin-head | Malin Head | meri | 55,3833 / −7,3667 | Malin Head | Irlannin pohjoisin piste, Napoleonin ajan vartiotorni ja Marconin merkinantoasema (1902). Renkaan ulkopuolella 0,8. |
| 10 | hahmotelma-loop-head | Loop Head | meri | 52,561 / −9,9318 | Loop Head | Shannonin suun niemenkärki, majakka. Renkaan ulkopuolella 0,7. |

### Historia ja merenkulku (11)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 11 | hahmotelma-cobh | Cobh (Queenstown) | merenkulku | 51,851 / −8,2967 | Cobh | Siirtolaissatama, nimeltään Queenstown 1849–1920. Renkaan ulkopuolella 0,9. |
| 12 | hahmotelma-bunratty | Bunratty | historia | 52,6967 / −8,8117 | Bunratty Castle | Shannonin suun linna. **Shannon 5,4.** |
| 13 | hahmotelma-blarney | Blarney | historia | 51,9289 / −8,5708 | Blarney Castle | MacCarthyn linna, Blarneyn kivi. |
| 14 | hahmotelma-hook | Hook Head | historia | 52,1238 / −6,9293 | Hook Lighthouse | Yksi maailman vanhimmista majakoista, toiseksi vanhin toimiva. Renkaan ulkopuolella 2,1. |
| 15 | hahmotelma-kinsale | Kinsale | historia | 51,7056 / −8,5222 | Kinsale | 1601: Espanjan viimeinen armada laskeutui tänne. |
| 16 | hahmotelma-carrowmore | Carrowmore | historia | 54,2509 / −8,5192 | Carrowmore | Yli 30 säilynyttä megaliittihautaa Sligon länsipuolella; Irlannin suurimpia. |
| 17 | hahmotelma-loughcrew | Loughcrew | historia | 53,7447 / −7,1125 | Loughcrew | 4. vuosituhannen eaa. hautakumpuja kukkuloiden päällä; Meathin korkein kohta. |
| 18 | hahmotelma-new-ross | New Ross | merenkulku | 52,396 / −6,945 | New Ross | Dunbrody-nälänhätälaivan jäljennös ja Siirtolaisliekki. |
| 19 | hahmotelma-grianan | Grianán of Aileach | historia | 55,0238 / −7,4276 | Grianan of Aileach | 6.–7. vuosisadan Uí Néillin kivilinnoitus, joka on jälleenrakennettu 1800-luvulla. |
| 20 | hahmotelma-lismore | Lismore | historia | 52,1406 / −7,9325 | Lismore Castle | Linna Waterfordin läänissä, Devonshiren herttuan Irlannin koti. |
| 21 | hahmotelma-skibbereen | Skibbereen | historia | 51,5492 / −9,2675 | Skibbereen | Suuren nälänhädän (1845–52) kärsimä seutu; 8 000–10 000 uhria hautakuopissa (Abbeystrewery). |

### Kulttuuri, kauppa ja tekniikka (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 22 | hahmotelma-knock | Knock | kulttuuri | 53,7833 / −8,9167 | Knock, County Mayo | Marian pyhiinvaelluskohde; ilmestys 21.8.1879 (vasta 1879). |
| 23 | hahmotelma-waterford | Waterford Crystal | kauppa | 52,2567 / −7,1292 | Waterford Crystal | Irlantilainen kristallilasi- ja lasituottaja Waterfordissa (koordinaatit kaupungin artikkelista). |
| 24 | hahmotelma-valentia | Valentia | tekniikka | 51,9 / −10,35 | Valentia Island | Ensimmäisen kaupallisesti toimivan Atlantin lennätinkaapelin itäpää (1866). Renkaan ulkopuolella 0,3. |
| 25 | hahmotelma-birr | Birrin linna | tekniikka | 53,0954 / −7,9148 | Birr Castle | Rossen jaarlin suuri teleskooppi (3. jaarli). |

## Huomiot Fablelle

1. **Herkät kohteet (13+)**: nälänhätä (Skibbereen, New Ross): asiallisesti ilman uhrikuvia (hautakuopista vain muistomerkki); Kinsale (1601) asiallisesti.
2. **Renkaan ulkopuolella seitsemän rannikkokohdetta** (Achill, Slieve League, Cobh, Hook, Malin, Loop Head, Valentia); koordinaatit ovat Wikipedian todelliset, anchor-lukko kattaa tarvittaessa.
3. **Alle 7:n pari**: Bunratty – Shannon 5,4 (vain tämä; muut ≥ 7,2).
4. **Kuvariskit**: Grianán, Loughcrew ja Loop Head voivat olla vaikeita; varasuunnitelma Staigue (kivilinnoitus), Ardmore (pyöreä torni) tai Kylemoren luostari, jos kaksi kelvollista kuvaa ei löydy.
5. **Rahavisat**: vaiheessa 2 ~10 visaa (joka kolmas nosto, eri tyyppejä, 4 vaihtoehtoa, vastaus noston tekstistä).
