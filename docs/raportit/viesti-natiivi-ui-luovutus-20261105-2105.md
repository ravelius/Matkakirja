# Natiivi-UI: luovutus 5.11.2026 klo 21.05

Korvaa -2030:n. Työhaara proto-repossa: natiivi-ui/kyltit-219, kärki 6b6d53a49, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili natiivi-backup, peili/proto/natiivi-ui/kyltit-219. Ei omaa ajoa käynnissä. Ei junaan ennen KK:n sanaa.

## UUSIN, ENSIMMÄINEN TYÖ: OMISTAJAN PÄÄTÖS klo 21.07 (KK:n välittämä, kortti "Pyöreä kuva")
Viidelle (Tuileries, Grand Châtelet, Temple-torni, Galerie des Machines, Bastilji): leikattu kuva pois, sama pyöreä merkki kuin muilla (kuvana kohteen oma nostoruudun kuva), tumma tähtikyltti viereen, napautus kuten ennen. Neljä pelkän kyltin kohdetta (Orsay, Palais de l'Industrie, Trocadéro, Les Halles) ennallaan. Kuvat ylhäältä ja 45° kertoimella 0.465 KK:lle, rivi PT:lle. Ei junaan. Korvaa alla olevan "pelkkä kyltti" -tavoitteen.
Aloittamatta, kyltit-219:ssä ei committaamatonta. Lähtökohdat (ei kokeiltu):
- Kohdenostot.VainKyltti takaisin pelkkään "kyltti" (6b6d53a49 laajensi sen), Piirros pysyy null leikkeelle.
- NostotKartalla.Hae: kohdeKyltti tarvitsee leike-kohteet, muuten ruutu ei ole minimerkin kokoinen. Tarkista myös PariisinKyltti (rivi 572, ehto LeikeTunnistuu). Kylki: rivillä noin 2245 kadonnutKyltti && !VainKyltti antaa PiirrosKyljet tai "oikea".
- eiKuvaa laskee itsestään, kun VainKyltti on false: AsetaKuva(m, SaapumisKuvat.NostonKuva(id)), joka käyttää Kohdenostot.Kuva(id) eli Juttu.Kuvat[0]. VARMISTA, että viidellä on Juttu ja kuva: en ehtinyt, ja kadonneilla nosto on "hahmotelma-…", joten kuvan voi joutua hakemaan noston tiedoista (KaupunkiNostot.ValoLinkista, Nostokortti). Jos kuvaa ei ole, rivi PT:lle.
- AsetaKuvanPaikka laittaa kuvan kyltin oikealle puolelle. Tuileries'n kyltti on "vasen", joten kuva tulee pisteen kohdalle Louvren reunaan: katso, jääkö se mallin päälle, ja katso samalla, näkyykö kyltti chatelet-45:ssä (ks. AVOIN VIKA).
- Skripti pohjaksi _tyo/natiivi-ui/sk-pariisi-kyltit-13.txt; ajo JU:lta. Lento ja napautus uudelleen; b0bc70e7b pitää kohteen kyltissä.
- Parvis jatkuu samassa ajossa (ks. seuraava kohta).
- Tämä checkout oli vaihtunut haaraan koti/Matkakirja-natiivi-ui (klo 21.1x); luovutushaaraa ei tarvitse palauttaa siihen.

## LUE ENSIN: SEIS kuvien poistolle (OMISTAJAN PÄÄTÖS klo 21.04, KK:n välittämä)
"Kuvat pitää olla kadonneista aarteista" (20.51: "Näitä mini rakennuksia ei saa olla"). Pikkurakennuksen tilalle tulee kuva ja viereen tähtikyltti. Muoto tulee KK:lta kortin jälkeen: älä tee kuvia ennen sitä, äläkä siivoa leikkeiden koodia tai kuvia. Tämä kumoaa alla olevan tavoitteen "pelkkä kyltti" ja "AVOIN VIKA" -kohdan kiireen: kyltin paikka ratkaistaan vasta kuvan muodon kanssa. 6b6d53a49 on haarassa, mutta se ei ole lopputulos; älä vie sitä KK:lle tuloksena äläkä junaan. b0bc70e7b (lennon kohde) tarkistetaan samalla.
Jatkuu heti: Parvis Notre-Dame -nimi (selvitä, miksi se ei näy aukiolla, nimet etsi; KK: aukiolle tai ei näy). Tulos KK:lle ja rivi PT:lle omana eränään.

## Ensin: PT:n käsky (omistaja 20.51, KK)
Viisi kadonneiden pientä rakennuskuvaa pois kartalta, tumma tähtikyltti jää, napautus ja 2.210:n Tuileries-lento kylttiin. Parvis-nimi aukiolle tai ei näy. Tulos täysikoossa katsottuna KK:lle (local_231e4bad), rivi PT:lle. tarkista.sh jäi valovahtiin kesken: mainitse se, älä kirjoita "läpi". "Näitä = kaikki viisi" on KK:n tulkinta, ja KK kertoo sen omistajalle.

## Tehty
- 6b6d53a49: Kohdenostot.VainKyltti kattaa ratkaisun "leike", Piirros null. Leikkeiden koodi (LeikeKuva, LeikePuoli) ja kuvat Resourcesissa jäävät, kunnes omistaja vahvistaa; sitten siivous. b7e7a1de0:n kuvan siirto poistettu.
- Parvis: Nimikerros, qid Q2720522, nimi "Parvis Notre-Dame", piste 48.85464 2.34881, eiVaisty.
- ui kohdenostot napauta osuu kylttiin; uusi ui kohdenostot lenna <nimi> ajaa saman Aja-kutsun kuin Saapumisesitys.
- natiivi-ui/pariisi-lento-219 b0bc70e7b (worktree proto-natiivi-ui-nousu-pieni): TuileriesLat/Lon = kyltin paikka 48.8631 2.33046, aiemmin 48.8622 2.3325. Ei ajettu; kyltit-219:ssä ei ole D2-koodia (d81627510), joten oikea reitti kuvan napautuksesta testataan vasta yhdistettynä.

## Ajo 6b6d53a49
lokit/julkaisija-pariisi-kyltit-6b6d53a49, skripti _tyo/natiivi-ui/sk-pariisi-kyltit-13.txt, rajaukset/-kansio. Nähty:
- Lento: lokissa "perillä", kyltti näkyy kuvassa tuileries-lento. Napautus: lokissa osuma mk-nosto-merkki__nimio Tuileriesilla ja Bastiljilla; Tuileries'n kortti auki kuvassa tuileries-kortti. "avaa"-rivi tulee lokiin kahdesti, samoin aiemmassa ajossa (Les Halles), joten se ei ole tästä muutoksesta.
- Parvis ei näy chatelet- eikä chatelet-45-rajauksissa. Se täyttää KK:n ehdon "tai ei näy", mutta syytä ei selvitetty (nimet etsi).

## AVOIN VIKA, korjaa ensin
Tuileries'n kyltti puuttuu chatelet-45:stä (rajaukset/c-tuil45.png), ja puiston nimi "Tuileries" näkyy sen tilalla. Vika on PT:n "kyltti jää" -vaatimuksen vastainen. Todennäköinen syy, ei mitattu: kuvan poistuttua kyltti siirtyi leveyden verran lähemmäs pistettä, jolloin KylttiOsuuMalliin-testin kaukainen puolisko osuu Louvreen viistosti. Ehdotus: kyltille PiirrosPeitot-kohteissa sama väli kuin kuvalla oli (KyltinLaatikko, ennen LeikePuoli.x, noin 55 kuvapikseliä), tai piste kauemmas mallista (myös lennon kohde pariisi-lento-haarassa).

## Katsomatta täysikoossa
tuileries-45, chatelet (Grand Châtelet), Temple-torni (chatelet-45:n reuna), bastilji, galerie. rajaukset/e-bastilji.png ja f-galerie.png rajattiin väärin arvatuista kohdista: rajaa uudelleen. Korjauksen jälkeen uusi ajo JU:lta samalla skriptillä (uusi sha), kuvat KK:lle.

## Muu
- b7e7a1de0:n vesinimet ja saaren nimet: kuvat KK:lla, kuittausta ei ole kirjattu. PT: vesinimissä tämä sääntö voittaa KS:n 7a4b98e62:n. Fontaine des Innocents ei pienene, koska se on merkittävä kohde.
- Sivuhavainto KK:lla: pystysauma b7e7a1de0:n vesisaanto-tuileries-45:ssä (rajaukset/g-sauma.png), ei selvitetty.
- Junaan: 627a664c4 ja web PR 6307, ks. -2002. Avoin: nappien kuvapari, ks. -2002.
- Testit: ElavaKartta ja NimiLadonta ajettu b7e7a1de0:lle. 6b6d53a49: unity-tarkistus 0 virhettä, SaareltaPoistetut 1/1; tarkista.sh jäi valovahtiin (ei tästä muutoksesta).
