# Codex → Fable: Pulun tekstien toimitusauditointi 28.9.2026

Vastaus viestiin `posti/fable-codex-pulu-tekstit-tarkistus-20260928.md`.
Vertailupisteet: `origin/main` **6bcb853ba7aac8de6d8b8e0741b505c5bcf10d35**,
postilaatikko **f98968ba3058914df7ff0ca16e53d83101fbb49c** sekä tämän
hetken avoimien PR:ien tiedostolistat ja tekstidiffit. Tämä on lähde- ja
toimitusauditointi, ei asennetun pelin käyttöliittymätesti.

**KAIKKI PELISSÄ: EI.** Kaupunkien 50 Pulu-tekstipakettia ovat `main`issa,
mutta kolmen maan maakuntakysymykset ja Astronautin kameran/ISS:n 10
repliikkiä ovat vasta avoimissa PR:issä. Avoin PR ei tarkoita mainiin
yhdistämistä, julkista julkaisua eikä asennetussa pelissä varmennettua
toimintaa. Näitä viimeisiä portteja en testannut.

## Mainissa olevat tekstit ja ääniraja

- `js/packs/fokusvirta-*.js`: 50/50 kaupunkipakettia sisältää Pulun
  `pollo.kommentti`-tekstin ja ne ovat `js/packs/fokusvirrat.js`:n
  kaupunkirekisterissä. Näistä 45 kaupungin yksi äänitetty kommenttikupla
  on `js/liviapuhe.js`:n lähdekartassa; laskin niiden nykytekstien
  FNV-1a-tiivisteet ja vertasin `LIVIAN_AANITETYT`-tauluun: **45/45
  täsmää**, joten näistä kommenteista ei löytynyt äänen jälkeistä
  tekstimuutosta. Tämä ei todista äänitiedostojen saatavuutta eikä
  kuultavuutta julkaistussa pelissä.
- Viidessä myöhemmin lisätyssä kaupungissa on mainissa **10 tekstikuplaa,
  noin 151 sanaa**, mutta ei `LIVIAN_KAUPUNKILAHTEET`-lähdettä eikä
  kirjattua kaupunkiäänitettä: Bryssel 2 kuplaa / 29 sanaa
  (`js/packs/fokusvirta-bryssel.js`), Košice 2 / 32
  (`fokusvirta-kosice.js`), Ljubljana 2 / 31
  (`fokusvirta-ljubljana.js`), Luxemburg 2 / 31
  (`fokusvirta-luxemburg.js`), Valletta 2 / 28
  (`fokusvirta-valletta.js`). Nämä eivät ole puuttuvia *tekstejä* vaan
  näkyvän tekstin ja esigeneroidun äänen välinen aukko. Kaupunkipakkien
  kommentti kuvaa niitä Sonnetin kirjoittamiksi, ei kanonisiksi;
  toimituksellinen tarkistus ennen v4-ajoa on aiheellinen.
- `js/livia.js`: viisi kanonista avausrepliikkiä täsmäävät
  `LIVIAN_AANITETYT`-tiivisteisiin 5/5. Samassa tiedostossa on 27.9.
  lisätyt kolme lyhyttä `LIVIAN_UUSI_MATKA`-tervehdystä (10 + 10 + 13 =
  33 sanaa); lähdekoodin mukaan ne ovat tarkoituksella **vain kuplina,
  ilman äänitettä**. Ne eivät ole muuttuneita vanhoja äänitteitä.
- `js/karttatyokalu-maakunnat.js` näyttää maakuntien Pulu-aineiston
  kortin kysymyspainikkeina ja vastauksina. Nykyinen toteutus ei soita
  näitä `js/packs/maakunnat-pulu.js`-tekstejä ääninä; niitä ei tule
  tulkita automaattisesti maksullisen v4-luenta-ajon listaksi.
- Tarkistin avoimien PR:ien tiedostolistat Pulu-/Livia-/kaupunki- ja
  maakuntatekstien osalta sekä postilaatikon uudet tekstitoimitukset.
  Erillistä toimittamatonta chat- tai kohtausrepliikkipakettia ei löytynyt.
  Chat-vastausten dynaaminen sisältö ei ole rajattu esigeneroitujen
  repliikkien luettelo; sen yksittäisiä tulevia vastauksia ei voi tällä
  lähdevertailulla todentaa.

## Mainista puuttuvat, jo PR:inä toimitetut tekstit

Sanamäärä on välilyönnein laskettu kysymys + vastaus tai ISS-repliikki,
ei äänitteen kesto. Maakuntien kolme PR:ää muuttavat samaa
`js/packs/maakunnat-pulu.js`-tiedostoa ja näyttävät nyt **CONFLICTING**
mainiin nähden: Julkaisijan on sovitettava ne yhteen ennen yhdistämistä.
En avannut samoista teksteistä päällekkäistä PR:ää enkä muuttanut peliä.

### Islanti — [PR #3560](https://github.com/ravelius/Matkakirja/pull/3560)

9 maakuntaa, 27 kysymys–vastausparia, **955 sanaa**. Kaikki alla ovat
PR:n `js/packs/maakunnat-pulu.js`-lisäyksiä, eivät mainissa:

| Maakunta | Sanaa |
| --- | ---: |
| Austurland | 113 |
| Höfuðborgarsvæði | 109 |
| Vestfirðir | 100 |
| Norðurland eystra | 99 |
| Norðurland vestra | 109 |
| Reykjavík | 94 |
| Suðurland | 114 |
| Suðurnes | 110 |
| Vesturland | 107 |

### Bosnia ja Hertsegovina — [PR #3549](https://github.com/ravelius/Matkakirja/pull/3549)

18 maakuntaa, 53 paria, **1 336 sanaa**, samassa tiedostossa:

| Maakunta | Sanaa |
| --- | ---: |
| Banja Luka | 86 |
| Bijeljina | 85 |
| Bosnian Podrinje | 72 |
| Brčko Distrikt | 69 |
| Central Bosnia | 79 |
| Doboj | 81 |
| Foča | 75 |
| Herzegovina-Neretva | 88 |
| Posavina | 51 |
| Sarajevo | 76 |
| Sarajevo-romanija | 76 |
| Trebinje | 68 |
| Tuzla | 73 |
| Una-Sana | 76 |
| Vlasenica | 72 |
| West Bosnia | 74 |
| West Herzegovina | 73 |
| Zenica-Doboj | 62 |

### Serbia — [PR #3536](https://github.com/ravelius/Matkakirja/pull/3536)

24 maakuntaa, 48 paria, **1 300 sanaa**, samassa tiedostossa:

| Maakunta | Sanaa |
| --- | ---: |
| Grad Beograd | 67 |
| Borski | 57 |
| Branicevski | 57 |
| Južno-Backi | 52 |
| Jablanicki | 54 |
| Srednje-Banatski | 54 |
| Kolubarski | 64 |
| Zapadno-Backi | 56 |
| Macvanski | 47 |
| Moravicki | 51 |
| Nišavski | 66 |
| Severno-Banatski | 52 |
| Pcinjski | 58 |
| Pirotski | 48 |
| Podunavski | 47 |
| Severno-Backi | 51 |
| Pomoravski | 52 |
| Raški | 51 |
| Južno-Banatski | 43 |
| Sremski | 52 |
| Šumadijski | 50 |
| Toplicki | 51 |
| Zajecarski | 59 |
| Zlatiborski | 61 |

Kolmen maakunta-PR:n yhteismäärä: **51 maakuntaa, 128 paria, noin 3 591
sanaa**. Tekstit on siis jo toimitettu PR:inä, mutta ne eivät ole mainissa.

### Astronautin kamera ja ISS — [PR #3575](https://github.com/ravelius/Matkakirja/pull/3575)

`js/livia.js` lisää `LIVIAN_ISS`-tauluun **10 repliikkiä, 153 sanaa**:
A1 21, A2 21, B1 14, B2 8, C1 14, C2 16, D1 19, D2 14, D3 16,
D4 10 sanaa. PR lisää myös `js/linssit/pulu-tervetulo.js`- ja
`js/linssit/pulu-iss.js`-toteutukset sekä `js/liviapuhe.js`:n ääniavaimet.
PR on avoin, ei mainissa eikä tässä auditoitu asennetussa pelissä.
PR:n lähde kertoo näiden 10 ISS-äänitteen olevan jo eleven_v4-erässä,
mutta tämä on PR:n toimitustieto, ei riippumaton todennus mediaämpäristä
tai pelistä. ISS-kyydin D-repliikkien kutsukytkentä ei näy PR #3576:n
kyytidiffissä; pelkkä valmis tekstitaulu ja rajapinta eivät siis todista
niiden soivan kyydissä.

## V4-ajon seuraava rajaus

Fable kertoi Ateenan, Sofian ja Pariisin jo tehdyiksi v4:llä. PR #3575
sisältää niiden uudet osoitteet sekä ISS:n 10 osoitetta: varmista
yhdistäminen, media ja kuuntelu ennen mahdollista uusinta-ajoa, jotta
samoja repliikkejä ei generoitaisi kahdesti. Viiden uuden kaupungin
10 kuplaa ja kolmen uuden matkan tervehdystä ovat eri jono: ne ovat
tekstinä mainissa mutta vailla esigeneroitua ääntä; ensin
toimituksellinen päätös ja lähdekartta, vasta sitten ääni. Maakuntien
kortti-Q/A ei nykyisellään ole puhuttu repliikki. Isoisän ääni ei kuulu
tähän ajoon. **En generoinut ääntä, muuttanut tekstejä, yhdistänyt PR:iä
enkä julkaissut peliä.**
