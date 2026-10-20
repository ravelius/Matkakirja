# Codex → Lavastaja / PT: Nike780:n yksi korjauskoe tehty – tarkka sijoitusratkaisu ilman uutta generointia

PT780:n sallima yksi uusi Tripo-geometriakoe on nyt käytetty. Job `3a782076-e75d-4e0c-a8be-96c515540687`, P2.0, 100 krediittiä; saldo 22 560. Niken kaksi geometriakoetta yhteensä 200 krediittiä. Ei teksturointia, alueuusintaa, riggausta tai uusia kokeita. Uusi kokonainen viitekuva ja molemmat alkuperäiset ehdokkaat säilyvät.

Tripo kavensi uudenkin keulan kannen viitteestä huolimatta. Alkuperäiseen PT780-sijoitukseen se EI läpäise sovitusta. Tasaisella skaalalla 4,202051783 saadaan koko 2,57909 m (x) × 2,18515 m (y) × 4,2 m (z); kannen leveys tarvittavilla poikkileikkauksilla on noin 1,362–1,418 m, alle 1,8 m tavoitteen. Oikea tukireuna jää kannen ulkopuolelle.

Testasin maksuttomasti yhden täsmällisen vaihtoehdon muuttamatta mitään tiedostoa tai peliä: jos Lavastaja siirtää patsaan origon x=-0,25 m jalustan keskilinjaan nähden, alkuperäisen pohjan suorakulmio + 10 cm varat mahtuu kokonaan kannelle. Tukialue jalustan koordinaateissa x=[-0,56;0,64], z=[-0,23;1,14]. Kaikki 4 270 ruudukon näytettä osuvat kannelle; korkeus 2,15465–2,16744 m (ero 1,28 cm), sovitetun kannen kaltevuus 0,222°. Patsaan sijoituskorkeus olisi 2,16744 m. Keulan kärki +Z varmistettu GLB:n projektioista. Keulan lattiakeskipiste pysyisi (0,0,0).

Voitteko hyväksyä tämän 25 cm sivusijoituksen sekä korvata 1,8 m kansileveyden vaatimuksen mitatusti toteutuvalla koko tukialueen peitolla? Suosittelen tätä pientä pelidatan sijoitusratkaisua ennemmin kuin uusia maksullisia mallikokeita. Se tarvitsee teidän hyväksyntänne, koska PT780 edellytti patsaan keskitystä ja 1,8 m kantta. En ole tehnyt muutosta, enkä merkitse mallia hyväksytyksi ennen vastausta. Myös teksturointi odottaa tätä ratkaisua. Uusia Tripo-geometriakokeita ei käynnistetä ilman PT:tä.

GLB-vienti on 21 939 kolmiota, 11 056 kärkeä, ei luurankoa/liikkeitä; tekstuuria ei vielä ole. Alkuperäinen GLB: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-nike-jalusta-v1/candidate02/nike-prow-geometry-tripo.glb`, SHA256 `84bd1fab4b56002f5a9da98d02ac46f97c2bcd42bac32eac868e9dae79f82f72`.

QA-tiedostot saman juuren `qa/`-kansiossa: `candidate02-geometry-fit.json`, `candidate02-alternate-statue-placement-proposal.json`, `candidate02-technical-projections.png`. Hylättyä mallia ei toimiteta valmiina peliin. Tarkistus on kevyt tiedostolaskenta; raskas renderöinti edelleen pidossa.

## Täydentävä visuaalinen QA samasta vientitiedostosta

Käänsin mallin sivuviistoon Tripossa: rungon alla näkyy terävä ohut levymäinen uloke ja keulan saumassa on epätasaisuutta. Uloke näkyy myös GLB:n paikallisissa projektioissa, joten kyse ei ole vain tekstuurista. Sivusijoituksen vaihtoehto ratkaisee tukialueen, mutta ei näitä muotovirheitä. Mallia ei siis vielä suositella tuotantoon pelkän sijoitusmuutoksen perusteella.

Tosite: `qa/candidate02-tripo-threequarter-untextured.jpg` saman pakettijuuren alla. En käytä lisäkrediittejä teksturointiin ennen tätä ratkaisua. PT:n seuraava päätös tarvitaan siitä, sallitaanko täsmällinen Tripon aluekorjaus tähän samaan malliin vai lopetetaanko kokeilu näihin kahteen ehdokkaaseen. Nykyinen yhden uuden kokeen raja on täynnä; en tulkitse alueuusintaa ilmaiseksi poikkeukseksi siihen. Paikallista muotoilua ei ole tehty.
