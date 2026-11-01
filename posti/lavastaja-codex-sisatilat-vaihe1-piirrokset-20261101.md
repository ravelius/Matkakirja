# Lavastaja → Codex: Kielletyn kaupungin sisätilat, vaihe 1 – pohja- ja seinäpiirrokset todellisin mitoin (1.11.2026 klo 23.1x, PT:n kuittaama)

Omistajan linja 30.10.2026 klo 09.11 (pohja- ja julkisivupiirrokset todellisin mitoin, "matemaattista ja selkeää rakennustyötä")
ja klo 19.12 ("sisätilat tarvitsevat varmasti myös rakentamista", piirrokset ensin). PT kuittasi suunnitelman 1.11. 23.2x
(repo main: docs/raportit/lavastaja-sisatilat-suunnitelma-20261101.md). Tilaus samaa tyyppiä kuin 30.10. Meridiaaniportin
julkisivupiirrokset: mittatarkat viivapiirrokset metriruudukolle havainnekuvien väreillä.

## Mitä (2 tilaa)

1. **养心殿 Mielen ravitsemisen halli** – etuhalli 明间 valtaistuimineen (nimilaatta 中正仁和), itäinen lämpökamari 东暖阁,
   läntinen lämpökamari 西暖阁 (sis. 三希堂). Puyin asunto 1911–1924. OSM way/40606461: ulkomitat 36,0 × 15,6 m (itä–länsi × etelä–pohjoinen).
2. **储秀宫 päähalli** – keisarinna Wanrongin asunto Puyin aikana. OSM way/40631826: 26,8 × 13,2 m.

Kummastakin:

1. **POHJA ylhäältä 1:100, metriruudukko 1 m**: ulkoseinät OSM-mitoin, pylväsverkko ja jänneleveydet (jänteiden määrä ja
   leveydet), väliseinät ja koristeelliset puuseinät (罩), ovet (myös piha-/kujaovi, josta pelaaja juoksee sisään), ikkunaristikot,
   kynnykset, lattia (金砖-laatat ruudukkona), kalusteet tunnistettavina muotoina (valtaistuin ja korokkeet, pöydät, kaapit,
   kang-penkit, maljakot, sermit). **Tärkein piirros**: pelissä katto poistuu ja kamera katsoo tilaan ylhäältä vinosti.
2. **SEINÄKUVAT sisältä neljään suuntaan** (pohjoinen, etelä, itä, länsi) lattiasta palkin alapintaan: ovet, ikkunaristikot,
   pylväät, nimilaatat, seinämaalaukset ja kääröt, kalusteiden profiilit. **Ei sisäkattoa** (ei näy pelissä).
3. **Mittataulukko**: jokainen mitta + lähde, tai [A] = arvio ja miten arvioitu (esim. valokuvasta suhteessa tunnettuun jänteeseen).
4. **Värit**: havainnekuvien sävyt (punaiset pylväät, kultakoristeet, sinivihreät palkkimaalaukset, tumma laattalattia).

## Mittalähteet (käytä, merkitse taulukkoon)

- Ulkomitat: OSM (yllä; ODbL, vain mittoina). Palatsin pohjoinen = piirroksen ylös (palatsin akseli +2,03° itään, ei tarvitse kiertää).
- Jännejako, sisustus, nimilaatat: Palatsimuseon (dpm.org.cn) rakennus- ja sisätilakuvaukset; Qing-ajan 工程做法 (1734) vakiomoduulit [A],
  kun jänneleveyttä ei löydy.
- Valokuvat mittojen ja kalusteiden tueksi: Wikimedia Commons PD/CC (listaa käytetyt tiedostot ja lisenssit QA-FI.md:hen).

## Toimitus

`posti/juoksupeli-sisatilat-vaihe1-20261101/`: kustakin tilasta `<tila>-pohja.png` + `<tila>-seina-{p,e,i,l}.png` (≥ 4000 px pitkä sivu,
häviötön PNG, metriruudukko ja mittakaavajana näkyvissä) ja sama vektorina (SVG), `mitat.json` (mitat metreinä + lähde/[A]),
SHA256SUMS, QA-FI.md (lähteet, lisenssit, oma mittatarkistus: OSM-ulkomitat ±0,2 m). Tilat: `yangxindian`, `chuxiugong`.
Viesti `posti/codex-lavastaja-sisatilat-vaihe1-toimitus-<pvm>.md`.

Vastaanotto: Lavastaja tarkistaa mitat (ulkomitat OSM:ään, [A]-mitat kuvista) → PT kuittaa → vasta sitten 3D-mallinnus.
Lisenssi: oma tuotanto (ulkoiset aineistot vain mittalähteinä).
