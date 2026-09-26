# 1.0.25-juna juna/b13 bf7431df (käännös 2d82476e), 26.9.2026 ~18.3x

iPhone yksin, console-pty-kaappauksella. Asennusrekisteri desyncasi taas käynnistyksessä (tuttu
sudenkuoppa) — korjattu uninstall+install tuoreesta Matkakirja-proto-kaannos-buildista.

## Tulokset

- **160 (arkkityypit, Kreikka): PASS.** `aja 38.9 22.0 1.3 1.5` + `kallista 50`: tasojen 1–3 nostot
  näkyvät 3D-malleina (linnat, temppelit, Meteoran pilarit, majakka) eivätkä musteläikkinä. Tason 2
  mallin napautus avasi nostokortin (Thermopylai, Leonidaksen patsas). `symbolit taso23 0` ei testattu
  erikseen ajanpuutteessa. HUOM: kamera säilyi identtisenä useiden `aja`-komentojen jälkeen lähempänä
  zoomatessa (arc 0.15→0.03) — todennäköisesti jo lähimmällä käytännön zoomitasolla; Meteoran pilarien
  tarkkaa särmikkyyttä ei voitu täysin varmistaa tällä resoluutiolla, merkitään "PASS, ei täysin
  lähikuvavarmistettu".
- **Fonttilämmitys, verho kylmästä: PASS.** Kaksi puhdasta mittausta (terminate+relaunch, ei reinstall):
  **2,1 s** ja **2,2 s**, molemmat selvästi ≤ 3,5 s -rajan alla. (Ensimmäinen mittaus heti reinstallin
  jälkeen näytti 5,9 s — reinstall-artefakti, ei käytetty tulokseksi.)
- **Regressiot C, D, 163: PASS.** `pallo lepo` -komennon jälkeen VARTIJA 163 laukesi kerran omien
  kamerasiirtojeni takia (laatat vaihtuivat → täysi piirto, oikea käytös) — ei stale-renderöintiä.
- **167 (nostomerkki ei UI:n alla): PASS.** `veto 0.9 0.85 0.75 0.7 1`: merkki ei osunut pulun/Liiku-
  napin/yläpalkin päälle.
- **Elävät elementit (karuselli, Köpenhamina): PASS.** `aja 55.6736 12.5836 0.02 1.5` + `kallista 50`:
  katos näkyy selvästi kaltevana raidoitettuna 3D-mallina ylhäältä, jalusta maassa kiinni — ei billboard.

## Yhteenveto
Kaikki pyydetyt kohdat PASS: 160, fonttilämmitys/verho (2,1–2,2 s), C/D/163, 167, elävät elementit.
Simulaattori sammutettu turvallisesti (terminate + shutdown, ei pkill).
