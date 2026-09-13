# Viesti Fablelle: Liiku-nappi kevyissä kohteissa — Alppien umpikuja korjattu (v1856)

Codexin/rootin QA löysi julkaistusta v1855:stä pelin pysäyttävän vian:
Alpeilla ei näy Liiku-nappia eikä aarteen vihjepistettä, joten pelaaja ei
pääse kohteesta pois lainkaan. Korjattu.

## Juurisyy

`js/ui.js` `liikuNappiNakyy()` piti **laattaporttia** (omistajan tarkennus
25.8.2026): fokusmoodissa nappi oli olemassa vasta kun kaupungin laatta oli
käännetty (`!game.tokens.has(city.id)`). `piirraToimintorivi` ei vain
piilottanut nappia vaan **jätti sen pois ja sulki liu'un** — ilman nappia
matkustustapoja ei voi avata mitenkään.

Portti oli mitoitettu **täydelle** fokusvirtapakille, jossa laatan kääntävä
ketju on aina olemassa: matkakirja → täky → kohtaaminen → aarrekysymys.
**Kevyellä** pakilla (`js/packs/fokusvirrat.js` `KEVYET_FOKUSVIRRAT`) ketjua
ei ole lainkaan — mitattu tässä työssä: kaikilta kuudelta puuttuu sekä
`kohtaamispiste` että `lehtitehtavat`, joten vihreä aarrepiste ei voi syttyä
eikä laattaa voi kääntää — mutta **laatta on**. Portti jäi siis ikuisesti
kiinni. Tämä myös selittää raportin toisen havainnon: vihjepistettä ei
puuttunut vahingossa, kevyellä pakilla sitä ei ole olemassakaan.

Vanha 25.8. portti on ristiriidassa nykyisen omistajalinjauksen kanssa
(13.9.2026, Raamattu KARTTAUUDISTUS, sanatarkasti: *"Alareunassa onkin
kokojan nakyvilla pieni 'liiku' nappi."* ja *"Pelaaja voi myos halutessaan
jatkaa matkaa ilman loytamatta aarretta."*). Ristiriita ratkaistiin uuden
linjauksen hyväksi.

## Muutos (pienin mahdollinen)

1. **`js/fokusvirta.js`** — uusi vietävä sääntö `liikuNappiNakyvissa(ui)`,
   joka palauttaa aina `true`. Perustelu, omistajan sanatarkat sitaatit ja
   kumotun portin historia ovat funktion kommentissa.
2. **`js/ui.js`** — `liikuNappiNakyy()` on nyt yhden rivin delegointi
   sääntöön; laattaehto poistui. Lisäksi `piirraToimintorivi`-kommentin
   vanhentunut kappale ("LIIKU ODOTTAA AARRETTA") päivitettiin.

**Turvarajat säilyivät koskemattomina.** Mitään estoa ei siirretty eikä
poistettu: `renderActions` ei piirrä toimintoriviä lainkaan botin vuorolla
eikä vaiheissa `pickstart`, `move`, `event`, `quiz` ja `offer`
(saapumiskortti/traileri), ja `piirraToimintorivi` harmaannuttaa napin, kun
matkustustapoja ei ole tai linssikartan kuori estää (`linssikarttaEstaa`).
Tekstejä, kuvia, ääniä eikä Pulun ohjainta ei koskettu.

## Kuusi kevyttä kohdetta

`alpit`, `islanti`, `kreeta`, `lappi` (Rovaniemi), `sisilia`, `tromssa`.
Kaikki kuusi on nimetty sekä node-testissä että savukkeessa omana
vartionaan — ei pääteltynä joukkona, samasta syystä kuin
`KEVYET_FOKUSVIRRAT` itse on nimetty luettelo.

## Testit

**node-testi `tests/liiku-nappi.test.mjs`** (11 vartiota):
kuusi kevyttä kohdetta erikseen, täysi pakki (Pariisi) lukitulla ja avatulla
aarteella, säännön riippumattomuus fokusmoodista ja katselutilasta, kevyiden
pakkien ketjuttomuus (ei kohtaamispistettä eikä lehtitehtävää) sekä
`js/ui.js`:n kytkentä (delegoi sääntöön eikä lue laattoja).

**Playwright-savuke `tools/savukkeet/savuke-liiku-alpit.mjs`** (13 vartiota,
`13/13 läpi`): oikea peli pallolaudalla, tallennus Alpeille, ei injektioita
pelilogiikkaan. Mittaa DOM:ista, että `.toimintorivi .monitoimi-nappi` on
olemassa, ei ole `disabled` ja että sen napautus avaa liu'un neljään
matkustusnappiin — jokaisessa kuudessa kevyessä kohteessa sekä Pariisissa
lukitun ja avatun aarteen kanssa. Lisäksi kaksi turvarajavartiota:
vaiheessa `move` ja botin vuorolla toimintoriviä ei piirretä lainkaan.

Julkaisukaava kokonaisuudessaan:

- `npm test` → `# pass 3305`, `# fail 0` (3318 testiä, 13 skipped)
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/tarkista-niputus.mjs` → 387 moduulia, ei törmäyksiä
- `node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa
- `node tools/build-standalone.mjs` → dist/matkakirja.html 31963 kt (ei committiin)
- `grep -rn '^<<<<<<<' js css tests tools` → tyhjä

## Vastakoe (pakollinen, tehty)

Korjaus kumottiin väliaikaisesti palauttamalla vanha laattaportti
`liikuNappiNakyvissa`-funktioon (`!ui.game.tokens.has(city.id)`), muuta ei
muutettu. Tulos:

- node-testi: **`# pass 3`, `# fail 8`**
- savuke: **`6/13 läpi`**, punaisina kaikki kuusi kevyttä kohdetta ja
  täysi pakki lukitulla aarteella. Mitattu tila esim. Alpeilta:
  `{"kaupunki":"alpit","laatta":true,"saanto":false,"onRivi":true,`
  `"onNappi":false,"estetty":null,"liukuAuki":null,"liukuNapit":0}`
  — toimintorivi piirretään, mutta nappia ei ole. Juuri tämä on
  pelaajan umpikuja, ja se näkyy nyt mittarissa.

Vihreinä pysyivät odotetusti vartiot 4 (täysi pakki, aarre avattu) ja 5a/5b
(turvarajat) — ne eivät riipu korjauksesta. Korjaus palautettiin ja
molemmat testit ovat jälleen täysin vihreitä.

## Suositus: osumareititys (EI toteutettu)

Toissijainen tehtävä oli osumareititys, jossa vihjepiste on alle pikselin
kaupungin merkin alla (Budapest/Rudas) ja keskustaklikkaus avaa kaupungin
tietoruudun vihjeen sijaan. **Ei pieni eikä selvä — siksi vain suositus.**

Mitattu tässä työssä (lautayksiköitä kaupungin keskipisteestä,
maailmankartta):

| kaupunki | piste | etäisyys | saako sivusiirron? |
|---|---|---|---|
| Ateena | Akropolis | 0,51 | kyllä |
| Sofia | Vasil Levski | 0,64 | kyllä |
| Pariisi | Quai de Montebello | 0,58 | kyllä |
| **Budapest** | **Rudasin kylpylä** | **32,45** | **ei** |

Havainnot:

1. `js/fokuspiste.js` `fokuspisteenSiirto` on **kynnysfunktio lautayksiköissä**:
   alle `PISTE_ERO_MIN` (14) piste siirretään vakiona koilliseen (+14, −10),
   muuten ei lainkaan. Budapest on 32,45 yksikön päässä eli putoaa kynnyksen
   yli eikä saa siirtoa — mutta pallolaudalla lautayksikkö muuttuu asteiksi
   ja vasta kamera ratkaisee, montako **pikseliä** se on. Kynnys ja siirto
   ovat siis väärässä koordinaatistossa: ongelma on ruudun mitta, sääntö on
   laudan mitta.
2. `js/pallolauta/lauta.js` `lahinMerkki` antaa kohtaamispisteelle
   etuoikeuden vain *musteen* kilpailussa (`voittaja?.o?.perhe === 'piste'`),
   mutta kaupungin oma piste voittaa sitä ennen ehdolla
   "sormi kaupunkipisteen oman halkaisijan sisällä". Kun piste on <1 px
   kaupungin merkistä, kaupunki voittaa aina — juuri raportoitu oire.

Suositeltu korjaus (oma erä, mittaus ensin): siirrä kohtaamispisteen erotus
**ruutuavaruuteen** samalla tavalla kuin turisti-info jo tehdään (39 px
saapumisnäkymässä) ja anna pisteelle sama "pitää paikkansa" -etuoikeus
`lahinMerkki`issä myös kaupunkipisteen oman musteen kilpailussa. Molemmat
koskevat omistajan hienosäätämiä osumasääntöjä, joten erä tarvitsee oman
savukkeensa (kaappaukset Budapestista ja Ateenasta kahdella zoomilla) ja
mieluiten omistajan silmäyksen ennen monistusta.

Huomio: **Alpeilla ei ole vihjepistettä lainkaan** (kevyt pakki, ei
kohtaamispistettä), joten osumareititys ei olisi auttanut Alppien
umpikujaan — se tarvitsi juuri tämän Liiku-korjauksen.

## Tiedostot

- `js/fokusvirta.js` — uusi `liikuNappiNakyvissa`
- `js/ui.js` — `liikuNappiNakyy` delegoi, vanhentuneet kommentit päivitetty
- `tests/liiku-nappi.test.mjs` — uusi
- `tools/savukkeet/savuke-liiku-alpit.mjs` — uusi
