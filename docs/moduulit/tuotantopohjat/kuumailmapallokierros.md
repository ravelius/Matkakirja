# Tuotantopohja: kuumailmapallokierros

*(LUONNOS 17.10.2026, Sisältökirjuri, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit (Lontoo, Praha, Ateena; Tukholma ja Pariisi suunnitelmina); uusia sääntöjä ei ole.
Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Sisältö-osuuden omistaa Sisältökirjuri; muut osat
täydentävät tekijänsä otsikoilla "TÄYDENTÄÄ: <rooli>". PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: KAMERA viitevideo tai kuvakäsikirjoitus lennosta ja pysähdyksistä ennen koodausta; UUDET TEKSTITYYPIT muutama esimerkki pelinäkymässä ennen koko erää. Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

Kuumailmapallokierros = kaupungin valmis esittelylento: pallo laskeutuu avaukseen, pysähtyy kahdeksalla kohteella, lentää
niiden välillä ja päättää kierroksen loppuun; kertoja William kertoo ja historiaosiot kuuluvat reitin varrelle. Kierroksen
päätteeksi Pulu kutsuu vapaaseen lentoon. Pohja kattaa sisällön ja sen tarkistuksen; lennon, kameran, kaupungin 3D:n ja
äänen työ on omissa osissaan (luvut 7–9). Ei kata 3D-maamerkkiä eikä pääkaupungin avausta (`paakaupungin-avaus.md`, oma pohja).

**Rajaus:** uusi kierros on Euroopassa, kunnes omistaja aloittaa muut maanosat (MUUT MAANOSAT VÄHITELLEN). Kreikan muistomerkkikohteisiin ei tehdä uusia kierroksia, ja Ateenan
kierros piilotetaan Kreikan App Storessa (storefront GRC); Ateenan tilalle tuli Praha (Raamattu, KREIKKA, 12.10.).

## 1. Tuotantoputki ja roolit

```
Karttaseppä: kaupungin 3D ja kohdelista (8 kohdetta, järjestys, Q-id, sijainti, H_m)
  → Sisältökirjuri: faktaliite → kertojan käsikirjoitus (avaus, 8 pysäkkiä, loppu) + 8 historiaosiota + kartan ja kohdelistan nimet
  → riippumaton tarkistus (3 Sonnet-tarkistajaa) → korjaukset → PT: lista, tyyli ja hyväksyntä
  → Äänittäjä: kertoja William (pysyvä lupa PT:n hyväksymiin teksteihin) + musiikki
  → Linssiseppä: lento, kamera, ajoitus, historiaosioiden paikat → kytkentä → Julkaisija
  → Pulun kutsu: Tekstit-osasto → omistajan rasti (sanatarkka toisinto ei rastia)
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Kaupunki ja kohteet | Karttaseppä | 3D läpi; kohdelista ja reitti (`kohteet.json`, `matka_m`, `H_m`) |
| 1. Faktaliite | Sisältökirjuri (Sonnet) | `<kaupunki>-faktat-<pvm>.md`, kaksi lähdettä per väite |
| 2. Käsikirjoitus | Sisältökirjuri | `<kaupunki>-kerronta-<pvm>.json` + `<kaupunki>-kasikirjoitus-<pvm>.md` |
| 3. Historiaosiot | Sisältökirjuri | `<kaupunki>-historia-<pvm>.json` (8) + faktaliite + kuvat Commonsista |
| 4. Tarkistus | tarkistaja-agentit, PT | `pallokierros-tarkistus-<pvm>.md` (KORJAA/EPÄVARMA) |
| 5. Pulun kutsu | Sisältökirjuri | tunnus `pulu-vapaalento-kutsu-<kaupunki>` Tekstit-osastoon |
| 6. Ääni ja musiikki | Äänittäjä | otot, mittaus, vienti |
| 7. Lento ja kytkentä | Linssiseppä | kierros pelissä, ajoitus, nimet, kutsu |
| 8. Retrospektiivi | Sisältökirjuri | kirjaus luvun 10 oppeihin |

Sisältökirjuri ei kytke eikä vie; ilmoita PT:lle viestillä (enintään 3 riviä), yksityiskohdat tiedostoon. Agentit vain Opus ja
Sonnet.

## 2. Kultainen polku (oletustapa)

1. **Kohteet tulevat Karttaseppä-listalta, ei sisältökirjuri valitse.** Kahdeksan kohdetta kierrosjärjestyksessä (lyhin reitti),
   avausnäkymän kohde ja reitti (`kaari` tai `lento`, `matka_m`). Kohteita ei vaihdeta eikä järjestetä uudelleen tekstityön
   aikana. Kierroksella on kolme "muistettavaa asiaa" (esim. Lontoo: joki, kaksi keskustaa, rakennettu uudelleen tulesta ja
   sodasta): jokainen kohde palvelee jotakin niistä, eikä kierros luettele kohteita (`suunnitelma.md` luku 1).
2. **Faktaliite ensin.** Jokainen väite saa kaksi itsenäistä lähdettä (Wikipedian kieliversiot ja saman julkaisijan sivut eivät
   ole riippumattomia); väitteet, jotka eivät varmistuneet, poistetaan. Britannica/UNESCO/matkasivut 403: ei kierretä, kirjataan.
   Kameran korkeus `H_m` kirjataan faktaliitteeseen lähteineen mutta ei kerrontaan; merkitse, jos luku on pituus tai arvio.
3. **Käsikirjoitus.** Kertoja William, yksi otto per teksti. Rakenne: avaus ("Tervetuloa <kaupunkiin>.", maisema ylhäältä,
   "Kierros alkaa …"), 8 pysäkkiä, loppu. Pysäkkiteksti on pieni tarina (neljä tai viisi tarkistettua faktaa, tunnistettava piirre
   ensin), lähes puhekielinen mutta ei hehkutusta; isoisän 1873-viittaus vain harvoin ja tosiasiana (Prahan kello). Luvut sanoiksi
   ennen merkkimäärän laskemista; kokonaispituus ilmoitetaan (Praha 8 103, Ateena 7 274 merkkiä).
4. **Historiaosiot: 8 per kaupunki, jokainen soi omassa paikassaan (omistaja 23.16).** Osio kertoo sen paikan tai alueen
   historiasta, jonka yllä pallo lentää, eikä satunnaisella lennolla. Osio ei kerro asiaa, joka ei kuulu paikkaan (esim. Louvren
   kohdalla ei Pariisin perustamista). Pituus 38–56 sanaa (noin 28–46 s). Jokaisella osiolla on
   `tunnus`, `otsikko`, `teksti`, `kesto_s` (sanamäärä × 0,70 s, korvataan äänen todellisella kestolla), `lahteet` ja Commons-kuva
   (PD/CC0/CC BY, tarkistettu API:lla). Historiaosio ja pysäkin kerronta eivät toista toisiaan.
5. **Kierroksella vain paikan nimi ilman selitettä, kartalla ja kohdelistassa (omistaja 23.18).** Kohdekartalla ja kohdelistassa
   näkyy pelkkä paikan nimi; `selite`-kenttä ei näy pelaajalle. Nimet ovat tarkistettuja Wikidata-nimiä; vakiintunut suomalainen
   nimi kerronnassa.
6. **Pulun kutsu.** Kierroksen jälkeen Pulu kutsuu vapaaseen lentoon: tunnus `pulu-vapaalento-kutsu-<kaupunki>`, kaksi
   virkettä: "<Kaupunki> on nyt sinun, …", sitten viittaus nappiin "Mikä tämä on?" ja pyyntö napauttaa rakennusta. Ensimmäinen virke saa
   kaupungin oman, näkyvän piirteen (Thames, Akropolis); loppu on sanatarkka. Luku sanoiksi, ei ammattikieltä, Pulun tyyli
   (`livia-aani.md`).
7. **Riippumaton tarkistus ennen PT:tä.** Kolme tarkistajaa, jotka eivät kirjoittaneet tekstejä, hakevat omat lähteensä
   (omat haut ennen faktaliitteen lukemista) ja tarkistavat faktat ja suomen kielen. Raportti: KORJAA / EPÄVARMA / OK väitteittäin;
   korjaus tehdään varovaisemmaksi muotoiluksi, ei uudeksi väitteeksi; kaikki korjaukset viedään tekstiin, käsikirjoitukseen ja
   faktaliitteeseen.
8. **Äänen ennakkotarkistus Äänittäjälle:** "eaa." lauseen keskellä ja luvut 100–199 sanoiksi; merkitse tekstit, joissa ne
   esiintyvät (Ateena: pysäkit 3, 6 ja 7 sekä historiaosiot).
9. **Kuvat ja ääni vasta hyväksynnän jälkeen.** Kertojan ääneen on pysyvä lupa PT:n hyväksymille teksteille; Pulun kutsu ei kuulu
   siihen. Historiaosiot PT arvioi itse riippumattoman tarkistuksen jälkeen ilman omistajan rastia
   (omistaja 16.10. 19.51).

## 3. Valmiin määritelmä (tarkistuslista)

Sisältö-osuus ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Kaupunki Euroopassa (ei Kreikan muistomerkkikohteita), 3D läpi, kohdelista ja reitti Karttasepältä.
- [ ] Faktaliite: kaksi lähdettä per väite, ei-varmistuneet pois, `H_m`-lähteet merkitty.
- [ ] Käsikirjoitus: avaus, 8 pysäkkiä, loppu; kierroksella kolme muistettavaa asiaa; puhuttu merkkimäärä ilmoitettu.
- [ ] 8 historiaosiota, kukin omassa paikassaan, 38–56 sanaa, kuvat Commonsista lisenssitarkistettuina.
- [ ] Kartalla ja kohdelistassa vain paikan nimi ilman selitettä.
- [ ] Pulun kutsu Tekstit-osastossa ja hyväksytty (tai sanatarkka toisinto).
- [ ] Riippumaton tarkistus tehty (3 tarkistajaa), KORJAA-rivit korjattu, EPÄVARMA-rivit pehmennetty tai pois.
- [ ] PT:n hyväksyntä listalle, tyylille ja teksteille.
- [ ] `eaa.`- ja lukulista Äänittäjälle; `H_m`-huomautukset Linssisepälle ja Karttasepälle.
- [ ] Avoimet kuvariskit (esim. tekijätön PD-anon-70, vanha PD-old-80) kirjattu PT:lle.
- [ ] Luovutusraportti: tiedostopolut, heikoimmat kohdat, pudotetut väitteet.
- [ ] Retrospektiivi kirjattu luvun 10 oppeihin.

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.

## 5. Hyväksyntäpolku

| Sisältö | Hyväksyjä | Perusta |
|---|---|---|
| Kierroksen lista (kohteet, järjestys) ja tyyli | PT | Karttasepän lista, PT 14.10. |
| Pysäkkitekstit ja historiaosiot | PT riippumattoman tarkistuksen jälkeen, ilman omistajan rastia | omistaja 16.10. 19.51; kertojan pysyvä lupa |
| Pulun kutsu | omistaja (Tekstit-osasto); sanatarkka toisinto (vain kaupungin nimi vaihtuu) ei rastia | PT 17.10.; Pululle ei pysyvää lupaa |
| Äänet | kertoja: pysyvä lupa; muut KK:n "OMISTAJAN PÄÄTÖS" -rivillä | `kertojan-teksti-ja-aani.md` |
| Sääntöjen muutos | PT → omistaja | Raamattu |

## 6. Tyypilliset virheet (tarkistajan lista)

1. **Yksi tai ristiriitainen lähde** (uhriluvut, rahoitus, aloitusvuodet "noin"; Parthenonin 1687 uhriluku ja Deloksen liiton
   rahoitus pudotettiin): "noin", alaraja (Trafalgar "ainakin 17") tai pois.
2. **Maantieto- ja kielivirheet** (Ypres ei ole Ranskassa; pituuspiiri ≠ pituusaste): tarkista paikka ja termi erikseen.
3. **Lähdettä vahvempi muotoilu** ("vartioi" vs. "kunniavartio", "alle" vs. "peitetty", "portilla"): pehmennä lähteen sanaan.
4. **"Kaksi kokonaisena seisovaa rakennusta", "alkuperäiset suojassa"** -tyyppiset kokonaisväitteet: tarkista (Ateena: viisi
   karyatidia suojassa, kuudes Lontoossa).
5. **Pituus esitetty korkeutena** (`H_m` = kohteen pituus, ei korkeus) ja yhden lähteen mitat: kirjaa.
6. **Patsaiden tai rakennusten kopio ja alkuperäinen sekoittuvat** (Kaarlensillan patsaat: kopiointi alkoi jo 1900-luvun alussa).
7. **Kuvan lisenssi:** tekijätön PD-anon-70-EU tai PD-old-80 on riski; Hollarin ja vastaavien kuvauksissa tarkista kuvan sisältö
   (Petřín on kuvan oikeassa reunassa).
8. **Historiaosio toistaa pysäkin kertomuksen.**
9. **Pulun kutsu kuvaa piirteen, jota pelaaja ei näe vapaan lennon alussa.**

## 7. TÄYDENTÄÄ: Linssiseppä (lento ja kamera)

*(kierroksen rakenne ja ajoitus (`docs/kohtaukset/pallokierros/liikesaannot.md`, `suunnitelma.md`), kohteen kerronnan alkaminen
laskeutumisessa, historiaosioiden paikat reitillä (kukin omassa paikassaan), nimien näyttö, koko reitin karkea esilataus, kori ja
köydet, kameran korkeus (`H_m`), Pulun kutsun kytkentä. Täydentää Linssiseppä.)*

## 8. TÄYDENTÄÄ: Karttaseppä (kaupunki)

*(Karttaseppä 19.10.2026, PT:n toimeksianto (omistaja 19.10. klo 15.35, Raamattu 8.1): rivit on siirretty luovutuksista ja
muistista; uusia sääntöjä ei ole. Luovutukset `docs/raportit/viesti-karttaseppa-luovutus-<pvm>.md` ovat haarassa
`karttaseppa-tyo-20260922`.)*

**Kaupungin 3D ja mittaus.**

- Google 3D -mittari luokittelee keskustan pisteet (SALLITTU / RAJA / POIS, säde `r_m`), ja samassa ajossa ajetaan
  kalibrointikaupungit (Ljubljana, Praha). Pelkkä mittari ei riitä: kaupunki testataan oppaan omista kulmista (avaus 5000 m /
  25° pystystä, kierto 220–2200 m / 25–78°, vapaa lento ≤ 12 km `r_m`-alueella). Juna 198: Varsova oli mittarilla SALLITTU,
  mutta vapaassa lennossa sumea → POIS. Lähde: luovutus 16.10. ilta2 (PT 16.10.); `paakaupungit-3d-20261016/TULOS.md`.
- Kaupunkipaketin maasto: tarkista ennen ajoa, onko Mapterhornissa z13–14 (HEAD `tiles.mapterhorn.com/14/x/y.webp`); ilman
  niitä DSM-polku tai `kaupunkipaketti-z12.sh` (Bukarest, Reykjavik). Lähde: luovutus 13.10. aamupäivä.
- Vesimaski: OSM-laguunisuhteesta voi puuttua keskustasaari (Venetsia oli vettä) → `saaret-reiiksi.py`; auditointi
  "rakennukset vesimaskissa ≤ 0,05 %" kaikista kaupungeista. Lähde: luovutus 13.10. aamupäivä.
- Karttaa tarkistettaessa katsotaan värikarttaa (`varikartta`), koska peli näyttää sen; `polku`-kuva voi olla vanha.
  Lähde: luovutus 11.10. ilta2.

**Kohdelista, sijainnit ja Q-id:t.**

- Kohdelista toimitetaan `kohteet.json` + `KOHTEET.md` (8/kaupunki); katse_suunnat ovat arvioita, ja niitä korjataan
  pyydettäessä. Lähde: luovutus 16.10. ilta (`paakaupungit-3d-20261016/`).
- Sijainnit tarkistettiin Wikidatan koordinaatteja vastaan: Kööpenhaminassa 8/8 kohdetta, ero 9–94 m eli alle kohteen koon
  (`koko_m`); Tivolin 94 m on versiorivillä kirjattu tarkoituksellinen siirto järvelle (v7). Lähde:
  `_tyo/karttaseppa/koopenhamina-kippi-karttatarkistus-20261019.md`.
- Haut: Wikipedian ja Wikidatan `/w/` (myös `api.php`) ja `query.wikidata.org/sparql` ovat robots.txt:ssä kiellettyjä;
  `/wiki/`-artikkelisivut ovat sallittuja (koordinaatit sivun `wgCoordinates`-kentästä). Lähde: luovutukset 11.10. ilta ja
  12.10. ilta; Wikidatan robots.txt 19.10.

**Pysähdysten kulmat (`katse_suunta`, `katse_kaari`, `silma_m`, `H_m`).**

- Silmä 0,5–0,7 × H maasta (`liikesaannot.md`). Prahan linnan ja Malá Stranan muutokset hylättiin, koska liu'ut pitenivät
  yli 15 s; pysäkkitarkistus: `_tyo/karttaseppa/pysakit-tarkistus-20261014.md` (24 pysäkkiä). Lähde: luovutus 15.10.
- Katse valitaan niin, että kaupungin tunnistettava linja näkyy (Greenwich 157°, silmä 45–60 m: Queen's House, Thames ja
  Canary Wharf linjassa; lento 22 → 44 s hyväksyttiin). Lähde: luovutus 15.10.; `greenwich-selvitys-20261014.md`.
- Katse ei saa näyttää suojattua rakennusta (Opéra Bastille, arkkitehti elossa) → kamera toiselle puolelle. Lähde: luovutus
  11.10. ilta.
- Katseen suunta voi laukaista rajauskorjauksen (Josefov 340° → −14° korjaus → 320°). Kameramuutokset ajetaan aina
  Linssisepän testeillä ennen lähettämistä. Lähde: luovutukset 14.10. ilta ja 15.10.

**Kartan kamera ja lennot (natiivi).** Pääkartan kamera kulkee Kamerajohtajan kautta (`PalloLiikkeet.cs`: PalloTila,
PalloAjo; `PalloTarkastus.cs`: kartan omat rajat KarttaRajat; lennot `PalloRata.cs`), ja kameraan kirjoittaa vain
`KameraKirjoittaja.Aseta` (19.10.: myös `PalloKierto.Aseta`, ruutuaikavahti "kartta"). Lähde: luovutus 19.10. päivä;
`_tyo/karttaseppa/kamerakirjoittaja-kartta-204/TULOS.md`.

**Simu- ja todistusajot.**

- `uusi-peli` ei aja aloituslentoa: lentotodisteisiin `komento nappula lenna …` / `komento nappula aloitus …`
  (`_tyo/karttaseppa/lentojen-kamera-204/sk-lennot.txt`). Tarkista komennon polku ennen kattavuusväitettä. Lähde: luovutus
  19.10. päivä (Velat ja opetukset 1).
- Simu yksin: kuormassa (3 simua) simu jäätyi 31 s ja pysäkki ohittui. Lähde: luovutus 18.10. aamu.
- `todistusajo.sh`:n OK ei tarkista kuvan sisältöä → kuva-arkki katsotaan aina ennen lähetystä. `palaute`-rivi lukee vain
  askeleen jälkeiset lokirivit; jo tulleelle riville `oleta`. Lähde: luovutukset 17.10. aamupäivä ja 19.10. päivä.

## 9. Äänittäjä (kertoja ja musiikki)

- **Kertoja William** (`oae6GCCzwoEbfc5FHdEu`): `eleven_v4_turbo`, nopeus vain `speed`-asetuksella, `language_code fi`, yksi otto per kohta;
  putki ja lupa `kertojan-teksti-ja-aani.md`.
- **Merkkimäärä ja portti:** laske puhutusta tekstistä, `aaniportti.py` läpi ennen vientiä.
- **"eaa." -lukutarkistus:** korvaa vain sanarajalla (`\beaa\.`), lauseen lopussa piste; luvut 100–199 sanoiksi (sata…).
- **Kestot:** kun otot ovat valmiit, korvaa arvioidut kestot `kesto_s`-kenttiin mitatuilla ja ilmoita kytkijälle.
- **Vienti:** `vie-paketti.sh`, uudet nimet, ajat- ja manifestirivit; mykistykset pois vasta kytkennän jälkeen.
- **Kierroksen musiikki:** aina Lyria 3.5 (Raamattu 5.15), lyhyt pelkästään myönteinen kehote (5.16); muu lähde vaatii omistajan luvan. Älä
  käynnistä Lyria-kutsuja ilman lupaa; ehdokkaat sokkokuvataan ennen omistajaa (9.11).

**Tarkistuslista**
- [ ] Kaikki kohdat otettu, `eaa.`-ja numerotarkistus tehty, kestot kentissä.
- [ ] Portti läpi, vienti ok, rivit kytkijälle kuitattu.
- [ ] Musiikki Lyriaa ja luvan sisällä.

## 10. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa.

*(Rivit 15.–19.10.2026 on siirretty lokista, muistista ja KK:n katselmuksesta omistajan päätöksellä 19.10. klo 15.35; uusia sääntöjä ei ole.)*

- **19.10.2026, Kööpenhaminan kierroksen napit ("kippi").** Omistajan linjaus: taukoa painettaessa ⏸ muuttuu ▶:ksi ja
  rivi on `Lennä itse | < ■ ▶ > | Kysy` (< edellinen, > seuraava kohde, muut napit pois paitsi yläreunan ☰); Kysy-nappi
  tuo tähtäimen, napin "mikä tämä on" ja neljä kerrallaan näkyvää kysymystä (8 per kohde, reunat feidautuvat); vapaassa
  lennossa vain ohjaimet sekä `<` ja `Kysy`; Mac: WASD = vasen tikku, nuolet = oikea. Päivitetään kaikkiin kierroksiin, ja
  kierroksen jokaisesta kohteesta CC-kuva ja havainnekuva. Muuttuu: nappilogiikka päivitetään kaikkiin kierroksiin.
  Lähde: loki "PAATOKSET 19.10.2026 klo 11.27–11.40" ja "klo 11.41–11.45".
- **17.10.2026, pallokierrosten äänimaisemasilmukat (KK-katselmus).** Hidasti: 6 silmukkaa tehtiin Freesoundin
  esikuuntelu-mp3:ista AST- ja Whisper-valinnalla (`luokita.py`), silmukkakohta koneella (`tee.py`), ja PT kuittasi
  kuulematta; silmukat olivat junan lukitusehtona. Raamattu 5.27 (sokkokuuntelu, Soundly ja Sonniss ensin) koskee
  tehosteita; äänimaisemiin laajennus on KK:n suositus, joka odottaa omistajan päätöstä. Lähde: scratchpad
  putket-lapikaynti-20261019, ääni V1; loki "OMISTAJA: ÄÄNITEHOSTEIDEN OLETUSTAPA HYVÄKSYTTY (19.10.2026 klo 14.35)".
- **15.10.2026, Ateena v12 kahteen kertaan.** Hidasti: Pelikoodari ja Linssiseppä tekivät kumpikin saman v12:n samalla
  Zeus-muutoksella (edb351a43, 08ac5caee); CDN:n ämpäri on muuttumaton, joten vain ensin viety kelpaa ja Natiivisepälle
  piti erikseen kertoa, kumpi haara junaan otetaan. Muuttuu: ennen uutta versiota `ls /Users/Shared/Claude/proto-3d/_valmiit
  | grep <kaupunki>-v` ja sovi viestillä kaupunkia työstävän roolin kanssa, kuka tekee version N. Lähde: muisti
  pallokierros-versio-tarkista-valmiit.
- **15.10.2026, Lontoon historiaosiot A.** Riippumattoman tarkistuksen tulos: 39 OK, 9 KORJAA, 0 POISTA (yksi aito faktavirhe,
  yksi kielivirhe, loput pehmennyksiä). Muuttuu: tarkistajat hakevat omat lähteet ennen faktaliitteen lukemista (kultainen polku 7).
- **14.10.2026, Praha ja Ateena (16 historiaosiota, Ateenan avaus, loppu ja 8 pysäkkiä).** Kolme riippumatonta tarkistajaa:
  Praha 1 virhe, Ateena 2 virhettä pysäkeillä, tarkennuksia yhteensä 46; pudotettiin tai pehmennettiin neljä väitettä.
  Muuttuu: tarkistus ennen ääntä, ei sen jälkeen (kultainen polku 7 ja 9).
- **14.10.2026, `H_m`.** Ateenan pysäkeillä 1 ja 4 arvo oli pituus; pysäkeillä 5–7 yhden lähteen luku. Muuttuu: korkeus kirjataan
  erikseen faktaliitteeseen ja virheet huomioina (kultainen polku 2).
- **12.10.2026, Lontoo.** Avaus ja loppu olivat yleistietoa ilman erillistä tarkistusta. Muuttuu: avaus ja loppu kuuluvat samaan
  riippumattomaan tarkistukseen kuin pysäkit.
- **12.10.2026, Ateena → Praha.** Lakiriski (Kreikka) siirsi kierroksen; Ateena piilotetaan GRC-storefrontissa. Muuttuu: rajaus
  ennen työtä (Kreikan muistomerkkikohteisiin ei uusia kierroksia).
- **9.10.2026, Tukholma ja Pariisi.** Kerronta alkoi ennen kuin kohde näkyi; historiaosio venytti pysähdyksen 35–55 sekuntiin.
  Muuttuu: kohteen ensimmäinen virke päättyy saapumishetkellä; historiaosio omassa paikassaan (`suunnitelma.md` luku 4).

## 11. Lähteet

`docs/kohtaukset/pallokierros/` (`suunnitelma.md`, `liikesaannot.md`, `pallokierros-tarkistus-20261014.md`, `lontoo-*`, `praha-*`,
`ateena-*`), `docs/moduulit/tuotantopohjat/kertojan-teksti-ja-aani.md`, `docs/moduulit/livia-aani.md`, `docs/moduulit/karttapallo.md`;
Pulun kutsujen tekstit äänisivun Tekstit-osastossa (`pulu-vapaalento-kutsu-*`); Raamattu: LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA,
KREIKKA, PÄÄKAUPUNKIEN ESITTELYT ARVIOIDAAN ITSE, TUOTANTOPOHJAT, TUOTANTOPOHJIEN SANASTO.
