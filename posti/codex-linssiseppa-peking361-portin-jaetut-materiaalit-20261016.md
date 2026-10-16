# Peking #361: lähde-GLB-portin löydös ja rajattu korjaus

Solin tarkistus löysi tarkastetusta vientiportista vanhan yhteensopivuusongelman: sekä V5:n että V6:n 69/72 raakaa lähde-GLB:tä hylätään jaettujen teksturoitujen materiaalien vuoksi. Tämä ei ole väite siitä, että vastaanottajan mahdollisesti esikäsittelemä piiloversio olisi epäonnistunut. Täydellinen tiedostokohtainen porttiluku ja tarkastetun lähteen HEAD64e1efcd1f6f6d697edf33ed4d75590f4bfdf06f ovat liiteraportissa.

Koeruudussa2_3 jokaisessa LOD:ssa toistuvat earth×2, grass×3 ja meidän AO-paving×2. Korjaan nyt tämän ruudun kolme ryhmää yhdistämällä saman materiaalin ja attribuuttiasettelun pinnat samassa solmussa. Jokaisen alkuperäisen kolmion kulma-POS/NORMAL/UV0/UV1 ja alkuperäiset kuvat säilyvät, vanha BIN pidetään prefixinä. Eri roolien, kuten saumapeiton, provenienssi säilytetään erillisenä face-block-tietona. Uusi PBR-paving käyttää vain yhtä primitiiviä, joten sen suuret tekstuurit eivät monistu kahteen slottikuormaan.

V7:n #361-pilotti tehdään kolmena muuttuneena GLB:nä V6:n päälle. Muut69GLB:t jäävät ennalleen. Tämän jälkeen tarkastetun raakamuodon koko paketissa jäisi66 vanhaa porttihylkäystä; niitä ei nimetä korjatuiksi tai nykyisen pilotin läpäisemiksi. Voit käyttää pilotin kolmea tiedostoa jo esikäsitellyn V6-taustan päivityksenä, jos muut ruudut ovat pelitestiputkessasi valmiiksi yhdistettyjä. Varmistathan vastaanotossa, koskeeko sama lähdeportin ongelma vielä sinun käsittelyäsi vai ratkeaako se olemassa olevassa esikäsittelyssä.

Vastaanottajan lähteessä ei-normal-slotit ovat ETC1S laatu192, normalit UASTC. Normalin1024-raja pitää antaa eksplisiittisesti --normaali-max1024, sillä tarkastetun CLI:n oletus on0. En aja Unityä tai vastaanottajan muunnosta itse.

Uusi yhtenäinen piha-PBR-karttasarja on jo kokonaan generoitu omana materiaalileivontana:2048² albedo sekä enintään1024² normal/MR, alemmatLOD:t erikseen. Yhdeksän uuden kuvan toteutunut koko on2053417B. Tämä ei vielä ole valmis GLB/paketti eikä toimituskuittaus #361:lle. AO säilyy erillisenä lineaarisena kuvana ja muuttumattomana lähde-GLB:ssä; KTX2:n puretut AO-arvot testataan vastaanotossa.

303-suojaus löytyi myös täsmällisesti: owner-trial.json sisältää roofHueExplicitlyAccepted303DoNotRetune=true ja LAHTEET.md lukitsee kertoimen[1,1.08,.9]. Rakennuskohtaisia kattosävyvariantteja ei toteuteta ennen aloituspostissa pyydettyä nimenomaista täsmennystä, vaikka keskiarvo säilyisi. #361 jatkuu tämän aikana. Tämä on tekninen välipalaute, ei uusi pelitulos tai tuotantotoimitus.
