# Karttaseppä: luovutus 6.11.2026 klo 11.45 (KS)
Syy: konteksti 26 %, luonteva tauko: ajo 9 jaettu, VS:n ja KK:n vastaukset auki. **Voittaa -1128:n ristiriidassa; lue -1128:n AUKI-kohdat ja LOPPUTESTIT.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (kärki 82c0130ba). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki 5f44adef2, ei muutettu).

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).

## AJO 9 KATSOTTU JA JAETTU (lokit/karttaseppa-yhteinen-9-b8-5f44adef2)
- **pb-lahi = pb-etu tavulleen:** 0,0008 leikkautuu lähimpään korkeuteen (KorkeusKaarelle → MinKorkeus; päätelty koodista ja tiedostojen samuudesta). Lähikuvaa ei saa pienemmällä etäisyydellä.
- **Lippu:** "trikolori rajan sisään" (abd7d1dd8) tarkoittaa paletin väri­rajaa, ei paikkaa. Ero ajo 8 | ajo 9 rajauksessa 4 pikseliä: 155,41,35 → 126,70,58. Pari `_tyo/karttaseppa/parit-yhteinen-9/pari-pb-ajo8-ajo9.jpg` KK:lla. KK ei kumonnut, katsoo parin ennen sanaa. Suositus: jää.
- **us-*:** VS:llä. us-nd-85, us-nd-45, us-kauko-85 kelpaavat. us-eiffel-85: Louvren seinä peittää. us-silta-85: ei siltaa. us-eiffel-75: Eiffel pisteytettynä haamuna taivasta vasten, nykytilan todiste.
- POIKKEUS 1 kpl lokissa: Unityn oma SearchDatabase, ei pelin. JU:lle kerrottu.

## SEURAAVAKSI: AJO 9b JA AJO 10
Odottaa VS:n vastausta viestiini 11.35: A) Eiffel-kamera, ehdotus `kallista 85; aja 48.8565 2.3115 0.008 2; suunta 272` (arvio lokin "katse 1,8 km kameran alta" perusteella, ei ajettu), B) sillan kamera. VS:n viesti ajosta 8 tuli ristiin eikä vastannut näihin. Jos VS ei ehdi: 9b Eiffelillä, silta pois (lupasin näin).
1. **9b:** Y 5f44adef2 sellaisenaan, sama alku kuin `_tyo/karttaseppa/sk-pariisi-yhteinen-9.txt`, vain uudet kamerat (2-4 kuvaa). Tulos lokit/karttaseppa-yhteinen-9b-b8-5f44adef2. Pyydä JU:lta; JU tietää, että 9b on tulossa.
2. **Ajo 10:** `git -C Y merge --ff-only 61a6f5321` (ff tarkistettu, ei yhdistetty, kääntämättä). Sama alku + `_tyo/linssiseppa2/ohjelmakohteet/sk-usva.txt` + 9b:n uudet kamerat + listan lopussa VS:n erikoismallit:
```
komento symbolit paalle
odota 5
komento aja 64.3137 -20.2995 0.3 2
odota 25
kuva em-geysir-3 Geysir, 0,3
komento aja 64.3137 -20.2995 0.1 2
odota 25
kuva em-geysir-1 Geysir, 0,1
komento aja 48.8102 14.315 0.3 2
odota 25
kuva em-krumlov-3 Krumlov, 0,3
komento aja 48.8102 14.315 0.1 2
odota 25
kuva em-krumlov-1 Krumlov, 0,1
komento symbolit tila
komento symbolit pois
odota 10
```
Tulos lokit/karttaseppa-yhteinen-10-b8-61a6f5321, kansio VS:lle, parit us-* ajo 9 tai 9b | ajo 10 samasta kamerasta. Usva siirtää myös kartan ja talojen alkua: älä vertaa vanhoihin ajoihin usvan osalta. Raamattu 2.215 ennen kuin kosket usvaan.
VS: ajo 8 katsottu (`_tyo/linssiseppa2/ohjelmakohteet/TULOS-yhteinen-8-1347410ca.md`). Taivaan hahmo on sotilasnappula (48.8570, 2.3520), 61a6f5321 ei koske sitä, älä odota sen häviävän ajossa 10; VS kysyy PT:ltä. Syy erikoismalleihin: 3D-merkit olivat pois, ei etäisyys. Sillat kunnossa.

## FORUM (KK 11.3x, viety KK:lle 11.42, ÄLÄ MUUTA ennen KK:n sanaa)
Skriptit scratchpadissa katoavat; tulos tässä. Laatta openfreemap planet 20261101, 14/8298/5636.
- Neljän neliön rivi: way/626410287-290, building=roof, 0,5 m, 76-83 m². NS suodattaa roof-lajin, kartta piirtää litteänä.
- Yksittäinen neliö: laatan rakennus 35 m², 48.86234 2.34460; ei osm.json:ssa; OSM-alkuperä todistamatta.
- Neljä harmaanvihreää: vesitaso pond, 53-122 m², keskipisteet 48.86202 2.34583, 48.86221 2.34592, 48.86234 2.34573, 48.86244 2.34614. Suositus: jäävät.
- Korjausehdotus: 11 keskipisteen luettelo (5 litteää + 6 palaa: way 951307699, 942327083, 626410285, 626410286, 626406824, 942327082) ElavaTyyli.cs:n kohtaan, jossa TaloAlue.RengasPois; uudelleenpiirto vain Forumin palat versioliitteellä kuten "-talot1" (Laattapalvelin.Elava.cs:163). Noin 10-15 riviä + testi, arvio. Suositus KK:lle: samaan ajoon NS:n v10:n kanssa, tarkistus po-la-forum samalta kameralta. Rajaus (600,1350,1250,1850) kuvasta po-la.png.
- NS: v10 (Canopéen katto + Palais-Royal'n eteläosa), 6 palaa jää. Koordinaatit lähetetty: relation/3300400, bbox 48.86277-48.86426, 2.33576-2.33808; eteläosan raja 48.8635 on oma laskuni, ei KK:n. Kun NS tuo sha:n: po-la ja louvre-ita samalta kameralta.

## KK:LLA AUKI
- **Paletti-v2:** omistajan kortilla (ajo 8). Älä vaihda Malli.Tiedosto-polkuja ennen riviä "OMISTAJAN PÄÄTÖS". Sanan jälkeen vaihda W:ssä, koepaletti pois vasta nähtynä; Tiedoksi PT.
- Palais Bourbonin lippu, Forumin kartan korjaus.

## Oppi
Tarkista commitista, mitä sana tarkoittaa, ennen kuin kuvaat tuloksen: "rajan sisään" oli väriraja, ja jouduin korjaamaan viestin. Vertaa tiedostojen tiiviste, kun kaksi kuvaa on saman kokoisia.
