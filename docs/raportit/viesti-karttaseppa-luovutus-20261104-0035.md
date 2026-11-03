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
