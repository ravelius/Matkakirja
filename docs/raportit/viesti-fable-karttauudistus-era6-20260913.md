# Karttauudistus erä 6: minikysymykset nostoihin (Pariisi)

*(Opus-työsessio → Fable, 13.9.2026. Haara
`claude/karttauudistus-era6-minikysymykset`. Ei versionostoa, ei
dist/:iä. Lähteet: tehtävänanto, docs/raportit/
karttauudistus-suunnitelma-pallo-20260913.md luvut 1.3, 3.5 ja 3.6,
docs/raportit/karttauudistus-suunnitelma-20260913.md luvut 1.6, 1.8 ja
5.1, Raamattu "Kaupungit" KARTTAUUDISTUS + PAATOKSET 1.)*

**YKSI ASIA HETI KÄRKEEN, KOSKA SE MUUTTAA PILOTIN TULKINTAA:**
Pariisin kaikki kolme nostoa on siirretty pois pääkartalta
kaupunkilehden kohdekartalle (omistajan sääntö 2.9.2026), joten
pilottikysymystä EI VOI TÄLLÄ HETKELLÄ NÄHDÄ PELISSÄ. Koneisto,
datamalli ja kysymys ovat valmiit ja todennetut; puuttuu vain
karttapaikka. Yksityiskohdat luvussa 6 — se on erän ainoa avoin asia ja
vaatii Fablen päätöksen.

---

## 1. Datamalli

Uusi **valinnainen** kenttä fokusvirtapakan `takynostot`-riville
(js/packs/fokusvirta-*.js):

```js
visa: {
  kysymys: 'Kysymys yhtenä lauseena?',
  vaihtoehdot: ['Ensimmäinen', 'Toinen', 'Kolmas'],
  oikea: 0,              // indeksi vaihtoehdoissa
  fakta: 'Tulosrivin perään tuleva lisärivi.',  // valinnainen
  otsake: 'LUKIJAN KYSYMYS',    // valinnainen, oletus alla
  vihje: 'vastaus löytyy …',    // valinnainen, oletus alla
}
```

**Muoto on TÄSMÄLLEEN sama kuin lehtitehtävällä** (`lehtitehtavat[].visa`
samoissa paketeissa). Tämä oli tietoinen valinta tehtävänannon
ehdottaman `kysymys: { k, vaihtoehdot, oikea }` sijaan kolmesta syystä:

1. **Tekstivetäjä ei opettele toista kaavaa.** Sama kysymys kirjoitetaan
   samalla kaavalla kummalle pinnalle tahansa, ja rivin voi kopioida
   lehtitehtävästä nostoon sellaisenaan.
2. `kysymys` ja nykyinen `kysymykset` (pulun valmiit chat-avaukset,
   js/fokusnosto.js `piirraNostonKysymykset`) olisivat samassa oliossa
   yhden kirjaimen päässä toisistaan.
3. Jaettu komponentti (luku 2) lukee molempia samalla koodilla.

**Koodia ei tarvita uuteen kysymykseen.** Kenttä luetaan ja
kelpuutetaan ajossa (`nostonVisa`, js/fokusnosto.js): puuttuva, vajaa
tai rajojen ulkopuolinen `oikea` jättää kysymyksen pois HILJAA — vanha
nosto on yhä kelvollinen nosto eikä kirjoitusvirhe kaada korttia.

Oletustekstit, jos data ei anna omia:

| kenttä | oletus |
| --- | --- |
| `otsake` | `LUKIJAN KYSYMYS` |
| `vihje` | `vastaus löytyy tästä jutusta · +25 puntaa` |

## 2. Toteutus tiedostoittain

| tiedosto | muutos |
| --- | --- |
| **js/fokustehtavat.js** | Uusi vietävä `piirraVisanVastaukset(laatikko, { visa, palkkio, kirjaa, ennen, jalkeen })` — lipukkeet, tulosrivi, äänet ja natiivikuittaus yhtenä koneena. `piirraNimettyTehtava` (lehden tehtävä) refaktoroitu käyttämään sitä. **Lehtitehtävän 50 p:n palkkio, sanamuodot ja järjestys ovat ennallaan** — kirjaus, juliste, pullatarjous, aarrepisteen sytytys ja pöllön kuittaus kulkevat `kirjaa`/`ennen`/`jalkeen`-takaisinkutsuina. |
| **js/fokusnosto.js** | `piirraNostonVisa` piirtää laatikon kortin loppuun; `nostonVisa` kelpuuttaa datan; vakiot `NOSTON_VISA_PALKKIO = 25` ja `NOSTON_VISA_KAUPUNKI = 'nosto'`. Lisäksi vietävä `avaaNostonTunnuksella(ui, nostoId)` (ks. luku 6). |
| **js/game.js** | VAIN uusi tallennuskenttä `nostotehtavatRatkaistu` (kokonaisluku), sen `toJSON`/`fromJSON`-käsittely ja yhden rivin kasvatin `kirjaaNostotehtava()`. **`actionMinitehtava`n rajapintaan ei koskettu.** |
| **css/fokusnosto.css** | Osio 12: laatikon sisäosat kortissa. Kehys, lipukelista ja tulosrivi tulevat `.minitehtava`-säännöistä (css/styles.css) sellaisinaan; tässä on vain se, mikä styles.css:ssä on `.dialog`-etuliitteellä (otsake, kysymysrivi, lipukenapit) — nostokortti ei ole `<dialog>`. |
| **js/packs/fokusvirta-pariisi.js** | Pilottikysymys (luku 4). |
| **tools/savukkeet/savuke-nostovisa.mjs** + README | Uusi savuke (luku 5). |

### Palkkio ja kirjanpito

Palkkio **25 p** (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 1). Kirjaus
kulkee `game.actionMinitehtava(cityId, aiheId, oikein, 25)` läpi
avaimella

```
<pakka>:nosto:<noston tunnus>      esim. maailmankartta:nosto:carmenin-ensi-ilta
```

**Miksi pseudokaupunki `'nosto'` eikä oikea kaupunki.** Nosto ei ole
kaupungin omaisuutta: sama täky näkyy maan JOKAISESSA kaupungissa
(`NOSTO_MAAT`, `nostoMaanPooli`), joten kaupunkikohtainen avain maksaisi
saman kysymyksen uudelleen Marseillessa. Kiinteä `'nosto'` tekee
avaimesta maailmanlaajuisesti yhden. Maailmankartalla ei ole kaupunkia
tällä tunnuksella (tarkistettu), joten se ei voi törmätä lehtitehtävän
avaimeen.

**Kaksoismaksun portti on `actionMinitehtava`n oma:** ensimmäinen
vastaus — oikea TAI väärä — kuluttaa avaimen, ja toinen yritys palaa
`{ ok: false }`:llä. Jaettu komponentti ei silloin piirrä, soita eikä
aja `jalkeen`-kutsua, joten laskuri ei voi kasvaa kahdesti. Uudelleen
avatussa kortissa laatikossa on `fakta` eikä lipukkeita.

## 3. Laskurin nimi ja muoto (erälle 7)

```
game.nostotehtavatRatkaistu   // kokonaisluku, oletus 0
```

- Kasvaa **vain** kun kirjaus meni läpi JA vastaus oli oikein.
- Väärä vastaus ei kasvata sitä eikä kassaa.
- Tallennuksessa `toJSON()`-kentässä samalla nimellä;
  `fromJSON` lukee `Number.isFinite`-portilla ja putoaa nollaan, joten
  **vanha tallennus ilman kenttää latautuu ja laskuri on 0**.
  Skeemaversio pysyy 2:ssa (suunnitelma, luku 4.4).
- Kasvatin: `game.kirjaaNostotehtava()` → palauttaa uuden arvon.

**Erä 7 lukee siis vain `game.nostotehtavatRatkaistu >= 2`.** Laskuri on
GLOBAALI eikä kaupunkikohtainen — tehtävänannon sitova ohje
(*"pidä laskuri yksinkertaisena kokonaislukuna"*). Suunnitelman luku 3.6
puhuu kaupunkikohtaisesta laskurista; ristiriita on kirjattu luvun 7
avoimiin, koska se on erän 7 päätös eikä tämän.

## 4. Pilottikysymykset (VANHA/UUSI)

Pariisin poolissa on **kolme** nostoa, joten kiintiö "joka kolmanteen"
tuottaa **yhden** kysymyksen — poolin kolmanteen nostoon. Savukkeen
vartio 0 valvoo tämän koneellisesti.

| # | nosto | ennen | nyt |
| --- | --- | --- | --- |
| 1 | `lustig-eiffel` | ei `visa`-kenttää | ei `visa`-kenttää |
| 2 | `kirahvin-kavelymatka` | ei `visa`-kenttää | ei `visa`-kenttää |
| 3 | `carmenin-ensi-ilta` | ei `visa`-kenttää | **uusi kysymys, alla** |

### `carmenin-ensi-ilta`

**VANHA:** nostolla ei ollut `visa`-kenttää lainkaan; kortti päättyi
lähderiviin ja pulun kolmeen valmiiseen kysymykseen.

**UUSI:**

```js
visa: {
  kysymys: 'Nimiroolia oli vaikea täyttää: laulajatar Marie Roze '
    + 'kieltäytyi siitä heti. Miksi?',
  vaihtoehdot: [
    'Hänen olisi pitänyt kuolla lavalla',
    'Ensi-ilta oli sovittu liian pian',
    'Ooppera sijoittui Espanjaan',
  ],
  oikea: 0,
  fakta: 'Rooli meni toiselle laulajattarelle, ja ensi-illan jälkeen '
    + 'yksi kriitikko kutsui pääosan tulkintaa paheen '
    + 'ruumiillistumaksi.',
}
```

**Vastaus on saman noston tekstissä** (`lunastus`, ensimmäinen kappale,
sanatarkasti): *"Nimiroolikin oli vaikea täyttää: Marie Roze kieltäytyi
kuultuaan, että hänen olisi kuoltava lavalla."* Myös `fakta` pysyy
kortin sisällä: rooli meni toiselle ja kriitikon sanat ovat toisen
kappaleen lopussa (*"yksi kriitikko kutsui pääosan tulkintaa paheen
ruumiillistumaksi"*). **Ulkopuolista faktaa ei ole eikä yhtään uutta
faktaväitettä lisätty.** Väärät vaihtoehdot eivät ole faktaväitteitä
vaan uskottavia arvauksia — sama kaava kuin `PIAF_VISA`ssa ja
`GUIMARD_VISA`ssa saman tiedoston alussa.

Ikäsopivuus (13+): kysymys koskee sitä, mitä lavalla tapahtuvasta
kuolemasta SANOTTIIN, ei juonen väkivaltaa — sama linja kuin noston
oman ikäsopivuuskommentin.

## 5. Savukeajot

`tools/savukkeet/savuke-nostovisa.mjs`, ruutu 390 × 844, deviceScaleFactor 2.

### Vihreä ajo (koodi sellaisenaan)

```
INFO  Pariisin nostot: lustig-eiffel, kirahvin-kavelymatka, carmenin-ensi-ilta *
OK    0. kiintiö: joka kolmannessa nostossa on kysymys
OK    pallolauta aukesi (oikea vastaus)
INFO  kortin otsake: "LUKIJAN KYSYMYS"
INFO  kortin kysymys: "Nimiroolia oli vaikea täyttää: laulajatar Marie Roze kieltäytyi siitä heti. Miksi?"
INFO  vihjerivi: "vastaus löytyy tästä jutusta · +25 puntaa"
INFO  lipukkeet: Hänen olisi pitänyt kuolla lavalla | Ensi-ilta oli sovittu liian pian | Ooppera sijoittui Espanjaan
INFO  laatikon leveys / kortin leveys: 296 px / 342 px (ruutu 390 px)
OK    1. kysymys on kortissa lipukkeineen
OK    1b. 390 px: laatikko mahtuu korttiin eikä sivu vuoda vaakaan
INFO  oikea vastaus: money 300 → 325, laskuri 0 → 1
INFO  tulosrivi: "Oikein! +25 puntaa. Rooli meni toiselle laulajattarelle, …"
OK    2. oikea vastaus lisää palkkion ja kasvattaa laskuria
INFO  toinen avaus: lipukkeita 0, money 325, laskuri 1
OK    3. sama kysymys ei maksa kahdesti
OK    pallolauta aukesi (väärä vastaus)
INFO  väärä vastaus: money 300 → 300, laskuri 0 → 0
INFO  tulosrivi (väärä): "Oikea vastaus: Hänen olisi pitänyt kuolla lavalla. …"
OK    4. väärä vastaus ei lisää kassaan eikä laskuriin (VASTAKOE)
OK    pallolauta aukesi (vanha tallennus)
INFO  vanha tallennus: money 300, laskuri 0
OK    5. vanha tallennus ilman kenttää latautuu, laskuri 0

10/10 läpi
```

### Punainen ajo (VASTAKOE 1: palkkion kirjaus riisuttu)

Muutos: `piirraNostonVisa`n kirjauksesta palkkio 25 → 0 ja rivi
`ui.game.kirjaaNostotehtava()` poistettu. Muuta ei koskettu. Tiedosto
palautettiin heti ajon jälkeen.

```
INFO  oikea vastaus: money 300 → 300, laskuri 0 → 0
FAIL  2. oikea vastaus lisää palkkion ja kasvattaa laskuria
      — money 300 → 300 (odotettu +25), laskuri 0 → 0

9/10 läpi
```

Vartio 2 kaatuu, kaikki muut pysyvät vihreinä — savuke mittaa siis
juuri sen, mitä väittää mittaavansa.

### VASTAKOE 2 (väite): väärä vastaus ei lisää kumpaakaan

Vartio 4 on tämä vastakoe, ja se ajetaan **omassa selainkontekstissaan
tyhjästä tallenteesta**, jotta oikean vastauksen ajo ei voi vuotaa
lukuja siihen. Väärä lipuke: `money 300 → 300`, laskuri `0 → 0`,
lipukkeita jäljellä 0 (kysymys kului, palkkio ei lähtenyt).

### Kuvakaappaukset

- `docs/raportit/kuvat/karttauudistus-6-nostovisa-kysymys.png` (83 kt) —
  laatikko vastaamattomana: nimilaatta, vihjerivi, kolme lipuketta.
- `docs/raportit/kuvat/karttauudistus-6-nostovisa-tulos.png` (87 kt) —
  sama laatikko oikean vastauksen jälkeen.

Molemmat rajattu korttiin ja ladattu `scale: 'css'` -mitassa (kortin
oma litografia veisi koko ruudun kaappauksesta 620 kt).

### Portit

| portti | tulos |
| --- | --- |
| `npm test` | `# pass 3293`, `# fail 0`, skipped 13 (3306 testiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 388 moduulia, 4174 julistusta, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | 1496 ui-viittausta, ei puuttuvia nimiä |
| `node tools/build-standalone.mjs` | dist/matkakirja.html 31 777 kt (ei committoitu) |
| `grep -rn '^<<<<<<<' js css tests tools` | tyhjä |

## 6. ESTE: Pariisin nostoilla ei ole karttapaikkaa

**Havainto.** Pariisin kaikki kolme täkynostoa (`lustig-eiffel`,
`kirahvin-kavelymatka`, `carmenin-ensi-ilta`) on linkitetty
kaupunkilehden kohdekartan pisteisiin (`js/packs/nahtavyysjutut.js`,
kenttä `nosto`), ja `js/fokuskohteet.js karsiKaupunkikartanNostot`
pudottaa jokaisen sellaisen noston pääkartalta, kun kaupunki on
laudalla — omistajan sääntö 2.9.2026 (*"nuo karttanostot jotka ovat
kohdekaupunkien kohdalla piti viedä pois pääkartalta"*).

**Mitattu:** pallo Pariisin päällä korkeudella 0,09 → osumissa
`chambord, loire, chartresin-katedraali, skandaali-kaulanauhajuttu-1785`
eli pelkkiä maan kohteita, ei yhtään täkynostoa. Kohdekartan piste taas
avaa **nähtävyys-pop-upin** (js/nahtavyydet.js), ei nostokorttia — ja
nähtävyysjuttuun on kopioitu noston teksti sanatarkasti, mutta ei
kysymystä.

**Seuraus:** pilottikysymys on datassa, koneisto toimii ja savuke ajaa
sen aidon kortin läpi, mutta **pelaaja ei tällä hetkellä pääse siihen
korttiin Pariisissa.**

**Laskin muiden kaupunkien tilanteen** (nosto, jolla ei ole
kohdekarttalinkkiä eikä `kohde`-kenttää mutta on `paikka`):

| kaupunki | nostoja | pääkartalla |
| --- | --- | --- |
| **pariisi** | 3 | **0** |
| sofia, istanbul, rooma, budapest, dubrovnik | 1 | 0 |
| madrid | 3 | 3 |
| amsterdam, edinburgh, lissabon, sevilla | 4 | 4 |
| berliini, kiova | 3 | 2 |
| dublin, krakova, pietari, vilna | 3 | 3 |
| wien, bergen, riika | 2 | 2 |
| bukarest, sarajevo, lontoo, praha, tukholma, kobenhavn, helsinki, tallinna | 1 | 1 |

Pariisi on siis ainoa kaupunki, jossa EI OLE yhtään pääkartalla näkyvää
nostoa — ja juuri se valittiin pilotiksi.

**En laajentanut erää tämän korjaamiseksi** (kustannuskuri, kohta 1 ja
4). Kolme vaihtoehtoa Fablelle, suositus ensimmäinen:

1. **Monista kysymykset seuraavaksi kaupunkiin, jolla on nostoja
   kartalla** (Madrid 3/3, Amsterdam 4/4, Lissabon 4/4 …). Kiintiö
   "joka kolmas" toimii siellä sellaisenaan, ja Pariisin kysymys jää
   datassa odottamaan — se syttyy sinä päivänä, kun nosto palaa
   kartalle. Halvin ja rikkoo vähiten.
2. **Piirrä sama laatikko myös nähtävyys-pop-uppiin**
   (js/nahtavyydet.js). Silloin Pariisin kysymys näkyy heti, mutta
   erä koskee uutta tiedostoa ja uutta pintaa — oma eränsä, ei tämä.
3. **Palauta yksi Pariisin nosto pääkartalle.** Ristiriidassa omistajan
   2.9.2026 säännön kanssa; ei suositeltava ilman omistajan päätöstä.

## 7. Avoimet

1. **Pilotin näkyvyys** — luku 6, vaatii Fablen valinnan.
2. **Laskuri globaali vai kaupunkikohtainen.** Tehtävänanto sanoi
   yksinkertainen kokonaisluku, suunnitelman luku 3.6 sanoi
   kaupunkikohtainen. Toteutin kokonaisluvun. Jos erä 7 haluaa ehdon
   *"kaksi tehtävää TÄSSÄ kaupungissa"*, kenttä on vaihdettava
   joukoksi tai olioksi — se on yhden rivin muutos `game.js`:ssä ja
   yksi rivi `fokusnosto.js`:ssä, mutta se kuuluu erälle 7.
3. **Kiintiö on toistaiseksi valvottu vain Pariisissa.** Savukkeen
   vartio 0 laskee `Math.floor(nostoja / 3)`; kun kysymyksiä
   monistetaan, vartio kannattaa yleistää kaikkiin paketteihin
   (yksikkötesti tests/:ssä olisi halvempi kuin selainajo).
4. **Pulun kuva menee kolmannen lipukkeen oikean reunan päälle**
   kapealla ruudulla (näkyy kysymyskaappauksessa). Ei erän 6 tuomaa —
   pulu kelluu samalla tavalla kaikkien korttien päällä — eikä
   js/pollo.js ole tämän session tiedosto. Kirjattu havaintona.
5. **`avaaNostonTunnuksella` on uusi vietävä** js/fokusnosto.js:ssä.
   Sen tarve syntyi luvun 6 esteestä: ilman karttamerkkiä korttia ei
   voi avata pelin omalla polulla, ja pakollinen savuke tarvitsi
   kortin. Funktio kulkee täsmälleen samaa reittiä kuin merkin
   napautus (`avaaNosto` → `avaaNostonKortti`). Jos este ratkeaa
   tavalla 1 tai 3, sen voi poistaa — mutta se on myös luonteva ovi
   erän 7 Pulun ohjeelle.

## 8. Mitä EI tehty (tehtävänannon rajat pidetty)

- Lehtitehtävän 50 p:n palkkiota ei muutettu.
- `actionMinitehtava`n rajapintaa ei muutettu.
- Tallennuksen skeemaversiota ei nostettu.
- js/pollo.js, js/livia-*.js, js/lehti.js, js/fokusmitat.js,
  js/pallolaatat.js, js/laattapyramidi.js, js/pallolauta/siirto.js,
  js/rules.js ja js/ui.js ovat koskemattomia.
- js/game.js:ään lisättiin vain laskurikenttä ja sen käsittely.
- Versiota ei nostettu, dist/:iä ei committoitu.
