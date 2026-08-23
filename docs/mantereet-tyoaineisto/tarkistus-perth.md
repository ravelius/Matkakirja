# Perth-faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`,
`NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla viiveellä — sama 429-ilmiö
kuin faktapohja mainitsee, korjaantui jokaisella haulla) seuraavista
artikkeleista: **Perth**, Kings Park (Western Australia), Convict era
of Western Australia, Perth Mint, Perth Town Hall, Government House
(Perth), Swan River (Western Australia), **Whadjuk**, **Yagan**,
Fremantle Doctor, St George's Cathedral (Perth), Elizabeth Quay, WACA
Ground, Heirisson Island, **Swan Brewery** (Old Swan Brewery
-uudelleenohjauksen kohde), Perth Cultural Centre, Fremantle Prison.
Koordinaatit vahvistettu itse MediaWikin `action=query&prop=coordinates`
-rajapinnasta (`redirects=1`) kaikille kymmenelle kohdekartan
kohteelle sekä yhdennelletoista (Fremantle Prison). Etäisyydet ja
kompassisuunnat laskettu itse (haversine + bearing, Node).
Kulttuurivisa (`js/packs/oceania-questions.js`, kohta `perth`)
tarkistettu suoraan tiedostosta.

**Yleisarvio: erittäin huolellista ja tarkkaa työtä.** Kaikki kymmenen
kohdekartan koordinaattia, kaikki etäisyydet, koko säätaulukko, koko
convict era -aikajana (9 721 vankia / 43 laivaa / 7 300 vapaata
uudisasukasta / Hougoumont / 3 158 vankia / Comptroller General 1872 /
1874 itsehallintopyyntö) ja Perth Mintin luvut täsmäävät lähteisiin
sanatarkasti tai desimaalin tarkkuudella. Merkkimäärät (kaikki 20
johdanto- ja nosto-otsikkoa) tarkistettiin koneellisesti Node-
skriptillä — jokainen täsmää ilmoitettuun lukuun täsmälleen. Löysin
kuitenkin **kaksi todellista asiavirhettä** (kohdat A ja B, joista
toinen — Y2 — koskee suoraan Yaganin tarinaa, jota tehtävänanto
erikseen korosti) ja muutaman pienemmän tarkennuksen.

---

## A. VIRHE — H2: Government House "samalle paikalle" kuin Stirlingin teltta

**Väite (H2, nosto):** "Nykyinen Government House valmistui 1864,
suureksi osaksi vankityövoimalla, **samalle paikalle** Barrack
Streetin ja St Georges Terracen kulmaan, jossa kuvernööri Stirling
asui teltassa jo 1829."

**Faktapohjan oma fact-laatikko on tässä itse asiassa varovaisempi**
kuin proosa — se vain listaa kaksi faktaa peräkkäin ("Ensimmäinen
kuvernööri Stirling asui perheineen teltoissa Barrack Streetin ja St
Georges Terracen kulmassa 1829; nykyinen Government House rakennettiin
suurelta osin vankityövoimalla, peruskivi 17.3.1859...") väittämättä
suoraan, että kyse on samasta paikasta. Vasta nosto-proosa tekee tämän
identiteettiväitteen eksplisiittisesti.

**Lähde ("Government House, Perth") sanoo suoraan päinvastoin:**
"the first governor Captain James Stirling and his family were
initially housed in tents on a site near the corner of Barrack Street
and St Georges Terrace, known today as Stirling Gardens and Supreme
Court Gardens. In 1832, a temporary wooden building was constructed on
the same site... until **the so-called original Government House was
built A SHORT DISTANCE AWAY near the present-day site** between 1834
and 1835." Nykyinen (1859–1864) rakennus jatkaa tämän 1834/35-
rakennuksen paikkaa, ei telttojen paikkaa.

Eli: telttojen ja nykyisen rakennuksen sijainnit ovat lähteen OMAN
sanamuodon mukaan eri paikkoja — "a short distance away" — vaikka
molemmat ovatkin samalla korttelilla (Government House "sitting on the
same block as... the Supreme Court buildings", ja telttapaikka on
"known today as Stirling Gardens and Supreme Court Gardens"). Kyse ei
siis ole radikaalista virheestä (sama kortteli, sama yleisalue), mutta
"samalle paikalle" on tarkkaan ottaen liian vahva väite juuri siitä,
mistä lähde itse käyttää muotoilua "a short distance away" — ja koska
nosto rakentaa koko avausvirkkeensä tämän täsmällisen paikka-
identiteetin varaan, tämä on syytä korjata.

**PAKOLLINEN. Suositus:** "samalle paikalle" → esim. "samalle
korttelille" tai "muutaman sadan metrin päähän siitä paikasta" —
tai yksinkertaisimmin pudottaa täsmällinen paikkaväite ja pitäytyä
ajallisessa jatkumossa (1829 teltta → 1864 kivirakennus samalla
kulmalla/alueella).

---

## B. VIRHE — Y2: Yaganin väkivallan syy ("karjan keihästämisen vuoksi")

**Väite (Y2, nosto JA fact-laatikko, sama virhe molemmissa):**
"Yagan... puolusti kansansa oikeuksia väkivalloin sen jälkeen, kun
uudisasukkaat olivat ampuneet aboriginaaleja **karjan keihästämisestä**."
Fact-laatikko: "ryhtyi kostotoimiin sen jälkeen, kun siirtolaiset
olivat ampuneet aboriginaaleja mielivaltaisesti **karjan
keihästämisen vuoksi**... — en-Wikipedia 'Yagan'"

**Ongelma:** "Yagan"-artikkeli EI kerro tätä syytä. Artikkelin oma
tiivistelmä: "Yagan was pursued by the local authorities after he
killed Erin Entwhistle, a servant of farmer Archibald Butler. It was
an act of retaliation after Thomas Smedley, another of Butler's
servants, **shot at a group of Noongar people stealing potatoes and
fowls**, killing one of them." Toinen, myöhempi väkivaltakierteen
laukaissut tapaus (huhtikuu 1833) oli **jauhovaraston ryöstö**
Fremantlessa (Yaganin veli Domjum ammuttiin varkaudesta, mikä johti
Velvickien surmaan ja Yaganin julistamiseen lainsuojattomaksi) — ei
sekään karjan keihästäminen.

Artikkeli "Whadjuk" mainitsee YLEISENÄ taustakonfliktina, että
maanmenetys "led to spearing of stock" (alkuperäiskansat keihästivät
UUDISASUKKAIDEN karjaa) — **päinvastainen syy-seuraussuhde** kuin
faktapohjan väite, jossa uudisasukkaat ampuvat aboriginaaleja karjan
keihästämisen vuoksi. Kumpikaan lähde ei tue faktapohjan tarkkaa
muotoilua.

Tämä on juuri sitä väärää syy-seuraussuhdetta, jota tehtävänannon
kohta 3 pyysi erikseen varomaan (proosa ja fact-laatikko toistavat
saman virheen erikseen, molemmat riippumatta toisistaan väärin), ja
koska kyse on nimenomaan Yaganin tarinasta — tehtävänannon erikseen
korostama kohta — virhe on syytä korjata ennen julkaisua.

**PAKOLLINEN. Suositus:** korvaa "karjan keihästämisestä" tarkemmalla
ja lähteen mukaisella syyllä, esim. "sen jälkeen, kun uudisasukas oli
ampunut perunoita varastaneen aboriginaalin" (Entwhistlen surman
tausta, joulukuu 1831) tai jätä syy yleisemmälle tasolle
("kasvavan maakiistan väkivaltaisen kierteen keskellä") ilman
väärää yksityiskohtaa.

---

## C. Tarkennus — K2: Murrayn kunnianosoitus ja 18.6.1829-julistus

**Väite (K2, nosto):** "Kaupunki sai nimensä Perthistä, Skotlannista,
kunnianosoituksena siirtomaaministeri George Murraylle: nimi luettiin
ääneen Fremantlessa 18. kesäkuuta 1829."

Muotoilu antaa ymmärtää, että 18.6.1829 luettu julistus itsessään
kertoi/vahvisti Murray-kunnianosoituksen. "Perth"-artikkeli kuitenkin
sanoo, että julistuksessa käytettiin nimeä "Perth" (se päättyi
sanoihin "Given... at Perth this 18th Day of June 1829"), mutta **AINOA
aikalaislähde nimen Murray-yhteydestä on Charles Fremantlen
päiväkirjamerkintä 12.8.1829** ("named the town Perth according to the
wishes of Sir George Murray") — eri päivä kuin julistuksen lukeminen.
Lisäksi artikkelin oma teksti kantaa live-editointimerkintää
`{{failed verification|reason=Murray is not mentioned.}}` juuri
väitteessä, että Murray mainittiin julistuksessa — Wikipedian omat
toimittajat eivät ole pystyneet vahvistamaan tätä yhteyttä lähteestä.
Kyse ei ole faktapohjan keksimästä virheestä (molemmat yksittäiset
faktat — nimi Murrayn kunniaksi; julistus luettu 18.6. — ovat itsessään
oikein ja fact-laatikossa erikseen mainittu), mutta proosan
kausaalinen kytkentä niiden välillä ("kunnianosoituksena... nimi
luettiin ääneen...") on lähteen valossa liian vahva.

**Ei pakollinen, mutta suositeltava tarkennus:** erota kaksi asiaa
toisistaan, esim. "Kaupunki sai nimensä Perthistä, Skotlannista —
kapteeni Charles Fremantlen elokuisen 1829 päiväkirjamerkinnän mukaan
kunnianosoituksena siirtomaaministeri George Murraylle. Stirlingin
julistus siirtokunnan perustamisesta luettiin Fremantlessa jo 18.
kesäkuuta samana vuonna."

---

## D. Tarkennus — Jakso 3: "yli 320" (proosa) vs. "yli 324" (fact-laatikko)

**Väite (Jakso 3, proosa):** "yli 320 alkuperäistä kasvilajia."
**Fact-laatikko:** "yli 324 alkuperäistä kasvilajia." **Lähde** (Kings
Park -artikkelin lead): "home to over 324 native plant varieties."

324 ei ole virheellinen luku fact-laatikossa, ja "yli 320" ei ole
teknisesti väärin (324 > 320) — mutta proosa pyöristää tarkan luvun
epätarkemmaksi, kun taas fact-laatikko säilyttää täsmällisen arvon.
Tämä on juuri sitä proosa-vs-fact-laatikko-eroa, jota tehtävänannon
kohta 3 pyysi tarkistamaan kahdesti — tässä ero on pieni eikä
harhaanjohtava, mutta helppo yhtenäistää.

**Ei pakollinen.** Suositus: käytä proosassakin tarkkaa lukua "yli
324" tai jätä molemmat samaan pyöristystasoon.

---

## E. Tarkennus — kohdekartan kompassisuunnat (osio 4)

Laskin itse kaikki yhdeksän etäisyyttä ja kompassisuuntaa Government
Housesta (haversine + bearing, samat koordinaatit kuin koostaja):

| Kohde | Koostajan luku | Oma laskelma | Kompassisuunta (oma) |
|---|---|---|---|
| Perth Town Hall | ~0,24 km pohjoiseen | 0,241 km | **NNW**, ei N |
| St George's Cathedral | ~0,14 km pohjoiseen | 0,143 km | N (täsmää) |
| Perth Cultural Centre | ~0,82 km pohjoiseen | 0,818 km | N (täsmää) |
| Elizabeth Quay | ~0,42 km länteen | 0,422 km | W (täsmää) |
| Perth Mint | ~0,73 km itään | 0,732 km | E (täsmää) |
| WACA Ground | ~1,73 km itään | 1,732 km | E (täsmää) |
| Heirisson Island | ~2,17 km kaakkoon | 2,174 km | **ESE**, ei SE |
| Old Swan Brewery | ~2,17 km lounaaseen | 2,173 km | **WSW**, ei SW |
| Kings Park | ~2,86 km länteen | 2,862 km | **WSW**, ei W |

Kaikki yhdeksän etäisyyttä täsmäävät kolmen desimaalin tarkkuudella —
koostajan koordinaatit ja menetelmä ovat luotettavia. Neljä
kompassisuunnista (Town Hall, Heirisson Island, Old Swan Brewery,
Kings Park) on kuitenkin pyöristetty yhden pykälän verran
karkeammaksi kuin todellinen laskettu suunta. Sama ilmiö havaittiin
Vancouver-faktapohjan tarkistuksessa (kohta D siellä) — ei
harhaanjohtavaa itse kartalla, mutta jos suunnat mainitaan
sanallisesti tekstissä, kannattaa käyttää tarkempia väli-ilmansuuntia.

**Ei pakollinen.**

**Kaikki kymmenen koordinaattia vahvistettu MediaWikin
`action=query&prop=coordinates`-rajapinnasta täsmälleen samoiksi kuin
taulukossa** (mukaan lukien "Old Swan Brewery" -uudelleenohjauksen
Wikidata-koordinaatti 31,96527778°S / 115,84055556°I — tämä on APIn
palauttama ensisijainen koordinaatti "Swan Brewery" -artikkelille,
EI sama kuin artikkelin "Old Swan Brewery site" -infoboxin oma erillinen
desimaaliarvo -31.96509/115.84070 n. 24 m kauempana; molemmat viittaavat
samaan rakennukseen Mount Elizan juurella, joten ero ei ole
harhaanjohtava). Myös "Perth"-artikkelin karkea infobox-koordinaatti
(-32, 115.9) ja Fremantle Prisonin koordinaatti/etäisyys (14,910 km,
suunta 223° eli lounaaseen — täsmää "14,9 km lounaaseen") vahvistettu.
Ei virhettä: "kaikki kymmenen kohdetta mahtuvat n. 2,9 km säteelle" on
tarkka (laskettu maksimietäisyys 2,862 km).

---

## F. Huomio (ei virhe) — Old Swan Brewery ja Goonininup-lähteen sijainti

Taulukon kohde 9 on merkitty "Old Swan Brewery (Goonininup-lähde,
Kennedy Spring)". "Swan Brewery" -artikkelin oma kuvaus vuosien
1989–90 protestista Old Swan Breweryn uudisrakentamista vastaan
kertoo, että **kehittäjät (developers) väittivät** tuolloin, että
"the site of Noongar heritage importance was **further inland**, close
to the Mount Eliza escarpment" — eli EI panimorakennuksen kohdalla
vaan hieman sisämaahan päin. Noongar-yhteisö ei hyväksynyt tätä
väitettä, ja Kings Park -artikkeli itse sijoittaa Kennedy
Spring/Goonininupin "Mount Elizan eteläisen rinteen juurelle" — mikä
on maantieteellisesti sama alue kuin panimon sijainti "Swan-joen
rannalla Mount Elizan alla". Koostajan valinta on siis linjassa
Noongar-yhteisön oman, vallitsevan tulkinnan kanssa, mutta kyseessä on
historiallisesti kiistanalainen tarkka sijainti (kehittäjien 1989–90
vastaväite on dokumentoitu samassa lähdeartikkelissa). Ei vaadi
korjausta, mutta jos teksti tarkentaa sijaintia täsmällisemmin, tämä
kiista kannattaa tuntea.

---

## G. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

- **K1:** Kennedy Spring (Goonininup), de Vlaminghin retkikunta
  11.1.1697, Stirlingin valinta ainoan lähteen vuoksi, Mount Eliza
  nimetty Eliza Darlingin mukaan — täsmää sanatarkasti "Kings Park,
  Western Australia" -artikkeliin.
- **K3 (tarkistettu erityisen huolella):** 1850 pyyntö työvoimapulan
  vuoksi, ehdot (ei naisia/poliittisia/vakavia rikollisia, naiskielto
  piti koko ajan), 9 721 vankia 43 laivalla 1850–1868, 7 300 vapaata
  uudisasukasta — täsmää sanatarkasti "Perth"- ja "Convict era of
  Western Australia" -artikkeleihin.
- **K4:** väkiluku 23 000 (1869) → 180 000 (1900), Coolgardie/
  Kalgoorlie/Murchison-kultalöydöt, Perth Mintin peruskivi 1896 (John
  Forrest), avaus 20.6.1899, 106 miljoonaa sovereignia ja 735 000
  puolisovereignia 32 vuodessa vuoteen 1931 — täsmää sanatarkasti
  "Perth Mint" -artikkeliin.
- **H1:** Perth Town Hall on Australian ainoa vankityövoimalla
  rakennettu kaupungintalo, 1867–1870, kaupungin korkein rakennus
  valmistuessaan, East Perthin savi, broad arrow -ikkunat, hirsipuun
  köysi -koristelu, jarrahportaikko, muotokuvat George Shentonista
  alkaen, Hay/Barrack-kulma — täsmää sanatarkasti.
- **H2 (paikka-asiaa lukuun ottamatta):** peruskivi 17.3.1859,
  kustannus 15 000 puntaa, John Hampton muutti taloon 1863 ennen
  valmistumista 1864, 1890-luvun juhlasali Hillson Beasleyn johdolla —
  täsmää sanatarkasti.
- **H3/H4 (tarkistettu erityisen huolella, koska koko sivun teema):**
  Hougoumont 10.1.1868, 62 fenian-vankia, 3 158 vankia vielä vuoden
  1868 lopussa, Comptroller General of Convicts lakkautettu 1872,
  Catalpa-pakopako 1876, 1874 itsehallintopyyntö hylätty osittain
  entisten vankien suuren väestöosuuden vuoksi, koulunopettajan toimi
  ainoana julkisena virkana joka oli avoin ex-vangeille — täsmää
  sanatarkasti "Convict era of Western Australia" -artikkeliin.
- **L1:** jarrah-hakkuu 1835–1871, Malcolm Fraser suostutteli
  kuvernööri Weldin 432 eekkerin Perth Parkiin 1871, uudelleennimeäminen
  King's Parkiksi 1901 Edward VII:n valtaannousun kunniaksi, Mooro
  Katta / Kaarta Gar-up / Kaarta Koomba -nimet — täsmää sanatarkasti.
- **L2:** Derbarl Yerrigan, Wagyl/Waugal-luomistarina Darling Scarpista,
  de Vlamingh 1697 (Swarte Swaene-Revier), Baudinin retkikunta 1801 —
  täsmää sanatarkasti "Swan River (Western Australia)" -artikkeliin.
- **L3:** whadjukien kuusi vuodenaikaa, Birak (marras-joulukuu, itätuulet,
  mosaiikkipoltto) ja Bunuru (tammi-helmikuu, rannikon jokisuille
  siirtyminen) kuvattu tarkasti; Bunuru-kaudella mainitaan myös
  "Fremantle doctor" -nimitys samassa artikkelissa — täsmää.
- **L4:** vuoden 1862 tulva, ämpäriruoppaaja Black Swan 1872–1911,
  Heirisson Islandin mutatasanko — täsmää sanatarkasti.
- **Y1:** neljä asuinaluetta (Beeliar/Beeloo/Mooro/nimeämätön
  "vuoristokansa"), Yellagongan tapaaminen Crawleyn rannalla (nykyinen
  UWA) luutnanttikuvernööri Irwinin veneen kanssa — täsmää
  sanatarkasti "Whadjuk"-artikkeliin.
- **Y2/Y3 (Yaganin vuosiluvut, tarkistettu erityisen huolella
  tehtävänannon painotuksen mukaisesti):** kuolema 11.7.1833
  (pakolaisuus Keates-veljesten toimesta — "tuntemansa nuorukaisen"
  vahvistuu "Whadjuk"-artikkelista: "killed by one of two European
  boys he had befriended"), pää savustettiin ja vietiin Lontooseen,
  Thomas Pettigrew esitteli sitä egyptiläismumioiden rinnalla,
  hautaus Liverpoolin museon toimesta huhtikuussa 1964 (10.4.1964)
  yhdessä perulaismuumion ja māori-pään kanssa, etsintä alkoi
  1980-luvun alussa, Cressida Fforde jäljitti pään joulukuussa 1993,
  luovutus noongar-valtuuskunnalle Liverpoolin kaupungintalossa
  31.8.1997, uudelleenhautaus 10.7.2010 Yagan Memorial Parkissa
  Belhusissa — kaikki täsmäävät täsmälleen. **Kuolinpäivän ja
  uudelleenhautauksen päivämääräero on koostajan itsensä oikein
  huomioima** (11.7. vs. 10.7., "lähellä" vuosipäivää, ei samana
  päivänä).
- **Y4:** Bennell v State of Western Australia [2006] FCA 1243,
  19.9.2006; South West Native Title Settlement (whadjuk-osuudella)
  vahvistettu 1.12.2021; Yagan Square avattu 3.3.2018, 9-metrinen
  Wirin-patsas — täsmää sanatarkasti.
- **St George's Cathedralin liitäntä Fanny Balbukiin (osio 4, kohde
  3):** vahvistettu "Whadjuk"-artikkelista sanatarkasti: "Fanny had
  been born on the Aboriginal sacred site that underlies St George's
  Cathedral."
- **Jakso 1:** Fremantle 19 km lounaaseen Swan-joen suulla, Perthin
  tärkein kontti- ja matkustajasatama; Parmelia/Sulphur 1829, Stirlingin
  sitaatti "as beautiful as anything of this kind I had ever
  witnessed" — täsmää sanatarkasti.
- **Jakso 3:** Kings Park Australian suurin villikukkanäyttely
  syyskuussa, 5,8 miljoonaa kävijää (2012, vuosiluku oikein mainittu),
  Länsi-Australian suosituin yksittäinen matkailukohde — täsmää
  (kasvilajimäärä ks. kohta D).
- **Jakso 4:** melbournelaistoimittajan sitaatti vuodelta 1870
  ("a quiet little town of some 3000 inhabitants...") — täsmää
  sanatarkasti, mukaan lukien lähdeviite "The Perth Gazette and West
  Australian Times, 18.3.1870".
- **Jakso 5 / säätiedot:** Köppen Csa, n. 3 200 auringonpaistetuntia,
  Australian aurinkoisin osavaltion pääkaupunki, ennätyskuumin 46,2 °C
  (23.2.1991), ennätyskylmin -0,7 °C (17.6.2006), Fremantle Doctor
  käytössä 1870-luvulta, ulottuu 100 km sisämaahan Yorkiin — jokainen
  luku täsmää lähteeseen täsmälleen. Termin alkuperän epävarmuus
  ("Origin of term for the sea breeze in Perth still unknown", 1986)
  on koostajan oma huomio oikein.
- **Fremantle Prison:** UNESCO-maailmanperintökohde (2010), rakennus
  alkoi 1851 vankityövoimalla — täsmää.
- **Kulttuurivisan (`oceania-questions.js`, kohta `perth`) ydinsisältöä
  ei anneta suoraan missään nostossa tai jaksossa:** eristyneisyys-
  ("lähin miljoonakaupunki yli 2000 km") ja Jakarta-vertailufaktoja
  (visan kohdat 1–2) ei käytetty lainkaan; Fremantle Doctor mainitaan
  vain jaksossa 5 uusilla faktoilla (1870-luvun termi, 100 km:n
  ulottuvuus) toistamatta visan "viilentää helteisen päivän"
  -perustelua (visan kohta 3) — vahvistettu suoraan
  `js/packs/oceania-questions.js`:n `perth`-kohdasta.
- **Merkkimäärät:** kaikki 20 johdanto- ja nosto-otsikkoa tarkistettiin
  koneellisesti (Node-skripti laski jokaisen lainauslohkon
  merkkimäärän erikseen) — jokainen täsmää ilmoitettuun lukuun
  täsmälleen (esim. K1 = 494, H4 = 657, Y2 = 519 merkkiä).

---

## Yhteenveto korjattavista kohdista

1. **[PAKOLLINEN] H2:** "samalle paikalle... jossa kuvernööri Stirling
   asui teltassa jo 1829" on liian vahva väite — lähde sanoo nykyisen
   rakennuksen olevan "a short distance away" telttojen paikasta.
   Korjaa sanamuoto (ks. kohta A).
2. **[PAKOLLINEN] Y2:** "karjan keihästämisestä" ei ole Yaganin
   väkivallan dokumentoitu syy kummassakaan tarkistetussa lähteessä —
   "Yagan"-artikkeli mainitsee perunoiden/kanojen varastamisesta
   ammutun aboriginaalin (joulukuu 1831) ja myöhemmin jauhovaraston
   ryöstön (huhtikuu 1833); "Whadjuk"-artikkeli kuvaa karjan
   keihästämisen PÄINVASTAISENA syy-seuraussuhteena (aboriginaalit
   keihästivät uudisasukkaiden karjaa, eivät toisin päin). Korjaa nosto
   JA fact-laatikko (ks. kohta B) — koskee suoraan Yaganin tarinaa,
   jonka tarkkuutta tehtävänanto erikseen korosti.
3. **[Tarkennus] K2:** Murray-kunnianosoituksen ja 18.6.1829-julistuksen
   välinen kausaalinen kytkentä on lähteen (ml. Wikipedian oma
   failed-verification-merkintä) valossa liian vahva — erota kaksi
   faktaa toisistaan (ks. kohta C).
4. **[Tarkennus] Jakso 3:** proosan "yli 320" vs. fact-laatikon "yli
   324" kasvilajia — yhtenäistä lukuun 324 (ks. kohta D).
5. **[Tarkennus] Osio 4, kompassisuunnat:** neljä suuntaa (Perth Town
   Hall NNW, Heirisson Island ESE, Old Swan Brewery WSW, Kings Park
   WSW) on pyöristetty yhden pykälän karkeammaksi kuin todellinen
   laskettu suunta — etäisyydet itsessään ovat kaikki oikein (ks.
   kohta E).
6. **[Ei virhe, huomio]** Old Swan Brewery / Goonininup-lähteen tarkka
   sijaintisuhde on historiallisesti kiistanalainen (1989–90
   kehittäjien vastaväite) — koostajan valinta on Noongar-yhteisön
   oman tulkinnan mukainen eikä vaadi korjausta, mutta kannattaa
   tuntea jos sijaintia tarkennetaan tekstissä (ks. kohta F).

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Yaganin vuosiluvut:** kuolema 11.7.1833, pään uudelleenhautaus
  10.7.2010, luovutus 31.8.1997, hautaus Liverpoolissa huhtikuussa
  1964 — **kaikki täsmäävät täydellisesti**. Ainoa löydetty virhe
  Yagan-kokonaisuudessa on väkivallan LAUKAISSEEN tapahtuman syy
  (kohta B), ei mikään vuosiluvuista.
- **Kings Parkin varaaminen 1871:** täsmää täydellisesti (432 eekkeriä,
  Malcolm Fraser, kuvernööri Weld).
- **Vankiaikakauden vuodet (1850–1868, 1872, 1874, 1876):** kaikki
  täsmäävät täydellisesti "Convict era of Western Australia"
  -artikkeliin.
- **Whadjuk-noongareita koskevat sanamuodot (Raamatun pilari 3):**
  koostaja kuvaa whadjukit läpi koosteen nykyisenä, elävänä kansana
  (nykyiset maaoikeussopimukset 2021, Yagan Square 2018, kuuden
  vuodenajan elävä käytäntö) eikä pelkkänä menneisyyden kuriositeettina;
  Yaganin kohtalo kerrotaan (Y2/Y3) toteavana tapahtumasarjana ilman
  julmuuksien yksityiskohtien liiallista korostamista tai kummankaan
  osapuolen sankarikehystä — linjassa pilarin 3 kanssa. Ainoa
  sisällöllinen huomautus tähän liittyen on kohdan B virhe (väärä syy
  Yaganin väkivallalle), joka on syytä korjata juuri siksi, että
  aihe on herkkä eikä sen tarkkuudesta pidä tinkiä.
- **Kulttuurivisan suora anto:** vältetty onnistuneesti kaikissa
  kolmessa visafaktassa (eristyneisyys, Jakarta-vertailu, Fremantle
  Doctorin selitys) — vahvistettu suoraan lähdetiedostosta.
- **Koordinaatit:** kaikki kymmenen kohdekartan koordinaattia
  vahvistettu MediaWiki-rajapinnasta täsmälleen samoiksi kuin
  taulukossa; etäisyydet vahvistettu itse laskemalla (poikkeamat
  senteissä, ei metreissä).
