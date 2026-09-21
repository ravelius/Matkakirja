# Maakuntavedos: nykyiset hallintoalueet FRA + DEU (Karttaseppä 21.9.2026)

Fablen tilaus 21.9.: Natural Earthin admin-1-aineistosta FRA:n 13 regionia ja
DEU:n 16 osavaltiota koelaattoina Pariisin ja Berliinin ympäristöstä, nimet
harvennettuina kapiteeleina ja aluerajat ohuina himmeinä viivoina. EI
tuotantoon; omistaja päättää kuvien perusteella. Sisältökirjurin 1873-luokan
rivit (Hannover, Oldenburg, Braunschweig, Anhalt) tulevat erikseen.

## Kuvat

`docs/raportit/kaappaukset/maakuntavedos-20260921/<versio>-<alue>-<näkymä>-<lat>_<lng>_<korkeus>.webp`

| versio | sisältö |
|---|---|
| **a** | nykyalueiden nimet + rajat (tuotannon 1873-maakuntanimet FRA/DEU pois, meret ja koristeet jäävät) |
| **b** | vain nykyalueiden nimet |
| c | lisäksi tuotannon nykyiset kulttuurialueiden nimet (PICARDIE, NORMANDIA, RHEINLAND …) samalla kartalla — näyttää päällekkäisyyden |

Näkymät: puhelin 390 × 844 @2 ja työpöytä 1400 × 900 @2; korkeus 0,2
(puhelin z7, työpöytä z6) ja 0,05 (z8, Pariisi / Berliini lähikuva).
Pelaaja Marseillessa (Ranska kohdemaana) ja Berliinissä (Saksa).

## Aineisto ja toteutus

- `nykyalueet-fra-deu.json` (samassa kansiossa): Natural Earth 10m
  admin_1_states_provinces (public domain). FRA:n regionit on yhdistetty
  departementeista (`region`-kenttä); nimen paikka on pinta-alapainotettu
  keskipiste; rajat ovat departementtien/osavaltioiden yhteiset särmät,
  joiden kahta puolta on eri alue (26 polylinea, 9 090 pistettä; rannat ja
  valtionrajat jäävät pois — ne ovat jo kartassa).
- Nimet suomeksi vakiintuneilla eksonyymeillä (Baijeri, Saksi, Ala-Saksi,
  Saksi-Anhalt, Mecklenburg-Etu-Pommeri, Berliini, Hampuri, Normandia,
  Korsika); muut alkukielellä. Sisältökirjuri tarkistaa. Kaupunkivaltiot
  ja Saarland `koko: pieni` (vasta z7:stä).
- Uusi nimiötason luokka **`raja`** (tools/fokuskartta/maailmapiirto.js,
  tools/generoi-laattapyramidi.mjs): `viivat: [[[lon, lat], …], …]`,
  yhtenäinen viiva `RAJAN_VARI` rgba(70,48,29,0,45), leveys z6 1,0 / z7
  1,5 / z8 2,2 px; ei tekstiä, ei väistöä, ei este muille nimiöille;
  peite ja metadata kuten muilla riveillä (tunnus `raja-<iso>`).
- Poltto: `node tools/generoi-laattapyramidi.mjs <ulos> --data
  ~/pyramidi-poltto/gshhs-data --nimiotaso --nimioversio vedos-nykyalueet-a
  --nimiot nimiot-vedos-a.json --tasot 6-8 --alue -1.5,46.5,6.5,51`
  (Berliini 9.5,50.5,16,54.5); 5 s per ajo. Kaappaus: tuotannon luettelo,
  jonka `nimiotaso` korvattu paikallisella, ja nimiölaatat reititetty
  koekansiosta (scratch kaappaa-vedos.mjs).

## Havainnot

1. Rajat ovat z6:lla himmeät mutta luettavat (Ranska työpöydällä), z7–z8
   selvät; ne eivät kilpaile valtionrajan eivätkä jokien kanssa.
2. Nimet törmäävät paikoin nostoihin ja kaupunkeihin: HAUTS-DE-FRANCE
   Amiensin alla, SAKSI-ANHALT Quedlinburgin päällä, BRANDENBURG Berliinin
   kaupunkinimen alla; pitkät nimet (PROVENCE-ALPES-CÔTE D'AZUR,
   AUVERGNE-RHÔNE-ALPES) ovat z6:lla leveitä. Ladonnan väistö toimii, mutta
   nykyalueiden keskipisteet osuvat usein juuri kaupunkeihin — käsin
   säädetyt sijainnit (kuten 1873-nimistössä) tarvitaan tuotantoon.
3. Versio c näyttää, että 1873-kulttuurialueet ja nykyalueet samalla
   kartalla ovat liikaa (PICARDIE + HAUTS-DE-FRANCE, RHEINLAND +
   RHEINLAND-PFALZ): tuotannossa joko toinen tai linssin mukaan.
4. Tuotantopoltto vaatii vain nimiötason uusintapolton (uusi
   `--nimioversio`), ei pohjaa, viivoja eikä pallosarjaa.

## Vedos 2 (omistaja valitsi a:n; Fable 21.9. iltapäivä)

Kansio `kaappaukset/maakuntavedos-20260921/vedos2/`:
`<muste>-<alue>-<näkymä>-<lat>_<lng>_<korkeus>.webp`, muste **ruoste** (vaimea
ruosteenpunainen "toinen muste") tai **sepia** (vaaleampi sepia). Kohdat:
Pariisi 48.85,2.35 ja 49.7,2.7 (Hauts-de-France/Île-de-France) korkeus 0,05
(puhelin z8, työpöytä z7), Berliini 52.52,13.4 ja 51.95,12.3 (Saksi-Anhalt/
Brandenburg); lisäksi 0,2 (z7/z6) näyttämään, että nykyalueet EIVÄT näy
kaukaa.

Toteutus (samassa haarassa):
- Kulttuurinimet (1873-nimistön `maakunta`, keskisävy) ennallaan kaikilla
  tasoilla; nykyalueet uutena luokkana **`nykyalue`**: koot z7 16 / z8 22 px
  (pieni: z8 18), z7:llä vain jos mahtuu (generaattori pudottaa ilman
  vapaata paikkaa), z8:sta aina. Harvennetut pienkapiteelit (sanan
  alkukirjain täysi, muut 0,78; `pienkapiteelienOsat`).
- Musteet (`NIMION_VARIT`, `RAJAN_VARIT`, rivin `muste`): ruoste
  rgba(146,66,38) nimet 0,60 / rajat 0,42; sepia rgba(70,48,29) nimet 0,36 /
  rajat 0,45 (rajat yhtä himmeät kuin vedoksessa 1). Hierarkia: nostot ja
  kaupungit tummin (elävä kerros), kulttuurinimet 0,58, nykyalueet vaalein.
- Käsin säädetyt sijainnit 19 nimelle (`vedos2/tee-nimiot2.mjs`, taulukko
  `kasin`): Hauts-de-France pois Amiensin päältä, Saksi-Anhalt pois
  Quedlinburgista, Saksi pois Dresdenistä/Meissenistä, Grand Est pois
  Nancystä, Centre-Val de Loire pois Chambordista jne. Ladonta: 0 pudotettua
  z6–z8, 14–23 väistöä.
- Nykyalue, jonka nimi on jo kulttuurinimenä (Bretagne, Normandia,
  Île-de-France, Korsika, Brandenburg, Schleswig-Holstein, Baijeri, Hessen,
  Hampuri, Bremen), jätetään pois — sama nimi kahdella musteella olisi
  virhe; kulttuurinimi kantaa sen. Raja piirtyy silti.

Huomiot: z8:lla rajat ovat 2,2 px ja himmeät, ruoste erottuu paremmin
kuin sepia maastovärin päällä; nykyalueiden nimet ovat kapiteeleja
pienempiä ja väistyvät hyvin. Tuotantoon tarvitaan Sisältökirjurin
nimitarkistus ja nimiötason uusintapoltto (vain `--nimioversio`).

## Vedos 3 (omistaja: ruoste ei erottunut sepiasta; Fable 21.9.)

Kansio `kaappaukset/maakuntavedos-20260921/vedos3/`: `ruoste-vahva-pariisi-puhelin-*.webp`
(49.7,2.7; 49.35,2.6 = Hauts-de-France/Île-de-France-raja; 48.85,2.35; z8) ja
**vertailukuva `vertailu-ruoste-vedos2-vs-vedos3-200pros.png`**: sama rajaus
(Artois–Hauts-de-France–Amiens–Picardie–raja–Île-de-France, puhelin z8)
rinnakkain 200 %:ssa, vasemmalla vedos 2:n ruoste, oikealla vedos 3:n.

Muste `ruoste-vahva` (`NIMION_VARIT`/`RAJAN_VARIT`): syvempi sävy
rgb(128,44,20), nimet peitto 0,95 (oli 0,60 ja rgb 146,66,38), rajat 0,75
(oli 0,42); leveydet ennallaan. Ensimmäinen yritys 0,85/0,60 samalla
sävyllä ei vielä erottunut — pienkapiteelit ovat ohuita ja pergamentti
tummentaa; siksi lähes täysi peitto. Poltetut nimiöt piirtyvät kerman ja
sumun päälle (kerrosjärjestys pohja → väri/kerma → ranta → viivat →
nimiöt), joten löytämisen sumu ei haalista niitä.

## Vedos 4: ITA, ESP, GBR, POL, AUT (+ CHE valmiina) — Karttaseppä 21.9.2026 ilta

Fablen tilaus 21.9. ilta: samat säännöt kuin FRA/DEU (loki NYKYMAAKUNNAT POHJAKARTALLE
21.9. klo 13.43; muste ruoste-vahva, nimet z7–z8, rajat z6:sta). Aineisto Natural Earth
10m admin-1 (public domain): ITA 20 regionia (provinsseista `region`-kentällä), ESP 17
itsehallintoaluetta + Ceuta ja Melilla (`region`), GBR 4 maata (`geonunit`, ei
kreivikuntia), POL 16 voivodikuntaa, AUT 9 osavaltiota, CHE 26 kanttonia (valmiina
datassa, ei vedoksessa). Työkalu `vedos4/tee-nykyalueet.mjs` (rajat = eri alueiden
yhteiset särmät, Douglas–Peucker 0,004°; nimen paikka pinta-alapainotettu keskipiste,
käsin säädetyt paikat taulukossa KASIN); data `vedos4/nykyalueet-<iso>.json`,
nimistö `vedos4/nimiot-vedos4.json` (tuotannon 149 riviä + 67 nimeä + 6 rajariviä).

Sama nimi kulttuurinimenä → nykyalueen nimi pois, raja piirtyy (vedos 2:n sääntö).
Ohitettu: ITA 14 (Piemonte, Lombardia, Veneto, Liguria, Toscana, Umbria, Marche, Lazio,
Campania, Apulia, Basilicata, Calabria, Sisilia, Sardinia), ESP 12 (Andalusia, Aragonia,
Asturia, Baleaarit, Kanariansaaret, Katalonia, Extremadura, Galicia, Murcia, Navarra,
Valencia, Baskimaa), POL 1 (Pommeri). Abruzzo ja Molise jäävät, vaikka 1873-nimi
"ABRUZZI E MOLISE" on eri nimi — Sisältökirjurin päätettäväksi.

### Suomenkieliset nimet (Sisältökirjurin tarkistukseen)

- **ITA** (6): Emilia-Romagna, Trentino-Alto Adige, Abruzzo, Friuli-Venezia Giulia, Molise (pieni), Aostanlaakso (pieni)
- **ESP** (7): Kastilia ja León, Kastilia-La Mancha, Madrid (pieni), Kantabria, La Rioja, Ceuta (pieni), Melilla (pieni)
- **GBR** (4): Englanti, Skotlanti, Wales, Pohjois-Irlanti
- **POL** (15): Masovia, Suur-Puola, Varmia-Masuria, Länsi-Pommeri, Lublin, Podlasia, Ala-Sleesia, Łódź, Kujavia-Pommeri, Alakarpatia, Vähä-Puola, Lubusz, Sleesia, Świętokrzyskie, Opole
- **AUT** (9): Ala-Itävalta, Steiermark, Tiroli, Ylä-Itävalta, Kärnten, Salzburg, Burgenland, Vorarlberg, Wien (pieni)
- **CHE** (26): Graubünden, Bern, Valais, Vaud, Ticino, St. Gallen, Zürich, Fribourg, Luzern, Aargau, Uri (pieni), Thurgau, Schwyz (pieni), Jura, Neuchâtel, Solothurn, Glarus (pieni), Basel-Landschaft, Obwalden (pieni), Schaffhausen (pieni), Geneve (pieni), Nidwalden (pieni), Zug (pieni), Appenzell Ausserrhoden (pieni), Appenzell Innerrhoden (pieni), Basel-Stadt (pieni)

### Kuvat

`vedos4/<maa>-z6|z7|z8.jpg`, työpöytä 1400 × 900 @2, pelaaja pääkaupungissa
(Rooma 44,3/11,0; Madrid 40,5/−3,5; Lontoo 53,5/−2,5; Varsova 51,8/19,5; Wien 47,6/14,5),
korkeudet 0,2 / 0,1 / 0,05. Ladonta z6 80 nimiötä (0 pudotettu), z7 175 (1 pudotettu),
z8 195 (0 pudotettu). Kaappaus main-koodilla (v2017), tuotannon luettelo jonka nimiotaso
korvattu koeversiolla `vedos4-nykyalueet`, nimiölaatat reititetty koekansiosta.

### Havainnot

1. Italiassa ja Espanjassa lähes kaikki alueet ovat jo kulttuurinimiä, joten uusia
   ruostenimiä tulee vain 6–7; rajat piirtyvät kaikille. Kuva näyttää siis
   ensisijaisesti RAJAT kulttuurinimien alla.
2. GBR: kaksi rajaa (Englanti–Skotlanti, Englanti–Wales), neljä nimeä.
3. Puola ja Itävalta saavat täyden sarjan (15 + 9 nimeä); Puolan voivodikuntien
   nimet ovat suomennoksia (Masovia, Suur-Puola, Vähä-Puola, Alakarpatia …) — vaihtoehto
   puolankieliset (Mazowieckie …), Sisältökirjuri päättää.
4. Käsin säädetyt paikat (KASIN) 24 nimelle; loput keskipisteessä.

EI polttoa ennen omistajan korttia. Tuotantoon: nimiötason uusintapoltto
(`--nimioversio 2026-09-22g-nimiot`, nimistö = tuotannon lista + `nykyalueet-uudet.json`
+ rajat), ei pohjaa eikä pallosarjaa.
