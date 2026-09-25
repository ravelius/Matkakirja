# Viesti Fablelle: Suomen hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 21.20 Suomen aikaa, Sonnet-sisältösessio "Sonnet 3",
haara `sonnet3-nostot-fin` (pohja origin/main ec319360, v1962). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 28 nostoa (Fablen hyväksymä lista sellaisenaan), 82 Commons-kuvaa, 10 rahavisaa (PAATOKSET 51).**
Uusi tiedosto `js/packs/hahmotelma-fin.js` (`HAHMOTELMA_FIN`, rakenne täsmälleen kuin hahmotelma-nld/-dnk/-swe.js).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.FIN`), `sw.js` SHELL, `tools/build-standalone.mjs`.
Kymmenessä nostossa fi-Wikipedia on toisena lähteenä (Fablen lupa: en-artikkeli tynkä): punkaharju, aavasaksa, paijanne, lemmenjoki,
raseborg, kaustinen, kristinestad, noormarkku, varkaus, kemi. `lahde`-rivi alkaa aina `en-Wikipedia` ja kertoo molemmat artikkelit ja päivämäärän.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys lähimpään pelikaupunkiin | etäisyys FIN-renkaaseen |
| --- | --- | --- | ---: | ---: | --- | --- | ---: | ---: |
| punkaharju | Punkaharju | vuori | 641 | 3 | Ximonic (Simo Räsänen), SeppVei, Jan Ainali | CC BY-SA 4.0, Public domain, CC BY-SA 3.0 | 165.3 | 0 |
| merenkurkku | Merenkurkun saaristo | saari | 625 | 3 | Osmo Lundell, Erik Wannee | CC BY-SA 4.0 | 138.8 | 23.5 |
| pallas | Pallas-Yllästunturin kansallispuisto | vuori | 654 | 3 | Ximonic (Simo Räsänen), Fanny Schertzer | CC BY-SA 3.0 | 109.8 | 0 |
| oulanka | Oulangan kansallispuisto | joki | 657 | 3 | Jochen.wurster, Ximonic (Simo Räsänen), Heather Sunderland | CC BY-SA 3.0, CC BY 2.0 | 120.9 | 0 |
| aavasaksa | Aavasaksa | vuori | 646 | 3 | Swevixen, Htm, Clem23 | CC0, CC BY-SA 4.0, CC BY-SA 3.0 | 66.6 | 1 |
| imatra | Imatrankoski | joki | 682 | 3 | Photochrom Print Collection, Ninaraas | Public domain, CC BY 4.0 | 136.0 | 0 |
| paijanne | Päijänne | jarvi | 629 | 3 | Thorsten Waenerberg, Tiia Monto, Joonas Lyytinen | Public domain, CC BY-SA 3.0, CC BY 2.0 | 58.1 | 0 |
| lemmenjoki | Lemmenjoen kansallispuisto | joki | 662 | 3 | Ilona Simomaa, Markus Säynevirta, Nemo bis | CC BY-SA 3.0, CC BY-SA 4.0 | 114.3 | 0 |
| porvoo | Porvoo | historia | 581 | 3 | Zache, Richard Mortel from Riyadh, Saudi Arabia, Christian David | CC BY-SA 4.0, CC BY 2.0 | 28.0 | 0 |
| hamina | Hamina | historia | 704 | 3 | Olga1969, Niera, Teuvo Salmenjoki | CC BY 4.0, CC BY-SA 4.0 | 79.0 | 0 |
| tornio | Tornio | historia | 658 | 3 | Santeri Viinamäki, Estormiz, Tuntematon | CC BY-SA 4.0, CC0, Public domain | 63.0 | 0 |
| uusikaupunki | Uusikaupunki | historia | 691 | 3 | kallerna, Daderot, Tuntematon | CC BY-SA 4.0, CC0, Public domain | 85.8 | 0 |
| loviisa | Loviisa | historia | 793 | 3 | Thomas Gartz, Daniel Nyblin | CC BY-SA 4.0, CC BY 4.0 | 46.7 | 0 |
| vaasa | Vaasa | historia | 685 | 3 | Jouni Jurmu, Tuntematon (postikortin julkaisija Conrad Freese; Museovirasto), Santtu37 | CC BY-SA 4.0, Public domain | 109.4 | 0 |
| kajaani | Kajaanin linna | historia | 716 | 3 | Janne Peräaho, I. K. Inha, Tomisti | CC BY-SA 4.0, CC0 | 140.2 | 0 |
| raseborg | Raaseporin linna | historia | 694 | 3 | Pöllö, Rubenandthejets | CC BY 3.0, CC BY-SA 4.0 | 46.3 | 0.9 |
| kuhmo | Kuhmo | kulttuuri | 616 | 3 | Ninara, Akseli Gallen-Kallela | Public domain | 180.5 | 0 |
| kaustinen | Kaustinen | kulttuuri | 635 | 2 | MKFI, Alexius Manfelt | Public domain | 106.5 | 0 |
| inari | Inari | kulttuuri | 576 | 3 | Karlis Strazdins, Richard Mortel from Riyadh, Saudi Arabia, Kimberli Mäkäräinen | Public domain, CC BY 2.0, CC BY-SA 4.0 | 144.5 | 0 |
| kuopio | Kuopio | kulttuuri | 657 | 3 | Ximonic (Simo Räsänen), kallerna, Rst2000 | CC BY-SA 4.0, CC BY-SA 3.0 | 149.0 | 0 |
| kristinestad | Kristiinankaupunki | kulttuuri | 612 | 3 | Mikkoau, Kaj Höglund | CC BY-SA 4.0 | 89.6 | 0 |
| mariehamn | Maarianhamina | merenkulku | 638 | 3 | Bahnfrend, Håkan Skogsjö, Fanny Schertzer | CC BY-SA 4.0, CC BY-SA 3.0 | 145.8 | 55.5 |
| ilomantsi | Ilomantsi | kulttuuri | 618 | 3 | Niera, Hedi Witter, Saruwine | CC BY-SA 4.0, CC BY-SA 3.0 | 232.0 | 0 |
| fiskars | Fiskars | tekniikka | 658 | 3 | Teuvo Salmenjoki, Pöllö, Signe Brander | CC BY-SA 4.0, CC BY 3.0, Public domain | 46.4 | 0 |
| noormarkku | Noormarkku | tekniikka | 551 | 3 | kallerna, Pihamies | CC BY-SA 4.0 | 63.4 | 0 |
| varkaus | Varkaus | tekniikka | 657 | 3 | Pehr Adolf Kruskopf, Tiia Monto | Public domain, CC BY-SA 4.0 | 138.4 | 0 |
| kemi | Kemi | kauppa | 597 | 3 | Estormiz, Tuntematon tekijä, kallerna | CC0, Public domain, CC BY-SA 4.0 | 56.6 | 2.7 |
| nokia | Nokia | tekniikka | 654 | 2 | I. K. Inha, kallerna | Public domain, CC BY-SA 4.0 | 8.7 | 0 |

Kuvia yhteensä 82; lisenssijakauma: CC BY-SA 4.0 38, Public domain 17, CC BY-SA 3.0 12, CC0 5, CC BY 2.0 4, CC BY 4.0 3, CC BY 3.0 3.
"Etäisyys lähimpään pelikaupunkiin" on pelin oma passi (`nostojenKarttapaikat`, lautayksikköä, Helsinki/Tampere/Lappi), raja 7; lähin uusi nosto Nokia 8,7.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD, DNK ja SWE)

Neljä vaihtoehtoa, oikea-indeksit vaihtelevat (2,1,2,0,3,2,1,2,0,3), vastaus löytyy noston omasta tekstistä; `fakta` on saman
Wikipedia-artikkelin muu tieto. Tyypit: saari, joki, jarvi, 2 × historia, 2 × kulttuuri, 2 × tekniikka, kauppa.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| merenkurkku | saari | Kuinka nopeasti maa kohoaa Merenkurkun alueella? | Lähes 10 millimetriä vuodessa (indeksi 2) |
| imatra | joki | Minä vuonna Imatrankosken matkailun katsotaan alkaneen Katariina Suuren vierailusta? | 1772 (indeksi 1) |
| paijanne | jarvi | Minkä joen kautta Päijänteen vedet virtaavat Suomenlahteen? | Kymijoki (indeksi 2) |
| porvoo | historia | Kuinka suuri osa Porvoon rakennuksista tuhoutui vuoden 1760 tulipalossa? | Noin kaksi kolmasosaa (indeksi 0) |
| hamina | historia | Kuka suunnitteli Haminan tähtimäisen linnoituksen ja ympyränmuotoisen katuverkon? | Axel Löwen (indeksi 3) |
| kuhmo | kulttuuri | Kuka keräsi runoja Karjalasta kulkien Kuhmon kautta ja muokkasi osan Kalevalasta Kuhmossa? | Elias Lönnrot (indeksi 2) |
| kaustinen | kulttuuri | Minkä soittimen kuva on Kaustisen kunnan vaakunassa? | Viulu (indeksi 1) |
| fiskars | tekniikka | Kuka perusti Fiskarsin rautaruukin vuonna 1649? | Petter Thorwöste (indeksi 2) |
| kemi | kauppa | Minä vuonna Kemin kaupunki perustettiin keisarillisella asetuksella? | 1869 (indeksi 0) |
| nokia | tekniikka | Minä vuonna Idestamin yritys nimettiin Nokia Aktiebolagiksi? | 1871 (indeksi 3) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 28 |
| Teksti 400–900 merkkiä, 3–8 virkettä | 28/28 (551–793 merkkiä) |
| `lahde`-rivi (en-Wikipedia + 19.9.2026) | 28/28 |
| 2 kysymystä pululle | 28/28 |
| ≥ 2 kuvaa | 28/28 (26 kohteella 3 kuvaa, Kaustinen ja Nokia 2) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 82/82 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 82/82; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (lisenssi ja tekijä täsmäävät; neljässä PD-kuvassa Commons sanoo "Unknown author"/"Ei tiedossa", data "Tuntematon"; ei NC/ND) |
| Kuvatiedostot olemassa, JPEG, sha256-etuliite = tiedostonimen tunniste, ei orpoja | 82/82 |
| Korostukset löytyvät tekstistä | 28/28 |
| Fokuslehden rajaus (`osuuLehteen('FIN')`) | 28/28 (Merenkurkku ja Maarianhamina mukana) |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 28/28 pääkartalla, kohdekartalla 0 |
| Etäisyys pelikaupunkiin (Helsinki, Tampere, Lappi) | pienin Nokia 8,7 (Tampere); raja 7 |
| Samat id:t tai nimet nykyisten FIN-nostojen kanssa | ei |
| Visat: 4 vaihtoehtoa, eri vaihtoehdot, oikea-indeksi kelvollinen | 10/10 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node --test tests/*.test.mjs` | # tests 3698, # pass 3685, # fail 0, # skipped 13 (nimiölimitys ja `muu`-tyyppi kunnossa) |
| Kuvat katsottu | jokainen ladatuista kuvista katsottu yhteiskuvina (kontaktilehdet) ja kuva-agenttien esikatseluina; kaksi pudotettu |

## Etäisyys FIN-renkaaseen ja läheiset nostot

Pelin karkea maailmankartta (`countryShapes.FIN`): **renkaan ulkopuolella** Merenkurkku 23,5 ja Maarianhamina 55,5 lautayksikköä (Åland ja rannikko);
rannan tuntumassa (renkaan ulkopuolella) Kemi 2,7, Aavasaksa 1,0 ja Raasepori 0,9 – muut renkaan sisällä. Lukitus (`LUKITUT_MAAT`) on velka kuten muillakin EU-mailla.
Alle 9 lautayksikköä toisistaan: Raasepori – Fiskars 7,8; muuten ei päällekkäisyyksiä nykyisten FIN-nostojen kanssa
(Punkaharju–Kerimäen kirkko 9,1, Hamina–Ruotsinsalmi 9,7, Maarianhamina–Bomarsund 11,5 rajan yli).

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Punkaharju**: keisarin matka 1876 ei ole kummassakaan artikkelissa (en tynkä, fi "Punkaharju (harju)"), joten nappi käyttää artikkelin tukemia: harjumetsien suojelu 1803 (Aleksanteri I) ja kruununpuisto 1843. Tyyppi `vuori`.
2. **Aavasaksa**: en-artikkeli ohut -> fi mukana. Keisarinmaja valmistuu 1883; Aleksanteri II:n vierailu jäi toteutumatta (teksti sanoo sen sellaisenaan).
3. **Merenkurkku**: en-artikkeli "Kvarken"; nappia yksinkertaistettu (postin kuljetus jäällä ei ollut artikkelissa) -> majakka 1885 ja maailmanperintö 2006.
4. **Nokia**: puuhiomo 1865 -väitettä ei ole artikkelissa; teksti ja nappi seuraavat artikkelia: Idestamin toinen puuhiomo 1868 ja Nokia Ab -nimi 1871. Matkapuhelinhistoria vain lyhyesti "vasta 1960-luvulla". Kartanokuva (#3, CC BY 4.0, tekijä Commonsissa "tuntematon") pudotettu.
5. **Varkaus**: Paul Wahl ja valimo eivät ole kummassakaan artikkelissa (en tynkä, fi "Varkaus (kaupunki)"); teksti: salmi, teollisuus, Taipaleen kanava. en ja fi ovat ristiriidassa Ahlströmin tulosta -> ei vuosilukua. Nappi: kuntajako (kauppala vasta 1929).
6. **Kemi**: perustaminen 1869 (artikkeli); sahateollisuus vain fi-artikkelin rakennusperintöosiosta, sahoja ei yksilöidä. Sahakuva (1935–37) selitteessä sanottu myöhemmäksi kuin 1873.
7. **Lemmenjoki**: artikkeli ei kerro milloin kulta löydettiin -> nappi vain "puisto perustetaan vasta 1956".
8. **Kuopio**: kalakukko on artikkelissa (kalakukon luvattu maa), joten mukana; tyyppi `kulttuuri` (teksti kertoo kaupungista: rännikatu, Puijo, perustaminen 1775). Kalakukkokuva #3 on alkuperäisenä 800×600 (pehmeä).
9. **Inari**: asiallisesti saamelaiskulttuurista (Siida, Sajos, neljä virallista kieltä), ei henkilökuvia (ihmisiä sisältänyt Siida-julkisivukuva hylätty). Nappi: kunta perustetaan 1876.
10. **Ilomantsi**: runonlaulua ei artikkelissa -> teksti ortodoksisuudesta, Parppeinvaaran runokylästä ja Mateli Kuivalattaresta. Sotahistoria pois.
11. **Kaustinen**: en tynkä -> fi-Wikipedia mukana (kirkkolupa 1776, terva, vaakuna, Unesco 2021). Kolmas kuva (pelimanneja 1971, tunnistettavia esiintyjiä) pudotettu -> 2 kuvaa.
12. **Muita nappeja**: Porvoo (nappi yksinkertaistettu: valtiopäivät 1809 ja 1760 palon jälkeinen kaupunkisuunnitelma), Tornio (rajakaupunki, Haaparanta), Kajaani (raunio 1716, puusilta 1845, ensimmäinen korjaus 1890 — vuosiluvut agentin lukemia artikkelista),
    Raasepori (kunnostus 1880–1890-luvuilla en/fi), Uusikaupunki (hyökkäys 1855).
13. **Tyypit** (`muu` kielletty): Punkaharju, Pallas ja Aavasaksa `vuori`, Oulanka, Imatra ja Lemmenjoki `joki`, Päijänne `jarvi`, Merenkurkku `saari`, Maarianhamina `merenkulku`,
    Kuhmo/Kaustinen/Inari/Kuopio/Kristiinankaupunki/Ilomantsi `kulttuuri`, Fiskars/Noormarkku/Varkaus/Nokia `tekniikka`, Kemi `kauppa`, muut `historia`. Ruoka-tyyppiä ei ole (Kuopio ei ole ruokakohde).
14. **Kuvat**: heikoimmat mukana: Uusikaupunki#3 (1870-luvun kuva, lähde 500 px), Tornio#3 (kaapelirata, 800 px), Kuopio#3 (800 px), Uusikaupunki#2 (rauhanmitali, kuvaus perustuu kuvaan), Merenkurkku#3, Inari#3 ja Päijänne#3 leveitä panoraamoja.
    Vaasa#2 postikortti (Museovirasto, PD, tekijä "Tuntematon (Conrad Freese)"), Aavasaksa#1 ja Punkaharju#1 hyviä. Päijänne-pääkuva on maalaus (Waenerberg 1902); valokuvat ovat kuvat #2 ja #3.
    `lisenssiUrl` normalisoitu https-muotoon ilman loppukauttaviivaa.
15. **Kuvakansion tapaturmat**: ei; kansiossa 82 nimeä, kaikki täsmäävät dataan.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 82 tiedostoa kansiosta `/Users/samireivinen/Matkakirja-nostot-kuvat/fin/` (EI alikansio `ei-kaytossa/`) osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole committoitu.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- FIN-nostoankkureita ei ole lukittu (`LUKITUT_MAAT` vain FRA).
- Peliä ei avattu selaimessa (paitsi kuvien kontaktilehti); piirto todettu samalla reitillä kuin muut hahmotelmat (KOHDE_MAAT) ja testit ovat vihreitä.
- Visat: vastauksen esiintyminen tekstissä on tarkistettu käsin; kysymysten oikeellisuus perustuu noston omaan tekstiin.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/fin/`: 82 kpl `fin-nosto-<id>-<sha8>.jpg`, alikansio `ei-kaytossa/` (2 pudotettua kuvaa).
