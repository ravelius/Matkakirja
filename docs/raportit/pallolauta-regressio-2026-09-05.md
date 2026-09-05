# Pallolaudan regressiotaulukko: vanha kartta vs. karttapallo (5.9.2026)

*(Kertaraportti pallolaudan vaiheesta 6, docs/moduulit/karttapallo.md
luku 7 rivi 6. Mitattu kontissa Playwrightillä samalla tallenteella —
Fogg Ateenassa, `phase: 'action'`, aarre löydetty — iPhone-kokoisella
näkymällä 390 × 844, dpr 2, `serviceWorkers: 'block'`, ämpäri proksattuna
Noden kautta (`NODE_USE_ENV_PROXY=1`) kuten
tools/savukkeet/savuke-pallolauta.mjs. Työkalu:
`NODE_USE_ENV_PROXY=1 node tools/mittaa-lautaregressio.mjs [markdown]`.)*

## LUE TÄMÄ ENSIN: mitä luvut EIVÄT kerro

**Kontin Chromium piirtää ohjelmisto-WebGL:llä (SwiftShader), joten
karttapallon kehysaika ei kerro mitään laitteen kehysajasta.** Pallon
383–483 ms:n kehys tässä taulukossa on ohjelmistorasterointia, ei
puhelinta; iPhonen GPU piirtää saman näkymän eri suuruusluokassa.
Vertailukelpoisia ovat vain saman kontin luvut keskenään, ja
laitetotuus mitataan TestFlightissä (karttapallo.md luku 8, riski 1:
WKWebView'n muisti ja kehys). Samasta syystä JS-keko on suuntaa antava:
`performance.memory` on karkea eikä sisällä GPU-puolta lainkaan.

## Taulukko (kaksi ajoa peräkkäin, sama kontti)

| mittari | vanha kartta (`?lauta=kartta`) | karttapallo (`?lauta=pallo`) |
| --- | --- | --- |
| DOM-solmut | 3 117 / 3 114 | 954 / 952 |
| svg#board-elementit | 2 167 / 2 167 | 0 / 0 |
| pyramidipyynnöt (tasokartan laatat) | 236 / 112 | 0 / 0 |
| pallolaattapyynnöt | 0 / 0 | 53 / 53 |
| kehysaika joutilaana, mediaani | 16,7 ms / 16,7 ms | 383,3 ms / 483,3 ms |
| kehysaika joutilaana, p95 | 16,8 ms / 50,0 ms | 483,3 ms / 550,0 ms |
| JS-keko (`performance.memory`) | 111,3 Mt / 110,2 Mt | 162,5 Mt / 157,5 Mt |
| ensimmäinen piirto (FCP) | 140 ms / 176 ms | 92 ms / 172 ms |
| lauta valmiina latauksesta | 3 951 ms / 7 003 ms | 3 478 ms / 5 958 ms |

Mittaustapa lyhyesti: kehysaika on 4 s:n `requestAnimationFrame`-otanta
joutilaana Ateenassa (ensimmäinen kehys hylätään herätyksenä), otettuna
6 s laudan valmistumisen jälkeen; "lauta valmiina" on aika `goto`-kutsusta
siihen, kun tasokartalla `svg#board` on täynnä ja pallolla
`ui.pallolauta` on pystyssä; pyyntölaskurit ovat koko sivun eliniältä.
Verkkoriippuvaiset luvut (pyramidipyynnöt, lauta valmiina) heiluvat
ajojen välillä, koska ämpäri kulkee välityspalvelimen kautta — siksi
molemmat ajot on kirjattu näkyviin.

## Mitä taulukosta luetaan

1. **Tasokartta on pois tieltä (omistajan ehto 5.9.2026 sanatarkasti:
   *"Kunhan vanha kartta pysyy pois tieltä eikä hidasta ollenkaan uuden
   kartan toimintaa"*).** Pallolaudalla `svg#board` on TYHJÄ ja
   pyramidipyyntöjä on nolla: vanha lauta ei elä pallon alla eikä lataa
   laattojaan. Sama vartija ajetaan savukkeena
   (tools/savukkeet/savuke-pallolauta.mjs, vartiot 1–2).
2. **DOM kevenee kolmasosaan** (3 117 → 954 solmua): tasokartan 2 167
   SVG-elementtiä korvautuu pallon 29 elävällä merkillä (nimet, nostot,
   nappula) ja WebGL-kankaalla. Tämä on pallon selvin voitto ja se
   näkyy myös laitteella: asettelun piiskausta on vähemmän.
3. **Muistia kuluu enemmän** (110 → 158 Mt JS-keossa, päälle GPU-puoli,
   jota tämä mittaus ei näe): kolme laattatekstuuria ja three.js-
   scenegraafi maksavat. Tämä on riski 1 karttapallo.md luvussa 8 ja
   juuri se, mitä turvatila (erillinen erä) vartioi.
4. **Kehysaika ei ole tästä luettavissa** (ks. varoitus yllä). Ainoa
   kontista luettava havainto on, että tasokartta pysyy 16,7 ms:ssä eli
   ohjelmistorasteroinnillakin ruudunpäivityksessä, kun taas pallo on
   sidottu GPU:hun — laitteella tämä kääntyy toisin päin vain, jos GPU
   on käytössä. Mittaus toistetaan TestFlightissä.
5. **Käynnistys on samaa luokkaa** (FCP 92–176 ms kummallakin): pallo ei
   viivytä ensimmäistä piirtoa, koska Globe.gl ladataan dynaamisesti
   vasta laudan avaukseen. Laudan valmistuminen riippuu enemmän verkosta
   kuin laudasta.

## Pelaajan lautakytkin (vaihe 6)

Taulukon molemmat sarakkeet ovat nyt pelaajan ulottuvilla ilman
kehittäjätilaa: päävalikon **Pelilauta**-osiossa on kaksi riviä
(Karttapallo / Vanha kartta). Omistajan linjaus 5.9.2026 sanatarkasti:
*"pelissä periaatteessa voisi olla lopulta kytkin, millä pelaaja voisi
valita haluaako pelata pallonäkymässä vai sillä meidän vanhalla kartalla
sitten kun ollaan saatu pallo toimimaan."* Valinta on laitteen asetus
(avain `matkakirja-lauta`, sama kuin ratasvalikon vivulla), ei pelitilan
kenttä: sama tallenne jatkuu kummallakin laudalla. Vartija:
tools/savukkeet/savuke-lautakytkin.mjs (10/10 läpi 5.9.2026) ja
tests/pallolauta.test.mjs vaiheen 6 testit.
