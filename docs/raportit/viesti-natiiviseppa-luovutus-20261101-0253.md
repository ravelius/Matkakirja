# Natiivisepän luovutus 1.11.2026 klo 02.53 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-0150.md (sen JONO 3–4 ennallaan alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja eikä agentteja.
Koko 60 fps -työ: proto-3d/_tyo/natiiviseppa/fps60/LOYDOS.md (uusimmat osiot "KokoSivuPeitto ja GC", "KokoSivuPeitto: mittaus",
"Seuraava löydös: VieritysHeratys.Update"); työkalut samassa kansiossa.

## JONO
1. **VieritysHeratys (PT kuittasi 02.5x: samalla kaavalla ja SAMOIN EHDOIN, junaan erillisellä kuittauksella).** Löydös: VieritysHeratys.Update
   tekee `d.rootVisualElement.Query<ScrollView>().ToList()` kaikista kerroksista 1 s välein: 1124 ms / 210 s, mediaani 5, p99 12 ms, ≥ 8 ms 40
   (loki lokit/natiiviseppa-fps-kokosivu-jalkeen-ipad-20261101-0225). Ehdot kuten KokoSivuPeitolla: (1) vartijatesti, joka kaatuu, jos uusi
   vieritettävä jää huomaamatta; (2) ennen/jälkeen-kuvat vierityksestä (todistusajo simulla); (3) iPad-mittaus ennen/jälkeen ilman muistitarkkaa,
   testit vihreät. Pohja: runko bb115574d. Haara natiiviseppa/fps-vieritys-216, worktree wt/proto-natiiviseppa-fps (vaihda haaraa siellä).
   Mallit: KokoSivuPeitto-erä (bf3dc5b9f + 8b75e386b; testi KokoRuutuPaatosTestit.SivutKerrosjuurenLahella).
2. **GC-allokoinnit omana eränään VieritysHeratyksen jälkeen** (PT): Puhelin (SystemInfo.deviceModel joka kutsulla) välimuistiin, NimiNakyy ilman
   Substringiä, PiiloVartija.LaskettuSuodin, NostotKartalla.Lyhenna (Regex/Split); löydös + YKSI ehdotus PT:lle ensin.
3. **VS:n kiiltokoe piha 06** (koehaara natiiviseppa/koe67-piha06 = 5a51c8181, wt/proto-natiiviseppa-koe67, ÄLÄ poista): tulos VS:ltä ei tullut.
4. **PK:n taustan LOD -erä EI junaan 216** (PT 31.10.).

## TILA
- **Juna 216 runko = bb115574d** (513998a40 + KokoSivuPeitto 8b75e386b, PT kuittasi 1.11.; puu = 8b75e386b), testit 2223/782/576, tarkista 0,
  peilissä natiivi-backup peili/proto/natiiviseppa/juna-216. Worktree wt/proto-natiiviseppa-ehdokas.
- **Ison iPadin äppi nyt 6c1f3f297** (= edellisen rungon puu; muisti-tarkka.txt = "pois"). Laiteäpit lokit/natiiviseppa-app-216-{projektio 6c1f3f297,
  kokosivu 8b75e386b, ks-fps-d}; vanhat (fps-joutilas, kori, mtkytkin, runko, nimikerros) poistettu levyn takia 1.11.
- **Mittaus:** `AB=kokosivu zsh _tyo/natiiviseppa/fps60/nimikerros-ab.zsh kaanna|mittaa` (lisää uusi AB-haara VieritysHeratykselle; mittaa
  ipad-lukko.sh:n kautta: /Users/Shared/Claude/proto-3d/Matkakirja-proto-esikatselu/tyokalut/ipad-lukko.sh kaari NS -- …). Tarkista xctrace.log:
  "Device got disconnected" = tyhjä profiili → uusi ajo (ennen-uusinta.zsh mallina). Analyysi: piikit-trace.py, kutsukestot.py, kutsujat.py,
  gc-syklit.py, allokoijat.py, jaksot-ryhmittain.py, kuvapari.py.
- **Simu:** oma T7-sarjan natiiviseppa-iPad13 = D61642C8-78D9-4A5C-A731-1A16D739EF66 (simusarja.sh; ÄLÄ luo sisäiseen sarjaan). Todistusajo:
  _tyo/natiiviseppa/kokosivu/aja.zsh (simukäännös linja 2 + todistusajo.sh --laite ipad), skenaario sk-kokosivu.txt mallina. Käännös- ja simuvuoro
  JU:lta ("KÄÄNNÖS NYT"), VALMIS JU:lle UDID:n kanssa.
- **Levy 1.11. (PT:n pyyntö):** 74 → 80 Gi. wt/proto-natiiviseppa-unity67 ja -unity-b5 ovat symlinkkejä T7:lle (ei sisälevyä): unity67-worktree
  poistettiin ja palautettiin haarasta natiiviseppa/unity67-talteen-20261018 (ilman Library/Build), b5:n Library/Build poistettu (syntyvät
  uudelleen). PT: ei muuta korjattavaa, älä poista enempää (JU siirtää lokeja NAS:lle).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen uudessa sessiossa.
- R2-osoittimet ennallaan (uusin-5 → v6k28, uusin-4 → v6k26, uusin-3 → v6h3).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67, -fps eikä T7-kopioita (proto-natiiviseppa-unity-b7 = PROTO_LAITE_KOPIO).
