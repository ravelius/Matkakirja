# Natiivisepän luovutus 2.11.2026 klo 07.15 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261101-2150.md (sisältö tässä ajan tasalla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä ajoja.

## JONO
1. **KESKEN: LAV rakennukset-v94 (bugi 14 sokkelin saumaviiva, SHA256SUMS dc517ef5e9c9) junaan 218.** Tilattu 07.0x: JU vie
   `_valmiit/juoksupeli-kk-lavastaja-rakennukset-v94-vienti-20261102` → kielletty-rakennukset-v94/, PK vaihtaa RakennusKansion
   v93 → v94 rungon aa44b92a8 päälle. Kun JU:n "VIETY" + PK:n SHA tulevat: merge `--no-ff`, testit, peili, SHA PT:lle + PK:lle + LAV:lle.
2. **Juna 218 jatkuu** (ei TF-tilausta vielä; PT tilaa erikseen). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle
   "kaikille", rivi PT:lle kun testaajilla.
3. **PT:n pysyvät kuittaukset junaan 218:** (a) LAV:n bugikorjaukset (kysy vain jos epäselvä); (b) PK:n korjaukset juoksun 217
   -bugilistasta, kun PK on tarkistanut tallenteen ja lähettänyt sen PT:lle (PK mainitsee sen viestissä). Muut erät (VS, PK:n muut,
   NUI, KS) vain PT:n suoralla kuittauksella. VS:n "PT kuittasi" -viesti SHA:n kera on vakiotapa.
4. **Vakiotapa malli-/laattapaketeille:** NS tilaa viennin JU:lta (polku + SHA256SUMS-tiivisteen 12 merkkiä, tarkista `shasum -a 256
   <paketti>/SHA256SUMS`) ja kansionvaihdon PK:lta (PK muokkaa samoja juoksupelin tiedostoja → ei rinnakkaisia muokkauksia, PT 1.11. 23.2x).
   Merge vasta, kun JU:n VIETY on tullut.
5. 60 fps: seuraavat kohteet LOYDOS.md:ssä vain PT:n tilauksesta. Pariisi uudelleen / VS:n kiiltokoe piha 06: ennallaan.

## TILA
- **TF 217 testaajilla 2.11. 04.15** (iOS + Mac, 216 vanhennettu): lukittu runko **60bd5c356** (haara natiiviseppa/juna-217, peili
  peili/proto/natiiviseppa/juna-217, tagi natiiviseppa/runko-217-tf). Sisältö b1909a35b:n päälle: VS ilmakivi 096f5fd11, varjosävy 1fe307e5a,
  rappaus feba388b9, 06-kamera c9edd5e56; PK korjaus-217 9d9957033 (rakennukset-v92, tausta-v91, taso 1, eunukit, bugi 5), tausta-v92
  cc3286915, osamallit-v7 ef43bfeae, -v8 06ccbb916, tausta-v93 0de77ca2b, rakennukset-v93 980b0b10a, kallistus 22de5be30
  (osasarja-peitto oletuksena pois = muuriportin kameramuutos pois), bugi 14 e834b3941 (c2-v32, muurikate-v38, tausta-v94).
- **Juna 218 runko = aa44b92a8** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218, peili peili/proto/natiiviseppa/juna-218).
  Testit 2223/790/585, tarkista 0. 60bd5c356:n päälle: PK kansiot b9fe9fd69 (c2-v33, osamallit-v9, tausta-v95) · VS taivas 9fa1eee3e ·
  PK bugi 13 ee17f6928 · PK tausta-v96 b43002b54 · VS leivontakynnys ca610fd07 · PK c2-v34 b14d9f55f · PK B2 376375704 (Longzongmen
  läpikulkuportiksi + tausta-v97) · PK tausta-v98 acd2750ae · PK kamera 4 ccc8eeda0 · PK osamallit-v10 d0c013ec9.
- Nykyiset kansiot rungossa: rakennukset-v93, tausta-v98, c2-v34, muurikate-v38, osamallit791-v10.
- **Asemataulu:** junat.json "Juna 218" -rivi on NS:n luoma; rivit lisätään apuskriptillä (scratchpadin taulu218.py: lisää rivin
  "Työn alla:" -otsikon alle ja päivittää rivin + ylätason ts:n; .tmp + os.replace). Tee uusi samanlainen, jos scratchpad on poissa.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas (runko), -muisti, -tyokalut, -koe67, -varjo eikä T7-kopioita. Simut vain simu-lukko.sh:n kautta.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~3,5 min; älä mergeä työpuuhun testien aikana; peili käsin:
  git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Toisen roolin commit puuttuu: `git fetch natiivi-backup peili/proto/<rooli>/<haara>`; puhtaus `git merge-tree --write-tree HEAD <sha>`.
- tarkista rc=1 → `zsh tyokalut/tarkista.sh` työpuussa näyttää syyn; korjaus tekijän haaraan, ei poikkeusta ilman PT:tä.
