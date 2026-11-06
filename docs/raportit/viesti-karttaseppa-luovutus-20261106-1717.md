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

## AJO 25 TEHTY 17.19 (JU: 5/5 kuvaa, 0 virhettä); parit KK:lla `_tyo/karttaseppa/parit-yhteinen-25/kk/`
Asuntolaiva ja Bourdonnais'n laivat poissa. Raita ennallaan (laikka-1 ajo 24 | 25: raita-alueella 0 pikseliä yli eron 12). **Palat 0/5:** tilaukseni polku oli todennäköisesti väärä: ElavaKuva lisää pääteketjun, ja `talot 1` lisää -talot1 (myös -forum1 ja -sillat1 mahdollisia), joten kansio voi olla esim. e24-talot1-sillat1-vene2. Tätä ei ole todennettu ajosta. Havainnot KK:lle kerrottu: Pont d'Iéna ei näy Bourdonnais'n rajatussa pelikuvassa, tarkistamatta; Eiffelin kiveyksen reuna vinossa kulmassa.

## AJO 26 (seuraavaksi, PT jakaa vuoron)
Y:hen ajon 25 jälkeen: e23 + Pariisin katetun veden pääte (PT:n sana), NUI:n f0384fdbe ja lisa-kyltit-nui-2.txt. Tilaa JU:lta palat hakemalla `laatat/elava/e2*/{z}/{x}/{y}.jpg` (kaikki versiokansiot, myös `laatat-kylma-*`), ei tarkalla kansion nimellä. Laske kuvat rivit skenaariosta.

## PALOJEN TULKINTA
1. **Pelin palat:** 13/4149/2818, 14/8299/5636, 15/16598/11273, 16/33196/22547, 17/66393/45094 (.jpg). Huom. Kaanna(): kuva voi olla käännetty pystysuunnassa. **Raita palassa = syy on piirrossa, Palakoe on väärä:** aja Palakoe oikealla pohjalla ja `alkuperainen`-parametrilla. **Raita ei palassa = kerros palan päällä:** listaa overlayt lokiin. Jos JU ei saanut kopiota, tee lokitulostus tai kirjoitus lokikansioon ajoa varten.
2. **Pari KK:lle ilman selitekaistaa:** iso-austerlitz ja iso-bourdonnais, rajaus kuten `laikka-vesi-20261106/parit-24.py` (SKAALA 0,68 m/px arvio; keskipiste = aja-kohde; pohjoinen ylhäällä). Bourdonnais'n ilmakuvaa ei ole; `hae-orto.py` hakee (robots tarkistaa itse), lisää KOHTEET-riville.
3. Rivi PT:lle ja KK:lle, päivitä syy.md.

## ODOTTAA
- **TEE AJON 25 JÄLKEEN (PT:n sana, KK 17.07 pyysi):** ElavaTyyliVersio takaisin e23:ksi ja katettu vesi (520f58ad8) vain Pariisin paloille päätteellä, kuten -vene2; ei koko maailman uudelleenpiirtoa (omistajalle luvattu rajaus 16.46). Koe, ei junaan ennen omistajalle luvattua kuvaa. Pääte tulee myös pelin palojen polkuun: ajon 25 kansio on vielä e24-vene2. Muiden kaupunkien katettu vesi jää vanhoihin paloihin, määrä on laskematta; lasku vasta, jos joku kaupunki piirretään uudelleen (PT).
- **KK 17.18:** ajo 24 näytetään omistajalle; ajon 25 pari ja tulokset KK:lle. 8b6e10803 kuuluu päätökseen 16.46, ei junaan.
- **OMISTAJAN PÄÄTÖS 17.24 (KK:n viesti kokonaan), TEE AJOON 26:** "Piirretäänkö Seinen yli kulkevat kävely- ja metrosillat Pariisin kartalle ohuina viivoina?" = "Piirretään (Suositus)"; selite: "Vain veden yllä olevat sillat tulevat ohuina viivoina. Pienet kadut pysyvät poissa, ja näytän kuvan ennen junaa." KK: tee kokeena, ei junaan. Kuva KK:lle: kumpikin näistä kahdesta sillasta sekä lista muista sillan lisäyksen piiriin tulevista. Vuoro ja ajo PT:n kautta; kortti 4.11. 06.51 pienistä kaduista pysyy muuten voimassa. Ei aloitettu. Toteutus: rivien 472–473 ohitukseen poikkeus brunnel=bridge ja keskipiste/osuus joessa, vain Pariisin palat päätteellä; lista `tasot-paikka.py`:n tapaan palavälimuistista (vain 48/63 palaa, kerro se).
- **KK 17.25, TEE ENSIN (ilman omaa ajoa, koodista ja aineistosta):** miksi Pont d'Iéna puuttuu Bourdonnais'n rajatusta pelikuvasta (parit-yhteinen-25/kk/bourdonnais-ilmakuva-peli.png; onko KeskustanSillat-listassa, SiltaTiePois, 3D-silta kuvassa ohjelmakohteet 1:llä?) ja mistä Eiffelin kiveyksen vino reuna tulee (sama kuva; todennäköinen ehdokas karttatasa tai Eiffelin alustan kuvapala, tarkistamatta). Tulos rivinä KK:lle, kopio PT:lle; ei korjausta ennen sanaa, jos se koskee omistajan linjausta. Raidan palat ajossa 26, tulos KK:lle. KK näyttää ajon 25 omistajalle.
- **Sillat, selvitetty koodista ja aineistosta, ei koodimuutosta, tulos KK:lla 17.2x:** Passerelle Simone de Beauvoir on datassa class=path, ja ElavaTyyli.cs:473 (k52, omistajan 06.51) jättää polut pois. Austerlitzin ratasilta on subclass=subway brunnel=bridge, ja rivi 472 (k52) jättää metroviivat pois; sen kansi class=bridge on alue, ja rivi 463 ohittaa kaikki transportation-alueet. Kumpikaan ei ole KeskustanSillat-listassa (18 riviä). Omistajan päätös 17.24 yllä.
- **Codex, UUSI TOIMITUS 17.21 (58678d31b, postilaatikko, käsittelemättä):** Notre-Dame #2171 ja Riemukaari #2172, `posti/codex-pariisi-pelikoe23-2171-2172-20261106/`, kirje `posti/codex-paatoimittaja-pariisi-2171-2172-pelikoe23-toimitus-20261106.md`. Tee: SHA256SUMS ja tuontiportti, koemallit ajoon 26 omaan kansioon kuten lod2-20261106 (oletus ei muutu), samat kamerat kuin ajossa 23 (ylhäältä, 45°, 5°; ND:n takanäkymä, Riemukaaren holvi 5° suurennettuna), pari KK:lle, KK vie omistajalle. Kuittaus Codexille vasta KK:n välittämästä päätöksestä; älä kirjoita Tripolle tai Codexille muuta ilman KK:n sanaa. Nykyiset mallit pysyvät. Vahti on käsitellyt tämän (postilaatikko-kasitelty.txt).
- **PT:** koti-haaran tiedostot, ajo 25:n vuoro.
- **NUI, AJOON 26 (PT:n sanalla, kokeena, ei junaan):** ajo 25 oli jo käynnissä, kun pyyntö tuli, joten se ei ole siinä. Ennen ajoa 26 poimi Y:hen f0384fdbe (natiivi-backup natiivi-ui/kyltti-diag, kääntämättä, suoraan 10c8060de:n päällä) ja liitä skenaarion alkuun alustusten jälkeen `_tyo/karttaseppa/lisa-kyltit-nui-2.txt` (korvaa lisa-kyltit-nui.txt:n). Älä poimi ajon 25 aikana. Ajon jälkeen lokin polku ja kyltti-rivien numerot NUI:lle (local_a3754ed8-f155-43b5-9095-b51e9e29ff53); käännösvirhe heti NUI:lle, ei omaa korjausta. Ajo 26 voi olla sama kuin e23-koe.

## OPIT
- Pelikuvan iso-kuvien mittakaava: aja-komennon kolmas luku ei skaalaudu suoraan (0,0006 ylhäältä noin 0,9 m/px, 0,0015 noin 0,68 m/px). Mittaa tunnetuista kohteista, älä oleta.
- Kun rajaa isoa kuvaa pariksi, katso myös muut kuvan kohteet: Austerlitzin jäljelle jäänyt laiva löytyi vasta parista, ei ehdon tarkistuksesta. Ehtoon jääneet lasketaan listasta (`poistuvat.txt`), ei vain katsotaan isoimpia.
- `tasot-paikka.py lat lon sade_m` listaa palan kohteet paikan ympäriltä ilman verkkoa; OSM-merkintä `natiiviseppa/pariisi-talot/osm.json`.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
