# Temple #2251 — riippumaton visuaalinen QA

15.11.2026. Tarkastettu kuusi toimitettua kuvaa `qa/01-cut-front.png`–`06-interior-geometry.png`. Kuvat 05/06 ovat tekstuurittomia geometriapintoja. Ei selainta, uutta generointia, renderöintiä tai mesh-muutoksia. Krediitti- tai tehtävätilaa ei tässä tarkistettu itsenäisesti.

**Johtopäätös:** kuvissa on vahva näyttö siitä, että halkaisun keskeiset sisärakenteet ovat muuttuneet kolmiulotteiseksi geometriaksi. Tulos ei ole pelkkä sisäkuva tasaisella julkisivupinnalla. Kaikkien aukkojen läpäisevyyttä tai rakenteiden täydellisyyttä kuvat eivät vahvista.

| Kohde | Visuaalinen havainto | Rajaus |
|---|---|---|
| Kerrokset | Neljä päällekkäistä salia sekä korkea kattotila/ullakko säilyvät 01/02/06-kuvissa. Vasemmalla portaikko, oikealla kabinettitorni. | Ei havaittavaa ylimääräistä asuinkerrosta tai peilausta. Guette on matala ylätasanteen reunatulkinta. |
| Lattiat ja huonesyvyys | 02 ja tekstuuriton 06 näyttävät selvästi lattioiden pinta-alan, etureunojen paksuuden ja huoneiden syvyyden. Oikean tornin tasanteet ulkonevat ja kaartuvat. | Varsinainen 3D-pinta näkyy; saumojen eheyttä, manifoldisuutta tai törmäyskelpoisuutta ei tarkistettu. |
| Pilarit ja holvit | 06:ssa keskipilarit, jalustat, kapiteelit, kaaret ja holvirivat erottuvat geometriana myös ilman tekstuuria. | Täydellistä neljän ristiholviosaston holvikuorta ja sen piilossa olevia pintoja ei näistä kuvakulmista voi vahvistaa. Osa yksityiskohdista on reliefimäistä. |
| Kierreportaat | 03 ja erityisesti tekstuuriton 05 näyttävät askelmien nousun, erilliset etureunat, kiertymisen keskipilarin ympäri ja alapuolisen muodon. | Portaat ovat näkyvää 3D-geometriaa. Täydellistä jatkuvuutta, kävelykelpoisuutta ja tasanteiden liittymiä ei vahvisteta. Pieniä epäsäännöllisyyksiä näkyy askelreunoissa. |
| Ikkunat | 02:ssa joidenkin ikkunoiden keskellä näkyy vaaleita rakoja; 05/06:ssa kehykset ja syvennykset ovat geometriana. 04:n takajulkisivun ikkunat näyttävät osin suljetuilta syvennyksiltä. | **Kaikkia ikkunoita ei voi julistaa läpiaukoiksi.** Mahdollinen takapinta/ohut kalvo on tarkistettava säteillä tai lähigeometriasta. |
| Oviaukot | Portaikon ja salien väliset pitkät, pyöreäpäiset ovimuodot näkyvät myös 05/06:ssa. Niissä näyttää olevan tasainen sisäpinta. | **Kulkuaukkojen läpäisevyys epävarma; suljettujen syvennysten epäily.** Pelkkä tumma tekstuuri ei osoita yhteyttä portaikosta saliin. |
| Katto | Katon paksuus ja kattopuiden kohoumat säilyvät 06:ssa. | Kaikki kattopuut eivät välttämättä ole erillisiä vapaita palkkeja; osa voi olla katon pintaan yhdistynyttä reliefiä. |

Tulos tukee rajatun tekniikkakokeen onnistumista näkyvän sisägeometrian osalta. Lopullinen aukkojen arvio kuuluu erillisiin sädetesteihin. Tämä ei ole historiallinen hyväksyntä, pelivalmiuden arvio tai lupa seuraavaan generointiin.
