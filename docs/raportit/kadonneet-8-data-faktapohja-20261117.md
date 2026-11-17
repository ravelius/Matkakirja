# Kadonneet-data 8 uudelle: faktapohja ja työtilanne (SK 17.11.2026, PT:n tilaus KK 07.58)

Tehtävä: `scratchpad/keskustelukanava/tehtavat/20261117-massa25-kytkenta/TEHTAVA.md` osa 2 (old-st-pauls, euston-arch, westminster-ennen-paloa, amsterdam-vanha-raatihuone, karntnertor-portti, heinrichshof, altes-burgtheater, porto-di-ripetta). Ei vielä data-PR:ää: tämä on kerätty faktapohja, jonka päälle data kirjoitetaan (sijainti = `maakartat.js`, aika + kortti = `nahtavyysjutut.js`, äänitysjono = `data/aanitysjono.tsv` komennolla `node tools/aanitysjono/tarkista.mjs --lisaa`; malli: PR 6833 / commit 7b250ec06e).
Merkinnät: 2L = kaksi itsenäistä lähdettä avattu; 1L = yksi (ei korttiin, tai vain varovasti); RIIDAT = lähteet ovat eri mieltä. WP:n kieliversiot = yksi lähde.

## Mitä jokaiselta puuttuu pelin datasta (luettu mainista 7c66c99c6e)

| Tunniste | Kartalla (`maakartat.js`) | Nähtävyysjuttu (`aika` + kortti) | Huomio |
|---|---|---|---|
| euston-arch | on: "Euston Arch" nosto `hahmotelma-euston-arch` | puuttuu | ihmekortti on `monumentit-eurooppa.js` r. 1829 (en-WP 1L) |
| westminster-ennen-paloa | on: "Vanha Westminsterin palatsi" nosto `hahmotelma-westminster-vanha` | puuttuu | ihmekortti r. 1859 (en-WP 1L) |
| old-st-pauls | puuttuu | puuttuu | ei ihmekorttia |
| amsterdam-vanha-raatihuone | puuttuu | puuttuu | ihmekortti `hahmotelma-amsterdamin-vanha-raatihuone` r. 713 olemassa mutta ei kartalla |
| karntnertor-portti | puuttuu (kartalla vain Kärntnertor-teatteri) | puuttuu | ihmekortti `karntnertor-bastioni` r. 821 ei kartalla; **kumpi portti, ks. avoin kysymys 1** |
| altes-burgtheater | puuttuu | puuttuu | ihmekortti `vanha-burgtheater` r. 810 ei kartalla |
| heinrichshof | puuttuu | puuttuu | kortti valmis: `kadonneet-lisakohteet-paatokset-20261117.md` kohta 1 |
| porto-di-ripetta | puuttuu | puuttuu | kortti valmis: sama raportti kohta 3 |

## Faktapohja (avatut lähteet)

### old-st-pauls (Lontoo; aika `1087–1666`)
- Alkoi 1087 palon jälkeen: 2L (en-WP "Old St Paul's Cathedral"; Museum of London "A history of St Paul's Cathedral": "Work began in 1087"). Valmis 1314 ("New Work"): 2L (en-WP; Museum of London). Britannica sanoo 1340 (RIIDAT, ei avattu; kortissa vain "1300-luvulle mennessä" tai ei lukua).
- Torni paloi 4.6.1561 (WP: ukkonen, uutissivu), ei rakennettu uudelleen (WP); Museum of London: "spire burned down in 1561". Vuosi 2L, syy 1L.
- Suuri palo 1666 tuhosi (WP: "gutted"; Museum of London: "completely gutted"): 2L. Wren: nykyinen katedraali 1675–1710 samalla paikalla (WP; Museum of London 1710, "Construction took 35 years"): 2L. Raunioiden purku alkoi 1668 (WP 1L).
- Pituus 586 ft = 179 m (Penrosen kaivaus 1878; WP 1L, LAV:n skaalaperuste sama) → **1L, ei kortin mitaksi**. Inigo Jonesin portiikki 1630-luvulla (WP 1L; Museum of London: korjaus alkoi 1630-luvulla, ei portiikkia) → pois.
- Isoisä 1873: Wrenin katedraali seisoi (2L). Sijainti: Ludgate Hill, sama paikka kuin nykyinen St Paul's (WP; Museum of London "possibly the same site" ensimmäisestä kirkosta, joten **sijainti 1L**; toinen lähde puuttuu).

### euston-arch (Lontoo; aika `1837–1961`)
- Suunnittelija Philip Hardwick (2L: en-WP; theunfinishedcity.co.uk, 2026). Valmistumisvuosi: WP 1837, theunfinishedcity 1838 (RIIDAT → "1830-luvun lopulla"; ihmekortissa 1837 = 1L).
- Doorilainen, neljä pylvästä, Yorkshiren (Bramley) hiekkakivi: 2L. Pohjoisen rautatien sisäänkäynti, Londonin ja Birminghamin rautatie: 2L.
- Purettiin 1961–62 (WP: purku alkoi joulukuussa 1961, johdanto 1962; theunfinishedcity: "early 1960s"; haku: 1961–62) 2L; "1961" yksin: RIIDAT.
- Kivet täyttivät Prescott Channelin (Lea-joki) 1962: 2L. Cruickshank löysi vähintään 60 % kivistä 1994: 2L. Lisää nostettiin 2009: 2L. Pronssiportit National Railway Museumissa Yorkissa: 2L. Ei rakennettu uudelleen (HS2-epävarmuus, WP): 1L.
- Korkeus 70 ft/21 m (WP 1L): pois. Isoisä 1873: portti seisoi (2L, ihmekortti 1837–1961).

### westminster-ennen-paloa (Lontoo; aika `–1834`)
- Palo 16.10.1834: 2L (historyofparliament.com "The Westminster Fire of 1834" 16.10.2025; en-WP, ihmekortti). Syy: parlamentin lovipuiden eli kuittikeppien polttaminen Ylähuoneen alla uuneissa: 2L (HoP; WP). Tuhosi suurimman osan palatsista, Westminster Hall pelastui (palomiesten työ, tuulen kääntyminen): 2L. Muuta säilyi: Undercroft Chapel, osa luostarikäytävää (HoP; haku: myös Jewel Tower) .
- Turner katseli paloa: WP 1L (HoP ei mainitse) → pois. Uusi palatsi Barry + Pugin: 2L (HoP; WP). Rakennustyöt alkoivat 1840 (WP 1L), valmis 1870 (WP 1L) → **tarvitaan toinen lähde, jos kortissa on "isoisäsi aikana uusi palatsi seisoi"**; HoP: jäännökset purettiin 1850-luvun alussa, tilapäiset salit helmikuuhun 1835 mennessä.
- Vanhan palatsin ikä: kuninkaan pääasunto vuoteen 1512 (WP 1L), parlamentti 1200-luvulta (WP 1L), Westminster Hall Vilhelm II:n ajalta (WP 1L) → vain 1L, kortissa varovaisesti tai pois.

### amsterdam-vanha-raatihuone (Amsterdam; aika `1300-luku–1652`)
- Haun (ei vielä avattu itse) mukaan: 1300-luvulta, laajennettu, palot 1421 ja 1452; **tuhoutui 7.7.1652** (Hart Amsterdammuseum, Geschiedenislokaal Amsterdam, Ons Amsterdam; yksi lähde sanoo yöllä 6–7 tai 7–8.7. → RIIDAT, kortissa "heinäkuussa 1652"); uusi raatihuone: Jacob van Campen 1648 arkkitehti, avattu 1655, valmis n. 1665 (ihmekortti 1665; kulmakivi 28.10.1648 tai 1650 RIIDAT); palatsi 1808 (Waag-kortissa jo "kuninkaanpalatsi").
- **TEKEMÄTTÄ:** avaa `geschiedenislokaalamsterdam.nl/bronnen/het-oude-stadhuis` ja `hart.amsterdam/nl/collectie/object/amcollect/39287` (tai nl-WP "Oude Stadhuis van Amsterdam") itse, kirjaa otteet. Sijainti: Dam, nykyisen Kuninkaanpalatsin paikka (Waag-pisteen vieressä 52,3731 / 4,8927; Waag-kortin "viereinen raatihuone").

### karntnertor-portti (Wien; aika riippuu portista)
- Wien Geschichte Wiki "Kärntnertor" (1L tässä): **Altes Kärntnertor** n. 1200 (Porta Carinthianorum 1276), muurattu umpeen 1500-luvulla, avattu 1670/71, purettu 13.10.1858–30.5.1859, paikka Kärntner Straße 49 / Walfischgasse 1. **Neues Kärntnertor** 1548–1552 Augustinerbastein vieressä (Operngasse–Philharmonikerstraße 1), suljettu 1672, avattu 1802 (Franzenstor), purettu 1861. Molemmat käytössä rinnakkain (yksisuuntaliikenne).
- Keisari Frans Joosef määräsi muurien purkamisen 20.12.1857 (haku; ihmekortti "1857"), purku pääosin 1858–1864 (de-WP "Wiener Stadtmauern", haku). Muurien purkamiselle 2L (de-WP + GeschichteWiki "Stadtbefestigung" avaamatta); yksittäisten porttien päivät 1L.
- **Avoin kysymys 1 (KK/LAV):** malli on "portti muurin läpi, kaupunkipuolelle korkeampi koristekaari, kenttäpuoli siltoineen, päätykolmio" (LAV v2, Wien Museum -kuva): kumpi portti? Kortti ja sijainti riippuvat siitä (Altes: Kärntner Straße 49; Neues: Operngasse, 220 m päässä, Opernringin vieressä).

### altes-burgtheater (Wien; aika `1741–1888`)
- Wien Geschichte Wiki "Altes Burgtheater": maaliskuu 1741 Maria Teresia luovutti Hofburgin palloilusalin (Ballhaus) Sellierille teatteriksi; 1748 Lo Presti teki pysyvän muutoksen, avattu 14.5.1748 (Gluck, *Semiramide riconosciuta*); 1776 Joosef II:n "Teutsches Nationaltheater" (23.3.1776; austriasites.com sanoo 17.2.1776 → RIIDAT, kortissa "1776"); viimeinen esitys 12.10.1888 (GeschichteWiki; habsburger.net: Goethe, *Iphigenie*) = 2L; purettu Hofburgin Michaelertraktin tieltä: 2L (GeschichteWiki; Wikiwand de "Burgtheater" haku); uusi teatteri Ringillä 1888 (2L). Mozartin ensiesitykset (*Die Entführung* 1782, *Figaro* 1786, *Così* 1790): GeschichteWiki ei mainitse; ihmekortti Figaro 1786 (en-WP) = 1L. Klimtin maalaus katsomosta 1888 (GeschichteWiki, 1L).
- Paikka: Michaelerplatz, entisessä palloilusalissa Spanischen Reitschulen (Talviratsastuskoulun) vieressä.

### heinrichshof, porto-di-ripetta
Kortit, ajat ja ehdot valmiina: `kadonneet-lisakohteet-paatokset-20261117.md` (KK:n päätökset PR 6925). Heinrichshof `1863–1954`, Ripetta `1704–1800-luvun loppu`. Koordinaatit: Heinrichshof WGW 48,2022 / 16,3686 (1L; toinen lähde OSM Opernringhof tekemättä); Ripetta: **koordinaatti kirjaamatta**, tarkista rooma-2-raportista ja WP:stä (Ripetta, Via di Ripetta / Lungotevere in Augusta).

## Kortit (ei vielä kirjoitettu; kirjoita faktapohjan 2L-rivien varaan)
Rakenne kuten erä 2 (`nahtavyysjutut.js` r. 7660–7700): `aika`, `teksti` (3 kappaletta: mikä oli / mitä tapahtui ja nykytila / "Isoisäsi vuonna 1873 …"), `lahde: 'Matkakirjan oma teksti · lähteinä …'`, ei `kuvat`-kenttää (kuvat mediassa) , ei mittoja (KK: mitat vain mallin skaalaan). Heinrichshof ja Ripetta sanasta sanaan päätösraportista.

## Seuraavat askeleet (jos luovutetaan)
1. Ratkaise avoin kysymys 1 (Karntnertor: kumpi portti) KK:lta yhdellä rivillä; rinnalla Ripetan ja Amsterdamin raatihuoneen koordinaatit (2L) ja Old St Paul'sin sijainnin toinen lähde.
2. Kirjoita 6 uutta korttia (old-st-pauls, euston-arch, westminster, amsterdam-vanha-raatihuone, karntnertor-portti, altes-burgtheater) + 2 valmista; lisää 6 karttapistettä (`maakartat.js` lontoo/amsterdam/wien/rooma; vain `nimi, lat, lon`, kuten erä 2) ja nähtävyysjutut; ajo `node tools/aanitysjono/tarkista.mjs --lisaa` (3 riviä/kortti, vaikuttaa `data/aanitysjono.tsv`); `node --test tests/...` (ihmetähdet, karttavalot-ihmeet, aanitysjono, nahtavyystyypit).
3. PR luonnoksena; diffi KK:lle ennen yhdistämistä (PT:n ohje); Osa 2 (NS) vasta kun data on mainissa.
