# Natiivi-UI: luovutus 9.11.2026 klo 11.46 (kontekstivahti 25 %; korvaa -1125:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Kaikki KOETTA, EI JUNAAN ilman omistajan korttia. Kuvat ensin PT:lle (3 riviä: mitä, sha, arkin polku).
Arkki: python3 -I <scratchpad>/arkki.py ulos.jpg sarakkeet otsikko kuva1 nimi1 … (kopio
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/2bb30efc-f0e4-4ca8-a9ba-de8c11c59db0/scratchpad/arkki.py).
Käännöstarkistus: `sh Linssit-testit/unity-tarkistus.sh` worktreessa (sh, ei zsh); pohjavahti `python3 -I tyokalut/pohjavahti.py`.
Odotusvahti (Monitor, 30 min): bash <sama scratchpad>/vahti.sh – ilmoittaa lokit/nui-*-kansioiden "valmis N s". Käynnistä uudelleen.

## PAIKKAPALKKI 5f8860254 (natiivi-backup natiivi-ui/paikkapalkki, wt/proto-natiivi-ui-paikkapalkki)
- 5f8860254 = 818e32b61 + 202b856da (NUI: nähtävyysesittelyn rajaus odottaa matkalennon loppuun; ennen 2,2 s vs matkalento 4,3 s →
  "kamera lähti" 41 km:stä) + NS 1111b681e (ennakko vain lennon ajan). sk proto-3d/_tyo/natiivi-ui/sk-paikkapalkki-1.txt: p-6 veto
  `ui mac veto 0 250 64 300` (sisämaahan).
- JU BS: iphone ✔ (arkki lokit/nui-paikkapalkki-1-iphone-5f8860254/arkki-paikkapalkki-1.jpg), ipad ✔ (…-ipad-5f8860254/arkki…), vaaka JONOSSA.
  Tulos: p-1–p-4, p-5, p-6 ok (p-4 ranta + kuva, kohde vapaalla alueella). VIKA p-5a paluulento yhä sumea beige (maasto pehmeinä
  läiskinä, ei viivoja eikä nimiä; JU: usva 0,00 ja kallistus 0 koko lennon) → NS:llä (viestit 11.4x). Odota NS:n korjausta → yhdistä
  paikkapalkkiin (git fetch natiivi-backup natiiviseppa/noston-lento; merge; tarkistus; push) → sk:n otsikkoon sha → JU:lle ajo 3 kokoa.
- KESKEN: vaaka-5f8860254 → katso + arkki; sitten PT:lle 3 riviä kaikista kolmesta (iPhone/iPad-arkit valmiina, PT:lle EI vielä lähetetty
  arkkipolkuja – lähetä ne vaakan kanssa).
- 818e32b61 vaaka katsottu ja PT:lle lähetetty (11.4x).

## FPV-HUD 4e12207ed (natiivi-backup natiivi-ui/fpv-napit, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-fpv-napit)
- 579fbbeec katsottu (arkit lokit/nui-fpv-hud-1-{iphone,ipad}-579fbbeec/arkki-fpv-hud-1.jpg, PT katsonut). PT 11.5x: EI vielä KK:lle; 4 kohtaa:
  1) pallo peitti ☰:n ja avatun valikon, 2) fh-3 = fh-2 (kallistus ei testattu), 3) pulu oikean tikun päällä, 4) kuvassa lähes pelkkää taivasta.
- Korjattu: ebd3d3569 (FpvNakyma.ValikkoAuki: ☰ auki → pallo, HUD, tietorivi piiloon, LinssiUi Avautuu/Sulkeutuu; kulmapallo samoihin
  turvareunoihin kuin tietorivi → ☰:n alle; `ui fpvnakyma syote k r p y [s]` koska esikatselu ohittaa `fpv syote`) ja 4e12207ed (pulu piiloon
  FPV-näkymän ajaksi, palautus vain jos piilotettiin; `ui fpvnakyma lento <lat> <lon> [suunta]` aloittaa lennon paikasta).
- sk proto-3d/_tyo/natiivi-ui/sk-fpv-hud-1.txt: lento alkaa `ui fpvnakyma lento 45.98 6.87 180` (Chamonix'n pohjoispuoli, nokka Mont Blanc);
  fh-3: `ui fpvnakyma lentotila manu` + `ui fpvnakyma syote 0 0.6 0 0 0.15` + odota 0.5 + hud + kuva, sitten lentotila auto.
- KESKEN: JU:lle pyydetty 11.46 ebd3d3569-ajojen ohitus ja 4e12207ed iphone + ipad → lokit/nui-fpv-hud-1-<koko>-4e12207ed.
  Katso: fh-1 rivit; fh-2 HUD maiseman päällä, pallo ☰:n alla, ei pulua; fh-3 `ui fpvnakyma hud` -rivillä kallistus ≠ 0 ja horisontti/osoitin
  kallistuneet (jos 0 tai pyörähti ympäri: säädä sysäyksen kestoa); fh-4 valikko ilman palloa/HUD:ia päällä; fh-5 pulu takaisin.
  Jos Chamonix-alku ei näytä maastoa (latauskuva tms.), kokeile odotusta tai muuta paikkaa. → arkki VAIN PT:lle.
- Huom: iPadilla linssin ☰ (valkoinen) + pelin ☰ (beige) vierekkäin on jo fh-1:ssä (ennallaan, ei FPV:n vika). Lokissa "maan yllä 56 km
  (raja 28)" Pariisissa – ei NUI:n asia, ei tutkittu.

## Muuta
- Vanhat worktreet poistettavissa: wt/proto-natiivi-ui-nostovalikko-juna223, wt/proto-natiivi-ui-nostovalikko.

## Lisäys 11.5x (NS)
- NS: p-5a beige = näkymä levenee (8 → 86 km 0,9 s:ssa) nopeammin kuin laatat; ei usva eikä sumennus. Korjausyritys 75c0c0c47 (ennakot 0,6/1,2 s),
  koehaara d79031961 = 5f8860254 + korjaus; JU ajaa sk-paikkapalkki-1 iphone → lokit/natiiviseppa-ennakko-paikkapalkki-iphone. NS kertoo tuloksen;
  jos p-5a kunnossa: yhdistä d79031961 paikkapalkkiin ja pyydä JU:lta 3 kokoa.
