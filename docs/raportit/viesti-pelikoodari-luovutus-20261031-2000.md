# Pelikoodari: luovutus 31.10.2026 klo 20.00 (konteksti 35 %)

Edellinen: -20261031-1905. Muistin tila: pelikoodari-tila-20261018-aamu.md. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Worktreet: wt/proto-pelikoodari-reitti-216 (pelikoodari/reitti-216) ja wt/proto-pelikoodari-v98c (koe-valo-k4 c9455d902).

## Valmista tässä vuorossa
- **Puukorjaus ffd491927 tarkistettu:** 16/16 kuvaa kunnossa, keisari ei osu yhteenkään puunrunkoon (lokit/esikatselu-20261031-190319/c-*).
  NS yhdisti sen junaan 216 (9b7308099). PT:lle on ilmoitettu.
- **KK:n korjauslista reitti-216, kohta 1 (kamera kapeissa porteissa):** haara pelikoodari/reitti-216 9b7308099:n päällä.
  - a70bf3382 NOSTO KAUEMMAS: syynä oli räystäsnosto (13–17 m) yhdessä kulman 72° kanssa, jolloin kamera oli lähes suoraan keisarin yllä.
    Noston jälkeen kamera siirtyy vaakasuunnassa kauemmas, kunnes se on keisarin rintaan nähden enintään 45°
    (DroneNosto.NostoKulmaMax = YhtKulmaMaxUlko). Siirtymä haetaan 0,5 m:n askelin, ja kohta ei saa olla massassa ja keisarin pitää näkyä.
    Kameraväli-lokiin tuli "kauemmas". Korjausajossa suurin pitch laski 72°:sta 41°:een (lokit/esikatselu-20261031-191043).
  - e5772ddbe: noston aikana kenttä ei kapene (nostoKenttaW). Korjausajo 2 (lokit/esikatselu-20261031-193721): pitch enintään 42°,
    ja porteissa kujan pää ja eunukit näkyvät; kamera on tosin korkealla, joten keisari näkyy pienenä (rivi 6). Arkki ja video
    _tyo/pelikoodari/reitti-216/korjaus/ (arkki-c2.jpg, video-c2.mp4) lähetetty KK:lle 20.08.
  - QA: tapahtuma "sivulta <id>" sivukujan vartijan lähtiessä. Esikatselun "osumat:" EI TOIMI: kaikkialla "ei osumaa", koska
    ajonaikaiset verkot eivät ole luettavissa (isReadable false). Joko poista se tai korvaa törmäystarkistuksella tai JuoksuSokkeloMaailma-haulla.
  - Peli-testit 781/781 ja unity-tarkistus 0 virhettä (Editor-kansio vain käsin tarkistettu, esikatselu kääntyi ja ajoi).
- **Osasarja-v6 (LAV) testattu:** JuoksuOsasarja 11/11 (86 atlasta, karki 289644/289644). 1b näyttää oikealta: puun varjo jatkuu katolta
  lattialle samassa kohdassa, joten v-kääntöä ei tarvita. Parit: lokit/esikatselu-20261031-191345 (valo0) ja -194818 (valo1).
  juuri-k3:ssa on uusi symlinkki kielletty-osasarja-v6.

## Kesken / seuraava
1. **KK:n palaute kuvasarjaan korjaus/.** Kun KK tai PT hyväksyy, NS:lle merge-pyyntö pelikoodari/reitti-216 (a70bf3382 + e5772ddbe
   9b7308099:n päällä). Jos keisari on liian pieni, kokeile lähempää korkeaa kulmaa (NostoKulmaMax 50–55°) tai katsetta eteen.
2. **KK kohta 2 (harmaa teksturoimaton lattia, turkoosi nauha):** osumat eivät toimineet (yllä), joten diagnoosi on yhä auki.
   Hypoteesi: korotettu harmaa pinta on kivijalan tai reunuskiven (laji 11/18) yläpinta, kun y > 0,05 m (JuoksuLattia.shader
   rivi ~516 lattiaksi-ehto), tai avoimen varaston lattia, jonka pinnan nimeä LattiaLaji ei tunne (JuoksuV4Maailma.Lattia.cs ~77).
   Sama harmaa jalusta näkyy myös puuajon c-04/c-05/c-10 ja v6-parin b-90 muurien juurella. Turkoosi nauha on luultavasti hallin
   palkisto (JuoksuSokkeloMaailma.Palatsi.cs ~329) tai portin kannatinrivi. Varjostin ja materiaalit ovat VS:n aluetta: tarkista ennen muutosta.
3. **KK kohta 3 (nosto sivukujan eunukista): ESTE.** Avoimen palatsin verkossa (JatkaVerkko) ei synny lainkaan sivukujan vartijoita, vain
   edestä tulevia (V4Vartijapaikka Kattaa = null, JuoksuV4.cs ~438 ja verkkopolku). Rivillä ~1092 oleva sivuvartija syntyy vain
   ruudukkopolulla (o.VasenAuki/OikeaAuki). Ajossa 3 × 150 s ei yhtään "sivulta"-tapahtumaa. **Kysy PT:ltä**, lisätäänkö sivukujan
   vartijat verkkoon (risteyksen sivuhaarat), ennen kuin nosto voidaan kuvata.
4. **Leivottu valo junaan 216: VS päätti kertoimen 1** (19.5x; JuoksuLeivottuKerroin 0,75 → 1, VS tekee muutoksen). Integroi:
   valokoodi (leivonta-217 2861fbce7 / 8732a8a1c / 45b5492df, nykyään koe-valo-k4:ssä c9455d902 ilman koe-kerrointa 3)
   9b7308099:n päälle, sitten OsasarjaKansio kielletty-osasarja-v6, TaustaKansio kielletty-tausta-v87
   (_valmiit/juoksupeli-kk-lavastaja-tausta-v87-vienti-20261031, SHA a1e090c344ac), rakennukset-v88 ja muurikate-v32
   (_valmiit/juoksupeli-kk-lavastaja-leivonta-v3-vienti-20261031). Ämpärivienti JU:lle, ja PT kuittaa paketit.
   Tarkista ensin, ettei koe-valo-k4:n kerroin 3 tule mukaan.

## Huomiot
- Esikatselun linja 2 on vapaa, kun aja-korjaus2 on valmis (`pgrep -fl esikatselu.sh`).
- Käyttämättömiä tiedostoja: _tyo/pelikoodari/reitti-216/sk-korjaus.txt (S-osa ei tuottanut nostoa, koska sivuvartijoita ei ole).

## LISÄYS 20.1x (KK, omistajan päätös 18.26, Raamattu 2.177)
- **Kohta 3 PÄÄTETTY, ei kysytä:** sivukujien eunukit lisätään avoimen palatsin verkkoon (JatkaVerkko). Mittari: sivukujasta tuleva
  eunukki näkyy ajoissa (2,5 s:n sääntö), jotta pelaaja ehtii valita toisen reitin, ja lähellä hän voi väistää. Edellinen PK vahvisti 19.1x
  "sivukujaeunukit 40 % kujista". Tarkista, milloin ne katosivat verkkotasosta (vertaa ruudukkopolkuun JuoksuV4.cs ~1092,
  risteyksen VasenAuki/OikeaAuki), ja lisää verkon risteyksen sivuhaaroihin samalla säännöllä. Testi JuoksuReittivalintaTestit:
  sivuvartijoita syntyy ja ne lähtevät "sivulta".
- **KK:n vaatimus:** kaikki kolme kohtaa (kamera, harmaa lattia ja turkoosi nauha, sivueunukit) samaan arkkiin ja videoon ennen
  omistajaa. Kohta 1 on KK:n katsottavana (korjaus/arkki-c2.jpg).
