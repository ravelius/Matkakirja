# Ihmisen matka, JATKO 3 TARKENNUS 2 — hitaampi zoom, Marokon ajo siirtyy, koko Afrikka ruutuun

Opus-agentti 16.9.2026, haara `claude/bold-ride-vow4ki-ihmisen-matka-kappaleet`.
Omistajan päätös: Raamattu, "IHMISEN MATKA -LINSSI … JATKO 3 TARKENNUS 2"
(16.9.2026 klo 18.50 UTC, iPhone-kuva v1924: 300 000 v. sitten, kartta
zoomattuna Guineanlahdelle liian lähelle). Sanatarkasti:

> "Uusi zoomaus-animaatio Zoomaan jostain syysta nain lahelle, ja alkuzoomaus
> on edelleen liian kiireinen. Tee vain se 5sek hitaampi sisaan zoomaus, ja
> aloita siten vasta liikuttamaan kohti Marokkoa. Ei haittaa, vaikka Marokon
> teksti alkaa tulla ennen kuin kartta on zoomautunut sinne asti. Kokoon on."

Tämä KUMOAA saman päivän klo 17.15 tarkennuksen ("Zoomin jatko 2–3 s, ei 5 s").

---

## 1. VIKA v1924: miksi kartta zoomasi Guineanlahdelle

Juurisyy mitattiin selaimella (Chromium, 390 × 844, dpr 2, pelaaja Ateenassa,
mainin koodilla ennen korjausta). Syitä oli **kaksi**, ja ne osuivat samaan
silmänräpäykseen.

### 1a. Zoomikatto palasi pelaajan maan estoon kesken esityksen

Kameran korkeuden ja OrbitControlsin `maxDistance`-katon aikasarja
(korkeuksina, ms sivun latauksesta):

| ms | kameran korkeus | katto | jakso |
|---:|---:|---:|---|
| 37 952 | 4,8178 | 300 | avaus |
| 38 907 | 1,6404 | 300 | avaus |
| 40 780 | **1,1734** | 300 | avaus |
| 41 381 | 1,1734 | **0,1431** | afrikka |
| 42 128 | **0,1431** | 0,1431 | afrikka |

Avaus nosti katon suoraan `OrbitControls.maxDistance`iin (`avaaKaukaisuus`) ja
palautti sen entiseen lukemaan valojen syttyessä (`palautaKaukaisuus`). Se
entinen lukema EI ole pallon oma katto vaan **pelaajan maan uloszoomausesto**
(`js/pallolauta/lauta.js` `maanZoomiraja` → `tahdistaZoomirajat`) — Ateenassa
korkeus 0,1431. Samalla kehyksellä, jolla katto putosi 300 → 0,1431,
OrbitControls puristi kameran 1,1734 → 0,1431: koko maanosa vaihtui yhdessä
silmänräpäyksessä Kreikan kokoiseksi lähikuvaksi siihen pituusasteeseen, johon
zoomi sattui päättymään. Omistajan pelissä se piste oli Guineanlahti.

### 1b. Avauksen rajaus kulki laudan SAAPUMISSÄÄNNÖN kautta

Toinen puoli näkyy jo ennen puristusta: korkeus 1,1734 ja keskipiste **lon
23,741** — Ateenan pituusaste, ei Afrikan laatikon oma 17. Syy on
`js/pallolauta/kamera.js` `korkeuteenSovitus` (KARTTAUUDISTUKSEN PÄÄTÖKSET 17,
erä 14): kapealla ruudulla maan laatikko sovitetaan pelkkään KORKEUTEEN ja
X-keskipisteeksi otetaan pelaajan kaupungin pituusaste. Se on oikea sääntö
maalle, mutta väärä maanosan esittelylle.

Mitattu samalla ruudulla (`ajaKamera` suoraan, Afrikan laatikko):

| | korkeus | keskipiste | pohjoiskärki | eteläkärki | länsikärki | itäkärki |
|---|---:|---|---|---|---|---|
| ilman `kokonaan` | 1,1734 | 1,141 / **23,741** | ruudulla | ruudulla | **EI** | **EI** |
| `kokonaan: true` | 2,5 | 1,141 / **17** | ruudulla | ruudulla | ruudulla | ruudulla |

### Korjaus

1. **Katto kulkee laudan oman syrjäytyksen kautta** (`lauta.zoomirajat`), jota
   satelliitti- ja topografialinssikin käyttävät. Avaruusvaiheessa katto on
   `AVARUUDEN_KORKEUS` (300), sen jälkeen `PALLO_KORKEUS_MAX` (2,5), ja laudan
   omat rajat palaavat vasta kun linssi suljetaan (`pura` →
   `vapautaZoomikatto`). Sivutuotteena katto ei enää palaa maan estoon
   silloinkaan, kun kotelon koko muuttuu kesken esityksen (kehyksen paluu →
   `kokovahti` → `tahdistaZoomirajat`).
2. **Nimetyn alueen rajaus ajetaan lipulla `kokonaan: true`** — sama lippu,
   jolla lennon rajaus kiersi saman säännön v1921:ssä. Koko laatikko ruutuun
   molempiin suuntiin, keskipiste laatikon oma.

### Mittaus korjauksen jälkeen (390 × 844, dpr 2)

Avauksen loppuasennossa korkeus **2,5**, keskipiste **1,141 / 17**, ja Afrikan
kaikki neljä kärkeä ruudulla (kotelo 374 × 828 px):

| kärki | ruutupiste |
|---|---|
| pohjoinen (Bizerte 37,3 N 9,9 E) | 155, 220 |
| etelä (Agulhas 34,8 S 20,0 E) | 201, 608 |
| länsi (Dakar 14,7 N 17,5 W) | 7, 336 |
| itä (Hafun 10,4 N 51,4 E) | 371, 360 |

Työpöydällä (1400 × 900) sama rajaus antaa korkeuden 1,1737, keskipisteen
1,141 / 17 ja kaikki neljä kärkeä ruudulla.

Kuva: `docs/raportit/kuvat/ihmisen-matka-avaus-390-20260916.jpg` (390 × 844,
dpr 2, esitys pysäytettynä sillä silmänräpäyksellä, jolla zoomi on perillä).

**VASTAKOE** (savuke, sama ajo): kun sama laatikko ajetaan ilman
`kokonaan`-lippua, korkeus on 1,1734, keskipiste 1,141 / 23,741 ja itä- ja
länsikärki ovat ruudun ulkopuolella. Mittari osoittaa siis oikeaa asiaa.

---

## 2. Zoom viisi sekuntia hitaampi (kohta 1)

`ZOOMIN_JATKO_MS` 2 500 → **5 000**. Zoomin LÄHTÖ ei liiku (`zoomAlku`), vain
päätepiste siirtyy. Mitattu (savukkeen varakestoilla, sama molemmilla ruuduilla):

| suure | ms jakson alusta |
|---|---:|
| musta (1. virke) | 3 214 |
| piste tähdissä | 5 014 |
| zoomin lähtö (`zoomAlku`) | 5 014 |
| Afrikka-hetki (`afrikka`, sana + 0,7 s) | 7 343 |
| zoomin peruskesto (`zoomPerus`) | 2 329 |
| **zoomin kesto (`zoomKesto`)** | **7 329** (+5 000) |
| **zoomi perillä (`zoomLoppu`)** | **12 343** |

Kertomuksen ja luennan ajoitus ei muutu: `musta`, `piste`, `zoomAlku` ja
`afrikka` ovat samat kuin ilman jatkoa (savuke vertaa samaan puhtaaseen
funktioon ilman jatkoa, ero ≤ 1 ms). Sana "Afrikasta" kuuluu siis kesken
zoomin — juuri niin kuin omistaja salli.

---

## 3. Marokon ajo alkaa vasta zoomin jälkeen ja pitää entisen pituutensa (kohta 2)

Ennen ajon PÄÄTEPISTE oli kiinni luennassa (`kohteeseenAsti`): jokainen zoomiin
lisätty sekunti lyhensi ajoa yhtä paljon, ja siksi jatkoa kutistettiin
2,5 sekuntiin. Nyt ajo kestää `kohteeseenAsti() + ZOOMIN_JATKO_MS`, eli se saa
entisen pituutensa takaisin ja **saapuminen siirtyy 5 s jakson alun yli**.
Tauko zoomin ja ajon välissä (`MAROKON_TAUKO_MS` 1,2 s) ei enää joustu ajon
kustannuksella.

Mitattu 390 × 844 (kameran aikasarja 250 ms:n välein, sivun sisällä):

| suure | mitta |
|---|---:|
| tauko alkoi (zoomi perillä) | 20 669 ms |
| Marokon ajo alkoi | 23 935 ms |
| mallin ajokesto | 19 126 ms |
| mitattu ajokesto | 19 789 ms |
| **saapumisen siirtymä jakson alusta (`kohdeajonMyohassa`)** | **5 000 ms** |

Ajo ei ole käynnissä ennen taukoa (edellinen näyte `kohdeajo: null`), ja
korkeuden aikasarjassa ei ole tasannetta muualla kuin tauossa. Esivaihe etenee
hitaasti: ensimmäisellä kolmanneksella kuljetaan 0–2 % matkasta eikä koskaan
taaksepäin.

Mittari `kohdeajonMyohassa` luetaan MALLISTA eikä seinäkellosta: savukkeen
väärennetty äänite (18 s hiljaisuutta avausjaksoille) ei kulje kaanonin
varakestojen tahtia, joten jakson vaihtuminen ruudulla ei kerro, missä kohtaa
malli luulee jakson alkavan.

---

## 4. Muutetut tiedostot

- `js/linssit/ihmisen-matka-esitys.js`
  - `ZOOMIN_JATKO_MS` 2 500 → 5 000 (perustelut vakion kommentissa).
  - `aloitaKohdeajo`: ajo pitää entisen pituutensa (`kohteeseenAsti() +
    ZOOMIN_JATKO_MS`); uusi mittari `kohdeajonMyohassa`.
  - `sytytaValot`: tauko ei enää joustu ajon kustannuksella.
  - `ajaAlueeseen`: `kokonaan: true`.
  - `asetaKatto` / `avaaKaukaisuus` / `palautaKaukaisuus` /
    `vapautaZoomikatto`: zoomikatto laudan `zoomirajat`-syrjäytyksen kautta,
    laudan omat rajat takaisin vasta purussa.
- `tests/ihmisen-matka-esitys.test.mjs` — vartiot uuteen päätökseen: jatko
  5 000 ms, ajon pituus, `kokonaan`-lippu, katto laudan kautta, eikä maan esto
  saa palata kesken esityksen.
- `tools/savukkeet/savuke-ihmisen-kappaleet.mjs` — uudet väitteet 4b (koko
  Afrikka ruudulla + vastakoe), 4c (zoomikatto), kertomuksen ajoitus ennallaan,
  ja väite 6 käännetty (saapuminen SIIRTYY).
- `tools/savukkeet/savuke-ihmisen-esitys.mjs` — väitteet 2b ja MAROKKO uuteen
  sääntöön; TEKSTI-väite ei enää nojaa siihen, kumpi kappaleen osa sattui
  olemaan ruudulla.
- `docs/raportit/kuvat/ihmisen-matka-avaus-390-20260916.jpg` (92 kt).

## 5. Testit ja savukkeet

| ajo | tulos |
|---|---|
| `node --test` (21 tiedostoa, jotka mainitsevat ihmisen matkan) | **560/560** |
| `node --test tests/pallolinssit tests/satelliitti-avaruus tests/pallolauta` | **94/94** |
| `savuke-ihmisen-kappaleet.mjs` 390 × 844 | **21/21** |
| `savuke-ihmisen-kappaleet.mjs` 1400 × 900 | **15/15** |
| `savuke-ihmisen-kehys.mjs` 390 × 844 | **11/11** |
| `savuke-ihmisen-esitys.mjs` (VAIN_AVAUS=1, 834 × 1100) | **13/13** |

Koko `npm test` -ajoa ei ajettu (ohje: vain asiaan liittyvät testitiedostot).

## 6. Mitä jäi tekemättä

- Raamattua ei muokattu, versionumeroa ei nostettu, PR:ää ei tehty (ohjeen
  mukaan). JATKO 3 TARKENNUS 2:n tila-rivi odottaa Fablen kirjausta.
- Simpukkavirkkeen poisto vaatii yhä kertomuksen äänitteen uusinnan Codexilla
  (avain `aikajana/ihmisen-matka/puhe/ihmisen-matka-kertomus.mp3`); teksti ja
  jako ovat valmiit, äänite ei.
- `savuke-ihmisen-esitys.mjs` ajettiin vain avausosalla (VAIN_AVAUS=1): koko
  kaari kestää kontissa 10–20 min eikä mahdu yhden komennon aikarajaan.
