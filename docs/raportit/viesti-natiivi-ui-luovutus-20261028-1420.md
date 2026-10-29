# Natiivi-UI: luovutus 28.10.2026 klo 14.20

Edellinen: viesti-natiivi-ui-luovutus-20261028-1232.md.

## KESKEN: kohdekaupunkien nähtävyysnostot striimikartalla (odottaa PT:n ja KK:n kuittausta)
Omistajan päätökset:
- 12.28: nähtävyydet näkyvät oikeilla paikoillaan, kun lähestyt kaupunkia, ja napautus avaa jutun.
- 14.04 (KK): merkkeinä kohdekartan omat piirroskuvakkeet (miniatyyrit), ei pisteitä. Louvren kuvake ja pyramidi eivät saa
  kasautua. Kaupungit ilman piirroksia pitävät pisteet.

Proto-haara natiivi-ui/kohdenostot-213, kärki c7cd7a1e0:
- Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kohdenostot.
- Peili: natiivi-backup peili/proto/natiivi-ui/kohdenostot-213.
- Pohja: KS:n karttaseppa/merkittavat-213 c59d611d3 ja juna-213 f98dac3ce (mergetty).
- unity-tarkistus: 0 virhettä.

Tiedostot (kaikki Assets/Matkakirja/UI/):
- Kohdenostot.cs (uusi):
  - Portti: lähikartta (NykyinenTaso + 0,6 ≥ ElavaTyyli.Ensimmainen) ja Kohteet-kytkin päällä.
  - Kaupungiksi valitaan pienin kohdekartta, jonka piirtoRajat sisältävät kameran keskipisteen.
  - Nostot syntyvät kohteista. Etuliite on "kohdekartta:", koska "kohde:…@ISO" on karttavalojen käytössä.
  - Samassa paikassa (alle 25 m) näytetään vain ensimmäinen kohde.
  - Merkittavat.NostoQidt täytetään.
  - Piirros(id) palauttaa miniatyyrin.
  - MallinAlla: Symbolimallit-malli tai näkyvä kaupunkipallo alle 200 m:n päässä jättää merkin pois (Louvren ratkaisu).
- Resources/Kohdenostot/sijainnit.json: SK:n Wikidata-sijainnit, generaattori tyokalut/natiivi-ui/kohdesijainnit.py.
  - Lähdetiedosto syntyy web-repossa: node tools/sisalto/kohdesijainnit.mjs (SK, PR 5442; tiedostoa ei committoida).
  - Pelissä Wikidata-piste hylätään, jos se on yli 1 km kohdekartan pisteestä (Kohdenostot.EpaileM).
- NostotKartalla.cs:
  - Yhdessa(): karttavalot ja kohdenostot samaan listaan.
  - KameranJalkeen-piirto, kun NostoKerros ei ole näkyvissä.
  - Kohdelaatikot(): merkki ja nimiö kalusteiksi, joten nimet väistävät (KS 12.35). Oma luku ohitetaan (luenKalusteita),
    muuten merkki piiloutuisi oman kalusteensa alle.
  - Piirros-symboli samalla pohjalla mk-nosto-merkki__symboli--kuva (UI-POHJAT), maamerkin koossa (KuvamerkinKerroin).
  - Napautus menee Kohdenostot.Avaa → Nahtavyysarkki.AvaaKohde.
  - Testikomento `ui kohdenostot [napauta <nimi>]`.
- UiNakymat.cs: KartanKalusteet + kohdeRuudut.
- KaupunkiPallot.cs: NakyyLahella.
- UiKomennot.cs: kohdenostot-komento.

Tila:
- Ensimmäinen pari (pistemerkit, f6ca2648b) lähetettiin PT:lle.
- Piirrospari 96d0ab1a9 on PT:llä KK:ta varten: _tyo/natiivi-ui/kohdenostot/pari-P1-piirrokset-lahikartta.png ja
  pari-P2-eiffel-juttu.png (simu 00CF62C2, todistus-kohdenostot213-piirros-ipad-20261028-1413).
  - Tulos: 14 piirrosta, 6 nimiötä, Eiffel → juttu.
  - Piirrokset ovat vaaleita (samat kuin kohdekartalla).
- c7cd7a1e0 (pallosääntö) ei ole simulla. Kuvassa Louvren piirros jäi jo pyramidipallon alle kalustesäännön kautta.

Seuraavaksi:
1. PT:n tai KK:n OK. Tarvittaessa uusi simu JU:lta (SIMU NYT) ja ajo:
   `ERA=-x zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kohdenostot/ajo-simu.zsh`
   - Skenaario sk-pariisi-kotona.txt: uusi-peli 5 pariisi, odota 75 (kaupunki-intro palauttaa kameran päättyessään),
     aja 48.8600 2.3220 0.075.
   - Lopuksi SIMU VAPAA JU:lle.
2. Merge-pyyntö NS:lle: natiivi-ui/kohdenostot-213 c7cd7a1e0. KS:n c59d611d3 menee junaan 213 ensin, koska haara sisältää sen.
3. Myöhemmin: tarkat sijainnit viennin kautta (skeema), jolloin Resources-tiedostoa ei tarvita.

Esikatselun opit:
- Batch-esikatselu ipad-koossa sijoittaa kartan UI-merkit väärin: Screen 640×480 vs UiRuutu 2752. Myös karttavalojen
  merkit koskevat.
- Oikea sijainti saadaan koolla `640,480,0,10,640,460,1,1`:
  `zsh .../kohdenostot/ajo.zsh <haara> <sk> 640,480,0,10,640,460,1,1`
- --ikkuna jumittuu tai kaatuu. Täysi tarkkuus vain simulla.
- Batchissa matkakirjakortti peittää keskustan. "ui matkakirja pieni" ennen ajoa.
- napautaklik avaa jutun kahdesti (testikomento, ei laitteella).

## Muut
- SK:n raportti docs/raportit/nahtavyyssijainnit-tarkistus-20261028.md: 47 webin kohdekarttapistettä on yli 100 m
  pielessä. Ohjattu PT:lle; webin korjaaja on PT:n päätös.
- Worktreet:
  - wt/proto-natiivi-ui-kohdenostot: poista, kun haara on junassa.
  - wt/natiivi-ui-luovutus-20261028-1420 (tämä): poista mergen jälkeen.
