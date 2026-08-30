# Viesti Fablelle — noutovian korjaus (30.8.2026)

Haara `claude/pyramidi-pilotti`. Ei versionostoa, ei PR:ää.
**Portit: 1048 pass / 0 fail, savuke-laattapyramidi 13/13.**

Lopetin NOAA:n tavoitettavuuden selvittelyn heti — poistin jo
kirjoittamani luotainaskeleet työnkulusta, koska niitä ei enää tarvita.

---

## Pakattu koko: 28,9 Mt (raja 40 Mt ei ylity)

Mittasin ennen kuin committasin, kuten pyysit:

| muoto | koko |
| --- | --- |
| Float32 raakana (välimuistin muoto) | 103,7 Mt |
| Int16 raakana | 51,9 Mt |
| Int16 + gzip −9 | **39,9 Mt** |
| Int16 + rivierotus + gzip −9 | **28,9 Mt** ← tämä |

Pelkkä gzip olisi jäänyt 39,9 megatavuun eli **kämmenen leveyden
päähän rajastasi**, joten lisäsin yhden askeleen: rivikohtaisen
erotuskoodauksen. Naapurisolut ovat lähes samat, joten erotus on pieni
luku ja pakkautuu paremmin; purku on rivin yli kulkeva summa, kuusi
riviä koodia. **Häviöttömyys todennettu koko aineistolla: 25 930 801
solua, 0 eroa.**

Mittasin myös brotlin (26,4 Mt), mutta jätin sen: 2,5 Mt ei ole toisen
pakkausmuodon arvoinen.

## Int16 ei menetä mitään — ja se on todennettu

Tämä oli ainoa kohta, jossa epäilin laatuvirhettä, joten en luottanut
päättelyyn. `tools/fokuskartta/maailma.mjs` pyöristää arvot **Int16:een
joka tapauksessa** rakentaessaan arkin ruudukkoa, eli Float32:n
desimaalit katosivat jo ennen piirtoa.

Ajoin 60 laattaa uudelleen repon aineistosta ja vertasin pikselitasolla
edelliseen ajoon (sama lukittu resepti, ainoa muuttuja aineiston
muoto):

```
täysin identtisiä laattoja: 60 / 60
pahin kanavaero:            0
eroavia kanavia:            0 / 62 914 560
```

**Sama vertailu todistaa myös, ettei kaksinkertaista harvennusta
tapahdu.** Jos lukija harventaisi valmiiksi harvennetun ruudukon
uudestaan, maasto olisi sileämpi eivätkä laatat olisi identtisiä. Ne
ovat. Lukija purkaa tiedoston sellaisenaan eikä koske arvoihin.

Tarkistin myös nimeämäsi `tools/fokuskartta/etopo.mjs`: se on
**maalehtien** CSV-kaistareitti eikä ole missään tekemisissä
maailmanruudukon kanssa — pyramidi kulkee `hae-korkeusruudukko.mjs`:n
kautta. Ei siis kaksinkertaista harvennusta sielläkään.

## Mitä tein

| tiedosto | mitä |
| --- | --- |
| `tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz` | 28,9 Mt, 7201 × 3601 solua |
| `tools/korkeusaineisto/LUEMINUT.md` | lähde, lisenssi, johtamiskomennot, muoto, ruudukon suunnat |
| `tools/tee-korkeusaineisto.mjs` | uudelleenajettava muunnin välimuistista |
| `tools/hae-korkeusruudukko.mjs` | lukee repon aineiston ensin; verkkoon vain jos ruutukoko ei täsmää |
| `.github/workflows/generoi-pyramidi.yml` | NOAA-nouto pois, `NODE_USE_ENV_PROXY` pois |

Käytin scratchpadin valmista aineistoa enkä noutanut mitään uudestaan.

**Todennettu paikallisesti ilman verkkoa:** tyhjä välimuisti,
proxy-muuttujat poistettu → ajo lukee `ruudukko reposta:
tools/korkeusaineisto/…` ja tuottaa 60 laattaa läpi.

## Työnkulku nyt

`aineisto`-jobi tarkistaa repon aineiston ja noutaa **vain Natural
Earthin** — kerran, ei kerran shardia kohti. Korkeusaineisto tulee
jokaiseen jobiin checkoutin mukana ilman yhtäkään verkkopyyntöä.
Työnkulussa on enää **yksi verkkoviittaus** (Natural Earth
GitHubista), ja se toimi jo koeajossa.

Rakenteellinen syy, jonka mainitsit: viisi shardia olisi noutanut kukin
104 Mt samasta lähteestä yhtä aikaa. Sitä ongelmaa ei enää ole
olemassa — aineisto ei kulje verkon yli kertaakaan.

Shardijako, laattamäärät (23 340) ja muu rakenne ennallaan.

## Repon kasvu

28,9 Mt. Repossa on jo 320 Mt aineistoa (`assets/kartat` yksin 202 Mt),
joten tämä on sen mittakaavassa pieni. Tiedosto on muuttumaton
lähtöaineisto: se generoidaan uudestaan vain jos ruudun kokoa
muutetaan, eikä se siis kasvata historiaa uudestaan.

## Mitä EI tehty

- Täysgenerointia ei ajettu.
- Mitään ei viety ämpäriin.
- Versiota ei nostettu, PR:ää ei tehty.
- NOAA:n tavoitettavuutta ei selvitetty enempää.

## Seuraava askel

Mergeä ja aja koeajo (`tasot=koeajo-z0-z3`). Jos se menee läpi, sama
työnkulku ajaa täyden pyramidin valinnalla `kaikki`.

Yksi asia kannattaa tietää etukäteen: **`vie=true` kirjoittaa laatat
ämpäriin** polkuun `julisteet/pyramidi/<versio>/…`. Koeajossa se on
noin 5 Mt (z0–z3) eikä koske olemassa olevaan sisältöön, koska polku on
uusi. `vie=false` ajaa saman ilman ämpäriä.

## Sivussa nähtyä (en korjannut)

- `savuke-karttazoom.mjs` on `tools/`-juuressa, ei `tools/savukkeet/`.
- `tools/hero-tyolista-*.mjs` — 25 kertaluontoista ajotiedostoa juuressa.
