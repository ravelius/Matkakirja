# Natiivi-UI: luovutus 9.11.2026 klo 11.25 (kontekstivahti 26 %; korvaa -1046:n, lue se taustaksi: git show 3eba4ea6e:docs/raportit/viesti-natiivi-ui-luovutus-20261109-1046.md)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Kaikki koetta, EI JUNAAN ilman omistajan korttia. Mac-kuvat ensin PT:lle. Arkki: python3 -I <scratchpad>/arkki.py ulos.jpg sarakkeet otsikko kuva1 nimi1 …
(kopio /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/63d0849e-7dae-4c7f-9935-f80ac6b5f8c0/scratchpad/arkki.py).

## PAIKKAPALKKI 818e32b61 (natiivi-backup natiivi-ui/paikkapalkki, wt/proto-natiivi-ui-paikkapalkki)
- JU BH: iphone + ipad valmiit, arkit lokit/nui-paikkapalkki-1-{iphone,ipad}-818e32b61/arkki-paikkapalkki-1.jpg → PT:lle 11.25 (3 riviä).
  KESKEN: vaaka (JU BL, lokit/nui-paikkapalkki-1-iphone-vaaka-818e32b61) → katso, arkki, rivi PT:lle.
- p-1–p-5 ok. VIKA p-5a paluulento beige (iPhone kokonaan, iPad usvan alla) vaikka ccbdaef0a mukana → NS:llä (kerrottu 11.2x, NS ajaa BO-diagnoosin).
  Odota NS:n korjausta, yhdistä paikkapalkkiin ja pyydä uusi ajo.
- p-6: logiikka ok (lokissa "pelaaja liikutti … ei paluuta; palkissa Ranska"), mutta kuva on merta: Cosquerin luola on Marseillen rannikolla
  (1,68 km, kallistus 50°), ja `ui mac veto 0 -250 64 300` vie merelle (p-4:ssä maa on ruudun alaosassa). KORJAA sk (proto-3d/_tyo/natiivi-ui/
  sk-paikkapalkki-1.txt): veto toiseen suuntaan (esim. `ui mac veto 0 250 64 300`) tai sisämaan nosto, jotta p-6:ssa näkyy maata ja nimiä.
- RANSKA-kartuscha ei peitä paikannimiä p-2/p-5:ssä (PT:n kysymys 11.0x) → kerrottu PT:lle.

## FPV-HUD (OMISTAJA 10.58 + kortti 11.00, PT 11.2x) — KOODATTU, Mac-ajo pyydetty
Haara natiivi-backup natiivi-ui/fpv-napit = 579fbbeec (bd885324b HUD + 579fbbeec `ui sulje` sulkee karttalinssien ☰:n), pohja 8a9c891fc,
worktree /Users/Shared/Claude/wt/proto-natiivi-ui-fpv-napit. 0 virhettä; pohja- ja kielivahti ok (valo- ja liikevahti hylkäävät vain
Aurinko.cs, NapaKannet.cs, KartanElama.cs, KaupunkiPuu.shader: ei meidän, pohjassa jo).
1) ☰ (LinssiUi): Topografian ☰:n kytkimet Korkeustasot, Kohokartta (vain kun sarja on), FPV-lento, Manuaaliohjaus (vain lennossa; pois = Automaatti).
   ⛰-kohoKytkin poistettu; FPV:n Automaatti|Manuaali-segmenttinapit poistettu (avaimet ui.fpv.automaatti/manuaali/-vihje pois).
2) Lukemat: vain ISS-tyylinen tietorivi "● FPV · m · km/h" (ennallaan), minipallo ennallaan.
3) UI/Linssit/FpvHud.cs: keskimerkki (W), kallistuva horisonttiviiva (rako keskellä), kallistusasteikko ±60° + osoitin, suuntanauha 60° (P/I/E/L,
   luvut 30°, suunta asteina alla), kehyksen kulmat. Kulmat KAMERASTA (horisontti osuu näkyvään). Väri Tyylikirja.Kuulto.Valkoinen85,
   luvut .mk-fpv__hud-luku (Linssit.uss). Alue: nauha tikkujen väliin, jos mahtuu (≥140 pt), muuten yläpuolelle; kehys joko pallon alle koko
   leveydeltä tai tietorivin alle pallon vasemmalle (isompi). Testi `ui fpvnakyma hud`.
KESKEN: JU:lta pyydetty 11.10 sk proto-3d/_tyo/natiivi-ui/sk-fpv-hud-1.txt (579fbbeec, iphone pysty + ipad, lokit/nui-fpv-hud-1-<koko>-579fbbeec).
Katso fh-1 (☰ rivit), fh-2 (HUD ei peitä tikkuja/palloa), fh-3 (kallistus: `fpv syote 0 0.6 0 0 6`), fh-4 (Manuaaliohjaus), fh-5 (pois)
→ korjaa → arkki VAIN PT:lle. Huom: Pienen luvun kirjasin Moderni; jos HUD katoaa lumen päällä, kysy PT:ltä (ei hehkua, Raamattu 4.4).

## Muuta
- Vanhat worktreet poistettavissa: wt/proto-natiivi-ui-nostovalikko-juna223, wt/proto-natiivi-ui-nostovalikko.
