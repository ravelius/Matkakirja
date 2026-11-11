# PT:n luovutus 11.11.2026 klo 11.17 (konteksti 30 %)

Korvaa -0940:n juna-, rooli- ja muut-kohdat. Keskustelutallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-11-klo-0946-1115.md.

## Juna 224
- Linkissä 224.64 (772f16b42, 10.33). pt-ok kirjoitettu: 224.65 (NS 41bbbc320), 224.66 (KS Orsay f2346e167 + talot v13, KK 09.46), 224.67 (KS Montparnasse a4f6cd17b + talot v14 + varjoläikät, KK 09.5x). JU:n jono MR58–MR60.
- EI pt-ok:ta vielä: William-äänet (PR 6571 punainen ääkköstestistä → Äänittäjä korjaa; junaan vasta kun KK on tarkastanut Vaduzin uusinnan); NS c28e4adb0 (varjoläpikäynti + heijastus 400→200 m): katso pari täysikoossa, heijastusero = B-luokka (KK:n sana), muuten A → pt-ok; VS pilvet fa0978bad: junaan KK:n sanalla todisteiden jälkeen (todiste-5 epäluotettava, ks. tallennevika).

## Omistajan päätökset tänään (kaikki lokissa ja mainissa: PR 6568, 6569, 6570, 6572)
- 09.38 juoksupelin piirto A/B (Raamattu 2.177). 09.52 pilvet: entinen nopeus, pysähtyvät 1 ruutu/s -tilassa. 09.54 juoksupelin varjot leivottuina, elävä vain pelaajalla. 10.15 sali leivotaan + KK ajattelee muutostyön ensin itse (7.4). 10.26 KK kirjoittaa omat Raamattu-kohtansa omalla PR:llä, ilmoittaa PT:lle etukäteen; PT päätösloki ja junat; puhdistus KK:lle (7.4). KK 10.2x: koodimallit hyväksytään esityskameralta 4 suunnasta (2.204).
- 11.09 KORTTI "Kyllä, aloita näin": juoksupelin peruskorjaus KK:lla. Kesken olevat (v133, varjojen leivonta) loppuun, EI uusia juoksupelin ominaisuuksia, EI kamera-/dronetöitä rooleille ilman KK:n määrittelyä. NS, PK, LAV tietävät.

## Roolit
- NS (luovutus 40ce0b724 + lisäykset → 989a472ee; ei nollautunut, jatkaa): varjokytkimet 367ea7f0a (oletus päälle vasta uusintaleivonnan kanssa), hahmoläikkäpari KK:lle, pelaajan varjo leivotussa (KK:n kohta 3), ruutunopeus JÄLKEEN JU:lla. ENNEN = 60/s mediaani, KK sanoi aiemmin ~38/s → selvitä ennen yhtä lukua omistajalle. Laattamuistiajot 1–3 odottavat PT:n sanaa erikseen.
- LAV (uusi, b9a93d8ad): a22/a20/F1 korjattu (aja-a3), parit KK:lla → KK:n OK:lla v133-paketti; sitten uusintaleivonta (puut, ruukut, kalusteet, SALI omasta valosta, F2 t-portti-m15 marmoriterassi).
- PK: V ja ETELA2 tehty, P11d2 osa 8 kuitattu (ei aukioajoa; "ei viestiä ovella" kulkukarttaajoon). Odottaa v133:a kulkukartan vientiin.
- KS (uusi, 7f71522a6/c446f4890): SC-juurisyy = lähitaso + syvyysveto linssin sammuessa (KJ39 ok, kuva katsottu), talot v15; KJ40 (12 kohdetta) ja KJ41 (SC OSM-paikka 35c1dd1a1, koe) JU:lla. Junaehdokas KJ40:n + KK:n jälkeen, yhdessä NUI:n napautuslennon kanssa.
- NUI (uusi, 72d9c8c8e): kohteet-arkki 17ddd9e1c (12 × 5 kuvaa, 270° lisätty) JU:lla. Pallo: vika oli TYÖKALU (ks. alla), 27ef4dd78 todennäköisesti oikein, varmistus pallo-maa-3 (6ab7d27b0). Matkaopas-2 KK:lla. Uusinnat katse-2 ja lento-3 JU:n korjauksen jälkeen.
- VS: maapiirros läheltä A/B KK:lla valittavana (_tyo/linssiseppa2/maapiirros/kk-1/); pilvivarjo + kynä iPad JU:lla; todiste-5 uusitaan.
- Äänittäjä: korjaa PR 6571:n ääkköstestin ("aanet" kommentissa).
- JU: TALLENNEVIKA: esikatselun tallenne jättää ruudun 321×531:een → kuvat 1. tallenteen jälkeen epäluotettavia (lista /Users/Shared/Claude/julkaisija-tyokalut/tallenne-ruutuvika-20261111.txt; NUI 8, VS 3 ajoa). Korjaus Esikatselu.cs (julkaisija/esikatselu-ruutu), DIAG-ajo käynnissä.

## Levy
- 73 Gi (raja 100, hälytys 80). PT ajoi 10.24 siirra_t7 (31,4 G; kohokartta-raaka ja juoksu-leivottu rajattu pois kartoitus-jsonista). VIRHE: siirsi myös käytössä olleet rungot (68d365e65, 8d22f34e4, 09e517768, 4444e211a) → JU palautti, T7-kopiot jäivät (älä poista). JU siirsi 58 laitekäännöstä NAS:lle. Lokit 54 G, lähes kaikki tältä päivältä → yösiirto. du-kartoitus jäi kesken (ei tulosta).

## Työlista (lisätty tänään)
Juoksupeli: kaikki varjot leivottuina (NS) · Juoksupelin peruskorjaus (KK) · Sainte-Chapelle esityskameralle kuntoon (KS) · Nähtävyysesityksen arkit (NUI). Raamatun siivous = este (omistaja 06.51).

## LISÄYS 11.2x
- NUI pallo-maa-3 (6ab7d27b0) ok NUI:n katseella (köyden pää paikallaan), kuvat proto-3d/lokit/nui-pallo-maa-3-6ab7d27b0/ KK:lla → KK:n OK:lla 27ef4dd78 junaan (pt-ok PT:ltä).
- TEKEMÄTTÄ (seuraajalle, KK pyysi): päätösloki OMISTAJAN LINJAUS 11.15 (drone ja myöhemmin kaikki kamerat), sanatarkasti: "dronen "niiausta" kiihdytyksessä ja jarrutuksessa ei välttämättä tarvitse imitoida, se voi näyttää häiritsevältä. mutta kallistelu todennäköisesti parantaa tunnelmaa ja sitä voisi kokeilla myös peruskartan kameran liikkeisiin sitten kun olet saanut juoksupelin osalta kuntoon. dronemainen kallistus ja liike on käytössä myös taidenäyttelyissä, tosin siellä sivukallistus on vain kevyenä. dronen liike saa olla muutenkin ehkä parempaa kuin mitä FPV droneissa näkee, enemmän niin, että liike on kuin elokuvasta jossa käytetään kallistusta pienenä tehokeinona elävöittämään, mutta että kameran kiihdytys ja jarrutus ovat todella harkittuja kuin parhaissa elokuvissa. oli kameran ajo toteutettu sitten dronella, helikopterilla, jibillä tai muulla vastaavalla. saatko kiinni?" KK:n tavoite: elokuvakamera, ei kilpadrone; liike lähtee ja pysähtyy harkitusti, kallistus kevyt mauste kaarteissa, ei nyökkäystä; KK kirjoittaa määrittelyn (suunnitelmat/20261111-juoksupelin-peruskorjaus.md), roolit eivät koske kameraan ilman sitä; KK lisää työlistarivin "Peruskartan kamera: kevyt kallistus (koe juoksupelin dronen jälkeen)".
