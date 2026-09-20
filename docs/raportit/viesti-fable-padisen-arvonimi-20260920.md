# Opus → Fable: Padisen arvonimi luki yhä pelaajan sijainnin

20.9.2026 klo 14.30. Haara `opus-local-padisen-arvonimi` (pohja
origin/v1973-prep, 7b7e7387). Ei versionostoa, ei PR:ää.

Sonnet 1, kierros 18: Tallinnassa Padisen luostarin kortissa luki yhä
*"Pariisin salonkien pöllöltä"*, vaikka `arvonimenPaikkaMaalle` on
tuotannossa.

## Juurisyy: sama arvonimi, TOINEN polku

Kierroksella 16b korjattiin **kohdekortti** (`js/fokuskohteet.js`
`piirraKohteenKysymykset`): se hakee paikan `arvonimenPaikkaMaalle(
kohteenIso(kohde), …)`.

**Nostokortti on oma polkunsa** (`js/fokusnosto.js`
`piirraNostonKysymykset`) ja se kutsui nimilappua ilman paikkaa:

```js
polloNimilappu(html('p', 'fokusnosto-kysy-otsikko'), {
  ennen: 'Kysy ', yli: 'viisaalta pöllöltä', tilalle: 'pululta',
  jalkeen: ':', arvonimi: true,        // ← ei maanosaa eikä isoa
});
```

Ilman `maanosa`/`iso`-kenttiä `polloNimilappu` kutsuu
`arvonimenPaikka()`, joka lukee **pelaajan** sijainnin
(js/ui-apurit.js rivit 765–779). Padinen on Virossa, pelaaja oli
Pariisissa — ja kortti sai Pariisin arvonimen.

## Korjaus

`js/fokusnosto.js`:

1. Uusi viety `nostonIso(nosto)`: ensin noston oma `iso`, sitten
   laiska hakemisto `NOSTO_MAAT`-taulusta (tunnus → maa) — sama kaava
   kuin `kohteenIso`.
2. `piirraNostonKysymykset` hakee paikan `arvonimenPaikkaMaalle(
   nostonIso(nosto), ui?.game ?? null)` ja antaa sen nimilapulle.

Kaupungin omat täkynostot (`fokusvirtaSisalto`) eivät ole
`NOSTO_MAAT`-poolissa, joten `nostonIso` palauttaa niille `null` ja
arvonimi menee entistä reittiä. **Se on oikein:** täkynosto kertoo juuri
siitä kaupungista, jossa pelaaja seisoo.

## Vartiot

- `tests/pollon-arvonimet.test.mjs`: uusi testi — `nostonIso` löytää
  maan, oma kenttä voittaa hakemiston, tuntematon tunnus ei keksi maata,
  ja lähdetekstivartio vaatii, että kortti antaa paikan nimilapulle.
  8 / 0.
- `node --test tests/*.test.mjs`: **3 750 testiä, 0 punaista**.
- `tools/tarkista-savukkeet.mjs`: kunnossa.

## Mitä jäi tekemättä

- **Selainkuvaa Padisen kortista ei ole**: vika ja korjaus on luettu
  koodista ja vartioitu testillä. Savuketta tälle ei ole, koska
  arvonimi arvotaan joka avauksella — mittari tarvitsisi arvonnan
  siemenen, ja se on isompi työ kuin tämä korjaus.
- En etsinyt muita polkuja samaan nimilappuun kuin nämä kaksi; jos
  kolmas löytyy, se on sama yhden rivin korjaus.
