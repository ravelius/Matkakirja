# Basseterre — C-luonnos, 12.10.2026

Tehtävä 18. Kirjoitettu lähteistetyn rajatun faktapohjan pohjalta. Ei valmis erä, D/E/F-tarkistus, hyväksyntä, kytkentä tai julkaisu. Ei Git-operaatioita eikä muiden kaupunkien muokkausta.

## Kirjoitetut osiot

- Artikkeli: intro 917 merkkiä, kaksi kappaletta, yhdeksän virkettä ja kaksi lihavointia; lisäteksti 922 merkkiä, kolme kappaletta.
- Kansi 4 nostoa ja historiasivu 4 nostoa: 523, 516, 523, 537 / 529, 515, 530, 533 merkkiä.
- Opas 5 jaksoa, matkailijalle-kappale, viisi parasta-riviä, kolme hyvä tietää -riviä.
- 5 kysymystä, tasot 1–3; 3 merkkijonotietoa. Minitehtävä puujalkaisesta moko-jumbiesta; vastaus löytyy historiasivun karnevaalinostosta ja poikkeaa kysymyksistä.
- Kartta partial: 1 aukio, paikan oma Wikipedia-koordinaatti. Kohdejuttu 2 kappaletta, 714 merkkiä. Koordinaattia ei lainattu kaupungilta.
- saatiedot:null; sääaseman normaalit primäärivarmennettava, saa.json koskematon. Ei sää-/väestö-/pinta-alalukuja lukijan teksteissä.

## Alkuperäinen koneajo

`node paakaupungit-pilvi/tyokalu.mjs tarkista e12 basseterre --lyhyt`

Viimeinen lyhyt tuloste: valiaikainen/nopea-e12-basseterre/tarkistus-lopullinen.txt. 19 virhettä, 2 varoitusta, 0 kuvaa, exit 1. Virheiden ainoa tyyppi: tiedosto puuttuu tyhjissä kuvaolioissa. Ei artikkelin, nostojen, oppaan, kysymysten tai muun tekstirakenteen virheitä. Varoitusten tarkka tuloste: tarkistus-taysi.txt; yksi karttakohde alle kuuden pohjatason ja sää puuttuu. Lopputarkistuksessa 1873-lause rajattiin varmistettavaan tulipalon vaikutukseen, ilman väitettä yhä jatkuneesta toipumisesta; minitehtävän väärät vaihtoehdot vaihdettiin todellisiksi karnevaalirooleiksi.

Tyhjiä kuvarooleja 19: matkakirjan valokuva 1, kansikuvat 3, nostot 8, matkailijalle 1, oppaan jaksot 5, aukion kohdejuttu 1. Jokaisen tiedosto/lyhyt/selite/lahde on tyhjä. Kuvaputken lista faktapohjan luvussa 7. Ei hakua, generointia eikä keksittyjä nimiä.

Ensimmäinen kirjoitusskriptin ajo pysähtyi sulkuvirheeseen ennen JSONin tallennusta, jolloin tarkistin raportoi sisalto.json:n ENOENTin. Sulkuvirhe korjattu; se ei ole lopputuloksen virhe. Tarkistinta ei muutettu.

## Avoimet portit

- Muut karttapisteet ja rakennusten/teosten tekijäketjut; ei alle 70 vuotta sitten kuolleen tekijän teosta karttaan tai kuviin.
- Museon lokakuun 2026 vierailu-/korjaustilanne, sääauditointi, kaikki kuvat.
- Riippumaton D, E-korjaukset ja pääsession F. Tarkistus-kone ei todista faktahyväksyntää.
- Faktapohjassa dokumentoidut Museo 1894 / keskeneräiset työt myöhemmin sekä Port Zanten eri vaiheiden vuodet on yleistetty. Asukasluku on seurakunnan; ei käytetty kaupunkilukuna.

Tiedostojen lopulliset SHA-256:t ja lähdekopioiden SHA:t: valiaikainen/nopea-e12-basseterre/SHA256.txt. Lähteiden robots-/HTTP-todiste: saman kansion lahdehaut.jsonl.
