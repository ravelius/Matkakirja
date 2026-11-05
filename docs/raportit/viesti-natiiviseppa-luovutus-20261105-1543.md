# Natiivisepän luovutus 5.11.2026 klo 15.43 (konteksti 28 %, pehmeä raja, 7.37)

Korvaa -1525:n jonon ja "Seuraavan ensimmäisen työn". Muu -1525 lisäyksineen, -1510 lisäyksineen ja -1438 pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta. Remote päällä, Raamattu 7.47 luettu. Zsh: älä tallenna komentoa muuttujaan (`G="git ..."` ei toimi), `echo ====` kaataa komennon, ja `--include=*.cs` vaatii lainaukset.

## Jono
1. JU:n ajo natiiviseppa-intro-kallistus-9bb4e3476 (pyydetty 15.42, jonossa): katso kuvat, sitten KK:lle ja kopio PT:lle.
2. Tyhjä pohja nopealla lähdöllä: EI korjattu (alla).
3. Liiku-loitonnus (omistaja 15.05): aloittamatta, ohje ja KK:n sanat -1510:ssä. Tee samaan haaraan.
4. 85° ja lähi-horisontti: KK:n vika-lista (-1525 lisäys 15.27) tarkistetaan saman ajon kuvasta n-1km-85.
Laitteella katsominen vasta loppumittauksessa (_tyo/natiiviseppa/loppumittaus-pariisi.md).

## Haara: natiiviseppa/intro-kallistus-219 9bb4e3476
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto-koe, peili natiivi-backup peili/proto/natiiviseppa/intro-kallistus-219. tarkista.sh 0 virhettä (tyylikirjan kolme tiedostoa palautettu), `sh Linssit-testit/kaanna.sh PalloLiikeTestit` 15/15.
- Yhdistys b2dfb7e2d: natiivi-ui/kyltit-219 f29bbd0b5 (sisältää mallihaaran 8d0cf457e:n ja 85°:n poimintana 81ecf3f17, a88c8f846 ei ole esi-isä) + natiiviseppa/saapuminen-karkea-219 461a0241e (sisältää rungon d5850ff4e). Konfliktit: ElavaTyyliVersio e30; PalloKierto: `vapaaKuvaus || Kiertaa ? kallistus : min(kallistus, KaytettyRaja())` katolla MaxKallistus; KarttaKyltti kylttihaaran laajempi versio.
- NUI jatkaa kyltit-219:ää: sen uudet commitit eivät ole tässä. Yhdistä ennen KK:lle menevää lopullista kuvaa, jos NUI:n kyltit muuttuvat.
- 15.18:n muutos 9bb4e3476: KiertoOhje.Kallistus 60 (oli 30, 60° on oma arvioni: ruudun yläreuna jää laskelman mukaan juuri horisontin alle). KaupunkiKierto ei palauta kallistusta nollaan, joten kallistus säilyy kierron jälkeen luennan ajan; suunta palaa silti pohjoiseen. KiertoLasku alkaa kallistaa 20 %:ssa laskua (oli 40 %), huippuvauhti laskennallisesti noin 35°/s. Soikio pois (Saapumistraileri, Introesitys; Introesitys himmennys-lipun mukaan), kirjaimille ja iskulauseelle 1 px:n reuna ja tiukka varjo luokalla mk-traileri__teksti--ilman-soikiota (Pulu.uss). Kaksi olemassa olevaa testiä päivitetty uuteen loppukallistukseen; uusia testejä ei.
- Laskelma, ei nähty: Notre-Dame noin 44 px iPadilla 6,6 km:stä ilman mallin mahdollista liioittelua. Jos rakennukset jäävät pieniksi, kokeile matalampaa kiertoa (KaariAst); omistaja ei ole ottanut korkeuteen kantaa. Mallit näkyvät täysinä kaarella ≤ 0,13 (Nahtavyysalue.LahiKaari), kierto on 0,0553.
- Avoin riski loppumittaukseen (lisää listaan, en lisännyt): 60° ja kallistus luennan ajan lisäävät näkyviä paloja, muisti mittaamatta.
- Vain kierron saapuminen (matka Pariisiin, SaapumisKierto) kallistuu; Pariisista aloittava peli ei.

## Ajo pyydetty: skenaario-intro-kallistus.txt
_tyo/natiiviseppa/aloituslento/, kansio lokit/natiiviseppa-intro-kallistus-9bb4e3476, 29 kuvaa: i01–i27 (zoomauksesta luennan loppuun, aika-arvio riittävyydestä tarkistamatta) ja n-1km-85, n-6km-60. Lontoo → Pariisi, odotus 8 s.
Katso täysikokoisina omistajan sanoja vasten: kartta sivusta koko lennon, 3D-rakennukset seisovat, nimen takana ei tummennusta ja nimi luettava. KK: ruutusarja KK:lle, omistajalle vasta, kun Notre-Dame seisoo kuvassa. Tarkista n-1km-85:stä jättinimi "embâcle", maastokohouma Seinen päällä, portaikkoinen etuala ja kolmio (KK:n sanat -1525:ssä).

## Saapumisajo 461a0241e katsottu (KK:lle ja PT:lle 15.42)
Kuvat lokit/natiiviseppa-saapuminen-461a0241e, arkista ja p02–p03 puolikkaana; muita ei täysikokoisina. PUUTE 1 = Lontoon intron aikaraja, sama kuin ennen.
- Tyhjä pohja: p02–p03 hiekkaa, p04:stä kartta. Ennakko käynnistyi (loki 12 km) mutta valinnasta zoomaukseen vain 4,1 s. Hypoteesi "Cesium näyttää ladatun tason varakuvana" jäi todistamatta: ajo ei kerro, ehtivätkö ennakon palat latautua. Matkaseuranta: 6,24 s 47,7 km pallo 8 %, 8,89 s 6,6 km pallo 78 %, ja kohdejono kasvaa 140:een.
- Seuraavaksi: lisää ennakkoon lokiin palojen määrä ennen laskua ja vertaa 150 s:n odotukseen (matka2). Vaihtoehdot -1525:stä: kerroin 1,5 tai 1 ja säteet. KK: "lähti hän miten nopeasti tahansa", joten pitkä odotus ei riitä ratkaisuksi. Ehdotus, kokeilematta: viivytä laskun alkua, kunnes karkea taso on piirretty, aikarajalla.
- Lontoon kortti ja ISO-BRITANNIA poissa, RANSKA p01:stä. Kartta ei tummu (loki "ei himmennystä"). Soikio näkyi p05–p06 (15.18:n vika).

## Liiku-loitonnus
Lukemani lisäys -1510:een: ElavaKartta.AloitaSaapuminen (rivi 494) vain käynnistää kohtauksen, kamera tulee TestiSaapumisessa PalloKierto.AjaSaapumisnakymaan(maa, lat, lon, kesto, valmis): katso se ensin (periaate 8). Huom: kallistus on nyt 60° ennen Liikua, joten paluun tallennus on olennainen ja kallistus 60° pitää palauttaa. Matkavalinta.VaihdaLiuku ja SuljeUlkoa kuten -1510.

## T7 → NAS 2. erä
pid 58484 käynnissä 15.36 (2 h 7 min). Monitor kuolee nollauksessa: aseta uudelleen. Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.

## Työpuut
wt/proto-natiiviseppa-kierto jää 461a0241e:hen, ajo on valmis, joten sen saa ottaa käyttöön. Koehaara f446775c8 ei enää ole työpuussa, haara säilyy.
