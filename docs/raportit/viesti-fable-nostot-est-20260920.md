# Viesti Fablelle: Viron hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 23.35 Suomen aikaa, Sonnet-sisältösessio "Sonnet 3",
haara `sonnet3-nostot-est` (pohja origin/main 39f1a2ee, v1965). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 24 nostoa (Fablen hyväksymä lista sellaisenaan), 72 Commons-kuvaa, 8 rahavisaa (PAATOKSET 51; 24/3).**
Uusi tiedosto `js/packs/hahmotelma-est.js` (`HAHMOTELMA_EST`, rakenne täsmälleen kuin muut EU-maiden hahmotelmat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.EST`), `sw.js` SHELL, `tools/build-standalone.mjs`.
Yhdeksässä nostossa et-Wikipedia on toisena lähteenä (en-artikkeli tynkä): vilsandi, endla, taevaskoja, setomaa, vormsi, poltsamaa, kunda, rapina, kardla;
`lahde`-rivi alkaa aina `en-Wikipedia` ja kertoo molemmat artikkelit ja päivämäärän.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys Tallinnaan | etäisyys EST-renkaaseen |
| --- | --- | --- | ---: | ---: | --- | --- | ---: | ---: |
| soomaa | Soomaan kansallispuisto | joki | 587 | 3 | Ruukel, Vaido Otsar, Jürgen Regel, Marian… (Panoramio) | CC BY-SA 4.0, CC BY 3.0 | 50.3 | 0 |
| vilsandi | Vilsandin kansallispuisto | saari | 643 | 3 | Ralf Tafenau, TormiTuulik, ErikAbner | CC BY-SA 3.0, CC BY-SA 4.0, CC BY 4.0 | 109.0 | 2.3 |
| endla | Endlan luonnonsuojelualue | jarvi | 603 | 3 | Abrget47j, Ivar Leidus, Sillerkiil | CC BY-SA 3.0, CC BY-SA 4.0 | 53.7 | 0 |
| taevaskoja | Taevaskoja | joki | 640 | 3 | Ilme Parik, Külli Kolina, ErikAbner | CC BY-SA 4.0, CC BY 4.0 | 100.2 | 0 |
| vortsjarv | Võrtsjärv | jarvi | 552 | 3 | Heidi Soosalu, Marks66, Estsiiri | CC BY-SA 4.0, CC BY 4.0 | 70.8 | 0 |
| muhu | Muhu | saari | 628 | 3 | Hei1972, Vaido Otsar, Fry72, Karel Frydrýšek | CC BY-SA 4.0, CC BY-SA 3.0 | 65.3 | 4.6 |
| otepaa | Otepää | jarvi | 621 | 3 | Aleksander Kaasik, HendrixEesti, Adolf Purve | CC BY-SA 3.0, Public domain | 88.9 | 0 |
| viljandi | Viljandi | historia | 633 | 3 | Otoomet, Tuntematon (kustantaja Ernst Ring) | Public domain | 59.6 | 0 |
| paldiski | Paldiski | historia | 757 | 3 | Ivar Leidus, Tuntematon (kirja 1842) | CC BY-SA 3.0, Public domain, CC BY-SA 3.0 ee | 23.9 | 0 |
| padise | Padisen luostari | historia | 774 | 3 | Madise khk, Athanasius Soter, simka | CC0, CC BY-SA 3.0 ee, CC BY-SA 3.0 | 22.9 | 0 |
| koluvere | Koluveren linna | historia | 642 | 3 | Piret Pärnpuu, Luc Saffre, Tuntematon piirtäjä; kirja: Elizabeth Rigby, A Residence on the Shores of the Baltic (1842), British Library | CC BY-SA 3.0 ee, CC BY-SA 4.0, Public domain | 34.0 | 0 |
| alatskivi | Alatskivin linna | historia | 621 | 3 | Hei1972, Tauno Erik, Ehitisennistaja | CC BY-SA 4.0, CC BY-SA 3.0 | 89.3 | 0 |
| kuremae | Kuremäen Pühtitsan luostari | historia | 692 | 3 | Vaido Otsar, Kaiti Lillipuu, Ilme Parik | CC BY-SA 4.0, CC BY-SA 3.0 ee | 93.4 | 0 |
| keila-joa | Keila-Joa | historia | 714 | 3 | AndreasToomas, Wilhelm Siegfried Stavenhagen, Kaiti Lillipuu | CC BY-SA 4.0, Public domain, CC BY-SA 3.0 ee | 15.3 | 0 |
| vasknarva | Vasknarva | historia | 714 | 3 | Ervin Pabbo, Aleksander Kaasik, Vaido Otsar | CC BY-SA 3.0 ee, CC BY-SA 3.0, CC BY-SA 4.0 | 101.8 | 1.9 |
| setomaa | Setomaa | kulttuuri | 621 | 3 | Rein Järvelill, Klarqa | CC BY-SA 3.0, CC BY-SA 4.0 | 123.3 | 0.2 |
| voru | Võru | kulttuuri | 591 | 3 | Athanasius Soter, Vaido Otsar | CC BY-SA 3.0 ee, CC BY-SA 4.0 | 107.6 | 0 |
| suure-jaani | Suure-Jaani | kulttuuri | 723 | 3 | Tiina Kangro, Ivo Kruusamägi, Kotkasulg | CC BY-SA 4.0, CC BY-SA 3.0 | 50.3 | 0 |
| vormsi | Vormsi | kulttuuri | 651 | 3 | Tiit Tõnurist/Hiiumaa Mudeliklubi, simka, Minnekon | CC BY-SA 4.0, CC BY-SA 3.0, CC BY 4.0 | 55.6 | 7.6 |
| poltsamaa | Põltsamaa | kulttuuri | 698 | 3 | Sillerkiil, Wilhelm Tusch, Kairi Kalmann | CC BY-SA 4.0, Public domain | 56.0 | 0 |
| sindi | Sindi | tekniikka | 655 | 3 | Kristian Pikner, Jaan Künnap | CC BY-SA 4.0 | 50.9 | 0 |
| kunda | Kunda | tekniikka | 635 | 3 | Kunda Nordic Tsement, Ivar Leidus | CC BY-SA 4.0, CC BY-SA 3.0 ee | 59.4 | 0 |
| rapina | Räpina | tekniikka | 526 | 3 | Paberivabrik, Kadri Niinsalu, Maris Juuse | CC BY-SA 4.0, CC BY-SA 3.0 ee | 111.6 | 0 |
| kardla | Kärdla | tekniikka | 587 | 3 | Ivo Kruusamägi, Hiiumaamudeliklubi, TriinuR | CC BY-SA 3.0 ee, CC BY-SA 4.0, CC BY-SA 3.0 | 70.3 | 18.5 |

Kuvia yhteensä 72; lisenssijakauma: CC BY-SA 4.0 30, CC BY-SA 3.0 15, CC BY-SA 3.0 ee 12, Public domain 9, CC BY 4.0 4, CC BY 3.0 1, CC0 1.
"Etäisyys Tallinnaan" on tässä taulukossa laskettu laudan koordinaateista (info); pelin passin mukaan lähin uusi nosto on 30,1 päässä (raja 7).

## Rahavisat (8 noston kenttä `visa`, muoto kuten muissa maissa)

Neljä vaihtoehtoa, oikea-indeksit vaihtelevat (2,1,2,1,2,3,3,1), vastaus löytyy noston omasta tekstistä; `fakta` on saman
Wikipedia-artikkelin muu tieto. Tyypit: joki, jarvi, 2 × historia, kulttuuri, 2 × tekniikka.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| soomaa | joki | Mitä Soomaalla tarkoitetaan "viidennellä vuodenajalla"? | Kevättulvaa, joka nostaa joet yli äyräidensä (indeksi 2) |
| vortsjarv | jarvi | Mikä joki vie Võrtsjärven vedet Peipsijärveen? | Emajõgi (indeksi 1) |
| viljandi | historia | Minkä kauppaliiton jäseneksi Viljandi liittyi 1300-luvulla, koska se oli kauppiaiden pysähdyspaikka matkalla Venäjälle? | Hansaliitto (indeksi 2) |
| paldiski | historia | Mikä Baltiiski Portin sataman ominaisuus oli syynä siihen, että sinne rakennettiin rautatie Pietarin tavaraliikennettä varten? | Satama pysyi talvellakin vapaana jäästä (indeksi 1) |
| setomaa | kulttuuri | Millä nimellä setojen monikuoroista laulutapaa kutsutaan? | Leelo (indeksi 2) |
| voru | kulttuuri | Minkä Viron kansalliseepoksen lääkäri Kreutzwald kirjoitti asuessaan Võrussa? | Kalevipoeg (indeksi 3) |
| sindi | tekniikka | Mistä kaupungista kotoisin oleva kauppias perusti Sindin tekstiilitehtaan vuonna 1833? | Riiasta (indeksi 3) |
| kunda | tekniikka | Minä vuonna Kundan sementtitehdas perustettiin? | 1870 (indeksi 1) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 24 |
| Teksti 400–900 merkkiä, 3–8 virkettä | 24/24 (526–774 merkkiä) |
| `lahde`-rivi (en-Wikipedia + 19.9.2026) | 24/24 |
| 2 kysymystä pululle | 24/24 |
| ≥ 2 kuvaa | 24/24 (kaikilla 3 kuvaa) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 72/72 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 72/72; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (lisenssi täsmää; yhdessä PD-kuvassa Commons sanoo "Unknown author", data "Tuntematon"; ei NC/ND) |
| Kuvatiedostot olemassa, JPEG, sha256-etuliite = tiedostonimen tunniste, ei orpoja | 72/72 |
| Kuvateksteissä ei lähdeviittauksia (Commons/artikkeli/tiedosto/otsikko) | 72/72 (tarkistettu koneellisesti) |
| Korostukset löytyvät tekstistä | 24/24 |
| Fokuslehden rajaus (`osuuLehteen('EST')`) | 24/24 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 24/24 pääkartalla, kohdekartalla 0 |
| Samat id:t tai nimet nykyisten EST-nostojen kanssa | ei |
| Visat: 4 vaihtoehtoa, eri vaihtoehdot, oikea-indeksi kelvollinen | 8/8 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node --test tests/*.test.mjs` | # tests 3707, # pass 3694, # fail 0, # skipped 13 (nimiölimitys ja `muu`-tyyppi kunnossa) |
| Kuvat katsottu | jokainen ladatuista kuvista katsottu yhteiskuvina (kontaktilehdet) ja kuva-agenttien esikatseluina; kuvissa ei ole tunnistettavia ihmisiä |

## Läheiset nostot ja rengas

Alle 9 lautayksikköä lähimmästä nykyisestä tai toisistaan: Alatskivi – Emajõgi 7,3, Võru – Suur Munamägi 6,9, Sindi – Pärnu 5,7, Paldiski – Padise 7,0, Paldiski – Keila-Joa 8,6.
Nimiölimitystesti menee silti läpi. **EST-renkaan ulkopuolella** ovat saaret: Vilsandi 2,3, Muhu 4,6, Vormsi 7,6, Kärdla 18,5 lautayksikköä (kaikki osuvat lehteen).
Lukitus (`LUKITUT_MAAT`) on velka kuten muillakin EU-mailla.

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Ohjeen vuodet eivät pitäneet**: Räpinan paperitehdas 1734 (ei 1728), Kärdlan kangastehdas 1830 (ei 1829; sataman 1849 ja kirkon 1863 mukaan), Põltsamaan "ensimmäinen sanomalehti 1766" on artikkelin mukaan aikakauslehti *Lühhike öppetus* (teksti sanoo "aikakauslehti").
2. **1873-napit**: Alatskivi (nykyinen linna rakennetaan 1876–85 -> "vasta"), Kuremäe (perustetaan 1891; nappi mainitsee ikonin 1500-luvulta), Otepää (Viron lippu vihitään 1884), Taevaskoja (Ahjan kartanon metsäkartta 1873 mainitsee paikannimen; kylä syntyy 1930-luvulla), Võru (Kreutzwald asuu siellä 1833–1877; kaupunki 89-vuotias),
   Viljandi/Vasknarva/Koluvere/Sindi/Kunda/Kärdla napit artikkelien vuosilukujen mukaan (Vasknarvan kirkko 1818, Koluvere tulipalo 1840, Sindi 1833 ja kaupunkioikeudet 1938 jne.).
3. **Setomaa ja Vormsi**: asiallisesti vähemmistökulttuureista (setojen leelo UNESCO 2009, kuningaskunnan päivä; rannikkoruotsalaiset), ei rajakiistoja, ei henkilökuvia. Setomaan nappi (maaorjuudesta vapautus 1861–66, nimi 1869) et-artikkelista.
4. **Lisenssit "CC BY-SA 3.0 ee"** (Viron porttaus, Commonsin oma lisenssinimi): 12 kuvaa (mm. Võru#1–2, Paldiski#3, Padise#2). Ne kelpaavat "mikä tahansa CC BY-SA -versio" -säännöllä; jos et halua, paldiskille on varana `Pakri cliff, 2011-02.jpg` (PD, pystykuva).
5. **Muhu**: lähteinä "Muhu" ja "Koguva" (koordinaatti Muhusta); Väinatamm-pengertie 1896 napissa. **Padise**: raunio salamaniskun 1766 jälkeen; kartano Ramm-suvun 1919 asti (nappi). **Sindi**: pato purettu 2018–2020 on tekstissä nykytietona (ei napissa).
6. **Viljandi**: riippusilta ei ole artikkelissa -> ei tekstissä; napin "linna oli raunio" on artikkelin (tuhoutui sodissa) päätelmä. **Vormsi/Setomaa/Põltsamaa/Kunda**: pääosa faktoista et-Wikipediasta (en tynkä).
7. **Otepää**: kaupunkioikeuksien vuosi ristiriitainen (1862/1936) -> jätetty pois; kirkkokuvan selite nimeää "Pyhän Marian kirkon" vaikka Commons sanoo vain "Otepää Church" (pieni oletus).
8. **Kuvat**: heikoimmat: Viljandi#3 (postikortti, lähde 1092 px), Paldiski#2 (piirros 1842, 1583 px), Koluvere#3 (piirros 1842, 1458 px), Keila-Joa#2 (painokuva 1866, 1071 px), Otepää#3 (vanha mustavalkoinen maisema), Räpina#2 (yökuva, tumma);
   Kunda#1–2 tekijä Commonsissa yritys "Kunda Nordic Tsement" (ilmakuvia, ei mainoskuvia). `lisenssiUrl` normalisoitu https-muotoon ilman loppukauttaviivaa.
9. **Tyypit** (`muu` kielletty): Soomaa ja Taevaskoja `joki`, Endla, Võrtsjärv ja Otepää `jarvi`, Vilsandi ja Muhu `saari`, historiakohteet `historia`, Setomaa/Võru/Suure-Jaani/Vormsi/Põltsamaa `kulttuuri`, Sindi/Kunda/Räpina/Kärdla `tekniikka`.
10. **Kuvakansion tapaturmat**: ei; kansiossa 72 nimeä, kaikki täsmäävät dataan.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 72 tiedostoa kansiosta `/Users/samireivinen/Matkakirja-nostot-kuvat/est/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole committoitu.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- EST-nostoankkureita ei ole lukittu (`LUKITUT_MAAT` vain FRA).
- Peliä ei avattu selaimessa (paitsi kuvien kontaktilehti); piirto todettu samalla reitillä kuin muut hahmotelmat (KOHDE_MAAT) ja testit ovat vihreitä.
- Visat: vastauksen esiintyminen tekstissä on tarkistettu käsin; kysymysten oikeellisuus perustuu noston omaan tekstiin.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/est/`: 72 kpl `est-nosto-<id>-<sha8>.jpg`.
