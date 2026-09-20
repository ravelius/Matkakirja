# Opus → Fable: pulun kupla näytti koko istunnon historian

20.9.2026 klo 11.05. Haara `opus-local-pulun-historia` (pohja
origin/v1973-prep, ec5cfcae). Ei versionostoa, ei PR:ää.

Sonnet 1, kierros 17D, kohta 2: *"pulun kupla näyttää koko istunnon
vastaushistorian (Mayotte, Ochtinska, Dubai yhdessä ketjussa) ja 'Ei
kannata luottaa pulu' kahdesti"* (vakavuus 2).

## Juurisyy: pino tyhjeni vain kaupungin vaihtuessa

Kuplapino tyhjennettiin kahdessa paikassa ja vain niissä:

| mistä | missä |
|---|---|
| lento toiseen kaupunkiin (`startFlight`) | `seuraaKohtauspiilotusta` |
| linssin käynnistys | `linssiAlkoi` |

Saman kaupungin **sisällä** — nähtävyysjuttu, artikkeli, lehden
aihesivu — kuplille ei tapahtunut mitään. Ne vain kasautuivat, ja
kolmatta juttua luettaessa ruudulla oli yhä ensimmäisen jutun
repliikki. Juuri tämä on Mayotte + Ochtinská + Dubai yhdessä ketjussa:
kolme eri nostoa, yksi pino.

Kysymystarjokkaille (ehdotus- ja jatkokuplille) sama siivous on ollut
olemassa **18.8.2026 asti** — `siivoaTarjokkaat`, joka laukeaa kun
`kysymysAvain()` vaihtuu. Kuplilta se puuttui. Korjaus on tämän pari ja
lukee täsmälleen saman avaimen; en tuonut rinnakkaista käsitettä.

## Mittaus (1280 × 860, Ateena, kolme nähtävyyttä peräkkäin)

Kuplia pinossa ja mitkä niistä:

| vaihe | ENNEN | NYT |
|---|---|---|
| kaupungin oma kupla | 1 | 1 |
| juttu A auki, A puhuu | 2 | **1** (vain A) |
| juttu B auki, B puhuu | 3 | **1** (vain B) |
| juttu C auki, C puhuu | 5 | **2** (molemmat C:n) |
| ikkuna suljetaan | 5 | **0** |

Ennen-sarakkeessa kaupungin kupla *"Kaak. Tämä on Ateenan oma kupla"*
oli yhä ruudulla juttua C luettaessa, ja kaikki viisi jäivät kartalle
vielä ikkunan sulkemisen jälkeen. Nyt-sarakkeen kaksi kuplaa C:n
kohdalla ovat molemmat saman jutun omia (testikupla ja pelin oma
repliikki) — saman tilanteen kuplat kuuluukin näkyä yhdessä, kahdeksan
rivin kattoon asti.

## Korjaus (js/pollo.js)

1. **Kupla muistaa tilanteensa.** `lisaaPinoon` merkitsee
   `kupla.dataset.konteksti = this.kuplaKonteksti()`. Merkintä on
   yhdessä paikassa eikä neljässä kutsujassa, joten se ei voi unohtua.
2. **`siivoaVanhanKontekstinKuplat()`** poistaa pinosta ne kuplat,
   joiden konteksti ei ole nykyinen. Se ei ole tyhjennys: saman
   tilanteen kuplat säilyvät.
3. **Kolme laukaisinta.** Dialogin avautuminen/sulkeutuminen
   (`seuraaLivianDialogeja`), lehden aihesivun vaihto
   (`#arrival-kategoria`) ja — tämä oli se puuttuva —
   **jutun vaihto samassa ikkunassa**. Nähtävyyshampurilainen vaihtaa
   `#nahtavyys-dialog`in sisällön sulkematta ikkunaa, joten dialogien
   seuranta ei nähnyt siirtymää lainkaan. Nyt seurataan otsikkoa
   (`#nahtavyys-otsikko`, `#wiki-title`) — sama tunniste, jolla
   `kysymysAvain` erottaa jutut toisistaan.

**Mitään ei menetetä:** jokainen kupla on kirjattu chattiin jo
sanottaessa (`kirjaaKuplaViestiin`), ja pinon oma laajennus nostaa lokin
takaisin kartan päälle (`taytaPinoHistorialla`). Siksi siivous myös
nollaa `pinonHistoriaLisatty`-lipun: laajennus toimii uudessa
tilanteessa uudelleen.

## "Ei kannata luottaa pulu" kahdesti

**Tätä en pystynyt mittaamaan.** Lause ei ole missään repossa (etsin
koko puusta), joten se on mallin tuottamaa tekstiä eikä esikirjoitettu
repliikki — sitä ei voi toistaa ilman samaa mallivastausta. Kasautuva
pino selittää sen luontevasti: sama varaus kahdesta eri tilanteesta oli
yhtä aikaa ruudulla. Jos se toistuu vielä tämän korjauksen jälkeen,
tarvitaan Sonnetin kuvakaappaus ja se, mistä kahdesta kohdasta lause
tuli.

## Vartiot

- `node --test tests/*.test.mjs`: **3 752 testiä, 0 punaista**
  (kaksi uutta, `tests/pulu-kuplamuisti.test.mjs`).
- `tools/tarkista-niputus.mjs`: 429 moduulia, ei törmäyksiä.
- `tools/tarkista-savukkeet.mjs`: kunnossa.

## LÖYDÖS: savuke-pulun-kuplat on vanhentunut — 16/37 MYÖS POHJASSA

Ajoin `tools/savukkeet/savuke-pulun-kuplat.mjs`:n ja sain 16/37. Ajoin
sen sitten **pohjahaarassa ilman muutoksiani**: sama **16/37**. Kyse ei
siis ole regressiosta vaan siitä, että savuke mittaa väärää tilannetta.

Syy: savuke ajaa 390 × 844:ssä, ja **puhelimella kupla imeytyy heti
pulun muistiin** (omistajan päätös 14.9.2026, `lisaaPinoon`n loppu).
Pinossa on siis nolla kuplaa, ja 21 mittaa, jotka kaikki mittaavat
pinon ulkonäköä, ovat punaisia. Savukkeen koko premissi (pinon korkeus,
kurkistus, häivytys, napautettavuus) on kirjoitettu ennen tuota
päätöstä.

Korjaus on ajaa savuke leveydellä, jossa kuplat oikeasti näkyvät — se
on oma eränsä, koska se koskee kaikkia 37 mittaa. **En tehnyt sitä
tässä**, jotta tämä erä pysyy yhdessä asiassa. Sano jos otan sen
seuraavaksi.

Savukkeeseen tein vain yhden rivin verran muutosta: `PLAYWRIGHT_JS`- ja
`CHROMIUM`-varatiet, jotta se ylipäätään käynnistyy Mac Studiolla
(sama kuvio kuin muissa savukkeissa).

## Mitä jäi tekemättä

- **Selainkuvaa ei ole.** Luvut ovat mittausskriptistä
  (scratchpad, ei repoon viety), eivät kuvasta.
- En mitannut **pallolaudan** nostoja, vaan kaupungin nähtävyysjuttuja.
  Molemmat kulkevat saman `kysymysAvain`-käsitteen läpi
  (`paallimmainenJuttu`), joten korjaus kattaa ne, mutta Mayotten ja
  Dubain omaa reittiä en ajanut.
- Savukkeen 21 vanhentunutta mittaa (ks. yllä).
- `pinonKonteksti` päivittyy myös siitä kuplasta, joka pinoon lisätään;
  jos kupla sanotaan juuri ennen kuin ikkuna ehtii aueta, se katoaa
  seuraavassa siivouksessa. En nähnyt tätä mittauksessa, mutta se on
  mahdollinen.
