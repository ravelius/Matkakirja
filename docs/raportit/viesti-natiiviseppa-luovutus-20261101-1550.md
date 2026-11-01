# Natiivisepän luovutus 1.11.2026 klo 15.50 (konteksti 33 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-1305.md (PR 5849, sisältö tässä ajan tasalla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Yksi Unity kerrallaan linjalla (lukot). Käynnissä: havainnepari (alla, JONO 1).

## JONO
1. **Havainnepari valonipusta PT:lle ja VS:lle (PT 15.3x "pari PT:lle ja VS:lle"):** ajossa 15.45 alkaen
   `REF=65ceff743 RUNKO=natiiviseppa/juna-216 zsh tyokalut/havainne/editori.sh kaikki` (wt/proto-natiiviseppa-ehdokas), tuloste
   proto-3d/_tyo/natiiviseppa/varjo-rakennus/havainne-65ceff743.out, viimeinen rivi "HAVAINNE VALMIS <kansio>". Kun valmis: rivi PT:lle ja
   VS:lle (mitä, sha 65ceff743, kansio + pari-*.jpg / koonti.png). Jos ajo kaatui (pid kuollut, ei VALMIS-riviä), aja uudelleen.
2. **60 fps (valotyön jälkeen, omistaja 13.46 "visuaalisuus ensin"):** PT 15.0x: toista elävät nimet -mittaus uudella rungolla; jos
   ≥ 20 ms -jaksojen kasvu (84 → 96) pysyy, YKSI rivi syystä PT:lle. Ajo: proto-3d/_tyo/natiiviseppa/fps60/nimikerros-ab.zsh: lisää
   AB-haara (ennen = 9697d5d48 = runko juuri ennen fps-mergeä, jälkeen = 65ceff743), molemmat käännetään. Käännösvuoro JU:lta,
   Iso iPad ipad-lukolla (tyokalut/ipad-lukko.sh kaari NS -- …). Analyysi: ruudut.py, jaksot-ryhmittain.py, kutsukestot.py (LOYDOS.md loppu).
   Seuraavat kohteet LOYDOS.md:ssä: LisaaElavat-rivien luonti (Aluenimi/Paikat/Id), Cesium-työjaksot, latausjaksot ("muu" 100–475 ms).
3. **Pariisi uudelleen (omistaja 08.5x, PT 09.18):** ennallaan, ks. edellinen luovutus (KS tuo kokoelman + nimiöankkurit; PiirrosKerros
   px ↔ lat/lon lineaarisesti rajat_maanpinta-rajoista).
4. **VS:n kiiltokoe piha 06** (koehaara natiiviseppa/koe67-piha06 = 5a51c8181, wt/proto-natiiviseppa-koe67, ÄLÄ poista): tulos ei tullut.
5. **06-varjo on VS:llä (PT 15.4x: "älä selvitä 06:ta")**; NS antoi VS:lle koodihavainnon (Muurikate.cs:613 leivotut instanssit aina
   ShadowCastingMode.Off; JuoksuLattia.shaderin ShadowCaster ilman multi_compile_instancing).

## TILA
- **Juna 216 runko = 65ceff743** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-216, peili natiivi-backup
  peili/proto/natiiviseppa/juna-216). Tänään eddff7063:n päälle: PK v4-kytkentä 30729dd84 → 76bb81fd8 · PK tausta v90 f9e39c9a7 → aea684c3c ·
  VALONIPPU (PT 15.3x): PK kivi-216 a1de2563d (sis. VS aurinko a8c8835e5, VS varjo-216 067a0fc38, VS:n editori.sh-poiminta 82c1d9f3d) →
  402e6fc0a · NS Taihemen-varjo 814844b18 → 9697d5d48 · NS 60 fps elävät nimet 70861ee16 → 65ceff743. Testit 65ceff743: 2223/787/584,
  tarkista 0. VS:n k17-koehaaraa 29fbc5ecf EI mergetty (51 committia, koe67 + vanha tausta); sen ainoa tarvittu muutos (editori.sh
  odota-maailma 90 1) tuli PK:n poiminnan kautta.
- **Rakennusvarjon syy (PT kuittasi 814844b18):** kohdan 03 rakennukset ovat f-taihemen-taustaa; OnTaihemen (JuoksuV4Maailma.Valo.cs, PT 25.10.)
  pakotti heiton Off ohi LeivotutHeittavat- ja heitto 1 -kytkimien. Korjaus: sääntö vain kun LeivotutHeittavat = false. Kumotut: vastaanottajat
  (QA saakaikki: 30 muutettua, ei muutosta), leivonta 0, häivytys 165–195 m, valon kerrosmaski. Parit lokit/esikatselu-20261101-153258/
  pari-ennen-jalkeen.jpg; diagnoosit lokit/esikatselu-20261101-150350 ja -151322; skenaariot proto-3d/_tyo/natiiviseppa/varjo-rakennus/.
  Diagnoosihaarat (EI junaan): natiiviseppa/varjo-diag-216 878d5ad13 ja varjo-diag06-216 0ecb6b4f5 (pintatieto: heitto/saa/juuri, QA
  `valo saakaikki`); worktree wt/proto-natiiviseppa-varjo (voi poistaa, kun VS ei tarvitse).
- **60 fps elävät nimet (PT kuittasi junaan, nyt rungossa):** KaupunkiRuudut.cs (pelin kaupungit 0,3°:n ruuduissa) + Karsi kevyemmäksi;
  iPad: PelinKaupunki 319 → 12 ms, LisaaElavat 659 → 271 ms (p99 7 → 6), ruudut > 17,5 ms 21,0 → 20,1 %, ≥ 20 ms -jaksot 84 → 96 (vaihtelu,
  JONO 2). Nimikuvat ennallaan. Taulukko proto-3d/_tyo/natiiviseppa/fps60/LOYDOS.md loppu. Worktree wt/proto-natiiviseppa-fps (haara
  natiiviseppa/fps-elavat-216) mergetty → voi poistaa `git worktree remove`.
- **Ison iPadin äppi** d152a0278 (palautettu 13.55). Laiteäpit lokit/natiiviseppa-app-216-runko-eddff ja -elavat.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen.
- **Simut (omistaja 10.41):** vain neljä yhteistä, ajo AINA `proto-3d/tyokalut/simu-lukko.sh kaari natiiviseppa yhteinen-iPad13 -- …`.
- **Lähin taso:** muualla ElavaLahinLeveys 0,625; Pariisin piirroksen rajoissa 0,45; tarkkuusalueella 0,225 (TarkkuusPalatPelissa = true).
- Havainne-editorin skenaarioissa `odota-maailma 90 1` (VS 15.2x: 90 100 osui aikarajaan).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Laitekäännös: T7-kopio tarvitsee commitin → push peiliin ja `git -C "/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7" fetch natiivi-backup <ref>`.
- tarkista rc=1 → `zsh tyokalut/tarkista.sh` työpuussa näyttää syyn (LIIKEVAHTI: Lerp-rivi ilman `// liikepoikkeus:` samalla rivillä).
- Poiminta toisen roolin koehaarasta ei käy: pyydä yksi haara rungon päälle.
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas, -muisti, -tyokalut, -koe67 eikä T7-kopioita (proto-natiiviseppa-unity-b7 = PROTO_LAITE_KOPIO).
