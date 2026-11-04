# Natiivisepän luovutus 4.11.2026 klo 05.04 (konteksti 25 %, 7.37)

Korvaa luovutuksen -20261104-0255 lisäyksineen. Siitä yhä voimassa: Päätökset, HAARAT, "KK:n lista" (ja sen viittaamat -0129:n kohdat). Yksityiskohdat: `git show db95d109c:docs/raportit/viesti-natiiviseppa-luovutus-20261104-0255.md`.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta; iPad pidossa Pariisille, omia karttakuvia ei ajeta ilman JU:n vuoroa (PT).

## Tila
- **Aamun varma kuva on yhd2 a6c11c1d2** (KK 05.01), ei junaan, pinta ei hyväksytty. f5c1f14b0 on siinä.
- **Puutarhat nimien alle ff97c7f8c** = a6c11c1d2 + 1 irrotettava commit, haara natiiviseppa/puutarha-nimien-alle-a6c (natiivi-backup), worktree wt/proto-natiiviseppa-maskik4 (entinen haara natiiviseppa/haivytys-k24-218, kärki f5c1f14b0). JU ajoi 05.02: lokit/julkaisija-yhd3-iso-ff97c7f8c/ (6 kuvaa, muisti 3339/4080, varoituksia 0).
  Katsottu e-0-13 kokonaan ja nimet 2×: Eiffel-torni, Hôtel des Invalides ja Pariisin suurmoskeija ehjinä; puutarhat paikoillaan; puut ja nähtävyydet nimien päällä. Rajaus _tyo/natiiviseppa/aluekuva-koko/yhd3-puutarha-nimet.png. Suurmoskeijan nimi on eri paikassa kuin yhd2:ssa (nimien asettelu vaihtelee ajoittain; syytä ei tutkittu). Luxembourgin palatsi ja Musée du Luxembourg EI katsottu: ajossa ei ole k-lux- eikä k-odeon-kuvaa. Aamun kuvaan meneekö: PT päättää.

## Seuraava kierros
1. **e-0-13: suora häivytys ja kova rivi 168** (KK 05.01, osio yhd2/2; mittarina omistajan "vinjetoiden"; lopulliseen ei näkyvää rajaa). Suoruus: ElavaKoealue.cs:144–148, etäisyys suorakaiteesta (ElavaPariisi.cs:21), ReunaM 1 200 m. Rivi 168 (lat noin 48,9107, ei z11–z13-rivi): SYY AUKI. KK 02.52: muoto ennen leveyttä, hidas aaltelu. Länsiraja ja ReunaM on sovittu VS:lle: sovi VS:n kanssa ennen koskemista.
2. **Pystysaumat näkyvät täysikoossa:** lon 2,4609 (suhde 2,65–3,02) ja noin 2,2415 (syy varmistamatta). Sama perhe kuin kohta 1. Skripti _tyo/natiiviseppa/aluekuva-koko/sauma-terava-sumea-a6c.py, rajaukset sauma-a6c-*.png.
3. **Haalea suorareunainen sävyero** (f5c1/1; rajaukset 2, 3, Joinville lon 2,4609; todiste-015.png). Selvitä ensin, onko sama julkaistussa kartassa (tarkistamatta), syy tutkimatta. PT: vasta aamun yhdistelmän jälkeen.
4. **Vierityksen sujuvuus (kulu, k28/3)** JU:n vuorolla; pinta ei mene junaan ennen mittausta, myös pieni iPad huomioiden. elava-kulu.txt:t ajokansioissa.
5. **Puut laajoissa zoomeissa (yhd2/1, KS + NS):** täysinä 0,038, eivät 0,05:llä; tavoite 2029:n ilme, tapa ja kulu tekijöiltä.
6. **KK:n lista -0129:n kohdat 2–4:** aloittamatta.

## Ratkaistu
Tie-ero 0,21 mennessä | paluu: tiet samat nimien ulkopuolella (k24, f5c1, yhd2; skripti tieero-021-paluu.py; nimet ja raiteet rajattu pois, 21–23 % kuvasta). Ero vain nimissä, KS:n. Ei tutkittavaa, ellei uusi ajo näytä eroa.

## LISÄYS 05.06 (Postivahti: ei nollausta vielä; sävyero alustavasti, ei ratkaistu)
**Sävyero (kohta 3): julkaistusta kartasta EI vielä tiedetä.** Ei ole kuvaa julkaistusta samasta kohdasta. Tarvitaan JU:n vuorolla: julkaistu versio, `aja 48.82 2.4609 0.05 2` ja rajausten 2–3 kohdat.
- Raaka pohja ei näytä sitä: 2026-11-03-pohja-valitaso 10/518–519/351–352 ilman suorakulmioita; palarajalla 2,4609 ero yläpalassa 0,1–0,3, alapalassa 1,6–2,3 yksikköä (6 px kummaltakin puolelta).
- todiste-015.png: reunat ovat pysty- ja vaakasuoria (rajaukset 3 ja 4). Hypoteesi, ei testattu: syntyy laitteella pohjan puhdistuksessa (ElavaTyyli.PoistaKarkeaRanta, PoistaKierros: 5 × 5 ympäristö, vanhemman pikselit suurennettuna), rajauksessa 4 palan reunalla. Tämä on ristiriidassa luovutuksen 03.25 kirjauksen "PoistaKierros ei selitä" kanssa; sen perustetta ei ole tallessa. Toinen ehdokas: vektorin aluetäytöt.
- Testi ilman iPadia: aja puhdistus Pythonilla paloille 10/518/352 ja 10/519/352 (edellinen koeskripti ei säilynyt) ja vertaa rajauksiin. Pohja: https://media.matkakirja.app/julisteet/pallo/laatat/2026-11-03-pohja-valitaso/{z}/{x}/{y}.jpg (Rakennus.LaattaUrl).
- Mittaus k-r-joinville, x 1366 (lon 2,4609): paperin askel 0–3,3, joten sauma ei näy koko kaistan keskiarvossa; ero on paikallinen.

## LISÄYS 05.07 (sävyero, testi tehty; ohittaa edellisen lisäyksen hypoteesikohdan)
**Puhdistus tuottaa palarajalle suoran askeleen: selvä ehdokas rajaukselle 4 (lon 2,4609), ei todistettu pelikuvasta.** Python-kopio PoistaKierroksesta (_tyo/natiiviseppa/aluekuva-koko/puhdistus-palaraja.py; vesi karkealla ehdolla, ei PohjanVesi) paloille 10/518–519/351–352, alarivi 352 (Joinville): askel palarajalla kahden kierroksen jälkeen keski 3,4, p95 12,1, max 20,3; 18/256 rivillä yli 10 yksikköä (yläpala 11/256). Yksi kierros: sama yläpalassa, alapalassa 23 riviä ja max 94 (ruskea läiskä). Kuva puhdistus-joinville-raaka-1-2.png: tien paikalle jää haalea jälki.
Syy on ilmeisesti, että kumpikin pala puhdistetaan erikseen, eikä 5 × 5 -ikkuna näe naapuria. Kahdesta kierroksesta ei ole hyötyä tähän. Rajauksia 2 ja 3 ei testattu: rajaus 2 on vino, joten ainakin se voi olla muuta (esim. vektorin aluetäyttö).
**Julkaistu kartta yhä tarkistamatta.** Ei löytynyt haaraa, jonka tiedän julkaistuksi (natiivi-backup/master on 24.9.), eikä kuvaa samasta kohdasta. Tarvitaan JU:lta julkaistu sha tai kuva.
**Korjausehdotus seuraavalle, ei tehty:** puhdistus naapurin reunapikselit mukana (vaatii vanhemman naapurit muistiin: mittaa kulu) tai askeleen tasaus palarajalla.
