# Reittiajo b6-rungosta 9460c52c6 (Unity 6000.7.0b6, iPad Pro 13, 26.10.2026 klo 13.53–14.07): PUNAINEN / EI LUOTETTAVA – laite kuumeni (thermalState 2) ja J/A-vaiheessa vieraita ui-komentoja

Rungossa asennettuna ennestään (asennus 13.26, ei uutta asennusta); app 13.53.52, Unity 6000.7.0b6 (820f8ee8e58b). Skriptit 60e92b7a7. Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/r9460-1ja/ ja r9460-2reitit/. Vertailu e77543fc7 (b5): J 10,38 / A 11,10.

## Tulokset
- GPU: J 10,44 ms / A 9,65 ms (b5: 10,38 / 11,10) – OK, mutta mitattu vierassekoitetussa J/A-vaiheessa (alla). A:n ensimmäinen mittausruutu 19,5 ms.
- Aukio 180 s: **käännösnykäykset 35, muut nykäykset 4 (suurin 877 ms, t 174,1 s; sitten 469 / 225 / 67 ms)**, ruutuja 10114 (b5 10406), pysähdyksiä 0, kamerahyppyjä 0, piilossa 0.
- Sisätila 120 s: käännösnykäykset 3, nykäyksiä 0 (suurin 34 ms), **ruutuja 3445 (b5 6829) = 28,7 fps, 30 fps -tila (p50 33,35 ms)**, piilossa 13 ruutua (1 jakso, avoin puutarha räystäs).
- Piilot yhteensä 6 jaksoa / 89 ruutua, kaikki räystäs avoin tyohuone ×4 / avoin puutarha ×2 (b5: 3 jaksoa / 67 ruutua).
- VENYNYT RUUTU 137 kpl (aukio-sisätila-osa 80, J/A 57); b5: 5.

## Syy 1: laite kuumeni
`lämpö: Kuuma (thermalState 2)` tulee konsolirivillä 2482, heti ennen 877 ms:n nykäystä (rivi 2486); thermal 2 koko sisätila-vaiheen ajan (thermal 2: 5 näytettä, 0: 10). Kaikissa e77543fc7-, 719cefaaa-ajoissa thermal pysyi 0:ssa (15/15). iOS pudotti 30 fps:ään → "venyneet ruudut" ja ruutuja/aika puolittuu. Ennen aukion alkua thermal oli 0 (skripti odottaa ≤ 1) → laite kuumeni aukioajon aikana; joko b6 kuumentaa enemmän tai iPad oli lämmennyt vierasajoista (alla).

## Syy 2: vieraat ui-komennot J/A-vaiheessa (r9460-1ja/konsoli.txt)
Ei yoC.zsh:n komentoja: `ui kierto vaaka` (r. 129), `ui juoksupeli v4 7` (330), `valo heitto 1` (1941), `v4 11` (1950), `maali pois` (3123), `valo heitto 0` + `valo jalki 0` (3187–3189), `v4 11` (3197), `maali pois` (4260), `valo jalki 1` (4310). Eli joku toinen sessio (PK/NS?) ajoi iPadille omaa ajoa rinnakkain 13.53–14.00 → J/A-luvut ja alkulämpö epäluotettavia. (Reitti-vaiheessa 2reitit vain omat 10 komentoa.)

## Suositus
Älä lue e77543fc7:ään verrattuna regressioksi: ajo uusittava, kun (1) kukaan muu ei komenna iPadia, (2) laite on jäähtynyt (thermal 0 ≥ 5 min), ja (3) tarvittaessa b5 ja b6 samalla laitteella peräkkäin. Piilot räystäsjaksoja jatkuvasti (e77543fc7: 3, tämä: 6).
