# Zoomin laattapyyntöjen tahditus (Karttaseppä 22.9.2026)

Jatko ablaatiotikkaalle (docs/raportit/sulavuus-ablaatio-20260921.md, Pelikoodari):
portaat 1–2 (pallo + laatat, + vektorit) zoomiajossa. Mittari
tools/savukkeet/mittaa-ablaatio.mjs (haara pelikoodari-ablaatio, lippu
`?kerrokset=porrasN`) yhdistettynä main v2035:een väliaikaisessa worktreessä,
WebKit 390 × 844 dpr 3, Ranska z6, kaksi ajoa portaalla vuorotellen (2,1,2,1).
Mac Studion kuorma ajojen aikana 6–50 (muut sessiot polttivat rinnalla), joten
absoluuttiset luvut ovat pessimistisiä; vertailut on tehty peräkkäin.

| koodi | kuorma | porras 2 zoomi p95 / max (ms) | porras 1 zoomi p95 / max (ms) | > 50 ms |
| --- | --- | --- | --- | --- |
| v2026 ennen zoomiennakkoa (Pelikoodarin raportti) | ~9 | 68 / 92 | 31 / 46 | 26 / 0 |
| v2035 (zoomiennakko #2689) | 11–20 | 35–37 / 49–50 | 31–42 / 49–59 | 0 / 0–4 |
| v2035, aloituskatto 99 (vertailu samalla kuormalla) | 8–19 | 33–39 / 48 | 37 / 45–68 | 0 / 1 |
| **v2035 + aloituskatto 2 laattaa/kehys** | 6–13 | **24 / 29, 23 / 37** | **23 / 30, 22 / 26** | 0 |
| sama, toinen ajo | 20–27 | 28 / 36, 26 / 40 | 27 / 33 (yksi ajo kuormapiikissä hylätty) | 0 |
| aloituskatto 1 laatta/kehys (koe) | 23–50 | 23 / 43, 35 / 79 | 23 / 43, 20 / 34 | 0 / 2 |

## Syy ja korjaus

Zoomin jokaisessa yli 35 ms:n kehyksessä oli sama yhdistelmä: 15–18
laattapyynnön ALOITUS samassa kehyksessä (kuusi latauspaikkaa vapautui
kerralla ja `kaynnista` täytti ne kaikki: 6 laattaa × 3 kerrosta = 18 fetch +
createImageBitmap) ja yksi tekstuurin vienti. Korjaus js/pallolaatat.js:
`LAATTAKERROS_ALOITUKSIA_PER_KEHYS = 2` — jonosta aloitetaan enintään kaksi
laattaa kehystä kohti, loput seuraavassa kehyksessä (rAF nollaa laskurin).
Mittari `laatat.tahditettuja` kertoo, montako kertaa katto tuli vastaan.

Tahdituksen jälkeen pisimmät kehykset (25–30 ms) ovat "pyyntoja 6 +
tekstuurit 1": kahden laatan aloitus ja yksi vienti maksavat WebKit-headlessissa
kuormitetulla koneella yhä ~8 ms kumpikin. Katto 1 laatta/kehys ei erottunut
kohinasta (p95 20–23 vs 22–28) ja puolittaisi latausvauhdin, joten katto on 2.

## Mitä jää

- Tavoite p95 < 20 ms ei täyty headless-WebKitillä kuormalla 6–50; ero
  tavoitteeseen on nyt 2–8 ms ja syy on kehyksen vakio-osa (piirto 17 ms +
  yksi tapahtuma). Laitetestaajan iPhone-mittaus samalla lipulla ratkaisee,
  tarvitaanko tukitason harvennus (LAATTAKERROS_TUKI_ASKEL / LAATTAKATTO_TUKI).
- Raakadata: scratchpad (ablaatio-tahditus*/ablaatio-webkit.json), ei repossa.
