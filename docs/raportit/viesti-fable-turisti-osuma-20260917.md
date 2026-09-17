# Viesti Fablelle: kyltti voittaa kosketusvaran, saa saman kertoimen ja oman laatikon

**Opus-sessio 17.9.2026. Haara `claude/bold-ride-vow4ki-turisti-osuma`
(pohja origin/main = v1927, `413204c7`). Ei PR:ää, ei versionostoa, ei
Raamattu-muokkausta.**

Tilaus: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 31 **TARKENNUS 2 kohdat
4–6** (omistaja 17.9.2026 klo 03.30 UTC, kaksi korttia) ja **TARKENNUS 3
kohta 7** (sama omistaja klo 06.35 UTC, kortti *"Kyltti siirtyy
sivuun"*). Kaikki neljä on tehty ja mitattu molemmilla ruuduilla, ja
savuke on **68/68 vihreä**.

**Kuva (ennen | jälkeen, 390 × 844 dpr 2, Pariisin sisin sallittu
zoomi):** `docs/raportit/kuvat/turisti-osuma-390-20260917.jpg` (82 kt).
Vasemmalla *Impressionistit…* kulkee *Turisti-infon* läpi, oikealla
kyltti on vapaa.

---

## 1. Kohta 4 — KYLTTI VOITTAA KOSKETUSVARAN

| mitta (Pariisin lähizoomi, napautus kyltin keskelle) | ENNEN (v1927) | JÄLKEEN |
|---|---|---|
| 390 × 844 | ei avannut mitään | **avasi oppaan (Matkailijan Pariisi)** |
| 1400 × 900 | ei avannut mitään | **avasi oppaan (Matkailijan Pariisi)** |
| Bukarestin lappuvartiot 2, 6, 7 (8 px sormenpoikkeama) | vihreät | **vihreät** |

Sääntö on omistajan oma sanamuoto kahtena mittana
(`js/pallolauta/lauta.js` `lahinMerkki`):

1. sormi on kyltin **omalla musteella** (symboli tai nimiöteksti, ei
   kosketusvaraa) → kyltti vie napautuksen;
2. paitsi jos sormi on samalla noston **omalla musteella**
   (`musteeseenOsunut(lat, lng, 0)` eli kosketusvara nollassa) →
   Chambord-sääntö 14.9. säilyy sellaisenaan.

Haara ei koske lainkaan napautuksiin kyltin ulkopuolella, ja juuri siksi
Bukarest pysyy vihreänä: siellä sormi ei ole kyltin päällä, joten
16 px:n kosketusvara on yhä voimassa. **Tähän kaatui 16.9. kokeiltu
korjaus (a)**, joka antoi kyltin voittaa aina kun se oli lähin merkki.

**Vastakoe on kaksiportainen ja se paljasti yhden asian.** Pelkkä
`?kylttiosuma=0` **ei** riitä vastakokeeksi puhelimella: mitattu
17.9.2026, kyltti aukeaa siellä myös ilman tätä sääntöä, koska kohdan 6
laatikkokorjaus siirsi naapurin lapun pois kyltin päältä — työpöydällä
ei aukea. Kohdat 4 ja 6 korjaavat siis saman napautuksen kahdesta päästä.
Vartio 7g kääntää siksi **molemmat** pois
(`?kylttiosuma=0&kylttilaatikko=0`), ja silloin napautus ei avaa mitään
kummallakaan ruudulla — täsmälleen se tila, jossa omistaja vian näki.
Pelkän osumasäännön mittaus jää INFO-riviksi molemmille ruuduille.

## 2. Kohta 5 — KYLTIN KERROIN SAMA KUIN MUILLA MERKEILLÄ

| kyltin nimiö ruudulla | ENNEN (v1927) | JÄLKEEN |
|---|---|---|
| saapumisnäkymä, 390 px | **16,00 px** (katossa jo saapuessa) | **11,50 px** |
| saapumisnäkymä, 1400 px | **8,25 px** (lattiassa) | **11,50 px** |
| lähizoomi, 390 px | 16,00 px | 16,00 px |
| lähizoomi, 1400 px | 16,00 px | 16,00 px |
| merkin mitta lähizoomissa | 1,4545 | 1,4545 |
| vastakoe `?nimiokatto=0`, 390 / 1400 | 79,80 / 22,97 px | **33,77 / 33,77 px** |

Sama pelitilanne antoi ennen puhelimelle 3,3-kertaisen kyltin
työpöytään nähden; nyt luku on sama molemmilla, ja se on
**kaupunkimerkin oma nimiökoko** (`KAUPUNKIMERKIN_NIMIO_PX` = 11,5 px).
Korjaus ei ole uusi kaava vaan vanhan poisto: mitta tulee samasta
funktiosta kuin kaupunkimerkillä, `nostonMitta(KAUPUNKIMERKIN_KERROIN)`
(`js/pallolauta/lauta.js` `paivitaTuristiInfo`). Vertailuleveys *maan
laatikko × 1,15* ja koko `kaupunkimerkinMitta`-funktio ovat poissa
`js/kaupunkinosto.js`:stä — kerroin ja katto asuvat nyt yhdessä paikassa.

Sivutulos: vastakokeen luku on nyt **sama molemmilla ruuduilla**
(33,77 px), koska kerroinkin on sama. Se on itsessään todiste siitä,
että kohta 5 puri.

`savuke-kaupunkipopup.mjs`:n vartio *"merkki skaalautuu zoomatessa"* on
päivitetty: kaksiosainen haara *"katto puree jo maan näkymässä"* on
poistettu, koska sen ehto ei voi enää toteutua (saapumismitta 1,0455 <
katto 1,4545). Tilalle tuli uusi vartio *"kyltin kerroin on sama kuin
muilla merkeillä (saapuessa 11,5 px)"* — vihreä Pariisissa ja
Marseillessa, molemmilla ruuduilla.

## 3. Kohta 6 — KYLTIN VARAUS LADONNASSA

| mitta (Pariisin lähizoomi) | ENNEN (v1927) | JÄLKEEN |
|---|---|---|
| kyltin varaus `merkit.laatikot('turistiinfo')` | **1,00 × 1,00 px** | **96,62 × 21,53 px** |
| kyltin piirretty ala ruudulla | 97,45 × 21,34 px | 97,45 × 21,34 px |
| kaupunkinimiä varauksen päällä, 390 / 1400 | 0 / 0 | 0 / 0 |
| nostolappuja varauksen päällä, 390 | **1** (*Impressionistit…*) | **0** / 12 |
| nostolappuja varauksen päällä, 1400 | **1** (*Impressionistit…*) | **0** / 19 |
| Bukarest, Ateena, Helsinki, Istanbul (savuke-pallo-nostolaput) | 8/8 | **8/8** |

## 4. Juurisyy kohdassa 6 oli kaksikerroksinen — ja se mitattiin

**Ensimmäinen kerros** on se, jonka edellinen erä jo löysi: merkin svg on
1 × 1 px ja koko piirros elää `overflow: visible` -siirtoryhmässä, joten
`merkit.laatikot('turistiinfo')` palautti PISTEEN. Ilmeinen korjaus on
lukea ryhmän oma laatikko DOMista, ja se kokeiltiin ensin.

**Se ei riittänyt, ja syy mitattiin.** DOM-luku antoi oikean mitan
(97,45 × 21,34 px), mutta *Impressionistit…* jäi silti kyltin päälle
2,35 px:n kaistalla — **molemmilla ruuduilla, toistettavasti**. Kolme
mittausta erottivat syyt toisistaan:

1. kyltin elementin ankkuri oli **täsmälleen** kartan laskemassa
   ruutupisteessä (390 px: 223,09 / 403,71 kumpikin) → paikka ei ollut
   jäljessä;
2. sovittelun saama estelista sisälsi kyltin oikean levyisenä
   (`kiinteitä 1, kyltin leveys 97,45`) → este ei puuttunut;
3. **sama ladonta uudelleen ajettuna (`ladoHeti`) siirsi lapun pois** →
   ladonnan hetkellä luettu ala ei ollut se, minkä DOM antoi hetkeä
   myöhemmin.

Kolmas mittaus on vastaus: merkin **rasteri paistetaan asynkronisesti**
(`js/fokusnosto-symbolit.js` `asetaRasteri`), joten ruudulta luettu ala
on ladonnan hetkellä edellisen portaan ala. Kaksi kokeiltua kiertotietä —
uusi ladontapyyntö, kun varauksen mitta muuttuu, ja sovittelun toinen
kierros — **eivät muuttaneet lukuja lainkaan** (mitattu, molemmat
peruttiin).

**Korjaus on lähteen vaihto, ei uusi silmukka.** Kyltin laatikko
lasketaan nyt samasta `nostonLaatikko`-kaavasta kuin nostojen omat
laatikot, samalla mitalla ja samalla nimiöllä kuin kyltti piirretään
(`js/pallolauta/lauta.js` `kyltinLaatikot`, `KYLTIN_LADONTA`). Kaava ei
odota ketään — ja juuri siksi nostot lasketaan kaavasta eikä ruudulta
(`js/pallolauta/nostot.js` `sovittele`: *"ei layout-thrashia"*). Sama
laatikko palvelee sekä ladontaa että osumatestiä, joten kaksi laatikkoa
samalle merkille ei voi olla eri mieltä.

## 5. Kohtien 4–6 mitattu hinta — jonka omistaja ratkaisi samana aamuna

Kohdan 6 jälkeen `savuke-pariisi-lahizoom` **3e4** oli punainen
molemmilla ruuduilla:

> *"yhdenkään aihenoston nimiö ei ole piilossa — 1 piilossa:
> aihemerkki:syvennys-pariisi-impressionistit"*

Kaksi omistajan omaa sääntöä osuivat yhteen: **PAATOKSET 27 TARKENNUS 2
kohta 8** (aihenostolla ON nimiö) ja **PAATOKSET 31 TARKENNUS 2 kohta 6**
(mikään ei lado kyltin päälle). Pariisin lähizoomissa
*Impressionistit…* -aihemerkki jäi kyltin laatikon sisään, ja jokainen
neljästä kyljestä ja jokainen siirto leikkasi kyltin laatikkoa, joten
sovittelun viimeinen keino oli nimiön piilotus. Kokeilin sovitteluun
kolmatta porrasta (*"mieluummin naapurilapun viereen kuin ilman
nimeä"*, `etsi(siirretyt) ?? etsi([])`): **luvut eivät muuttuneet**
lainkaan, koska kiinteä muste tukkii kaikki asennot — porras peruttiin.

Omistaja ratkaisi tämän klo 06.35 UTC: **siirtyvä osapuoli on kyltti,
ei nimiö** (TARKENNUS 3). Toteutus ja mitatut luvut ovat luvussa 6.

## 6. Kohta 7 — KYLTTI SIIRTYY SIVUUN

**Kuva (ennen | jälkeen, 390 × 844 dpr 2, sama zoomi):**
`docs/raportit/kuvat/turisti-siirto-390-20260917.jpg` (80 kt).
Vasemmalla kyltti on paikallaan ja *Impressionistit…* on menettänyt
nimiönsä; oikealla kyltti on siirtynyt alaspäin ja nimiö on takaisin.

| mitta (Pariisin lähizoomi) | ENNEN (TARKENNUS 2) | JÄLKEEN (TARKENNUS 3) |
|---|---|---|
| kyltin laatikko, 390 px | 212,3, **393,0** → 309,0, 414,5 | 212,4, **421,0** → 309,0, 442,5 |
| kyltin laatikko, 1400 px | 714,8, **416,0** → 811,4, 437,5 | 714,9, **444,0** → 811,5, 465,5 |
| valittu asento (ruutusiirto kaupungista) | `{36, 16}` (oletus) | **`{36, 44}` molemmilla ruuduilla** |
| *Impressionistit…* -aihenoston nimiö | **piilossa** (3e4 punainen) | **näkyvissä** (3e4 vihreä) |
| aihenoston nimiöitä piilossa lähizoomissa | 1 / 1 | **0 / 0** |
| nimiä kyltin laatikon päällä | 0 | 0 |
| lappuja kyltin laatikon päällä | 0 | 0 |
| osumalaatikoita kyltin laatikon päällä | 0 | **0 / 14 (390), 0 / 21 (1400)** |
| napautus kyltin päälle | avasi oppaan (390) / **viuhkan** (1400) | **avasi oppaan molemmilla** |

**Miten asento valitaan.** Kyltille on lista ruutusiirtoja
(`js/kaupunkinosto.js` `TURISTI_INFON_ASENNOT`), joista ensimmäinen on
entinen paikka `TURISTI_INFO_RUUTUSIIRTO` — kyltti ei siis liiku, ellei
ole pakko. Ladonta ottaa ensimmäisen asennon, jonka laatikko

1. on kokonaan kotelossa,
2. ei osu liikkumattomaan musteeseen eikä kaupungin omaan pisteeseen,
3. jonka ankkuri ei joudu matkan kohdemerkin tai linssimerkin
   napautussäteelle (ne ratkaistaan ENNEN kylttiä, `napautaPintaan`),
4. jonka ankkuri ei ole noston oman musteen päällä.

Oikea puoli kokeillaan ennen vasenta, koska kaupungin nimikyltti on
PAATOKSET 24:n mukaan oletuksena merkin **vasemmalla** puolella:
mitattu 17.9.2026, kun vasen puoli oli toisena, työpöydän kyltti asettui
*PARIISI*-nimen päälle (7e punainen, 1 nimi varauksen päällä).

Ladonnan järjestys on tarkoitettu ja testattu: **nostot → kyltin asento
→ nimiladonta → nostojen sovittelu**, joten nimet ja laput väistävät
kylttiä sen lopullisessa paikassa.

**Kaksi juurisyytä mitattiin matkan varrella, ja molemmat ovat koodissa
perusteluineen:**

1. **Asento ei saa heilua.** Ensimmäinen toteutus katsoi esteinä myös
   kaupunkien nimiä ja nostojen lappuja. Ne ladotaan kyltin JÄLKEEN ja
   väistävät kylttiä, joten ne riippuvat kyltin paikasta — ja kyltin
   paikka niistä. Kierre siirsi kyltin asennosta toiseen joka
   ladonnassa, ja koska merkkikerros tweenaa elementin uuteen paikkaan
   (`htmlTransitionDuration`), kyltin PIIRROS oli mitattuna **183,8 px**
   siitä laatikosta, jolla osumatesti mittaa — napautus kyltin päälle
   meni naapurille. Nyt esteinä on vain se, mikä ei riipu kyltistä, ja
   **edellinen asento kokeillaan ensin** (`kyltinAsento`). Mitattuna
   napautuspisteen etäisyys kyltin osumalaatikkoon on nyt **0,0 px**
   molemmilla ruuduilla (savukkeen oma INFO-rivi vartioi tätä).
2. **Kahden pikselin heitto ei saa ratkaista napautusta.** Napautuksen
   ruutupiste kulkee pallon pinnan kautta, ja takaisinprojisointi
   heittää pari pikseliä. Mitattu: työpöydällä viereisen aihemerkin
   osumalaatikko oli **2,1 px** kyltin ankkurista ja vei napautuksen;
   puhelimella lähin oli **14,0 px** eikä vienyt. Kyltin musteelle
   annettiin siksi `KYLTIN_MUSTEEN_VARA_PX` = **4 px** (neljäsosa
   noston kosketusvarasta), ja Chambord-ehto poistettiin kyltin musteen
   SISÄLTÄ: siellä ei kuulu enää olla noston mustetta, koska ladonta
   pitää laatikon vapaana. Kyltin musteen ULKOPUOLELLA Chambord on
   ennallaan (`voittaja?.laji === 'turistiinfo' && muste?.laji !==
   'nosto'`), ja Bukarestin lappuvartiot ovat yhä vihreät.

**Vastakoe `?kylttisiirto=0`** (vartio 7i): kyltti jää ensimmäiseen
asentoonsa. Mitattu samassa ajossa: työpöydällä *Impressionistit…*
menettää silloin nimiönsä (INFO-rivi *"aihenoston nimiö piilossa 1"*),
puhelimella ladonta ehtii tässä kohtaa ajoa vakiintua toisin — siksi
vartio mittaa itse SIIRRON (kyltti on eri paikassa) ja seuraus jää
INFO-riville.

## 7. Vartiot ja vastakokeet

| vartio | tila | mitä se sanoo |
|---|---|---|
| `savuke-pariisi-lahizoom` **7c** | INFO → **VARTIO**, vihreä | napautus kyltin päälle avaa turisti-infon |
| **7e** *(uusi)* | vihreä | kyltin laatikko on vapaa: ei nimeä, lappua eikä osumalaatikkoa |
| **7f** *(uusi)* | vihreä | kyltti skaalautuu kuin muut merkit (11,5 px → 16 px) |
| **7g** *(uusi vastakoe)* | vihreä | `?kylttiosuma=0&kylttilaatikko=0&kylttisiirto=0` → napautus ei avaa opasta |
| **7h** *(uusi vastakoe)* | vihreä | samat liput pois → varaus 1 × 1 px ja *Impressionistit…* kyltin päällä |
| **7i** *(uusi vastakoe)* | vihreä | `?kylttisiirto=0` → kyltti jää oletuspaikkaansa |
| **3e4** | **vihreä** (oli punainen kohdan 6 jälkeen) | aihenoston nimiö säilyy, kun kyltti siirtyy |
| `savuke-pallo-nostolaput` **2, 6, 7** | vihreät | Bukarestin lappunapautukset kestävät uuden säännön |
| `savuke-kaupunkipopup` *"merkki skaalautuu zoomatessa"* | vihreä, haara poistettu | katto ei enää pure saapuessa |
| `savuke-kaupunkipopup` *"kyltin kerroin on sama kuin muilla"* | **uusi**, vihreä ×4 | saapuessa 11,5 px |

Kolme uutta lippua (`js/pallolauta/lauta.js` `pallonSaantoKaytossa`, sama
kuvio kuin `?nimiokatto=0`): **`?kylttiosuma=0`** sammuttaa kohdan 4
säännön, **`?kylttilaatikko=0`** palauttaa varauksen 1 × 1 px:n
pisteeksi ja **`?kylttisiirto=0`** jättää kyltin ensimmäiseen
asentoonsa. Kaikki voi kääntää kesken ajon (`history.replaceState` +
`ladoHeti`).

Savuke sai lisäksi kolme INFO-riviä, jotka selittävät punaisen 7c:n, jos
se joskus palaa: kyltin ankkurissa oleva elementti ja sen
`pointer-events`, ankkurin lähimmät osumalaatikot etäisyyksineen, ja
napautuspisteen etäisyys kyltin omaan osumalaatikkoon (nyt 0,0 px).

## 7b. Actions-ajoituskorjaus — sama koodi, hitaampi kone, 72/74

GitHub Actionsin ajo **35201833942** (job 105138302912) antoi
`savuke-pariisi-lahizoom`ista **72/74**, kun sama koodi oli tässä
koneessa 74/74. Punaiset olivat

* **7c. puhelin** — *"napautus kyltin päälle avaa turisti-infon — auki
  sen sijaan: viuhka:aihemerkki:nosto:syvennys-pariisi-impressionistit"*
* **7e. tyopoyta** — *"kyltin laatikko on vapaa — nimiä 1"*

Vika ei siis ollut säännössä vaan siinä, mitä ja milloin mitataan.
Ajoitusvika ei näy nopealla koneella lainkaan, joten savukkeeseen tehtiin
ensin tapa hidastaa se esiin: **`SAVUKE_HIDASTUS=<kerroin>`** kytkee
CDP:n `Emulation.setCPUThrottlingRate`-hidastuksen (oletuksena pois,
tavallinen ajo pysyy nopeana). Kertoimella 4 punaiset toistuivat tässä
koneessa — ja vasta sitten niitä korjattiin.

**Neljä juurisyytä, kaikki mitattuja:**

1. **Osumatesti mittasi laskettua laatikkoa, pelaaja näki tweenin.**
   Merkkikerros tweenaa elementin uuteen paikkaan
   (`htmlTransitionDuration`), joten hitaalla koneella kyltin PIIRROS on
   napautushetkellä eri paikassa kuin kaava. Nyt osumatesti lukee
   **piirretyn** laatikon (`kyltinPiirretty`, siirtoryhmän
   `getBoundingClientRect`) ja palaa kaavaan vain, jos elementtiä ei ole;
   ladonta ja sovittelu käyttävät edelleen KAAVAA, joka ei odota
   rasteria. Mitattu levossa: kaava ja piirros eroavat **≤ 1 px**
   (390 px: piirros 212,421 → 309,442, kaava 212,421 → 309,443).
2. **Kyltin asento riippui ladontahistoriasta.** `nostot.laatikot()`
   lasketaan datumin `dx`/`dy`:llä eli EDELLISEN sovittelun tuloksella,
   joten asento riippui siitä, montako ladontakierrosta kone oli ehtinyt
   ajaa — ja asennon MUISTI (`kyltinAsento`) lukitsi hitaan koneen
   ensimmäisen, väärän valinnan. Nyt esteinä ovat merkkien laatikot
   **omissa paikoissaan** (`nostot.omatIkonilaatikot`, ankkurin este
   `nostot.omaMuste` nimiöineen) ja muisti on poistettu: asento on
   kameran ja datan funktio, ei ladontahistorian. Asetukset luetaan
   RIVILTÄ eikä datumilta, koska sovittelu kirjoittaa tuloksensa
   datumiin.
3. **Savuke mittasi liikkuvaa kohdetta.** Odotus katsoi vain kaavan
   laatikkoa, joka on paikallaan heti kameran pysähdyttyä. Mitattu
   hidastettuna 1400 px: kyltin elementti liikkui **195 px** kahden
   peräkkäisen mittauksen välissä, sormen piste luettiin vanhasta
   paikasta ja napautus meni *Kyyhkyposti…*-viuhkaan (etäisyys
   napautuspisteestä kyltin laatikkoon **179,6 px**). `odotaKyltinAsento`
   odottaa nyt kaavan, PIIRROKSEN ja NIMILADONNAN vakiintumista (kaksi
   samaa peräkkäistä lukemaa) — paikkoja, ei väitteitä. Sama odotus
   korjasi 7e:n: hitaalla koneella kaupungin nimi oli vielä edellisen
   kierroksen paikassa, vaikka kyltti oli jo omassaan.
4. **Kyltin 4 px:n vara valtasi noston osumapinnan.** Löytyi tämän työn
   aikana: `savuke-pallo-nostolaput` putosi 8/8:sta **6/8:aan**.
   Mitattu Bukarestissa: kyltti asettui laatikkoon 214,396 → 283,411 ja
   Strousbergin lapun sormi kohtaan 250,395 — **1 px** kyltin
   laatikosta, **8 px** lapun musteesta. Kyltti vei napautuksen,
   matkustusopas jäi auki ja nielaisi loputkin napautukset (kaikki rivit
   *"ei mitään"*). `KYLTIN_MUSTEEN_VARA_PX` on pyöristysvaraa eikä
   kyltin alaa, joten kyltin OMALLA musteella (etäisyys 0) kyltti voittaa
   kuten ennen, mutta pelkän varan varassa se väistää nostoa, jonka
   osumapinnalla sormi on.

**Kokeiltu ja hylätty, koska mitattiin kalliiksi:** esteistön
laajentaminen koko musteeseen nimiöineen ja vielä sormen mitan
(`LAPUN_KOSKETUSVARA_PX`) verran väljästi. Pariisissa kaikki kuusi oikean
puolen asentoa menivät silloin tukkoon, kyltti siirtyi kaupungin
vasemmalle puolelle ja vei tilan aihenoston nimiöltä: savuke **70/74**,
vartiot 3e4 ja 3i punaisina (4/5 nimiötä). Napautuksen työnjako kuuluu
siis osumatestiin, ei esteistön paisuttamiseen.

**Mitatut luvut hidastettuna (`SAVUKE_HIDASTUS=4`):**

| mitta | ENNEN | JÄLKEEN |
|---|---|---|
| `savuke-pariisi-lahizoom`, hidastettu ×4 | 72/74 (Actions) → **73/74** tässä koneessa | **74/74** |
| napautuspiste → kyltin osumalaatikko, 390 px | 17,2 px | **0,0 px** |
| napautuspiste → kyltin osumalaatikko, 1400 px | 183,8 px / 179,6 px | **0,0 px** |
| kyltin napautus, 1400 px | avasi viuhkan (*Kyyhkyposti…*) | **avasi oppaan (Matkailijan Pariisi)** |
| kyltin elementin liike kahden mittauksen välissä | 195 px | **0 px (vakiintunut)** |
| 7e: nimiä kyltin varauksen päällä, 1400 px | 1 | **0 / 1** |
| `savuke-pallo-nostolaput` | 6/8 (työn aikainen regressio) | **8/8** |

`savuke-pallo-nostolaput` sai lisäksi diagnostiikkarivin: kun napautus ei
avaa mitään, rivi kertoo sormen pisteen, auki olevat dialogit, auki
olevan viuhkan ja kyltin laatikon — juuri ne, joilla juurisyy 4 löytyi.

## 8. Ajot

Kaikki 17.9.2026, tässä haarassa, etualalla yksi kerrallaan.

| ajo | tulos |
|---|---|
| `savuke-pariisi-lahizoom` (390 + 1400) | **68/68** — ei yhtään punaista. Pohja mitattiin samalla savukkeella ennen muutoksia: **56/56** (28 vartiota / ruutu → 34) |
| `savuke-pallo-nostolaput` (Bukarest, Ateena, Helsinki, Istanbul) | **8/8** — sama kuin pohja, myös kohdan 7 jälkeen |
| `savuke-kaupunkietusivu` (Pariisi + Marseille, 390 + 1400) | **172/178** — ja **sama 172/178 haaran pohjalla** (mitattu `git stash`illa): kuusi punaista ovat vanhoja. Kaikki turisti-info-vartiot vihreitä, etäisyys kaupunkiin 40 px |
| `savuke-kaupunkipopup` (390 + 1400) | **44/61** — 17 punaista, **sama lista kuin pohjalla** (pohja 40/57; erotus on neljä uutta vihreää kerroinvartiota) |
| `node --test` osumareititys, karttamerkit, pallosovittelu, pallonimet, nimiolimitys, aihemerkit, nostot-kartalla, nostomerkit, pallonimikyltti, dokumentit | **94/94** |
| `tools/tarkista-savukkeet.mjs` | kunnossa (1899 ui-viittausta) |
| `tools/tarkista-niputus.mjs` | kunnossa (394 moduulia, ei törmäyksiä) |
| `node --check` muutetuille tiedostoille | puhdas |

## 9. Muutetut tiedostot

| tiedosto | muutos |
|---|---|
| `js/pallolauta/lauta.js` | kohta 4: `kyltinMusteella` + sääntö `lahinMerkki`ssä, `musteeseenOsunut(lat, lng, vara)`, `KYLTIN_MUSTEEN_VARA_PX`; kohta 5: `mitta: nostonMitta(KAUPUNKIMERKIN_KERROIN)`; kohta 6: `KYLTIN_LADONTA` + `kyltinLaatikot()` kaavasta, kyltti sovittelun esteeksi, julkinen `turistiLaatikot()`; kohta 7: asennon valinta `paivitaTuristiInfo(kiinteaMuste)`:ssa, muisti `kyltinAsento`; vastakokeen liput `pallonSaantoKaytossa` |
| `js/kaupunkinosto.js` | kohta 7: `TURISTI_INFON_ASENNOT` (10 ruutusiirtoa, oikea puoli ennen vasenta) |
| `js/pallolauta/nostot.js` | `sovittele({ nimet, kiinteat })` — muukin liikkumaton muste kuin nimet |
| `js/kaupunkinosto.js` | `kaupunkimerkinMitta`, `KAUPUNKIMERKIN_MITTA_MAX` ja `KAUPUNKIMERKIN_MITTA_MIN` poistettu (kerroin ja katto yhdessä paikassa); perustelu mitattuine lukuineen tiedostossa |
| `tests/osumareititys.test.mjs` | kaksi uutta testiä: säännön kaksi mittaa `musteenVoittaja`lla laskettuna ja sääntöjen järjestys lähteessä |
| `tests/pallosovittelu.test.mjs` | kyltti sovittelun esteenä, varaus kaavasta, vastakokeen lippu; uusi testi asennon valinnasta ja ladonnan järjestyksestä |
| `tools/savukkeet/savuke-pariisi-lahizoom.mjs` | 7c vartioksi, uudet 7e, 7f, 7g, 7h ja 7i; ladonnan laatikkojoukot ja kolme napautusdiagnostiikkariviä mittaukseen |
| `tools/savukkeet/savuke-pariisi-lahizoom.mjs` *(7b)* | `SAVUKE_HIDASTUS`-hidastus (CDP), `odotaKyltinAsento` (kaava + piirros + nimiladonta), INFO-rivit piirretystä laatikosta ja vakiintuneesta asennosta, viuhkan sulku vastakokeiden jälkeen |
| `tools/savukkeet/savuke-pallo-nostolaput.mjs` *(7b)* | diagnostiikkarivi: mikä vei napautuksen (sormen piste, dialogit, viuhka, kyltin laatikko) |
| `tools/savukkeet/savuke-kaupunkipopup.mjs` | kerroinvartio kaksiosaisesta yksiosaiseksi + uusi saapumismittavartio |
| `tools/savukkeet/README.md` | savukkeen vartiorivit ja tunnettu punainen |
| `docs/raportit/viesti-fable-turisti-osuma-20260917.md` | tämä |
| `docs/raportit/kuvat/turisti-osuma-390-20260917.jpg` | ennen/jälkeen 390 px (kohdat 4–6) |
| `docs/raportit/kuvat/turisti-siirto-390-20260917.jpg` | ennen/jälkeen 390 px (kohta 7) |

## 10. Mitä jäi tekemättä

1. `savuke-kaupunkietusivu`n **kuusi vanhaa punaista** (kaksi
   *"nappi näyttää loput kappaleet"* 390 px:llä ja kaksi *"merkin
   napautus avaa SUORAAN ison oppaan"* 1400 px:llä). Ajoin savukkeen
   sekä uudella koodilla että haaran pohjalla (`git stash`): **172/178
   molemmilla, sama kuuden lista** — eivät siis tämän erän aiheuttamia.
   Saapumisnäkymän omat turisti-info-vartiot ovat vihreitä:
   etäisyys kaupunkiin **40 px** Pariisissa ja Marseillessa, molemmilla
   ruuduilla, eli kyltti on yhä kaupungin vieressä (< 48 px) eikä
   kaupungin nimen päällä.
2. `savuke-kaupunkipopup`in **17 vanhaa punaista** (ml. *"turisti-info
   aukesi napautuksesta"*, joka on saapumisnäkymän oma ketju ja kaatuu
   jo aiempaan *"iso pop-up aukesi"* -riviin) — sama lista kuin
   pohjalla, ei tämän erän aiheuttamia.
3. Raamattuun ei koskettu, versiota ei nostettu, PR:ää ei tehty
   (tehtävänannon mukaisesti).
