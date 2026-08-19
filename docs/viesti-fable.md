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
