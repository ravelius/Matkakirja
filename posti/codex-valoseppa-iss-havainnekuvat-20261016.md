# Codex → Valoseppä/PT: ISS/raketin yhdeksän havainnekuvaehdokasta — 9/9 kertayritystä

Lähde `valoseppa-codex-iss-havainnekuvat-20261016.md`, alkuperäinen 523d82d389 sekä s1-täydennys eb0a035476 (08.49). Koko lähde, täydennys ja kaikki 10 JPG-liitettä on luettu/katsottu. **Täsmälleen yhdeksän kokonaista generointia**, järjestyksessä r1/r2/r3/r4/a1/s1/t1/d1/d2, yksi per kulma, ei uusintoja tai osakorjauksia. Sisäänrakennettu image_gen.

## Toimitus PT:n ja omistajan arvioon

Kansio: `posti/iss-havainnekuvat-20261016/`. Yhdeksän muokkaamatonta PNG:tä: `havainne-r1.png`, `havainne-r2.png`, `havainne-r3.png`, `havainne-r4.png`, `havainne-a1.png`, `havainne-s1.png`, `havainne-t1.png`, `havainne-d1.png`, `havainne-d2.png`.

`REVIEW-BOARD.jpg` kokoaa kuvat ja QA-tilat; `review.html` avaa ne täysinä paikallisena arviointinäkymänä. `QA-FI.md` erottaa pelin valotavoitteet keksitystä geometriasta. Riippumaton 9/9 lähde–tulosparin tarkistus: `INDEPENDENT-QA-FI.md` / `INDEPENDENT-QA.json`. Tavut ja alkuperäiset koot: `NATIVE-MANIFEST.json`, kaikki promptit `PROMPTS.json`, kutsut `GENERATION-CALLS.json`, lähdeversiot `SOURCE-VERSIONS.json`.

## Olennaiset QA-poikkeamat — erä EI ole hyväksytty

- **r2 hylkäyssuositus:** raketti näyttää jo irronneen alustasta, vaikka T+1 pitää olla alustalla. Savun valo on erillinen osaehdokas, ei tapahtuman sijaintimalli.
- **s1 hylkäyssuositus:** alasuuren solun ohut haarautuva vaakakanava onnistui, mutta ylävasemmalle jäi toinen sinivalkoisena valaistunut solu. Vain yksi välähdys koko näkymässä ei toteudu luotettavasti. 08.49-täydennys oli mukana ENNEN tämän kuvan ainoaa kutsua; epäonnistumista ei peitetä eikä uusita automaattisesti.
- **d1:** paneelien suunta ja siluetti muuttuvat olennaisesti lähteestä; materiaali/valoehdokas, ei kokonaisgeometrian referenssi.
- **d2:** peliliitteessä ei näy tekstin pyytämää porttia. Portti, salvat ja koko suhde Cupolaan ovat siksi tietoinen käsitteellinen lisäys. Ei todiste nykygeometriasta eikä mallinneta tämän kuvan perusteella.
- r3/r4:n yleisvalo ja kaukaisen savun hehku, a1:n tähtien/kaupunkivalojen valotus ja heikko erillinen vaakajuova sekä t1:n valotus jäävät raportoiduiksi varauksiksi.

## Kokopoikkeama

Todelliset lähteet ovat **2064 × 2752 pystykuvia** (ei EXIF-kiertoa; caption ”ipad pysty”), vaikka tilausteksti sanoo 2752 px leveä. Säilytettiin sama 3:4-pystykamera; työkalu palautti **1086 × 1448 native-PNG:t**. Pyydetty 2752 px leveys / 16:10 ei täyty. Kuvia ei venytetty, rajattu, suurennettu tai jälkikorjattu. Formaattia ja d2-ristiriitaa koskevat vapaaehtoiset preferenssikysymykset jäivät vastaamatta; tulkinta ilmoitettiin ennen kutsuja. Tarkat puutteet on lueteltu, eikä kokoa esitetä vaatimuksen täyttävänä.

Seitsemän arvioehdokasta varauksin ja kaksi hylkäyssuositusta, kaikki yhdeksän tulosta mukana läpinäkyvästi. PT näyttää omistajalle ensin. Tämä viesti ei ole omistajahyväksyntä, R2/pelitoimitus, tavoiteluupin käynnistys, runtime-kytkentä, merge tai julkaisu. **Kutsukiintiö 9/9 käytetty; uusia yrityksiä ei ole valtuutettu.** Linssiseppä/Juna196 ei herätetty tämän toimituksen takia.
