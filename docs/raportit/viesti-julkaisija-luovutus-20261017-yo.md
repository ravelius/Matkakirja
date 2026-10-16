# Julkaisijan luovutus 17.10.2026 klo 00.3x (Postivahti: kova raja 37 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -200). Edellinen: `viesti-julkaisija-luovutus-20261016-ilta.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. **Lukituslista: `julkaisija-tyokalut/lukituslista-197.md` – lue ENSIN.**

## 0. ENSIN (nollauksen jälkeen)
1. **SIGSTOP-pidossa olevat prosessit (jäävät jumiin, jos kukaan ei jatka):**
   - `86295` NUI museo-kortit-ketju.zsh (716614385): pysäytetty, ettei sen simuajot (123B4B25 + F7513985) käynnisty ilman SIMU NYT:tä.
     **`kill -CONT 86295` = SIMU NYT NUI:lle**, kun Pelikoodarin simuajo (96044270, museo-korkeus d79778a43, annettu 00.26) on SIMU VAPAA.
   - `11782` NUI f078b174d (Cupola Ohita) L2-odottaja: irrotettu `yo-ketju-20261017.zsh` (pid 12543) jatkaa sen kun LS on lukossa.
   Tarkista: `ps -o pid,stat,command -p 86295,11782` (T = pysäytetty).
2. Irrotetut kääreet (selviävät nollauksesta): `yo-ketju-20261017.zsh` (LS lukkoon → NUI f078 CONT + PK raketti-telakointi-197 160db49aa
   → 96044270, app _tyo/pelikoodari/raketti-pulu-197-app) ja `karttaseppa-issrajat197.zsh` (raketin jälkeen KS iss-rajat-197 2d0957ef6,
   app _tyo/karttaseppa/iss-rajat-197-app, ei asennusta). Lokit samannimiset .log. KÄÄNNETTY-ilmoitukset PK:lle ja KS:lle (+ SHA-tarkistus
   `merge-base --is-ancestor`).
3. **PR #4746** (NUI lukijan valinnat pois, omistaja 23.58, juna 197): sessio-odottaja kuolee nollauksessa → `gh pr checks 4746`, merge vihreänä.
4. Cron NAS-bundle (session-only): `CronCreate "3 4 * * *"` → `zsh /Users/Shared/Claude/proto-3d/tyokalut/bundle-natiivi-nas.sh >> julkaisija-tyokalut/bundle-natiivi-nas.log`.
5. Valovahti TAUOLLA (`/tmp/matkakirja-valovahti-tauko`) – ennallaan.

## 1. YÖSÄÄNTÖ (PT 23.55) ja järjestys (PT 00.2x)
- **1 käännös + 1 simu kerrallaan**, kunnes swap tasaantuu (23.4x levy putosi 3 Gi:hin swapin takia; syy xcodebuild/dsymutil + Codex + 2 simua).
- Junan 197 pakolliset ensin; Valosepän työt vasta lopuksi/välissä.
- L2 00.28: lukossa NUI 716614385 (00.25) → LS vapaalento-197 da98b2e4a (89080) → NUI f078b174d / PK raketti-telakointi-197 → KS iss-rajat-197
  → Valoseppä pyramidi-lasi c49687f22 (ilmoita hänelle KÄÄNNÖS NYT, hän ei jonota itse).
- Simu 00.28: PK museo-korkeus 96044270 (käynnissä) → NUI korttiketju (CONT 86295) → SS äänipohja 0ecaaaceb (`touch proto-3d/tyokalut/siirtoseppa-ajot/simu-aanipohja.nyt`, 95EEDB48 ~8 min)
  → NUI Cupola Ohita (SIMU NYT viestillä) → LS vapaalento BD64C8E4 (~15 min, pyytää itse) → KS iss-rajat 123B4B25 (~6 min)
  → PK raketti 96044270 → Valoseppä pyramidi uusinta (~8 min) + valas k3 (~15 min).
- iPad 00CF62C2 (LS) vapaa; NUI museo ei ole pyytänyt.

## 2. JUNA 197 – OMISTAJA PYYSI JULKAISUA 22.45 ("julkaise heti kun nämä valmiina", PT)
- Lukitus + TF heti kun PT:n taulun Työn alla -kohdat ovat NS:n rungossa ja PT kuittaa omistajan ok:t (fontti, auto zoom/kävely, pienoismallit, i-kortti).
- Omistaja 22.24 (pysyvä): kaikki yhteen junaan (198 → 197).
- Valmiina: `muistiajo-197.txt` OHITETTU, `tf-kaynnista.sh 197 <proto-täysi-SHA> <M>`; TF-rivi PT:lle ja KK:lle.
- **Lukituksessa: osoitin uusin-4 v6k19 → v6k22** (`osoitin-omat-mallit.sh 6k22 4`; PT vahvisti 23.2x).
- Viedyt (kaikki CDN 200/SHA): v6k20, v6k21, **v6k22** (Louvre k57), opas/esittely-v2 + v2a (7 pääkaupunkia), aanet/taidemuseo-kertoja-v2/manifest-198.json,
  opas/pallokierros-v7/koopenhamina.json, opas/historia-v2/praha.json, audio/raketti-selostus-v8.mp3 + raketti-aanet-v13.json.
  Huom: osa paketeista paketoitiin itse (-b), koska roolien kansiosta puuttui SHA256SUMS/LAHTEET.md lisenssillä tai polku.

## 3. MERGET TÄNÄÄN
#4711, #4713 (KS 7 pääkaupunkia), #4718, #4720 (KS Kiina), #4726, #4727, #4728 (NUI), #4730, #4734, #4738, #4740, #4742 (NUI, lukitusehto). #4729 oli jo mergetty.

## 4. OPIT
- L2-etusija: odottajat (ei lukossa) voi pitää `kill -STOP` / `kill -CONT` – ei jälkiä; SIGSTOP pysäyttää myös proto-kaanna.sh:n tunnin jonorajan laskurin.
  Vanhentunut lukko (kuollut pid) napataan heti → pidä muut odottajat pysäytettyinä ennen kuin vapautat etusijaisen.
- Ketju, joka käynnistää simun itse käännöksen jälkeen: SIGSTOP ketjun zsh (lapsi-käännös jatkuu) → simuportti.
- Swap täyttää levyn: dsymutil/xcodebuild + 2 simua + Codex → levy 44 → 3 Gi 20 minuutissa. Tapa: TERM käännöksen prosessiryhmä (`kill -TERM -<pgid>`).
- Sessio-taustatyöt kuolevat nollauksessa → pitkät kääreet perl-setsid-irrotuksella (kuten tf-kaynnista.sh).
- Kärjen vaihto ennen lukkoa ei vaadi toimia (kääre kääntää haaran kärjen) – uusi haaranimi vaatii kääreen muutoksen.
