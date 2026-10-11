# Pääkaupungit e04 — toimeksiannot #72 ja #73

Päivitetty 2026-10-11T16:52:18.026550+00:00

Haara `paakaupungit-e04-codex`, pohja `e4f2845b3a82874550481fda26528df065820232`. Uusi työ, vain e04–e14; aiemmat #70/#71-kuvatilaukset pysyvät palauteportissa. Ei generointia, R2-toimitusta, pelikytkentää tai julkaisua. Kaikki tämän työn tiedostot ja väliaineisto NASilla.

CODEX.md, PILVIOHJE luvut 1–13, liite A ja LISÄSÄÄNTÖ, erat.md sekä nimetyt sitovat resepti/spec/mallit luettu ennen tuotantoa. Dakar-mallista vain rakenne.

Tarkennus #73 luettu lähdekärjestä baa84fbb18605cc373b9feafe3168f6ba745b526: Freetown ja Sri Jayawardenepura Kotte pois. Koneluettavissa erissä e04–e14 on 95 kaupunkia ennen poistoja ja 93 poistojen jälkeen; alkuperäinen toimeksiantoteksti sanoi 96. Kolmatta poistoa ei ole keksitty. Tunis ja Antananarivo kevyinä; ei Karthagon eikä Madagaskar-lehden kannen kohteiden toistoa. Naypyidaw ja Pjongjang e10:n viimeisinä.

Aiempi Sää/Commons-rajapintaeste: 11.10.2026 robots.txt kieltää en/fi-Wikipedian, Wikidatan ja Commonsin `/w/`-polut myös `/w/api.php`-kyselyiltä (Claude-User ja Matkakirja). Näitä pyyntöjä ei tehty. Ratkaisukysymys postilaatikkoon. Omistaja hyväksyi 11.10. tavalliset robots-sallitut alkuperäiset Wikipedia/Commons-lähdesivut estettyjen API-polkujen sijasta. Kiellettyjä pyyntöjä ei tehdä. Sääriviä ei arvata eikä käsin täytetä.

| id | A | B | C | D | E | F | huomio |
|---|---|---|---|---|---|---|---|
| rabat | valmis | valmis | valmis | kesken | — | — | C0virhetta1varoitus; D työnalla |
| alger | valmis | kesken | — | — | — | — | A valmis; B työnalla; säänull |
| nouakchott | poikkeama avoin | — | — | — | — | — | Faktat koottu, kartta2WPpistetta; A ei vielä valmis |
| praia | kesken | — | — | — | — | — | A työnalla |
| banjul | kesken | — | — | — | — | — |  |
| bissau | kesken | — | — | — | — | — |  |
| conakry | kesken | — | — | — | — | — |  |
| monrovia | kesken | — | — | — | — | — |  |
| tunis | kesken | — | — | — | — | — | kevyt; ei Karthagon toistoa |

Vastaanotto ei tarkoita valmista erää, Sisältökirjurin hyväksyntää, pelikytkentää tai julkaisua.


## Tarkennus #74 — kaupalliset Commons-kuvat

Lähde c046a5646f63d5977f105edde637fd3ddc042c25, blob 2bbea68faeb4f6e8df760bbe30be9045596c6f1f, luettu 2026-10-11T16:22:14.812623+00:00. Peli on kaupallinen: rakennuksen tai julkisen taideteoksen kuva hyväksytään vain, jos kuvausmaan panoraamavapaus sallii kaupallisen käytön juuri teostyypille (Commons COM:FOP). Ei-kaupallinen panoraamavapaus ei riitä. Epävarma kuva korvataan vapaalla kuvalla tai kohde jätetään kuvattomaksi ja kirjataan RAPORTTI.md:hen. Kuvia ei ole vielä valittu; sääntö sovelletaan kaikkiin ehdokkaisiin ennen toimitusta. #73, vanhojen #70/#71-kuvajonojen palauteportti ja NAS-tallennus säilyvät.


## Omistajan nopeutusohjaus ja edistyminen

11.10. omistaja hyväksyi kolme samanaikaista työagenttia ja pyysi lisäksi apusessioita; kulutuksella ei väliä. e05/e06 faktasessiot luotu omille NAS-klooneille, toimitusjärjestys e04→e14 säilyy. Ensimmäiset komennot odottavat sovelluksen hyväksyntää: saved project writable root sisältää Documents/ChatGPT-symlinkin, Seatbelt-valmistelu epäonnistui. Pääsession kolme työagenttia toimivat.

Yhteinen NAS-lähdevarasto ja robots-tarkistava hakuapuri: valiaikainen/sallittu_haku.py; haku enintään1/s yhteisellä lukolla, pyynnöt ja SHA-256 lähdelokiin. Omistajan hyväksytty lähdekanavapoikkeus ei poista lisenssi/faktakuria eikä kaupallisia FOP-ehtoja.

Säädata tuotettu alkuperäisellä tyokalu.mjs saa -komennolla; vain verkkosyöte sovitettu sallittuun Wikipedia-lähdesivuun (valiaikainen/saa-lahdesovitus.mjs). Alkuperäinen numeropoiminta ja tarkistusalgoritmi säilyvät muuttumattomina. 8/9 saa.json syntyi; Algerin taulukko hylätty: vuosisarake685mm, kuukausien summa603mm. Alger saatiedot:null, ei tekstiin aste/mm-lukuja. saa-syote.json:ssa artikkeli rajattu kaupungin en-artikkeliin, jotta maa-fallback ei valitse muun kaupungin asemaa.

Edistyminen: varmennetut A–F-vaiheet /558 (93×6), ei käytetyn ajan arvio. Rabat A valmis; ei vielä kokonaan valmista kaupunkia tai erää.
