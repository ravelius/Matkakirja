# Natiivisepän luovutus 1.11.2026 klo 05.16 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-0253.md (sen JONO 3–4 ennallaan alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja eikä agentteja.
Koko 60 fps -työ: proto-3d/_tyo/natiiviseppa/fps60/LOYDOS.md (uusimmat osiot "VieritysHeratys: mittaus", "GC-allokoinnit",
"GC-kevennys 1: mittaus"); työkalut samassa kansiossa.

## JONO
1. **GC-kevennys 1 odottaa PT:n kuittausta** (raportoitu 05.15): haara natiiviseppa/fps-gc-216 = 72b039301 (peilissä), pohja runko 28d8f3486.
   Kohdeallokoijat (NimiNakyy, deviceModel, Lyhenna/Regex) 181 → 0, allokointi 818 → 731 ms / 210 s, GC-viipaleet 385 → 327 ms (max 30 → 18),
   testit 2223/782/578, tarkista 0, nimikuvapari 0,03–0,21 %. Kuittauksen jälkeen: merge runkoon wt/proto-natiiviseppa-ehdokas
   (`git merge --no-ff natiiviseppa/fps-gc-216`, viesti mallina 28d8f3486), peili juna-216, uusi runko-SHA PT:lle.
2. **Seuraava löydös vain PT:n pyynnöstä (YKSI ehdotus ensin):** jäljellä Nimikerros.LisaaElavat 76 (merkkijonoliitokset Id/Luokka),
   PiiloVartija.LaskettuSuodin 51 (resolvedStyle.filter → ToManaged; ei allokoimatonta API:a, PT hyväksyi pois jättämisen),
   Asetukset.Kehittaja (PlayerPrefs.GetString joka kutsulla ← Testaaja, ~13), VieritysHeratyksen FindObjectsByType ~1 ms/s.
3. **VS:n kiiltokoe piha 06** (koehaara natiiviseppa/koe67-piha06 = 5a51c8181, wt/proto-natiiviseppa-koe67, ÄLÄ poista): tulos VS:ltä ei tullut.
4. **PK:n taustan LOD -erä EI junaan 216** (PT 31.10.).

## TILA
- **Juna 216 runko = 28d8f3486** (bb115574d + VieritysHeratys d152a0278, PT kuittasi 04.1x; puu = d152a0278), testit 2223/782/577, tarkista 0,
  peilissä natiivi-backup peili/proto/natiiviseppa/juna-216. Worktree wt/proto-natiiviseppa-ehdokas (haara natiiviseppa/juna-216).
- **VieritysHeratys** (d152a0278): UIDocumenttien juuriin ChangeEvent<float>-kuuntelija TrickleDown, ei UQuerya; 1181 → 121 ms / 210 s,
  ≥ 8 ms 51 → 0. Komento `peli vieritys` tulostaa "vieritettäviä N, seurannassa M". Simutodistus _tyo/natiiviseppa/vieritys/ (sk-vieritys.txt:
  oppaan Eurooppa-lista; museo ja oppaan aloitus mahtuvat iPadin vaakaruutuun → ei vieritettävää).
- **Ison iPadin äppi nyt d152a0278** (= rungon puu; muisti-tarkka.txt = "pois"). Laiteäpit lokit/natiiviseppa-app-216-{vieritys d152a0278,
  gc 72b039301, kokosivu 8b75e386b, ks-fps-d}; projektio-äppi poistettu levyn takia. Palautus: _tyo/natiiviseppa/fps60/palauta-runko.zsh.
- **Mittaus:** `AB=gc zsh _tyo/natiiviseppa/fps60/nimikerros-ab.zsh kaanna|mittaa` (uusi erä = uusi AB-haara; mittaa ipad-lukko.sh:n kautta,
  IPAD_ODOTA=<s> jonottaa). Ketju mallina gc-ketju.zsh. xctrace.log "Device got disconnected" = tyhjä profiili → uusinta (gc-jalkeen-uusinta.zsh).
  Analyysi: piikit-trace.py (vie time-profile.xml:n ensin), allokoijat.py, kutsujat.py, kutsukestot.py, gc-syklit.py, jaksot-ryhmittain.py, kuvapari.py.
- **Simu:** oma T7-sarjan natiiviseppa-iPad13 = D61642C8-78D9-4A5C-A731-1A16D739EF66; todistus _tyo/natiiviseppa/vieritys/aja.zsh (kaanna|todista).
  Käännös- ja simuvuoro JU:lta ("KÄÄNNÖS NYT"), VALMIS JU:lle UDID:n kanssa.
- **Levy** 82 Gi (LAV:n leivonta odottaa ≥ 82 Gi). Siivottavissa PT:n kuittauksen jälkeen: _tyo/natiiviseppa/vieritys/app-jalkeen ja
  kokosivu/app-jalkeen (simuäpit, 0,7 Gi kumpikin).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen uudessa sessiossa.
- R2-osoittimet ennallaan (uusin-5 → v6k28, uusin-4 → v6k26, uusin-3 → v6h3).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan: väliaikaiskansio on yhteinen; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67, -fps eikä T7-kopioita (proto-natiiviseppa-unity-b7 = PROTO_LAITE_KOPIO).
