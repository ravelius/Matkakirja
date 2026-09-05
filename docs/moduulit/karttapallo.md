# Karttapallo pelilautana — arkkitehtuuri ja vaiheistus

*(Moduuli: Kartta (js/pallo.js, js/kartta.js). Linjaukset: Raamattu ›
Fokusmoodi › KARTTAPALLO-kohdat (4.–5.9.2026), SIIRRON KOREOGRAFIA,
JOKAINEN NAKYVA KARTTAMERKKI ON NIMETTY JA NAPAUTETTAVA, KAIKKI LIIKE
ANIMOIDAAN PEHMEASTI; Karttalinssit; Jakelu ja iOS-kuori. Tämä
dokumentti kertoo MITEN — ristiriidassa Raamattu voittaa. Laatija
Fablemax 5.9.2026; SITOVA vasta kun päätoimittaja ja omistaja ovat
hyväksyneet luvun 7 vaiheistuksen. Raamattuun tarvittava kirjaus on
luvussa 8 ehdotuksena — sitä ei ole kirjoitettu.)*

## 0. Omistajan linjaukset 5.9.2026, sanatarkasti

1. *"Voisiko pallon vaihtaa pelin kartaksi suoraan?"* ja Fablen arvion
   jälkeen *"Linssit voi olla vanhalla kartalla."*
2. Lisäehdot samana päivänä: *"Kunhan vanha kartta pysyy pois tieltä
   eikä hidasta ollenkaan uuden kartan toimintaa. Mutta jos pallo ei
   toimi niin pidetään optio palauttaa se."*

Tulkinta, joka sitoo koko suunnitelmaa: (a) karttapallosta tulee PELIN
PÄÄLAUTA; (b) tasokartta (js/kartta.js + SVG-kerrokset) jää olemaan
LINSSIKARTTANA, joka luodaan vasta kun linssi valitaan laukusta, ja
puretaan kun siitä palataan — se ei elä taustalla; (c) yhdellä
kytkimellä vanha kartta palaa oletuslaudaksi ilman koodimuutoksia
muualle, ja pelitila (tallennus) on sama kummallakin laudalla. Kohdat
(b) ja (c) ovat jokaisen vaiheen hyväksymisehto (luku 7).

3. Vaiheen 1 julkaisun jälkeen (v1553): *"Ota vanha kartta jo heti
   kokonaan pois ja korvaa pallolla. Ei haittaa vaikka peli ei toimi."*
   → LAUTA_OLETUS = 'pallo' v1554:stä alkaen; vaihe 6 ohitettiin, ja
   vaiheet 2–5 valmistuvat pelin ollessa jo pallolla. Samalla *"saako
   pallon piirtämän kuvan röpeliäisyyttä pois vaikka sitten kun liike
   pysähtyy"* → laatunosto levossa (js/pallo.js asennaLaatunosto).
4. v1554:n jälkeen: *"pelissä periaatteessa voisi olla lopulta kytkin,
   millä pelaaja voisi valita haluaako pelata pallonäkymässä vai sillä
   meidän vanhalla kartalla sitten kun ollaan saatu pallo toimimaan."*
   → pelaajan asetus vaiheen 5 jälkeen (luku 7, uusi vaihe 6).
5. *"etusivun kartan voi pitää aluksi vielä vanhassa mutta sitten kun
   ehditään tehdä uusi, niin siihen kannattaa varmaan renderöidä oma
   spesifi zoomattu pallo joka pyörii hitaasti lontoosta kohti aasiaa,
   mutta on jo renderöity blurrattuna, jotta efekti ei vie etusivulla
   tehoja. ja siinä lentokone voisi lentää eri kaupunkien välillä samalla
   kun pallo pyörii ja piirtää paksua punaista viivaa ja aina ei
   kaupunkien välillä kun kone laskeutuu, tulee uusi isoisän aikalaiskuva
   jonnekin kartan ulkopuolelle pienellä, niin että ei jää etusivun
   tekstin päälle. kone jatkaa automaattisesti lentoa uuteen kohteeseen
   pysähtymättä, muuttaa vain hieman suuntaa."* → vaihe 5 (avaus)
   täsmentyy: etusivun pallo on ESIRENDERÖITY (sumennettu kuvasarja tai
   video pallon laatoista, Lontoo → Aasia), ei elävä WebGL-pallo; kone,
   punainen viiva ja isoisän kuvat ovat eläviä DOM/SVG-elementtejä sen
   päällä. Aloituslento pelin alussa on eri asia ja pysyy pallolla.
6. Linssi-idea B7 (docs/linssikatalogi.md): *"voidaan näyttää esim.
   afrikan kohdalla pallon päällä sitä kaikkein vanhinta projisointi
   mallia 1500-luvulta ja osoittaa miten pielessä se on."* → oma linssi
   pallolle vaiheen 3 jälkeen (vanha kartta verhottuna pallon pinnalle,
   liukusäädin).

Aiemmat Raamatun kirjaukset, jotka tämä KUMOAA tai TÄSMENTÄÄ, on
listattu luvussa 8 — ne on kirjattava Raamattuun ennen vaihetta 6.

## 1. Tavoitetila yhdellä sivulla

**Pallo on lauta.** Globe.gl 2.46 (three.js, MIT, ämpäristä) piirtää
pelin julisteen Web Mercator -laattoina (Z0–Z7, nostotasollinen sarja
Z6–Z7:llä: nimet ja karttanostot poltettuina). Pallon päällä ovat
PELIN merkit: 261 kaupunkia (piste + nimi), pelaajan nappula,
nopanheiton kohteet, valittu reitti askelhelmineen, lentokaari, elävät
(vielä polttamattomat) nostot, Matkakirjan ihmeiden tähdet ja
kohtaamispiste. Kaupungin napautus avaa kaupunkilehden (openArrival),
Liiku-rivi, noppa, siirron koreografia (ennakkozoomi → trapetsiajo →
nappula 300 ms kameran jälkeen), siirtymämusiikki, laiva, lento ja
saapumissekvenssi toimivat pallolla samoin kuin tasolaudalla. Kamera on
pallon pointOfView omalla tweenillä. Pöllö, Livian kuplat, toimintorivi,
matkalaukku, lehdet ja kohdekartat ovat DOM-pintoja pallon päällä
täsmälleen kuten ennen — ne eivät tiedä laudasta mitään.

**Tasokartta on linssikartta.** Linssin valinta laukusta avaa
tasokartan kuoreen pallon päälle (sama malli kuin nykyinen
.pallo-kuori, roolit vaihtaen): linssit (js/linssit/*, kerros ja tila:
keksinnöt-aikajana, radio, vertailu, maatiedot, topografia, vesistöt)
toimivat siellä ennallaan, kamera lähtee pallon näkymästä
(luku 5). "Sulje linssi" purkaa kuoren ja palauttaa pallon; kamera
palaa pallolle siitä, mihin linssikartta jäi.

**Mitä EI siirretä:** linssimoottori ja linssisopimus
(docs/moduulit/linssit.md), aikajana (js/aikajana.js), kohdekartat
(js/nahtavyydet.js, js/karttazoom.js), lehtien sää (js/saa.js on
kaupunkilehden etusivun sää, ei kartan), fokusmitat (maataulu,
mittajana, asteikot — ne ovat tasokartan kalusteita ja jäävät
linssikartalle; pallolla mittakaava luetaan korkeudesta, luku 4),
maatummennus, aloitussivun pienoiskartta (INTRO_SPACE-asettelu).
Pelisäännöt (js/game.js, js/rules.js) eivät muutu riviäkään.

**Mikä pysyy totena molemmilla laudoilla:** laudan (x, y)
lautayksiköissä on ainoa paikkatotuus (kaupungit, reitit, nostot);
pallo laskee asteet niistä (js/fokusmitat.js laudaltaAsteiksi) eikä
tallenna omia koordinaatteja mihinkään.

## 2. Kaksi lautaa, yksi pelitila — kytkin ja palautusoptio

Omistajan ehto: *"jos pallo ei toimi niin pidetään optio palauttaa se."*

- **Yksi valinta, kolme lähdettä, yksi vakio.** `js/ui-apurit.js`:
  `export const LAUTA_OLETUS = 'kartta'` (vaiheessa 6 → `'pallo'`) ja
  `lautaValinta()` = URL `?lauta=pallo|kartta` › localStorage
  `matkakirja-lauta` › LAUTA_OLETUS, muistettuna kuten
  kehittajaTilaPaalla (ei levyluku joka kehyksessä). Kehittäjävalikkoon
  vipu "Lauta: pallo / kartta" (js/main.js kuuntelija, index.html
  rivi, sama malli kuin kehittäjämaailma). Palautus tuotantoon = yhden
  vakion vaihto, ei muita koodimuutoksia.
- **Automaattinen varapolku ei kirjoita valintaa.** Jos Globe.gl ei
  lataudu (ei verkkoa, WebGL puuttuu, WKWebView tappoi kontekstin) tai
  ollaan yhden tiedoston versiossa (dynaaminen tuonti kaatuu kuten
  linsseillä), peli käynnistää tasokartan TÄLLE istunnolle ja näyttää
  yhden rivin ("Karttapallo ei latautunut — pelataan kartalla").
  localStorage-arvoa ei muuteta: seuraava käynnistys yrittää palloa.
- **Tallennus on sama.** Pelitila asuu js/game.js:ssä ja tallennus
  serialisoi vain sen; pallolauta EI lisää pelitilaan yhtään kenttää.
  Ainoa laudan oma muisti on kameran viimeinen näkymä, ja se on
  localStoragea (kuten linssivalinta), ei tallennusta. Vartija:
  tests/pallolauta.test.mjs lataa saman tallenteen kummallakin
  laudalla ja vaatii identtisen game-tilan; tools/savukkeet/savuke-
  lautavaihto.mjs vaihtaa laudan kesken pelin ja jatkaa siirtoa.
- **Vaatimus jokaiselle vaiheelle (luku 7):** vaihe ei saa mergeytyä,
  jos `?lauta=kartta` ei anna täsmälleen nykyistä peliä (savuke-
  regressiot ennallaan) ja `?lauta=pallo` ei toimi samalla tallenteella.

## 3. Tasokartta pois tieltä — mitattu alustus ja mitä pallolauta ohittaa

Mitattu 5.9.2026 (Chromium, iPhone-mitat 390×844, dpr 3, ämpäri
KATKAISTUNA — luvut ovat siis alaraja, laatat ja kuvat puuttuvat;
skripti scratchpadissa `mittaa-kartan-alustus.mjs`, ei repoon):

| mittari | avausnäkymä | Ateena (fokus) |
| --- | --- | --- |
| JS-moduuleja ladattu | 317 | 317 (ei uusia) |
| joista karttamoduuleja (js/kartta, mapart, laattapyramidi, karttanimet, fokuskohteet, fokusniput, fokusmitat, fokusnosto-symbolit, nostoladonta, maatummennus, karttavalot, karttaselite, fokuspiste, elaintaky*, historian-hetket, skandaalit, karttamittari, fokusnosto) | 1,33 Mt / 33 900 riviä | — |
| + fokuskohde-paketit (22 kpl) | 0,56 Mt | — |
| + js/packs/maailmankartta.js (kaupungit, reitit — PALLOKIN tarvitsee) | 0,85 Mt | — |
| svg#board-elementtejä | 188 | 1 835 (fokuskohteet 850, eläintäyt 580, kaupungit 342) |
| DOM-solmuja yhteensä | 951 | 2 711 |
| JS-keko käytössä | 82 Mt | 89 Mt |
| joutilas kehys (mediaani / p95) | 16,7 / 16,9 ms | 16,7 / 16,9 ms |
| ämpäripyyntöjä pyramidiin | 0 | 2 (luettelo; laatat olisivat seuranneet) |
| sivun load | 4,7 s (kontti) | — |

Havainnot: (1) JOUTILAS kartta ei maksa kehyksiä — Raamatun "LINSSEJA
EI TAUOTETA" -mittaus pitää yhä; kustannus on ALUSTUS ja MUISTI, ei
lepo. (2) Ateenassa tasokartta pitää DOMissa ~1 600 SVG-elementtiä ja
laattapyramidi pyytäisi verkosta näkymän + ruudullisen joka suuntaan
(js/laattapyramidi.js sääntö 1) — se on WKWebView'n muistikaton kannalta
se osa, joka EI saa olla kahdesti. (3) Kaikki karttamoduulit tuodaan
ui.js:ään STAATTISESTI (17 tuontiriviä, ui.js 73–342): ne ladataan ja
parsitaan aina, mutta ne eivät piirrä mitään ennen drawBoard-kutsua.

**Mitä pallolauta ohittaa (vaihe 1, `Kartta.lepotila`):** kun lauta on
pallo, ui.render ei kutsu drawBoardForia lainkaan — svg#board jää
tyhjäksi eikä yksikään kerros (staattinen, laattapyramidi, karttanimet,
maastonimet, fokuskohteet, eläintäyt, fokuspiste, maatummennus,
fokuslaatta, matkareitit, kohteet, nappulat, lento) synny;
paivitaPyramidi, taydennaTaide/rasterointi, karttanimien ladonta,
fokusmitat ja Kartta.ajaKamera ovat no-op lepotilassa (yksi portti
metodin alussa, ei hajautettuja ehtoja). Ohitettava osuus Ateenassa on
mitatusti ~1 650 SVG-elementtiä, koko pyramidiliikenne ja ~7 Mt keosta
(89 → 82 mitattuna ilman laattoja; laattojen kanssa enemmän).
**Mitä EI ohiteta vaiheessa 1:** moduulien lataus (1,9 Mt JS, SW-
välimuistissa) — staattisten tuontien muuttaminen laiskoiksi on oma
erä (vaihe 5b), jonka hyöty mitataan käynnistysajasta OIKEALLA
laitteella ennen kuin sitä tehdään; 20+ testiä lukee ui.js:ää
tekstinä (docs/raportit/moduulijako-tuojakartoitus.md), joten
tuontien siirto on remonttityötä, ei sivuvaikutus.

**Linssikartta luodaan tarvittaessa:** linssin valinta → `Kartta`
herää lepotilasta (drawBoardFor + kamera pallon näkymään), kuori
näkyviin; "Sulje linssi" → nollaaPyramidi, nollaaFokuskohteet,
nollaaElaintakyt, nollaaFokuspiste, svg#board tyhjäksi, lepotila
takaisin. Purku on olemassa olevaa koodia (destroy tekee saman
uudessa pelissä) — uutta on vain, että se ajetaan kuoren sulkeutuessa.

## 4. Kerroskartta — jokainen kartan vastuu pallolla

### 4.1 Tekstuuri vs. pelimerkit — ero kirjattuna

Raamattu 4.–5.9.2026: *"pinnoitteen päälle ei edelleenkään lisätä
erillisiä kerroksia"* — nimet, karttanostot ja reitit ovat LAATOISSA.
Tämä pysyy: mitään KARTTAA (nimiä, nostoja, reittiverkkoa, rajoja,
merten nimiä) ei piirretä pallolle kerroksena. Pallolle piirretään
vain PELI eli se, mikä vaihtuu pelin edetessä tai ottaa vastaan
kosketuksen — sama raja kuin tasokartalla ("KARTTANOSTOT POLTETAAN
LAATTOIHIN": *"elävaksi jää vain se, mikä vaihtuu … ja
NAPAUTUSALUEET"*). Pelimerkit ovat: kaupunkipiste + nimi (ankkuri
pelin napautukselle), nappula, kohteet, valittu reitti, lentokaari,
elävät nostot kunnes ne poltetaan, tähdet, kohtaamispiste,
nostoladonnan osumat. tests/pallo.test.mjs:n kielto (pointsData ym.)
vaihdetaan vaiheessa 1 tähän muotoon: sallitut kerrokset lueteltuna,
labelsData ja tekstuurikerrokset (nimet, reitit) kiellettyinä.

### 4.2 Taulukko

Tekniikat: **P** = Globe.gl pointsData (yksi yhdistetty mesh,
pointsMerge — halvin, raycast-osuma), **H** = htmlElementsData
(CSS2DObject, DOM-elementti pallon päällä, hidden pallon takana;
kallis per elementti → katto), **T** = pathsData (viiva pallon pintaa
pitkin), **A** = arcsData, **O** = objectsData/oma three.js-objekti,
**D** = pelin oma DOM kotelon päällä paikka getScreenCoords-kutsulla
joka kehys, **R** = oma osumatesti ruutuavaruudessa ilman elementtiä.

| kartan vastuu nyt (tasokartta) | pallolla | uudelleen käytettävä | kirjoitetaan uudestaan |
| --- | --- | --- | --- |
| Pohja: laattapyramidi (js/laattapyramidi.js) | Globe.gl laattamoottori (Z0–Z7, nostotasollinen sarja); poltetut nimet, nostot, reitit tekstuurina | tools/tee-pallolaatat.mjs, laatat.json, PALLO_* | laattaversion vaihto nostotason mukana (luettelotiiviste: mitkä nostot poltettu) |
| Kaupungit: piste + nimi (js/karttanimet.js ladonta ruutuavaruudessa, g.cities) | piste **P** (261, karttavakio asteina: pointRadius ≈ 0,12°, umpimusta); nimi **H** vain näkyville, ladonta ruutuavaruudessa (getScreenCoords → karttanimet.js:n asettelu- ja törmäyssäännöt), katto 40 nimeä; piste näkyy vain nimen kanssa (PISTE VAIN NIMEN KANSSA) | pallonKaupungit, karttanimet.js:n ladontasäännöt (asetaRuutuvaraukset-rajapinta) | näkyvien poiminta pallon näkymästä (onZoom-jarru 120 ms), nimen katkaisu |
| Kaupungin napautus → openArrival / avaaTutkinta / kehittäjäsiirto | onPointClick → sama `avaaTutkinta(city)` / doKehittajaSiirto; osuma ≥ 44 px: raycast + **R**-varmistus lähimpään kaupunkiin | ui.avaaTutkinta, doKehittajaSiirto, drawTargetsin sääntöjoukko (fokusKohdeKaupungit) | — |
| Nykyisen kaupungin laatta (g.fokuslaatta) | **H** (sama SVG-sisältö kuin paivitaFokusLaatta latoo), korostus + nimi | fokuslaatan SVG-rakenne | mitoitus korkeudesta (luku 5) |
| Nopanheiton kohteet (drawTargets: target-piste, target-halo) | **H** kohteille (≤ 12 kerrallaan), samat CSS-luokat; kehittäjätilassa kaikki kaupungit napautettavia = **P** onPointClick | css .target-*, moveOptions | — |
| Reittiverkko (viivataso laatoissa) + elävä valittu reitti (g.matkareitit) | verkko tekstuurissa (Z5+); siirtovaiheessa naapurireitit ja askelhelmet **T** (pathPoints edge.poly → asteet), askelhelmet **P** | rules.pixelOf, edge.poly, REITTITYYLI-mitat | polyn asteistus välimuistiin per lauta |
| Nappula (drawPawns, pawnShape; liikkuva .pawn-moving) | paikallaan **H** (pawnShape-SVG sellaisenaan); liikkeessä **D**: hyppaaAskel-kaari ruudulla, paikka joka kehys getScreenCoords(edgen pisteestä) | pawnShape, hyppaaAskel-profiili, STEP_MS, HYPYN_TAUKO_MS, NAPPULAN_LAHDON_VIIVE_MS, siirtoajonKesto | koreografian lautariippumaton osa irrotetaan js/siirtokoreografia.js:ään (vaihe 2) |
| Kamera-ajot (Kartta.ajaKamera: kerroin/leveys/bbox, trapetsi, sovitaAjonKesto, ele keskeyttää) | js/pallo-kamera.js `ajaPallokamera(kohde, valinnat)` SAMALLA allekirjoituksella; oma rAF-tween pointOfView(pov, 0) kehyksittäin (Globe.gl:n oma tween on Cubic.InOut eikä tunne trapetsia); ele keskeyttää (pointerdown) | pehmennysKaari, sovitaAjonKesto, SIIRTOZOOMIN_LAHENNYS, KOHDESOVITUKSEN_MARGINAALI | leveys ↔ korkeus (luku 5), bbox → keskipiste + korkeus |
| Ennakkozoomi, saatto, kohdesovitus, lentokohteiden sovitus (ui.js) | samat metodit, kamera valitaan `this.kamera()`-delegaatilla (pallo tai Kartta) | ennakoiSiirtoZoomi, aloitaSaattavaKamera, sovitaKohteetNakyviin | sovituksenAlue (kalusteet) toimii ruutupikseleissä → sama |
| Fokusnostot: poltetut = näkymättömät osumamuodot; elävät = symboli + nimiö + siirtoviiva (js/fokuskohteet.js, fokusniput.js, nostoladonta.js) | poltetut: **R** — yksi onGlobeClick, lähin nosto 44 px:n sisällä getScreenCoords-kandidaateista näkyvältä alueelta (fokusniput sääntö 9: lähin keskipiste voittaa); elävät: **H** symboli + nimiö (piirraNostosymKartalle samaan pieneen svg:hen), katto 40, ylimenevät odottavat polttoa (Raamattu: kaksi kerrosta rinnakkain) | kohdedata (x, y laudalla), nostoOnPoltettu-luettelo, symbolikirjasto, avaaFokuskohde (kortti) | niputus kaupungin kyljille lasketaan asteina (nippuAsettelu → pallo), siirtoviiva **T** |
| Eläintäyt, skandaalit, historian hetket, Matkakirjan ihmeet (tähti) | sama polku kuin nostoilla (poltettu **R** / elävä **H**); ihmenauha ja -nappi ovat kortin DOMia | elaintaky.js data, matkakirjanIhme, piirraIhmenauha | — |
| Kohtaamispiste (js/fokuspiste.js, vihreä tuike) | **H** samalla CSS-tuikkeella (kompositorianimaatio) | fokuspiste-tuike-CSS | — |
| Lento: elävä kaari + kone + pilvet (animateFlightSisalla, lennonLaivareitit) | kaari **A** (arcDashAnimateTime katkojälkeen), kone **D**, kamera ajaa maidenBbox-vastineen (lähtö- ja kohdemaan asteiden bbox → korkeus) | lennon tekstit, kabiiniääni, repliikit | kone pallon pinnan suuntaan (kierto pathin tangentista) |
| Aloituslento Lontoosta (aloituslentoSisalla, niukkuusharso) | sama kuin lento; harso = pallon oma tumma kalvo (**O** puoliläpinäkyvä pallo säteellä 1,001) | lennon ajoitus, tekstit | — |
| Karttaselite + aihevalot (js/karttaselite.js, karttavalot.js) | valikko on DOM (ennallaan); valo = **P** toinen pistekerros (kategorian väri, pointAltitude 0,001) vain näkyville nostoille | karttavalotLue/aseta, karttavaloVari | valojen sijoitus asteina |
| Sää | ei kartan vastuu (lehden etusivu, js/saa.js) — ei muutu | — | — |
| Pöllö, Livia, toimintorivi, noppa (dieRestingSpot), sähke, matkalaukku | DOM pallon päällä, ennallaan; nopan paikka lasketaan ruudulta kuten nyt | kaikki | .pallo-kuori z-index 45 → laudan tasolle (ui-paneelien alle), kuoren tumma pohja pois |
| Kohdekartat, lehtien sisältö, aikajana, radio, vertailu, maatiedot | linssikartalla / lehdissä — ei muutu | — | — |
| Fokusmitat (maataulu, mittajana, asteikot), maatummennus, atlaskehys, paperi laudan ulkopuolella | eivät tule pallolle (kalusteita); mittakaava = korkeus; navat ja juliste 76 °N:n yli ovat paperia laatoissa jo nyt | — | — |

Sitovat säännöt kerroksille: jokainen näkyvä merkki on nimetty ja
napautettava (kone valvoo: tools/tarkista-karttamerkit.mjs saa
pallovastineen vaiheessa 3); kaikki ilmestyminen, poistuminen ja
paikanvaihto animoidaan (pointsTransitionDuration /
htmlTransitionDuration 250 ms, ease-in-out; reduced motion → 0 ms
häivytyksellä); ei suodattimia SVG-osissa (iOS-sääntö pysyy, koska
**H**-elementit ovat SVG:tä DOMissa); merkkien koko on karttavakio
asteina pisteillä ja ruutuvakio nimillä — sama jako kuin tasokartalla.

## 5. Sukellus, palaaminen, koordinaatit ja kamera

**Yksi totuus:** laudan (x, y). `laudaltaAsteiksi('maailmankartta',
x, y)` → {lat, lon} ja `projisoiLaudalle` takaisin; pallo pitää
asteet välimuistissa per lauta (kaupungit 261, reittipolyt 1 526
askelta, nostot ~300) ja laskee ne kerran drawBoardForin vastineessa.
Napautus pallolla → `sukelluskohta(lat, lng)` → (x, y) → sama
osumalogiikka kuin nyt. Näin tallennus, moveOptions, pixelOf ja kaikki
pelisäännöt pysyvät lautayksiköissä.

**Näkyvä leveys ↔ korkeus.** Kartan ajot pyytävät `leveys`
(lautayksikköä ruudun leveydellä) tai `kerroin`. Pallolle:
`korkeus(leveysYks) = (leveysYks · 360/12000) / (2 · tan(fov/2) · 180/π)`
eli Globe.gl:n oletus-fovilla 50° `≈ leveysYks / 1780`
(PALLO_SUKELLUSLEVEYS 620 → 0,35; kaupunkiporras 88 → 0,05; koko
lauta → 2,2). Kaava on tarkka vain pienillä korkeuksilla (tasokuva);
suurilla käytetään pallon geometriaa (näkyvä kaari = 2·acos(1/(1+h))).
Kalibrointi savukkeella: kolme porrasta (kaupunki, maa, manner)
mitataan getScreenCoords-etäisyyksinä ja vartioidaan ±5 %. `kerroin`
muunnetaan nykyisestä leveydestä samoin kuin Kartta.siirtoZoomiKerroin.
Zoomirajat: kaukaisin korkeus 2,5 (koko pallo), lähin sidotaan laattojen
tarkkuuteen (luku 6): korkeintaan 2× venytys laitepikseleissä.

**Sukellus kaupunkiin ja lehden avaus:** onPointClick(kaupunki) →
kamera-ajo kaupungin ylle (leveys = saapumisporras, 1 400 ms trapetsi)
JA `avaaTutkinta(city)` heti — omistaja 2.9.: *"Kohdekaupunki avaa
aina kaupunkilehden"*, eikä lehden avaus odota kameraa.

**Linssikartalle ja takaisin:** `valitseLinssi(tunnus)` (tunnus ≠ null,
lauta = pallo) → `avaaLinssikartta()`: Kartta herää (drawBoardFor),
kuori näkyviin, `kartta.ajaKamera({ x, y, leveys }, { kesto: 0 })`
pallon nykyisestä pov:sta (sukelluskohta + leveys(korkeus)); sitten
sytytaLinssi ennallaan. `valitseLinssi(null)` / Sulje → pallon kamera
kartan viimeiseen näkymään (kameranTila → asteet + korkeus), kuori
pois, Kartta lepotilaan ja purku (luku 3). Pallon oma linssi
(js/linssit/pallo.js) poistuu laukusta, kun pallo on oletuslauta
(vaihe 6) — kartta-oletuksella se jää valikoimaan ennalleen.

**Kamera-ajojen delegaatti:** ui.js:n 8 kutsupaikkaa (ennakoiSiirto-
Zoomi, aloitaSaattavaKamera, sovitaKohteetNakyviin, aloituslento,
zoomaaMantereelle-perhe, fokuksen tarkistaFokusZoom) kutsuvat
`this.kamera()`-oliota, joka on `this.kartta` tai `this.pallolauta.kamera`
laudan mukaan. Rajapinta on sama (`ajaKamera`, `kameranTila`,
`kameraAjossa`, `pysaytaKameraAjo`, `siirtoZoomiKerroin`); kummankaan
sisäisiä metodeja ei kutsuta ristiin. Tämä on ainoa ui.js-muutos, joka
koskee kameraa.

## 6. Muisti ja suorituskyky iPhonella (WKWebView)

- **Laatat.** Z0–Z7 = 21 845 laattaa (mitattu Z5-laatta 10,3 kt;
  arvio ~200–250 Mt ämpärissä), nostotasollinen sarja Z6–Z7 erikseen.
  Näkyvissä kerrallaan ≤ ~60 laattaa (256² RGB → ~12 Mt GPU-muistia
  + mipmapit) — pienempi kuin pyramidin ruudullinen esilataus.
  Vartija: savuke lukee `renderer().info.memory.textures` ja vaatii
  ≤ 120 tekstuuria lepotilassa Ateenan tarkkuudella; ylitys = laatta-
  moottorin karsintaa ei tapahdu → pyydetään omaa karsintaa (Globe.gl:n
  tile engine ei dokumentoi poistoa; mitataan vaiheessa 1).
- **Tarkkuus lähikuvassa.** Pyramidin z7 on 240 px/aste, pallon Z7 vain
  91 px/aste (256·2⁷/360). Tasokartan lähin porras (58–88 yksikköä =
  1,7–2,6°) olisi pallolla Z7:llä ~4× venytetty dpr 2:lla. Ratkaisu:
  Z8 (182 px/aste; ajo aloitettu v1544, 65 536 laattaa) ja lähin
  korkeus rajataan 2× venytykseen → 2,1° ≈ 70 yksikköä. Z9 (262 144
  laattaa) EI tehdä ennen mittausta laitteella.
- **DOM-katto.** htmlElements ≤ 60 yhteensä (nimet 40, kohteet 12,
  elävät nostot 40 → priorisoidaan: kohteet > nappula > laatta >
  nimet > nostot, ja nimikatto laskee kun nostoja on). CSS2DRenderer
  laskee jokaisen elementin paikan JOKA KEHYS — 60 on mitatusti
  pöytäkoneella ilmaista, iPhonella mitataan vaiheessa 1 kehysajalla
  (vartija p95 ≤ 20 ms lepotilassa, ≤ 34 ms kamera-ajossa).
- **Render-silmukka.** Globe.gl piirtää rAF:lla jatkuvasti; lepotilassa
  (ei ajoa, ei eleitä, ei animoituja elementtejä) kutsutaan
  `pauseAnimation()` ja herätetään pointerdownista, ajosta ja
  data-muutoksesta — muuten pallo syö akkua lehden takana. Lehden
  ollessa auki (arrivalDialog.open) pallo on aina tauolla.
- **Hover-raycast** pois kosketuslaitteilla (`enablePointerInteraction`
  vain napautuksen ajaksi: pointerdown → päälle, click käsitelty → pois),
  koska jokainen pointermove raycastaa 261 pistettä + polut.
- **Reduced motion:** ei autoRotatea, ei liukua, kamera-ajot 0 ms
  häivytyksellä, nappula hyppää perille — sama sopimus kuin nyt.
- **Offline ja varapolku:** Globe.gl (vendor, ~700 kt) ja laatat ovat
  toisessa originissa; SW:n KUVACACHE-mallilla runtime-välimuisti
  vendor-skriptille (opaque kelpaa skriptille) ja laatoille (katto
  400 laattaa, LRU). Ensimmäinen käynnistys ilman verkkoa → tasokartta
  istunnoksi (luku 2). Huom: tasokarttakaan ei toimi ilman ämpäriä
  (pyramidi), joten "offline-varakartta" tarkoittaa SW:n aiemmin
  välimuistittamia laattoja — kummallakin laudalla.
- **Yhden tiedoston versio (dist):** ei palloa (dynaaminen tuonti
  kaatuu hallitusti kuten linsseillä) → tasokartta. js/pallo*.js ja
  js/pallolauta/*.js EIVÄT mene MODULES-listalle; ne kirjataan
  tests/sw.test.mjs:n NIPUTTAMATTOMAT-listaan ja sw.js:n SHELLiin.
- **Turvatila:** js/main.js kirjaaKaynnistys — kolme käynnistystä
  neljässä minuutissa pallolaudalla → istunto tasokartalla, koska
  WebGL-kontekstin kuolema näkyy täsmälleen logosilmukkana.

## 7. Vaiheistus

Jokaisen vaiheen yhteiset portit: node --test (kaikki läpi),
tarkista-kaksoisavaimet, tarkista-niputus, build-standalone +
savuke-dist; `?lauta=kartta` antaa täsmälleen nykyisen pelin
(savuke-siirtokoreografia, -maailmanakyma, -fokuskohteet, -avauslento
ennallaan); sama tallenne latautuu kummallakin laudalla
(tests/pallolauta.test.mjs); tasokartta ei ole DOMissa pallolaudalla
(svg#board tyhjä, pyramidipyyntöjä 0 — savuke-pallolauta mittaa).
Sessio = yksi Fablemax-erä ≈ yksi PR.

| vaihe | mitä | tiedostot | testit | työ | pelattavaa vaiheen jälkeen |
| --- | --- | --- | --- | --- | --- |
| **1. Perusta ja kytkin** | lautaValinta + LAUTA_OLETUS + kehittäjävipu; .pallo-kuori laudan tasolle (z-index, pohja pois, ei Sulje-nappia laudalla); Kartta.lepotila + render-portti (drawBoardFor ei aja); js/pallolauta/kamera.js (leveys↔korkeus, ajaKamera-rajapinta, trapetsi-tween, ele keskeyttää, pauseAnimation-lepo); kaupungit **P** + onPointClick → avaaTutkinta; nykyisen kaupungin laatta **H**; `this.kamera()`-delegaatti; Liiku-nappi avaa pallolaudalla toistaiseksi LINSSIKARTAN (vaiheen 4 kuori kevyimmillään: Kartta herää, kuori päälle) — siirrot tehdään siellä | js/ui-apurit.js, js/main.js, index.html, css/styles.css, js/pallo.js (jaetaan: kuori+eleet jää), js/pallolauta/{lauta,kamera}.js, js/ui.js (render-portti, delegaatti, valitseLinssi), js/kartta.js (lepotila), sw.js, tests/sw.test.mjs | tests/pallolauta.test.mjs (kytkin, sama tallenne, kaava leveys↔korkeus, kielletyt kerrokset), tests/pallo.test.mjs (kiellot → sallitut kerrokset), tools/savukkeet/savuke-pallolauta.mjs (svg tyhjä, tekstuurit ≤ 120, kehys p95, lehti aukeaa napautuksesta, kamera osuu kaupunkiin ±5 %) | 2 | kytkimellä: peli alkaa pallolla, Ateenan lehti aukeaa pallolta, siirto avaa tasokartan kuoreen ja palaa palloon perillä; ilman kytkintä kaikki ennallaan |
| **2. Siirrot pallolla** | js/siirtokoreografia.js (STEP_MS, HYPYN_TAUKO_MS, NAPPULAN_LAHDON_VIIVE_MS, siirtoajonKesto, ENNAKON_* siirretään ui.js:stä sanatarkasti — tuojakartoitus päivitetään); kohteet **H**, naapurireitit **T** + helmet **P**, nappula **H**/**D**, ennakkozoomi → saatto → nappula; laiva; automaattiheitto; siirtymämusiikki ja äänet samoista koukuista; lento **A** + kone **D** + kamera; mannerlento | js/pallolauta/{siirto,merkit,reitit}.js, js/ui.js (animatePawn haarautuu laudan mukaan; doFly), js/siirtokoreografia.js | savuke-siirtokoreografia saa `--lauta pallo` -tilan (samat aikaleimavartijat: nappula 300 ms kameran jälkeen, saapuu 280 ms ennen); savuke-nappula pallolle; tests/siirtokoreografia.test.mjs | 3 | siirrot, laiva, lento ja saapumiset kokonaan pallolla; Liiku ei enää avaa tasokarttaa |
| **3. Merkit** | kaupunkinimet **H** ladonnalla (karttanimet.js:n säännöt ruutuavaruudessa, katto 40, piste vain nimen kanssa); poltettujen nostojen **R**-osuma; elävät nostot, eläintäyt, skandaalit, hetket, ihmeet **H** (katto); kohtaamispiste; kortit (avaaFokuskohde) ankkuri ruutupisteestä; karttaselite + valot; kehittäjätilan kaikki kaupungit; pallolaattojen nostoversion tiiviste laatat.jsonissa (mitkä nostot poltettu) | js/pallolauta/{nimet,nostot}.js, js/fokuskohteet.js (ankkurin ruutupiste parametriksi), js/karttanimet.js (ladonta ilman svg:tä), tools/tee-pallolaatat.mjs (tiiviste luetteloon), tools/tarkista-karttamerkit.mjs (pallotila) | tests/pallonimet.test.mjs (ladonta ei limity, piste vain nimen kanssa), tarkista-karttamerkit pallolla julkaisuportiksi, savuke-fokuskohteet `--lauta pallo` | 3 | koko pelin sisältö napautettavissa pallolta; Euroopan nostot samat kuin kartalla |
| **4. Linssikartta** | valitseLinssi → linssikartan kuori (Kartta herää, kamera pallon näkymään); Sulje/valinta null → purku ja paluu; radio, vertailu, maatiedot, aikajana, keksinnöt toimivat kuoressa; Liiku ja lehdet estetty kuoressa (linssi blokkaa muun — Raamattu 4.9.); pallon oma linssi piiloon pallolaudalla | js/pallolauta/linssikartta.js, js/ui.js (valitseLinssi, sytytaLinssi), js/kartta.js (herätys/purku), css | tests/linssikartta.test.mjs (kamera synkka molempiin suuntiin ±5 %, purku jättää svg:n tyhjäksi), savuke-aikajana ja savuke-kartta-tila `--lauta pallo` | 1,5 | kaikki linssit pallolaudalla vanhalla kartalla; paluu palloon |
| **5. Avaus, offline, laite** | avausnäkymä: ESIRENDERÖITY sumennettu pallo (kuvasarja/video laatoista, pyörii hitaasti Lontoosta Aasiaan) etusivun tekstin takana, päällä elävä kone + paksu punainen viiva kaupungista toiseen ja isoisän aikalaiskuvat pienenä kartan ulkopuolella (luku 0 kohta 5; siihen asti etusivu vanhalla kartalla), aloituslento pallolla + niukkuusharso; SW-välimuisti vendorille ja laatoille; varapolku + turvatila; Z8 käyttöön ja lähin korkeus laattatarkkuudesta; hover-raycast pois; **5b** mitattu käynnistysaika TestFlightissa → päätös staattisten karttatuontien laiskoittamisesta (erä vain jos mittaus näyttää > 300 ms hyötyä) | js/pallolauta/avaus.js, js/ui.js (renderIntro, aloituslento), sw.js, js/main.js, js/pallo.js | savuke-avauslento `--lauta pallo`, tests/sw.test.mjs (välimuistikatot), savuke-dist (ei palloa, kartta) | 2 | uusi peli alusta loppuun pallolla; ilman verkkoa peli käynnistyy kartalla |
| **6. Pelaajan kytkin** (alun perin "Oletukseksi" — LAUTA_OLETUS = 'pallo' ja pallo-linssi pois laukusta tehtiin jo v1554:ssä omistajan päätöksellä) | pelaajan asetus "Pelilauta: karttapallo / vanha kartta" (asetusvalikko, sama avain matkakirja-lauta, ei pelitilaan); regressiotaulukko ennen/jälkeen (kehys, keko, tekstuurit, käynnistys); docs/moduulit/linssit.md ja kaupunkilehti.md viitteet; tuojakartoitus; muutosloki; vanha kartta jää linssikartaksi ja palautusoptioksi (ei poisteta) | js/main.js (asetus), js/ui-apurit.js, docs/ | kaikki savukkeet kummallakin laudalla | 1,5 | pelaaja valitsee laudan itse; `?lauta=kartta` palauttaa vanhan |

**Vaiheen 3 toteutusmerkinnät (Fablemax 5.9.2026, PR "Pallolauta vaihe
3: nimet ja nostot pallolla"):** (1) nimet ladotaan ruutuavaruudessa
samalla sijoitusfunktiolla kuin laudalla (js/karttanimet.js
sijoitaKaupunginNimi, ladoRuutunimet) — kynnys KYNNYS.kaupunki ei ole
käytössä pallolla, vaan katto 40 ja tärkeysjärjestys (oma kaupunki,
lähtökaupunki, lentokenttä, reittisolmun aste, lähin ruudun keskipistettä)
yleistävät; pudotus sallitaan, ja pudonnut kaupunki jää pisteettä (PISTE
VAIN NIMEN KANSSA). (2) Ladonta ajetaan vain levossa (LAATU_LEPOVIIVE_MS,
sama hetki kuin laadun palautus). (3) Nostojen ladonta (nippu, erottelu,
nimiön kylki) tulee tasokartan tyngästä (js/fokuskohteet.js
maanKohdemerkit), ei omasta koodista; poltetut luetaan PALLON laatat.json-
luettelon `nostotaso.nostot`-kentästä (tools/tee-pallolaatat.mjs --nostot
kirjoittaa sen), tunnuksella ja tiivisteellä kun se on annettu. Pallon
nykyinen sarja (2026-09-03a) on pohjasarja ilman nostotasoa, joten kaikki
nostot ovat toistaiseksi eläviä H-merkkejä. (4) Kortit ankkuroidaan
merkin ruutupisteestä (avaaFokuskohde { ankkuri }) ja seuraavat merkkiä
levossa. (5) Aihevalot ovat pistekerroksen täpliä; selitteen laskurit
tulevat pallolta (ui.karttavaloLaskuri). (6) Uutta Globe.gl-kerrosta ei
tarvittu: PALLOLAUDAN_KERROKSET on ennallaan. Portit:
tests/pallonimet.test.mjs, tools/tarkista-pallomerkit.mjs,
savuke-pallolauta vartiot 12–15.

**Vaiheen 5b toteutusmerkinnät (PR "Pallolauta 5b: aloituslento
pallolla"):** (1) Avauslennon KOREOGRAFIA pysyy yhtenä kappaleena
js/ui.js:ssä (aloituslentoSisalla) — arkki, kamera-ajo, kertoja,
kabiiniääni, repliikki, isoisän valokuva, ohitus, saapumiskortti ja
kuplat — ja vain kohtauksen fyysinen puoli delegoidaan laudalle
`ui.aloituslennonKohtaus`-sopimuksella (rajaus, valmistele, odotaKartta,
rakenna, lenna, poistuma, pura), täsmälleen samalla mallilla kuin siirron
`nappulanKuljettaja`. Tasokartan toteutus on ui.js:n
tasokartanLentokohtaus + piirraLentokohtaus (entinen koodi sellaisenaan),
pallon js/pallolauta/avaus.js. (2) Kone on VAIHEEN 2 KULJETTAJA
(`ui.nappulanKuljettaja(player, { lento: true })`) ja kaari vaiheen 2
arcsData — uutta Globe.gl-kerrosta ei tarvittu, PALLOLAUDAN_KERROKSET on
ennallaan. Ohitus tarvitsi kuljettajalle yhden lisän: `paata()` vie
kesken olevan rAF-hypyn loppuun samalla tavalla kuin `finish()` vie
selaimen animaation. (3) Rajaus on kaupunkiparin laatikko samalla
kaavalla ja marginaalilla kuin pallon omalla lennolla (siirto.js
`lennonRajaus`, vietynä), joten kuljettajan oma kamera-ajo jää
nolla-ajoksi eikä kamera nytkähdä koneen lähtiessä; perillä `laske()`
sukeltaa kohdekaupunkiin saapumiskortin alla (savuke mittaa ±5 %).
(4) NIUKKUUSHARSO ON CSS-KALVO kotelon päällä eikä toinen pallo säteellä
1,001: ei uutta three.js-objektia eikä toista WebGL-kontekstia iOS:lle,
häivytys on pelkkää peittävyyttä, väri sama kuin tasokartan harsolla.
Kaari jää kalvon alle (WebGL), joten avauslennon kaari saa oman täyden
sinooperinsa (REITIN_VARIT.avauslento) ja lennon kaksi nimeä
pergamenttihalon, jotta ne lukeutuvat harson läpi kuten kartalla.
(5) Tasokartta ei herää lainkaan: `kartta.nuku()` ajetaan doPickStartissa
ENNEN actionPickStartia (arkin takana), joten svg#board on tyhjä ja
pyramidipyyntöjä on 0 koko avauksesta perille. (6) Arkin takainen
"kartta on valmis" -odotus on laudan mitta: kartalla odotaPyramidi,
pallolla tekstuurien määrän vakiintuminen (kohtaus.odotaKartta), sama
katto ja sama ohitus. Portit: tests/pallolauta.test.mjs (vaihe 5b),
savuke-avauslento `--lauta pallo` (P1–P7) ja `?lauta=kartta` (L1–L4)
ennallaan.

Yhteensä **13 sessiota** (vaiheet 1–6; 5b mahdollinen +1). Vaihe 1 on
"uuden jutun ensimmäinen kierros" (roolitus.md): Fable/Fablemax tekee
sen itse ja hioo omistajan kanssa; vasta vaiheet 2–3 voi jakaa
agenteille valmiin mallin kanssa.

**Vaiheiden järjestysehto:** vanha kartta pysyy oletuksena (LAUTA_
OLETUS = 'kartta') vaiheen 6 alkuun asti; kytkin on kehittäjätilan ja
URL-parametrin takana. Yksikään vaihe ei muuta js/game.js:ää eikä
tallennusmuotoa.

## 8. Riskit, avoimet kysymykset omistajalle ja Raamattu-ehdotus

**Riskit (mitattavat, kolme suurinta ensin):**
1. WKWebView'n muisti: WebGL-konteksti + laatat + pelin DOM voi ylittää
   sisältöprosessin katon → logosilmukka. Vartijat: tekstuurikatto,
   pauseAnimation lehden takana, turvatila (luku 6). Mitataan vasta
   laitteella; kontin Chromium ei kerro tästä mitään.
2. Lähikuvan tarkkuus: Z7 on 2,6× karkeampi kuin pyramidin z7; ilman
   Z8:aa kaupunkiporras on sumea. Z8 = 65 536 laattaa, ajoaika
   mitattava ennen vaihetta 5.
3. htmlElements-osumat ja eleet: CSS2D-elementtien pointer-events ja
   nipistyksen/klikin erottelu ovat kirjaston sisällä (ThreeRender-
   Objects), nykyinen sormenlaskenta on kiertotie. Jos elementit
   eivät ota napautusta luotettavasti iOS:llä, kaikki osumat
   siirretään **R**-malliin (yksi onGlobeClick + lähin merkki) —
   arkkitehtuuri sallii sen ilman muita muutoksia.
4. Nimiladonta ruutuavaruudessa joka zoomissa voi maksaa 261 nimen
   mitat; jarru 120 ms ja näkyvien poiminta pitävät sen alle 10 ms
   (vartija).
5. Tasokartan herätys linssiä varten kestää (drawBoardFor + pyramidi
   ~1–2 s) — linssin avausjakso (musta, otsikko, käynnistä) peittää
   sen, mutta radio/vertailu/maatiedot avautuvat ilman jaksoa → kuoreen
   lyhyt häivytys ja "Avataan karttaa…".

**Avoimet kysymykset omistajalle (enintään viisi):**
1. Saako kaupunkien NIMET latoa pallolle elävinä (H-elementteinä),
   vai halutaanko nekin tekstuuriin? Elävä ladonta on ainoa tapa saada
   dpr-tarkat, ei-limittyvät nimet (karttanimet.js:n 30.8. perustelu) —
   tekstuurissa ne olisivat iPhonella kolmasosan kokoisia.
2. Ajetaanko Z8 (ja tarvittaessa rajattu Z9 Euroopalle) ennen vaihetta
   5, vai hyväksytäänkö lähin zoomi ~70 yksikköä (Z8) / ~140 (Z7)?
3. Poistetaanko Karttapallo-linssi laukusta, kun pallo on lauta, vai
   jääkö se "koko pallo kerralla" -näkymän napiksi (kamera kauas)?
4. Mittajana, asteikot ja maataulu (fokusmitat): jäävätkö
   linssikartalle vai halutaanko pallolle oma mittakaavamerkki?
5. Aloitussivun asettelu: pallo Lontoon yllä avaustekstin takana (kuten
   suunniteltu) vai nykyinen pienoiskartta tasokuvana?

**Raamattuun (Fable kirjoittaa, ehdotus):** kohta "KARTTAPALLO ON
PELILAUTA, LINSSIT VANHALLA KARTALLA (omistaja 5.9.2026 aamu,
sanatarkasti: …)": pallo on pelin lauta ja tasokartta linssikartta,
joka luodaan linssin ajaksi eikä elä taustalla; palautusoptio yhdellä
vakiolla (LAUTA_OLETUS) ja kytkimellä, pelitila sama; pinnoitteen
päälle ei piirretä KARTTAA (nimet, nostot, reitit laatoissa), mutta
PELIN merkit (kaupunkipiste + nimi, nappula, kohteet, elävät nostot,
osumat) ovat pallolla — täsmentää 4.–5.9. kirjauksia "ei mitään
pinnoitteen päälle"; kumoaa 4.9. linjauksen "pallo on valikko, ei
lauta"; "Yksi lauta: koko maailma yhdellä kartalla" pysyy — kartta on
nyt pallo.

## 9. Hylätyt vaihtoehdot

- **Tasokartta piilossa DOMissa, pallo sen päällä (kevyin toteutus).**
  Hylätty omistajan lisäehdolla: kartta pitäisi ~1 650 elementtiä ja
  pyramidin esilatauksen elossa lehden takana (luku 3).
- **Oma d3-ortografinen pallo SVG:llä.** Hylätty jo 4.9. (omistaja
  valitsi Globe.gl:n); lisäksi laatoitettu pinta ei ole mahdollinen
  SVG:ssä ilman omaa laattamoottoria.
- **Nostot ja nimet labelsData-kerroksena (3D-teksti).** Hylätty:
  TextGeometry per nimi on raskas, kirjasimet eivät ole pelin
  kaiverruskirjasimia, eikä ladontaa (törmäys, kyljet) voi tehdä.
- **Kaikki merkit htmlElements-kerroksena ilman kattoa.** Hylätty:
  CSS2DRenderer laskee jokaisen elementin joka kehys; 300 nostoa +
  261 nimeä ylittäisi kehysbudjetin iPhonella. Siksi poltetut nostot
  saavat R-osuman ilman elementtiä.
- **Globe.gl:n oma pointOfView-tween ajoihin.** Hylätty: Cubic.InOut
  ei ole SIIRRON KOREOGRAFIAN trapetsi eikä sitä voi keskeyttää
  kirjaamalla välivaihe; oma rAF-tween tekee molemmat ja on sama koodi
  kuin nykyinen liuku.
- **Pelitilaan kenttä "lauta".** Hylätty: rikkoisi vanhat tallenteet ja
  palautusoption; laudan valinta on laitteen asetus kuten linssi.
- **Staattisten karttatuontien laiskoitus heti vaiheessa 1.** Siirretty
  vaiheeseen 5b mittauksen taakse: 20+ testiä lukee ui.js:ää tekstinä,
  ja moduulit ovat SW-välimuistissa — hyöty on parsinta-aika, joka on
  mitattava laitteella ennen remonttia.
