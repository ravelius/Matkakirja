# Juoksupelin ääniefektien korvaukset (Äänittäjä 21.10.2026, PT:n pyyntö)
Paketti `juoksupeli-aanet-v4-korvaus-vienti-20261021` → ämpäri `juoksupeli/aanet-v4/` (9 ääntä + `manifest.json` jossa `korvaukset` ja `poista_v2`). Lähteet Soundly Pro (NAS-originaalit) ja Sonniss GDC; ei generointia; sokko-Gemini 3.1 Pro hyväksyi jokaisen (28 ehdokkaan 80 tapahtumaklipistä 11 sopi, 9 valittu); ääniportti läpi, huippu −6,5 dBFS. Kuuntelematta omistajan korvalla.

## Vertailu vanha → uusi
| tarve | vanha (aanet-v2) | ongelma | uusi (aanet-v4) | lähde |
|---|---|---|---|---|
| metalli-1 | Metal Bucket Impact 01 (SND112251), 5,6 s | Gemini: "laulukulho/kello kolme iskua", AST: kapula | metalli-k1 (1,4 s) Bucket Impact 02; k2, k3 Metal Bucket Big Impact, Ding Tail (SND46636) | Soundly |
| portti-3 | Doors Wood Front Open Internal (SND25226), 1,0 s | "napsahdus + tömähdys", Door ≤0,08 | portti-k1, k2 Wooden Gate Temple Close Rattling (SND46051) | Soundly |
| portti-4 | Doors Wood Open Creak 02 (SND8115), 0,4 s | "ovi auki ja kiinni", heikko | portti-k3 Wooden Metal Hinge Creaks (Jake Fielding, Squeaky Gates) | Sonniss |
| viitta-aktivointi-1 | Cloth Handle Shorts Throw (SND16745) = kaistanvaihto-1 (sama tiedosto) | kaksoiskappale | k1 Polyester Cloak Accelerate (SND129022), k2 ja k3 Jacket Synthetic Soft Shell Whoosh Flutter | Soundly / Sonniss |

## Kaksoiskappaleet (`poista_v2`; ämpäri on muuttumaton, joten peli lopettaa käytön, ei poistoa ämpäristä)
- `lasi-2`, `lasi-3` = `posliini-1`, `posliini-2` (keramiikka: kuuluvat posliiniin) → poista lasi-2/3.
- `posliini-3`, `posliini-4` = `lasi-4`, `lasi-5` (lasipullot: kuuluvat lasiin) → poista posliini-3/4.
- `viitta-aktivointi-1` = `kaistanvaihto-1` → korvattu k1–k3.
- Tulos: lasi 3 (lasi-1, -4, -5), posliini 2 (posliini-1, -2).

## Jäi vajaaksi
- **Posliini 2/5:** NAS:n Soundly-originaaleista (1 166) ja Sonnissista löytyi vain lasin kaltaisia osumia; Gemini kuuli keramiikkaehdokkaat lasina, rapinana tai hankauksena (Smashed Ceramics Debris, Tile Breaking, JSE Roof Tile, Eneas Mentzel, TheWorkRoom CUP). Lisää keramiikkaa vaatii Soundly-pilvihaun (GUI ei ole käytettävissä, kun omistajan Space on koko ruudun sovellus) – tai omistajan päätös hyväksyä posliinille lasimainen särkyminen.
- Lasia 3/5 sallittu rajalla; lasi-4/5 ovat pullolasia.
