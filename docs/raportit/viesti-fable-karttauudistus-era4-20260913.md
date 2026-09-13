# Karttauudistus, erä 4 — kaupungin iso pop-up ja turisti-info pallolle

*(Opus-työsessio Fablelle 13.9.2026. Haara
`claude/karttauudistus-era4-kaupunkipopup`. Ei versionostoa, ei dist/:iä.
Jokainen tämän raportin luku on MITATTU savukkeella tai luettu koodista;
arviot on merkitty sanalla "arvio".)*

## 0. Lyhyesti

Pallosuunnitelman (`docs/raportit/karttauudistus-suunnitelma-pallo-20260913.md`
luku 3.3) **erä 4 on tehty**. Kaupungin merkin napautus pallolla avaa ison
pop-upin, jossa on kaupunkilehden **herokuvat, esittelyteksti ja zoomattava
kohdekartta**; kaupungin viereen tuli **turisti-info-merkki tekstillä**, ja sen
napautus avaa **pelkän** nykyisen lehden matkustusoppaan omassa pop-upissaan.
Molemmat merkit ovat KARTTAAN KIINNITETTYJÄ ja skaalautuvat zoomatessa
(PAATOKSET 2), ja pop-upin ankkuri on merkin ruutupiste.

**Kaupunkilehteä ei poistettu.** Vanha ovi `ui.avaaTutkinta` on paikallaan,
ja ison pop-upin pohjalla on sitä varten nappi ("Kaupunkilehti"), jotta
omistaja voi verrata uutta ja vanhaa samasta kaupungista.

Uutta sisältötekstiä ei kirjoitettu riviäkään: kaikki kortin teksti tulee
nykyisestä lehtidatasta samoilla piirtäjillä, ja savuke todentaa
esittelytekstin **merkki merkiltä** lehtidataa vasten.

**Yksi oikea vika löytyi ja korjattiin savukkeen ansiosta** (luku 5.1):
ensimmäinen toteutus antoi turisti-infon merkille datumikentän `napautus`,
jolloin se voitti osumatestissä kaupungin — kaupungin napautus avasi
turisti-infon eikä koskaan kaupungin omaa pop-upia.

## 1. Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `js/lehti.js` | **Etusivun osat irti uudelleenkäytettäviksi**, sisältöä muuttamatta: `latoLehtiKuvat(ui, { paakuva, kuvarivi, … })` (entinen `piirraLehtiKuvat`in runko, joka on nyt sen ohut kääre), `kaupunginKansi(cityId)`, `kaupunginEsittely(city)`, `latoKaupunginEsittely(kohde, city)` ja vakio `LEHDEN_VAKIOESITTELY`. `avaaMaalehti`een EI koskettu (erä 3 työskentelee siinä). |
| `js/ui.js` | `openArrival` lukee esittelyn nyt `kaupunginEsittely`llä ja vakiorivin `LEHDEN_VAKIOESITTELY`sta — sama teksti, yksi lähde kahdelle kutsujalle. Ei muuta. |
| `js/nahtavyydet.js` | `piirraKaupunkiKartta(ui, kohde, { cityId })` ja `piirraMatkailijalle(ui, kohde, { kansi })`: kaupunki/kansi voi tulla parametrina, oletus on entinen `ui.lehtitila`-kenttä. Piirto on rivilleen sama. |
| `js/kaupunkinosto.js` (uusi) | Kaksi pop-upia (iso ja turisti-info), niiden asemointi merkin ruutupisteestä, sulkusopimus, turisti-infon merkin elementti ja mittakaavakaava sekä merkin paikka asteina. |
| `js/pallolauta/lauta.js` | Kaupungin napautus avaa pop-upin (ankkuri merkin ruutupisteestä); `paivitaTuristiInfo` asettaa merkin merkkikerrokseen ladonnan yhteydessä; merkin laatikko on nimiladonnan varaus; auki oleva kortti asemoidaan levossa; `KORTTIVALITSIN` sai `.kaupunkipopup`; purku sulkee kortin. |
| `js/pallolauta/merkit.js` | Uusi `avattavat()`: datumit, joilla on `avaa(d)` — ero `napautettavat()`iin on osumajärjestys (luku 5.1). |
| `css/kaupunkinosto.css` (uusi) | Pop-upien tyyli (sama pergamentti kuin kohdekortilla, isompi kehys). Ladataan laiskasti ensimmäisellä avauksella. |
| `css/styles.css` | Turisti-infon merkin tyyli nostojen viereen (merkin on näyttävä ennen pop-upin tyylin latausta). |
| `sw.js` | `css/kaupunkinosto.css` ja `js/kaupunkinosto.js` SHELLiin. |
| `tools/savukkeet/savuke-kaupunkipopup.mjs` (uusi) | Savuke vastakokeineen. |

**Mitä EI tehty** (tehtävänannon rajaus): kaupunkilehteä ei poistettu, maapaneeliin
ei kosketa, nostoihin/aarteeseen/kulkutapoihin/laattoihin ei kosketa, `avaaMaalehti`
on ennallaan, eikä yhtään uutta pelaajalle näkyvää sisältötekstiä kirjoitettu.
`js/pollo.js`, `js/livia-*.js`, `js/pallolaatat.js`, `js/laattapyramidi.js`,
`js/fokusmitat.js` ja `tools/generoi-laattapyramidi.mjs` ovat koskemattomia
(`js/livia-tilanteet.js` vain luettiin).

## 2. Miten kortti rakentuu — ja miksi se ei voi keksiä tekstiä

Ison pop-upin sisällys on neljä kutsua, ei yhtään omaa piirtoa:

| Lohko | Piirtäjä | Data |
| --- | --- | --- |
| herokuvat | `latoLehtiKuvat` (js/lehti.js) | kansiosaston `kansikuvat`, `avauskuvat`, `ennenNyt` |
| esittely | `latoKaupunginEsittely` (js/lehti.js) | `ARTIKKELIT[kaupunki].intro` |
| kohdekartta | `piirraKaupunkiKartta` (js/nahtavyydet.js) | `KAUPUNKIKARTAT[kaupunki]` |
| matkustusopas | `piirraMatkailijalle` (js/nahtavyydet.js) | kansiosaston `matkailijalle` |

Savukkeen vartio 2 vertaa kortin `.arrival-intro`-tekstiä suoraan
`ARTIKKELIT[nimi].intro`iin (kappalerajat ja lihavoinnin tähdet poistettuina,
kuten `piirraLeipateksti` ne latoo) — **merkki merkiltä, ei sisältövertailuna.**

## 3. Mitatut luvut

| Mitta | Pariisi | Marseille |
| --- | ---: | ---: |
| Kohdekartan kohteita kortissa | 25 | 6 |
| Turisti-infon etäisyys kaupunkipisteestä saapumisnäkymässä (390 px) | 39 px | 39 px |
| Merkin mittakaava saapumisnäkymässä / lähikuvassa | 0,81 / 3,0 | 0,81 / 3,0 |
| Kortin kerros / Pulun paneelin kerros | 6 / 41 | 6 / 41 |

Ranskan saapumiskorkeus 390 px:n ruudulla on **0,627** pallonsädettä, ja
ruudulla on noin **23 px yhtä kaaren astetta** kohti. Merkin siirto on
1,5° pituutta (jaettuna leveysasteen kosinilla) ja 0,75° etelään.

## 4. Savuke ja vastakokeet

`tools/savukkeet/savuke-kaupunkipopup.mjs` — yhdeksän vartiota, ajettuna
kahdella ruudulla (390 × 844 dpr 2 ja 1400 × 900) ja kahdessa kaupungissa.
Napautukset ovat aitoja hiiren painalluksia siihen ruutupisteeseen, johon
merkki projisoituu; savuke ei kutsu avaajia suoraan.

- **Vihreä ajo:** ks. luku 4.1.
- **Vastakoe 1 (ajetaan savukkeen sisällä):** Marseillen herokuvat poistetaan
  lehtidatasta ajon aikana (dynaaminen `import` osuu samaan
  moduuli-instanssiin kuin peli), kortti avataan uudelleen. Vaatimus: kortti
  aukeaa silti JA hero-lohkon **korkeus on 0 px** (`hidden === true`).
  Väite on nimenomaan lohkon korkeudesta, koska ilman `hero.hidden`-sääntöä
  tyhjä kehys jäisi korttiin omalla marginaalillaan.
- **Vastakoe 2 (käsin):** turisti-infon merkin kytkentä riisutaan
  (`avaa`-kenttä pois datumista) → savuke punainen.

## 5. Löydökset

### 5.1 Turisti-infon merkki söi kaupungin napautuksen (korjattu)

Ensimmäinen toteutus antoi merkin datumille kentän `napautus`, jolloin se
kulki `merkit.napautettavat()`-polkua. Se polku ratkaistaan pallon
osumatestissä **ennen kaupunkeja ja nostoja**, koska linssin merkin on
voitettava aina (js/pallolauta/lauta.js `napautaPintaan`). Mitattu:
kaupungin napautus avasi 39 px:n päässä olevan turisti-infon eikä koskaan
kaupungin omaa pop-upia — savukkeen vartio 1 punaisena molemmissa
kaupungeissa ja molemmilla ruuduilla.

Korjaus: merkin avaaja on nyt `avaa(d)`, ja merkit-kerros tarjoaa sille oman
luettelon (`avattavat()`). Kartan kaluste kilpailee siis samassa sarjassa
kaupunkien ja nostojen kanssa, jolloin **lähin voittaa** — ja kaupunkipisteen
oma muste voittaa yhä lapun (`pisteenPx`-sääntö, ennallaan).

Samassa yhteydessä merkin siirto kasvatettiin 0,72°/0,36° → 1,5°/0,75°,
koska ensimmäinen arvio antoi vain 18,6 px eroa eli kaksi kohdetta saman
sormen alle.

### 5.2 Kirjattavaksi Fablelle (ei korjattu, ei tämän erän työtä)

1. **Turisti-infon merkki ei ole kaupunkiruuhkan katon eikä nostojen
   sovittelun piirissä.** Suunnitelma (luku 3.3) sanoi merkin olevan
   "tavallinen karttanosto … `kattoVapaa: true`". Tässä erässä se on oma
   merkkikerroksen osansa (`turistiinfo`), koska nostoksi tekeminen olisi
   vaatinut fokuskohdedataa ja uuden nostotunnuksen jokaiselle kaupungille.
   Seuraus: merkin laatikko on nimiladonnan VARAUS (kaupunkien nimet
   väistävät sitä), mutta nostojen oma sovittelu ei väistä sitä eikä se
   kuluta nostojen kattoa. Jos Pariisiin tulee erässä 5 lisää nostoja
   kaupungin viereen, tämä kannattaa katsoa uudelleen.
2. **Mittakaavan vertailuleveys on maan laatikko × 1,15**, sama luku, jolla
   erä 2 rajaa uloszoomauksen. Erä 2 ei ole tehty, joten luku elää tällä
   hetkellä vain tässä tiedostossa (vakio `TURISTI_INFON_VERTAILUKERROIN`).
   Kun erä 2 tulee, kerroin on luettava yhdestä paikasta.
3. **Kortin asemointi on oma koodinsa** eikä js/fokuskohteet.js:n
   `asetaKohteenPaikka`. Pakot ja niiden perustelut ovat samat (ruutu,
   alanapit, Pulun väistö), mutta kaksi kopiota voi ajautua erilleen.
   Yhdistäminen on oma siivouseränsä; sitä ei tehty, koska kohdekortin
   asemointi on sidottu `ui.fokuskohdeAuki`-tilaan, kuva edellä -kortin
   kaksivaiheeseen ja raahaukseen.
4. **Kortti ei ole raahattava** (kohdekortti on, omistajan tilaus
   25.8.2026). Tämä on iso kortti ja täynnä omia eleitä (kuvakaruselli,
   kohdekartan zoom ja panorointi); raahaus vaatisi oman harkinnan.
5. **Yhden tiedoston versio ei saa tätä erää**, koska `js/kaupunkinosto.js`
   on vain pallolaudan tuoma eikä pallolauta ole niputuksessa (sama rajaus
   kuin koko pallolaudalla, tests/sw.test.mjs).

## 6. Portit

| Portti | Tulos |
| --- | --- |
| `npm test` | — |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | niputus kunnossa: 388 moduulia, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | — |
| `node tools/build-standalone.mjs` | dist/matkakirja.html syntyy (ei committoitu) |

## 7. Kuvakaappaukset

`docs/raportit/kuvat/karttauudistus-4-*.png` (390 px, dpr 2).
