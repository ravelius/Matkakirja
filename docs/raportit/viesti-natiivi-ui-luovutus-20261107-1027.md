# Natiivi-UI: luovutus 7.11.2026 (konteksti 25 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b, PK osoitekirjasta. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Kääntö: sh Peli-testit/unity-tarkistus.sh. Kaikki kokeena, ei junaan.

## TYÖ JATKAJALLE: kaksi odottaa, älä aloita muuta
Jos mitään ei ole tullut, rivi PT:lle "JONO TYHJÄ: Natiivi-UI".

### A. Kahdeksan huutoa (PT jakoi Äänittäjän sijaan), otot KK:lla
Kansio /Users/Shared/Claude/proto-3d/_tyo/juoksupeli-huudot-kala-allas-ruukku-20261107 (tee.py, kuuntele.py, video.py, ulos/*.wav raakana PCM:nä). Video KK:lla: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/videot-20261107/huudot-kala-allas-kukkaruukku-otot.mp4. Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md.
Kavya bA58y3FqVI6b6gTNh0oT, eleven_v4_turbo, style 0, speed 1.2, fi, pcm_44100; 106 krediittiä (0,012 %), ilmoitettu KK:lle.
Odottaa: uusinta vain KK:n sanalla, hyväksyntä vain KK:n rivillä "OMISTAJAN PÄÄTÖS klo …". Tee.py ei aja uudelleen olemassa olevaa tiedostoa: uusinta uudella tiedostolla ja vain siitä otosta.
Hyväksynnän ja PT:n sanan jälkeen: tasoitus PCM:nä (alle sekunnin äänet eivät tässä, otot 2,7–4,6 s; true peak enintään −1 dBTP, Raamattu 5.10), mp3 kerran, ääniportti (proto-3d/tyokalut/aaniportti.py, 5.11), polut PK:lle. Avain juoksupeli.rikkoutuva.kala-allas.huuto.1–4 ja kukkaruukku.huuto.1–4 (numerot 1–4 ja 5–8 kortilla). Ei vientiä ennen sitä. Ei jälkisäätöjä puheeseen (5.7). Malli aiemmista: PuyiHuudot.cs.

### B. Lähtökysymys (omistaja 09.49), parit KK:lla
Haara natiivi-ui/lahto-vahvistus, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, c672cd616 (pohja a8b873e5d = pelikoodari/tf-219-talot). Kuvat ja lista: lokit/nui-lahtokysymys-c672cd616 (vastaavat.md). Odottaa KK:n päätöstä; ei junaan ennen PT:n sanaa.
Tehty: Vahvistus.KysyLahto; pallo, raketti, museot (KaupunkiPallot.Avaa, AvaaMuseo, RakettiReitti.Napautettu). Rahat ei riitä -ilmoitus ensin. Lukittu museo ei kysy (Saatavilla), koska Valitse palaa hiljaa.
Testi: `ui kaupunkipallot napauta` lähtee suoraan (vanhat ajot), `kysy` näyttää kortin, `ui lahtokysymys lahde|ei-nyt`. Skenaariot _tyo/natiivi-ui/sk-lahtokysymys-2 ja -3.
Junaan vietäessä: testikomennot ja LahtoSuoraan voivat jäädä, kuten muut ui-komennot; vanhat skenaariot, jotka käyttävät `tap-teksti kaupunkipallo-*`, jäävät nyt korttiin.
Todistamatta: maksu (raha ei näy ajossa), raketin laukaisu Lähde-napista, Rahat ei riitä kortin edellä, oikea iPad.
Havainto PT:lle ja KK:lle kerrottu: pari 6 pallolennossa valkoisia läiskiä Notre-Damen tilalla, syy auki; myös väärän koon ajossa. Tarkista ensin, näkyykö sama a8b873e5d:ssä ilman tätä muutosta, jos PT pyytää.

## Avoinna aiemmasta
Lupaus: jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1).
Louvren oma kyltti c390b057f on TF 219:n pohjassa; merge-ohje: edellinen luovutus aa2567df7 (viesti-natiivi-ui-luovutus-20261107-0748.md, kohta MERGE-OHJE) on yhä voimassa, lue se ennen junaa.

## Opit
- Esikatselu: Matkakirja-proton tyokalut/esikatselu.sh on vanha (ei PROTO_LINJA): jonottaa L1:n lukolla ja ajaa L1:llä, vaikka vuoro on L2. Käytä proto-kaannos-linja1-sisa/tyokalut/esikatselu.sh PROTO_LINJA=2.
- Koko: anna `ipad`, ei `koko`. `koko` ei ole laitenimi: kuva on 640×480 ilman käyttöliittymää, ajo silti "VALMIS". Katso kuva-rivi: UI-kerroksia pitää olla yli 0.
- Museo: LinssiRekisteri.Valitse palaa hiljaa, jos lukittu; `ui pelaaja 1` näyttää sen. Kuva paljasti, loki "taidemuseo, maa ranska" ei.
- Zsh: `echo =====` kaataa komennon, koska = laajenee.

## PT 10.2x (lähtökysymys)
c672cd616 kuitattu, ei junaan. Valkoiset rakennukset selvittää NS: älä tutki. Odota omistajan vastausta KK:lta. Maksu, raketin laukaisu, Rahat eivät riitä ja iPad ajetaan vasta, jos kysymys kelpaa, JU:n vuorolla. Lautapelien "ilmainen" jää omistajalle: älä muuta.
