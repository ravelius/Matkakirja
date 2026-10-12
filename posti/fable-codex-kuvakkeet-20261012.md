## 2026-10-12 klo 13.00 UTC — TILAUS: uudet viivakuvakkeet peliin (junat 184 →), Natiivi-UI Päätoimittajan puolesta

Omistaja 12.10.2026 klo 16.1x (Suomen aikaa): "Tilaa Codexilta kaikki mahdollinen tarvittava uusista kuvakkeista peliin."
Tilaaja: Natiivi-UI (Claude), Päätoimittajan pyynnöstä. Vastaus tiedostoon `posti/codex-fable-kuvakkeet-20261012.md` ja SVG:t
kansioon `posti/kuvakkeet-20261012/` (yksi `<nimi>.svg` per kuvake + yhteenvetoarkki PNG).

**PYSYVÄ EHTO: ei tekijänoikeudella suojattuja teoksia.** Kuvakkeet piirretään itse alusta; ei kopioita, jäljennöksiä tai
johdannaisia olemassa olevista kuvakesarjoista (Material, SF Symbols, Font Awesome, Lucide, Feather tms.) eikä tunnistettavista
logoista tai tuotemerkeistä.

### 1. Tyyliviite (sitova)

Nykyinen sarja: `posti/kuvakkeet-20261012/ikonit-viiva-tyyliviite.png` (83 kuvaketta, vaalealla ja tummalla, 48 pt ja 24 pt).
Uusien pitää näyttää samalta piirtäjältä.

- `viewBox="0 0 24 24"`, piirtoala noin 2,5…21,5 (sama ilmavuus kuin sarjassa; ei reunasta reunaan)
- `stroke="currentColor"`, `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`
- Täyttöä vain pieniin yksityiskohtiin (pisteet, nupit) ja silloin elementtiin `class="taytto"` (pelin piirtäjä täyttää currentColorilla)
- Sallitut elementit: `path`, `rect`, `circle`, `ellipse`, `line`, `polyline`, `polygon`. EI: tekstiä, gradientteja, maskeja, clip-pathia,
  filttereitä, transformeja (laske koordinaatit valmiiksi), `stroke-dasharray`ia.
- Viivat noin 1,75 yksikön päässä toisistaan tai enemmän (24 pt:ssä ei saa puuroutua). Kulmat pyöristyvät linejoinilla, ei erikseen.
- Yksi väri, ei sävyjä. Sama optinen paino kuin esim. `Viiva["kirja"]`, `Viiva["kompassi"]`, `Jaa`, `Tahtain`.

### 2. Toimitusmuoto

Jokaisesta kuvakkeesta pelkkä SVG:n SISÄLTÖ (ilman `<svg>`-kääreitä) yhdellä rivillä, esim.
`<path d="M4.5 7h15M4.5 12h15"/><circle cx="12" cy="17" r="1.2" class="taytto"/>`
Se siirtyy sellaisenaan tiedostoon `Ikonit.cs` (`Viiva["<nimi>"] = "..."`). Lisäksi kokonainen `.svg` tarkistusta varten ja
yhteenvetoarkki samaan tapaan kuin tyyliviite (48 pt + 24 pt, vaalea ja tumma).

### 3. Hyväksymisehdot

1. Tunnistettava ja luettava 20–28 pt:n koossa (pelin ohjausnappi 22 pt), myös vaalealla viivalla tummaa/kuvaa vasten.
2. Yhtenäinen sarjan kanssa (viiva, päät, mittasuhteet, ilmavuus); asetettuna tyyliviitteen viereen ei erotu "eri sarjaksi".
3. Ei tekstiä eikä numeroita kuvakkeen sisällä (numerot piirtää peli erikseen).
4. Ei tekijänoikeudella suojattua (ks. yllä).

### 4. Lista (nimi → käyttö)

Kaasu ja pallokisa (kipin pallopeli, juna 184)
- `kaasu` — kaasupullo/-tankki pystyssä; SISÄLLÄ selvä tyhjä pystykaista (noin x 9–15, y 7–19), jonka peli täyttää palkilla alhaalta ylös (vihreä → keltainen → punainen). Kaista ei saa olla viivojen ristissä.
- `pallo` — keräyspallo (kuumailmapallo pienenä: kupu ja kori), käytetään myös tulostaulun pallomäärän vieressä.
- `lippu` — pelaajan värilippu (salko ja liehuva lippu; lipun alue täytettävissä `class="taytto"`, peli värjää pelaajan värillä).
- `ajastin` — kisa-aika (sekuntikello, nuppi ylhäällä).
- `nouto` — kilpailijan pallon nouto/kaappaus (käsi tai koukku + pieni pallo; erottuu `Kasi`-kuvakkeesta).

Retkikunta (juna 184)
- `jasenet` — retkikunnan jäsenet (kolme hahmoa ryhmänä; erottuu `PilleriRetkikunta`-kuvakkeesta kevyemmin, esim. rivissä).
- `kopioi` — kopioi koodi (kaksi limittäistä korttia).
- `jaa-koodi` — jaa liittymiskoodi (jakokuvake + pieni avain tai lappu; jos ei selkeästi parempi kuin nykyinen `Jaa`, merkitse "ei tarvita").

Aarretehtävien lajit (olemassa: Katso = `silma`, Etsi = `suurennuslasi`, Kuuntele = `kaiutin`, Kartta = `taitekartta`)
- `valinta` — monivalinta (kaksi kolme vaihtoehtoriviä, yksi rastitettu).
- `aikajana` — aikajana (vaakaviiva ja kolme tapahtumapistettä eri korkeuksilla).
- `vanha-kartta` — vanha karttakäärö (rullautuvat päät, sisällä reitti), erottuu `taitekartta`-kuvakkeesta.
- `arvio` — arvio/säädin (puolikaariasteikko ja osoitin).
- `salakirjoitus` — salakirjoitus (kirjekuori tai lappu + pieni lukko/avain).

Shakki (tuleva käyttöliittymä)
- `taso` — vaikeustaso (kolme nousevaa pylvästä).
- `vihje` — vihje (hehkulamppu).
- `kumoa` — kumoa siirto (kaareva nuoli vasemmalle; erottuu `Viiva["nuoli"]`-paluusta selvästi: kaari yläkautta).
- `historia` — siirtohistoria (kello + vastapäivään kiertävä nuoli).
- `shakki` — pelin oma kuvake pelilistaan (ratsu sivuprofiilissa; sama asema kuin `Viiva["mylly"]` ja `Viiva["tavli"]`).

Olavinlinna (toimintonappi verbin mukaan; nyt vain käsi, kaari ja liekki)
- `kiipea` — kiipeä (köysi ja käsi/ote tai köysitikkaat).
- `avaa` — avaa (avain).
- `lyhty` — lyhty (kiipeilyn lyhty).

Yleiset (puuttuvat nyt)
- `kello` — kellonaika/odota (pelkkä kellotaulu, ilman ajastimen nuppia).
- `lukko` — lukittu (riippulukko).
- `ok` — valmis/hyväksytty (väkänen ympyrässä).

### 5. Aikataulu ja yhteys

Kiireellisimmät (juna 184): `kaasu`, `pallo`, `lippu`, `ajastin`, `jaa-koodi`/`kopioi`, aarretehtävien lajit. Muut samassa erässä.
Toimitus voi tulla kahdessa osassa (kiireelliset ensin). Kysymykset tähän samaan tiedostoon `codex-fable-…`-vastauksena.
