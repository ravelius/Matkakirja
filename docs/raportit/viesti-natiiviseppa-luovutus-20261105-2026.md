# Natiivisepän luovutus 5.11.2026 klo 20.26 (konteksti yli 30 %, pehmeä raja, 7.37)

Korvaa -2005:n "Seuraava työ" -kohdan. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; tilinvaihto.md, roolitaulukko).

## Seuraava työ: OMISTAJAN PÄÄTÖS 20.20 (KK:n välittämä, Raamattu 2.161 ja 2.210, PR 6311)
Kortti: "Saako aloittava pelaaja Pariisiin uuden aloituslennon vanhan intron tilalle?" = "Kyllä (Suositus)"; kortissa: "Kamera kiertää, kuvat nousevat kartalta ja William sanoo nimen ja iskulauseen."
KK: koskee vain Pariisia, muut aloituskaupungit 2.161:n mukaan. Toteuta yhdessä KK 20.15:n linjan kanssa: William trailerin päällä, ei isoisän puheen päällä, 2.210 ennallaan. Tarkista Macilla kerran oikeaa aloituslennon reittiä, ruutusarja ja loki → KK. Kerro KK:lle, soiko intron nopea kappale tässä kulussa. Ei iPadia, ei junaa.
PT 20.2x: aloituskaupungissa ei ole isoisän puhetta (PT:n tulkinta 2.161 kohta 2, KK:lla tarkistettavana), joten kierron loppu sidotaan muuhun kuin luentaan; ajoitus omalla harkinnalla, ellei KK sano toisin. Ei erillistä ajoa: kaikki yhteen JU-pyyntöön, kun koodi on valmis (JU odotti nollausta). Tulos KK:lle ja rivi PT:lle. Kuvat katsotaan itse ennen lähetystä.

KK:N LISÄ (KK:n tulkinta, ohittaa alla olevan kohtien 3 ja 5 ajoitusarvion): aloittavalla pelaajalla Pariisissa 2.161:n kohdat 2 ja 3 pysyvät: ei isoisän puhetta, Pulu aloittaa suoraan. Kierto hiipuu pehmeästi Pulun aloituksen alkupuolella (ei esityksen lopussa). Isoisän Tuileries-kuva ei nouse tällä reitillä (C5/isoisän kuva pois sarjasta). Viisi nähtävyyskuvaa nousee kuten 2.210:ssä.

## Haarat: tärkein löydös
- natiiviseppa/pallo-aloitus-219, kärki d369d4aab, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, puhdas, peili natiivi-backup peili/proto/natiiviseppa/pallo-aloitus-219. Testit 533/533, unity-tarkistus 0. EI nähty ajossa. PT kuittasi tiedoksi; "ei valmis ennen kuin nähty ajossa".
  - b5205fa87 peruttu (79b90f39c): AloitusintroTulossa-ehtoa EI poisteta, koska se palauttaisi sumean intron muille saapumisille.
  - d369d4aab: KaupunkiIntro.WilliamEsityksessa, PeliOhjain.MatkanLahto, Saapumisesitys.WilliamEsitykseen. Toimii vain uusi-peli-testireitillä; siksi ei riitä sellaisenaan.
- 2.210:n KIERTO EI OLE TÄSSÄ HAARASSA: KiertoHiivu on natiiviseppa/saapuminen-porras-219:ssä 379991bd6 (sisältää 45abf3d41). Liiku on 99748962f:ssä liiku-loitonnus-219:ssä (yhdistyy portaaseen ilman ristiriitoja, ei tarvita tähän ajoon). JU:n runko-219-muisti 94f7eb0e4:ssä kumpikaan ei ole. Merge d369d4aab + 379991bd6: 2 ristiriitaa (merge-tree, ei tehty): Kartta/ElavaNimet.cs ja UI/Pulu/Saapumisesitys.cs.
- Ehdotus: uusi haara natiiviseppa/pariisi-aloitus-219 = d369d4aab + merge 379991bd6, ei junaan. Kerro PT:lle yhdistys rivillä.

## Reitti koodista (ei ajosta)
Oikea pelaaja: UusiMatka → AloitaAloituslento (kohde ≠ Lontoo) → AloituslentoLoppui → AloitusintroSaapuminen(alkulento: true) → AloitusintroTulossa tosi (alkulento ohittaa nousukokeen) → NaytaAloitusintro: AloitusintroNakyma, sumeaTausta: true. KaupunkiIntro.AloitusSaapumisella tosi → Saapumisesitys.UusiEsittely epätosi, joten nykyintro ja nousu eivät tule. 3 694 lokissa ei yhtään "peli: aloituslento Lontoo →" näihin neljään; 2.210-ajot käyttävät `uusi-peli 5 pariisi`, jossa ei ole Perillaa eikä traileria.
Bussilla Pariisiin (lokit/natiiviseppa-william-fcba229ca, rivit 3061–3527): zoomaus, Saapumistraileri 3 kuvaa 5,3 s puheUrl = luennat.Saapumispuhe (isoisän puhe: "puhe alkaa", nopea alkaa sen kanssa) → UusiEsittely → NykyIntro C1–C5 → "nykyintro loppui (vauhdikas)" → IsoisanLuenta.

## Toteutussuunnitelma (ei tehty; tarkista merge-tuloksesta)
1. KaupunkiIntro.Aloitus: Pariisille kenttä, jolla AloitusintroSaa(pariisi, alkulento: true) = false; muut ennallaan. Korjaa AloitusintroTestit.IntroJokaKertaKaikissaKolmessa (rivi 34 vaatii nyt tosi) ja lisää testi.
2. William trailerille: PaataTraileri (PeliOhjain.cs noin 1860) antaa aloituskaupungissa puheUrl = AloitusintroData(k).WilliamUrl isoisän saapumispuheen sijaan, kerran matkassa. Siirrä kerran-lippu Saapumisesitysestä PeliOhjainiin, jotta NykyIntro ei soita samaa uudelleen. Nopea alkaa puheen kanssa (Saapumistraileri esittelyJatkaa/KuunteleAlkua, EsitysMusiikkiValmis): todenna ja kerro KK:lle. Tarkista AloituslentoAlkoi-marssin päättyminen samalla.
3. Ei isoisää aloituskaupungissa: NykyIntron lopussa IsoisanLuenta(k) ei saa soida, kun k == ohjain.MatkanLahto, vaan LoppuiJatko(k) (vauhdikas-haara, Saapumisesitys). SaavuLehteen pudottaa luennon jo SaapumisluentoPois-haarassa, eikä lykkäystä silloin tule.
4. RISKI: LivianPaljastus.Saapui: introTulee = TuleeAloitusintro = false → odottaa vain Tila == Kartta ja aloittaa Pulun (Alkuosa, Isoisän uni) KESKEN NykyIntron. Pulun on odotettava esityksen loppua; samalla LoppuiJatko ja aloitusLuettu. Lisää odotus (Saapumisesitys kertoo esityksen lopun).
5. Kierron loppu: KiertoHiivu (porras: Saapumisesitys.cs noin 595 esityksen Ohitassa, Saapumistraileri.cs noin 430, luentojen alku). Ilman luentaa: hiipuu ennen Pulua, esityksen lopussa. Kirjaa arvo ja syy.
6. Testit: kaanna.sh "Aloitusintro|Pallo|Opas|Pysahdys|LahtoLaatat|Kierros|Museo", unity-tarkistus (tarkista.sh muuttaa tyylikirjan kolme tiedostoa: git restore ennen committia; Valovahti-rivit eivät ole omasta muutoksesta).
7. Ajo: _tyo/natiiviseppa/pallo-aloitus/sk-aloituslento-reitti.txt (`ui aloita pariisi lento`) on pohja. Lisää kuvasarja kierron ajalta, William päällä, esityksen lopussa ja Pulun alussa, sekä `linssi soivat`. sk-william-esitys.txt on vanhentunut, ei ajeta. Mittari: "aloituslento Lontoo", "traileri", "puhe alkaa", "nykyintro", "livia:", "musiikki taso" (puhujia), "aani: soivat". Ajo ei kuuntele: kuuluvuus vain lokista ja soivat-rivistä, sanotaan viestissä.

## Muut
- JU: d369d4aab peruttu; sk-aloituslento-reitti pysäytetty kesken 20.26, ei tulosta. JU odottaa yhteistä uutta pyyntöä. sk-william-esitys ehti valmistua (lokit/natiiviseppa-william-esitys-d369d4aab, 4 kuvaa, kuvia ei katsottu): uusi-peli-reitillä William alkaa ja loppuu 4,15 s esityksen alusta, esitys loppuu 15,5 s, luenta vasta sen jälkeen; ei päällekkäisyyttä. Ei todista aloituslentoa eikä kuulokuvaa.
- Kysy-vastauksen hiljaisuus: testitunnuksen syy (worker.js oppaanAani, tests/opas-keskustelu.test.mjs:76), PT kuittasi, ei maksullista varmistusta.
- Kontrasti ja musta kartta ovat NUI:lla (PT 20.11). Liiku-rivi kirjattu PT:lle.
- -2005:n "Avoinna edelleen" pätee: latausajan vaihtelu, haamu, iPad-näkemättömät.
