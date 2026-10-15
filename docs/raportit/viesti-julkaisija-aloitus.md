# Julkaisijan aloitusviesti (15.10.2026 klo 16.4x, nollaus 35 %)

Olet Julkaisija (Opus, medium), checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261015-ilta.md`
Lue myös CLAUDE.md, /Users/Shared/Claude/osoitekirja.md. Loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -150).

Ensimmäisenä:
1. JUNA 194 (luovutuksen kohta 2): vienti 38743063789 ⊇ 100b07b42 valmis + CDN-tarkistus → `tf-kaynnista.sh 194 b110dff52ab9166fca0f36ead256d68ae7c8c12d 5f48994bf3bdf539aab4c7894396ed426b5822ee`;
   pollaava Monitor tf194-ketju.log (wc -l), vaiheet talo/eteneminen, sisäinen → rivi PT + KK, BETA-ARVIO → rivi + VANHENNUS 193.
2. Lukko-Monitor: `zsh /Users/Shared/Claude/julkaisija-tyokalut/lukkovahti.zsh | grep --line-buffered -v juna/b17`.
3. Vahti-Monitor: `tail -n 0 -F /Users/Shared/Claude/julkaisija-tyokalut/valoseppa-vahti.log | grep --line-buffered -E "KÄÄNNÖS|KÄÄNNETTY|SIMU|VALMIS|VIKA"`.
   Vahti ja Valoseppä = sama iPad-simu A26BC7D0: simuvuoro vain toiselle kerrallaan.
4. CRON (PT 15.10.): luo heti `CronCreate "3 4 * * *"` → aja yksinään `/Users/Shared/Claude/proto-3d/tyokalut/bundle-natiivi-nas.sh`
   (NAS-git-bundle, ~1 min); "OK: bundlet valmiit" → lokirivi; VIKA/exit ≠ 0 → rivi PT:lle. launchd-ajo on pois käytöstä
   (macOS esti NAS-kirjoituksen), Postivahti ei aja tätä. Cron vanhenee 7 vrk:ssa → luo uudelleen.
Nollausraja 35 %; kuva-arkit Sonnet-apuagentille.
