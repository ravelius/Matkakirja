# Natiivisepän luovutus 5.11.2026 klo 16.45 (PT:n pyynnöstä, lepo)

Korvaa -1620:n jonon. Muu -1620 (intron ja väritason kuvaus), -1610 ja -1558 pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Lue Raamattu 7.47:n rivi. Remote päälle, T7-Monitor uudelleen (pid 58484, kopioi.log vain ALOITUS 13.28; ei poistoja ennen PT:n lupaa).

## Linjaus
Omistaja 16.41 (PT:n välittämä): "keskitytään vain pariisin 3d rakennuksiin". PT: ei uusia kokeita tyhjästä pohjasta tai laskusta. 3D-ajot menevät JU:n jonossa edelle. Lepo, kunnes JU ilmoittaa ajot tai PT pyytää.

## Jono
1. JU:n ajot natiiviseppa-matka-379991bd6 ja natiiviseppa-intro-379991bd6 (jonossa 3D-ajojen jälkeen). Katso, kerro viat KK:lle: KK näyttää intron omistajalle vasta sitten (KK 16.4x).
2. Muut (n-1km-85:n etuala, kolmio, sumeus) vain, jos linjaus purkautuu.

## Haara: natiiviseppa/saapuminen-porras-219 379991bd6
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/saapuminen-porras-219. tarkista.sh 0 virhettä, ei nähty ajossa. Liiku 99748962f on yhä eri haarassa (kierto-koe), NUI:n kyltit-219:n uudet commitit eivät ole mukana.

## Intro 52e3d2940 katsottu (i03, i07, lokit; muut kuvat katsomatta), kerrottu KK:lle ja PT:lle 16.4x
- Rakennukset kuvan keskellä. Notre-Dame noin 180 px leveä i03:ssa, laskin 300 px. Täyttymisen arvioi KK.
- PARIISI, RANSKA -rivi poissa. Täyttyi.
- Kyltit haalenevat, kursiivinimet jäivät, Hôtel Matignon osui kirjaimiin. Korjaus d31fc8676: Nimikerros.OtsikkoVaistaa. Oletus Nostot-kerroksesta oli väärä, ja miksi `ui lentopiilo` vei nimet -1510:ssä, jäi selvittämättä.
- Tyhjä pohja: väritaso vaihtui yhä laskun alussa (4,14 s pallo 0 %, 0 laattaa). Syy: KohdeTiedossa oli ehdolla !linssi, mutta oikea matka tulee SaapumisLaatatSilta.MatkaAlkoi:sta linssi: true. Korjaus d31fc8676: kutsu suoraan MatkaAlkoi:ssa. 379991bd6 rajaa sen Pariisiin (KK 16.4x, 2.210).
- Lokista katsottava: "väritaso: kohdemaa FRA lähdössä", "väritaso: FRA" heti lähdössä, pallo % ja laatat lähdössä ja laskun alussa. Riski ennallaan: katkos voi siirtyä lähtöön.
- Portaat 5282b9fc4 voivat olla turhat: vertaa `komento maasto saapumisennakko pois` -ajoon ennen poistoa (ei nyt, linjaus).
- Sumeus ja portaikkoinen etuala auki. Oletus, EI varmistettu: lähdekuva 2,5 m/px kovin reunoin suurenee etualalla. Lokissa kuvat "pelin ruutu 640×480".
- Notre-Damen tornit EIVÄT ole vika (KK 16.5x): leveneminen ja korkeus ovat omistajan pyytämää liioittelua (3.11. 22.11, 4.11. 10.22, hyväksytty 4.11. 11.25), mittari on G-kuva, ei oikea rakennus. Mitattu: tornipari levenee mallissa 15–19 %, pelissä +15 %, joten kamera ei vääristä mallia. Ei suoristuskoetta.

## Liiku 99748962f katsottu (l2 kuvana, l0, l4, l5 vain numeroin), EI vielä kerrottu kuvana KK:lle
PUUTE 0. l2-ranska: reitit ja renkaat ruudussa, rengas ei PARIISI-nimen päällä. l4-paluu-valmis eroaa l0-lepo:sta 1,3 % kuva-alasta, l5 on sama näkymä kuin l2. Kuvia l1, l3, l4, l5 ei ole katsottu silmin. Merellä raidoitus näkyy l2:ssa yhä (vasen yläosa): iPad-vertailu EI tehty. Lippu on Ranskan koillisrajalla, KK:n mukaan odottaa Pariisia. Haaraa ei yhdistetty.

## Muuta
Zsh: `echo ====` ja `*.uss` ilman osumaa kaatavat komennon. tarkista.sh muuttaa aina tyylikirjan kolme tiedostoa: git restore ennen committia.
