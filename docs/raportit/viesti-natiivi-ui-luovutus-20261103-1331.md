# Natiivi-UI: luovutus 3.11.2026 klo 13.31 (reitit valinnassa, pikkukuvat lähizoomilla, loppurajaus kohteiden mukaan; simu PT:llä)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1222.md (+ LISÄYS 12.23). Syy: kontekstivahti 25 %.

## Tehty (proto `natiivi-ui/saapumiskuvat-nousu-218`, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin,
## peili natiivi-backup peili/proto/natiivi-ui/saapumiskuvat-nousu-218; KOE)
- Simu 7c4ade934 (lokit/nui-pallot-kartussi-b5aead9f6-20261103): PT kuittasi pikkukuvat, kartussi, isoisä, pallot/reitit,
  Big Ben, terävä-portti. Pariisin paluun terävyys → NS teki 8e855c8d9 (simussa nyt 1017 ms, OK).
- **54897ab16** KK 12.59: (1) reitit näkyvät myös kohdetta valittaessa: vaihe Siirto kaupungissa aloittaa matkasession
  (PeliOhjain.MatkaSessioKesken; ennen heitto ilman Liiku-liuskaa jätti session tyhjäksi). (2) SaapumisKuvat.Nakyvissa:
  Kohdenostot.Lahella && karttakerroin ≥ 0,95 (PT:n päätös: pikkukuvat vain lähizoomilla, ei maan eikä Euroopan zoomissa).
- **8afe28dfa** omistajan päätös 13.11: loppurajaus kohteiden mukaan (PeliOhjain.KohteidenRajaus): esittelypaikat + nappula,
  reuna 25 %, yläraja 12 km (sen yli keskusta, kuva reunalta), ei lähitasoa lähemmäs. Piirroskaupungit ennallaan.
  Koskee NS:n tiedostoja pienesti: PalloKierto.AjaKeskustaan(…, vahintaanM), KarttaKerrokset.SaapumisKorkeusM (esilataus).
  NS:lle kerrottu.
- Simu c660bbc50+8afe28dfa (= JU:n 0c103c3a9 sisällöltään), lokit/nui-reitit-pikkukuvat-54897ab16-20261103, tulos.md:
  reitit valinnassa OK, pikkukuvat vain lähizoomilla OK, Lontoo 7,8 km (Westminster vasen, Paavali ylä, Tower Bridge oikea) OK.
  HUOM: Lontoo laajana "kartta ei terävä 3000 ms:ssa" → traileri katolla, osin sumea → NS:n esilataus. Tulos PT:lle 13.31.
- ajo.zsh-skripteissä nyt kaksi osaa: KAANNA_VAIN=1 (käännös ilman simuasennusta, VAPAA heti) ja OHITA_KAANNOS=1 simuosa
  `simu-lukko.sh kaari Natiivi-UI yhteinen-iPad13 -- zsh ajo.zsh <linja> <SHA>` (SIMU_ODOTA=3600 SIMU_MUISTIRAJA=16).

## SEURAAJAN JONO
1. Odota PT:n/KK:n palaute simusta 0c103c3a9 (koonti-nousu-lontoo.png, koonti-pallot-reitit.png). Omistajan linja: tulee
   SAMAAN pienen iPadin versioon reittien kanssa → PT → KK. Pieneen iPadiin vain PT:n luvalla (JU asentaa).
2. Jos NS korjaa Lontoon laajan näkymän esilatauksen: yksi yhdistelmäsimu JU:n vuorolla (skripti yllä, uusi kansio).
3. Avoin tiedoksi: trailerin jälkeen kamera loittonee Iso-Britannian maan näkymään (~50 s, "GBR Molempiin 1576 km");
   ei NUI:n muutos, ei vielä kenenkään jonossa – kysy PT:ltä, jos KK huomauttaa.
4. Vanhat: video iPadilta; veneet joen keskiviivaa; animaatiokuvien ämpärivienti PT:n luvalla; Codexin vana-otto.

## LISÄYS 13.4x (JU/PT): simu yhdistelmälle b39c1bc9a – JONOSSA 1 (kärki)
- b39c1bc9a = 0c103c3a9 + KS 4301f394a kyltit. JU antaa "KÄÄNNÖS NYT L<n>" (L1 LAV tai L2 NS vapautuessa).
- Skripti valmiina: /Users/Shared/Claude/proto-3d/lokit/nui-ks-kyltit-b39c1bc9a-20261103/ajo.zsh (sis. ks-bigben.png ja
  ks-pariisi.png KS:lle). Aja: `KAANNA_VAIN=1 zsh ajo.zsh <n> b39c1bc9a` taustalla → VAPAA JU:lle heti → simuosa
  `SIMU_ODOTA=3600 SIMU_MUISTIRAJA=16 OHITA_KAANNOS=1 zsh /Users/Shared/Claude/proto-3d/tyokalut/simu-lukko.sh kaari Natiivi-UI
  yhteinen-iPad13 -- zsh ajo.zsh <n> x` taustalla. Tulos PT:lle 3 riviä; ks-*.png-kuvien polku myös KS:lle (osoitekirja).
