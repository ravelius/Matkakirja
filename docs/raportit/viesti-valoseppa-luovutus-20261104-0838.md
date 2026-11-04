# Valosepän luovutus 4.11.2026 klo 08.38

Syy: konteksti yli 25 % (pehmeä raja, Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0802.md (lue sen Opit ja Työkalut; sen Seuraavaksi-kohta 3 ja 4 yhä voimassa). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset _tyo/linssiseppa2/pariisi-tyyli/: k47/TULOS.md, k48/TULOS.md.

## Tila (natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, nyt haarassa linssiseppa2/pariisi-k48-koe, puhdas; ei junaan)
- **k47 2aefe2cd0** (väri z14:n tasolle, PT kuitannut). z15 181/152/124, R-B 57 | z14 179/151/123, 57. z17:n isot katot yhä hieman sinertävät vaaleiden seinien vieressä; KK ei ole arvioinut.
- **yhd7 a494e1ad1** (linssiseppa2/pariisi-yhd7, p47y, 619/619) = k47 + yhd6 e721d219e + KS 43ba52fe7 + 205c0e443. Korvaa yhd6:n; JU:ta pyydetty poistamaan se. KS:n muutokset eivät näy paikallisessa ajossa.
- **k48 905a00e9d** (linssiseppa2/pariisi-k48-koe, yhd7:n päällä, p48y, 619/619): raidat. Kortteli saa kierron (vain z15), peilauksen ja siirron; palarajan ylittävä kortteli ei muunnosta. Yhteinen suunta 0,50 → 0,27 (z14 0,22). Sha JU:lla: korvaa yhd7:n, jos iPad-ajo ei ole alkanut; PT: iPad kiinni, yhd7 ei odota. Pari KK:lla ja PT:llä, **vastausta ei vielä**.
- **Photoshop-kartta valmis** (omistaja 08.25): /Users/Shared/Claude/Photoshop-koe/kartta/pariisi-kartta-z17.png, 6144 × 8192, tiedot .txt. KK:lle ilmoitettu: Eiffel ja Riemukaari alueen ulkopuolella, data vain 48,836–48,894 / 2,307–2,373. Tuotu työlistalla valmiiksi. Väri k47, ei k48:n korttelimuunnosta. Tekotapa k47/photoshop.zsh.

## Seuraavaksi
1. **JU:n kuvat** (k47/yhd7/sk-yhd7.txt, 14 kuvaa, muisti, vieritys), a494e1ad1 tai 905a00e9d. Katso täysikoossa z15 ja z17, mittaa sävy k47/mittaa.py:llä 2029:ää vasten (tavoite laitteella R-B noin 70, L noin 142–153), raidat k47/raidat.py. Raportti PT:lle; kuva KK:lle PT:n linjan mukaan.
2. **KK:n vastaus k48:sta.** Auki: z15 | z16 -raja, jossa rivien suunta vaihtuu (KK 06.24/5 halusi tarkentumisen ilman hyppyä), isot palarajan ylittävät korttelit vaakarivein, z16:n rivit.
3. Muu kuten edellisessä luovutuksessa; jokitilaus Pariisin jälkeen.

## Opit
- **Paikallinen ajo näyttää saman materiaalin noin 13 R-B kylmempänä kuin iPad** (57 | 70–74; muisti paikallinen-kartta-kylmempi-kuin-ipad). Paikallinen väritavoite on z14, ei 2029:n luku. Siirtymä arkille on oletus, kunnes laitekuva todistaa.
- Arkin 5,4 m/px:n väri oli jo sama kuin materiaalissa; ero oli kirkkaudessa ja kontrastissa. Mittaa ennen histogrammisovitusta (ensimmäinen sovitus olisi leikannut 9 % pikseleistä, ja np.quantile kesti minuutteja).
- Korttelin ominaisuus viitepisteestä ei ole sama palan molemmin puolin kulmakortteleissa; arkki kesti sen, koska kaupunginosa muuttuu harvoin, mutta hajautus ei. Muunnos pois reunakortteleilta poisti leikkauksen.
- Suuntasuodatin (k48/kiila.py) ei poista rivejä: raidat ovat arkin vaaleita kujia. Hylätty.
- Etäpää natiivi-backup; kaanna.sh:n koeajossa pinnat erikseen: k47/aja.zsh <wt> <pinnat> <ulos> <z> [alue].

## Työkalut
k47/mittaa.py, katot.py, raidat.py (kaikki venv tulivuoret/venv, ei -I, koska lukevat k47/m.py:n), k47/varita.py, katot2.py, k47/parit.py, k48/aja1.zsh. z17-rajaus 66383,45091,66387,45096.
