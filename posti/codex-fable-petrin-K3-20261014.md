# CODEX → PT/Fable: Petřín K3 v1, uusi maski ja analyyttinen kamera (#262)

K3 on tehty **yhdellä kokonaisella uudella generoinnilla**. Koko masto, torni, juurihalli ja jalat näkyvät; hallin ikkunasivu tuottaa K2:n sisäänkäyntinäkymästä erottuvan sivuprofiilin. Uusi maski on annotoitu tästä K3:n natiivikuvasta, ja kamera sovitettu sen masto-/jalkapisteisiin analyyttisesti. Toimitan nämä arviointiin ja **pysähdyn K3-palautteeseen**. K4–K5: 0 kutsua. Mallituotanto odottaa kaikkien K1–K5-tavoitteiden hyväksyntää.

- [K3 v1, natiivi PNG](petrin-K3.png)
- [K3:n uusi täytetty ulkosiluettimaski](petrin-K3-maski.png)
- [K3:n analyyttinen kamerasovitus](petrin-K3-kamera-20261014.json)
- [Koko prompti, lähteet, QA, maskiannotaatio ja kamera](petrin-K3-tarkistus-20261014.json)

## K2:n PT-kelpuutus kirjattu erikseen

Lähde `fable-codex-petrin-K2-hyvaksytty-20261014.md` luettiin kokonaan ja blob c78d3c500a83aaa35e67f5417857f87841985933 varmennettiin (commit b4515ed04dad8e0bd7763bfef1c7b76f6c15dde7). Päätös koskee täsmälleen K2-toimitusta 49916de6c96280b92d77550a07ab5cc6b6183204. Sen kaikki 6 postiliitettä varmennettiin tavuina ennen jatkoa.

K2-kuva, maski ja natiivikoko 1024 × 1536 on PT:n hyväksymä. Kamera 190°, 55 m, silmä 1,7 m, FOV 60,964°, pitch 23,179° on PT:n kelpuuttama **lähtökamera**. K1:n FOV 29,373° ja pitch −15,755° on kirjattu. PT:n kuva-/maski-/koko-/kamerakelpuutus säilyy erillään riippumattomasta mittarivarmennuksesta: mallin IoU-, korkeus- ja ΔE-lukuja ei ole vielä mitattu. Aiempi QA, alkuperäiset kamerat ja kaikki K1/K2-versiot säilyvät. Hyväksyttyjä tavoitekuvia on nyt 2 ennen K3-arviota.

## K3: menetelmä ja kuva-QA

Sommitteluviitteenä oli uusi 1536 × 1024 2D-kaavio, rakenteen länsiviitteenä Giorgio Galeottin CC BY 4.0 -valokuva, hallin detaljiviitteenä VANOCE2022:n CC0-kuva ja materiaalin tyyliviitteenä hyväksytty K2. **Valokuvaviitteiden taustoja, ihmisiä, rajausta tai peittävää kasvillisuutta ei kopioitu.** K3 tuotettiin uutena koko kuvana; ei vanhan valokuvan paikallista muokkausta tai outpaintia. Kokonaismäärä Petřínissä on nyt 5 generointikutsua, joista K3:ssa 1.

Natiivi ja toimitus: **1536 × 1024**, ei suurennusta. Alkuperäisen 2400 px pitkän sivun pyyntö ei palautunut. K1/K2:n natiivit on jo kelpuutettu, mutta K3:n oman natiivikoon hyväksyntä on edelleen PT:n arvioitavana. RGB-pikselit ovat täsmälleen natiivin mukaiset; PNG:hen lisättiin vain havainnekuva- ja lähdeviitemetadata/sRGB-tallennus. Kuvassa on pieni ”havainnekuva”-merkintä.

Koko natiivikuva tarkistettiin henkilökohtaisesti. Fotorealistinen teräs, rappaus, luonnollinen puisto ja päivänvalo ovat uskottavia. Torni ei ole foreground-puiden peitossa, kuvassa ei ole ihmisiä, logoja tai luettavia opasteita. Hallista näkyy ikkunasivu, ei K2:n suoraan edessä oleva eteläinen pääsisäänkäynti. Absoluuttista atsimuuttia ei voi itsenäisesti todentaa generoidusta kuvasta; se säilyy annettuna länsisuunnan kameraoletuksena.

| Kohta | K3-havainto / sovitus |
|---|---|
| Mastokärki | y ≈ 56 ±3 px (5,5 % ylhäältä) |
| Jalkojen akselitaso | y ≈ 956 ±5 px (93,4 %); eri maankosketukset vaihtelevat perspektiivin vuoksi |
| Tornin akseli kuvakorkeudesta | 87,9 %; alkuperäinen kamera noin 71,7 % |
| Rungon/lyhdyn kattotaso | y ≈ 178 ±4 px |
| Ylätasanteen lattia | y ≈ 222 ±4 px |
| Alatasanteen näkyvä lattiareuna | y ≈ 574 ±8 px |
| Koko torni / maantasoprofiili / fotorealistinen | kyllä |
| Mallin koko siluetin IoU, korkeusvirhe, ΔE | ei mitattu; null |
| PT:n K3-kuva/maski/koko/kamera | odottaa palautetta |

## Analyyttinen kamera ja fyysisten mittojen säilyminen

Kameraolettamat: atsimuutti **270°**, etäisyys **110 m**, silmä **1,7 m**, roll 0. Etäisyys, korkeus ja absoluuttinen suunta ovat lähteen lähtöarvoja, eivät kuvasta itsenäisesti varmennettuja suureita. Mastokärjestä ja arvioidusta jalkojen akselitasosta ratkaistu **pysty-FOV 37.358°**, **pitch 15.454°**. Kuvasuhde 3:2. Liitteessä on koordinaattikäytäntö, sijainti, pääpiste, fokaalipikselit ja projektiokaava.

Ratkaisu on kahden pystyakselipisteen pinhole-sovitus: se sijoittaa maston ja jalkatason mitattuihin y-koordinaatteihin, mutta ei ole yksikäsitteisesti palautettu todellinen kamera tai koko 3D-siluetin varmennettu sovitus. 3D-mallia tai vertailurenderiä ei ole tuotettu. Kokonaiskorkeus noin 71 m sekä hallin arviomitat pidetään epävarmoina.

**Malligeometria pysyy #253:ssa:** runko 58,7 m, alatasanne 20 m, ylätasanne 51 m. Kuvasta havaittu alatasanteen lattiareuna poikkeaa tämän kameran akseliprojektiosta noin -97.4 px ja ylätasanteen lattia noin -58.6 px. Etureunat eivät ole kaikki keskellä runkoa olevia akselipisteitä, ja generaattorin rakennemittoihin jää virhettä. Näistä kuvan eroista ei muuteta mallin fyysisiä korkeuksia. K3:n IoU-raja pysyy 90 %; K1:n 85 % ei laajene K3:een. Korkeus- ja ΔE-rajat mitataan myöhemmin lähdeohjeen mukaan.

Maski on uusi käsin annotoitu täytetty ulkosiluetti K3:n natiivikoordinaateissa, sama 1536 × 1024 kangas, torni 255 / muu 0, pehmeä reuna 0 px. Ristikkorungon sisäaukot täytetään K1/K2:n tapaan. Koko maskin ulkoraja sekä maston ja juuren rajat tarkistettiin overlayna. Maski on arvioitava annotaatio, ei riippumattomasti sertifioitu pikselintarkkuus- tai IoU-totuus; K3:n PT-kelpuutus on avoin.

Lähdeviitteiden krediitit säilyvät JSON-liitteessä ja PNG-metadatassa: **Giorgio Galeotti — CC BY 4.0**, [länsivalokuva](https://commons.wikimedia.org/wiki/File:Pet%C5%99%C3%ADn_Lookout_Tower_-_Prague,_Czech_Republic_-_May_17,_2019.jpg); **VANOCE2022 — CC0**, [sisäänkäyntivalokuva](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_121942.jpg). Ne ovat arkkitehtuuriviitteitä; toimitettu K3 on tekoälyllä tuotettu sisäinen havainnekuva.

Tämä on sisäinen Git-postilaatikon arviointitoimitus: ei R2-peliassetia, peli-integraatiota, julkaisua tai main-haaran muutosta. K4–K5 ja mallituotanto odottavat. Peking-osuus ei kuulu tämän chatin työhön; sen tiedostoja tai tuotantoa ei ole muokattu eikä sille käynnistetty toista tekijää.
