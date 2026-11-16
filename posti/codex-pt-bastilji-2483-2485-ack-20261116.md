# Codex → PT/KK: ACK 2483–2485 — Bastiljin vertailu, koneikkuna ja syötekorjaus

Luettu kokonaan 139f1a927a, 4fc36b8883 ja 3fb397f913. Kolmen kevennystavan vertailu on Bastiljin päätyö. Paikalliset ajot vasta CODEX-IKKUNA5 16.11. klo22–24 EET ja resurssiehtojen täyttyessä. Bastilji ensin, Turku A vain jos aikaa jää.

## Korjaus aiempaan ilmaiseen asetusselvitykseen
753821fffb:n rivin4 ”enintään30kuvaa” oli Batch Images to3D -toiminto, joka tekee erillisen mallin jokaisesta kuvasta. Varsinainen MultiView on kuutiokuvake ja siinä ovat Front/Left/Right/Back-paikat. Virhe havaittiin ENNEN Generatea: batchia ei ajettu eikä siitä kulunut krediittejä. A-b-kokeeseen valitaan nyt kolme kuvakulmaa yhden65krediitin MultiView-työn syötteeksi. Muut GC2269:n lähde- ja asetusmittaukset säilyvät.

## Nykytila ja rajattu jatko
- A(a), B(a) ja C(a) ovat kaikki valmistuneet Tripon pilvessä,195krediittiä. A(a)on arkistoitu T7:lle:80285576tavua,1961284kolmiota,SHA2569410d02ae15b00a584361b3ec0f25ccbe25a3fb89d355aff1e9c30b84fdee22b. B/C eivät vielä paikallisia.
- A-b:n kolme valittua kuvaa: hyväksytty A sekä uudet SW ja NE. Neljän tornin avoinL on tarkastettu; piilopuolen koristelu ja täsmällinen yhteinen geometria jäävät kokeen laadunvarmistukseen. TOP-kuva ei ollut aito ylhäältäkuva ja jätettiin pois. Kolme uutta ImageGen-kutsua; ei automaattisia uusintoja.
- Valmisteltu kolme A(a)-johdannaista:1 nykyinennoin42k/2048väri/1024normaali;2 noin225k+aidosta korkeaverkosta paistettu2048tangenttinormaali+2048väri;3 sama2mutta4096väri. Skriptien syntaksi ja kevyt lähdeinventaario tarkastettu; Blenderiä ei ole ajettu. Lähteenä on BastiljiA:n1,96milj.verkko — ohjeen5,6milj.tarkoittaa GC:nkokonaisuutta.
- Samat kamerat ja tiedostokokomittaukset kaikille. Koko linnan kuva edellyttää B/C-alkuperäisiä ja kokoonpanoa; A-osan kuvaa ei nimetä koko linnaksi.
- B:n tavallinen Export kokeillaan myöhemmin uudelleen; selaimen estoa ei kierretä. 2485 korvaa aiemman omistaja-avunpyynnön: omistajalta ei tarvita nyt vastausta. Jos C:n tai A-b:n lataus estyy, tarkka Triponmallinimi ja T7-kansio heti postiin.

ETA: A-b-pilvikoe arviolta20.45–21.05EET, palvelun todellisen jonon mukaan. Kolmen johdannaisen ensimmäinen vertailu arviolta22.30–23.15EET, vain jos koneikkuna ja load5<16 sekä Unity/simu/käännös poissa toteutuvat; lopullinen tarkastus/paketti saman22–24ikkunan loppuun, jos paisto ja lataukset onnistuvat. Tämä on arvio, ei valmistumisväite.

Massageneroinnin omistajan pelitarkastusportti on edelleen kiinni. Lähdetyö jatkuu rinnakkain;30lähdepakettia valmisteltu ja seuraavat10työnalla. Vastaanotto, hyväksyntä ja peli-integraatio eivät seuraa pelkästä paikallisesta valmiudesta.
