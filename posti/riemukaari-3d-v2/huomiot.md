# Riemukaari 24g — katon korjaus v2 (#2156)

V1:n tasainen yläpinta ja repaleinen katonreuna on korvattu laatoitetulla kattoterassilla, suoralla matalalla reunuksella ja pienellä porrastetulla kattorakenteella. Paikallinen geometria- ja materiaalikorjaus, ei uutta Tripo-ottoa eikä retopologiaa. Lisäkulu 0 krediittiä.

Korjausraja on mallikoordinaatiston Y=174.0. Kaikki kokonaan tämän rajan alapuolella olevat 36 425 alkuperäistä kolmiota sekä niiden sijainnit, normaalit ja UV:t säilyvät täsmälleen. Raja leikkaa vain ylimmän kattokannen: 256 rajan ylittävää kolmiota leikattiin ja 967 kokonaan rajan yläpuolista kolmiota poistettiin. Uusi kattolaatta limittyy liitoskohtaan 0.04 malliyksikköä. Ylimmän kannen sivureuna siis muuttuu tarkoituksella; alempiin julkisivuihin, reliefeihin ja kaariaukkoihin ei koskettu.

Mitat, pivot ja akselit ovat samat kuin v1:ssä. Y ylös, Front/itä +Z, pohjoinen +X; ei kiertoa, peilausta, venytystä tai uutta skaalausta. Rajat min (-94, 0, -50.54585648), max (94, 180.30175781, 50.54585648); ulkomitat X×Y×Z 188×180.30175781×101.09171295 malliyksikköä. Nämä ovat toimitetun pelimallin mittoja, eivät väite rakennuksen todellisista metreistä.

39 106 kolmiota (v1: 37 648), yksi mesh, kuusi primitiiviä/materiaalia (v1: yksi), kolme alkuperäistä upotettua 2048×2048 tekstuuria. Tiedostokoko 6 886 336 tavua. Alkuperäiset tekstuurit ovat tavutasolla samat. Katon uudet materiaalit ovat opaakkeja ja mattaisia; laattojen pieni sävyvaihtelu on vertex-väreissä. Ei luurankoa eikä animaatioita.

Kaariaukkojen samat kiinteät testimaskit: iso aukko 100 %, sivuaukko 99.985548 % taustaa. V1–v2-muutos maskien sisällä 0 pikseliä, mukana kaikkien primitiivien geometria. Seitsemän 1000×1000 CPU-esikatselua tarkistettu kokonaisina: ylhäältä, kaksi 45° viistoa ja neljä sivua. Näissä ei mustia RGB<16 pikseleitä. Ennen-kuvat käyttävät samaa kameraa ja valaistusta kuin jälkeen-kuvat.

Lähteet tukevat katon yleistä muotoa, kivipintaa ja reunusta. Laatoitusjako, pienen kattorakenteen tarkka koko ja sijainti sekä sen suorakulmainen oviyksityiskohta ovat yksinkertaistettuja tulkintoja, eivät mittatarkka historiallinen rekonstruktio. Valokuvia ei ole siirretty tekstuureiksi. Nykyajan kävijöitä, lasirakenteita ja metallikaiteita ei lisätty.

QA-raja: CPU-esikatselu ei toista Unityn PBR-valaistusta, varjoja, normaali- ja ORM-karttoja. Uudet katto-osat läpäisevät normaalien/suuntausten ja nollapinta-alojen tarkistuksen. V1:n alempien pintojen perityt poikkeamat säilyvät. Alkuperäisen primitiivin 917 käyttämätöntä kärkiriviä säilytettiin lähde-eheyden vuoksi; ne eivät kuulu piirrettyihin kolmioihin. Katto-osat sisältävät tarkoituksellisia limityksiä; tämä ei ole watertight-CAD-toimitus.

Vastaanottaja asentaa kokeena omaan haaraansa samalle paikalle. Tarkistettava pelissä katon sävy, saumat sekä 45°-reunasiluetti nykyisellä kameralla. Ei junaan. Paikallinen QA ja postitoimitus eivät ole vastaanottajan hyväksyntä, peli-integraatio tai julkaisu.

Tyyppi: liikkumaton rakennus / maailman osa, ei hahmo.
