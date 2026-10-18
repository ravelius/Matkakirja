# Natiivi-UI: luovutus 18.10.2026 klo 06.3x (Postivahti: kova raja 38 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0040:n (lue sen "Opit" ja päivitykset tarvittaessa). Uusi tili 18.10.:
id:t /Users/Shared/Claude/osoitekirja.md (PT local_cf5b4eca-…, Julkaisija local_1325b8e8-…, NS local_04e2850b-…, Valoseppä local_ee961a2d-…).
Simu VAIN Julkaisijan SIMU NYT -viestistä, SIMU VAPAA perään. Ajoskriptit /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/.

## TILA 06.3x — JUNA 201 (kaikki NS:llä)
- ratas-201b db3915373 (⚙ + säädöt, kehyshäivytys, osuma 44 pt, Valosepän kohdevalikko): KK HYVÄKSYI 05.58.
- kohdevalikko-korjaus-201 6911a9f21 (KK 05.58 kohdat 2+4): rungossa d60107576, todistettu kuvakäännös 4 b656d1792, PT HYVÄKSYI.
- kuva-kokoruutu-202 (omistaja 01.10 + 01.23, PT 01.3x: ISS-kuvat koko ruudulle, kortti korvattu, nipistys, galleria, jaa + ✕):
  kärki **619275871** NS:lle 06.3x (= a36a00eac rungossa + 4421afa56 kuvateksti piiloon zoomattuna + 619275871 täysin musta tausta,
  PT 06.3x a/b). PT hyväksyi toiminnan (kuva4-parit 3–4).

## KESKEN (ENSIN)
1. **Uusinta kuvakäännös 4:stä käynnistettiin 06.30** (ajo-kuva-kokoruutu-202b.zsh, iPhone + iPad): NYKYINEN-kortti kuvan otossa (K1) + gallerian
   "Oma kuva" koko ruudulle (K4). Lokit lokit/todistus-kuva-kokoruutu-{iphone,ipad}-202b-20261018-063x. Jos valmis: tarkista K1/K4
   täysikokoisina → SIMU VAPAA Julkaisijalle (jos ei jo kuitattu) → parit `python3 <scratch>/pari2.py` -tyyliin (NYKYINEN | UUSI) → PT.
   Huom: K4 on vanhasta (ei-mustasta) taustasta; mustan taustan todiste kuvakäännöksestä 5 (619275871 mukana?) → `zsh ajo-kuva-kokoruutu-202b.zsh
   <app> <udid> <laite>` + K2 (kuvan otto) → PT. Pari-skripti: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/pari.py (ilman otsikoita).
2. PT:n kohta c (paikan nimi Arras/Reims ≠ 49°52'N 3°35'E) EI NUI:n: IssSijainti.Hae → LahinVakiluvulla (Valoseppä/LS2) → PT tietää.

## Selvitetyt (PT:lle kerrottu)
- Sininen maa ISS:llä = opas Pariisi → ISS (KaupunkiIlmakeha jää päälle), vanha vika; ISS suoraan näyttää maan (juna201-ratas-pari/5).
- KÖÖPENHAMINA ei tule pöydän näyttöön: 55,7° > radan 51,6° ("alus siirtyy") → Valosepän EXTEND-erä.
- Tyhjät nostot = NASAn kuvahaun aikakatkaisut; nyt uusinta 5 s:n välein (6911a9f21).

## Worktreet (proto)
wt/proto-natiivi-ui-kuva-kokoruutu-202 (natiivi-ui/kuva-kokoruutu-202), wt/proto-natiivi-ui-kohdevalikko-korjaus-201, wt/proto-natiivi-ui-kohdevalikko-201
(nyt haarassa natiivi-ui/ratas-201b db3915373). Levysiivous (-0040 LEVY-kohta) yhä tekemättä, lukituksen jälkeen; levy 96 %.

## Opit
- Simuskenaarioissa ISS-pöydän napit: iPhone pöytä y 732–810 (ratas x 317 y 765, KOHTEET-näyttö 243 755), iPad y 1104–1182 (ratas 538 1138,
  näyttö 464 1127); ikkunan napautus EI avaa kohdevalikkoa. Gallerian ruutuun `tap-teksti Oma kuva`. Vain 1. ISS-kuva ilmainen → yksi kuva/ajo
  (kehittäjätilassa rajaton). `astro kyyti ohjaamo kuvat kortti 1|0|kokoruutu|zoom <z>|tila` (IssOmatKuvat.Testaa).
- Kohde radan ulkopuolella (> 51,6°) = "alus siirtyy", näyttö näyttää maan, ei kohdetta.
- Tarkista ennen omaa korjausta, onko toinen rooli jo tehnyt sen rungossa (`git log -S` + `merge-base --is-ancestor <sha> <käännöksen sha>`).
