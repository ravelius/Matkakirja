# Natiivi-UI: luovutus 9.11.2026 klo 12.21 (kontekstivahti 26 %; korvaa -1146:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Kaikki KOETTA, EI JUNAAN ilman omistajan korttia. Kuvat ensin PT:lle (3 riviä: mitä, sha, arkin polku).
Arkki: python3 -I <scratchpad>/arkki.py ulos.jpg sarakkeet otsikko kuva1 nimi1 … (kopio
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/07ceb278-2ce5-4777-a416-01c57eb82331/scratchpad/arkki.py).
Odotusvahti (Monitor 30 min): bash <sama scratchpad>/vahti.sh – ohittaa jo valmiit, ilmoittaa uudet "valmis N s". Käynnistä uudelleen.
Käännöstarkistus `sh Linssit-testit/unity-tarkistus.sh` (sh), pohjavahti `python3 -I tyokalut/pohjavahti.py`. HUOM: zsh:n grep = ugrep,
-r-haut eivät tulosta mitään → käytä /usr/bin/grep tai git grep.

## 1. FPV-HUD (natiivi-backup natiivi-ui/fpv-napit, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-fpv-napit) – KESKEN: 9d32d7d84 JU:lla
- fb9385191 katsottu ja PT kuitannut (fh-3 kallistus ~30° `ui fpvnakyma kallista 30`, horisonttiviiva näkyvään horisonttiin painumalla,
  viivoille HimmennysTumma45-reunus; arkit lokit/nui-fpv-hud-1-{iphone,ipad}-fb9385191/arkki-fpv-hud-1.jpg).
- 9d32d7d84 = fb9385191 + NS:n kamerakulma e3379a7de (automaatti 3°, manuaali 30°). sk proto-3d/_tyo/natiivi-ui/sk-fpv-hud-1.txt: kamerarivit
  poistettu, alku `ui fpvnakyma lento 45.98 6.87 180 34000`. JU ajaa iphone+ipad → lokit/nui-fpv-hud-1-<koko>-9d32d7d84.
- SEURAAVAKSI: katso (fh-2 maisema + horisonttiviiva kohdallaan kamera 3°:lla; fh-3 manuaali 30° → horisontti alempana mutta kehyksessä),
  arkit → PT 3 riviä. PT vie sitten HUD:n KK:lle. Tietorivin nopeus (esim. 366 737 km/h) = jättiläisdronen oikea luku, EI muuteta (PT 12.3x).
- Tehty myös: `ui fpvnakyma lento <lat> <lon> [suunta] [h]`, `ui fpvnakyma fpv <komento…>` (esikatselu ei välitä fpv-rivejä).

## 2. PAIKKAPALKKI 5f8860254 (natiivi-ui/paikkapalkki, worktree wt/proto-natiivi-ui-paikkapalkki, nyt haarassa natiivi-ui/paikkapalkki-paluu)
- 3 kokoa katsottu ja PT:lle lähetetty: p-1–p-6 ok, VIKA p-5a paluulento sumea beige (kaikissa kooissa).
- NS: ennakkokorjaus 75c0c0c47 ei auttanut (revertattu). Uusi: paluun esilataus d554280c0 (natiiviseppa/noston-lento) + NUI:n kutsu
  koehaarassa natiivi-ui/paikkapalkki-paluu 26277d99a (NostonLento: PaluuOdottaa noston auetessa, PaluuPois kun paluuta ei tule).
  NS teettää koeajon. ÄLÄ yhdistä paikkapalkkiin ennen tulosta. Jos p-5a terävä: paikkapalkki ← 26277d99a (fast-forward/merge, tarkistus,
  push natiivi-ui/paikkapalkki), sk-paikkapalkki-1 otsikkoon sha, JU:lle 3 kokoa. OMISTAJA 12.0x: pieni iPad saa paikkapalkin heti, kun valmis ja kuitattu.
- Worktree wt/proto-natiivi-ui-paikkapalkki on checkoutattu haaraan natiivi-ui/paikkapalkki-paluu.

## 3. OPAS: pysäkkilista M-napin alle (PT 12.4x) – KESKEN: JU:n jonossa ketjuna CJ
- Lontoon kyydissä "Westminsterin palatsi ja Big Ben" M-napin päällä (lokit/pk-lontoo-m2-iphone-734ed685d/m2-saapui.png).
- Korjaus natiivi-backup natiivi-ui/opas-m 6ce1efd49 (= juna 223 734ed685d + OpasValikko.MVaisto: lista Matkakirja.Rajat-alueen alle
  Vali.S:n raolla iPhone pysty/vaaka ja iPad), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-opas-m.
- JU ajaa PK:n sk proto-3d/_tyo/pelikoodari/lontoo/sk-m2.txt iphone+ipad → lokit/nui-opas-m-<koko>-6ce1efd49. Katso m2-saapui → PT.

## Muuta
- Vanhat worktreet poistettavissa: wt/proto-natiivi-ui-nostovalikko-juna223, wt/proto-natiivi-ui-nostovalikko (ei poistettu).
- FPV: lokissa "maan yllä 56 km" = pienoismallin mitta (D 28 km), ei vika.
