# Viesti Fablelle: Latvian ja Liettuan hahmotelmanostot valmiina (vaihe 2 ja 3)

20.9.2026, Sonnet-sisältösessio "Sonnet 3", haara `sonnet3-nostot-lva-ltu` (pohja origin/main e707f884, v1966).
Versiota ei nostettu, PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 20 + 20 nostoa (Fablen hyväksymä lista sellaisenaan), 60 + 60 Commons-kuvaa, 7 + 7 rahavisaa (PAATOKSET 51).**
Uudet tiedostot `js/packs/hahmotelma-lva.js` (`HAHMOTELMA_LVA`) ja `js/packs/hahmotelma-ltu.js` (`HAHMOTELMA_LTU`), rakenne täsmälleen kuin muut EU-maiden hahmotelmat.
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.LVA`/`KOHDE_MAAT.LTU`), `sw.js` SHELL, `tools/build-standalone.mjs`.
Kuvat: `/Users/samireivinen/Matkakirja-nostot-kuvat/lva/` (60 kpl) ja `/ltu/` (60 kpl); käyttämätön `ltu/ei-kaytossa/ltu-nosto-zagare-4af82692.jpg` (EXIF-kierto, ei mukana). Osoitteet `.../karttanostot/20260920/<iso>-nosto-<id>-<sha8>.jpg`.
Toisena lähteenä lv-/lt-Wikipedia (en-artikkeli tynkä): LVA jaunpils, dundaga, lubans, pape; LTU pakruojis, zagare, plateliai, rusne. `lahde` alkaa aina `en-Wikipedia`.
Muutokset tehtyyn listaan: Pakruojis-artikkeli on "Pakruojis Manor" (kartano; en-artikkelilla koordinaatit), Lubāns "Lake Lubāns", Panemunė käyttää koordinaattiartikkelia "Jurbarkas" (Panemunė Castle -artikkelilla ei koordinaatteja).
Kuvatekstit ilman lähdeviittauksia lukijalle (grep-tarkistettu).

## LVA: nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys kaupunkiin (Riika) | lähin vanha nosto | lähin uusi nosto |
| --- | --- | --- | ---: | ---: | --- | --- | ---: | --- | ---: |
| ventspils | Ventspils | historia | 631 | 3 | Ymblanter, Edgars Šulcs, Normunds Kolby | CC BY-SA 4.0 | 87.0 | ventas-rumba 24.1 | 26.6 |
| jurmala | Jūrmala | kulttuuri | 709 | 3 | Trogain, Olgerts V, Smiley.toerist | CC BY-SA 4.0 | 11.1 | syvennys-riika-laulujuhlat 11.0 | 8.6 |
| kemeri | Ķemeri | historia | 618 | 3 | Karlis Ustups, Егор Журавлёв from Smarde, Latvia, Misiek2 | CC BY-SA 4.0, CC BY-SA 2.0 | 19.7 | jelgava 15.9 | 8.6 |
| jaunpils | Jaunpilsin linna | historia | 802 | 3 | Julian Nyča, Wilhelm Siegfried Stavenhagen, Modris Putns | CC BY-SA 4.0, Public domain, CC BY-SA 3.0 | 37.9 | sabile 20.9 | 12.1 |
| slitere | Slītere | meri | 696 | 3 | Mikus Porietis, Dace Kundrāte, Schokifaktor | CC BY-SA 4.0 | 68.4 | kolkan-niemi 11.8 | 5.4 |
| dundaga | Dundagan linna | historia | 629 | 3 | Daarznieks, Modris Putns, Raul Kern | CC BY-SA 3.0, CC BY-SA 4.0 | 64.5 | kolkan-niemi 14.0 | 5.4 |
| talsi | Talsi | kulttuuri | 634 | 3 | EdgarsLacis, TalsiTIC, Biafra (lv-Wikipedia) | CC BY-SA 4.0, CC BY-SA 3.0 | 52.5 | sabile 9.2 | 15.3 |
| tukums | Tukums | historia | 713 | 3 | Titāns, Laima Gutmane, Marrx | CC BY-SA 4.0 | 31.8 | engure 14.4 | 12.1 |
| cesvaine | Cesvainen kartano | historia | 746 | 3 | simka, Lauratkacheva, Vaido Otsar | CC BY-SA 3.0, CC BY-SA 4.0 | 73.8 | gaizinkalns 12.9 | 20.6 |
| rezekne | Rēzekne | kulttuuri | 763 | 3 | M.Strīķis, Warschauer | CC BY-SA 3.0, CC0 | 110.0 | aglona 21.2 | 20.0 |
| kraslava | Krāslava | historia | 786 | 3 | BirdsEyeLV, Normunds K, Vadik_01 | CC BY-SA 3.0, CC BY-SA 4.0, CC BY 3.0 | 113.9 | aglona 12.8 | 30.2 |
| lubans | Lubāns | jarvi | 615 | 3 | Laima Gūtmane (simka), Kikos, Dāvis Kļaviņš | CC BY-SA 3.0, CC BY-SA 4.0, CC BY-SA 2.0 | 92.5 | aglona 30.5 | 20.0 |
| ikskile | Ikšķile | historia | 717 | 3 | Hellknowz, simka, Mārtiņš Bruņenieks | CC BY-SA 4.0, CC BY-SA 3.0 | 14.2 | syvennys-riika-jugend 14.1 | 11.6 |
| koknese | Koknese | historia | 645 | 3 | Karlis Ustups, August Matthias Hagen | CC BY-SA 4.0, Public domain | 46.3 | vainajoki 16.0 | 20.9 |
| aizpute | Aizpute | kulttuuri | 664 | 3 | Ymblanter, Kryganas, Karlis Ustups | CC BY-SA 4.0 | 84.1 | ventas-rumba 17.0 | 30.7 |
| valmiera | Valmiera | kulttuuri | 737 | 3 | Ken Eckert, AgrisR, Dor Shabashewitz | CC BY-SA 4.0, CC BY 4.0 | 52.2 | cesis 11.9 | 38.8 |
| lielvarde | Lielvārde | kulttuuri | 654 | 3 | Edgars Košovojs, Mārtiņš Bruņenieks, Laima Gūtmane | CC BY-SA 4.0, CC BY-SA 3.0 | 25.8 | skandaali-thiess-ihmissusi 20.0 | 11.6 |
| carnikava | Carnikava | ruoka | 677 | 3 | Сергей Алексеев, Egilus | CC BY 3.0, CC BY-SA 4.0 | 10.6 | syvennys-riika-laulujuhlat 10.1 | 15.8 |
| ainazi | Ainaži | merenkulku | 716 | 3 | Gunita Kolle, J. Sedols, Derbrauni | CC BY-SA 4.0, CC BY 3.0, CC BY-SA 3.0 | 44.6 | turaidan-ruusu 36.6 | 35.2 |
| pape | Pape | elain | 544 | 3 | Krauzand wiki, Draceane | CC BY-SA 4.0 | 107.8 | liepaja 14.7 | 30.7 |

Kuvia 60; lisenssijakauma: CC BY-SA 4.0 38, CC BY-SA 3.0 12, CC BY 3.0 4, CC BY-SA 2.0 2, Public domain 2, CC0 1, CC BY 4.0 1.

### LVA rahavisat (7, oikea-indeksit 0,1,3,2,0,1,3)

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| ventspils | historia | Mitä Ventspilsin nimi tarkoittaa kirjaimellisesti? | Linna Venta-joella (indeksi 0) |
| kemeri | historia | Mikä sai aikaan Ķemerin kylpylät ja parantolat 1800-luvulla? | Rikkilähteet ja parantavat mudat (indeksi 1) |
| cesvaine | historia | Minä vuonna Cesvaine mainitaan ensimmäisen kerran kirjallisissa lähteissä? | 1209 (indeksi 3) |
| lubans | jarvi | Minkä joen kautta Lubānsin vesi virtaa pois kohti Väinäjokea? | Aiviekste (indeksi 2) |
| ikskile | historia | Minä vuonna gotlantilaiset kivenhakkaajat rakensivat Ikšķilen linnan ja kirkon? | 1185 (indeksi 0) |
| lielvarde | kulttuuri | Kuinka monta muinaista symbolia perinteisessä Lielvārden vyössä on? | 22 symbolia (indeksi 1) |
| carnikava | ruoka | Mikä eläin on Carnikavan vaakunassa ja kylän pitkäaikainen ruokaerikoisuus grillattuna? | Nahkiainen (indeksi 3) |

## LTU: nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys kaupunkiin (Vilna) | lähin vanha nosto | lähin uusi nosto |
| --- | --- | --- | ---: | ---: | --- | --- | ---: | --- | ---: |
| kedainiai | Kėdainiai | kulttuuri | 662 | 3 | Laima Gūtmane (simka), Michał Derela, Napoleon Orda | CC BY-SA 3.0, CC BY-SA 4.0, Public domain | 51.8 | yhdeksas-fortti 16.0 | 27.2 |
| birzai | Biržai | historia | 782 | 3 | Dosmi, Ymblanter, Qwarc at Lithuanian Wikipedia | CC BY-SA 4.0, CC BY-SA 3.0 | 72.8 | puntukas 35.0 | 29.9 |
| telsiai | Telšiai | kulttuuri | 646 | 3 | MichalPL, Obivan Kenobi, Homo ergaster | CC BY-SA 4.0, CC0 | 117.7 | ristien-kukkula 38.9 | 12.3 |
| plunge | Plungė | historia | 557 | 3 | Zidikai1, Žemaitijos kelias, Vilensija | CC BY-SA 4.0, CC BY-SA 3.0 | 127.9 | klaipeda 25.9 | 6.3 |
| zagare | Žagarė | kulttuuri | 715 | 3 | Žagarė2002, Algirdas at Lithuanian Wikipedia | CC BY-SA 4.0, CC BY-SA 3.0 | 103.6 | ristien-kukkula 17.4 | 27.6 |
| rokiskis | Rokiškis | historia | 665 | 3 | Zidikai1, Renata3 | CC BY-SA 4.0, CC BY-SA 3.0 | 60.4 | puntukas 27.5 | 24.7 |
| pakruojis | Pakruojis | historia | 643 | 3 | Rimantas Lazdynas, Laima Gūtmane | CC BY-SA 3.0 | 76.4 | ristien-kukkula 15.5 | 27.6 |
| dzukija | Dzūkijan kansallispuisto | kulttuuri | 547 | 3 | Wojsyl, Šarūnas Šimkus, Hugo.arg | CC BY-SA 3.0, Public domain, CC BY-SA 4.0 | 41.0 | grutas-puisto 10.3 | 18.3 |
| plateliai | Plateliai | jarvi | 661 | 3 | Wojsyl, Kvitas, Fry72, Karel Frydrýšek | CC BY-SA 3.0, CC BY-SA 4.0 | 131.7 | palangan-meripihkamuseo 26.3 | 6.3 |
| rusne | Rusnė | saari | 599 | 3 | Dalyba, Lokyz, JonasS (lt.wikipedia) | CC BY-SA 3.0 | 133.1 | nosto-kursiu-nerija 12.9 | 4.3 |
| silute | Šilutė | historia | 704 | 3 | Petriukas, Adolf Stahl, Heydekrug, O.-Pr., Pegasas (lt.wikipedia) | CC BY-SA 4.0, Public domain | 130.3 | nosto-kursiu-nerija 16.6 | 4.3 |
| varniai | Varniai | kulttuuri | 658 | 3 | Laima Gūtmane (simka), Žemaitijos kelias, Algirdas (lt.wikipedia) | CC BY-SA 3.0, CC BY-SA 4.0 | 108.6 | ristien-kukkula 37.4 | 12.3 |
| panemune | Panemunė | historia | 741 | 3 | Mantas Golubevas, Steveo89, Napoleon Orda | CC BY 4.0, CC BY-SA 4.0, Public domain | 85.8 | yhdeksas-fortti 37.4 | 25.8 |
| siluva | Šiluva | kulttuuri | 777 | 3 | Zairon, J. Lukavičius | CC BY-SA 4.0, Public domain | 78.9 | ristien-kukkula 23.6 | 3.3 |
| tytuvenai | Tytuvėnai | historia | 739 | 3 | user:CD, Diliff, TytuvenuRegioninisParkas | CC BY-SA 4.0, CC BY-SA 3.0 | 81.2 | ristien-kukkula 20.8 | 3.3 |
| alytus | Alytus | kulttuuri | 627 | 3 | Juliux, Vilensija, Tuntematon | CC BY-SA 3.0, Public domain | 43.0 | grutas-puisto 17.4 | 9.4 |
| marijampole | Marijampolė | kulttuuri | 515 | 3 | Zidikai1, Bearas, Belamas | CC BY-SA 4.0, CC BY-SA 3.0 | 64.6 | nemunas 24.5 | 21.5 |
| vistytis | Vištytis | jarvi | 558 | 3 | Mbsoft, PrzemekS, Hugo.arg | CC BY 4.0, CC BY-SA 3.0, CC BY-SA 4.0 | 86.0 | nemunas 44.4 | 21.5 |
| zarasai | Zarasai | jarvi | 637 | 3 | Bloodless, Tuntematon, Vilensija | CC BY-SA 3.0, Public domain | 58.4 | aukstaitija 17.7 | 24.7 |
| birstonas | Birštonas | kulttuuri | 577 | 3 | Rudolf H. Boettcher, Martina, Anaiptol | CC BY-SA 4.0, CC BY-SA 3.0, CC0 | 42.2 | rumsiskes 13.7 | 9.4 |

Kuvia 60; lisenssijakauma: CC BY-SA 3.0 25, CC BY-SA 4.0 23, Public domain 8, CC0 2, CC BY 4.0 2.

### LTU rahavisat (7, oikea-indeksit 2,3,0,1,0,1,3)

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| kedainiai | kulttuuri | Minkä maan protestantteja muutti Kėdainiaihin 1500- ja 1600-luvuilla? | Skotlannin (indeksi 2) |
| zagare | kulttuuri | Mistä paikallisesta kivilajista Uuden Žagarėn kirkko rakennettiin vuonna 1633? | Dolomiitista (indeksi 3) |
| plateliai | jarvi | Millä kielellä Sofija Tyzenhauzaitė de Choiseul-Gouffier kirjoitti? | ranskaksi (indeksi 0) |
| rusne | saari | Minä vuonna Rusnéen rakennettiin ensimmäinen kirkko? | 1419 (indeksi 1) |
| siluva | kulttuuri | Mitä Šiluvan viimeinen kirkkoherra teki kirkon arvoesineille ja asiakirjoille kirkon sulkemisen aikoihin? | Hautasi ne rautalaatikossa kirkon lähelle (indeksi 0) |
| marijampole | kulttuuri | Minkä munkkikunnan mukaan Marijampolė on saanut nimensä? | mariaanipatereiden mukaan (indeksi 1) |
| birstonas | kulttuuri | Minä vuonna Birštonas perustettiin kylpyläksi? | vuonna 1846 (indeksi 3) |

## Huomiot

- Kaikki uudet nostot ovat ≥8 lautayksikköä Riiasta/Vilnasta (nimiölimitys, KAUPUNGIN_KOHDALLA_SADE 7) ja lähimmästä vanhasta nostosta; testit `node --test tests/*.test.mjs` 3711 testiä, 3698 läpi, 0 kaatunutta, 13 ohitettua.
- `tarkista.mjs` (tekstit, lähderivit, sha8, PD/CC-lisenssit, orvot kuvat) KAIKKI OK molemmille; `lisenssit.mjs` (Commonsin extmetadata) 60+60 kuvaa: eroja vain muotoilussa (esim. "Original uploader was X at lv.wikipedia" vs "X (lv-Wikipedia)", tekijä "Unknown author" vs "Tuntematon"); lisenssit täsmäävät kaikissa, ei NC/ND.
- LVA jaunpils#2 on Public domain -kaiverros (605 px alkuperäinen, skaalattu 1800 px; pehmeä), LTU kedainiai#3, alytus#3, zarasai#2, silute#2, panemune#3 ovat vanhoja PD-kuvia/akvarelleja (800 px alkup., skaalattu); LTU rusne#3 ja zagare#2, LVA ainazi#2 ja dundaga pääkuva myös skaalattuja (1024–1250 px lähtö).
- LVA tukums#3: kameran päivämääräleima kulmassa (ei peitä aihetta); LVA carnikava-nahkiaiskuva jätetty pois (ihmisjoukkoja).
- LTU zagare#3 ja siluva#3 (valokuva 1930) sekä LVA lielvarde vyö: nappi/teksti ei väitä 1873-ajankohtaa kuville.
- Visojen oikea-indeksit tasapainotettu (LVA 0,1,3,2,0,1,3; LTU 2,3,0,1,0,1,3).
- Uusien nostojen keskinäinen lähin etäisyys (lautayksikköä): LVA slitere–dundaga 5.4 (seuraava 8.6); LTU siluva–tytuvenai 3.3, rusne–silute 4.3, plunge–plateliai 6.3 (seuraava 9.4). Nimiölimitys- ja muut testit menevät läpi; jos näiden merkit halutaan erilleen, poistan toisen parista tai lyhennän nimiön.
