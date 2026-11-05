# Karttaseppä: luovutus 5.11.2026 klo 08.21 (KS)
Syy: konteksti yli 25 % (7.37) ja PT jakoi ison uuden tehtävän. **Lue tämä, sitten -0758 (9946fca80; sen "Avoinna" 1 ja 3–4 pätevät).** Python: /opt/homebrew/opt/python@3.14/bin/python3. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. C = /Users/Shared/Claude/proto-3d/_tyo/codex. Y = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219 (natiivi-backup), kärki b2c4ed6a9.

## ENSIN
Käynnistä vahti Monitorilla (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko), käsitelty a66346394 asti. Detached HEAD: ennen postia `git checkout --detach FETCH_HEAD`.

## PT 08.2x: sarja (sitova; lue kokonaan /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-nahtavyydet-sarjana.md)
Omistaja: Pariisin muut kohteet yhtenä sarjana, omat värit, sama valo kuin Notre-Damella. **Sinulle A, B, F tässä järjestyksessä; Louvre ei odota niitä.**
- **F (v1 ensin):** kone laskee kohdelistasta (nimi, paikka, koko, suunta) kehyksen, maskin, rajat, koosteen, tilauksen, pelin tiedot ja neljän suunnan sk:n. Laajenna valmista: A/louvre-pohja/tee-alue.py, tee-iso-v2.py, sk-ajot, Nahtavyysalue-taulukko. Yksi rooli, ei Työkalusepälle.
- **A:** kohdelista ja alueet kuvana kartan päällä → KK. Tehdään F:llä, ei käsin. Reunus myös sivuille (omistajan Louvre-oppi), raja kaduilla ja rannoilla. Lähekkäiset yhteiselle pohjalle (Opéra ja Louvren alue tarkistettava).
- **B:** yksi Codex-tilaus koko sarjasta, valmis pohja (oppi: oikean rakennuksen vertailu, Left/Right, mitat, ei maata). **Pysähtyy ennen Tripoa:** arkit KK:lle (oikea rakennus | Codexin kuva | alue kartalla). Tripoa ei ennen KK:n ja omistajan arkkia (C). C–H PT jakaa B:n jälkeen.
- Kun Codex kulkee yöllä, kerro PT:lle, mitä seuraavaksi tarvitaan, jottei ketju seiso.
- **Kohteet:** Grand Palais, Invalides, Tour Montparnasse, Opéra, Panthéon, Riemukaari, Sacré-Cœur (mäki malliin, 18.27). Montparnasse: yksinkertainen, kokeile yhdellä kuvalla vähemmän.
- **Eiffel kuuluu sarjaan** (KK välitti omistajan 08.19–08.20: oma 3D-malli kartalle, 2.92 koskee vain Googlen 3D-kartan näkymiä), kahdeksan kohdetta. KK: mittari on Louvren hyväksytty alue; kerro KK:lle, jos A:ssa on kohde, joka ei sovi tähän tapaan.

## Lähtöaineisto F:lle (katsottu, ei vielä käytetty)
- Paikat ja G-suhteet: Y/tee-nahtavyystilaukset.py (K: id, nimi, G-bbox, kuvaus; koko = G × 2,4), Y/tarkistus-nahtavyydet/<id>/<id>-alue.json (ankkuri_latlon, z17_px_origo), TILANNE-nahtavyydet.md (skaalat).
- **Kartta on avoin ongelma:** A/louvre-pohja/cs/ = VS:n z17-palat vain Louvren kohdalta (koodi wt k30 2d8ec025c, compute-ajo). Keskustan mvt14 kattaa vain 12 ruutua (/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/k52/data/keski/mvt14, x 8297–8299, y 5634–5637; dekooderi A/louvre-21c-v1/paikka.py); Sacré-Cœur ja Riemukaari voivat jäädä ulos. Selvitä ensin, mistä kehyksen kartta saadaan kaikille kohteille (k52/data/keski/cs 193 palaa; muut kansiot). Varmista myös rajan poiminnan värit (katu 234/210/168, vesi 168/168/145).
- Koodi: Maaritys + Malli + Lisapalat {Kuva, X, Y, Leveys, Korkeus}. Yleistys "yksi alue ruudussa" on koodin kommentti; Louvre ja ND näkyvät yhtä aikaa.

## Tehty tässä vuorossa
- **SC 22c:** omistaja 07.58 kelpaa, Tripolle kuitattu a66346394.
- **SC:n piha:** A/sc-pohja/tee-sc-pohja.py → sainte-chapelle-pohja.png (256², kehys ND:n x 340, y 372), ND:n tiedosto ennallaan. Malli 463,495 (14 m luoteeseen). KK hyväksyi; korjasi kiilan ja sumean seinän. b2c4ed6a9 Macilla ok (lokit/julkaisija-sc-pohja-b2c4ed6a9), pelikuvat KK:lla, viesti jonossa KK:lle. Tila: odottaa KK:n sanaa.
- **Kahden pohjan tuki:** 607efa75f, todennettu samassa Mac-ajossa. Omistaja 08.11: iso alue v2 kelpaa. **Louvren Codex-pohja tilataan vasta, kun KK on hyväksynyt 21f:n kuvat**; raja kaduille tilaukseen.
- **iPad:** JU:lla b2c4ed6a9, T7:n sk-ipad-sc-louvre.txt, lokit/julkaisija-ipad-sc-b2c4ed6a9 (kun iPad vapaa). Katso sc-kuvat, l-0 ja rinnan-0 (raja).

## Odottaa
1. Codex 21f (C/pariisi-louvre-20261104/_review-otto2-21f/): SHA, kaikki täysikoossa, vertaus oikeaan Louvreen, → KK ennen Tripoa. Kun hyväksytty: Tripo-tilaus ja iso pohja.
2. KK: SC-pelikuvat. Hän kertoo omistajalle, että oikeassa kirkko on palatsin sisäpihalla.
3. Työlistan rivit: "Sainte-Chapellen pohja", "Louvren iso pohja". Lisää sarjalle oma rivi.

## Opit
- Täytettävän taskun väri: lähin *puhdas* rakennuspikseli ja leveä sumennus, muuten reunan vaalea siirtymä jää haamuksi; kerrokset alfalla, ei kynnyksellä, muuten seinä sahaa.
- Vino maski ylinäytteistetään, muuten reuna on sahalaitainen.
- Katso KK:lle lähtevä kuva samalla silmällä kuin KK: pieni kiila näkyi hänelle jo pienennettynä, minulle vain "heikkona".
