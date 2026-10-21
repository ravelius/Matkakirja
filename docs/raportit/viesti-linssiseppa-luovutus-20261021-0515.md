# Linssisepän luovutus 21.10.2026 klo 05.15 (kehykset, lennon katse, kertoja)

Edellinen: viesti-linssiseppa-luovutus-20261021-0340.md (osoitteet siellä; LT local_ede7e965-02ff-40a0-a77d-44f3218ca146). Viestit send_message-varakanavalla.

## 0. VALMIIT, NS:llä junaan 209 (proto `linssiseppa/kehys-lento-209`, kärki ea56e58f2, worktree /Users/Shared/Claude/wt/proto-linssiseppa-orsay-rodin)
- b5dc1486d QA "museo paikka" 8 cm seinästä (MuseoKierros.QaVaraM), kulmakoriste 512², lento katse kulkusuuntaan (QA "museo lento katse 0|1").
- 9f188ccbf + f6bed4f95 kertoja ja tekstitys pysähtyvät vapaassa kulussa, kun toinen teos on katsottavana 2 s (KertojaVaihtoS), huone vaihtuu tai QA-siirto.
- cde046116 Lentokaari: katse kohti seuraavaa oviaukkoa (KatseOviM 3, OviOhiM 0,4), ero ajassa Gauss-tasoitettuna (σ 0,35–1,2 s), voima vasta
  viimeisenä; kesto ei pitene. Loki "katse kulkusuuntaan <voima>". Lyhyt sc → 602 jää 0:ksi.
- ea56e58f2 LÄMMIN KULTA: MuseoRakennus.SavyKulta rajaa taulukohtaisen sävyn G ≤ 1,05 R, B ≤ 1,2 R (v3:n sinisiirtymä teki 18/31 kehyksestä
  kermaa/harmaata); QA "museo kultasavy lammin 0|1". Chardinin oma savy-korjaus poistettu (sali.json ennallaan v3).
- PT: painauma jää 0,35 (0,6-koe ei näkynyt). Kulmakoristeiden A-8-sarjaa ei tilata.

## 1. AVOINNA
- LT kuvaa 7 A-kehystä "kultasavy lammin 0 vs 1" + lennon rungolla, jossa ea56e58f2 (PT: 209p:n GPU-mittauksen jälkeen) → kierros15 → PT.
  Mittarit: scratchpadin kulta/mittaa.py, korjaus.py, rajaukset.py (kopioi tarvittaessa); vertailukuvat Codexin sources/kehykset-v2-peli-vs-louvre-ipad-*.jpg.
- Kontrasti (pelissä vaaleus 48–79 vs kuvan 18–95) jäi ennalleen; seuraava kevyt keino vasta jos lämmin kulta ei riitä.
- MuseoTaukoKameraTestit.PysahdysRajaaKaikkiPaikat kaatuu Kamera-suodattimella (tilariippuvuus), Museo-sarjassa läpi.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Odota LT:n kierros15 ja arvioi kehykset Louvren kuvia vasten; muuten
"JONO TYHJÄ: Linssiseppä" PT:lle.
