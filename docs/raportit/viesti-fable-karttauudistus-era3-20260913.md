# Karttauudistus, erä 3 — maan perustiedot ja Lisää-valikko pallolle

*(Opus-työsessio Fablelle 13.9.2026. Haara
`claude/karttauudistus-era3-maapaneeli`, PR mainiin. EI versionostoa,
ei dist/-committia — tehtävänannon mukaan.)*

> **Miksi tämä ei ole `docs/viesti-fable.md`.** Sama syy kuin erissä 1
> ja 2: `docs/viesti-fable.md` ei ole Raamatun ohjedokumenttikartalla,
> ja tests/dokumentit.test.mjs kaatuu siihen. Tehtävänanto ohjasi
> tähän polkuun erikseen.

## 1. Mitä tehtiin

Pallosuunnitelman **erä 3** (luvut 3.0 ja 3.2) kokonaisuudessaan:
maan perustiedot ja plussan tilalle tullut **Lisää-valikko** ovat nyt
PALLON MERKKIKERROKSESSA, karttaan kiinnitettynä — eivät ruudun
nurkassa.

| Tiedosto | Muutos |
| --- | --- |
| `js/pallolauta/maapaneeli.js` (uusi, 490 r) | Koko kerros: ankkuri, mitat, valikko, värikoodi |
| `js/pallolauta/lauta.js` | Kerroksen luonti, päivitys piirrossa ja zoomissa, saapumislaatikko |
| `js/fokusmitat.js` | `MAAPANEELI_KARTASSA`-vakio + `?maapaneeli=nurkka`, nurkkakalusteen portti, `maanNimi`/`maanRivit` vietäväksi |
| `js/lehti.js` | `avaaMaalehti(ui, iso, { sivu })` — sivutunnus → sivunumero |
| `css/styles.css` | Kortti, luvut, Lisää-nappi, värikoodattu valikko |
| `sw.js` | Uusi moduuli SHELL-koriin |
| `tools/savukkeet/savuke-maapaneeli.mjs` (uusi) | Savuke kahdella vastakokeella |
| `tests/maakartuutsi.test.mjs` | Kaksi tekstivartiota uuteen muotoon |

### 1.1 Karttaan kiinnitys (PÄÄTÖKSET 2, kohta 2)

Paneeli on **yksi datum merkkikerroksessa** (`merkit.aseta('maapaneeli',
…)`), jolla on `lat`/`lng` kuten kaupungin nimellä ja nostolla. Kirjasto
liikuttaa sen pallon mukana; koodi ei kirjoita ruutupikseleitä
kertaakaan.

**Koko on kartan mitta, ei ruudun.** Paneelilla on kiinteä koko LAUDAN
YKSIKÖISSÄ, ja ruutukoko tulee kamerasta (`skaala = perusta ×
px_per_lautayksikkö`, rajat 0,45…3). Lautamitta johdetaan **maan
laatikosta** (`maanLautalaatikko`): korkeintaan laatikon levyinen ja
korkeintaan 35 % sen korkeudesta. Ranskalle (laatikko 490 × 406 yks)
tämä antaa 444 × 142 lautayksikköä.

**Paikka: maan laatikon ETELÄREUNAN alapuolella**, raon (2 % laatikon
korkeudesta) verran sen ulkopuolella. Kolme syytä on kirjattu
moduulin alkuun; lyhyesti: se on rajan ulkopuolella joka maalla, se ei
peitä maata eikä sen kaupunkeja, ja saapumisrajaus voi ottaa sen mukaan
yhdellä laatikon laajennuksella.

**Saapumisrajaus laajennettiin** (`paneelinLaatikko`): kamera sovittaa
maan JA paneelin. Ilman sitä paneeli jäisi saapumisnäkymässä ruudun
alalaidan alle. Tämä on suunnitelman luvun 3.0 kohta (a).

### 1.2 Lisää-nappi ja värikoodattu valikko

- Otsikot luetaan **`MAA_KATEGORIAT[iso]`-taulusta** — ei yhtään
  kovakoodattua otsikkoa. Ranskalla kahdeksan.
- Otsikon painallus → `avaaMaalehti(ui, iso, { sivu })`. **Parametri on
  SIVUTUNNUS, ei numero** (`historia`, `menovinkit`, …): numero riippuu
  siitä, onko maalla karttasivu, ja sen arvaaminen kutsupuolella
  tuottaisi kahden taulun rinnakkaisen järjestyksen. Numeron saa yhä
  antaa; tuntematon tunnus palaa lehden ensimmäiselle sivulle.
- **Väripaletti on pelin oma**: `--sym-*`-muuttujat css/styles.css:stä
  (Raamattu, SYMBOLITAKSONOMIA) — samat sävyt kuin kartan nostoilla.
  Yhtään uutta väriä ei lisätty. Aihetunnus → symboliperhe on
  taulussa `AIHEEN_PERHE`; maalehtien tunnuksia on yli 70, ja ne
  palautuvat kahteentoista perheeseen, jotka pelaaja jo tuntee
  kartalta. Tuntematon tunnus saa perheen `silma`.

### 1.3 Nurkkatila yhden vakion takana

`js/fokusmitat.js` → `export const MAAPANEELI_KARTASSA = true`. `false`
(tai `?maapaneeli=nurkka`) palauttaa kartuutsin ja maataulun ruudun
vasempaan alanurkkaan täsmälleen entisellään. Sama vipu on savukkeen
vastakoe B.

**Tasokartalla ei muutu mitään** — kartuutsi, mittajana ja
asteviivaimet ovat sen omia kalusteita.

## 2. Savuke ja vastakokeet

`tools/savukkeet/savuke-maapaneeli.mjs` (löytyy `tarkista-savukkeet`in
kansiosta). Peli: Fogg Pariisissa, `?lauta=pallo`, saapumisajo ajetaan
laudan omalla `saavu`-kutsulla, jotta mitta otetaan siltä uloimmalta
zoomilta, jolle luettavuus on mitoitettu.

VIHREÄ AJO (mitatut luvut luvussa 3).

VASTAKOKEET.

## 3. Mitatut luvut

## 4. Mitä kuvissa NÄIN

## 5. Portit

## 6. Avoimet asiat ja rajapinnat muihin eriin
