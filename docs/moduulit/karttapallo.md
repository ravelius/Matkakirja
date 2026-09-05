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

### 4.3 Napakannet (5.9.2026)

Omistaja 5.9.2026 klo 15 Suomen aikaa, kuvakaappaus Huippuvuorilta:
*"Miksi hattu näkyy?"* Napaa katsottaessa pallolla oli vaalea lakki ja
sen reunalla katkoviivamainen tumma rengas. Kumpikaan ei ole laattojen
sisältöä (sarjan b laatat mitattiin puhtaiksi), vaan Globe.gl 2.46:n
omaa geometriaa: Mercatorin rajan (85,05°) yläpuolelle kirjasto
venyttää tason 0 laatan koko pallon kokoisena, valaisemattomana
pallopintana, ja laattaverkkojen ylimpien rivien sauma näkyy tummana
renkaana. Renkaan leveysaste MITATTIIN (väriraidat 83–85,5° ja
säteittäinen kirkkausprofiili kuvasta): se on 83,7–84,25°, ei 85°:ssä.

Korjaus on js/pallo.js `asennaNapakannet`, joka kutsutaan
laattamoottorihaarasta: kaksi ohutta pallokalottia (NAPAKANNEN_LEVEYS
83,7° ⇒ pohjoinen ≥ 83,7°, etelä ≤ −83,7°) laattojen omalla
täytesävyllä — pohjoinen merta (#c9c2af), etelä jäätä (#dcd6c6, =
JAA_SAVY) — kummassakin peittävä kalotti ja 0,4° leveämpi 0,4-peittoinen
reuna. Kansi ei ole kartan KERROS (luku 4.1:n kielto pysyy): se peittää
vain sen, mitä kirjasto piirtää kartan ulkopuolelle, eikä ota kosketusta
vastaan (`raycast` tyhjäksi), joten pelin merkit toimivat päällä
ennallaan. Kannet lisätään laattamoottorin ISÄN alle, koska moottori
purkaa omat lapsensa tason vaihtuessa.

THREE:n konstruktorit (Mesh, SphereGeometry, materiaalit) saadaan
vientinä `kolmiulotteinen(pallo)`, joka lukee ne elävistä
laattaverkoista — Globe.gl:n UMD-paketti ei vie THREE:a globaaliin.
Materiaaliluokka otetaan LAATOILTA: valaisematon kansi (MeshBasic)
samalla sävyllä piirtyi mitatusti tummana kiekkona, koska kirjaston
valot (ambient + suoraan pohjoisnavan päältä tuleva directional)
kirkastavat laatat navalla n. 1,4-kertaisiksi.

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

**Vaiheen 4 toteutusmerkinnät (Fablemax 5.9.2026, PR "Pallolauta vaihe
4: linssikartta"):** (1) Kuori asuu js/pallolauta/linssikartta.js:ssä
(luoLinssikartta); ui.avaaLinssikartta / ui.suljeLinssikartta delegoivat
sinne, ja moduuli ladataan pallolaudan mukana (ei MODULES-listalle, SHELL
kyllä). (2) Kamera molempiin suuntiin: avatessa pallon kameranTila
(x, y, leveys) → Kartta.ajaKamera kesto 0; suljettaessa Kartta.kameranTila
(x, y, skaala) → leveys = ruudun leveys / skaala → pallon ajaKamera kesto 0
häivytyksen alla (kartanNakymaPallolle). Mitattu ±5 % (savuke-pallolauta
vartio 7, tests/linssikartta.test.mjs). (3) Siirtymät: pallon kuori saa
luokan `linssin-alla` (opacity 0, 250 ms) ja piilotetaan vasta häivytyksen
jälkeen; suljettaessa pallo näytetään läpinäkyvänä, kamera asetetaan ja
häivytys sisään, kartta puretaan (nuku → puraLauta) vasta kun pallo
peittää sen. Tila (ui.linssikartta, body.linssikartta-auki, Kartta hereillä)
vaihtuu aina heti; reduced motion → 0 ms samassa vuorossa. (4) Linssi
blokkaa muun: yksi portti ui.linssikarttaEstaa() (vaihdaLiuku, avaaTutkinta,
Matkusta ja Tutki harmaina); tasokartalla kenttä on aina null.
(5) Aikajanan oma ✕/Esc ja radion OFF päättävät linssin pallolaudalla
(ui.pysaytaAikajana → valitseLinssi(null)), jotta kuori ei jää tyhjänä
karttana ruudulle; kehys on piilossa radiotilassa ja aikajanalla (niillä
on oma sulkemisensa). (6) Muistettu linssivalinta ei jää laukkuun
"valituksi" ilman kuorta: pallolaudalla käynnistyksessä valinta unohdetaan
(paivitaLinssit lepotilassa) — kuori avautuu vain laukun valinnasta.
(7) Löydetty ja korjattu vaiheen 1 aukko: tasokartan merkkiketju
(taydennaTaide → paivitaMaastonimet, paivitaFokusPohja) piirsi
fokuskohteet ja eläintäyt takaisin tyhjään svg:hen pallon alle, kun
kartan kamera-ajo (aikajanan paluuajo, aloituslento) valmistui purun
jälkeen — mitattu 1 263 elementtiä; nyt kolme metodia palaavat
lepotilassa heti (sama yhden portin sääntö kuin js/kartta.js).
(8) Vaiheen 1 väliaikainen "Palaa pallolle" poistui; Sulje on samassa
kulmassa, selitenapin vasemmalla puolella. Portit: tests/linssikartta.test.mjs,
savuke-pallolauta vartio 7, savuke-aikajana ja savuke-kartta-tila
`--lauta pallo`.

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

## 10. Kaikki pallolle — vanha kartta suljetaan (5.9.2026)

**Omistajan linjaus (Raamattu KAIKKI PALLOLLE, VANHA KARTTA SULJETAAN):**
*"Käännä kaikki pallolle, niin voidaan sulkea vanha kartta kokonaan"* /
*"Käytä agenttia parvia"*. Kumoaa luvun 2 kytkimen ja luvun 5
linssikartan: tasokartta ei jää linssikartaksi eikä palautusoptioksi.
**Täsmennys 5.9.2026 ilta:** *"Pidetään vanha kartta vielä vivun
takana, sitä voi tarvita joissain linsseissä koska siinä helpompi
näyttää isoja alueita kerralla"* — js/kartta.js ei poistu; se pysyy
`?lauta=kartta`-vivun takana ja linssipintana isoille alueille, eikä
se alustu pallolaudalla.

**Inventaario (5.9.2026):** vanhaan karttaan piirtävät enää
topografia (1 rasterikuva), vesistöt (sama rasteri + 38 järveä + 253
jokiviivaa), keksinnöt/aikajana (valot + maskitummennus + kamera),
radio (kaupunkinapit), vertailu ja maatiedot (maapolygonit + nimet)
sekä etusivun pienoiskartta. Lehtien kohdekartat ovat omia SVG-
piirroksia (js/packs/maakartat.js) eivätkä riipu Kartta-luokasta.
Poistettavaa kartan mukana: js/kartta.js, js/linssit/kerros.js,
js/pallolauta/linssikartta.js, js/laattapyramidi.js, js/mapart.js,
js/karttanimet.js, `?lauta=kartta`, LAUTA-kytkin, pyramidilaatat.

### 10.1 Sopimus: linssi pallolla

Jokainen linssi saa `pallolle(lauta, tila)`, joka piirtää linssin
pallon pinnalle ja palauttaa kahvan `{ pura() }`. `tila` on sama kuin
`piirra(ryhma, tila)`:lla (packId, map, askel …). Pallolaudalla
`ui.sytytaLinssi` kutsuu `pallolle`-funktiota; linssikarttaa ei enää
avata, kun linssillä on `pallolle`. Kun kaikilla on, linssikartta
poistetaan.

Piirto tapahtuu **vain** `lauta.linssit`-apurin (js/pallolauta/linssit.js)
kautta — linssi ei koske Globe.gl-instanssiin suoraan:

| kutsu | Globe.gl | datum |
|---|---|---|
| `kalvo(osa, { kuva, peittavyys })` | oma pallokuori (THREE.Mesh, säde × 1.002, MeshBasicMaterial map + transparent) | tasavälinen (equirectangular) kuva; rasteri (topografia, vesistöjen pohja) |
| `polut(osa, lista)` | `pathsData` osarekisterin kautta (reitit.js `aseta(osa, lista)` kuten merkit.js) | `{ avain, pisteet: [[lat, lng]…], vari, paksuus, katko }` |
| `polygonit(osa, lista)` | `polygonsData` (UUSI kerros; PALLOLAUDAN_KERROKSET saa sen) | `{ avain, geometry: GeoJSON Polygon/MultiPolygon, vari, reuna, korkeus, napautus(d) }` |
| `merkit(osa, lista)` | `merkit.aseta(osa, lista)` (htmlElementsData) | `{ avain, laji: 'linssi', lat, lng, elementti(d), asettele?(el, d) }` |
| `kalvoRuudulle(osa, { reika })` | CSS-kalvo kotelon päälle, reikä ruutupisteessä (`lauta.ruudulla`) | aikajanan tummennus; ei SVG-maskia |
| `pura(osa)` | kaikki osan kerrokset pois siirtymällä | — |

Koordinaatit: laudan (x, y) → `lauta.asteet(kohta)` → `{ lat, lon }`;
GeoJSON laudalle ja pallolle: js/geo.js (`pallolle`, `laudanProjektio`).
Elementtikatto, rasterointi ja `class`/`filter`-kiellot (linssit.md 1.3,
1.4, 1.7) eivät koske palloa; kerrosten määrää vartioi
tests/pallolauta.test.mjs.

### 10.2 Aallot (Opus-agenttiparvi, Fable koordinoi)

| aalto | osa | tiedostot | koko |
|---|---|---|---|
| 1 | linssimoottori `lauta.linssit` + topografia (kalvo) + sytytaLinssi-kytkentä | js/pallolauta/linssit.js (uusi), lauta.js, reitit.js, js/linssit/topografia.js, js/ui.js, sw.js, tests | M |
| 1 | vesistöt: pohja (kalvo), joet (polut), järvet (polygonit) | js/linssit/vesistot.js, packs-muunnos lat/lng | M |
| 1 | vertailu + maatiedot: maapolygonit ja nimet, napautus | js/vertailu.js, js/geo.js | L |
| 1 | etusivu: etusivupallo oletukseksi, pienoiskartta pois | js/etusivupallo.js, js/kartta.js, css, index.html | M |
| 2 | keksinnöt/aikajana: valot merkkeinä, tummennus kalvona, kamera pallolle | js/aikajana.js, js/linssit/keksinnot.js | L |
| 2 | radio: kaupunkinapit merkkeinä | js/linssit/radio.js, js/ui.js | M |
| 3 | ~~poisto~~ → KUMOTTU 5.9.2026 ilta (Raamattu VANHA KARTTA JAA VIVUN TAAKSE): 3A lähtökaupungin valinta pallolle; vanha kartta jää vivun taakse linssipinnaksi isoille alueille, ei alustu pallolaudalla | js/ui.js, js/pallolauta/avaus.js | M |

Toteutusmerkinnät kirjataan tämän luvun loppuun aalloittain.

### 10.3 Toteutusmerkinnät

**Aalto 1A — linssimoottori ja topografia (5.9.2026).** Sopimuksen 10.1
taulukko on toteutettu tiedostossa `js/pallolauta/linssit.js`
(`luoLinssit`): `kalvo`, `polut`, `polygonit`, `merkit`,
`kalvoRuudulle`, `pura`. Muutokset:

- **Osarekisterit.** `js/pallolauta/reitit.js` sai `aseta(osa, lista)`
  samaan tapaan kuin `merkit.js`; pelin naapurireitit ovat osa `peli`,
  linssien viivat lisätään perään ja yksi `pathsData`-kutsu yhdistää.
  `pathStroke` ja katko luetaan nyt datumista (pelin reitit saavat
  oletuksensa).
- **Uusi kerros.** `polygonsData` on `PALLOLAUDAN_KERROKSET`-listalla
  LINSSIN kerroksena; peli ei piirrä sinne mitään
  (tests/pallolauta.test.mjs, tests/pallo.test.mjs, tests/pallonimet.test.mjs
  päivitetty samalla kommentilla).
- **Kalvo.** THREE haetaan heijastuksella pallon näyttämöstä (Globe.gl ei
  vie sitä ulos): pinnan pallomesh antaa Meshin ja geometrian, jonkin
  materiaalin `map` antaa Texturen. Kalvo on pinnan SISARUS, koska
  laattamoottori pitää pinnan oman meshin piilotettuna. Säde on
  1,0015 × pinta eikä 1,002: reittiviivat ovat korkeudella 0,002, ja
  samassa pinnassa kaksi kerrosta välkkyisi toistensa läpi.
- **Topografia.** `js/linssit/topografia.js` sai `pallolle(lauta)`, joka
  pyytää yhden kalvon peittävyydellä 0,72. Kuva on uudelleenprojisoitu
  laudan Milleristä tasaväliseksi (`tools/tee-pallotopografia.mjs` →
  `assets/linssit/topografia-pallo.webp`, 4096 × 2048, 431 kt; navat
  läpinäkyviä, koska lauta kattaa 76° P … 58° E). Selitekortti toimii
  kuten ennen; kaistat eivät koske palloa.
- **Käyttöliittymä.** `ui.pallolinssiKelpaa` on se yksi portti, joka
  päättää piirretäänkö pallolle vai avataanko linssikartta;
  `ui.sytytaLinssi` kutsuu `pallolle`:a ja `ui.sammutaPallolinssi`
  kahvan `pura()`:a. Nukkuva kartta ei enää unohda pallolinssin
  valintaa. `drawTargets` sai portin nukkuvalle kartalle (radion ja
  linssin tahdistus kutsuu sitä myös pallolla, jolloin `targetLayer`
  ei ole olemassa).
- Vartijat: `tests/pallolinssit.test.mjs` (uusi). Selaimessa varmistettu
  Chromiumilla: kalvo syttyy, osuu maantieteellisesti kohdalleen,
  linssikarttaa ei avata, "Ei linssiä" purkaa kalvon ja uudelleensytytys
  toimii.

**Aalto 1B — vesistöt pallolle (js/linssit/vesistot.js).** Linssi sai
`pallolle(lauta)`, joka kutsuu `lauta.linssit`-apuria neljästi: kalvo
(reliefi tasavälisenä, `TOPOGRAFIA_PALLOKUVA` =
`assets/linssit/topografia-pallo.webp`, peittävyys 0,72), polygonit (38
järveä GeoJSON-renkaina, korkeus 0,003), polut (84 pengertä + 169 uomaa
= 253, paksuus asteina 0,14/0,10 ja 0,06/0,04/0,025 tärkeysluokittain)
ja merkit (20 tärkeimmän joen nimet, `.pallolauta-vesinimi`; kytkin
`VESINIMET_PALLOLLA`, ohitetaan jos merkit-osaa ei ole). Muunnos on
puhtaana funktiona `vesistotPallolle({ maasto, nimet }, asteet)` — ei
selainta, ei Globe.gl:ää — ja se ajetaan kerran, tulos muistiin.
Pehmennystä ei ole (pathResolution riittää); yli 2° välit tihennetään
isoympyrällä ja kiertävän laudan sauma katkaisee polun. Vartiointi:
tests/vesistot-pallolla.test.mjs. AVOIN: pathStroke on asteita, joten
uoma ohenee maailmankuvassa alle pikselin — jos apuri joskus asettaa
listat uudelleen kameran pysähtyessä, paksuudet on kerrottava korkeudella.

**Aalto 1C — vertailu ja maaselain pallolle (js/vertailu.js).**
Molemmat tilat piirtävät maat pallolaudalla laudan linssiapurilla:
`polygonit('vertailu' | 'maatiedot', …)` (datum `{ avain: iso,
geometry, vari, reuna, korkeus 0,004, napautus }`) ja vertailussa
lisäksi `merkit('vertailu-nimet', …)` maan keskukseen samalla
leveysehdolla kuin kartalla (`leveys >= 60`, 126 nimeä 133 maasta);
tilan sammuessa `pura('vertailu')` + `pura('vertailu-nimet')` ja
`pura('maatiedot')`. Valinnan vaihtuessa lista asetetaan uudestaan
(värit) — kerrosta ei pureta. Sävyt ovat samat kuin css:n
`.vertailu-maa` ja `.maatiedot-maa` (rgba-merkkijonoina, koska pallon
pinnalla ei ole css:ää); kolmas sävy `himmea` on pallon oma lisä
täydelle vertailulle, jossa hiiren osoitinta ei ole kertomassa
napautettavia maita. Ele on kummallakin laudalla sama: vertailu kerää
maat alapalkkiin, maaselain valitsee maan ja maakyltti avaa lehden
(kyltti asuu mapPanessa, ei laudassa, joten se toimii sellaisenaan).

Muunnos on puhtaana funktiona `maapolygonitPallolle(map, asteet)` — ei
selainta, ei Globe.gl:ää — ja se ajetaan kerran pakkaa kohti (WeakMap):
maailmankartalla 133 maata, 400 rengasta, 26 220 pistettä, 53 ms.
Kiertävän laudan sauma puretaan renkaan sisällä (peräkkäiset pisteet
pidetään lähekkäin) ja rengas siirretään takaisin keskelle, joten
Venäjä, Fidži ja Aleutit jäävät ehjiksi kappaleiksi eikä yksikään
renkaan sivu ylitä 180:tä astetta (mitattu suurin 27,6°, Kanada).
Jokainen rengas on oma monikulmionsa (MultiPolygon), koska laudan
aineisto ei erottele saaria ja reikiä. Vartiointi:
tests/maapolygonit-pallolla.test.mjs.

AVOIN (tarvitsee lauta.js-muutoksen, ei tehty tässä aallossa):
kaupunkien PISTEET ovat Globe.gl:n `pointsData` eivätkä DOM-elementtejä,
joten body-luokka ei piilota niitä. Css piilottaa nyt pallon
DOM-merkit (`.pallolauta-nimi/-nosto/-piste/-kohde/-nappula`) näissä
tiloissa; pisteitä varten `js/pallolauta/lauta.js` tarvitsee ehdon
`pisteNakyy`-funktioon (esim. `maatEdella()` = body-luokka
`vertailu-tila` tai `maatiedot-tila` → epätosi) sekä nimien katoksi 0
`ladoLevossa`-funktiossa, ja luokkien vaihto on jo kuunneltu
(`valovahti`-MutationObserver → `paivitaPisteet` + `pyydaLadonta`).

**Aalto 1D — etusivu pallolle (5.9.2026).** (1) Etusivun
esirenderöity pallo (js/etusivupallo.js, vaihe 5a) on PALLOLAUDALLA
OLETUS ilman lippua; lippu jäi poiskytkimeksi (`?etusivupallo=0`,
ratasvalikon vipu), ja `?lauta=kartta` pitää etusivun vielä vanhassa
pienoiskartassa (poistuu aallossa 3). (2) Lippu muutti osoitetta: se
asuu nyt js/ui-apurit.js:ssä laudan valinnan vieressä ja
js/etusivupallo.js vie sen edelleen ulos, koska js/ui.js:n mount päättää
ENNEN ensimmäistä piirtoa, alustetaanko tasokartta — se ei voi odottaa
dynaamista tuontia. Oletus on `lautaValinta() === 'pallo'`, ja
poiskytkentä tallentuu arvona '0' (oletuksen mukainen valinta poistaa
avaimen, kuten laudalla). (3) TASOKARTTA EI ALUSTU ETUSIVUA VARTEN:
mount panee `kartta.lepotila`n päälle myös lähtövalinnassa
(`etusivunPalloKaytossa`), ja renderin pallohaara ei enää herätä karttaa
pickstart-vaiheessa. Mitattu 390×844 dpr 2: svg#board 188 → **0
elementtiä**, pyramidipyyntöjä 0 (oli 0 jo ennestään, koska avausnäkymä
ei zoomaa). (4) LÄHTÖKAUPUNKI VALITAAN YHÄ TASOKARTALTA: "Valitse
aloituskaupunki" herättää kartan lepotilasta (js/ui.js aloitaKartalta),
joten alustus maksetaan vasta napautuksesta eikä avausnäkymästä —
lähikuva, kohdepisteet ja Livian repliikit ovat entisellään. Kun
lähtövalintakin siirtyy pallolle, tämä herätys poistuu. (5) Varapolut:
reduced motion → juliste ilman videota; verkkovika tai vanhentunut
luettelo → kerrosta ei synny EIKÄ karttaa herätetä, jolloin ylälohkoon
jää pergamentti ja julisteotsikko (pelkkä paperi, ei koskaan tyhjä
ruutu); dist → dynaaminen tuonti kaatuu ja kartta HERÄTETÄÄN, jolloin
yhden tiedoston versio saa entisen pienoiskarttansa. (6) Vivun
poiskytkentä purkaa kerroksen SYNKRONISESTI js/ui.js:ssä ja pyytää koko
piirron (js/main.js), jolloin vanha pienoiskartta herää samassa
piirrossa. (7) Ylälohkon korkeus tulee pallolaudalla CSS:n varasijalta
(`--intro-kartta-korkeus`, 44 %), koska mittauksen tekee js/kartta.js
placeIntro vain hereillä — mitattu ero vanhaan (42 %) on silmällä
olematon. Portit: tests/etusivupallo.test.mjs (oletus laudan mukaan,
poiskytkin, lepotilan vartijat), tests/pallolauta.test.mjs ja
savuke-etusivupallo (E1d tasokartta ei alustu, E5d vanha kartta herää
lipulla pois, E8 pelkkä paperi) — savuke ajetaan nyt oletuslaudalla
eikä `?lauta=kartta`-tilassa.

**Aalto 2B — maailmanradio pallolle (js/linssit/radio.js).** Radio on
kartan TILA eikä kerros, joten pallolla muuttui tasan yksi asia:
kaupunkien play-napit. Linssi sai `pallolle(lauta)`, joka pyytää yhden
merkkiosan (`lauta.linssit.merkit('radio', …)`); datum on `{ avain:
kaupungin id, laji: 'linssi', lat, lng, elementti, asettele }` ja
elementti on div + svg (rooli `button`, `aria-label` "Kaupunki —
asema"), mitat RUUTUPIKSELEINÄ kuten muillakin pallon merkeillä
(laatikko 44 px = osuma-ala, rengas 13, hehku 21, ulkokehä 17). Kolme
ulkoasua ovat samat kuin kartalla (soiva, asema olemassa, ei asemaa) ja
karsinta on sama `radionKaupungit` (mitattu maailmankartalla 113 nappia,
110 kanavaa) — kiertoKohtia ei ole, koska pallolla ei ole saumaa.
Soivan aseman vaihtuessa lista asetetaan uudelleen SAMOILLA AVAIMILLA
(kerroMuutos → tahdistaPallonNapit), joten elementit siirtyvät eivätkä
synny uudestaan; `asettele` piirtää sisuksen vain kun asu vaihtui.
Soitin, pistenäyttö, viritysäänet ja js/packs/radiot.js ovat kartasta
riippumattomia eivätkä muuttuneet.

- **Napautus kulkee elementin kautta** — poikkeus riskin 3 R-malliin.
  Nappi ei koske peliin, ja se on ainoa joka tietää kaupunkinsa;
  `.pallolauta-merkki` on pointer-events: none, joten radion nappi
  kumoaa sen kaksiosaisella valitsimella (css/radio.css), ja pallon
  takana oleva (häivytetty) nappi ei ota napautusta.
- **Radiotila omistaa pallon.** Pinnan ja kaupunkipisteen napautus on
  vaiti radiotilassa (js/pallolauta/lauta.js napautaKaupunki,
  napautaKohde: `ui.radioPaalla()`) ja nopanheiton kohteet ovat piilossa
  (`body.radio-tila .pallolauta-kohde`) — sama kuin tasokartalla, jossa
  drawTargets piirtää radiotilassa vain radion napit. Kaupunkien nimet
  ja nappula jäävät kuten kartallakin.
- **Kamera ajaa vain kun asemaa ei näe.** Napautettu nappi on jo
  ruudulla; nauhalta voi valita aseman pallon toiselta puolen, ja
  silloin `lauta.kamera.ajaKamera` vie sinne (varmistettu selaimessa:
  Lontoo ei liikuttanut kameraa, Tokio ajoi 30/20 → 35,7/139,7).
- Vartijat: tests/radio-pallolla.test.mjs (uusi) ja ennallaan pysynyt
  tests/radio.test.mjs. Selaimessa varmistettu Chromiumilla: linssi
  'radio' → 113 nappia pallolla, soitin ja pistenäyttö näkyvissä,
  linssikarttaa ei avata; napautus virittää (soiva nappi punaisena);
  sulku vie napit, soittimen ja `radio-tila`-luokan.

AVOIN: kaupunkien PISTEET (Globe.gl pointsData) jäävät nappien alle
näkyviin — sama laudan `pisteNakyy`-muutos ratkaisisi tämän ja aallon 1C
saman avoimen kohdan kerralla; napit ovat pisteitä isompia, joten piste
ei ota napautusta itselleen.

**Aalto 2A — keksintölinssi eli aikajana-ajo pallolle (5.9.2026).**
`js/linssit/keksinnot.js` sai `pallolle(lauta)`, mutta itse piirto
vaihdetaan MOOTTORIN sisällä (js/aikajana.js): linssi on kerrokseton,
joten kahva vain purkaa laudan osan `aikajana`, ja ajon käynnistää kuten
ennen `ui.tahdistaAikajana`. Noin 80 % moottorista — kello, karuselli,
ilmiöpaneeli, avausjakso, välinäytös, musiikki, luenta, Tiedeliite,
lyhdyt, paneelin raahaus — on kartasta riippumatonta DOMia ja säilyi
koskemattomana. Kaksi asiaa oli tasokartan svg:tä, ja ne kääntyivät:

- **Valot.** `lauta.linssit.merkit('aikajana', …)`, datum
  `{ avain: 'aikajana:<i>', laji: 'linssi', lat, lng, elementti(d),
  napautus(d) }`. Elementti on sama neljän ympyrän lamppu samoilla
  luokilla (`aikajana-valo-kajo/-syke/-hehku/-pallo`) ja samoilla
  mitoilla, mutta divinä pallon pinnan pisteessä; se RAKENNETAAN HETI
  eikä vasta kirjaston tehtaassa, koska moottori lukee ja kirjoittaa
  lampun tilaa luokkina (`palaa`, `nykyinen`) myös silloin, kun merkki on
  pallon takana. Liukuvärit (`url(#aikajana-lamppu)`, `#aikajana-kajo`)
  tulevat linssin omassa piilotetussa svg:ssä, koska kartan `defs` ei ole
  olemassa. Koko on ruutuvakio → `merkkiSkaala`/`paivitaMittakaava` ja
  nipistyksen vastaskaalaus jäivät karttahaaraksi.
- **Tummennus.** `lauta.linssit.kalvoRuudulle('aikajana', { reika })`.
  Sävy on sama kuin css:n maskissa (`rgba(10, 7, 5, 0.86)`, puolivälissä
  0,35), reikä on 63 ruutupikseliä (`MERKIN_SADE × REIAN_SUHDE`) ja sen
  reuna pehmeä kolmella pysäkillä. Kartan maskissa on reikä joka
  palavalle lampulle; CSS-kalvolla reikiä on YKSI ja se LIUKUU lampusta
  toiseen (700 ms, lyhintä pituuspiiriä; reduced motion hyppää).
  Kalvo pyydetään `alle: true` — apuri sijoittaa sen kirjaston
  CSS2D-kerroksen ETEEN (`.scene-container`, mitattu Chromiumilla), jotta
  pinta, kaupunkipisteet ja reitit jäävät sen alle mutta lamput hehkuvat
  sen päällä. Pelin omat DOM-merkit (nimet, nappula, nostot) eivät jää
  kalvon alle, joten ne piilotetaan linssin ajaksi css:llä
  (`body.aikajana-paalla`) — kartalla ne jäävät 0,86:n tummennuksen alle
  eli käytännössä näkymättömiin.

**Napautus** kulkee laudan omaa R-mallia (riski 3): merkki ei ota
osumia (`.aikajana-valo-pallolla { pointer-events: none }` — kajon kehys
on 98 px ja söisi pallon pyörityksen), vaan `js/pallolauta/merkit.js`
sai `napautettavat()` ja `js/pallolauta/lauta.js` ratkaisee linssin
merkit ENNEN kaupunkeja ja nostoja (lamppu istuu usein täsmälleen
kaupungin päällä; myös kaupunkipisteen napautus antaa vuoron lampulle).

**Kamera** on `ui.kamera()` eli hereillä olevan laudan oma — pallolla
`js/pallolauta/kamera.js ajaKamera` samalla bbox-allekirjoituksella,
joten `sovitaKaareen`, avausjakson ajo ja paluu edelliseen näkymään
toimivat sellaisenaan. `vapautaKamera` ohitetaan pallolla: fokuslukko on
tasokartan oma eikä nukkuvaa karttaa saa herättää sen takia.
`ui.tahdistaAikajana` hakee linssin nyt TUNNUKSELLA eikä
kerrosmoottorista (pallohaarassa moottori on sammutettu, joten sen
`linssi` on null), ja aikajanan oma ✕/Esc päättää linssin myös
pallolaudalla (`pysaytaAikajana` ei enää katso pelkkää linssikarttaa).

Vartijat: tests/aikajanamerkit.test.mjs osio 1 b (samat säännöt pallolla:
merkit laudan apurille, syke, jälki, reiän liuku, kamera, purku),
tests/aikajana-pallolla.test.mjs (haarat ja kytkennät tekstinä).
Selaimessa varmistettu Chromiumilla 900×700: svg#board 0 elementtiä koko
ajon ajan, 25 lamppua htmlElementsDatassa, kalvo `.scene-container`in
lapsena merkkikerroksen edellä, kello ja karuselli ruudulla, avausjakso
ja Käynnistä toimivat, lampun napautus siirtää pysäkkiin (myös Lontoon
kaupunkipisteestä: pysäkki 1837 eikä kaupunkilehteä) ja "Ei linssiä"
palauttaa pallon entiseen näkymään (lamput 25 → 0, kalvo pois,
linssikartta false).

**Aalto 3A — lähtökaupungin valinta pallolle (5.9.2026).** Aalto 1D
jätti tähän yhden poikkeuksen (kohta 4: *"LÄHTÖKAUPUNKI VALITAAN YHÄ
TASOKARTALTA"*), ja se oli pallolaudan VIIMEINEN pelitoiminto, joka
herätti js/kartta.js:n: "Valitse aloituskaupunki" ajoi
`kartta.heraa()` → `zoomaaAloituskartta` → `drawTargets`. Nyt
valintanäkymä on pallon oma, eikä pallolaudalla ole enää yhtään
kutsua, joka herättäisi kartan (aalto 3B voi poistaa sen). Vanha kulku
säilyy `?lauta=kartta`-tilassa ja pallon varapolkuna.

- **Nappi haarautuu, ei muutu.** `js/ui.js aloitaKartalta` soittaa
  naksun ja häivyttää avaustekstin kuten ennen, ja jakautuu sitten
  kahdeksi: `aloitaPallolta` (uusi) ja `aloitaTasokartalta` (entinen
  runko sellaisenaan). Livian avausrepliikit lähtevät kummallakin
  laudalla samasta kutsusta (`naytaLivianAvaus`), tekstit ja äänet ovat
  ennallaan, ja valinta päätyy molemmilta `doPickStart`iin — peli ei
  tiedä kummalta laudalta valinta tuli.
- **Oma lippu, ei `aloitusZoom`.** Valintatilaa kantaa
  `ui.aloitusvalintaPallolla`, ja `ui.aloitusvalintaAuki()` yhdistää
  sen tasokartan lähikuvaan yhdeksi kysymykseksi. Syy on mitattu:
  `aloitusZoom` on TASOKARTAN tila, jonka js/kartta.js nollaa aina kun
  kartta nukahtaa (`nollaaAloitusZoom`) — ja juuri se tapahtuu, kun
  pallo avataan hereillä olleen kartan päälle (`?etusivupallo=0`),
  jolloin valintatila katosi samassa piirrossa kuin se syntyi.
- **Pallo avautuu jo pickstart-vaiheessa.** `pallolautaHalutaan` palaa
  pickstartissa lipun mukaan; muissa vaiheissa portti on entinen laudan
  pakka. Avausnäkymässä ylälohkossa on yhä kevyt esirenderöity
  pallovideo, ja se puretaan samassa piirrossa kuin lippu nousee
  (`renderIntro`), joten WebGL-lauta maksetaan vasta napautuksesta.
- **PALLON LAUTA ON AINA MAAILMANKARTTA.** Aloitusnäytön lauta
  (js/packs/maailma.js) on eri koordinaatistossa, eikä sen pisteitä voi
  projisoida pallolle. `js/pallolauta/lauta.js` ratkaisee siksi
  `pack`in kerran (`ui.game.pack.id === PALLO_LAUTA ? … :
  packById(PALLO_LAUTA)`) ja antaa saman pakan nimikerrokselle, joka
  muistaa aineistonsa (`luoNimet({ …, pack })`) — muuten välimuistiin
  olisi jäänyt väärän laudan pisteet. Pelin paikat (nappula, nopan
  lähtö, laattojen esilataus) kulkevat `pallonKohta`-apurin läpi, joka
  hakee kaupungin tunnuksella pallon laudalta silloin kun pelin lauta
  on toinen; ilman sitä matkaajan nappula seisoi valinnassa
  Tyynellämerellä.
- **Valittavat ovat pallon kohdemerkkejä.** `ui.aloitusvalinnanKohteet`
  antaa ETUSIVUN_KOHTEET-kaupungit (sama joukko ja sama "vasta napin
  jälkeen" -portti kuin `drawTargets`), ja laudan `kohdevalinta` työntää
  ne merkkikerroksen osaan `peli` lajilla `kohde` — täsmälleen sama
  datum ja sama `kohdeElementti` kuin nopanheiton kohteilla, joten halo,
  kultalevy ja nimi tulevat samasta säännöstä. Napautus on laudan oma
  R-osuma (`napautaKohde` → `ui.doPickStart(kohde.city)`); Lontoo on
  lähtöpiste eikä valinta, joten sen napautus on vaiti
  (kehittäjän maailmanäkymä ohittaa tämän kuten kartallakin).
- **Niukkuus samasta joukosta.** `ui.aloitusvalinnanNakyvat`
  (ETUSIVUN_NAKYVAT) rajaa pallolla nimet (`nimet.lado` `vain`, katto 2)
  ja pisteet (`pisteNakyy`) samaan kahteen kaupunkiin, joihin
  tasokartta rajaa aloituskartan (`paivitaAloituskaupungit`).
- **KAMERA TÄHTÄÄ LAATIKON ETELÄPUOLELLE.** Ensimmäinen toteutus rajasi
  Lontoon ja Ateenan avauslennon omalla laatikolla
  (LENNON_RAJAUKSEN_MARGINAALI 0,35). Mitattu Chromiumilla 390 × 844:
  pallon perspektiivi levitti molemmat ruudun laitoihin puoliksi
  leikkautuneina, ja Ateena jäi TÄSMÄLLEEN Livian kuplapinon alle —
  napautus meni kuplaan eikä kaupunkiin. Omistajan sääntö *"kuplat
  eivät estä valintaa"* (29.8.2026) pitää siis pallollakin, joten
  `aloitusnakyma` käyttää reilumpaa marginaalia
  (ALOITUSVALINNAN_MARGINAALI 0,8) ja siirtää keskipistettä etelään
  ruudun korkeudesta lasketulla varalla (ALOITUSVALINNAN_KUPLAVARA
  0,34): sisältö nousee ruudulla kuplien yläpuolelle. Kamera-ajo on
  laudan oma (`lauta.kamera.ajaKamera`), ja `avaaPallolauta` kutsuu sitä
  `kotiin`-ajon sijasta, koska matkaajalla ei vielä ole paikkaa.
- **Häivytetty avausteksti ei ota napautuksia.** Tasokartalla teksti
  työntyy ruudun alle (`.intro-pois`), pallolla se vain häipyy — ja
  näkymätön "Valitse aloituskaupunki" (`.intro-valinta` on
  pointer-events: auto) olisi vienyt pallon pyörityksen. Css sulkee
  `.intro.intro-fade`-puun kokonaan sormelta.
- **Varapolku.** Jos Globe.gl kaatuu kesken valinnan,
  `pallolautaVarapolku` nollaa lipun ja antaa valinnan kartalle
  (`aloitaTasokartalta`) — muuten valinta jäisi yleiskuvaan ilman
  kohdepisteitä.
- Vartijat: tests/aloitus-pallolla.test.mjs (uusi) sekä päivitetyt
  tests/pallolauta.test.mjs, tests/etusivupallo.test.mjs ja
  tests/pallonimet.test.mjs; savuke-etusivupallo sai vartiot E9a–E9d
  (nappi ei herätä karttaa, valittavat ovat pallon kohdemerkkejä,
  kuplat eivät peitä niitä, napautus käynnistää pelin) ja ajaa
  Chromiumin nyt ohjelmistorasteroijalla, jotta pallo rakentuu.
  Selaimessa varmistettu 390 × 844 dpr 2 ilman tallennetta: avausnäkymä
  → "Valitse aloituskaupunki" → valintatila (kartta.lepotila true,
  svg#board 0 elementtiä, 1 kohdemerkki `aloitus:ateena`, nimet Lontoo
  ja Ateena, 2 pistettä, nappula Lontoossa) → Ateenan napautus →
  vaihe 'action', pakka 'maailmankartta' → avauslento pallolla (1 kaari,
  1 kone, harso, repliikki). Vanha kulku `?lauta=kartta` ennallaan
  (svg#board 206 elementtiä, 1 kohderengas).

**Avauslento: paksu viiva, zoom, pyörintä, kuva ilman isoisää (5.9.2026
ilta).** Omistaja työpöytäkaappauksesta klo 23.10, sanatarkasti: *"tähän
pitää vaihtaa uusi kuva jossa isoisää ei tunnista. lentokone saisi tehdä
saman paksun viivan kuin etusivulla. näkymä saisi olla zoomautunut
hieman lähemmäs. pallo voisi pyöriä hitaasti lennon aikana."*

- **Paksu punainen viiva.** `js/pallolauta/avaus.js` antaa
  viivakerroksen osaan `avauslento` KOKO kaaren kerralla
  (`reitit.js jalki(pisteet, { paksuus, osuus })`) ja kasvattaa lennon
  aikana vain `osuus`-lukua: viiva piirtyy KATKOVIIVANA, jonka viivaosa
  on kuljettu osuus ja väli 1. **Miksi näin:** joka kehyksen pistelistan
  kirjoitus jätti viivan ruudulla lennon ensimmäisen pätkän mittaiseksi
  Lontoon viereen (mitattu Chromiumilla) — Globe.gl rakentaa Line2:n
  geometrian `interpolK`-tweenin kautta, mutta katkoviivan luvut
  kirjoitetaan materiaaliin joka päivityksellä. Väri on
  `REITIN_VARIT.avauslennonJalki` = `rgba(194, 69, 47, 0.92)` eli
  täsmälleen css `.etusivupallo-viiva` (#c2452f), ja paksuus on sama
  luku 11 kuin sen `stroke-width`. **MITATTU: `pathStroke` on tässä
  Globe.gl-versiossa RUUTUPIKSELEITÄ, EI ASTEITA** — viiva on Line2,
  jonka LineMaterialissa `worldUnits` on epätosi ja `resolution` kotelon
  koko css-pikseleinä (374 × 777), ja varjostin laskee
  `offset *= linewidth; offset /= resolution.y`. Ensimmäinen toteutus
  laski paksuuden asteina (0,89) moduulien kommenttien mukaan, ja viiva
  jäi alle pikselin levyiseksi eli näkymättömiin. **AVOIN:** samat
  "asteina"-kommentit ovat myös `MATKAREITIN_PAKSUUS_AST` (0,05),
  `LENTOKAAREN_PAKSUUS_AST` ja linssien uomapaksuuksissa; ne piirtyvät
  siis paljon ohuempina kuin oli tarkoitus (kaaret ovat putkia ja
  käyttäytyvät eri tavalla). Korjaus on oma työnsä. Jälki kulkee
  koneen kaarella eikä pinnalla — kone ja jälki lukevat saman kaavan
  (`reitit.js lentokaarenKohta`) ja saman kellon (`hypynVaihe`), joten
  viivan kärki on tasan koneen alla. Kerros sai per-piste-korkeuden
  (`pathPointAlt` kolmiluvusta `[lat, lng, korkeus]`). Katkoviivakaari
  jää hennoksi suunnitteluviivaksi jäljen alle
  (`REITIN_VARIT.avauslennonSuunnitelma`, peittävyys 0,3). Jälki jää
  näkyviin lennon jälkeen ja katoaa vasta `pura()`:ssa saapumiskortin
  alla; poisto palauttaa kerroksen siirtymän, joten se häipyy pehmeästi.
- **Zoom.** Avauslennolla on oma marginaali
  (`AVAUSLENNON_RAJAUKSEN_MARGINAALI` 0,2) tavallisen lennon 0,35:n
  sijaan: Lontoo → Ateena 44,3° → 36,5° (1400 × 900) ja 40,6° → 33,4°
  (390 × 844).
- **Hidas pyörintä.** `AVAUSLENNON_PYORINTA_AST` (5°) koko lennon
  mitalla, `pyorinnanPehmennys`-liu'ulla (pehmeät päät, lähes tasainen
  väli). Rajauslaatikkoa siirretään lähtöön puoli pyörintää lännemmäs,
  jolloin kamera SEURAA konetta ja KONE on kuvassa lennon molemmissa
  päissä. Mitattu Chromiumilla: työpöydällä (kotelo 1379 × 826) varaa
  reunaan 183 px joka suuntaan; puhelimella (374 × 777) kone on kuvassa
  sekä lähdössä (x 115) että perillä (x 356) — parannus, sillä ennen
  tätä Ateena jäi 11 px kotelon oikean reunan ULKOPUOLELLE koko lennon
  ajan. Reitin toinen pää saa valua kuvasta lennon kuluessa. Ajo on
  laudan oma `ajaKamera`, joten ele keskeyttää sen; reduced motionissa
  ei pyöritä eikä siirretä laatikkoa. Kuljettajan oma
  `LENNON_KAMERA_MS`-ajo korvautuu tällä samassa kehyksessä.
- **Kuva, jossa isoisää ei tunnista.** Lento lukee vain
  `ISOISAN_VALOKUVAT.lento`-avainta (js/isoisan-valokuvat.js), joka on
  YKSI VAIHDETTAVA PAIKKA: kuvaputken uusi kuva vaihdetaan siihen
  yhdellä rivillä (omistaja klo 23.15: *"kohta pitäisi tulla isoisän
  uusia kuvia, niin käytä niitä ennemmin"*), ja `rajaus` on
  VALINNAINEN. Kuva on kuvaputken 5.9.2026 illalla toimittama
  `isoisa-bombay-aged-r20260905-v1`: isoisä astuu veneeseen selin
  kameraan Bombayn satamassa — hän on kuvassa mutta ei hahmotu
  (Raamattu: ISOISA JAA ARVOITUKSEKSI). Kuva näytetään KOKONAAN
  paperireunoineen, ilman rajausta: vaalea vinjetti on jo kuvassa eikä
  pahvireunusta ole. Kuvateksti on omistajan sanoin *"Isoisä, Bombay,
  1873"* — paikka ja vuosi, ei ulkonäköä.
- Vartijat: tests/pallolauta.test.mjs (neljä uutta) ja päivitetty
  tests/isoisan-valokuvat.test.mjs. Selaimessa varmistettu Chromiumilla
  (swiftshader, r2.dev Noden fetchillä) 1400 × 900 ja 390 × 844.

**Mitä js/kartta.js:stä pallolauta vielä ajaa (mitattu aallon 3B
työlistaksi).** Kartta-olion metodit käärittiin selaimessa laskuriin ja
peli pelattiin läpi avausnäkymästä ensimmäiseen nopanheittoon asti
(Chromium 390 × 844). Lepotilassa kutsuttiin VAIN näitä seitsemää:

| metodi | mistä | mitä tekee lepotilassa |
|---|---|---|
| `fitViewBox` × 3 | mount, ResizeObserver, showAloitusportti | palaa heti (lepotilan portti) |
| `boardBounds` × 1 | showAloitusportti (`ui.contentBox`) | laudan rajat pakan datasta |
| `withIntroSpace`, `introKaistaKaytossa` | boardBoundsin sisältä | avaustekstin kaista |
| `nuku` × 2 | `avaaPallolauta`, `doPickStart` | lepotilan asetus |
| `dieRestingSpot`, `kiertava` × 1 | `animateDie` (nopan lepopaikka) | ruutupiste ja kierron leveys |

`heraa` ei kutsuttu kertaakaan — lähtövalinta oli sen viimeinen kutsuja
(tämä aalto). Jäljellä on siis kolme oikeaa riippuvuutta: laudan rajat
aloitusportin mitoituksessa, nopan lepopaikka ja kierron leveys. Kaikki
kolme ovat pakan dataa eivätkä piirtoa, joten ne siirtyvät pieninä
funktioina laudan omaan moduuliin. NELJÄS on linssikartta: kuori
(js/pallolauta/linssikartta.js `ui.kartta.heraa/nuku/ajaKamera/
kameranTila`) herättää kartan sille linssille, jolla ei ole
`pallolle`-funktiota — mutta 5.9.2026 rekisterissä
(js/linssit/rekisteri.js) EI OLE ENÄÄ YHTÄÄN sellaista: topografia,
vesistöt, vertailu, maatiedot, keksinnöt ja radio ovat pallolla, ja
seitsemäs (`pallo`) on toiminto eikä kerros. Kuori on siis jo nyt
kuollutta koodia, ja `ui.pallolinssiKelpaa` on ainoa portti, joka
päättää asian. Aallon 3B työlista on siis:
(1) `ui.pallolautaPaalla`/`kamera()`/`paivitaPallolauta` -portit ja
`kartta.lepotila` kokonaan pois, kun tasokarttaa ei enää ole;
(2) linssikartan kuori ja `ui.avaaLinssikartta`/`suljeLinssikartta`
pois, kun jokaisella linssillä on `pallolle`; (3) `ui.puraLauta`,
`drawBoardFor`, `drawTargets`, `drawTokens`, `drawPawns`,
`paivitaFokusKerros`, `paivitaAloituskaupungit`, `zoomaaAloituskartta`,
`aloitaTasokartalta` ja `tasokartanLentokohtaus` pois;
(4) `pallolautaVarapolku` ja `palloTurvatila` uusiksi — ilman
tasokarttaa varapolku on jokin muu (ilmoitus, uudelleenyritys);
(5) tiedostot js/kartta.js, js/linssit/kerros.js,
js/pallolauta/linssikartta.js, js/laattapyramidi.js ja js/mapart.js
sekä `?lauta=kartta` ja LAUTA-kytkin pois.

HUOM luvun 10 inventaarioon: **js/karttanimet.js EI POISTU** aallossa
3B, vaikka luvun alun lista niin sanoo. Pallo latoo nimensä sen
funktioilla (`ladoRuutunimet`, `karttanimienKaupungit`,
`KARTTANIMI_FONTTI`, `KARTTANIMI_KOOT` —
js/pallolauta/{nimet,nostot}.js), ja se on tarkoituksellista: ladonnan
sääntö on YKSI molemmille laudoille. Tiedostosta poistuu vain se osa,
joka piirtää tasokartan svg:hen.

**Etusivupallo koko sivulle (5.9.2026 ilta).** Omistaja sanatarkasti
klo 21.30: *"pallo saisi pyöriä koko etusivun alalla. isoisän kuva
saisi olla isompi ja vaihtua aina samaan paikkaan"* — ja klo 21.45:
*"animaatio pitää mennä koko maapallon ympäri niin että se voi loopata.
eli pysähtyy lontooseen ja punainen viiva ottaa kiinni lopuksi"*.
Kolme muutosta js/etusivupallo.js:ään, css/styles.css:ään ja
tools/tee-etusivupallo.mjs:ään; uusi videoversio on
`ETUSIVUPALLO_VERSIO = '2026-09-05c'` (työnkulku tee-etusivupallo on
ajettava, ennen sitä etusivu on varapolullaan pelkkää pergamenttia).

1. **Kerros koko paneelin taakse.** Kerros syntyy nyt `.intro`-paneelin
   ensimmäiseksi lapseksi eikä `.intro-kartta`-ylälohkoon, ja video
   rajataan `object-fit: cover` (ennen `contain`, jolloin työpöydällä
   pallo oli kapea neliö keskellä ja alalohko tyhjää pergamenttia).
   Video ja SVG saavat SAMAN muunnoksen yhdestä paikasta:
   `SOVITUS_TAPA = 'cover'`, `SVG_SOVITUS.cover = 'xMidYMid slice'` ja
   puhtaat funktiot `kerroksenSovitus` + `videostaRuudulle`. Kahva
   tarjoaa `koneRuudulla(t)`:n samasta laskennasta. Vartiot:
   tests/etusivupallo.test.mjs (sovitus = SVG:n slice-kaava pikselilleen,
   kone kuvassa 390×844 / 768×1024 / 1400×900 / 2000×1300, CSS ja
   moduuli sopivat rajauksesta) ja savuke E1e/E1f/E10a/E10b (selaimen
   laskema koneen ruutupiste vs. moduulin oma, alle 2 px).
   Luettavuus: sumuverho kevennettiin 0,44 → 0,38 ja avaustekstin sekä
   julisteotsikon TAAKSE tuli paikallinen pergamenttiharso
   (`::before`-liukuväri, ei suodattimia — iOS-sääntö). Harso on
   pseudo eikä elementin tausta juuri siksi, ettei se saa kasvattaa
   laatikoita: padding veisi isoisän kortilta sen kaistan.
2. **Isoisän kuva kiinteään paikkaan ja isommaksi.** Esteväistö
   (`valitseKuvapaikka`, `sijoitaKuva`, kutistussarja) POISTUI, ja
   paikan antaa CSS: puhelimella ja tabletilla julisteotsikon ja
   avaustekstin väliin oikeaan laitaan (`top: 37,25 %`,
   `width: clamp(110px, 28vw, 176px)`), työpöydällä (≥ 900 px)
   paneelin oikeaan alanurkkaan (`clamp(170px, 18vw, 260px)`).
   Kuvateksti on yhdellä rivillä ja kallistus loiva (−3°), koska
   puhelimen vapaa kaista on mitattuna vain ~95 px. Kortteja on KAKSI
   päällekkäin: vaihto on aito ristihäivytys. Varmistuksena (ei
   väistönä) `varmistaPaikka` siirtää korttia pystysuunnassa
   (`--etusivupallo-kuva-siirto`), jos kiinteä paikka jollain
   kirjasinkoolla osuisi otsikkoon tai tekstiin — sama luku molemmille
   korteille, joten paikka ei vaihdu kuvien mukana. Mitattu Chromiumilla
   kolmessa koossa: ei leikkausta avaustekstiin, otsikkoon, nappeihin
   eikä äänet/aloitus-riviin.
3. **Kierros on 360° ja looppaa saumatta.** `ETUSIVUN_REITTI` on nyt
   Foggin kierros Lontoo → Pariisi → Kairo (Suez) → Mumbai (Bombay) →
   Kolkata → Singapore → Hongkong → Tokio (Jokohama) → San Francisco →
   New York → Lontoo. `reitinPisteet` muuttaa paluun nollaeron täydeksi
   kierrokseksi, joten pituusasteiden kierto on tasan 360,000°.
   `koneenTila` on JAKSOLLINEN (kelaa sauman yli ja lisää 360° per
   kierros), jolloin myös kameran silotus on jaksollinen ja kehys
   hetkellä KESTO on sama kuin hetkellä 0. Kierroksen lopussa on
   `LOPPU_PITO_S = 2,6 s` mittainen jakso ilman matkaa: KONE PYSÄHTYY
   LONTOOSEEN, punainen viiva sulkee ympyrän (kärki koneen ja jäljen
   alkupisteen kohdalla), ja vasta pidon viimeinen `HAIVYTYS_S = 1,1 s`
   häivyttää SVG:n pois ennen loopin alkua. Video ei enää häivy —
   työkalusta poistui `window.haivyta`. Kesto on 49,6 s
   (`JAKSON_POHJA_S = 1,0`, `JAKSON_ASTE_S = 0,115`), eli 744 kehystä
   15 fps:llä; kehykset jaetaan tasan kierrokselle
   (`t = i × KESTO / KEHYKSIA`) ja ffmpeg saa murtolukuisen taajuuden
   (`KEHYKSIA / KESTO`), jotta videon kesto on tasan kierros. Työkaluun
   tuli `--sauma`-koe, joka polttaa vain kehykset t = 0 ja t = KESTO ja
   vertaa ne tavu tavulta; kontissa ajettuna 5.9.2026: **kameran
   lon-ero 360°:sta 0,0 ja kehykset identtiset (pikseliero 0)**.
   Työkalu kaatuu heti, jos reitti ei kierrä 360°, ja esilämmitys
   nostettiin 12 → 24 näytteeseen (kierros käy nyt koko maapallon
   ympäri, joten laattoja tarvitaan kaksin verroin).

**Isoisän kuvat pinona, haaleina, tekstin alla (5.9.2026 klo 22.45).**
Omistaja sanatarkasti: *"isoisän kuvat voivat olla blurrattuja ja
haalealla ja jäädä tekstin alle"* ja *"ne voisivat pinoutua hieman sikin
sokin toistensa päälle"* — sekä klo 22.50: *"käytetään niitä uusia jotka
toivottavasti olet saanut kuvaputkelta, jotka ovat aika vaaleita
(vinjetti vaaleaan)"*. Muutos korvaa yllä olevan kohdan 2 (kiinteä
paikka, ristihäivytys):

- **Kerrosjärjestys ratkaisee.** Pino (`.etusivupallo-pino`) on oma
  kerroksensa `.intro`-paneelissa: video 0, sumuverho 1, PINO 2,
  otsikko- ja tekstilohkot 3. Kortit siis jäävät tekstin alle, ja juuri
  siksi esteväistö (`varmistaPaikka`, `--etusivupallo-kuva-siirto`) ja
  koko pystysiirto poistuivat ja kortti kasvoi: puhelin/tabletti
  `clamp(160px, 46vw, 250px)` keskellä alaosaa, työpöytä
  `clamp(200px, 34vw, 420px)` oikeassa alaneljänneksessä.
- **Haalea ja sumea, KUVAKOHTAISESTI.** `<img>`-elementillä
  `opacity: calc(var(--kuvan-haalea) + var(--pino-harsokorjaus))` ja
  `filter: blur(var(--kuvan-sumennus))`. Arvot tulevat pakan sävystä
  (tumma 0,55 / 1,5 px, vaalea 0,85 / 1,2 px), koska kuvaputken uudet
  vedokset ovat vaaleita. Harsokorjaus (+0,25 alle 900 px) kompensoi
  avaustekstin pergamenttiharson, joka lepää pinon päällä pienillä
  ruuduilla. Suodatin `<img>`-elementillä on TIETOINEN poikkeus
  iOS-sääntöön (sääntö koskee kartan SVG-kerroksia) ja staattinen, joten
  se jää myös reduced motion -tilassa.
- **Pino sikin sokin, katto viisi.** Jokainen laskeutuminen luo uuden
  kortin pinon päälle siemenelliseen asentoon (`pinonAsento(nro)`:
  siirto ±5 % kortin koosta, kallistus ±8°) — sama laskeutuminen aina
  samassa asennossa, joten kaappaukset ja savuke ovat vakaita. Siemen on
  laskeutumisnumero eikä kuvan indeksi, koska kahdella kuvalla
  kuvasidonnainen asento pinoaisi kortit täsmälleen päällekkäin.
  Laskeutuminen animoidaan 700 ms (pieni pudotus + kallistuksen
  asettuminen); kuudennen laskeutuessa alin häivytetään 620 ms:ssa.
  Loopin vaihteessa PINOA EI TYHJENNETÄ: viiden kortin yhtäaikainen
  katoaminen osuisi juuri siihen saumaan, jonka video ylittää
  huomaamatta — katto hoitaa siivouksen yksi kortti kerrallaan.
- **Kuvateksti vain päällimmäiselle** (`.uusin`), terävänä ja täydellä
  peittävyydellä: viisi kallistettua lappua päällekkäin olisi
  lukukelvoton mössö. Teksti on paikka + vuosi ("Bombay, 1873"), ei
  henkilökuvausta (Raamattu: ISOISA JAA ARVOITUKSEKSI).
- **Kuvat ovat DATAA**: `js/packs/etusivun-isoisakuvat.js` (tunnus,
  osoite, kuvateksti, kaupunki = reitin jakso, sävy, rajaus). Kuvaputken
  toimitus lisätään sinne yhtenä rivinä; pakan otsikkokommentissa on
  ohje ja odottavien kahdentoista kuvan tunnukset. Vartiot:
  tests/etusivupallo.test.mjs (kerrosjärjestys, pinon katto,
  deterministinen asento, ei esteväistöä, kuvateksti paikka + vuosi) ja
  savuke E4a–E4j. Kaapattu Chromiumilla 390×844 / 768×1024 / 1400×900
  (vanhalla 05b-videolla): teksti pysyy luettavana kolmen kortin pinon
  päällä kaikissa kolmessa.

AVOIN: työpöydällä video suurennetaan cover-sovituksessa 1,75-kertaiseksi
(2000 px leveällä 2,5-kertaiseksi), joten sumennettu 800 px:n kuva on
pehmeä. Jos omistaja haluaa terävämmän, `tools/tee-etusivupallo.mjs`
ajetaan `--kuva 1100 --lava 1240` -arvoilla (tiedostot kasvavat noin
kaksinkertaisiksi). Erittäin leveillä näytöillä (kuvasuhde yli ~2 : 1)
cover rajaa pystysuunnassa niin paljon, että koneen reitin pohjoisin
kohta voisi jäädä ulos; mitatut koot 390×844 … 2000×1300 ovat kunnossa.

**Aikajana-ajon lähikuva, ennakoiva kamera, esiladatut havainnekuvat ja
epäsäännöllinen valokeila (5.9.2026 ilta).** Omistaja katsoi aallon 2A
ajoa työpöytäselaimella ja pyysi neljä asiaa, sanatarkasti:

> *"zoomaa maapallo näin lähelle mutta liikuta palloa pehmeästi ja
> hieman jo ennakoiden kohti uutta valopalloa niin että kun valopallo
> syttyy kartan liike loppuu vasta vähän sen jälkeen. pidä kokoajan
> terävä tila päällä."*
>
> *"havainnekuvat pitää esiladata, nyt tulivat vähän perässä."*
>
> *"saisiko havainnekuvan häivytyksen hieman epäsäännöllisemmän
> muotoiseksi?"*

1. **LÄHIKUVA ON VAKIO, EI KAAREN RAJAUS.** `AIKAJANAN_LAHIKUVA_LEVEYS`
   (js/aikajana.js) = **260 lautayksikköä** (pyydetty kaista 7,8°,
   altitude 0,146). Ajo ei enää sovita koko kaarta ruutuun: `sovitaAlkuun`
   vie kameran ENSIMMÄISEN lampun ylle lähikuvaan (`ajaPysakille`), ja
   siitä eteenpäin kamera vain siirtyy lampusta toiseen samalla
   korkeudella. Tasokartta (`?lauta=kartta`) pitää entisen koko kaaren
   sovituksen — lähikuva on pallon oma, koska vain siellä on laatat.
   LUKU ON MITATTU EIKÄ LASKETTU: `korkeusLeveydesta` on tasokuvan kaava
   PYSTYSUUNNAN avauskulmalla, joten ruudulla näkyvä vaakakaista on noin
   1,8-kertainen pyydettyyn nähden. Mitattu Chromiumilla 1400 × 900
   (kotelo 1379 × 821, kamera Pavian yllä, ruudun laitojen pisteet
   käännettiin asteiksi ja väli laskettiin isoympyränä):
   120 → 686 km, 200 → 1 162 km, 240 → 1 406 km, **260 → 1 527 km**,
   300 → 1 782 km, 450 → 2 775 km. Omistajan mitta (Irlannista
   Tanskaan ≈ 1 500 km ruudun leveydellä) osuu siis lukuun 260.
   Mittakaava on kilometriä pikseliä kohti (≈ 1,1 km/px), joten
   kapeampi ikkuna näyttää kapeamman kaistan; luku on yksi rivi, jos
   omistaja haluaa toisin. Lähikuva ei mene laattojen tarkkuusrajan
   (`PALLOLAUDAN_SIIRTOLEVEYS` = 120) alle.
2. **KAMERA LÄHTEE ENNEN SYTTYMISTÄ JA SAAPUU VASTA SEN JÄLKEEN.**
   Saapumishetki lasketaan samalla puhtaalla funktiolla kuin karusellin
   ennakko (`aikaSeuraavaan`) — kello ei kulje vakionopeudella, joten
   "kaksi sekuntia ennen" ei ole sama kuin "kahden sekunnin matka
   jäljellä". `tarkistaKameraEnnakko` ajetaan `kehys`issä karusellin
   ennakon rinnalla ja käynnistää ajon, kun syttymiseen on enintään
   `AIKAJANAN_KAMERAN_ENNAKKO_MS` = **1 840 ms** (=
   `AIKAJANAN_KAMERAN_ENNAKKO_OSUUS` 0,4 × `AIKAJANA_VIIVE_MS` 4 600).
   Kesto on `eta + AIKAJANAN_KAMERAN_JALKIJATTO_MS` (**750 ms**), pohja
   `AIKAJANAN_KAMERAN_POHJA_MS` (**900 ms**), joten liike jatkuu vielä
   syttymisen yli. Pehmennys on `aikajananKameranPehmennys`
   (smootherstep): nollanopeus molemmissa päissä, ei nykäisyä lähdössä
   eikä pysähdyksessä. Jos ennakko ei ehtinyt lähteä (lyhyt väli,
   ensimmäinen pysäkki, kortin tai lampun napautus), `sytyta`/`siirry`
   ajaa pohjakestolla — lamppu ei jää lähikuvassa ruudun ulkopuolelle.
   Kaaren LOPUSSA kamera peräytyy koko kaareen (`lopeta` →
   `sovitaKaareen`), koska loppusanat lupaavat kaikki valot kerralla.
3. **TERÄVÄ TILA PAKOTETTUNA AJON AJAKSI.** js/pallo.js sai
   `pakotaPallonLaatu(true/false)` ja `pallonLaatuPakotettu()`: sama
   vipu kuin `?laatu=aina`, mutta pyytäjittäin laskettuna ja ajon
   mittaisena. `kytkeLaatunosto` lukee vivun nyt kutsuttaessa
   (`const aina = () => laatuAinaPaalla(ikkuna) || laatuPakotukset > 0`)
   ja saa muutoksen kuuntelijana: pakotus asettaa kynnykset ja
   pikselisuhteen levon arvoihin, ajaa moottorille saman kameran (tarkat
   laatat haetaan heti) ja terävöittää tekstuurit. Aikajana pyytää sen
   `kaynnista`ssa ja vapauttaa `pura`ssa — myös kesken ajon suljettaessa.
4. **HAVAINNEKUVAT KAKSI PYSÄKKIÄ ETUKÄTEEN.** `esilataaPienet` pyytää
   yhä koko kaaren pienet tiedostot heti, mutta pyyntö ei pura WebP:tä.
   Uusi `valmistaSeuraavat(i)` lataa JA DEKOODAA seuraavan
   `PANEELIN_ESILATAUS_PYSAKKEJA` = 2 pysäkin havainnekuvan (640 px) ja
   muotokuvat (400 px) jo edellisen pysäkin aikana; valmis Image-olio
   jää varastoon (`luoKuvavarasto`, katto `KUVAVARASTON_KATTO` = 12,
   vanhin poistuu ensin) ja paneeli OTTAA SEN SELLAISENAAN
   (`kuvaTaiLaatta(..., varasto)`), jolloin uutta latausta ei lähde eikä
   dekoodausta odoteta (`vaihdaPaneeli` ohittaa decode-kilpailun, kun
   kuva on esiladattu). Osoite lasketaan samalla säännöllä kuin paneeli
   sen pyytää (`paneelikuvanOsoite`) — muuten esilataus hakisi eri
   tiedoston. Varasto tyhjennetään purussa.
5. **VALOKEILAN REUNA ON EPÄSÄÄNNÖLLINEN.** `valokeilanMaski(siemen)`
   laskee CSS:n `mask-image`-arvon: pohjasoikio ja sen päälle
   `VALOKEILAN_LOHKOT` = 6 soikiota eri keskipisteissä ja eri säteillä.
   Kerrokset yhdistyvät unionina (alfa a + b(1−a)), joten keskusta on
   yhä täysin peittävä mutta ulkoreuna kumpuilee suunnan mukaan.
   Siemen on tapahtuman indeksi (`t.n`), joten muoto on sama joka kerta
   samalla kuvalla ja eri kuvilla eri. EI SUODATTIMIA (feTurbulence,
   feDisplacementMap) — iPadilla ne maksaisivat paneelin
   ristihäivytyksen joka kehyksellä; liukuvärit lasketaan kerran
   merkkijonoksi ja selain rasteroi maskin kerran. Css lukee sen
   muuttujasta `--aikajana-valokeila` ja pitää entisen yhden soikion
   varasijana, joten sama reuna toimii pallolla ja vanhalla kartalla.

Vartijat: tests/aikajana.test.mjs (lähikuvan mitta, ennakon luvut,
pehmennyksen käyrä, esilatauksen osoitteet ja varasto, maskin muoto),
tests/aikajanamerkit.test.mjs (tynkäselain: ajo alkaa lähikuvasta,
ennakko lähtee ennen syttymistä ja kesto ylittää sen, terävä tila
päällä ajon ajan ja pois purussa, kahden pysäkin esilataus),
tests/aikajana-pallolla.test.mjs ja tests/pallo.test.mjs (pakotuksen
laskuri ja kuuntelijat). Selaimessa mitattu Chromiumilla 1400 × 900
(ohjelmistorasteroija, laatat ämpäristä): lähikuva 1 527 km, kameran
lähtö 2,7–2,9 s ennen syttymistä (kontin hitaat kehykset venyttävät
kelloa, joten ennakko on siellä pidempi kuin lasketut 1,84 s),
`pallonLaatuPakotettu()` true ajon ajan ja false purun jälkeen, paneelin
kuva `data-esiladattu="1"` ja maskissa 7 kerrosta, ei sivuvirheitä.

AVOIN: kontin ohjelmisto-WebGL:llä kehysväli katkaistaan
(`dt = min(200, …)`), jolloin kello kulkee reaaliaikaa hitaammin ja
ennakolla laskettu saapumishetki tulee liian aikaisin — ajo ehtii
päättyä juuri ennen syttymistä. Oikealla laitteella (60 fps) ennuste on
tarkka, sama kuin karusellin ennakolla. Toinen avoin: lähikuva on
kiinteä korkeus, joten kapealla puhelinruudulla näkyvä kaista on
noin 430 km — omistajan pyyntö koski työpöytää, ja jos puhelin
tarvitsee oman lukunsa, se on yksi rivi lisää.
