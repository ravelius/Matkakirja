# iPad nostokortti-stressi, KORJATTU MENETELMÄ — Laitetestaaja, 29.9.2026 klo 01.4x

**RETRAKTIO: edelliset kaksi raporttia (ipad-nostokortti-stressitesti-20260929.md ja
ipad-nostokortti-uusinta-20260929.md) sisälsivät VÄÄRÄN LÖYDÖKSEN.** Napautin kaiutinta pisteessä
(322, 98), joka osui vasemman yläkulman matkakirja-paneelin ("Ateena, elokuussa 1873") omaan
kaiuttimeen — SAMALLA `mk-kaiutin__osa`-luokalla mutta eri elementtiin kuin nostokortin oma
lukijarivi. Paneeli on kortin himmennyksen alla, joten napautus osui kortin ULKOPUOLELLE ja
sulki sen suunnitellusti (tausta-alueen napautus sulkee kortin, kuten webissäkin). Natiivi-UI
huomasi tämän ja ohjeisti oikean kohteen: kortin oma lukijarivi (`mk-lukija__kaari`,
laajennetussa tilassa oikeassa yläkulmassa).

Käännös 485376ca (juna/b13 19517f56, BUILD 40 + kosketus-välimuisti 36e6447f), laite 3B4CDACB.
Sama Delfoi-kortti.

## Oikea tulos: KAIKKI PASS — 0/60 sulkeutumista

1. **Kuva ×20 (516,310): PASS — 0/20.**
2. **Kortin oma kaiutin ×20 (799,72, `mk-lukija__kaari`, tarkistettu `ui puu`:sta ennen
   napautusta): PASS — 0/20.** Ensimmäinen napautus käynnisti luennan heti, vahvistettu
   `aani mittaa`:lla (rms 0,117, `MatkakirjaPuhe:@1,00` soi). Kortti pysyi auki koko 20 kierroksen ajan.
3. **Mini-hampurilainen ×20 (766,72, `mk-lukija__valikkoikoni`): PASS — 0/20.**

Kaikki kolme elementtiä toimivat moitteettomasti oikealla käännöksellä ja oikealla
napautuskohteella. 1.0.40-junan nostokortti-toiminnallisuus on kunnossa iPadilla.

## Opetus jatkoa varten
Kun sama luokannimi (`mk-kaiutin__osa`) esiintyy useassa paikassa UI-puussa (yleinen
matkakirja-paneeli JA nostokortin lukijarivi), pelkkä luokkanimi ei riitä kohteen
tunnistamiseen — pitää tarkistaa myös lisäluokka (`mk-lukija__kaari`) ja/tai sijainti suhteessa
kortin muihin tunnettuihin elementteihin (esim. `mk-lukija__valikkoikoni`) ennen napautusta.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
