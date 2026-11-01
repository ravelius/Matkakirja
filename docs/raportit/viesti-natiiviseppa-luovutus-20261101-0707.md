# Natiivisepän luovutus 1.11.2026 klo 07.07 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-0516.md (sen JONO 2–4 ennallaan alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja eikä agentteja.

## JONO
1. **Pariisin 0,5 m/px -tarkkuusalue (PT 06.4x):** KS:n palat tulevat myöhemmin (Codex, 35 palaa). Kun KS tuo ne ja kääntää
   `PiirrosKerros.TarkkuusPalatPelissa = true` (rajat jo `Tarkkuusalueet`-palikassa: 48.875387 / 48.841340 / 2.319263 / 2.368198):
   merge runkoon → käännös → L1/L2 (Notre-Dame, Louvre) lähimmältä tasolta 0,75 km → PT (KK arvioi terävyyden).
   Skenaario valmiina: proto-3d/_tyo/natiiviseppa/piirros/sk-lahin2.txt (aja: `SHA=<sha> A=app-<sha> zsh aja.zsh kaanna`,
   sitten `SK=sk-lahin2 U=<UDID> zsh aja.zsh todista`).
2. **1,5 km:n terävyys:** kuvat PT:llä (todistus-piirros-sk-lahin3-20261101-0700: T1-eiffel, T2-montmartre, T3-notre-dame). Jos KK pitää
   pehmeänä, säädä `PiirrosKerros.LahinLeveys` (0,45 ≈ 1,5 km; 0,54 ≈ 1,8 km) + vartijatesti Kartta-testit/Testit/PiirrosLahinTestit.cs (raja 1,3–1,7 km).
3. **Seuraava GC-löydös vain PT:n pyynnöstä (YKSI ehdotus ensin):** Nimikerros.LisaaElavat 76, Asetukset.Kehittaja ~13,
   VieritysHeratyksen FindObjectsByType ~1 ms/s (PiiloVartija.LaskettuSuodin jätetty pois, PT hyväksyi).
4. **VS:n kiiltokoe piha 06** (koehaara natiiviseppa/koe67-piha06 = 5a51c8181, wt/proto-natiiviseppa-koe67, ÄLÄ poista): tulos VS:ltä ei tullut.
5. **PK:n taustan LOD -erä EI junaan 216** (PT 31.10.).

## TILA
- **Juna 216 runko = 17ed92b29** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-216, peili natiivi-backup peili/proto/natiiviseppa/juna-216),
  testit 2223/787/580, tarkista 0, simuäppi käännetty (proto-3d/_tyo/natiiviseppa/piirros/app-17ed92b29). Tänään päälle 19e8ec057:n:
  KS Pariisin piirroskartta 3cbf4c3ed + nimiöt 279120237, 774e26da0 · VS päivätaivas v3-8192 (8 commitia, 003c9fd38…349c86061) ·
  NS lähin taso 3c053fe0d → e34b17986 (1,5 km) → e2286e5c3 (tarkkuusalue) · PK reitti-216-yhd 8b38e9b9f (reitti c5j, maaliovet, c2-v30,
  muurikate-v36, tausta-v89e, rakennukset-v90, edusta-v3) · 2 liikevahtikorjausta (b9f46d37a VS:n TaivasPalat, 17ed92b29 PK:n kurkistuskenttä;
  VS poimi omansa, PK:lle ilmoitettu).
- **Lähin taso (PalloKierto.MinKorkeus):** muualla elävän kartan ElavaLahinLeveys 0,625 (iPad ~2,1 km, lähin korkeus 1,7 km);
  Pariisin piirroksen rajoissa `PiirrosKerros.LahinLeveysPaikassa` → 0,45 (1,5 km, korkeus 1,2 km), tarkkuusalueella 0,225 (0,75 km,
  korkeus 0,6 km) vasta TarkkuusPalatPelissa. Puhelin syvemmälle samalla 1,5-kertoimella (puhelimenLahizoomi). Tunnettu: alueelta ulos
  panoroitaessa matalalla kamera nousee vasta seuraavassa nipistyksessä.
- **Simukuvat Pariisista:** proto-3d/_tyo/natiiviseppa/piirros/aja.zsh (SIMCTL_CHILD_MATKAKIRJA_PIIRROS = KS:n G1m/natiivi, koska
  media-vienti odottaa PK:ta); skenaariot sk-pariisi, sk-lahin, sk-lahin2, sk-lahin3, sk-p2. Kameranäkymät `komento aja lat lon kaari s`
  (kaari 0.0001 = lähin taso), `komento lahinleveys 60` tulostaa lähimmän korkeuden.
- **Simu:** oma T7-sarjan natiiviseppa-iPad13 = D61642C8-78D9-4A5C-A731-1A16D739EF66. Käännös- ja simuvuoro JU:lta, VALMIS JU:lle.
- **Ison iPadin äppi** d152a0278 (ennallaan, 0516-luovutus). Mittaus ja analyysi: 0516-luovutuksen TILA (nimikerros-ab.zsh, piikit-trace.py jne.).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen uudessa sessiossa.
- Siivottavissa (omia simuäppejä, PT:n kuittauksen jälkeen): proto-3d/_tyo/natiiviseppa/piirros/app, app-b9f46d37a, app-dc7155b4f (keskeytetty),
  _tyo/natiiviseppa/vieritys/app-*, kokosivu/app-jalkeen.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan; ÄLÄ muuta työpuuta ajon aikana; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- tarkista rc=1 → `zsh tyokalut/tarkista.sh` työpuussa näyttää syyn (tänään 2× LIIKEVAHTI: Lerp-rivi ilman `// liikepoikkeus:` samalla rivillä).
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67, -fps eikä T7-kopioita (proto-natiiviseppa-unity-b7 = PROTO_LAITE_KOPIO).
