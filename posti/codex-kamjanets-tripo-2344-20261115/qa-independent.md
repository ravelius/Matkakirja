# Kamjanets #2344 — riippumaton visuaalinen Tripo-QA

**Verdict: WARNING — eteläsivun tunnistettava pääsiluetti säilyy, mutta tornien syvyyssijoittelu, pohjoiskehä ja pihojen tasoratkaisu ovat vahvasti mallin täydentämää tulkintaa. Ei KK-hyväksyntä tai pelikelpoisuuden vahvistus.**

Katsottu kaikki viisi `views/01-plusX.png`, `02-plusZ.png`, `03-minusX.png`, `04-minusZ.png`, `05-upper.png` sekä hyväksytty varauksellinen syöte `output/linnat-jatko-2324-20261115/kamjanets-podilskyin-linna/kamjanets-podilskyin-linna-model-v1.png` uudelleen natiivina. Vertailuperustana aiempi lähdevalmistelu ja kuvan2328 riippumaton QA. Paikalliset X/Z-akselit eivät itsessään määritä maantieteellisiä suuntia. GLB:tä ei avattu tai mitattu.

## Tornit ja porttipää

Syötteen eteläsivua vastaavassa kuvassa01 tunnistuvat lännen matalat pyöreät massat, korkea tumma terävä katto, kaksi muuta erillistä teräväkattoista tornia ja oikean pään suuri nelikulmainen aumakattoinen porttitorni. Suuri kokonaisjärjestys ei ole peilautunut. Yläkuva05 ja päädyt osoittavat tornien olevan eri syvyyksissä; niitä ei voi lukea kaikkia samalle seinälinjalle.

| Kohta | Rajattu havainto |
|---|---|
|a/b|Länsipäässä säilyvät matalakattoiset pyöreät massat. Valkoisen b-tornin erottelu läheisestä teräväkattoisesta c:stä vaikeutuu suorassa kuvassa peiton takia;05 erottaa matalat katot ja kauempana olevan terävän tornin. Väri-/muotosuhteet eivät ole täysin syötteen kaltaiset.|
|c|Kolmas korkea teräväkattoinen torni on olemassa, mutta05 sijoittaa sen vastakkaiselle pitkälle seinälle suhteessa kahteen muuhun. Syöte näytti sen osin muiden takana; tarkka pohjapaikka ei siitä varmennu.|
|d/e/f|Kaksi erillistä teräväkattoista tornia ja niiden välissä pitkä matalampi seinäjakso säilyvät. **e ei ole muuttunut uudeksi torniksi** eikä puu palaa.|
|g|Pieni matalakattoinen torni näkyy vastakkaisen sivun/päädyn kuvissa ja05:ssä suuren porttipään lähellä. Sen sijainti sivusuunnassa ja syvyydessä on tulkintaa;01 ei anna yhtä selvää syötteen mukaista g–h-luentaa.|
|h|Suuri nelikulmainen aumakattoinen porttipää ja kaariaukko säilyvät. Muissa kuvissa näkyvien aukkojen läpäisevyyttä tai sisäistä kulkureittiä ei todisteta värikuvista.|

Lännen a/b-välin varmistamaton lisätornimainen osa oli jo hyväksytyssä2328-kuvassa. Mallin yläkuvassa länsipäässä on kolme lähekkäistä matalakattoista pyöreää massaa. **Sama lähdevaraus säilyy:** tätä ei nimetä uudeksi varmasti Tripon keksimäksi torniksi, mutta kolmen matalan massan täydellistä alkuperäisvastaavuutta ei ole varmennettu. Koko linnalle ei anneta lähdevarmaa tornien kokonaislukua.

## Avoimet tasot ja pohjoisen tulkinta

- Yläkuvassa05 näkyy katon sijasta ulkoilmaan avoin, kivipintainen keskialue sekä porrastettuja/rinnakkaisia kivisiä tasoja ja muurikulkuja. Oikealla on siitä erottuva matalamuurinen avoin alue, jonka pinta on vaalea ja melko tasainen. Laajaa yhtenäistä keskikatetta ei ole. Tämä osoittaa näkyvän avoimen yläpintaratkaisun, **ei todista kaikkien tasojen olevan historiallisia pihalattioita tai niiden alapuolista sisärakennetta**.
- Pitkän vastakkaisen seinän, tornien jakautumisen molemmille puolille, porrastusten ja erillisen avoimen alueen täsmäpohja ei näy yksikuvasyötteessä. Alkuperäinen lähdepaketti dokumentoi pohjoista vain vinosti; mallin täydellinen pohjoisformaatti on siksi merkittävä inference-varaus. En löydä näistä ruutukuvista perustetta vahvistaa pohjoiskehää lähdevarmaksi tai tulkita kaikkia uusia näkyviä pintoja virheiksi.
- Vaalea kiviväritys, tummat katot ja punertavat tornien ylävyöt säilyvät yleisesti. Pienten aukkojen, sakaroiden ja pintakuvioiden uskollisuutta tai geometrista läpäisevyyttä ei vahvisteta. Yksittäisten katon/ylävyön värisuhteiden erottelu on pienissä katselukuvissa rajallinen.
- Vaalea matala alusta säilyy odotetusti. Sitä ei poistettu tai luokiteltu tämän vaiheen virheeksi. Ei maisemaa, kanjonia, siltaa, autoja, puita tai kuumailmapalloa.

**KK-epävarmuusrivi:** Eteläsiluetti ja e:n seinäväli säilyvät, piha on avoin kivinen tasoratkaisu, mutta pohjoiskehä, tornien syvyyssijoittelu sekä jo syötteessä epävarma lännen lisätornimainen osa jäävät tulkinnoiksi.

Yksi sallittu Tripo-otto käytetty. Vain tämä raportti kirjoitettu; ei generointia, selainta, renderöintiä, mallimuutoksia tai jaettuja manifesteja. Raportti valmis toimitusta varten; sitä ei enää muokata toimituksen aikana.
