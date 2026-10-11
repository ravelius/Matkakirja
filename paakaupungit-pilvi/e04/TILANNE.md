# Pääkaupungit e04 — toimeksiannot #72 ja #73

Päivitetty 2026-10-11T19:56:41.292209+00:00

Haara `paakaupungit-e04-codex`, pohja `e4f2845b3a82874550481fda26528df065820232`. Uusi työ, vain e04–e14; aiemmat #70/#71-kuvatilaukset pysyvät palauteportissa. Ei generointia, R2-toimitusta, pelikytkentää tai julkaisua. Kaikki tämän työn tiedostot ja väliaineisto NASilla.

CODEX.md, PILVIOHJE luvut 1–13, liite A ja LISÄSÄÄNTÖ, erat.md sekä nimetyt sitovat resepti/spec/mallit luettu ennen tuotantoa. Dakar-mallista vain rakenne.

Tarkennus #73 luettu lähdekärjestä baa84fbb18605cc373b9feafe3168f6ba745b526: Freetown ja Sri Jayawardenepura Kotte pois. Koneluettavissa erissä e04–e14 on 95 kaupunkia ennen poistoja ja 93 poistojen jälkeen; alkuperäinen toimeksiantoteksti sanoi 96. Kolmatta poistoa ei ole keksitty. Tunis ja Antananarivo kevyinä; ei Karthagon eikä Madagaskar-lehden kannen kohteiden toistoa. Naypyidaw ja Pjongjang e10:n viimeisinä.

Aiempi Sää/Commons-rajapintaeste: 11.10.2026 robots.txt kieltää en/fi-Wikipedian, Wikidatan ja Commonsin `/w/`-polut myös `/w/api.php`-kyselyiltä (Claude-User ja Matkakirja). Näitä pyyntöjä ei tehty. Ratkaisukysymys postilaatikkoon. Omistaja hyväksyi 11.10. tavalliset robots-sallitut alkuperäiset Wikipedia/Commons-lähdesivut estettyjen API-polkujen sijasta. Kiellettyjä pyyntöjä ei tehdä. Sääriviä ei arvata eikä käsin täytetä.

| id | A | B | C | D | E | F | huomio |
|---|---|---|---|---|---|---|---|
| rabat | valmis | valmis | valmis | valmis | valmis | valmis | F0virhetta1varoitus23kuvaa; aineistopaketti valmis |
| alger | valmis | poikkeama avoin | — | — | — | — | B4hyvaksyttya/19puuttuvaa; kaupalliset oikeudet avoin; säänull |
| nouakchott | poikkeama avoin | — | — | — | — | — | 6 WP-paikkapistettä löydetty, 4 kohteen faktavaje ja museorajaus avoin |
| praia | valmis | poikkeama avoin | — | — | — | — | A: 5 kohdetta perustellen; B: 13 kuvaa, 8 puuttuu |
| banjul | valmis | poikkeama avoin | korjattu luonnos | osittain | tekstikorjaukset tehty | 3 kuvavirhettä | 16 kuvaa; K3 hylätty, pysty ja Albertin torin kuva puuttuvat |
| bissau | valmis | poikkeama avoin | korjattu luonnos | osittain | tekstikorjaukset tehty | 3 kuvavirhettä | 16 kuvaa kaavio mukaan lukien; 3 kohdekuvaa puuttuu |
| conakry | valmis | poikkeama avoin | työn alla | — | — | — | 21 kuvaa; Camayennen kohdekuva puuttuu, C etenee |
| monrovia | valmis | työn alla | — | — | — | — | A: 6 lähdekoordinaattikohdetta ja sääaseman ero kirjattu |
| tunis | valmis | — | — | — | — | — | A: kevyt, 6 vanhan ytimen kohdetta; ei Karthagon toistoa |

Vastaanotto ei tarkoita valmista erää, Sisältökirjurin hyväksyntää, pelikytkentää tai julkaisua.


## Tarkennus #74 — kaupalliset Commons-kuvat

Lähde c046a5646f63d5977f105edde637fd3ddc042c25, blob 2bbea68faeb4f6e8df760bbe30be9045596c6f1f, luettu 2026-10-11T16:22:14.812623+00:00. Peli on kaupallinen: rakennuksen tai julkisen taideteoksen kuva hyväksytään vain, jos kuvausmaan panoraamavapaus sallii kaupallisen käytön juuri teostyypille (Commons COM:FOP). Ei-kaupallinen panoraamavapaus ei riitä. Epävarma kuva korvataan vapaalla kuvalla tai kohde jätetään kuvattomaksi ja kirjataan RAPORTTI.md:hen. Sääntö sovelletaan kaikkiin ehdokkaisiin ennen toimitusta. Rabatin 23 kuvaa läpäisivät B/C/D-katselut ja F-tarkistuksen; Algerin ja Praian avoimet kuvaoikeudet kirjattu kuvat.md-tiedostoihin ja oikeustulkinnan muistiinpanoon. #73, vanhojen #70/#71-kuvajonojen palauteportti ja NAS-tallennus säilyvät.


## Omistajan nopeutusohjaus ja edistyminen

11.10. omistaja hyväksyi kolme samanaikaista työagenttia ja pyysi lisäksi apusessioita; kulutuksella ei väliä. e05/e06 faktasessiot luotu omille NAS-klooneille, toimitusjärjestys e04→e14 säilyy. Ensimmäiset e05/e06-vuorot pysähtyivät symbolisen projektipolun Seatbelt-valmisteluun. Omistaja pysäytti niiden vuorot ja lähetti Jatka; uudet vuorot toimivat, lukevat lähteitä ja pushaavat omille haaroilleen. Sovellusrestartia ei tarvittu. Pääsession kolme työagenttia toimivat.

Yhteinen NAS-lähdevarasto ja robots-tarkistava hakuapuri: valiaikainen/sallittu_haku.py; haku enintään1/s yhteisellä lukolla, pyynnöt ja SHA-256 lähdelokiin. Omistajan hyväksytty lähdekanavapoikkeus ei poista lisenssi/faktakuria eikä kaupallisia FOP-ehtoja.

Säädata tuotettu alkuperäisellä tyokalu.mjs saa -komennolla; vain verkkosyöte sovitettu sallittuun Wikipedia-lähdesivuun (valiaikainen/saa-lahdesovitus.mjs). Alkuperäinen numeropoiminta ja tarkistusalgoritmi säilyvät muuttumattomina. 8/9 saa.json syntyi; Algerin taulukko hylätty: vuosisarake685mm, kuukausien summa603mm. Alger saatiedot:null, ei tekstiin aste/mm-lukuja. saa-syote.json:ssa artikkeli rajattu kaupungin en-artikkeliin, jotta maa-fallback ei valitse muun kaupungin asemaa.

Edistyminen: varmennetut A–F-vaiheet /558 (93×6), ei käytetyn ajan arvio. Rabat A–F valmis: 0 virhettä, 1 perusteltu varoitus, 23 kuvaa. Valmis aineistopaketti 1/93, koko e04-erä vielä kesken. Pääsession ledgerissä 15/558 vaihetta eli 2,7 %; e05/e06:n osittaisia lähdekoosteita ei lasketa valmistuneiksi.

## Banjul ja Bissau: keskeneräiset sisältöluonnokset

Banjul D: 3 VÄÄRIN ja 1 EPÄVARMA. E:n 4/4 kokonaisen kentän korvausta toteutettu; 12 JSON-arvoa muuttui ja K3-lauttakuva poistettiin luettavien kasvojen vuoksi. Pääsession F-tarkistus: 3 virhettä, 2 varoitusta, 16 kuvaa. Ei valmis-C/E/F tai valmis-kaupunki.

Bissau: H1:n sisäpiha, H2:n yleinen bastionikaavio, H3:n Pidjiguiti ja H4:n yleinen uudempi satama on erotettu kuvateksteissä; kaavio ei ole Amuran piirros eikä satamakuva Tulliaukio. Kaikki 16 kuvaa katsottu B/C/D:ssä. D:n kolme tekstikorjausta toteutettiin E:ssä, ja E2 korjasi kaksi en-Wiki-otsikkoa varmennettuihin artikkeleihin. Pääsession F: 3 virhettä N1/N2/N3-kohdekuvista ja 1 kohdemäärän varoitus. Ei valmis-C/E/F tai valmis-kaupunki.

Viisi kuvaporttien tulkintakysymystä postilaatikossa: #74-kuvattomuus vs 0-virheportti, 70 vuoden teoskohderaja vs kaupallinen FOP, vanha luonnonpysty, alkuperäisen painotuotteen kuvateksti sekä saman paikan kuvan käyttö nostossa ja kohdejutussa. Poikkeuksia ei sovelleta hiljaa; alkuperäiset konevirheet jäävät näkyviin. Työ jatkuu muissa kaupungeissa.
