# Kartan sulavuus — kokonaiskatsaus 22.9.2026 (Fable)

Omistajan kysymys 22.9.2026: pitäisikö tuntumatesti tehdä vasta, kun kaikki
suunnitellut parannukset ovat valmiit; onko kaikki kivet käännetty; onko
jokin yleisesti tunnettu menetelmä jäänyt ottamatta käyttöön. Katselmus
tehtiin main v2084:stä (kerma laatan shaderissa) viidellä rinnakkaisella
vain-luku-katselmuksella (laattaputki, syöttö ja kehyssilmukka, piirtäjä
ja täyttönopeus, service worker ja verkko, muu pääsäiekuorma) sekä
kirjaston sisältä (globe.gl 2.46.2 = three.js r155, OrbitControls).
Rivinumerot viittaavat v2084:ään.

## 1. Milloin testataan

- **Mittaus joka versiosta, hyväksyntä erän lopussa.** Automaattinen mittaus
  (tasaisuusmittari `__kehysprofiili.veto` + kehysprofiili) ajetaan nyt
  perustasoksi ja jokaisen sulavuusversion jälkeen samalla skriptillä —
  vain niin nähdään, mikä kivi vaikutti. Omistajan tuntumatesti on
  hyväksyntä, ja sen paikka on erän 1 jälkeen ja erän 3 jälkeen (alla),
  ei jokaisen välikommitin jälkeen.
- **Web Inspector -nauhoitus on diagnoosi, ei mittari.** Kuvakaappaus-
  aikajana päällä puhelin nykii tavallista pahemmin ja kuumenee; ilman
  sitä nauhoitus on kevyt mutta vienti ei vielä toimi.
- **Lämpö on mittausvirhe ja oire samaan aikaan.** Testi aina viileällä
  puhelimella JA uudestaan 5 minuutin pelaamisen jälkeen: peli piirtää
  60 kehystä sekunnissa myös levossa (kohta 18), joten kellotus alas alkaa
  ennen kuin ele alkaa.
- **Huom. tämän päivän dpr-koe ajettiin iPhone-simulaattorilla**, ei
  laitteella (docs/raportit/tasaisuus-dpr-iphone-20260922.md) — GPU-luvut
  eivät kelpaa iPhonen päätöksiin. Laitteella mitattua on vain Web Inspector
  -nauhoitus (laadullinen). Simulaattorin perustaso on silti kertova:
  dt p95 23 ms mutta **px/ms-vaihtelu 112 %** — nopeus vaihtelee yli
  kaksinkertaisesti kehyksestä toiseen. Se on juuri se nykiminen, jota
  kehysaika ei näytä, ja sen syy on syöttöputki (kohta 13).

## 2. Kääntämättömät kivet

Tärkeysjärjestys ryhmittäin. Jokaisessa: mitä koodissa on, mikä on
tunnettu menetelmä, arvio vaikutuksesta.

### A. Näytönohjaimen täyttö (mitattu 16–26 ms renderöintiä Ranskan z6-zoomissa)

Täyttökerroin z6-lähikuvassa on noin 4–5 kertaa ruudun pikselimäärä
(dpr 3: 2,96 Mpx → 13–15 Mpx varjostusta kehystä kohti), ja suurin osa
kulkee kerma-shaderin läpi. Kerrokset: ilmakehä 1 + pohjapallo 1 +
kirjaston z5-laatat 1 + laattakerros 1–2 + vektorit 0,2 + nimiöt 0,05,
päälle komposiittorin alpha-kangas ja multiply-kerros.

1. **Ilmakehäkuori piirretään koko ruudulle lähikuvassa.** `js/pallo.js:878`
   `showAtmosphere(true) … atmosphereAltitude(0.18)`: kuori on r = 1,18 R,
   BackSide + additiivinen fresnel. z6:lla kamera on kuoren sisällä → yksi
   täysi läpinäkyvä passi, joka ei näy kartalla. Menetelmä: sammuta kuori,
   kun korkeus alittaa kynnyksen (tai laattakerroksen ollessa peittävä).
   Vaikutus: −1 täyttökerros, nolla ulkonäköriskiä lähikuvassa (tarkistetaan
   kaappauksella).
2. **Kaksinkertainen pohja.** Kirjaston laattamoottorin z5-laatat
   (`POHJAN_TASO_MAX = 5`, `js/pallo.js:882`) ja pohjapallo piirretään aina
   tarkan kerroksen alla. Menetelmä: piilota moottorin laattaryhmä ja
   pohjapallo, kun kerros peittää ruudun (`kerros.peittaa()` on jo) eikä
   häive ole kesken. Vaikutus: −1…−2 kerrosta. Pelikoodarin "pohjapallo
   shaderiin" (vaihe 2, WIP rikki) tähtää samaan; piilotus on
   nopeampi ensiaskel ja tarvitaan joka tapauksessa.
3. **Kerma-shaderin sRGB-edestakaisin.** `js/laattakerma-shader.js:66,71`:
   kaksi `pow(vec3)`-kutsua + maskin haku jokaiselle laattapikselille,
   myös kun kermaa ei ole (`kermaA = 0`). Menetelmä: sekoitus lineaarisessa
   tilassa (kermaVari lineaariseksi kerran CPU:lla) tai halpa
   approksimaatio; maskin haku vain kun `kermaPaalla`. Vaikutus: kallein
   yksittäinen fragmenttilasku pois.
4. **Illan sävy on DOM-kerros `mix-blend-mode: multiply` koko kartan yli**
   (`css/styles.css:28470–28488`, aina paitsi keskipäivällä). iOS:n
   komposiittori tekee siitä erillisen sekoituspinnan joka kehys.
   Menetelmä: sävy laattashaderin uniformiksi (kerroin texelille), kerros
   pois. Koelippu `?koe=eiblend` on jo — mitataan laitteella.
5. **dpr 3 + MSAA myös liikkeessä.** `js/pallo.js:1702` naulaa
   `setPixelRatio(3)` laattakerroksen kanssa; kirjaston oma malli oli 2
   liikkeessä (`LAATU_PIKSELISUHDE_LIIKE`, ei enää aktivoidu). Kaikki
   yllä oleva on 2,25-kertaista dpr 2:een nähden. Omistajan päätös
   laitemittauksen jälkeen: a) 2 aina, b) 2 liikkeessä ja 3 levossa
   (yksi raskas puskurinvaihto eleen alussa ja lopussa), c) 3 mutta
   MSAA pois (dpr 3:lla lähes näkymätön; viivat pehmenevät hieman).
6. **Laatat ovat aina läpinäkyviä.** `js/pallolaatat.js:3130`
   `transparent: true, opacity: 0` → häiveen jälkeenkin blending ja
   läpinäkyvien lajittelu. Menetelmä: häiveen päätyttyä materiaali
   opaakiksi (three:n ohjelma-avaimessa `opaque` → kaksi varianttia, jotka
   esikäännetään, kohta 7). Vaikutus: overdraw ja blending pois valmiilta
   laatoilta.
7. **Ei shaderien esikäännöstä.** `renderer.compileAsync` (r155:ssä,
   KHR_parallel_shader_compile) ei ole käytössä; laattamateriaalin
   variantit (kerma/ei, opaakki/läpinäkyvä, astronautti) käännetään sillä
   kehyksellä, jolla ensimmäinen laatta sattuu valmistumaan — kesken
   liikkeen. Menetelmä: kaikki variantit käännetään latausruudussa.
8. **Nimiöatlaksen 16 Mt uudelleenvienti portaan vaihtuessa.**
   `js/pallonimiot-gl.js:593` `needsUpdate = true` vie koko 2048²-kankaan
   (yksittäinen 20–40 ms kehys zoomissa). Menetelmä: osittainen päivitys
   (`copyTextureToTexture` / texSubImage2D likaiselle alueelle) tai
   1024²-sivut.

### B. Laattaputki (pääsäie)

9. **2–7 kuvaa per laatta.** *(Karttasepän tarkennus 22.9. klo 15.20: pallolla laatta on pohja + ranta vain rannikkolaatoilla (10 %) + nimiöt (0,5 %) + kohdemaan nostot; viiva- ja väritasot ovat tasokartan. Yhdistäminen toisi pallolle vain −10…−25 % pyynnöistä rannikolla ja peruisi 6.9. päätöksen rannan erottamisesta → kohtaa 9 EI tehdä pallolla. Alkuperäinen arvio alla koskee tasokarttaa.)* `js/laattapyramidi.js:3006–3020` kokoaa
   pohja + väri + ranta + viiva/joki + nimiö + nosto; `js/pallolaatat.js:2676`
   hakee ja dekoodaa ne kaikki (`Promise.all`) ja yhdistää kankaalla
   pääsäikeessä. 45 näkyvää z8-laattaa = jopa 300 pyyntöä ja dekoodausta
   yhtä näkymää kohti; rinnakkaisuus 6 laattaa × 2–7 kuvaa. Menetelmä
   (kaikki karttapalvelut): staattiset tasot (pohja + ranta + viiva/joki,
   mahdollisesti nimiö) poltetaan **yhdeksi kuvaksi per laatta**;
   kohdemaan väri ja nostot pysyvät erillisinä (tai väri shaderiin maskilla
   kuten kerma). Vaikutus: pyynnöt ja dekoodaukset −50…−70 %, valmistelu
   −50 %, laatan saapuminen nopeampi. Karttasepän polttoputki.
10. **Bittikartta suoraan tekstuuriksi ilman kääntöä.** Kokeilu
    (karttapallo.md 15.4) hylkäsi vain `flipY = true` -version, jossa
    WebKit kääntää pikselit keskusmuistissa. Tunnettu tapa (three.js:n
    ImageBitmapLoader-ohje): `flipY = false` ja UV:n v-käännös → nollakopio
    GPU:lle, ei kangasta, ei drawImagea. Koskee heti yksitasoisia laattoja,
    kohdan 9 jälkeen kaikkia. Mitataan `initTexture` (nyt 3,0 ms p50).
11. **Roskan tuotto kehyspolussa.** Kerroksen 10 Hz päivitys varaa 81
    näytettä, 3–5 laattaruudukkoa `.filter`-välitaulukoineen, 4 ×
    `[...laatat.values()]` ja LRU:n 5 taulukkoa (`js/pallolaatat.js:3934–3955,
    2181–2190`); peittomittari on O(81 × scenen laatat) joka päivityksellä
    (`:4022–4048`); pisteiden paikat lasketaan joka kehys uusina olioina
    (`js/pallolauta/lauta.js:3736–3748`). Web Inspectorin aikajanalla tämä
    näkyy "Partial Garbage Collection" -merkintöinä koko liikkeen ajan.
    Menetelmä: ei allokaatioita kehyspolussa (kiinteät puskurit).
12. **Häive on oma rAF-ketju per materiaali** (`js/pallolaatat.js:2495–2521`),
    tason vaihdossa kymmeniä yhtäaikaisia. Menetelmä: yksi häivytysjono
    kehyskoukussa.

### C. Syöte ja kehys (px/ms-vaihtelu)

13. **Kamera kirjoitetaan joka tapahtumasta, ei kerran kehyksessä.**
    Veto: `js/pallo.js:3127–3141` pointermove → `getBoundingClientRect` →
    pintaratkaisu → `pointOfView(...)` heti. Nipistys `:3301–3313` kahdesti
    kehystä kohti (kummallekin sormelle), kumpikin 3 iteraation
    ankkurointi = 6 pintaratkaisua ja 2 kamerakirjoitusta/kehys. Kaksi
    tapahtumaa yhdessä kehyksessä → kaksi täyttä kierrosta (myös kohdat
    14–15), piirto näyttää vain viimeisen; nolla tapahtumaa → kamera
    seisoo. Tämä on simulaattorin 112 %:n ja headlessin 37 %:n vaihtelu.
    Menetelmä (kaikki karttamoottorit): tapahtuma tallentaa vain sormen
    paikan ja aikaleiman (`event.timeStamp`, coalesced events), ratkaisu ja
    kamerakirjoitus tehdään kerran kehyksessä rAF:ssa ennen piirtoa;
    liukuun `event.timeStamp`-pohjainen nopeus. Pelikoodarin suunnittelema
    "deltat rAF:iin" — vahvistettu tärkeimmäksi tasaisuuskorjaukseksi.
14. **Kameraloki kaappaa kutsupinon joka kamerakirjoituksesta.**
    `js/pallolauta/kameraloki.js:90–95, 57`: `new Error()` + pinon
    merkkijono + 8 regexiä, asennettu ehdoitta (`lauta.js:1520`). Hinta
    vaihtelee → suoraan px/ms-vaihtelua. Menetelmä: vain kehittäjätilassa,
    tai laukaisija ilmoitetaan kutsujalta ilman pinoa.
15. **Ohjainten `change` ajaa joka kehys maapaneelin uudelleenkirjoituksen.**
    `js/pallolauta/lauta.js:4720` → `maapaneeli.tahdistaKoko()` → `kirjoita()`
    (`maapaneeli.js:1467–1510`): rect-luku, kaksi CSS-muuttujakirjoitusta,
    kortin täyttö, `tahdistaLiikunPohja` (rect + rAF + `setTimeout(500)`)
    — vaikka mikään ei muutu. Lisäksi `sormenKohta` lukee
    `getBoundingClientRect` joka tapahtumassa (`pallo.js:3055, 3235`) heti
    CSS2D-kirjoitusten jälkeen = pakotettu asettelu eleen tahdissa.
    Menetelmä: kotelon mitat kerran eleen alussa ja resizessä; paneeli
    kirjoitetaan vain kun mittakaavaporras vaihtuu.
16. **Ladonta liikkeessä 200 ms:n välein** (`lauta.js:4688–4694`,
    kun kamera on siirtynyt riittävästi). Ehdokas tasaisuusmittarin
    "pysähdykseksi"; jos `pisinPysahdysMs` osoittaa sen, siirtymä yksin
    liikkeessä (runko vain siirtää), täysi ladonta levossa.
17. **Livia-lintu käynnistää oman rAF-silmukan kartan liikkeestä**
    (`js/livia-eleet.js:88, 562–568, 300`): 100 ms:n pollaus, liikkeen
    alussa ja lopussa koko SVG:n `innerHTML`-uudelleenrakennus
    (`js/livia-svg.js:331`). Pöllönapin vahti pakottaa asettelun 5×/s
    (`js/pulu-paneelin-ylla.js:180`, `elementsFromPoint` +
    `getComputedStyle` + rect). Menetelmä: molemmat lepoon liikkeen ajaksi.

### D. Lämpö

18. **Piirto 60 fps myös täysin levossa.** `js/pallolauta/lauta.js:1459`:
    lepo = vain piilossa tai lehti auki; kameran liike ei vaikuta. Levon
    kehykset ajavat koko koukkuketjun. Karttapallo.md 15.5 hylkäsi
    "silmukan pysäytyksen levossa" jäätymisriskin takia. Tunnettu tapa
    (Mapbox `triggerRepaint`, deck.gl): piirrä vain kun jokin muuttui
    (kamera, laatta, häive, linssi, nappula, koko) **ja varmistava syke
    esim. 4 fps** — unohdettu muutoslähde näkyy enintään 250 ms:n
    viiveenä, ei jäätymisenä. Vaikutus: lämpö ja akku levossa murto-osaan;
    ele alkaa viileällä laitteella.

### E. Verkko ja välimuisti

19. **Service workerin laattakori ja esilataus osuvat vanhaan polkuun.**
    `sw.js:2081–2099` tunnistaa vain `/julisteet/pallo/laatat/` (kirjaston
    karkea pohja); näytettävät pyramidi-laatat (`julisteet/pyramidi/`)
    ohittavat Cache Storagen kokonaan (`sw.js:2533`) ja elävät vain Safarin
    HTTP-välimuistissa, joka iOS:llä on pieni ja häviää. Esilataus
    (`js/pallo.js:412–458`) lämmittää samaa vanhaa koria. **Tämä on syy,
    miksi "esilataus verkosta ei ollut päällä".** Karttasepän esilataus
    (haara karttaseppa-esilataus) rakennetaan pyramidi-polulle SW:hen.
20. **Ei preconnectia** `media.matkakirja.app`:iin (index.html) — jokaisen
    istunnon ensimmäinen laattapurske maksaa DNS + TLS.
21. **Laattapyynnöillä ei ole katkaisijaa** (`js/media.js:594` vain kuvat
    ja äänet) ja kohdan 9 takia rinnakkaisia pyyntöjä on jopa 40.

## 3. Menetelmät, joita ei ole tajuttu ottaa käyttöön (tiivistys)

- Syötteen soveltaminen kerran kehyksessä aikaleimalla (13).
- Piirto tarpeen mukaan + syke (18).
- Esikomposoidut rasterilaatat, yksi kuva per laatta (9).
- Nollakopio-bittikartta tekstuuriksi `flipY = false` (10).
- Shaderien esikäännös latausruudussa (7).
- Ei piirretä peitettyä: ilmakehä ja pohja lähikuvassa (1–2).
- Sävyt shaderissa, ei DOM-sekoituksena (4).
- Osittaiset tekstuuripäivitykset atlakseen (8).
- Cache Storage oikealle laattapolulle + preconnect (19–20).

Tarkoituksella ei suositella nyt: OffscreenCanvas-worker-renderöinti (iso
muutos, hyöty epävarma kun pääsäikeen työ on pieni kohtien 13–17 jälkeen);
pakatut tekstuurit (ASTC/KTX2, uusi polttoputki — vasta jos vienti on yhä
pullonkaula kohtien 9–10 jälkeen); OrbitControlsin vaimennus (ei koske
vetoa, koska peli kirjoittaa kameran itse).

## 4. Mikä on jo oikein (ei kosketa)

fetch + createImageBitmap oikeilla asetuksilla; valmistelun ja viennin
budjetit, väistö ja jonot; LRU ja tavukatto; raycast pois eleen ajaksi;
ladonta pääosin levossa ja laatikot luetaan kerran (E3); GL-nimiöt
atlaksessa yhdellä drawcallilla per sivu, `mediump`; vektorit rakennetaan
vain solun vaihtuessa; ei post-prosessointia, ei varjoja; pieni liike
DOM-komposiittorilla; ei URL- eikä localStorage-kirjoituksia liikkeessä
(paitsi kameralokin harvinainen tapaus).

## 5. Ehdotettu järjestys

- **Erä 1 — Pelikoodari (uusi sessio), pääsäie ja peitetyt kerrokset:**
  13 syöte kerran kehyksessä (veto + nipistys), 14 kameraloki, 15
  change-kuuntelijat ja kotelon mitat, 1 ilmakehä pois lähikuvassa, 2
  pohjan piilotus peitossa, 3 shader-pow pois, 7 esikäännös, 17 Livia ja
  pöllönappi lepoon liikkeessä. Jokainen omana commitina koelipulla,
  mittaus ennen/jälkeen (tasaisuusmittari + kehysprofiili), sitten
  omistajan tuntumatesti.
- **Erä 2 — Karttaseppä:** 19 SW-polku ja esilataus pyramidille, 20
  preconnect, 21 katkaisija (9 esikomposointi ei pallolle, ks. tarkennus).
- **Erä 3 — Pelikoodari:** 10 nollakopio-bittikartta, 6 opaakit laatat,
  11–12 roska ja häive, 8 atlas, 16 ladonta jos mittari osoittaa, 18
  lepopiirto sykkeellä (omistajan periaatepäätös).
- **Omistajan päätökset:** 5 (dpr / MSAA) laitemittauksen jälkeen; 18
  (piirto tarpeen mukaan sykkeellä — periaate "ei jäätymisriskiä" täyttyy
  sykkeellä).
- **Laitetestaaja:** perustaso oikealla iPhonella (ei simulaattori):
  tasaisuusmittari Ranska z6 ja Camargue z8 viileänä ja 5 min jälkeen;
  sama erän 1 jälkeen. dpr-koe vasta laitteella, 4–6 paria kylminä.
