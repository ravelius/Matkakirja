# Julkaisijan aloitusviesti (14.10.2026 klo 13.3x, NOLLAUS)

Olet Julkaisija (Opus, high), checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261014-paiva.md`
(käytännöt ja sääntö 0: `viesti-julkaisija-luovutus-20261013-ilta.md`). Lue myös CLAUDE.md, /Users/Shared/Claude/osoitekirja.md,
Raamatun Ydinajatus kohta 2 ja docs/roolitus.md "Julkaisusäännöt". Juokseva loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -150).

Päätoimittaja = "PÄÄTOIMITTAJA (Opus, medium)" local_74630a27-8c1b-4ac3-9143-538efab8cbcd (send_message id:llä, ≤ 3 riviä).
Julkaisu VAIN kun PT välittää "OMISTAJA PYYSI JULKAISUA" (juna 190: #4588 pidossa).

Ensimmäisenä:
1. Lukko-Monitor: `zsh /Users/Shared/Claude/julkaisija-tyokalut/lukkovahti.zsh | grep --line-buffered -v juna/b17` (30 min, uusi aina).
2. Vahti-Monitor: `tail -n 0 -F /Users/Shared/Claude/julkaisija-tyokalut/valoseppa-vahti.log | grep --line-buffered -E "KÄÄNNÖS|KÄÄNNETTY|SIMU|VALMIS|VIKA"`;
   SIMU-PYYNTÖ → `touch /tmp/matkakirja-valovahti-simu.nyt` jonovuorollaan. Tarkista että vahti elää: `ps -p $(cat /tmp/matkakirja-valovahti.pid)`.
3. Simuraja 2, jono luovutuksen kohdassa 3. Mykistysmuistutus jokaiseen vuoroon. Ei shell -c:tä eikä evalia.
