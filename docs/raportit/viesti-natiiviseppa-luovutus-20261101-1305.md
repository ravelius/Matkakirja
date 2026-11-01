# Natiivisepän luovutus 1.11.2026 klo 13.05 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-0707.md (PR 5825, sisältö tässä ajan tasalla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Ei keskeneräisiä ajoja eikä agentteja.

## JONO
1. **60 fps (PT 13.2x, uusi):** striimikartan vieritys, ruudut > 17,5 ms yhä 17,5 % (seissyt 05.15:stä). Kaava: löydös + YKSI ehdotus
   ≤ 3 riviä PT:lle → kuittaus → haara → mittaus ennen/jälkeen iPadilla. Kohde LOYDOS.md:n jäljellä olevista:
   Nimikerros.LisaaElavat (76 näytettä) tai Cesium-työjaksot (≥ 20 ms -jaksot 53/210 s). LOYDOS: proto-3d/_tyo/natiiviseppa/fps60/LOYDOS.md
   (taulukko ja lokit lopussa). Aloituksesta YKSI rivi PT:lle. Asetukset.Kehittaja ~13 ja VieritysHeratyksen FindObjectsByType ~1 ms/s
   jäljellä pienempinä; PiiloVartija.LaskettuSuodin jätetty pois (PT).
2. **Pariisi uudelleen (omistaja 08.5x, PT 09.18):** koko kartta piirretään Codexilla G:n tyyliin; KS tuo uuden kokoelman + nimiöankkurit
   (merkit piirroksen kohteisiin, ei todellisiin koordinaatteihin). Nykyiset 1 m- ja 0,5 m -palat jäävät runkoon välivaiheena; junan 216
   Pariisi-ehto auki. Valmius: PiirrosKerros muuntaa kankaan px ↔ lat/lon lineaarisesti rajat_maanpinta-rajoista (rivit 182–183, 351–352),
   joten px-ankkurit muuntuvat samalla kaavalla NostotKartalla-sijoitteluun. Merge → testit → käännös → L1/L2/P2 (aja.zsh alla).
3. **VS:n kiiltokoe piha 06** (koehaara natiiviseppa/koe67-piha06 = 5a51c8181, wt/proto-natiiviseppa-koe67, ÄLÄ poista): tulos ei tullut.
4. **PK:n taustan LOD -erä EI junaan 216** (PT 31.10.). PK:n seuraava: v4-kytkentä (rakennukset-v91, c2-v31, muurikate-v37) → NS:lle merge.

## TILA
- **Juna 216 runko = eddff7063** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-216, peili natiivi-backup
  peili/proto/natiiviseppa/juna-216), PT kuittasi 010aba17a 10.5x. Tänään 17ed92b29:n päälle:
  KS lähitaso dbe7e3777 → 01478b78b · PK reitti-216-yhd 8f2bfd128 (tausta-v89f) → 655f80e81 · KS lippu TarkkuusPalatPelissa = true
  7121019ac → ead9e4835 (L1/L2 KK:lle, PT hyvät) · KS Tuileries-nimiö 136ed2af2 → 57ad0a1c4 · KS GC 4613582d5 → 27aba116d ·
  VS räystäskartta db48220d1 (b5 oletus) → d9a3a4144 · VS täyttöpeitto p4 ac18b9074 → 010aba17a · palvelutyökalujen peili yhteisiin
  simuihin → eddff7063. Testit 010aba17a: 2223/787/581, tarkista 0 (eddff7063 vain tyokalut/palvelu, tarkista 0).
- **Räystäskartan pelikuvapari** (PT kuittasi): lokit/pari-raystas216-010aba17a/ junan paketeilla. VS:n k06z20-skenaario (palatsi mallit
  juuri-k06z8) rungolla antaa kattolaikkuja (edusta-v3 päällekkäin), ei täyttöpeitosta → VS:lle. Skenaariot ja ajo:
  proto-3d/_tyo/natiiviseppa/raystas216/ (`SHA=<sha> SK=sk-juna zsh aja.zsh`, esikatselu linjalla 2, vuoro JU:lta; pari.py tekee jpg-parit).
- **Simut (omistaja 10.41):** vain neljä yhteistä, ajo AINA `proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa yhteinen-iPad13 -- …`
  (75 = varattu). Oma natiiviseppa-iPad13 D61642C8 poistuu (alias → yhteinen-iPad13 00CF62C2). piirros/aja.zsh päivitetty lukkoon:
  `SHA=<sha> A=app-<sha> zsh aja.zsh kaanna`, sitten `SK=sk-lahin2 SHA=… A=… zsh aja.zsh todista`. Käännösvuoro JU:lta.
- **Lähin taso:** muualla ElavaLahinLeveys 0,625 (iPad ~2,1 km); Pariisin piirroksen rajoissa 0,45 (1,5 km); tarkkuusalueella 0,225
  (0,6 km korkeus, TarkkuusPalatPelissa = true). Laatat kokoelma/G1m/natiivi/lahi-*.jpg + lahitaso.json (KS; JU vie mediaan).
- **Ison iPadin äppi** d152a0278 (ennallaan). Mittaus ja analyysi: 0516-luovutuksen TILA (nimikerros-ab.zsh, piikit-trace.py jne.).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; 1.11. ei uutta) → luo uudelleen.
- Levy 1.11. 10.2x (PT): poistettu wt/proto-natiiviseppa-fps (mergetty) ja 3 simuäppiä; ehdokas jää (PT). Simuäppi
  piirros/app-57ad0a1c4 viimeisin, muut app-* tyhjiä.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan; ÄLÄ muuta työpuuta ajon aikana; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- tarkista rc=1 → `zsh tyokalut/tarkista.sh` työpuussa näyttää syyn (LIIKEVAHTI: Lerp-rivi ilman `// liikepoikkeus:` samalla rivillä).
- Poiminta toisen roolin koehaarasta ei käy (VS k17 toi koe67:n + vanhan taustan): pyydä yksi haara rungon päälle.
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67 eikä T7-kopioita (proto-natiiviseppa-unity-b7 = PROTO_LAITE_KOPIO).
