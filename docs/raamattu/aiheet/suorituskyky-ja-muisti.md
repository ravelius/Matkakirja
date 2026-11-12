# suorituskyky-ja-muisti · vastuu NS · tarkistettu 12.11.2026

TAVOITE: Peli liikkuu sulavasti ilman nykäyksiä ja näyttää niin hyvältä kuin laite jaksaa. Levossa se ei kuumenna laitetta eikä kuluta akkua turhaan, eikä se kaadu muistin loppumiseen.

SÄÄNNÖT:
1. Kehystahti pysyy tasaisena; yksittäinenkin pudotus näkyy nykäyksenä. [R-6.10]
2. Täysi ruudunpäivitys on käytössä vain, kun jokin liikkuu (kosketus, kamera, lento, linssi, käyttöliittymän animaatio). Puolen sekunnin levon jälkeen tahti laskee 30 fps:iin, ja kun mikään ei muutu, ei piirretä lainkaan. [R-6.14]
3. Kuumailmapallo piirretään 40 fps:llä myös viileänä, ja sen lämpöhidastus alkaa jo lämpimänä. [R-6.14]
4. Peli lukee laitteen lämpötilan ja virransäästön. Kuumana tahdin katto on 30 fps ja kuvaskaala, reunanpehmennys ja hehku kevenevät, kriittisessä lämmössä katto on 20 fps; virransäästö vastaa kuumaa. Laatutasoa ei vaihdeta kesken näkymän. [R-6.14] [R-6.15]
5. Grafiikka käyttää kaiken, minkä laite kantaa: M-sarjan laitteilla on korkein laatutaso, vanhemmat saavat kevyemmän automaattisesti. [R-6.15]
6. Muistibudjetti lasketaan ajon aikana laitteen vapaasta muistista turvamarginaalilla; kiinteää näkymäkohtaista rajaa ei ole. [R-6.15]
7. Kehittäjäkäännöksen muistivahti hälyttää pienen iPadin rajalla myös isolla iPadilla. Muistiajossa yli 4 080 Mt, alle 0,5 Gt vapaata tai muistin loppumiseen kaatuminen pysäyttää junan. [R-9.4] [R-9.13]
8. Järjestys on ulkonäkö, sitten nopeus, sitten muisti. Rakennusvaiheessa muistia ei mitata eikä työtä hylätä muistin vuoksi; muisti mitataan kerran valmiista kokonaisuudesta ja ennen julkaisua. [R-2.207] [R-2.208] [R-2.209]
9. Muistimäärät luetaan pelin omasta muistilokista, koska profilointikuva voi jättää osan pois. Simulaattori ei näe vapaata muistia, joten muistikorjaus todennetaan iPadilla. [P-261107-3] [R-12.18]
10. Nopeutta verrataan laitteella vuorottelevin vierekkäisin jaksoin viileästä laitteesta alkaen, koska laite hidastuu lämmetessään jo ennen kuin lämpötila-arvo muuttuu. [P-260930-1]
11. Kevennys, joka voi muuttaa kuvaa, tehdään vain, jos vertailupari ei näytä eroa. Ruudunpäivityksen tai kuvaskaalan muutos kelpaa vasta uuden laitemittauksen jälkeen, eikä liikkeen sulavuus saa heiketä. [R-6.14]

EI VIKA:
- Kuumailmapallo pyörii 40 fps:llä viileälläkin laitteella.
- Levossa oleva näkymä ei piirrä uusia kuvia.
- Muistiraja ei hylkää keskeneräistä karttaa tai tasoa.

TEKOTAPA:
- Muistimäärät: muisti-tarkka.log, U- ja T-rivit. Simun muistivahti: julkaisija-tyokalut/simu-muistivahti.zsh.
- Lämpö ja akku: kymmenen minuutin pelijakso laitteella, LampoMittari.
- Muut kortit: kamera (ruutuaika liikkeessä), testit (sulavuuden todistus), lataus-ja-kaynnistys (esilataus kuumana), mallit-ja-3d (mallien muistikorjaus), laitteet-ja-simulaattorit (iPad-ajot).
