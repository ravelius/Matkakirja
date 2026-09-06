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
**Mitä ei ohitettu vaiheessa 1 — TEHTY 5.9.2026 (erä 5b):** moduulien
lataus. Staattiset tuonnit purettiin latausportin taakse
(js/kartta-lataus.js), ja pallolaudan käynnistys keveni mitatusti
0,90 Mt lähdekoodia. Luvut, malli ja rajaus ovat luvussa 10.3
("Moduulien laiskoitus").

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
- **Zoom.** *(KUMOTTU 6.9.2026 — ks. osio "Avauslennon kamera seuraa
  konetta" tämän luvun lopussa: rajaus ei ole enää kaupunkiparin
  laatikko vaan lähtökaupunki ja `AVAUSLENNON_ALKULEVEYS`.)*
  Avauslennolla oli oma marginaali
  (`AVAUSLENNON_RAJAUKSEN_MARGINAALI` 0,2) tavallisen lennon 0,35:n
  sijaan: Lontoo → Ateena 44,3° → 36,5° (1400 × 900) ja 40,6° → 33,4°
  (390 × 844).
- **Hidas pyörintä.** *(KUMOTTU 6.9.2026 — pallo ei pyöri lennossa
  lainkaan; kamera seuraa konetta, ks. saman luvun loppu.)*
  `AVAUSLENNON_PYORINTA_AST` (5°) koko lennon
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

**Kuvat pois etusivulta ja takaisin PALLON PINNALLE (6.9.2026).**
Omistaja jätti kuvapinon pois yöllä klo 01.20 (*"Jätä isoisän kuvat pois
etusivulta"*) ja tilasi aamulla kuvat takaisin toisenlaisina,
sanatarkasti:

> *"Etusivulla kuvat voisivat tulla pienellä kartalle kaupungin
> käännöksen kohdalle ja seurata kaupunkia ja lopulta häipyä sitä kautta
> näkyvistä. Käytä uusia vaaleita kuvia. Voi olla isoisän ottamia
> kuvia."*

- **Pino ei palaa.** Kortit, asennot ja katto ovat poissa sekä
  moduulista että css:stä (vartio tests/etusivupallo.test.mjs).
- **Kuva on ankkuroitu kaupunkiin.** Kerros `.etusivupallo-kuvat` on
  videon päällä mutta SVG:n alla, joten kone ja punainen viiva piirtyvät
  aina kuvan päälle. Ruutupaikka lasketaan joka kehyksellä samalla
  projektiolla kuin koneen paikka (`pallonPiste` + `videostaRuudulle`),
  joten kuva seuraa kaupunkia pallon pyöriessä ja katoaa sen mukana.
- **Elinkaari:** ilmestys 600 ms, pito 1,2 s, häipyminen 2,8 s
  (`REITTIKUVAN_ILMESTYS_S` / `_PITO_S` / `_HAIPYMINEN_S`), ja kuva
  häipyy viimeistään pallon reunalla (kulma kameran akselista yli 70°,
  10° vyö nollaan). Liike vähennettynä peittävyys on portaittainen ja
  css häivyttää sen liikkumatta.
- **Koko** on 14 % kerroksen lyhyemmästä sivusta (102 px 1280×800:lla,
  52 px 390×844:llä), ja kuvan keskipiste on 0,58 × koko kaupungin
  yläpuolella, jotta lähtevä kone jää vapaaksi.
- **Vaalea reuna häivytetään maskilla, ei sekoitustilalla.** `multiply`
  ja `darken` mitattiin ensin Chromiumilla: koska kuvat ovat vaaleita
  vinjettikuvia ja pallon pinta on yhtä vaaleaa pergamenttia, molemmat
  söivät kuvan (kuvan osuus ruudun pikseleistä 3–9 yksikköä 255:stä).
  Nyt kuva piirtyy tavallisesti, pehmeä radial-maski häivyttää reunan ja
  pieni `contrast(1.35) brightness(0.92)` pitää sen erottuvana; kuva jää
  silti hyvin hennoksi (mitattu keskiero 11,5 / 255).
- **Kuvat ovat repossa pienennettyinä** (omistaja: *"Etusivulle kuvat
  kannattaa varmaan pienentää valmiiksi että pyörii parhaiten"*):
  `assets/etusivu/reitti/<kaupunkitunnus>.jpg`, 320 px pisimmältä
  sivulta, laatu 0,8, 9–13 kt. Lähde (ämpärin iso vedos) ja kuvateksti
  ovat pakan tietueessa; sw.js:n SHELL esilataa tiedostot.
- **Kaupunkien kattavuus:** yhdeksän kymmenestä. Kalkutan jaksolla on
  Benares-kuva ja PARIISI ON ILMAN KUVAA, kunnes kuvaputki toimittaa
  omat kuvansa — väliaikaista sijaista ei panna. Vartiot:
  tests/etusivun-reittikuvat.test.mjs. Kaapattu Chromiumilla 1280×800 ja
  390×844 (Kairon ja Bombayn käännökset, sama kuva 1,5 s myöhemmin ja
  häipymässä).

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
**Moduulien laiskoitus (erä 5b, 5.9.2026 ilta).** Omistaja: *"laita
laiskoitus työn alle"*. Vaihe 1 pani tasokartan LEPOTILAAN (luku 3): se
ei piirrä pallolaudalla mitään. Lataus jäi silti maksettavaksi — js/ui.js
toi js/kartta.js:n ja sen aineistopakat staattisesti, joten ne haettiin
ja jäsennettiin joka käynnistyksessä. Nyt ne tulevat yhdestä portista.

*Mittaus ennen (Chromium, /opt/pw-browsers/chromium, 390 × 844, dpr 2,
palvelin repon juuresta, ämpäri Noden kautta, service worker estetty;
laskettu page.on('response'):n .js-vastausten tavut).* Ui.js:n
staattisista tuonneista PALLOLAUDALLA turhia olivat vain nämä — muut
karttamoduulit ovat yhteisiä ja jäivät staattisiksi:

| moduuli | tavua | miksi laiska (kuka muu tuo) |
| --- | --- | --- |
| js/kartta.js | 223 875 | vain ui.js; `sovitaAjonKesto` siirtyi js/siirtokoreografia.js:ään, koska js/pallolauta/kamera.js tarvitsee sen ilman karttaa |
| js/packs/maasto-tekstit.js | 318 456 | vain ui.js (avaaMaastonimi) |
| js/packs/maasto-tekstit-malli.js | 21 474 | vain ui.js (avaaMaastonimi) |
| js/packs/maailmankartta-varjostus.js | 100 563 | vain ui.js (drawMaasto) |
| js/packs/maailmankartta-syvyys.js | 266 439 | TUONTI POISTETTU: MERISYVYYS on ollut pois käytöstä, pakkaa ei lueta mistään |

YHTEISIÄ (jäivät staattisiksi, koska pallo tarvitsee ne): mapart,
laattapyramidi, karttanimet + maailmankartta-nimet (js/pallolauta/nimet.js),
karttavalot ja karttaselite (selite toimii pallolla), fokuskohteet,
fokusmitat, elaintaky, fokuspiste, nostoladonta, maatummennus,
karttamittari (js/main.js tuo), packs/maailmankartta.

*Mittaus jälkeen.* Käynnistyksessä ladattu JS pallolaudalla (tallenne
Ateenassa): **23 672 553 → 22 771 078 tavua (−901 475 B, −0,86 Mt;
moduuleja 335 → 331)**. Avausnäkymässä (ei tallennetta) −902 397 B.
Tasokartalla (`?lauta=kartta`) −253 060 B, koska merisyvyyspakka putosi
sieltäkin; muu kuorma on sama, se vain tulee mountissa portin kautta.
Herätys (linssikartta pallon päälle) lataa 649 kt kerran ja muistaa sen.
Mittakaava: koko käynnistyksen JS on 22,6 Mt, josta sisältöpakat vievät
valtaosan (kulttuuri-kategoriat 4,3 Mt, nähtävyysjutut 2,1 Mt,
maa-kategoriat 1,6 Mt) — tasokartan osuus oli 4 %, ja seuraava mitattava
erä on sisältö, ei kartta.

*Malli: SIJAISOLIO, ei `await` jokaisen herätyksen edellä.* `ui.kartta`
on aina olio, ja sitä kutsutaan pallolaudalla SYNKRONISESTI kymmenistä
kohdista — mitattu selaimessa lepotilassa: `kiertava` 133 kutsua,
`fitViewBox`, `asennaPanorointi`, `nuku` ja `boardBounds` jo
avausnäkymässä, `dieRestingSpot` jokaisessa nopanheitossa. Yhtäkään ei
voi muuttaa odottavaksi, joten portti on olio: js/kartta-lataus.js
`NukkuvaKartta`, jonka `js/ui.js varmistaKartta` vaihtaa oikeaan
`Kartta`-olioon ensimmäisessä herätyksessä. Kaksi totuutta ei synny,
koska `Kartta extends NukkuvaKartta`: nukkuvan kartan pienet metodit
(boardBounds, kiertava, dieRestingSpot, maatiedotHalutaan, mapToPane,
kuori, laudanKorkeus …) ovat samaa koodia kummallakin, ja raskaat ovat
kantaluokassa nukkuvina tynkinä, jotka hereillä oleva kartta korvaa.

*Herätyspolut:* (a) `?lauta=kartta` ja katselutila — mount kutsuu
`heraaTasokartta`, joka lataa moduulin ja piirtää laudan (ero entiseen on
yksi mikrotehtävä, verkottomana SW-välimuistin haku); (b) linssikartta
pallon päälle — js/pallolauta/linssikartta.js `avaa` jatkaa latauksen
jälkeen samasta portista; (c) pallon varapolku ja `?etusivupallo=0` —
sijaisen `heraa()` palauttaa epätoden ja ohjaa `heraaTasokartta`an, joten
vanhat kutsupaikat toimivat sellaisenaan. Epäonnistunut lataus jää
sijaiseen eikä kierrä (yksi ehto `heraaTasokartta`ssa).

*Offline ja yhden tiedoston versio:* moduulit pysyvät sw.js:n SHELLissä
(dynaaminen tuonti hakee ne korista ilman verkkoa) ja
tools/build-standalone.mjs:n MODULES-listalla, jossa js/kartta-lataus.js
ja js/siirtokoreografia.js ovat ennen js/kartta.js:ää (kantaluokka ja
riippuvuus ennen perijäänsä — nipussa on yksi näkyvyysalue). Nipussa
dynaaminen tuonti kaatuisi (linssit.md 2.1), joten portti lukee moduulit
samasta näkyvyysalueesta try/catchilla; savuke-dist ja suora tarkistus:
peli käynnistyy, lauta piirtyy (188 elementtiä), ei virheitä.
tools/tarkista-niputus.mjs sai `DYNAAMISESTI_TUODUT`-poikkeuslistan
(vain dynaamisesti tuodut, jotka silti niputetaan) ja vartioi, että
dynaaminen tuonti oikeasti on olemassa.

*Portit:* tests/kartta-lataus.test.mjs (uusi: ei staattisia tuonteja
mistään js/-moduulista, sijaisen rajapinta kattaa jokaisen ui.js:n
`this.kartta.X`-kutsun, tyngät ovat tynkiä, SHELL ja niputus) ja
tools/savukkeet/savuke-kartan-laiskoitus.mjs (uusi, 10 vartiota:
moduuleja ei haeta pallolaudalla, sijaisen luvut, herätys linssikartalla,
Sulje, varapolku, `?lauta=kartta`). Ajettu vihreinä: `node --test
tests/*.test.mjs` (1660 ok), tarkista-niputus, tarkista-savukkeet,
tarkista-kaksoisavaimet, savuke-lautakytkin (10/10), savuke-etusivupallo
(32/32), savuke-kartta-tila (20/20), savuke-dist.

HUOM savuke-pallolauta vartio 7 (linssikartta) on VANHENTUNUT jo ennen
tätä erää: aalto 1C teki maatiedot-linssistä pallolinssin, joten
linssikarttaa ei enää avata siitä — sama FAIL tulee origin/mainissa
(todennettu 5.9.2026). Laiskoitus ei siihen koske; savuke odottaa
päivitystä aallon 1C mukaiseksi.

**Avauslento: ei sumennusta, suora lähtö, häivytetty isoisän kuva
(5.9.2026 klo 00.35).** Omistaja edellisen erän (v1601) kaappauksesta,
sanatarkasti: *"lentokonekohtauksessa kartta voi näkyä ilman
sumennusta. lentokoneen ei tarvitse kääntyä alussa vaan voi lehtää heti
oikeaan suuntaa ja jättää paksun punaisen viivan. isoisän kuva pitää
häivyttää joka reunastaan läpinäkyväksi ja tehdä vähän isommaksi"*

- **Sumennus pois.** Vaiheen 5b niukkuusharso (`.pallolauta-harso`,
  pergamentti rgba(238, 225, 196, 0.62) kotelon päällä) on poistettu
  KOKONAAN pallolta: elementti, luokka ja css-sääntö. Se jäljitteli
  tasokartan lentoharsoa, mutta pallolla se peitti juuri sen, mitä
  avauksessa katsotaan — laattakartan maapallon. Niukkuus jää siihen
  mitä se oikeasti on: kaksi nimeä (Lontoo + kohde), ei muita pisteitä
  eikä pelitilaa. Lennon nimiasu (täysi muste + pergamenttihalo) jää,
  koska nimen on luettava myös terävän laattakartan päällä, samoin
  merkkien pinontataso (`.pallolauta-lennossa`, z-index 3). Vanhalla
  kartalla (`?lauta=kartta`) harso on kartan oman lentokerroksen asia
  eikä muuttunut.
- **Terävät laatat koko lennon ajan.** Koska kartta on nyt lennon
  pääosassa, `js/pallolauta/avaus.js valmistele()` pyytää terävän tilan
  (`pakotaPallonLaatu(true)`, js/pallo.js, v1603) ja `pura()` vapauttaa
  sen laskeutumisessa. Vipu laskee pyytäjiä, joten vapautus ei voi
  sammuttaa toisen pyytäjän terävyyttä. MITATTU: pakotus ei kasvattanut
  laattapyyntöjä — savuke pyysi pallolaattoja 1856 kertaa koko
  avauksesta perille, kun origin/main pyysi samalla ajolla 1864.
- **Suora lähtö, ei alkukäännöstä.** Koneen kulma laskettiin ennen
  EDELLISEN KEHYKSEN ruutupisteestä: ilmestyessään koneella ei ollut
  edellistä pistettä, joten kulma oli 0° eli nokka itään, ja koska
  hypyn pehmennys lähtee hitaasti, ensimmäisten kehysten siirtymä jäi
  alle puolen pikselin kynnyksen — kone seisoi väärässä asennossa ja
  kääntyi vasta vauhdin kasvaessa. Nyt kulma luetaan KAARESTA
  (`js/pallolauta/siirto.js koneenKulma`: kaaren pisteet osuuksilla e ja
  e + `KONEEN_SUUNTANAYTE` 0,004 ruudulle projisoituina), joten asento
  on oikea jo ensimmäisellä kehyksellä ja seuraa myös pallon pyörintää.
  `aseta(pos, kaari)` sai kaaren toiseksi parametrikseen, ja avaus antaa
  sen jo kiitoradalla. Käännöksen kesto on nolla vakiolla
  `KONEEN_KAANNOKSEN_MS` (0 ms), joka menee elementin css-muuttujaan
  `--koneen-kaannos-ms`: transformin siirtymä on siis rakenteellisesti
  nolla eikä selain voi animoida kiertoa. Peittävyys sen sijaan liukuu
  (`KONEEN_ILMESTYS_MS` 420 ms, `--koneen-ilmestys-ms`), joten kone
  häivyttyy näkyviin jo oikeassa asennossa. Paksu punainen viiva
  kirjoitetaan nyt heti lähdössä (`piirraJalki(hypynVaihe(0).e)`) eikä
  vasta ensimmäisessä rAF-kehyksessä.
- **Isoisän kuva häivytettynä ja isompana.** Kortti (`.lento-valokuva`)
  kasvoi noin neljänneksen ja koko on yksi muuttuja
  `--lento-valokuvan-leveys`: työpöydällä min(30vw, 280px) →
  min(37,5vw, 350px), puhelimessa min(44vw, 200px) → min(55vw, 250px).
  Häivytys on MASKI EIKÄ SUODATIN (iOS-sääntö, tests/lento-ajoitus):
  vaaka- ja pystysuuntainen lineaarinen liuku leikkauksena
  (`mask-composite: intersect` + `-webkit-mask-composite: source-in`,
  sama kaava kuin `.reveal-overlay.paikallis .reveal-aarrekuva`), vyöt
  `--lento-valokuvan-haivytys-x` 15 % ja `-y` 18 % — jokainen neljästä
  reunasta päätyy läpinäkyvään eikä yhtäkään kovaa reunaa jää.
  `box-shadow` poistettiin: se piirtyy elementin LAATIKON mukaan eikä
  maskin, eli olisi jättänyt juuri sen terävän suorakaiteen, jonka
  häivytyksen on määrä poistaa. Kuvateksti *"Isoisä, Bombay, 1873"* on
  kortin oma span kuvan ALLA eikä kuvan sisällä, joten se jää
  häivytyksen ulkopuolelle ja pysyy täysin luettavana; negatiivinen
  ylämarginaali (-0,6 rem) nostaa lapun kiinni kuvan viimeiseen
  näkyvään riviin.
- Vartijat: tests/pallolauta.test.mjs (kolme uutta: ei sumennusta, laatu
  pakotettu ja vapautettu, käännöksen kesto 0),
  tests/isoisan-valokuvat.test.mjs (maski kaikilta reunoilta, koko
  +25 %, ei varjoa, kuvateksti häivytyksen ulkopuolella),
  tests/lento-ajoitus.test.mjs (kohtaus ei sumenna karttaa).
  `node --test tests/*.test.mjs` 1714 ok / 0 fail. savuke-avauslento sai
  swiftshader-liput (ilman niitä `--lauta pallo` mittasi varapolkua) ja
  P3 on nyt *"ei sumennusta lennolla; terävä laatu pakotettuna ja
  vapautettuna perillä"*. Ajettu: 5/7 (P1–P5 vihreinä). AVOIN: saman
  savukkeen P6 (lehti aukeaa perillä) ja P7 (kamera perillä) kaatuvat
  TÄSMÄLLEEN SAMOILLA LUVUILLA myös origin/mainissa (todennettu tässä
  kontissa 5.9.2026: poikkeama 37,7 %, leveys 1113,3 odotuksen 240
  sijaan) — ämpäri vastaa 429:llä ja ohjelmistorasteroija ajaa
  saapumisen liian hitaasti mittausikkunaan. Ei liity tähän erään;
  kirjattu Fablelle.

**Etusivun avaus: otsikko paikalleen, osa II myöhemmäksi, kolme kuvaa
puolta pienempinä ja harsot näkymättömiin (5.9.2026 klo 00.20 ja
00.25).** Omistaja katsoi etusivua työpöytäselaimella ja pyysi
sanatarkasti:

> *"etusivun otsikko hyppää alussa eri kokoon kun kirjoituskone teksti
> alkaa. osa 2 saisi tulla sekunnin myöhemmin. ensimmäinen isoisän kuva
> vasta noin 5 sek kohdalla ja puolet pienemmällä. kuvia saa tulla
> yhteensä kolme, eli vähemmän kuin nyt ja hitaammin."*
>
> *"konekirjoituksen tekstin takana oleva vaalennus pienemmälle teholle
> sekä isommalle alueella mutta niin että häivytys peittää elementin
> neliöt rajat. ylemmässä myös häivytyksen rajat pois näkyvistä
> (pohjalaatta vähän isompi ja häivytys pidemmälle matkalle)."*

1. **OTSIKON HYPYN JUURISYY: kaksi eri lukua samasta koosta.** CSS:n
   lähtökoko oli `.intro-juliste { font-size: 1.44rem }`, mutta
   `js/ui.js fitIntro` aloittaa mittauksensa koosta
   `INTRO_FONT_MAX × JULISTEEN_KERROIN` = 1,14 × 1,5 = **1,71rem** — ja
   fitIntro ajettiin vasta kertomuksen alkaessa (`aloitaKertomus`,
   `aloitaRunko`). Otsikko siis vaihtoi kokoa täsmälleen kirjoituskoneen
   ensimmäisellä naksahduksella. Mitattu Playwrightilla ennen korjausta:
   1400 × 900 kirjasin 23,04 px → 27,36 px, "MATKAKIRJA" 376,7 px →
   447,5 px leveä ja y 166,0 → 138,9 (nousi 27 px); 1000 × 700 23,04 px
   → 25,20 px (fitIntro kutisti yhden askeleen). Sama koski
   tekstipalstaa: 15,36 px → 18,24 px, eli myös nappi ja työpöytäkuva
   (em-mitat) hyppäsivät. Korjaus on kaksiosainen: css:n lähtöarvot ovat
   nyt SAMAT luvut (`.intro-juliste` 1,71rem, `.intro-palsta` 1,14rem),
   ja `renderIntro` ajaa `fitIntro`:n **jo portin takana** (ja portin
   ohittavalla reitillä ennen ajastimia). Mittaus on idempotentti, joten
   myöhemmät kutsut eivät liikuta mitään. Mitattu korjauksen jälkeen
   1400 × 900 hetkillä 0,3 / 2,5 / 3,5 / 6 / 25 s: `.juliste-nimi`
   47,0592 px ja 476,3 , 138,9 · 447,5 × 54,1 — sama luku joka
   hetkellä; sama 2000 × 1300 ja 390 × 844.
2. **OSA II SEKUNNIN MYÖHEMMIN.** `OSAN_VIIVE_MS` 1300 → **2300**;
   `OSAN_HAIVYTYS_MS` pysyy 900 ms:ssä, ja kirjoituskone + luenta
   alkavat yhä vasta häivytyksen jälkeen (siis 3,2 s napautuksesta).
   Mitattu savukkeella: 2,0 s alaotsikon peitto 0,00 · 2,5 s 0,31 ·
   3,0 s 0,91 · 3,5 s 1,00, paikkarivi tyhjä 3,0 s asti ja kirjoittunut
   4,5 s kohdalla.
3. **ISOISÄN KUVAT POIS ETUSIVULTA.** Omistaja katsoi kolmen kuvan
   version ja päätti 6.9.2026 klo 01.20 sanatarkasti: *"Jätä isoisän
   kuvat pois etusivulta"*. Tämä KUMOAA saman erän kohdat "kolme kuvaa
   kierroksella, ensimmäinen noin 5 s kohdalla" ja "kortti puolet
   pienemmäksi" — ne eivät päätyneet julkaisuun lainkaan. Poisto ei ole
   lippu vaan koodin poisto, jottei etusivulle jää kuollutta koodia:
   - js/etusivupallo.js: pinon DOM (`.etusivupallo-pino`), `laskeKortti`,
     `pinonAsento`, `PINON_*`-vakiot, kuvien hetket
     (`kuvienLaskeutumiset`) ja kierroslaskuri ovat poissa; kuvien
     tuonnit (`rajausTyyli`, `valokuvanKuvateksti`, `isoisakuvanSavy`)
     samoin. Piirto on nyt pelkkä viiva ja kone.
   - css/styles.css: `.etusivupallo-pino`, `.etusivupallo-kuva` (kortti,
     kuva, kuvateksti) ja `--pino-harsokorjaus` on poistettu.
     Avauspaneelin kerrokset ovat pallo 0 · verho 1 · teksti 3.
   - PAKKA JÄÄ: `js/packs/etusivun-isoisakuvat.js` (27 aikalaisvedosta),
     `ETUSIVUN_KUVAKIERTO`, `saapumisenKaupunki` ja `saapumisenKuva`
     ovat tallella vientinä — kuvat odottavat uutta käyttöpaikkaansa
     (albumi, lentokohtaus), eikä niitä haeta uudelleen kuvaputkelta.
     `saapumisenKuva` palasi kolmen argumentin muotoonsa (kierrossiirto
     oli vain kolmen kuvan version tarve).
   Vartiot: tests/etusivupallo.test.mjs *"etusivulla ei ole isoisän
   kuvia: ei pinoa, ei kortteja, ei tyylejä"* (lähdevartio molempiin
   tiedostoihin ja kerrosjärjestys) ja savuke E4a–E4c sekä E4k, joka
   katsoo kahden ja puolen kierroksen ajan, ettei yhtään korttia
   ilmesty. Palautus on käytännössä revert tästä commitista.
4. *(kumottu kohdan 3 myötä: kortin koko)*
5. **PERGAMENTTIHARSOT: YKSI KAAVA, KOLME MUUTTUJAA.** Harson reuna
   näkyi, koska liukuvärin ellipsi oli laatikkoa suurempi (säde 74 %) ja
   pseudon suorakulmio LEIKKASI harson kohdassa, jossa peittävyyttä oli
   vielä 0,27 — juuri ne "elementin neliöt rajat". Nyt yhteinen sääntö
   antaa `--harson-sade: 56%` (laatan reunalla ollaan 89 %:ssa sädettä,
   eli käytännössä nollassa), seitsemän pysäkin liu'un ja peittävyyden
   pseudon `opacity`iin muuttujana. Kaksi säädintä per harso:
   konekirjoituksen teksti `--harson-peitto: 0.62` (ennen 0,94),
   `--harson-haivytys: 42%`, laatta `-2.6em -5em` (ennen −1,2em/−1,6em);
   julisteotsikko `--harson-peitto: 0.8`, `--harson-haivytys: 36%`,
   laatta `-1.8em -3.6em` (ennen −0,5em/−1,4em). Laskettu peittävyys
   laatan suoralla reunalla on nyt 0,036 (teksti) ja 0,030 (otsikko),
   kun se oli 0,27 ja 0,24 — tests/etusivupallo.test.mjs LASKEE luvun
   liukuvärin pysäkeistä eikä tarkista tekstiä. (Isoisän kortin
   `--pino-harsokorjaus` poistui kuvien mukana, ks. kohta 3.)

Vartijat: tests/lento-ajoitus.test.mjs (viive 2,2–2,5 s; css:n ja
fitIntron kirjasinkoot sama luku; fitIntro ajetaan portin takana),
tests/etusivupallo.test.mjs (etusivulla ei ole kuvapinoa missään
muodossa, pakka ja sen valintasääntö tallella, harson reunapeitto alle
0,05) ja savuke `tools/savukkeet/savuke-etusivupallo.mjs` E4a–E4c ja
E4k (ei kuvia kahden ja puolen kierroksen aikana), E11d/E11e sekä uusi
**E11f** (otsikon rivien laatikot ja kirjasinkoot samat 0,3 s ja 25 s
kohdalla). Kaappaukset Chromiumilla 1400 × 900, 2000 × 1300 ja
390 × 844 oikealla 2026-09-05c-videolla hetkiltä 0,3 / 2,5 / 3,5 / 6 /
25 s.

AVOIN: kuvat jäivät pois etusivulta, mutta pakka on olemassa ja
maksettu — sille on löydettävä uusi paikka (albumi tai lentokohtaus),
tai 27 vedosta jää käyttämättä.
**Aloitusnäkymä lähemmäs, hidas pyörintä ja Livian viive — sekä
kameran kuvasuhdekorjaus (5.9.2026 klo 00.30).** Omistaja katsoi
lähtökaupungin valintaa työpöytäselaimella (2000 × 1300) ja pyysi
kolme asiaa, sanatarkasti:

> *"kartan zoom taso heti aloituksessa lähemmäksi. ks. 2 kuva.
> karttapallo saisi pyöriä hitaast täydessä terävyydessä. pulun
> kommentit noin 1,5 sek myöhemmin"*

1. **KAMERAN KAAVA SAI KUVASUHTEEN — juurisyy zoomiin.** `PALLO_FOV`
   (50°) on Globe.gl:n PYSTYSUUNNAN avauskulma, mutta
   `korkeusLeveydesta` muutti pyydetyn LEVEYDEN korkeudeksi ilman
   kuvasuhdetta: sama pyyntö näytti työpöydällä (1379 × 826)
   1,67-kertaisen ja puhelimella (374 × 777) 0,48-kertaisen kaistan
   pyydettyyn nähden, ja `kameranKohde`n bbox-haara laski
   korkeusehdon (`bbox.h · vara · W/H`) siis täsmälleen väärinpäin.
   Korjaus: `korkeusLeveydesta`, `leveysKorkeudesta` ja `lahinKorkeus`
   saivat `kuvasuhde`-parametrin (oletus 1 = neliöruutu, jolloin
   yksikkötestit ja apufunktiot säilyivät ennallaan), ja
   `luoPallokamera` antaa aina kotelon oman suhteen — kutsuttaessa,
   koska ruutu kääntyy. Nyt `leveys` tarkoittaa lautayksiköitä RUUDUN
   LEVEYDELLÄ jokaisella laitteella, ja bbox mahtuu molempiin suuntiin.
   *Mitattu Chromiumilla (swiftshader, r2.dev Noden fetchillä; ruudun
   laitojen pisteet `toGlobeCoords`illa asteiksi ja väli isoympyränä,
   sama tapa kuin aikajanan lähikuvassa):* sama pyyntö (260 yksikköä)
   antoi ennen 1 530 km (1400 × 900) ja 430 km (390 × 844), nyt
   898 km ja 872 km — eli kaikki laitteet näyttävät saman kaistan.
   - **Aikajanan lähikuva kalibroitiin uudelleen samaksi kuvaksi:**
     `AIKAJANAN_LAHIKUVA_LEVEYS` **260 → 434**, mitattu 1400 × 900:
     260 → 898 km, 400 → 1 403 km, **434 → n. 1 525 km**, 450 →
     1 588 km. Omistajan mitta (*"Irlannista Tanskaan ≈ 1 500 km"*)
     pysyy siis pikselilleen entisenä työpöydällä — ja puhelin näyttää
     nyt saman 1 450 km:n kaistan entisen 430 km:n sijaan, eli luvun 5c
     AVOIN-kohta ratkesi tässä.
   - **Avauslento:** `AVAUSLENNON_RAJAUKSEN_MARGINAALI` jätettiin
     ennalleen (0,2) TIETOISESTI, ja mitattu rajaus muuttui:
     1400 × 900 8 990 → **5 390 km**, 390 × 844 1 870 → **3 890 km**.
     Syy: vanha luku oli sama kaava väärinpäin, eikä sitä voi palauttaa
     molemmille laitteille yhtä aikaa — työpöydällä kuva oli
     kaksinkertaisesti kaukana siitä, mitä omistaja pyysi (*"näkymä
     saisi olla zoomautunut hieman lähemmäs"*, 5.9. klo 23.10), ja
     puhelimella laatikko EI mahtunut leveyssuunnassa (siksi Ateena jäi
     11 px kotelon ulkopuolelle ja rajausta piti siirtää lännemmäs).
     Nyt kone ja molemmat päät ovat kuvassa kummallakin (mitattu
     1400 × 900: Lontoo x 487, Ateena x 1 069 / 1 379; 390 × 844:
     x 122 ja x 312 / 374). Jos omistaja haluaa vanhan kaukaisemman
     kuvan takaisin, se on yksi luku (0,2 → 0,67 antaa entisen
     työpöytärajauksen).
   - **Saapumis- ja siirtonäkymä (240 ja 120 yksikköä) jätettiin
     ennalleen**, koska niiden omat kommentit puhuvat asteista
     (*"~7°"*, *"~3,6°"*) — ja vasta nyt ne pitävät paikkansa.
     Mitattu vaikutus: saapuminen työpöydällä 1 345 → 840 km (lähemmäs,
     omistajan toivomaan suuntaan) ja puhelimella 370 → 840 km
     (kauemmas, mutta terävämpi: laatat eivät ole enää 1,9× venytettyjä
     vaan alle 1×). Sama koskee tavallisen lennon rajausta
     (`LENNON_RAJAUKSEN_MARGINAALI` 0,35). Jos jokin näistä halutaan
     toisin, kukin on yksi rivi.
2. **ALOITUKSEN RAJAUS.** `ALOITUSVALINNAN_MARGINAALI` **0,8 → 0,12**
   (js/pallolauta/lauta.js). Vanha luku oli reilu juuri siksi, että
   kaava veti kuvan kauas; korjatulla kaavalla valinta on nyt lennon
   rajausta (0,35) TIUKEMPI. Kuplavara muuttui samalla osuudesta
   PIKSELEIKSI (`ALOITUSVALINNAN_KUPLAVARA_PX` = 190 ja
   `ALOITUSVALINNAN_KUPLALEVEYS_PX` = 336, ennen 0,34 ruudun
   korkeudesta): Livian kuplapino on tekstiä, ja se mitattiin
   336 × 129 px:ksi 2000 × 1300:ssa mutta 336 × 180 px:ksi
   390 × 844:ssä — osuutena vara söi työpöydällä juuri sen zoomin, jota
   omistaja pyysi. Siirto on VINO, koska kuplat ovat NURKASSA: sisältö
   nousee ja siirtyy vasemmalle puolella kuplakaistasta, kumpaankin
   suuntaan enintään neljänneksen laatikon ja reunan välistä
   (`Math.min(kuplavara, (näkyvä − laatikko) / 4)`). Ensimmäinen mitta
   ilman vaakasiirtoa jätti Ateenan nimen 1400 × 900:ssa kuplapinon
   reunan alle (mitattu: merkki x 1 029, kuplat x ≥ 1 047); vaakasiirto
   (90 yksikköä ≈ 107 px) vie sen selvästi sivuun, ja puhelimella siirto
   on itsestään ~0, koska siellä laatikon leveys sitoo rajauksen.
   *Mitattu ruudun leveys (km) valintanäkymässä ennen → jälkeen:*
   2000 × 1300 **13 143 → 4 375**, 1400 × 900 **13 512 → 4 592**,
   390 × 844 **3 453 → 3 419**. Puhelin ei siis muuttunut (siellä
   laatikon leveys sitoo), työpöytä lähentyi kolminkertaisesti:
   Irlanti on ylävasemmalla, Pohjois-Afrikan rannikko alalaidassa ja
   Lontoo–Ateena-pari täyttää ruudun kuten omistajan kuvassa 2.
3. **PALLO PYÖRII HITAASTI TÄYDESSÄ TERÄVYYDESSÄ.**
   `ALOITUKSEN_PYORINTA_AST_S` = **0,4 °/s** itään (täysi kierros
   15 min) ja `ALOITUKSEN_PYSAYTYS_MS` = 900. Pyörintä on OMA
   rAF-silmukkansa eikä kamera-ajo: ajo on matka pisteestä toiseen,
   tämä on tasainen liuku, joka lukee ja kirjoittaa `pointOfView`n
   kehys kerrallaan SEINÄKELLOSTA (dt katkaistaan 100 ms:iin, jottei
   taustavälilehdestä palaava ruutu hypäytä palloa). Koska nykyinen
   kohta luetaan joka kehyksellä, pelaajan oma veto ja nipistys jäävät
   voimaan. Kolme pysäytintä: sormi tai rulla koteloon → PEHMEÄ
   hidastus (`pyorinnanPehmennys`, sama smootherstep kuin avauslennon
   pyörinnässä, ei nykäisyä); toinen kamera-ajo omistaa kuvan → seis
   samassa kehyksessä; vaihe vaihtuu tai lauta menee piiloon → seis ja
   pakotus pois. Terävä tila on pakotettuna koko valinnan ajan
   (`pakotaPallonLaatu(true)` jo ennen kamera-ajoa, `false` kun
   kaupunki on valittu, lauta piilotetaan tai puretaan) — sama vipu
   kuin aikajana-ajossa (v1603), joten laattataso ei putoa liikkeessä.
   Reduced motion: ei pyörintää. Merkit ja nimet ovat kirjaston
   CSS2D-pisteitä ja seuraavat pintaa itsestään, ja osuma lasketaan
   napautuksen hetkellä ruudulta (R-malli), joten pyörivä pallo on yhtä
   napautettava kuin paikallaan oleva. *Mitattu Chromiumilla
   1400 × 900:* pyörii true, `pallonLaatuPakotettu()` true, lng
   12,29 → 13,09; sormen jälkeen lng juoksi vielä 0,16° ja pysähtyi
   (Δ 0,000° seuraavan 3 s aikana); kaupungin valinnan jälkeen pyörii
   false ja laatupakotus false. (Kontin ohjelmistorasteroijalla kehysväli
   on 200–300 ms, joten mitattu kulmanopeus on ~0,2 °/s; oikealla
   laitteella kello antaa täyden 0,4 °/s.)
4. **LIVIAN KUPLAT 1,5 s MYÖHEMMIN.** `LIVIAN_AVAUKSEN_VIIVE_MS` =
   1 500 (js/livia.js) lisätään entisen `AVAUKSEN_VIIVE`n (900 ms)
   päälle VAIN ensimmäisen kuplan eteen: kuplien keskinäinen rytmi
   (`KUPLIEN_VALI` 280 ms, lukuaika) on ennallaan. Reduced motionissa
   ei lisäviivettä — odotus on osa liikkeen koreografiaa, ja
   liikkeetön ruutu vain seisoisi tyhjänä pidempään.
5. **KAKSI NIMEÄ ATEENAN KOHDALLA — SELVITETTY JA KORJATTU.**
   Omistajan kuvassa 1 luki päällekkäin harmaa kapiteeli "ATEENA" ja
   tumma lihavoitu "Ateena". Molemmat olivat pysyviä: edellinen on
   pallon KARTTANIMIKERROS (js/pallolauta/nimet.js; lähtövalinnassa
   `vain` = Lontoo + valittavat), jälkimmäinen valittavan kaupungin
   KOHDEMERKIN oma lappu (js/pallolauta/merkit.js `kohdeElementti`,
   `.target-nimi` — sama kuin tasokartan kohderenkaassa). Merkin nimi
   voittaa: se on kehotus toimia, se on lähempänä silmää ja se on sama
   molemmilla laudoilla. Ladonta rajataan siksi uudella `aloitusNimet()`
   -joukolla (näkyvät miinus valittavat) — käytännössä Lontooseen — ja
   PISTE VAIN NIMEN KANSSA -sääntö pysyy ennallaan (`pisteNakyy` lukee
   yhä koko näkyvää joukkoa, koska kohdemerkki on nimi).

Vartijat: tests/aloitus-pallolla.test.mjs (rajauksen luvut, pyörinnän
kolme pysäytintä, laatupakotus ja sen vapautus kolmesta paikasta,
yksi nimi valittavalle, Livian viive), tests/pallolauta.test.mjs
(kuvasuhde kaavassa ja kameran kaikissa kolmessa suunnassa),
tests/pallonimet.test.mjs, tests/aikajana.test.mjs ja
tests/aikajanamerkit.test.mjs (uusi mitattu lähikuva) sekä
savuke-etusivupallo E9b/E9e/E9f. Ajettu: `node --test tests/*.test.mjs`
1715 ok / 0 fail, tarkista-kaksoisavaimet, tarkista-niputus,
tarkista-savukkeet, tarkista-nimiolimitys (0 nimiö nimiön päällä),
savuke-etusivupallo 37/39, savuke-pallolauta (vartiot 1–6 ja 12–15
läpi) ja savuke-avauslento `--lauta pallo` (P1–P5, P7 läpi). Kolme
FAILia ovat VANHOJA ja tulevat samoina origin/mainissa (todennettu
stashaamalla tämä erä pois 5.9.2026): savuke-etusivupallo E4b ja E4e
(isoisän kortin kuvateksti ja haaleus), savuke-pallolauta vartio 7
(linssikartta, vanhentunut jo aallossa 1C) ja savuke-avauslento P6
(kaupunkilehti ei ehdi auki kontin hitaudessa; pallolaattapyyntöjä
mainissa 1 870, tässä erässä 1 765 — lähikuva ei siis lisännyt
laattakuormaa).
**Elävä liekkivalo, häipyvä havainnekuva ja vasen vuosipalkki (5.9.2026
klo 00.45–00.50).** Omistaja työpöytäkaappauksesta, sanatarkasti:
*"havainnekuvan pitää häipyä kun kartan animaatio alkaa. samoin
valopallo tuli nyt jotenkin liikuen paikoilleen. saisiko valopallosta
epäsäännöllisemmän ja elävämmän muotoisen ja niin että se sykkisi kuin
tulen liekki? … valon syttyminenkin voisi olla animoitu niin että se
hetken hehkuu pienempänä ja sitten laajenee. keskiosa saisi olla
kirkkaampi ja sitten häipyä pidemmällä matkalla ja pehmeämmin, mutta
logaritmisesti (tai ainakin melkein) aivan kuin oikea valo. valot
voisivat myös olla hieman erilaisia keskenään varioiden kirkkautta,
kokoa, värilämpötilaa ja muotoa. havainnekuvan teksti saisi olla vähän
pienempi ja ehkä hieman tummempi. pitäisikö vuosiluvun jälkeen olla
tähtisymboli? joku mikä sopisi tyylillisesti"* — ja klo 00.50:
*"vuosipalkin voisi yläreinassa siirtää vasempaan laitaan mutta ei ihan
kiinni."*

- **LIUKUMISEN JUURISYY EI OLLUT LAMPPU VAAN TUMMENNUKSEN REIKÄ.**
  Mitattu Chromiumilla 1400 × 900 (lamppujen ruutupaikat ja kalvon
  liukuvärin keskipiste 150 näytettä): jokainen uusi lamppu ILMESTYI
  täsmälleen ruudun keskelle (700, 478) eikä liikkunut omin voimin —
  kirjaston html-kerros (globe.gl 2.46.2) tweenaa vain OLEMASSA olevan
  merkin siirtymän, ja uusi saa paikkansa kerralla
  (`!t.__currentTargetD ? applyPosition : tween`). Liikkuva valo oli
  `siirraReika`n 700 ms:n rAF-liuku: kalvon kirkas aukko lipui edellisen
  lampun kohdalta uuden kohdalle (mitattu (1007, 462) → (689, 410))
  juuri kun uusi valo syttyi, ja tummalla pallolla se lukee valopallona,
  joka tulee liikkuen paikoilleen. Nyt reikä siirtyy KERRALLA
  (`PALLON_REIAN_LIUKU_MS = 0`), ja liike on lampun omassa
  syttymisessä. Kameran oma jälkijättö (`AIKAJANAN_KAMERAN_JALKIJATTO_MS`
  750 ms) on ennallaan: se on omistajan aiempi tilaus 5.9. illalta.
- **VALO ON CANVAS-KERROS: js/aikajana-valo.js (uusi).** SVG-ympyröillä
  ei voi tehdä kolmea pyydettyä asiaa (epäsäännöllinen reuna, liekin
  syke, likimain käänteinen neliö), koska `radialGradient` interpoloi
  pysäkkiensä välit lineaarisesti ja muoto on aina ympyrä. Moottori
  pyytää moduulilta kolme asiaa — `lamppu(n)`, `tila(n, palaa,
  nykyinen)`, `pura()` — ja lamppu on div, jonka sisällä on canvas.
  Profiili on **I(r) = 1 / (1 + (r/r0)²)**, r0 = 0,20 × säde,
  normalisoituna niin että laidalla arvo on tasan 0 (ei reunaviivaa):
  kirkas ydin, pitkä pehmeä häntä, ja etäisyyden kaksinkertaistuminen
  neljännestää intensiteetin (mitattu testissä 1,13× ihanteesta).
  Profiili maalataan KERRAN valoa kohti offscreen-canvasiin 28
  gradienttipysäkillä; kehyksessä tehdään kolme `drawImage`-vetoa
  (häntä, epäsäännöllisen maskin läpi piirretty runko, kirkas ydin).
  Vakiot: säde 49 px (= entinen kajo, MERKIN_SADE × KAJON_SUHDE),
  ruutu 128 px, syttymä 300 ms hehku (koko 0,30, kirkkaus 1,35) +
  900 ms laajeneminen ease-outilla, syke 0,8–1,6 Hz (säde ±7 %,
  kirkkaus ±9 %, eri vaiheessa) ja muoto 2–4 kulmaharmonista + oma
  value-noise. Variaatio siemennetään tapahtuman numerosta: kirkkaus
  ±15 %, koko ±20 %, värilämpötila lämpimästä oranssista (n. 1 800 K)
  vaaleaan kellertävään (n. 2 700 K), harmoniat. EI KIRJASTOA:
  arpoja, kohina ja profiili ovat kymmenen riviä omaa koodia.
- **Suorituskyky mitattu** Chromiumilla (swiftshader, 1400 × 900,
  kerroksen oma `piirra` 120 kehyksen keskiarvona): **1 palava lamppu
  0,03–0,05 ms, kaikki 25 palavaa 0,6–1,0 ms kehystä kohti** eli 2–3 %
  30 fps:n budjetista ohjelmistorasteroijalla. Piirto on kuristettu
  33 ms:iin (`VALON_PIIRTOVALI_MS`), sammunutta ei piirretä ja
  kehyskatto on 25. Reduced motion: silmukkaa ei käynnistetä lainkaan,
  valo on staattinen täysi profiili ja jälki himmenee ilman liukua.
- **VAIN PALLOLAUTA.** Tasokartan (`?lauta=kartta`) lamput ovat kartan
  omassa svg:ssä laudan koordinaatistossa ja skaalautuvat zoomin mukana
  (`paivitaMittakaava`), joten yhteistä kerrosta ei ole; vanha kartta
  suljetaan aallossa 3B, joten liekki on pallon oma ja kartan lamput
  jäävät ennalleen. Ilman canvas-tukea (esim. testien tynkäselain)
  `lamppu()` palauttaa null ja pallolle piirtyy entinen neljän ympyrän
  SVG-lamppu — linssi ei jää pimeäksi.
- **Havainnekuva häipyy kameran mukana.** `tarkistaKameraEnnakko`
  kutsuu `haivytaPaneeli()`n samassa lauseessa, jossa ennakoiva ajo
  lähtee (n. 1 840 ms ennen syttymistä): paneeli saa luokan `haipyy`
  (opacity → 0, 600 ms ease, `PANEELIN_ENNAKKOHAIVYTYS_MS`), ja uusi
  kuva nousee vasta syttymisen ristihäivytyksessä, joka poistaa luokan.
  Tauko ja Alusta poistavat luokan, jottei paneeli jää näkymättömäksi
  odottamaan syttymistä, jota ei tule. Mitattu selaimessa: 1 → 0,93
  (67 ms) → 0,48 (201 ms) → 0,09 (406 ms) → 0 (666 ms).
- **Havainnekuvan teksti** on 0,85 × entinen (`clamp(0,81rem, 2,04vw,
  1,15rem)`, mitattu 1400 px:llä 21,6 → 18,4 px) ja sävy pergamentin
  tummaa kultaa `#d7bd88` entisen lähes valkoisen `#f1e3c2` sijaan.
  Erotin vuosiluvun jälkeen on PELIN OMA MERKKI ◈ — sama kuin etusivun
  julisteen hiusviivakoristeessa (index.html `.juliste-viiva`) ja
  unohdetun aarteen tunnuksena — pisteen `·` tilalla, kultaisena,
  0,6em ja hieman kohotettuna. Merkki on yhtenä vakiona
  (`AIKAJANAN_EROTIN`, js/aikajana.js), joten se vaihtuu yhdeltä
  riviltä; ruudunlukija ohittaa sen (`aria-hidden`).
- **Vuosipalkki vasempaan laitaan** (`.aikajana-ylarivi`): marginaali on
  oma muuttujansa `--aikajana-ylarivi-marginaali` (1,25rem), pystysija
  ennallaan (0,6rem). Mitattu 1400 × 900: palkin vasen laita 20 px
  linssin reunasta. Puhelimella (`max-width: 640px`, mitattu 390 × 844)
  palkki on 255 px leveä 374 px:n ruudulla eli lähes ruudun levyinen,
  joten se jää KESKELLE kuten ennen (vara 59 px molemmin puolin).
- Vartijat: tests/aikajana-valo.test.mjs (uusi, 19 väitettä: profiilin
  monotonisuus ja käänteinen neliö, syttymisen vaiheet, sykkeen ja
  muodon rajat, deterministinen siemenvariaatio, reduced motion,
  kehysbudjetti, EI SIJAINNIN SIIRTYMÄÄ missään päässä, paneelin
  häivytys, teksti ja erotin, vuosipalkin laita) sekä päivitetyt
  tests/aikajana.test.mjs-vartiot. Kaappaukset 1400 × 900 Chromiumilla:
  syttymisen alku (150 ms, pieni kirkas piste), täysi valo, kuusi eri
  valoa rinnakkain (koko, kirkkaus ja värilämpötila vaihtelevat) ja
  havainnekuva häivytyksen keskellä.
**Aalto 2C — ihmisen matka -linssi: kello ilman vuosilukuja, reittiviiva
ja hyppykamera (5.9.2026).** Omistajan päätös 5.9.2026: toinen
aikajanalinssi on nykyihmisen leviäminen Afrikasta koko maapallolle, 20
pysäkkiä 300 000 vuotta sitten → n. 1300 jaa.
(`js/linssit/ihmisen-matka.js` + `ihmisen-matka-data.js`). Kaari on
ensimmäinen, joka ei mahdu keksintölinssin oletuksiin, ja moottori
(js/aikajana.js) yleistettiin kolmesta kohdasta. JOKAINEN YLEISTYS ON
KAAREN VALINTA: ilman kenttää käytös on entinen, ja keksintölinssi on
rivin tarkkuudella ennallaan (tests/aikajana*.test.mjs).

- **Kello ilman vuosilukuja** (`asteikko: 'vuosiaSitten'`). 300 000
  vuotta keksintöjen tahdilla (1 vuosi = 260 ms) olisi 22 tuntia, joten
  kellon paikka EI ole vuosiluku vaan pysäkkien koordinaatisto: jokainen
  väli on `ASTEIKON_VALI` = 10 yksikköä, eli sama reaaliaika kuin
  keksinnöissä keskimääräisellä välillä (~2,6 s + pysäkin 4,6 s tauko).
  Näytettävä LUKEMA interpoloidaan välillä LOGARITMISESTI
  (`vuosiaSittenLukema`, geometrinen keskiarvo): 300 000 → 3 000
  puolivälissä on 30 000, ei 151 500. Kello pyöristää suuruuden mukaan
  (`kellonAskel`: 1000 / 100 / 10 / 1), koska pyöristämätön viimeinen
  rulla pyörisi kymmeniä tuhansia numeroita sekunnissa; rullia on kuusi,
  niiden välissä on tuhaterotin ja perässä yksikkö ("v. sitten").
  Etunollat jäävät paikoilleen näkymättöminä (`.vuosi-numero.tyhja`),
  jotta numeroiden paikat eivät hypi. `asetaMatkamittari` sai kaksi
  valinnaista lukua — `askel` ja `suunta` — ja `suunta: -1` kääntää
  mittarin laskevaksi (uusi numero tulee ylhäältä, seuraava luku on
  pienempi). Pysäkillä näytettävä teksti tulee DATASTA
  (`ajoitus`: "300 000 vuotta sitten", "n. 1250 jaa."), ja moottorissa
  on sitä varten yksi apuri (`ajoitus(t) = t.ajoitus ?? t.vuosi`), jota
  kortti, lamppu, kellorivi, havainnekuvan teksti ja Tiedeliite lukevat.
- **Reittiviiva** (`reitti: true`). Valot eivät ole erillisiä paikkoja
  vaan yksi matka: `lauta.linssit.polut(PALLON_OSA, …)` piirtää
  pysäkkien väliin isoympyrää seuraavan viivan (`reitinPisteet`, yli 2°
  välit tihennetään), ja lista kasvaa sitä mukaa kuin valot syttyvät
  (`paivitaReitti(i)`; selailu taaksepäin lyhentää sen, Alusta vie sen
  pois, kaaren loppu näyttää koko matkan). Viiva on VALOJEN KANSSA
  SAMASSA OSASSA, joten `pura('aikajana')` vie kummatkin. **Paksuus on
  3 RUUTUPIKSELIÄ eikä asteita** — sama mitattu havainto kuin
  avauslennon jäljellä (luku 10.3 yllä): asteina laskettu viiva jää alle
  pikselin eli näkymättömiin.
- **Väljempi lähikuva ja hyppykamera** (`lahikuva: 520`,
  `hyppykamera: true`). Keksinnöissä naapuripysäkit ovat saman maanosan
  sisällä; tässä ne ovat eri mantereilla, joten perusmitta on
  kaksinkertainen (2 × 260). Valtameren ylityksessä (Beringia, Sahul,
  Lapita, Aotearoa) kameran leveys lasketaan EDELLISEN pysäkin
  etäisyydestä isoympyränä (`pysakinLeveys` → `pysakinLahikuva`, kerroin
  2,2, katto 3600 yksikköä), jolloin lähtöranta ja reittiviiva ovat yhä
  kuvassa. Dataan ei tarvitse merkitä, mikä väli on merimatka. Kameran
  ennakko, jälkijättö ja pehmennys ovat entiset (v1603).
- **Kuvat.** Kortilla on LÖYTÖ (`esine`: kallo, kivityökalu,
  kalastuskoukku) eikä muotokuvaa — 300 000 vuoden takaa ei ole kasvoja
  — ja havainnekuva (`kuva`) on oikean laidan paneelissa kuten ennen.
  Muunnos moottorin kentiksi on linssin oma puhdas funktio
  (`ihmisenMatkanPysakit`), joten moottori ei tunne kumpaakaan kaarta.
  Kuvaputken kuvat ovat 1536 × 1024 ja niissä on noin 20 %
  ympäristövaraa reunamaskia varten, joten kaari pyytää
  `kuvasovitus: 'contain'` (cover-rajaus leikkaisi varan pois ennen
  maskia). Havainnekuvan alla on iso rivi = otsikko ja pieni rivi =
  kuvaputken oma `kuvateksti` ("Omo Kibish, noin 300 000 vuotta
  sitten"), joka sisältää jo ajoituksen; ilman kuvatekstiä muoto on
  entinen "ajoitus · otsikko".
- **Ääni.** Oma musiikkilaji `ihmisen-matka` (js/siirtymamusiikki.js
  RAIDAT, ryhmä `linssi`, voima 0,11 kuten keksinnöillä; prompti
  tools/generoi-siirtymamusiikki.mjs LAJIT: syvä ja hidas, rumpu kuin
  sydämen syke ja sanaton kaukainen ihmisääni, 50 s looppi). Raita
  generoidaan erikseen — puuttuva tiedosto on hiljainen eikä riko ajoa.
  Kaari sai myös oman LUENTAKANSIONSA (`luentajuuri`,
  js/linssipuhe.js `soitaLinssiluenta({ juuri })`); ilman sitä ajo olisi
  soittanut keksintökaaren luennat.
- **Vartijat:** tests/ihmisen-matka.test.mjs (uusi: linssisopimus,
  asteikko, logaritminen interpolointi, laskeva mittari, reittiviiva,
  kamerarajat, kortin ja havainnekuvan tekstit, musiikkilaji, SHELL) ja
  päivitetyt tests/aikajana.test.mjs, tests/linssipuhe.test.mjs,
  tests/linssimusiikki.test.mjs, tests/siirtymaraidat.test.mjs,
  tests/musiikkilehti.test.mjs. Ajettu: `node --test tests/*.test.mjs`
  1729 ok / 0 fail, tarkista-kaksoisavaimet, -niputus, -savukkeet,
  -nimiolimitys, build-standalone. Selaimessa varmistettu Chromiumilla
  1400 × 900 (swiftshader): avausjakso ja Käynnistä, kello "286 000 v.
  sitten" rullaa, kellorivi "300 000 vuotta sitten · Omo Kibish",
  havainnekuva contain-sovituksella ja kuvateksti sen alla, lamppu
  syttyy, reittiviiva kasvaa (0 → 1 pätkää) ja kamera nousee
  valtameren ylityksessä (altitude 0,13 → 2,02). AINEISTO ON TYNKÄ:
  js/linssit/ihmisen-matka-data.js sisältää kolme pysäkkiä, ja
  sisältöagentti korvaa sen 20 pysäkillä samaa rajapintaa vasten.


**Ihmisen matka — Fablen arvio ja hionta (6.9.2026, v1612:n jälkeen).**
Linssi ajettiin läpi pallolla Chromiumilla 1400 × 900 (swiftshader,
20 pysäkin oikea aineisto) ja katsottiin kuusi hetkeä: avaus, pysäkki 1,
pysäkki 8 (Sahulin merimatka), 16 → 17 (White Sands → Beringia),
pysäkki 20 ja loppu.

*Mikä toimii.* Reittiviiva kasvaa pysäkki pysäkiltä ja on pallolla
selvästi luettava; kamera nousee merimatkoilla niin, että lähtöranta ja
viiva ovat kuvassa (altitude 0,13 → 0,84 Sahulissa, 1,20 Siperia →
White Sands → Beringia -hypyissä) ja lopussa perääntyy koko kaareen
(2,50), jolloin kaikki kaksikymmentä valoa palavat yhtä aikaa.
Hyppykertoimeen 2,2 ja kattoon 3600 ei ollut aihetta koskea: katto
osuu juuri niihin kolmeen hyppyyn, joissa sitä tarvitaan, eikä yksikään
väli jäänyt liian ahtaaksi. Havainnekuvat tulevat ajoissa (paneelin
esilataus kaksi pysäkkiä edellä) ja kuvateksti sanoo saman ajoituksen
kuin kellorivi.

*Kolme vikaa, jotka korjattiin.*

- **Kortissa oli nimikirjainlaatta** ("EI", "SY"), koska löytökuvia
  (`esine/`) ei ole vielä ämpärissä — ruma ja tyhjä. Nyt kortin
  kuvatieto kantaa VARAKUVAN (`vara`, js/linssit/ihmisen-matka.js), ja
  moottori putoaa siihen kuvaelementin omalla `error`-tapahtumalla
  (js/aikajana.js `otaVarakuva`): kortissa on pysäkin havainnekuva
  3:4-kehyksessä, rajattuna KESKELTÄ (`css .varakuva`
  `object-position: center center`), koska kuvaputken turva-alue on
  keskimmäiset 60 % — muotokuvien `center top` leikkaisi maiseman
  taivaaksi. Erillistä HEAD-kyselyä ei tehdä: selain hakee osoitteen
  kerran joka tapauksessa, ja kun kuvaputki tuo löydöt, ensimmäinen
  pyyntö vain alkaa vastata 200 eikä koodi muutu.
- **Kello pyöri harmaana sotkuna.** Askel tuli lukeman suuruudesta
  (100 000 → tuhat vuotta), ja koska pysäkkiväli kestää noin 2,6 s,
  ensimmäisellä välillä (300 000 → 233 000) kello vaihtui 67 kertaa —
  ja matkamittarin murto-osa näytti lisäksi puolittaisia numeroita. Nyt
  askel lasketaan VÄLISTÄ (`valinAskel`, tikkaat 100 … 50 000, tavoite
  noin kuusi vaihtoa välissä), jokainen tikas on sadan monikerta (kaksi
  viimeistä nollaa seisovat aina, isoissa askelissa kolme) ja
  "vuotta sitten" -asteikko ei kuljeta murto-osaa lainkaan
  (`murtoOsa: false`): kello ETENEE ASKELIN, ja jokainen askel on oma
  pieni rullauksensa. Mitattu vaihtotahti on nyt 2–4 kertaa sekunnissa
  kaikilla väleillä (vartija tests/ihmisen-matka.test.mjs laskee sen
  oikeasta aineistosta). Loppupäässä kello vaihtaa VUOSILUKUUN
  (`kellonVuositeksti`, alle 1 900 v. sitten): viimeisellä pysäkillä
  lukee "n. 1250 jaa." — tasan se, mitä aineiston `ajoitus` sanoo, eikä
  "750 v. sitten". Keksintökello on ennallaan (`murtoOsa: true`,
  askel 1, ei tekstiä).
- **Turhat 404:t.** Paneeli haki jokaisen kuvan ensin kansiosta
  `pieni/`, jota tälle kaarelle ei ole tehty (tools/tee-pienet-kuvat.mjs
  osaa vain `aikajana/keksinnot/`). Kaari kertoo nyt itse
  `pienetKuvat: false`, jolloin moottori ohittaa koko portaikon eikä
  esilataa koko kaarta (esilataus on kannattava vain pieninä
  tiedostoina; alkuperäisinä se olisi kymmenen megatavun ryntäys).
  Ajossa jää tasan yksi 404 pysäkkiä kohti — löytökuvan koetus.

*Luennat ja musiikki.* `tools/generoi-linssiluennat.mjs` sai
`--linssi <keksinnot|ihmisen-matka>`: kaari valitaan lipulla, kansio
luetaan kaaren omasta `luentajuuri`-kentästä (`ampariKansio`) ja
pysäkki valitaan tunnuksella, koska vuosilukuja ei ole. Pysäkin luenta
on YKSI LYHYT LAUSE — "Noin 300 000 vuotta sitten. Kasvot, jotka
tunnistaisi — Jebel Irhoud, Marokko." — ja suuret luvut menevät
mallille sanoina (`lukuSanoina`, sama oppi kuin keksintökaaren
vuosiluvuilla). Esittely ja loppusanat luetaan lyhentämättä
(`esittely.mp3`, `loppu.mp3`); loppusanojen luenta on kaaren valinta
(`loppupuhe: true`), joten keksintökaaren loppu on yhä hiljainen eikä
ajo tarjoa sille maksullista kutsua. Työnkulut: `generoi-linssiluennat`
sai syötteen `linssi` (oletus keksinnot — entinen käytös) ja
`generoi-siirtymamusiikki` valinnan `ihmisen-matka` (prompti oli jo
v1612:ssa: syvä ja hidas, rumpu kuin sydämen syke, sanaton kaukainen
ihmisääni, ei melodiaa, 45–60 s looppi). Kumpaakaan ei ole vielä
ajettu: `aanet/linssi-ihmisen-matka-lyria.mp3` ja
`aikajana/ihmisen-matka/puhe/` vastaavat 404, eli kaari on toistaiseksi
hiljainen — puuttuva tiedosto ei riko ajoa.

*Avoinna.* (1) Löytökuvat (`esine/`) puuttuvat, joten kortissa ja
paneelissa on sama kuva; kuvaputken erä poistaa toiston itsestään.
(2) Pieniä versioita ei ole: kortit lataavat alkuperäiset 1536 × 1024
-kuvat, mikä on kaaren mitassa noin kymmenen megatavua. Kun
tools/tee-pienet-kuvat.mjs yleistetään toiselle kansiolle, riittää
poistaa `pienetKuvat: false` — kortit kevenevät alle sadasosaan.
(3) Luennat ja musiikki odottavat ajoa.

**Viivapaksuudet pallolla: asteista ruutupikseleiksi (6.9.2026).** Luvun
10.3 avauslentomerkintä jätti auki, että `MATKAREITIN_PAKSUUS_AST` (0,05)
ja linssien uomapaksuudet oli laskettu asteina, vaikka `pathStroke` on
mitattuna ruutupikseleitä. Ne piirtyivät siis alle pikselin hiuksina.
Tässä erässä ne on korjattu ja MITATTU.

*Mittatikku: neljä tunnettua testiviivaa.* Laudan linssiapurille
annettiin magentat polut paksuuksilla 1 / 2,5 / 4 / 11 ja kaappauksesta
laskettiin viivan leveys laitepikseleinä (Chromium, swiftshader):

| paksuus | 1400 × 900, dpr 1 | 390 × 844, dpr 2 |
|---|---|---|
| 1 | 1 px | 2 px |
| 2,5 | 3 px | 5 px |
| 4 | 4 px | 8 px |
| 11 | 11 px | 22 px |

**DPR EI VAIKUTA.** LineMaterialin `resolution` on kotelon koko
CSS-pikseleinä (mitattu 1379 × 821 ja 374 × 775), ja piirtopuskuri on
dpr-kertainen, joten laitepikseleitä tulee tasan dpr × luku eli
CSS-pikseleinä sama viiva kummallakin. Kompensointia ei siis tarvita —
puhelimen viiva EI ole puolta ohuempi.

*Vakiot ennen → jälkeen (kaikki ruutupikseleitä).*

| vakio | ennen | jälkeen |
|---|---|---|
| `reitit.js MATKAREITIN_PAKSUUS_AST` → `_PX` | 0,05° | 2,5 px |
| `reitit.js MATKAREITIN_VARJON_PAKSUUS_PX` | — | 4 px (uusi) |
| `vesistot.js PALLON_UOMA_AST` → `_PX` | 0,06 / 0,04 / 0,025° | 3,6 / 2,4 / 1,6 px |
| `vesistot.js PALLON_PENGER_AST` → `_PX` | 0,14 / 0,1° | 7 / 5 px |
| `avaus.js AVAUSLENNON_VIIVAN_PX` | 11 px | 11 px (ennallaan) |
| `aikajana.js REITIN_PAKSUUS_PX` | 3 px | 3 px (ennallaan) |

Uoma on laudan oma mitta (LEVEYS 3,0 / 2,0 / 1,3 px) kerrottuna 1,2:lla,
koska pallon pohja on tummempi ja kirjavampi kuin pergamentti; penger on
laudan luku sellaisenaan, sillä penger on REUNA ja reunan mitta on
ruudulla sama molemmilla laudoilla. Zoomi ei enää ohenna mitään: aiempi
avoin kysymys (aste on kiinteä pallon pinnalla) katosi korjauksen myötä.

*Naapurireitin varjo.* Tasokartalla reitti kulki vaalealla pergamentilla;
pallolla sama 42 %:n muste hukkuu tummaan maastoon ja mereen. Jokainen
naapurireitti on nyt KAKSI polkua: 4 px:n vaalea varjo
(`REITIN_VARIT.varjo`, sama pergamentti kuin askelhelmissä, peittävyys
0,3) korkeudella 0,0018 ja sen päällä 2,5 px:n musteviiva korkeudella
0,002 — sama katkoviiva molemmilla, joten katko lukeutuu yhtenä merkkinä.
Eri korkeus on tarpeen: samalle syvyydelle jätettynä kaksi Line2:ta
välkkyisi toistensa läpi kameran liikkuessa.

*Kaari on putki, ei ruutuviiva.* `arcStroke` ei mene Line2:n läpi:
kirjasto rakentaa siitä `TubeGeometry`n, jonka säde on `stroke / 2`
pallon omissa yksiköissä (säde 100). Luku ei siis ole asteita eikä
pikseleitä, joten `LENTOKAAREN_PAKSUUS_AST` on nimetty
`LENTOKAAREN_PAKSUUS_YKS`:ksi eikä sen arvoa (0,06) ole muutettu.

*Mitä EI ollut korjattavana.* Topografia piirtyy kalvona, vertailu ja
maatiedot polygoneina — kummallakaan ei ole polkuja. Polygonin `reuna`
menee `polygonStrokeColor`iin, joka on kirjastossa tavallinen
`THREE.Line` ilman leveyttä (aina 1 px); sitä ei voi säätää eikä siinä
ole `_AST`-vakiota.

*Mitattu ennen/jälkeen (Ateena, näkyvä leveys 240).* Naapurireitit:
ennen 3 polkua, `linewidth` 0,05 → magentaksi värjättynä ruudulla
mediaani 1 px ja vain kourallinen osumarivejä eli käytännössä
näkymätön. Jälkeen 6 polkua (3 varjoa 4 px + 3 viivaa 2,5 px) →
mediaani 5 laitepikseliä työpöydällä ja 8 puhelimella (dpr 2), ja
katkoviiva erottuu kaappauksesta silmällä. Vesistöt: `linewidth`-jakauma
ennen 0,025 × 85 / 0,04 × 71 / 0,06 × 13 / 0,1 × 71 / 0,14 × 13, jälkeen
1,6 × 85 / 2,4 × 71 / 3,6 × 13 / 5 × 71 / 7 × 13; joet lukeutuvat nyt
koko pallolta (kaappaus Euroopasta ja Afrikasta). Vertailulinssi ei
piirrä polkuja kummassakaan (133 polygonia). Sivuvirheitä ei tullut
kummassakaan näkymässä.

*Vartiot.* tests/pallolinssit.test.mjs vaatii, ettei pallon POLKUJEN
paksuusvakioissa ole `_AST`-loppuisia nimiä ja että jokainen arvo on
1,5–12 px; avauslennon 11 ja aikajanan 3 on naulattu erikseen.
tests/vesistot-pallolla.test.mjs vaatii saman uomilta ja penkereiltä.

*Avoin Fablelle.* Penger (7 px) on laudan luku, ja se lukeutuu
maailmanlaajuisessa näkymässä puhelimella jykevänä: pääjoet ovat
paksuja sinisiä nauhoja. Yhden luvun (`PALLON_PENGER_PX`) pudotus
keventäisi sen, mutta se olisi taiteellinen päätös eikä yksikkökorjaus —
jätetty omistajan katsottavaksi.

**Savukkeet nykyiseen arkkitehtuuriin (6.9.2026).** Kaksi savuketta oli
jäänyt aaltoja edeltävään maailmaan:

- `savuke-pallolauta.mjs` vartio 7 odotti, että linssin valinta avaa
  linssikartan kuoren pallon päälle. Aallossa 1C maatiedot on pallolinssi,
  joten vartio mittaa nyt sen, mitä sopimus 10.1 lupaa: `polygonsData`
  saa 133 maata, `ui.pallolinssi` on maatiedot, linssikarttaa EI avata,
  svg#board pysyy tyhjänä ja kartta lepotilassa, pyramidipyyntöjä 0,
  kamera ei liiku, ja sammutus purkaa polygonit ja `maatiedot-tila`n.
  Vartio 8 laskee naapurireitit nyt kahtena polkuna reittiä kohti
  (viiva + varjo). Ajossa 37/38 läpi; ainoa punainen on vartio 6
  (kamera-ajo Sofiaan, dy 24 px > raja 18,7), joka kaatuu SAMOIN
  mainissa ilman tämän erän muutoksia (mitattu erikseen: dy 34,8 px) —
  se on kontin kotelo/piirtopuskuri-kokoero, ei tämän erän vika.
- `savuke-aikajana.mjs --lauta pallo` odotti aaltoa 2A edeltävää kuorta.
  Nyt se mittaa aikajanan pallolla: valot ovat linssiapurin merkkejä
  (`aikajana:<i>`, 25 kpl), tummennus on ruutukalvo, kello ja paneeli
  ovat karttaruudussa, linssikarttaa ei avata ja tasokartta nukkuu; Sulje
  purkaa pallolinssin (merkkejä 0, kalvo pois, pallo näkyvissä). Kamera-
  ja purkuvartioiden mittausikkuna odottaa nyt tapahtumaa (näkymä
  paikallaan, valot tyhjentyneet) kiinteän odotuksen sijaan, koska kontin
  ohjelmisto-WebGL piirtää pallon liu'ut tasokarttaa hitaammin.
  Kameravartio on nyt laudan mukainen: tasokartalla koko kaari (Lontoo ja
  Pietari kuvassa), pallolla LÄHIKUVA — pallon ajo alkaa ensimmäisen
  lampun yltä (`sovitaAlkuun`, omistaja 5.9.2026), eikä koko kaaren
  rajausta enää vaadita. Mitattu näkyvä leveys pallolla on 434
  lautayksikköä (tasokartalla 2 371). HAVAINTO FABLELLE: ensimmäinen
  lamppu (Glasgow, 5691, 1126) jäi mittauksessa pallon `nakyvaAlue()`:n
  suorakulmion ULKOPUOLELLE noin 66 lautayksikköä yläreunan yli, vaikka
  Lontoo oli kuvassa — joko ajo jättää lampun karusellin yläpuolelle
  odotettua ylemmäs tai pallon suorakulmainen arvio näkymästä on
  pystysuunnassa siirtynyt (sama kokoero kuin savuke-pallolaudan
  vartiossa 6). Ei korjattu tässä erässä: se on aallon 2A kameran asia. Kolme vartiota (kortin vuosiluku,
  menneiden korttien sumennus, Tiedeliitteen paneeli) kaatuu YHTÄ LAILLA
  tasokartalla (`--lauta kartta`), eli ne ovat sisällön ja tyylin
  ajautumista eivätkä pallon asia; ne on jätetty koskematta ja kirjattu
  tähän.
- `savuke-avauslento.mjs --lauta pallo` ajettiin samalla: 7/7 läpi, myös
  P6 (lehti aukeaa napautuksesta perillä) ja P7 (kamera kohdekaupungissa
  ±5 %). Mittausikkunaa EI siis levennetty — se odottaa jo tapahtumaa
  (`waitForFunction`: kone näkyy, arkki väistyy, `kartalento` päättyy)
  eikä kelloa, ja kontin nopeus riitti sellaisenaan.

**Karttanostojen kattavuusmittari koko maailmaan (6.9.2026).** Omistaja:
*"Jatka kartta nostojen tekoa koko maailmaan."* `tools/laske-karttanostot.mjs`
laski siihen asti vain Euroopan laudan 29 maata kovakoodatusta listasta;
nyt se laskee kaikki laudan maat (`map.cityCountry` -taulun uniikit
ISO-tunnukset, 112 maata) ja ryhmittelee rivit maanosittain
(`map.cityManner`), maanosan sisällä heikoimmasta vahvimpaan. Maan nimi
tulee pelin omasta taulusta (`map.countryShapes`) eikä työkalun omasta
listasta, ja kohdelista suoraan `js/fokuskohteet.js`:n KOHDE_MAAT-taulusta
— se vietiin vientilistalle (yksi sana), jottei työkaluun tarvitse lisätä
tuontia joka kerta kun uusi `fokuskohteet-<iso>.js` syntyy. Sarakkeet,
tavoitteet ja `--md`-tuloste ovat ennallaan. Vartija:
`tests/laske-karttanostot.test.mjs` (rivejä yhtä monta kuin laudalla
maita, jokaisella rivillä nimi eikä paljas ISO). Luvut ja maailman
eräehdotukset: `docs/moduulit/karttanostot-kattavuus.md`, osio "Kattavuus
koko maailmassa 6.9.2026" — 112 maasta 14 on tavoitteessa ja 32:lla ei
ole yhtäkään karttamerkkiä. Pallolaudalle tämä on inventaariota, ei
piirtoa: samat merkit näkyvät pallolla laudan omien kerrosten kautta.

**Aloitusportti ilman otsikkoa ja juliste salamana (6.9.2026 aamu).**
Omistaja katsoi aloitusporttia työpöydällä ja pyysi sanatarkasti:

> *"ota taustalta pois pelin otsikko ja keskitä aloita seikkailu nappi
> ihan keskelle ruutua. Kun nappia painetaan niin sitten tulee pienellä
> viiveellä yläviiva ja otsikko sitten pienen hetken päästä osa 2
> teksti. se saisi tulla animoidusti niin että kirjainkoko ja kirkkaus
> välähtää isompana ja feidautuu nykyiseen, kuin pieni salaman isku.
> sitten tulisi alaviiva otsikkoon ja pienen hetken päästä alkaisi
> konekirjoitusteksti. maailmankartta-animaatio saisi olla vähän
> tummempi, kuin on ihan aloitusruudussa, ehkä siitä asteen vaaleampi
> mutta ei niin vaalea kuin nyt"*

1. **PORTIN TAKANA VAIN PALLO JA NAPPI.** Juliste (viivat, otsikko,
   "osa II") ja sen pergamenttiharso ovat kokonaan piilossa luokalla
   `.avaus-kesken` — harso on julisteen oma `::before` eikä katoaisi
   rivien mukana, joten se olisi jäänyt portille vaaleaksi soikioksi.
   Nappiryhmä siirtyi 62 %:n korkeudelta ruudun keskelle
   (`.start-gate-keskus` `top: 50%`, `translate(-50%, -50%)`), ja
   portin tummennuksen soikio 42 %:sta 50 %:iin — valoisinta kohtaa ei
   enää tarvita otsikolle. "Oppiminen on hauskaa" jää alareunaan.
2. **VIISI VAIHETTA, JOKAINEN OMANA AJASTIMENAAN** napin painalluksesta
   (js/ui.js): `AVAUS_YLAVIIVA_MS` 600 (yläviiva piirtyy keskeltä ulos
   `VIIVAN_PIIRTO_MS` 520 ms:ssä, harso feidaa mukana) ·
   `AVAUS_OTSIKKO_MS` 1050 (MATKAKIRJA + Vernen kaksi riviä salamana) ·
   `AVAUS_OSA_MS` 1750 · `AVAUS_ALAVIIVA_MS` 2250 ·
   `AVAUS_KERTOMUS_MS` 2850 (kirjoituskone ja luenta, ja samalla
   tekstipalstan harso). Vanhat `OSAN_VIIVE_MS`/`OSAN_HAIVYTYS_MS` ja
   `.osa-piilossa` poistuivat.
3. **SALAMA ON TRANSFORMI, EI KIRJASINKOKO.** Rivi maalataan ensin
   kerran `SALAMAN_KERROIN`-kokoisena (1,25×) ja kirkkaana
   (`filter: brightness(1.5) drop-shadow(...)`, `transition: none`), ja
   vasta seuraavassa kehyksessä luokka vaihtuu lopulliseen, jolloin
   koko, kirkkaus ja hehku feidaavat nykyiseen `SALAMAN_KESTO_MS`
   600 ms:ssä. Näin fitIntron mitoitus ei liiku eikä asettelu hypi —
   sama juurisyy kuin 5.9. otsikkohypyssä. Vähennetyllä liikkeellä
   järjestys ja ajat ovat samat, mutta salamaa ei oteta: pelkät
   häivytykset.
4. **TAUSTAPALLO TUMMENI.** `.intro.intro-pallolla .intro-verho` oli
   vaalea pergamenttihuntu `rgba(239, 220, 180, 0.38)`, joka pesi
   pallon kalpeaksi heti napista. Nyt se on sama kaava ja väri kuin
   portilla, yhtä astetta vaaleampana: portti `--portin-tummennus` 0,28
   keskellä ja `--portin-tummennus-reuna` 0,6 reunoilla, avaus
   `--avauksen-tummennus` 0,18 ja `--avauksen-tummennus-reuna` 0,44.
   Tekstin luettavuus ei ole tämän varassa vaan palstan ja otsikon
   omien harsojen.

Vartijat: tests/lento-ajoitus.test.mjs (viisi vaihetta järjestyksessä ja
välit 600/700/500/600 ms, juliste piilossa portin takana, salama
transformilla eikä kirjasinkoolla, kirjoituskone vasta alaviivan
jälkeen, vähennetty liike ilman salamaa) ja savuke
`tools/savukkeet/savuke-etusivupallo.mjs` E11b–E11f uusilla hetkillä
0,3 / 0,8 / 1,2 / 1,5 / 2,5 / 3,5 / 4,5 / 6 / 25 s. Todennettu
Playwrightilla (Chromium, swiftshader) 1280 × 800 ja 390 × 844 sekä
pallolla että tasokartalla (`?lauta=kartta`) ja vähennetyllä liikkeellä.
**Lepolaadun terävyys, hypyn kynnykset ja luettelon välimuisti (6.9.2026
aamu).** Omistaja työpöydältä, kuvakaappaus Kreikasta lähimmässä
zoomissa: *"vielä röpelöistä, varsinkin teksti"*. Mitattu selaimessa
(Playwright + swiftshader, `serviceWorkers: 'block'`, media reititetty
Node-fetchillä; skriptit `scratchpad/asettelu/tera-mittaa.mjs`,
`tera-kaappaa.mjs`). Neljä havaintoa ja kolme korjausta:

1. **Kynnysmoottori.** Globe.gl valitsee tason PELKÄSTÄ korkeudesta
   (`thresholds.findIndex(k => k <= korkeus)`, `maxLevel` = luettelon 8).
   Työpöydällä 2000 × 1160 dpr 2 (kotelo 1979 × 1081, piirtopuskuri
   3958 × 2162) kynnys 0 oli **24,67** (= 8 · lepokerroin 3,91 ·
   napakerroin 0,786) ja tasot **7 / 8 / 8** korkeuksilla 0,30 / 0,15 /
   0,05; dpr 1:llä kynnys 12,33 ja tasot **6 / 7 / 8**; iPhonella
   390 × 844 dpr 3 kynnys 26,39 ja tasot **7 / 8 / 8**.
2. **Terävyys 0,55 → 1,0 lähikuvassa** (`LAATU_TERAVYYS`, js/pallo.js).
   Kynnys pyöristyy aina ylöspäin, joten 1,0 takaa, että laatta on
   levossa vähintään yhtä tarkka kuin ruutu; 0,55 salli 1,8× venytyksen.
   Mitatut tasot ja laattamäärät samassa näkymässä (yksi lepo):
   työpöytä dpr 2 korkeus 0,30 **taso 7 → 8**, laattoja **119 → 528**,
   tekstuureja 170 → 605; dpr 1 korkeus 0,30 taso 6 → 7 (46 → 119) ja
   0,15 taso 7 → 8 (42 → 139); iPhone saapumisnäkymä (korkeus 0,278)
   **taso 7 → 8**, laattoja 85 → 207, tekstuureja 103 → 157. Hinta on
   siis nelinkertainen laattamäärä siinä oktaavissa, jossa taso nousee —
   `LAATU_TERAVYYS` on yksi vakio, jolla sen voi laskea takaisin.
   Yleiskuvassa (korkeus > `LAATU_KAUKORAJA` 0,6) käytetään entistä
   0,55:tä: pallon kaarevuus tuo reunat kuvaan, ja terävyys 1,0 nostaisi
   koko pallon näkymän (2,5) tasolle 5 eli **1 024 laattaan** tason 4
   (256) sijaan — mitattu.
3. **RUUDUN LEVEYS EI KUULU KYNNYKSEEN.** Globe.gl:n fov 50° on
   pystysuunnan avauskulma ja three.js pitää sen kiinteänä, joten
   ruutupikseleitä astetta kohti on H / (53,4 · korkeus) sekä pysty- että
   vaakasuunnassa: leveä ruutu näyttää leveämmän kaistan SAMALLA
   tiheydellä. Mitattu korkeudella 0,0368 työpöydällä 550 css-px/aste
   pystyssä ja 439 px vaakasuunnassa = 550 · cos 38° — täsmälleen kaava.
   Leveyden lisääminen kertoimeen nostaisi tasoa nelinkertaisella
   laattamäärällä ilman yhtään uutta yksityiskohtaa. Kerroin lasketaan
   nyt piirtopuskurin korkeudesta (kotelon korkeus × min(dpr, 3)) eikä
   `clientHeight × dpr`:stä, joka yliarvioisi dpr > 3 -laitteilla.
   **Mitä leveä ruutu tekee, on viedä kameran lähemmäs:** sama pyydetty
   näkyvä leveys on työpöydällä korkeus 0,074 ja puhelimessa 0,29, ja
   lähin sallittu näkymä (`PALLOLAUDAN_SIIRTOLEVEYS` 120 yks = 3,6°)
   venyttää työpöydällä Z8:aa **4,8-kertaiseksi** (puhelimella `lahinLeveys`
   pitää rajan 2× venytyksessä, 103 yks). Siksi omistajan kuvakaappauksen
   sumeat nimet EIVÄT korjaannu kynnyksillä: taso 8 on jo valittuna, ja se
   on syvin ämpärissä oleva. Kaappaukset korkeudella 0,0368 ennen ja
   jälkeen ovat tavu tavulta samat (`tera-poyta-lahin-{ennen,jalkeen}-rajaus.png`).
   **Fablelle: seuraava askel on taso 9** (venytys 2,4×) tai 10 (1,2×)
   nostosarjaan — tai poltettujen nimien korvaaminen elävillä
   lähimmässä zoomissa.
4. **Hyppy jätti kynnykset vanhoiksi (korjattu).** `lepoon()` palasi heti,
   jos `lepo` oli jo tosi, ja yksi `pointOfView(pov, 0)` -hyppy ei kestä
   `LAATU_LIIKEVIIVE_MS`:ää, joten kynnykset jäivät edellisen näkymän
   leveysasteelle ja korkeudelle. Mitattu: hyppy lähikuvasta korkeuteen
   2,5 haki tason 5 laatat (**1 024 kpl**) ennen kuin lepo olisi korjannut
   sen. Nyt lepo laskee kynnykset aina uudestaan, ja terävyysalueen
   vaihtuminen korjaa ne heti hypyn yhteydessä (sama koukku kuin
   napakertoimen 4°:n askel). Korjauksen jälkeen sama hyppy hakee tason 4
   (256 laattaa).
5. **laatat.json ei enää jää selaimen välimuistiin.** Luettelo haettiin
   `cache: 'force-cache'` -pyynnöllä, joka tarjoaa kappaleen vanhentuneenakin
   — palaava pelaaja ei olisi saanut 6.9. klo 04.50 valmistunutta
   `tasot.max = 8`:aa lainkaan. Nyt `no-cache` (ETag → 304); jos verkkoa ei
   ole, kappale haetaan vielä `force-cache`-pyynnöllä, joten lentokonetila
   säilyy. Sama sw.js:n taustapäivityksessä (`cache: 'no-cache'`) —
   ämpäri antaa luettelolle max-age 3600, ja kori on jo yhden käynnistyksen
   jäljessä. Laatat itse eivät revalidoi: ne ovat immutable.
**Avauslennon kamera seuraa konetta, ja valinnan pallo pyörii hitaammin
(6.9.2026 aamupäivä).** Omistaja katsoi avauslennon ja lähtövalinnan ja
pyysi sanatarkasti:

> *"Kohdemaan valinnassa hitaampi pallon liike. Lentokonekohtauksessa
> paljon lähempi zoom aste ja kamera seuraa konetta. Kartta myös zoomaa
> koko ajan pikkuhiljaa lähemmäs konetta. Pallon ei tarvitse siis
> liikkua lentokohtauksessa."* — ja erikseen: *"Maapallo saa olla vähän
> vaaleampi sittenkin kun näin testikuvasi"*.

1. **VALINNAN PYÖRINTÄ 0,4 → 0,16 °/s.** `ALOITUKSEN_PYORINTA_AST_S`
   (js/pallolauta/lauta.js). Perustelu on ruudun mitta eikä maku:
   valintanäkymä on mitattuna 1 200 lautayksikköä (36,0°) työpöydällä
   1280 × 800 ja 986 yksikköä (29,6°) puhelimella 390 × 844, eli yksi
   pituusaste on 36 ja 13 ruutupikseliä. 0,4 °/s liikutti kuvaa
   14 px/s työpöydällä ja 5 px/s puhelimella — sen katse joutuu
   seuraamaan; 0,16 °/s on 5,7 ja 2,1 px/s. Täysi kierros kestää
   37 minuuttia. Silmukka, kolme pysäytintä ja
   terävän tilan pakotus ovat ennallaan (kohta 3 yllä).
2. **AVAUSLENTO ON NYT KAMERAN SEURANTAA, EI RAJAUSTA.**
   `AVAUSLENNON_RAJAUKSEN_MARGINAALI` ja `AVAUSLENNON_PYORINTA_AST`
   POISTUIVAT (js/pallolauta/avaus.js); tilalla on
   `AVAUSLENNON_ALKULEVEYS` **600 lautayksikköä** (≈ 18°) ja seuranta,
   joka kirjoittaa `pointOfView`n joka kehyksellä:

   - **Kohde luetaan koneen omasta kellosta ja kaaresta**
     (`hypynVaihe` + `lentokaarenKohta`) — samat kaksi kaavaa kuin
     koneella (siirto.js) ja paksulla jäljellä, joten kolme yhtä aikaa
     piirtyvää asiaa lukee yhtä totuutta.
   - **Paikka silotetaan eksponentiaalisesti**
     (`AVAUSLENNON_SEURANNAN_VIIVE_MS` 260 ms); viimeinen kehys
     asetetaan täsmälleen koneen kohdalle. Kehysväliä EI katkaista
     (toisin kuin valinnan pyörinnässä): eksponentti kyllästyy
     itsestään, joten pitkä väli napsauttaa kameran koneen kohdalle
     sen sijaan, että jälkijättö kasvaisi. Mitattu kontissa
     (kehysväli ~250 ms): katkaisun kanssa 186 px sivussa, ilman 37 px.
   - **Korkeus liukuu logaritmisesti** `liukuPehmennys`-käyrällä
     (entinen `pyorinnanPehmennys`, nimi vaihtui koska pyörintää ei
     enää ole) alkuleveydestä saapumisleveyteen — ei porrasta, vaan
     koko lennon mittainen hidas lähentyminen.
   - **Loppu on TÄSMÄLLEEN saapumisnäkymä** (`PALLOLAUDAN_
     SAAPUMISLEVEYS` 240), joten laskeutumisen oma ajo (siirto.js
     `laske` → `kamera.kotiin`) on nolla-ajo eikä siirtymä hypi.
     Molemmat päät lasketaan `kamera.kameranKohde`lla, joten laattojen
     tarkkuusraja (`lahinKorkeus`) pitää myös lennolla.
   - **Kone ratsastaa hitusen keskilinjan yläpuolella**
     (`AVAUSLENNON_KONEEN_NOSTO` 0,15 näkyvän alueen korkeudesta).
     Syy on mitattu: isoisän valokuva (.lento-valokuva) on kapealla
     ruudulla 37,5 vw leveä ja kiinni vasemmassa laidassa — mitattuna
     390 × 844 kortti peitti x 16…246, y 392…561, ja täsmälleen
     keskellä lentävä kone (195, 447) oli sen TAKANA koko lennon.
     Nosto ajetaan sisään ja ulos trapetsilla
     (`AVAUSLENNON_NOSTON_RAMPPI` 0,15, `nostonOsuus`), jottei kamera
     loikkaa arkin väistyessä eikä laskeutuessa. Viimeisen kymmenyksen
     ajan kone laskeutuu takaisin keskelle ja sipaisee kortin
     häivytettyä ylälaitaa — se on tietoinen vaihtokauppa siitä, että
     laskeutuminen osuu saapumisnäkymään pikselilleen.
   - **Ele ei kilpaile seurannan kanssa:** lennon ajan kotelon päällä on
     koko ruudun lentokalvo (js/ui.js `.flight-overlay`), joka ottaa
     napautuksen ja ohittaa lennon; ohitus vie kameran maaliin.
   - **Reduced motion:** kone ei lennä, joten `rajaus` on suoraan
     kohdekaupungin saapumisnäkymä ja ui.js asettaa sen kerralla arkin
     takana. Seurantasilmukkaa ei käynnistetä lainkaan.
3. **LENTOREITIN LAATAT ETUKÄTEEN KORIIN.** Lähempi kuva pyytää Z7:ää
   pitkin koko kaarta ja Z8:aa laskeutumisessa, eikä laattamoottori hae
   mitään ennen kuin kamera on jo siellä. `js/pallo.js` sai
   `reitinLaatat` (käytävä kaaren ympärillä, `REITIN_ESILATAUSTASOT`
   [6, 7], säde 1 laatta) ja `esilataaLentoreitti`, jonka
   `avaus.js valmistele` kutsuu heti — pergamenttiarkin takana on
   sekunteja aikaa. Lontoo → Ateena (kaari 21,5°) on 24 näytettä ja
   laskettuna 86 laattaa käytävässä (33 tasolla 6, 53 tasolla 7) plus
   9 laskeutumislaattaa tasolla 8 — noin 1,4 Mt, kun koko maailman taso
   7 olisi 21 845 laattaa. Tämä EI kuluta
   `esilataaPallolaatat`in kerran-per-istunto-lupaa (reitti tiedetään
   vasta lennon alkaessa), ja työntekijä ohittaa jo korissa olevat.
   *Ei mitattavissa kontissa:* savukkeet ajavat `serviceWorkers: 'block'`
   -tilassa, joten kutsu palauttaa nullin; vartija on
   tests/pallo.test.mjs (käytävän geometria ja viestin muoto).
4. **ETUSIVUN AVAUKSEN TUMMENNUS 0,18 → 0,12 ja reuna 0,44 → 0,34**
   (css `.intro.intro-pallolla .intro-verho`). Portti jää ennalleen
   (0,28 / 0,6): tilaus koski avausta.

*Mitattu Playwrightilla (Chromium, swiftshader, laatat Noden fetchillä
media.matkakirja.appista) 6.9.2026, Lontoo → Ateena. Lento venytettiin
15-kertaiseksi, jotta kaappaus ehtii kunkin osuuden kohdalle; käyrä on
lennon osuuden funktio, joten venytys ei muuta geometriaa.*

| osuus | altitude 1280 × 800 | altitude 390 × 844 dpr 3 | näkyvä leveys (yks) | kone keskipisteestä (TP / puhelin) |
|---|---|---|---|---|
| 0 % | 0,194 | 0,700 | 600 | 0 px / 0 px |
| 25 % | 0,172 | 0,622 | 532 | 126 px ylös / 122 px ylös |
| 50 % | 0,127 | 0,456 | 391 | 193 px ylös / 130 px ylös |
| 75 % | 0,092 | 0,331 | 284 | 162 px ylös / 123 px ylös |
| 100 % | 0,078 | 0,280 | 240 | 8 px ylös / 16 px ylös |

Vaakasuunnassa kone pysyi työpöydällä 1–45 px ja puhelimella 1–17 px
keskilinjasta (kontin kehysväli 250 ms; oikealla laitteella jälkijättö
on aikavakion 260 ms mittainen eli murto-osa tästä). Isoisän kortti oli
mitattuna työpöydällä x 45…422 ja puhelimella x 16…246 — kone on siis
molemmilla sen ulkopuolella koko lennon paitsi viimeisen kymmenyksen
ajan, jolloin nosto laskee sen takaisin keskelle. Osuuden 0 % kuvassa
kortti on koneen päällä, mutta se on VENYTYKSEN harha: kortti feidaa
näkyviin 2 600 ms kalvon syntymisestä (LENNON_VALOKUVAN_VIIVE_MS), eli
oikealla nopeudella vasta kun noston ramppi (15 % lennosta ≈ 1,2 s) on
jo ylhäällä.

Näkyvä leveys on sama lautayksikköinä molemmilla laitteilla (kameran
kuvasuhdekorjaus, luku 10.3 kohta 1), ja perillä `kameranTila().leveys`
on 240,0 eli tasan saapumisporras. Kaappaukset:
`scratchpad/lento6/lento-{tyopoyta,puhelin}-{0,25,50,75,100}.png`.
Pyörintä mitattiin samalla ajolla (lng 5 sekunnissa): kontin
ohjelmistorasteroijalla 0,053 °/s työpöydällä ja 0,009 °/s puhelimella —
kehysväli on siellä 250–600 ms ja pyörinnän dt katkaistaan 100 ms:iin,
joten mitattu kulmanopeus on murto-osa nimellisestä; oikealla laitteella
kello antaa täyden 0,16 °/s. Avauksen tummennus luettiin
`getComputedStyle`lla: 0,12 / 0,34.

Vartijat: tests/pallolauta.test.mjs (alkuleveys paljon vanhaa
lähempänä, zoomi yhteen suuntaan, loppu = saapumisleveys, seuranta
samasta kellosta, noston trapetsi, reduced motionin rajaus),
tests/aloitus-pallolla.test.mjs (pyörinnän uusi haarukka),
tests/pallo.test.mjs (reitin käytävä ja erillinen esilatausviesti).
`tools/savukkeet/savuke-avauslento.mjs` sai samalla KAKSI korjausta.
(1) Se reititti yhä vanhaa `pub-*.r2.dev`-isäntää eikä nykyistä
media.matkakirja.appia, joten `--lauta pallo` mittasi mustaa palloa
(0/7 vartiota); nyt molemmat isännät kelpaavat ja täytetty vastaus saa
`access-control-allow-origin`-otsakkeen, jota THREE:n tekstuurilataus
vaatii — mitattuna laattapyyntöjä 2 → 673. (2) P4 vaati LUKUA KAKSI
pallon nimistä lennon aikana; seuraava kamera pitää reitin toisen pään
kuvan ulkopuolella, joten kaukainen nimi ei enää lados. Vartio mittaa
nyt sääntöä eikä lukua: mikään MUU kaupunki kuin Lontoo ja kohde ei saa
nimeä. Ajossa (Lontoo → Ateena, 834 × 1194) **6/7 läpi** — myös P7,
eli kamera on perillä kohdekaupungissa ja näkyvä leveys 240 ±5 %, mikä
on tämän erän tärkein yksittäinen mitta (lennon zoomin loppupää =
saapumisnäkymä). Ainoa punainen on P6 (kaupunkilehti aukeaa
napautuksesta perillä), joka kaatuu kontin hitauteen samoin kuin
aiemminkin (`{tulos: true, auki: false}`, ks. luvun aiempi merkintä
5.9.2026). Vartion omat kaappaukset
(`tools/savukkeet/kaappaukset/avauslento-pallo*.png`) jätettiin
päivittämättä: ne ovat megatavun kokoisia eikä binäärihistoriaa
kannata paisuttaa yhdestä ajosta.

**Lepokerros — levossa pallo on yhtä terävä kuin tasokartta (6.9.2026
iltapäivä, fablemax).** Omistaja: *"kartta oli ennen palloa paljon
terävämpi, eli ongelma on pallon renderöinnissä. ainakin kun liike on
pysäytetty, kuva pitäisi renderöityä samalla tarkkuudella kuin 2d
kartassa"* (Raamattu, PALLO LEVOSSA YHTA TERAVA KUIN TASOKARTTA).
Mitattu syy: pallon Z8-sarja on poltettu pyramidin z7:stä (240 →
182 px/aste päiväntasaajalla) jpeg-laatuun 80, ja jokainen pikseli
käy kaksi uudelleennäytteistystä (Miller → Mercator, Mercator → pallon
pinta). Toteutus `js/pallo.js` (`luoLepokerros`, kytketty samaan
lepo/liike-koneeseen kuin laatutaso, `kytkeLaatunosto`): kun kamera on
ollut paikallaan `LAATU_LEPOVIIVE_MS`, ruudun 7 × 7 pistettä
säteenjäljitetään pallolle, niistä lasketaan leveys-pituus-laatikko
(sauma aukikierrettynä), valitaan pyramidin taso, jonka px/aste ≥
ruudun laitepikselit/aste, kootaan pohja + viiva + nosto -laatat yhdelle
kankaalle täsmälleen tasokartan osoitteilla ja ruudukolla
(`js/laattapyramidi.js` uudet ovet `haePyramidinLuettelo`,
`pyramidinKerrostasot`, `pyramidinLaattaUrl`, `pyramidinLaattaOlemassa`)
ja piirretään pallon pinnalle 0,25°:n verkkona, jonka UV on Millerin
kankaalla. Kerros häipyy päälle 260 ms (reduced motion: heti) ja
poistuu scenestä HETI ilman häivettä, kun liike alkaa (ks. korjaus
alla). Säde TÄSMÄLLEEN pinnan (1,0): järjestys laattoihin nähden tulee
syvyyssiirrosta (polygonOffset, 8 askelta kameraa kohti, ei
kaltevuustermiä), merkit (≥ 1,0015) jäävät päälle; syvyys kirjoitetaan
ja kerros piirretään läpinäkyvien ensimmäisenä (renderOrder −1), jotta
linssin polygonit ja napakannen häive jäävät sen päälle. Rajat: ei
yleiskuvassa (korkeus >
0,6), laattakatto ruudun laitepikseleistä (4 × pikselit / 512², 16…64),
kangas ≤ 8192 ja näytönohjaimen katto, tiheysvahti (karkeampaa kuin
pallon omat Mercator-laatat katsotulla leveysasteella ei koota — mitattu
puhelimella Euroopan yllä z5 olisi ollut askel taaksepäin), versiovahti
(pallon laatat.json versio/viivat/nostot = pyramidi.json versio/
viivataso/nostotaso, muuten ei kerrosta). Mittaus (Chromium, Kreikan
lähikuva korkeus 0,12, Laplace-varianssi ruudun keskeltä): työpöytä
2758 × 1642 363 → 388, puhelin 1170 × 2532 188 → 229; Euroopan
yleiskuvassa kerrosta ei koota (tiheysvahti). Kustannus: Kreikan
lähikuva työpöydällä 48 laattaa × 3 kerrosta (kangas 4096 × 3072,
~50 Mt + mipmapit), puhelimella ~20 laattaa (2048 × 2560). Vartiot:
`tests/pallolepokerros.test.mjs`; savukkeissa pyramidipyynnöt lasketaan
nyt erotuksena lepokerroksen omista (`lauta.lepokerros().mittarit()`).
Hylätty varakeino: pallon Z9 litteästä z8:sta — pyramidissa ei ole
z8:aa, joten Z9 olisi venytetty z7 nelinkertaisella laattamäärällä.
AVOIN: laattamoottori hakee levossa työpöydällä yli tuhat Z8-laattaa
(lepokerroin), ja lepokerroksen kuvat jonottavat niiden perässä samalle
palvelimelle (fetchPriority high auttaa vain Chromiumissa); mobiilin
muisti on riski, jos kangas 45 laattaa (~47 Mt) osuu laattamoottorin
oman huipun päälle.

**Lepokerroksen hyppy ja nykivä vieritys (6.9.2026 ilta, fablemax).**
Omistaja v1639:stä sanatarkasti: *"kun kuva tarkentuu, niin se
zoomautuu vähän sisään, mikä näkyy hyppynä. saako pois? vieritys ei ole
jostain syystä enää niin sulavaa vaikka tarkkuus vieritys on pois
päältä ja kartta on röpelöinen vierityksen aikana"*. Mitatut syyt
(Chromium 390 × 844 dpr 2, Kreikka korkeus 0,09; skripti mittasi
neljännesten SAD-siirtymän kerros näkyvissä vs. piilossa): (1) säde
1,001 on lähikuvassa suurennos 1/(korkeus × 10) — mitattu 1,3 %, alaosan
neljänneksissä dx ±3,0 ja dy −5,3 laitepikseliä, ja häive teki siitä
zoomin sisään; (2) kerros koottiin samasta 260 ms:n levosta kuin
laattataso nousee, joten raahauksen mikrotauko (350 ms sormi pohjassa)
käynnisti kokoamisen ja tekstuurin viennin — tauon jälkeinen kehys
1 117 ms, kun muut olivat ~430 ms (v1638 samassa kohdassa 633 ms;
ohjelmistopiirto, absoluuttiset ajat eivät vastaa laitetta); (3)
röpelö oli 150 ms:n ulos-häive liikkeessä: suurennettu kerros laattojen
päällä kahtena kuvana. Korjaus (`js/pallo.js`): `LEPOKERROS_KOROTUS` 1
ja materiaalille `polygonOffset` (`LEPOKERROS_SYVYYSSIIRTO` −8 askelta,
factor 0 — kaltevuustermi kasvaisi pallon reunalla merkkien nostoa
suuremmaksi; vähimmäisverkko 64 silmää pitää jänteen painuman alle
puolen syvyysaskeleen jokaisella korkeudella, laskettu
`tests/pallolepokerros.test.mjs`); liike poistaa kerroksen scenestä
heti ilman häivettä; kokoaminen vasta aidon levon jälkeen
(`LEPOKERROS_LEPOVIIVE_MS` 400 ms viimeisestä liikkeestä JA sormet irti
kotelosta, `luoLepokerroksenAjoitus`); tekstuuri viedään
näytönohjaimelle heti kokoamisen päätteeksi (`renderer.initTexture`).
Mittaus korjauksen jälkeen: siirtymä kerros→ilman ≤ 0,18 px kaikissa
neljänneksissä korkeuksilla 0,04 ja 0,09 (suurennos 0,00001);
syvyystesti päällä vs. pois -erokuvassa vain nappulan varjo (ei
z-fighting-täpliä); neljässä raahauksessa (tasainen ja mikrotauot)
kokoamislaskuri ei kasvanut kertaakaan sormen ollessa pohjassa, ja
tauon jälkeinen kehyspiikki katosi (max 517 ms = muiden kehysten
tasoa). Laattamoottorin oma lepo (260 ms, kynnykset, pikselisuhde) on
ennallaan — liikkeessä pallo piirtyy täsmälleen kuten v1638.


**Pisteet pallolla — levy ja aarrepiste (6.9.2026 ilta, iPhone).**
Omistaja: *"piste venyy kun karttaa panoroi. nyt kartta ei tökkinyt
enää"* ja *"aarteen piste syttyy liian lähelle ateenaa, ei pysty
painamaan"*, *"sama ongelma myös sofiassa"*. (1) VENYMÄ oli geometriaa,
ei liikettä: Globe.gl piirtää `pointsData`n lieriönä pinnasta
korkeuteen, ja kaupunkipiste (säde 0,03, korkeus 0,003) on 0,3 yksikköä
korkea mutta 0,105 leveä eli tappi (askelhelmi 0,25 × 0,05). Lähikuvassa
kamera on 8 yksikön päässä pinnasta: keskellä tappi näkyy päästä, mutta
laidalla vaippa piirtyy kapseliksi pinnan pisteestä kohti kattoa, ja
nappulan jalka (html-merkki korkeudella 0,004) on vielä kauempana —
levossa nappula seisoo pisteen päällä ruudun keskellä, joten vika näkyi
vasta panoroitaessa. Mitattu (Chromium 390 × 844 dpr 2, korkeus 0,08,
erotuskuva piste näkyvissä/piilossa nappula piilotettuna): keskellä
22 × 22 laitepikseliä; 334 css-px keskustasta lieriö 22 × 50, pääakselien
suhde 2,2 — sama v1640:ssä (22 × 41; sen 1,001-säteinen lepokerros
peitti vaipan juuren levossa, liikkeessä sekin oli poissa) ja
v1641:ssä; lepokerros ei siis ole syy. Korjaus
(`js/pallolauta/lauta.js` `luoPisteidenLitistaja`): jokaisen pisteen
geometria vaihdetaan LEVYYN — lieriön kansi yläpäässä (paikallinen
z = −1, jonka `scale.z` vie korkeuteen), normaali ulospäin, ei vaippaa —
`pointRadius`-luennassa, jolloin kirjasto on jo sitonut olion datumiin;
geometria rakennetaan kirjaston omilla luokilla ensimmäisestä lieriöstä
(vrt. `js/pallo.js kolmiulotteinen`). Korkeus, väri, napautus (raycast
kanteen) ja siirtymät ovat ennallaan. Levynä 334 css-px keskustasta
22 × 23, suhde 1,0. Hylätty: `pointAltitude` pienemmäksi (kirjaston
lattia 0,1 yksikköä jättää vaipan, ja korkeus on piirtojärjestys) ja
oma Object3D-kerros (toinen napautus- ja siirtymäpolku). (2) AARREPISTE
piirtyi pallolla datan koordinaatteihin eli täsmälleen nappulan
jalkaan (Ateenassa 1,3 css-px kaupungin ruutupisteestä, nappulan
svg-laatikon sisällä), ja pallon osumatesti (lähin merkki) antoi
tasapelin kaupungille: napautus avasi kaupunkilehden. Tasokartan
sivusiirto (26.8.2026, koilliseen kun piste on alle 14 yksikön päässä
laatasta) on nyt yksi funktio `js/fokuspiste.js fokuspisteenSiirto`,
jota molemmat laudat käyttävät; pallolla (`js/pallolauta/nostot.js`)
merkki JA osuma siirtyvät, data ei. Saapumisnäkymässä (korkeus 0,28)
piste on 22 css-px kaupungista koilliseen, nappulan oikean olkapään
vieressä, ja napautus avaa Ateenassa laattakysymyksen ja Sofiassa
pöllön sähkekortin. Vartiot: `tests/pallopiste.test.mjs` ja
savuke-pallolauta 15–16.
**Liike ja zoom täydellä tarkkuudella — suunnitelma (6.9.2026 ilta,
fablemax).** Omistaja v1642:sta: *"rannan ääriviiva … kasvaa niin
paljon paksummaksi"*, *"Google Earthissä myös sisäänpäin zoomaus
näyttää portaattomalta"*, *"löytyisikö netistä tähän jo valmista
koodiratkaisua?"*. Mitattu (tools/savukkeet/mittaa-pallon-liike.mjs,
puhelin 390 × 844 dpr 3, 4×): reunan leveys levossa 2 px (Z8),
liikkeessä 5 px (Z5, jonka rantaviiva on piirretty paksulla musteella);
?laatu=aina pitää 2 px:n reunan mutta laattamoottorin updatePov maksaa
Z8:lla 33 ms/kutsu (zoomissa max 558 ms), laatat kertyvät purkamatta
(227 → 500 → 975) ja jopa 55 % niistä on pallon takapuolella. Valmiit
kirjastot (MapLibre, 3d-tiles-renderer, Cesium, OpenGlobus) kokeiltiin
omilla laatoilla eikä mikään täytä vaatimuksia kohtuullisella
siirrolla. Valittu ratkaisu: oma laattakerros Globe.gl:n sisään —
pyramidin laatat laatta kerrallaan pysyvinä, ruutupohjainen taso
hystereesillä, ristihäive, LRU-kiintiö, pohjamoottori naulattuna
tasoon ≤ 5; lepokerros ja liike/lepo-laatutilat poistuvat. Mittaukset,
kirjastovertailu, algoritmi ja Opus-parven erät E0–E5 tehtävänantoineen:
docs/moduulit/pallon-liike-taydella-tarkkuudella.md. Pelikoodia ei
muutettu tässä vaiheessa.

**E0 tehty: laattakerroksen apurit omaan moduuliin (6.9.2026 ilta).**
Suunnitelman ensimmäinen erä on mekaaninen siirto ilman käytösmuutosta:
lepokerroksen puhtaat laskimet (näkyvä alue, laattakatto, tason valinta,
laattaruudukko, Millerin UV, verkon puskurit, levon ajoitus) ja niiden
vakiot siirtyivät sanatarkasti tiedostosta `js/pallo.js` uuteen
moduuliin `js/pallolaatat.js` — 337 riviä pois, 337 riviä sisään, ei
yhtään muutettua merkkiä. Mukana muuttivat `LAATU_LEPOVIIVE_MS` ja
`LAATU_KAUKORAJA`, koska `LEPOKERROS_KORKEUSRAJA` alustuu jälkimmäisestä
ja uusi moduuli pidetään tuonneitta: toisin päin tuonti tekisi kehän,
jossa vakio jäisi alustamatta. `js/pallo.js` tuo nimet takaisin ja vie
ne edelleen (`export … from './pallolaatat.js'`), joten testit, savukkeet
ja `js/pallolauta/` näkevät saman rajapinnan kuin ennen; `luoLepokerros`
ja `kytkeLaatunosto` jäivät paikoilleen. Rivimäärät: js/pallo.js
2067 → 1757, js/pallolaatat.js 364. Moduuli on sw.js:n SHELLissä heti
`js/pallo.js`:n jälkeen (ei niputuksessa, kuten pallo.js). Vartio:
`tests/pallolepokerros.test.mjs` vaatii, ettei pallo.js enää määrittele
siirrettyjä nimiä ja että uusi moduuli ei tuo mitään. Seuraava erä E1
rakentaa näiden apurien päälle itse laattakerroksen.
