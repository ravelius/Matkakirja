# "Yhdistä kolme": lisätyypit c, f, i, Lontoo (SK 16.11.2026, KK:n tilaus)

Dataluonnokset samassa muodossa kuin Pariisin (docs/raportit/yhdista-kolme-lisatyypit-pariisi-20261112.md, PR 6669). VAIN DOCS: ei pelidataa, ei latauksia. Kolmikot eivät toista Lontoon osan A rakennuksia (yhdista-kolme-lontoo-20261113.md). Lähteet: pelin omat jutut (js/packs/nahtavyysjutut.js, merkintä P), en-Wikipedia (WebFetch 16.11.) ja hakutulosten toinen lähde; kuvien lisenssi Commonsin rajapinnasta (imageinfo, Restrictions tyhjä kaikilla). Wikipedian kieliversiot ovat yksi lähde (2L = kaksi riippumatonta). Kuvalinkki: https://commons.wikimedia.org/wiki/File: + tiedosto (välilyönnit alaviivoiksi). KUVIA EI OLE KATSOTTU SILMIN tässä erässä (vain rajapinnan tiedot): KK/SK katsoo ennen käyttöä.

**Yhteenveto KK:lle:** c 3 paria, f 3 paria (yksi tarkistettava), i 3 paria. Kuvia puuttuu pelistä 9 kpl (kaikki uusia; ei yhtään jo pelissä); 1 kuva CC BY 4.0 (Newgate, Wellcome), loput PD. Tarkistettavaa: Monet-taulun museo, Newgaten purkuvuosi (1902/1903/1904, lähteet ristiriidassa; ei vuotta tekstiin).

## (c) Kadonnut ↔ mikä seisoo paikalla nyt

Ylärivi kadonnut (KUVA; kadonneilla ei 3D-mallia), lappu = nykyisen paikan nimi (teksti).

| # | Kadonnut | Nyt paikalla (lappu) | Malli nykyisellä | Lähde | Var. |
|---|---|---|---|---|---|
| 1 | Greenwichin palatsi (Placentia; Henrik VIII s. 1491, Maria I 1516, Elisabet I 1533; purettu 1660-luvulla; paikka tyhjänä kunnes sairaala alkoi 1694) | Old Royal Naval College | 3D (OhjelmaKohteet) | en-Wikipedia "Palace of Placentia"; hakutulos (visitgreenwich.org.uk, historyofroyalwomen.com: sairaala 1694, kolleegio 1873); pelin ORNC-juttu (P) | 2L; purkuvuosi 1660/1662/1664 ristiriita: tekstiin "1660-luvulla" |
| 2 | Newgaten vankila (suljettu 1902; viimeinen julkinen teloitus 1868) | Old Bailey (Central Criminal Court, avattu 27.2.1907, E. W. Mountford) | EI mallia (kuva) | en-Wikipedia "Newgate Prison": "now stands upon the Newgate Prison site"; hakutulos (Britannica, e-architect, History Today: avaus 27.2.1907) | 2L; purkuvuosi 1902/1903/1904 ristiriita: ei vuotta tekstiin |
| 3 | Euston Arch (Hardwick 1837; purettu 1961–62) | Euston-asema (uusi asema 1968) | EI mallia (kuva) | en-Wikipedia "Euston Arch" (purku 1961, valmis uusi asema 1968); hakutulos (Grace's Guide: purku 1961–2, uusi asema 1968) | 2L; ei pelin omaa juttua → oma faktarivi kortille |

Varalla: Vanha London Bridge → nykyinen London Bridge (valmis 1973; ei tarkistettu tässä erässä), Whitehallin palatsi → Banqueting House (säilyi; ei "korvaaja").

### Kuvat (c)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko |
|---|---|---|---|---|---|
| c1 | `Greenwich Palace (anonymous).jpg` | tuntematon | maalaus, Henrik VIII:n aika (Commons-kuvaus) | PD | 1218×880 |
| c2 | `Newgate Gaol in the City of London; a long building with arc Wellcome V0041199.jpg` | Wellcome Collection (kaiverrus) | tuntematon | CC BY 4.0 (tekijä/lähderivi pakollinen) | 4753×1470 |
| c3 | `Euston Arch 1896.jpg` | tuntematon | 1896, valokuva | PD | 593×414 (matala) |

```js
{ id: 'lontoo-kadonneet-1', tyyppi: 'kadonnut-nyt',
  parit: [
    { kohde: { kuva: { tiedosto: 'Greenwich Palace (anonymous).jpg',
        lahde: { tekija: 'tuntematon', teos: 'Greenwich Palace', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Greenwich_Palace_(anonymous).jpg' } } },
      nimi: 'Greenwichin palatsi', lappu: { teksti: 'Old Royal Naval College' } },
    { kohde: { kuva: { tiedosto: 'Newgate Gaol in the City of London; a long building with arc Wellcome V0041199.jpg',
        lahde: { tekija: 'Wellcome Collection', teos: 'Newgate Gaol in the City of London', lisenssi: 'CC BY 4.0', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Newgate_Gaol_in_the_City_of_London;_a_long_building_with_arc_Wellcome_V0041199.jpg' } } },
      nimi: 'Newgaten vankila', lappu: { teksti: 'Old Bailey' } },
    { kohde: { kuva: { tiedosto: 'Euston Arch 1896.jpg',
        lahde: { tekija: 'tuntematon', teos: 'Euston Arch (1896)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Euston_Arch_1896.jpg' } } },
      nimi: 'Euston Arch', lappu: { teksti: 'Euston-asema' } },
  ] }
```

## (f) Taulu ↔ maalari

Taulut Lontoon museossa; ylärivi KUVA (taulu), lappu = maalarin nimi.

| # | Taulu | Maalari | Museo (lähde) | Pelissä jo | Lisenssi / Var. |
|---|---|---|---|---|---|
| 1 | The Fighting Temeraire (maalattu 1838, esillä Royal Academyssä 1839) | J. M. W. Turner | National Gallery (en-Wikipedia "The Fighting Temeraire": Temeraire hinataan Rotherhithen purkutelakalle Thamesia pitkin) | juttu Westminsterin palatsi mainitsee Turnerin; kuvaa EI pelissä | PD; 1L–2L (museo ja vuosi en-Wikipediasta; toinen lähde tarkistamatta) |
| 2 | The Stonemason's Yard (n. 1725) | Canaletto | National Gallery (en-Wikipedia "The Stonemason's Yard") | Canaletto-nosto (Lontoo 1746–1755) ja Venetsian lehti; tämä kuva ei pelissä | PD; 1L. Huom.: Lontoon museossa mutta kuvaa Venetsiaa: tehtävä "kuka maalasi" toimii pelin omalla Canaletto-jutulla |
| 3 | The Thames below Westminster (1871) | Claude Monet | National Gallery (EI vahvistettu: en-Wikipedia-sivu 404, vain Commons-tiedoston nimi) | Monet esiintyy Pariisin jutussa (Monet 1874) | PD; TARKISTETTAVA (museo, vuosi). Varalla: Constable The Hay Wain |

### Kuvat (f)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko |
|---|---|---|---|---|---|
| f1 | `The Fighting Temeraire, JMW Turner, National Gallery.jpg` | J. M. W. Turner | 1839 | PD | 5684×4223 |
| f2 | `Canaletto - The Stonemason's Yard.jpg` | Canaletto (Giovanni Antonio Canal) | 1725 | PD | 6000×4640 |
| f3 | `Claude Monet - The Thames below Westminster.jpg` | Claude Monet | 1871 | PD | 17139×11054 (iso, pienennä) |

```js
{ id: 'lontoo-taulut-1', tyyppi: 'taulu-maalari',
  parit: [
    { kohde: { kuva: { tiedosto: 'The Fighting Temeraire, JMW Turner, National Gallery.jpg',
        lahde: { tekija: 'J. M. W. Turner', teos: 'The Fighting Temeraire (1839), National Gallery', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg' } } },
      nimi: 'The Fighting Temeraire', lappu: { teksti: 'J. M. W. Turner' } },
    { kohde: { kuva: { tiedosto: "Canaletto - The Stonemason's Yard.jpg",
        lahde: { tekija: 'Canaletto', teos: "The Stonemason's Yard (n. 1725), National Gallery", lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Canaletto_-_The_Stonemason%27s_Yard.jpg' } } },
      nimi: "The Stonemason's Yard", lappu: { teksti: 'Canaletto' } },
    { kohde: { kuva: { tiedosto: 'Claude Monet - The Thames below Westminster.jpg',
        lahde: { tekija: 'Claude Monet', teos: 'The Thames below Westminster (1871)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Thames_below_Westminster.jpg' } } },
      nimi: 'The Thames below Westminster', lappu: { teksti: 'Claude Monet' } },
  ] }
```

## (i) Henkilö ↔ rakennus

Pelin jutuista (nahtavyysjutut.js, P) nimetyt arkkitehdit. Ylärivissä rakennus (3D pyörii), lappu = henkilön muotokuva + nimi. Triviaalit (Big Ben/Barry: nimi ei rakennuksessa, mutta Barry ja Pugin jaettu) jätetty varalle.

| # | Rakennus | Henkilö | Malli | Lähde (pelin juttu) |
|---|---|---|---|---|
| 1 | Pyhän Paavalin katedraali | Christopher Wren | 3D | juttu: "Uuden suunnitteli Christopher Wren, koulutukseltaan tähtitieteilijä" (P) |
| 2 | British Museum | Robert Smirke | 3D | juttu: "Robert Smirke rakensi nykyisen kreikkalaistyylisen pylväsjulkisivun 1823–1852" (P; 1873-taulukko V en-Wikipedia) |
| 3 | Natural History Museum | Alfred Waterhouse | 3D | juttu: "Alfred Waterhousen suunnittelema museo avattiin 1881" (P; taulukko V) |
| varalla | Westminsterin palatsi | Charles Barry (+ Augustus Pugin) | 3D | juttu (P); kaksi nimeä, ei yhtä oikeaa vastausta |

### Kuvat (i)

| Id | Tiedosto | Tekijä | Aika | Lisenssi | Koko |
|---|---|---|---|---|---|
| i1 | `Christopher Wren by Godfrey Kneller 1711.jpg` | Godfrey Kneller | 1711 maalaus | PD | 1206×1536 |
| i2 | `WP Robert Smirke.jpg` | George Dance (1741–1825) | 1809 | PD | 1517×2083 |
| i3 | `Waterhouse by Copeland.jpg` | Arthur Stockdale Cope | ennen 1886, maalaus | PD | 648×801 |

```js
{ id: 'lontoo-arkkitehdit-1', tyyppi: 'henkilo-rakennus',
  parit: [
    { kohde: { malli: '<St Paul\'s-avain, PK vahvistaa>' }, nimi: 'Pyhän Paavalin katedraali',
      lappu: { kuva: { tiedosto: 'Christopher Wren by Godfrey Kneller 1711.jpg',
        lahde: { tekija: 'Godfrey Kneller', teos: 'Christopher Wren (1711)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Christopher_Wren_by_Godfrey_Kneller_1711.jpg' } }, nimi: 'Christopher Wren' } },
    { kohde: { malli: '<British Museum -avain, PK vahvistaa>' }, nimi: 'British Museum',
      lappu: { kuva: { tiedosto: 'WP Robert Smirke.jpg',
        lahde: { tekija: 'George Dance', teos: 'Robert Smirke (1809)', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:WP_Robert_Smirke.jpg' } }, nimi: 'Robert Smirke' } },
    { kohde: { malli: '<NHM-avain, PK vahvistaa>' }, nimi: 'Natural History Museum',
      lappu: { kuva: { tiedosto: 'Waterhouse by Copeland.jpg',
        lahde: { tekija: 'Arthur Stockdale Cope', teos: 'Alfred Waterhouse', lisenssi: 'PD', muokkaus: 'rajaus sallittu',
                 linkki: 'https://commons.wikimedia.org/wiki/File:Waterhouse_by_Copeland.jpg' } }, nimi: 'Alfred Waterhouse' } },
  ] }
```

## Mitä uutta tuotava / varmistettava
- Uusia kuvia kaikki 9 (c1–c3, f1–f3, i1–i3); BY-vaatimus vain c2 (Wellcome, CC BY 4.0: tekijä, teos, lisenssi, linkki teoskortissa). Katsottava silmin ennen käyttöä (rajapinnan tiedot eivät riitä): erityisesti c1 (palatsimaalauksen aihe), c2 (rakennuksen julkisivu), i2 (piirros 1809).
- Faktaa tarvitaan: Old Bailey, Euston-asema ja (jos halutaan) Greenwichin palatsin syntymäfaktat eivät ole pelin jutuissa; riville lähde en-Wikipedia + toinen (yllä).
- Tarkistettavaa: Monet-taulun museo; Newgaten ja Placentian purkuvuosi (ristiriita; teksteihin ei tarkkaa vuotta); Turnerin taulun toinen lähde.
- PK vahvistaa: St Paul's, British Museum, NHM ja ORNC -mallien avaimet.
- Hakuja: noin 12 (6 hakutulosta, 6 WebFetch + Commonsin rajapinta); yksi hakutuloksen otteessa oli tekoälylle osoitettu kehote, ohitettu.
