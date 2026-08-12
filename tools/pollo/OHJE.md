# Viisaan Pöllön käyttöönotto (omistajalle, n. 20 min)

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

## Käyttörajat ja kustannukset

Rajat ovat päällä ensimmäisestä hetkestä. Ne asetetaan
`wrangler.jsonc`-tiedoston `vars`-lohkossa, ja muutos tulee voimaan
`npx wrangler deploy` -komennolla.

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

## Turvallisuus lyhyesti

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

## Jos jokin ei toimi

| Oire | Syy ja korjaus |
| --- | --- |
| "Pöllö ei ole vielä hereillä" | `POLLOPALVELIN` on tyhjä pelin puolella (vaihe 6). |
| Pöllö vastaa "ei saanut ajatuksesta kiinni" | Avain puuttuu tai on väärä (vaihe 3), tai Anthropicin tilillä ei ole saldoa. |
| Paneeli aukeaa, mutta ehdotukset jäävät tyhjiksi | Origin ei ole sallittujen listalla (vaihe 5). Tarkista, että osoite on täsmälleen sama kuin selaimen osoiterivillä, ilman kauttaviivaa lopussa. |
| Raja tulee vastaan liian aikaisin | Nosta `POLLO_PAIVARAJA`-arvoa ja julkaise uudelleen. |

Workerin lokit näet komennolla `npx wrangler tail` (aja tässä
kansiossa) — siitä näkee, tuleeko pyyntöjä ylipäätään perille.
