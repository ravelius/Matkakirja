# Julkaisija: luovutus 8.11.2026 klo 15.40 (korvaa -1425:n; sen ja -1200/-1045/-0910:n OPIT voimassa)

Edellinen: git show d77226481:docs/raportit/viesti-julkaisija-luovutus-20261108-1425.md (juna 222, TF-laskuri, OPIT).
Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, L = P/lokit, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (grep 'AJO |VIKA|laitekaannos VALMIS|SEIS|ALKOI|KESKEYTYI|rc [1-9]'), tail -30, ps -axo pid,etime,command | grep 'zsh (ns-|nui-|ks-)'.

## 1. Juna 222 (TF vain omistajan sanalla; PT: ei TF:ää ennen navat-korjausta)
- Kärki yhä f9ab126ce (wt /Users/Shared/Claude/wt/julkaisija-juna-221). Navat: kerma bea0d260f → savy 641fd439e (POISTETTU, PT 15.5x)
  → omistaja 14.51 "beige säilyy" → NS:n beige 9e98f55e5 AJETTU 15.29 (L/natiiviseppa-navat-koho/beige/, FRA 1, 3/3, VIKA 0).
  NS kuittasi 15.31 (rannikon oliivivyö = mannerjalusta, ei vika). ODOTTAA PT:n sanaa: 9e98f55e5 korvaa 11b66adc5:n junassa 222
  → uusi kärki, Unity sh -tarkistus, natiivi-backup julkaisija/juna-222, muutosloki "1.1 (223)" ennen TF-ajoa.
- Rajattu vesiraja 29671be23 ja meripari HYLÄTTY (omistaja 14.51) – ei ajeta.

## 2. Jono käynnissä (kaikki skriptit T/*.zsh, nohup; kuittaa kukin pyytäjälle sen session-id:llä)
iPad (iso 00008103; pieni 00008142 "unavailable"):
- nui-kartta-lukittu-5.zsh (69329) ef81c021d, käännös valmis → lokit/nui-kartta-lukittu-5-ef81c021d → NUI
- nui-merenpohja-1b.zsh (15705) c54d3ba0d, sk-merenpohja-1b, kl5:n jälkeen → NUI
- nui-nahtavyysnapautus-4.zsh (34029) 491fdf026, sk-nahtavyysnapautus-3, kl5+mp1b jälkeen → NUI
- ns-fpv-b.zsh (52978) 5a8933619, sk-fpv-pienoismalli-nui → lokit/natiiviseppa-fpv-b/, topoesittelyn (21199) jälkeen → NS.
  UUSI VARJOSTIN: jonolokin rivi "NS fpv-b Shader-error konsoli N kaannos N"; jos > 0, rivit NS:lle.
Mac: ns-topoesittely-kamera.zsh (21199) fdd642058 Mac-esikatselu → lokit/natiiviseppa-topoesittely/kamera/ → NS.
Pienoismalli d1c8a074f VALMIS 15.38 ja kuitattu NS:lle (51340 lopettelee: runko takaisin).

## 3. Kuitattu tällä vuorolla
PK glb 6/6 (9c40eb7e3, huiput 4413–4548, kaikki ELOSSA) → PK. NS kerma, beige, pienoismalli. NUI kl4, merenpohja-1
(kuollutmeri-3d = tasainen md5, skenaariovika → 1b), napautus-3 (skenaariovika → -4). KS napakalotit ämpäriin
julisteet/pallo/napakalotit/2026-11-08-kohokartta/ 5/5 CDN OK (T/ks-napakalotit-vienti-20261108.zsh); KS topokohteet-1
(L/karttaseppa-topokohteet-1-b8-f9ab126ce, 10 kuvaa, k8-s330 = k8-s330-kal70 md5).

## 4. Siivottavat (vain kuittausten jälkeen; säilytä kärjet, rungot d092f48cc/2cba21a3e/10e9b6c4a, 5d6967444, 50200fb68, e59541a34)
L/julkaisija-laite-218-{bea0d260f, d1c8a074f, cb3b5537d} nyt; c54d3ba0d, 491fdf026, ef81c021d kun NUI:n ajot kuitattu;
9e98f55e5 vasta kun junaan viety; 5a8933619 kun FPV B kuitattu; 86916cbd7 kun navat ratkaistu (nyt käytännössä ratkaistu).
Poistettu jo: 9c40eb7e3, b45bbe356, 2efebff6e ja kymmenen 14.23 listattua.

## OPIT (uudet)
- Käännösjono: laite-iso.zsh odottaa /tmp/ju-laite-kopio.lukko-lukkoa 10 s välein (L1 ja L2 jakavat T7-kopion). Kiireelliselle
  T/ns-navat-savy.zsh-malli: oma lukko 0,5 s silmukalla + laite-sha.sh suoraan → ohittaa jonon. ÄLÄ tapa käännöksen emoa ilman
  lukon siivousta (rmdir /tmp/ju-laite-kopio.lukko, rm kaannospalvelu-N.lukko vain jos sen pid kuollut).
- "laitekaannos ALKOI" kirjataan ennen lukkoa → ei tarkoita käännöksen alkua; katso /tmp/matkakirja-kaannospalvelu*.lukko/kuka.
- vapaa/portti voi valita linjan, jonka lukkoa Mac-esikatselu pitää (esikatselu-rungolla pitää kaannospalvelu-lukkoa) → käännös
  jumittuu esikatselun ajaksi. Tarkista kuka ennen kiireellistä käännöstä.
- rm -rf $MUUTTUJA estetään turvatarkistuksella: skripteissä kirjaimellinen polku tai rmdir.
- Odotusrivi "while kill -0 <pid>" – vanhan pid:n uudelleenkäyttö voi jumittaa; käytä tuoreita pid:itä.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
