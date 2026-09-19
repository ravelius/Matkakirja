# Vanhat kuvattomat nostot, Eurooppa: erä 1 (CHE, NOR, GBR, ISL, TUR)

Haara `sonnet-vanhat-kuvat-eur` (pohja origin/main v1967). Ei julkaisua: ei versionumeroa, PR:ää, ämpäriin latausta eikä Raamattu-muutoksia. Kuvat odottavat kansiossa `/Users/samireivinen/Matkakirja-nostot-kuvat/vanhat-eur/` (108 tiedostoa, 1800 px leveitä tai alkuperäisen levyisiä; osoite `karttanostot/20260920/`, nimi `<iso>-nosto-<id>-<sha8>.jpg`, sha8 tarkistettu koneella).

## Audit

- Eurooppa yhteensä 1111 nostoa, **248 ilman `kuva`-kenttää** (AUT 15, BGR 3, BIH 4, CHE 16, CYP 11, CZE 9, DNK 16, ESP 13, EST 8, FIN 4, FRA 9, GBR 12, GRC 1, IRL 13, ISL 16, ITA 3, LTU 14, LVA 15, NLD 11, NOR 9, POL 5, PRT 11, ROU 4, SWE 13, TUR 6–7, UKR 6). Yli 80, joten tämä erä on vain CHE, NOR, GBR, ISL, TUR (59 kohdetta).
- **Rikkinäisiä kuvaosoitteita ei ole**: kaikki 179 vanhan muodon Commons-tiedostoa löytyy Commonsista ja kaikki 1662 ämpäriosoitetta antaa HEAD 200. Vika on aina puuttuva kenttä.
- Näiden pakkojen ylätunnisteissa kuvattomuus oli tietoinen valinta ("tarkistamaton Commons-tiedosto olisi huonompi kuin kuvaton kortti"); ylätunnisteet on päivitetty.

## Tulos

Kuva-agentit (Sonnet) löysivät kahden kelvollisen kuvan parin kaikille 59:lle. **54 nostoa sai kuvat**, 5 jätettiin tarkoituksella ilman:
- GBR/crystal-palace
- GBR/vanha-london-bridge
- TUR/halikarnassos
- TUR/hippodromi
- TUR/pergamonin-alttari

Syy: `tests/fokusvirta.test.mjs` ("kadonneella ei ole valokuvaa", omistajan sääntö 27.8.2026) vaatii, että kadonneen ihmeen/kohteen ainoa kuva on ihmekuva. Kuvat on poistettu kansiosta. Jos omistaja haluaa historiallisen piirroksen/litografian myös kadonneille, testin sääntö pitää muuttaa; kysy Fablelta. Kaikilla 5:llä oli valmiit PD-ehdokkaat (esim. Crystal Palace -litografiat, de Jonghin London Bridge -maalaus), jotka löytyvät agenttien JSONeista scratchpadilta.

Muuta:
- Kaikki 2 kuvaa/nosto, ei kolmansia; lisenssit vain PD/CC0/CC BY/CC BY-SA, tekijä ja lisenssi Commonsin rajapinnasta; ei yksityishenkilöitä lähikuvassa, ei väkivaltaa, ei alastomuutta (Pergamonin friisi jäi pois kadonnut-säännön takia).
- Kuvaselitteissä ei lähdeviittauksia lukijalle.
- Grand-St-Bernard: bernhardinkoirakuvaa ei löytynyt kelvollisena (kuvissa henkilö pääaiheena), joten kuvat esittävät hospitaalia.
- Testit: `node --test tests/*.test.mjs` → 3716 testiä, 3703 läpi, 0 kaatunut, 13 ohitettu (sama kuin ennen muutosta). `tarkista-kaksoisavaimet`: ei kaksoisavaimia.

## Taulukko maa / nosto / ennen / jälkeen

| Maa | Nosto | Ennen | Jälkeen |
|---|---|---|---|
| CHE | dufourspitze | ei kuvaa | 2 kuvaa: Ximonic (Simo Räsänen) (CC BY-SA 4.0); Carsten Steger (CC BY-SA 4.0) |
| CHE | matterhorn | ei kuvaa | 2 kuvaa: Ximonic (Simo Räsänen) (CC BY-SA 4.0); Giles Laurent (CC BY-SA 4.0) |
| CHE | jungfrau | ei kuvaa | 2 kuvaa: Dirk Beyer (CC BY-SA 3.0); Albinfo (CC BY-SA 3.0) |
| CHE | rein | ei kuvaa | 2 kuvaa: JoachimKohler-HB (CC BY-SA 4.0); Albinfo (CC BY 4.0) |
| CHE | rhone | ei kuvaa | 2 kuvaa: Jamcib (CC BY-SA 3.0); Tiia Monto (CC BY-SA 3.0) |
| CHE | kapellbrucke | ei kuvaa | 2 kuvaa: Ikiwaner (CC BY-SA 3.0); Dennis G. Jarvis (CC BY-SA 2.0) |
| CHE | stiftsbibliothek | ei kuvaa | 2 kuvaa: Martin Thurnherr (CC BY-SA 4.0); Bobo11 (CC BY-SA 4.0) |
| CHE | chillon | ei kuvaa | 2 kuvaa: Christian David (CC BY-SA 4.0); Llez (CC BY-SA 3.0) |
| CHE | gotthardin-tunneli | ei kuvaa | 2 kuvaa: Kecko (CC BY 2.0); Giorgio Sommer (CC BY-SA 4.0) |
| CHE | grand-st-bernard | ei kuvaa | 2 kuvaa: Ludovic Péron (CC BY-SA 3.0); Olaf brandt (CC BY 4.0) |
| CHE | zytglogge | ei kuvaa | 2 kuvaa: Sandstein (Public domain); tuntematon (Public domain) |
| CHE | la-chaux-de-fonds | ei kuvaa | 2 kuvaa: Jérémy Toma (CC BY-SA 4.0); Tomleighmartin (CC0) |
| CHE | gruyeres | ei kuvaa | 2 kuvaa: JoachimKohler-HB (CC BY-SA 4.0); Christian David (CC BY-SA 4.0) |
| CHE | rutli | ei kuvaa | 2 kuvaa: Daniel Reust (CC BY 4.0); François Diday (Public domain) |
| CHE | landwasserin-viadukti | ei kuvaa | 2 kuvaa: Ikiwaner (CC BY-SA 3.0); Capricorn4049 (CC BY-SA 4.0) |
| CHE | reininputous | ei kuvaa | 2 kuvaa: Christian David (CC BY-SA 4.0); Hansueli Krapf (CC BY-SA 4.0) |
| NOR | norjanmeri | ei kuvaa | 2 kuvaa: MODIS Rapid Response Team, NASA GSFC (Public domain); K1008 (CC0) |
| NOR | barentsinmeri | ei kuvaa | 2 kuvaa: MattiPaavola (CC BY-SA 3.0); magnethy (CC BY 2.0) |
| NOR | roros | ei kuvaa | 2 kuvaa: Geir Hval (CC BY-SA 4.0); Henrik Dvergsdal (CC BY-SA 3.0) |
| NOR | altankalliopiirrokset | ei kuvaa | 2 kuvaa: Hans A. Rosbach (CC BY-SA 3.0); Tore Sætre (CC BY-SA 4.0) |
| NOR | nordkapp | ei kuvaa | 2 kuvaa: Peder Balke (Public domain); Hanspeter Hofer (CC BY-SA 4.0) |
| NOR | nidaros | ei kuvaa | 2 kuvaa: Leonhard Lenz (CC0); Ad Meskens (CC BY-SA 4.0) |
| NOR | vemork | ei kuvaa | 2 kuvaa: G.Lanting (CC BY 3.0); tuntematon (Public domain) |
| NOR | flamsbana | ei kuvaa | 2 kuvaa: Henning Klokkeråsen from Oslo, Norway (CC BY 2.0); Alasdair McLellan (Public domain) |
| NOR | eidsvoll | ei kuvaa | 2 kuvaa: Asgeir Kolberg (CC BY 2.0); Øyvind Holmstad (CC BY-SA 4.0) |
| GBR | bennevis | ei kuvaa | 2 kuvaa: Thincat (Public domain); HikingisKing (CC BY-SA 4.0) |
| GBR | snowdon | ei kuvaa | 2 kuvaa: Peter S (CC BY-SA 2.0); Julian Herzog (Website) (CC BY 4.0) |
| GBR | pohjanmeri | ei kuvaa | 2 kuvaa: Colin Smith (CC BY-SA 2.0); Les Hull (CC BY-SA 2.0) |
| GBR | irlanninmeri | ei kuvaa | 2 kuvaa: TXGemGem (CC BY-SA 4.0); Glyn Baker (CC BY-SA 2.0) |
| GBR | thames | ei kuvaa | 2 kuvaa: Diliff (CC BY-SA 3.0); Diliff (CC BY-SA 3.0) |
| GBR | stonehenge | ei kuvaa | 2 kuvaa: Diego Delso (CC BY-SA 4.0); John Constable (Public domain) |
| GBR | hadrianuksen-muuri | ei kuvaa | 2 kuvaa: Steven Fruitsmaak (Public domain); Steven Fruitsmaak (Public domain) |
| GBR | skara-brae | ei kuvaa | 2 kuvaa: Ekrem Canli (CC BY-SA 4.0); Ymblanter (CC BY-SA 4.0) |
| GBR | ironbridge | ei kuvaa | 2 kuvaa: Nilfanion (CC BY-SA 4.0); Thomas Frederick Burney (CC0) |
| GBR | bathin-roomalaiset-kylpylat | ei kuvaa | 2 kuvaa: Diliff (CC BY 2.5); Simon Burchell (CC BY-SA 4.0) |
| ISL | gronlanninmeri | ei kuvaa | 2 kuvaa: Jerzy Strzelecki (CC BY 3.0); NASA Goddard Space Flight Center (Public domain) |
| ISL | jorsa | ei kuvaa | 2 kuvaa: Christian Bickel (CC BY-SA 2.0 de); Salvör Gissurardóttir (Public domain) |
| ISL | thingvellir | ei kuvaa | 2 kuvaa: W. G. Collingwood (Public domain); Diego Delso (CC BY-SA 4.0) |
| ISL | reykholt | ei kuvaa | 2 kuvaa: TommyBee (Public domain); RG72 (CC BY-SA 4.0) |
| ISL | geysir | ei kuvaa | 2 kuvaa: Chmee2/Valtameri (CC BY-SA 3.0); Diego Delso (CC BY-SA 4.0) |
| ISL | eiriksstadir | ei kuvaa | 2 kuvaa: EinarrMan (CC BY-SA 4.0); Wolfgang Sauber (CC BY-SA 3.0) |
| ISL | holar | ei kuvaa | 2 kuvaa: tuntematon (Public domain); Villy Fink Isaksen (CC BY-SA 4.0) |
| ISL | heimaey | ei kuvaa | 2 kuvaa: Diego Delso (CC BY-SA 4.0); Diego Delso (CC BY-SA 4.0) |
| ISL | latrabjarg | ei kuvaa | 2 kuvaa: Richard Bartz (CC BY-SA 3.0); Boaworm (CC BY 3.0) |
| ISL | lakagigar | ei kuvaa | 2 kuvaa: Chmee2/Valtameri (CC BY-SA 3.0); Areuland (CC BY 4.0) |
| ISL | snaefellsjokull | ei kuvaa | 2 kuvaa: Anjali Kiggal (CC BY-SA 4.0); Juhászlegeny (Public domain) |
| ISL | dettifoss | ei kuvaa | 2 kuvaa: Jakub Hałun (CC BY 4.0); Roger McLassus (CC BY-SA 3.0) |
| ISL | myvatn | ei kuvaa | 2 kuvaa: Bernello (CC BY-SA 4.0); Arian Zwegers (CC BY 2.0) |
| ISL | vatnajokull | ei kuvaa | 2 kuvaa: DCheretovich (CC0); Zairon (CC BY-SA 3.0) |
| ISL | grimsey | ei kuvaa | 2 kuvaa: MosheA (CC BY-SA 2.5); Andrii Gladii (CC BY-SA 4.0) |
| ISL | skalholt | ei kuvaa | 2 kuvaa: Gerd Eichmann (CC BY-SA 4.0); VillageHero from Ulm, Germany (CC BY-SA 2.0) |
| TUR | marmaranmeri | ei kuvaa | 2 kuvaa: Alexey Komarov (CC BY 3.0); Visem (CC BY-SA 4.0) |
| TUR | valimeri | ei kuvaa | 2 kuvaa: Alexkom000 (CC BY 4.0); Haluk Comertel (CC BY 3.0) |
| TUR | frat | ei kuvaa | 2 kuvaa: Carole Raddato (CC BY-SA 2.0); Bernard Gagnon (CC BY-SA 3.0) |
| GBR | crystal-palace | ei kuvaa | ei kuvaa (kadonnut, ihmekuva-sääntö) |
| GBR | vanha-london-bridge | ei kuvaa | ei kuvaa (kadonnut, ihmekuva-sääntö) |
| TUR | halikarnassos | ei kuvaa | ei kuvaa (kadonnut, ihmekuva-sääntö) |
| TUR | hippodromi | ei kuvaa | ei kuvaa (kadonnut, ihmekuva-sääntö) |
| TUR | pergamonin-alttari | ei kuvaa | ei kuvaa (kadonnut, ihmekuva-sääntö) |

## Jäljellä (odottaa Fablen ohjetta)

Muut maat: yhteensä 248 − 59 = 189 kuvatonta (suurimmat AUT 15, DNK 16, LTU 14, LVA 15, IRL 13, ESP 13, SWE 13, CYP 11 vanhaa, NLD 11, PRT 11). Kadonneiden kohteiden sääntö on ratkaistava ensin: montako näistä on kadonneita ihmeitä?
