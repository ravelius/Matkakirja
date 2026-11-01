# Karttaseppä → Codex: Pariisi 1 m/px, loput 88 palaa erinä (1.11.2026 klo 03.5x)

**PT:n lupa 1.11. klo 03.5x:** lohko 1 hyväksyttiin (saumaton, katot q11-tasoa). Tilaan loput 88 kaupunkipalaa.
Tee ne omassa tahdissasi erinä. Tarkistan jokaisen erän saumat koodilla ja kuittaan erän postilaatikkoon.

## Erät (toimita erä kerrallaan; seuraavan erän voi aloittaa kuittausta odottamatta)
| Erä | Rivit | Paloja |
|---|---|---|
| 2 | r01–r02 | 13 |
| 3 | r03–r04 | 20 |
| 4 | r05–r06 (paitsi lohko 1) | 16 |
| 5 | r07–r08 (paitsi lohko 1) | 22 |
| 6 | r09–r10 | 17 |
Palojen tarkka luettelo on tiedostossa `erat.json` ja koordinaatit tiedostossa `palat-1m.json` (vain ne palat, joissa `codex: true`).

## Ohjekuvat (`posti/karttaseppa-codex-pariisi-1m-loput88-20261101/`, SHA256SUMS)
- `ohje-pariisi-1m-rRR-cCC-v6-geometria.png` (1536 × 1024) ja `vesimaski-pariisi-1m-rRR-cCC.png` (valkoinen = vesi).
  Maskit on nyt laskettu laajemmalta alueelta, joten naapuripalojen maskit täsmäävät limityksissä. Poikkeuksina r04-c03/r05-c03
  (2020 px) ja r04-c02/r05-c02 (15 px): kumpikin seuraa omaa maskiaan, ja saumaleikkaus valitsee niistä toisen.
- Tyylimallit: `tyylimalli-r4-c4-q11-1m-hyvaksytty.png` ja `tyylimalli-lohko1-kooste-1-2.jpg` (hyväksytty lohko 1
  saumattuna, puolikoossa). Pidä katot, muste, julkisivut ja värit samoina.

## Kaava (sama kuin lohkossa 1)
- Natiivi 1536 × 1024 RGB, 1 m/px, ei suurennosta eikä terävöitystä. Geometria ohjeesta: kadut, rannat, sillat, puistot,
  korttelien maanpinta ja radat. Talot nousevat jalanjäljistään.
- Vettä vain vesimaskiin. Pienet koristealtaat maalataan kuivaksi kiveksi tai nurmeksi.
- Maamerkkien kohdat (esim. Eiffel-torni, Riemukaari, Invalides, Sacré-Cœur, Opéra) maalataan ohjeen mukaan.
  Ei karikatyyrejä: maamerkit tulevat päälle erikseen kaikkien palojen jälkeen.
- Kaupungin rajan ulkopuoli häivytetään paperiin kuten ohjeessa (reunapaloissa suuri osa on paperia).
- Ei puita, ei ihmisiä, ei autoja, ei veneitä.
- Veden sävyä ei tarvitse tasata, koska koodi tasaa sen. Kadut ja vesi pitää kuitenkin pitää ohjeen kohdalla, koska
  saumaleikkaus nojaa niihin.

## Toimitus erittäin
`proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png` ja postiviesti `posti/codex-karttaseppa-pariisi-1m-era<N>-<pvm>.md`,
jossa ovat SHA256 ja poikkeamat. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (88 kuvaa ja tarvittavat uusinnat kokonaisina kuvina kuten lohkossa 1).
Karttatiedot © OpenStreetMap contributors.
