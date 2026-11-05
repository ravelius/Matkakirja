# Natiivi-UI: luovutus 5.11.2026 klo 16.16 (konteksti 34 %)

Korvaa -1537:n. Työhaara `natiivi-ui/kyltit-219`, kärki b09c05441, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Sääntö 2.214: näkyvä Pariisin askel → Macin kuva (polku + yksi rivi) KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Mac-ajot JU:n vuorolla. KS (local_7b57e35a-3a8e-4943-aba1-c960b9eb4671) ja NUI tekevät samaa haaraa: KS:n kärki karttaseppa/nahtavyydet-219 pyydetään JU:lta yhteisenä ajona, joten kerro uusi kärki KS:lle, kun korjaus on valmis.

## Ensin
1. Kuittaa JU:lle (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd) "NUI valmis". Ei ajoa kesken eikä jonossa.
2. Ennen vuoron pyytämistä JU:n pyynnöstä: `zsh /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219/tyokalut/tarkista.sh 2>&1 | grep -E "virheitä yhteensä|vahti"` (Raamattu 10.4). Skripti generoi Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json uudelleen: palauta ne `git restore`:lla, älä committaa.

## Viimeisin ajo b09c05441
/Users/Shared/Claude/proto-3d/lokit/julkaisija-pariisi-kyltit-b09c05441/ (JU, 16 kuvaa, PUUTE 0). Katsottu vain kyltit-keski.png ja kyltit-viisto.png, pienennettyinä. Kuvia EI ole viety KK:lle tästä ajosta: katso muut 14 täysikokoisina ja vie tulos KK:lle ja kopio PT:lle, kun kohta 1 on ratkaistu (tunnettua vikaa ei leikata).

Näkyi korjautuneen: kasauma pieni, Les Hallesin kyltti esillä, pallo pois tornista, Pariisi-nimi keskustan etelälaidalla mutta ei enää Gentillyssä, jättinimiä ei näissä kahdessa kuvassa. Pallon hintakyltti puuttui keski-kuvasta, koska se väistyy Les Hallesin tieltä (tarkoitettu).

## Auki, suuruusjärjestyksessä
1. PYÖREÄT KUVAT ILMAN KYLTTIÄ EIVÄT KORJAANTUNEET (KS:n kysymys; korjaukseni c62dbe66f ei riittänyt). keski: Élysée-puoli (kuvassa 217,212), Saint-Sulpice (420,408), Orsayn toinen kuva (425,347). viisto: Saint-Germain nimen päällä (108,393), Orsay (128,272), Notre-Damen vieressä (489,355). AsetaKuva on ainoa kutsu (NostotKartalla.cs ~2059), joten eiKuvaa on näille epätosi: niillä on m.Kyltti tosi ja nimi, mutta kyltti ei näy eikä KylttiTormaa ole syy, tai kuva tulee muualta. Syy tarkistamatta. Tee näin: `ui kohdenostot` (KohdeTila) ja m.Kuva/Nimio-tila yhdestä kohteesta skenaarion lopussa, ja katso, mikä piilottaa nimiön (AsetaNimio, AsetaNimionPeitto). Kerro tulos KS:lle.
2. Vaalea tekstitön laatikko: viisto (415,205), myös kyltit-louvre-lansi.png. Ei ehkä kyltti, koska kuvasta ei erotu tekstiä; näkyi vasta Louvren oton 4 jälkeen, joten epäilen Louvren pohjaa. Tarkistamatta. KS kysyi tätä; vie KS:lle.
3. Grand Châtelet'n ★-kyltti on Notre-Damen tornin päällä viistossa (viisto 490–580,300; KK kertoi omistajalle). Nostokyltit eivät väistä mallien jalanjälkiä.
4. Kaukaiset kyltit matalalta (omistaja 14.55 "matalalta vain lähimmät kohteet"): ei etäisyysrajaa. Katso hor-1…3 skenaariosta aja.zsh; JU:n yhteisajossa nämä kuvat eivät ole mukana.
5. Temple-tornin, Bastiljin ja Galerien leikkeet ovat kaukaa hyvin pieniä. KS:n commit 00a6c378c: kuva vasta 24 pt:stä, kauempana pelkkä ★-kyltti (KK 16.01). Tarkista lähikuvista, ettei lupaus "kuvat jäävät" (omistaja 14.57) rikkoudu.
6. `komento nimet etsi Pariisi` ei tulostanut lokiin mitään aja.zsh:n lopussa (ajo päättyy ennen komennon käsittelyä). Lisää skenaarion loppuun `odota 5`, jos diagnoosia tarvitaan.
7. -1537:n muut havainnot: valkoiset kyltit pystykirjaimin 3D-kohteilla ja kursiivilla nostoilla (2.212 "samanlainen"); kartan sumea raja kuvissa.

## Tehty tässä sessiossa
- 098cf05cd: näkymättömät merkit ja kyltit eivät varaa tilaa (lentopiilo, törmäys, pieni koko); kaupungin nimi palaa kaukopaikalta, kun lähempi vapautuu (syy luettu koodista, ei lokista); elävä nimi häipyy em-koossa 34–44 pt; huiput alle 300 m tai ilman korkeutta pois (koskee koko karttaa); pallo ja kyltti häipyvät 3D-mallin kohdalla.
- 81f66d783: törmäyksen takia häipyvän kyltin pyöreä kuva häipyy mukana.
- c62dbe66f: kuva vain kyltin kanssa ja ei pelkällä ★-kyltillä (ks. Auki 1), pallon hintakyltti väistää nosto- ja 3D-kylttejä (entinen 098cf05cd:n kirjaus poistettu, koska se hävitti Les Hallesin), 3D-kylttien usvahäivytys kapea (0,4–0,8).
- Yhdistetty KS:ltä: e88559857 (leikkeet), 44e65c788 (Louvre otto 4), b4cf1f86d (Peilisali), a5a096efd (Tuileries), 00a6c378c (kuva 24 pt:stä).
- Omistaja 15.59: tumma tähtikyltti kelpaa (KK:n välittämä, työlistalla). Ei koodimuutosta.
- Huomaa: b09c05441:n tarkistusta ei ole ajettu; ajo meni läpi JU:lla.

## Huomiot
- PT: kun erä kootaan pienelle iPadille, JU:lle "KaytettyRaja() ja || Kiertaa palautetaan, kun lento-haara yhdistyy" (be9b73bc7). JU:lle kerrottu 15.45.
- Älä yhdistä lento-haaraa suoraan (52 committia, ristiriita Laattapalvelin.Elava.cs:ssä). Yhdistämisestä päättää PT.
- zsh: `"${K}:polku"`, ei `$K:polku`; `====`-rivit echossa kaatavat komennon, käytä `'---'`.

## Lisäys 16.3x, KK 16.2x
Kärki on nyt ed6c66eaf (tarkista.sh 0, pohjavahti ok, ajamatta), JU:n jonossa. Nostokyltti häipyy 3D-mallin rajauslaatikon kohdalta (Les Halles Louvren ja Bastilji Notre-Damen päällä), sama koskee Grand Châtelet'tä (Auki 3). Rajauslaatikko on mallia väljempi, joten katso kuvasta, häviääkö kallistettuna liian moni kyltti mallin vierestä; jos häviää, käytä tiukempaa rajaa. KK odottaa Macin kuvaa tästä: katso kyltit-louvre-lansi ja kyltit-louvre-viisto, vie kuva KK:lle.
