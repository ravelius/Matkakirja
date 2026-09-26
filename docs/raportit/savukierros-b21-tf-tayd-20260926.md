# TF 1.0.21 -täydennyskierros (26.9.2026, proto 8d4a48fd)

iPhone yksin (Z10-poltto käy täysillä ytimillä — ei iPadia rinnalle, ei aikamittauksia tulkittu).

## Tulokset

- **Maanosakorjaus (Jerusalem): PASS** — `aani aihe kaupunki jerusalem` → musa-saapuminen-lahi-ita-lyria.mp3
  soi oikein (Jerusalem ilman maata saa silti lähi-idän aluetunnuksen, kuten korjaus lupasi).
- **160 (Delfoi 3D-malli + kortti): löytyi ja toimii.** Kartalta löytyi "Delfoi"-nimiö (aja 38.48 22.50 1.5 1.5),
  napautus avaa täyden HISTORIA-kortin (kuva, "KOE IHME" -nappi, tarina, kysymykset, Livian leikekirja).
  "Koe ihme" avaa kauniin rekonstruktiokuvan (ei 3D-peliobjekti vaan still-kuva). EN vahvistanut erikseen
  "ei mustetäpliä 3D-mallin alla" -väitettä kartalta silmämääräisesti — kortti/still-näkymä peitti sen enkä
  löytänyt tapaa palata suoraan alla olevaan 3D-malliin ilman sovelluksen uudelleenkäynnistystä. Natiiviseppä
  ilmoitti korjanneensa tämän (natiivi-ui/jalki-mallin-alta) — luotan siihen, ei omaa kuvatodistetta.
- **158 (nostokortti/pikkukuva):** Delfoi-kortti näytti oikean valokuvan (ei pikkukuvavaraa), muoto ja
  koko normaalit — ei havaittua ongelmaa, mutta en mitannut korkeutta pisteinä (≤620 pt -vaatimus koski
  Natiivi-UI:n iPad-erää, en testannut iPadilla tällä kierroksella).

## 160 lisätodiste (Fablen ohjeella)

Fable täsmensi: `muste maakunnat GRC` ennen napautusta + kuva riittää, ei tarvitse paluureittiä. Ajoin
tuoreella pelillä: `muste maakunnat GRC` → `aja 38.48 22.50 1.5 1.5` (Delfoi), EI napautettu korttia.
Kuvassa Delfoin nimiö/malli näkyy tällä zoomilla vaaleana beigenä pillerinä + haalea vaaleanpunertava
ympyrä sen alla (sama molemmissa kuvissa 6 s:n välein, ei muutu) — **väri on selvästi vaalea/haalistunut,
ei musta tai tumma "mustetäplä"**. Tulkitsen tämän PASSiksi: ei näkyvää tummaa tahraa mallin alla.

## Ei ehditty (yhden simulaattorin rajoite + ajanpuute)

155 (tarkka 0,85-kynnysarvo), 156 (maakuntien veto/selain), iPad-erät (visa 2×2, maalehti kaksipalstainen,
sähke, nostokortti ≤620 pt), kuvat-kiinteät, yläpalkin vieritysrivi (Natiivi-UI:n oma resepti-kohta —
ks. laitetestaaja-reseptit.md, en testannut). Nämä vaativat joko iPad-vuoron (Z10:n jälkeen) tai enemmän
aikaa UI-navigointiin.

## Yhteenveto Fablelle
Uutta PASS: maanosakorjaus (Jerusalem). 160/158 näyttävät toimivan silmämääräisesti, ei täyttä
kuvatodistetta. Loput (155 tarkka arvo, 156, iPad-erät, kuvat-kiinteät, yläpalkin vieritys) yhä auki —
ehdotan iPad-vuoroa Z10-poltton jälkeen näille. Simulaattori sammutettu.
