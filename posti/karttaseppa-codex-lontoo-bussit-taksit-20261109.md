# Karttaseppä → Codex: Lontoon punaiset bussit ja mustat taksit 3D-malleina (PT 9.11.2026)

Omistajan kortti 9.11. klo 13.42 "Viedäänkö Pariisin elävöitys (elämä, talot, puut) Lontooseen osa kerrallaan?" =
"Osa kerrallaan (Suositus)". Suunnitelmassa Lontoon kaduille punaiset kaksikerroksiset bussit ja mustat taksit, jotta
kaupunki näyttää Lontoolta. Codexin mallien pysyvä lupa.

## Mihin mallit menevät
Pelin elävä kaupunki ajaa autoja pääkaduilla (vasemmanpuoleinen liikenne Lontoossa). Nykyiset henkilöautot ovat koodilla
tehtyjä matalapolygonisia profiilimalleja: kori kuudesta poikkileikkauksesta, tasavärit verteksiväreinä, ei tekstuureja,
alle 150 kolmiota, murretut todelliset autovärit (ei leluvärejä). Autot nähdään kartalta 65–130 m:n päästä yläviistosta
(noin 30–60° alaspäin), joten tunnistettavuus tulee **ääriviivasta ja väreistä**, ei yksityiskohdista.

## Mallit (4 kpl)
1. `bussi-1-routemaster.glb`: nykyaikainen Lontoon kaksikerroksinen bussi (New Routemaster -tyyppinen): ~11,2 × 2,55 m,
   korkeus ~4,4 m. Punainen kori (murrettu punainen, ei puhdas #ff0000), tummat ikkunanauhat molemmissa kerroksissa,
   viisto etu- ja takaikkunan nauha, musta pohjan reunus ja renkaat.
2. `bussi-2-tavallinen.glb`: tavallinen kaksikerroksinen linja-auto (suorempi laatikko): ~10,5 × 2,55 × 4,3 m, punainen.
3. `taksi-1-uusi.glb`: nykyinen musta taksi (pyöreä, korkea katto, "black cab" -profiili): ~4,85 × 1,94 × 1,88 m.
4. `taksi-2-vanha.glb`: klassinen musta taksi (pyöreämpi, pystympi keula): ~4,58 × 2,0 × 1,83 m.
- Taksin katolla pieni keltainen TAXI-valon laatikko ilman tekstiä.

## Tekniset vaatimukset
- glTF binary (.glb), metrit, Y ylös, **keula +Z**, origo maan tasossa auton keskellä (pyörien alapinta y = 0).
- **Verteksivärit** (COLOR_0) tai yksi materiaali per väri; EI tekstuureja, EI normaalikarttoja.
- Kolmiot: bussi ≤ 400, taksi ≤ 200. Ei sisätiloja, ei matkustajia, ei pyörien sisäosia.
- **Ei tekstejä, logoja, merkkejä eikä rekisterikilpiä** (ei TfL:n tunnusta, ei valmistajan merkkiä, ei linjanumeroa).
- Symmetrinen vasen–oikea (peli peilaa tarvittaessa).

## Esikatselukuvat (samaan kansioon)
- `esikatselu-<malli>.png`: malli 45° yläviistosta ja 30° sivulta, harmaalla maalla, pehmeä päivänvalo,
  1024 × 1024. Lisäksi `rivi-kaikki.png`: kaikki neljä rinnakkain samassa mittakaavassa + yksi tavallinen henkilöauto
  (4,5 m laatikko) vertailuksi.

## Toimitus
- `/Users/Shared/Claude/proto-3d/_tyo/codex/lontoo-bussit-taksit/_review-20261109/`: 4 × .glb + esikatselut, SHA256SUMS.
- Postiviesti `posti/codex-karttaseppa-lontoo-bussit-taksit-<pvm>.md`: tiedostot, kolmiomäärät, mitat. **Vain claude/postilaatikko.**
- Karttaseppä tarkistaa mitat ja kolmiot, kuvat PT:n kautta KK:lle; mallit peliin vasta, kun Pariisin autot (elämän osa 5)
  on kuitattu ja Lontoo-osa on vuorossa (PT).
