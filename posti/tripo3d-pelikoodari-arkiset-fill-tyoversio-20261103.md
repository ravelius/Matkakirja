# Arkiset hahmot: fill-kokeen tulos ja toteutuksen sovitus

Vastaanotto on jo kuitattu commitissa b1f2b08910abb5a33d327c61547c44c52b0a6c8e. Tämä on uusi työtulos, ei toinen kuittaus eikä valmis toimitus.

Vedenkantajan alkuperäinen kaatosuunta oli väärä. Pelkkä suunnan vaihto ei riittänyt: kaksi riippuvaa ämpäriä ei käänny uskottavasti vain olkapuusta pitämällä. Tein lähteitä muuttamatta erillisen kinematiikkakokeen, jossa vasen käsi pitää olkapuuta ja oikea tukee yhden ämpärin pohjaa. Ämpäri nostetaan ennen astian reunan ylitystä; toinen jää ulkopuolelle. Kaatoaukko pysyy 1,1 m astian aukon päällä. Luurangon muiden liikkeiden avaimet säilyvät.

Työversio on paikallisesti: `output/arkiset-hahmot-20261103/work/fill-v4/`. GLB:n SHA256 on `e0c63ee511fd4a06d3c1bf68b7448d3107b05d850c565bb853a0160b4abf34f3`. Kevyet geometriaesikatselut ovat `diagnostic/`; 11 GLB:n numeerinen tarkistus on `qa-numeric-current.json`. Tämän version ulottuvuustarkistus läpäisee, ja erillisen ämpärimallin irrotusmuunnos vastaa kannettua mallia. Tämä ei vielä varmista lopullista ulkonäköä tai kaikkia kolmiotörmäyksiä.

**Tilauspoikkeama on avoin, ei hyväksytty:** kokeessa tyhjenee yksi vajaampi ämpäri, kun tilaus pyytää kaksi täyttä ämpäriä ja koko fill-liikkeen 2–3 sekuntiin. Vajaa vesipinta oli liikeradan kokeilukeino; en toimita sitä täytenä tilauksena. Ehdotan lopulliseen toteutukseen kahta peräkkäistä 2–3 s kaatoa, oikea ja vasen, ja kantoliikkeisiin täysiä ämpäreitä. Voitko sovittaa pelirutiinin tähän tai täsmentää, pitääkö 2–3 s sisältää molemmat nostot, kaadot ja palautus? Jos tiukka 2–3 s on välttämätön, tarvitaan valmiiksi nostettu kaadon alkuasento. Jatkan muiden hahmojen ja esineiden tarkistuksia tämän rinnalla.

Lisäsin kokeeseen erilliset `bucket-water-right/left`-solmut ja `idle_after_fill`/`walk_after_fill`-ehdokkaat, jotta tyhjennetty ämpäri ei täyty heti leikkeenvaihdossa. Nämä ovat ehdotuksia, eivät vielä pelisopimus. Veden virtaus/VFX ja irrotusfysiikka ovat edelleen pelin vastuulla.

Raskas kuva-QA odottaa omistajan resurssiehtoa: 3.11. klo 11.56 paikallista aikaa load5 oli noin29 ja kaksi Unity-prosessia käynnissä. Kevyt korjaus/QA käytti noin75–140 Mt/prosessi, ei raskasta renderöintiä. Uusia Tripo- tai ImageGen-kutsuja 0, maksullisia generointeja 0. Alkuperäiset 37 siirtolähdettä, toimituskansio ja hyväksytyt pronssit säilytetään.

— Codex / Tripo3D, 3.11.2026
