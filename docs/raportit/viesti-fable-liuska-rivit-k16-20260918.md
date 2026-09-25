# Viesti Fablelle: kaupunkiliuskan kaksi ylintä riviä (PAATOKSET 34 kohta 16 d–e)

Haara `claude/bold-ride-vow4ki-liuska-rivit-k16` (pohja: origin/main, v1939).
Vain kohdat d ja e. Raamattuun, sarjat.jsoniin, versionumeroon tai liuskan
ladontaan/CSS:ään ei koskettu (liuskan ulkoasu on toisen agentin haarassa).

## Mitä muuttui

**d) "PARIISI"-rivi (laji `lehti`)** avasi ennen koko kaupunkilehden
(`ui.avaaTutkinta`). Nyt se avaa kevyen esittelynäkymän: **herokuva, kaksi
pikkukuvaa (kannen `ennenNyt`-pari eli vanha ja uusi) ja leipäteksti**
(`latoKaupunginEsittely`, lehden `intro`). Kohdekarttaa, matkailuliitettä eikä
lehden osioita ei ole. Kehys on sama kuin tiiviillä etusivulla
(`avaaTiivisLehtiarkki`).

**e) "NÄHTÄVYYDET"-rivi (laji `nahtavyydet`)** avasi ennen tiiviin etusivun
(kuvat + kartta + kohdeluettelo). Nyt se avaa **kohdekartan ja sen alla
nähtävyystekstin**, josta näkyy ensimmäinen lause ja sen perässä "Lue lisää"
-nappi. Napautus liittää loput **samaan kappaleeseen** (sama `<p>`-elementti
kasvaa, näkymä ei vaihdu eikä kelaa). Kartan alainen kohdeluettelo
(`.kartta-selite`-rivit) on poissa tästä näkymästä — kohteet avataan kartalta
napauttamalla, kuten ennenkin.

### Mikä teksti valittiin nähtävyystekstiksi

`KAUPUNKIKARTAT[cityId].esittely` (js/packs/maakartat.js) — **kohdekartan oma
saateteksti**, joka kaupunkilehdessä latoutuu kahteen palstaan kartan
yläpuolelle. Sellainen teksti siis on olemassa, eikä esittelytekstiin
(lehden `intro`) tarvinnut turvautua: `intro` on se, jonka Pariisi-rivi
näyttää. Uutta sisältöä ei kirjoitettu; sama teksti vain ladotaan kartan ALLE
ja lause kerrallaan. Getteri on `kaupunginNahtavyysteksti` (js/nahtavyydet.js).

### Lauseraja (uusi apufunktio + yksikkötesti)

`js/lauseraja.js` → `ensimmainenLause(teksti)` palauttaa
`{ ensimmainen, loput }`. Sääntö on omistajan sanoin: lause päättyy pisteeseen,
huuto- tai kysymysmerkkiin, jota seuraa välilyönti ja iso kirjain; lyhenteet
(`n.`, `v.`, `ns.`, `esim.` …) eivät katkaise. Luettelon lisäksi kaksi
yleissääntöä: yksi kirjain ennen pistettä on nimikirjain ("J. K.") ja numero
ennen pistettä järjestysluku ("1. kerros"). Testi:
`tests/lauseraja.test.mjs` (10 testiä, kaikki läpi).

## Muutetut tiedostot

- `js/lauseraja.js` (uusi) ja `tests/lauseraja.test.mjs` (uusi)
- `js/nahtavyydet.js` — `piirraKaupunkiKartta`-liput `esittely`,
  `selitelista`, `kuvagalleria` (oletukset entiset, lehti ei muutu) ja uusi
  `kaupunginNahtavyysteksti`
- `js/kaupunkinosto.js` — `latoKaupunkiesittely` / `avaaKaupunkiesittely` ja
  `latoNahtavyysnakyma` / `avaaNahtavyysnakyma` + tunnusluokat
- `js/pallolauta/lauta.js` — liuskan rivien `lehti` ja `nahtavyydet` avaavat
  uudet näkymät
- `sw.js`, `tools/build-standalone.mjs` — uusi moduuli listoille
- `tools/savukkeet/savuke-kaupunkipopup.mjs` — uudet vartiot 10–11 ja
  `SAVUKE_RUUTU`-kytkin

## Mittaus (savuke-kaupunkipopup.mjs, SAVUKE_RUUTU=390, Pariisi)

Kaksi ajoa, molemmat puhelinruudulla. Uudet vartiot menivät läpi — d toisessa
ajossa, e ensimmäisessä (ero johtui savukkeen omasta avausnielusta, ks. alla):

Pariisi-rivi (ajo 2): `{"esittelyNakyma":true,"herokuvia":1,"pikkukuvia":2,`
`"leipa":1069,"kartta":0,"matkailijalle":0,"lehtiAuki":false}` → 1 herokuva,
2 pikkukuvaa, leipäteksti 1069 merkkiä, ei karttaa, ei matkailuliitettä, ei
kaupunkilehteä. Kaikki neljä vartiota vihreitä.

Nähtävyydet-rivi (ajo 1): `{"nahtavyysNakyma":true,"kartta":1,"kohteita":31,`
`"luettelo":0,"pituus":23,"kappaleita":1,"nappi":1,"loppuMerkkeja":1,`
`"herokuvia":0}` → kartta 31 kohteineen, kohdeluettelo 0 riviä, teksti yksi
kappale ja yksi lause, "Lue lisää" -nappi. Napin jälkeen
`{"pituus":549,"samaElementti":true,"kappaleita":1,"nappi":0,"arkkiAuki":true}`
— teksti kasvoi 23 → 549 merkkiä SAMASSA elementissä, nappi katosi, näkymä
pysyi. Kartan kohteen napautus avasi kohteen (vihreä).

Huomiot mittauksesta:

1. Savukkeen vanha vartio "kaupunkimerkin napautus avaa liuskan" oli ajossa 1
   Pariisissa punainen (liuska ei auennut kahdesta napautuksesta) ja ajossa 2
   vihreä. Ilmiö on savukkeen omassa tiedostossa jo dokumentoitu
   (kamera-ajo siirtää merkkiä, kortin sulkeminen nielaisee napautuksen), eikä
   se liity kohtiin d–e.
2. `vastakoe 1: kuvaton kaupunki avaa pop-upin silti` on punainen molemmissa
   ajoissa. Se on VANHENTUNUT vartio: kaupunkimerkki ei avaa enää yhtään
   pop-upia (PAATOKSET 34 kohta 1), joten kuvaton kaupunkikaan ei voi avata
   sitä. En koskenut siihen — vartion päivitys kuuluu erälle, joka omistaa
   savukkeen vanhentuneet väitteet.
3. Ajojen JÄLKEEN lisäsin rivin napautukseen saman uusintakuvion, joka
   tiedostossa on jo kaupunkimerkille (`napautaRivi`: rivin piste luetaan
   uudestaan, liuska avataan tarvittaessa). Sitä EI ole ajettu kolmannessa
   ajossa (aikakatto ja kahden ajon sääntö) — molemmat näkymät on kuitenkin
   mitattu vihreinä ilman sitä.

## Portit

- `node --test tests/*.test.mjs` → `# pass 3623`, `# fail 0`
- `node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa
- `node tools/tarkista-niputus.mjs` → 398 moduulia, ei törmäyksiä
- `node tools/build-standalone.mjs` → dist rakentuu (32 627 kt)
