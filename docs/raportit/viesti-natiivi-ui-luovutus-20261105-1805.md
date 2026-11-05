# Natiivi-UI: luovutus 5.11.2026 klo 18.05 (konteksti 33 %)

Korvaa -1704:n. Työhaara `natiivi-ui/kyltit-219`, kärki 6ff3ef451, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Haara sisältää KS:n kärjen 9e8c8ab1e.

Omistaja 16.41: vain Pariisin 3D-rakennukset. Omistaja 17.58 (Raamattu 10.5): jokainen Mac-ajo ratkaisee yhden kysymyksen, pyynnössä JU:lle rivi "mitä tämä ratkaisee" ja noin 5 kuvaa; 22 kuvan ohjelmaa sk-pariisi-kyltit.txt ei ajeta ilman perustelua.

## Ensin
1. Kuittaa JU:lle (id osoitekirjasta) "NUI valmis". Ei NUI:n ajoja jonossa.
2. PT:n ja KK:n vastaus parista 6ff3ef451 on auki. Lue tulleet viestit; vika palaa minulle, muuten omistajalle menee PT:n kautta.

## Tehty (ajo lokit/julkaisija-pariisi-kyltit-6ff3ef451, 0 error CS)
- 8ea217b61: 3D-kylteillä kiinteä sivu datasta (Malli.KylttiSivu: Louvre oikealla, Sainte-Chapelle vasemmalla, muut alla), ei muistia edellisestä kehyksestä. PT hyväksyi, KK vahvisti tulkinnan "paikka riippui reitistä".
- 520706177: hintakyltti ilman muistia; Pariisissa järjestys vasen ensin (KaupunkiPallot.PariisinHintakyltinPaikat). Todennettu kuvapareista keski + katukuva-ennen ja louvre-ylhaalta + louvre-ennen: sama paikka, ei peitä Pompidou-keskusta (keskitasolla kyltin laita koskee nimen alkuun).
- 6ff3ef451: KK:n yleinen sääntö: kyltti ei jää pyöreän merkin alle, vaan vaihtaa sivua ja menee tarvittaessa merkin päälle; merkkiä ei häivytetä (omistaja 15.01). NostotKartalla.KyltinSivu, MalliKyltit ja KaupunkiPallot kahdella kierroksella, SaapumisKuvat.PyoreatRuudut; katukuvien kerros alimmaksi (SendToBack). Orsayn kyltti siirtyi vasemmalle, Quai Voltairen merkki näkyy kokonaan. Katukuvan napautus avaa kuvan (katukuva-suuri).
- Katsottu tästä ajosta: keski, katukuva-ennen, louvre-ylhaalta, louvre-ennen täysikoossa näytettyinä (2000 px), katukuva-suuri pienenä. Muita 17 kuvaa ei katsottu; ajo 8ea217b61:stä viisto, louvre-lansi, louvre-viisto ja nd.

## Auki
1. "Merkin päälle" -haara on todistamatta: yhdessäkään katsotussa kuvassa ei ollut ei-tilaa-tapausta. Jos todistus tarvitaan, yksi kamera ja 1–2 kuvaa, ei koko ohjelmaa.
2. Liikkeessä kyltin sivu voi hypätä, kun oma sivu on varattu tai vapautuu; pyöreiden merkkien rajat ovat edellisestä kehyksestä. Liikettä ei ole katsottu.
3. Auki 1:n nimet: Saint-Germain-des-Présin kuva nimen päällä, Metroaseman kuva Hôpital Lariboisière -nimen vieressä. Nimet eivät ole kylttejä, joten KK:n sääntö ei koske niitä; ei muutettu. Sanottu PT:lle.
4. Hintakyltti väistää kylttejä, malleja ja pyöreitä merkkejä, ei nimiä (Auki 2). Pompidou on nyt vapaa näissä neljässä kuvassa, mutta nimi voi jäädä alle, jos kaikki edeltävät paikat ovat varattuja.
5. Ilman kylttiä: Grand Châtelet (viisto), Temple-torni ja Bastilji (louvre-lansi), Auki 3 odottaa KK:n sanaa. Näitä ei tarkistettu uudelleen ajosta 6ff3ef451.
6. Vrain-Lucas todistamatta (KS:n osa). Pulu peittää ND:n kyltin louvre-ylhaalta- ja louvre-ennen-kuvissa: PT:n päätöksellä jää.
7. tarkista.sh exit 1 valovahdista (Komennot.cs, Nahtavyysalue.cs, NotreDameKirkko.shader); PT ratkaisee ND-kokeen junaanviennissä.
8. -1642:n Auki 2 ja 3: kaukaiset kyltit matalalta, Sacré-Cœur usvassa, leikkeet kaukaa, kylttien pysty- ja kursiivi-ero, `komento nimet etsi Pariisi`.

## Huomiot
- tarkista.sh: `zsh tyokalut/tarkista.sh`, palauta sen jälkeen Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json `git restore`:lla.
- proto-repon etähaara on `natiivi-backup`, ei origin.
- Kartta-testit eivät käännä NostotKartallaa; vain Unity-ajo todistaa.
- Viestit: send_message session-id:llä; PT:n, KK:n ja JU:n id:t osoitekirjasta (päätili). Lento-haaraa ei yhdistetä; siitä päättää PT.
