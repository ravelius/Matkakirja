# Karttaseppä: luovutus 29.10.2026 klo 13.57

Seuraava Karttaseppä jatkaa tästä. Muisti: karttaseppa-tila-20261010-ilta.md (UUSIN). Syy: konteksti (PT 13.5x).
Edellinen luovutus: viesti-karttaseppa-luovutus-20261029-1011.md (PR 5577). Taustaajoja ei ole; simu ja linja 2 vapautettu JU:lle.

## Valmista (PT:llä / KK:lla)
- SÄVYTYS 3: proto-haara karttaseppa/savytys-214 704fa8629 (wt /Users/Shared/Claude/wt/proto-karttaseppa-savytys-214,
  peili peili/proto/karttaseppa/savytys-214), juna-214 ed61246ba:n päällä. Kartta-testit 573/573, tarkista.sh 0.
  - Vika: OpenFreeMapin building-piirre on monikulmiojoukko (Pariisissa jopa 1 525 taloa), laji luettiin vain ensimmäisestä
    renkaasta; poi-luokat väljiä (art_gallery = patsaat/taidekaupat, library = kirjakaupat).
  - Nyt: laji ulkorenkaittain (ElavaTyyli.RenkaanAla > 0), reiät seuraavat; alaluokat tarkasti; railway/station ja
    shop/department_store → liike. Liike Liuske ja julkiset Kulta {176,128,60}, molemmat 150/255 (tiilen kirkkaus). Välimuisti -r4.
  - Näkyy vain z ≥ 14 (katutaso). Komento: elavakartta rakennukset nyt|savy. OLETUS ON YHÄ NYT (tila 0): kun omistaja hyväksyy,
    tee savy oletukseksi (RakennusTila-oletus 2 tai poista haara, ElavaTyyliVersio e13) ja anna NS:lle.
  - Pari: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/savytys-214/pt/savytys-lahi-nyt-savytetty.jpg + savytys-lahikuva-2x.jpg
    (käännös 4fdecb927, ajo todistus-tarkistus-214-20261029-1344, N1|N2). Nimet: Seine ladottu samaan laatikkoon kaikissa
    neljässä otossa (nimet etsi) → sävytys ei vaikuta nimiin. "Gare du Nord" ~90 px eri kohdassa (sijoituksen vaihtelu).
- SAUMA (siirtyma-sse-214 0c14f6d80): parit pt/sauma-taso8-5/9/9-5-ennen-jalkeen.jpg (ennen = maasto siirtyma pois, samasta appista).
  Tasot 9 ja 9,5 puhtaat. PT: 8,5:n alaosan pehmeät suorakulmiot korjattava ennen omistajaa.

## Seuraavaksi
1. SAUMA 8,5 (PT): "taso 8,5" -kuva on oikeasti taso 8,61 ja siirtymäalue on päällä (varjo 3015×6555, kerroin 2,5).
   Alarajan siirto 7,0:aan (maasto siirtyma 8 7.0 10.5) ei muuttanut alaosaa (A1 vs A3, ajo todistus-tarkistus-214-20261029-1344).
   Seuraava epäily: SSE 8 ei riitä ruudun alaosassa (kokeile maasto siirtyma 5 tai MaxKerroin 4) tai laatat eivät ehdi
   tarkentua 40 s:ssa; mittaa komennolla maasto siirtyma tila ja vertaa kuvat. Skenaario sk-tarkistus.txt (osa A).
2. Pieni iPad saa version vasta, kun sävytys, saumat ja merkittävyys ovat valmiit (omistaja 13.22).
3. Edellisen luovutuksen lista: jokinimien harvennus, elävien nimien kaksoisrivit, Alppien sauma, LIGURIANMERI, salamasymboli.

## Työkalut
- Käännös: PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> proto-kaanna.sh natiiviseppa/juna-214+karttaseppa/siirtyma-sse-214+karttaseppa/savytys-214 DA0AAEEA-…
  (vuoro JU:lta). Ajo: zsh _tyo/karttaseppa/savytys-214/ajo.zsh savytys|sauma|tarkistus; parit pari.py (PIL, järjestelmän python3).
- Lajiosumat oikeasta MVT-palasta: _tyo/karttaseppa/savytys-214/mvt/lajit3.py <pala.pbf> (lukee lajit.py ja lajit2.py samasta kansiosta; MVT-dekooderi ilman kirjastoja); OpenFreeMapissa ei robots.txt:tä.
