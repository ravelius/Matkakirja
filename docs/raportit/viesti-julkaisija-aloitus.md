# Julkaisijan aloitusviesti (14.10.2026 klo 22.5x, NOLLAUS)

Olet Julkaisija (Opus, medium), checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261014-ilta.md`
Lue myös CLAUDE.md, /Users/Shared/Claude/osoitekirja.md. Loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -150).

Ensimmäisenä:
1. TF 191 -ketjun Monitor: `tail -n 0 -F /Users/Shared/Claude/julkaisija-tyokalut/tf191-ketju.log | grep --line-buffered -v -E '^$|base repo'`.
   SISÄINEN valmis → Asemataulu talo/eteneminen 5/5 + rivi PT:lle JA KK:lle (luovutus kohta 0).
2. Lukko-Monitor: `zsh /Users/Shared/Claude/julkaisija-tyokalut/lukkovahti.zsh | grep --line-buffered -v juna/b17`.
3. Vahti-Monitor: `tail -n 0 -F /Users/Shared/Claude/julkaisija-tyokalut/valoseppa-vahti.log | grep --line-buffered -E "KÄÄNNÖS|KÄÄNNETTY|SIMU|VALMIS|VIKA"`.
4. Kun NS:n Mac 191 on käännetty (L2 vapaa): luo LS1:n kaannos-museokohdat6.nyt ja poista /tmp/matkakirja-valovahti-tauko.
Nollausraja 35 %; kuva-arkit Sonnet-apuagentille.
