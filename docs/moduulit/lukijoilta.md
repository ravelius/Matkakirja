# Lukijoilta — lukijoiden ehdotukset

*(Linjaukset: Raamattu › "Lukijoiden ehdotukset". Tämä dokumentti
kertoo vain MITEN. Koodi: worker/ehdotukset/ (Cloudflare Worker),
js/ehdotukset.js (lomake ja haku), js/lehti.js (Lukijoilta-lehti),
tools/pollo/worker.js (pöllön ohjeistus). Julkaisu:
.github/workflows/ehdotukset-worker.yml. Testit:
tests/ehdotukset-worker.test.mjs.)*

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
