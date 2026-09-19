# Opus → Fable: v1969:n kaksi astro-punaista (20.9.2026)

Erä `opus-local-v1969-punaiset` → pushattu suoraan haaraan
`claude/bold-ride-vow4ki-v1969`, commit 81278968. CI-loki: ajo 35469530968.

## Juurisyy: avausanimaatio jatkui mittausten ajan (yksi syy, kaksi punaista)

PAATOKSET 52 ja 53 toivat linssin avaukseen kaksi kameran kirjoittajaa:

- **avausajo** kirjoittaa kameran KORKEUDEN joka kehyksellä viiden sekunnin ajan
- **ISS-seuranta** kirjoittaa kameran LAT/LNG:n joka kehyksellä, kunnes pelaaja koskee ruutuun

Kumpikin päättyy pelaajan ensimmäiseen otteeseen. Savukkeet eivät koskeneet ruutuun, joten:

1. **savuke-astro-sumu**: savuke asetti kameran kaukokorkeuteen (1,3 × avauskorkeus), mutta
   avausajo veti sen takaisin lepokorkeuteen (0,72 × avaus). Sumun peitto luettiin siis
   väärältä korkeudelta: kauko **0,539** vaaditun < 0,2 sijaan. Peli oli oikeassa —
   `sumunPeitto(0,72 × avaus)` ON 0,53.
2. **savuke-astro-valokuva (ipad)**: ISS-seuranta pyöritti Maata, joten vihreä piste liikkui
   napautuksen alta eikä valokuvanäkymä auennut.

## Korjaus (vain savukkeissa, peliin ei koskettu)

Molempiin lisättiin `pysaytaAvaus(s)`: odottaa, että paljastus on ohi (`vaihe === 'paljastettu'`;
otsikkokortti on ruudulla vähintään 1,8 s, eikä ote pure sitä ennen), tekee sitten saman
eleen kuin pelaaja — yhden `pointerdown`/`pointerup`-parin laudan koteloon
(`js/linssit/satelliitti-avaruus.js` otePalloon) — ja varmistaa tilasta, että ajo ja seuranta
ovat pois. Yksi uusintayritys, jos ensimmäinen ele osui vielä häivytykseen. Ele ei avaa
mitään, koska se ei ole napautus kartalle.

## Mittaukset (Mac, Chromium)

| Ajo | savuke-astro-sumu | savuke-astro-valokuva |
| --- | --- | --- |
| Ennen (CI v1969) | 6/8, kauko 0,539 | 134/135, ipad FAIL |
| Ele väärään elementtiin (välivaihe) | 5/8, `ajo: true` | – |
| Ele ennen paljastusta (välivaihe) | – | 134/135, `ajo: true` |
| **Korjattu** | **8/8**, kauko 0,15 | **176/176** (kaikki neljä näkymää) |

`node --test tests/*.test.mjs`: pass 3709, fail 0. `tarkista-savukkeet`: kunnossa.

## Havainto (kirjattu)

`savuke-astro-valokuva.mjs` kuuntelee kovakoodattua porttia 8757 (ei PORTTI-muuttujaa), joten
rinnakkainen ajo kaatuu EADDRINUSEen. En muuttanut sitä tässä erässä.
