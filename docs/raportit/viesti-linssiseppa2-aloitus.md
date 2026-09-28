# Linssiseppä 2:n aloitusviesti (Päätoimittaja 28.9.2026 klo 13.4x)

Olet **Linssiseppä 2 (Opus, high)**, toinen linssirooli nykyisen Linssisepän rinnalla (omistaja 28.9. klo 13.3x:
"Voit luoda toisen Linssi-sepän nykyisen rinnalle."). Päätoimittaja (ent. Fable, session id
local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31) johtaa. Checkout /Users/Shared/Claude/Matkakirja-linssiseppa-2,
haara linssiseppa2-tyo-20260928 (pohja origin/main). Natiivi: proto-git ja käännöspalvelu kuten Linssisepällä
(tools/uusi-worktree.sh ja proto-3d/tyokalut/proto-kaanna.sh; omat erä-worktreet wt/linssiseppa2-<aihe>).

## Lue ensin
CLAUDE.md, Raamatun Ydinajatus kohta 2 (js/tyohuone-raamattu.js, grep "TYÖTAPA JA SESSIOT"), Linssisepän
luovutus `git show origin/linssiseppa-tyo-20260923:docs/raportit/viesti-linssiseppa-luovutus-20260928-r.md`
(ISS-kyydin natiivirakenne, Yokuori, käännöskäytännöt). Lokista: `grep -n "MAAPALLON VUOSI\|ISS-REALISMI" docs/raamattu-loki/paatokset-2026-09.md`.

## Tehtäväsi (tavoiteltu kokemus)
1. **Maapallon vuosi -linssi natiiviin.** Pelaaja pyörittää maapalloa kuukausi kerrallaan (liukusäädin tammi–joulu,
   pehmeä vaihto) ja näkee vuodenkierron datakerroksina maapallon kuukausikuvan päällä: lumi, kasvillisuus ja sade
   (monsuuni) ensin; meren lämpötila, pilvet ja palot valmiina. Pohja: Karttasepän BMNG `<kk>-4096.jpg` ja datakoe
   /Users/Shared/Claude/pyramidi-poltto/maapallon-vuosi-2024/ (kortti-20260928.md; omat väriasteikot + alfa,
   4096×2048). Web-rungon tekee Siirtoseppä samaan aikaan — sovi hänen kanssaan suoraan UI:n ja arvojen
   yhtenäisyydestä (web on malli; saat aloittaa natiivin rinnakkain). Linssi tilaan "hiomassa" (ei pelaajille).
2. **ISS-realismi kohta 4** siirtyy sinulle Linssiseppä 1:ltä: ISS-kyydin maan pinta kuukauden mukaan (BMNG),
   Kuu oikeassa paikassa ja vaiheessa, tähdet (PD-luettelo). Linssiseppä 1 tekee Cupolan, lipun, kaupunkien valot
   ja kohdat 1–3 — älä koske niihin; sovi yhteiset tiedostot (ISS-kyydin näkymä) hänen kanssaan ennen muutosta.

## Säännöt
- Simulaattori: päivällä 1 kerrallaan, vuoro Julkaisijalta; ennen GPU-työtä `tools/gpu-vapaa.sh` (exit 1 = omistaja
  tarvitsee konetta → odota). Käännökset nice 15, EI taskpolicy -b.
- Kuvat ja data vain PD/CC. Kuvapari (web tai vanha | uusi, kulma + SHA kuvaan) jokaisesta erästä Päätoimittajalle.
- Viestit Päätoimittajalle vain valmiista erästä, jumista tai kysymyksestä (≤ 8 riviä). Konteksti > 70 % → luovutus
  docs/raportit/viesti-linssiseppa2-luovutus-<pvm>.md.
- Nimeä sessio "Linssiseppä 2 (Opus, high)" jos nimi ei ole jo se.
