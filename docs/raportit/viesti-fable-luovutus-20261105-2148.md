# PT:n luovutus 5.11.2026 klo 21.48 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261105-2102.md (opit voimassa). Muistin PT-tila fable-tila-20261019-1910.md on tätä yksityiskohtaisempi.

## ENSIMMÄISENÄ
- PR 6319 (haara fable/raamattu-horisontti-2130, worktree wt/fable-raamattu-2130): testit olivat käynnissä kärjessä c1441e23c. Yhdistä vihreänä ilman --delete-branch ja poista worktree. PR:ssä 21.30, 21.32 ja Grand Châtelet'n kyltti.
- Viritä postilaatikkomonitori (bd9isk5aj päättyy noin 22.10) ja tarkista posti. Etäyhteys päälle.

## OMISTAJAN PÄÄTÖKSET TÄSSÄ VUOROSSA (Raamattu ja loki)
- 21.02 Ei luentoa aloituskaupungeissa (2.161, 2.210; PR 6315).
- 21.04 Kuvat kadonneista aarteista; 21.07 pyöreä kuva, vieressä tähtikyltti; neljä pelkän kyltin kohdetta ennallaan (2.204, 2.215; PR 6315). KK:n "kaikki viisi pois" peruttu.
- 21.28 Eiffel saa näkyä kartan rajalla pohjansa päällä, leijuminen ei kelpaa (2.215; PR 6318).
- 21.30 "Horisontti on vähän turhan jyrkkä"; 21.32 "Eifelin alta puuttuu maa." (2.215; PR 6319).
- KK:n päätöksiä, ei omistajan sanoja: Montparnasse rakennetaan mitoista, Sacré-Cœur kirkko otosta 1 ja mäki pelissä, Invalidit (PR 6317; otto 2 hyväksytty 89d877809); Grand Châtelet'n kyltti pisteen yläpuolelle vain tälle kohteelle (KK 21.30); NS:n komennot 10.5:een (PR 6316).

## ROOLIT
| Rooli | Tila | Auki, tarkista |
|---|---|---|
| KS | Luovutus 688ee28e7 | 1) nahtavyydet-219 ei VS:n mukaan käänny (Aurinko.cs:307, 9071a381b): viesti lähetetty, vahvistus puuttuu. 2) Kartan tummuminen 75°/45°: syy auki (valo sama, Tiheys b98dad633 ei selitä). 3) Horisontti pehmeämmäksi ajamatta. 4) Eiffel oikealla paikalla, maa täytetty, ajamatta; 70 m:n siirto (024338c23) vain kokeena, KK päättää. 5) Pystysauma: korkeusero pituuspiirillä 2,3291, korjaus KS:llä. 6) VS:n 9be47cc74 haaran päälle. 7) Vahtiosumat ennen junaa. 8) PT:n havainnot 85°: säteittäinen venymä ja Riemukaaren kyhmy, todennäköisesti vanhoja, ei varmistettu. 9) Riemukaari 24p (19cc4873d): KK:n sana ennen muita alustoja. |
| NS | Aloituslento ja 21.02 haarassa pariisi-aloitus-219 (kärki 648e932ac), proto-repossa | Ateena ajettu, tulos KK:lla, PT ei katsonut. Kamera maan näkymään noin 1 s Pulun alusta, syy todentamatta. Äänimuistivahdille poikkeus Perustellut-listaan, PT katsonut commitin. Ei junaan ilman omistajan lupaa. |
| NUI | e4b376546, JONO TYHJÄ | Kuvat KK:lla, haara odottaa KK:n sanaa. tarkista.sh: poikkeus vain Mac-ajoille, ei junaan. |
| PK | Luovutus 33f952754 | 7293ed891 ajamatta pelistä: kynnysviesti 225/245, 12 ovella ei kuljettavaa 10 m:n sisällä, 8 selvittämättä. Kujan este: kartan sääntö 2 m katettu = sisätila, 103 aluetta; tarkastelukuva seuraavaksi. KK:n ovikoe dc38e2ddc JU:lla. |
| LAV | lattia25 ajo JU:n jonossa | Yksi rakennus lattia21:stä; kuvia ei vielä. Uusi näkyvä vika: ei korjausta, vaan tulos ja vaihtoehdot PT:lle. Ei vientiä. Puhdas käynnistys ja lokitodiste vaaditaan. |
| VS | 2.213 kuvat KK:lla (cffdccab9) | Liikettä ei ajettu; Pont Neuf: kiilat ja mustat pikselit kerrottu KK:lle. Mittakaavaero Tripoihin KK:n asia, ei skaalausta. |
| JU | Jono: LAV 25, PK dc38e2ddc, mahdolliset muut | Runko kääntämättä, kysy JU:lta. |
| KK | Nollautui 21.32, uusi KK vastannut | – |

## AUKI PT:LLÄ
- Vahtiosumat jaettu (_tyo/natiivi-ui/vahtiosumat-20261105.md); KS:n 098cf05cd ja 16ff1de18 tekijä epävarma; kuittaukset odottavat.
- Työlistan rivit ilman tilannetta: Louvren iso pohja, Sainte-Chapellen pohja, Aloituslento: Louvre ja Riemukaari kytketään; ei uutta tietoa 16.4x:n jälkeen, kysy tekijöiltä.
- Asemataulun Odottajavahti ja TILA-rivit eivät tulleet tässä vuorossa.
- Postivahti: koti-checkoutit jäljessä, koska rooli on kotihaarassaan; skriptin viestikorjaus on committaamatta sen haarassa.

## LEVY
118 Gi 21.48 (raja 100).

## OPIT
- Raamattu-rivit ovat JS-merkkijonoja: heittomerkki kirjoitetaan \' ja node --check ENNEN committia, ei sen jälkeen (Châtelet'n meni PR:ään asti, korjattu ennen mergeä).
- `git worktree add -b haara polku origin/main`: polku ensin; väärä järjestys teki worktreen polkuun origin/main (poistettu).
- `echo =====` kaataa zsh:n komennon.
- Tekijä pyysi poikkeusta, PT tarkisti: "ei tästä muutoksesta" osoittautui NS:n oman haaran viaksi. Pyydä blame ennen kuin hyväksyt.
- Tark ei ole todiste: se ei löytänyt taitosta eikä z -514:ää. Lisätty tunnettujen vikojen pakollinen löytyminen.
- Tripolle kirjoitus: kysy KK:n "Kyllä" tuoreeseen tilanteeseen; otto 2 oli jo tehty, kun Kyllä tuli.

Tallenne: /Users/Shared/Claude/keskustelut/
