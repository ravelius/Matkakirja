# Viestikanava Fablelle

## Pro-sisällöntuottajapalikka, vaihe 1 — Raamattuun kirjattavat rivit

Pro-palikka on rakennettu (worker/ehdotukset/pro.js, js/tekijakortti.js,
js/ehdotukset.js:n pro-osio, Lukijoilta-lehden pro-sivut,
docs/pro-lisenssilupa.md, docs/moduulit/lukijoilta.md osio 4). Agentti
ei kirjoita Raamattuun — nämä kaksi riviä jäävät Fablelle:

**1. Linjausrivi osioon "Lukijoiden ehdotukset" (tai omaksi osiokseen
"Pro-sisällöntuottajat"):**

> PRO-SISÄLLÖNTUOTTAJAT (omistajan tilaus 18.8.2026). Ehdotuskanava on
> auki kaikille pelaajille; pro-kanava vain niille ammattilaisille —
> valokuvaajille ja tutkijoille — jotka omistaja on HENKILÖKOHTAISESTI
> kutsunut. Kutsuttu saa pysyvän kahdeksan merkin koodin, ja
> vastineeksi laadukkaasta sisällöstä hänelle tulee pelissä krediitti
> ja oma tekijäsivu: kuva, esittely ja linkit omille kotisivuille.
> Sivu avautuu kuvan lähderiviltä, kun paketissa on kenttä `tekijaId`.
> Kolme sääntöä: (1) mikään profiili ei näy pelaajalle ennen omistajan
> hyväksyntää, ja julkaistun profiilin muutos palaa aina jonoon;
> (2) sähköposti ja koodi eivät päädy julkiseen vastaukseen eivätkä
> lokiin — julkinen profiili on eri olio eri avaimessa; (3) lupa
> pyydetään aina lupapohjalla (docs/pro-lisenssilupa.md): rinnakkainen
> ei-yksinomainen lisenssi peliin, peruutus koskee uusia julkaisuja.
> Toteutus: docs/moduulit/lukijoilta.md osio 4.

**2. Dokumenttikartan rivi (Raamatun viimeinen osio) — PAKOLLINEN,
muuten tests/dokumentit.test.mjs kaatuu:**

> 'docs/pro-lisenssilupa.md — vakiopohja, jonka omistaja lähettää
>   kutsumalleen pro-sisällöntuottajalle: mitä luovutetaan, lisenssi,
>   krediitti ja tekijäsivu, peruutusehto.',

Tämä rivi on ainoa punainen portti haarassa
`claude/fable-pro-palikka`: dokumentit-testi vaatii jokaiselle
docs/-tiedostolle rivin Raamatun kartalla. Kaikki muut portit ovat
vihreitä.

---

## Kulttuurivisat: neljä kaupunkia korjattu, yksi päällekkäisyys jää Fablelle

*(Opus-rooli, 19.8.2026, v913. Omistaja huomasi Pariisin lehdessä, ettei
patonkikilpailun visakysymykseen ole lehdessä vastausta.)*

### Mitä mitattiin

Kaikki 43 Euroopan kaupunkia, joilla on sekä kulttuurivisa
(`js/packs/europe-kulttuuri.js`) että kategoriat
(`js/packs/kulttuuri-kategoriat.js`). **39 oli kunnossa, neljä ei.**

`docs/moduulit/kaupunkilehti.md` vaatii, että visan opettava nosto on
kategorioissa näkyvillä, ja julkaisun tarkistuslistan kohta 4 sanoo
suoraan: *"Kulttuurivisa aukeaa saapumiskortilta ja sen aihe löytyy
aiheista."* Näissä neljässä aihe oli vain maalehden puolella:

| Kaupunki | Mitä puuttui |
| --- | --- |
| Pariisi | patonkikilpailu vain Matkaoppaan popupissa, ei lehden sivuilla |
| Lontoo | sanaa "höyry" ei ollut kaupunkilehdessä kertaakaan |
| Dublin | uilleann, säkkipilli, palje — ei yhtään osumaa |
| Budapest | ei ruoka-aihetta eikä sanaa gulyás lainkaan |

Jokainen sai v913:ssa kaupunki-sivulleen neljännen noston, joka kantaa
visan opettavan tiedon. **Visakysymysten tekstiin ei koskettu** —
se on Fablen kaanonia (docs/roolitus.md).

Tarkistettiin myös, ettei tämä riko Raamatun SPOILERISÄÄNTÖÄ. Ei riko:
sääntö on osiossa "Kirjoittajan säännöt (matkakirjatekstit)" ja koskee
päiväkirjatekstejä ja aarrevisaa, ei kaupunkilehteä.

### Mikä jää Fablelle: Dublin ↔ Irlanti -päällekkäisyys

Irlannin maalehden minitehtävä (`js/packs/maa-kategoriat.js`, IRL,
Musiikki-aiheen `tehtava`) kysyy **"Miten uilleann-pilliin saadaan
ilma?"** — käytännössä saman kuin Dublinin kulttuurivisa
(`js/packs/europe-kulttuuri.js`, `dublin.kysymys`): *"Miten
irlantilaiseen uilleann-säkkipilliin saadaan ilmaa?"*

`docs/moduulit/kaupunkilehti.md` rivit 319–324 kieltävät nimenomaan
tämän: *"Minitehtävä osuu kaupungin omaan kulttuurivisaan… Tarkista
aina kaupungin kysymys-kenttä ennen kuin hyväksyt tehtävän."*

Molemmat ovat tarinatekstiä, joten Opus ei koskenut kumpaankaan.
Korjaus on joko minitehtävän vaihtaminen toiseen Irlanti-aiheeseen tai
Dublinin visan vaihtaminen — kumpi tahansa on Fablen päätös.

### Sivuhavainto: rajatapaus Kreeta

Kreetan visan oikea vastaus on *"noin 4 000 vuotta"*, ja se on
pääteltävissä kategorian johdannosta ("neljätuhatta vuotta sitten").
Vastauksen jälkiosaa "Euroopan vanhin kaupunkikulttuuri" ei kuitenkaan
sanota lehdessä missään. Ei korjattu — riittääkö tämä, on
kaanonikysymys.

---

## Venetsian Matkailijalle-osio: teksti valmis, etusivukuva kesken

*(Opus-rooli, 19.8.2026. Kesken jäänyt erä — tallennettu tähän, ettei
työ katoa kontin mukana.)*

### Tila

Teksti on **valmis ja faktat todennettu**. Kuvista neljä on hyväksytty,
etusivun myyntikuva puuttuu yhä.

Malli on Pariisin osio (docs/tyolista-opukselle.md): pystykuva
etusivulle, `taitto: 'opas'`, viisi jaksoa, ensimmäisessä kolmen kuvan
karuselli, `matkailu`-lohko ja `lahde`.

### Valmis teksti

Viisi jaksoa, 410–454 merkkiä kukin (Pariisissa 416–473). Jaksot on
kirjoitettu niin, etteivät ne toista lehden nostoja — puupaalut, acqua
altan sireenit ja MOSE, Muranon lasi, gondolin vinous, Canaletto,
cicchetit ja Vivaldi ovat jo sivuilla:

1. **Perille ja liikkeelle** — Ponte della Libertà (Miozzi 1932,
   avattu 1933, 3,85 km, ainoa autoyhteys), rautatieviadukti 1846,
   Piazzale Roma, vaporetto 210–220 / motoscafo 154 matkustajaa
2. **Osoite, jota ei löydä kadulta** — kuusi sestieriä nimineen ja
   nimien alkuperineen; talonumerot juoksevat kaupunginosittain, ei
   kaduittain, ja Castellossa yltävät lähelle 7 000
3. **Laguuni on isompi kuin kaupunki** — 126 saarta, 472 siltaa;
   Giudecca kuuluu Dorsoduroon, San Giorgio Maggiore San Marcoon,
   San Michele Castelloon; Buranolla viisi kaupunginosaa,
   Pellestrinalla neljä
4. **Tuhat vuotta tasavaltaa** — pääkaupunki 810–1797, La Serenissima,
   ensimmäinen kansainvälinen finanssikeskus (800-luku, huippu
   1300-luvulla), kuusi dogen neuvosmiestä yksi per sestiere,
   Napoleon 1797, Italia 1866
5. **Kuka täällä asuu** — kunta 254 850 (2021), centro storico 50 434,
   terraferma 177 621, muut saaret 26 795; vanhassa keskustassa
   ~120 000 vuonna 1980 ja 60 000 vuonna 2009; keski-ikä 48,6

`matkailu`-lohko on kirjoitettu kokonaan: viisi tähtiarvioitua
`parasta`, neljä `hyvaTietaa`, `parasAika`, neljä `kaudet`-vuodenaikaa
ja `linkit`. Vuodenaikojen lämpötilat on johdettu repon omista
normaaleista (js/packs/saatiedot.js: venetsia), esim. kevät 5–21 °C,
kesä 18–28 °C, syksy 7–23 °C, talvi 1–9 °C.

### Hyväksytyt kuvat (lisenssi ja tekijä todennettu, katsottu silmin)

| Paikka | Tiedosto | Lisenssi | Tekijä |
| --- | --- | --- | --- |
| jakso 1 | `Ponte della Libertà 10-19 1767.jpg` | CC BY-SA 4.0 | Chris Light |
| jakso 1 | `Vaporetti Venice Lagoon.jpg` | CC BY-SA 4.0 | Peter K Burian |
| jakso 2 | `Calle dei albanesi a san polo plaquette.JPG` | CC BY-SA 3.0 | Abxbay |
| jakso 3/4 | `View across the lagoon to St Mark's Square, Venice (2024).jpg` | CC BY-SA 4.0 | Paul Colin Hennig firstdorsal.eu |
| jakso 5 | `Courtyard and colourful houses in Burano (50415863808).jpg` | CC BY 2.0 | Jorge Franganillo |

### Mikä puuttuu ja miksi

**Etusivun pystykuva.** Omistajan kaava (docs/tyolista-opukselle.md,
16.8.2026) on tiukka: yksi aihe joka täyttää ruudun, paikan oma
erikoisuus, mieluiten Commonsin Quality image, rauhallinen tausta,
pääaihe keskellä tai alavasemmalla — ja kuva näkyy vain 272 pikselin
levyisenä. Neljä ehdokasta hylättiin:

- `20110722 Venice Santa Maria della Salute 4459.jpg` — kaunis ja
  pystysuora Quality image, mutta etualalla gondolieeri kasvot kameraan
  ja matkustajia, portailla väkeä
- `Bridge of Sighs (50427150483).jpg` — klassinen aihe, mutta
  kanavanäkymä eikä yksi aihe, kaukosillalla ihmisjoukko ja taivas
  litteän harmaa; 272 pikselissä ei olisi wow-efektiä
- `Venice, Rialto Bridge (SW) 6.jpg` ja
  `Venice, San Marco, Rialto Bridge (NE).jpg` — molemmissa
  tunnistettavia ihmisiä etualalla

Pariisissa meni kolme yritystä tähän samaan kohtaan, joten tämä
kannattaa tehdä rauhassa eikä hätäisesti. Ehdotan seuraavaksi
kokeiltavaksi yksinkertaisia pystyaiheita ilman ihmisiä: yksittäinen
gondolin rautakeula (ferro), raidalliset kiinnityspaalut vastavalossa,
tai Canal Grande tyhjänä aamulla.

**Jakso 1 kolmas karusellikuva.** Piazzale Roman kuvat ovat
väistämättä täynnä busseja, autoja ja ihmisiä (`Piazzale Roma.JPG`
hylättiin: poliiseja kasvot kameraan). Kaksi kuvaa toimii karusellina,
mutta malli haluaa kolme.
