# Karttaseppä: luovutus 5.11.2026 klo 23.35 (KS)
Syy: konteksti lähellä kovaa rajaa 35 % (7.37). **Voittaa -2329:n ristiriidassa; -2329 ja -2207 ovat tausta.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup. Lukko vapautettu, ajoa ei käynnissä. Yötila: omistaja nukkuu, KK tai PT hyväksyy omistajan sanoja vasten.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. KK:n vastaus viesteihin 23.2x–23.3x. Codexille ja Tripolle kuittaus vasta KK:n sanan jälkeen. JU:lle lähetetty LUKKO VAPAA sanoi kuvamäärän tarkistettavaksi: tulos 5/5 (lähetä JU:lle, jos se kysyy).

## AJO lokit/esikatselu-20261105-232820 (L1, 1df82634d, 246 s, 5 kuvaa; kaikki katsottu puolikoossa, katto myös täysikoossa)
- **Tummuus toistui, ja se on nyt ensimmäinen työ.** Kirkkaus alaneljänneksen mediaani samassa ajossa: Invalidit 180 (48,8565), Panthéon 181 (48,8462), Grand Palais 120 (48,8662), Opéra 94 (48,8720), Riemukaari 65 (48,8738). Malli ei tummu, kartta, alusta ja vesi tummuvat.
- **Ei selity:** `globaalit` nollat (myös `_keilaHamaryys`, joten epäily kumoutui tässä kuvassa), `valo tila` sama ennen kuvaa ja sen jälkeen (rinne 1, tasaus 1, intensiteetti 0), `valokeila` levossa. Ei järjestys: Panthéon on vaalea Riemukaaren ja Opéran välissä. Kulma ja suunta samat (45°, 0) Panthéonilla ja Opéralla.
- **Vihjeet:** tummenee pohjoiseen päin viidessä pisteessä (ei todistettu, voi olla sattumaa). KK: Marais'n ajo `lokit/natiiviseppa-marais-1a03b85fc` m2-keski-0 tumma, m6-lahi-0 vaalea lähes samasta kamerasta, välissä Pulun tila vaihtuu (KK ei todentanut). VS: `lokit/esikatselu-20261105-223303/liike-pa3` ruudut 208–209 ja `esikatselu-20261105-222704/liike-pa3` ruudut 199–200: kirkkaus laskee 185 → 157 ja hyppää 160 → 202 pian `kierra 40 1` jälkeen. Siis kertyy ajan tai paikan mukana ja purkautuu kierrossa. Malli ei tummu, joten etsi kartan oma materiaali: PiirrosKerros ja kartan varjostimen globaali, jota `globaalit` ei listaa. Kysy NS:ltä, jos ratkeaa (KK pyysi kertomaan).
- **Riemukaaren katto v2 EI kelpaa pelissä:** rajaus `_tyo/karttaseppa/alustat-24p/riemukaari-katto-rajaus-232820.png`. Katossa on vaaleita ja tummia tilkkuja. Epäily, ei todistettu: kerrokset limittyvät 0,1–0,2 yksikön välein (Y: joints 175,10–175,135; pavers 175,19–175,34; limestone alkaa 173,96), ja syvyys sekoittuu. Korjaus omana teknisenä päätöksenä: poista `riemukaari-katto-peliin.py`:ssä päällekkäiset kerrokset (limestonen yläpinta laattojen alta, saumat alemmas tai pois) ja mittaa rajat ensin. Jos ei onnistu: palauta `riemukaari.bytes` v1:ksi (git, ennen 1df82634d) ja kysy KK:lta ennen Tripolle kirjoittamista.
- **Alustat pelissä, minusta kelpaavat, KK päättää:** Panthéon ja Invalidit vaaleassa valossa hyvät: reuna liittyy kartan katuihin, esplanadi ja viuhka näkyvät. Grand Palais'n rantatie näkyy, nurmi on vihreämpi kuin kartta. Opéra vain tummassa kuvassa. Täysikoossa saumat katsomatta (Saumat täysikoossa -sääntö), tee ennen hyväksyntää.
- Horisontti 45°: Panthéonin kuvassa ND ja Sainte-Chapelle näkyvät horisontissa isoina, kuten aiemmin.

## EIFFEL 24p
Tullut 2f70a6b6d, SHA täsmää, ulkopuoli 0 muuttunutta, pari KK:lla (`alustat-24p/pari-eiffel.png`). Asennettu kärkeen (katso `git log`), ei ajettu. Lounaisreunalla vanhan nurmen kiila uuden vieressä. Eiffelin 45° mukaan seuraavaan ajoon, vertaa `omistaja-20261105/eiffel-maa-puuttuu-2132.png`.

## SEURAAVA AJO (pyydä JU:lta, "ratkaisee" ja enintään noin 5 kuvaa)
Kun tummumiselle on testattava selitys tai katto korjattu: Riemukaari 45° + Eiffel 45° + kokeen vaatimat kuvat.

## TYÖJONO
1. Tummuus (PT ja KK vaativat). 2. Katto. 3. Pystysauma. 4. Sacré-Cœur pelissä ja Montparnasse. Muu kuten -2207.

## Opit
- Toimitus ei todista peliä: kerrokset, jotka ovat CPU-kuvassa siistit, voivat sekoittua pelin kamerassa.
- Sama valotila ja nollat globaaleissa eivät sulje pois kartan omaa materiaalia: mittaa koko ajon kuvat paikan mukaan.
