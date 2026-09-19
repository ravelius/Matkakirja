# Viesti Fablelle: Slovenian hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 22.55 Suomen aikaa, Sonnet-sisältösessio "Sonnet 3",
haara `sonnet3-nostot-svn` (pohja origin/main 7c23d6d2, v1963). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 24 nostoa (Fablen karsima lista: Bohinj, Logarska dolina, Predjama ja Štanjel tekstien sisään), 69 Commons-kuvaa, 8 rahavisaa (PAATOKSET 51; 24/3).**
Uusi tiedosto `js/packs/hahmotelma-svn.js` (`HAHMOTELMA_SVN`, rakenne täsmälleen kuin muut EU-maiden hahmotelmat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.SVN`), `sw.js` SHELL, `tools/build-standalone.mjs`.
Kuudessa nostossa sl-Wikipedia on toisena lähteenä (en-artikkeli tynkä): velika-planina, ljubljansko-barje, ormoz, trbovlje, rogaska, ravne;
`lahde`-rivi alkaa aina `en-Wikipedia` ja kertoo molemmat artikkelit ja päivämäärän.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys Ljubljanaan (info) | etäisyys SVN-renkaaseen |
| --- | --- | --- | ---: | ---: | --- | --- | ---: | ---: |
| triglav | Triglav | vuori | 614 | 3 | Jernej Furman from Slovenia, MKrolik-WMF, Dmitry A. Mottl | CC BY 2.0, CC0, CC BY-SA 4.0 | 26.0 | 0 |
| bled | Bledinjärvi | jarvi | 688 | 2 | Jakub Hałun, Ymon | CC BY 4.0, CC0 | 18.7 | 0 |
| soca | Soča | joki | 541 | 3 | Bojan Marušič, MarcusObal, Ajznponar | CC BY-SA 4.0, CC BY-SA 3.0, CC0 | 29.0 | 0 |
| velika-planina | Velika Planina | vuori | 643 | 2 | Aleš Krivec, Smihael | CC0, CC BY-SA 4.0 | 11.1 | 0 |
| cerknica | Cerknican järvi | jarvi | 675 | 3 | Ajznponar, Janez Vajkard Valvasor | CC0, Public domain | 13.3 | 0 |
| skocjan | Škocjanin luolat | vuori | 700 | 3 | TravelingOtter, Húsönd, Ajznponar | CC BY 2.0, CC BY-SA 3.0, CC0 | 23.4 | 0 |
| postojna | Postojnan luola | vuori | 662 | 3 | Dragan Kikovic, Tuntematon tekijä, Jakub Hałun | CC BY-SA 4.0, Public domain, CC BY 4.0 | 15.2 | 0 |
| ptuj | Ptuj | historia | 674 | 3 | focusonmore.com, Andrejj, ModriDirkac | CC BY 2.0, CC BY-SA 3.0, CC BY-SA 4.0 | 47.8 | 0 |
| celje | Celjen linna | historia | 678 | 3 | Smihael, Franz von Kurz zum Thurn und Goldenstein, Žiga (tekijätieto oletettu) | CC BY-SA 3.0, Public domain | 26.4 | 0 |
| skofja-loka | Škofja Loka | historia | 704 | 3 | Bernd Thaller from Graz, Austria, Petar Milošević, Matthäus Merian | CC BY 2.0, CC BY-SA 4.0, Public domain | 8.2 | 0 |
| sticna | Stičnan luostari | historia | 706 | 3 | Miha Peče, Muzej Stična, Valvasor (vanha piirros; tekijä ei näy Commonsin metatiedoissa) | CC BY 4.0, CC BY-SA 4.0, Public domain | 11.1 | 0 |
| kobarid | Kobarid | historia | 676 | 3 | Stephen Colebourne, Dani 7C3, Ajznponar | CC BY 2.0, CC BY-SA 3.0, CC0 | 32.0 | 0 |
| ljubljansko-barje | Ljubljanan suo | historia | 644 | 3 | Yerpo, Petar Milošević, Miha Peče | CC BY-SA 3.0, CC BY-SA 4.0 | 3.4 | 0 |
| kostanjevica | Kostanjevica na Krki | historia | 749 | 3 | Julian Nyča, KAP Jasa, G-Cup | CC BY-SA 4.0 | 31.8 | 0 |
| piran | Piran | kulttuuri | 659 | 3 | Isiwal | CC BY-SA 4.0 | 38.3 | 0.5 |
| maribor | Maribor | ruoka | 624 | 3 | Janezdrilc, Palickap, Jernej Furman from Maribor, Slovenia | CC0, CC BY-SA 4.0, CC BY 2.0 | 43.4 | 0 |
| lipica | Lipica | kulttuuri | 587 | 3 | Gorupka from Slovenia, Julius von Blaas, Keith Roper | CC BY 2.0, Public domain | 26.4 | 0 |
| ormoz | Ormož | ruoka | 621 | 3 | Yerpo, Joseph Franz Kaiser, Nxr-at | CC BY-SA 4.0, Public domain | 56.6 | 0 |
| lendava | Lendava | kulttuuri | 600 | 3 | Silverije, Clemens Stockner, Gibalec at sl.wikipedia | CC0, CC BY-SA 4.0, CC BY-SA 2.5 | 68.1 | 0 |
| idrija | Idrija | tekniikka | 602 | 3 | Jani Peternelj, Luka Peternel, Wagner | CC BY 4.0, CC BY-SA 4.0, Public domain | 16.2 | 0 |
| trbovlje | Trbovlje | tekniikka | 587 | 3 | Viktar Palstsiuk, Adolf Vizjak, Tuntematon tekijä | CC BY 4.0, Public domain | 18.5 | 0 |
| rogaska | Rogaška Slatina | kulttuuri | 649 | 2 | C. Kreuzer, Franc Solina | Public domain, CC BY-SA 4.0 | 38.4 | 0 |
| ravne | Ravne na Koroškem | tekniikka | 598 | 3 | Neža Ferk, Tuntematon tekijä, Jože Gal | CC BY-SA 4.0, Public domain | 25.4 | 0 |
| velenje | Velenje | tekniikka | 601 | 3 | romanm, Tilky0808, C. Reicher | Public domain, CC BY-SA 4.0 | 23.9 | 0 |

Kuvia yhteensä 69; lisenssijakauma: CC BY-SA 4.0 23, Public domain 16, CC0 10, CC BY 2.0 8, CC BY-SA 3.0 6, CC BY 4.0 5, CC BY-SA 2.5 1.
Slovenialla ei ole pelikaupunkia eikä aiempia nostoja; etäisyys Ljubljanaan on vain tiedoksi.

## Rahavisat (8 noston kenttä `visa`, muoto kuten muissa maissa)

Neljä vaihtoehtoa, oikea-indeksit vaihtelevat (2,0,0,3,1,0,3,1), vastaus löytyy noston omasta tekstistä; `fakta` on saman
Wikipedia-artikkelin muu tieto. Tyypit: vuori, vuori (luola), 2 × historia, 2 × kulttuuri, ruoka, tekniikka (2).

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| triglav | vuori | Minä vuonna Triglavin huipulle tehtiin ensimmäinen tunnettu nousu? | 1778 (indeksi 2) |
| postojna | vuori | Kuka toimi Postojnan luolan ensimmäisenä virallisena oppaana? | Luka Čeč (indeksi 0) |
| ptuj | historia | Millä nimellä Ptuj tunnettiin roomalaisaikana? | Poetovio (indeksi 0) |
| ljubljansko-barje | historia | Mikä Ljubljanan suolta löytynyt esine on maailman vanhimpia omassa lajissaan? | Puinen pyörä akseleineen (indeksi 3) |
| piran | kulttuuri | Minkä säveltäjän ja viulistin mukaan Piranin pääaukio on nimetty? | Giuseppe Tartini (indeksi 1) |
| maribor | ruoka | Mikä on Lentissä kasvavan žametovka-köynnöksen erikoisuus? | Se on maailman vanhin viiniköynnös (indeksi 0) |
| idrija | tekniikka | Minkä toisen maan elohopeakaivoksen kanssa Idrijan kaivos on yhdessä UNESCOn maailmanperintökohde? | Espanjan Almadénin kaivoksen (indeksi 3) |
| trbovlje | tekniikka | Minä vuonna hiilenlouhinta alkoi Trbovljessa Bukova goran rinteellä? | Vuonna 1804 (indeksi 1) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 24 |
| Teksti 400–900 merkkiä, 3–8 virkettä | 24/24 (541–749 merkkiä) |
| `lahde`-rivi (en-Wikipedia + 19.9.2026) | 24/24 |
| 2 kysymystä pululle | 24/24 |
| ≥ 2 kuvaa | 24/24 (21 kohteella 3 kuvaa, Bled, Velika planina ja Rogaška Slatina 2) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 69/69 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 69/69; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (lisenssi täsmää; kuudessa PD-kuvassa Commons sanoo "Unknown author" tms., data "Tuntematon"; ei NC/ND) |
| Kuvatiedostot olemassa, JPEG, sha256-etuliite = tiedostonimen tunniste, ei orpoja | 69/69 |
| Kuvateksteissä ei lähdeviittauksia (Commons/artikkeli/tiedosto/otsikko) | 69/69 (tarkistettu koneellisesti kaikista lyhyt- ja selite-kentistä) |
| Korostukset löytyvät tekstistä | 24/24 |
| Fokuslehden rajaus (`osuuLehteen('SVN')`) | 24/24 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 24/24 pääkartalla, kohdekartalla 0 |
| Samat id:t tai nimet nykyisten nostojen kanssa | ei (SVN:llä ei ollut yhtään) |
| Visat: 4 vaihtoehtoa, eri vaihtoehdot, oikea-indeksi kelvollinen | 8/8 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node --test tests/*.test.mjs` | # tests 3707, # pass 3694, # fail 0, # skipped 13 (nimiölimitys ja `muu`-tyyppi kunnossa) |
| Kuvat katsottu | jokainen ladatuista kuvista katsottu yhteiskuvina (kontaktilehdet) ja kuva-agenttien esikatseluina; yksi pudotettu |

## Läheiset nostot

Maa on vain noin 94 lautayksikköä leveä. Alle 9 lautayksikköä toisistaan: Škocjan – Lipica 3,9, Cerknica – Postojna 6,1, Celje – Trbovlje 7,9, Celje – Velenje 8,0,
Škocjan – Postojna 8,3, Triglav – Bled 8,6. Nimiölimitystesti meni silti läpi. Lukitus (`LUKITUT_MAAT`) on velka kuten muillakin EU-mailla; kaikki 24 ovat SVN-renkaan sisällä.

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Sisällytetyt kohteet**: Triglavin tekstissä ei ole Bohinjia, Vršičiä eikä Kranjska Goraa (en-artikkeli ei mainitse niitä); Bohinjinjärvi on vain Triglavin kolmantena kuvana (kuvateksti perustuu yleistietoon, ei artikkeliin).
   Bledin tekstissä ei Vintgaria (ei en-artikkelissa). Velika planinan tekstissä ei Logarska dolinaa (ei kummassakaan artikkelissa). Postojnan tekstissä ei Predjamaa (ei en-artikkelissa), mutta Predjaman linna on kolmantena kuvana ja kuvateksti kuvaa vain sen mitä näkyy.
   Lipican tekstissä on lyhyt maininta Štanjelista (en-artikkeli "Štanjel").
2. **Tyypit** (`muu` kielletty): Triglav, Velika planina, Škocjan ja Postojna `vuori`; Bled ja Cerknica `jarvi`; Soča `joki`; Maribor ja Ormož `ruoka`; Piran, Lipica, Lendava ja Rogaška Slatina `kulttuuri`; Idrija, Trbovlje, Ravne, Velenje `tekniikka`; loput `historia`.
3. **Soča**: en-artikkelin koordinaatit osoittavat alajuoksun (45,994 N / 13,641 E, Nova Gorican seutu), ei lähdettä Trentassa; nosto on siis alajuoksulla. Isonzon rintama vain yksi lause.
4. **Velika Planina**: kappelin vuosi ristiriitainen (en 1939, sl 1938) -> "1930-luvun lopulla". **Postojna**: luolajuna 1872 ja sähkö 1884 artikkelista.
5. **Kobarid**: asiallisesti (sota yhdellä lauseella, museo, kaupunki; ei sotakuvia eikä muistokirkkoa/ossuaariota). Kysymys 1 (nimen alkuperä) ei vastaudu tekstistä vaan artikkelin Name-osiosta.
6. **Lendava**: asiallisesti (unkarilaisvähemmistö, kaksikielisyys, synagoga); Prekmurje Unkarin puolella 1873 (artikkeli: Alsólendva Zalan komitaatissa 1918 asti). Makovecz-teatteri pois.
7. **Ljubljanan suo**: en tynkä -> sl toisena lähteenä (pyörä 5 150 v, löytö 2002, paalukylä Igissä 1875). **Trbovlje**: sl-lähteestä Perkmandeljc-tonttu ja piipun mitat; sota-aika ja joukkohaudat jätetty pois.
8. **Idrija**: pitsi tekstissä mutta ei napissa (pitsikauppa alkoi 1860–1876). Visan harhavaihtoehto Freiberg on keksitty (Huancavelica ja San Luis Potosí ovat oikeita UNESCO-hakemusehdokkaita). **Ravne na Koroškem**: 1873 Kärntenissä (ei Krain/Steiermark) — nappi kertoo sen.
9. **Velenje**: hiilikaivos 1875 (nappi "vasta"); nappi "pieni kauppala linnan juurella" perustuu artikkelin vuoden 1889 lukuun (364 asukasta) — lievä päätelmä. **Rogaška Slatina**: nappi nojaa sl-artikkelin väitteeseen (Habsburgien eliitti 1800-luvun puolivälistä).
10. **Piran**: artikkeli ei mainitse Küstenlandia; nappi käyttää Itävallan liittämistä 1797 ja Tartinin patsasta 1896. **Ormož ja Maribor**: viiniaihe artikkelien tukema (ruoka-tyyppi); Mariborin köynnöksen istutusvuotta ei artikkelissa -> ei väitetä.
11. **Kuvat**: heikoimmat: Cerknica#2 (Valvasorin piirros, 1024 px), Stična#3 (Valvasorin piirros, 955 px, tekijä tyhjä), Trbovlje#3 (avolouhos, 920 px), Ravne#2 (postikortti 1095 px), Celje#2 (kuva "CeljskiGrad1", tekijätieto "Žiga assumed"), Ormož#2 (litografia 1825). Pudotettu minun päätöksellä: Rogaška#3 (lasisylinteri; kansiossa `ei-kaytossa/`). Hylätty jo haussa: Celjen linnan vesileimakuva, Postojnan luolajuna-mainoskuva.
    `lisenssiUrl` normalisoitu https-muotoon ilman loppukauttaviivaa; "CC BY-SA 2.5" (Lendavan synagoga) sisältää Commonsin `si`-paikallistuksen.
12. **Kuvatekstisääntö**: agentit ohjeistettiin uudella säännöllä (ei lähdeviittauksia lukijalle) ja tarkistus on koneellinen (69/69).
13. **Kuvakansion tapaturmat**: ei; kansiossa 69 nimeä, kaikki täsmäävät dataan.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 69 tiedostoa kansiosta `/Users/samireivinen/Matkakirja-nostot-kuvat/svn/` (EI alikansio `ei-kaytossa/`) osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole committoitu.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- SVN-nostoankkureita ei ole lukittu (`LUKITUT_MAAT` vain FRA).
- Peliä ei avattu selaimessa (paitsi kuvien kontaktilehti); piirto todettu samalla reitillä kuin muut hahmotelmat (KOHDE_MAAT) ja testit ovat vihreitä.
- Visat: vastauksen esiintyminen tekstissä on tarkistettu käsin; kysymysten oikeellisuus perustuu noston omaan tekstiin.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/svn/`: 69 kpl `svn-nosto-<id>-<sha8>.jpg`, alikansio `ei-kaytossa/` (1 pudotettu kuva).
