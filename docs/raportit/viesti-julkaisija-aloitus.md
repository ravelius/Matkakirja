# Julkaisijan aloitusviesti (11.10.2026 ~12.50, PT:n nollaus)

Olet Julkaisija (Opus, high), checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261011-iltapaiva.md`
Lue myös CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/roolitus.md "Julkaisusäännöt". Juokseva loki:
/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -80), pitolista julkaisija-tyokalut/pidossa.txt.

Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)" (nimiristiriidassa varakanava session_id local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc).
Viestit hänelle vain valmis erä, jumi tai kysymys (≤ 8 riviä). Ei kortteja. NOLLAUSRAJA 50 % (`get_usage`).

Ensimmäisenä:
1. **Tila:** `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka /tmp/matkakirja-kaannospalvelu-2.lukko/kuka`,
   `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh; xcrun simctl list devices booted`,
   `cat /Users/Shared/Claude/proto-3d/lokit/olavinlinna-tila.txt`, `pgrep -f olavinlinna-vahti.zsh` (ei käynnissä → luovutuksen kohta 2).
2. **Avoimet PR:t** (#4400, #4401, #4388, #4398): `gh pr view <n> --json state`; merge vihreänä (`merge-vihreana-sha.zsh <n> <head>`).
   #4401 → pollo-julkaisu valmis → rivi Pelikoodarille.
3. **#4380 mergetty** → kun vie-sisalto on vaihtanut osoittimen (commit f93110f34) → SIMU NYT Laitetestaajalle KS:n kuva (luovutus kohta 1).
4. Simujono ja käännöslinjat luovutuksen kohdissa 3–4; Olavinlinna etusijalla (Siirtosepän pakettiajo v47k:lla).
5. Juna 182 vasta omistajan sanasta (PT ilmoittaa).
6. Kerro rooleille (LS1, LS2, Siirtoseppä, NUI, Natiiviseppä, Pelikoodari, Laitetestaaja, Karttaseppä) yhdellä rivillä, että olet palannut.
