# Viesti Fablelle: kaupunkijäsenyys luetaan datasta (18.9.2026)

Erä: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 3 ja 17 a.
Lähtökohta: `docs/raportit/viesti-fable-nostot-lukko-k17-20260918.md`,
"Jäljelle jäänyt vika" — `nosto-maalehti-pasteur-meister` liikkui yhä
vedossa 390 px:llä.

Haara: `claude/bold-ride-vow4ki-jasenyys-datasta`.
Pohja: `origin/claude/bold-ride-vow4ki-nostot-lukko-k17`. **Huom:**
toimeksiannon pyytämää haaraa `...-julkaisu-v1942` ei ollut olemassa
(uusimmat julkaisuhaarat ovat v1940 ja v1941), joten pohjaksi otettiin
nostot-lukko-erän oma haara, joka ei ole vielä mainissa.

## Juurisyy — kolme kerrosta, kaikki sama sääntö

Päätös sanoo: jäsenyys ratkaistaan noston **omasta paikasta**. Koodi
luki kolmessa kohdassa jotain muuta.

1. **Kaupunkilista koottiin RUUDULTA.** `js/pallolauta/nostot.js`
   rakensi jäsenyyden listasta `elavatKaikki` (= `nakyvat`, eli rivit,
   joilla on `ruudulla()`-piste), ja laudan kaupungin ankkuririvi
   ohitettiin kokonaan (`if (!p) continue`), jos kaupungin oma piste ei
   osunut ruudulle. 390 px:n saapumisnäkymässä **Pariisin oma piste on
   kuvan ulkopuolella**, joten Pariisi ei ollut jäsenyyslistassa
   lainkaan → sen sisäiset nostot eivät karsiutuneet kartalta → ne
   latoivat itsensä uudelleen joka vedossa. Sama korjaus oli jo tehty
   `liuskanLahde`lle; nyt se on tehty myös kaupunkiriveille.

2. **Noston "oma paikka" luettiin LADOTUSTA pisteestä** — tämä on
   Raamatun PAATOKSET 34 velka *"jäsenyyden koordinaatti luetaan
   ladotusta pisteestä kasauspassin jälkeen (Versailles 108 km vs.
   15 km)"*, ja se osui samaan nostoon. `js/fokuskohteet.js`
   `maanKohdemerkit` antoi vain ladotun pisteen
   (`r.nippu?.x ?? r.x + r.sx` — erottelupassi ja kasauspassi mukana),
   ja `nostot.js` `lisaa` otti `omaLat`/`omaLng` siitä. Mitattu ero:
   Pasteur-instituutin datapaikka on **0,73 km** Pariisin laudan
   pisteestä (48,840 N / 2,312 E), mutta sen lukittu ankkuri on
   49,797 N / 2,791 E eli **108 km** pohjoiseen. 15 km:n säde ei siis
   voinut osua.

3. **Datan oma nimipolku ei voinut koskaan laueta.** `onKaupunginSisainen`
   tunnistaa noston sisäiseksi myös silloin, kun sen `paikkaNimi` on
   kaupungin nimi. Kenttä luettiin `typeof kohde.paikka === 'string'`
   -ehdolla, mutta pakoissa `paikka` on olio `{ nimi, laudat }`
   (js/packs/maalehtinostot-fra.js) → kenttä oli aina `null`.
   Lisäksi jäsenyyden keskukseksi annettiin paljas `{ lat, lng }`,
   josta kaupungin nimi oli pudonnut pois.

## Korjaus

- `js/fokuskohteet.js` `maanKohdemerkit`: rivi kantaa nyt myös
  ladontaa edeltävän datapisteen (`omaX`, `omaY`).
- `js/pallolauta/nostot.js`:
  - `omaLat`/`omaLng` lasketaan `omaX`/`omaY`:stä; kaupunkilehden
    kohdekartan piste voittaa yhä, ladottu `lat` on vasta viimeinen
    vara.
  - `paikkaNimi` luetaan myös oliomuotoisesta `paikka`-kentästä.
  - Jäsenyyslista kootaan datasta: `omatKaupunkirivitJasenyys`
    (`rivit`, ei `nakyvat`) ja laudan kaupungin ankkuririvi syntyy
    ilman ruutupistettä. Piirtolistat (`kaupunkirivitNyt`,
    `laudanAnkkurit`) suodattavat ruutupisteen vaativat rivit.
  - Jäsenyyden keskus säilyttää kaupungin nimen.

Tasokartalla ei ole vastaavaa ajonaikaista polkua: ainoa toinen
`onKaupunginSisainen`-käyttö on Node-työkaluissa
(`tools/fokuskartta/nostot.mjs`, `tools/lukitse-nostoankkurit-maalle.mjs`),
jotka lukevat jo datasta.

## Mittaus

`tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs`, `SAVUKE_RUUTU=390`
(Chromium 390 × 844, dpr 2, ämpäri Noden route-välityksellä):

| vartio | ennen | jälkeen |
| --- | --- | --- |
| 4. vedossa liikkuvia nostoja | **1** (`nosto:nosto-maalehti-pasteur-meister` 0,177°) | **0** — OK |
| 4b. nimiön ruutuvektori | OK | OK |
| 1–3. lukitut ankkurit, ei merta | OK | OK |
| DOM-merkkejä | 40 | 33 |
| nostopisteitä | 43 | 36 |
| 5. pisteitä ≥ 40 | OK (43) | **FAIL (36)** |
| 6. kaupunkimerkkejä | 5 | 5 |

`node --test tests/*.test.mjs`: 3636 testiä, 0 punaista (13 skip).
`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Fablen päätettäväksi: vartio 5 paljasti seuraavan vian

Vartio 5 (PAATOKSET 34 kohta 17 b, *"saapumisnäkymässä Ranskan
nostopisteitä ≥ 40"*) meni ennen läpi **vian ansiosta**: seitsemän
Pariisin sisäistä nostoa oli laskettu kartan pisteiksi. Kun ne nyt
menevät sääntöjen mukaan liuskaan, kartalle jää 36.

Pahempi seuraus: **Pariisi ei ole 390 px:n saapumisnäkymässä
kaupunkimerkkinä lainkaan** (kaupunkimerkit ovat Lyon, Bordeaux,
Nantes, Toulouse, Lille). Liuska ripustetaan kaupunkimerkkiin, joten
Pariisin seitsemää sisäistä nostoa ei tällä ruudulla pääse avaamaan
mistään — juuri se riski, jonka vanha kommentti *"kartalta voisi kadota
nosto, jota mikään lista ei avaa"* nimesi. Tämä ei ole jäsenyyden vika
vaan saapumisnäkymän rajaus: pelaaja seisoo Pariisissa, mutta
kaupungin oma piste jää kuvan ulkopuolelle.

Ehdotan seuraavaksi eräksi: **saapumisnäkymä rajataan niin, että sen
maan kaupungit — ennen kaikkea se kaupunki, jossa pelaaja seisoo — ovat
aina ruudulla**, ja vartion 5 kynnys tarkistetaan sen jälkeen. En
koskenut kynnykseen enkä Raamattuun.
