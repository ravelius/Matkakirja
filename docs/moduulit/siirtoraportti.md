# Siirtoraportti: mitä siihen kuuluu ja mihin se tallennetaan

Sessio päättyy aina kesken. Session raja täyttyy, omistaja pyytää
resetin, malli tai kone vaihtuu — ja seuraava sessio aloittaa
tyhjästä. Kaikki, mitä se ei lue kirjoitettuna, on mennyttä.
Siirtoraportti on se kirjoitus.

Tämä ohje kokoaa yhteen, mitä siirtoraportin on **aina** sisällettävä
ja mihin se tallennetaan. Ohje on koottu kaikista tähänastisista
siirto- ja luovutusraporteista (`docs/raportit/siirto-*.md`,
`docs/raportit/viesti-fable-luovutus-*.md`,
`docs/raportit/fable-tilanne-*.md`, 24.8.–19.9.2026): mukaan on otettu
se, mikä toistuu joka kerta, ja se, minkä puuttuminen on maksanut
seuraavalle sessiolle aikaa.

Yhden lauseen sääntö: **siirtoraportti kertoo tilan ja keskeneräisen,
Raamattu kertoo linjaukset.** Pysyvät säännöt kirjataan Raamattuun ja raportti viittaa niihin (Raamattu 7.43).

## 0. Pituus ja lukeminen (omistaja 14.10.2026 klo 22.4x, kortti "Aloitus")

- Luovutus on enintään 60 riviä; pitkä aineisto tiedostoon ja luovutukseen vain polku. Roolin aloituksen lukulista, peruttu työ ja 8 %:n tavoite: Raamattu 7.22, 7.24 ja 7.37.

## 1. Mihin se tallennetaan

**Polku:** `docs/raportit/viesti-fable-luovutus-<pvm>.md`, missä
`<pvm>` on `YYYYMMDD`. Sama polku: Raamattu 7.37.

- Useampi luovutus samana päivänä: lisää vuorokaudenaika loppuun,
  `...-20260918-ilta.md`. Näin on tehty ja se toimii.
- Työsession (Opus/Sonnet, agentti) erä- tai tilanneraportti on eri
  asia: `docs/raportit/viesti-fable-<aihe>-<pvm>.md`.
- **Älä kirjoita `docs/viesti-fable.md`:hen.** Se on vanha polku, ja
  se kaataa `tests/dokumentit.test.mjs`:n — `docs/`-juuren
  ohjedokumentti pitäisi olla Raamatun kartalla, eikä kertaraportti
  kuulu kartalle.
- `docs/raportit/` ja `docs/arkisto/` ovat tarkoituksella kartan
  ulkopuolella. Siksi siirtoraporttia **ei** lisätä Raamatun
  ohjedokumenttikarttaan; tämä ohje sen sijaan on kartalla.
- Raportin näyttökuvat: `docs/raportit/kuvat/`. Muuta mediaa ei
  repoon (media → R2).

**Haara:** raportti committoidaan ja pushataan omalle työhaaralle
ennen session päättymistä — ei koskaan pelkkään paikalliseen
työpuuhun. Pushamaton raportti katoaa kontin tai koneen mukana.
Jos raportti on ainoa muutos, se ei nosta versionumeroa.

## 2. Milloin se kirjoitetaan

- Kun sessio päättyy tai resetoidaan (session raja, omistajan pyyntö,
  mallin tai koneen vaihto).
- Kun rooli siirtyy sessiolta toiselle, vaikka työ jatkuisi heti.
- Päivän päätteeksi, jos sessio jatkuu — silloin riittää tilannekuva
  samassa tiedostossa.

**Kirjoita raportti ennen kuin konteksti on täynnä.** Useassa
tapauksessa raportti on jouduttu kirjoittamaan hädissään lopussa, ja
juuri silloin unohtuvat pushaamattomat haarat ja kesken jääneet
agentit. Kun tila on selvä, kirjoita se ylös heti.

## 3. Pakolliset osiot

Nämä kymmenen ovat mukana joka kerta. Muu on lisää.

### 3.1 Otsikko ja tunnistetiedot
Kuka luovuttaa, kenelle, päivämäärä **ja kellonaika aikavyöhykkeineen**
(Suomen aika, tai UTC merkittynä). Jos sessio jatkaa edellisen työtä,
mainitse edellisen raportin tiedostonimi.

### 3.2 Lue ensin
Numeroitu lista luettavista, tärkein ensin: `CLAUDE.md`,
`docs/roolitus.md` ja **Raamatun osiot nimeltä lueteltuina** (esim.
"luku 12: MAC STUDIO: UUDEN SESSION ALOITUS", "luku 1: AGENTIT VAIN OPUS JA SONNET"). Pelkkä "lue Raamattu" ei riitä: se on 14 lukua. Nimeä ne osiot, jotka ovat muuttuneet tai koskevat kesken
olevaa työtä.

### 3.3 Tila
- `main = vNNNN` **ja** commit-SHA tai PR-numero. Tämä on raportin
  tärkein yksittäinen rivi.
- Tässä vuorossa julkaistut versiot taulukkona: versio | PR | sisältö
  yhdellä rivillä. Taulukko on nopein tapa nähdä, mitä on jo tehty.

### 3.4 Pushatut mutta julkaisemattomat haarat ja avoimet PR:t
Haaran nimi, mitä siinä on, ja mitä sille pitää tehdä. Tästä puuttuva
haara on käytännössä kadonnut työ.

### 3.5 Kesken — tee nämä ensin
Tärkeysjärjestyksessä, ei aikajärjestyksessä. Jokaisesta kohdasta:
mitä on tehty, mitä puuttuu, mistä jatketaan (tiedosto, haara,
komento). Kirjaa myös **keskeytyneet agentit ja se, onko niiden työ
committoitu** — worktreet ja scratchpadit katoavat resetissä.
Kirjaa myös **avoimet Codex-viestit** (posti/codex-<rooli>-*, joihin ei ole vastattu
tiedostolla <rooli>-codex-<aihe>-*): tiedosto, SHA ja mitä vastaukseen tarvitaan
(omistajan kortti 17.10.2026 klo 07.25).

### 3.6 Odottaa omistajan päätöstä
Erillinen osio, ei kesken-listan sekaan. Jokaisesta: kysymys,
vaihtoehdot ja oma suositus. Näin seuraava sessio osaa kysyä
kysymyskortilla eikä päätä itse.

### 3.7 Voimassa olevat työtavat
Vain viittauksina Raamatun osioihin ja `docs/roolitus.md`:hen, ja
lyhyt lista siitä, mikä on **tässä vuorossa muuttunut**. Älä kopioi
sääntöjä uudestaan raporttiin: kaksi kopiota eriytyy, ja rikkinäinen
puhelin on kaikkein pahin.

### 3.8 Julkaisukaava
Kirjoita komentoketju sellaisena kuin se tällä hetkellä ajetaan
(`git fetch origin main` → `uusi-versio.mjs` → testit → portit →
`build-standalone.mjs` → commit → push → PR → CI vihreä → squash-merge
→ oman haaran synkkaus). Kaava elää, joten raportissa on se versio,
joka toimi tässä vuorossa. Varsinainen lähde on
`docs/roolitus.md`:n "Julkaisusäännöt".

### 3.9 Ympäristö ja infra
Se, mitä ei voi päätellä reposta ja mikä on muuttunut:
työkansio ja kone, CI-runnerit ja niiden nimet, ämpärin (R2) tila ja
ajankohtaiset tunnisteet, **missä avaimet ovat** (nimet, ei koskaan
arvoja), sekä rutiinit ja ajastukset, jotka poistuvat session mukana ja
pitää perustaa uudelleen (trigger-id mukaan).

### 3.10 Avoimet velat ja opetukset
- **Velat:** pienet kirjatut mutta korjaamattomat asiat numeroituna.
  Numerointi on tärkeä, koska omistaja valitsee niistä numerolla.
- **Opetukset:** mikä maksoi tässä vuorossa aikaa ja miksi. Tämä on
  ainoa osio, joka estää seuraavaa sessiota tekemästä samaa virhettä.
  Kirjaa myös kumotut hypoteesit — "mittasimme, ja arvaus oli väärä"
  säästää saman mittauksen.

## 4. Aloitusviesti uudelle sessiolle

Raportin **viimeinen osio on valmis aloitusviesti**, jonka omistaja
liittää uuden session ensimmäiseksi viestiksi.

**Se annetaan aina yhtenä koodilohkona** (Raamattu, osio
Ohjedokumenttien kartta, omistajan linjaus 19.8.2026) — ei juoksevana
tekstinä eikä vaakaviivoin rajattuna, jotta omistajan ympäristöön
tulee kopioi-nappi. Sama koskee vastausta, jossa prompti annetaan
omistajalle.

Aloitusviestissä on vähintään:

1. Rooli ja peli yhdellä lauseella, sekä repo ja työkansio.
2. Ensimmäinen komento (`git fetch` + `checkout -B <haara>`).
3. Luettavat: `CLAUDE.md`, `docs/roolitus.md`, tämä raportti nimeltä,
   Raamatun osiot nimeltä.
4. Sitovat säännöt viittauksina Raamattuun (agentit 7.10, haarat 7.7, kysymykset 7.27, kellonaika 12.8); AVOIN (ei Raamatussa): omistajan sanat Raamattuun sanatarkasti ASCII:na.
5. **Ensimmäinen tehtävä nimeltä** — ei "jatka siitä mihin jäin".
6. Vastauskieli ja -tyyli: suomeksi, tiiviisti.

## 5. Mitä raporttiin EI kirjoiteta

- **Avainten arvoja** (Raamattu 12.2, 12.5): vain nimet ja sijainti.
- AVOIN (ei Raamatussa): **omistajan sähköpostiosoitetta** ei mihinkään käyttötarkoitukseen; **mallin tunnistetta** ei committeihin, PR:iin eikä koodiin (Co-Authored-By-rivi: päätettävä).
- **Uusia linjauksia.** Ne kuuluvat Raamattuun; raportti viittaa.
- **Mediaa** — vain `docs/raportit/kuvat/` näyttökuville.
- `dist/`-kansiota tai muuta rakennettua.

## 6. Vanhenevat raportit

Siirtoraportti on kertaraportti: se vanhenee sinä päivänä, kun
seuraava kirjoitetaan. Raportteja ei arkistoida erikseen eikä poisteta
— ne jäävät `docs/raportit/`-kansioon aikaleimansa kanssa.

Jos sen sijaan kertaraportti on joskus siirretty `docs/`-juureen tai
`docs/arkisto/`-kansioon, sen alkuun kuuluu arkistointihuomautus
(`tests/dokumentit.test.mjs` valvoo tätä).

## 7. Tarkistuslista ennen pushia

- [ ] Tiedosto on `docs/raportit/viesti-fable-luovutus-<pvm>.md`
- [ ] Otsikossa päivä, kellonaika ja aikavyöhyke
- [ ] `main = vNNNN` ja SHA/PR näkyvissä
- [ ] Julkaistut versiot taulukkona
- [ ] Jokainen pushattu haara ja avoin PR mainittu
- [ ] Kesken-lista tärkeysjärjestyksessä, jokaisessa "mistä jatketaan"
- [ ] Omistajan päätöstä odottavat omassa osiossaan suosituksineen
- [ ] Raamatun osiot nimeltä, ei sääntöjen kopioita
- [ ] Ympäristö: runnerit, ämpäri, avainten sijainnit, rutiinit
- [ ] Velat numeroituina, opetukset kirjattuina
- [ ] Aloitusviesti yhtenä koodilohkona, ensimmäinen tehtävä nimeltä
- [ ] Ei avainten arvoja, ei sähköpostia, ei mallin tunnistetta
- [ ] Committoitu ja **pushattu**
