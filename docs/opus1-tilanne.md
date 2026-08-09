# Opuksen tilanne (päivitetty 9.8.2026)

Muistiinpano kontekstin nollausta varten. Voimassa olevat ohjeet ovat
CLAUDE.md:ssä ja docs/roolitus.md:ssä; tämä kertoo vain, mihin oma työ
jäi. Fablen oma tilannetaulu on docs/fable-tilanne.md.

## Valmiina ja julkaisussa (PR #599, v435)

- **Neljä maalehteä**: Turkki, Irlanti, Portugali ja Unkari saivat
  kukin neljä aihesivua (4 juttua + minitehtävä per sivu) — yhteensä
  16 aihesivua, 64 juttua, 64 kuvaa.
- **Lehtitasapainon vaihe B, erä 1**: Helsingin *Arki ja vapaa-aika*
  siirtyi Suomen maalehteen (nimellä *Arki*, koska
  tests/maa-otsikot.test.mjs vaatii yleisnimen ilman yhdysmerkkiä).
  Helsingille jäi *Historia*.

## Kesken tai odottaa

1. **Vaihe B, loput siirrot** (docs/lehtitasapaino.md). Odottaa Fablen
   kuittausta Helsinki/Suomi-erästä. Päätökset jo saatu: Madrid
   (Urheilu) ja Venetsia (Käsityö) SÄILYVÄT, Lontoo viimeisenä
   (luonto → GBR ja nykytaide 6 → 4), muut kohdat ovat siirtoa eivät
   poistoa.
2. **Menovinkkiruutu pois kaupunkilehdestä.** Kolmen ruudun tavoitteeseen
   ei päästä siirroilla: neljäs ruutu on menovinkkisivu, jonka `ui.js`
   liittää ajonaikana maalehdestä. Ehdotettu omaksi eräkseen kaikille
   36 kaupungille kerralla. Odottaa päätöstä.
3. **Suomen maalehden täydennys.** Suomi on nyt yksi aihesivu (2 juttua)
   + menovinkit. Ehdotettu täydennystä neljään juttuun ja 2–3 sivuun.
   Odottaa päätöstä.
4. **Valokuvakysymysten rajatapaukset (~50).** Omistajan päätös: korjaa
   kaikki paremmiksi kuviksi (myös geneeriset näkymät ja huonot
   panoraamarajaukset), jokainen korvaaja katsotaan silmällä. Oma erä,
   ei vielä aloitettu.
5. **Vanhojen maalehtien puuttuvat minitehtävät**: 33 aihesivua
   (GBR 7, DEU 6, EGY 6, SWE 5, ITA 4, ESP 4, FRA 1).
6. **Tromssa + viisi aluelehteä** (Islanti, Kreeta, Sisilia, Alpit,
   Lappi).

## Havainto, joka ei liity omaan työhön

Kuvaduplikaatti: *Lateral view of the Vasa ship…* on sekä
`tukholma/kaupunki`- että `SWE/historia`-sivulla, eli sama valokuva
näkyy pelaajalle kahdesti. Korjataan valokuvaerän yhteydessä.

## Työtavat, jotka kannattaa säilyttää

- **Esitarkistin ennen liittämistä.** Tarkistaa kenttien pituudet,
  löytyykö vastaus jutun tekstistä, vuotaako vastaus otsikkoon tai
  johdantoon, onko oikea vaihtoehto selvästi pisin, osuuko minitehtävä
  kaupunkilehden kulttuurivisaan (sanoin JA luvuin) ja toistuuko kuva.
  Löysi tässäkin erässä kaksi vikaa ennen julkaisua.
- **Jokainen kuva katsotaan 480 pikselin levyisenä ennen kuvatekstin
  kirjoittamista.** Commonsin kuvaus ei riitä: tässä erässä katsominen
  vaihtoi kuvan seitsemän kertaa (mm. mustavalkoinen kuva jutussa, joka
  kertoo väristä; myyjän vesileima; kuvaus lupasi kilven mutta kuvassa
  oli väkijoukko).
- **Kun kuvasta ei saa varmuutta, aihe jätetään pois** — ei arvausta.
- **Ruutumäärä mitataan selaimessa** (Playwright, 390 px), ei
  arvaamalla datasta.
