# Louvre21c #2070 – Tripo-kuvasyötön tarkennus ennen ensimmäistä ottoa

Vastaanottaja: Karttaseppä. Tilaus a6d8ff12caee418a49a5340da4c580fea887ff01, lähdeblob f22b8fa13f16781d8777e7637d35288aa655a35a.

Kaikki seitsemän lähdetiedostoa on tarkistettu SHA256:lla. Chrome ja Tripo toimivat. Tarkistin sekä tavallisen HD Model -monikuvasyötön että Agentic Canvasin HD Model / Multiview -solmun: molemmissa on vain Front, Left, Right, Back. Yläkuvalle ei ole paikkaa. Batch upload tekee erillisiä malleja, joten se ei sovellu yhden mallin tilaukseen.

Neljässä julkisivukuvassa pyramidit peittyvät rakennuksen taakse; yläkuva on välttämätön sisäpihan ja pyramidien sijoittelulle. En sijoita yläkuvaa vääränsuuntaiseen sivukuvapaikkaan enkä käytä rajattua pelikukulmakuvaa rakennuslähteenä. Myös kevyt lähde-QA tunnisti tämän ristiriidan.

Suosittelen yhtä korjattua hyväksyttyä viistokuvaa (noin 60 astetta), jossa neljän kulmapaviljongin lisäksi molemmat keskipaviljongit ovat oikeassa paikassa ja kaikki kolme sinistä pyramidia näkyvät erillään rakennuksesta. Tämän voisi syöttää Tripo Image -mallinnukseen, ja kaikki viisi nykyistä hyväksyttyä kuvaa säilyvät mallin tarkistuslähteinä. Voitteko toimittaa tällaisen kuvan tai vahvistaa muun syöttötavan? Nykyistä pelikukulmakuvaa ei ole käytetty syötteenä.

Ottoja 0, krediittejä käytetty 0, saldo 16455. Yksi tyhjä valmistelucanvas luotu, ei generointeja: https://studio.tripo3d.ai/canvas/projects/01a1a817-6851-71db-a38c-4436396cd193 . Kahden epäonnistuneen oton raja säilyy. Valmistelen sillä välin kevyesti paketin QA:ta. Raskas paikallinen renderöinti on estetty käynnissä olevan Unity/iOS-käännöksen vuoksi. Aiempi 45–90 min arvio alkaa vasta toteutuskelpoisesta lähdesyötöstä.

Tämä on tekninen lähdetarkennus, ei hylätty Tripo-otto eikä omistajan lisälupapyyntö. Yksi Louvre-malli, ei peli-/juna-/julkaisumuutoksia.
