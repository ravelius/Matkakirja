# Valoseppä: Euroopan kartan korjaukset tauolla 5.11.2026 klo 10.57

OMISTAJA 10.55 (PT): järvet, rajat, Alpit, tasorajat ja verkon palautus odottavat, kunnes juoksupeli ja Pariisi ovat valmiit. Verkon palautus tehdään ennen seuraavaa julkaisua. VS siirtyy Pariisin kartan töihin. Ei iPad-ajoja (omistaja 10.52, Raamattu 2.209). Työlistan rivi: "Euroopan kartan korjaukset odottavat". Edellinen luovutus: viesti-valoseppa-luovutus-20261105-1045.md.

Kaikki alla olevat polut ovat kansiossa /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/striimi/ ellei toisin sanota. Niitä ei ole gitissä.

## Järvet (koe d82f7e5ce, natiivi-backup linssiseppa2/jarvet-koe, vain Mac, ei junassa)
- Pari KK:lla 10.46: jarvet/parit3/ (tapa{1,2}-{t105,t110,t113,t115,s110,s113}.png, kooste-*.jpg). KK:n vastausta ei ole tullut. Suositukseni: suunta kelpaa, pinta ei ole valmis.
- Viat: t115 järvi vaihtuu palarajalla terävästä pehmeään; t105 koealueen reuna; tapa 1 haaleat ääriviivalliset laikut t110, t113 (d82f7e5ce:n piti korjata, ei poistunut, syy auki); tapa 2 haaleat oranssit täplät (t105, t110, t113, s110, s113; syy auki); suorat palarajat katkaisevat rantoja (t113, s110 tapa 1; t115, t110 tapa 2); pieniä oransseja pisteitä järvissä (s110, t113 tapa 1; saarisuus varmistamatta).
- Tuotteeseen tarvitaan: pohja z6-z10 ja kerma z<=8 koko Euroopasta, PohjanVesiPysyy-päätös, mediavienti, iPad-todistus. Omistajan lupa ja tila ensin.

## Valtionraja (aloitettu, ei korjausta, ei koodia)
Kooste raja/TULOS.md; peittokuvat raja/ylle-pieni.png, r-keski.png, brenner.png.
- Raja on aineistossa (vektorit 2026-10-07-swe-korkeus, rajat/l4/18_4.bin, 19_4.bin).
- Hypoteesi, ei testattu: tiheydellä 0,81 viivaa ei piirrä mikään. Karkea kerros piiloon tiheydestä 2715 px/° (Laattapalvelin.ElavaKarkeatPoisTiheys, takaisin alle 2172), kuvassa z10-pohja ilman näkyvää viivaa, elävän z11:n pyyntöjä ei lokissa. Tiheys arvioitu 0,85:n lokiarvosta 2737.
- Toinen epäily, ei mitattu: elävän viivan Seepia 70,51,31 alfa 150/255 ei erotu varjosta.
- Koe raja/sk-raja-taso.txt (2d8ec025c, Mac): PERUTTU JU:lta 10.56. Aja, kun työ jatkuu: se kertoo karkean kerroksen tilan ja elävät tasot korkeuksittain.

## Tekemättä
Alpit (lähes mustat varjoalat vaaleammiksi, pinnanmuodot säilyvät), tasorajat l-z12 ja h-z13-k45, verkon palautus (ohje -2243 kohta 2 ja lisäys 2; yksi kierros, oma haara, ei junaan, EI kytkinrunkoon; pakollinen ennen seuraavaa julkaisua). ND-pohjan laikku KK:n listan jälkeen.
Muut avoimet: piirtotapa 1 vai 2 on omistajan kokeilu (a5323cf4e).
