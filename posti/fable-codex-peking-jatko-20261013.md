## 2026-10-13 16.2x UTC — PÄÄTOIMITTAJA → CODEX: Pekingin koekaupungin 3D-mallinnuksen jatko (koko jatko, erissä)

Omistaja 13.10.2026 klo 19.1x (Päätoimittajan kortti, valinta "Koko jatko heti"): Codex jatkaa Pekingin mallinnusta, jonka Linnanrakentaja (Claude) jätti tauolle 10.10. Peking pysyy POISSA pelistä, kunnes omistaja päättää tauon päättyvän; peliin liittäminen (Unity) ja laitetestit tehdään Clauden puolella myöhemmin. **Päätoimittaja tarkistaa jokaisen erän ja hyväksyy omistajan puolesta (omistaja 13.10. 19.0x "Voit hyväksyä puolestani").**

### Lähtöaineisto (lue ensin kokonaan)
- Linnanrakentajan luovutus, osio PEKING: `git show b7064d79e:docs/raportit/viesti-linnanrakentaja-luovutus-20261010-paiva.md` (muoto, rajaus, säännöt, ajokomennot, ansat).
- Koodi ja data: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/peking/` (lahde/rakenna.py, rakenna_v4.py, hallit.py, pihatalot.py, monumentit*.py, puut.py, pinnat.py, luokittele.py, aja_laatat.zsh; data/, tekstuurit/, uusin vienti glb-v4/ + laatat.json; LAHTEET.md). **ÄLÄ MUOKKAA tätä kansiota**: kopioi se työkansioksi `/Users/Shared/Claude/proto-3d/_tyo/codex/peking/` ja tee kaikki muutokset kopioon.
- Karttasepän paketti (ENU-origo Taihedian 39.915896, 116.390814; rakennuspohjat, korkeudet, kadut, vesi, ortokuva): `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/peking-20261010/`.
- Sisältökirjurin maamerkkien mitat: `/Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/peking-mitat-20261010/`.
- Ortokuvavertailu: `/Users/Shared/Claude/proto-3d/_valmiit/kaupunkipinnat-v1/lahde/vertaa_orto.py` (pelin ortonäkymä vs. Karttasepän ortokuva).
- Blender: `/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P <skripti> -- ...`. Aja raskaat ajot `nice -n 15`:llä; kone on jaettu monen roolin kesken (älä tapa muiden prosesseja).

### Tavoite: Pariisin omien mallien (Notre-Dame, korttelit) taso
1. **Vertailu oikeaan maailmaan ensin:** aja v4:stä ortonäkymä ja vertaa Karttasepän ortokuvaan (sävyt, katot, pihat, puut, vesi). Kirjaa vyöhykkeittäiset erot ja korjaa suurimmat.
2. **Kielletty kaupunki tarkkana:** hallit, portit, muurit, kulmatornit, vallihauta, terassit ja marmorikaiteet (toistuvat osat yksi mesh per tyyppi, jaettu materiaali); keltaiset lasitiilikatot oikeine sävyineen ja punaiset seinät oikeaan ortokuvaan.
3. **Taivaallisen rauhan portti** ja Jingshanin paviljongit, Beihain valkoinen stupa ja saaret (lähteinä Sisältökirjurin mitat ja avoimet valokuvat).
4. **Hutongit:** pihatalokortteleihin vaihtelua (julkisivut, katot, pihapuut, kujat) ja yhteinen atlas, kolmiomäärä kevyenä.
5. **Puut ja pinnat:** puut.py:n puut ortokuvan mukaisiksi, aukion kiveys, kadut.
Etene erissä (esim. 1 → 2 → 3 → 4 → 5); jokaisesta erästä toimitus ja kuittaus, sitten seuraava ilman odotusta.

### Säännöt (sitovat)
- **EI Maon muotokuvaa eikä tyhjää kehystä**; iskulausetaulut ilman tekstiä tai pois. Ei luettavaa tekstiä, logoja eikä lippuja malleissa.
- **Suojatut teokset:** 1950-luvulla ja myöhemmin suunnitellut rakennukset (Kansan suuri halli, Kansallismuseo, puheenjohtaja Maon muistohalli, Kansan sankarien muistomerkki) vain yksinkertaisina massoina ilman tunnistettavia yksityiskohtia (Matkakirjan sääntö: tekijänoikeudella suojattuja teoksia ei mallinneta omina 3D-malleina; tekijä kuollut < 70 v).
- **Ei Googlen 3D-laattoja, Google Earthia eikä Street View'ta** viitteinä; vain OSM/Karttasepän data, Sisältökirjurin mitat ja avoimet valokuvat (Commons CC0/PD/CC BY, krediitti LAHTEET.md:hen).
- **Ei uusia tekoälykuvia tekstuureiksi** ilman Päätoimittajan erillistä lupaa; tekstuurit olemassa olevasta atlaksesta, proseduraalisesti tai avoimista lähteistä (CC0/PD/CC BY).
- Muoto ennallaan: GLB-laatat 550 × 500 m (i 0–3 itään, j 0–5 pohjoiseen) × lod0/lod1/lod2, laatat.json, sama ENU-origo ja nimeäminen kuin glb-v4:ssä, jotta peliin kytkentä ei muutu. Kolmio- ja tekstuuribudjetti enintään v4:n taso per laatta, ellei erässä perustella.
- Ei main-mergeä, ei pelirepon (proto) muutoksia, ei vientiä ämpäriin/R2:een, ei versionnostoa eikä pelijulkaisua.

### Toimitus ja kuittaus (per erä)
- Valmis erä kansioon `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-v<N>-<pvm>/`: glb/ + laatat.json + LAHTEET.md + esikatselu/tarkistusarkki.jpg (samat kamerat kuin v4: ilma, taihedian ym.) + ortovertailu (ennen | jälkeen | ortokuva).
- Kuittaus `posti/codex-fable-peking-v<N>-<pvm>.md`: mitä muuttui, kolmiot ja koko per laatta, avoimet kohdat. Päätoimittaja katsoo kuvat ja vastaa postiin (hyväksytty / korjattavaa).
