# Viesti Fablelle: Tanskan hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 19.30 Suomen aikaa, Sonnet-sisältösessio "Sonnet 3",
haara `sonnet3-nostot-dnk` (pohja origin/main bc0996c4, v1960). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 28 nostoa (Fablen hyväksymä lista, Aarhus vaihdettu Nyborgin linnaan), 81 Commons-kuvaa, 10 rahavisaa (PAATOKSET 51).**
Uusi tiedosto `js/packs/hahmotelma-dnk.js` (`HAHMOTELMA_DNK`, rakenne täsmälleen kuin hahmotelma-nld.js).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.DNK`), `sw.js` SHELL,
`tools/build-standalone.mjs`.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys Kööpenhaminaan | etäisyys DNK-renkaaseen |
| --- | --- | --- | ---: | ---: | --- | --- | ---: | ---: |
| rubjerg-knude | Rubjerg Knude | merenkulku | 608 | 3 | Jörg Braukmann, Ansgar Koreng, Frmir | CC BY-SA 4.0, CC BY 3.0 | 124.3 | 0 |
| raabjerg-mile | Råbjerg Mile | muu | 718 | 3 | Ragnar1904, Tomasz Sienicki | CC BY-SA 4.0, CC BY 2.5 | 117.0 | 0 |
| romo | Rømø | saari | 699 | 3 | TEkman73, Hjart, Mojnsen | CC BY-SA 4.0 | 136.7 | 1.5 |
| thy | Thyn kansallispuisto | muu | 643 | 3 | Slaunger, Ragnar1904, Jens Nielsen | CC BY-SA 3.0, CC BY-SA 4.0 | 149.6 | 0 |
| mols-bjerge | Mols Bjerge | vuori | 696 | 3 | Mikkel Houmøller, Sebastian Nils, Ajepbah | CC BY-SA 4.0, CC BY-SA 3.0, CC BY-SA 3.0 de | 71.8 | 0.1 |
| himmelbjerget | Himmelbjerget | vuori | 664 | 3 | Colin, Askeuhd, Ole Jørgen Rawert | CC BY-SA 4.0, Public domain | 97.2 | 0 |
| laeso | Læsø | saari | 675 | 3 | Tomasz Sienicki, Northerner, Martinus Rørbye | CC BY 3.0, CC0, Public domain | 90.3 | 16.2 |
| bornholm | Bornholm | saari | 795 | 3 | Klugschnacker, Richardmaackphotography, Socket0 | CC BY-SA 3.0, CC BY 4.0, CC0 | 83.3 | 83.1 |
| hammershus | Hammershus | historia | 707 | 3 | Unukorno, Socket0, Fugit hora | CC BY 4.0, CC0, CC BY-SA 4.0 | 76.3 | 76.2 |
| koldinghus | Koldinghus | historia | 727 | 3 | Bengt Oberger, F.C. Kiærskou, Hjart | CC BY-SA 3.0, Public domain, CC BY-SA 4.0 | 102.7 | 0 |
| dybbol | Dybbøl | historia | 717 | 2 | Hjart, UW | CC BY-SA 4.0, Public domain | 100.3 | 1.2 |
| viborg | Viborgin tuomiokirkko | historia | 691 | 3 | Slaunger, Colin | CC BY-SA 3.0, CC BY-SA 4.0 | 110.3 | 0 |
| lejre | Lejre | historia | 713 | 3 | Lichterfelder, Västgöten, Per Meistrup | CC BY 3.0, CC BY-SA 3.0, CC BY-SA 4.0 | 19.3 | 0 |
| ringsted | Ringsted | historia | 682 | 3 | Orf3us, Leif Jørgensen | CC BY 3.0, CC BY-SA 4.0 | 27.6 | 0 |
| ladby | Ladbyn laivahauta | historia | 628 | 3 | Toxophilus, Malene Thyssen | CC BY-SA 4.0, CC BY-SA 3.0 | 65.2 | 15.9 |
| christiansfeld | Christiansfeld | historia | 789 | 3 | Villy Fink Isaksen, Hjart | CC BY-SA 4.0 | 103.1 | 0 |
| kalundborg | Kalundborg | historia | 683 | 3 | Thomas Dahlstrøm Nielsen, Jacob Kornerup, Leif Jørgensen | CC BY-SA 4.0, Public domain | 48.6 | 0 |
| odense | Odense | kulttuuri | 662 | 3 | Rüdiger Stehn, Ipigott, Jebulon | CC BY-SA 2.0, Public domain, CC0 | 73.1 | 21.2 |
| horsens | Horsens | kulttuuri | 708 | 3 | Albert Bonnier: Nordiska Taflor, pittoreska utsigter från Sverige, Norge ock Danmark (1875), XyZ32xKx8TedEOyE (Wikimedia Commons -käyttäjä), Echtner | CC0, CC BY-SA 3.0 | 90.0 | 0 |
| marstal | Marstal | merenkulku | 674 | 3 | Adolph Marius Nisted (1829-1919), Bengt Oberger, Erik Christensen | Public domain, CC BY-SA 3.0, CC BY-SA 4.0 | 77.9 | 26.3 |
| aalborg | Aalborg | ruoka | 694 | 2 | Tomasz Sienicki, seier+seier | CC BY 2.5, CC BY 2.0 | 108.6 | 0 |
| soro | Sorø Akademi | kulttuuri | 719 | 3 | Ramblersen, Toxophilus, Bob Collowan | CC BY-SA 3.0, CC BY-SA 4.0 | 35.0 | 0 |
| esbjerg | Esbjerg | kauppa | 584 | 3 | Thomas Dahlstrøm Nielsen, Jazia, Kent Madsen | CC BY-SA 4.0, CC BY-SA 2.0 | 136.7 | 0 |
| samso | Samsø | tekniikka | 644 | 3 | Jan Pešula, Atle Grimsby, DirectorOlav | CC0, CC BY-SA 3.0, CC BY-SA 4.0 | 64.7 | 13.4 |
| maribo | Maribo | kauppa | 717 | 3 | Toxophilus, Dinkum, bjaglin | CC BY-SA 4.0, CC0, CC BY 2.0 | 54.9 | 10 |
| ebeltoft | Ebeltoft | merenkulku | 655 | 3 | Lars Larsen, Gachepi, BKP | CC BY 3.0, CC BY-SA 3.0 | 66.5 | 1.8 |
| tonder | Tønder | kauppa | 639 | 2 | Hjart | CC BY-SA 4.0 | 127.4 | 0 |
| nyborg | Nyborgin linna | historia | 622 | 3 | Htawmonzel, Jebulon, Andree Stephan | CC BY-SA 4.0, CC0, CC BY 3.0 | 61.1 | 12.4 |

Kuvia yhteensä 81; lisenssijakauma: CC BY-SA 4.0 36, CC BY-SA 3.0 14, CC0 9, Public domain 7, CC BY 3.0 6, CC BY 2.5 2, CC BY 4.0 2, CC BY-SA 2.0 2, CC BY 2.0 2, CC BY-SA 3.0 de 1.
"Etäisyys Kööpenhaminaan" on pelin oma passi (`nostojenKarttapaikat`, lautayksikköä), raja 7. Lähin uusi nosto on Lejre 19,3.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD ja fokusvirta-*.js)

Neljä vaihtoehtoa, oikea-indeksit vaihtelevat (1,2,0,3,1,2,0,3,2,1), vastaus löytyy noston omasta tekstistä; `fakta` on saman
Wikipedia-artikkelin muu tieto. Tyypit: 3 × luonto/saari, 2 × historia, 2 × kulttuuri, ruoka, kauppa, tekniikka.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| raabjerg-mile | muu | Kuinka paljon tuuli työntää Råbjerg Milea koilliseen enimmillään vuodessa? | Noin 18 metriä (indeksi 1) |
| himmelbjerget | vuori | Kenen kunniaksi Himmelbjergetin huipulle rakennettu punatiilinen torni pystytettiin? | Kuningas Frederik VII (indeksi 2) |
| laeso | saari | Miksi Læsøn talojen katot alettiin tehdä meriajokkaasta? | Suolan keitto oli syönyt puut, joten kattoaineista oli pulaa (indeksi 0) |
| hammershus | historia | Kuinka pitkä kehämuuri ympäröi Hammershusin linnan aluetta? | 750 metriä (indeksi 3) |
| christiansfeld | historia | Minkä väristä tiiltä Christiansfeldin herrnhutilaistalot on pääosin rakennettu? | Keltaista tiiltä (indeksi 1) |
| odense | kulttuuri | Minkä muinaisen jumalan pyhäkköä Odensen nimi alun perin tarkoittaa? | Odinin pyhäkköä (indeksi 2) |
| horsens | kulttuuri | Minkä eläimen nimeä vanhan tanskan sana hors tarkoittaa, josta Horsensin nimen uskotaan tulevan? | Hevosta (indeksi 0) |
| aalborg | ruoka | Minkä juoman maailman suurin tuottaja ja viejä Aalborgissa toiminut De Danske Spritfabrikker on? | Akvaviitin (indeksi 3) |
| esbjerg | kauppa | Minkä Saksan haltuun joutuneen sataman tilalle Esbjergin satama perustettiin? | Altona (indeksi 2) |
| samso | tekniikka | Mitä Samsøn poikki kaivettiin vuosina 726–729 viikinkiaikaan? | Puureunainen kanava (indeksi 1) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 28 |
| Teksti 400–900 merkkiä, 3–8 virkettä | 28/28 (584–798 merkkiä) |
| `lahde`-rivi (en-Wikipedia + 19.9.2026) | 28/28 |
| 2 kysymystä pululle | 28/28 |
| ≥ 2 kuvaa | 28/28 (26 kohteella 3 kuvaa, Dybbøl ja Tønder 2) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 81/81 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 81/81; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (lisenssi ja tekijä täsmäävät, ei NC/ND) |
| Kuvatiedostot olemassa, JPEG, sha256-etuliite = tiedostonimen tunniste, ei orpoja | 81/81 |
| Korostukset löytyvät tekstistä | 28/28 |
| Fokuslehden rajaus (`osuuLehteen('DNK')`) | 28/28 (Bornholm ja Læsø mukana) |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 28/28 pääkartalla, kohdekartalla 0 |
| Etäisyys pelikaupunkiin (Kööpenhamina) | pienin Lejre 19,3; raja 7 |
| Samat id:t tai nimet nykyisten 20 DNK-noston kanssa | ei |
| Visat: 4 vaihtoehtoa, eri vaihtoehdot, oikea-indeksi kelvollinen | 10/10 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node --test tests/*.test.mjs` | # tests 3667, # pass 3654, # fail 0, # skipped 13 (ks. kohta 12) |
| Kuvat katsottu | jokainen 83 ladatusta kuvasta katsottu yhteiskuvina (kontaktilehdet) ja kuva-agenttien esikatseluina; kaksi heikointa pudotettu |

## Etäisyys DNK-renkaaseen (lautayksikköä renkaan reunasta)

Pelin karkea maailmankartta (`countryShapes.DNK`) ei ulotu kaikkiin saariin. **Renkaan ulkopuolella:** Bornholm 83,1, Hammershus 76,2,
Marstal 26,3, Odense 21,2, Læsø 16,2, Ladby 15,9, Samsø 13,4, Nyborg 12,4, Maribo 10,0, Ebeltoft 1,8, Rømø 1,5 (Dybbøl 1,2, Mols 0,1 lähes
rannalla). Kaikki osuvat silti Tanskan fokuslehteen ja Wikipedian oikeisiin koordinaatteihin. Odense, Nyborg ja Ladby ovat Fynillä,
jota rengas ei sisällä. **Ankkurien lukitus (`LUKITUT_MAAT`) on velka**, kuten muillakin EU-mailla.
Renkaan sisällä: Rubjerg Knude, Råbjerg Mile, Thy, Himmelbjerget, Koldinghus, Viborg, Lejre, Ringsted, Kalundborg, Christiansfeld, Horsens,
Aalborg, Sorø, Esbjerg, Tønder.

## Läheiset nostot (merkit voivat peittää toisensa lähikuvassa)

Alle 9 lautayksikköä toisistaan: **Aalborg – Lindholm Høje 1,4** (Lindholm Høje on Nørresundbyssä heti fjordin pohjoispuolella), Lejre –
Roskilden tuomiokirkko 3,9, Mols Bjerge – Ebeltoft 5,5, Horsens – Møllehøj 5,7, Nyborg – Storebælt 6,1, Koldinghus – Christiansfeld 6,3,
Råbjerg Mile – Skagen 6,8, Lejre – hetki Roskilde 1040 7,0, Himmelbjerget – Møllehøj 7,6, Ringsted – Sorø 7,7, Ladby – Odense 7,9,
Ladby – Nyborg 8,3, Bornholm – Hammershus 8,4. Aalborg pysyi listalla päätöksesi mukaan (akvaviitti); Lindholm Højen ja Aalborgin merkit
menevät käytännössä päällekkäin, joten kannattaa katsoa nostolatoja (levitys/ankkurit) — en muuttanut koordinaatteja.

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Maribo**: en-Wikipedia ei mainitse sokerijuurikasta lainkaan. Teksti kertoo kauppakaupungista, järvistä (Nørresø, Søndersø),
   birgittalaisluostarista, tuomiokirkosta 1803–04 ja Leonora Christina Ulfeldtista. Tyyppi `kauppa`.
2. **Ebeltoft**: artikkeli ei kerro fregatti Jyllandin valmistumisvuotta eikä milloin se tuli Ebeltoftiin; teksti mainitsee fregatin vain nähtävyytenä
   ("maailman pisin puinen sotalaiva") ja kertoo vanhasta satamakaupungista, suojelusta 1960-luvulla, lasimuseosta 1985 ja Poul la Courista. Tyyppi `merenkulku`.
3. **Tønder**: pitsi on artikkelissa yksi virke; teksti keskittyy kauppakaupunkihistoriaan (Hansa-oikeudet 1243, sataman menetys, Schleswig, kansanäänestys 1920).
   Nappi "Saksan puolella 1864 jälkeen" on artikkelin (Schleswig, "detached from Germany after WWI") päätelmä. Kansanäänestysvuosi 1920 on yleistieto (artikkeli: "1920s").
4. **Aalborg**: en-Wikipediassa ei ole artikkelia "Aalborg Akvavit"; lähde on "Aalborg" (De Danske Spritfabrikker, maailman suurin akvaviitin tuottaja, pääkonttori 1931).
   Visan `fakta` (meripihka, kumina/tilli) on artikkelista "Akvavit", jota `lahde`-rivi ei mainitse.
5. **Horsens**: artikkeli ei mainitse Beringinsalmea; teksti sanoo vain Venäjän laivaston kapteeni Vitus Bering. Vankilan mestaus 1892 jätetty pois (13+).
6. **Rubjerg Knude, Råbjerg Mile, Rømø, Mols Bjerge, Kalundborg, Christiansfeld, Koldinghus, Samsø**: napin 1873-väite on osin päätelmä artikkelin vuosiluvuista
   (majakka 1900, kansallispuistot 2008/2009, Ørnbjergin rakennukset 1833, Esbern Snaren kirkko, Preussi 1864, palo 1808). Koldinghusin nappia yksinkertaistin (Herkules-väite pois).
7. **Nappien rehellisyys**: Ladby ("löytyy vasta 1935"), Rubjerg Knude (majakka 1900), Thy ja Mols Bjerge (kansallispuistot vasta 2008/2009), Samsø (energiasaari 1997–2003),
   Himmelbjerget (torni 1875), Esbjerg (satama vielä rakenteilla, avattu 1874).
8. **Tyypit**: `muu` on kielletty (tests/nostomerkit.test.mjs). Råbjerg Mile (liikkuva dyyni), Himmelbjerget ja Mols Bjerge `vuori`, Thy `kulttuuri` (kuten Dwingelderveld NLD:ssä: luontokohde, jolle ei ole luontotyyppiä), Rubjerg Knude, Marstal ja Ebeltoft `merenkulku`. Ylärivi "Vuori" Råbjergille on hieman epätarkka; vaihda tyyppi, jos haluat.
9. **Kuvat**: Ladbyn laivakuva (#2) on 800 px ja siinä on pieni tekijän tekstileima kulmassa (ainoa kuva itse laivasta); Rawertin akvarelli (Himmelbjerget#3, 800 px) ja
   Kiærskoun maalaus (Koldinghus#2, 607 px) skaalattu 1800:aan ja pehmeitä; Bornholmin A.Savinin kuvat hylätty (Free Art License), Hjejlen 795 px liian pieni.
   Pudotettu minun päätöksellä (kansiossa `ei-kaytossa/`, älä vie): Dybbøl#3 (mylly kiven takaa, tumma) ja Tønder#3 (näyttelyjulkaisun kansi). Horsensin vankilakuvan tekijä
   on Commonsissa pelkkä käyttäjätunnus (`XyZ32xKx8TedEOyE`), Dybbølin yhden kuvan `UW`. Dybbølissa ei taistelukuvia; Ladbyn ja Lejren kuvat ovat rekonstruktioita/kopioita (selitteet sanovat sen).
   Horsensin vanha kaiverrus ennen 1875, Marstalin maalaus 1873 (kuunari Marstal, ei kaupunki).
10. **Nyborg**: artikkelin nykyinen otsikko on "Nyborg Slot" (Nyborg Castle ohjautuu siihen); lähderivi kertoo uudelleenohjauksen.
12. **NIMIÖLIMITYS (koskee OLEMASSA OLEVAA dataa, päätä)**: 28 uutta nostoa toi DNK:hon kaksi testivirhettä. (a) `muu`-tyyppi, korjattu (kohta 8). (b) `tests/nimiolimitys.test.mjs`
    kaatui: `DNK/trelleborg-slagelse` ja täkynosto `nosto-trelleborg` (fokusvirta-kobenhavn.js) ovat SAMASSA paikassa SAMALLA nimellä "Trelleborg", ja niiden nimiöt menivät päällekkäin.
    Mittaus (kaikki 28 uutta mukana): limitys tulee, mutta katoaa kun poistetaan MIKÄ TAHANSA yksittäinen uusi nosto tai kun `nimio: ''` asetetaan trelleborg-slagelselle, storebaeltin-silta:lle tai egeskovilla
    (ei kun uusien nimiöitä lyhennetään tai järjestystä vaihdetaan). Ladonta on siis rajatapauksessa. **Ratkaisu tässä haarassa, erillisenä commitina** (helppo perua):
    `js/packs/maastokohteet-dnk.js` trelleborg-slagelse sai `nimio: ''` — kortti ja symboli säilyvät, karttanimiön näyttää vain täkynosto (sama paikka, sama nimi, joten kaksoisnimiö poistuu).
    Testit vihreät (3654/0). Jos haluat toisin (esim. `nimio` Egeskovilla tai Storebæltillä, tai vain yksi uusi nosto pois), peru se commit ja sano; ei koske mainiin ennen kuin päätät.
11. **Kuvakansion tapaturma**: yksi kuva-agentti ylikirjoitti toisen agentin apu-`meta.json`-tiedoston (työtiedosto, ei kuva); kuvia ei poistettu, koko kansio tarkistettu (81 nimeä täsmää dataan).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 81 tiedostoa kansiosta `/Users/samireivinen/Matkakirja-nostot-kuvat/dnk/` (EI alikansio `ei-kaytossa/`) osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta).
  Kuvia ei ole committoitu.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- DNK-nostoankkureita ei ole lukittu (`LUKITUT_MAAT` vain FRA); saaret ja Fyn renkaan ulkopuolella ks. yllä.
- Peliä ei avattu selaimessa (paitsi kuvien kontaktilehti); piirto todettu samalla reitillä kuin hahmotelma-nld.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Visat: vastauksen esiintyminen tekstissä on tarkistettu käsin; kysymysten oikeellisuus perustuu noston omaan tekstiin.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/dnk/`: 81 kpl `dnk-nosto-<id>-<sha8>.jpg`, alikansio `ei-kaytossa/` (2 pudotettua kuvaa).
