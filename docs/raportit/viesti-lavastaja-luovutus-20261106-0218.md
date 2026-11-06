# Lavastajan luovutus 6.11.2026 02.18 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0050 (tässä haarassa) ja -0020 (git show df9ca99cc:docs/raportit/viesti-lavastaja-luovutus-20261106-0020.md). Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun 3 kirjausta). Ei vientejä, ei junaan. KK:lle ei ole lähetetty paria.

## Tila
`koejuuri-aukot3` = lattia25 + 33 täytettä (suunnitelma3.json, rakenna3.py). Kuvat kuvat-c (L1, 35140432d), kaikki 5 katsottu 2000 px:n koossa, ei täysikokoisina. Ajon loki: rakennukset-v118, ei v126; tarkista ennen KK:n paria, onko tarkoitus.
- Tehty: 8 ovea lehden levyisiksi (c-ovi-sali: ei rakoa, täyte ei näy; kuvattu 1/8). Friisi 15 täytteessä, lod0. Kivijalka kaikissa, lod1/2 punainen maahan asti, koska kivireunusta ei niissä ole.
- Lod1/2-täytteitä ei edelleenkään ole katsottu.

## Seuraajan järjestys
1. **(325,1; 564,0): matala muuri on väärä.** Se paljastaa keskeneräisen pihan (tumma lattia, sinertävä tausta ilman taivasta). Palauta suunnittele3.py:ssä täyskorkeaksi (yla noin 9,2, ei `kansi`), jalka 1,20 pysyy. rakenna3.py:n kansi-haara ohittaa punaisen, joten poista kansi-lippu. Syy: täytelinja on tausta 3-4:n kiilaseinän tasossa (KORJAUS).
2. **(-251,8; -126,9):** täytteen punainen yläosa näkyy friisin päällä: yläpää friisin yläreunaan 4,42. Tarkista muista friisitäytteistä, onko sama (yläpää yli naapurin).
3. rakenna3.py kieltäytyy olemassa olevasta juuresta: uusi nimi `koejuuri-aukot4`, tee_sk3.py:n ja aja-aukot3.zsh:n nimet ja kuvakansio samalla. Vuoro JU:lta: rivi "mitä tämä ratkaisee", enintään noin 5 kuvaa.
4. **a5:** friisi porrastuu noin 8 px rajalla ja väri vaihtuu. Friisin UV ja korkeus tulevat lähimmästä kolmiosta (rakenna3.py, yv); katso täysikokoisena ennen korjausta.
5. **Lisäysten seinät:** täytelinjat haettava 14 ehdokkaalle, 19 aukkoa, lista KORJAUS.md. 25-28 m:n aukot (-100,2; -105,4; -163,5; -113,1) kuvasta ennen seinää.

## KK:lle ratkaistavaa (ei vielä kysytty; välitä PT:n kautta)
Epäselvät: (-108,1; 396,1), (108,3; 473,1), (-166,0; 431,6). Jos viimeinen on oviaukko, kerro PK:lle.
Ei seinää säännöllä: (1,5; 0,9) päärakennus; (36,3; -219,8), (-94,3; -15,9), (-94,5; -20,8) portit; (125,0; 338,8) raunio. Rajaviesti jää.

## Avoimet ennallaan
- Kartta ja rajat ajaa PK viennin jälkeen; kerro versio. (325,1):n viereen jää 3,8 m rajaa (325,0; 563,4).
- (154,5; 427,8):n eteläkulman 0,9 m rako: ei listalla, ei tehty.
- Ikkunaristikoiden läpi näkyy kauempi katto c-ovi-salissa: ei tutkittu, ei täytteen asia.

## Työkalut (A/), uudet
suunnittele3.py, rakenna3.py `<juuri> <suunnitelma>`, tee_sk3.py, aja-aukot3.zsh `<linja> <sha>`, ovi8.py (ovien leikkaukset), friisi_tutki.py, jalka_tutki.py, harja325*.py, lisays_arkki.py, lisays_luokka.py.
