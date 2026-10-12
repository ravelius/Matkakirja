# Saint John's — kirjoitusmuistiinpanot C, tehtävä 17

12.10.2026. Tila: C-tekstiluonnos kirjoitettu ja paikallisesti tarkistettu, kokonaiskaupunki partial. Vain e12/saintjohns ja oma väliaikaiskansio. Ei Git-operaatioita, kuvaesikatseluja/generointia, pelikytkentää tai julkaisua.

## Kirjoitetut osiot

- Artikkeli: intro 989 merkkiä, 2 kappaletta, 9 virkettä, 2 lihavointia; Lue lisää 854 merkkiä, 3 kappaletta.
- Kansi + historia: 4 + 4 nostoa (477, 499, 476, 506 / 496, 510, 515, 486 merkkiä), kaksi johdantoa ja historiasivun minitehtävä.
- Matkailijalle: viiden virkkeen kappale, 5 opasjaksoa, 5 parasta-riviä, 3 hyvaTietaa-riviä.
- 5 kysymystä (tasot 1–3), 3 tiedot-merkkijonoa.
- Kartta partial: 3 kohteen oman Wikipedia-artikkelin pistettä, 3 kohdejuttua (744, 827, 795 merkkiä, kaksi kappaletta kullakin). Fort James -pisteen lähde-ero jää jatkovarmennukseen.
- Kaikki 21 kuvaroolia neljällä tyhjällä kentällä; saatiedot:null.

## Alkuperäisen tarkistimen tulos

Komento `node paakaupungit-pilvi/tyokalu.mjs tarkista e12 saintjohns --lyhyt`, todellinen exit 1: **21 virhettä, 2 varoitusta, 0 kuvaa**. Virheiden ainoa tyyppi `tiedosto puuttuu`, kaikissa kuvaroolien paikoissa. Ei tekstien tai rakenteen konevirheitä. Tarkistinta ei muutettu eikä virheitä piilotettu. Täysi paikallinen ajo näyttää varoitusten tyypit:

1. Kohteita 3, pohjataso 6. Rajattu osakartta; 6–8 kohteen kattavuusportti avoin. Ei hyväksytty pienkaupunkipoikkeus.
2. Saatiedot puuttuu. 48/48:n primäärivarmennusta ei ole osoitettu; numeroita ei kirjoitettu tai muutettu.

Alkuperäiset stdout-lokit ja todelliset exit-koodit: `valiaikainen/nopea-e12-saintjohns/tarkistus-lyhyt.txt`, `tarkistus-kaikki.txt`, `tarkistus-exit.json`. Kymmenen onnistuneen verkkolähteen HTML, teksti ja URL-metatiedot sekä haku-/robots-todisteet samassa kansiossa. 404-sivuja tai DNS-virheitä ei käytetty väitteisiin.

## Faktaratkaisut ja avoimet portit

Katedraalin eri vuosien ristiriidat yleistettiin aikakausiksi. Museon oikeustalon 1747/1750/1747–1750 sekä museon 1985/1988 eivät siirry tarkkoina vuosina tekstiin. Fort Jamesin eri rakennusvuodet jätettiin pois. Sen oman Wikipedia-geon ja Wikivoyage-nastan ero on kirjattu faktapohjaan; kartassa ei ole arvattua keskiarvoa. Väkiluku jätettiin pois, jotta kaupungin ja Saint Johnin laajemman seurakunnan luvut eivät sekoitu. Arkkitehti Thomas Fullerin kuolema 1800-luvulla tarkistettiin elämäkerrasta; modernit teokset ja näyttelymallit eivät ole kohteita tai kuvatilauksia.

Kuvaputki: valokuva, kolme laajaa kaupunkikantta, kahdeksan nostokuvaa, oppaan maltillinen pysty ja viisi jaksokuvaa sekä kolme kohdekuvaa. Katedraalista oikeuskelpoinen vanha rakennus ilman uusia taideteoksia pääaiheena; museosta historiallinen oikeustalo ilman moderneja näyttelymalleja; Fort Jamesista historiallinen linnake. Historianostot tarvitsevat kaupunkisuunnittelua, palohistoriaa, katujen arkista kunnossapitoa ja vanhaa lentopaikkaa dokumentoivan aineiston. Kuva-aiheet, oikeudet ja kuvatekstit vahvistetaan kuvaputkessa. Mitään kuvaa ei ole valittu tai katsottu tässä työssä.

Avoinna: B, kartan kattavuus ja Fort Jamesin piste-ero, sääauditointi, riippumaton D/E/F, toimitushyväksyntä, pelikytkentä ja julkaisu. Tämä kirjoittaja ei tee oman tekstinsä riippumatonta tarkistusta.

## Tiedostojen SHA-256

- `faktapohja.md`: `0c8b1c7f23f50a9e73ea7718627e45e6300bebcf23625152cec6bb40ad1035d2`
- `sisalto.json`: `1b4e08c38ad9594c5a640eebfa0a08d4a11432a4e6c9ec0fba9b1657283732be`
