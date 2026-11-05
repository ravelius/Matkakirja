# Karttaseppä: luovutus 5.11.2026 klo 15.09 (KS)
Syy: konteksti yli 30 % (7.37). **Lue tämä, sitten -1452 (karttaseppa/luovutus-20261105-1452), kohdat "ENSIN", Louvre ja sarja.** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. Proto-worktree W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 8d0cf457e.

## ENSIN
1. Remote päälle. Vahti Monitorilla (30 min, uusi päättyessä): `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh 51797b744` (tila skriptin vieressä).
2. Odotetaan neljää:
   - **Mac JU:lta:** 8d0cf457e, sk-pariisi-kyltit.txt, tulos `lokit/julkaisija-pariisi-kyltit-8d0cf457e`. VS:n ajojen jälkeen. **Katso kuvat täysikokoisina, sitten KK:lle ja kopio PT:lle (2.214).** Ui-kerros on ajossa näkyvissä.
   - **Eiffel otto 2 Codexilta:** tilaus `_tyo/codex/pariisi-sarja-20261105/TILAUS-24b-eiffel-otto2.md`, posti 51797b744, toimitus `_review-sarja-24b/eiffel/`. Mittaa mitta.py:n tapaan (ks. Opit), vertaa oikeaan, kuvat KK:lle.
   - **Louvre v2 Tripolta:** tilaus 21h, Tripo aloitti (posti 2566b68bb). Toimitus louvre-3d-v2/.
   - **NUI:n kyltti:** kadonneen aarteen tähtikyltti.

## Omistajan päätökset (uusimmat voittavat -1452:n)
- **14.55 + 14.57 (Raamattu 2.215, PR 6280):** "mitään pieniä malleja ei saa jäädä." Tarkennus: "kadonneet aarteet voisi näkyä myös kuvina mutta kuvan vieressä voisi olla erilainen kyltti jossa tähti tai erilainen taustaväri josta tunnistaa että on kadonnut aarre". **-1452:n "myös pois kuvina" ei enää päde kadonneisiin.**
- **Kuvat jäävät:** Temple-torni, Grand Châtelet, Bastilji, Tuileries, Galerie des Machines (ratkaisu "leike" tiedostossa piirros-pariisi.json). Kyltti NUI:lta.
- **Vain ★-kyltti:** Orsay, Palais de l'Industrie, Trocadéro, Les Halles (ratkaisu "kyltti", 2.11. 08.42).
- **15.01:** kyltti näyttää noston nimen jo ennen löytämistä; pyöreät valokuvamerkit jäävät.
- **Pyramidi:** jää, kunnes uusi Louvre on pelissä ja sen napautus avaa museon; sitten pois. Ei omistajan kysymys (KK).
- **Turisti-info ja lehtikioski:** ei kylttiä, ei kartalla (omistajalle kerrottu). Eivät ole nykyisellä kartalla, koska piirroskerros on pois (Striimi). Avautuminen kaupunkikortilta on luettu koodista, ei kokeiltu pelissä.
- **KK 15.07, Eiffel:** toinen otto. Tripo vasta omistajan nähtyä. Jos otto 2 epäonnistuu, omistajalle ennen kolmatta. **Muut seitsemän lähtevät vasta, kun KK on katsonut oton 2** (korkeudet ja kuvakulmat lisätty TILAUS-24-sarja.md:hen; korkeudet ovat muistista, Codexia pyydetty tarkistamaan).

## Tehty, ei vielä nähty pelissä
**8d0cf457e (7e1302732 + korjaus): kääntämättä, Unityllä ei tarkistettu.** `NostotKartalla.cs`: `PariisiKylteilla`, `OnPariisissa`, `PariisinKyltti`: Pariisissa kuvamerkit ja piirrokset pois, nimi aina, napautus kylttiin, lähikohteet vasta `PorrasMittakaava`:lla. `VeneetPelissa = false` (laiva pois). Katso kuvista: kyltit eivät mene päällekkäin Notre-Damen luona (kyltti on kiinteä, ei väistä), Les Hallesilla kyltti ilman kuvaa, Vrain-Lucasin napautus avautuu (kyltit-napautus), ryhmämerkit eivät tuo pientä kuvaa takaisin.
**NUI yhdisti tämän haaraansa natiivi-ui/kyltit-219 (a34ee6e48). Jatko-commitit sen päälle tai kerro NUI:lle, jos NostotKartalla muuttuu.**

## Auki
- **Linnut** (parvet, Animaatiot/pariisi.json) ovat yhä kartalla; niitä ei ole kysytty. Kysy KK:lta Mac-kuvan yhteydessä.
- **Pieni iPad** vasta erässä PT:n tai KK:n sanalla.
- **Louvre-mallin kytkentä:** -1452 pätee.

## Hyväksytty
Hotellin nimi KK:lla hyväksytty (ajo 7516b44ee). Mac-ajojen POIKKEUS ArgumentOutOfRangeException on Unityn SearchDatabase-indeksointi, ei peli; PT tietää.

## Opit
- Omistajan "3D" oli 2D-kuva: Merkit `assets/nostotyypit/merkki-*.png` (vaaka = kauppa, kaari = historia, torni = kulttuuri, pylväs = huuto) ja nostot julkaisusta `media.matkakirja.app/sisalto/1/v983/kokoelmat/karttavalot.json`. Katso tiedostot ennen kuin väität, mitä kuvassa on.
- Tilaukseen korkeus ja kuvakulma aina. Mittaus: scratchpadin mitta.py katosi nollauksessa: kuvasta rivikohtainen leveys, korkeus = rivit, suhde = alin leveys / korkeus. Oikea Eiffel 0,379, otto 1 0,646.
- Viiston kulma tarkistuu: neliön lävistäjien suhde = sin(kulma). Otossa 1 noin 27°.
