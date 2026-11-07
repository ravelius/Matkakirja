# Natiivi-UI: luovutus 7.11.2026 11.49 (konteksti yli 25 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b, PK osoitekirjasta. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Kääntö: sh Peli-testit/unity-tarkistus.sh. Kaikki kokeena, ei junaan ilman PT:n junavuoroa.
Työkopio: worktree /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, haara natiivi-ui/lahto-vahvistus, HEAD f74716da2 (pohja a8b873e5d = TF 219, ei masterissa).

## TYÖ JATKAJALLE: odota JU:n iPad-5:tä ja PT:n vastausta. Älä aloita muuta.

### A. Pallon napit ja ☰ iPhone vaaka (omistaja 11.21, PT: junaan 220): tehty, raportoitu PT:lle 11.48
Commitit 909eaac25 ja f74716da2. Raportti ja kuvien polut: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/raportti-pallonapit-20261107.md (lue tämä, jos PT kysyy).
Todistettu Macilla, kuvat katsottu. Ei koestettu: oikea sormi ja laite, Lähde-nappi Lontoossa, iPad, iPhone pysty.
Avoin PT:lle kerrottu: lasipaneelin vaalea teksti himmenee kirkkaan talon päällä (kaikki rivit). Pohjaa ei muutettu; ei tehdä ilman sanaa.
Junaan viedään omina committeina vain PT:n junavuorolla; molemmat pallokommitit kuuluvat yhteen.

### B. Lähtökysymys (omistaja 10.49 KK:n kautta: kelpaa, ulkoasu ja sanat)
Omistajan ehto: junaan vasta, kun maksu, raketin laukaisu ja iPad on kokeiltu. Lautapeleihin "Hinta: ilmainen", Pelaa säilyy (tehty). Koodi cbae3153f.

Mac todisti 11.0x (lokit/natiivi-ui-lahtokysymys-4-maksu-cbae3153f, -5-raketti-cbae3153f, pelaajana): pallo Ei nyt 300 → 300, Lähde 300 → 100; raketti Ei nyt 700 → 700, Lähde 700 → 200, laukaisu käynnistyi, maksua ei palautettu; Rahat eivät riitä ennen korttia. Pelaa-napin painallusta ei ole ajettu.

iPad-4 (lokit/natiivi-ui-lahtokysymys-4-ipad-cbae3153f), kerrottu PT:lle: hintarivit, Rahat eivät riitä (100 → 100), kortti, Ei nyt (300 → 300), Lähde käynnistää lennon. Veloitus 300 → 100 EI todistettu: muistivahti pysäytti komennot sekunnin sisällä Lähde-painalluksesta (4 082 Mt ≥ 4 080 Mt, huippu 4 519 Mt, kartalla jo noin 3 880 Mt). Ei kaatumista. Vertailuajoa ei ole. PUUTE 1 on ajurin ajoitus (lähtösaldo 100 on konsolin rivillä 1432). Ei uusintaa ilman sanaa.

**Odottaa JU:lta: iPad-5** (kansio natiivi-ui-lahtokysymys-5-ipad-cbae3153f, JU:n jonossa KS:n muisti2:n jälkeen; ei peruttu). Skenaario sisältää Ei nyt- ja Lähde-painallukset `ui napautaklik 762 583` ja `841 583` (sovelluksen sisäinen napautus, ei sormi; koordinaatit arvioitu), varaverkkona `ui lahtokysymys`. Rivi "lähtökysymys: ei auki" = napautus osui.
Kun tulee: katso kuvat ja lokit (oleta-rivit, saldot, UI-kerroksia > 0), raportti PT:lle 3 riviä: mitä todistettu, mitä ei, kuvien polut.
Simuajo sk-lahtokysymys-6 on PERUTTU: älä tilaa.
Junavuoropyyntöön kirjoitetaan selvästi "napautus todistamatta" (oikea sormi); se tarkistetaan junan käännöksestä (PT). Oikean iPadin kosketustyökalua ei ole. Junaan vietäessä vanhat skenaariot, jotka käyttävät `tap-teksti kaupunkipallo-*`, jäävät korttiin; testikomennot ja LahtoSuoraan voivat jäädä.
Todistamatta muuten: Louvre mallista ja kyltistä (kolme reittiä samaan funktioon), raketin ilmainen toinen lento kortilla.
Valkoiset rakennukset pallolennossa ovat NS:n asia, älä tutki.

### C. Kahdeksan huutoa, otot KK:lla: odottaa omistajaa
Kansio /Users/Shared/Claude/proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107 (tee.py, kuuntele.py, video.py, ulos/*.wav raakana PCM:nä). Video KK:lla: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/videot-20261107/huudot-kala-allas-kukkaruukku-otot.mp4. Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.
Kavya bA58y3FqVI6b6gTNh0oT, eleven_v4_turbo, style 0, speed 1.2, fi, pcm_44100; 106 krediittiä (0,012 %), ilmoitettu KK:lle.
Uusinta vain KK:n sanalla, hyväksyntä vain KK:n rivillä "OMISTAJAN PÄÄTÖS klo …". Tee.py ei aja olemassa olevaa tiedostoa uudelleen: uusinta uudella tiedostolla ja vain siitä otosta.
Hyväksynnän ja PT:n sanan jälkeen: tasoitus PCM:nä (otot 2,7–4,6 s; true peak enintään −1 dBTP, Raamattu 5.10), mp3 kerran, ääniportti (proto-3d/tyokalut/aaniportti.py, 5.11), polut PK:lle. Avain juoksupeli.rikkoutuva.kala-allas.huuto.1–4 ja kukkaruukku.huuto.1–4 (numerot 1–4 ja 5–8 kortilla). Ei vientiä ennen sitä. Ei jälkisäätöjä puheeseen (5.7). Malli: PuyiHuudot.cs.

## Peruttu
Tuloskortin rikottujen rivi: omistaja 11.11 EI tehdä, nykyinen ruudukko riittää. Ei työtä NUI:lle.

## Avoinna aiemmasta
Lupaus: jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1).
Louvren oma kyltti c390b057f on TF 219:n pohjassa; merge-ohje: aa2567df7 (viesti-natiivi-ui-luovutus-20261107-0748.md, kohta MERGE-OHJE) on yhä voimassa, lue se ennen junaa.

## Opit
- Esikatselu: Matkakirja-proton tyokalut/esikatselu.sh on vanha (ei PROTO_LINJA). Käytä proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2; koko `ipad` tai `iphone-vaaka`. Tarkista kuva-rivi: UI-kerroksia yli 0. Vuoro aina JU:lta ("ESIKATSELU NYT"), valmiista rivi JU:lle.
- `linssi opas kaupunkitila Lontoo` heti alussa kieltäytyy ("ei sallittujen listalla (0)"): `odota 30` ensin. Lue loki, ennen kuin luotat kuviin: ensimmäinen ajo meni kartalla.
- Esikatselun POIKKEUS ArgumentOutOfRange (SearchDatabase) on Unityn hakuindeksi, ei pelin vika.
- Museo: LinssiRekisteri.Valitse palaa hiljaa, jos lukittu. Kuva paljasti, loki ei.
- iPad-ajuri: ei `oleta-uusi` (ohitetaan hiljaa), `oleta` katsoo vain rivin jälkeen tulleita (komennon heti tuleva vastaus voi jäädä väliin = harha-PUUTE); kuva = `komento kuva X` + `odota 3`; peräkkäiset samantyyppiset komentorivit tarvitsevat `odota 3` väliin. Esikatselu.cs ei tunne tap-rivejä.
- Pelaajana-testi: `ui pelaaja 1` + tarkistus `kehittäjälle maksuton ei`, muuten maksu ei veloita.
- Zsh: `echo =====` kaataa komennon, ja `head -0` ei käy. Git grep ilman --include-lippuja.
- Turvatarkistus estää `rm -f $S/*`: älä kierrä, älä poista tarpeettomia.
