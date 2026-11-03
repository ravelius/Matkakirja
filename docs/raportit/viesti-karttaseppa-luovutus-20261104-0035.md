# Karttaseppä: luovutus 4.11.2026 klo 00.35 (KS)
Edellinen: docs/raportit/viesti-karttaseppa-luovutus-20261103-2359.md (haara karttaseppa/luovutus-20261103-2359, sha 9805ad912, PR 6237). Tämä korvaa sen TILAN ja AVOIMEN kohdat 1–2 ja LISÄYKSET 00.05 (metsät) ja 00.10; muut AVOIMEN kohdat pätevät yhä. Syy: konteksti pehmeällä rajalla (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/`, P = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/` (python `/opt/homebrew/opt/python@3.14/bin/python3`).
**Vahti ei ole ajossa tässä sessiossa:** aja `Monitor` komennolla `zsh Y/vahti.zsh`, 30 min välein uudelleen. Tasankoketju pid 65143 ja esittelysilmukka pid 68441 olivat käynnissä 00.31.

## TEHTY (KK 00.10 ja 00.13, korjauslista lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md)
Kaikki ovat koosteita pelikuvan päällä, eivät pelissä. **Mitään ei ole viety NS:lle; PT:n kielto voimassa, kunnes KK on hyväksynyt puun.**
- **Puukuva:** P/puukuva.py → P/puu-60-v2.png (c64931c39fbd). Latvus 118/102/62 kuten 2029, tiedostosta mitattu. Pyöreys valosta, vaalea maavarjo pois, tumma varjo latvuksen alle, joka näkyy latvusten väleissä. Kuvan ankkuri ja koko samat kuin v1:llä, joten NS vaihtaa vain tiedoston (v2-polku, TasoVersio).
- **Puut koko kartalle:** P/puut-uudet.py → P/puut-uudet.json (5dfc927cc7b8): 53 336 puuta (nyt 86 783), leveys 24–34 m. Muoto: `kuva, ankkuri, suhde, paikat` [x, y, leveys, 0] kuten pariisi.json:n laji, lisäksi `laji` (0 metsä, 1 reuna, 2 ryhmä, 3 katu). Syöte pariisi.json: wt/proto-karttaseppa-ruutu-218. Puistot: reunarivi ulkoreunalle, ryhmät tasaisesti 92 m:n välein (isossa 1,7×). OSM:n yksittäisiä puita ei käytetä puistoissa, joten kirjaimet poistuvat. Kadut: käytävästä vahvin rivi, väli 17 m. Metsät: väli 13 m, sulku 44 m, kohina jättää aukkoja.
- **Pari v2:** P/pari.py → P/pari-a95-silta-katu.jpg (23894fbb1c00, iPad a95), P/pari-boulogne.jpg (8fd61264c5bb, Mac). PT:llä; odottaa KK:ta. Tahrat nurmilla, kadonneet polut ja nimien palat ovat koosteen poistojälkiä.
- **Sacré-Cœur k4:** Y/sacre-coeur-metsa.py → Y/tarkistus-nahtavyydet/sacre-coeur-k4/ (5b7701425179, sama alue.json kuin k3). 304 puuta, metsä kirkon leveys sivuille ja taakse, peittää korttelit. Aukion muoto ja kolme soikeaa nurmea ovat oma arvioni. Pari PT:llä.
- **Louvren kiila k3:** Y/nahtavyys-nurmi.py (uusi 7. argumentti puuväli, puu v2) → Y/tarkistus-nahtavyydet/louvre-k3/ (68f845295674): 16 puuta (oli 51), koko ennallaan. Pari PT:llä. Komento: `nahtavyys-nurmi.py louvre lokit/esikatselu-20261103-234105/nd-louvre.png 1321,564 780,290,1230,630 <ulos> 80 16`.

## AVOIN (järjestyksessä)
1. **KK:n vastaus pariin (PT:n kautta).** Hyväksynnän jälkeen: puu-60-v2 + puut-uudet.json + sacre-coeur-k4 + louvre-k3 NS:lle; sitten muisti ja ruudunpäivitys isolla iPadilla (JU). Isommat kuvat lisäävät piirtoa, vaikka määrä laskee; mittaamatta. Louvre ja Sacré-Cœur on tehty v2:lla, joten jos puu muuttuu, aja ne uudelleen.
2. **Tiedossa olevat heikkoudet:** Invalidien nurmet epätasaiset; Cours la Reinen rivi katkeaa idässä. Boulognen väylät ja aukot tein PT:n huomion ("tumma yhtenäinen massa") mukaan, vaikka KK pyysi aukkoja pienemmiksi: ristiriita mainittu PT:lle, KK ratkaisee. Säädöt puut-uudet.py:n alussa (VALI_*, G_VALI, METSA_SULKU_M) ja rivit `kohina(55.0)` + percentile 13.
3. Louvren vasen etupuoli katsotaan VS:n tyylin kanssa. Katuviiva veden yli sillan vieressä katsotaan 628d1a90a:sta.
4. Edellisen luovutuksen AVOIN 3–7 (pelikuvan arviot, korttelipinta, hautausmaat, taustaajot, vanhat).

## Opit
- Puukuvan leveys ei ole latvus: latvus on 0,57 × leveys, joten latvusten koskettaminen vaatii 24–34 m:n kuvalla noin 13–14 m:n välin, eikä 22 m riitä.
- Pelikuva ja kartta sovitetaan puista: pariisi.json:n paikat ↔ kuvan möykyt, ICP + homografia (pari.py). Sama sovitus sijoittaa nähtävyyskuvat tarkasti koosteeseen.
- Rengas nurmilohkon ympärillä näyttää kirjaimelta: yhdistä vierekkäiset nurmet sulkemalla ja vie rivi vain ulkoreunalle.

## LISÄYS klo 00.52 (KK 00.41; lue tämä ensin, korvaa puun värin ja koon)
KK:n mitta 118/102/62 oli väärä, ja v2 kumottu. Lista: lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, osio "puupari 00.33".
- **P/puukuva.py → P/puu-60-v3.png (21e2bc8bee13):** latvus 150/126/76, v1:stä, muotovarjo ja pehmeä varjo.
- **P/puut-uudet.py → P/puut-uudet.json (58b75a9267ab):** 25 883 puuta, kuvan leveys 41–58 m (latvus 24–34 m). Metsä 18 971 (min. väli 19 m, väylinä vain ajotiet; mittari 161/140/87, 81/136/165 täyttyy koosteessa), muodolliset 257 (käsin MUOD-listasta: tasavälit ilman kohinaa, Invalidit nurmien ulkoreunoille, Luxembourg reunaa kiertäen), puistojen ryhmät 2–7 latvusta, kadut 1 228 (vain bulevardit ja rannat, ketjuista tasaväli, käytävässä yksi rivi).
- **Parit:** P/kolmio-a95-silta-katu.jpg, P/kolmio-boulogne.jpg, P/kolmio-luxembourg.jpg (ennen | jälkeen | 2029; kooste.py, mittari.py). PT:llä, odottaa KK:ta; **EI NS:lle ennen KK:ta**. Hyväksynnän jälkeen v3 + json + sacre-coeur-k5 + louvre-k4 NS:lle, sitten muisti isolla iPadilla.
- **Sacré-Cœur k5 3584699941fd, Louvre k4 c34399e782cc** (v3; käytä näitä, ei k4/k3:a).
- **Heikkoudet:** Luxembourgissa rivi on ohut 2029:n paksuun puustoon verrattuna, ja nurmella on OSM-metsien puita (sulku). Luxembourgin länsireuna jää pantheon.png:n ulkopuolelle: isompi rajaus vaatii uuden kuvan (JU). Pelikuvan m/px: .012-ajo Macilla noin 0,716, iPad a95-silta-katu noin 0,72.
- Vahti käynnissä tässä sessiossa; 30 min välein uudelleen.

## LISÄYS klo 00.5x: KK 00.45 (PT:ltä; ALOITTAMATTA, lue ensin; lista: lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, viimeinen osio; ei NS:lle)
Viesti tuli ennen kuin PT oli nähnyt kolmio-parit (00.52) tai ennen kuin KK arvioi ne: tarkista ensin listasta ja PT:ltä, koskeeko se jo v3:a.
1. **Puun väri ensin** (00.41; tehty v3:ssa, varmista).
2. **Boulogne:** väylät ja aukot jäävät; kasat listan kohtien 3–4 mukaan.
3. **Louvre k3:** kiilan poisto ja 16 puuta hyväksytty suunnaksi; korjaa nurmen pilkkureuna ja irrallinen laikun loppu (Y/nahtavyys-nurmi.py; k4 on sama v3-värillä).
4. **Sacré-Cœur k4 EI (koskee myös k5:ttä):** metsä kirkkoa kiertäväksi kaareksi, noin 0,7 kirkon leveyttä sivuille, takana ristin korkeudelle; latvus noin 0,13 kirkon leveydestä; tumma pohja pois; kerma-aukio pois (Y/sacre-coeur-metsa.py).
5. **Kivetty aukio Codexilta yhtenä kuvana 2029-sc:n mallista:** tilaus origin/claude/postilaatikko-haaraan, kohde kuvana ja aiemmat työt haettuna ennen tilausta. Ennen kuvaa ei aukiota lainkaan.

## LISÄYS juuri ennen nollausta (PT ja NS; lue tämä ensin; ALOITTAMATTA; ei NS:lle ennen KK:ta)
PT katsoi kolmio-parit ja vei ne KK:lle; KK ei ole vielä hyväksynyt niitä. PT:n jatkolista:
1. **Tuileries, Champs-Élysées ja Invalidit:** muotopuutarhan piirros katoaa jälkeen-kuvassa (P/kolmio-a95-silta-katu.jpg). Selvitä syy ja palauta. Todennäköinen syy, tarkistamatta: P/pari.py:n vanhojen puiden poisto (`lisa`, valo-ehto ja lähimmän pikselin täyttö) pyyhkii polut ja piirroksen, eli vika olisi koosteessa, ei datassa. Varmista, ennen kuin kerrot syyn.
2. **Luxembourg:** paksu puusto reunoille, ei ketjua; OSM-metsän puut pois nurmelta (nyt sulku tuo ne: rajaa metsät pois muodollisista puutarhoista).
3. **Puut pois kadunnimien päältä ja yksittäiset ryppäät korttelien keskeltä.** Tarkista Boulognen paloittaiset metsäreunat.
4. **NS:n löydökset (kuvat /Users/Shared/Claude/proto-3d/lokit/julkaisija-yhdistelma-iso-f1fb45f10, PT: samaan pariin):** (a) y-sacre-coeur: puut piirtyvät Sacré-Cœur-nimen päälle (esineet +60…+99, nimet alempana). (b) y-nd-louvre ja y-vene-pont-royal: Louvre-nimi osuu Seinelle (rajauslaatikon alle kaukana kuvasta). Nimet ovat KS:n; kerro NS:lle sha, jos korjaat. Tuplia ei näkynyt neljässä NS:n katsomassa kuvassa (nd-louvre, Riemukaari, S-C, Eiffel).
5. **PT:n kysymä:** täydet polut lähetetty PT:lle: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/tarkistus-nahtavyydet/sacre-coeur-k5/ ja .../louvre-k4/. Viesteissä aina täydet polut, ei Y/P-lyhenteitä.
Vahti kuolee nollauksessa: käynnistä uudelleen. Sen 12 ensimmäistä TOIMITUS-riviä ovat vanhoja.
