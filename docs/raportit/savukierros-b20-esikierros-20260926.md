# Build 20 -esikierros (26.9.2026, käännös aed733c9, juna 09:13)

Laitetestaaja, iPhone 18 Pro (1572C658…) päivällä (1 simulaattori riitti kohdille, iPad boottailtiin
mutta ei tarvittu erikseen). Peli suoraan `uusi-peli 1 ateena` -komennolla (ei intron kautta).

## Tulokset

- **A) Kylmä verho: FAIL/hidas** — ensimmäinen ei-musta kuva (aloitusverho) ilmestyi 7,6–8,9 s
  `simctl launch`:sta (näyte joka ~1,3 s, tarkkuus siitä kiinni). Ylittää 5,3 s -rajan selvästi;
  aiemmat mittaukset samalla laitteella olivat 4,1–6,1 s. Epäilen Mac Studion kuormaa mittaushetkellä
  (useita rooleja/simulaattoreita käynnissä) — suosittelen toistoa kun kone on rauhallisempi ennen FAIL-tulkintaa.
- **B) Marathon → Attiki pysyvä väri:** EI TESTATTU tällä kierroksella (vaatii Marathon-nimiön napautuksen
  kartalla, jätin ajanpuutteessa seuraavalle).
- **C) Lepopiirto verkottomassa tilassa: PASS** — `ui offline verkoton` + paikallaan + `pallo lepo` →
  "lepää" (ei syytä), piirretty 2–3/151 useilla peräkkäisillä kehysajat.jsonl-riveillä (yksi 20/151-piikki
  juuri offline-tilan päällekytkennän hetkellä, laski heti sen jälkeen). Natiivi-UI:n offline-lepo-korjaus toimii.
- **D) Salaisuuskortti (Athos): PASS** — `muste loyda kohde:hahmotelma-athos` → "herää, valmis →
  salaisuus:salaisuus-deinokrateen-vuori"; `ui kartuscha GRC auki` näyttää rivin "Maakunnan salaisuus
  löytyi: Deinokrateen vuoripatsas ›" (UI Toolkit -teksti, ei lokirivi — todennettu kuvasta); napautus avasi
  kortin sisällön kokonaisena. Build19:n avoin kohta korjattu.
- **E) Musiikki (musiikki-vaihe1, komento `aani aihe …`):**
  - `aloituslento` ja `loppu`: PASS — oikea raita (`musa-aloituslento-lyria.mp3`, `musa-loppu-lyria.mp3`)
    ilmestyy soivien listaan `aani mittaa`:n kautta, voimistuu (fade-in 0,00→0,07…), rms/huippu > 0.
  - `kaupunki ateena` (saapumistunnus, tavoite `musa-saapuminen-valimeri-lyria.mp3`): **FAIL** — tuoreella
    pelillä ("uusi-peli 1 ateena" heti perään) raita ei koskaan ilmesty soivien listaan (soivia 3, ei Aarre-
    kanavaa). Epäilen `AaniTaulut.Maat["ateena"]`/`LueKaupungit` ei ole populoitu tässä käynnistyspolussa
    → `Musiikkivalitsin.Alue` palauttaa null → Saapumistunnukset-haku ei koskaan osu. Pelikoodarille tarkistettavaksi.
  - En löytänyt "-11 LUFS" -vaatimusta enkä erillistä neljättä "johtoaihe"-raitaa mistään dokumentista tai
    koodista (grep koko repo) — mitattu olemassa olevalla `aani mittaa`/rms-menetelmällä (docs/moduulit/aanet.md:n
    -33 LUFS -käytännön mukaisesti). Tarkista Fablelta, oliko -11 LUFS ja neljäs raita tarkoitettu johonkin muuhun.
- **F) "pohja 26 + kerma p060":** EI TESTATTU — näitä tunnisteita ei löydy repositoriosta (grep koko repo).
  Lähin vastine on hunnun sarja `2026-09-23a-p080` (docs/raamattu-loki/paatokset-2026-09.md). Tarkista tunnisteet.
- **G) Taustapäivitys 3 käynnistystä: PASS** — sisältö päivittyi itsestään v151→v152 session aikana; kaksi
  kylmäkäynnistystä sen jälkeen säilyttivät `kaytossa`/`viimeisin` = v152 (ei regressiota, sama kuin b19).

## Yhteenveto Fablelle
PASS: C, D, G. FAIL: A (hidas/epäselvä, epäilen kuormaa), E-kaupunki (Alue/Maa-haku ei osu). Testaamatta: B, F.
E-aloituslento/loppu ja LUFS-oletus tarkistettava (spec ei löydy repossa). Simulaattorit sammutettu.
