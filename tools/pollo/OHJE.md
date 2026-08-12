# Viisaan Pöllön käyttöönotto (omistajalle, n. 10 min puhelimella)

Pöllö on pelin pieni tietokumppani: kartan kulmassa oleva pöllökuvake,
jota napauttamalla aukeaa chat. Sen takana on maksullinen tekoäly, ja
sinne pääsee vain **oman välityspalvelimen** kautta.

Miksi välityspalvelin? Koska API-avain on kuin luottokortti. Jos se
laitettaisiin pelin koodiin, kuka tahansa sivun avaava voisi lukea sen
ja käyttää sitä sinun laskuusi. Välityspalvelin pitää avaimen omalla
puolellaan: peli pyytää siltä vastausta, se kysyy tekoälyltä ja
palauttaa vain vastauksen.

**Ennen käyttöönottoa mikään ei mene rikki.** Pöllönappi näkyy pelissä,
ja napautus avaa siistin "Pöllö ei ole vielä hereillä" -viestin.

---

# Käyttöönotto puhelimella (suositeltu)

Tämä polku ei vaadi tietokonetta eikä komentoriviä: kolme avainta
GitHubin salaisuuksiin, yksi napinpainallus, ja osoite tulee ajon
yhteenvetoon. Kaiken muun tekee työnkulku
`.github/workflows/pollo-julkaisu.yml` — se luo KV-säilön, julkaisee
workerin, asettaa API-avaimen salaisuudeksi ja sallii pelin oman
osoitteen.

> **Ensimmäinen ajo on savukoe.** Sitä ei ole vielä ajettu oikeilla
> avaimilla kertaakaan, joten varaudu siihen, että jokin kohta (esim.
> Cloudflaren tunnusten oikeudet) vaatii pienen korjauksen. Työnkulku
> kertoo virheestä suomeksi eikä jätä puolivalmista tilaa auki: worker
> ilman avainta ei vastaa kenellekään.

## Vaihe A — Hae kolme avainta

Kaikki kolme haetaan puhelimen selaimella. **Älä liitä yhtäkään niistä
repoon, chattiin, viestiin etkä tähän tiedostoon** — vain GitHubin
salaisuuskenttään, joka ei näytä arvoa enää tallentamisen jälkeen
kenellekään.

| Salaisuus | Mistä |
| --- | --- |
| `ANTHROPIC_API_KEY` | <https://console.anthropic.com> → **API Keys** → **Create Key**. Kopioi arvo heti; sitä ei näytetä toista kertaa. Alkaa `sk-ant-`. |
| `CLOUDFLARE_API_TOKEN` | <https://dash.cloudflare.com> → oikean yläkulman profiili → **API Tokens** → **Create Token** → valmis pohja **Edit Cloudflare Workers** → Continue → Create. |
| `CLOUDFLARE_ACCOUNT_ID` | <https://dash.cloudflare.com> etusivu (Workers & Pages -näkymän oikea laita): pitkä kirjain-numerojono **Account ID**. Ei salainen samalla tavalla kuin muut, mutta pidetään silti salaisuuksissa. |

## Vaihe B — Vie ne GitHubiin

Repossa: **Settings → Secrets and variables → Actions → New repository
secret**. Nimet täsmälleen isoilla kirjaimilla kuten yllä. Kolme
erillistä salaisuutta.

## Vaihe C — Paina nappia

**Actions → "Pöllön julkaisu" → Run workflow.**

Ajo kestää pari minuuttia. Jos jokin salaisuus puuttuu, ajo jää
vihreäksi ja kertoo yhteenvedossa mikä puuttuu — mitään ei julkaista
puolittain.

## Vaihe D — Ota osoite talteen

Kun ajo on valmis, avaa sen **yhteenveto** (Summary). Siellä lukee
workerin osoite muodossa

```
https://matkakirja-pollo.<tunnuksesi>.workers.dev
```

**Kerro tämä osoite Fablelle, niin se kytketään peliin.** (Tekninen
kytkentä on yhden rivin muutos tiedostoon `js/packs/pollo-asetukset.js`,
ja se tehdään normaalin julkaisun yhteydessä.)

Sen jälkeen pöllö on hereillä. Jatkossa jokainen `tools/pollo`-kansion
koodimuutos main-haarassa julkaisee workerin uudelleen itsestään.

### Mitä työnkulku tekee puolestasi

- **KV-säilö** (käyttörajojen laskurit): etsitään tililtä, ja jos sitä
  ei ole, luodaan. Olemassa olevaa ei kosketa, joten laskurit eivät
  nollaudu julkaisussa.
- **Sallitut originit**: asetetaan arvoon `https://ravelius.github.io`
  eli pelin osoitteen alkuosa ilman polkua. Worker vertaa tätä selaimen
  lähettämään `Origin`-otsakkeeseen, jossa ei koskaan ole polkua.
  Arvo on työnkulkutiedoston alussa (`POLLO_ORIGINIT`) — jos pelin
  osoite joskus vaihtuu, se muutetaan sinne.
- **API-avain**: syötetään wranglerille putkessa, jolloin se ei näy
  komentorivillä eikä lokissa. Cloudflare säilöö sen salaisuutena, eikä
  sitä voi lukea takaisin sen paremmin dashboardista kuin ajostakaan.
- **Repon `wrangler.jsonc` jätetään rauhaan.** KV-tunnus ja originit
  lisätään vain ajonaikaiseen kopioon (`tools/pollo/ci-asetus.mjs`),
  joka poistetaan ajon lopuksi.

### Jos ajo punastuu

| Viesti ajossa | Syy ja korjaus |
| --- | --- |
| "Pöllön julkaisu nukkuu" (vihreä) | Salaisuus puuttuu. Yhteenveto kertoo mikä. Lisää se ja aja uudelleen. |
| "KV-listaus epäonnistui" | `CLOUDFLARE_API_TOKEN` on väärä, vanhentunut tai luotu väärällä pohjalla (pitää olla **Edit Cloudflare Workers**), tai `CLOUDFLARE_ACCOUNT_ID` on väärä. Tee tunnus uudelleen. |
| "Osoitetta ei löytynyt" (keltainen) | Julkaisu onnistui, mutta osoitetta ei tunnistettu tulosteesta. Osoite näkyy silti ajon lokissa "Julkaise worker" -vaiheen lopussa. |

---

# Käyttöönotto komentorivillä

> Vaihtoehto yllä olevalle. Tämä on alkuperäinen polku ja toimii yhä —
> se tarvitaan, jos GitHubin ajuri ei jostain syystä ole käytettävissä.
> Jos teit jo puhelinpolun, tätä ei tarvita.

## Mitä tarvitset

1. **Anthropic-tili ja API-avain** — <https://console.anthropic.com>.
   Avain on pitkä merkkijono, joka alkaa `sk-ant-`. **Älä liitä sitä
   koskaan repoon, viestiin, chattiin etkä tähän tiedostoon.**
2. **Cloudflare-tili** — sama kuin uutisvälityksessä
   (<https://dash.cloudflare.com>, ilmainen taso riittää).
3. **Komentorivi** ja Node.js. Kaikki komennot ajetaan tästä kansiosta
   (`tools/pollo`).

---

## Vaihe 1 — Kirjaudu Cloudflareen

Aja tässä kansiossa:

```sh
npx wrangler login
```

Selain aukeaa ja pyytää hyväksynnän. Tämä tehdään vain kerran per kone.

## Vaihe 2 — Julkaise worker

```sh
npx wrangler deploy
```

Komento tulostaa lopuksi osoitteen, joka on muotoa

```
https://matkakirja-pollo.<tunnuksesi>.workers.dev
```

**Ota tämä osoite talteen** — sitä tarvitaan vaiheessa 5.

Worker on nyt pystyssä, mutta ei vielä toimi: avain puuttuu ja
originilista on tyhjä. Se on tarkoitus — puolivalmis asetus on kiinni,
ei auki.

## Vaihe 3 — Aseta API-avain salaisuutena

```sh
npx wrangler secret put ANTHROPIC_API_KEY
```

Komento kysyy avaimen ja lukee sen näyttämättä sitä. Avain menee
Cloudflaren salaisuussäilöön: se ei näy dashboardissa, ei lokeissa
eikä `wrangler deploy`n tulosteessa, eikä sitä voi enää lukea takaisin
(jos se katoaa, tee uusi avain ja aja tämä komento uudelleen).

> Jos näppäilit avaimen vahingossa johonkin näkyvään paikkaan, mitätöi
> se heti Anthropicin konsolissa ja luo uusi. Se on ilmaista ja vie
> minuutin.

## Vaihe 4 — Luo laskurisäilö (KV) käyttörajoja varten

Käyttörajat tarvitsevat pienen muistin siitä, kuinka monta kysymystä on
esitetty. Luo säilö:

```sh
npx wrangler kv namespace create POLLO_KV
```

Komento tulostaa rivin, jossa on säilön tunnus (`id = "..."`). Avaa
`wrangler.jsonc` tässä kansiossa, etsi tiedoston lopusta
`kv_namespaces`-rivi, poista sen edestä kommenttimerkit ja liitä tunnus
paikalleen. Rivin pitää lopuksi näyttää tältä:

```jsonc
  "kv_namespaces": [{ "binding": "POLLO_KV", "id": "liitä-tunnus-tähän" }]
```

Muista pilkku edellisen lohkon perään. Julkaise sitten uudelleen:

```sh
npx wrangler deploy
```

> Voit ohittaa tämän vaiheen, jos haluat kokeilla nopeasti. Ilman
> KV-säilöä worker toimii, mutta käyttörajat pitävät vain osittain —
> älä jätä sitä pysyvästi pois päältä.

## Vaihe 5 — Kerro workerille, mistä peli tulee

Worker vastaa vain pelin omille osoitteille. Avaa `wrangler.jsonc` ja
kirjoita `POLLO_ORIGINIT`-riville pelin osoite (tai useampi pilkulla
erotettuna, ilman kauttaviivaa lopussa):

```jsonc
"POLLO_ORIGINIT": "https://pelin-osoite.example",
```

Paikallista testausta varten voit lisätä myös `http://127.0.0.1:8000`.
Julkaise uudelleen:

```sh
npx wrangler deploy
```

> Arvo `*` sallii kaikki sivustot. Se on kätevä hetken testaamiseen ja
> huono pysyvästi: silloin kuka tahansa voi rakentaa oman sivun, joka
> kysyy pöllöltä sinun laskuusi. Vaihda oikeaan osoitteeseen heti kun
> testi on ohi.

## Vaihe 6 — Kerro pelille, mistä pöllö löytyy

Avaa `js/packs/pollo-asetukset.js` ja kirjoita vaiheen 2 osoite:

```js
export const POLLOPALVELIN = 'https://matkakirja-pollo.<tunnuksesi>.workers.dev';
```

`https://`-alku on pakollinen. Julkaise peli normaalisti (versionosto +
PR). Pöllönappi herää samalla.

---

# Käyttörajat ja kustannukset

*(Koskee kumpaakin käyttöönottotapaa.)*

Rajat ovat päällä ensimmäisestä hetkestä. Ne asetetaan
`wrangler.jsonc`-tiedoston `vars`-lohkossa. Muutos tulee voimaan, kun
tiedosto viedään main-haaraan (työnkulku julkaisee workerin
uudelleen) tai kun ajetaan `npx wrangler deploy` komentoriviltä.

| Asetus | Oletus | Mitä tekee |
| --- | --- | --- |
| `POLLO_PAIVARAJA` | `30` | Kysymystä per vierailija per vuorokausi. Estää yksittäistä käyttäjää kuluttamasta budjettia. |
| `POLLO_KUUKAUSIRAJA` | `1500` | **Kova kuukausikatto** koko palvelulle. Kun se täyttyy, pöllö lopettaa vastaamisen kuun loppuun asti. |
| `POLLO_MALLI` | `claude-haiku-4-5-20251001` | Käytettävä malli. Halvin ja nopein riittää — pöllö vastaa lyhyesti. |

Ylityksestä pelaaja saa siistin viestin ("Pöllö on vastannut sinulle jo
monta kertaa tänään"), ei virhettä.

Vuorokausi ja kuukausi vaihtuvat UTC-ajassa, eli Suomen kesäajassa klo
3.00. Vastauksen katto on 700 merkkiyksikköä (max_tokens), joten
yksittäinen kysymys ei voi karata pitkäksi.

**Kustannusarvio.** Haiku-malli maksaa nykyhinnalla noin 1 $/miljoona
sisäänmenevää ja 5 $/miljoona ulostulevaa merkkiyksikköä. Yksi
pöllökysymys kontekstipaketteineen on karkeasti 2000 sisään ja 200 ulos
— eli suuruusluokaltaan **noin 0,003 $ (0,3 senttiä) per kysymys**.
Oletuksena oleva 1500 kysymyksen kuukausikatto on siis muutaman euron
luokkaa. Tarkista silti todelliset hinnat ja toteutunut kulutus
Anthropicin konsolista; pidä kuukausiraja mieluummin liian matalana
kuin liian korkeana ja nosta sitä vasta kun tiedät kulutuksen.

Cloudflaren ilmainen taso (100 000 pyyntöä/vrk, KV-säilön ilmaiskiintiö)
riittää tähän moninkertaisesti.

# Turvallisuus lyhyesti

- Avain on vain Cloudflaren salaisuussäilössä. Se ei ole koodissa, ei
  repossa eikä lokeissa.
- Worker lokittaa virhetilanteesta vain tilakoodin — ei pelaajan
  tekstiä eikä avainta.
- Käyttörajojen laskurit tallentavat IP-osoitteesta vain lyhyen
  tiivisteen, ei osoitetta itseään.
- Järjestelmäkehote (pöllön säännöt: ei tehtävävastauksia, ei
  juonipaljastuksia, ei keksittyjä faktoja) on workerissa, ei pelin
  koodissa. Sitä ei voi kiertää muokkaamalla selaimen puolta.
- Peli ei koskaan lähetä pöllölle aktiivista tehtävää, sen
  vaihtoehtoja eikä oikeaa vastausta.

# Jos jokin ei toimi

| Oire | Syy ja korjaus |
| --- | --- |
| "Pöllö ei ole vielä hereillä" | `POLLOPALVELIN` on tyhjä pelin puolella (puhelinpolun vaihe D / komentorivin vaihe 6). |
| Pöllö vastaa "ei saanut ajatuksesta kiinni" | Avain puuttuu tai on väärä, tai Anthropicin tilillä ei ole saldoa. |
| Paneeli aukeaa, mutta ehdotukset jäävät tyhjiksi | Origin ei ole sallittujen listalla. Sen pitää olla täsmälleen selaimen osoiterivin alkuosa **ilman polkua ja ilman kauttaviivaa lopussa** — pelissä `https://ravelius.github.io`. Puhelinpolussa arvo tulee työnkulun `POLLO_ORIGINIT`-muuttujasta, komentorivipolussa `wrangler.jsonc`:stä (vaihe 5). |
| Raja tulee vastaan liian aikaisin | Nosta `POLLO_PAIVARAJA`-arvoa ja julkaise uudelleen. |

Workerin lokit näet komennolla `npx wrangler tail` (aja tässä
kansiossa) — siitä näkee, tuleeko pyyntöjä ylipäätään perille.
