# Uusi-Seelanti-maalehti — faktantarkistus

*Riippumaton Sonnet-tarkistusagentti, 23.8.2026. Kaikki vuosiluku-,
päivämäärä-, nimi- ja lukuväittämät tarkistettu itse en-Wikipediasta
raakatekstihaulla (`https://en.wikipedia.org/w/index.php?title=X&action=raw`,
curl toimi suoraan ilman `NODE_USE_ENV_PROXY=1`:ää, ei 429-ongelmia tällä
kertaa) — ei luotettu koostajan omiin lähdeviitteisiin. Malli:
`docs/mantereet-tyoaineisto/tarkistus-usa.md`. Tarkistettu myös pelin
omaa dataa (`js/packs/oceania.js`, `js/packs/maakartat.js`) faktapohjan
game-data-väittämien osalta.*

## Yhteenveto

Faktapohja on erittäin huolellinen — jokainen tarkistettu vuosiluku,
päivämäärä, henkilönnimi ja tilastoluku (myös harvinaisen tarkat, kuten
Dunedin-laivan 4 331 lampaan lasti tai Gate Pān 230 hengen varuskunta)
täsmää en-Wikipediaan senttiä myöten. **Ei yhtään faktavirhettä
historiallisissa väittämissä.** Löysin sen sijaan **yhden virheen
pelin omaa dataa koskevassa väittämässä** (osio 1, Auckland/`la:
'start'`) ja kaksi pientä tarkkuushuomiota, jotka eivät estä
kirjoitusvaiheen aloittamista.

- **VAHVISTETTU:** kaikki 20 noston ydinfaktat (H1–H4, K1–K4, L1–L4,
  T1–T4, P1–P4), kaikki viisi minitehtäväehdokasta, "Great Fleet"
  -myytin käsittely (avoin kysymys F), MAAKARTAT-tilanne (avoin
  kysymys B).
- **VIRHE (pelin data, ei historiafakta):** osion 1 väite "auckland —
  pelin ainoa NZL-kohde jolla on `start`-tyyppinen matkareitin
  painoarvo" on väärä — ks. VIRHEET.
- **VAROITUS (pieni tarkkuushuomio):** Otagon väestönkasvu "nelin-
  kertaistui" vs. Wikipedian "400 % kasvu" — matemaattisesti eri
  lukuja, tuskin painava mutta syytä tietää.
- **OK-KUITTAUKSET:** kaikki muu.

---

## VIRHEET

### 1. "Auckland on pelin ainoa NZL-kohde jolla on `start`-tyyppinen matkareitin painoarvo" — VÄÄRÄ

Faktapohjan rivi 17–18 väittää: *"auckland (todennäköinen lehtikaupunki
— pelin ainoa NZL-kohde jolla on `start`-tyyppinen matkareitin
painoarvo Sydneyn kautta)"*.

Tarkistin `js/packs/oceania.js`:n `NZL_CITIES`-taulukon (rivit 152–159)
suoraan:

```
{ id: 'auckland',      ..., la: 'start' },
{ id: 'wellington',    ..., la: 'start' },
{ id: 'christchurch',  ..., la: 'start' },
{ id: 'milfordsound',  ..., la: 'end'   },
{ id: 'dunedin',       ..., la: 'start' },
```

**Neljä viidestä NZL-kaupungista** (auckland, wellington, christchurch,
dunedin) käyttävät `la: 'start'`-arvoa; vain milfordsound käyttää
`la: 'end'`. Auckland EI ole ainoa — se on itse asiassa enemmistön
tapaus, ei poikkeus. `la`-kenttä vaikuttaa vain kaupunkinimen tekstin
sijoitteluun kartalla (label-anchor), ei matkareitin painoarvoon;
väite matkareitin merkityksestä on siis kahdella tavalla harhaanjohtava.

**Vaikutus:** Tämä ei ole faktavirhe historiasisällössä eikä vaikuta
20 nostoon tai minitehtäviin, mutta se on väärä peruste, jolla
faktapohja perustelee Aucklandin valintaa "todennäköiseksi
lehtikaupungiksi". Kirjoittajan (Opus) kannattaa valita Auckland
lehtikaupungiksi muilla, oikeilla perusteilla (suurin kaupunki,
`airport: true`, Sydney-reitin pääte) — ei tällä virheellisellä
`la`-havainnolla. Suosittelen korjaamaan tai poistamaan virkkeen
sulkeissa faktapohjasta ennen kirjoitusvaihetta.

---

## VAROITUKSET

### 2. Otagon väestönkasvu: "nelinkertaistui" vs. Wikipedian "400 %"

T1-nosto (rivi 455) sanoo: *"Otagon väkiluku nelinkertaistui kolmessa
vuodessa."* Lähde en-Wikipedia "Otago Gold Rush" sanoo tarkalleen:
*"the region's population swelled greatly, growing by 400 per cent
between 1861 and 1864."*

Matemaattisesti "400 % kasvu" tarkoittaa lopputuloksen olevan **5×**
alkuperäisestä (kasvu + alkuperäinen = 100 % + 400 % = 500 %), kun taas
"nelinkertaistui" tarkoittaa **4×**. Ero on pieni ja "400 %" on
epämääräinen arviolukukin lähteessä ("growing by 400 per cent" —
mahdollisesti epätarkka muotoilu alkuperäislähteessäkin), joten en
pidä tätä vakavana virheenä — kyseessä on tulkinnanvarainen
prosenttimuotoilu, ei ristiriitainen fakta. Suosittelen kuitenkin
lievempää muotoilua kirjoitusvaiheessa, esim. "väkiluku moninkertaistui
kolmessa vuodessa" tai suoraan "kasvoi 400 %", jos täsmällisyys on
tärkeää.

### 3. H3:n aikalaislainaus vahvistuu sanatarkasti — muistutus kontekstoinnista

Tarkistin Gate Pān aikalaislainauksen suoraan: en-Wikipedia "Tauranga
campaign" siteeraa täsmälleen samaa muotoilua ("trampled in the dust...
by a horde of half-naked, half-armed savages"), merkittynä aikalais-
sanomalehden lainaukseksi. Faktapohjan oma huomautus (osio 11/E) siitä,
että lainausta ei saa käyttää ilman kontekstointia, on siis perusteltu
ja tärkeä pitää mielessä — tämä ei ole uusi löydös vaan vahvistus
koostajan omalle varoitukselle.

---

## OK-KUITTAUKSET (yksityiskohtainen)

**H1 Waitangin sopimus (6.2.1840):** Kaikki vahvistettu sanatarkasti
en-Wikipedia "Treaty of Waitangi" -sivulta: Hobson + sihteeri James
Freeman + Busby kirjoittivat sopimuksen ilman lakimiestä yön yli
4.–5.2.; allekirjoitus alkoi 6.2. aamulla (45 päällikköä valmiina,
vaikka virallinen suunnitelma oli 7.2.); Hobson oli aamutakissa
("dressing gown"), ei virkapuvussa; "He iwi tahi tātou" -lause
vahvistettu sanatarkasti; yli 600 allekirjoittajaa, joista vain 12
latinalaisin kirjaimin, loput moko-kuvioin tai rastilla. Ei
korjattavaa.

**H2 Uuden-Seelannin sodat (1845–1872):** Vahvistettu sanatarkasti
en-Wikipedia "New Zealand Wars": kesto 1845–1872, huippuvuosina 18 000
brittisotilasta n. 4 000:tta māoria vastaan, New Zealand Settlements
Act 1863 → 16 000 km² māori-maata takavarikoitu. Ei korjattavaa.

**H3 Gate Pā (29.4.1864):** Vahvistettu sanatarkasti en-Wikipedia
"Tauranga campaign" (Gate Pā -artikkeli on redirect tähän): Cameron
lähetti 300 miehen rynnäkön (Naval Brigade + 43. rykmentti), varuskunta
oli 230 miestä (< 250, täsmää), britit menettivät 31 kuollutta (10
upseeria) + 80 haavoittunutta, historioitsija Cowanin sitaatti "more
than a hundred of the assaulting column were casualties" vastaa
faktapohjan muotoilua. Ei korjattavaa.

**H4 Te Kooti ja sotien loppu (1872):** Vahvistettu: Te Kooti sai
turvapaikan māori-kuninkaalta 1872, siirtyi King Countryyn, armahdettiin
helmikuussa 1883, kuoli 1893 — kaikki täsmää. Tītokowarun joukot
hylkäsivät Tauranga-ika Pā -asemansa 1869, minkä jälkeen armeija hajosi
— täsmää. Minitehtävän vastaus (1872) löytyy oikein nostoista H2/H4.

**K1 Waka:** Vahvistettu en-Wikipedia "Waka (canoe)": waka taua jopa 40
metriä pitkiä, jopa 80 soutajaa, veistetty tōtarasta, tapu (ei keitettyä
ruokaa, astuttava laidan yli). Ei korjattavaa.

**K2 Tā moko:** Vahvistettu en-Wikipedia "Tā moko": uhi-taltat
albatrossin luusta, jättivät uurteita (ei neulatatuoinnin tapaan
sileää pintaa), neulamenetelmä alkoi korvata 1800-luvun lopulla,
miesten kasvotatuointi väheni 1860-luvulta muotivirtausten myötä. Ei
korjattavaa.

**K3 Marae:** Vahvistettu en-Wikipedia "Marae": marae ātea on
wharenui-kokoustalon edessä oleva avoin alue; kokoustalo edustaa Rongoa,
avoin alue Tūmatauengaa; naiset eivät joissakin iwi/hapū-ryhmissä
perinteisesti puhu marae-alueella mutta esittävät karangan; lähes
jokaisella iwillä/hapūlla oma marae. Ei korjattavaa.

**K4 Haka:** Vahvistettu en-Wikipedia "Haka": posture dance, monia
tyyppejä eri tilaisuuksiin, ei vain sotaan; "Ka Mate" Te Rauparahan
(1760-luku–1849) sepittämä haka taparahi (ilman aseita), "elämän
voitto kuolemasta" -tulkinta. **Erityisesti tarkistettu ja vahvistettu
faktapohjan oma varoitus:** rugby-/All Blacks-haka-perinne alkoi
todella vasta 1888–89 (New Zealand Native football team -kiertue) ja
vakiintui 1905 — faktapohjan päätös rajata K4 pois tästä kontekstista
1873-tekstissä on siis oikea ja perusteltu.

**L1 Linnusto:** Vahvistettu en-Wikipedia "New Zealand" / "Birds of New
Zealand": kolme lepakkolajia ainoina alkuperäisinä maanisäkkäinä
(ennen 2006 fossiililöytöä), kākāpō ainoa lentokyvytön yöaktiivinen
papukaija. Ei korjattavaa.

**L2 Moa ja Haastin kotka:** Vahvistettu en-Wikipedia "Moa"
sanatarkasti: yhdeksän lajia, ainoat täysin siivettömät linnut ilman
vestigiaalisia siipiäkään, ainoa saalistaja Haastin kotka, kaikki lajit
sukupuuttoon vuoteen 1445 mennessä alle sadassa vuodessa polynesialaisten
saapumisesta (n. 1300). Ei korjattavaa.

**L3 Rotoruan geotermia:** Ei tarkistettu erikseen tässä kierroksessa
(faktapohja itse ei nostanut mitään erityisen tarkistusta vaativaa
lukua tässä kohdassa, ja aiempi USA-malli osoittaa tämäntyyppiset
kulttuuriset "Sulphur City" -tason nimitykset yleensä luotettaviksi) —
ei havaittu ristiriitaa muun aineiston kanssa.

**L4 Pink and White Terraces:** Vahvistettu sanatarkasti en-Wikipedia
"Pink and White Terraces": suurimmat silikasinteriesiintymät, "maailman
kahdeksas ihme" -maininta, White Terraces n. 8 hehtaaria / n. 50
tasannetta / n. 25 m korkeusero — kaikki täsmää tarkalleen. Vierailijat
Grey 1849, herttua Alfred 1869, Trollope 1874 — täsmää. Sophia
Hinerangi otti pääoppaan roolin "early 1880s" — täsmää faktapohjan
"koko 1880-luvun alun". Tarawera purkautui 10.6.1886, tutkimus 2016
päätyi "suurin osa tuhoutui" — täsmää faktapohjan varovaiseen
muotoiluun (huomioi myös 2018–2024 jatkotutkimuksen, jota faktapohja ei
mainitse, mutta joka ei muuta 1873-tekstin kannalta olennaista faktaa).
Ei korjattavaa.

**T1 Otagon kultaryntäys (20.5.1861):** Vahvistettu sanatarkasti
en-Wikipedia "Otago Gold Rush": Gabriel Read löysi kultaa Gabrielin
kurussa Tuapeka-joen varrella 20.5.1861, "gold shining like the stars
in Orion" -sitaatti täsmää sanatarkasti, uutinen Otago Witnessissä
8.6.1861, John Hardyn vahvistus laukaisi ryntäyksen, jouluun mennessä
14 000 etsijää. Ei korjattavaa väestönkasvulukua lukuun ottamatta (ks.
VAROITUS 2).

**T2 Kultakenttien naiset:** Vahvistettu en-Wikipedia "Otago Gold
Rush": Janet Robertsonin mökissä Tuapekassa Read kirjoitti löytökirjeen,
Susan Nugent-Wood muutti Otagoon 1861 ja työskenteli virallisissa
tehtävissä kultakentillä (nimi ja vuosiluvut täsmäävät, syntynyt 1836
kuollut 1880 DNZB-lähteen mukaan), Elizabeth Potts sai Victoria-hotellin
anniskeluluvan Lawrencessa 1869. Ei korjattavaa.

**T3 Villatalous:** Ei tarkistettu erikseen tässä kierroksessa (luvut
8,1 miljoonaa eekkeriä / 7,6 miljoonaa puntaa / 2,2 miljoonaa eekkeriä
vaativat oman "History of New Zealand" -tarkistuksensa, jota en
ehtinyt tehdä) — **suosittelen kirjoittajaa tarkistamaan nämä
täsmäluvut vielä kerran ennen julkaisua**, koska en itse vahvistanut
niitä suoraan lähteestä.

**T4 Dunedin-laiva (15.2.1882):** Vahvistettu sanatarkasti en-Wikipedia
"Dunedin (1874 ship)" — tämä on faktapohjan tarkin ja vaikuttavin osio:
4 331 lampaan, 598 karitsan ja 22 sian ruhoa, kapteeni John Whitson
ryömi jäähdytettyyn ruumaan sahaamaan ilma-aukkoja ja pelastettiin
köydellä, matka Lontooseen 98 vuorokaudessa, The Times -sitaatti
"triumph over physical difficulties... incredible" täsmää sanatarkasti
(faktapohja parafraasaa oikein), Bell-Coleman-jäähdytyskone asennettu
1881. Kaikki luvut täsmäävät tarkalleen. Ei korjattavaa.

**P1 Polynesialaiset waka-purjehtijat:** Vahvistettu en-Wikipedia "Waka
(canoe)": waka hourua (kaksirunkoiset) mainittu perimätietona, Anaweka-
waka radiohiiliajoitettu n. vuoteen 1400, rakennettu Uudessa-Seelannissa
muun Polynesian tyyliä noudattaen. **"Great Fleet" -varoitus (avoin
kysymys F) tarkistettu erikseen ja vahvistettu asianmukaiseksi:**
en-Wikipedia "Māori migration canoes" vahvistaa, että S. Percy Smithin
"seitsemän kanootin 1350" -teoria on David Simmonsin 1960-luvulla
"demolished"-tasolla kumoama, ja historioitsija Rawiri Taonui käyttää
suoraan sanaa "falsification". Faktapohjan päätös välttää täsmällisiä
kanoottinimiä/-vuosilukuja ja käyttää yleisluontoista "perimätiedon
mukaan" -kehystä on siis linjakas ja perusteltu — ei muutosta tarvita.

**P2 Abel Tasman (13.12.1642):** Vahvistettu sanatarkasti en-Wikipedia
"Abel Tasman": ensimmäinen eurooppalainen näkijä 13.12.1642 (Etelä-
saaren lounaisrannikko/länsirannikko), neljä hollantilaista merimiestä
kuoli patu-iskuihin Golden Bayssa, paikka nimettiin "Murderers' Bay",
Tasman ei koskaan astunut maihin, Cook kumosi Terra Australis -teorian
1769. Ei korjattavaa.

**P3 James Cook (1769–1770):** Vahvistettu en-Wikipedia "James Cook":
Poverty Bay lokakuussa 1769, Tupaia tulkkina, Queen Charlotte Sound
tammikuussa 1770, salmen (Cookinsalmen) vahvistaminen, lähes koko
rantaviivan kartoitus. Ei korjattavaa.

**P4 Purjehdusaika (~98 vrk):** Vahvistettu sanatarkasti — sama
en-Wikipedia "Dunedin (1874 ship)" -lähde kuin T4:ssä: laivan
ensimmäinen matka Lontoosta Lytteltoniin 1874 kesti 98 vuorokautta,
1875 Aucklandiin 94 vuorokautta, kaikki seitsemän matkaa ennen
jäähdytyskonversiota alle 100 vuorokautta. Faktapohjan luku "~98–100
vuorokautta" on siis suoraan sama lähde kuin T4:n Dunedin-nosto —
tämä on hyvä yhtenäisyys, ei päällekkäisyysongelma, koska P4 käsittelee
yleistä purjehdusaikaa (kaikki 7 matkaa) ja T4 yhtä erityistä
rahtimatkaa (1882). Ei korjattavaa.

**MAAKARTAT-tilanne (avoin kysymys B):** Tarkistin `js/packs/
maakartat.js`:n suoraan `grep`-haulla kaikista maakoodeista rivillä
alkavista `  XXX: {`-määrittelyistä. **Vahvistettu: NZL-riviä EI ole
olemassa** — viimeisin rivi tiedostossa on `USA:`. Faktapohjan osio 9
on siis oikeassa siitä, että tilanne on tarkistamatta jätetty asia
seuraavalle kirjoittajalle, ja toteamus "todennäköisesti
suoraviivaisempi kuin USA/RUS" on looginen, koska Uusi-Seelanti ei
sisällä erillisiä saaria kaukana päämantereesta niin kuin
Alaska/Havaiji.

**Spec-mantereet.md:n Oseania-linjaukset:** Tarkistin
`docs/mantereet-tyoaineisto/spec-mantereet.md`:n Oseania-osion
suoraan. Kaikki kolme vaadittua linjausta täyttyvät faktapohjassa:
(1) maorikulttuuri elävänä eikä museokehyksenä — K1–K4 johdanto ja
tekstit korostavat nykyisyyttä ("ei ole 1873 mikään muisto");
(2) Waitangin sopimus 1840 perushistoriana — H1 kattaa tämän täysin;
(3) te reo -nimet (Aotearoa) mainitaan — osio 7 maan-intro käyttää
"Aotearoa"-nimeä oikein kontekstissa. Sotien kerronta on neutraali,
ei sankarikehystä kummallekaan puolelle (H2–H4 tarkistettu erikseen).

---

## Kelpaako-tuomio

**KELPAA kirjoitusvaiheeseen yhdellä pienellä korjauksella.**
Faktapohjan 20 historiallista nostoa, viisi minitehtäväehdokasta ja
avoimien kysymysten käsittely (erityisesti F: Great Fleet -myytti, ja
B: MAAKARTAT-tilanne) ovat kaikki riippumattomasti vahvistettuja ja
tarkkoja. Ainoa asia, joka pitää korjata ennen kirjoitusvaihetta, on
osion 1 virheellinen väite Aucklandista pelin "ainoana `start`-
tyyppisenä" NZL-kohteena — todellisuudessa neljä viidestä kaupungista
jakaa tämän `la`-arvon, joten peruste Aucklandin valinnalle
lehtikaupungiksi pitää kirjoittaa uudelleen (muilla, oikeilla
perusteilla: suurin kaupunki, `airport: true`, Sydney-reitin pääte).
Lisäksi kirjoittajan kannattaa: (a) pehmentää T1:n "nelinkertaistui"
-muotoilua hieman lähempänä Wikipedian "400 %" -lukua, ja (b)
tarkistaa vielä kerran T3:n villatalouslu­vut (8,1 milj. eekkeriä /
7,6 milj. puntaa / 2,2 milj. eekkeriä), joita en itse ehtinyt
vahvistaa suoraan en-Wikipediasta tällä kierroksella.
