# Muistokuplat26–39: korjatun lähikuvan QA

Tarkistettu 2026-10-19T11:37:16.596617+00:00. Kaikki14 valittua alkuperäistä kuvaa ja lopullinen160px-arkki katsottu henkilökohtaisesti. Paketti on valmisteltu rootin postitoimitukseen/PT-arvioon; vastaanottokuittausta, omistajahyväksyntää, pelin integraatiota tai julkaisua ei väitetä.

26 uutta kokonaista sisäänrakennetun imagegenin generointia, kaikki26 tallessa ja valmistuneita.14 valittua,12 muuta ehdokasta säilytetty. Lisäksi kaksi kirjattua ennakkorekisteröintiä peruttiin ENNEN työkalukutsua (26a3 ja29a1): ne ovat0 generointia. Vanhan batch-c:n33kutsua jäävät erilliseksi historiaksi, niitä ei lasketa uusiksi eikä käytetä tässä uudelleen.

## Olennaiset QA-huomiot

-26 ja37 ovat rehellisesti **ehdollisia PT-arvioon**: kaikki ilmeet lukevat160px:ssa, mutta osa silmistä/suusta on r>.45 ja pehmenee smoothstepin alussa. facesProtected=false; koko kasvojen45%ydinehtoa ei väitetä täyttyneeksi. Rootin ohjeen mukaan luettavaa varhaista häivytystä ei korjattu pelkän r-luvun vuoksi uudestaan.
-26 manuaaliset pisteet: uloimmat sivusilmät noin r.57/.54, keskihenkilö noin r.41;37 vasen uloin silmä noin r.47, oikea sisempi noin r.53, ulompi noin r.62. Pisteiden tarkat laskut/alpha ja noin10px manuaalivalinnan epävarmuus: qa/face-landmarks.json.
-29/30/32 ja38 ovat aidosti laakeita/leveitä esineitä. Havaittu projisoitu korkeus kirjataan alla; muotoa ei väärennetty korkeaksi vain30–40%luvun vuoksi. Esineiden muodot ja tarina erottuvat pelikoossa.
-38/39 molemmat kokonaiset rullat ovat alkuperäisessä mukana; ulompi rullapää pehmenee maskissa, mutta rullamuoto/teos erottuu160px:ssa. Kaikkien esinepikselien ei väitetä mahtuvan täysin peittävään45%ytimeen.

## Kuvat

| # | Kohde / valittu yritys | Esineen havaittu korkeus | QA |
|---|---|---|---|
|26|Kullattu vesiastia /a5|~37.0%|Kokonainen kullattu pronssinen palovesiastia, kaksi puuämpäreillä vettä kaatavaa nauravaa palvelijaa ja hymyilevä virkamies, pihan ensilumi. Sivukasvot ulottuvat loivaan häivytykseen: ehdollinen PT-arvio, ei täyttä45%kasvonsuojaa.|
|27|Vuoripoltin /a2|~34.5%|Vuorikantinen pronssinen poltin, jalka ja kultaupotus; yksi valumestari kaataa pronssia muottiin. Kasvojen ilme säilyy, tausta voimakkaasti optisesti sumea.|
|28|Cloisonné-tuoksupoltin /a2|~28.0%|Kolmijalkainen cloisonné-poltin, metallilankojen emalilokerot, pitkän siveltimen työ, reiällinen kansi vieressä; yksi emalimestari. Esine~28%H mutta iso ja selvä160px:ssa.|
|29|Falangcai-posliini /a2|~21.4%|Avoin valkoinen falangcai-posliinikulho, pionien maalaus ohuella siveltimellä; ei kaulaa/kantta/metallilankoja. Luonnollinen laakea kallistus~21%H/~38%W; muotoa ei venytetty tavoitekorkeuteen.|
|30|Maalattu emalirasia /a1|~21.0%|Suorakaiteinen kuparinen maalattu emalirasia, avoin saranoitu kansi, kuparireunus ja sileät maalatut kukat; ei cloisonné-lankoja. Laakea rasia~21%H/~49%W.|
|31|Hovin kello /a2|~34.0%|Kullattu mekaaninen pöytäkello arvokkaalla erillisellä jalustalla tummalla konsolilla, ei ihmisiä. Taustan syvyys/pehmeys verrattu suoraan rootin hyväksyttyyn01-kuvaan.|
|32|Lakkarasia /a1|~27.5%|Vanha mantšunainen, harmaat ohimot, liangbatou ja pitkä väljä mantšukaapu esittelee kiiltävää mustaa lakkarasiaa; kirkas sisäpiha, ei sisäsali. Luonnollinen rasia~27.5%H/~49%W.|
|33|Kirjoittava kellopeli /a2|~32.0%|Eurooppalainen lähettiläs esittelee kullattua kirjoittavaa automaattikelloa Qing-virkamiehelle; pienoismekaaninen kirjuri/sivellin/pöytä ja kellotaulu, vakaa konsoli. Kuvitteellinen symbolinen lahjakohtaus, ei museokellon tarkka mittakaavaväite.|
|34|Veistetty punalakka /a1|~36.5%|Vanha lakkamestari veistää veitsellä punaisen lakka-astian kerroksia; punainen syvä reliefi ja lastut, ei posliinilasite tai metalli.|
|35|Mustetanko /a2|~33.5%|Mustetanko etualalla~33.5%H, tiivis musta suorakaiteinen nokea/liimaa vastaava pinta, pohja märällä mustekivellä. Yuqing-opetus, opettaja ja8-vuotias poika; ei karttakeppiä/karttaa.|
|36|Lasimaljakko /a2|~40.2%|Kokonainen täysin kirkas väritön koristelematon lasimaljakko; todellinen taittuminen ja vastavaloreunat, ei kukkamaalausta. Poika nauraa LATTIALLA sen vieressä, ei aikuista, ehjä lasi.|
|37|Keisarin viuhka /a1|~20.0%|Taittoviuhka, paperi/bamburivat, lahjakohtaus kahden Qing-miehen välillä ja sumea taputtava hovilainen. Oikean miehen ilme ulottuu varhaiseen/loivaan häivytykseen; ehdollinen PT-arvio, ei täyttä45%kasvonsuojaa.|
|38|Kalligrafiarulla /a2|~24.0%|Kalligrafiarulla mustine kursiivipylväineen, molemmat rullat, osittain auki käsin Yuqing-opetuksessa; ei maisemamaalausta/karttaa/keppiä. Oikea rullapää pehmenee mutta erottuu160px:ssa. Laakea diagonaali~24%H.|
|39|Qingming-silkkirulla /a3|~34.5%|Fyysinen maalattu silkille tehty jokikaupunkirulla: kaarisilta, veneet, katot ja pienet maalatut ihmiset; ei tekstirulla eikä elävä kaupunki. Vaalea silkkipäällysteinen näyttöjalusta, ei ihmisiä. Koko pystykuva, molemmat rullat, luonnollinen diagonaali~34.5%H; rullapäät pehmenevät maskissa mutta erottuvat.|

## Tekniset tiedostot

Kaikki14 toimitus-PNG:t ovat1086×1448,RGB ja täysin peittäviä. Niissä ei ole pelimaskia, häivytystä, reunusta tai tyhjää täyttöä. Kaikkien26 raakakuvan tiedosto- ja dekoodattujen pikselien SHA-256 tarkistettiin uudelleen;14 toimitustiedoston tarkiste ja tekninen muoto tarkistettiin.

Kolme valittua raakakuvaa oli1087×1447:27,32 ja33. Ne säilyvät muuttamattomina native-kansiossa. Worker teki dokumentoidun **koko kuvan sips-kokoviennin**1086×1448; ei rajausta, täyttöä tai sisältöretusointia. Näiden toimituspikselit eivät ole samat kuin natiivin pikselit. Tarkat menetelmä-, alkuperäis- ja vientitarkisteet MANIFEST/GENERATION/QA.jsonissa. Muut11 toimituskuvaa ovat valittujen natiivien samat tiedostotavut.

39a2 palautui1448×1086vaakana ja hylättiin; sitä ei venytetty tai rajattu pystyyn.39a3 on uusi kokonainen pystykuva.

QA-esikatselu on vain160×213soikio: alpha1 r≤.45, alpha0 r≥1, 1-smoothstep välissä, harmaa tausta. Esikatselukoodi ei muuta alkuperäisiä tai toimituskuvia.

## Lähde ja rajat

Kanoninen51kohteen JSON main-commitista ed1ce5c0415fc076ce252054a93feb164dbd229d, sekä PT:n korjattu lähikuvalähde86898a4b/d7518218. Jokaisen kuvan tarkka kupla/fakta/dynastia/ajoitus ja placeEvidence ovat MANIFESTissa. Ei uusia nimettyjä saleja tai esineiden mittasuhdefaktoja. Kuvat ovat kuvitteellisia Qing-hovin rekonstruktioita, eivät mitattuja historiallisia paikkaväitteitä.

Qingming-museolähteen pituus528cm ja kanonisen tekstin525cm poikkeavat; ristiriita säilyy SOURCE-MANIFESTissa, tekstiä ei muutettu eikä kuvassa väitetä mittalukua. Kirjoittava kellopeli esitetään symbolisena lahjana, ei todellisen suuren museokellon käsissä kannettavana pienoiskopiona. Museokuvapikseleitä ei käytetty.

Ei git-, R2-, Unity-, Tripo-, peli- tai julkaisumuutoksia. Ei postia muihin app-sessioihin. Root vastaa jatkotoimituksesta.
