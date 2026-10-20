# Natiivi-UI: luovutus 20.10.2026 klo 17.50 (tilinvaihto, PT 17.49)

Korvaa -1740:n. Historia: docs/raportit/viesti-natiivi-ui-luovutus-20261020-1740.md ja git log. Id:t /Users/Shared/Claude/osoitekirja.md.
SIMU HARVOIN (Raamattu 9.11): automaattiset testit → NS runkoon → omistaja katsoo pelistä.
Proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-museo-teoskortti-208 (proto-3d/Matkakirja-proto), haara natiivi-ui/siirto-pehmea-208, puhdas.
Runko: natiiviseppa/juna-208 (747f421ba 17.44).

## TILA: JONO TYHJÄ, EI KESKENERÄISTÄ
Kaikki NUI:n erät ovat rungossa 208 tai aiemmissa BUILDeissa:
- Metrokartan pehmeät tekstit 63d0fe853 → runko 8eafd577b/747f421ba (NS 17.4x; testit NS:llä käynnissä).
- Salanappi f8c0bc0ce (202a17116), juoksupelin kuvateksti 3cf7887fa (e3cff21f6).
- Louvre: tasainen zoom + siirtymät d89496ea8, AUTO ZOOM + ruutukoko 9aabbb409, nimen sävy 224fe6c50/7c10e9f71,
  teoskortti 1988b7602, 🔈/T + tekstitys 9 linssiin 9ba4bbf04.
- PT:n tarkistuskierros 17.5x (kaikki jo valmiina, PT merkitsi asemataulun rivit tehdyiksi): teoskortti, alku ilman
  siipisuhinaa e0f534e5a, ISS-kuvat koko ruudulle 094af84ec, napit häipyvät + ratas + kohdevalikko a45af2f97/6911a9f21,
  kipin napit ada01496b, ISS AUTO-luenta 8d66868f5, ISS-kohdeluettelo e208d45fe, salilistan napautus a60097fef.

## Muiden työt (älä aloita)
- Taulun tutkiminen (ulosnipistys ei vaihda tilaa, kysymys "Haluatko kulkea vapaasti museossa?"): Linssiseppä,
  haara linssiseppa/ulosnipistys-208. ÄLÄ KOSKE: MuseoEleet.cs, MuseoKierros(.AutoZoom).cs, MuseoSovitin.cs, MuseoTaulu(.Ulos).cs.
- Louvren valo: Valoseppä.

## Uusi sessio
PT 17.49: ei uusia eriä tällä tilillä. Uusi sessio: rivi PT:lle "JONO TYHJÄ: Natiivi-UI" ja odota erää.
Ennen PT:n antamaa erää: grep rungon git log (proto-repo, natiiviseppa/juna-208) – asemataulun rivit ovat usein vanhentuneita
(tänään 10 riviä oli jo tehty).

## Opit (voimassa)
- Uudet tyypit Matkakirja.Peli-nimiavaruuteen yksilöllisin nimin (TestiAskel ym.); Peli-testit eivät näe System.Uri:a.
- Liikevahti laskee jokaisen Mathf.Lerp:n: peitto- ja keskikohtalaskenta puhtaaseen Ydin-funktioon.
- PK:n haarat eivät aina ole juna-208:n päällä: merge tuo muut kommitit → kerro NS:lle riippuvuus.
- Tekstimuokkaukset .tmp + os.replace -skripteillä scratchpadista (ei sed -i).
