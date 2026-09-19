# Viesti Fablelle: Itävallan hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 17.45 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-aut` (pohja origin/main 88f43233, v1956). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 29 nostoa (Fablen hyväksymä lista, ei korvauksia; Ferlach, Steyr, Hall in Tirol ja Millstätter See saivat kaikki kaksi kelvollista kuvaa, joten Wolfgangsee/Bad Aussee -varasuunnitelmaa ei tarvittu), 71 Commons-kuvaa.**
Uusi tiedosto `js/packs/hahmotelma-aut.js` (`HAHMOTELMA_AUT`, rakenne täsmälleen kuin
hahmotelma-fra.js ja muut EU-pakat). Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.AUT`),
`sw.js` SHELL, `tools/build-standalone.mjs`. HUOM: haara on v1956:n päällä ilman ITA-, DEU-, PRT- ja GRC-rivejä, joten
rekisteröintirivit tulevat hahmotelma-fra-rivien jälkeen samoihin kohtiin kuin niiden — merge tuottaa triviaalin
konfliktin, ja kaikki rivit jäävät.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | lähin pelikaupunki (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| neusiedl | Neusiedlinjärvi | jarvi | 631 | 2 | Dguendel, Jakub Hałun | CC BY 3.0, CC BY-SA 4.0 | wien 19.5 |
| woerthersee | Wörthersee | jarvi | 679 | 2 | Carsten Steger, Chillibiene | CC BY-SA 4.0 | wien 100.2 |
| traunsee | Traunsee | jarvi | 552 | 2 | Sjunnesson, tuntematon | CC BY-SA 4.0, Public domain | wien 87.7 |
| zell-am-see | Zell am See | jarvi | 583 | 2 | Frans Berkelaar, Arne Müseler | CC BY 2.0, CC BY-SA 3.0 de | wien 125.6 |
| millstatt | Millstätter See | jarvi | 661 | 2 | Johann Jaritz, J. W. Valvasor | CC BY-SA 4.0, Public domain | wien 111.1 |
| oetscher | Ötscher | vuori | 327 | 2 | C.Stadler/Bwag, Haeferl | CC BY-SA 4.0, CC BY-SA 3.0 | wien 42.4 |
| grossvenediger | Großvenediger | vuori | 654 | 3 | tekijä tuntematon, Whgler, Anton Hansch | Public domain, CC BY-SA 4.0 | wien 142.7 |
| mariazell | Mariazell | historia | 686 | 2 | Uoaei1 | CC BY-SA 4.0, CC BY-SA 3.0 | wien 40.3 |
| heiligenkreuz | Heiligenkreuzin luostari | historia | 640 | 2 | A. Stein ja F. Wolf, Wolfgang Sauber | Public domain, CC BY-SA 3.0 | wien 10.8 |
| kremsmuenster | Kremsmünsterin luostari | historia | 605 | 2 | Carsten Steger, Isiwal | CC BY-SA 4.0, CC BY-SA 3.0 | wien 75.7 |
| admont | Admontin luostari | historia | 683 | 2 | Jorge Royan, C.Stadler/Bwag | CC BY-SA 3.0, CC BY-SA 4.0 | wien 69.7 |
| hochosterwitz | Hochosterwitz | historia | 686 | 2 | Uoaei1, Johann Jaritz | CC BY-SA 4.0, CC BY-SA 3.0 | wien 89.0 |
| riegersburg | Riegersburg | historia | 671 | 3 | C.Stadler/Bwag, Asurnipal, J. F. Kaiser (Graz), skannaus Hubertl | CC BY-SA 4.0, Public domain | wien 52.8 |
| kreuzenstein | Burg Kreuzenstein | historia | 706 | 3 | Michael Kranewitter, A-F-Weiss, Anna Saini | CC BY 2.5, CC BY-SA 4.0 | wien 8.2 |
| forchtenstein | Forchtenstein | historia | 761 | 2 | C.Stadler/Bwag, Dguendel | CC BY-SA 4.0, CC BY 3.0 | wien 20.9 |
| bad-ischl | Bad Ischl | kulttuuri | 674 | 2 | Toffel, C.Stadler/Bwag | Public domain, CC BY-SA 4.0 | wien 94.3 |
| gmunden | Gmunden | kulttuuri | 555 | 2 | C.Stadler/Bwag, Isiwal | CC BY-SA 4.0 | wien 87.4 |
| kitzbuehel | Kitzbühel | kulttuuri | 623 | 2 | Ricardalovesmonuments, Dguendel | CC BY-SA 4.0, CC BY 4.0 | wien 137.3 |
| piber | Piber | ruoka | 669 | 3 | Dennis G. Jarvis, Liuthalas, Sarras | CC BY-SA 2.0, CC BY-SA 4.0, CC BY-SA 3.0 | wien 64.1 |
| eisenstadt | Eisenstadt | kulttuuri | 698 | 3 | Johann Jaritz, Martin Geisler, C.Stadler/Bwag | CC BY-SA 3.0, CC BY-SA 4.0 | wien 15.3 |
| lienz | Lienz | kulttuuri | 626 | 3 | Je-str, Lambert Oitzinger, Photochrom Print Collection | CC BY-SA 3.0, CC BY-SA 3.0 AT, Public domain | wien 134.0 |
| bregenzerwald | Bregenzerwald | kulttuuri | 679 | 3 | Böhringer Friedrich, Asurnipal | CC BY-SA 2.5, CC BY-SA 4.0 | wien 220.8 |
| steyr | Steyr | tekniikka | 636 | 3 | Isiwal, Christoph Waghubinger (Lewenstein) | CC BY-SA 4.0, CC BY-SA 3.0 | wien 66.4 |
| hall-in-tirol | Hall in Tirol | kauppa | 760 | 3 | Hermann Hammer (User:Haneburger), -wuppertaler | CC0, CC BY-SA 4.0 | wien 167.7 |
| ferlach | Ferlach | kauppa | 741 | 2 | Johann Jaritz, Schreckgespenst | CC BY-SA 4.0 | wien 99.1 |
| st-anton | St. Anton am Arlberg | kulttuuri | 735 | 3 | Keimzelle, 32-Fuß-Freak, Sammlung Risch-Lau, Vorarlberger Landesbibliothek | CC BY-SA 4.0, CC BY 4.0 | wien 209.4 |
| oberndorf | Oberndorf | historia | 747 | 3 | Michael Burgholzer, Rufus46 | CC BY-SA 4.0 | wien 115.7 |
| mayerling | Mayerling | historia | 629 | 3 | C.Stadler/Bwag, Allander, GuentherZ | CC BY-SA 4.0, Public domain | wien 11.9 |
| bad-gastein | Bad Gastein | kulttuuri | 767 | 3 | Naturpuur, Helmlechner, Man77 | CC BY-SA 4.0, CC0 | wien 121.9 |

Kuvia yhteensä 71; lisenssijakauma: CC BY-SA 4.0 37, CC BY-SA 3.0 11, Public domain 9, CC0 3, CC BY 3.0 2, CC BY 4.0 2, CC BY-SA 2.5 2, CC BY 2.0 1, CC BY-SA 3.0 de 1, CC BY 2.5 1, CC BY-SA 2.0 1, CC BY-SA 3.0 AT 1.

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 29 |
| Teksti ≥ 200 merkkiä | 29/29 (327–767 merkkiä; Ötscher on lyhin, koska artikkeli on vain 358 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 29/29 |
| 2 kysymystä pululle | 29/29 |
| ≥ 2 kuvaa | 29/29 (13 kohteella 3 kuvaa) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 71/71 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 71/71; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain), yksikään ei ole NC/ND/GFDL/FAL |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 71/71 |
| Korostukset löytyvät tekstistä | 29/29 |
| Fokuslehden rajaus (`osuuLehteen('AUT')`) | 29/29 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 29/29 pääkartalla, `kaupunginKohdalla` = null kaikilla |
| Etäisyys pelikaupunkiin (Wien) | pienin Kreuzenstein 8,2 ja Heiligenkreuz 10,8; raja 7 |
| Päällekkäisyys 29 nykyisen AUT-noston kanssa | ei samoja id:itä eikä nimiä; lähimmät nykyiset: Bad Ischl – Hallstatt 6,7 (Fable hyväksyi), Oberndorf – Hohensalzburg 7,1, Großvenediger – Krimml 7,1, Kreuzenstein – Klimt-maalaukset 7,2, Heiligenkreuz – Shakkiturkkilainen 8,2, Hall – Inn 8,3 lautayksikköä |
| Piste Itävallan maalla (pelin maailmankartan AUT-renkaat) | 29/29 (Itävallassa ei ole saaria eikä rannikkoa) |
| `node --test tests/*.test.mjs` | # tests 3663, # pass 3650, # fail 0, # skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Etäisyys AUT-renkaaseen (lautayksikköä renkaan reunasta, Fablen pyynnöstä)

Kaikki 29 ovat renkaan sisällä. Reunaa lähimpänä: Oberndorf 1,2 (Saksan raja), Forchtenstein 2,8, Ferlach 3,9, Eisenstadt 4,3,
Neusiedlinjärvi 5,4, St. Anton 5,7, Großvenediger 6,4, Wörthersee 6,9, Riegersburg 7,2; loput ovat yli 7,8 (suurin Admont 42,9).

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **St. Anton am Arlberg**: artikkelissa ei mainita Arlbergin rautatietunnelia (1880–84), joten kohde ei ole 'tekniikka' vaan
   'kulttuuri'; teksti kertoo hiihdosta, Arlbergin alueesta ja Pyhän Christophin hospiisista (1300-luku). Kuvissa on kuitenkin
   asemalaituri ja tunnelin itäportaali (Commonsin kuvaus).
2. **Bad Gastein**: artikkeli ei mainita Gasteinin sopimusta 1865, joten kohde ei ole 'hetki' vaan kylpyläkohde ('kulttuuri'):
   kylpyläkaupunki, vesiputous, Paracelsus ja keisari Frans II:n vierailu 1807.
3. **Hall in Tirol**: artikkeli ei mainita rahapajaa tai talleria, joten teksti kertoo vain suolasta (1232, kaivos 1272,
   suolaputki). Kuvissa on kuitenkin Münzturm (rahapajan torni) ja Stadtpfarrkirchen torni.
4. **Riegersburg**: listan "ei ole koskaan valloitettu" ei löytynyt artikkelista, joten sitä ei väitetä; teksti kertoo tulivuorikalliosta,
   Liechtenstein-omistajasta ja vuodesta 1122. **Kitzbühel**: "kaivoskaupunki" tuettu (illyyrialaiset kuparia 1100–800 eaa.), mutta Hahnenkamm-kuvaa
   ei löytynyt, joten kuvat ovat vanhakaupunki ja kaupunki laaksossa. **Bregenzerwald**: "säilyneet puurakennukset" ei ollut artikkelissa; teksti
   kertoo alueesta, Vorderwaldista ja Hinterwaldista sekä juustoreitistä; kuvissa on puutaloja. **Ötscher**: listan väite "korkein" pudotettu
   (artikkeli: 1 893 m, Ybbstalin Alpit).
5. **Ferlach ja Steyr** (Fablen ohje): kuvat vain kaupunki-/teollisuus-/maisemakuvia: Ferlach: Pyhän Martinin kirkon torni ja Drau/Karawankit;
   Steyr: Enns-joki ja vanhakaupunki, Museum Arbeitswelt ja Schloss Lamberg. Aseita esineinä ei ole. Tekstit mainitsevat asetehtaan (Werndl 1830)
   ja asesepäperinteen (Ferlach, aineeton kulttuuriperintö 2010) artikkelin mukaan.
6. **Kuvarajoitukset**: Zell am Seen selitteissä ei nimetä Kitzsteinhornia (ei varmistettavissa kuvista); Kitzbühelin Hahnenkamm-kuvaa ei löytynyt;
   Millstätter Seen toinen kuva on Valvasorin kaiverros luostarista (1240 px alkuperäinen). Rajattuja: Riegersburgin litografia (kehys pois),
   Großvenedigerin painokuva (kuvateksti pois), Heiligenkreuzin kivipiirros (signeeraukset pois), Lienzin Photochrom (pahvireuna ja teksti pois).
   Mayerlingin kuvat ovat luostarikappeli ja julkisivu (ei kuolinpaikkaa). Eisenstadtin mausoleumikuvassa portin takana on haudan valkoinen monumentti (ei ruumiita).
7. **Tekstit** ovat omin sanoin en-Wikipedian johdannoista ja osioista; Mayerlingin kuolemasta kerrotaan vain päivämäärä ja tapahtumapaikka,
   ei yksityiskohtia. Neusiedlinjärven nappi: "päätyjärvi" (artikkeli: endorheic), ei "arojärvi".
8. **1873-näkökulma**: nappi-alaotsikot on kirjoitettu 1873-katseella (Wörthersee: Südbahn 1863 juuri tuonut ylhäisön; Admont: 1865 tulipalo,
   jälleenrakennus kesken; Bad Ischl: keisarin kesäkaupunki 1849 alkaen; Kreuzenstein: jälleenrakennus alkaa 1874; Mayerling, Kitzbühelin hiihto
   ja Piberin lipizzanit: "tänne nousee myöhemmin…").

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 71 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/aut/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Itävallan nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Havainnekuvat odottavat.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja
  testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia tässä erässä; viisi Sonnet-kuva-agenttia (kukin omat 5–6
  kohdettaan) katsoi jokaisen ja listasi hylätyt ehdokkaat.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/aut/`: 71 kpl `aut-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
