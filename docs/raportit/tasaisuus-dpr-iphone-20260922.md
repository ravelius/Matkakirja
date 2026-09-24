# Tasaisuusmittari ja dpr2-koe oikealla iPhonella (Laitetestaaja)

22.9.2026 n. klo 10.50–11.00. iPhone 18 Pro -simulaattori, laitepalvelimen
kautta. Kaksi osaa: 1) Pelikoodarin tasaisuusmittari (`__kehysprofiili.veto()`,
main v2084) perustason mittana, 2) haara `pelikoodari-dpr-koe` (f4a919af7,
`?koe=dpr2` = pikselisuhteen katto 2 laattakerroksen kanssa liikkeessä),
perus vs. dpr2 lomitettuna, 2 paria. Kaikki Ranska z6.

## Perustaso (main v2084, `?koe=` ei annettu)

Zoomi p95 61 ms, max 140 ms. **Veto (3 s vakionopeusveto, 80 px/s):**
siirtymä/kehys ka 0,93 px, **hajonta/ka 65 % (px/ms-vaihtelu 112 %)**,
pysähdyksiä 3/176, pisin 17 ms, dt p95 23 ms.

**Tämä on keskeinen löydös Fablen kysymykseen** ("kehysajan p95 ei tavoita
panoroinnin nykimistä"): dt p95 on vain 23 ms (näyttäisi sulavalta
pelkän kehysajan perusteella), mutta px/ms-vaihtelu on 112 % — nopeus
vaihtelee yli kaksinkertaisesti kehyksestä toiseen, mikä on juuri se
"nykimisen" tuntuma jota kehysaika ei näytä. Tasaisuusmittari siis
mittaa jotain muuta kuin kehysaika, ja se korreloi paremmin omistajan
kokemukseen.

## Perus vs. dpr2 (2 paria, lomitettu)

| pari | | zoomi p95 (ms) | veto px/ms-vaihtelu | pysähdyksiä | pisin pysähdys |
| --- | --- | --- | --- | --- | --- |
| 1 | perus | 99 | 144 % | 4/169 | 19 ms |
| 1 | dpr2 | 104 | **92 %** | **1/174** | 17 ms |
| 2 | perus | 99 | 99 % | 6/171 | 20 ms |
| 2 | dpr2 | **69** | 113 % | 8/177 | 29 ms |

**Ei johdonmukaista voittajaa.** Parissa 1 dpr2 voitti selvästi
tasaisuudessa (vaihtelu 92 % vs. 144 %, pysähdyksiä 1 vs. 4) mutta
hävisi zoomin kehysajassa (104 vs. 99 ms). Parissa 2 päinvastoin:
dpr2 voitti kehysajassa isosti (69 vs. 99 ms) mutta hävisi
tasaisuudessa (113 % vs. 99 %, pysähdyksiä 8 vs. 6). Kahden parin
otanta ei riitä erottamaan aitoa vaikutusta kohinasta — tarvittaisiin
vähintään 4-6 paria kummastakin, mieluiten kylmänä (uusi sivulataus
per pari) lämpenemisvinouman poistamiseksi.

## Ympäristö ja rajoitteet

- Kuorma vaihteli rajusti mittauksen aikana (44/48/60 alussa → 9,6/14,6
  ennen ikkunaa → 30,6 kesken dpr-vertailun); mittausikkuna sovittu
  Julkaisijan kanssa, mutta kuorma ei täysin rauhoittunut sitäkään
  ennen. Tuloksia ei pidä tulkita tiukasti absoluuttisina.
- iPhone 18 Pro -simulaattori, käynnistetty/sammutettu, Julkaisijalle
  ilmoitettu. Mac Studion kaiuttimet käytössä, palautettu Scarlett Solo
  USB:hen.
- Harness ja `tools/laitepalvelin.mjs`: EI committoitu, poistettu.
  Testihaarat `laitetestaaja-tasaisuus` ja `laitetestaaja-dpr-koe`
  poistettu paikallisesti.
- Camarguen (z8) tasaisuuslukua ei ehditty mitata tässä kierroksessa
  (vain Ranska) — vain perustaso-osa käsitteli alunperin molempia
  näkymiä, mutta harness vaihtui kesken dpr-koetta varten.
