# Natiivi-UI: luovutus 5.11.2026 klo 22.48 (konteksti noin 30 %, 7.37; PT: "Tee luovutus")

Korvaa -2154:n. Haara natiivi-ui/luovutus-20261105-2248. Lue sen lisäksi -2002 (kontrasti ja nappien kuvapari).

## Kipsipäät: EI työtä
KK 5.11. 23.3x: kipsipäille EI tehdä kylttiä. Omistaja ei pyytänyt niitä: 11.53 "muut kipit", 11.56 "kipillä tarkoitan kuumailmapalloa". Lainaus "(kipsipäät, Olavinlinna, ISS-raketti)" oli työlistan tekstiä, ei omistajan; rivin oma KORJAUS sanoo "kipsipäitä ei tehdä tämän pyynnön nojalla", ja Raamattu 2.212 ei mainitse niitä. Tehty kokeilu 37554f678 kumottu e5d2acf8f; kyltit-219:n sisältö = e4b376546. Älä tee työtä uudelleen.

## Tila
Vahtiosumaerä valmis, PT kuittasi 22.4x lukujen perusteella (kuvia ei ole katsonut). Junaan vain PT:n kautta. e4b376546 odottaa yhä VS:n ja KS:n osumien varmistusta. Omaa jonoa ei ole.

## Vahtiosumat (proto-repo, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-liikevahti, ei committaamatonta)
- natiivi-ui/liikevahti-219 cbc744e21 (pohja 098cf05cd): PariisiKallistus.Sileana → Liikepohja.Jousi (τ 0,2 s; pitkä ruutu askelina), Nimikerros-poikkeus. PT: jousi voittaa Karttasepän merkinnän (fbb5ba2e3) yhdistettäessä, Nimikerros identtinen. Törmää PariisiKallistuksessa haaroihin nahtavyydet-219, katsepiste-maa-219 ja ohjelmakohteet (vierekkäiset vakiot).
- natiivi-ui/malli-kyltit-liike-219 d2f8e2b19 (pohja 9e8c8ab1e): kyltin siirto Liikepohja.Kayrat.Sisaan. Törmää vain kyltit-219:ään yhdellä rivillä: tämä voittaa, koska sen merkintä "ei liike ajassa" (690f5e141) oli väärä (näkyvyys etenee MoveTowards-liikkeellä). Ratkaisu valmiina: ae7278c0a.
- natiivi-ui/vahti-ajo-219 71da09e11 = e4b376546 + molemmat + ajon loki (nostoloki, kylttiloki). EI JUNAAN: viimeinen commit on vain koe.
- Ajot: lokit/julkaisija-vahti-ajo-71da09e11 ja -ajo2-71da09e11. Unity 0 virhettä. Nosto 981 ruutua, silmä ei alle rajan, ylitys 0,01 m. Kyltti e 0,215 → 0,908 → 0,994. Kuvat katsottu: kyltit paikallaan.
- Rajaus: kyltin siirto näkyy vain nopeassa lähennyksessä (kyltti aukeaa kaarella 0,02, malli täysi 0,13); ajettu 0,2 s:n lähennyksellä, 3 ruutua. Kuvissa ei ole videota; "liikkeessä" on todennettu ruutulokista.

## Avoin
1. Maastonäytteen 158 m:n hyppy (PT 22.4x: ei korjausta nyt, ei tämän erän regressio, omistaja ei ole pyytänyt). Näyttö: ajo 1 f2073 nayte 255,1 → 97,6 yhdellä näytteellä; kamera laskee noin sekunnissa, huippu 300 m/s, jatkuvasti. Selvittämättä: millä kohdalla hyppy syntyy (malli vai maasto; silmän paikka Montmartren rinteellä, 85°:ssa) ja näkyykö se pelaajalle. Huom. kuva vahti1-montmartre-85: vasemmassa alakulmassa pystyraitaa, ei liity tähän, ei selvitetty.
2. Esittelykuva jää pois hitaalla latauksella: siirretty NS:lle, ET korjaa (-2154).
3. Yhdistyskoe e4b376546 + natiiviseppa/pariisi-aloitus-219: törmäys Nimikerros.cs:ssä; ratkaistaan, kun haarat yhdistetään.
4. Tuileries'n merkki ja kyltti 45°:ssa Louvren seinän päällä (kyltit18-chatelet-45). KK kertoi omistajalle. ÄLÄ siirrä ilman sanaa.

## Työlistan rivi "Erikoiskohteiden kyltit" (pyysi PT 22.4x)
Tila: pallo ja Olavinlinna ja raketti tehty (d62c02edd, 520706177, Orsay ede32e764), kaikki kyltit-219:ssä kärjellä e4b376546, ei junassa. Odottaa junalupaa (VS:n ja KS:n osumat). Kipsipäät eivät kuulu sääntöön (KK 23.3x, ks. yllä). Työlista päivittämättä; rivit kirjaa PT.

## Muu avoin (ennallaan -2154:stä)
- Leikkeiden koodi ja kuvat (LeikeKuva, LeikePuoli, LeikeTunnistuu, Resources) jäävät, kunnes omistaja hyväksyy muodon: siivous vasta sitten (SEIS 21.04).
- b0bc70e7b (lennon kohde, pariisi-lento-219, proto-natiivi-ui-nousu-pieni): tarkistamatta yhdistettynä.
- Palais de l'Industrie ja Trocadéro: pelkkä kyltti, ei kuvattu, koodi ennallaan.
- b7e7a1de0:n vesinimet ja saaren nimet: kuittausta ei kirjattu. Sivuhavainto: pystysauma vesisaanto-tuileries-45, ei selvitetty.
- Junaan: 627a664c4 ja web PR 6307, ks. -2002. Avoin: nappien kuvapari, ks. -2002.
- Louvren ja Riemukaaren kytkentä aloituslentoon odottaa omistajan 16.41:n linjan takia: ÄLÄ jatka (PT 21.5x).
- Lukulista: luvut 4 ja 6 luin tässä vuorossa vain otsikoina; luettava seuraavassa, jos erä on UI:ta (7.47).

## PT:n linjaukset (ennallaan)
- 2.215: kyltti pysyy kiinteällä sivullaan, siirto vaatii KK:n sanan ennen ajoa; selvitä syy ensin.
- Valo- ja liikevahdin muiden osumat eivät estä Mac-ajoja, jos muut tarkistukset menevät läpi ja haara ei lisää osumia. Junaan vahdit puhtaiksi.
- tarkista.sh on zsh-skripti: aja zsh:lla. Se pysähtyy valovahtiin, joten muut ajetaan erikseen.
- JU: enintään noin 5 kuvaa ajossa tai yhden rivin perustelu pyynnössä; ajo vain uudella pyynnöllä.

## Huomio komentoihin
zsh: lainausmerkitön "$r:Assets..." tulkitaan muuttujan muunnokseksi (:A), käytä "${r}:polku". Lainausmerkitön "$P" ei jakaudu sanoiksi, käytä taulukkoa.
