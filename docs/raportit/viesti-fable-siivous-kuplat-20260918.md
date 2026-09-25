# Viesti Fablelle: pluskuplan kuollut koodi pois ja nostolaput-savukkeen tyhjät näkymät

Opus-agentti 18.9.2026. Haara `claude/bold-ride-vow4ki-siivous-kuplat`
(pohja `claude/bold-ride-vow4ki` = main v1944 + Raamattu).
Tehtävä: Raamattu PAATOKSET 34 kohta 20 loppu ("Siivous omana erana")
ja luovutusraportin velat 4 ja 6
(`docs/raportit/viesti-fable-luovutus-20260918-ilta.md`).

Versiota EI nostettu, PR:ää ei avattu. Pelin käytös ei muutu: poistettu
koodi ei ollut missään voimassa.

## OSA 1 — kuollut pluskuplakoodi pois

v1944 lakkasi luomasta `.pollo-kuplapalautus`-elementtiä (js/pollo.js);
paluureitti kupliin on chatin ylärivin `.pollo-naytakuplat`, joka elää
`.pollo-paneeli`n sisällä. Kaikki sen elementin varaan rakennettu CSS,
piilotuslista ja savukevartio oli siis mittaamassa tyhjää.

| Tiedosto | + | − | Mitä |
| --- | --- | --- | --- |
| `css/styles.css` | 26 | 71 | Pluskuplan **koko sääntöjoukko** (`.pollo-kuplapalautus` + `::before` + hover/focus/`[hidden]`, rivit ~21064–21108) poistettu. Topografialinssin piilotuslistalta poistettu `body.linssi-topografia .pollo-kuplapalautus` (~11904); listan kommentin kohta 1 kirjoitettu kuvaamaan nykytilaa (luentakuvapakka, kohta 2, on elossa ja jäi). Puhelinkuplien kommentti (~27109) päivitetty: paluunappi on chatin ylärivissä. |
| `css/aikajana.css` | 9 | 8 | `body.aikajana-pulu-piilossa .pollo-kuplapalautus` pois kolmen elementin piilotussäännöstä (~2485); kommentti kertoo nyt, miksi rivi poistui. |
| `css/satelliitti.css` | 9 | 8 | Sama rivi pois kuplapinon piilotussäännöstä (~253); kommentti päivitetty. |
| `js/linssit/satelliitti.js` | 0 | 1 | `KRIITTINEN_TYYLI`:n sama rivi pois, jotta inline-varatyyli pysyy tyylitiedoston osajoukkona. |
| `js/linssit/ihmisen-matka-esitys.js` | 11 | 10 | `PULUN_PIILO_OSAT`: `.pollo-kuplapalautus` pois → kolme valitsinta. JSDoc "NELJÄ asiaa" → "KOLME asiaa" + peruste. |
| `js/pollo.js` | 13 | 7 | Rivin ~3445 kommentti kuvaa nyt muistia ja chatin ylärivin painiketta, ei pluskuplaa. Koodiin ei koskettu. |
| `tests/ihmisen-matka-esitys.test.mjs` | 12 | 8 | Väite `PULUN_PIILO_OSAT.includes('.pollo-kuplapalautus')` **käännettiin**: nyt vartioidaan, ettei kuollut valitsin palaa listalle. |
| `tests/satelliitti.test.mjs` | 11 | 9 | Kaksi pluskuplaväitettä (`tyyli`, `lahde`) osoittavat nyt `.pollo-kuplapino-kehys`iin, joka on yhä säännössä. |
| `tools/savukkeet/savuke-astro-valokuva.mjs` | 8 | 30 | Vartio "pulun pluskupla on piilossa linssin ajan" poistettu: se loi itse koekappaleen `.pollo-kuplapalautus`-luokalla ja mittasi omaa elementtiään. |
| `tools/savukkeet/savuke-ihmisen-kappaleet.mjs` | 15 | 38 | Sama vartio 1d poistettu, samoin näytteen kenttä `puluKupla` ja sen ehto vartion 1 vuotosuodattimesta. |

Yhteensä **190 poistettua riviä** (lisättyjä 114, joista valtaosa
kommenttia siitä, miksi rivi lähti). Osan 2 savuke päälle: 34 / 10.

### PULUN_PIILO_OSAT-löydös

**Se ei ole `js/ui.js`:ssä** — Raamatun kohta 20 ja luovutusraportin
velka 4 sanovat "ui.js PULUN_PIILO_OSAT", mutta `grep -n
"PULUN_PIILO_OSAT" js/*.js` ei löydä sitä juuritason tiedostoista.
Ainoa määrittely on `js/linssit/ihmisen-matka-esitys.js:480`, ja sen
ainoa lukija on `tests/ihmisen-matka-esitys.test.mjs`. Lista itsessään
on **elossa** (nappi, paneeli, kasvokangas) — vain pluskuplan rivi oli
kuollut, ja se poistettiin. Raamatun sanamuoto kannattaa korjata
tiedostopolun osalta.

### Jäljelle jääneet "kuplapalautus"-osumat (tietoinen valinta)

`grep -rn kuplapalautus js/ css/ tests/ tools/ index.html sw.js` antaa
yhä osumia, mutta yhtään **elävää valitsinta tai elementtiä ei jäänyt**.
Jäljellä on kahta lajia:

1. **Historiakommentit** (7 kpl), jotka kertovat mikä poistui ja miksi.
2. **Poissaolovartiot**, jotka nimenomaan vartioivat kohdan 20 a
   päätöstä eli sitä, ettei elementtiä synny:
   `tests/kuplan-imu.test.mjs:98`, `tests/pulu-kuplamuisti.test.mjs:163`,
   `tools/savukkeet/savuke-nayta-puhekuplat.mjs:138`,
   `savuke-kuplan-imu.mjs:122,135`, `savuke-kaiutin-luentakuvat.mjs:552`.

Näitä EI poistettu: ne ovat v1944:n vartioita, ja ilman niitä pluskupla
voisi palata huomaamatta. Jos Fable haluaa nollaosuman grepissä, se on
oma päätöksensä — se maksaisi kuusi vartiota.

## OSA 2 — nostolaput-savukkeen lapputtomat näkymät (velka 6)

### Mitä ne vartioivat: ei mitään

`tools/savukkeet/savuke-pallo-nostolaput.mjs` mittasi neljää näkymää
(Bukarest, Ateena, Helsinki, Istanbul). Savukkeen tallenne on **Fogg
Bukarestissa**, joten kohdemaa on Romania — ja v1942:sta alkaen nostot
tulevat vain kohdemaasta (`nostotasot[ISO]`, PAATOKSET 34 kohta 17 b–d).
Ateena, Helsinki ja Istanbul ovat kohdemaan ULKOPUOLELLA, joten niissä
ei ole lappuja eikä poltettua mustetta; se mitattiin jo 18.9.2026
(`viesti-fable-nostolaput-67-20260918.md`: "otos 0 lappua molemmissa,
myös 0 poltettua"). Väitteet 1–2 olivat niissä siis tosia tyhjyyden
nojalla, ja vartiot 6–7 saivat aineistonsa muutenkin kokonaan
Romaniasta.

### Ratkaisu: kohdistus kohdemaahan, ei Ranskaan

Tehtävänannon vaihtoehto "kohdista Ranskaan" **ei ole mahdollinen tässä
savukkeessa**: Ranskan nostot näkyisivät vain, jos kohdemaa olisi
Ranska, ja se vaatisi tallenteen aloituskaupungin vaihtamista — jolloin
katoaisi omistajan alkuperäinen vikanäkymä (Bukarest, 7.9.2026
*"kaupungin nimi menee nostojen päälle"*), joka on koko savukkeen syy.

Siksi valittiin **poisto + kohdistus samaan kohdemaahan**:

* `NAKYMAT` = Bukarest + **Transilvania** (45,52 / 25,37). Ateena,
  Helsinki ja Istanbul poistettu. Transilvania on jo savukkeen oma
  näkymä (vartiot 6–7) ja siinä on ruudulla poltettua mustetta.
* `LAPPUNAKYMAT`: Helsinki ja Istanbul poistettu (hakusanat "kirjasota"
  ja "mustameri" eivät löydä enää mitään). Jäljelle Bukarest ja
  Transilvania.
* Otsikkokommentit (vartio 1 ja vartio 6 a) päivitetty vastaamaan.
* **Ei uusia vartioita** — vartiojoukko on sama 7.

`tools/savukkeet/sarjat.json`: **ei muutosta.** Nostolaput on yksi
jakamaton rivi (ei `#osa`-jakoa), ja sen tunnettu punainen
("yksikään kaupunkinimi ei leikkaa liikkumatonta mustetta") sekä
huomautus viittaavat Bukarestiin, joka säilyi.

## Mittaus

`node --test tests/*.test.mjs` → **# pass 3625, # fail 0** (skipped 13).
`node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa.
`node tools/build-standalone.mjs` → dist/matkakirja.html 32 679 kt.

Yksi ajo kumpaakin savuketta (Mac Studio, node 22, Chrome for Testing):

```
savuke-nayta-puhekuplat.mjs   16/16 vartiota läpi
savuke-pallo-nostolaput.mjs    7/7  vartiota läpi
```

Puhekuplasavuke on se, joka osoittaa ettei siivous rikkonut mitään:
"pluskuplaa ei ole DOMissa alussa", "repliikki ei jätä kuplaa eikä
pluskuplaa ruudulle", "napautus sulkee chatin ja tuo repliikin
näkyviin" — kaikki vihreitä molemmilla puhelinasennoilla ja työpöydän
vastakokeella.

Nostolaputsavukkeen INFO-rivit uusilla näkymillä:

```
Bukarest    (0.05): nimiä 1, lappuja 0, kiinteää mustetta  4, limityksiä 0
Bukarest    (0.12): nimiä 1, lappuja 0, kiinteää mustetta 10, limityksiä 0
Transilvania(0.05): nimiä 1, lappuja 0, kiinteää mustetta  8, limityksiä 0
Transilvania(0.12): nimiä 1, lappuja 0, kiinteää mustetta 13, limityksiä 0
otos Bukarest:     nimettyjä lappuja  8 (poltettuja  8, eläviä 0)
otos Transilvania: nimettyjä lappuja 11 (poltettuja 11, eläviä 0)
```

Kaikki 10 napautusta avasivat oikean noston.

## Viereiset havainnot (ei korjattu, ei tehtävässä)

1. **Vartio 1 on nyt tyhjä KOKO savukkeessa, myös Bukarestissa.**
   Mittaus yllä: `lappuja 0` jokaisessa näkymässä ja kummallakin
   korkeudella, ja otoksissa `eläviä 0`. Kaikki Romanian nostot ovat
   poltettuja (PAATOKSET 33 TARKENNUS 2), ja vartio 1 mittaa vain
   **elävien** lappujen limitystä nimeen (`nostot.lappuLaatikot()`).
   Velka 6 sulkeutui näkymien osalta, mutta alla on syvempi kysymys:
   onko "lappu väistää nimeä" -sovittelu enää lainkaan voimassa
   poltetun musteen maailmassa, vai pitäisikö vartio 1 mitata poltettua
   mustetta (kuten vartio 2 jo tekee)? Tämä on oma eränsä ja kaipaa
   Fablen linjauksen, ei agentin arvausta.
2. **Tunnettu punainen kääntyi vihreäksi.** `sarjat.json`:n
   `savuke-pallo-nostolaput.mjs` → tunnettu punainen "yksikään
   kaupunkinimi ei leikkaa liikkumatonta mustetta" oli **OK** tässä
   ajossa (limityksiä 0). Jätin sen listalle: talon sääntö on kaksi
   peräkkäistä vihreää ennen poistoa, ja tämä oli yksi. Kannattaa
   tarkistaa seuraavassa julkaisusarjassa ja poistaa sitten.
3. **`savuke-nayta-puhekuplat.mjs` ei ole `sarjat.json`:ssa.** Se on
   v1944:n oma vartiosavuke (16/16) eikä aja julkaisusarjassa
   lainkaan, joten pluskuplan paluu ei jää CI:n kiinni. Rivin lisäys on
   pieni, mutta se on sarjapäätös.
4. **Raamatun kohta 20 ja velka 4 sanovat "ui.js PULUN_PIILO_OSAT"**,
   vaikka lista on `js/linssit/ihmisen-matka-esitys.js`:ssä. Sama
   väärä polku oli `css/styles.css`:n kommentissa, ja se poistui tämän
   erän mukana.
5. **`savuke-astro-valokuva.mjs`:n vartiomäärä laski yhdellä**
   (180 → 179). `sarjat.json`:n huomautusteksti mainitsee luvun 180;
   se on vain selittävä teksti, ei portti, mutta jää muistiin.
