# Linssipariteetti web → natiivi 29.9.2026 (Linssiseppä, 5 Opus-vertailua)

Web origin/main 30c244c49, natiivi proto master cbf78690. Kaikki 9 webin rekisterilinssiä ovat natiivissa
(Karttapallo = natiivin peruspallo, ei puutetta). Radio (Linssiseppä 2) ja ISS-kyyti/avaruuskävely rajattu pois.
Koko: S alle 100 riviä, M 100–400.

## Astronautin kamera (valittu seuraavaksi eräksi)
1. M ISS-seuranta heti avauksesta puuttuu (web satelliitti-avaruus.js avaaAvaruusnakyma; natiivi AstronauttiLinssi Avaa/Paljasta,
   Astronauttimatikka.PyorimistaAstettaS käyttämättä). ISS voi olla pallon takana → kyyti ei löydy.
2. S ISS-merkki: web ISS_PIIRROS_SVG + kertasyke, natiivi valkoinen hehkupiste myös pallon reunan ulkopuolella.
3. M Auringon sivuvalo (varjo 0,55 + valoreuna) puuttuu (Avaruus.cs).
4. M Avaruussumu UI-kerroksessa pisteiden ja nimien päällä, ei piilossa kuvan ajan (Avaruussumu.cs).
5. S Zoomirajat: web max(0,1 R; 0,084 × avaus)…1,3 × avaus; natiivi PalloKierron rajat (Astronauttimatikka.Zoomirajat käyttämättä).
6. S Tähtitaivas: pölykerros ajautuu 0,58°/s, koko 1,3 (web 0,85, paikallaan, 2,2 px katto).
7. S Paljastus ei odota pilviä. 8. S Selitteen otsikkorivi/leveys (sanaraja, fontti 16→11). 9. S Nimet versaalein + häivytys.
10. S Lisätiedot: NASA-tekijä, koordinaatit N/E. 11. S #3609-jäännös: LuentaEste vain Puhuu-vaiheessa (Odottaa puuttuu).
12. S Muut äänet (kertoja/lukija) eivät vaikene avatessa. 13. S Minipulun kortin arvonimi.

## Ihmisen matka
1. M Vanhan väestön ja varhaisten retkien kalvot (VirtaLaskenta laskee Vanha/Retki, kukaan ei piirrä).
2. M Kello matkamittarina (rullaus, sumennus, naksahdus, napautus = tauko) — yhteinen Keksintöjen kanssa.
3. S Loppukuva "maailma" (Esitys.AjaAlueeseen null-laatikko). 4. S Pulun loppurepliikin ääni (livia-ihmisen-matka-4.mp3).
5. S Aloituskortin luenta (esittely.mp3). 6. S Musiikki jää puoleen tasoon aikaselaimen jälkeen.
7. S Avauksen harso ja tähdet. 8. S Kehys liukuu, ✕ mustan avauksen päällä. 9. S PitoMin aikahypyn jälkeen (1 rivi).
10. S Linssiraidan väistö kertojan alla. 11–15. S nostokortin konteksti, chatin kysymykset lisänostolla, kortin asu,
    reunavinjetti/blur, muistiin tallennus avauksen aikana.

## Keksinnöt
1. M Kello matkamittarina (sama kuin yllä). 2. S Havainnekuva häipyy kameran lähtiessä. 3. S Selauksen jälkeen Jatka
(lamput, 4,6 s tauko, luenta). 4. S Karuselli ennakoi 2 s. 5. M Paneelin raahaus/koko/muisti. 6. S 1873-välinäytöksen
Pulu-kuplat ja rivit luennan tahdissa. 7. S Kaksoispysäkin kaksi muotokuvaa. 8. S Vedon esikatselu. 9. M Tiedeliitteen
seuranta ja sulku ohinapautuksella. 10. S Musiikin väistö ja Pulun kuuntelu. 11. S Pulu piiloon avausruudun ajaksi.
12. S 1873-kortin rajaus (asento). 13. S paper-ääni. 14. S Havainnekuva-selite suurennoksessa.

## Karttalinssit
Topografia: S koko maapallo katsottavissa (ZoomiKatto tyhjä, maan rajat voimassa) — suurin; S nimet ja joet reliefin
päällä; S Pulu ja kuplat pois; S lähdeteksti. Vesistöt: S pohja ja pelikartta (natiivi ajaa koko Topografian), S jokinimien
kauno. Vertailu: M kortin pienoiskartta, S arkin tekstit. Maiden tiedot: S kalusteet väistyvät, S Maiden lehdet -nappi,
S maakyltin järjestys.

## Linssimoottori
1. S Löytöilmoitus "Uusi linssi" + Livian ilo (Linssiomistus.Myonsi ilman kuuntelijaa) — suurin. 2. M Portti Pulun
puheelle ja chatille linssin aikana. 3. M Pillerivalikon Linssit-lista (Natiivi-UI). 4. S Linssipuheen taso ja väistö.
5. S Reitit näkyvät porttilinssien päällä. 6. S Uusi peli ei sulje linssiä. 7. S Päiväkirjan kutistus maatiedoissa.
8. S HIOMASSA-ryhmä (ei näy tänään). 9. S Avausvahti. 10. natiivi edellä (#3611).
