# Karttaseppä: luovutus 4.11.2026 klo 21.21 (KS)
Syy: konteksti 25 % (7.37). Korvaa -2016:n jonon; sen "Tehty"- ja "Opit"-kohdat pätevät edelleen (haara karttaseppa/luovutus-20261104-2016, a2830fbdb). Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. C = /Users/Shared/Claude/proto-3d/_tyo/codex. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219.

## LISÄYS 21.3x: 21b v2 ok, TRIPO AVATTU (uusin, lue ensin)
- 21b v2 tuli 04f853a91 (`_review-pyramidi-21b/`): SHA:t ok, kaksi kuvaa katsottu täysikoossa: kaikki kolme pyramidia sinisiä, koko ja paikka ennallaan, rakennus sama. Sininen 86/165/219 on kirkkaampi kuin G (128/168/194), mikä palvelee tunnistettavuutta. Generaattori teki koko kuvan uudelleen, joten pinnat eroavat pikseleittäin (ero muualla 10–18 % yli 12 yksikön), muoto ei.
- **21c avattu (posti/karttaseppa-codex-tripo3d-louvre-21c-AVAUS-20261104.md, C/pariisi-louvre-20261104/TILAUS-21c-tripo.md).** Vahti käsitelty uusimpaan omaan committiin asti. Toimitus `louvre-3d-v1/`: tarkista, mallin kuva KK:lle ennen omistajaa. Jos pyramidi sulaa paviljonkiin → KK. Kaksi epäonnistunutta ottoa → omistajalle ennen kolmatta.
- Seuraavaksi: 22a Codexilta, Louvren pohjan paikka kartta-aineistosta (kohta 5).

## LISÄYS 21.2x: OMISTAJA 21.24 KUMOAA PYRAMIDIN PIENENNYKSEN (lue ennen muuta)
**Omistaja 21.24: "pyramidi saa olla suuri. Ja se kannattaa värittää siniseksi, koska se on kaikkein tunnistettavin asia. Ja kattoikkunoilla ei ole väliä."** KK: tavoite on, että sininen lasipyramidi tunnistetaan Louvreksi ensimmäisenä kartalta myös kaukaa, malliväreillä ja kirkon valossa; G:n pyramidi on sinisen mittari; **jos Tripo sulauttaa pyramidin paviljonkiin, vie se KK:lle.**
- **21b v2 Codexilla (23e398236), korvaa c4eaedff6:n ja 98bd82be6:n:** `pelikulma.png` ja `ylhaalta.png`, pyramidit siniseksi, koko ennallaan, muu sama. Toimitus `_review-pyramidi-21b/`, mittari malli-G-pyramidi.jpg. Tarkista tämän mukaan: alla olevan kohdan 2 mitat ja kattoikkunat eivät enää päde.
- 21c-luonnos on päivitetty tähän. Vahti käsitelty 23e398236 asti. Työlistassa rivi "Louvre 3D: sininen pyramidi".
- **Sininen voi vaatia valoa/väriä:** kirkon valossa sinisen pitää näkyä kaukaa; katso pelikuvasta.

## Omistaja ja KK
- **Omistaja 18.27:** Louvre ja Sainte-Chapelle seuraavaksi; lähekkäisille yhteinen pohja ja omat mallit (Raamattu 2.206). **19.03:** Louvre ja Sainte-Chapelle samalla valolla kuin kirkko ja mallin omilla väreillä.
- **KK 21.1x (valtuutuksella):** Louvren muoto ja ehdotetut mitat kelpaavat (katsoi kuusi kuvaa, k5-parin, louvre-vs-G:n). **Tripo, kun 21b on tullut ja olet tarkistanut sen; tuo KK:lle vain, jos muoto muuttuu.** Iso pyramidi pienemmäksi G:n suhteeseen. Mallin kuva ja Louvren pohja KK:lle ennen omistajaa, kuten ND:ssä. KK kertoo omistajalle: **pysähdy, jos omistaja muuttaa jotain.**

## ENSIN
1. **Vahti kuolee nollauksessa: käynnistä Monitor** (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko). Käsitelty 98bd82be6 asti. Detached HEAD: ennen uutta postia `git checkout --detach FETCH_HEAD`.
2. **21b Codexilla** (c4eaedff6 + lisäys 98bd82be6; C/pariisi-louvre-20261104/TILAUS-21b-ylhaalta.md; ohje vaihdettu ennen toimitusta). Tulee `_review-ylhaalta-21b/`:hen. Tarkista SHA ja katso täysikokoisena: kattoikkunat molemmilla lappeilla ja savupiiput harjalla kuten julkisivuissa, ulkoraja noin 1424 × 600, iso pyramidi noin 185 px ja rako noin 40 px keskipaviljonkeihin. Vertailu: A/nd23-alue/louvre-21a-tarkistus.py.
3. **Avaa Tripo:** C/pariisi-louvre-20261104/TILAUS-21c-tripo-LUONNOS.md → nimeä ilman LUONNOS-sanaa, lisää SHA256SUMSiin, posti Tripo-sessiolle (mallina karttaseppa-codex-… postit). Kaksi epäonnistunutta ottoa → omistajalle ennen kolmatta.
4. **22a Sainte-Chapelle Codexilla** (a5da0973a; C/pariisi-sainte-chapelle-20261104/TILAUS-22a-kuvat.md; 21b:n jälkeen). Mitat 90 : 170 : 120 : 190 : 320 ovat oma ehdotukseni, KK ei ole hyväksynyt niitä. Kun kuvat tulevat: SHA, mitat, kaikki katsottu, polut KK:lle ennen Tripoa.
5. **Louvren pohja-alue (aloittamatta):** A/nd23-alue/jalanjaljet.py (kooste jalanjaljet.jpg). **Väli ND:n pohjaan "noin 100 m" (kerrottu PT:lle ja KK:lle) on likiarvio:** k5-taso on 60°:n kuva ja sijoitettu sen maaviivasta. Kuvan sisällä mitattu k5 tuli noin 200 m pohjoiseen oikeasta paikasta. **Tarkista oikea paikka kartta-aineistosta** ja kerro KK:lle, jos väite muuttuu. Rungon pituus 860 m ja leveys 360 m, liioittelu maalle ylöspäin, ei Seinen päälle (2.204).
   - Tapa ND:ltä: A/nd-3d-pohja/ (TILAUS.md, alue.json, maski.png, jalanjalki.png, pohja.png). Pohja k53/nd-pohja/tee.py (/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/k53/); sen cs/ kattaa vain x 66386–66396, y 45089–45096, ja Louvre tarvitsee noin x 66382–66389, y 45087–45092. mvt14-paikallisdata kattaa alueen (linssiseppa2/.../k52/data/keski/mvt14), ei OpenFreeMap-hakuja. Kysy VS:ltä, jos cs:n piirto on auki. Edustan malli: 19d.
   - Liitos: ND:n pohjan länsikärki x 29–200, y 100–250, Seine häipyy siellä.
6. **Sainte-Chapellen paikka ND:n pohjalla:** 475,502 Oikeuspalatsin korttelin avoimella pihalla (A/nd23-alue/pohja-sainte-chapelle-2x.jpg), piha noin 85 × 70 m, malli 90 × 170 m. Pohjaan oma paikka (kuten 19d), kun mallin mitat on päätetty; akseli noin 112°. Koodissa toinen malli Maaritys.Mallit-taulukkoon: usean mallin aluetta ei ole vielä kokeiltu.
7. **D iPad JU:lta,** kun A ja vähintään yksi malli kasassa.

## Tehty tässä vuorossa
- Puupari 834376445 oli KK:lla jo 19.06 (hyvaksynnat-20261104.md): Postivahdin viesti oli vanha, ei lähetetty uudelleen.
- 21a tuli 627f58d04, 47ed2a300: SHA:t ok, kaikki kuusi katsottu, KK:lla ja hyväksytty muodoltaan. Mitattu: 1,64–1,69 px/yksikkö, kulmapaviljonki noin 293, keskipaviljonki noin 243, harja noin 160, räystäs noin 124. Luvut silmämääräisiä.
- Vanhat scratchpadit T7:lle (/Volumes/T7 4TB/Claude-arkisto/karttaseppa-scratchpad-20261104, 11 Gt, ei poistettu); PT:lle rivi. Levy oli 57 Gi, PT:n raja 100. Seuraava sessio: uudet vanhat samoin.
- Remote Control päälle aloituksessa.

## Jono ja odottavat (ennallaan)
Seis ilman sanaa: tasankopoltto (PT); nimet 79186922b ja ed711573d kääntämättä; Karsi, Vincennes, Boulogne, minor-nimet ja puut 43ba52fe7 odottavat pelikuvia. Mac- ja iPad-ajot vain JU:n vuorolla. s-090:n rengas: tarkista merkki koodista nähtävyysalueen yhteydessä (voi olla 2.205:n pieni kuvamerkki). KK: ei muuteta nyt. Eiffel oma kortti (2.92).

## Opit
- Ohjeen vanhentumista: Postivahdin aloitusviestin työ voi olla jo tehty; tarkista hyvaksynnat-20261104.md ja KK:n kuvat-kansio ennen lähetystä.
- Yläkuva ja julkisivut pitää verrata keskenään rinnakkain täysikoossa (A/nd23-alue/louvre-21a-ylha-etela.jpg): Codexin mittarit eivät huomanneet kattoikkunoiden ristiriitaa.
