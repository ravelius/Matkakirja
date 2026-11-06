# Karttaseppä: luovutus 6.11.2026 klo 09.58 (KS)
Syy: konteksti 30 %, luonteva tauko: ajo 6 katsottu ja jaettu, odottaa NS:n ja KK:n vastausta. **Voittaa -0934:n ristiriidassa; -0921:stä pätevät edelleen AUKI-kohdat (ei taivas) ja kattoparin tulos.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 939741d43, ei pushattu). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki 251af3c48, puhdas). KK:lle SendMessage id:llä local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. NS local_c7344e20-fba8-433d-ba8e-184a325037ef. NUI ja VS: rivi viitteineen ListAgentsista; pelkkä nimi ei kelpaa.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen). 7.47:stä minulta jäi lukematta: tuotannonohjauksen osio 0, luku 2 (vain kartta-otsikot), luku 12 vain alku; lue ne.

## TULOS: AJO 6, Y 251af3c48, UNITY b7 (katsottu, jaettu 09.5x KK:lle, NS:lle, NUI:lle, VS:lle, PT:lle)
`/Users/Shared/Claude/proto-3d/lokit/karttaseppa-yhteinen-6-251af3c48`, sk-pariisi-yhteinen-6, 13 kuvaa, palat-v7-louvre, exit 0 (JU).
- **Louvre:** litteä alue poissa itä- ja pohjoispuolelta (po-la, pr-rivoli, louvre-ita); itäpään haaleaa reunaa ei näy; lävistyksiä ei näy.
- **VIKA, porras:** kaksi korttelia Innocents'n lounaispuolella (noin 48.860, 2.347; po-la täysikoossa x 1180–1400, y 1320–1560; myös hdv-talot-etelaan) on porrasreunaisia 3D:ssä, sama reuna kuin v6:n litteässä. Talot eivät peittäneet porrasta. OSM-jäljet alueella tavallisia (enintään 27 kulmaa, way/630222417 87), mutta en ole todennut, että juuri ne ovat näiden korttelien talot. **Kysytty NS:ltä; syy todistamatta, älä korjaa ennen vastausta. Handover -0934: jos talot eivät peitä, korjaus on KS:n.**
- **Palais-Royal:** eteläosaan jää vaalea läikkä ilman taloja (pr-rivoli noin x 1250–1400, y 900–950), kerrottu KK:lle.
- **Karsinta:** ero 0,0 km kaikilla 251 rivillä; usvan edessä 10 608 / 78 102, 240 rivillä 0, loput lennoilla; palautumisviive mediaani 1,6 s. nd-raja: Rue de Buci ja Quai Voltaire ladottu, Rue Jacob syy ladonta. Lähelta-palat poimimatta. Vertailu 0b4d74011:een ja päätös NUI:lla.
- **Havainnot NUI:lle:** Kuumailmapallo-kyltti haalea nd-rajassa (x 2030–2260, y 795–835). Pyöreä kuva co-45 (2583, 733) pysyy paikallaan monessa kamerassa, kohde tuntematon.
- **Concorde (VS arvioi):** obeliski ok. Vesi vihreä co-ob:ssa, ei Seinen sävy (x 1360, y 880 ja x 1380, y 1000). Kyltin pää ja pyöreä kuva Tuileries'n länsireunan päällä (co-yla x 1560–1660, y 1000–1035).
- **co-45:n hahmo:** ei näy tässä ajossa; kohde varmistamatta, KK:lle kerrottu.
- **Octroi:** en tunnistanut kohdetta kuvasta; NS katsoo. KK:lle kerrottu.
- Rajaukset: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/0ea5137c-1d48-4589-9ee0-c5ebc407bd79/scratchpad/y6 (katoaa; tee uudelleen tarvittaessa).

## SEURAAVA TYÖ: b8-RUNKO (NS 09.4x, JU 09.53; PT:n ohje)
PT:lle sanottu 09.5x: "b8-runko yhdistetään seuraavaksi". **Ei tehty.** Ei yhdistetty ajon aikana, koska ajo oli b7:llä ja sitä verrataan b7-ajoihin.
- b8-kärki on `addae63f2` (ProjectVersion 6000.7.0b8, commitin viesti "testihaara junarungon 7bbf04e09 päällä"). `natiivi-backup/julkaisija/runko-219-muisti` näytti vielä 7bbf04e09:ää (b7). Varmista JU:lta, kumpi on oikea yhdistettävä, ennen yhdistämistä.
- Kuivaharjoitus: Y ja W törmäävät `addae63f2`:ta vasten samoissa tiedostoissa: `Assets/Matkakirja/Kartta/Laattapalvelin.Elava.cs`, `Assets/Matkakirja/Kartta/LiikeLaatatPaatos.cs`. Ei ole yhdistetty. Y:n törmäys toistui 7bbf04e09:ää vasten; W:n tyhjä tulos samassa tarkistuksessa ei todista mitään, koska FETCH_HEAD on worktreekohtainen.
- Yhdistämisen jälkeen kaikki ajot merkitään b8:ksi; älä vertaa b7- ja b8-kuvia ilman merkintää.

## ODOTTAA
- NS: porraskortteleiden muodon lähde; Octroi-kuva.
- KK: Louvren kuvat omistajalle viat kerrottuina (suositus); kattokortti (v4 vai v6, suositus v6).
- NUI: karsinnan päätös. VS: Concorden arvio. Uudet kuvat vasta vastausten jälkeen, yhteiseen ajoon, ei omaa ajoa.
- PT: VALOVAHTI-poikkeus ennen junaa (-0934).

## Oppi
Katso porrastapaus ennen kuin toistat "talot peittävät": muoto oli mitattavissa v6-kuvasta samalla rajauksella, ja sama reuna jäi 3D:hen. Viestin nimi ei kelpaa: käytä id:tä tai riviä viitteineen.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
