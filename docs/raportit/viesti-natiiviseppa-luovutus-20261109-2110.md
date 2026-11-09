# Natiivisepän luovutus 9.11.2026 klo 21.3x

Edellinen: git show efbfcdb39:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1709.md (varjostimen regenerointiohje ja VS-tiedostojako siellä).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 30 % (7.37).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").

## TEHTY 17.10–21.10 (proto-3d, paikalliset haarat)
- HUIPPUNIMET JUNASSA 224: 68ee7187e (haara natiiviseppa/huippunimet-juna224 = 72b4e4477 + 5: piirretty huippu bf4017da8 + häivytys/koko/usva + karsinta d3a989913),
  JU yhdisti (39204416d). Karsinta: huiput pois kiinteästä ladonnasta (KiinteaRivi), UI-nappien alta (UIDocumentit 4×/s, syy "ui-nappi"), harjanteen takaa
  (näkölinja SampleHeightMostDetailed 12 näytettä, ≤ 24 huippua/s, syy "katve"). Komento nimet huiput katve|napit 1|0|tila. Ajot -6 (koe) ja -7 (juna) PT ✓.
  Usvanimet (ylälaita) jäävät, ei etäisyysrajaa (PT).
- FPV-LÄHIVAIHTELU: oletus 400 m a1515df04 (natiiviseppa/fpv-vuoret), PT/KK: jää, pari ei omistajalle; lähipinta = VS:n kuvio. EI LISÄÄ VAIHTELUITERAATIOITA.
  a1515df04 on VS:n pohja (VS:lle kerrottu).
- PARIISIN INTRO: jo tehty 9bb4e3476 (5.11.), PT merkitsi valmiiksi.
- LÖYDÖS (NUI:lle PT:n kautta, ei tehty): UiNakymat.KartanKalusteet ei sisällä kelluvia nappeja, kun yläpalkki piilossa (iPad vaaka) → muutkin nimet voivat jäädä napin alle.

## TYÖN ALLA: KATTOJEN KOODILLA PIIRRETTY KUVIO (omistaja 7.11. 21.41, PT 9.11. 19.4x; koe, ei junaan ilman korttia)
- 59f2443f3 haara natiiviseppa/kattokuvio (junan 224 kärki 39204416d + 1), worktree /Users/Shared/Claude/wt/proto-natiiviseppa-kattokuvio.
  TaloKerros.shader KattoKerroin: rinteillä katerivit 0,9 m räystään suuntaisina (korkeus / sin kaltevuus) + lomittain saumat 1,8 m, mansardilla uv:n metreistä,
  tasakatolla 3 m levysaumat; patina 6/23 m kohinana; palan omissa metreissä; häivytys fwidthillä + 700–1 500 m (patina 2 500 m). talot kuvio 0|1 (_kattoKuvio).
- Ajo -1 (21.09) rc 0, Shader-error 0, mutta skenaario rikki (zsh ei pilkkonut: kallista/aja tyhjät, kuvanimet). Korjattu sk-kattokuvio-1.txt,
  1c (21.20) ajettu, mutta ILMAN TALOJA (Mac-esikatselu vaatii "komento talot kansio …/palat-v22-lahi", lisätty). Uusinta
  natiiviseppa-kattokuvio-1d-mac-59f2443f3 pyydetty JU:lta; tarkista lokista "talot tila: palat" > 0 ennen kuvia. 1b ja 1c käyttökelvottomia.
- 1d (21.27, talot 219 palaa) KATSOTTU: kuvio lähes näkymätön kaikilla etäisyyksillä (lähi = kaari 0,004): rivit 0,9 m / saumat 1,8 m alle pikselin →
  fwidth-häivytys poistaa ne (ei väreilyä), vain heikko patina. Lokit/natiiviseppa-kattokuvio-1d-mac-59f2443f3: rajaus-talot-lahi.png, pari-*-1000.png, NS-arvio.txt.
  PT:lle raportoitu 21.3x, ei KK:lle. SUOSITUS PT:lle: liioiteltu mittakaava (rivit 2–3 m, saumat 4–6 m, Tiny Prague) + vahvempi patina; vaihtoehto lähempi kamera.
- SEURAAVA: odota PT:n päätös → muuta vain KattoKerroin-vakioita (RiviM, SaumaM, LevyM, voimakkuudet 0,24/0,14/0,07/0,14, patina 0,14), uusi commit,
  Mac-ajo JU:lla sk-kattokuvio-1.txt:llä (sisältää talot kansio palat-v22-lahi ja lopun odota 2), täysikokoinen talorajaus (ei Louvren mallia) ennen arviota.
- OPPI: skenaariot kirjoitetaan bashilla tai kokonaan käsin (zsh:n `set -- $v` ei pilko); Mac-talokuviin aina "talot kansio" (muisti mac-esikatselu-talot-kansio).
Jos jono tyhjä: PT "JONO TYHJÄ: Natiiviseppä".
