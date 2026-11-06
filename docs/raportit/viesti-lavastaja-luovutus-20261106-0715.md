# Lavastajan luovutus 6.11.2026 07.15 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0218 (git show 561e3b313:docs/raportit/viesti-lavastaja-luovutus-20261106-0218.md); sen kohdat 1 ja 2 on korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun 3 kirjausta). Ei vientejä, ei junaan. KK:lle ei ole lähetetty paria.

## Tärkein opetus
Koodi 35140432d hakee juuresta rakennukset-v118, c2-v34, muurikate-v37 ja kulmatorni-v1c. lattia25-juurissa on v126 ja c2-v40, joten kuvat-koe...kuvat-c tehtiin ilman näitä. PT:n sääntö: koejuuri-ajon yhteenvetoon rivi "404: N tiedostoa" ENNEN kuvien katsomista (aja-aukot4.zsh tulostaa sen). Lista 80 ajosta: A/lokit-404-lista.txt; PT sanoi, ettei selvitystä tarvita enempää.

## Tila
`koejuuri-aukot4` = lattia25 + 33 täytettä (suunnitelma4.json) + paketit T7:n arkistosta (rakenna3.py). Ajo kuvat-d, L1, 35140432d, 5 kuvaa, katsottu 2000 px:n koossa, ei täysikokoisina. 404: 5 tiedostoa (A/kuvat-d/404.txt), rakennukset, katteet ja tornit latautuivat.
- (325,1; 564,0): matala on oikein, jalusta peittää, pihaa ei näy. PT hyväksyi matalan kuvaan asti; tulos kerrottu PT:lle. Jää: harmaa sumea kaista muurin takana ja oikealla, punainen pystyviiva täytteen oikeassa päässä.
- (-251,8; -126,9): punainen kaista EI ole täyte vaan lattia25:n oma V4_red, pala 1-1, x -260...-238, y 4,0-5,21, z noin -124,3, 2,5 m täytteen edessä. Täytteen yläpää on nyt 4,43. Kaistan kolmioita ei ole tutkittu. Täytteen omaa friisiä ei ole kuvasta arvioitu: kuvasta aiemmin luettu "friisi jatkuu" on todistamatta.
- (-155,6; 283,2): näyttää väärältä: friisi ohut, kahtena rivinä, keskellä seinää, punaista 0,75 m sen yläpuolella. Yläpään lasku avaisi arvion mukaan raon räystään alle: ei tehty.
- (54,8; 451,2) ja (154,7; 419,8): kuvat eivät näytä täytettä, koska no-puolella on V4_red 1,3 m edessä (kamera4.py). Selvitä, onko täyte tarpeen tai väärällä puolella.

## Seuraajan järjestys
1. Mikä on (-251,8):n kaista ja kuuluuko se pois, ennen kuin kuvaa kysytään KK:lta. Sen jälkeen uusi kamera täytteen eteen (kamera4.py: no-puolella näkyy 2,5-6 m:stä).
2. (54,8; 451,2), (154,7; 419,8): selvitä mallista, mitä edessä on.
3. (-155,6): friisin mittakaava ja yläpää; katso täysikokoisena.
4. Vanhat kuvat ovat ilman rakennuksia, joten kaikki aiemmat arviot katsottava uudestaan aukot4:llä: a5 (friisin 8 px:n porras ja väri, täysikokoisena), c-ovi-sali, (154,5; 427,8). Rakenna3 kieltäytyy olemassa olevasta juuresta: seuraava nimi aukot5, tee_sk3.py:n ja zsh:n nimet ja kuvakansio samalla. Vuoro JU:lta.
5. Lisäysten seinät: 14 ehdokasta, 19 aukkoa, lista KORJAUS.md. 25-28 m:n aukot (-100,2; -105,4; -163,5; -113,1) kuvasta ennen seinää.

## KK:lle ratkaistavaa (ei vielä kysytty; välitä PT:n kautta)
Epäselvät: (-108,1; 396,1), (108,3; 473,1), (-166,0; 431,6). Jos viimeinen on oviaukko, kerro PK:lle.
Ei seinää säännöllä: (1,5; 0,9) päärakennus; (36,3; -219,8), (-94,3; -15,9), (-94,5; -20,8) portit; (125,0; 338,8) raunio. Rajaviesti jää.

## Avoimet ennallaan
- Kartta ja rajat ajaa PK viennin jälkeen; kerro versio. (325,1):n viereen jää 3,8 m rajaa (325,0; 563,4).
- (154,5; 427,8):n eteläkulman 0,9 m rako: ei listalla, ei tehty.
- Ei-friisitäytteet (98,0; 356,6), (102,2; 202,9) nousevat 1-2 m naapurin yli: ei käsitelty.
- Ikkunaristikoiden läpi näkyy kauempi katto c-ovi-salissa: ei tutkittu, tarkista aukot4:llä.
- Lod1/2-täytteitä ei ole katsottu.

## Työkalut (A/), uudet
yla_tutki.py (täyte vs naapurin taso), sade251.py, kamera4.py (säteet, ei rakennuksia eikä pelin kappaleita; takapintoja ei erotella), rak_piha.py (keskeneräinen, käytä rakennukset.json:n paikka_pohja-kenttää).
