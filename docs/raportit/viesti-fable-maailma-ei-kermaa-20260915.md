# Maailmanäkymä ilman kermaa: korkeuserot koko laudalle

*Opus-agentti Fablelle 15.9.2026. Raamattu (haara
`claude/bold-ride-vow4ki`), KARTTAUUDISTUKSEN PAATOKSET 23; taustaksi
PAATOKSET 9–11 (tasoituskerma) ja LINSSIVIKA (laattalukko, v1900).*

Omistaja 15.9.2026 klo 15.15 UTC, työpöytäkuva Unkarista
maailmanäkymässä, sanatarkasti: *"maailma tilan ollessa paalla huntua
ei pitanyt nakya. eli korkeuserot kaikkialle nakyviin"*.

---

## 1. Mikä kerma on ja miksi sitä ei voi vain jättää maalaamatta

Tasoituskerma on KAHDESSA paikassa, ja vain toinen on asiakkaan
kädessä:

1. **Laatan kankaaseen poltettu peite.** Väritason laatat ajetaan
   kohdemaan renkaista leikaten
   (`tools/fokuskartta/maailmapiirto.js` `polttaVariLeikkuri`): maan
   ULKOPUOLELLA laatassa on valmiiksi kerma (`#faf4d6`, peitto 0,85) ja
   laataston reunalla häive. Sitä ei voi pyyhkiä laatasta pois
   selaimessa.
2. **Pelin oma maalaus.** Peli maalaa saman kerman samalla peitolla
   kaikkialle suojatun suorakaiteen ulkopuolelle
   (`js/pallolaatat.js` `maalaaTasoitus`), myös laatoille joita ei ole
   olemassa — juuri se poisti kaistat 13.9.

Pelkkä maalauksen pois jättäminen olisi siis paljastanut poltetun
kerman: kartta olisi näyttänyt samalta, mutta laattaruudukon reunat
olisivat palanneet.

## 2. Toteutus yhdellä lauseella

Kun kehittäjän maailmanäkymä on päällä, **värilaatan kuva piirretään
vain kohdemaan renkaiden sisään** (`ctx.clip`) eikä kermaa maalata
lainkaan — kaikkialla muualla jää näkyviin sama laatan kangas, jolle
pohjalaatta on jo piirretty, eli koko maailman topografia
varjostuksineen ja korkeuseroineen.

Muutetut kohdat:

| Tiedosto | Muutos |
| --- | --- |
| `js/laattapyramidi.js` | `asetaTasoituksenMaailma` / `tasoituksenMaailma`; `pyramidinTasoitus` palauttaa `maailma` ja `renkaat` (`maanAluevesiRenkaat(..., 0)` — sama raja kuin laattaan poltettu reikä) ja lisää tilan `avain`-kenttään |
| `js/pallolaatat.js` | uusi `maalaaMaailmanVari`: leikkaa renkaisiin ja piirtää kuvan niiden sisään; kokonaan renkaiden ulkopuolinen laatta ei piirrä eikä leikkaa mitään |
| `js/pallolauta/lauta.js` | tila luetaan samassa hetkessä kuin väritason maa: `asetaTasoituksenMaailma(kehittajaTilaPaalla() && kehittajaMaailmaPaalla() && !ui.katselu)` |
| `js/ui.js` | `paivitaKehittajaMaailma` kutsuu `pallolauta?.paivita()`, jotta nappi vaikuttaa heti |

**Paluu kermaan ei vaadi sivulatausta.** Tila on osa
`pyramidinTasoitus().avain`-kenttää, joten laattakerros mitätöi
kankaansa itse napin kytkennässä (sama koneisto kuin maanvaihdossa) ja
kokoaa ne uudestaan — laatat tulevat selaimen välimuistista, mitattu
uudelleenkokoaminen 18/18 laattaa.

**Ei vaikutusta tavalliseen pelinäkymään eikä linssiin.** Ehto on
kehittäjätila + maailmanappi + ei katselukuvaa; maailmanäkymän
ulkopuolella `tasoitus.maailma` on epätosi ja koodi kulkee entistä
haaraa (`maalaaTasoitus`, linssin laattalukon `kermatta`-lippu
mukaan lukien).

## 3. Mittaukset (Chromium 1400 × 900, Fogg Budapestissa, HUN)

Uusi savuke `tools/savukkeet/savuke-maailma-ei-kermaa.mjs` ajaa saman
pakotetun kameran kummallakin asetuksella (V0 vartioi, että näkymä on
tavulleen sama) ja lukee pikselit CDP-kaappauksesta.

**V1 — kirkkaus kohdemaan ulkopuolella (5 × 5 mediaani, luminanssi):**

| Piste | A (kerma) | B (maailmanäkymä) | muutos |
| --- | --- | --- | --- |
| Itävalta / Steiermark | 244,5 | 225,6 | −18,8 |
| Romania (Apuseni) | 238,0 | 181,1 | −56,9 |
| Romania (Szatmár) | 245,0 | 225,6 | −19,4 |
| Serbia (Banat) | 244,0 | 230,1 | −13,9 |
| Kroatia (Slavonia) | 244,9 | 232,2 | −12,7 |

**V2 — topografian kontrasti.** Apusenin vuorten 41 × 41 pikselin
ruudun Laplace-varianssi **1,19 → 17,42 = 14,7×** (kiintiö ≥ 3×).

**V3 — kohdemaan sisällä ei muutosta:** Alföld 228,6 → 228,6,
Dunántúl 176,2 → 176,2, Mátra 195,7 → 195,7 (ero 0,0).

**V4 — ääriviiva paikallaan:** korostus `HUN` ja 369 janaa
molemmissa. **V5 —** ei sivuvirheitä.

**Vastakoe (`--vastakoe`, kytkin syötynä):** kaikki viisi ulkopistettä
ja Laplace-varianssi täsmälleen samat A:ssa ja B:ssä → V1 ja V2
kaatuvat, 4/6. Koe mittaa siis kytkintä eikä kahden kuvakaappauksen
samuutta.

Kuvat: `docs/raportit/kuvat/maailma-ei-kermaa-ennen-1400-20260915.jpg`
(kerma päällä — omistajan kuva) ja
`…-jalkeen-1400-20260915.jpg` (maailmanäkymä: Alpit, Karpaatit ja
Dinaridit näkyvissä, Unkari ennallaan ääriviivoineen).

## 4. Miksi vartio on uusi savuke eikä `savuke-maailmanakyma`

`savuke-maailmanakyma.mjs` ajaa `?lauta=kartta` ja on vanhan kartan
ohituksessa (`tools/savukkeet/vanha-kartta-ohitus.mjs`): se tulostaa
yhden rivin ja päättyy koodilla 0. Vartio, joka ei aja, ei ole vartio,
ja mitattava asia on pallon laattakerroksessa — siksi oma savuke,
kirjattuna `tools/savukkeet/README.md`:hen.

## 5. Ajetut portit

- `node --test tests/rules.test.mjs tests/dokumentit.test.mjs` — 337/337
- `node --test tests/pallolaatat.test.mjs tests/tasoitustaso.test.mjs
  tests/varitaso-luettelo.test.mjs tests/varitasopolku.test.mjs
  tests/maakorostus.test.mjs` — 59/59
- `tools/tarkista-savukkeet.mjs` — kunnossa
- `savuke-maailma-ei-kermaa` 6/6, vastakoe 4/6 (punainen kuten pitää)
- `savuke-linssivika` — 6/6
- `savuke-era12` — 26/27. Ainoa punainen on **väite 10** (rulla
  maapaneelin päällä: paneeli 0,0597 vs. kartta 0,0242, suhde 2,47)
  eli PÄÄTÖKSET 21:n maapaneelityö, jota toinen agentti tekee
  rinnalla (`js/pallolauta/maapaneeli.js`). Se ei koske tätä erää:
  tämä muutos ei kajoa paneeliin eikä eleiden käsittelyyn. Kaikki
  muut 26 vartiota — Ranskan uloszoomaus, rajaus, ankkurit ja
  kaikki yksitoista vastakoetta — ovat vihreitä

## 6. Mitä EI tehty

Versionostoa, mergeä eikä Raamattu-kirjausta (ne ovat Fablen). Kerma
maailmanäkymän ulkopuolella on ennallaan, eikä laattojen polttoa
muutettu — korjaus on kokonaan asiakkaassa.
