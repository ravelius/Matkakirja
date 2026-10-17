# Oranssi Ranska ISS-näkymässä (kamerapöytä iPad 17.10. 09.09): selvitys

Karttaseppä 17.10.2026, PT:n pyyntö. Todisteet: `proto-3d/lokit/todistus-kamerapoyta-ipad-198-20261017-0909/`.

## Syy: yökuoren aamuhämärän lämmin valo (varjostin), ei laatat, varapinta eikä simun lataus

- `Linssit/Unity/NousuFlare.cs` r. 97: `Aamu = AamuVoima * Clamp01((35 − |k|) / 10)` → täysi 0,7 aina, kun aurinko on < 25° Maan
  reunasta ISS:ltä katsottuna (Valoseppä efdff8c43, juna 196). `Yokuori.cs` r. 648 → `_AamuVoima`.
- `Resources/Varjostimet/Yokuori.shader` r. 487–494: koko maan pinnalle `(1, 0,42, 0,13) × kaista × 0,84`, kun pisteen auringon
  korkeus on −10° … +1° (huippu ~ −3°). Kaista ~1 100 km leveä. Kommentti tarkoitti "terminaattori erottuu horisontin lähellä",
  mutta ehto ei rajaa horisonttiin → 70°:n vinokatseella kaista täyttää koko näkymän.
- Kuvat (06.12 UTC): Britannia ja Benelux −1…−4° = oranssi; Essen/Leipzig jo > +1° = normaali. K1b vasen alakulma < −10° = yövalot
  mustalla. Pikselit (206,155,94)/(218,174,110) ≈ laskettu lisäys (237,160,93).
- Ei laatat: yökuori on läpikuultava kerros pinnan päällä; oranssi pysyy samana S2-, BMNG- ja kuvan pinta -vaihdoissa (lokirivit
  1494–1906). Yövalotiilet curlilla = simun välimuisti tavu tavulta. 45 Curl 28 -aikakatkaisua koskevat esilataajan kuvia, eivät pintaa.

## Laite vai simu
Deterministinen: sama laitteella aina, kun ISS on ±25° auringonnousun/-laskun kohdasta ja hämäräkaista on näkymässä.
Pelaajan oma kuva on oikein (kuvaputkessa `_AamuVoima` tulee `KuvanNousu`sta).

## Korjausehdotus (Valosepän alue, junaan 200)
`Yokuori.shader` r. 487–494: rajaa lämmin valo Maan reunalle, esim. `half reuna = (half)pow(1.0 - nv, 6.0);` (`nv` r. 402) ja
kerro sillä sekä oranssi lisäys että `a`:n kevennys → Ranskan kohdalla (nv ~0,4) < 5 %, horisontin hehku säilyy (junan 196 tavoite).
Karkeampi vaihtoehto: `NousuFlare.AamuVoima` 0,7 → ~0,15.
Varmistuskoe simulla: sama skenaario + `linssi astro kyyti aurinko aamu 0` ennen K0:aa → oranssi katoaa.

## Erillinen (Pelikoodari): S2-indeksin antimeridiaaniruudut
v2f:n 13 päivämäärärajan ruudun bbox −180…180 (60UXB, 60WWD, 1KAA–1LAJ) → osuvat Euroopan iss-kameran ruutulistaan;
PK:n koodikorjaus proto `pelikoodari/antimeridiaani-200` 27b4a5292. Ei selitä oranssia (oranssi näkyy myös S2-pinnalla
ennen kuvausta), mutta voi selittää "95 datatonta lehteä" ja Aasian indeksin latauksen Euroopassa. Generaattorin bbox-korjaus: KS:n jono.
