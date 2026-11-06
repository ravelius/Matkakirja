# Lavastajan luovutus 6.11.2026 07.29 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0715 (git show 47a1ff4ff:docs/raportit/viesti-lavastaja-luovutus-20261106-0715.md); sen Tila ja Seuraajan järjestys on korvattu tällä, Avoimet ennallaan ja KK:lle ratkaistavaa pätevät edelleen. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun 4 kirjausta). Ei vientejä, ei junaan. KK:lle ei ole lähetetty paria.

## Opetukset
- Säteet (kamera4.py, sade251*.py) eivät näe osasarjan muureja eivätkä muita instansseja, ja kuvan kamera on maa + y (TarkasteluPaikka, MaanPinta), ei y. Säteiden syvyyksiä ei voi verrata kuvaan. Seinä kuvassa voi olla osasarjan: `kielletty-osasarja-v8/ladonta.json`, polut.
- Oma päätelmä "täyte on turha, koska se on muurin takana" oli väärin: PK:n kartta kumosi sen. Ensin pelaajan puoli, sitten päätelmä.
- JU palauttaa esikatselun ilman riviä "mitä tämä ratkaisee" ja yli noin 5 kuvan ajon; odota "ESIKATSELU NYT".

## Tila
`koejuuri-aukot5` = aukot4:n 33 täytettä (suunnitelma4.json) - kaista (tee_aukot5.py: 0-1 lod0 1, lod1 2, lod2 2; 1-1 lod0 2 kolmiota). Ajo kuvat-e, L2, 35140432d, 5 kuvaa, 404: 5 tiedostoa kuten kuvat-d. Katsottu 2000 px:n koossa, ei täysikokoisina.
- Kaista TODISTETTU: e--251-sama.png, kaista pois, friisi ehjä. Oli tausta-v115:n V4_red-jäänne (x -260,35...-238,35, y 4,0-4,5). Poistettu vain koejuuresta; sama v115- ja v124-juurissa, viennissä ei tarkistettu. Länsipuolen pala x < -260,4 jäi.
- Seinän alaosassa vaaleampia läikkiä d-kuvaan nähden; linja vaihtui L1 -> L2, ei tutkittu.
- Pelaajan puoli (PK, kartta, ei pelikuvia) on kaikissa täytteen `no`:
  - (-251,8; -126,9): noin 1 m:n kaista täytteen ja osasarjan muurin (este z -125,5...-124,0) välissä, läpikulku lännestä itään. Täyte näkyy, tarvitaan, ellei kaistaa suljeta.
  - (-157,1; 456,3): 0,8 m:n umpikuja, x -159...-152, sisään lännestä, muuri z 454,0...455,5. Sama.
  - (54,8; 451,2): x 54,0...54,75, z 450...453, sisään +z-päästä. Takana este x 55...61,5.
  - (154,7; 419,8): tasku x 155,05...156,5, z 418...421, sisään -z-päästä. Takana 0,5 m rako, sitten este x:ään 149,2.
- Takakuvat (e--251-takaa, e--157-takaa, e-54-takaa, e-154p7-takaa) on otettu pelaajan vastakkaiselta puolelta, joten ne eivät ole pelaajan näkymä. Täytteen no-puolen pintaa ei ole kuvattu yhdestäkään näistä neljästä. PK ei tiedä, mahtuuko keho noin 1 m:n kaistalle.

## Seuraajan järjestys
1. Kuvat pelaajan puolelta aukot5:llä (JU:lta, enintään 5 kuvaa, rivi "mitä tämä ratkaisee"): kamera kaistalla 0,5 m täytteestä, katse pitkin kaistaa tai loivasti täytteeseen, koska eteen ei mahdu. Friisi ja jalka arvioidaan näistä.
2. Tarvitaanko paljaan taustan korjaus (54,8) ja (154,7): näkyykö tausta esteen yli kartan kuljettavalta puolelta (x >= 61,8; x <= 149). PK: kartta ei kerro sitä. Rako (154,7):n takana: kartta tuntee täytteen vasta uudelleenajossa.
3. (-155,6; 283,2): friisin mittakaava ja yläpää, katso d--155p6_283p2.png täysikokoisena.
4. Vanhat kuvat ovat ilman rakennuksia: a5 (friisin 8 px:n porras ja väri, täysikokoisena), c-ovi-sali, (154,5; 427,8) uudelleen. JU karsi ne aukot5-ajosta. Kamerat: sk-aukot3.txt.
5. Lisäysten seinät: 14 ehdokasta, 19 aukkoa, lista KORJAUS.md. 25-28 m:n aukot (-100,2; -105,4; -163,5; -113,1) kuvasta ennen seinää.
Uusi juuri: rakenna3.py kieltäytyy olemassa olevasta nimestä, seuraava aukot6. Kaistan poisto on tee_aukot5.py:ssä, ei rakenna3.py:ssä: kopioi se mukaan, tai kaista palaa.

## Työkalut (A/), uudet
tee_aukot5.py (juuri + kaista pois + sk + zsh), osasarja_vs_taytteet.py (osasarjan polku täytteen rinnalla), kaista251c.py (samassa tasossa olevat kolmiot), sij251.py (instanssit juuren json-tiedostoista), sade251c.py (säteet kaikkiin paketteihin, ei instansseja).
