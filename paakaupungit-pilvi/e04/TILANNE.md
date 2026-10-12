# Pääkaupungit e04 — toimeksiannot #72 ja #73

Päivitetty 2026-10-11T21:42:32.815171+00:00

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
| conakry | valmis | poikkeama avoin | korjattu luonnos | osittain | E1/E2 tehty | 1 kuvavirhe | 21 kuvaa, vain Camayennen kohdekuva puuttuu |
| monrovia | valmis | poikkeama avoin | korjattu luonnos | osittain | E1 tehty | 8 kuvavirhettä | 14 kuvaa; kolme D-tekstikorjausta toteutettu |
| tunis | valmis | poikkeama avoin | korjattu luonnos | osittain | E1 tehty | 7 kuvavirhettä | 15 kuvaa; C3:n kasvot ja 6 erillistä koristepintaa hylätty nykyisestä luonnoksesta |

Vastaanotto ei tarkoita valmista erää, Sisältökirjurin hyväksyntää, pelikytkentää tai julkaisua.


## Tarkennus #74 — kaupalliset Commons-kuvat

Lähde c046a5646f63d5977f105edde637fd3ddc042c25, blob 2bbea68faeb4f6e8df760bbe30be9045596c6f1f, luettu 2026-10-11T16:22:14.812623+00:00. Peli on kaupallinen: rakennuksen tai julkisen taideteoksen kuva hyväksytään vain, jos kuvausmaan panoraamavapaus sallii kaupallisen käytön juuri teostyypille (Commons COM:FOP). Ei-kaupallinen panoraamavapaus ei riitä. Epävarma kuva korvataan vapaalla kuvalla tai kohde jätetään kuvattomaksi ja kirjataan RAPORTTI.md:hen. Sääntö sovelletaan kaikkiin ehdokkaisiin ennen toimitusta. Rabatin 23 kuvaa läpäisivät B/C/D-katselut ja F-tarkistuksen; Algerin ja Praian avoimet kuvaoikeudet kirjattu kuvat.md-tiedostoihin ja oikeustulkinnan muistiinpanoon. #73, vanhojen #70/#71-kuvajonojen palauteportti ja NAS-tallennus säilyvät.


## Omistajan nopeutusohjaus ja edistyminen

11.10. omistaja hyväksyi kolme samanaikaista työagenttia ja pyysi lisäksi apusessioita; kulutuksella ei väliä. e05/e06 faktasessiot luotu omille NAS-klooneille, toimitusjärjestys e04→e14 säilyy. Ensimmäiset e05/e06-vuorot pysähtyivät symbolisen projektipolun Seatbelt-valmisteluun. Omistaja pysäytti niiden vuorot ja lähetti Jatka; uudet vuorot toimivat, lukevat lähteitä ja pushaavat omille haaroilleen. Sovellusrestartia ei tarvittu. Pääsession kolme työagenttia toimivat.

Yhteinen NAS-lähdevarasto ja robots-tarkistava hakuapuri: valiaikainen/sallittu_haku.py; haku enintään1/s yhteisellä lukolla, pyynnöt ja SHA-256 lähdelokiin. Omistajan hyväksytty lähdekanavapoikkeus ei poista lisenssi/faktakuria eikä kaupallisia FOP-ehtoja.

Säädata tuotettu alkuperäisellä tyokalu.mjs saa -komennolla; vain verkkosyöte sovitettu sallittuun Wikipedia-lähdesivuun (valiaikainen/saa-lahdesovitus.mjs). Alkuperäinen numeropoiminta ja tarkistusalgoritmi säilyvät muuttumattomina. 8/9 saa.json syntyi; Algerin taulukko hylätty: vuosisarake685mm, kuukausien summa603mm. Alger saatiedot:null, ei tekstiin aste/mm-lukuja. saa-syote.json:ssa artikkeli rajattu kaupungin en-artikkeliin, jotta maa-fallback ei valitse muun kaupungin asemaa.

Edistyminen: varmennetut A–F-vaiheet /558 (93×6), ei käytetyn ajan arvio. Rabat A–F valmis: 0 virhettä, 1 perusteltu varoitus, 23 kuvaa. Valmis aineistopaketti 1/93, koko e04-erä vielä kesken. Pääsession ledgerissä 16/558 vaihetta eli 2,9 %; e05/e06:n osittaisia lähdekoosteita ei lasketa valmistuneiksi.

## Banjul ja Bissau: keskeneräiset sisältöluonnokset

Banjul D: 3 VÄÄRIN ja 1 EPÄVARMA. E:n 4/4 kokonaisen kentän korvausta toteutettu; 12 JSON-arvoa muuttui ja K3-lauttakuva poistettiin luettavien kasvojen vuoksi. Pääsession F-tarkistus: 3 virhettä, 2 varoitusta, 16 kuvaa. Ei valmis-C/E/F tai valmis-kaupunki.

Bissau: H1:n sisäpiha, H2:n yleinen bastionikaavio, H3:n Pidjiguiti ja H4:n yleinen uudempi satama on erotettu kuvateksteissä; kaavio ei ole Amuran piirros eikä satamakuva Tulliaukio. Kaikki 16 kuvaa katsottu B/C/D:ssä. D:n kolme tekstikorjausta toteutettiin E:ssä, ja E2 korjasi kaksi en-Wiki-otsikkoa varmennettuihin artikkeleihin. Pääsession F: 3 virhettä N1/N2/N3-kohdekuvista ja 1 kohdemäärän varoitus. Ei valmis-C/E/F tai valmis-kaupunki.

Viisi kuvaporttien tulkintakysymystä postilaatikossa: #74-kuvattomuus vs 0-virheportti, 70 vuoden teoskohderaja vs kaupallinen FOP, vanha luonnonpysty, alkuperäisen painotuotteen kuvateksti sekä saman paikan kuvan käyttö nostossa ja kohdejutussa. Poikkeuksia ei sovelleta hiljaa; alkuperäiset konevirheet jäävät näkyviin. Työ jatkuu muissa kaupungeissa.

Conakry D: 2 VÄÄRIN, 2 EPÄVARMA. E1 teki seitsemän sanatarkkaa JSON-korjausta ja hylkäsi luettavien kasvojen kuvan. Uusi K2:n kaupallisen sataman aluskuva B/C/D-katsottu, E2 lisäsi neljä hyväksyttyä kuvakenttää; R3:n alkuperäisen keulamaalauksen oikeuksia ei väitetä ratkaistuiksi. Pääsession F: 1 virhe / 0 varoitusta / 21 kuvaa, vain Camayenne. Monrovia D: 1 VÄÄRIN ja 1 EPÄVARMA. E1 teki kolme sanatarkkaa tekstikentän korjausta, kuva- ja sääkentät säilyivät. Pääsession F: 8 virhettä / 0 varoitusta / 14 kuvaa, kaikki virheet kuvapuutteita. Ei valmis-C/E/F tai valmis-kaupunki kummallekaan.

Tunis B/C: 22 katsottua kuvaa ja kaksi sallittua kuvatonta opasjaksoa; C:n alkuperäinen kone- ja verkkotarkistus 0 virhettä / 0 varoitusta. D:n riippumaton tarkistus on kesken, erityisesti kaakeli-, stukko- ja puukoristepinnat sekä epäselvät kasvot. Luonnosta ei lasketa valmiiksi B/C/F-vaiheeksi pelkän koneportin perusteella.

Tunis D: 1 VÄÄRIN / 6 EPÄVARMA, 22 alkuperäistä kuvaa katsottu. E1 toteutti 28 kokonaisen merkkijonokentän tyhjennystä: C3:n luettavat kasvot sekä H2/H3/H4/O3/N5/N6:n erilliset koristepinnat ilman riittävää oikeusketjua. Muu JSON, kartta, numerot ja D/C-raporttien alkuperäiset osat säilyivät byte-/arvotarkasti. Pääsession F: 7 kuvavirhettä / 0 varoitusta / 15 kuvaa. Ei valmis-C/E/F tai valmis-kaupunki. Sää48/48 ja karttapisteet6/6 varmennettiin alkuperäislähteistä; koristeiden oikeuksia ei väitetä ratkaistuiksi.

## Omistajan uusi tekstityön nopeutus12.10.2026

Omistaja pyysi oleellista nopeutusta sekä enemmän sessioita/agentteja tavoitteenaan10x nopeus.30 pysyvää rinnakkaista sessiota luotu erillisille kaupunkijaoille. Kuvat pyydetty erillisestä Matkakirjan kuvat -putkesta, ensimmäinen Conakryn Camayennen kapokkipuut. Kirjoitetut tekstit eivät odota kuvia, puuttuvia karttapisteitä tai erillistä sääauditointia; puutteita ei arvata. Tekstiluonnoksen valmius ei ole sama kuin valmis-A–F, sisältöhyväksyntä, pelikytkentä tai julkaisu.

Välitallennus 2026-10-12T07:40:36.871526+00:00: tekstiluonnoksia 91/93 (97,8 %), osaluonnokset ja edelleen keskeneräiset kohdat omissa C-muistioissaan. Tässä erässä tallennetut ydinluonnokset: rabat, alger, nouakchott, praia, banjul, bissau, conakry, monrovia, tunis. Riippumattomat D-tarkistukset ja kuvien täydentäminen jatkossa. Tämä commit on tuotannon välitallennus, ei valmis-erätoimitus.
