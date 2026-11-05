# Valosepän luovutus 6.11.2026 klo 01.35

Korvaa luovutuksen -0115. Syy: konteksti pehmeällä rajalla (Raamattu 7.37). Maa, helma, varjo ja mittarit: katso -0115, ne pätevät.

## TILA
Koodi ce71f945b, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 13/13 (`sh aja-geometria.sh`, kaikki: `<dotnet> rak/G.dll OhjelmaKohde`). Unityssä EI käännetty eikä ajettu: 2e9394de8, d4a37f2c3 ja ce71f945b ovat näkemättä.
Työkansio D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## KK 01.15 JA 01.20: PÄÄTÖKSET
- Pompidou POIS (Raamattu 11.8), ei korvaajaa ennen KK:n sanaa. KK kertoo omistajalle aamulla; poikkeus tulee vain KK:lta.
- Kaikki seuraavat kohteet tarkistetaan ennen koodia: tekijä, kuolinvuosi, lähde. Suunniteltu 1956 tai myöhemmin = suojattu. Suojattu tai epäselvä pois omana committinaan; kartan oma silta jää näkyviin.
- Tournellen patsasta ei lisätä. Siltojen päitä ei lyhennetä ennen kuvaa. Maastotasot KS:lle, älä tutki.
- Ei omaa ajoa. Jos Unity ei käännä, korjaa ensin.

## TEHTY
- d4a37f2c3 Tour Saint-Jacques: OSM way 20326709, 12,1 × 12,1 m, akseli −21,6°, MaaH 43,5 (mediaani 86,9 z12). Portaikkotorni luoteiskulmassa (päätelty kuvista -1 ja -7). 54 m on lähdemitta, muu kuvista (-7, noin 31,5 px/m); kärki 62,9 m arvio. Offline-kuva a/oma/tour-saint-jacques-k45.png; vertaa viitekuviin, karttakuvaa ei ole. Viitekuvat a/viite/Tour Saint-Jacques-1,3,4,6,7.
- ce71f945b pois: Carrousel, Arts, Notre-Dame, Tournelle, Saint-Louis, Senghor. Jäljellä 12 siltaa. ÄLÄ aja `a/tee-sillat-cs.py`:tä: se palauttaisi ne.
- Lista ja sen korjaus lähetetty KK:lle 01.30. Tallennetta ei ole muualla kuin näissä viesteissä. Avoin kysymys KK:lle: Concorden levennys 1930–32 (Deval, Malet, Lang) on minun arvioni "muoto Perronet'n", KK voi kumota. Hakematta: Gaspard, Deval, Drogue, Aron, Retraint.

## SEURAAVA AJO (JU:lta vuoro, kun KK tai PT pyytää; en ole pyytänyt)
`D/sk-maa.txt`, 6 kuvaa: pb-etu, pb-piha, p-roy, p-pn-oik, tsj-pohj, tsj-et. Yksi kysymys: seisovatko kohteet maassa niin, ettei rakennus tai silta näytä leijuvan eikä uppoavan (omistaja 21.28). p-roy korvaa KK:n pyytämän p-carin, koska Carrousel poistettiin; kerrottu KK:lle. Ajohaara: ohjelmakohteet + e726bba9f (`git merge-tree --write-tree`, `git commit-tree`, `git branch -f`), ei viedä. JU vaatii rivin "mitä tämä ratkaisee": se on sk-maa.txt:n ensimmäisellä rivillä.

## SEURAAVAKSI
Saint-Eustache (OSM way 53762963, 109×49; height-tieto 10 on virheellinen, holvi 33,46 m), sitten Saint-Sulpice (way 16077204, 122×57; porttikäytävä 32 m leveä). Vuodet 1532–1633 ja 1646–1870 tarkistettu fr.wp:stä, nykyteoksia ei mallinneta. Ensin kuvat: `python3 -I D/a/hae-viite.py listaa <kohde>`, `hae <kohde> <i> ...`. Malli: Tsj- ja Pb-apurit OhjelmaKohdeRakennukset.cs:ssä. MaaH: lisää `maa/kohteet.py`:n listaan, aja `aja-geometria.sh` ensin, sitten `python3 kohteet.py` kansiossa maa/ (ilman -I).

## AUKI AAMULLA (KK)
Kaide-pisteet, 14 m:n seinät, Notre-Damen pää, Pont au Doublen mitat 38/94 m: KK kertoo omistajalle.

## MUUTA
Natiivi-backup hylkäsi viennin 01.23 kolmesti (`fatal error in commit_refs`), neljäs meni läpi. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
