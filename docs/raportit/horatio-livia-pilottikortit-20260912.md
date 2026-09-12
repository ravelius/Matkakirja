# Horatio–Livia: Euroopan yhteiset pilottikortit

Päivä: 12.9.2026  
Sisältörevision tunniste: `eu-hl-pilot-20260912-r1`  
Pohja: `origin/main` / `dd7154a3902ff49cc93ffb36380700bbd713ba98`  
Teksti- ja korttiomistaja: Codex-tekstivetäjä  
Animaatiototeutus: Codex-animaatiovetäjä  
Kuvat, manifestit ja visuaalinen QA: Codex-kuvavetäjä  
Kaanon, ääniajot, integraatio ja julkaisu: Fable

Tämä on yksi yhteinen pilotti, ei neljä irrallista sisältösarjaa. Marseille
on runtime-pilotti, Ateena ensisaapumisen tarkistus, Sarajevo rauhallisen
pohdinnan mitta ja Venetsia romanssipoikkeus. Packien näkyvät tekstit ovat
luonnoksia, kunnes Fable hyväksyy ne. Nykyisiä v2-äänitteitä tai vanhoja
aikaleimoja ei saa julkaista muuttuneiden tekstien kanssa.

## Yhteinen sopimus

- Puhdas teksti on pelaajan näkemä ja hyväksyttävä sisältö.
- TTS-versiossa sanat ovat samat; hakasuljetagit ovat vain tuotanto-ohjeita.
  Tagien poiston pitää palauttaa puhdas teksti sanatarkasti.
- Eleven v3 tukee puheeseen kirjoitettuja audio tageja, mutta äänen valinta,
  vakausasetus ja tekstin rakenne vaikuttavat tulokseen. Alla olevat tagit
  ovat kuunneltavia ehdokkaita, eivät lupaus tietystä suorituksesta.
- Pilotin Pulun repliikit ovat lyhyitä suhteessa ElevenLabsin oman v3-ohjeen
  yli 250 merkin kokeilusuositukseen. Jokainen niistä vaatii siksi erityisen
  kuunteluportin; tekstiä ei paisuteta vain suosituksen täyttämiseksi.
- Ajastus syntyy vasta lopullisen äänen forced alignmentista. Kortissa ei ole
  keksittyjä millisekunteja. Teksti- tai ääniversion muutos mitätöi sidonnan.
- `selittaa` tarkoittaa vain Livian konkreettista nykykaupunkiselitystä.
  Runtime-ehdotus on `cityExplain`: 1–2 pientä askelta vasemmalle, rauhallinen
  osoitus ja siipien avaus, paluu lepoon; mobiilissa lyhyempi siirtymä ja
  reduced motionissa staattinen asento. Tätä ei käytetä Venetsian romanssiin.
- Koneellinen integraatioavain on aina aksentiton `tarkoitus: 'selittaa'`;
  taulukoiden ihmislukuinen "selittää" ei ole data-arvo. Tekninen vastinpari
  on animaatiohaaran commit `ca091023` (`cityExplain`, `speechCueEnd`).
- Kuvatekstit ovat lopullisia vasta valmistuneen kuvan visuaalisen tarkistuksen
  jälkeen. Lyhyt on noin yksi lause; pitkä lisää enintään yhden lauseen ja
  kantaa lähde-, tekijä- ja lisenssitiedon.

## Cue-formaatti

`cueId | speaker | textVersion | exactAnchor | occurrence | meaning/intensity | voiceDirection | gestureRequest | priority | settle`

Horation nykyiset pysyvät `city.rN`-tunnisteet säilytetään aina kun niiden
merkitys säilyy. Poistettua tunnistetta ei numeroida uudelleen. Livian uudet
pilotitunnisteet ovat `city.livia.cN`.

## Marseille — runtime-pilotti

**Muistettava ajatus:** työ tarttuu satamaan ja satama matkustajaan; saippua
on sekä tavara että kuiva vastapari tervalle, kalalle ja suolalle.

**1873-kohtaus:** Horatio kohtaa köysissä auttaneen saippuakauppiaan, ostaa
palan ja vie sataman hajut mukanaan majataloon.

**Nykyhetken uusi näkökulma:** saippuaa tehdään yhä; Livia tunnistaa sataman
jo lokkien äänestä ja suolasta höyhenissä.

### Tekstit

Ennen, Horatio (6 virkettä / 341 merkkiä):

> Marseillen satamassa myytiin saippuaa tiiliskivinä. Kauppias vakuutti, että niillä pesisi vaikka koko maailman. Hänen kyntensä olivat mustat, sillä hän oli juuri auttanut laivan köysissä. Ostin palan. Terva, kala ja suolavesi seurasivat minua majataloon. Maailma ei suostunut pesuun yhdellä yrittämällä, mutta käteni olivat jo toista mieltä.

Jälkeen, Horatio (5 virkettä / 316 merkkiä):

> Marseillen satamassa myytiin saippuaa tiiliskivinä. Kauppias vakuutti, että niillä pesisi koko maailman. Hänen kyntensä olivat mustat: hän oli auttanut laivan köysissä. Ostin palan, mutta terva, kala ja suolavesi seurasivat majataloon. Maailma ei suostunut pesuun yhdellä yrittämällä; käteni olivat jo toista mieltä.

TTS-ehdokas, Horatio:

> [curious] Marseillen satamassa myytiin saippuaa tiiliskivinä. Kauppias vakuutti, että niillä pesisi koko maailman. Hänen kyntensä olivat mustat: hän oli auttanut laivan köysissä. Ostin palan, mutta terva, kala ja suolavesi seurasivat majataloon. [softly] Maailma ei suostunut pesuun yhdellä yrittämällä; käteni olivat jo toista mieltä.

Ennen, Livia (2 virkettä / 89 merkkiä):

> Marseillen saippuaa tehdään yhä. Sataman lokit eivät ole kuulleetkaan puhtaasta pöydästä.

Jälkeen, Livia (3 virkettä / 122 merkkiä):

> Marseillen saippuaa tehdään yhä. Lokit eivät tunne puhdasta pöytää. Minä erotan sataman jo äänestä ja suolasta höyhenissä.

TTS-ehdokas, Livia:

> [curious] Marseillen saippuaa tehdään yhä. [mischievously] Lokit eivät tunne puhdasta pöytää. [warmly] Minä erotan sataman jo äänestä ja suolasta höyhenissä.

### Cue-kartta

| cueId | puhuja | versio | täsmällinen ankkuri | esiintymä | merkitys / voima | äänen suunta | eletoive | prioriteetti | paluu |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| `marseille.r1` | Horatio | r1 | `saippuaa tiiliskivinä` | 1 | huvittuu / 0,35 | utelias havainto | pieni hymy | normaali | kuuntelee |
| `marseille.r2` | Horatio | r1 | `pesisi koko maailman` | 1 | epäilee / 0,50 | myyntipuhetta punnitseva | pieni päänpudistus | normaali | kuuntelee |
| `marseille.r3` | Horatio | r1 | `kyntensä olivat mustat` | 1 | hämmästyy / 0,40 | ristiriidan havainto | kaksoiskatse | normaali | kuuntelee |
| `marseille.r5` | Horatio | r1 | `terva, kala ja suolavesi` | 1 | huvittuu / 0,45 | hajuluettelo | hymy | normaali | kuuntelee |
| `marseille.r6` | Horatio | r1 | `käteni olivat jo toista mieltä` | 1 | huvittuu / 0,60 | kuiva loppu | lämmin naurahdus | korkea loppucue | kuuntelee |
| `marseille.livia.c1` | Livia | r1 | `Marseillen saippuaa tehdään yhä` | 1 | selittää / 0,45 | utelias | askel vasemmalle + osoitus | normaali | lepo |
| `marseille.livia.c2` | Livia | r1 | `Lokit eivät tunne` | 1 | ilo / 0,45 | leikkisä | siiven avaus | normaali | jatkaa puhetta |
| `marseille.livia.c3` | Livia | r1 | `jo äänestä ja suolasta` | 1 | lämmin / 0,45 | kokemuksesta puhuva | pieni käännös ja hengitys | normaali | lepo |

### Kuvat

- I1 `...marseille-r20260909-paper-v4.jpg`: säilyy; lyhyt teksti jo yksi
  lause. Pitkä teksti tiivistetään kahteen lauseeseen vasta kuvan
  uudelleenkatselmuksessa.
- I2 `...marseille-r20260911-paper2-v1.jpg`: säilyy; sama katselmusportti.
- P1 `pulu-cam-marseille-01-r20260909-euv1-v2.jpg`: säilyy, maanrajan
  kahvilanäkökulma.
- P2 `pulu-cam-marseille-02-v2-5218c67d5b38.jpg`: v2 katsottu ja
  tekstivetäjän hyväksymä 12.9.; versionoitu JPEG julkaistu mediaan ja
  takaisinluettu (200, JPEG, 1536×1024, sRGB, full decode,
  CORS `https://matkakirja.app`). SHA-256
  `5218c67d5b3868d83854107900a88da7acd1597efc8d035a52401255daf52464`.
  Löytö: Vieux-Portin pitkä allas ja veneiden maltilliset vanat ilmasta;
  nykyinen reittigeometria täydentää P1:tä eikä toista 1873-saippuakohtausta.
  Lyhyt kuvateksti: `Marseille: veneiden vaaleat vanat halkovat Vieux-Portin sinistä väylää.`
  Pitkä kuvateksti: `Veneiden perään jää vaaleita vanoja Vieux-Portin tummalle vedelle. Ilmasta näkyy, kuinka pitkä satama-allas ulottuu keskelle Marseillea.`
  Lähde/tekijä/lisenssi: Matkakirjan havainnekuva; OpenAI, maantieteellinen
  lähdevalokuva Olivier Cleynen / Wikimedia Commons, CC BY-SA 4.0. Teksti
  perustuu valmiiseen v2-kuvaan: kaksi venettä kulkee erillisin vanoin, eivät
  risteävinä.

**Ääni ja kohdistus:** Horatio-polku
`assets/audio/puhe-fokus-matkakirja-marseille.mp3`, nykyinen versio 2 on
vanhalle tekstille. Livian nykyinen `marseille-3`-tiiviste `bc17db80` on
vanhalle repliikille. Uusi ääni, SHA-256, tekstitiiviste ja alignment: odottaa
Fablen kaanon- ja ajolupaa.

**Faktatarkistus:** Marseillen virallinen matkailusivu vahvistaa sekä
historialliset suuret saippuapalat että nykyisen valmistuksen kaupungissa:
https://www.marseille-tourisme.com/decouvrez-marseille/traditions/le-savon-de-marseille/

## Ateena — ensisaapuminen

**Muistettava ajatus:** kultaa koskeva väittely on äänekäs, Akropolis ja
kahviraha tekevät työnsä ilman selitystä.

**1873-kohtaus:** Horatio kuuntelee Schliemann-väittelyä, katsoo Akropolista
ja maksaa kahvinsa kolikolla, jonka alkuperää kukaan ei kysele.

**Nykyhetken uusi näkökulma:** Schliemannin myöhempi talo on rahamuseo, ja
sen puutarhakahvilassa kolikko on palannut arkiseen tehtäväänsä.

### Tekstit

Ennen, Horatio (6 / 346):

> Ateenassa puhuttiin Troijasta löydetystä kullasta kuin jokainen olisi ollut kaivamassa. Kahvilan isäntä piti Schliemannia nerona, asiakas varkaana. Kummallakaan ei ollut kultaa näyttää. Akropoliin pylväät kohosivat pölyn takaa; ne eivät tarvinneet enää mainosta. Kaivoin taskustani kolikon kahvia varten. Sen alkuperästä isäntä ei kysynyt mitään.

Jälkeen, Horatio (4 / 337):

> Ateenassa puhuttiin Troijasta löydetystä kullasta kuin jokainen olisi ollut kaivamassa. Kahvilan isäntä piti Schliemannia nerona, asiakas varkaana, vaikkei kummallakaan ollut kultaa näyttää. Akropoliin pylväät kohosivat pölyn takaa eivätkä tarvinneet mainosta. Kaivoin taskustani kolikon kahvia varten; sen alkuperästä isäntä ei kysynyt.

TTS-ehdokas on packin samasanainen `[curious]` → `[softly]`-versio.

Ennen, Livia (2 / 103):

> Schliemannin myöhempi talo on nyt rahamuseo. Isoisä etsi aarretta; minä tarkistan ensin kahvilan pihan.

Jälkeen, Livia (3 / 124):

> Schliemannin talo on nyt rahamuseo. Puutarhakahvilassa kolikot tekevät taas tavallista työtään. Minä tarkistan ensin varjon.

TTS-ehdokas, Livia:

> [curious] Schliemannin talo on nyt rahamuseo. [warmly] Puutarhakahvilassa kolikot tekevät taas tavallista työtään. [mischievously] Minä tarkistan ensin varjon.

### Cue-kartta

| cueId | puhuja | versio | ankkuri | esiintymä | merkitys / voima | äänen suunta | eletoive | prioriteetti | paluu |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| `ateena.r1` | Horatio | r1 | `kuin jokainen olisi ollut kaivamassa` | 1 | epäilee / 0,40 | utelias | pieni päänpudistus | normaali | kuuntelee |
| `ateena.r3` | Horatio | r1 | `kummallakaan ollut kultaa näyttää` | 1 | huvittuu / 0,45 | kuiva ristiriita | hymy | normaali | kuuntelee |
| `ateena.r4` | Horatio | r1 | `eivätkä tarvinneet mainosta` | 1 | vakavoituu / 0,35 | rauhallinen | katse ylös | normaali | kuuntelee |
| `ateena.r5` | Horatio | r1 | `isäntä ei kysynyt` | 1 | huvittuu / 0,50 | kuiva loppu | hymy | korkea loppucue | kuuntelee |
| `ateena.livia.c1` | Livia | r1 | `nyt rahamuseo` | 1 | selittää / 0,45 | utelias | pieni osoitus | normaali | jatkaa |
| `ateena.livia.c2` | Livia | r1 | `tavallista työtään` | 1 | lämmin / 0,40 | lämmin | nyökkäys | normaali | jatkaa |
| `ateena.livia.c3` | Livia | r1 | `tarkistan ensin varjon` | 1 | ilo / 0,45 | leikkisä | siiven avaus | normaali | lepo |

**Ensisaapumisen portti:** nykyinen Livia-kommentti tulee vasta Horation
luennan jälkeen. Ensipaljastuksen ja uuden luennan järjestys, keskeytys sekä
vanhojen ajastimien siivous tarkistetaan animaatio-/runtime-pilotissa.

**Kuvat:** I1/I2 ja P1 säilyvät. P2-idea kuvavetäjälle: nyky-Ateenan tiivis
kaupunkimatto yläviistosta, Akropolis suunnanantajana; ei uutta kultakahvi-
toistoa. Kaikki uudet kuvatekstit odottavat valmista kuvaa.

**Ääni:** Horatio v2 ja Livia `ateena-3` / `418f4055` ovat vanhoille
teksteille. Uudet hashit ja kohdistus odottavat Fablea.

**Faktatarkistus:** numismaattinen museo toimii Schliemannin Iliou
Melathronissa, ja museo ilmoittaa puutarhakahvilan:
https://www.nummus.gr/en/iliou-melathron/ ja
https://www.nummus.gr/en/refreshment-room-cafe/. Troijan kultalöydön
vuosi 1873 on vahvistettu, mutta kahvilakeskustelu on tarinallinen kohtaus.

## Sarajevo — rauhallinen pohdinta

**Muistettava ajatus:** käsityön jälki tulee näkyväksi vasta, kun matkailija
pysähtyy katsomaan arkista astiaa.

**1873-kohtaus:** kuparisepän pieni vasara muuttaa aamukahvin pannun
esineestä käsin tehdyksi työksi Horation silmissä.

**Nykyhetken uusi näkökulma:** käsityö ja kahvipannu ovat yhä basaarissa;
Livia haluaa kuunnella työn rytmiä ennen juomaa.

### Tekstit

Ennen, Horatio (6 / 328):

> Sarajevon kupariseppä naputti pannuun kuvioita niin pienellä vasaralla, että olisin hukannut sen liivintaskuun. Viereisessä puodissa kaadettiin kahvia samanlaiseen pannuun. Olin juonut siitä aamulla katsomatta. Nyt näin jokaisen jäljen. Basaarin kujilla kuului kilkutusta kaikkialta. Kaupunki oli tehnyt aamiaiseni astian käsin.

Jälkeen, Horatio (5 / 318):

> Sarajevon kupariseppä naputti pannuun kuvioita niin pienellä vasaralla, että olisin hukannut sen liivintaskuun. Viereisessä puodissa kaadettiin kahvia samanlaiseen pannuun, josta olin aamulla juonut katsomatta. Nyt näin jokaisen jäljen. Basaarin kilkutus kuului kaikkialla. Kaupunki oli tehnyt aamiaiseni astian käsin.

TTS-ehdokas on packin samasanainen `[curious]` → `[softly]`-versio.

Ennen, Livia (3 / 108):

> Kupariseppiä on basaarissa yhä, ja kahvi tulee pienessä pannussa. Isoisä oppi katsomaan kuppiaan. Hyvä alku.

Jälkeen, Livia (4 / 113):

> Kupariseppiä on basaarissa yhä. Isoisä oppi katsomaan kuppiaan. Minä kuuntelisin vasaraa ennen kahvia. Hyvä alku.

TTS-ehdokas, Livia:

> [warmly] Kupariseppiä on basaarissa yhä. [curious] Isoisä oppi katsomaan kuppiaan. [softly] Minä kuuntelisin vasaraa ennen kahvia. Hyvä alku.

### Cue-kartta

| cueId | puhuja | versio | ankkuri | esiintymä | merkitys / voima | äänen suunta | eletoive | prioriteetti | paluu |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| `sarajevo.r1` | Horatio | r1 | `hukannut sen liivintaskuun` | 1 | huvittuu / 0,45 | kuiva hymy | hymy | normaali | kuuntelee |
| `sarajevo.r2` | Horatio | r1 | `aamulla juonut katsomatta` | 1 | vakavoituu / 0,35 | havahtuu | rauhallinen katse | normaali | kuuntelee |
| `sarajevo.r3` | Horatio | r1 | `jokaisen jäljen` | 1 | vakavoituu / 0,40 | paino oivallukselle | kuuntelu | normaali | kuuntelee |
| `sarajevo.r4` | Horatio | r1 | `aamiaiseni astian käsin` | 1 | myötäilee / 0,45 | lämmin loppu | nyökkäys | korkea loppucue | kuuntelee |
| `sarajevo.livia.c1` | Livia | r1 | `basaarissa yhä` | 1 | selittää / 0,40 | lämmin | hillitty osoitus | normaali | jatkaa |
| `sarajevo.livia.c2` | Livia | r1 | `oppinut katsomaan` | 1 | miettivä / 0,35 | pohtiva | pieni pään kallistus | normaali | jatkaa |
| `sarajevo.livia.c3` | Livia | r1 | `kuuntelisin vasaraa ennen kahvia` | 1 | lämmin / 0,40 | pehmeä | pysähtyy kuuntelemaan | normaali | lepo |

**Kuvat:** nykyinen I1/I2/P1 toistaa pannua ja kahvia. P2-idea on basaarin
kattojen ja käsityökorttelin rytmi lintuperspektiivistä ilman uutta pannua;
lopulliset tekstit vasta kuvan katselmuksesta.

**Ääni:** Horatio v2 ja Livia `sarajevo-3` / `006c3c2a` ovat vanhoille
teksteille. Uudet hashit ja kohdistus odottavat Fablea.

**Faktatarkistus:** Bosnia ja Hertsegovinan virallinen matkailusivu sekä
Visit Sarajevo vahvistavat Kazandžilukin elävän kupariseppäperinteen ja
kahvipannut:
https://visitbih.ba/en/one-of-the-oldest-streets-of-sarajevo-kazandziluk-500-years-long-tradition/
ja https://arhiva.visitsarajevo.ba/2018/04/sarajevo-coppersmiths-masters-of-an-old-craft/?lang=en.

## Venetsia — romanssipoikkeus

**Muistettava ajatus:** veden varaan rakennettu arki on sekä hiljainen että
intiimi; Livia yrittää selittää albumiaan ja paljastaa sillä tunteensa.

**1873-kohtaus:** majatalon kynnys johtaa veteen, gondolieri pidättää hymyn
ja yläkerran lusikka kuuluu kanavalle asti.

**Nykyhetken uusi näkökulma:** vesibussit kulkevat kanavilla; Livian viiden
kuvan albumi seuraa yhtä paikallista lintua. Romanssia ei nimetä tai ratkaista.

### Tekstit

Ennen, Horatio (5 / 348):

> Venetsiassa oven takana saattaa olla meri. Astuin aamulla majatalon portaille ja olin mennä kaupunkiin uimaan. Gondolieri tuli hakemaan ja piti ilmeensä ihailtavan suorana. Kuljimme palatsien ohi niin hiljaa, että kuulin lusikan osuvan kahvikuppiin yläkerrassa. Täällä taloilla on hienot julkisivut, mutta vesi pääsee kuuntelemaan niiden aamiaista.

Jälkeen, Horatio (4 / 348):

> Venetsiassa oven takana saattaa olla meri: astuin aamulla majatalon portaille ja olin mennä kaupunkiin uimaan. Gondolieri tuli hakemaan ja piti ilmeensä ihailtavan suorana. Kuljimme palatsien ohi niin hiljaa, että kuulin lusikan osuvan kahvikuppiin yläkerrassa. Täällä taloilla on hienot julkisivut, mutta vesi pääsee kuuntelemaan niiden aamiaista.

TTS-ehdokas on packin samasanainen `[curious]` → `[softly]`-versio.

Ennen, Livia (5 / 106):

> Tässä Venetsia. Hetkinen. Nuo ovat yksityisiä. Hän vain sattui jokaiseen hyvään kuvakulmaan. Sulje albumi.

Jälkeen, Livia (6 / 124):

> Tässä Venetsia. Vesibussit kulkevat yhä. Hetkinen. Nuo ovat yksityisiä. Hän osui jokaiseen hyvään kuvakulmaan. Sulje albumi.

TTS-ehdokas, Livia:

> [excited] Tässä Venetsia. Vesibussit kulkevat yhä. [whispers] Hetkinen. Nuo ovat yksityisiä. [mischievously] Hän osui jokaiseen hyvään kuvakulmaan. Sulje albumi.

### Cue-kartta

| cueId | puhuja | versio | ankkuri | esiintymä | merkitys / voima | äänen suunta | eletoive | prioriteetti | paluu |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| `venetsia.r1` | Horatio | r1 | `saattaa olla meri` | 1 | hämmästyy / 0,40 | utelias | kaksoiskatse | normaali | kuuntelee |
| `venetsia.r2` | Horatio | r1 | `mennä kaupunkiin uimaan` | 1 | huvittuu / 0,55 | kuiva vitsi | hymy | normaali | kuuntelee |
| `venetsia.r3` | Horatio | r1 | `ihailtavan suorana` | 1 | huvittuu / 0,45 | pidätetty hymy | hymy | normaali | kuuntelee |
| `venetsia.r4` | Horatio | r1 | `lusikan osuvan kahvikuppiin` | 1 | hämmästyy / 0,45 | hiljainen ihmetys | katse ylös | normaali | kuuntelee |
| `venetsia.r5` | Horatio | r1 | `kuuntelemaan niiden aamiaista` | 1 | myötäilee / 0,45 | lämmin loppu | nyökkäys | korkea loppucue | kuuntelee |
| `venetsia.livia.c1` | Livia | r1 | `Vesibussit kulkevat yhä` | 1 | utelias / 0,40 | innostunut | osoitus vesiliikenteeseen | normaali | jatkaa |
| `venetsia.livia.c2` | Livia | r1 | `Nuo ovat yksityisiä` | 1 | hämmentynyt / 0,55 | kuiskaus | albumin suojaus | korkea | jatkaa |
| `venetsia.livia.c3` | Livia | r1 | `Hän osui jokaiseen` | 1 | rakkaus / 0,80 | pidätetty ihastus | love, ei kävelyä | korkea | jatkaa |
| `venetsia.livia.c4` | Livia | r1 | `Sulje albumi` | 1 | hämmentynyt / 0,60 | nopea kuiskaus | katse pois | korkea loppucue | lepo |

**Kuvat:** I1/I2 säilyvät. P1–P5 on tarkoituksellinen romanssialbumi;
kuvia ei karsita eikä uutta P2:ta tilata. Niiden pitkät selitteet lyhennetään
enintään kahteen lauseeseen vasta kuvavetäjän visuaalisen uudelleenkatselmuksen
jälkeen, jotta punchline ja kuvassa oikeasti näkyvä yksityiskohta säilyvät.

**Ääni:** Horatio v2 ja Livia `venetsia-3` / `0aeef60b` ovat vanhoille
teksteille. Uudet hashit ja kohdistus odottavat Fablea.

**Faktatarkistus:** Venezia Unica ja ACTV vahvistavat nykyiset vaporetto-
vesibussit; reitit ja aikataulut ovat muuttuvaa tietoa:
https://tripplanner.veneziaunica.it/en/content/vaporetto ja
https://actv.avmspa.it/en/node/7296.

## Faktatarkistuksessa löytyneet sivuhavainnot

Nämä eivät muuta pilotin neljää näkyvää tekstiä, mutta ne on toimitettava
Fablelle erillisinä kaanonhavaintoina eikä korjattava ohimennen tässä PR:ssä:

- Marseillen Fort Saint-Jeanin nykyinen pakkausteksti ajoittaa rakentamisen
  vuoteen 1660; MuCEM ajoittaa Ludvig XIV:n käskystä rakennetun nykyisen
  linnoituksen alun vuoteen 1668.
- Sarajevon Livnon hevosten `1950-luku` ei saanut luotettavaa vahvistusta;
  osa aineistosta sijoittaa vapauttamisen 1970-luvulle.
- Ateenan kuvatekstin väite, että juuri Sophia Schliemannin valokuva teki
  kullasta puheenaiheen kaikkialla Euroopassa, on liian vahva syy-seuraus.

## Tarkistus- ja siirtotila

| Vaihe | Marseille | Ateena | Sarajevo | Venetsia |
| --- | --- | --- | --- | --- |
| inventoitu | valmis | valmis | valmis | valmis |
| teksti + cue-käsikirjoitus | luonnos r1 | luonnos r1 | luonnos r1 | luonnos r1 |
| faktatarkistus | valmis, pilotin väitteet tuettu | valmis, pilotin väitteet tuettu | valmis, pilotin väitteet tuettu | valmis, pilotin väitteet tuettu |
| kuvat | P2 v2 katsottu, tekstipari hyväksytty, JPEG/SHA/readback valmis ja packiin liitetty; pelijulkaisu/live-QA kesken | P2 idea toimitettu | P2 idea toimitettu | nykyinen 5 säilyy; 5/5 katsottu ja SHA-täsmäytetty |
| animaatiorajapinta | formaatti kuitattu | formaatti kuitattu | formaatti kuitattu | formaatti kuitattu |
| ääni / alignment | vanhentunut / estetty | vanhentunut / estetty | vanhentunut / estetty | vanhentunut / estetty |
| integraatio / CI / julkaisu / live-QA | ei aloitettu | ei aloitettu | ei aloitettu | ei aloitettu |

Kohdennettu Node 22 -ajo:
`node --test tests/fokusvirta.test.mjs tests/luentareaktiot.test.mjs tests/livia-aani.test.mjs tests/livia-tilanteet.test.mjs` → 111 testiä,
109 läpi ja 2 tarkoituksellista porttihylkäystä. Hylkäykset ovat
`kuiva ajo tunnistaa uudet ja muuttuneet repliikit` (Livian vanha tiiviste)
ja Marseillen v2-aikaleimatiedoston tekstisidonta (Horation vanha teksti).
Kuplien 125 merkin tekninen raja, samasanainen Horatio-TTS ja kaikkien
reaktioankkurien yksikäsitteisyys menevät nyt läpi. Koko testisarjaa,
standalone-buildia, CI:tä tai live-QA:ta ei ole vielä ajettu.

Uusi pilotin sisältövartio
`node --test tests/horatio-livia-pilotti.test.mjs` → 3/3 PASS. Se tarkistaa
neljästä kaupungista Horation näkyvän/TTS-tekstin samasanaisuuden, tagien
puuttumisen näkyvistä teksteistä, Livian 125 merkin kuplarajan sekä cue-ID:n
ja ankkurin yksikäsitteisyyden.

Seuraava tekijä: animaatiovetäjä sovittaa cue-rekisterin runtimeen; Fable
hyväksyy kaanonin ja päättää äänen tuotantoajosta. Marseillen P2 on liitetty
packiin mutta ei julkaistu pelissä; Ateena- ja Sarajevo-P2 odottavat pilotin
hyväksyntää ennen yksittäisiä kuvabriefejä.
