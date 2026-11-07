# Natiivi-UI: luovutus 7.11.2026 11.08 (konteksti 25 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b, PK osoitekirjasta. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Kääntö: sh Peli-testit/unity-tarkistus.sh. Kaikki kokeena, ei junaan ilman PT:n junavuoroa.

## TYÖ JATKAJALLE: odota JU:n ajoja ja raportoi. Älä aloita muuta.

### A. Lähtökysymys (omistaja 10.49 KK:n kautta: kelpaa, ulkoasu ja sanat)
Omistajan ehto: junaan vasta, kun maksu, raketin laukaisu ja iPad on kokeiltu. Lautapeleihin "Hinta: ilmainen", Pelaa säilyy (tehty).
Haara natiivi-ui/lahto-vahvistus, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, sha cbae3153f (pohja a8b873e5d = TF 219, ei masterissa; ei siirry masterin päälle ilman ristiriitoja).
Lisätty: hintarivi Nostokortti.Toimintorivi + nostokortti.uss (mk-nosto__hinta), testikomento `ui lahtokysymys saldo` (rivi "lähtösaldo N, raketti maksettu …, kehittäjälle maksuton …").

**Todistettu Macilla, kuvat katsottu (lokit/natiivi-ui-lahtokysymys-4-maksu-cbae3153f, -5-raketti-cbae3153f, koko ipad, pelaajana):**
- Pallo: Ei nyt 300 → 300, Lähde 300 → 100. Raketti: Ei nyt 700 → 700, Lähde 700 → 200, laukaisu käynnistyi, kuvassa T– 0:05, maksua ei palautettu.
- Rahat eivät riitä ennen korttia pallolla ja raketilla, ei lähtökysymystä. Pallon ilmoitus ei veloita (100 → 100); raketilla saldoa ei luettu ilmoituksen jälkeen.
- Mylly ja Tavli: "Hinta: ilmainen" Pelaa-napin yläpuolella. Pelaa-napin painallusta ei ole ajettu.
- Raketin ajon NRE (MissingReference PalloKierto.PuoliKulma, pino LinssiOhjain.OnDestroy): ei lähtökysymyksen koodia; ajoitusta ajon loppuun ei tarkistettu erikseen.
- Valkoiset rakennukset näkyvät yhä pallolennossa (p2): NS:n asia, älä tutki.

**Odottaa JU:lta:**
1. Oikea iPad: laitekäännös cbae3153f L1, sitten _tyo/natiivi-ui/sk-lahtokysymys-4-maksu-ipad.txt ja -5-raketti-ipad.txt PK:n i4:n jälkeen. JU ilmoittaa kansiot.
2. Simuajo sk-lahtokysymys-6 on PERUTTU (PT 11.1x: Valovahdin jälkeen Liikevahti pysäytti TF 219 -pohjan tiedostoista, ei lisää ohituksia; aiempi poikkeus ei ole voimassa). Älä tilaa sitä.
3. iPad-5 sisältää nyt Ei nyt- ja Lähde-painallukset `ui napautaklik 762 583` ja `841 583` (sovelluksen sisäinen napautus, ei sormi; koordinaatit arvioitu Mac-kuvasta, kokeilematta), varaverkkona perässä `ui lahtokysymys`. Rivi "lähtökysymys: ei auki" = napautus osui. iPad-4 alkoi alkuperäisellä versiolla. JU:lle tieto meni jonoon: tarkista lokista, kummalla versiolla iPad-5 ajettiin.

**Junavuoropyyntöön kirjoitetaan selvästi "napautus todistamatta" (oikea sormi); se tarkistetaan junan käännöksestä (PT). Oikean iPadin kosketustyökalua ei ole.**

**Kun tulokset tulevat:** katso kuvat ja lokit (oleta-rivit, saldot, UI-kerroksia > 0). Raportti PT:lle 3 riviä: mitä todistettu, mitä ei, kuvien polut. Junavuoro vain PT:ltä. Junaan vietäessä vanhat skenaariot, jotka käyttävät `tap-teksti kaupunkipallo-*`, jäävät korttiin; testikomennot ja LahtoSuoraan voivat jäädä.
Todistamatta muuten: Louvre mallista ja kyltistä (kolme reittiä samaan funktioon), raketin ilmainen toinen lento kortilla.

### B. Kahdeksan huutoa, otot KK:lla: odottaa omistajaa
Kansio /Users/Shared/Claude/proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107 (tee.py, kuuntele.py, video.py, ulos/*.wav raakana PCM:nä). Video KK:lla: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/videot-20261107/huudot-kala-allas-kukkaruukku-otot.mp4. Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.
Kavya bA58y3FqVI6b6gTNh0oT, eleven_v4_turbo, style 0, speed 1.2, fi, pcm_44100; 106 krediittiä (0,012 %), ilmoitettu KK:lle.
Uusinta vain KK:n sanalla, hyväksyntä vain KK:n rivillä "OMISTAJAN PÄÄTÖS klo …". Tee.py ei aja olemassa olevaa tiedostoa uudelleen: uusinta uudella tiedostolla ja vain siitä otosta.
Hyväksynnän ja PT:n sanan jälkeen: tasoitus PCM:nä (otot 2,7–4,6 s; true peak enintään −1 dBTP, Raamattu 5.10), mp3 kerran, ääniportti (proto-3d/tyokalut/aaniportti.py, 5.11), polut PK:lle. Avain juoksupeli.rikkoutuva.kala-allas.huuto.1–4 ja kukkaruukku.huuto.1–4 (numerot 1–4 ja 5–8 kortilla). Ei vientiä ennen sitä. Ei jälkisäätöjä puheeseen (5.7). Malli: PuyiHuudot.cs.

## Peruttu
Tuloskortin rikottujen rivi: omistaja 11.11 EI tehdä, nykyinen ruudukko riittää, ei muunnelmaa pohjiin. Ei työtä NUI:lle.

## Avoinna aiemmasta
Lupaus: jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1).
Louvren oma kyltti c390b057f on TF 219:n pohjassa; merge-ohje: aa2567df7 (viesti-natiivi-ui-luovutus-20261107-0748.md, kohta MERGE-OHJE) on yhä voimassa, lue se ennen junaa.

## Opit
- Esikatselu: Matkakirja-proton tyokalut/esikatselu.sh on vanha (ei PROTO_LINJA). Käytä proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2; koko `ipad`, ei `koko`. Tarkista kuva-rivi: UI-kerroksia yli 0.
- Museo: LinssiRekisteri.Valitse palaa hiljaa, jos lukittu. Kuva paljasti, loki ei.
- iPad-ajuri: ei `oleta-uusi` (ohitetaan hiljaa), `oleta` katsoo vain rivin jälkeen tulleita; kuva = `komento kuva X` + `odota 3`; peräkkäiset samantyyppiset komentorivit tarvitsevat `odota 3` väliin, muuten ne kirjoittavat toistensa päälle. Esikatselu.cs ei tunne tap-rivejä: kosketukset vain todistusajolla.
- Pelaajana-testi: `ui pelaaja 1` + tarkistus `kehittäjälle maksuton ei`, muuten maksu ei veloita.
- Zsh: `echo =====` kaataa komennon, ja `head -0` ei käy.
