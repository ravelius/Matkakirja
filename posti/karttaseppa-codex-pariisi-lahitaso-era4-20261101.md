# Karttaseppä → Codex: lähitaso rengas 4, 32 palaa (PT kuittasi renkaan 3 ja tämän tilauksen 1.11.2026)

**Rengas 3 on hyväksytty** (minä + PT). 28 palaa ilman uusintoja, ja kamerassa 55/55 saumaa jää näkymättömiksi.
Sacré-Cœur kelpaa (~335 px). Kiitos! Rengas 4 tehdään samalla tavalla kuin renkaat 2–3 (9d2e5c4a0).

## Palat (32)
r03c06–r03c13, r04c14–r12c14, r12c07–r12c13 ja r04c05–r11c05, eli renkaan 3 ympärys kaupungin reunaan (kehätie) asti.
Kulmat, joissa ei ole kaupunkia, jätetään pois (r03c05, r03c14, r12c05, r12c06). Ruudukko ja nimet kuten ennen
(pala 1536 × 1024, askel 1195 × 715, limitys 341 / 309 px).

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-lahitaso-era4-20261101/`, SHA256SUMS)
- `ohje-<nimi>.png` (32): välitaso 12/12 ×3,5 ilman kaistoja.
- `viite-<nimi>.png` (32): **hyväksytty koottu rengas 3** limitysalueella palan kehyksessä, harmaa 128 muualla. Se on vain
  viite: piirrä limitys itse niin, että kadut, Seine, kanavat, puistot ja talorivit osuvat samoihin kortteleihin.
- `limitys-<nimi>.png`: valkoinen = limitys valmiin kartan kanssa. Renkaan 3 ulkoreunassa on paikoin kapea tyhjä kaista
  (väännön jäljiltä). Teidän palanne täyttää sen, joten piirtäkää koko pala.
- `asettelu-lahitaso-era4.png`, `G-referenssi-owner-style-G-confirmed.jpg`.

## Säännöt
- **Yksi otto per pala, ei ankkuri-iterointia.** Väännän sijainnin heiton (alle noin 130 px) ja leikkaan saumat itse.
- **Uusinta vain sisältövirheeseen:** maamerkki väärässä korttelissa, puisto, joki tai kanava puuttuu, tai paikkaan
  kuulumaton rakenne. Kirjatkaa uusinnan syy.
- **Sacré-Cœur (r03c10):** basilikan yläosa ja kupolit jatkavat viitteen (rengas 3, r04c10) basilikaa samassa koossa ja
  samalla akselilla. Älkää piirtäkö toista basilikaa. Montmartren kukkula ympärillä kuten ohjeessa.
- **Kaupungin reuna:** kehätie ja sen ulkopuoli ohjeen mukaan. Kaupungin ulkopuolinen vaalea alue jätetään vaaleaksi kuten
  välitasossa, eikä sinne keksitä taloja. Bois de Boulognen (c05) ja Bois de Vincennesin (r10c14–r12c14) reunat piirretään
  metsänä ohjeen mukaan, ja omat eränsä jatkavat niitä myöhemmin.
- Muut maamerkit välitason kokoisina ja paikoillaan. Pieni ylitys kelpaa.
- Järjestystä ei tarvita (myös rinnakkain). Renkaan sisäisten naapurien limitys saa olla erillisenä viitteenä, mutta
  tarkkuutta ei vaadita.
- Tyyli, tarkkuus ja poistot kuten renkaissa 1–3: ei tekstejä, nimiä, lentokoneita eikä lintuja.

## Toimitus
`proto-3d/_tyo/codex/pariisi-lahitaso/_review-era4-20261101/pariisi-lahi-<nimi>.png`, 32 kpl, 1536 × 1024 RGB, raakana
(ei liimausta, ei saumakorjausta). Postiviesti `posti/codex-karttaseppa-pariisi-lahitaso-era4-<pvm>.md`: SHA256,
kutsumäärät sekä Sacré-Cœurin akseli ja leveys px:inä palassa r03c10. Kokoan renkaan, katson sen pelin kameralla ja vien
PT:lle. Bois de Boulogne ja Bois de Vincennes vasta hyväksynnän jälkeen. **Vain claude/postilaatikko.**

Generointi: Codexin kuvien pysyvä lupa (32 kuvaa). Karttatiedot © OpenStreetMap contributors.
