# PT:n luovutus 3.11.2026 klo 16.30 – TILINVAIHTO

Edellinen: viesti-fable-luovutus-20261103-1515.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Syy: tilinvaihto (omistaja 16.26).
UUSI TILI: sami.reivinen@vvi.fi (org ddaee6a2, Asemataulu R6VQFTUNq629zSzah719Uy; omistaja 16.28 kortilla). Ohje docs/tilinvaihto.md 0 → 1 → 1.5 → 2.
Vahdit Monitorilla 30 min: codex-posti-vahti.sh ja odottajat-vahti.py (grep ODOTTAA|TYHJÄKÄYNTI). `date` ennen aikaleimoja.

## TILINVAIHDON TILA 16.30
- Luovutukset mainissa: JU 3f7ca7703 (PR 6169), LAV 051444f08 (6172), NUI 6a43d66f3 (6173), PK 556f043d5 (6174), VS a9c1d36ea (6176),
  Postivahti 599eaf458 (haara postivahti-luovutus-20261103-1630). KS 9914d3969 (6175), NS fce80b73e (6177). Asemataulu: ei keskeneräistä (vain vienti), ei luovutusta.
- Kun kaikki originissa → rivi KK:lle (local_37f7c945) → KK lähettää omistajalle TOIMI TARVITAAN (kirjautuminen). Tavoite viim. 98–99 %.
- JU:n laitekäännös 2212b570e → 9b9695a7d nohupilla (jatkuu yli vaihdon). Tripo/Codex-jakso 17.00–18.00 ilman Unityä (postilaatikko c7bb21df8).
- Lavastajan vanha PR 5694 (30.10.) ei yhdisty – jätetty.

## AUKI (järjestys)
1. KAATUMINEN (omistaja 15.40, "kartan pikkukuva"): syy pikkukuvan 48 Mt täysikokoinen purku + FRA-esilataus 25 s välein (pieni: LRU 133 → 204 Mt
   neljästä kuvasta). Korjaus NUI 44ecc31d1 (+ 2411d699b) → iso-todistus (myös isoisän luenta Lontoo → Pariisi + jatkettu peli) NUI:n jonossa.
   Pieneen vasta KK:n ASENNA-luvalla.
2. Pariisin intro (omistaja 15.40): NUI 693cf437f ok laitteella (C5 matkakirjaan, kuvat puoleen); luenta puuttui omistajalta, koska cb1b5d9fc
   ennen palautusta – todistus 44ecc31d1:llä.
3. Pariisin piirros (omistaja 15.40, suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261103-pariisin-piirros-zoom-ja-reunat.md):
   koe 6da58f32b isolla: ympäröivä kartta + pehmeä reuna ok, zoom 2× ok, multiples-of-4 0. Korjaukset: NS c5baa2fa7 (459 ms → mip pois),
   f4334cbfd (häivytys ruudun mukaan); KS kyltit 804706bc3 (14/7/6,5 pt) → koe 2212b570e/9b9695a7d → PT. AUKI: saapumisen loppurajaus
   keskizoomiin (NS + NUI 374582ef4, viesti NS:lle 16.4x). Palasauma (Seine) → KS pala17 Codexilta 74fd75f34; luoteispala pala16 5f8d4e13e
   (omistaja 16.05 Kyllä); molemmat samaan TasoVersioon.
4. Kuvamerkit (omistaja 16.22): Raamattu 2.205 (59d1c45af) – kaikki kartan kuvat pieniksi ympyröiksi, yksi per kohde, nopea avaus → NUI:n jonossa.
5. Versiorivin koontiaika (omistaja 15.31): NUI 6eeffaa57 yhdistelmässä; JU kertoo ajan asennuskuittauksissa.
6. ASTC 6a7af2d9d kuitattu iPad-todistuksella; NS leikepalat 56c06b836 (0 varoitusta) + lataus-oletus ad08abe9a (kylmä Lontoo ok simussa).
7. Juoksupeli: taso1b KK OK; KK:n 3 kohtaa korjattu (131103d47, f25009027) → ag-ajo; ys/tj polkukamera ei alkanut → PK 6311df2d4 ketju-ai
   (ei vielä JU-jonossa). LAV saumat-v1 97ef79bd6 (juna 219) saumapari + pronssikuvat JU L1:ssä → PT.
8. Junaan 218 kuitattu: LAV osasarja-v12 cce530a1b, VS iss-218 f21b6baa8. VS sal11 (769cb9ea6) JU:n jonossa → PT.
9. Codex: keisarin noston 5 kuvaa (5345c2379), LAV kasetit (ac0492a15), KS pala16/pala17, Tripo arkihahmot (loppukuvat 17–18).

## TILI
- Vanha tili ~96 % 16.26 (omistaja: "4 % jäljellä").
