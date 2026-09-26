# Luovutus: Sisältökirjuri — 26.9.2026 ilta (n. 19.4x Suomen aikaa, konteksti 70 % → nollaus)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260926-b.md`. Tämä vuoro (iltapäivä–ilta):
löydös 158 valmistui kokonaan, sen jälkeen aloitettiin omistajan uusi tilaus
(Astronautin kameran erä 1) ja maakunta-erä 2 (CHE valmis, PRT valmis mutta
EI VIELÄ COMMITOITU — ks. kohta 3, kriittinen).

## 1. Lue ensin

- `CLAUDE.md`, `docs/roolitus.md`.
- Raamattu: "TYÖTAPA JA SESSIOT" (roolit, worktreet, viestisäännöt).
- Ei uusia Raamattu-linjauksia tässä vuorossa.

## 2. Tila

**main = v2276, `9da80d49a`** (#3274 löydös 135 v2275 ei koske sisältöä).
Tämän vuoron julkaisut:

| Versio | PR | Sisältö |
| --- | --- | --- |
| v2269 | #3328 | BEL: maakuntien kuva- ja pikkukuva-kentät (11/11) |
| v2270 | #3330 | DNK: maakuntien kuva- ja pikkukuva-kentät (5/5) |
| v2271 | #3331 | SVK: maakuntien kuva- ja pikkukuva-kentät (8/8) |
| v2272 | #3332 | LVA: maakuntien kuva- ja pikkukuva-kentät (5/5) |
| v2273 | #3333 | LTU: maakuntien kuva- ja pikkukuva-kentät (10/10) |
| v2274 | #3336 | FIN/EST/SVN: maakuntien kuva- ja pikkukuva-kentät (45/45) |
| v2276 | #3340 | Astronautin kamera erä 1: pelin kaupungit (23/25) — **MAINISSA** |

**Löydös 158 on kokonaan valmis**: 9 maata (NLD/BEL/DNK/SVK/LVA/LTU/FIN/EST/SVN),
99 aluetta, kaikilla pitkä + kuva + pikkukuva. Ämpärissä `karttanostot/20260926/`.
Kaikki kuusi PR:ää mergettiin **automaattisesti** (Julkaisijan rutiini, ks. kohta 7).

## 3. KRIITTISTÄ — tarkista ENSIN tämä ennen mitään muuta

**PRT:n (Portugali) 20 pitkä-tekstiä on tutkittu ja kirjoitettu valmiiksi (kaikki
WebSearchilla lähdetarkistettu), mutta EI VIELÄ INTEGROITU eikä committoitu
mihinkään haaraan.** Konteksti loppui juuri ennen kuin ehdin ajaa integraatio-
skriptin. Tekstit ovat TÄSSÄ RAPORTISSA kohdassa 3.1 sellaisenaan — kopioi ne
suoraan `js/packs/maakunnat-luonnehdinnat.js`:n PRT-lohkoon (rakenne kuten
CHE:llä, ks. `pitka:` -kenttä `lyhyt:`-kentän jälkeen samalla tavalla kuin
muissa maissa). Menetelmä (toiminut CHE:llä juuri):

1. `git checkout main && git pull && git checkout -b sisalto-pitka-prt-20260926 main`
2. Lisää `pitka: \`...\`,` -rivit alla oleviin 20 alueeseen (avaimet ovat
   TÄSMÄLLEEN samat kuin `lyhyt`-kentissä, esim. `Azores`, `'Viana do Castelo'`).
3. `node --check js/packs/maakunnat-luonnehdinnat.js`
4. `node tools/tarkista-kaksoisavaimet.mjs`
5. `node --test tests/maakunnat-*.test.mjs tests/karttatyokalu-maakunnat.test.mjs tests/maakuntavektorit.test.mjs tests/lisenssit.test.mjs tests/sisaltopaketti.test.mjs`
6. Commit, push, `gh pr create` (tarkista ensin `gh pr list --search "maakunta OR pitka OR kuva-kenttä" --state open` — jono vapaa vain kun CHE (#3341) on mainissa).

### 3.1 PRT pitkä-tekstit (20/20, valmiit kopioitavaksi)

**Aveiro:** Aveiro on nykyään turisteille tuttu kaupunki, jossa kirkkaanväriset
moliceiro-veneet kuljettavat matkailijoita kanavilla ja Art Nouveau -julkisivut
kilpailevat huomiosta kaupungin keskustassa. 1800-luvulla samat veneet olivat
arkisia työkaluja: niillä kerättiin ria-lahden pohjasta moliço-levää, jota
levitettiin lannoitteeksi hiekkaisille pelloille, ja lahden rannoilla kohosi
suolakekoja niin korkeina, että yksi kanava sai nimensä pyramideista. Isoisän
matkatessa alueella 1873 veneet olivat siis yhä työveneitä, ei koristeltuja
huviretkiveneitä – matkailijaa niissä ei olisi nähnyt, vain levänkerääjän ja
suolantekijän. Vasta kun kemialliset lannoitteet syrjäyttivät moliçon 1900-luvulla,
veneet vaihtoivat rahdin matkailijoihin.

**Azores:** Azorien Pico-saaren tulivuori on Portugalin korkein kohta, 2 351
metriä keskellä Atlanttia, ja sen mustan laavan täyttämät currais-viinitarhat
ovat nykyään Unescon maailmanperintökohde. 1800-luvun puolivälissä sama rinne
tuotti vuosittain jopa 15 000 tynnyriä vahvaa Verdelho-viiniä, jota Venäjän
aatelisto arvosti pöydässään – mutta juuri isoisän matkan aikaan, vuosina
1872–1874, viiniä tuhoava fylloksera-kirva levisi saarelle ja tuho oli
täydellinen: tuotanto romahti muutamaan sataan tynnyriin ja moni viljelijä
lähti siirtolaiseksi. Isoisä olisi siis nähnyt Picon viinimäet juuri siinä
hetkessä, kun vuosisatoja vanha vienti alkoi hävitä silmien edessä, ei enää
kukoistuksessaan.

**Beja:** Mértolan pääkirkko on nykyään suosittu pysähdyspaikka Alentejon
matkailijoille: harvinainen rakennus, jossa moskeijan mihrab-seinäkomero
osoittaa yhä Mekkaan kirkon alttarin vierellä. Rakennus nousi moskeijaksi
1100-luvulla, ja kun kuningas Sancho II valtasi kaupungin 1238, se muutettiin
kirkoksi muotoaan juuri koskematta – ainutlaatuinen ratkaisu, joka säästyi
sekä Reconquistan että vastauskonpuhdistuksen tuholta. Isoisän saapuessa 1873
rakennus oli seisonut kirkkona jo 635 vuotta, ja hän näki täsmälleen saman
mihrabin kuin nykyinen matkailija – Mértolassa aika on tässä mielessä
pysähtynyt isoisän ajoista tähän päivään.

**Braga:** Bom Jesus do Monten pyhäkölle kipuaa nykyään vesipainoinen
köysirata, joka on toiminut katkeamatta vuodesta 1882 – maailman vanhin
laatuaan, sillä täysi vaunu vetää tyhjän ylös pelkällä painovoimalla, ei
sähköllä. Isoisän vieraillessa Bragassa 1873 köysirataa ei ollut vielä
rakennettu: hän olisi joutunut kiipeämään pyhäkön kuuluisan siksak-portaikon
jalan, samaa reittiä, jota barokkiaikaiset pyhiinvaeltajat olivat kulkeneet
vuosikymmenten ajan ennen häntä. Vasta yhdeksän vuotta isoisän matkan jälkeen
sveitsiläinen insinööri Niklaus Riggenbach rakensi radan, joka yhä tänään
kuljettaa matkailijoita samaa 274 metrin nousua.

**Bragança:** Miranda do Douron seudulla puhutaan nykyään virallisesti
tunnustettua mirandeesin kieltä, jolla on oma kielilaki vuodelta 1999 ja
vielä noin 3 500 puhujaa – pieni, sitkeä kieliyhteisö Portugalin ja Espanjan
rajaseudulla. Isoisän kulkiessa alueen kylissä 1873 samaa kieltä puhuttiin
jo, mutta se oli vain talonpoikien murre vailla mitään virallista asemaa –
kukaan sivistynyt lissabonilainen ei olisi tunnustanut sitä omaksi kielekseen,
vaan pitänyt sitä rappeutuneena portugalin muotona. Tunnustus antoi kielelle
arvon vasta 126 vuotta myöhemmin, kauan isoisän ajan jälkeen.

**Castelo Branco:** Monsanton kylä kyyristyy nykyään jättimäisten
graniittilohkareiden lomaan täsmälleen niin kuin ennenkin, ja 1938 kylä
voitti kilpailun Portugalin portugalilaisimmasta kylästä – tittelin, jota ei
ole sen jälkeen jaettu kenellekään muulle. Kivitalot olivat isoisän aikaan
1873 samat: ensimmäiset asukkaat olivat sovittaneet pienet mökkinsä
lohkareiden väliin ja alle vuosisatoja aiemmin, koska kiviä ei yksinkertaisesti
jaksettu siirtää. Ero on siinä, että isoisän aikaan kylä oli vain syrjäinen,
unohdettu vuorikylä ilman mainetta – kukaan ei matkustanut sinne ihailemaan
sitä, ja tittelin tuoma huomio saapui vasta 65 vuotta myöhemmin, Estado Novon
aikana.

**Coimbra:** Coimbran yliopiston barokkikirjasto Biblioteca Joanina on
nykyään ihailtu nähtävyys, jonka hämärissä hyllyissä asustaa lepakkoyhdyskunta
– öisin ne saalistavat kirjoja syöviä hyönteisiä, ja illalla pöydät peitetään
nahalla lepakon jätösten varalta. Kirjasto rakennettiin vuosina 1717–1728
kuningas João V:n tilauksesta, ja lepakot ovat asuneet siellä arviolta 250
vuotta, joten isoisän vieraillessa 1873 sekä rakennus että sen siivekkäät
vartijat olivat jo paikoillaan – hän olisi kävellyt saman kultareunaisen
kirjahyllyn ohi kuin nykyinen matkailija, tietämättä että katossa lepäsi
lepakoita. Muuten mikään ei ole muuttunut: kokoelma ja rakennus näyttävät
isoisän ajoista tähän päivään suunnilleen samalta.

**Évora:** Évora on Alentejon yliopistokaupunki, jonka kivetyillä kujilla
tuoksuu paahdettu korkki ja jonka Pyhän Fransiskuksen kirkon kupeesta löytyy
yksi Euroopan makaabereimmista nähtävyyksistä, Luukappeli (Capela dos Ossos).
Sen seinät on vuorattu noin 5 000 vainajan luilla, ja sisäänkäynnin
yläpuolella lukee muistutus: me luut täällä odotamme teidän luitanne.
Kappelin rakensivat 1500-luvulla fransiskaanimunkit, koska kaupungin viiden
hautausmaan luille oli loppumassa tila, ja luiden järjestäminen oli aikansa
hartaustapa, ei kauhuviihdettä. Isoisän aikaan 1873 kappeli oli jo kolmisataa
vuotta vanha nähtävyys – hän katsoi täsmälleen samaa luusommitelmaa jonka
sinäkin näet, ei kiveäkään ole siirretty sen jälkeen.

**Faro:** Cabo de São Vicente Algarven lounaiskärjessä on Manner-Euroopan
lounaisin piste, ja nykyään sen majakan valo kantaa merelle 60 kilometrin
päähän – niemellä istuu iltaisin rivi kalastajia ja auringonlaskun katsojia
paikassa jota kutsutaan "maailman loppuna". Majakka nousi vuonna 1846
keskiaikaisen fransiskaanikonventin raunioille sen jälkeen, kun Portugali
lakkautti uskonnolliset veljeskunnat ja otti niiden omaisuuden haltuunsa.
Isoisän aikaan 1873 majakka oli siis jo parikymmentä vuotta vanha ja isoisä
olisi nähnyt saman kivitornin kuin sinäkin – vaikka sen valo paloi hänen
aikanaan yhä öljylampulla, ei sähköllä.

**Guarda:** Guarda on Portugalin korkein kaupunki, 1 056 metrissä Serra da
Estrelan kainalossa, ja paikalliset kutsuvat sitä viiden F:n kaupungiksi –
forte, farta, fria, fiel, formosa: vahva, runsas, kylmä, uskollinen, kaunis.
Talvella lunta kertyy kaduille enemmän kuin missään muualla maassa, ja
harmaat graniittitalot on rakennettu kestämään se. Kaupungin katedraali, Sé
da Guarda, nousee keskiajan rajakaupungin ytimessä kuin linnoitus – sen
rakentaminen kesti 1300-luvun lopulta 1500-luvun puoliväliin. Isoisän aikaan
1873 katedraali oli ollut valmiina jo kolmisataa vuotta, ja Guarda oli
tuolloinkin täsmälleen se kylmä, kivinen raja-vartiokaupunki jonka sinäkin
näet.

**Leiria:** Nazarén rannassa Leirian maakunnassa kokoontuu talvisin maailman
parhaita isoaaltosurffareita, sillä Praia do Norten edustalla avautuva
lähes 5 000 metriä syvä merenalainen kanjoni puskee syys–maaliskuussa
paikalle jättiaaltoja, joilla on rikottu maailmanennätyksiä vuodesta 2011
lähtien. Ranta ja sen yllä kohoava kalliokylä Sítio ovat kuuluneet yhteen
aina, mutta jyrkkä nousu niiden välillä piti pitkään kulkea jalan tai aasin
selässä. Vasta vuonna 1889 valmistui köysirata, joka vieläkin kuljettaa
matkailijoita kalliolle – isoisän vieraillessa 1873 sitä ei ollut, nousu
piti tehdä samalla tavalla kuin kalastajat olivat tehneet vuosisatoja.

**Lisboa:** Sintran Cabo da Roca on Manner-Euroopan läntisin kärki, ja sen
majakka valaisee Atlanttia 165 metrin korkeudesta kalliolta – matkailijat
hakevat siellä yhä paperisen sertifikaatin todisteeksi käynnistä maailman
äärellä. Majakka oli rakennettu jo vuonna 1772, mutta sen valo kulki isoisän
aikaan yhä öljyllä: lupa sähkövalaistukseen myönnettiin vasta 1883 ja se
otettiin käyttöön 1897, vuosikymmeniä isoisän matkan jälkeen. Muutaman
kilometrin päässä metsäisellä vuorenhuipulla kohoaa satumainen, kirkkaan
värinen Pena-palatsi, jonka kuningas Ferdinand II rakennutti vuosina
1842–1854. Isoisän saapuessa 1873 palatsi oli siis vain parikymmentä vuotta
vanha ja tuoreen uusi nähtävyys – ei se vuosisatoja paikallaan seisonut
linna jonka nykymatkailija mielessään näkee.

**Madeira:** Madeiran vuorenrinteillä kiemurtelee nykyään yli 2 000
kilometriä levada-kastelukanavia, ja niiden vartta pitkin vaelletaan kuin
polkuja saaren vuoristoisessa sisäosassa laaksosta laaksoon. Kanavat
syntyivät alkujaan yksityisten tilan- ja lähteenomistajien voimin, mutta
1800-luvulla viinintuotannon kriisi ajoi valtion rahoittamaan uusia,
aiempaa suurempia levadoja. Isoisän aikaan 1873 saarella oltiin juuri tämän
valtion rahoittaman rakennusbuumin keskellä – esimerkiksi Rabaçalin levadan
1855 valmistunut Furado Velho -tunneli oli silloin vain parikymmentä vuotta
vanha, arkinen ihme jota isoisä olisi voinut nähdä yhä rakenteilla
naapurilaaksoissa.

**Portalegre:** Elvasin rajakaupunkia kiertää maailman suurin kuivien
vallihautojen linnoitusjärjestelmä, ja se on nykyään Unescon maailmanperintöä
– muurien sisällä eletään yhä tavallista alentejolaista arkea, ei museossa.
Kaupungin vedet kulkevat 1500-luvulla alkunsa saaneessa ja 1622 valmistuneessa
Amoreira-vesijohdossa, joka kantaa vettä yli seitsemän kilometrin päästä
nelikerroksisten kaariholvien läpi. Linnoitukset itse muotoutuivat nykyiseen
laajuuteensa vasta 1600–1800-luvuilla hollantilaisen insinöörin Cosmanderin
suunnitelmien mukaan. Isoisän aikaan 1873 Elvas oli siis edelleen toimiva
raja-varuskunta, ei rauhoitettu nähtävyys – sen viimeisimmätkin
linnoituslaajennukset olivat vain vuosikymmenten takaa.

**Porto:** Porto on nykyään yli 200 000 asukkaan kaupunki, jonka
graniittiset kujat ja Riberian UNESCO-listattu vanhakaupunki houkuttelevat
miljoonia matkailijoita Douron rannoille – joella kuhisee risteilyveneitä
ja illalla baarien valot heijastuvat veteen. Jokea reunustaa nykyään kaksi
rautaista siltaa, Ponte de Dom Luís I ja rautatiesilta Ponte Maria Pia,
joiden suunnittelijoina olivat Gustave Eiffelin oppilas Théophile Seyrig ja
Eiffel itse. Isoisän aikaan 1873 kumpaakaan ei ollut vielä olemassa: Maria
Pia valmistui 1877 ja Dom Luís I vasta 1886, joten hän olisi ylittänyt joen
veneellä tai kapealla riippusillalla, ei rautaisella kaarella korkealla
kaupungin yllä. Douro oli silti jo täynnä viinilaivoja matkalla Vila Nova de
Gaian kellareihin – se osa maisemasta ei ole muuttunut.

**Santarém:** Santarémin maakunta tunnetaan nykyään ennen kaikkea Fátiman
pyhiinvaelluspaikasta, jonne saapuu vuosittain miljoonia matkailijoita ja
uskovia ympäri maailman suuren basilikan eteen. Vuonna 1873 Fátima ei ollut
mitään erityistä – vain tavallinen paimenkylä Keski-Portugalin kukkuloilla,
sillä kolmen lapsen kertomat Neitsyt Marian ilmestykset tapahtuivat vasta
1917, kymmeniä vuosia isoisän matkan jälkeen. Samaan aikaan Tomarin
Tabuleiros-juhlassa tytöt ovat kantaneet päänsä päällä leipätarjottimia jo
satojen vuosien ajan – perinne juontaa keskiajan Pyhän Hengen
veljeskuntiin, joten isoisä olisi hyvin voinut nähdä samankaltaisen
kulkueen. Tejo-joen keskellä kohoava Almourolin linna, ristiretkeläisten
temppeliherrojen linnoitus, oli jo silloin vuosisatoja vanha muistomerkki,
ei tuore rakennus.

**Setúbal:** Setúbal on nykyään elävä satamakaupunki, jonka rannalta pääsee
lautalla parissakymmenessä minuutissa Tróian niemelle valkoisille
hiekkarannoille ja loma-asuntoalueille. Niemen kärjessä nousevat esiin
antiikin Cetóbrigan rauniot, jossa roomalaiset valmistivat garumia,
voimakkaasti maustettua kalakastiketta, jota vietiin ympäri valtakuntaa –
paikka oli jo isoisän aikaan vuosituhannen vanha jäänne. Vuonna 1873
Setúbal oli myös nuoren teollisuuden kaupunki: ensimmäiset
sardiinisäilyketehtaat oli perustettu 1850-luvulla, ja isoisä olisi
saattanut nähdä juuri näitä savuavia tehtaita ja tynnyreitä satamassa,
sillä Setúbalista kehittyi vuosisadan loppuun mennessä Portugalin
säilyketeollisuuden sydän. Tänään Sadojoen suistossa asuu myös Euroopan
harvinaisimpia pysyviä delfiiniyhdyskuntia, ja niiden tarkkailu veneestä on
suosituimpia retkiä alueella.

**Viana do Castelo:** Viana do Castelon yllä kohoava Santa Luzian basilika
on nykyään kaupungin maamerkki, jonka portaille kiipeää vuosittain tuhansia
matkailijoita nauttimaan näköalasta Lima-joelle ja Atlantille. Isoisän
aikaan 1873 basilikaa ei ollut olemassa lainkaan – sen rakentaminen alkoi
vasta 1904 ja sisätilat valmistuivat vuonna 1959, joten mäellä seisoi vielä
pelkkä pieni kappeli. Alakaupungin Praça da República sen sijaan oli
isoisän aikaan jo vuosisatoja vanha – 1500-luvulla rakennettu Misericórdian
talo ja Chafariz-suihkulähde seisoivat paikallaan silloinkin. Juhlapäivinä
kaduilla näkyy edelleen paikallisia Vianan perinnepuvussa ja kultaisin
filigraanikoruin, perinne joka vakiintui juuri 1800-luvulla – isoisä olisi
voinut nähdä samanlaisen kulkueen torilla.

**Vila Real:** Vila Realin maakunta on Douro-joen viinialueiden sydän, ja
sen kaupunki Peso da Régua toimii nykyään risteilylaivojen ja
viinimatkailijoiden porttina Alto Douron UNESCO-maailmanperintöalueelle.
Vuonna 1873 alueen viinitarhoja koetteli jo etenevä phylloxera-kirvakriisi,
joka levisi Douroon 1871 alkaen ja tuhosi vanhat viiniköynnökset – nykyiset,
tarkasti muotoillut terassit istutettiin vasta kriisin jälkeen 1880-luvulla
ja sen jälkeen, niin että isoisän näkemä maisema oli rosoisempi ja osin
kuihtunut. Rautatie, joka nykyään kuljettaa matkailijoita jokilaaksoa
pitkin, ei ollut vielä valmis: raiteet ulottuivat Régualle asti vasta 1879,
kuusi vuotta isoisän matkan jälkeen, joten hän olisi noussut jokilaivaan tai
matkustanut hevosella. Mateus-palatsin barokkijulkisivu ja Nicolau Nasonin
suunnittelemat puutarhat seisoivat kuitenkin jo paikallaan 1700-luvulta
asti, ja niiden näkymä on tuskin muuttunut.

**Viseu:** Viseun maakunnan pääkaupunki Viseu on nykyään tunnettu
renessanssimaalari Grão Vascon nimikkomuseosta ja keskiaikaisesta
katedraalista, jotka houkuttelevat kulttuurimatkailijoita Dão-viinialueen
keskuksesta. Lamegossa kohoava barokkiportaikko Nossa Senhora dos
Remédiosin pyhäkölle näyttää nykyään valmiilta yhtenäiseltä teokselta,
jota kiivetään yhä juhlapäivinä. Isoisän aikaan 1873 se oli kuitenkin vielä
työmaa: rakentaminen alkoi 1750-luvulla, mutta pyhäkön rakennus valmistui
vasta 1905 ja portaikkoa laajennettiin vuosikymmeniä lisää, niin että hän
olisi nähnyt keskeneräisen, telineiden ympäröimän rinteen. Legenda
Portugalin ensimmäisistä säätykokouksista Lamegossa vuonna 1143 oli isoisän
aikaan yhtä vanha tarina kuin nykyään – historioitsijat kyseenalaistavat
sen yhä, mutta paikalliset kertovat sitä samalla ylpeydellä.

## 4. Avoimet PR:t

- **PR #3340 MERGETTY** (v2276) — Astronautin kamera erä 1, ei enää mitään
  tehtävää.
- **PR #3341** — "CHE: maakuntien pitkä-teksti (26/26)" (`sisalto-pitka-che-20260926`).
  Testit 113/113 vihreät. Matchaa Julkaisijan automerge-kaavan, pitäisi
  mergetä itsestään — tarkista onko mennyt läpi.

## 5. Kesken — tee nämä ensin

1. **PRT integraatio ja PR** — ks. kohta 3, kriittinen, tee ensin.
2. **Maakunta-erä 2, jatko**: HUN (20), SWE (21), NOR (21), IRL (30) —
   yhteensä 92 aluetta jäljellä pitkä-tekstille CHE:n ja PRT:n jälkeen,
   sitten KAIKKI 6 maata (CHE/PRT/HUN/SWE/NOR/IRL, 138 aluetta) tarvitsevat
   vielä kuva-kentän (menetelmä kuten löydös 158:ssa: Commons-kuva per
   alue, lisenssi tarkistettu API:sta, katsottu silmillä). Yksi maakunta-PR
   kerrallaan mainiin.
3. **Astronautin erät 2–4** (isoisän reitin maisemat, luonnonkohteet, "sama
   paikka eri vuosina" -parit) — Fable: "maakuntien lomassa", ei kiinteää
   järjestystä. Ei aloitettu.

## 6. Odottaa omistajan päätöstä

Ei avoimia kysymyksiä juuri nyt.

## 7. Voimassa olevat työtavat — mikä muuttui tässä vuorossa

- Ks. Raamattu "TYÖTAPA JA SESSIOT" ja `docs/roolitus.md` — ei muutoksia
  itse sääntöihin.
- **Havainto (ei Raamattu-linjaus)**: Julkaisija ajaa automaattista mergeä
  maakunta-PR:ille (haara `sisalto-kuva-*` tai `sisalto-pitka-*`, muutokset
  vain `js/packs/maakun*`-tiedostoihin, testit vihreät → versionosto +
  merge). Avaajan vastuu pysyy: yksi PR kerrallaan.
- **Pulu-kysymysmekanismi satelliitti-linssille**: `tools/astronaut/qa-*.json`
  + `build-questions.mjs` → `js/linssit/astronaut-kysymykset.js`, käytössä
  `satelliitti.js`:ssä (`haeAstronautinKysymykset`). EI kulje `js/aikajana.js`:n
  `PULUKYSYMYSTEN_LINSSI`-reitin kautta (se on vain ihmisen-matka-linssille).

## 8. Julkaisukaava

Ei muutoksia (`docs/roolitus.md` "Julkaisusäännöt"): rebase → testit →
`tarkista-kaksoisavaimet.mjs` → commit → push → `gh pr create` → CI.
Maakunta-PR:ien `savukkeet-mac`-tarkistus on epäonnistunut toistuvasti
nopeasti tänä vuorona ("The run was canceled by @ravelius" — omistajan
oma ajokilpailun peruminen samalla Macilla, EI testivika); merge on
mennyt läpi siitä huolimatta (testit+reitti riittävät).

## 9. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`.
- Poistin worktreen `sisaltokirjuri-linssikatalogi-kuvatekstit-era2`
  (levytila, PR #3138 suljettu).
- Ämpäri (R2): `karttanostot/20260926/` +45 maakuntakuvaa (FIN/EST/SVN)
  BEL/DNK/SVK/LVA/LTU:n 39:n lisäksi, + 6 ISS Cupola-kehyskuvaa (Codexin
  toimitus Linssisepälle).
- Ei uusia avaimia, ei muutoksia rutiineihin/ajastuksiin.

## 10. Avoimet velat ja opetukset

**Velat:**
1. PRT ei vielä committoitu — ks. kohta 3.
2. Astronautin erä 1 on 23/25 kohdetta — 9 kaupunkia kokeiltu ja hylätty
   (ei ISS-kuvaa: Amsterdam, Berliini, Tukholma, Kööpenhamina, Praha,
   Toronto, Lagos, Hanoi, Manila).

**Opetukset:**
- Commons- ja NASA-kuvarajapinnat rajoittavat pyyntitahtia (429) —
  eksponentiaalinen backoff (≥20 s × yritys) tarvitaan.
- **Aina tarkista agentin ilmoittama kuvatunnus/lisenssi itse API:sta JA
  katso kuva silmillä** — Gorenjskan (SVN) alkuperäinen kuvaehdokas oli
  täysi turistivene, korvattava.
- Kirjoita tutkittu, valmis sisältö SUORAAN raporttiin (kuten kohta 3.1
  tässä) jos konteksti loppuu kesken integraation — muuten agenttien työ
  katoaa session mukana.
- Pyydä pitkä-teksti-agenteilta AINA WebSearch, älä luota muistiin (yksi
  agentti CHE:ssä ei käyttänyt hakua ja sai Gotthard-tunnelin
  aloituspäivän väärin — kiinni jäi jälkitarkistuksessa).

## 11. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260926-c.md
kokonaan ja toimi niiden mukaan.

TILA lyhyesti: löydös 158 KOKONAAN VALMIS (v2274). Maakunta-erä 2: CHE pitkä
PR #3341 auki, PRT pitkä KIRJOITETTU MUTTA EI COMMITOITU (teksti raportin
kohdassa 3.1 — integroi ENSIN). Astronautin erä 1: PR #3340 auki, valmis,
odottaa vain mergeä.

ENSIMMÄINEN TEHTÄVÄ:
1. Integroi PRT:n 20 pitkä-tekstiä (raportin kohta 3.1) js/packs/maakunnat-luonnehdinnat.js:ään,
   testaa, avaa PR (tarkista jono vapaa ensin).
2. Sen jälkeen jatka maakunta-erä 2:ta (HUN/SWE/NOR/IRL, pitkä), sitten kaikkien
   kuudan maan kuva-kenttä.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Maakunta-PR:t yksi kerrallaan mainiin; Julkaisija automerges kun testit vihreät.
- Agentit vain Sonnet/Opus, enintään 3–4 rinnan, KÄYTÄ AINA WEBSEARCHIA faktojen tarkistukseen.
- Kuvat (maakunta) vain PD/CC0/CC BY/CC BY-SA Commonsista, tarkistettuina
  API:sta suoraan; NASA-astronauttikuvat aina PD, mutta tarkista kuvatunnus
  itse images-api.nasa.gov:sta äläkä luota agentin raporttiin sokeasti.
```
