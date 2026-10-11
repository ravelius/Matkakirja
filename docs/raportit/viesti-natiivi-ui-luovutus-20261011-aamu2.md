# Natiivi-UI: luovutus 11.10.2026 aamu 2 (06.0x, PT:n määräämä nollaus)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md. Edellinen: viesti-natiivi-ui-luovutus-20261011-aamu.md (yksityiskohdat, appit, worktreet).
Simut: iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Ajot perl POSIX::setsid, yksi simu kerrallaan,
käännös/simu vain Julkaisijan NYT-viestillä. Todistusajo: /Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh.

## ENSIMMÄINEN TEHTÄVÄ (PT 11.10. 06.0x): tyhjä lippukehys kartussissa (RANSKA□)
Kartussin nimen perässä näkyy tyhjä neliö: elementti mk-kartuscha__lippu (Kartuscha.cs:77, Kartta.uss:113–129) ilman lippukuvaa.
Kuva: proto-3d/lokit/todistus-maakortti-iphone-20261011-0553/kuvat/m1-auki.png (käännös 9c37e120a, Ranska, iPhone).
Selvitä: 1) näkyykö sama TF 180:ssä (vanhat todistuskansiot/kuvat ensin, ei uutta simua ilman Julkaisijan vuoroa), 2) juurisyy
(lipun lataus / resurssin nimi / tyhjän kehyksen piilotus), 3) pieni korjaus omaan haaraan natiivi-ui/<aihe>, tarkista.sh + testit,
kuittausrivi PT:lle. Ei uutta pohjaa: puuttuva → PT.

## KESKEN
1. natiivi-ui/maakortti-pysakki **c1a3d534e** (wt/proto-natiivi-ui-maakortti): kuvattu 05.54 käännöksellä 9c37e120a, todistusajo OK.
   Pari proto-3d/lokit/todistus-maakortti-pari2-20261011.jpg (PT: hyvä korttiin). ODOTTAA omistajan aamukorttia, EI junaan 182 ennen sitä.
   Kun PT kuittaa → SHA Natiivisepälle.
2. natiivi-ui/taidemuseo-ui **2e409cc62**: LS2 todentaa omassa käännöksessään (ks. edellinen luovutus).

## Muuta
- Juna 181 kuitattu (metro 0fb0ad5bf, olavinlinna-dialogi 98fab3e74, opas-sirut b65f6507b — Wien todennettava junan 181 käännöksellä).
- Appit levyllä: natiivi-ui-app-metro-181, -sirut-181, -maakortti → poista, kun juna 181 on TF:ssä (maakortti nyt kuvattu).
