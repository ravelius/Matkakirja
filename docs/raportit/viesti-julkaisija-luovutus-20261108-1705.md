# Julkaisija: luovutus 8.11.2026 klo 17.05 (korvaa -1540:n; sen ja -1425/-1200/-1045/-0910:n OPIT voimassa)

Edellinen: git show 49a466eaa:docs/raportit/viesti-julkaisija-luovutus-20261108-1540.md (OPIT, siivouslista).
T = /Users/Shared/Claude/julkaisija-tyokalut, L = /Users/Shared/Claude/proto-3d/lokit, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (grep 'AJO |VIKA [1-9]|laitekaannos VALMIS|SEIS|ALKOI|rc [1-9]|Shader-error|runko takaisin'),
tail -30, ps -axo pid,etime,command | grep -E 'zsh .*(ns-|nui-|juna222|j6/)'.

## 1. Juna 222 – kärki 617d6ca2b (wt /Users/Shared/Claude/wt/julkaisija-juna-221, natiivi-backup julkaisija/juna-222)
f9ab126ce → a774658a9 (NUI kiinteä ladonta ef81c021d) → b3914b64b (ladonta oletuksena päällä) → 4406f963f (NS paperinavat
ecabf1855; ristiriidat navan tiedostoissa ecabf:n mukaan) → 617d6ca2b (NUI napautus ilman topoesittelyä + NS:n kamerapala).
Kaikki: unity sh 0, Kartta-testit 720/720. PT kuittasi 617d6ca2b:n diffin.
Muutosloki 1.1 (223) MERGED (PR 6502). TF 223 VAIN omistajan sanalla KK:n kautta.
ODOTTAA: tarkistusajo j6 (alla) → kuittaus NUI:lle + PT:lle (kuvat L/nui-nahtavyysnapautus-6-617d6ca2b/), sitten juna valmis TF-korttiin.
EI junaan: b4e624cfe (kohokartta oletuksena), topoesittelyt (581f7f85a, 6c27282e1, 48e5654ae, b1d5c652f) – PT 16.5x.

## 2. Jono käynnissä (iPad-järjestys tässä)
- T/j6/juna222-napautus.zsh (32059, iPadilla 17.05; vanha sk-5-ajo 12644 keskeytetty): käännös valmis; ajaa NUI:n
  sk-nahtavyysnapautus-6-222 (4 kuvaa) → L/nui-nahtavyysnapautus-6-617d6ca2b → kuvat SUORAAN PT:lle (PT 17.0x: NUI nollautuu; VAIN tämä yksi ajo).
- T/ns-mp-pohjapallo2.zsh (23794): NS pohjapallo f7cf0bd7c UUSINTA pp2 (pp1 failed to launch), käännös valmis,
  → L/natiiviseppa-merenpohja-pohjapallo/ (4 kuvaa) → NS.
- T/ns-fpv-ab4.zsh (12674): NS FPV A/B 2fa367316 UUSINTA, käännös L1 16.58, sk-fpv-ab 15 kuvaa → L/natiiviseppa-fpv-b/;
  install-tuloste L/natiiviseppa-fpv-b-2fa367316-kaannos/install.log; .app SÄILYTÄ vertailuun → NS.
- Mac: T/nui-merenpohja-2-mac.zsh (42843, L2 17.08): NUI merenpohja-2 c54d3ba0d video + 5 kuvaa → L/nui-merenpohja-2-c54d3ba0d;
  tarkista lokissa "kohokartta tila" 4× → kuittaus NUI:lle, video VAIN PT:lle.
Kuitattu tällä vuorolla: NS topoesittely-kamera, paperinavat; NUI kl5, mp1b (VIKA lähetys linssi topografia), nn4, topoesittely-4
(video), napautus-5 (nn5b).

## 3. "failed to launch" (CoreDeviceError 10002 / POSIX 22) – OPPI
Toistui 15.45, 16.12, 16.41, 16.58 eri käännöksillä (FPV, nn5, pohjapallo). Ei kaatumalokia (prosessi ei käynnisty).
Sama nn5-.app käynnistyi JU:n käsikokeessa 16.45 (install + launch ilman --console) ja uusinnassa 16.46. → iPadin hetkellinen
tila, ei käännösvika. Toimi: uusinta heti; jos toistuu, epäile lukittua näyttöä (ei avata ilman omistajaa) → rivi PT:lle.

## 4. Levy ja siivous
Levy ajoittain alle 12 Gi (käännösraja); PT/NS siivosivat. Poistin: wt/julkaisija-ns-gc ja wt/julkaisija-yhdistelma-218
(esikatselu-rungolla.zsh luo L1-puun nyt tarvittaessa uudelleen pk-218:sta), laite-218-{ef81c021d, 9e98f55e5, 86916cbd7,
5a8933619, 2fa367316(vanha), c54d3ba0d, 491fdf026, ecabf1855, 697116a8e}.
Jäljellä säilytettävät: 10e9b6c4a, 50200fb68, 5d6967444, e59541a34 + rungot (symlinkit T7:lle). Poista ajojen kuittauksen
jälkeen: f7cf0bd7c, 617d6ca2b (kun TF ajettu tai PT sanoo), 2fa367316 vasta kun NS on vertaillut.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
