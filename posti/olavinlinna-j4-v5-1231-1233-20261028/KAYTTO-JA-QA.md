# J4-v5 käyttö ja QA

Liikkuvuus: staattinen esine. Ei riggausta tai animaatioita.

Kopioi kokonainen GLB models-kansiosta. textures-kansion PNG:t ovat GLB:hen upotettujen kuvien tavuntarkat kopiot. Säilytä kaikki kanavat ja käytä uusia mippejä. Kanavat ja vastaanottajan tarkistus on kuvattu CLAUDE-TOIMITUS.md:ssä.

Geometria: kaikki v4:n alkuperäiset taulukkoalkiot ovat täsmälleen ennallaan; lisäys on erillisiin kärkiin rakennettu matala tumma alusta saman meshin ja materiaalin sisällä. Suljettu yläpinnan viuhka kattaa kasan sisäisen XZ-alueen ja peittää pohjan. Vanhan Tripo-verkon geometriavirheitä ei korjata tämän tilauksen ulkopuolelta.

AO: deterministinen yksisäikeinen BVH-geometriatesti, 96 kosinipainotettua suuntaa/kärki, enintään 50 mm, alkupisteen siirto 0,08 mm. Näkyvyys muunnetaan .2+.8*v^1.6 ja interpoloidaan UV-kolmioihin; cavity-kerroin 1-.42*c. Kartoissa ei ole yhteen valonsuuntaan maalattua varjoa. Uudet koholeimat ovat tangenttinormaalikartan pintareliefiä; varsinaista joka kolikon kohokuvageometriaa ei lisätty.

Tallennetun GLB:n audit: alkuperäiset POSITION/NORMAL/UV/indeksiprefixit täsmäävät; solmut, origo ja ulkorajat täsmäävät; indekseissä ei ylityksiä, kaikki numerot äärellisiä. Kannun/lautasen suojatut atlaspikselit verrataan kaikkiin kolmeen v4-karttaan. ORM-viittaus ja sisäiset/ulkoiset PNG:t täsmäävät. Lisäys152 kolmiota; kokonaismäärä 39 036, alle 40k.

Visuaalinen portti: tarkistettu koko malli, yläkuva, 275 px kohde, 512 px karttapienennys ja saman kuvan 0,12× lineaarinen valo. Pienimmistä osittain peittyvistä kolikoista näkyy vain reuna tai leiman osa; kaikkien kolikoiden lukumäärää ei sertifioida. Pelin ASTC-pakkaus ja yövalaistus tarkistetaan Lavastajan komeroparissa. Tunnettu rajoite: alustan tumma ohut ulkoreuna näkyy joissakin kulmissa. Ei peli-/KK-hyväksyntäväitettä.

Tuotanto pysyi T7:llä. Yksi matalan prioriteetin CPU-prosessi kerrallaan, ei GPU-renderöintiä/videoita. Lopullisen UV-kartan leivonta noin 13,5 s, kuvien tarkistus noin 20 s; mitattu Python-muistihuippu alle 350 MiB tässä erässä. Globaalikuorma pysyi korkeana, joten raskasta työtä ei käynnistetty.
