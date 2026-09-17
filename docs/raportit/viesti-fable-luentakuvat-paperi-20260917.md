# Viesti Fablelle: luentakuvat pienemmiksi, kuvateksti paperilla, Ohita, pikkukuvat

**Opus-agentti, 17.9.2026 klo 22.30 Suomen aikaa**
Haara `claude/bold-ride-vow4ki-luentakuvat-paperi` (origin/mainin päältä).
Raamattu: KARTTAUUDISTUKSEN PAATOKSET 35 + TARKENNUS. **Vaatii versionoston.**

## Tehty

1. **Kuvat pienempinä** (`css/fokusvirta.css`). Saapumisluennan isot kuvat
   (`.fokusvirta-isokuva-*`) — ne, jotka ruudulla näkyvät, kun kartan pikkupakka
   on PAATOKSET 31:n mukaan poissa. Katot 92 vw / 78 vh → **72 vw / 60 vh**
   (ruutu 66 vh, kotelo 72 vw). Mitattu 390 × 844 Pariisi: **367 px → 287 px,
   −21,8 %**.
2. **Valkoinen paperi kuvan alle** (`css/fokusvirta.css`, `js/fokusvirta.js`).
   `figcaption` on nyt itse paperi (sävy `#f7f1e2`, sama kuin valokuvan oman
   paperireunuksen; kuvan alareunasta poistettiin border, jotta paperi jatkaa
   sitä saumatta). Paperi alkaa **3 px kuvan alta** (negatiivinen ylämarginaali)
   ja on kuvan **takana** (z-index 0 vs. kuvan 1) → pyöristys osuu limityksen
   sisään, ei saumaan, millään dpr:llä. Mitattu limitys **13 px** (3 px marginaali
   + 6 px kuvan alareunus + pyöristys). Kuvateksti on paperin sisällä omana
   `span`-lohkonaan (`.fokusvirta-isokuva-selite`). Tekstin halo poistui — sitä ei
   enää tarvita, kun tausta on paperi.
3. **Ohita** (`js/fokusvirta.js` `ohitaSaapumisluenta`, `css/fokusvirta.css`).
   Pieni teksti ilman laatikkoa kuvan ja kuvatekstin alla; asuu päällyksessä
   (`.fokusvirta-isokuva`), ei yksittäisessä ruudussa, koska ruudut kasaantuvat
   pakaksi. Napautus käyttää **olemassa olevaa pysäytyspolkua**:
   `stopDiaryVoice(ui)` (js/luenta.js) purkaa pulun luentareaktiot
   (`audio.puraReaktiot`), pysäyttää jokaisen soivan luennan ja laitteen lukijan;
   `piilotaLuentakuvasarja` + `piilotaLuentakuva` vievät kuvat eivätkä jätä
   kartalle pakkaa. Uutta rinnakkaista tilaa ei ole: yksi lippu `ui.luennanOhitus`
   (kaupungin tunnus) estää pulun oman sarjan nousun jälkijunassa ja nollautuu
   itsestään seuraavassa kaupungissa. Matkakirjakorttiin ei kosketa, joten isoisän
   ja pulun tekstit jäävät luettaviksi.
4. **Pikkukuvat matkakirjan lopussa** (`js/fokusvirta.js`
   `paivitaMatkakirjanPikkukuvat`, `js/ui.js` `renderFact`/`uusiFactKey`,
   `css/fokusvirta.css`). Isoisän luentakuvat + pulun kuvat samassa järjestyksessä
   kuin isossa sarjassa, rivi heti `.fact-teksti-rivin` perään kortin omana
   lapsena. Napautus avaa **saman suurennoksen** kuin kartan luentakuva-nappi
   (`avaaSuurennos`, lyhyt teksti). Pienennetty kortti piilottaa rivin ilman omaa
   sääntöä: `.fact-card.pieni > *` (css/styles.css) hoitaa sen.

## Mittaus

`tools/savukkeet/mittaa-luentakuvat.mjs` (uusi), 390 × 844, Pariisin saapuminen,
verkoton ajo (ämpäri- ja Commons-osoitteet täytetään paikallisesti tehdyllä
1500 × 1000 PNG:llä, mp3 sijaisrungolla — mitattavat luvut ovat css:n, eivät
verkon). **16/16 vartiota läpi.**

| Mitta | Luku |
| --- | --- |
| Kuvan leveys ENNEN (92 vw / 78 vh) | 367 px |
| Kuvan leveys JÄLKEEN (72 vw / 60 vh) | 287 px (−21,8 %) |
| Paperin limitys kuvan taakse | 13 px (> 0, ei rakoa) |
| Paperin leveys | 283 px (98,6 % kuvan leveydestä) |
| Kuvateksti paperin sisällä | kyllä |
| Ohita kuvatekstin alapuolella | kyllä (top 588 px > paperin bottom 550 px) |
| Ohita → luenta pysähtyy | 2 ms (ääni pois, isot kuvat 0, pakka kartalla 0, kartta näkyy) |
| Pulun sarja ohituksen jälkeen | 0 solmua |
| Pikkukuvia auki-tilassa | 3 / 3 (= kuvien määrä) |
| Pikkukuvia pienennettynä | 0 |
| Pikkukuvan napautus → suurennos | avautuu |
| Sivuvirheitä | 0 |

Ennen/jälkeen mitataan **samassa ajossa**: vanhat katot kirjoitetaan hetkeksi
takaisin lisätyylillä ja sama kuva mitataan uudelleen — luku ei ole muistikuva.

Kaappaukset:

- `docs/raportit/kuvat/luentakuva-paperi-ohita.png` (kuva paperilla ja Ohita)
- `docs/raportit/kuvat/matkakirja-pikkukuvat.png` (matkakirja pikkukuvineen)
- `docs/raportit/kuvat/ohita-kartta-nakyy.png` (Ohitan jälkeen kartta)

`node --test tests/*.test.mjs`: 3572 läpi, 0 fail, 13 skip.

## Oletukset (omistajan päätettäväksi)

- **Paperin sävy** on `#f7f1e2` eli sama kuin valokuvan oman paperireunuksen —
  kuva näyttää liimatulta arkille. Jos omistaja tarkoitti matkakirjakortin
  paperin tarkkaa sävyä, se on yhden muuttujan vaihto.
- **Pienennys 72 vw / 60 vh** osuu haarukan (20–25 %) keskelle puhelimella
  (−21,8 %); työpöydällä korkeus ratkaisee ja ero on lähellä 25 %:a.
- **Pikkukuvien järjestys** on isoisä ensin, pulu perässä — sama kuin isossa
  sarjassa ja karusellissa.
- **Ohita sijaitsee** päällyksen alalaidassa (`bottom: max(3vh, 14px)`), ei
  kuvatekstiin kiinni, jottei se kallistu pakan mukana.
- Raamattuun, `sarjat.json`iin, `js/pallolauta/`-, `js/linssit/`- tai
  `js/kaupunkinosto.js`-tiedostoihin ei koskettu; tarinatekstejä ja kuvatekstejä
  ei muutettu.
