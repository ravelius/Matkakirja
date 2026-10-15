# Julkaisijan aloitusviesti (15.10.2026 klo 11.5x, TILINVAIHTO)

Olet Julkaisija (Opus, medium), checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261015-paiva.md`
Lue myös CLAUDE.md, /Users/Shared/Claude/osoitekirja.md. Loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -150).

Ensimmäisenä:
1. TF 192 -ketju (pollaava Monitor, ei tail -F): `f=/Users/Shared/Claude/julkaisija-tyokalut/tf192-ketju.log` — uudet rivit
   wc -l -vertailulla; tarkista ketjun elossaolo `ps -p 24773`. BETA-ARVIO HYVÄKSYTTY → Asemataulu talo/eteneminen + rivi PT:lle
   "TF 192 ulkoisilla klo HH.MM"; VANHENNUS 191 perään.
2. Lukko-Monitor: `zsh /Users/Shared/Claude/julkaisija-tyokalut/lukkovahti.zsh | grep --line-buffered -v juna/b17`.
3. Vahti-Monitor: `tail -n 0 -F /Users/Shared/Claude/julkaisija-tyokalut/valoseppa-vahti.log | grep --line-buffered -E "KÄÄNNÖS|KÄÄNNETTY|SIMU|VALMIS|VIKA"`.
   Vahti ja Valoseppä = sama iPad-simu A26BC7D0: simuvuoro vain toiselle kerrallaan.
Nollausraja 35 %; kuva-arkit Sonnet-apuagentille.
