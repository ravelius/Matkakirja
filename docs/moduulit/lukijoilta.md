# Lukijoilta — lukijoiden ehdotukset

*(Linjaukset: Raamattu › "Lukijoiden ehdotukset". Tämä dokumentti
kertoo vain MITEN. Koodi: worker/ehdotukset/ (Cloudflare Worker),
js/ehdotukset.js (lomake ja haku), js/tekijakortti.js (pro-tuottajan
tekijäsivu), js/lehti.js (Lukijoilta-lehti), tools/pollo/worker.js
(pöllön ohjeistus). Julkaisu: .github/workflows/ehdotukset-worker.yml.
Testit: tests/ehdotukset-worker.test.mjs, tests/pro-worker.test.mjs.
Lupapohja tuottajalle: docs/pro-lisenssilupa.md.)*

Pelaaja voi lähettää pelin palautelomakkeesta kuvia ja juttuideoita
lehtiin. Lähetykset menevät yksityiseen R2-ämpäriin, ja omistaja lukee
ne pelin työhuoneesta (hampurilaisvalikko → Lukijoilta). Mikään ei ole
pelisisältöä ennen kuin omistaja on hyväksynyt sen ja lisenssi on
varmistettu.

## 1. Arkkitehtuuri

```
pelaaja → js/ehdotukset.js  ──POST /laheta──▶  worker/ehdotukset/
   (palautedialogin osio                        (Cloudflare Worker)
    "Ehdota lehteen")                                 │
                                                      ▼
                                        R2-ämpäri (YKSITYINEN)
                                        ehdotukset/<aika>-<id>/
                                          meta.json
                                          kuva-1.jpg …
                                                      │
omistaja ← js/lehti.js Lukijoilta-lehti ──GET /lista──┘
                       (avain laitteen muistissa)
```

**Ämpäri on yksityinen eikä sama kuin pelin julkinen mediapeili.**
Lähetyksessä voi olla sähköpostiosoite, joten aineisto ei saa päätyä
julkiseen bucketiin, repoon eikä lokiin.

### Worker (worker/ehdotukset/)

| Tiedosto | Mitä |
| --- | --- |
| `kasittelija.js` | koko logiikka; testataan Nodessa mock-R2:lla |
| `worker.js` | kuori, joka ojentaa pyynnön käsittelijälle |
| `wrangler.toml.template` | asetusPOHJA — ämpärin nimi ja originit ympäristöstä |

Reitit:

| Reitti | Kuka | Mitä |
| --- | --- | --- |
| `POST /laheta` | pelaaja (CORS: pelin origin + localhost) | multipart-lähetys ämpäriin |
| `GET /lista?avain=` | omistaja | metat uusin ensin |
| `GET /kohde/<polku>?avain=` | omistaja | yksittäinen kuva |
| `PUT /kommentti?avain=` | kuratointi | kommentti, tila, palkkio, lunastuskoodi |

Portit lähetyksessä: origin-tarkistus, hunajapurkkikenttä (`hunaja`),
enintään 3 kuvaa, 8 Mt/kuva, vain jpeg/png/webp/heic, ja pakollinen
lisenssivakuutus heti kun kuvia on mukana. Lukureitit avautuvat vain
workerin salaisuudella `EHDOTUS_AVAIN` (vakioaikainen vertailu).

### meta.json

```json
{
  "versio": 1,
  "aikaleima": "2026-08-18T10:00:00.000Z",
  "kansio": "ehdotukset/2026-08-18T10-00-00-000Z-abc123",
  "sivu": "Euroopan aarrekartta · Tampere · Koski ja punatiili",
  "tarkenne": "", "teksti": "", "nimimerkki": "",
  "saaKrediitteihin": false, "sahkoposti": "", "lisenssivakuutus": true,
  "kuvat": [{ "tiedosto": "kuva-1.jpg", "tyyppi": "image/jpeg", "koko": 812345 }],
  "tila": "uusi", "kommentti": "", "palkkio": null, "lunastuskoodi": ""
}
```

Neljä viimeistä kenttää ovat kuratointia varten (`tila`: `uusi` →
`kuratoitu` → `hyvaksytty` | `hylatty`). Ne kirjoitetaan jo
lähetyksessä oletuksina, jottei vanhoja metoja tarvitse siirtää, kun
palkkion lunastus rakennetaan peliin (vaihe 2).

### Peli

- **js/ehdotukset.js** — vakio `EHDOTUS_OSOITE`. **Tyhjänä koko kanava
  on piilossa** (sama malli kuin `PALAUTE_LOMAKE`): lomakkeen osiota ei
  piirretä, Lukijoilta-lehti kertoo että kanavaa ei ole kytketty, eikä
  pöllön kuplaa ajasteta. Moduuli hoitaa myös kuvien pienennyksen
  selaimessa (canvas, pisin sivu 2048 px, jpeg 0.85) — 8 Mt:n raja ei
  ylity eikä mobiiliyhteydellä siirretä turhaa.
- **js/ui.js** — `palauteKentat` liittää osion palautelomakkeen perään
  ja `ehdotusSivu` kokoaa sivuehdotuksen pelin nykyisestä näkymästä
  (lauta · kaupunki · lehden sivu). `mount` ajastaa pöllön kuplan.
- **js/lehti.js** — `avaaLukijoiltaLehti` hakee listan ja rakentaa
  lehden sivut (etusivu + yksi sivu per ehdotus, kuvat mukana).
  Kuvanostot käyttävät `nosto.kuvaUrl`-kenttää (suora osoite, ei
  peilipolkua) — tuki on js/maalehti.js:n `piirraKategoria`ssa.
- **tools/pollo/worker.js** — järjestelmäkehotteen osio "LUKIJOIDEN
  EHDOTUKSET": pöllö osaa neuvoa kanavan käyttöön. Kupla ("Haluatko
  osallistua pelin rakentamiseen?") tulee kerran, aikaisintaan 10
  minuutin pelaamisen jälkeen, eikä koskaan toista kertaa samalle
  pelaajalle (localStorage-lippu).

## 2. Käyttöönotto

**Salaisuudet** (Settings → Secrets and variables → Actions):

| Nimi | Tila | Mitä |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | **uusi** | Workers + Workers R2 Storage: Edit |
| `R2_ACCOUNT_ID` | on jo | tilitunnus (peilaus käyttää samaa) |
| `EHDOTUS_AVAIN` | **uusi** | satunnainen merkkijono, jolla ehdotukset luetaan |
| `EHDOTUS_BUCKET` | vapaaehtoinen | ämpärin nimi, oletus `matkakirja-ehdotukset` |

**Julkaisu:** Actions → *Lukijoiden ehdotukset: julkaise worker* → Run
workflow. Ajo tarkistaa salaisuudet (puuttuva pysäyttää ajon selkeällä
virheellä), luo ämpärin jos sitä ei ole, generoi `wrangler.toml`
templatesta (`envsubst`), ajaa `wrangler deploy` ja asettaa
`EHDOTUS_AVAIN`-salaisuuden putkessa. Ajon yhteenveto kertoo workerin
osoitteen.

**Kytkentä peliin:** liitä workers.dev-osoite `EHDOTUS_OSOITE`-vakioon
(js/ehdotukset.js) ja julkaise peli. Ennen sitä mikään uusi ei näy
pelaajalle.

**Avain työhuoneeseen:** avaa hampurilaisvalikosta Lukijoilta. Lehti
kysyy avaimen kerran ja tallettaa sen laitteen muistiin
(`matkakirja-ehdotus-avain`). Väärä avain unohdetaan heti, joten
seuraava avaus kysyy uudestaan.

## 3. Kuratointiprosessi

1. **Omistaja katsoo** Lukijoilta-lehden: kuvat, teksti, sivuehdotus,
   lähettäjän tiedot ja kuratointimerkinnät samalla sivulla.
2. **"Kuratoi"-ajo** (Fable, vain omistajan komennolla): Fable käy
   ehdotukset läpi ja kirjoittaa jokaiselle kommentin `PUT /kommentti`
   -reitillä — mihin lehteen ja sivulle ehdotus sopisi, mitä
   tarkennuksia se vaatii, onko lisenssi kunnossa.
3. **Omistaja päättää**. Hyväksytyn ehdotuksen tila on `hyvaksytty`;
   sisältö viedään lehteen normaalia lehtityötä myöten (kuvalle tekijä
   ja lisenssi kuvatekstiin, nimimerkki krediitteihin jos pelaaja niin
   halusi).
4. **Palkkio**: hyväksytystä ehdotuksesta omistaja päättää pelirahan
   määrän tapauskohtaisesti. Summa ja lunastuskoodi kirjataan metaan
   (`palkkio`, `lunastuskoodi`) ja koodi lähetetään pelaajan
   sähköpostiin. **Koodin lunastus peliin on vaihe 2** — sitä ei ole
   vielä rakennettu.

Mikään lähetetty kuva ei ole pelisisältöä ennen omistajan hyväksyntää,
eikä sähköpostiosoitetta viedä koskaan repoon eikä peliin.

## 4. Pro-sisällöntuottajat

Sama worker palvelee toistakin kanavaa. **Ehdotuskanava on auki
kaikille pelaajille; pro-kanava vain niille ammattilaisille
(valokuvaajat, tutkijat), jotka omistaja on henkilökohtaisesti
kutsunut.** Vastineeksi laadukkaasta sisällöstä he saavat pelissä
krediitin ja oman tekijäsivun: kuva, esittely ja linkit omille
kotisivuille.

```
omistaja ─PUT /pro-tuottaja──▶ worker ──▶ pro/tuottajat/<sha256(posti)>.json
   │                                          (sähköposti, nimi, KOODI,
   │  koodi sähköpostitse                      tekijaId, tila, profiili)
   ▼          + docs/pro-lisenssilupa.md
tuottaja ─POST /pro-tarkista──▶ kirjautuminen (sähköposti + koodi)
         └POST /pro-profiili──▶ pro/kuvat/<tekijaId>.jpg + tila 'odottaa'
   │
omistaja ─PUT /pro-hyvaksy───▶ pro/julkiset/<tekijaId>.json  (JULKINEN)
   │
pelaaja  ─GET /tekija/<id>───▶ tekijäsivu kuvan lähderiviltä
```

### Reitit

| Reitti | Kuka | Mitä |
| --- | --- | --- |
| `PUT /pro-tuottaja?avain=` | omistaja | luo tuottajan, palauttaa PYSYVÄN koodin |
| `GET /pro-lista?avain=` | omistaja | kaikki tuottajat koodeineen ja tiloineen |
| `GET /pro-kuva/<id>?avain=` | omistaja | odottavan profiilin kuva |
| `PUT /pro-hyvaksy?avain=` | omistaja | `odottaa` → `julkaistu` \| `hylatty` |
| `POST /pro-tarkista` | tuottaja | onko sähköposti + koodi voimassa |
| `POST /pro-profiili` | tuottaja | kuva (1 kpl, 4 Mt), esittely (600 mrk), 1–3 linkkiä |
| `GET /tekija/<id>` | pelaaja | vain `julkaistu`-tilainen profiili |
| `GET /tekija/<id>/kuva` | pelaaja | julkaistun profiilin kuva |

Portit ovat samat kolme kuin ehdotuskanavalla: omistajan reitit
avaimella `EHDOTUS_AVAIN`, tuottajan selainreitit origin-tarkistuksella
ja julkinen tekijäsivu ilman kumpaakaan. Tuottajan todennus on
sähköposti + koodi **jokaisessa pyynnössä** (vakioaikainen vertailu,
myös tuntemattomalle osoitteelle — vastausaika ei saa kertoa, kuka on
rekisterissä).

### Tietomalli (R2, etuliite `pro/`)

| Avain | Näkyvyys | Sisältö |
| --- | --- | --- |
| `pro/tuottajat/<sha256(posti)>.json` | YKSITYINEN | sähköposti, nimi, koodi, tekijaId, tila, kommentti, profiili |
| `pro/kuvat/<tekijaId>.<pääte>` | avaimella tai julkaistuna | profiilikuvan tavut |
| `pro/julkiset/<tekijaId>.json` | JULKINEN | id, nimi, esittely, linkit, kuva |

Kaksi asiaa on tarkoituksellista eikä saa muuttua:

1. **Sähköposti on avaimessa vain tiivisteenä.** Ämpärin avainlistaus
   ei saa olla osoiterekisteri.
2. **Julkinen profiili on ERI OLIO**, ei siivottu versio tuottajan
   tietueesta. Siivous unohtuu jonain päivänä, erillinen olio ei.
   Sähköposti ja koodi eivät päädy julkiseen vastaukseen eivätkä
   lokiin.

Tilat: `kutsuttu` (koodi luotu) → `odottaa` (profiili lähetetty) →
`julkaistu` | `hylatty`. **Julkaistun profiilin muutos palauttaa tilan
aina `odottaa`-tilaan** ja poistaa julkisen olion: muuten tuottaja
voisi vaihtaa hyväksytyn tekstin perään mitä tahansa.

### Koodi

Kahdeksan merkkiä aakkostosta `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (ei
I, O, 0 eikä 1 — omistaja lukee koodin ruudulta ja tuottaja näpyttelee
sen puhelimella). **Koodi on pysyvä.** Sama osoite toisen kerran ei arvo
uutta: tuottajalla voi olla vanha koodi sähköpostissaan ja pelin
localStorage tyhjenee milloin tahansa.

Tekijätunnus (`tekijaId`) on 10 merkkiä ja **arvottu, ei johdettu
sähköpostista** — se päätyy julkiseen peliin, eikä peli saa kantaa
osoitetta tiivisteenäkään.

### Peli

- **js/ehdotukset.js** — palautelomakkeen perässä osio *"Olen
  pro-sisällöntuottaja"*: sähköposti + koodi → `/pro-tarkista` →
  pro-näkymä (omakuva, esittely, 1–3 linkkiä). Pari talletetaan
  laitteelle (`matkakirja-pro-tunnus`) vasta kun worker on vahvistanut
  sen. Kuva pienennetään selaimessa 1024 px:iin ennen lähetystä.
  Sama moduuli tarjoaa omistajan kutsut työhuoneelle.
- **js/tekijakortti.js** — tekijäsivu pelaajalle. Kuvan lähderivi on
  tavallista tekstiä, kunnes paketissa on kenttä `tekijaId`; silloin
  `taytaLahderivi` tekee tekijän nimestä painikkeen, joka avaa kortin
  (kuva, esittely, ulkoiset linkit `target="_blank" rel="noopener
  noreferrer"` ja ↗-merkintä). Profiili välimuistitetaan istuntoon.
  Verkotta kortti kertoo siististi, ettei sivu ole juuri nyt
  saatavilla — tekijäsivu on lisä, ei ehto.
- **Pakin kentät** kuvan tai noston yhteydessä:

  ```js
  { tiedosto: '…jpg', lahde: 'Aino Valokuvaaja (julkaistu tekijän luvalla)',
    tekija: 'Aino Valokuvaaja', tekijaId: 'k7m2p9xr4t' }
  ```

  `tekija` kertoo, mikä osa lähderivistä on nimi. Ilman sitä rivin
  perään tulee pieni "Tekijästä"-painike. Lähderivit piirtyvät
  js/nahtavyydet.js:ssä, js/maalehti.js:ssä ja js/ui.js:ssä — kaikki
  kolme kulkevat `taytaLahderivi`n kautta.
- **Työhuone** — Lukijoilta-lehden lopussa on pro-osio: yhteenvetosivu
  (*Lisää pro-tuottaja* → koodi näkyviin kopioitavaksi) ja yksi sivu
  per tuottaja, jolla näkyvät koodi, tekijätunnus, profiili, kuva ja
  napit *Julkaise* / *Hylkää*. Napit kulkevat noston
  `toiminnot`-kentässä (js/maalehti.js) — kenttä on **vain
  kehittäjälehtiä varten**, pelaajan lehteen sitä ei laiteta.

### Prosessi

1. **Kutsu.** Omistaja lisää tuottajan Lukijoilta-lehden pro-osiossa ja
   saa koodin ruudulle.
2. **Lupa.** Omistaja lähettää tuottajalle koodin ja lupapohjan
   (**docs/pro-lisenssilupa.md**): mitä luovutetaan, rinnakkainen
   ei-yksinomainen lisenssi peliin, krediittimuoto ja tekijäsivu,
   peruutusehto uusille julkaisuille.
3. **Profiili.** Tuottaja kirjautuu pelin lomakkeella ja lähettää
   kuvan, esittelyn ja linkit. Tila on `odottaa`.
4. **Hyväksyntä.** Omistaja katsoo profiilin työhuoneessa ja painaa
   *Julkaise* tai *Hylkää* (hylkäykseen kommentti, joka näkyy
   tuottajalle hänen omassa näkymässään).
5. **Krediitti peliin.** Kun tuottajan kuva viedään lehteen, kuvan
   riville lisätään kentät `tekija` ja `tekijaId`. Vasta silloin
   tekijäsivu avautuu pelaajalle.

Käyttöönotto ei vaadi uusia salaisuuksia: pro-palikka käyttää samaa
ämpäriä, samaa avainta ja samaa workeria. Riittää että
`.github/workflows/ehdotukset-worker.yml` ajetaan uudelleen.
