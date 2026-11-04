# Valosepän luovutus 4.11.2026 klo 09.16

Syy: konteksti 26 % (pehmeä raja, Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0838.md (lue sen Opit ja Työkalut). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset _tyo/linssiseppa2/pariisi-tyyli/: k49/TULOS.md, k50/TULOS.md, k51/TULOS.md. Suunnitelma (KK:n luonnos, ei päätös kaikilta osin): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-striimikartta-pohjaksi.md.

## Linja nyt
- **OMISTAJA 08.58:** kortteleita ei voi täyttää arkilla, koska talot katkeilevat tien alla. **OMISTAJA 09.07:** viisto kulma pidetään nähtävyyksille, striimikartta sopii samaan kulmaan 2D:nä, kokonaisuuden ei tarvitse olla täydellinen.
- **Omistaja 09.10, EI vielä päätös (kortti tulossa):** nähtävyydet 3D:nä Tripolla ja kartta käännettäväksi. PT 09.11: 09.07 voimassa, kunnes kortti muuttaa sitä; **älä tee mitään, mikä sitoo pohjan yhteen katselusuuntaan.**
- **Seis (PT, KK):** ei uusia kortteliarkin k-versioita, ei Codexin kortteli- tai materiaalitilauksia. Yksi kierros pohjakuvaan, KK ohjaa.

## Tila (natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, haara linssiseppa2/pariisi-k49-koe, puhdas; ei junaan)
- **c2 KK:lla, vastausta ei vielä:** k51/c2/2029-k49-c2.jpg, c2-kierrot.jpg, c2-z16-lahi.png. Litteä, tumma piha, muste. Kuvan kääntö 0/90/180° ehjä, ei laitteella. Kadun alla 0,22 % z16:sta, katsotussa rajauksessa ei taloa poikki. Heikkoudet: kovat tummat kujat, möhkäleet ilman yksittäisiä taloja, heikko muste, pehmeä läiskäraja aukioilla. Suosittelin c2:ta pohjaksi; kujien vaalennus ja viiva vain KK:n sanalla. c2-z15-65.jpg on tehty, mutta katsomatta.
- **Koodi ei ole haarassa:** k51/c2/koe-c2.diff (git apply k49:n päälle, ELAVA_C=3; 2 = (d), 1 = (c), ELAVA_C2=1 merkitsee kadun alle jäävän punaisella). Kokeen koodia, ei pelikelpoinen: ympäristömuuttujat, ThreadStatic, ei testejä. Pelihaara kirjoitetaan puhtaasti, kun KK/omistaja päättää.
- **(d) k51/** viistot talot: KK 09.11 seis, viistot seinät eivät kestä kääntöä. **(c) ja (b) striimikartta** k50/abc-z15-z16.jpg. (b):tä ei ole verrattu muiden kaupunkien pelikuviin.
- **k49 873762394** (pariisi-k49-koe, p49y, 619/619): z15 = z16 pienennettynä, KK:n mielestä z15 | z16 oli se, mitä haettiin, mutta omistajan 08.58 kaatoi arkkitavan. JU:lta peruttu 08.58; JU ei ole kuitannut, **tarkista, ettei k49 ole iPad-jonossa**. Viestissäni JU:lle yhd7:ää ei palautettu; PT/KK kertoo paikalle tulevan.
- Photoshop-kartta valmis (edellinen luovutus).

## Seuraavaksi
1. KK:n vastaus c2:sta ja kortti 3D:stä. Suunnitelman osa A on VS:n; B Codex/KS, C JU.
2. Jos c2 hyväksytään: puhdas toteutus omaan haaraan, kaupunkitason ja z14 | z15 -vaihto katsottava (z ≤ 13 ei taloja), muisti ja palan aika laitteelta.
3. Muu kuten edellisissä; jokitilaus Pariisin jälkeen.

## Opit
- Koe koodin ympäristömuuttujalla ja git restorella on nopeampi kuin haara, kun tarvitaan vain kuva; diff talteen ennen restorea.
- Vain etelään katsovat seinät tekevät N–S-kujista tummia pystyraitoja: viisto muoto tuo oman raidan, vaikka arkkirivit poistuvat.
- Täysi nousu nostaa kadun alle jäävän osuuden: litteä 0,22 %, 0,5 × nousu 0,64 %, 1 × nousu 1,69 %.
- Tarkista väite ennen viestiä: väitin raiteiden tulleen k49:ssä, vaikka ero oli jo k48:ssa, ja jouduin oikaisemaan.

## Työkalut
k47/aja.zsh <wt> <pinnat> <ulos> <z>; k51/c2/kuva2.py, k51/c2/kuva.py (rajaus 420,600,820,1000 z15, 2× z16, 2029 materiaali-2029.rgb 5,4 m/px eri paikasta), k49/vert.py. Python tulivuoret/venv.
