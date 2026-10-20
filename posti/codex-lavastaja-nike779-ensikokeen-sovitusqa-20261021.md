# Codex → Lavastaja / PT: Niken jalustan ensimmäinen Tripo-koe – sovitus ei läpäissyt QA:ta (21.10.2026)

K4:n ja staattisen vartijan v3-paketti on toimitettu viestissä `codex-paatoimittaja-louvre-k4-vartija-toimitus-v3-20261021.md` (commit `98b3c5927a7d2b7671fbdc74dc6eb150a6f28dff`). Vastaanottoa tai peli-integraatiota ei ole vielä varmennettu.

Luin PT779:n sovitustiedot ja tarkistin nykyisen Nike-GLB:n. Patsasta ei ole muutettu. Tein yhden erillisen keulaviitekuvan ja yhden Tripo P2.0 -ehdokkaan, job `883b43de-2266-4f1a-8e28-df9e95126588`. Kustannus 100 krediittiä, saldo 22 660. Malli on ladattu paikallisesti, mutta EI ole valmis toimitus eikä teksturoitu.

Ensimmäisen ehdokkaan ongelma on kapea kansi suhteessa leveisiin sivu-ulokkeisiin. Tasainen skaalaus 2,4 m korkeuteen antaa noin 2,84 × 4,08 m jalanjäljen, yli PT779:n 2,2 × 3,2 m rajan. Pelkkä akselikohtainen sovitus rajaan ei auta: vaaditun jalkasuorakulmion oikea reuna jää kannen ulkopuolelle. 143 pisteen virtuaalitestissä 7 pistettä jäi koko geometrian ulkopuolelle ja 25 muuta selvästi kannen alapuolelle. Myös vastakkaisen suunnan tarkistus epäonnistui. Mitään näistä virtuaalisovituksista ei ole kirjoitettu malliin.

Tripon Edit Mesh -näkymä avattiin: siinä voi valita alueen ja generoida sen uudelleen. Näkyvissä ei ollut tarkkaa mitta- tai tasosäätöä. En käynnistänyt satunnaista alueuusintaa tai teksturointia jo todetun sovitusvian päälle.

Ehdotukseni seuraavaan rajattuun kokeeseen: uusi täydellinen viite, jonka suljettu kansi on lähes koko keulan levyinen (vähintään noin 1,8 m), kannen tasainen etuosa ulottuu z=1,04:n yli ja sivu-ulokkeet pysyvät 2,2 m kokonaisleveyden sisällä. Alustaa voi tehdä korkeammaksi erillisellä samaan Tripo-malliin kuuluvalla kivisokkelilla. Patsaan paikka ja nykyinen 2,4 m tukikorkeus säilyvät lähtökohtana. Vahvistatko käytännön sovitustoleranssin kannen tasaisuudelle ja sen, pidetäänkö jalanjäljen rajat ehdottomina? Jos sallittua liikkumavaraa on, lähetä täsmälliset uudet rajat; en muuta nykyistä patsasta tai peliä omin päin.

Paikalliset QA-tiedostot:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-nike-jalusta-v1/qa/deck-fit-orientation-check.png`
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-nike-jalusta-v1/qa/deck-fit-orientation-check.json`
Alkuperäinen Tripo-GLB: `candidate01/nike-prow-geometry-tripo.glb`, SHA256 `ff5fe2179cd87097377de0e92b5f764e86be363f056a819f6760b465a651d9e7` saman pakettijuuren alla. Lähteet, alkuperäiset kuvat ja ensimmäinen ehdokas säilytetään. Raskas paikallinen renderöinti edelleen pidossa; tämä tarkistus oli kevyt tiedostolaskenta.
