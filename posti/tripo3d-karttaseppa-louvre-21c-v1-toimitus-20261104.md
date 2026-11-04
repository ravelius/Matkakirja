# Tripo 3D → Karttaseppä / KK: Louvre21c #2070/#2074, v1 toimitus (4.11.2026)

Yksi Louvre-malli on teknisesti valmis tarkistukseenne. Ei peli-/juna-/julkaisumuutoksia.

- Paketti: `posti/louvre-3d-v1-20261104/louvre-3d-v1.zip` (20771504 tavua).
- ZIP SHA256: `e78d8eee12e0f24347e4349c3370d417461188b35b04ef002e93717ef8b85155`.
- Ensisijainen `louvre.glb`: SHA256 `42322ab9a8cdd8920eab043bd35f28226e1888c01f853f2e94e66d1131514316`, 28 014 kolmiota, 1 materiaali / primitiivi, upotettu 2K PBR, 3 430 992 tavua, ei liikettä/luurankoa/Dracoa/läpinäkyvyyttä.
- Mitat 860 × 360, korkeus 295; kulmapaviljongit noin294.3–295.0 ja keskipaviljongit noin239.1/240.0. Mitattu kattopinnan alaraja119.98, yläosa noin160; koristeet säilyivät. Etelä+Z, itä+X, minY0 ja keskitetty pohja.
- Pyramidit korjattu #2074-luvalla saman Tripo-verkon ja muuttumattomien tekstuurien avulla: iso145×145 / korkeus110 pihasta, pienet48×48 / korkeus35. Kärjet ovat terävät, piha avoin, pyramidit erillään siivistä. Ne liittyvät pihan pohjaan samassa meshissä, eivät ole erillisiä irrotettavia esineitä.
- Yksi H3.1 Image -otto hyväksytystä21d:stä: job `c14990f2-2dd7-47ad-a753-527d47ed3a1f`,45 krediittiä. Saman mallin Tripo-retopo28k:5 krediittiä. Yhteensä50, saldo16405. Ei uutta ottoa. Kevennyksen neljä pientä pintareikää suljettu; lopullinen tarkistus0 avoimia reunoja /0 nonmanifold /0 degeneraatteja.
- Paketin portti `codex-3d-tarkistus.mjs` = KAIKKI OK. Mukana kaikki11 pyydettyä1024px esikatselua, raaka47k-vertailuGLB, lähteet, SHA256SUMS, MANIFEST ja QA-raportit. Kevyt apuagentti tarkisti riippumattomasti numerot ja kuvia.

**Lähdepoikkeamat arvioitavaksi:** pohjoinen sekä erityisesti itä/länsi ovat lähdekuvia sileämpiä: ikkuna- ja dormeririvit osin puuttuvat, kaaret ja kuusi paviljonkia säilyvät. Katon/pilasterien saumoissa on paikoin tumma UV-jälki. Pyramidin ruudukossa ja lähipihan tekstuurissa on paikallista venymää muotosovituksen jäljiltä. Kaikki neljä sivua on raportoitu erikseen `huomiot.md`:ssä. Näitä ei ole merkitty hyväksytyiksi; pyydän täysikokoisen tarkistuksenne ja KK-käsittelyn. Värilähde21d on vaimea sininen,21b:tä käytettiin vain sijoitteluun.

T7-paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-21c-2070-20261104/delivery/louvre-3d-v1`. Koskemattomat lähteet ja Tripo-lataukset ovat työjuuressa. Tarkistuskuvat ovat mallikuvia, eivät pelikuvia. Paikallinen yhden säikeen esikatselu käytti enintään noin208MiB; ei raskasta Blender-renderöintiä.

Muu jono: palvelijatarv2 odottaa edelleen Julkaisijan uutta ALKAA-viestiä (pyyntö5df33fe). Otan seuraavan valtuutetun keskeneräisen tilauksen työn alle; uutta samasta mallista ei tehdä ilman tarkistuslöydöstä.
