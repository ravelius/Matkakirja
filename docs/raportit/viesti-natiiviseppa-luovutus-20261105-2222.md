# Natiivisepän luovutus 5.11.2026 klo 22.22 (konteksti 26 %, 7.37)

Korvaa -2202:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (7.41).

## SEURAAVA TYÖ: Marais'n koe (PT:n osa B, "aloita heti"; omistaja 22.09 "Myös tavalliset talot")
Suunnitelma: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md (osa B), Raamattu 2.213.
Yksi km² ohjelman tekemiä taloja, omaan haaraan, ei junaan. Kartan omat talot eivät näy alta; muisti lasketaan km²:ltä ilman laiteajoa. Mac-kuva kolmelta etäisyydeltä, 45° ja neljä suuntaa → KK, rivi PT:lle. Lelumainen tai kadut peittävä: PYSÄHDY, tyyli ensin, ei koko Pariisia. ODbL: kirjaa huomio (tarkistettava ennen julkaisua).

Tila: työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-marais, haara natiiviseppa/marais-talot, kohdasta a48428884 (VS:n ohjelmakohteet), ei omia committeja. 08a0ec8ea EI ole mukana: `maasto siirtyma` -komennot (10.5) vaativat sen tai sitä vastaavan yhdistämisen.
KS:ltä kysytty klo 22.1x: osuuko laatikko alueisiin v7. Vastaus tulee viestinä; ennen sitä laatikko on oletus. HUOM. ND-alueen pohja ulottuu kuvana lon 2.3595 asti, mutta alfa 0 maskin ulkopuolella.

### Valmiina: _tyo/natiiviseppa/marais/
hae-osm.mjs → osm.json (Geofabrik-ote T7:ltä; 2244 tietä + 700 relaatiota; Overpass /api/ on robots.txt:ssä kielletty, ei käytetä). hae-ign.py → ign.json (BD TOPO, Licence Ouverte, 4067 kohdetta; hauteur 3901:llä, p50 17,5 m, p90 21,3 m; altitude_min/max_toit katolle; data.geopf.fr:llä ei robots-rajausta). Molemmat varalla 48.8545–48.8665, 2.3525–2.3701. OSM:ssä height vain 1:llä, levels 1415:llä.

### Rakenne (päätetty, koodi kirjoittamatta)
Koealue: lat 48.8560–48.8650, lon 2.3545–2.3681; talo mukaan keskipisteestä. Python: /opt/homebrew/bin/python3, numpy on, shapely EI ole (älä asenna; oma earcut noin 60 riviä).
1. tee-talot.py: ääriviivat OSM:stä (samat tiet kuin kartalla, siksi ei BD TOPOn ääriviivoja). Korkeus: IGN-monikulmio keskipisteen alla, muuten lähin 15 m:n sisällä, muuten levels × 3,2, muuten 15 m. Seinä = hauteur (sol–gouttière); katon nousu altitude_max_toit − min_toit, rajattu 1–6 m. Relaatiot: ulko- ja sisärenkaat yhteen ketjuttamalla.
2. Yhteiset seinät pois: reuna, joka on naapurilla (samat solmut pyöristettynä), piirretään vain naapurin korkeuden yläpuolelta; muuten kolmioista menee moni piiloon. Peräkkäiset samansuuntaiset seinät yhdeksi (< 4°). Ei Douglas-Peuckeria: rikkoisi yhteiset solmut.
3. Mansardikatto: reunakohtainen sisennys d = min(2,2 m; 0,35 × 2A/P), naapuria vasten d = 0 (ei uria rivitalojen väliin). Kärki = sisennettyjen viivojen leikkaus. Rengas itseään leikkaava tai ala ≤ 0 → tasakatto.
4. Tiedosto Resources/MaraisKoe/talot.bytes: 24 t/kärki (Float32x3 paikka, SNorm8x4 normaali, UNorm8x4 väri, SFloat16x2 uv), Mesh.SetVertexBufferParams, UInt32-indeksit, Resources.UnloadAsset latauksen jälkeen, UploadMeshData(true). Metrit, +x itä, +y ylös, +z pohjoinen, ankkuri alueen keskellä.
5. TaloKerros.cs OhjelmaKohteet.cs:n mallilla (sama paikka, MaanpintaH 90, kierros Akseli 0, LahiKaari 0,13 / KaukoKaari 0,2, Vapauta, Usva yhdestä ankkurista, oletuksena pois tai komennolla). .meta käsin (fileFormatVersion + guid).
6. Yksi varjostin OhjelmaKohde.shaderin pohjalta (sama valo, Neutral, usva, syvyys 60 m): uv.x metrit seinää pitkin, uv.y metrit ylös, väri.a laji (seinä, rinne, tasa). Ikkunat fragmentissa 3,4 × 3,2 m, alin kerros 3,5 m:stä, häipyvät fwidthillä kaukana (ei moiréa); rinteellä pienet kattoikkunat; tyvessä kevyt tummennus.
7. Paletti kartalta (ElavaTyyli.cs:572): katto SKatto 168/140/116, seinät SMaa 240/222/180 ja SPiha 226/199/160 väliltä talokohtaisesti, ikkuna tummempi SKatto. Väri lineaarisena kärjessä, kuten OhjelmaKohdeGeometria.
8. Kartan talot pois: ElavaTyyli.PiirraVuokralla rakTila 2 -silmukassa (rivi noin 358) ohita ulkorengas ja sen reiät, kun z ≥ 16 ja renkaan keskipiste on alueella. Vain z16, koska lähitasolla näkyy; z ≤ 15:n jäämät jäävät 3D:n alle, ja 3D näkyy (kaari 0,2 ≈ 22 km) aina kun z16 näkyy. Välimuisti: Laattapalvelin.ElavaKuva-polkuun pääte vain alueen z16-paloille, EI ElavaTyyliVersion nostoa (muuten kaikki palat piirrettäisiin uudelleen).
9. Testit: puhdas alue- ja renkaan sijaintifunktio Kartta-testeihin; tiedostomuodon luku; paljastetaanko reikä, jos 3D on pois.
10. Muisti: laske km²:ltä kolmiot, kärjet, tavut; kerro Pariisiin 179 000 / km²:n talomäärä. Iso iPad 3781 Mt, raja 4080 (4.11.). Kerro tulos kuvan kanssa.
Reuna (4.11. 09.27 "ei rajaa") näkyy kokeessa; kerro KK:lle, ratkaisu kuuluu osaan C.

### Ajo
Vuoro JU:lta; pyynnössä "mitä tämä ratkaisee" ja kuvalista. Pienin kuvalista: kolme etäisyyttä yhdestä suunnasta + kolme muuta suuntaa keskietäisyydeltä = 6 kuvaa, perustelu: PT:n käsky. Malli: _tyo/linssiseppa2/ohjelmakohteet/sk-ohjelmakohteet.txt (`komento aja lat lon kaari 2`, `komento suunta`, `komento kallista 45`, `maasto siirtyma 5 0 30`, `maasto siirtyma kallistus 90`). `PROTO_LINJA=2 ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh tyokalut/esikatselu.sh <sha> <sk> ipad --batch`, lopuksi LUKKO VAPAA. Sarjan ajot ensin.

## Ateenan kamera: EI TYÖTÄ (PT/KK 22.1x, Raamattu 2.136: muut kaupungit ennallaan)
Havainto: df7cc3e0c:n jälkeen luenta ei peitä Pulun sarjaa, joten elävän kartan maakohtaus (ElavaKartta.Odota → AjaSaapumisnakymaan) ajaa kameran koko maan näkymään 1. repliikissä (unity.log 2696–2708). Korjaus tehtiin ja kumottiin: 37fa268e4, kumous a6a254be7. Ero 30fdefd98:aan nolla. Älä korjaa ilman omistajan sanaa.
Tiedoksi PT:lle kerrottu: LivianPaljastus.Alkuosa jättää ajastimen päälle, jos sarja on jo kuultu; aarrelaskuri voi jäädä odottamaan. Ei työtä.

## Haara natiiviseppa/pariisi-aloitus-219
Kärki a6a254be7, peilissä, puhdas, ei junassa, junaan vain PT:n kautta. Työpuu wt/proto-natiiviseppa-kierto. 30fdefd98:n esityskuva menee seuraavaan yhteiseen ajoon, ei omaa ajoa. JU:n pyyntö peruttu. Skenaariot _tyo/natiiviseppa/pariisi-aloitus/: sk-esityskuva.txt (Lontoo → Pariisi, koska aloituskaupungissa ei esitystä) voi käyttää yhteisessä ajossa; sk-aloitus-ateena.txt ja -tukholma.txt ovat kumotun kameran mukaisia, ei käyttöön.

## Avoimet
Avoimet 2 (vahdit) ei NS:lle; pystysauma KS:llä (PT 22.1x). NUI:n e4b376546 ja aloitushaara törmäävät Nimikerros.cs:ssä (PT tietää).

## Työtapa
kaanna.sh sh:lla, ei zsh:lla. zsh:ssa "$R:Assets" tulkitaan muuntimeksi: käytä "${R}:polku". JU palauttaa pyynnön ilman ratkaisee-riviä tai yli noin 5 kuvalla ilman perustelua.
