# Pelikoodari: luovutus 5.11.2026 klo 16.38: loppukortin kamera ja "Taso läpi!" toimivat, omenoita lisätty; seuraavaksi ovilehti peittää keisarin

Korvaa -1602:n tilan. -1602:n kohta 3, -1413:n kohdan 3 kohdat 3–4, -1337:n kohta 3 (avoimet päätökset) ja -1225:n kohdat 1, 2 ja 5 pätevät edelleen. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `dcad62532` (pushattu natiivi-backupiin). Juoksutestit 195/195, unity-tarkistus 0 virhettä. Ei iPad-ajoja, ei junaan mitään. Ei ajoa käynnissä, L2 vapautettu JU:lle 16.37.

## 1. Tehty ja todennettu
- `7cef9bdde` kamera: seisovalle keisarille kamera hakee paikan suoraan hänen takaansa (`JuoksuKulkuKamera`: `lepo`, `SuoraanTakaa`). Juurisyy: uupuminen heti ympärikäännöksen jälkeen, jälki katkesi keisarin kohdalle eikä pidentynyt. Testi `KameraEiJaaKeisarinSisaan…` kaatui ilman korjausta. Vanha kamera ei ollut syy: lokissa `kiinni Ei`.
- `7cef9bdde` keisarin hyppy: `s.Nopeus` jäi voimaan pelin päätyttyä, ja pitkä ruutu tulkittiin kulman hypyksi. Ajossa f57b79db0 39 hyppyä, ensimmäinen kuvan e24 910 ms:n ruudun kohdalla. Nyt `kulkuNopeus` on 0, kun `s.Ohi`.
- `ce79c3c74` omenat: ruudukko 15 m, 6 paikkayritystä ruutua kohti, osuus 0,65, mädät 0,25. Omena noin 100 m:n välein, ennen noin 500 m. Omistaja 4.11. 11.53: tasolla 1 kerätään "lähinnä mätiä ja hyviä omenoita". Botti läpi 10/12 (ennen 5/12 uupui ilman yhtään hyvää omenaa). Testi `OmeniaRiittaaOikeallaKartalla`. Väli on oma viritys: säädä pelaten. Muistia ei mitattu, ladattuja omenamalleja on nyt enemmän.
- `dcad62532`: otteessa uupuessa loppukortin ajaa juoksun kamera. **Ei nähty pelistä**, ajossa ei ollut kiinniottoa.
- Katsottu `lokit/esikatselu-20261105-162628` (dcad62532, Mac, `sk-g.txt`, arkit `_tyo/pelikoodari/vapaa-1/arkki-h0.jpg` ja `arkki-h1.jpg`; täysikokoisina vain e32 ja e62):
  - **"Taso läpi!" toimii:** 240 s, 1566 m, 2066 pistettä. Kuvissa e49–e62 kamera pysyy paikallaan ja keisari on kuvassa. Kortti peittää keisarin yläosan, koska kortti on keskellä ruutua.
  - Lokissa `herkkuomena` ja `mätä omena` poimintoja; e11, e13, e14, e19 ja e37 näyttävät omenoita.
  - Ulkoesineitä näkyy (sininen ruukku e02, e05, e08).
  - Poikkeus `ArgumentOutOfRangeException` on Unityn editorin haun (`UnityEditor.Search`), ei pelin: -1413:n avoin kohta suljettu.

## 2. Seuraavaksi, järjestyksessä
1. **Ovilehti peittää keisarin (uusi vika, ei korjattu):** e22, e24, e27 ja e32 näyttävät lähes pelkkää ristikko-ovea, e22:ssa keisarista vain pala. Kaikki kuvat samalta kujalta (pohja x noin −136…−139, z noin 350–390), jota botti kiersi. Syy luultavasti: `tyokalut/kulkukartta.py` rivi 5, ovilehdet eivät estä kulkua, joten keisari ja kamera menevät kujalle aukeavan lehden läpi. Ei mitattu.
   - Mittaa ensin kartasta ja `JuoksuOvet.json`:sta, kuinka monen 245 oven lehti työntyy kuljettavalle kujalle ja kuinka pitkälle. Avauskulma: `JuoksuSokkeloMaailma.Ovet.cs` (`SaranaEteen`, `LehtiPituus`).
   - Oma suositus: lehdet auki lähes seinää vasten, jolloin mikään ei törrötä kujalla. Se muuttaa hyväksyttyjen ovien ulkonäköä (omistaja 5.11.: ovet kelpaavat), joten kerro KK:n rivillä. Lehtien lisääminen esteiksi kaventaisi kujia.
   - Tee testi kartasta, älä arvaa.
2. **Keisari kuvan alareunassa:** e13 ja e37 näyttävät vain keisarin yläosan. Ei selvitetty. Katso täysikokoisena.
3. **Ei vielä nähty:** kynnysviesti (lokissa 0 kertaa), esineen rikkoutuminen, kiinniotto tässä versiossa, omenan heitto. **Eunukit e23 ja e28:** sininen eunukki aivan keisarin vieressä; en tarkistanut, tuliko hän sivulta, eikä lokissa ole lähtöriviä. Lisää lokirivi tai pakota kohtaus.
4. Vuoro JU:lta (`PROTO_LINJA` JU:n viestistä, `zsh tyokalut/esikatselu.sh <sha> _tyo/pelikoodari/vapaa-1/sk-g.txt`, ajo taustalla, rivi JU:lle kun valmis).
5. **Rivi ja kuvat KK:lle, kun taso 1 on näytettävässä kunnossa** (KK 15.06), mukaan -1337 kohdan 3 päätökset ja -1602:n linjaus seinällä odottamisesta. Täysikokoiset itse katsottuina, ei selitekaistaa.

## 3. Avoimet pienet
- `sk-g.txt` kirjoitettiin vanhan `sk-g.txt`:n päälle, jos sellainen oli (`aja-g.log` oli kansiossa); vanhaa ajoa ei tarvita.
- Botti kiersi taas samaa korttelia (s 700–1200). Sama arvontaluonne kuin -1413, ei pelin vika.
- -1602:n liikevahti, `tarkista.sh`:n tyylikirjatiedostot ja KÄÄNNÖSNYKÄYS-rivit pätevät.

## OPIT
Lue loki ennen kuin hyväksyt ensimmäisen selityksen: ensin epäilin vanhaa kameraa, mutta `kiinni Ei` kumosi sen. Toistuva lokiarvo kannattaa kohdistaa kuvien ruutuihin: keisarin hypyt osuivat kuvakaappausten pitkiin ruutuihin. Mittaa harvinaisen esineen tiheys oikealta reitiltä, ei ruudukon arvoista.
