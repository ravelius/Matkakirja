# Pelikoodari: luovutus 4.11.2026 – KK 06.20:n tehtävät, oikean reitin ajo kirjoittamatta

Korvaa tiedoston -0550. Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/.

## SEURAAVA TYÖ 1: KK 06.20 kohta 2, oikean reitin Mac-ajo (ruudut KK:lle, tulos PT:lle; PT: ennen junaa)
Tilaus koko tekstinä: `lokit/pk-muistipiikki-219/TULOS.md`, osio "KK 4.11. klo 06.20". Alku kujalta, botti ovesta juhlasaliin ja ulos, maali niin kaukana, ettei lopetus käynnisty kierroksella, 6 kierrosta, kesto.py. Kirjaa juoksuajat ja kameran korkeus koko ajalta. Katso, poistuuko katto "samalla hetkellä, kun keisari menee sisään" (2.177) vai näkyykö läpikuultava–läpinäkymätön–pois-sarja. Katso myös muut ovet.
Tehtävä: uusi kansio `_tyo/pelikoodari/peitto-reitti/` mallina `peitto-be56/aja.zsh`, runko de60baf01 (ei be56:n muutoksia), JU:n vuorolla.
- **Pakollinen `ui juoksupeli taso 0`:** tason ollessa päällä `palatsi alku` ja `maali` ohitetaan (JuoksuV4.cs:593 ja AsetaMaali). Tämä oli virheeni sk-ys:ssä.
- **Ei `palatsi kopiot 1`** muistia varten; Mac-tallenteissa se on ollut, ei vaikuta tähän. Saa jättää pois.
- **Juhlasalin ovet (avoimet-sijoitus.json):** keski (-147,56; 420,0), S (-147,24; 411,01), N (-147,87; 428,99), E (-141,44; 420,22), W kiinni. Verkossa on S–N-läpijuoksu. Vanha xf-alku -147.24,409.01 on heti S-oven ulkopuolella, joten sukellus laskeutui saliin.
- **Riski:** botti kulkee lyhintä reittiä; kuja-75 (x noin -139) voi ohittaa salin. Reittiä ei ole laskettu. Lokista "salin katto … keisarin halli 0" näkee, menikö botti saliin. Jos ei mene, siirrä alku tai maali ja aja uudelleen. Maali voi olla lähellä N-ovea, jos matkaa on enemmän kuin kierros ehtii (noin 7 m/s).
- **Taso 0 aloittaa korkealta (y 14,5, syy hakematta):** alku niin kaukana ovesta, että laskeutuminen loppuu ennen ovea (noin 3 s, 20 m).
- Sama aukio: "kirkas vino alue" ohitusajosta, jos kuvaan osuu; muuten erillään.

## SEURAAVA TYÖ 2: rivi "OLESKELU AJETTU" (JU)
KK 05.46: be5632bdb ei junaan ennen tätä. `lokit/pk-muistipiikki-219/oleskelu-be5632bdb-1{,-xf}/`: xf valmis 06.14, OK huippu 3843 Mt, raja 4080, varoituksia 0, muisti-tarkka.log tyhjä → muistivahti.log. Sali 1 oli 06.14 kesken. Katso kaikki kuvat (Puyi salissa koko ajan?), `oleskelu.txt`, `hae.log`, vaiheet.txt. Riskit -0550:n mukaan: reitti etenee taustalla, varaston paikka ei mitattu. Tulos KK:lle PT:n kautta.

## Sen jälkeen
- **KK kohta 3:** arvio ylityksen piilotuksesta (reitti ei muutu, 2.177 kieltää oviaukon alituksen, 218x:n kattoraja huononsi). Suunta: näkölinjan peittävät rakenteet pois näkyvistä kuten katto sisääntulossa. Kulu ja riski KK:lle, **ei toteutusta ennen kohdan 2 lukua.** Ota huomioon: ys-kohta on tason alku ja toistuu joka uudelleenaloituksessa.
- **Muurin todistus uudelleen KERRAN (PT 06.2x):** kun LAV ilmoittaa koejuuren valmiiksi (porras, täytöt, puut, lovet). LOD1–2-vaihto ja lähikuva samaan ajoon asetetulla kameralla (botti ei mene muurille; LAV:n kamerat -36,-335 ja -40,-352). Malli `muuri-koe/todistus/`, täsmäytys ruuduittain kameran paikasta. Tulokset `muuri-koe/TULOS.md` loppu. Kiilojen syy ei ole muurin este.
- **cb8b1f06c:n muisti junan rungolla ilman kopiot-kytkintä** mittaamatta (`lod-korjaus/TULOS-muisti.md`), mittaa-juoksu.zsh korjattu. Ajo vasta, kun runko on päätetty; samaan junaan muurin kanssa.
- **Seuraavaan ohitusajoon, ei omaa jonoa:** -0550:n kohdat (maljakon kantaja lähikaistalta, palvelija käännöksen jälkeen, uusi Palvelijatar, muurikorjaus, kirkas vino alue). Palvelijalippu kiinni.
- Kerrottu KK:lle ja PT:lle: LOD, peitto, muuri, ys-oikaisu. Joki VS, kaide LAV; ei minun.

Haarat: arkihahmot-218 01e3bc89f, kuvarunko palvelijat-kuva-218 349e8f8db, lod-diag-218 a368fdf29, muuri-todistus-219 37f46a2da, tallenne-be56 de60baf01. Viestit KK:lle suoraan muuri- ja peittoasioissa, be56 PT:n kautta.

## Lisäys ennen nollausta: KK muurista (korvaa "Muurin todistus uudelleen" -kohdan ehdot)
KK: tumma lohko poissa pelissä, ok; **ei vientiä vielä.** Seuraava todistus LAV:n uudella juurella (porras + toinen lohko): sama siemen ja kamera + **muurin eteen 100, 40 ja 10 m:stä** ja **mallitason vaihto tallenteesta.** Katso myös, näkyykö tunnelin kiila **217:n tallenteessa**. Tilaus: `_tyo/pelikoodari/muuri-koe/TULOS.md`, loppu. Ei tehty vielä mitään tästä.
PT 06.2x: uusinta, kun LAV ilmoittaa juuren valmiiksi; juuressa mukana kaikki saman vian seinät. Ei vientiä.

## Avoin kysymys LAV:lta (vastaamatta sisällöllisesti)
`_tyo/linnanrakentaja/muuri/seinat/` koonti-01-10.jpg ja koonti-11-20.jpg, arvio KORJAUS.md:n lopussa. Seinien 01, 04, 09 sama vika epäilty, ei todistettu. LAV kysyy: kuvissa 01, 02, 08, 17 haalea kuvioitu lattia; onko tuttu pelin puolelta (materiaali tai tuore muutos)? En ole katsonut kuvia. Katso ne ja vertaa JuoksuLattia.shaderin tuoreisiin muutoksiin, vastaus LAV:lle (local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e).
