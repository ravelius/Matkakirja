# Natiivi-UI: luovutus 20.10.2026 klo 06.15 (Postivahti: kova raja 36 %)

Korvaa -0530:n ja -0350:n (Opit niissä yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md. Simu VAIN JU:n SIMU NYT -viestistä.
Ajoskriptit /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (ajo-museo-iss-207.zsh, ajo-museo-inappi-207.zsh + VAIHEET/SK/ERA-muuttujat).

## ENSIN
1. TEHTY 06.16: simu 4:n tulokset lähetetty KK:lle (kopio PT), SIMU VAPAA JU:lle. Odota KK:n vastausta; tulokset:
   ISS yhd-207g (78f460ea, iss 091d8016a): /Users/Shared/Claude/proto-3d/lokit/todistus-iss-207-{iphone-20261020-0602,ipad-20261020-0605}/
   (kuvat/iss207a-revontulet.png + iss207-siirtyma-*.mp4): punaiset säteet ✓, nimi lasissa ✓, iPadin HJANMERI/ERRAK poissa ✓, verho-
   napautus OK, musta 1,2–3,0 s. Ainoa PUUTE "pitkiä ruutuja ~2700" = sama kuin kaikissa aiemmissa ISS-simuissa (simun taso, ei regressio).
   i-nappi c (vaalea sali, tumma i) TODISTUS OK iPhone + iPad: …/todistus-museo-inappic-jalkeen-{iphone-20261020-0608,ipad-20261020-0612}/.
   → KK (kopio PT). KK 05.5x: "Sen jälkeen ISS menee omistajalle" (KK hoitaa).
2. KK:n OK:n jälkeen NS:lle junaan 207 (EI yhd-*-haaroja): natiivi-ui/iss-207 091d8016a (sis. 81be0b791 … 6493cf6a6) ja
   natiivi-ui/museo-inappi-207 78619d654 (i-nappi otsikon päälle 30b0d81e6 + tumma vaaleassa salissa ce0e4fff9/78619d654).

## TILA
- KK OK: lasihaku b8198b4e3 (näkyvä lasi), i-napin toiminta (b-ajo iPad 05.38), ISS katse + nimi + alareunan kaari (05.18/05.5x).
- PT OK 05.5x: i-nappi vaaleassa salissa Paperi.Muste (pohjavahti: vain Tyylikirja-arvot → reunus Paperi.MustePehmea).
- ISS avoin: tähden/planeetan napautus pienoispallon alta ei testattu (näkymässä ei tähtiä/planeettoja); kaukaiset punaiset säteet voivat
  väreillä (säädin `astro kyyti revontulet _Punainen=…` ilman käännöstä).
- ☰ vaaleassa salissa myös vaalea (PT: sama vaihto sallittu) – ei tehty, odottaa KK:n kuvia.

## Worktreet (proto)
iss-207, museo-inappi-207 (+ yhd-207c…g, vain simua varten), lasihaku-207, museo-valikot-207 + -0350:n lista: poista 207:n lukituksen jälkeen.

## Opit (uudet)
- Käännöspalvelu ajaa pohjavahdin: `python3 tyokalut/pohjavahti.py` ennen KÄÄNNÄ-pyyntöä (uusi `new Color(...)` UI:ssa kaataa).
- Museon `kavele teos` toimii vain tauolla: odota "Pysahtyy 1/61" + `linssi museo tauko` ennen (sk-museo-inappi-207b.txt).
- Rinnakkaiset agentit samassa worktreessa toimivat, kun tiedostorajat annetaan ja commit pathspecillä.
