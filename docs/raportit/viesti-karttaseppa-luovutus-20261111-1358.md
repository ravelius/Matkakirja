# Karttaseppä: luovutus 11.11.2026 klo 13.58 (konteksti 25 %, Raamattu 7.37)

Edellinen: viesti-karttaseppa-luovutus-20261111-1323.md (+ LISÄYKSET 2–4). Tämä korvaa sen jonon.
Natiivityöpuu /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/montmartre (bdccb177e), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna. Testit: `sh Kartta-testit/kaanna.sh`, `sh Peli-testit/unity-tarkistus.sh` (aina sh).

## TEHTY TÄSSÄ SESSIOSSA
1. PETIT PALAIS: KJ42 (4b8ae2d47) katsottu, parit K/parit-kj42/ KK:lle. KK HYVÄKSYI 13.44.
   Junaehdokas b8d7c913e (natiivi-backup karttaseppa/pp-juna) = 4b8ae2d47 + "petit-palais" Koodimallit.Oletukseen + talot/pariisi.json v16 + testi. Testit 758/758.
   JU:lle 13.5x: ehdokas + talot v16 ämpäriin (K/talot-paketti-pariisi-v16) MR61:n jälkeen. PT kopiona. Odottaa JU:n LINKKI-riviä.
   KK:n huomio jatkoon (muistissa koodimalli-hyvaksynta-esityskamera): neljän suunnan kuvissa rakennus ≥ 1/3 kuvan leveydestä; "aja … 0.0012" ei ole esityskamera.
2. PALLO: kenttä KK:n linjalla (hiekka kartan sävyllä D2C081, reuna A38E5C, vaalea laikku pois): a20c6cb98 (karttaseppa/pallo-koe). Testit + unity 0.
   NUI:lle 13.5x: vanhan varjon korjaus (SarjaVarjo × (1 − Malli3D)) a20c6cb98:n päälle, sha KS:lle → sitten uusi KJ JU:lle (parit TÄYSIKOKOISINA RAJAUKSINA: lähin + pelikamera, köydet, ankkuri).
3. MONTMARTRE (KK:n päätös 13.28, suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saumat-ja-maet.md luku 8). EI JUNAAN ennen omistajan korttia kuvaparista.
   Työkansio M = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/montmartre-maasto (tyokalu/, raaka/, kerros/).
   a) RGE ALTI haettu: tyokalu/hae-rgealti.py (IGN Géoplateforme WMS-R, RGEALTI-MNT_PYR-ZIP_FXX_LAMB93_WMS, x-bil float32; robots.txt: ei sääntöjä) →
      raaka/14/*.u16.gz (12 laattaa, Mapterhorn-raakamuoto, alue 2.312–2.374, 48.868–48.906). Huippu 130,7 m.
   b) MAASTOKERROS VALMIS LEVYLLÄ: kerros/2026-11-11-montmartre (z13 6, z14 12, z15 35 laattaa, 0,4 Mt, octvertexnormals, kärkiväli ≤ 9,5 m,
      layer.json maxzoom 15 + available vain alueelle + parentUrl "../2026-10-29-maailma/", lähdemaininta IGN RGE ALTI). Loki kerros-ajo.log.
      Tehty: tools/maasto/tee-maasto.mjs --mapterhorn M/raaka --alue 2.324,48.874,2.362,48.899 --tasot 13-15 --naytetaso 15 --vanhempi ../2026-10-29-maailma/ --dem-normaalit (+ --luettelo layer.jsonille).
      EI VIELÄ ÄMPÄRISSÄ (JU vie julisteet/maasto/2026-11-11-montmartre/; vain uusi kansio, ei koske vanhaan).
   c) bdccb177e (karttaseppa/montmartre, pohja b8d7c913e): kaava 90 + (1 − b)(h − reunaH), reunaH 48,6 m _maaAkseli.w:ssä (tee_tileset.py + shadergraphin
      funktiorunko samalla tekstillä), KorkeusKerroin.TasaPainot/Piirretty/PinnanKerroin, OhjelmaKohteet.AsetaPaikka, MontmartreKorkeus = RGE ALTI
      (tyokalu/tee-montmartre-korkeus.py, tyokalu/reunah.py). Nousu huipulle 82 m = 0,99 × kirkko (Sacré-Cœurin aukio 119 m → 0,85).

## JONO (järjestyksessä)
1. MONTMARTRE jatkuu:
   - TARKISTA ENSIN: tukeeko Cesium for Unityn native layer.jsonin parentUrl:ia (cesium-native LayerJsonTerrainLoader: pitäisi). Jos ei: täysi kansio
     (2026-10-29-maailma z0–12 kopio + z13–15) kuten 214:n tapa a. Lontoon MaastoOhjaus (VanhaKansio 2026-10-29-maailma) toimii parentin poluilla ennallaan.
   - Rakennus.MaastoUrl + Pallo.unity (maastoLayer, _url) → julisteet/maasto/2026-11-11-montmartre/layer.json (ks. 4486eb40b:n muutos). Vasta kun JU on vienyt kansion.
   - Tripo-mäki pois koodimallin kanssa (Nahtavyysalue.cs ~329 OnMaki, NotreDameKoe/lahi-r8/sacre-coeur-maki) + vanhat Tripo-portaat.
   - Talot v17 vain Montmartren palat: talokone /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/tee-palat.py (:315– 2×-kaava 2·(maa+15) − LAKI_LASKU).
     Uusi pohja reiän r ≤ 1400 m paloille: 90 + (maa_RGE − 48,6) − PalaH, maa_RGE talon kohdalta (RGE ALTI, ei altitude_minimale_sol). TaloKerros.shader
     tasaus a·b hoitaa liu'un (antaa saman 90 + (1 − b)(h − reunaH) kuin maa). Versio v17 (v16 = PP). Ämpäriin vasta KK:n ja omistajan kortin jälkeen.
   - Sacré-Cœurin koodimalli: MaaH / lattia / terassi / portaat RGE ALTI:sta (raja: portaat ja maa ≤ 1 m koko matkalla); nimet/merkit tulevat jo taulukosta.
   - Mac-parit JU:lla (nykyinen | uusi): esityskamera 4 suuntaa (rakennus ≥ 1/3 kuvasta), Place Saint-Pierren tasolta ylös, 5 km yleis, lähin (ei särmiä rinteessä,
     ei porrasta/rakoa mäkialueen reunalla). Mitat raporttiin: talon pohja ≤ 2 m, portaat ≤ 1 m, nousu 0,9–1,2 × kirkko. Parit suoraan KK:lle (kopio PT).
2. PALLO: NUI:n sha → KJ JU:lle (ks. yllä).
3. GRAND PALAIS (KK 13.44: Montmartren jälkeen).

Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty, talot-paketti-pariisi-v15-v39-ALA-VIE. Seuraava vapaa talot-versio v17.

## LISÄYS 14.0x
- PT 13.5x pyysi PP-ehdokkaan: vastattu b8d7c913e + pakettipolku (jo tehty). JU 13.47: talot v16 ämpärissä; MR67 b8d7c913e → 224.73 lähtee PT:n pt-ok:lla, LINKKI-rivi KS:lle.
- NUI: pallon varjokorjaus 81ac33721 (natiivi-backup natiivi-ui/pallo-varjo, a20c6cb98:n päällä). JU:lle pyydetty KJ tästä (rajaukset täysikokoisina + esityskamera ≥ 1/3). Katso kuvat, parit KK:lle (kopio PT).
