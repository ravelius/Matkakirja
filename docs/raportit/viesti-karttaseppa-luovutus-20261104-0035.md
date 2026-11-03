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

## LISÄYS 4.11. klo 01.08 (uusi KS: lue tämä ensin; korvaa kaksi edellistä lisäystä)
Kaikki koosteita pelikuvan päällä, ei pelissä. **EI NS:lle ennen KK:ta.** PT:llä, odottaa KK:ta. Vahti: Monitor `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/vahti.zsh`; sen 13 ensimmäistä TOIMITUS-riviä ovat vanhoja.
- **Sacré-Cœur k7** /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/tarkistus-nahtavyydet/sacre-coeur-k7/ (082120a7194f; pari-ennen-jalkeen.jpg, lahikuva-aukio.jpg). Työkalu /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/sacre-coeur-kaari.py korvaa sacre-coeur-metsa.py:n: 323 puuta, sivuille 0,68 W, latvat ristin korkeudella, latvus 0,13 W, ei tummaa pohjaa, kerma-aukio ja soikiot pois. Aukio Codexilta 5d8333c90 → _review-sacre-coeur-aukio (leveys 374 px, Codexin QA ei läpäissyt) kavennettu koodilla 306 px:ään (KK:n "noin kirkon levyinen"), ja alle 8:n alfa poistettu. Kiven kuvio on karkeampi kuin 2029:ssä; KK arvioi.
- **Louvre k5** /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/tarkistus-nahtavyydet/louvre-k5/ (59b27f38a4ae; lahikuva.jpg): nahtavyys-nurmi.py pyöristää reunan, poistaa irtolaikut ja peittää keltaiset pilkut. 16 puuta ennallaan.
- **Tuileries-syy (vahvistettu):** muotopuutarhan "piirros" oli vain OSM:n vanhojen puupisteiden tiheys (/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/tuileries-osm-puut.png vs pari). Peruskartan nurmi on tasaista, joten PT:n epäily koosteen poistosta piti vain osin: kooste söi lisäksi talojen reunoja ja tahri nurmea. Kooste korjattu (pari.py: suppeampi poisto, tummat neutraalit jäävät, painotettu täyttö).
- **Palautus: uusi taso** /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/puutarhapolut.py → /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/puutarhat/*.png + lajit.json (OSM-käytävät ja altaan reunus, ryhmä "puutarha", piirrettävä ennen puita; yhteensä alle 1 Mt): Tuileries, Champs-Élysées, Luxembourg, Palais-Royal, Champ-de-Mars. Tämä on uusi lajiryhmä, joten NS:n pitää varmistaa järjestys; ei vielä kirjastossa.
- **Puut** /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/puut-uudet.json (bfced4c5e337, 22 596 puuta): Luxembourgiin paksu vyö reunoille, OSM-metsät pois muodollisista puutarhoista, alle 0,8 ha:n metsät ja alle 0,5 ha:n puistot pois (ryppäät korttelien keskeltä), puutarhan kävelytie ei katkaise riviä, Invalidit suorat rivit.
- **Parit:** /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/kolmio-a95-silta-katu.jpg, kolmio-luxembourg.jpg, kolmio-boulogne.jpg (ennen | jälkeen | 2029).

### AVOIN
1. **Nimet puiden päälle pelissä: EI TEHTY, syy osin auki.** Puut +60…+99 (jono 3060+), Nimikerros.jono 2995 (Pallo.unity:549), piirros 3050+. Silti nimet näkyvät piirroksen päällä, eli mekanismi on selvittämättä; aloita siitä. Koosteiden nimet on poimittu pelikuvasta. Lisäksi NahtavyysRuutu on koko kuvan suorakaide: jos metsä on samassa kuvassa kirkon kanssa, alle jäävät nimet piiloutuvat (OsuuNahtavyyteen). Suositus: Sacré-Cœurin metsä erillisinä puina (paikat kaari-skriptistä, leveys metreinä), kirkkokuva ja aukio erikseen, ja kuvan oma ruutu ennallaan.
2. **Louvre-nimi Seinellä (NS 4b): EI TEHTY.** Oma nimi menee rajauslaatikon alle (OmaKuva, Alareuna), ja Louvren laatikko ulottuu joelle. Haara karttaseppa/pariisi-nimet-220 (wt/proto-karttaseppa-ruutu-218). Kerro NS:lle sha, kun korjattu.
3. **Heikkoudet:** Invalidien itärivi katkeaa talojen kohdalla, koska rajaava suorakaide ei seuraa nurmea pohjoispäässä. Vanhat pienet puut Avenue Marignyn ja Cours la Reinen kohdalla jäävät koosteeseen, koska a95-kuva on vanhempi kuin pariisi.json (ei dataa). Boulognen reunat katsottu: ei selvää vikaa.
4. Hyväksynnän jälkeen NS:lle: puu-60-v3, puut-uudet.json, puutarhat/, sacre-coeur-k7 (mieluiten osiin, ks. 1), louvre-k5; sitten muisti isolla iPadilla. Puuta on nyt 22 596, nykyinen 86 783; isommat kuvat lisäävät piirtoa, mittaamatta.

### Opit
- Peruskartan puistot ovat tasaista nurmea: kaikki puutarhan rakenne on tullut puudatasta. Kun puut harvenevat, käytävät on piirrettävä erikseen.
- Tarkista koosteen vika ensin täyskoon rajauksesta: pieni kuva peitti, mikä oli dataa ja mikä poiston jälkeä.

## LISÄYS 4.11. klo 01.10: PT:n ja KK:n uudet käskyt (ALOITTAMATTA; lue tämä ensin, sitten LISÄYS 01.08)
Lista: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, osiot "Iso iPad f1fb45f10" (kohdat 7–9) ja "Reunan soikio, k21, puut v3, Sacré-Cœur k6, Louvre k5". KK:n päätös koski v3-pareja, eikä hän ole vielä nähnyt 01.08:n koosteita (puutarhat, k7). Parit KK:lle PT:n kautta.
**Hyväksytty:** puun väri, koko ja metsä; erilliset puut Sacré-Cœurille (RAKENNUSPERIAATE 4); Louvre k5 koosteena (pelikuva vielä). Muotopuutarhan syyn PT oikaisi samaan kuin 01.08:n selvitys. Codexin aukio kuitattu 2a2e90305.
1. **Luxembourg:** paksu puusto vain itä- ja länsilaidalle, keskellä avoin muotopuutarha, allas ja polut. Nyt vyö kiertää kaikki reunat: rajaa `vyo` puut-uudet.py:ssä.
2. **Tuileries, Champs-Élysées'n puutarhat, Invalidit, Champ-de-Mars:** käsin tehty rivilista 2029:n mukaan (MUOD), polut vaaleina viivoina ja altaat näkyviin (puutarhapolut.py tehty; arvioi, riittääkö). Jos ei riitä 2029:n tasolle, arvioi Codex-kuvat (pysyvä lupa). PT pyytää ratkaisun parina.
3. **Ryppäät pois kortteleista:** tehty 01.08, tarkista kolmio-parista.
4. **Sacré-Cœur k8:** latvusten kokoon lisää vaihtelua ja reunaan pari lovea (sacre-coeur-kaari.py). Sinappi katsotaan uudelleen uudella pinnalla.
5. **Erillispuut + nimet:** selvitä, mutta älä kytke ennen KK:ta. KK:n linja: puut eivät peitä nimiä; muut nimet väistävät metsää kuten nähtävyyden kuvaa (4e929f038), joten kadunnimiä ei metsän päälle. Jos nimet viedään puiden yläpuolelle, koko kartalle.
6. **Puulistan jälkeen:** kohta 7 d-sillan kaide (9 siltaa, sävytyökalulla, ei uutta ottoa); kohta 8 nimet NS:n kanssa ("Hôtel Hyatt Regency Paris Étoile" pois koko kaupungin nimistä, Montagne Sainte-Geneviève pieneksi tai pois); kohta 9 nimet puiden kohdalla uudella puulla. Rajaukseen ei kosketa; häivytys on VS:n ja NS:n.

## LISÄYS 4.11. klo 01.2x (uusin; lue ensin)
LISÄYKSEN 01.10 kohdat 1 ja 4 tehty, PT:llä, kooste, ei peliin:
- **Luxembourg:** puusto itä- ja länsilaidalla, keskellä avoin puutarha ja polut. /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/kolmio-luxembourg.jpg (f5cf43628ec4), puut-uudet.json 4a5c78511665, 22 575 puuta.
- **Sacré-Cœur k8:** /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/tarkistus-nahtavyydet/sacre-coeur-k8/ (f659a97d677e), 300 puuta, kolme lovea, koko 0,68–1,42. **Koosteen kadunnimet metsän päällä ovat poiminta pelikuvasta, eivät KK:n linja:** pelissä nimet väistävät metsää.
Seuraavaksi (LISÄYS 01.10): kohta 2 rivilista ja arvio Codexista (polut ovat 2029:ää leveämmät Luxembourgissa; säädä puutarhapolut.py), kohta 5, kohta 6.
**Kohdan 5 suunnitelma:** kirkko + aukio yhtenä kuvana (raja alpha), metsä erillisinä puina: muunna sacre-coeur-kaari.py:n paikat metreiksi (alue.json / pariisi.json: 422,79 m = nykyisen kuvan rajauksen leveys) ja lisää puut lajiin. Nimet: PiirrosKerros.NahtavyysRuudut + OsuuNahtavyyteen saa metsän alueen (soikio tai ruudut), jotta muut nimet väistävät; ensin selvitä, miksi nimet näkyvät piirroksen päällä, vaikka jono 2995 < 3050.

## LISÄYS 4.11. klo 01.2y (uusin; lue ensin; kohta 2 arvioitu)
/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/: kolmio-a95-silta-katu.jpg, puut-uudet.json (7e142ebea698, 22 579 puuta), puutarhat/. PT:llä, kooste.
- **Invalidit:** rivi Rue Fabertin ja Rue de Constantinen varteen (KATURIVIT puut-uudet.py:ssä), molemmat puolet koko esplanadin matkalta. Hyvä suunta; Constantinen rivi paikoin kaksinkertainen.
- **Käytävät (OSM) kelpaavat:** Tuileries, Luxembourg, Palais-Royal (leveys 4,5–6,5 m).
- **Eivät kelpaa koodilla:** Champs-Élysées (irtopätkiä nurmilla) ja Champ-de-Mars (tiheä sotku, näkyi /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104/nakyma-champ.jpg). Poistettu tasosta. **Arvio KK:n pyynnöstä: näihin kahteen Codex-kuvat** (pysyvä kuvalupa), rivit KATURIVIT-listaan; Allée Thomy-Thierry ja Allée Adrienne-Lecouvreur eivät löydy OSM-välimuistista nimellä, joten Champ-de-Marsin rivit tarvitsevat toisen lähteen (laatikko tai nurmen reuna).
Seuraavaksi: Codex-tilaukset noiden kahden osalta PT:n kuittauksella, sitten LISÄYS 01.10 kohdat 5–6.

## LISÄYS juuri ennen nollausta (lue ensin): PT 01.14 kuittasi
Tilaa kaksi Codex-kuvaa, Champs-Élysées'n puutarhat ja Champ-de-Mars, 2029:n mallista; yksi otto kukin, vain nämä kaksi; tilaus claude/postilaatikko-haaraan. Muut puutarhat OSM-tasolla. Parit KK:lle PT:n kautta. ALOITTAMATTA.

## LISÄYS 4.11. klo 01.29 (uusin; lue ensin; konteksti 25 %)
Täydet polut: P = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-puut-20261104, Y = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103, C = /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyydet-20261103, N-haara = karttaseppa/pariisi-nimet-220 (wt/proto-karttaseppa-ruutu-218). Lista: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, lue osio "Sacré-Cœur k8 ja muotopuutarhat" (KK 01.19). Vahti: Monitor `zsh Y/vahti.zsh`; 13 ensimmäistä TOIMITUS-riviä vanhoja.
**TEHTY**
- **Codex-tilaus 15 lähetetty:** 15a Champ-de-Mars ja 15b Champs-Élysées e52adcf60, 15c Luxembourg 081ddd0f5 (KK 01.19 pyysi kolmannen; PT:n 01.14 "vain nämä kaksi" oli ennen sitä: kerro PT:lle, jos ei vielä tiedä). Aineisto C/puutarha-*/ (TILAUS.md, maski.png, ohje-kohde.png, alue.json); generaattori P/puutarha-tilaus.py. Litteä kuva suoraan ylhäältä, alfa = maski, ei puita. Kuvan paikka kartalla: alue.json (lajimuoto, ryhmä "puutarha").
- **Kohta 5, jono:** koodin mukaan nimet 2995 < piirros 3050+ (Nimikerros.cs:375, PiirrosKerros.shader), eli ne jäisivät alle. Syy ei selvinnyt lukemalla: TMP, URP-renderöijät ja ElavaKerros eivät selitä sitä. Mittari ebe377352 N-haarassa: `nimet laske` tulostaa todelliset jonot (nimet, laatat, esineet). PT:lle pyydetty JU:n ajoon, odottaa lokiriviä. Huom: elava-katu on piilossa piirroksen päällä (Nimikerros.cs:657), joten selvitä myös, mikä luokka tuottaa kuvissa näkyvät kadunnimet; poltettuja nimiä laatoissa ei löytynyt pohjaskripteistä. Älä kytke ennen KK:ta.
- **Kohta 7:** Y/korjaa-sillat-d.py → Y/tarkistus-sillat-d-v2/ (silta-d-*-v2.png, pari-d-kaide.png). PT:llä; ei kirjastossa eikä NS:llä ennen kuittausta.
- **Kohta 8:** 76d11201a N-haarassa: Hyatt (Q3142395) pois Merkittavat.json:sta, ▲-huiput pois piirroksen näkyessä (Montagne Sainte-Geneviève). Kerro NS:lle sha; lisää Q3142395 merkittavat/siivoa.py:n POIS_MUUT-listaan, jos aineisto ajetaan uudelleen. Kääntämättä (JU:n vuorolla), eikä PT:lle vielä ilmoitettu: tee se ensin.
**AVOIN (järjestyksessä)**
1. **Invalidit (KK 01.19, EI):** kaksi suoraa tasavälistä riviä kummallekin esplanadin puolelle, ei poimintoja kartta-aineistosta (KATURIVIT pois, käsin viivat P/puut-uudet.py:hyn). Pois: kasa länsirivin keskellä, sisempi toinen rivi itäpuolella, eteläpään umpinainen poikkirivi.
2. **Jardin des Plantes:** noin 25 puun kasa Rue Cuvierin itäpuolella: rivit tai ryhmät 3–6.
3. **Luxembourg:** puusto myös pohjoisreunalle palatsin molemmin puolin (itä ja länsi jo oikein). Poista Luxembourg P/puutarhapolut.py:stä, kun 15c on hyväksytty.
4. **Toimitus 15 (vahti ilmoittaa):** kuvat parina Tuileries'n (OSM-polut, KK:n suunta 01.19) rinnalla; jos tyyli eroaa, Tuileries samalla tavalla (KK). Champ-de-Marsin rivit tarvitsevat lähteen (nurmen reuna tai maski; KATURIVIT-nimet eivät löydy OSM-välimuistista).
5. **Sacré-Cœur k8 hyväksytty koosteena (KK 01.19):** ei junaan ennen nimien väistöä ja pelikuvaa. Toteutus kohdan 01.2x suunnitelman mukaan (erilliset puut + väistöalue).
6. **Kohta 9** (nimet puiden kohdalla) uudella puulla; Louvre-nimi Seinellä (NS 4b) edelleen tekemättä.

## LISÄYS 4.11. klo 01.3x (PT 01.20–01.25; lue ensin)
- **Luxembourg (PT 01.24) on jo tehty:** 15c 081ddd0f5; PT tietää.
- **d-kaide kuitattu (PT 01.25):** silta-d-*-v2.png kirjastossa (isoisa-2029/esine/), NS:lle seuraavaan yhdistelmään; lopullinen hyväksyntä pelikuvasta (y-silta-idan vs y-silta-neuf).
- **Mittari ebe377352 on JU:lla (PT 01.24):** odota lokiriviä.
- **Seuraavaksi:** AVOIN 1 Invalidit (PT vahvisti: käsin, ei Codexia) ja Palais-Royalin pari KK:lle PT:n kautta (KK ei ole nähnyt sitä): P/puutarhat/palais-royal.png koosteeseen 2029-rajauksen rinnalle.

## LISÄYS 4.11. klo 01.36 (uusin; lue ensin; Postivahti: jatka, nollaus 35 %:n lähellä)
PT:llä, odottaa KK:ta; kaikki koosteita, ei NS:lle:
- **Invalidit (AVOIN 1 tehty):** käsin puut-uudet.py:ssä (INV_AKSELI, INV_RIVIT, INV_Y, INV_KADUT), KATURIVIT Fabert ja Constantine pois, kaikki muut puut pois esplanadilta. P/kolmio-a95-silta-katu.jpg (1d7a18baa5fc). Komento `pari.py <Esineet/pariisi.json> lokit/julkaisija-k11-koe-iso-95a733ace/a95-silta-katu.png 48.8637 2.3193 0.72 <ulos>`; kooste.py rajaus 60,600,720,900. **Sovitus (ICP) vaatii oikean keskipisteen:** väärä lat/lon sijoittaa puut väärin ilman virhettä. y-invalidit ei sovi, koska puupisteet puuttuvat.
- **Palais-Royal:** P/kolmio-palais-royal.jpg (7311df7b1854, y-opera.png 48.8690 2.3320 0.72, rajaus käsin). Käytävät eivät juuri erotu, 2029 tiiviimpi; odottaa KK:ta.
- **Puut:** P/puut-uudet.json 222df6b0c3ec, 22 571 puuta. Jardin des Plantes MUOD-listassa (rivit 16, 70; OSM-metsä pois; AVOIN 2 tehty, katsomatta) ja Luxembourgin pohjoisreuna (AVOIN 3 tehty, 19 puuta lisää, katsomatta). Molemmat katsotaan seuraavasta parista.
- **Jäljellä:** toimitus 15 (vahti) ja sen pari Tuileries'n rinnalla, puutarhapolut.py:stä Luxembourg pois hyväksynnän jälkeen, jonomittarin lokirivi JU:lta, AVOIN 5–6.

## LISÄYS 4.11. klo 01.4x (uusin; lue ensin; konteksti 33 %, nollaus)
**Hyväksytty:** Invalidit koosteena (KK 01.36; pelikuva vielä). d-kaide NS:llä (PT 01.25).
**PT:llä, odottaa KK:ta (kaikki koosteita, ei NS:lle):** P/kolmio-palais-royal.jpg (eb9ca2c5f645), P/kolmio-tuileries.jpg (d749d94982a8), P/kolmio-pantheon.jpg (a95c52f1ada9; Plantes ja Luxembourgin pohjoisreuna, tehty ennen viimeisintä ajoa, mutta nämä kohdat eivät muuttuneet).
- **Puut P/puut-uudet.json e50cd9c5150e, 22 529:** Palais-Royal käsin (PR_K, PR_U, PR_N puut-uudet.py:ssä, yksi rivi kummallekin sivulle, 16 puuta; MUOD rivit tyhjä). Kadun rivi pois, jos muodollisen rivi on alle 40 m:n päässä (koko kartta, 29 puuta; KK 01.36 Tuileries).
- **Palais-Royalin kooste:** P/pr-kooste.py, käsin sovitus. **Opit:** pari.py:n ICP ei osunut y-opera.png:ssä (`alku m/px` 0,634, rajalla; 150/2044 osumaa), joten aiempi pari oli väärin. Tarkista aina `alku m/px` ≈ 0,72 ja osumat; kuvat, joissa ei ole samoja puita kuin pariisi.json:ssa, eivät sovi. Väliin tehty PUHDISTA-optio (pari.py) on jäänyt koodiin; ei käytössä.
**Muu tila:** Codex 15a–c odottaa toimitusta; vahti (Monitor `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/vahti.zsh`) kuolee nollauksessa; 14 ensimmäistä riviä vanhoja, esittelysilmukka 68441 päättyi 01.4x. Jonomittari ebe377352 on JU:lla, odottaa lokiriviä. 76d11201a NS:llä tiedoksi. Seuraavaksi KK:n vastaukset, toimitus 15 ja AVOIN 5–6 (lisäys 01.29).

## LISÄYS juuri ennen nollausta (lue ensin)
**Codex toimitti kaikki kolme 01.41:** /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nahtavyydet-20261103/puutarha-{champ-de-mars,champs-elysees,luxembourg}/_review-puutarha-*/ (ei vielä katsottu; lue huomiot.md, tarkista koko, alfa maskia vasten ja käytävät). Tee ensin: kuvat koosteeseen (alue.json, ryhmä "puutarha"; pari.py lukee P/puutarhat/lajit.json:n) Tuileries'n rinnalle ja pari KK:lle PT:n kautta; kuittaus Codexille claude/postilaatikko-haaraan vasta katsottuna. a95 (Tuileries ja Champs-Élysées) sopii; Champ-de-Mars tarkista `alku m/px`, tarvittaessa käsin kuten pr-kooste.py. Luxembourg pois puutarhapolut.py:stä hyväksynnän jälkeen. Champ-de-Marsin rivit käsin kuten Invalidit.
