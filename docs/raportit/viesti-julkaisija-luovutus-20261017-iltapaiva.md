# Julkaisijan luovutus 17.10.2026 klo 14.30 (Postivahti: kova raja 35 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120). Edellinen luovutus: `viesti-julkaisija-luovutus-20261017-aamu.md`.
Osoitekirja: /Users/Shared/Claude/osoitekirja.md.

## 0. ENSIN (heti nollauksen jälkeen)
- **L2-LUKKO ON JULKAISIJAN VARAAMA** PK:n fft-meri-mittauksen ajaksi (14.27–). Varaaja `julkaisija-tyokalut/l2-pito-mittaus.zsh`
  oli taustatehtävä ja kuolee nollauksessa, jolloin lukko jää jumiin. Kun PK lähettää SIMU VAPAA (meri-pari ~7 min +
  kuvakortin uusinta ~5 min, valmis ~14.40), vapauta: `/bin/rm -rf /tmp/matkakirja-kaannospalvelu-2.lukko` VAIN jos
  `cat /tmp/matkakirja-kaannospalvelu-2.lukko/kuka` alkaa "PITO julkaisija". Poista myös `julkaisija-tyokalut/l2-pito.lippu`.
- Käynnistä levyvahti uudelleen Monitorina (`zsh julkaisija-tyokalut/levyvahti-l2.zsh`, 30 min, uudelleen aina) ja
  25 Gi -vahti taustalle (`zsh julkaisija-tyokalut/levy25-vahti.zsh`; PT: 25 Gi → uudet videoajot seis + rivi PT:lle).
- **25 Gi -vahti on SEURAAJAN vastuulla** (PT 14.3x): kun vapaa ≤ 25 Gi → älä anna SIMU NYT:ia videoajoille + yksi rivi PT:lle.
- PT 14.3x: kaikki lokit/todistus-* yli 4 h → T7 (`siirra-4h-t7.zsh`, jokaiseen kansioon SIIRRETTY.txt); ajo käynnistetty 14.3x,
  tarkista tulos ja aja uudelleen tarvittaessa (ohittaa jo siirretyt).
- Levy 27 Gi (14.28). Swap ~18,6/19 Gi. Kasvu tulee todistusajojen videoista (KS:n Kiina-videot 2–3 G/ajo).

## 1. SIMUJONO (yksi kerrallaan; SIMU NYT viestillä, aina "SIMU VAPAA minulle")
Nyt: **PK** fft-meri 36723c5f8 (raketti-meri-200-app, iPhone 96044270) + Tivolin kuvakortin uusinta (LR:n v11-paketti).
Sen jälkeen:
1. **NUI** yhteis-pariisi-200d 8640682c0 (3256e5f1d) iPhone + iPad F7513985, ~25 min (Pariisi-arkki + laitenappien kuvapari).
2. **VS** k72 (Louvren altaat vaaleammiksi, iPad ~7) + valas k8 5052077f0 (iPad + iPhone ~15) = ~22 min.
3. **LS** Nike + Venus -uusinta, app 7b7ac31a, iPhone BD64C8E4 ~12 min (skenaariovirhe korjattu).
- Käynnistymistarkistus: `pgrep -f todistusajo.sh || pgrep -f launchd_sim` (VS:n asennusvaihe ~2,5 min ei näy pelkästä todistusajosta).

## 2. ODOTTAA PT:TÄ
- **iPhone-laitemittaus PK fft-meri** (PT: Julkaisija tekee). Ehto: PT hyväksyy PK:n meri-kuvaparin. Sitten aja
  `zsh julkaisija-tyokalut/pelikoodari-fftmeri-laite.zsh` (laite-sha.sh, b5-kopio, L2-lukko, sha 36723c5f8 — PK:n kärki),
  ilmoita PT:lle "laitekäännös valmis asennettavaksi" → PT pyytää omistajalta iPhonen kytkennän (iPhone 17 Pro
  00008150-000A212E1407801C oli unavailable 11.3x). Asennus + mittaus: `proto-3d/Matkakirja-proto/tyokalut/ipad.sh` UDID=iPhone;
  mittaa ruutuaika p95, GPU, lämpö 2 min laukaisun ajan → PT.
- PR #4808 (LR, aineistot.js → koopenhamina) odottaa omistajan kuittausta — Julkaisija ei mergeä.

## 3. TÄNÄÄN TEHTY (10.15–14.30)
- Viennit: koopenhamina-tivoli-kuvat 20261017 (12.59, v6/v8 — LR pidätti jälkikäteen, versiot nostettu), d (13.04, v7/v9),
  e (14.16, v8/v10), f (14.19, v9/v11; PT KYLLÄ kaikille d–f), taidemuseo-kertoja-v2-manifest200 (13.26, LS).
  Paketteja 20261017 (ilman kirjainta) ja b EI viedä uudelleen.
- Levy: 111 + 23 todistuskansiota (>24 h) → T7 `koodaus/proto-lokit-arkisto`, lista `proto-3d/lokit/SIIRRETTY.txt`
  (siirtoskripti `siirra-todistuslokit-t7.zsh`; yksittäinen `siirra-yksi-t7.zsh <kansio>` jättää kansioon SIIRRETTY.txt).
  KS:n 12.32-koko-linssi siirretty (PT). tivoli-200-app + tivoli-200 poistettu (PK KYLLÄ, PT).
- L2: kymmeniä käännöksiä (KS väestöpinta/Kiina v1–v4, PK fft-meri ×4 + tivoli, NUI kaaro-rajat + yhteis-pariisi a–d,
  VS valas k7/k8, LS louvre-veistokset). Peruttu: PK kiina-kertova-kamera (KS:n haara korvasi), PK tivoli f584735bd (omistaja 12.20).

## 4. OPIT
- **Lukossa olevaa L2-käännöstä ei saa tappaa** (NUI 11.50: orpo Unity → 4 käännöstä päällekkäin, valas-197 ja fft-meri kaatuivat).
  Vain odottajan saa vaihtaa. NUI kuittasi.
- **Mittausajo ilman rinnakkaista käännöstä:** varaa L2-lukko itse (l2-pito-mittaus.zsh), älä SIGSTOPpaa lukon haltijaa
  (Unity-lapset jatkaisivat).
- **T7-kopioon ilmestyy .DS_Store** → tiedostomäärävertailu ohittaa sen (korjattu molempiin siirtoskripteihin).
- Haarat liikkuvat jonossa: L2 kääntää haaran kärjen → kerro roolille käännetty sha ja pyydä tarkistamaan, että pyydetty sisältyy.
- Välitetty "PT:n lupa" viennille: ensimmäisellä kerralla varmista suoraan PT:ltä (d); saman perusteen jatkoversiot (e, f) PT kuittasi jälkikäteen.
