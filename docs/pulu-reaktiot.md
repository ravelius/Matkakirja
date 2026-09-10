# Pulun reaktiorekisteri

*(Omistajan toimeksianto 10.9.2026: "fable voisi tehdä mahdollisimman
laajan selvityksen kaikista tilanteista ja kirjoittaa jatkossa tilanteet
suoraan ylös reaktioita varten". Raamattu: PULUN REAKTIOREKISTERI.
Elävä työväline — ei kertaraportti. Omistaja: Fable. Tekniset kytkennät
tekee tekstisessio tämän rekisterin puutelistasta.)*

## Käyttö

- Jokainen merkityksellinen pelitilanne saa rivin. Jokainen tekninen
  renderöinti ei ole tilanne. Pulu seuraa peliä ymmärrettävästi, mutta
  ei elehdi jatkuvasti eikä kilpaile tarinan tai puheen kanssa.
- Sisältö ei nimeä SVG-eleitä. Sisältöön merkitään semanttinen
  tunnetagi `{ tunne, voimakkuus }` (js/livia-tilanteet.js
  `ilmoitaLivianTunne(tagi, { lahde, tunnus })`). Sallitut tunteet:
  `utelias`, `lammin`, `ilo`, `hammastys`, `miettiva`, `vakava`,
  `ylpea`, `rakkaus`, `hammentynyt`, `jannitys`. Voimakkuus 0–1.
- Tekniset tilannetapahtumat (js/livia-tilanteet.js
  `ilmoitaLivianTilanne`): `narration/narrationEnd`, `card/cardEnd`,
  `photo`, `chatOpen/chatClose`, `microphone`, `answer`,
  `success/retry`, `emotion`, `waiting/waitingEnd`.
- **Tarkistuskohta (Raamattu):** uusi tai muuttuva kohtaus, kaupunki,
  linssi tai käyttöliittymätila ei ole valmis ennen kuin sen tilanteet
  on kirjattu tänne ja tunnetagi on merkitty sisältöön samassa
  muutoksessa.

## Toimituslinja (Fable)

- Pulu on Livia: utelias, lämmin, hieman nokkava; vakava synkässä
  tarinassa. Voimakkuus tavallisesti 0,3–0,6; ≥ 0,7 vain suurissa
  hetkissä (aarteen löytö, Venetsian rakkaus, ensimmäinen saapuminen
  uuteen maanosaan, linssin huippukohta).
- Kertojan luennan aikana pulu kuuntelee (tekninen `narration`), ei
  reagoi tarinan tunteisiin päälle. Tunnetagi laukeaa kuplan tai
  jakson alussa, ei kesken puheen.
- Odotus, kortti ja taustaele eivät saa käynnistää ristiriitaisia
  reaktioita; vanhentunutta elettä ei jonoteta. Hiljennys ja vähennetty
  liike huomioidaan teknisessä kerroksessa.

## Rivin muoto

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |

Tila-sarake: **D** dokumentoitu · **M** merkitty sisältöön · **K**
teknisesti kytketty · **T** testattu pelissä. Tunne `—` = perusteltu
hiljaisuus (syy Ajoitus-sarakkeeseen). ID on pysyvä muotoa
`alue.tilanne` (esim. `saapuminen.kaupunki.alku`).

## Rekisteri

*(Kartoitus työn alla 10.9.2026 — osiot täytetään Opus-parven
kartoituksesta ja Fablen katselmuksesta.)*

## Puutelista (priorisoitu)

*(täytetään kartoituksen jälkeen)*
