# Natiivi-UI: luovutus 30.10.2026 klo 20.38 (juoksupelin valmis-kohdat PT:n kuittaamat, jono tyhjä)

Edellinen: viesti-natiivi-ui-luovutus-20261030-0206.md (halli 215 valmis).

## Valmis: juoksupelin valmis-kohdat (KK 30.10. 19.1x, PT), merge-pyyntö NS:llä junaan 216
Haara natiivi-ui/juoksu-valmis-216, kärki 4fb9b3aa0 (pohja natiiviseppa/juna-216 8d3bf122f). Peili natiivi-backup
peili/proto/natiivi-ui/juoksu-valmis-216. Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-juoksu-valmis. tarkista.sh 0 virhettä.
PT kuittasi K1–K4 (20.3x) ja lähetti merge-pyynnön NS:lle.
1) Linssivalitsin.Pelit: juoksupeli Keskeneräisistä uuteen VIDEOPELIT-osioon kaikille (Raamattu 2.185), PELIT-välilehti näkyy
   pelaajalle aina; teksti ui.pelit.videopelit. Kehittäjällä järjestys Lautapelit · Pallokisa · VIDEOPELIT · Keskeneräiset.
2) Paikkojen nimet juoksun aikana olivat jo olemassa (NUI 21.10., reitin OhitetutPaikat, SK:n juoksupeli.paikka.*). Uusi rajapinta
   PK:lle: JuoksupeliNakyma.NaytaPaikka(tunnus, nimi = null), tunnukset kuten reitillä (portti-A, halli-G, palatsi-L, palatsi-M,
   torni-<suunta>), kerran juoksussa. Harjahahmoilla ja nastoilla ei vielä avaimia (SK + PK).
3) QA: ui juoksupeli paikannimi <tunnus> [nimi] ("paikka" oli jo varattu), ui kartta pelit.
Kuvat ja tulos: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/juoksu-valmis/ (K1–K4, tulos.md, skenaariot sk-pelit*.txt).

## Seuraavaksi
1. NS kertoo rungon SHA:n → worktree pois: `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove /Users/Shared/Claude/wt/proto-natiivi-ui-juoksu-valmis`.
2. Halli 215:n kaiteet-v4 0a1a2c837: NS:n kuittaus yhä seurannassa (edellinen luovutus).
3. Jono muuten tyhjä: uusi sessio "JONO TYHJÄ: NUI" PT:lle, jos PT ei ole antanut uutta erää.

## Opit
- Esikatselussa kehittäjätila: `peli kehittaja pois` ei riitä (Debug.isDebugBuild); pelaajan näkymä = `ui pelaaja 1` (PakotaPelaaja).
- zsh: `"$R:Assets/..."` tulkitsee :A-muuntimen; käytä `"${R}:Assets/..."`.
- Esikatselun kuva otetaan ~3 s komennon jälkeen; kertomuskaistan teksti (alkaa +1,5 s) jää helposti kuvien väliin.
