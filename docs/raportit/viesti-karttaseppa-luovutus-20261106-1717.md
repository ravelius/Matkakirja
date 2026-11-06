# Karttaseppä: luovutus 6.11.2026 klo 17.17 (KS)
Syy: konteksti 25 %:n pehmeällä rajalla, luonteva tauko, kun ajo 25 odottaa vuoroa. **Korvaa -1657:n; sen OMISTAJAN PÄÄTÖKSET, Codex-kohta, TEHTY, AUKI, MUUTA ja OPIT pätevät edelleen** (git show 3b34fdd56:docs/raportit/viesti-karttaseppa-luovutus-20261106-1657.md). Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 8b6e10803; varmuuskopio natiivi-backup karttaseppa/ajo-yhteinen-25). L = /Users/Shared/Claude/wt/proto-karttaseppa-lod.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ajo 25 on tilattu JU:lta, PT jakaa vuoron: Y 8b6e10803, `_tyo/karttaseppa/sk-pariisi-yhteinen-25.txt`, 5 kuvaa, loki lokit/karttaseppa-yhteinen-25-b8-8b6e10803. Pyysin JU:lta lisäksi pelin palat lokikansion alikansioon palat/ (e24-vene2, ks. alla). JU ei ole vielä kuitannut, onnistuuko kopio. Älä yhdistä Y:hen ajon aikana. 8b6e10803 on kääntämättä.
3. Etäyhteys on vain KK:lla. Hookin työlistarivit: en päivittänyt, työkalu on PT:n.

## AJON 24 TULOS (AJETTU 17.06, JU: 12/12 kuvaa, 0 virhettä)
Lähetetty KK:lle ja PT:lle 17.1x, kuvat `_tyo/karttaseppa/parit-yhteinen-24/kk/`. KK:n viesti oli jonossa; vastausta ei vielä ole.
- **Isot poissa:** uimala, Annette K, Off Paris Seine, way/787079304. **OMISTAJAN PÄÄTÖS 17.08 (KK:n viesti kokonaan):** "Lähteekö Seinen kelluva hotelli Off Paris Seine kartalta muiden litteiden muotojen mukana?" = "Lähtee (Suositus)". Ei poikkeusta. Ajo 24 ennallaan.
- **Kaksi jäi korkeusehdon takia, korjattu ajamatta:** asuntolaiva way/443008334 (517 m², h=4, Quai d'Austerlitz, 48.84346,2.36681), building=boat way/400842891 (926 ja 889 m², h=6, Port de la Bourdonnais, 48.86039,2.2935). Y 8b6e10803: VeneMaxKorkeus 6, pääte -vene2, testit ElavaKartta + TaloAlue 38/38. Pienet h=3 (41 m²) ja h=4 (11 m²) 48.8606,2.2939 lähtevät mukana, ilmakuvasta katsomatta. h=40 (48.83891,2.37506) jää, tunnistamatta. Luvut: `laikka-vesi-20261106/poistuvat.txt` (vain 48/63 palaa).
- **Haalea raita, SYY AUKI:** omistajalle luvattu selvitys on kesken. Kirjattu `laikka-vesi-20261106/syy.md`.
  - Raita on renkaan kohdalla 48.85360,2.35589 (raita-yla, kuvan keskipiste 1376,1032; noin 47 × 25 px).
  - Ei lähde kytkemällä 3D-talot, ohjelmakohteet tai veneet (raita-alueella 0 pikseliä yli eron 12). Sama ajoissa 23 ja 24, joten ei vanha pala eikä -vene1:n uudelleenpiirto.
  - Koodista ja lokista poissuljettu: KaupunkiVesi (ei avaudu, lokissa ei rivejä), napakalotti (navoilla), pohja (z ≥ 12 tasainen vesi peittää, Piirra `tasainenVesi`).
  - Ristiriita: Palakoe (tasainen pohja, ei `alkuperainen`-parametria) piirtää kohtaan pelkän veden. Pelin palaa ei ole nähty.
  - Tutkimatta: Cesiumin rasteripino (KarttaKerrokset) ja muut pallon overlayt. Lista lokista puuttuu.

## AJON 25 JÄLKEEN
Katso koko kuvat ensin.
1. **Pelin palat** (polku /private/tmp/mke.*/Matkakirja/*/laatat/elava/e24-vene2/): 13/4149/2818, 14/8299/5636, 15/16598/11273, 16/33196/22547, 17/66393/45094 (.jpg). Huom. Kaanna(): kuva voi olla käännetty pystysuunnassa. **Raita palassa = syy on piirrossa, Palakoe on väärä:** aja Palakoe oikealla pohjalla ja `alkuperainen`-parametrilla. **Raita ei palassa = kerros palan päällä:** listaa overlayt lokiin. Jos JU ei saanut kopiota, tee lokitulostus tai kirjoitus lokikansioon ajoa varten.
2. **Pari KK:lle ilman selitekaistaa:** iso-austerlitz ja iso-bourdonnais, rajaus kuten `laikka-vesi-20261106/parit-24.py` (SKAALA 0,68 m/px arvio; keskipiste = aja-kohde; pohjoinen ylhäällä). Bourdonnais'n ilmakuvaa ei ole; `hae-orto.py` hakee (robots tarkistaa itse), lisää KOHTEET-riville.
3. Rivi PT:lle ja KK:lle, päivitä syy.md.

## ODOTTAA
- **KK 17.07:** e24:n koko maailman uudelleenpiirto ei kuulu päätökseen 16.46; paikallinen tapa tarjotaan PT:lle erikseen (tarjottu 17.2x, odottaa PT:n sanaa).
- **KK:** ajon 24 parit; havainto Bercyn alakulman sillasta (ilmeisesti Simone-de-Beauvoir, nimi päätelty) ja Austerlitzin ratasillasta, jotka näkyvät ilmakuvassa mutta eivät rajatussa pelikuvassa. Kysyin, tutkinko; älä tutki ilman sanaa.
- **Codex, korjatut mallit:** ennallaan -1657:stä. Omistajan viat on viety kuittauksilla ac1ce57a0 ja 542155d12 (PT); seuraava versio tuontiporttiin, pari KK:lle.
- **PT:** koti-haaran tiedostot, ajo 25:n vuoro.
- **NUI:** kyltti-rivien sijainti lähetetty 17.1x (rivit 3316, 3318, 4374, 4376). Hoidettu.

## OPIT
- Pelikuvan iso-kuvien mittakaava: aja-komennon kolmas luku ei skaalaudu suoraan (0,0006 ylhäältä noin 0,9 m/px, 0,0015 noin 0,68 m/px). Mittaa tunnetuista kohteista, älä oleta.
- Kun rajaa isoa kuvaa pariksi, katso myös muut kuvan kohteet: Austerlitzin jäljelle jäänyt laiva löytyi vasta parista, ei ehdon tarkistuksesta. Ehtoon jääneet lasketaan listasta (`poistuvat.txt`), ei vain katsotaan isoimpia.
- `tasot-paikka.py lat lon sade_m` listaa palan kohteet paikan ympäriltä ilman verkkoa; OSM-merkintä `natiiviseppa/pariisi-talot/osm.json`.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
