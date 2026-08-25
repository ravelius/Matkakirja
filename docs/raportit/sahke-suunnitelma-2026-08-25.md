# Sähkejärjestelmä — moninpelin taustapalvelu (25.8.2026)

Tekninen kuvaus workerista `worker/sahke/`. Tämä ei ole ohje eikä
linjaus: linjaukset ovat Raamatussa (`js/tyohuone-raamattu.js`), ja
tämä paperi kertoo vain, mitä on rakennettu ja miten se otetaan
käyttöön. Asiakaspuoli (pelin oma sähkemoduuli) rakennetaan tätä
rajapintaa vasten.

> **Huomio Fablelle:** Raamatussa ei tätä kirjoitettaessa ole
> SÄHKEJÄRJESTELMÄ-osiota. Worker on rakennettu toimeksiannon
> speksin mukaan; kun osio kirjoitetaan, tämän dokumentin
> "Rajapinta" ja "Tulkinnat" -luvut kannattaa lukea rinnalla, koska
> muutama kohta on jouduttu tulkitsemaan (ks. viimeinen luku).

## 1. Mikä tämä on

Pelaaja perustaa **retkikunnan** ja saa kuuden merkin
liittymiskoodin. Koodilla mukaan pääsee enintään kahdeksan jäsentä.
Jäsenet näkevät toistensa etenemisen **sähkeinä** ja voivat pyytää
toisiltaan apua laatan arvoitukseen.

Kaksi sääntöä määräävät koko rakenteen:

1. **Sähkeessä ei ole vapaata tekstiä.** Sähke on valkolistattu
   pohjatunnus (`saavuin`, `aarre-loytyi`, …) ja pelin
   kaupunkitunnus. Sanamuoto asuu pelissä, ei workerissa. Kun
   tekstikenttää ei ole, siihen ei voi kirjoittaa — peli ei muutu
   avoimeksi viestikanavaksi tuntemattomien välillä. Ylimääräinen
   kenttä rungossa **kaataa pyynnön 400:aan**; hiljainen ohitus
   antaisi asiakkaan luulla, että kenttä tallennettiin.
2. **Nimimerkki kootaan valkolistalta.** "Utelias Ilves" on kaksi
   sanaa kahdesta 24 sanan listasta (`worker/sahke/nimimerkit.js`).
   Ruudulle ei voi ilmestyä sanaa, jota ei ole tuossa tiedostossa.

Ainoa kohta, jossa liikkuu tekstiä, on **apupyyntö** — ja sekin on
pelin omaa sisältöä: asiakas lähettää laatan kysymyksen ja sen
vaihtoehdot sellaisina kuin peli ne näytti. Teksti mitoitetaan ja
HTML-escapetaan tallennettaessa, koska palvelin ei voi tietää, mistä
asiakas sen todella otti.

## 2. Arkkitehtuuri

```
worker/sahke/
  worker.js               Workerin kuori: fetch + cron-siivous
  kasittelija.js          Koko logiikka: reititys, portit, validointi
  nimimerkit.js           Sanalistat (24 + 24) ja nimimerkin tarkistus
  varasto.js              D1-kerros; kasittelija ei tunne SQL:ää
  skeema.sql              Taulut ja indeksit (CREATE ... IF NOT EXISTS)
  wrangler.toml.template  Asetuspohja; valmis toml syntyy julkaisuajossa
tests/sahke-worker.test.mjs   23 testiä, ajetaan Nodessa ilman wrangleria
.github/workflows/sahke-worker.yml   julkaisu (workflow_dispatch)
```

Jako on sama kuin ehdotusworkerissa ja samasta syystä: kun logiikka on
kuoresta erillään ja varasto on rajapinnan takana, koko worker ajetaan
Nodessa ilman wrangleria ja ilman D1:tä. Testit antavat käsittelijälle
muistivaraston, joka toteuttaa täsmälleen saman rajapinnan kuin
`varasto.js`.

### Miksi D1 eikä KV (tai R2)

Talon tapa on ehdotusworkerin R2, mutta se on blob-varasto kuville.
Sähkeet ovat toisenlainen kuorma:

| | KV / yksi JSON-olio R2:ssa | D1 |
|---|---|---|
| Kahdeksan jäsentä kirjoittaa yhtaikaa | viimeinen kirjoitus voittaa — **lähetetty sähke katoaa** | `INSERT` ei ylikirjoita toista `INSERT`iä |
| Pollaus sekunneittain | KV on eventually consistent: tila voi olla minuutin vanha | luku näkee kirjoituksen heti |
| Siivous (14 vrk) | jokainen retkikunta luettava ja kirjoitettava takaisin | `DELETE ... WHERE aika < ?` |
| Tilannekuvan rajaus | koko olio aina | `WHERE koodi = ? ORDER BY aika LIMIT ?` |

Moninpelin ydin on nimenomaan rinnakkainen kirjoitus samaan
tilannekuvaan, joten valinta on D1. Perustelu on myös koodissa
(`worker/sahke/varasto.js`, tiedoston alkukommentti), jotta se ei jää
vain tähän paperiin.

## 3. Rajapinta

Kaikki vastaukset ovat JSONia, `cache-control: no-store`. CORS on auki
vain pelin originille (`SAHKE_ORIGINIT`) ja localhostille. Virhe on
aina `{ virhe: "…" }` suomeksi.

### POST /retkikunta/luo

Runko `{nimimerkki}` → `{koodi, jasenId, avain}`.

- `koodi`: 6 merkkiä aakkostosta `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`
  (ei sekoittuvia I, O, 0, 1) — luetaan ääneen ja näpytellään.
- `avain`: jäsenkohtainen salaisuus, 32 merkkiä. **Annetaan vain
  kerran.** Asiakas tallentaa sen laitteelleen.

### POST /retkikunta/liity

Runko `{koodi, nimimerkki}` →
`{jasenId, avain, jasenet:[{jasenId, nimimerkki}]}`.

- 404 tuntematon koodi · 409 retkikunta täynnä (8) · 409 nimimerkki jo
  käytössä tässä retkikunnassa (asiakas arpoo uuden).
- Koodin saa kirjoittaa pienellä ja väliviivoin — palvelin normalisoi.

### GET /retkikunta/tila?koodi=&jasenId=&avain=

Koko oman retkikunnan tilannekuva yhdellä pollauksella:

```jsonc
{
  "jasenet": [
    { "jasenId": "…", "nimimerkki": "Utelias Ilves",
      "virstanpylvaat": [ { "pohjaId": "saavuin", "paikkaId": "madrid",
                            "aika": "2026-08-25T10:00:00.000Z" } ] }
  ],
  "sahkeet":       [ { "id": "…", "lahettaja": "<jasenId>",
                       "pohjaId": "aarre-loytyi", "paikkaId": "madrid",
                       "aika": "…" } ],
  "apupyynnot":    [ { "apuId": "…", "kysyja": "<jasenId>",
                       "kysymys": "…", "vaihtoehdot": ["…"], "aika": "…" } ],
  "apuvastaukset": [ { "apuId": "…", "vastaaja": "<jasenId>",
                       "veikkaus": 0, "aika": "…" } ]
}
```

Listat ovat **uusin ensin**, enintään 200 riviä kutakin.
`virstanpylvaat` on **vanhin ensin**. Kaikki ajat ovat ISO-8601:tä.

### POST /sahke

Runko `{koodi, jasenId, avain, pohjaId, paikkaId}` →
`{ok:true, sahke:{id, lahettaja, pohjaId, paikkaId, aika}}`.

`pohjaId` vain valkolistalta:

```
aarre-loytyi · saavuin · vinkki-ei-paakaupunki · vinkki-vesi
vinkki-vuori · juliste-saatu · apua-arvoitus
```

`paikkaId` on pelin kaupunkitunnus, muoto `^[a-z0-9-]{2,40}$`
(esim. `madrid`). **Yksikään muu kenttä ei ole sallittu.**

### POST /apu/kysy

Runko `{koodi, jasenId, avain, apuId, kysymys, vaihtoehdot}` →
`{ok:true, apu:{apuId, kysyja, kysymys, vaihtoehdot, aika}}`.

- `apuId`: asiakkaan antama tunnus, `^[A-Za-z0-9_-]{1,64}$` (esim.
  `madrid-laatta-3`). Sama tunnus samalta kysyjältä on idempotentti
  (verkko pätki → uudelleenlähetys); toisen jäsenen varaama tunnus on 409.
- `kysymys` ≤ 300 merkkiä, `vaihtoehdot` 2–4 kpl à ≤ 120 merkkiä.
  Ylipitkä katkaistaan, ei hylätä. Teksti HTML-escapetaan
  tallennettaessa, joten vastauksessa palaa escapettu muoto.

### POST /apu/vastaa

Runko `{koodi, jasenId, avain, apuId, veikkaus}` →
`{ok:true, vastaus:{apuId, vastaaja, veikkaus, aika}}`.

- `veikkaus` on kokonaisluku 0…(vaihtoehtojen määrä − 1).
- Uusi veikkaus korvaa saman jäsenen edellisen.
- 404 tuntematon `apuId` · 409 oma apupyyntö (kysyjä ei veikkaa itse).

### Statuskoodit

| koodi | milloin |
|---|---|
| 400 | runko ei jäsenny · tuntematon kenttä · kelvoton pohja, paikka, nimimerkki tai veikkaus |
| 401 | koodi + jasenId + avain ei täsmää |
| 403 | origin ei ole sallittu |
| 404 | tuntematon reitti · retkikuntaa tai apupyyntöä ei ole |
| 405 | väärä metodi |
| 409 | retkikunta täynnä · nimimerkki varattu · apuId varattu · oma apupyyntö |
| 429 | kirjoitusrajoitin (yli 30 kirjoitusta minuutissa per jäsen) |
| 503 | tietokanta ei ole kytketty · koodia ei saatu varattua |

### Nimimerkkilistat kopioidaan asiakkaalle

`worker/sahke/nimimerkit.js` sisältää 24 adjektiivia ja 24
substantiivia. **Asiakas käyttää samaa listaa samassa järjestyksessä.**
Kaksi sääntöä pitävät kopion kopiona:

1. Järjestys on vakio — uusi sana lisätään aina **loppuun**.
2. Sanaa ei poisteta eikä kirjoitusasua muuteta: vanhoja nimimerkkejä
   on tietokannassa, ja poistettu sana tekisi olemassa olevasta
   nimestä kelpaamattoman.

Palvelin hyväksyy nimen kirjainkoosta riippumatta ja palauttaa sen
kanonisessa muodossa.

## 4. Tietomalli (D1)

`worker/sahke/skeema.sql`. Aika on kaikkialla kokonaisluku
(Unix-millisekunnit); ISO-8601:ksi se muotoillaan vasta vastauksessa.

| taulu | avain | sisältö |
|---|---|---|
| `retkikunnat` | `koodi` | `luotu`, `nahty` (elossa-leima) |
| `jasenet` | `koodi, jasen_id` | `nimimerkki`, `avain_tiiviste`, `liittyi`, `nahty`, `ikkuna`, `laskuri` |
| `sahkeet` | `koodi, id` | `lahettaja`, `pohja_id`, `paikka_id`, `aika` |
| `apupyynnot` | `koodi, apu_id` | `kysyja`, `kysymys`, `vaihtoehdot` (JSON), `aika` |
| `apuvastaukset` | `koodi, apu_id, vastaaja` | `veikkaus`, `aika` |

Huomioita:

- `sahkeet`-taulussa **ei ole yhtään vapaan tekstin saraketta**, eikä
  sellaista saa lisätä.
- `avain_tiiviste` on jäsenavaimen SHA-256, ei avain itse: tietokannan
  vuoto ei anna kenellekään oikeutta kirjoittaa toisen nimissä.
- `virstanpylvaat` **johdetaan sähkeistä** eikä ole oma taulunsa —
  sama tieto kahdessa paikassa menisi ennen pitkää eri tahtiin.
- Skeema on pelkkiä `IF NOT EXISTS` -lauseita, joten tiedoston saa
  ajaa joka julkaisussa. `DROP`- ja `ALTER`-lauseita ei tähän
  tiedostoon kirjoiteta: kentän lisäys tehdään omana tiedostonaan.

## 5. Turva

- **Kolmikko joka pyynnössä.** Jokainen kirjoitus ja tilannekuvan luku
  vaatii `koodi` + `jasenId` + `avain`. Avaimen tiiviste vertaillaan
  vakioaikaisesti (`vertaaSalaisuus`, sama toteutus kuin
  `worker/ehdotukset/kasittelija.js`:ssä). Tuntemattomalle kolmikolle
  tehdään vertailu valetiivistettä vasten, jottei vastausaika kerro,
  onko koodi tai jäsen olemassa.
- **Ei pääavainta.** Workerilla ei ole yhtään salaisuutta. Jokainen
  jäsen saa oman avaimensa liittyessään, joten ei ole yhtä avainta,
  jonka vuoto avaisi kaiken. Julkaisuajossa ei siksi ole
  `wrangler secret put` -askelta.
- **Origin-portti.** Kaikki reitit vaativat pelin originin tai
  localhostin — sama malli kuin ehdotusworkerin `/laheta`.
- **Kenttäportti.** Jokaisen POSTin runko saa sisältää täsmälleen
  sallitut kentät. Tuntematon kenttä on 400 nimeltä mainiten.
- **Kirjoitusrajoitin.** 30 kirjoitusta minuutissa per jäsen. Ikkuna ja
  laskuri ovat jäsenen omassa rivissä, joten rajoitin ei tarvitse omaa
  varastoaan eikä katoa kylmäkäynnistyksessä.
- **Siivousikkuna.** Sähkeet, apupyynnöt ja vastaukset elävät 14
  vuorokautta, kokonaan hiljentynyt retkikunta jäsenineen 30. Siivous
  ajetaan cron-liipaisimella kerran vuorokaudessa (04:17 UTC) ja lisäksi
  aina, kun uusi retkikunta perustetaan. Elossa-leima päivittyy myös
  pollatessa, korkeintaan tunnin välein — aktiivinen mutta hiljainen
  retkikunta ei saa siivoutua alta.
- **Ei henkilötietoja.** Varastossa ei ole sähköpostia, nimeä eikä
  IP-osoitetta: vain arvottu tunnus ja kahdesta valkolistatusta sanasta
  koottu nimimerkki.

## 6. Käyttöönotto

Julkaisu: **Actions → "Sähkejärjestelmä: julkaise worker" → Run
workflow** (`workflow_dispatch`, ei koskaan pushista).

Ajo tekee järjestyksessä: testit → salaisuustarkistus → wranglerin
asennus → D1-tietokannan etsintä tai luonti → `wrangler.toml`
templatesta → skeeman ajo → `wrangler deploy` → yhteenveto →
väliaikaisen asetuksen poisto.

### Salaisuudet (Settings → Secrets and variables → Actions)

| nimi | pakollinen | mitä |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | kyllä | Workers Scripts: Edit **ja D1: Edit** — vanha tunnus saattaa olla pelkkä R2-tunnus, jolloin oikeus on lisättävä |
| `R2_ACCOUNT_ID` | kyllä | Cloudflaren tilitunnus; on jo olemassa (peilaus ja ehdotusworker käyttävät samaa) |
| `SAHKE_TIETOKANTA` | ei | D1-tietokannan nimi, oletus `matkakirja-sahke` (ajo luo sen jos puuttuu) |

Sallittu origin on ajon ympäristömuuttujassa `SAHKE_ORIGINIT`
(oletus `https://ravelius.github.io`); localhost kelpaa aina ilman
listausta.

### Julkaisun jälkeen

Ajon yhteenveto tulostaa workerin osoitteen
(`https://matkakirja-sahke.<tunnus>.workers.dev`). **Osoite kerrotaan
Fablelle**, joka kirjaa sen pelin sähkemoduulin osoitevakioon — samalla
tavalla kuin ehdotusworkerin osoite. Ennen sitä moninpeli on pelissä
piilossa eikä mikään ole rikki.

Tietokannan tunniste (`database_id`) ei päädy repoon: se luetaan ajossa
`wrangler d1 list --json` -listauksesta ja sensuroidaan tulosteesta.
Täytetty `worker/sahke/wrangler.toml` on `.gitignore`ssa ja poistetaan
ajon lopuksi.

### Testit

```
node --test tests/sahke-worker.test.mjs   # 23 testiä, ei verkkoa
npm test                                  # koko sarja
```

Julkaisuajo ajaa sähketestit ennen kuin se koskee Cloudflareen.

## 7. Tulkinnat, joita speksi ei kattanut

Nämä kohdat jouduttiin päättämään; kenttien nimet ovat speksin
mukaiset, mutta sisältö on tulkintaa. Jos asiakaspuoli tarvitsee
jotain muuta, muutos on pieni.

1. **`virstanpylvaat`** — speksi jätti sisällön auki. Toteutus johtaa
   ne jäsenen omista sähkeistä: sama pohja samassa kaupungissa on yksi
   virstanpylväs, ja alkio on `{pohjaId, paikkaId, aika}`, vanhin
   ensin. Erillistä kenttää tai reittiä virstanpylväille ei ole.
2. **`lahettaja`, `kysyja`, `vastaaja`** ovat `jasenId`, eivät
   nimimerkkejä. Nimimerkin saa `jasenet`-listasta, joka tulee samassa
   vastauksessa; jäsentunnus on pysyvä, nimimerkki näyttötieto.
3. **Ajat** ovat ISO-8601-merkkijonoja (`aika`), koska muu peli käyttää
   `toISOString()`-muotoa.
4. **Nimimerkin ainutkertaisuus retkikunnassa** — kaksi samannimistä
   tekisi sähkeistä lukukelvottomia, joten toinen saa 409 ja asiakkaan
   on arvottava uusi. Sanapareja on 576 ja jäseniä 8, joten tämä on
   harvinaista mutta mahdollista.
5. **Kenttäportti kaikkiin POSTeihin** — speksi vaati sen `/sahke`lle;
   sama portti on johdonmukaisuuden vuoksi joka reitillä.
6. **Omaan apupyyntöön ei vastata** (409) — vastauslista on kavereiden
   veikkauksia, ei kysyjän omaa arvausta.
7. **Kirjoitusvastaukset palauttavat tallennetun rivin**
   (`{ok:true, sahke|apu|vastaus}`), jotta asiakas voi näyttää oman
   lähetyksensä heti odottamatta seuraavaa pollausta.
