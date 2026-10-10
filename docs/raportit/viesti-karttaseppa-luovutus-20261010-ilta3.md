# Karttasepän luovutus 10.10.2026 ilta 3 (noin 21.1x, PT:n nollaus 50 %)

Edellinen luovutus: `viesti-karttaseppa-luovutus-20261010-ilta2.md`. Tilamuisti on `karttaseppa-tila-20261010-ilta`, ja sen loppurivit ovat illan loki.

## 1. KESKEN: kartan kokonaistarkistus (PT 20.5x, omistajan painopiste: Olavinlinna, kippi, taidemuseo ja KARTTA)

Vikalista: `proto-3d/_tyo/karttaseppa/kartta-tarkistus-20261010/VIKALISTA.md`, koneluettava `viat-v656.json` ja työkalu `kartta-tarkistus.py` (T7 `tarkistus/`). Mediatarkistus: `media-puuttuvat-v656.txt` (506 / 20 031 osoitetta 404).

**Karttasepän järjestys (PT 20.5x):**
1. **A4 Ahvenanmaa FIN:iin + A1 Alpit ja Borneo: TEHTY, COMMIT 804efc70e haarassa `karttaseppa-ahvenanmaa`** (worktree `/Users/Shared/Claude/wt/karttaseppa-ahvenanmaa`), EI pushattu eikä PR:ää tehty.
   - `tools/generoi-maapolygonit.mjs` `ahvenanmaaSuomelle()`: NE ALD liitetään FIN:iin. Vain FIN-rivi vaihdettiin maapolygonit.json:iin (37 → 48 rengasta). Uudelleengenerointi muutti myös 43 muuta maata (ajelehtimista), joten ne pidettiin TAVULLEEN ennallaan.
   - `js/packs/maailmankartta-pallopisteet.js`: alpit 46,55/7,98 ja borneo −1,0/113,9 (PT hyväksyi A1:n 20.5x: kartta oikein ohittaa 7.9:n "laudan oma piste" -ratkaisun). `tests/kaupungit-maissa.test.mjs`: alpit ja borneo pois poikkeuksista, ja testi menee läpi.
   - **Seuraavaksi:** `npm test` koko ajona (taustalla ollut ajo katkesi nollaukseen), sitten push ja PR (ei versionostoa), Julkaisija mergeää ja vie. node_modules on symlinkki Matkakirja-fableen, ei committoida. `.nevalimuisti/` on kopioitu worktreehen.
2. **A5 pienet saaret rajoihin: PROTO MITATTU, ei tehty.** generoi-maapolygonit `MIN_KOKO` 3 → 0,6 ja sälesaaret vinoneliöiksi (kuten MINIVALTIOT). Lisäksi vain uudet pienet renkaat lisätään alkuperäisiin (622 rengasta; maapolygonit.json +1,0 %, 2,885 → 2,915 Mt) ja `tools/vienti/maarajat.mjs` tol = min(0,05°, laajuus/4) kaikille renkaille (maarajat +8 %, 1,075 → 1,158 Mt). Korjaa 12 kohdetta (Kihnu, Heimaey, Stromboli, Bandasaaret, Fidžin ja Salomonsaarten kohteita…). Loput 44 ovat merikohteita (hylyt ja Ekofisk) tai 5 km:n rannikkoyleistystä (Harper, Angoche) eivätkä ole vikoja. → Kysy PT:ltä, onko +8 % maarajoissa ok, ja tee erillinen PR. Koeajon tiedostot olivat scratchpadissa, joten niistä ei jäänyt mitään. Toisto: `sed`-muutokset luovutuksen mukaan väliaikaiseen `tools/_koe-*.mjs`-tiedostoon.
3. **A6 ATA kevyenä alueena:** vain jos NUI tarvitsee (PT jakoi A6:n NUI:lle). 6 Etelämantereen karttavalossa on maa=ATA, jota ei ole maat-kokoelmassa.

**Muille jaetut (PT 20.5x):** A2 ladonta (Malta Sisiliassa 133 km, Versailles 110–130 km) ja B samannimiset kohde+nosto-parit → Pelikoodari. A3 väärä maa-kenttä (Tonava BGR suistossa jne.) ja C:n 7 kohtaamiskuvaa → Sisältökirjuri. C:n 375 Commons-peiliä → Julkaisija. 45 pulun eleet.json ja 5 linssimusiikkia → Pelikoodari. C6 Reykjavikin, Kotten ja Tunisin pääkaupunkikuvat puuttuvat → kuvatilaus Codexille vain PT:n luvalla.

## 2. Valmista tänä iltana (ilta2:n jälkeen)

- **Pyörimislinssi** (tauolla, omistajan päätös 20.5x): `_tyo/karttaseppa/pyoriminen-20261010/` sisältää korkeuden 4096×2048 Int16 (ETOPO1 1′), C(f)-taulukon LS2:n vakioilla (A 11 004,5 m) ja rantaviiva- sekä vesimaskikuvat.
- **Albedokalibroidut vertailuortot:** `_tyo/karttaseppa/vertailu/<kohde>/orto-albedo.jpg` (7 kohdetta, + Louvre ja Olavinlinna) ja luokittainen `albedo-luokat.json`. Työkalut T7 `vertailu/kalibroi.py` ja `luokat.py` sekä `vesimaski/s2-mediaani.mjs`. Raa'at ilmakuvat ovat 1,6–2,1 × albedoa kirkkaampia.
- **Peking** (tauolla): `vertailu/peking/albedo-luokat.json`. Pohjakuvan FC:n pihat on korjattu albedoon (`ls2/pohja-peking-1m.png` sha c8b1dd3c, vanha `ls2-ennen-fc-piha/`), ja kaikki luokat on tarkistettu (±6 %).
- **Pariisin sumennettujen korttelien paikkausaineisto** LR:lle: `_tyo/karttaseppa/sumennukset-pariisi-20261010/` (Palais Bourbon, Banque de France, Quai Branly ja Élysée). IGN maskaa Élysée- ja Alma-palatsit LiDARista (lidar_maskattu).
- **Olavinlinnan laiturin laatta:** syy on ulkokuori v25 (nykyinen vierasvenelaituri litistyneenä tasolle −7,5…−7,25). `_tyo/karttaseppa/olavinlinna-laatta-20261010/`. Ehdotus Siirtosepälle (discard y < vesi − 0,05 ja |ny| > 0,9).
- KIIRE NUI:lle: Marseillen, Nizzan ja Carcassonnen data on sama v651–v655.

## 3. Muuta

- Ei GPU-ajoja. Kone vapaa ma 12.10. asti. Pitkät ajot perl fork + setsid.
- Mediatarkistus tehtiin HEAD + `?t=` (ei myrkytä CDN:n välimuistia). R2-tunnuksia Karttasepällä ei ole.
