# Valosepän luovutus 5.11.2026 klo 11.25

Syy: konteksti 26 %, pehmeä raja (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261105-1059.md (linjaukset ja KS:n tiedostojako voimassa, lue lisäys 2). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Tila
Pariisin kartan viat, koodia ei ole muutettu. Runko a5323cf4e (proto: /Users/Shared/Claude/proto-3d/Matkakirja-proto). Mac-ajot neljä, kaikki JU:lta. Tulokset: _tyo/linssiseppa2/pariisi-tyyli/striimi/pariisi-viat/TULOS-tikkaat-a5323cf4e.md. Lue se ensin.

## Todettu
- Terävä alue seuraa kameraa (tikkaat3), joten data on kunnossa 2,108–2,637°:ssa. Reunat 0,1758°:n ruudukossa.
- z12: tummempi 1 × 2 ruudun suorakulmio Pariisin ympärillä. z14 ja z15: terävä alue, ympärillä haalea ja sumea; lännessä tiet näyttävät kahdentuneilta. z15 45°: vaakasuora taso-ero. z13: tummia läiskiä lounaassa ja luoteessa.
- sse 5 (tikkaat4) ei poista saumaa ja huonontaa kuvaa: terävänä yhä 2–3 kameraa lähintä ruutua, ruudut vain pienenevät (0,0439°). Ei korjaus.
- Z10-lista ei selitä tätä (lista z10 x 515–521).

## Ei tiedetä
- Syy. Epäily: jokin rajaa terävän kuvan muutamaan lähimpään ruutuun. Ei mitattu.
- Miten tämä näkyy iPadilla. Mac-ajossa pää on 640×480. KK:n iPad-lista 4.11. 02.50 (ajo 3332c8e15; NS välitti) mainitsee länsirajan, tummat läiskät, nähtävyyshaamut 0,13:lla ja nimet. Haamuja ja nimiä ei ole arvioitu.
- z16 ja z17: selviä pystysaumoja ei mittauksessa, täysikoon rajauksia ei ole katsottu.
- Tummien läiskien syy.

## SEURAAVAKSI
1. Lue KarttaKerrokset.cs:803 ja 2294 (kerroksen maximumScreenSpaceError, maximumTextureSize, subTileCacheBytes) ja miten Laattapalvelin.Elava vastaa ulompien ruutujen pyyntöihin. Loki katkeaa (elävä pyyntö/vastaus vain alussa), joten syy haetaan koodista tai lisätystä lokista.
2. Pieni koe Macilla JU:n vuorolla, korjaus omaan haaraan. Rivi KK:lle ja PT:lle, kun jokin korjaantuu.
3. Muisti: ei mittauksia nyt (omistaja 10.52).

## Skriptien opit
- Ensimmäinen aja häviää aloitussarjalle: uhrikomento ja 20 s odotus (sk-tikkaat3.txt on malli).
- Ilman "pallo kerros pakota taysi" kuva voi olla musta: Esikatselu.Kuva (Esikatselu.cs:736) valitsee ElavaKameran. JU:n tarkistus näytti tästä "puute 0"; työkalun korjaus on tekemättä, omistaja selvittämättä.
- zsh: "$R:A" laventuu väärin, kirjoita git show "a5323cf4e:polku".

## Muuta tehty
NS:n T7 → NAS 2. erä: vastattu "kaikki saa siirtää" (27 Gi / 435 kohdetta). Tarkistettu: koodi ja työkalut eivät viittaa tarkistettuihin polkuihin. _tyo/linssiseppa2:n linkit näihin T7-polkuihin jäävät tyhjän päälle siirron jälkeen.
