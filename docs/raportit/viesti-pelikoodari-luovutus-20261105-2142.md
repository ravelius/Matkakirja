# Pelikoodari: luovutus 5.11.2026 klo 21.42: kynnysviesti nähty, ovikoe ja viestin ulottuma koodattu, näkymätön este auki

Täydentää -2112:ta; sen kohdat 1 ja 4 ovat tässä korvattu, muut pätevät. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `7293ed891`, viety `natiivi-backup`iin. Ei junaan. **Taso 1 on yhä pääasia.**

7.47: tässä sessiossa luettu periaatteet, 7.4, 7.23–7.25, 9.1–9.3, 9.5, luku 6 kokonaan; luvuista 2, 4 ja 12 vain 2.9, 2.177, 2.201, 2.208, 2.209, 4.1 ja komentosäännöt.

## 0. Lisäys: ajo tehty, tämä korvaa kohdan 1
`lokit/esikatselu-20261105-214330`, `7293ed891`, L2, 341 s, 9 kuvaa, L2 ilmoitettu vapaaksi JU:lle. **Varjostin ja koodi kääntyivät ja toimivat.** Katsottu q1, q4, q5, q7; **katsomatta q2, q3, q6.** Viety KK:lle: suositus sisäänpäin, mutta lehden pinta kuntoon; KK:n vastausta ei ole tullut.
- **Avoimia viatkuvista (kaikki KK:lla):** sisäänpäin lehti on tumma laskettu pinta ilman Tripon ristikkoa ja renkaita; kaksi oranssia läikkää samassa ruudun kohdassa (noin 280, 1050 ja 1720, 1050 / 2000 × 1500) kaikissa katsotuissa kuvissa, ei ajon 212358 kuvissa, syy ei tiedossa, **selvitä ensin**: q5:ssä läikkä näkyy lehden päällä, joten se on ruudun tasolla, ei ovessa (päätelty); seinälaikut q1:ssä ja q7:ssä, ei selvitetty; karmin tumma suorakaide.
- **Ympärikäännös ei tullut:** `kaanna 1` kahdesti → "ei (ei aukkoa tai seinä)", paikka eteni suoraan. y1, y2 katsomatta, eivät kerro siitä. Ympärikäännös vaatii eri komennon tai hetken: lue `kaanna`-koodi (`JuoksupeliNakyma.cs` noin rivi 2155) ennen uutta ajoa.
- **Uuden säännön ajotodiste on yhä tekemättä** (kohta 3).

## 1. Ajon valmistelu (tehty, ks. kohta 0)
- **JU:lle pyydetty** `dc38e2ddc`, sk-q, 9 kuvaa, jonossa toisena NUI:n jälkeen. **Kärki on nyt `7293ed891`**, ja `ajo-skq.sh` ajaa sen: kerro JU:lle sha, kun vuoro tulee.
- "ESIKATSELU NYT" jälkeen: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/ajo-skq.sh <linja>`, sitten LUKKO VAPAA, kesto, kuvamäärä JU:lle.
- **`dc38e2ddc`:tä ja `7293ed891`:tä ei ole käännetty Unityssä.** Varjostin ja C# kääntyvät ensi kerran tässä ajossa; Peli-testit kääntävät vain `Peli`-kansion, eivät `Scripts`:iä eikä `UI`:ta.
- **Ajon kuvat:** `q1` = sama hetki kuin ajon 212358 `k1`, jossa lehti täytti kuvan; `q2`/`q3` sama kamera sisään/ulos; `y1`, `y2` ympärikäännös; `q4`/`q5` edestä sisään/ulos; `q6`/`q7` sivulta ulos/sisään. Tarkastelukameran paikat on laskettu ovelle (−189,49; 419,08), yaw = atan2(dx, dz); niitä ei ole nähty.
- **KK:lle:** sama ovi rinnakkain viat kerrottuina. KK 21.3x: tavoite "lehti ei tule kujalle, ei peitä ikkunaa eikä kamera jää sen sisään"; jos sisäänpäin ei toimi, syy ja oma suositus. Omistajan sanat 17.4x: "näkyvätkö elementit oikein, eikä seiniä puutu, eikä mikään värise". KK:lle on luvattu kuvat tästä ajosta.

## 2. Ovilehti sisäänpäin (`dc38e2ddc`, koe, oletus ennallaan)
`ui juoksupeli ovikoe lehdet sisaan|ulos`. Seinässä ei ole aukkoa, joten verkko ei näkyisi pinnan takana: lehdet lasketaan näkösäteestä `JuoksuOviHamara.shader`:ssä, 80° auki, uv2 = (puolileveys, pituus, korkeus). Kuviointi on laskettu (kehys, jako), ei mallin kuva. Karmi jää malliksi; laatikkolehdet ja mallin lehdet pois. **Jos omistaja hyväksyy:** oletus sisään, lehtilaatikko pois koodista, `JuoksuKulkuKartta.OviLehti*` ja testi `OvilehtiEiTorrotaKujalla` tarkistettava, mallin lehtiä ei enää ladata.

## 3. Kynnysviesti (`7293ed891`)
- **Nähty pelistä:** `lokit/esikatselu-20261105-212358/k1-kynnys.png`, "Sisälle pääsee seuraavalla tasolla.", ajo `354452847`, 444 s. Kaikki 7 käännöstä onnistuivat, loppu s 124,5 kuten laskettu. Viesti oli poissa `k2`:ssa noin 1 s myöhemmin. Ajon `sk-p`:stä puuttui `ovikoe juuri`, joten kuvissa on laatikkolehdet (`ovi-v1` ei ole ämpärissä: `ovimalli puuttuu`), ei malli.
- **PT:n käsky:** päätös koskee jokaista ovea. **-2112:n 110/245 oli testin vika:** alku vaati kuljettavan 10 m:n päästä. Paremmalla alulla 164 ovea yltää 1,5 m:n säteeseen.
- **Syy:** säde, ei verkko. Keisari pysähtyy noin 2 m ennen estettä ja oven edessä voi olla jalusta tai portaat.
- **Korjaus:** `OviEdessa` (oven levyinen kaista, enintään lähin kuljettava + 2,5 m) `OviLahella`n rinnalle. Testi `KynnysViestiYltaaOvilleSuoraanEdesta`: **225/245**; `JuoksuKulkuKarttaTestit` 35/35; muita testejä ei ajettu.
- **Loput 20:** 12 ovella ei kuljettavaa 10 m:n sisällä edessä: (282,1; 287,6), (285,2; 322,0), (309,6; 328,2), (103,6; 118,8), (−159,6; 368,2), (−170,9; 389,8), (133,8; 404,8), (−178,8; 357,4), (−166,2; 356,0), (−179,7; 388,2), (251,0; 374,0), (−205,0; 311,4). 8 ovella pysähdys ei osunut tälle ovelle: (−98,1; 203,2), (116,4; −217,5), (−98,7; −226,2), (−113,5; 110,8), (−254,1; 493,3): ei pysähdystä 4 s:ssa, syy selvittämättä; (−27,3; 486,7) ja (143,9; 334,0): pysähdys kaukana; (238,9; 407,7): pysähdys 0,2 m:n päässä, joten viesti tulee todennäköisesti toisen oven kautta (päätelty).
- **PT pyysi tuloksen myös ajolla: tekemättä.** sk-q ei todista uutta sääntöä, koska sen ovi yltää vanhallakin säteellä (sivulta, n 1,4). Etsi testillä polku ovelle, jolle vanha säde ei yllä, esim. haulla kuten `mittaus-ovet.cs.txt`.

## 4. Näkymätön este (PT: vika, kunnes muuta todistetaan): syy kartan säännössä, ei korjattu
Ajon 212358 `k2`: keisari pysähtyy kujan suulle, ja kuja näyttää avoimelta. Kartassa estetty, x noin −189…−181, z 406–416.
- **Syy, mitattu `pinnat.npz` v19:stä:** `kulkukartta.py` `taso1_rajaus`, rivi 273: `sisa` = vähintään 2 m leveä katettu ala. Kujan ruudut: fyysisesti kuljettavia, ei talon pohjalla, katettu, vapaa korkeus 3–4 m. Tekijä on Pelikoodari (`tyokalut/kulkukartta.py`), ei data, joten korjaus on tällä roolilla.
- **Montako paikkaa:** tason 1 alueeseen rajautuvia, talon pohjan ulkopuolisia estettyjä alueita ≥ 6 m² ja ≥ 1,25 m leveitä: **123, yhteensä 12 138 m²**: sisätilasääntö 103, matala kate 2, muu 19. Kaikki eivät ole virheitä: esim. 6×60 m:n alueet voivat olla oikeita katettuja käytäviä; **ei katsottu kuvista.**
- **Kokeiltu, ei auta:** räystäsraja (katettu enintään 2–3 m talon pohjasta ei ole sisätilaa) avaa vain noin 1 000 m², 45–48 aluetta, eikä tätä kujaa, koska kattavaa ei selitä talon pohja. **Ei selvitetty:** mikä pinta peittää kujan 3–4 m:ssä (sama pinta pitää nimetä: `pinnat()` ei kerro mallia, käytä `kaksoispinta.py`-tapaa).
- **Ei tiedossa, onko kuja kuvassa todella katettu.** `k2`:n yläosassa näkyy oranssia katon alapintaa, joten se voi olla. Seuraava askel: yksi tarkastelukuva kujasta (−187,5; 412) ja kartan selvitys; sitten erotetaan oikea sisätila kujasta (esim. avoin molemmista päistä + ei seiniä kyljissä?) tai kerrotaan PT:lle, että este on oikea katto. Korjaus muuttaa kartan (v20) ja ovet: `--vertaa`.
- **Yhteys oviin:** osa kohdan 3 12 ovesta on näillä alueilla (esim. (−159,6; 368,2) ja alue (−161; 357)), ei laskettu tarkasti.

## 5. Avoimet PT/KK
- PT:lle viety 21.3x kynnysviesti ja este; 110/245 korjattu viestissä mittausten sekaannukseksi (960 pysähdystä vs. 40 ajoa). **Luku 110 on nyt väärä:** kerro PT:lle 164 → 225 (ei vielä kerrottu ennen tätä luovutusta, ks. viesti).
- -2112:n kohdat 2, 3, 5, 6 ja -2044:n kohdat pätevät: koonti KK:lle kuvien jälkeen, rikkoutuminen ja omena, LAV:n koristeet.

## 6. Työkalut
`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/`: `sk-q.txt`, `ajo-skq.sh`. Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/3b99b2a4-e07c-4475-9401-8128bff79ae5/scratchpad/`: `este.py` (syyt ruuduittain; aja `python3` ilman `-I`, numpy on käyttäjän paketeissa), `lahin-ovi.py`. Väliaikainen testi: `Peli-testit/Testit/JuoksuBottiMittaus.cs` + `Peli-testit/kaanna.sh BottiMittaus` poistettu, ei committiin.

## OPIT
- Mittauksen luku tarkistetaan ennen viemistä: 110/245 meni PT:lle asti, vaikka testin alku rajasi ovet pois.
- Älä sekoita kahden mittauksen lukuja samaan viestiin: 960 pysähdystä ja 40 ajoa olivat eri mittauksia.
- Ennen kuin käynnistät kuvan laukaisun, tarkista, että skenaario sisältää `ovikoe juuri`: ilman sitä ovi on laatikko.
