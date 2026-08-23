# Viitekuvallinen herogenerointi

Miten generoitu herokuva ankkuroidaan oikeisiin valokuviin, ja mikä
generointiportin sääntö on. Omistajan tilaus 23.8.2026.

## Miksi

Kuva `hero-kashgar-keskipaiva.png` esitti Samarkandin tyylistä
timuridimausoleumia, vaikka kuvateksti lupasi Yusuf Balasagunin
mausoleumia Kašgarissa. Malli ei tuntenut kohdetta ja täytti aukon
alueen arkkityypillä. Commonsissa kohteesta oli kuitenkin kahdeksan
vapaata valokuvaa — aitoa dataa oli, generaattori ei vain nähnyt sitä.

Omistajan linjaus: kaikista kaupungeista halutaan generoidut herokuvat,
jotta pelin ilme pysyy yhtenäisenä, **mutta niiden on oltava riittävän
lähellä todellisuutta**. Ratkaisu ei siis ole luopua generoinnista vaan
ankkuroida se oikeisiin valokuviin.

## Osat

| Tiedosto | Tehtävä |
| --- | --- |
| `tools/hae-viitekuvat.mjs` | Hakee kohteesta 2–4 vapaasti lisensoitua valokuvaa base64:nä. Toimii sekä komentorivityökaluna että moduulina. |
| `tools/hero-ajuri.mjs` | Hakee viitteet työlistan kohdalle, valvoo generointiporttia ja lähettää viitteet workerille. |
| `tools/pollo/worker.js`, `hoidaKuva` | Kutsuu viitteillä `/v1/images/edits`, ilman viitteitä entiseen tapaan `/v1/images/generations`. |

## Kohteen tunnistus — kategoria ensin, tekstihaku vasta sitten

Vapaa tekstihaku tuottaa itsevarmasti vääriä viitteitä. Hakusana
"Old Church of Tampere" palautti pääosin **Messukylän** vanhan kirkon,
keskiaikaisen kivikirkon kaupungin laidalla — ei Carlo Bassin puista
Vanhaa kirkkoa Keskustorilla. **Väärä viite on pahempi kuin ei viitettä
lainkaan:** se ankkuroi generoinnin väärään rakennukseen ja tekee
virheestä vakuuttavamman.

Reitit järjestyksessä:

1. **`kategoria`** — Commons-kategoria suoraan, jos työlista tietää sen.
2. **`wiki`** — en-Wikipedian otsikko. Siitä haetaan Wikidatan kautta
   kohteen oma Commons-kategoria (sitelink `commonswiki` tai ominaisuus
   `P373`) ja kuvat kategoriasta. Kategoria on ihmisen kuratoima, joten
   haku ei ajaudu samannimiseen naapuriin. **Tämä on normaali reitti.**
3. **`viitehaku`** — vapaa nimi, varareitti. Käytetään vain jos
   kategoriaa ei löydy, ja jokainen osuma varmennetaan: tiedostonimen
   tai kuvauksen on sisällettävä kohteen kaikki erottelevat sanat.
   Hylätyt kirjataan lokiin.

Palautuksen kenttä `varmuus` kertoo, mitä reittiä käytettiin:
`kategoria`, `tekstihaku` tai `epavarma`.

## Generointiportti (omistajan sitova sääntö)

**Mieluummin ei kuvaa kuin väärä kuva.**

Kohta, jossa on `tarkkaKohde: true`, generoidaan VAIN jos molemmat
ehdot täyttyvät:

1. viitekuvia saatiin **vähintään kaksi**, ja
2. tunnistus on varma eli `varmuus === 'kategoria'`. Varmennettu
   tekstihaku kelpaa vain, jos työlistan kohta sallii sen erikseen
   (`salliTekstihaku: true`).

Muuten ajuri kirjaa `EI TARPEEKSI VIITEITA` tai `TUNNISTUS EPAVARMA`,
merkitsee syyn lokiin ja jatkaa seuraavaan kohtaan. Portin pysäyttämät
kohteet ovat **tulos, jonka päätoimittaja haluaa tietää** — eivät este,
joka kierretään.

Yleisnäkymät (ei nimettyä kohdetta, ei `tarkkaKohde`-merkintää)
generoidaan ilman viitteitä kuten ennenkin.

## Viitteitä useita, ei yhtä

Käytä aina niin montaa **eri kuvaajan ja eri kuvakulman** kuvaa samasta
kohteesta kuin rajapinta sallii (2–4). Perustelu on sekä laadullinen
että oikeudellinen:

- **Laatu:** monesta kuvasta malli oppii rakennuksen *geometrian*;
  yhdestä kuvasta se kopioi sen yhden valokuvan.
- **Oikeudet:** rakennuksen muoto ei ole valokuvaajan omaisuutta, mutta
  yksittäinen valokuva on.

Tätä ei siis "optimoida" yhteen kuvaan. Perustelu on kirjattu myös
koodikommentteihin (`tools/hae-viitekuvat.mjs`, `tools/pollo/worker.js`).

## Lisenssit ja kuvavalinta

- Vain **PD, CC0, CC BY ja CC BY-SA**. Ei NC, ei ND, **ei tuntematonta
  lisenssiä**. Suodatin on sallittujen lista: tunnistamaton
  lisenssiteksti hylätään. Omistaja kysyi erikseen, voisiko viitteinä
  käyttää lisensoimattomia kuvia parhaan laadun saamiseksi — vastaus oli
  ei, eikä sellaista polkua rakenneta (perustuslain pilari 2).
- Alkuperäisen kuvan pidemmän sivun on oltava vähintään **1000 px**.
  Viite itse ladataan noin 1024 px:n pikkukuvana.
- **Nykykuvat ensin.** Historiallinen kaiverrus tai 1800-luvun valokuva
  viitteenä tuottaa kuvan, joka näyttää väärältä aikakaudelta.
- Sisätilat ja yksityiskohdat jäävät jälkeen — hero on ulkokuva.
- Jokaisesta viitteestä kirjataan tekijä, lisenssi ja lähdesivu
  tiedostoon `<kohdekansio>/viitekuvat-loki.txt`.

## Työlistan kentät

```js
{
  id: 'tampere-ilta',
  tiedosto: 'hero-tampere-ilta.png',
  kaupunki: 'Tampere',
  tarkkaKohde: true,                       // portti päälle
  wiki: 'Tampere Old Church',              // en-Wikipedian otsikko
  // kategoria: 'Category:Tampere Old church',  // vaihtoehto wikille
  viitehaku: 'Old Church',                 // varareitin nimi
  viitesuosi: ['vanha kirkko', 'old church'], // nostaa halutun kuvakulman
  // salliTekstihaku: true,                // sallii varareitin tarkalle kohteelle
  prompti: '...',
  selite: '...',
}
```

`viitesuosi` on tarpeen, kun kuvakulma on osa tilausta. Esimerkki:
Näsinneulan **yläosan** muoto — betonivarsi, pyöreä näkötasanne, ohut
antenni — välittyy vain lähikuvasta, joten `viitesuosi` hakee sanoilla
`deck`, `obsevation` ja `ravintola` nimenomaan lähikuvia eikä kaukaisia
siluetteja. (`obsevation` ei ole kirjoitusvirhe täällä vaan
Commonsissa: `File:Näsinneula obsevation deck.jpg`.)

`viitesuosi` verrataan **vain tiedostonimeen**, ei kuvaustekstiin:
kuvauksissa mainitaan lähes joka kuvassa, että kohde on "observation
tower" ja että siinä on ravintola, joten kuvausta vasten sovitettuna
suositus osuisi kaikkeen eikä erottelisi mitään.

## Ajaminen

Viitehaku yksinään (ei maksa mitään, ei generoi):

```
NODE_USE_ENV_PROXY=1 node tools/hae-viitekuvat.mjs "Näsinneula" "Tampere" \
  --wiki "Näsinneula" --suosi "deck,obsevation,ravintola"
```

Tulostaa tunnistustavan, kelvollisten kuvien lukumäärän, valitut
viitteet tekijöineen ja lisensseineen sekä hylätyt.

Koko erä (generoi — kuluttaa päiväkiintiötä):

```
NODE_USE_ENV_PROXY=1 POLLO_KEHITTAJAKOODI=<koodi> \
  node tools/hero-ajuri.mjs tampere 0 4 herokoe
```

Ensimmäinen oikea ajo on Tampere (`tools/hero-tyolista-tampere.mjs`).
Omistaja tuntee nämä rakennukset ja arvioi laadun itse — tämä erä
ratkaisee, kelpaako putki muille kaupungeille.

| Tiedosto | Kohde | Huomio |
| --- | --- | --- |
| `hero-tampere-aamu.png` | Näsilinna / Museo Milavida | korvaa kierroksen 19 kuvan |
| `hero-tampere-keskipaiva.png` | pääkirjasto Metso | korvaa kierroksen 19 kuvan |
| `hero-tampere-ilta.png` | Vanha kirkko | korvaa kierroksen 19 kuvan |
| `hero-tampere-nasinneula.png` | Näsinneulan yläosa lähikuvassa | uusi, tarvitsee oman kuvatekstin |

**Kohteen ja tiedostonimen pari on pidettävä samana** kuin
julkaistuissa kuvateksteissä (`js/packs/kulttuuri-kategoriat.js`,
`avauskuvat`). Parin vaihtaminen tekisi juuri sen virheen, jota koko
putki on rakennettu estämään: kuvateksti lupaisi eri rakennuksen kuin
kuva. Ajuri ohittaa valmiit tiedostot, joten korvaava ajo tehdään
tyhjään kohdekansioon.

## Rajapinta

Viitteillä worker kutsuu `POST https://api.openai.com/v1/images/edits`
`multipart/form-data` -muodossa. Kentät tarkistettu OpenAI:n omasta
dokumentaatiosta 23.8.2026 ("Create image edit", developers.openai.com):

- viitekuvat menevät toistuvassa kentässä **`image[]`**, yksi kenttä per
  kuva
- GPT-kuvamalleille **enintään 16 kuvaa** yhdessä pyynnössä; tämä putki
  käyttää enintään neljää
- **enintään 50 MB per kuva**, muodot PNG, JPEG ja WebP; putken oma
  katto on 8 MB, koska viite on pikkukuva
- `input_fidelity` on vain gpt-image-1/1.5:lle, joten sitä ei lähetetä
  gpt-image-2:lle
- `content-type`-otsaketta ei aseteta käsin: fetch kirjoittaa
  multipart-rajamerkin itse

Ilman viitteitä polku on ennallaan: `POST /v1/images/generations`
JSON-rungolla. Päivälaskuri, kehittäjäkoodivaatimus ja virheiden
vaimennus ovat molemmilla poluilla samat, eikä virherunkoja lokiteta.
