*ARKISTOITU 2.9.2026 samana päivänä kuin kirjoitettu. Tämä on
kertaraportti Fablelle, EI ohje — voimassa olevat ohjeet ovat
docs/moduulit/laattapyramidi.md osiossa 8b ja
tools/korkeusaineisto/LUEMINUT.md:ssä. Raportti asuu arkistossa, koska
docs/-juuren jokaisen .md:n on oltava Raamatun ohjekartalla
(tests/dokumentit.test.mjs) eikä kertaraportti ole ohje — sama
ratkaisu kuin viesti-fable-2026-08-31-laattojen-esilataus.md:llä.*

# Opus → Fable: pohjalaatat 1 kaariminuutilla (2.9.2026)

Haara `agent-a1dc3c58a8a4a0e8f` (kanta main v1437). **Versionumeroa ei
nostettu, PR:ää ei tehty, mitään ei pushattu** — julkaisu on Fablen.

## Mitä tehtiin

Omistajan tilaus: pohjalaatat poltetaan uudestaan 1 kaariminuutin
korkeusdatalla. Aineisto on jo R2:ssa 10°-paloina (v1436–v1437), joten
työ oli lukija + muistin rajaus + työnkulku.

**Uudet tiedostot**

- `tools/korkeuspalat-lukija.mjs` — kokoaa 1′-ruudukon paloista.
  Purkukoodia ei kopioitu: `puraPala` tuodaan
  `tools/tee-korkeuspalat.mjs`:stä sellaisenaan.
- `tests/korkeusikkuna.test.mjs` — 17 testiä.

**Muutetut**

- `tools/hae-korkeusruudukko.mjs` — uusi `haeKorkeusikkuna()`
  (maailmanhilan sarake/rivi-ikkuna, sarake kiertää modulo leveys−1);
  1′ ohjautuu paloihin, 3′ pysyy repon aineistossa. Uudet valitsimet
  `--kaariminuutit`, `--korkeuspalat`.
- `tools/fokuskartta/maailma.mjs` — `korkeusruudukko` kysyy ikkunan
  poiminnan sijaan; `keraaMaailma` ottaa erillisen `korkeuslaatikko`n.
- `tools/generoi-laattapyramidi.mjs` — tarkkuus tason mukaan, kavennettu
  korkeuslaatikko, `--vain-palat`, luettelon `korkeus`-kenttä.
  **Sivussa korjattu tuotannon estävä vika:** sivupalvelimen valkolista
  ei tuntenut `/js/maastovarjo.js`:ää (v1436 toi tuonnin), joten
  pyramidiajo kaatui 404:ään heti aineiston latauksessa. Sama vika kuin
  nostoladonnalla ajossa 13.
- `.github/workflows/generoi-pyramidi.yml` — syöte `korkeus` (1|3,
  oletus 1), palojen kopiointi R2:sta ennen polttoa.
- `docs/moduulit/laattapyramidi.md` osio 8b, `tools/korkeusaineisto/LUEMINUT.md`.

## Sääntö: tarkkuus on tason ominaisuus

z7 → 1′, z0–z6 → aina 3′. Perustelu: 1′-solu on z7:llä 4 kuvapikseliä,
z6:lla 2 ja z5:llä 1 — kaukotasoilla aineisto olisi piirtoa tarkempaa.
`--kaariminuutit 3` palauttaa yhtenäisen vanhan ajon. Sääntö on
koodissa (`kaariminuutitTasolle`) ja luettelossa (`korkeus`-kenttä
tasoittain, täydentyy erissä kuten `tasot`).

## Muisti (mitattu tässä kontissa)

| ajo | ruudukko | Int16 | kokoaminen |
| --- | --- | --- | --- |
| z7 sarakkeet 0–43 | 5701 × 9795 | 112 Mt | 1,0 s / 170 palaa, RSS 215 Mt |
| z7 44–87 | 5710 × 9795 | 112 Mt | 187 palaa |
| z7 88–131 | 5711 × 9795 | 112 Mt | 170 palaa |
| z7 132–168 | 4774 × 9795 | 94 Mt | 153 palaa |
| z7 kokonaan (ei shardattu) | 21661 × 9795 | 424 Mt | 612 palaa |
| z0–z6 (3′) | 7221 × 3267 | 47 Mt | reposta, ennallaan |

Ilman rajausta 1′ olisi koko laudalle 424 Mt jokaiselle shardille;
ruudukko kootaan nyt vain piirrettävien lohkojen alalle (+ reunus ja
0,5° marginaali). Kaikki mahtuu ajokoneen 16 gigaan reilusti.

## 3′ ei muuttunut — mitattu

- koko z3 maailmasta vanhalla ja uudella koodilla: **77/77 laattaa
  md5-identtisiä**
- z7 Alpit kavennetulla laatikolla (198 × 166 solua entisen
  7221 × 3267 sijaan): **4/4 laattaa md5-identtisiä**

## Kohinaa ei tullut — vedokset

Raamattu varoitti 1′:n naapurierojen näkyvän rakeisuutena varjossa.
Rinnakkaisvedokset z7:ltä (sama patina, sama laatu, vain ruutu vaihtui)
näyttävät päinvastaista: 1′ tuo laaksot ja harjanteet esiin puhtaana.
**Alipäästösuodatinta ei siis lisätty** — se olisi hävittänyt juuri
sen, mitä ajolla haettiin. Jos omistaja on eri mieltä vedosten
perusteella, 3×3-keskiarvoistus varjopassiin on pieni lisäys.

Vedokset (scratchpad):

```
.../scratchpad/alpit-lahikuva.png       vasen 3′, oikea 1′ (suurennos)
.../scratchpad/alpit-rinnakkain.png     koko vedos rinnakkain
.../scratchpad/alpit-3kaariminuuttia.png
.../scratchpad/alpit-1kaariminuutti.png
.../scratchpad/kreikka-lahikuva.png
.../scratchpad/kreikka-rinnakkain.png
.../scratchpad/kreikka-3kaariminuuttia.png
.../scratchpad/kreikka-1kaariminuutti.png
```

Alue: Alpit `6.5,45.4,8.5,46.6`, Kreikka `22.5,37.4,24.5,38.6`, z7.

## Täysi 1′-poltto

Versionumeron valitsee Fable; työnkulku on `generoi-pyramidi.yml`:

```
gh workflow run generoi-pyramidi.yml \
  -f versio=2026-09-02 -f tasot=kaikki -f korkeus=1 \
  -f laatu=0.9 -f patina=taysi -f piirit=kylla -f vie=true
```

Shardit ajavat itse: z0–z6 kolmella kaariminuutilla repon aineistosta,
z7a–d yhdellä kaariminuutilla R2:n paloista (kopioidaan levylle ennen
polttoa, ~53 Mt per shardi, ~20 s). **Ajo ei ota yhteyttä NOAA:aan
missään vaiheessa.**

Paikallinen koeajo ilman ämpäriä:

```
node tools/generoi-laattapyramidi.mjs ulos --data /tmp/matkakirja-fokuskartta \
  --tasot 7 --alue 6.5,45.4,8.5,46.6 --kaariminuutit 1 --korkeuspalat /tmp/palat
```

## Testit

`node --test tests/*.test.mjs` → **1191 testiä, 1190 pass, 0 fail, 1
skip** (skip oli jo ennestään). `node tools/tarkista-kaksoisavaimet.mjs`
→ ei kaksoisavaimia.

## Avoimet (3)

1. **Paikkausajo ja tarkkuus.** `paikkaa-pyramidi.mjs suunnittele` ei
   lue lähdeluettelon uutta `korkeus`-kenttää, joten paikkaus käyttää
   työnkulun `korkeus`-syötettä. Työnkulku ajaa generaattorin
   ryhmittäin (z0–z6 kolmella, z7 yhdellä), joten oletussyötteellä
   tulos on oikea — mutta jos joku paikkaa 1′-pyramidia syötteellä
   `korkeus=3`, z7-laatat erottuvat naapureistaan. Korjaus olisi lukea
   tarkkuus lähdeluettelosta kuten laatu ja patina jo luetaan.
2. **z7:n koko ajo yhdessä prosessissa** on 424 Mt ruudukko. Toimii,
   mutta jos joku ajaa z7:n ilman `--sarakkeet`, muistipiikki on
   nelinkertainen shardiin nähden. Kaipaisiko varoituksen?
3. **Ajokoneen kokonaisaika 1′:llä** on mittaamatta: piirtoaika on sama
   (varjo lasketaan pikseleistä, ei soluista), mutta ruudukon siirto
   sivulle on 112 Mt per shardi entisen 47 Mt:n sijaan. Ensimmäinen
   CI-ajo kertoo.
