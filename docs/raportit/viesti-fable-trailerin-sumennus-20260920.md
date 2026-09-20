# Opus → Fable: saapumistrailerin sumennus (savuke-pollon punaiset)

20.9.2026 klo 09.10. Haara `opus-local-trailerin-sumennus` (pohja
origin/v1973-prep, 36f29c27). Ei versionostoa, ei PR:ää.

Tilaus: *"saapumistrailerin sumennus blur(6px) jää kartalle
dialogin/pöllöpaneelin sulkeuduttua"* — kuusi punaista savuke-pollossa,
kaikki `kerroksia: 1` ja ensimmäinen niistä kertoi kerroksen nimen:
`saapumistraileri`.

## MITTA OLI VÄÄRÄSSÄ HETKESSÄ, EI TUOTE VÄÄRÄSSÄ

Tein erillisen kokeen (Chromium 390 × 900, sama avaus kuin savukkeessa):
saapumisen jälkeen luin viiden mittauspisteen ajan, onko
`.saapumistraileri` DOMissa, onko `ui.saapumistraileri` elossa ja
montako sumentavaa kerrosta ruudulla on.

| hetki | traileri DOMissa | sumentavia kerroksia |
|---|---|---|
| heti saapumisen jälkeen | kyllä | 0 (kuvat eivät vielä sumenna) |
| +5 s | kyllä | **1 (`saapumistraileri`)** |
| +10 s | **ei** | **0** |
| +15 s | ei | 0 |
| +30 s | ei | 0 |

Traileri siis sumentaa kartan **tarkoituksella** noin 5…10 sekunnin ajan
(`css/saapumistraileri.css`: `backdrop-filter: blur(12px) saturate(0.9)
brightness(0.82)`) ja **poistaa sitten itsensä** kokonaan
(`js/saapumistraileri.js` `piilotaSaapumistraileri` → `kehys.remove()`).
Kartalle ei jää mitään.

Savuke mittasi sumennuksen heti pelin avauksen perään — eli kesken
trailerin — ja luki sen kartalle jääneeksi virheeksi. Kuusi punaista oli
siis sama asia kuudesti: mitta oli väärässä hetkessä.

Mittaus ei myöskään ollut aiemmin näkyvissä: ajo kaatui aina
kuvapopupiin ennen tätä osiota, ja koko osio ajautui ensi kertaa vasta
eilisen korjauksen jälkeen.

## Korjaus (tools/savuke-pollo.mjs)

Uusi apuri `odotaTraileriPois(sivu)`: odottaa enintään 20 s, että
`.saapumistraileri` on poissa DOMista, ja ohittaa viipyvän trailerin
napauttamalla — täsmälleen kuten pelaaja tekee. Sitä kutsutaan kahdessa
kohdassa:

1. heti sumennusosion pelin avauksen jälkeen,
2. `reload()`in jälkeen, koska päivitys palauttaa tallennetun pelin ja
   traileri soi uudelleen.

Tuotteeseen ei koskettu.

## Vartiot

- `tools/savuke-pollo.mjs`: **234 OK**, ja kaikki kuusi sumennuspunaista
  ovat vihreitä:

  ```
  OK  kartalla ei ole sumennusta kun mikään ei ole auki
  OK  dialogin sulku poistaa sumennuksen
  OK  pöllöpaneeli aukeaa eikä sumenna karttaa
  OK  pöllöpaneelin sulku ei jätä sumennusta — {"piilossa":true,"kerroksia":0}
  OK  päivityksen jälkeen kartalla ei ole sumennusta — {"kerroksia":0,…}
  OK  sumennuskoe ei kirjoita konsoliin
  ```

  Punaisia oli ennen tätä erää 16, nyt **11** — kaikki jäljellä olevat
  ovat muita vikoja (ks. alla).
- `node --test tests/*.test.mjs`: **3 746 testiä, 0 punaista**.

## Mitä jäi tekemättä

- En koskenut muihin savukkeen punaisiin. Jäljellä (11):
  1. `alanappirivi on kapea puhelimella` — 345 / 390 px
  2. `kartan bittikartta on näkymän tarkkuudessa` — suhde `null`
     (`ui.taideSkaala` puuttuu mittaushetkellä)
  3.–6. paneelin reunavälit puhelimella ja tabletilla (vasen 12 /
     oikea 54; kartta ei näy sivuilta)
  7. `valittavat kohteet korostuvat kartalla` — move-vaiheessa
     kohteita 0
  8.–11. vihjekupla ei ilmesty hiljaisuuden jälkeen
  Nämä ovat eri vikoja, ja tilauksessa oli vain sumennus.
- Trailerin kestoa (noin 10 s) ei muutettu; se on tarkoitettu näkymä.
