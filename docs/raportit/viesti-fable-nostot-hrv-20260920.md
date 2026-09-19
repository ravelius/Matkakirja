# Viesti Fablelle: Kroatian hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 20.18 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-hrv` (pohja origin/main ec319360, v1962). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 26 nostoa (Fablen hyväksymä lista sellaisenaan, ei korvauksia), 63 Commons-kuvaa, 10 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-hrv.js` (`HAHMOTELMA_HRV`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.HRV`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-nld-rivien jälkeen.
Kroatiassa on jo 25 nykyistä nostoa (fokuskohteet-hrv.js ja skandaalit/syvennykset); uudet lisätään niiden jatkoksi, eikä mikään toista niitä.
**Haara on tehty origin/mainin (v1962) päälle, ei Irlannin haaran päälle**: HRV-rekisteröintirivit ovat samoissa kohdissa (fokuskohteet.js, sw.js, build-standalone.mjs) kuin IRL:n, joten kun molemmat julkaistaan (v1964), rivit voivat aiheuttaa pienen mergekonfliktin, joka ratkeaa pitämällä molemmat rivit.

## Etäisyys HRV-renkaaseen

**Kymmenen saari- ja rannikkokohdetta on karkean renkaan ULKOPUOLELLA** (rengas on yksinkertaistettu; koordinaatit ovat Wikipedian todelliset): Vis 20,2, Mali Lošinj 15,7, Lastovo 12,4, Kornati 7,5, Krk 6,0, Pag 5,0, Trogir 1,1, Omiš 1,0, Rovinj 0,2, Neretva 0,1 lautayksikköä. Muut 16 ovat sisällä. Kaikki 26 osuvat Kroatian fokuslehteen (`osuuLehteen('HRV')`). Reunalla sisäpuolella Ilok 0,1, Kopački rit 0,0, Slavonski Brod 0,8, Vukovar 2,0, Kumrovec 2,4, Trakošćan 2,8.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys HRV-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| krka | Krka | joki | 597 | 2 | Skot, Falk2 | CC BY-SA 4.0 | 5.5 |
| kornati | Kornati | saari | 688 | 2 | Ivana, Bogdan Giușcă | CC BY-SA 3.0 | 7.5 (ulkopuolella) |
| lonjsko-polje | Lonjsko polje | jarvi | 509 | 3 | FrAnneser, Fraxinus Croat, Fraxinus | CC BY-SA 4.0 | 8.4 |
| kopacki-rit | Kopački rit | jarvi | 580 | 2 | Misalalic, Antimuonium | CC BY-SA 4.0 | 0 |
| krk | Krk | saari | 661 | 3 | Falk2, Arne Müseler, Viktar Palstsiuk | CC BY-SA 4.0, CC BY-SA 3.0 de | 6 (ulkopuolella) |
| vis | Vis | saari | 708 | 2 | dronepicr, Carsten Steger | CC BY 2.0, CC BY-SA 4.0 | 20.2 (ulkopuolella) |
| pag | Pag | saari | 703 | 3 | Carsten Steger, Olgierd Rudak | CC BY-SA 4.0 | 5 (ulkopuolella) |
| lastovo | Lastovo | saari | 792 | 2 | Dijana Župan | CC BY-SA 4.0 | 12.4 (ulkopuolella) |
| mali-losinj | Mali Lošinj | merenkulku | 658 | 2 | Falk2, Arne Müseler | CC BY-SA 4.0, CC BY-SA 3.0 de | 15.7 (ulkopuolella) |
| neretva | Neretvan suisto | joki | 585 | 3 | ChestnutHorse, Julien Seguinot, Ma▀▄Ga | CC BY-SA 4.0, CC BY-SA 2.0, CC BY 3.0 | 0.1 (ulkopuolella) |
| omis | Omiš | merenkulku | 733 | 3 | Bystroushaak, SchiDD, Larisa Uhryn | CC BY 4.0, CC BY-SA 4.0 | 1 (ulkopuolella) |
| motovun | Motovun | historia | 740 | 2 | Ekaterina Polischuk, Dmitry Sokolov | CC BY-SA 4.0, Public domain | 4.5 |
| trogir | Trogir | historia | 788 | 3 | Macic7, Krzysztof Bergier, Fallaner | CC BY-SA 3.0, CC BY-SA 4.0 | 1.1 (ulkopuolella) |
| rovinj | Rovinj | historia | 709 | 2 | Ekaterina Polischuk, Berthold Werner | CC BY-SA 4.0, CC BY-SA 3.0 | 0.2 (ulkopuolella) |
| vukovar | Vukovar | historia | 906 | 2 | August Dominus, Ivan Zrno | CC BY-SA 4.0, CC0 | 2 |
| varazdin | Varaždin | historia | 826 | 2 | Ptrnc7965 | CC0 | 5 |
| trakoscan | Trakošćan | historia | 673 | 2 | Maxman, Drazen Dombaj | CC BY-SA 3.0, CC BY-SA 4.0 | 2.8 |
| karlovac | Karlovac | historia | 684 | 2 | Bukovacka, Szeder László | CC BY-SA 4.0 | 7.6 |
| slavonski-brod | Slavonski Brod | historia | 729 | 2 | Petar Milošević | CC BY-SA 4.0 | 0.8 |
| sisak | Sisak | historia | 712 | 2 | Kittykay18, Darko Tepert Donatus | CC BY-SA 4.0, CC BY-SA 3.0 | 11.8 |
| ilok | Ilok | historia | 687 | 3 | Shabicht, Ernest Kramberger, Igor Karacic | CC BY-SA 4.0, Public domain, CC BY-SA 3.0 | 0.1 |
| djakovo | Đakovo | kulttuuri | 717 | 3 | Modzzak, Christian Thieltges, Tromber | CC BY-SA 3.0, CC BY-SA 4.0 | 8.3 |
| samobor | Samobor | kulttuuri | 804 | 2 | Userfriendly (englanninkielinen Wikivoyage), Miroslav.vajdic | Public domain, CC BY-SA 4.0 | 4 |
| kumrovec | Kumrovec | kulttuuri | 687 | 3 | Janezdrilc | CC0 | 2.4 |
| sinj | Sinj | kulttuuri | 705 | 3 | Argo Navis, Marko Jukić -Majkl | CC BY-SA 4.0 | 4.7 |
| durdevac | Đurđevac | kulttuuri | 602 | 3 | Zebra202, Tournasol7, Modzzak | CC BY-SA 4.0, Public domain | 4.6 |

Kuvia yhteensä 63; lisenssijakauma: CC BY-SA 4.0 38, CC BY-SA 3.0 9, CC0 6, Public domain 4, CC BY-SA 3.0 de 2, CC BY 2.0 1, CC BY-SA 2.0 1, CC BY 3.0 1, CC BY 4.0 1.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 2,0,3,1,1,0,2,3,0,2 (tasainen), vastaus noston omasta tekstistä; `fakta` on saman artikkelin muu tieto. Tyypit: joki ×1, saari ×2, merenkulku ×1, historia ×4, kulttuuri ×2.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| krka | joki | Minä vuonna Krka julistettiin kansallispuistoksi? | 1985 (2) |
| kornati | saari | Minkä saaren mukaan Kornatin saaristo on nimetty? | Kornat (0) |
| vis | saari | Kuka johti Itävallan laivastoa Lissan meritaistelussa 20. heinäkuuta 1866? | Tegetthoff (3) |
| mali-losinj | merenkulku | Minä vuonna Mali Lošinj koki kulta-aikansa, jolloin siellä oli yksitoista telakkaa? | 1868 (1) |
| trogir | historia | Minä vuonna Trogirin vanhakaupunki liitettiin Unescon maailmanperintöluetteloon? | 1997 (1) |
| rovinj | historia | Minä vuonna Rovinjin saari yhdistettiin mantereeseen täyttämällä salmi? | 1763 (0) |
| karlovac | historia | Minkä hallitsijan mukaan Karlovac on nimetty? | Arkkiherttua Kaarle II:n (2) |
| sisak | historia | Minä vuonna käytiin Sisakin taistelu, jossa ottomaanit kärsivät varhaisen tappion? | 1593 (3) |
| djakovo | kulttuuri | Kuka johti Đakovon katedraalin rakentamista vuosina 1866–1882? | Piispa Strossmayer (0) |
| sinj | kulttuuri | Minä vuonna turkkilaisten piiritys Sinjissä epäonnistui? | 1715 (2) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 26 |
| Teksti ≥ 200 merkkiä | 26/26 (509–906 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 26/26 |
| 2 kysymystä pululle | 26/26 |
| ≥ 2 kuvaa | 26/26 (kolme kuvaa yhdellätoista: Lonjsko polje, Krk, Pag, Neretva, Omiš, Trogir, Ilok, Đakovo, Kumrovec, Sinj, Đurđevac; muilla kaksi) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 63/63 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 63/63; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 63/63 |
| Korostukset löytyvät tekstistä | 26/26 |
| Fokuslehden rajaus (`osuuLehteen('HRV')`) | 26/26 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 26/26 pääkartalla, `kaupunginKohdalla` = null kaikilla (pelikaupunki Dubrovnik; lähin Neretva 26,9 merkistä; Dubrovnikin merkki 3,8 yksikköä todellisesta paikasta) |
| Nostojen etäisyys nykyisiin 25 HRV-nostoon (lautayks.) | pienin **Trogir – Split 6,3 (alle 7:n; Fable hyväksyi)**; Kopački rit – Osijek 7,3, Kornati – Pacta conventa -merkki 7,6, Lastovo – Korčula 8,3, Omiš – Split 8,6, Samobor – Zagreb 8,7; muut ≥ 10. Nostot keskenään ≥ 9,2 |
| Päällekkäisyys nykyisten HRV-nostojen kanssa | ei samoja id:itä eikä nimiä |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, ei selvästi pisin oikea (≤ 1,8 × lyhin) | 10/10 |
| `node --test tests/*.test.mjs` | # tests 3698, # pass 3685, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, tyyppi/teksti vaihdettu ja kirjattu)

1. **Tyypit vaihdettu kolmella** (artikkeli tukee toista): **Mali Lošinj** saari → `merenkulku` (artikkelin ydin on 1868: 11 telakkaa, Adrianmeren suurin kauppalaivasto); **Omiš** joki → `merenkulku` (Almissan merirosvot ja sagitta-alukset); **Ilok** ruoka → `historia` (en-artikkeli ei mainitse viiniä eikä Odescalchia; kuvina silti Odescalchin linnan piha ja viinikellari, jotka ovat Commonsissa ilmeisiä kuvia). Muilla tyyppi on listan mukainen.
2. **Lähdesäännön poisjätöt**: Lošinjin Apoxyomenos-veistos ja Pagin juusto/pitsi eivät ole artikkeleissa (vain "See also"), joten ne on jätetty tekstistä pois; Samoborin kremšnita ja sinappi samoin (artikkelissa on Livadić, Liszt 1846, kristallinhionta ja vapaa kuninkaallinen kaupunki 1242). Krkin Baškan tabletti ei ole artikkelissa; Baškasta on vain ilmakuva.
3. **Vukovar**: teksti on asiallinen (Tonavan jokisatama, Eltzin kreivit, Vučedol ja kyyhky, vapaa kuninkaallinen kaupunki 1231); sota mainitaan vain yhdellä neutraalilla lauseella ("monet rakennukset kärsivät 1990-luvun sodassa ja on kunnostettu vuoden 1998 jälkeen"). Kuvina Eltzin kartanon julkisivu ja kartano puiden takaa; sotavaurioiset kuvat ja kuvaukset hylätty. **Kumrovec** ilman Tito-kulttia: teksti ja kuvat vain Staro Selon etnologisesta museosta ja kylästä; Titoa ei mainita.
4. **Đurđevac**: en-artikkeli on lyhyt (1 801 merkkiä), teksti 602 merkkiä; kukko-symbolille ei löytynyt kelvollista kuvaa (esiintyjäkuvat hylätty), kuvina vain vanha linna kolmesta kulmasta. **Lonjsko polje**: artikkeli on 913 merkkiä; teksti 509 merkkiä; kuvina Krapjen puutalokatu, haikarat ja Savan tulva-alue (agentti korvasi "kyyhkyset" haikaroilla).
5. **Đakovo**: kuvissa ei ole lipizzanhevosia (ei kelvollista kuvaa); kolmas kuva on oritilan tallin portti hevossiluetteineen. Teksti kertoo lipizzanit artikkelin mukaan (1805).
6. **Kuvat**: ei tunnistettavia yksityishenkilöitä (agenttien ohje ja silmäys; Đakovon katedraali- ja Kumrovecin kylänkatukuvassa muutama pieni etäinen ihminen). Omišin pääkuva on hyvin leveä panoraama (~2,1:1); varana Mirabella rannalta. Neretvan kolmannessa kuvassa (lađe Metkovićissa) sementtisiilon kyljessä pieni Cemex-logo; kuvan voi pudottaa. Krkin (saari) Baškan ilmakuvan lisenssi "CC BY-SA 3.0 de" (Commonsin arvo). Ilokin viinikellarikuvan Commons-nimi on vain "Ilok vinski podrum"; selite kertoo vain mitä kuvassa näkyy.
7. **1873-näkökulma**: nappi-alaotsikot: Vis (Lissan taistelu 1866), Mali Lošinj (kultavuosi 1868), Karlovac ja Slavonski Brod (Sotilasraja), Đakovo (katedraali rakenteilla 1866–82), Trakošćan (Draškovićit herättävät linnan uuteen elämään), Ilok (Sremin läänin piirikaupunki), Samobor (Liszt 1846), Trogir (hiippakunta lakkautettu 1828), Kornati (Murterin asukkaat ostavat saaret vasta 1800-luvun lopulla), Vukovar (Tonavan kauppakaupunki), Sinj (Itävallan Dalmatia).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 63 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/hrv/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Kroatian nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Renkaan ulkopuoliset saari- ja rannikkokohteet jäävät ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/hrv/`: 63 kpl `hrv-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
