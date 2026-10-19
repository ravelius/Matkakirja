# Työkaluseppä – luovutus 19.10.2026 klo 16.23 (oma nollaus, konteksti 31 %)

Rooli: Työkaluseppä (Opus, high), checkout /Users/Shared/Claude/Matkakirja-tyokaluseppa. Aloitusviesti docs/aloitusviestit/tyokaluseppa.md.
Ohje: docs/moduulit/tuotantopohjat/tuotantoputken-tarkistukset.md (lue ensin; siinä myös opit 19.10.).

## Valmis (PT kuittasi 19.10. 15.1x)
- Neljä tarkistusta yhdellä ajolla: proto `tyokalut/ennen-junaa.sh` → lokit/ennen-junaa-<aika>/JUNATARKISTUS.md (OK / HYLÄTTY / KESKEN).
  1 Codex-portti (pelirepo tools/codex-3d-tarkistus.mjs; _valmiit + postilaatikkohaaran posti/, ei *-vienti-*, ei "→ Codex"),
  2 kameratesti (tyokalut/kameratesti.py tarkista.sh:ssa, lähtötaso tyylikirja/kameratesti.json: IssEtsin, IssKatse ilman testiä),
  3 nykäysvahti (Kartta/Nykaysvahti.cs + tyokalut/nykaysvahti.py, testi nykaysvahti_testi.py 7/7),
  4 botti (BottiOsat/BottiPelaa-testit + botti-osat.sh --loki; lukee nyt myös "botti: pelaa" -rivit).
- Proto-haara `tyokaluseppa/tarkistukset-204` (worktree /Users/Shared/Claude/wt/proto-tyokaluseppa-tarkistukset), kärki f3fb0c3b3,
  pohja natiiviseppa/juna-204. NS mergeää junaan 204 (PT:n käsky); tarkista: `git -C …/Matkakirja-proto branch --contains f3fb0c3b3`.
- Pelirepo: PR #4965 mergetty (portti: kuvat, MANIFEST.json, qa/; ohje). 

## Auki
- PR #4980 (haara tyokaluseppa-pohjatesti, f6a8ba84b): tests/tuotantopohjat.test.mjs (Raamattu 4.21) + kahden pohjan korjaus.
  PT mergeää itse ("älä mergeä"). Jos CI punainen → korjaa.
- Ensimmäinen täysi ajo simulla puuttuu: `zsh tyokalut/ennen-junaa.sh --udid <UDID> --app <.app> --sha <SHA>` (vuoro Julkaisijalta,
  SIMULAATTORI NYT). Edellyttää, että juna 204 sisältää f3fb0c3b3 (Nykaysvahti.cs), muuten nykäysvahti = EI TODISTETTU.
- Muuriportaat EI LÄPI ajossa todistus-botti-pelaa-20261019-1157 (ennen Projektisepän korjausta 80b591b06) → uusi simuajo.
- Löydös auki: posti/natiivi-ui-iss-ympyraikkuna-20261019/viite-cupola-peli-iphone.jpg puuttuu MANIFEST.jsonista (PT tietää).

## Huomiot seuraavalle
- Konteksti: kartoitus tehtiin Sonnet-Explore-agentilla; älä lue Raamattua kokonaan.
- ennen-junaa.sh: argumentti ilman arvoa pysäyttää ajon (korjattu); kevyessä tilassa /tmp/matkakirja-kevyt ajo odottaa (--nyt ohittaa).
- botti-osat.sh kirjoittaa RAPORTTI.md:n todistuskansioon (<kansio>/botti-osat/); nykaysvahti.py ei kirjoita mihinkään.
- Kartoitus muiden roolien työstä (Kamerajohtaja-haarat, todistusajo, juna-ajo): kamerajohtaja on haaroissa ja junassa 204,
  ei masterissa; käännös ajaa vain tarkista.sh:n (ei yksikkötestejä) → kameratesti lisättiin sinne.
