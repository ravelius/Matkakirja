# Lavastajan luovutus 6.11.2026 07.44 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0729 (git show 918692e8a:docs/raportit/viesti-lavastaja-luovutus-20261106-0729.md); sen Tila ja Seuraajan järjestys on korvattu tällä, Opetukset ja Työkalut pätevät. -0715:n (git show 47a1ff4ff:docs/raportit/viesti-lavastaja-luovutus-20261106-0715.md) Avoimet ja KK:lle ratkaistavaa pätevät edelleen. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun 4 kirjausta). Ei vientejä, ei junaan. KK:lle ei ole lähetetty paria. Luovutus kontekstirajan takia (25 %).

## Opetukset
- Ennen päätelmää "täyte on väärin" katso naapuri samasta kuvasta: (-155,6):n ohut friisi oli naapurin oma.
- Yleisnäkymä ei riitä "friisi puuttuu" -väitteeseen: tarkista rakenna5.log (friisi / ei friisiä). Oma ensilukuni (54,8):sta oli väärä, loki korjasi sen.
- Kamera: yaw 0 = +z, 90 = +x, pitch negatiivinen = ylös. Kuvan oikea reuna, kun katsotaan +x: -z. Näkyvä leveys fov 70:llä noin 1,87 × etäisyys.

## Tila
`koejuuri-aukot5` ennallaan. Ajot kuvat-f ja kuvat-g tehty (L1, 35140432d, 5 + 5 kuvaa, 404: 5 samaa tiedostoa). Katsottu 2000 px:n koossa, liitokset rajauksina täysikoosta. JU:lle on ilmoitettu LUKKO VAPAA kummastakin.
Pelaajan puolelta (kuvat-f):
- (-251,8): kaista poissa, friisi ehjä. Jalkaa ei näy; syy ei mitattu.
- (54,8; 451,2): friisi ja jalka näkyvät. Friisin liitosta naapuriin ei voitu arvioida tästä kulmasta.
- (154,7): friisi oikean kokoinen. Jalkaa ei näy. Vapaa pää: ks. PK:n vastaus alla.
- (-157,1): VIKA: ei friisiä (rakenna5.log), ja täyte on tummempi kuin naapuri. Naapuri ei ole samassa tasossa, joten rakenna3.py ei löydä friisiä.
kuvat-g:
- (-155,6): friisi on naapurin oma, täyte jatkaa oikein. Puuttuu naapurin sininen-vihreä-keltainen alavyö; liitoksessa noin 13 px porras; täyte tummempi. Yläpäätä ei saa laskea ilman todistusta: alempi kattotaso puuttuu täytteen kohdalta (päätelmä kuvasta).
- a5 (216,0; 207,2): friisin kuvio katkeaa liitoksessa, noin 13 px porras, täyte tummempi. Punainen pystyviiva friisin läpi, syy auki; samanlainen kirjattu (325,1):stä.
- (154,5) ja ovi-sali: kunnossa.
Sama tiheä friisilähde (friisi_uv.py, v/m 5,4-10,9) myös (-189,4), (-188,8), (-188,5), (-151,5), (-136,2): näitä ei ole kuvattu.

## PK:n vastaus (154,7):stä (laskettu kartasta ja pinnoista, ei katsottu pelistä)
Pelaaja ei pääse taakse: tason 1 rajaus estää ruudut x 149-156,5, z 421-426,5, mutta se ei ole seinä. Lattia jatkuu pinnoissa x 149,5-155,75, z 418-426,75. Näkyvä rako: täytteen pää x noin 155,0, seinä x noin 155,75-156, noin 1 m, z noin 421. Pelaaja näkee raon läpi ja pysähtyy näkymättömään rajaan. Täyte ei pysäytä ketään, se vain peittää. Rako sulkeutuu vain, jos täyte jatkuu seinään asti. Tätä ei ole vielä kirjattu KORJAUS.md:hen eikä korjattu.

## Seuraajan järjestys
1. koejuuri-aukot6 (rakenna3.py kieltäytyy olemassa olevasta nimestä; kopioi kaistan poisto tee_aukot5.py:stä, tai kaista palaa):
   - (154,7): täyte seinään asti z noin 421:n kohdalle. Koordinaatit kartasta ja kuvasta, tarkista.
   - (-157,1): friisi, lähde naapurin friisi, joka ei ole samassa tasossa; korkeus kuvasta ja mallista. Väri.
   - a5: pystyviivan syy ensin (sama selittänee (325,1):n), sitten liitos.
   - (-155,6): alavyö, jos naapurin materiaali löytyy.
2. Rikkinäinen punainen levy ja kiila noin (-153; 290) (g--155-pohjoinen oikea reuna): täytteen vai mallin? Sama kamera ilman täytteitä: -162.4 1.7 297.0 89 0 70, koejuuri-lattia25.
3. Kuvat JU:lta (enintään 5, rivi "mitä tämä ratkaisee", tee_sk5g.py mallina). Tiheän friisin 5 muuta täytettä vasta, kun yllä on tehty.
4. Paljaan taustan näkyvyys (54,8) ja (154,7) kartan kuljettavalta puolelta (x >= 61,8; x <= 149). Kartta tuntee (154,7):n täytteen vasta uudelleenajossa.
5. Lisäysten seinät: 14 ehdokasta, 19 aukkoa, lista KORJAUS.md. 25-28 m:n aukot (-100,2; -105,4; -163,5; -113,1) kuvasta ennen seinää.

## Nähty, ei täytteen asia, ei tutkittu
(-157,1): oranssit piikit taivasta vasten. (54,8): lattia kahtena päällekkäisenä kerroksena; lehvästöä räystäiden välissä. (154,7): portaikkomainen punainen ääriviiva taustalla. g--155: tummat kovareunaiset suorakaiteet naapuriseinällä, torni jonka päädyssä näkyy taivas, ruskeat piikit. Kaista: sama jäänne v115- ja v124-juurissa.

## Työkalut (A/), uudet
tee_sk5f.py, tee_sk5g.py (kameralista + zsh aukot5-juureen; 5g kirjoitti myös lokia, älä aja uudelleen), kirjaa_g.py (kirjaus, älä aja uudelleen), friisi_uv.py (friisin lähdekolmio ja UV-tiheys kaikille täytteille).
