# Natiivisepän luovutus 10.11.2026 klo 07.40

Edellinen: git show ee381a96d:docs/raportit/viesti-natiiviseppa-luovutus-20261110-0715.md (levy, kartan purku, TOP 10). Syy: kontekstivahti ~30 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …"). Repo natiivi-backup (remote natiivi-backup). Älä poista mitään.

## LEVY: siirto-wt.zsh KÄYNNISSÄ (aja uudelleen taustalla, jos katkesi; valmiit "ei kansiota")
/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/levy/siirto-wt.zsh > .../levy/siirto-wt-<hhmm>.log 2>&1
07.39: ennakkokoe, fpv-lataus, fpv-vuoret siirretty; fpvkamera kesken (alkoi 07.35). Df alussa 12,8 Gt, 07.39 14 Gt.
Loppuun: rivi PT:lle (montako, paljonko vapautui). UUSI worktree proto-natiiviseppa-museo (työn alla, ei siirretä).

## TEHTY TÄLLÄ VUOROLLA
- Kartan purku c31e0eb9e (JU 07.24): yövalot natiivi R8 ✓, Cesium-osa ilman VIKAa (huippu 3890), P1/P2 katsottu ehjät; ISS VIKA 4151
  = ISS:n oma taso (ISS yksin A/B 4106/4134). Raportoitu PT:lle 07.29: ehdotus purku junaan Cesium-osan perusteella, ISS-muisti
  erillisenä työnä, P3/P4 uusinta ilman pysäytystä → ODOTTAA PT:N PÄÄTÖSTÄ. Analyysi: _tyo/natiiviseppa/iso/raportti-kartan-purku.md (loppu).
- TOP 10 #4 MUSEO PALVELIMELLE 91bc37c4b (natiivi-backup natiiviseppa/museo-palvelimelle, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-museo,
  juna-224 6fc74dc14 + 1): build −50 Mt, osa museo v1 38,2 Mt (paketti _tyo/natiiviseppa/iso/museo-v1). Raportoitu PT:lle 07.40
  (jonossa) → ODOTTAA: JU:n Mac-ajo paikallisella ämpärillä + vienti; NUI:n latausilmaisin (MuseoSovitin.KuvaOdotus).
  Ohje: _tyo/natiiviseppa/iso/raportti-museo.md. Avauskomento skenaarioon: katso KaupunkiPallot.cs:158 ("linssi museo pariisi 1") / JU:n museoajot.

## SEURAAVA JONOSSA (Tekninen kunto)
- ISS:n muisti (~1,7 Gt cupolassa: tekstuurit +850, malloc +980, comp +570; pallon välimuisti 256 Mt, S2, katuvalot, revontulet)
  – vain jos PT antaa (ehdotettu 07.29).
- TOP 10 jatko: KavelyKerrokset 16,9, IssPaneeli 15,7 + Raketti 14,2 (sama malli kuin Museo: MuseoKuvat/IsoSisalto + iso-kuvat-astc.py).
- VS-viestit (tulivuoret palvelimella; Revontulet.PaivitaNakyvyys:207 MissingReference): ks. 0510-luovutus.
