# Valoseppä: luovutus 26.10.2026 klo 11.01 (pitkä sessio, varmuusluovutus)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, LR: local_15010198-38f5-44fd-a643-011ac655a5ff,
JU: local_d8cad7de-3ff8-4f4b-8787-baa80836e175, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f. Päiväkirja
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 25.10. 13.30 → 26.10. 11.0x). Lue tämä kokonaan.

## 0. AJO KÄYNNISSÄ (tarkista ensin)

**P38b 5f4893a9b, ketju-71, L1:llä** (L2 jumissa JU:n valoseppa-vahdin LuoPallo-käännöksessä 10.15 alkaen; JU:lle kerrottu).
Haara `linssiseppa2/omistajapari-11` (proto-git, ei pushattavaa), wt `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, kansio
`_tyo/linssiseppa2/kierros2/`. `grep -v ^raaka ketju-omistaja71.log` (KÄÄNNETTY, LOPPU <todistus>), app `kierros2/app1/`.
Skenaario sk-omistaja53 (ei pilottia, ämpärin avoimet-v47):
- 01/02/03/05: n1 (täyttö 0,3, lattiakivi 0,72) · l1 lattiakivi 0,78 · l2 0,83 · (01/02/05) k1 katesavy 1,12/1,06/0,90 · k2 1,05/0,95/0,85.
- 04 n1 ilman pilottia → RATKAISEE kultaisen sotkun syyn (ks. 2.3).
Mittarit: `python3 mittaa-p26.py <todistus> "n l k"` (lattia, varjo, punainen, p5, mustat) ja
`python3 kattomittari/mittaa-katto.py <todistus>/kuvat/raaka/*-0[125]*[a-z].png` (katon sävy°, kylläisyys, kirkkaus, p90−p10, puhki).

## 1. TEHTY 25.10. 13.30 → 26.10. 11.00

- **Siivous 25.10.** omat todistusajot ennen 12.00: kuvat/raaka + kuva-arkki → 8,98 Gt.
- **23a37983d**: QA `valo leivonta` palasi ennen KaytaValoa (arvot eivät päivittyneet) → korjattu; k17-kylläisyys 18 → 0.
- **847fdbec4**: täyttö 0,75 → 0,3 (PT 14.1x HYVÄKSYTTY: täyttö 0,3 kaikille, yhteinen kerroin 1,25, LR leipoo salin 1,6 ×).
- **a1f93399c**: QA `valo katesavy r g b` (Valopohja.JuoksuKateSavy → _JuoksuKateSavy, heti).
- **5f4893a9b** (= grafiikka-211 **a63bac658**, NS:n 211-runko c8c0291ff sisältää): METAL-TARKISTUS EI AVAA MITÄÄN.
  8afdc5004:n OpenCompiledShader avasi Compiled-*.shaderit LaunchServicesilla (kymmeniä ikkunoita joka ajossa) → kone kaatui 25.10. 14.34.
  Nyt HiljainenEditori (IExternalCodeEditor) + kScriptsDefaultApp ajon ajaksi, palautus finallyssa ja varmuuskopiosta
  (Library/metal-tarkistus-editori.txt); jos editori ei ole hiljainen, ei käännetä. Todistus kierros2/metal-todistus-5f4893a9b-2.log:
  7/7 "ei avata", LaunchServices 0, METAL 440/0, PIPELINE 432/0. PT 10.3x hyväksyi.
  `_tyo/linssiseppa2/metal-tarkistus.zsh` odottaa nyt muut Unity-batchit (rinnakkainen batch → jaettu csc → CS2011).
- **Mittaukset** (raportit kierros2/omistaja57…61-*/RAPORTTI.md):
  - P33/P34: kylläisyys 0 → 01 0,36 / 02 0,42 / 03 0,20 / 05 0,40 (havainne 0,38/0,40/0,26/0,36).
  - P34 05: kamera lähemmäs porttia → lattia 164/153 (pahenee): syy kapea kuja → PT: 05 arvioidaan kujapäätöksen jälkeen.
  - P36 847fdbec4 (täyttö 0,3): ei mustia (≤ 0,4 %), MUTTA lattiat 01 178 / 02 192 / 03 181 / 05 153 (hav 205/200/193/204)
    → P38b lattiakivi 0,78/0,83 (P32:n perusteella 0,8 nosti 02:ta ~6 %).
  - LR:n pilotit: 1 (pylväät 0 atlaksessa), 2 (kunnossa, mutta kohinaa), **3** (`kielletty-rakennukset/leivottu-sali/avoimet-pilotti-leivottu-3/`:
    1,6 ×, 2048 näytettä, 3×3-suodatus, harjakatteet ei leivottu). P37 (pilotti 3): 04 punainen 0,43 (kerroin 1,0/1,5 → 0,41/0,45,
    täyttö 0,5 → 0,49; hav 0,53), mustat 0,7 ✓; pylväissä yhä pystylaikkuja (omistaja61-847fdbec4/pylvaat-pilotti2-vs-pilotti3.jpg).
  - Katot (PT 14.2x, räystäskamera PK:n lautaspoyta-pari-8380aceca.jpg): havainne sävy 34–37°, kylläisyys 0,61–0,70; peli matalalta
    37–46° / 0,57–0,67, räystäskamerasta 42–43° / 0,91 (sitruunankeltainen). Mittari kierros2/kattomittari/mittaa-katto.py.

## 2. AVOIMET (järjestys) – PT 11.1x: "valo 1–3 ehtoineen (mittarit 01–05, ei mustia, pylväiden kohina pois) ja salin pilotti 3. Pari 04 + 01 PT:lle"

1. **P38b tulos** → valitse lattiakivi (tavoite 01 ~205, 02 ~200, 03 ~193; 02 ei yli ~205) ja katesavy (sävy ~35°, kylläisyys ≤ 0,70);
   vakioiksi ValoKohteet.JuoksuLaattaKiviK ja JuoksuPaivaKateSavy, valovahti, commit.
2. **Kultainen sotku** (04 oikea yläkulma, laikukas kultainen katto muurin takana): EI harjakate (pilotti 3: ei UV1:tä, sotku pysyy), EI juhlasalin
   katto (materiaali, normaalit ja kuva tavulleen v47). P32 (2732b6172, ei pilottia) sileä, P33–P37 (pilotti) laikukas. P38b n1-04 ilman pilottia:
   jos sileä → pilotin juhlasali (jokin muu leivottu osa, esim. talopilarit/palkisto katon kohdalla) → LR; jos laikukas → koodi 7d5cdc420
   (avoimet leivotut heittävät elävän varjon → varjoakne?) → korjaa itse (esim. leivotut avoimet heittävät vain ShadowsOnly-varjon tai bias).
3. **Salin pilotti 3**: punainen 0,43 vs 0,53 → LR:lle pyyntö (kirkkaampi tai täyttö 0,5 vain salille?) ja pylväiden pystylaikut pois.
4. **Pari 04 + 01 PT:lle** (havainne | nyt | uusi), kun 1–3 kunnossa: kolmikko.py `kierros2/omistaja59-23a37983d/kolmikko.py`.
5. Juna 211: kaikki PT:n hyväksymät (23a37983d, 847fdbec4, 5f4893a9b + tulevat vakiot) NS:lle grafiikka-211:n tai omistajapari-11:n kautta,
   kun PT kuittaa kolmikon (a63bac658 jo grafiikka-211:ssä ja rungossa).

## 3. OPIT

- QA-komento, joka `return`aa ennen KaytaValoa, ei päivitä globaaleja → tarkista, että vertailukuvat eroavat pikseleittäin (ImageChops).
- Jäädytettynä (`jaady 1`) `sijoita` ei liikuta kameraa → vapauta jäädytys sijoituksen ajaksi.
- glb-atlaksen tarkistus: kolmioiden keskipisteet (kierros2/omistaja57-7d5cdc420/glbkeski.py), ei kärkiä (saarten reunat).
- Unityn OpenCompiledShader avaa tiedoston aina; batch-ajoissa vain hiljaisen koodieditorin kanssa.
- JU:n valoseppa-vahti kääntää jokaisen omistajapari-11:n kärjen L2:lla (julkaisija-tyokalut/valoseppa-vahti.zsh) ja voi varata L2:n pitkään → käytä L1:tä.
