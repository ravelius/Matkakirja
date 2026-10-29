# Natiivisepän luovutus 27.10.2026 klo 15.58 (konteksti 30 %; juna 212 runko ad9759bc6)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna212/jono-212.txt (loppu = uusin).
Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Lavastaja local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e (juoksupelin raportit KK:lle; junat, merget ja Olavinlinna PT:lle).

## TILA
- **Juna 211 = lukitusehdokas 18aa33115** (ennallaan; Mac 211 käännetty, LUKITUS/TF = JU).
- **Juna 212 runko natiiviseppa/juna-212 = ad9759bc6** (wt/proto-natiiviseppa-ehdokas, puhdas; peili natiivi-backup
  peili/proto/natiiviseppa/juna-212 = ad9759bc6). Testit VIHREÄT 2213/757/563, tarkista 0, METAL 440/0, PIPELINE 432/0.
  Tänään 12.25 jälkeen mukaan: KS koko-pallo ae53f793c, KS merkit-212b b807c0aec → 85290f5fe → b844e955a, NUI tietokortti a9f2f829f →
  eabaaa896 → 60cfa418d, KS kerrokset-212 0353bde41, NUI kartta-valilehti da59c64ec, NUI lippu-sumennus 7217981fa, VS seinat-211 d7358dfff.
  Riippuvuus: tietokorttien Lue lisää -osat vaativat KS:n worker-PR 5323:n julkaistuna (ilman sitä ei kaadu). Ei laitekäännöksiä.
- Esikatselu.sh vain linjalla 2 (PT 15.5x: L1 = JU:n jono). Omat testit (testit210-rinn.sh, metal-tarkistus.sh) eivät käytä L1:tä.

## OLAVINLINNA (Codex, juoksupelin väleissä) – NS tarkistaa, PT kuittaa rakenteen, Lavastaja kokoaa
- Palatsi #1003: rakenne PT ✓, pinnat V2 ✓ (a9d10880f) → Lavastaja kokoaa palatsi-v2.glb.
- 3a kirkkotorni-portaat: rakenne PT ✓, V2 ✓ → Lavastaja kokoaa kirkkotorni-portaat-v2.glb.
- 3b kappeli-kavely: rakenne PT ✓, V2 ✓ (391aa80fc) → Lavastaja kokoaa kappeli-kavely-v2.glb.
- **3c muurikäytävä+harja+komero+pako (404e7ccd1): NS hyväksyi rakenteen, PT:n kuittaus KYSYTTY 15.5x.** V2 tilattu 391aa80fc:
  komeron tiilitäyttö nykytiilestä 1499-tiileksi (sama sävyperhe kuin esine-tiili-komero), pakokallion pinta + mustat tasot selitys.
  Lavastaja piilottaa `komero_tiilitatto`-verkon, kun suu avataan.
- **3d tyrmä E101: tulossa** (tilaus 8965de38f).
- Hahmot: kokki + portinvartija Tripo (Mixamo 65, ~0,98 m) → Codex lisää 6 ARKit-muotoa (jawOpen, mouthClose, mouthFunnel,
  mouthPucker, eyeBlinkL/R; vastaus 5c37d8709, kuittaus a2f9cdf57). Kun toimitus tulee: tarkista muotonimet + jawOpen 0/0,5/1 -kuvat.
- Aarre J3 hopeapikari + J4 arkun sisältö: Codexin jonossa (Tripo toimii taas, 107dbc357).
- Tarkistuskaava: `zsh natiiviseppa-skriptit/pura-posti.sh <repo> <posti/kansio> <scratch>` (purku + NFC-nimet; macOS-tar tekee NFD:n
  → tarkistin hylkää) → `shasum -a 256 -c SHA256SUMS[-v2]` → `node tools/codex-3d-tarkistus.mjs <kansio>` (V2-tiedostoille oma kansio
  + SHA256SUMS + LAHTEET) → kaikki kuvat täysikokoisina → kuittaus postiin → rivi PT:lle (kysy rakenteen kuittaus).
  Palautteen vakiokohdat: harmaa luonnonkivilattia, epäsäännöllinen muuraus kalkkilaastissa 2,5 m/toisto, ei peilattua UV:tä,
  askelmat kivilohkoina, mustat alueet: varjo vai pinta (varjoton kuva).

## TYÖTAPA
- Posti: `zsh natiiviseppa-skriptit/posti.sh <repo> <lähde.md> posti/<nimi>.md "<viesti>"` (plumbing, oma indeksi).
- Merge: ff kun suora jatko, muuten `merge --no-ff -m "Juna 212: merge …"` → testit `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh <wt>`
  → (*.shader/*.hlsl: + `zsh tyokalut/metal-tarkistus.sh <ulos>`, sitten `git checkout -- Assets/Settings/UniversalRenderPipelineGlobalSettings.asset;
  git clean -fdq`) → peili `git push -f natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-212` → rivi PT:lle.
- Jos tekijä pyytää pidätystä jo mergetylle: tarkista onko lopullinen suora jatko (ff), älä pushaa peiliä ennen lopullista.
- "FAIL AanimuistivahtiTestit…" testilokissa on vanha jäänne; summa ratkaisee.

## MUUTA
- Cronit (session omat, luotava uudelleen): Unity-beeta "4 9 * * *" (natiiviseppa-skriptit/unity-julkaisut.py), postilaatikkovahti "17,47 * * * *".
- Levy: wt/proto-natiiviseppa-diag poistettu 15.0x (Postivahti/PT). Säilyvät: -ehdokas (runko), -tyokalut (ÄLÄ POISTA); unity-b5/unity67 T7:llä.
