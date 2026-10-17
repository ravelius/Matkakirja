# Pelikoodarin luovutus 17.10.2026 klo 17.21 (KOVA RAJA 36 %, Postivahti)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-1447 (656ac3297).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU local_5cb16c00-…, KS local_eec7f158-… (KS nollautui ~17.0x, uusi KS samalla id:llä), NUI local_44392b3c-…,
  NS local_674b9ec4-…, LR local_996d60ab-…, Postivahti local_a24c43c0-….
- Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti. Käännökset JU:n kautta;
  ennen pyyntöä `zsh tyokalut/tarkista.sh` (0). Linssit-testit: `cd Linssit-testit; sh ./kaanna.sh [osa]`.

## AVOIMET (odottavat muita – ei omaa työtä jonossa)
1. **Kiinan Sui 589 -kuvapari** (omistaja 16.33 "Kuka hallitsi ja missä – selkeä kartta"; PT purki pysäytyksen kameran osalta 16.3x):
   kamera **482d9aff1** (pelikoodari/kiina-kamera-laaja, worktree wt/proto-pelikoodari-kiina-kertova-kamera) on yhdistetty KS:n
   3b18ac5c9:ään, käännös JU:lla kansioon kiina-selkea-589-app. Uusi KS ajaa parin ja lähettää kuvat PK:lle → tarkista: kiinteä laaja
   (nykyinen Kiina 18,16–53,57 N / 73,61–134,77 E, kallistus 0, Sovita kuvasuhteella), taistelun lähikuva 1500 km / 45° 3 s lyönnin hetkeen,
   nimetty paikka näkyy; keksintöjen lähikuvat pois (KiinaKertovaKamera.KeksintoLahikuvat=false). PT: muuta Kiinaan EI ennen omistajan
   hyväksyntää. KS:n 483c6bb87 (KorkeusKohdassa sis. armeijakummun) tulee seuraavaan käännökseen.
2. **Cupolan raskaus vanhalla iPadilla** (PT; JU:n uusinnassa Cupola ~22 kuvaa/s, GPU ~82 ms merestä riippumatta): JU:lta pyydetty laitemittaus
   skenaariolla /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-cupola-kustannus.txt (ce479c342-laitekäännös, ei uutta):
   40 s jaksot J0 perus | J1 `ui linssi kehys 0` | J2 perus | J3 `linssi kerros Pallo 0` | J4 molemmat | J5 perus | J6 `astro kyyti valot1 1`.
   Taulukko gpuMs/p50/fps per jakso → tulkitse: epäily = Cupolan UITK-kerrokset (5 × 2732×2048 täysruutua läpikuultavana) ja/tai pallo.
   Seuraava askel tuloksen mukaan (esim. kerrokset yhdeksi kuvaksi / pienempi resoluutio iPadilla) → ehdotus PT:lle.
3. **ISS-ohjauspöytä luonnos 4** (omistaja 17.06): pelilogiikka valmis **bce4b199d** (pelikoodari/ohjauspoyta-201, wt/proto-pelikoodari-ohjauspoyta-201):
   IssEtsin.Vipu(0…1) logaritminen 24 → 400 mm + VipunAsento; NUI cherry-pickasi (4e18b4c7f), kärki 3ece0c233 käännöksessä → NUI:n
   simukuvapari PT:lle. SEURAA-nappi pois → AsetaSeuraa(true) KAMERA-tilaan (automaattinen), junassa 200 SEURAA jo piilossa (ei muutosta).

## Valmiit tänään tämän session aikana
- **Tivolin kuvanosto v12**: ajo 15.36 (ed0985d7d ⊃ a59b0f916, worker v10, ei korjaustiedostoa): järvi 0 s, Carstensen 12,4 s, Pierrot 31 s,
  EI litografiaa, kortti 1/5…5/5 → lokit/todistus-tivoli-kuvanosto-v12-20261017-1536. PT kuittasi (omistaja hyväksyi kortin 15.12),
  NS yhdisti junaan 200 (3920f1205). Skenaario sk-tivoli-kuvanosto-v12.txt + ajo-tivoli-kuvanosto-v12.zsh.
- **FFT-meri junaan 200**: syy iPadin matkan jälkeiseen kuormaan = meri georeferenssin lapsi, RakettiMaasto.OnDestroy ei tuhonnut sitä →
  korjaus 015841fe9 (+ Update katkaisee piirron ilman Paivita-kutsua). iPad-uusinta (JU, ce479c342): FFT ≈ laatta kaikissa vaiheissa.
  Junahaara **pelikoodari/fft-meri-200 6aacfbd3c** (juna-200 7e719b637 + fft-meri, RakettiMeri.Kaytossa oletus päällä) → NS yhdisti (0eb595352).
- **Kiinan kamera** (omistaja 14.46 / 14.52 / 16.29 / 16.33): 54f127afd laaja dynastia ∪ nykyinen Kiina → 3e3c47cf3 lähikuvat kauemmas →
  2e6c1e5fc / 482d9aff1 kiinteä laaja suoraan ylhäältä + vain taistelulähikuva. Testit KiinaKertovaKameraTestit 15, Linssit 2025/2025.
- Meren iPad-mittaus siirtyi JU:lle (omistaja 14.50, iPad iPhonen sijaan) – valmis, raportti
  /Users/Shared/Claude/proto-3d/lokit/fftmeri-ipad-mittaus-meri1-20261017-1500-RAPORTTI.md.

## Worktreet
- wt/proto-pelikoodari-kiina-kertova-kamera (pelikoodari/kiina-kamera-laaja 482d9aff1), wt/proto-pelikoodari-ohjauspoyta-201 (bce4b199d),
  wt/proto-pelikoodari-fft-meri (pelikoodari/fft-meri-ipad ce479c342; fft-meri 015841fe9), wt/proto-pelikoodari-fft-meri-200 (6aacfbd3c, junassa →
  voi poistaa NS:n mergen jälkeen), wt/proto-pelikoodari-koopenhamina-v8-200 (koopenhamina-v12, junassa → voi poistaa), kupoli-ohita-200.
- _tyo/pelikoodari: koopenhamina-v12-app (ed0985d7d), raketti-meri-200-app (36723c5f8) – kumpikin tarpeeton junan jälkeen (≤ 2 appia -sääntö).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-1721.md (haara
pelikoodari-luovutus-20261014-paiva). Jono odottaa muita: KS:n Sui 589 -kuvapari (tarkista kamera 482d9aff1), JU:n Cupola-laitemittaus
(sk-cupola-kustannus → tulkinta ja ehdotus PT:lle), NUI:n ohjauspöytä 4 -kuvapari (bce4b199d mukana). Jos mitään ei tule, rivi PT:lle
'JONO TYHJÄ: Pelikoodari'."
