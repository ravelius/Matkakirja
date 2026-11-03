# Pelikoodari: luovutus 29.10.2026 klo 18.40 (PT: nollaus vapaasti)

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-1638 (PR 5602).
Proto-haarat peilissä natiivi-backup peili/proto/pelikoodari/<haara>: pk7v66-214 8a74e637c, kivikoko-koe-214 11a5aef06.

## Valmista
- PT 17.2x KIIRE (juna 214 TF tänään): kivikoko → pelikoodari/pk7v66-214 (OMISTAJA 29.10. 11.02/11.04: laatat isommiksi ja
  erikokoisiksi, reunakivet matalammiksi/leveämmiksi/pidemmiksi, seinän kivet matalammiksi). Nimi k23 (kivikoko-214 9c0477cb6:ssa k22):
  VS:n seinat-211 käyttää k22:ta auringolle → sama nimi = CS0102. QA `valo k23 0|1`, oletus päällä.
  d3032b32c k23 · c22908502 LR v69 (tausta-v69, rakennukset-v53) · 8a74e637c LR v70 (tausta-v70, muurikate-v24: kaikki V4_sokkeli
  → V4_kujakivi_sokkeli). Esto leivottu v69:llä ja v70:llä = v14 tavulleen → v14 jää. Peli 764/764, unity 0, Metal 444/0 + pipeline 436.
- Koe pelikoodari/kivikoko-koe-214 11a5aef06 = pk7v66-214 + seinat-211 e9f1174b1. Ristiriita JuoksuLattia.shader ReunusRaja → k23-puoli,
  muuten VS:n puoli (_ValoAtlas Properties-lohkossa säilyy).
- Sovitetut parit (havainne | peli): proto-3d/lokit/havainne-editori-20261029-183139/{02,05}/havainne-peli.png, keisari 1,00/1,00;
  horisontti 02 +0,06 / 05 −0,08 (PT hyväksyi muodon syyksi). Omistaja kujat 18.22, PT kuittasi 183139 → NS:lle merge-pyyntö lähetetty
  18.3x (jonossa) junaan 214: pk7v66-214 8a74e637c + seinat-211 (mallina koe 11a5aef06); ämpäriin JU:lle LR v70 + palatsi-esto-v14
  + kk-pohja-v1d-pk7.

## Opittua
- Havainne-editori juna-214-pohjaisella haaralla: LR:n juuri-v138m:ssä EI ole junan v68+-paketteja eikä pk7-pohjaa → aukio tai rikki
  ladattu kuja ("PUUTE oleta palatsi v2", lattiassa valkoinen ruudukko). Oikein: oma juuri _tyo/pelikoodari/kuja05-pk6-20261029/
  juuri-pk7-v70 (= v69 + LR:n v70-paketit, cp -cR), skenaariossa ensin `palatsi mallit <juuri>`, sitten `palatsi url <juuri>/kk-pohja-v1d-pk7/pohja.json`.
- Sovitettu tila = VS:n 154037: 02 sijoita −245.44 318 −2.03 + testikamera 3.3 6.88 10 45; 05 sijoita −251.6 393 −3 + testikamera
  3.0 5.3 16 45. Ilman testikameraa keisari 0,19 (liian iso). Kopio editori.sh:sta: scratchpad editori-sovitettu.sh (PALATSI, ESIKOM,
  AB23=1 = sama kuva k23 pois); aja REF=<SHA> RUNKO=natiiviseppa/juna-214. PT:n mainitsemaa aja_v136_pari.zsh:ää ei ole levyllä.
- Kujien lattia ja seinäkivijalka ovat VS:n _KujaKivi (V4_kujakivi_*); k23 vaikuttaa vain V4_lattia/V4_sokkeli-pintoihin (portin takana).
  Mallin pinnan vaihto (V4_sokkeli → V4_kujakivi_sokkeli) on LR:n työ, koodissa sitä ei voi rajata osiin.
- Esto: `PALATSI_SISAAN=<pohja.json> TAUSTA=<tausta> RAKENNUKSET=<rakennukset> ESTO_ULOS=<esto.bin> sh Peli-testit/kaanna.sh
  PalatsiEstoLeivonta`, sitten cmp v14:ään.

## Odottaa
- NS: kokoaa pk7v66-214 + seinat-211 junaan 214 (viesti jonossa 18.3x). Kysymykset ristiriidasta → koe 11a5aef06.

## Jatko keskeytyksestä
- Taustaajoja ei ole. Worktree wt/proto-pelikoodari-pk7-214 haaralla pelikoodari/pk7v66-214 (puhdas). Esikatselu-2-kopio jäi
  koehaaraan 11a5aef06 (seuraava esikatselu.sh vaihtaa).
