# Opus → Fable: matkakirja ja pulun kupla pois saapumiskuvien ajaksi

20.9.2026 klo 13.10. Haara `opus-local-saapumisen-piilot` (pohja
origin/v1973-prep, f3d150e4). Ei versionostoa, ei PR:ää.

Omistajan kaappaus (`saapuminen-pariisi-v1974.webp`) näytti molemmat:
vasemman yläkulman matkakirjapaneeli (paikkarivi *"Pariisi, lokakuussa
1873"*, teksti ja pikkukuvat) ja oikean alakulman pulun puhekupla olivat
ruudulla koko trailerin ajan. Korjaus on runkoluokka
`saapumistraileri-paalla`: se lisätään siinä kohdassa, jossa trailerin
kehys liitetään runkoon, ja poistetaan `piilotaSaapumistrailerin`
alussa — eli **kaikissa kolmessa poistumistiessä** (traileri loppuun,
napautusohitus, kaupungin vaihto), koska ne kulkevat saman funktion
kautta. CSS piilottaa luokan alla `.fact-card`, `.pollo-kuplapino-kehys`
ja `.pollo-vihje`. Valitsin on `visibility` eikä `display`, koska
paneelin sisältö kirjoitetaan saapumisessa uudelleen ja `display: none`
veisi siltä mitat kesken kirjoituksen; häivytys on 240 ms ja
liikkeenvähennys ohittaa sen. Karttaan ei koskettu: se jää uuden
säännön mukaisesti teräväksi.

Uusi `tools/savukkeet/savuke-saapumisen-piilot.mjs` ajaa saapumisen
Lontoosta Pariisiin **kahdella leveydellä (390 ja 1400)** ja mittaa
laskettua näkyvyyttä, ei luokkaa: trailerin puolivälissä paneeli ja
kupla ovat poissa, mukana vastakoe (sama mittari näkee paneelin heti
kun runkoluokka otetaan pois — muuten vihreä voisi tarkoittaa vain
sitä, ettei paneelia ole olemassa), ja trailerin jälkeen luokka on
poissa ja paneeli takaisin ruudulla. **18/18 läpi.** Kaappaukset
`docs/raportit/kaappaukset/saapumisen-piilot-20260920/`.

Matkalla korjasin yhden oman mittani: ensimmäinen versio laski
sumentavaksi kerrokseksi myös avausverhon (`.intro-verho`), joka jää
DOMiin läpinäkyvänä eikä sumenna mitään. Mitta lukee nyt piirtyvää
pintaa (opacity ja koko), ei pelkkää tyylisääntöä. Lisäksi
`piilotaSaapumistraileri` kutsutaan yksikkötesteistä ilman DOMia, joten
luokan poisto tehdään varovaisella haulla — muuten `puhevuoro.test.mjs`
kaatui `document is not defined`.

`node --test` 3 750 testiä, 0 punaista; niputus 430 moduulia;
tarkista-savukkeet kunnossa.

**Mitä jäi tekemättä:** kupla piilotetaan, ei lykätä. Jos pulu puhuu
kesken trailerin, repliikki menee chatin lokiin mutta kuplaa ei näe —
lykkäysjono (`lykkaaLinssiin`) olisi oma eränsä. Savukkeen ajossa
Wikimedia on estetty, joten trailerin kuvat eivät lataudu; mitattavat
pinnat (paneeli, kupla, runkoluokka) eivät siitä riipu, mutta
kaappaukset näyttävät nimikortin eivätkä valokuvia.
