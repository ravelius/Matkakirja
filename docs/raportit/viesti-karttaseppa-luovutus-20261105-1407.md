# Karttaseppä: luovutus 5.11.2026 (KS)
Syy: konteksti yli 25 %, ja työ odottaa Codexia (7.37). **Lue tämä, sitten -1350 (karttaseppa/luovutus-20261105-1350) ja -1325.** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. S = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nahtavyyssarja. C = /Users/Shared/Claude/proto-3d/_tyo/codex.

## ENSIN
1. Remote päälle. Vahti Monitorilla: fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko, käsitelty 4743c4ca8. Monitor kuolee nollauksessa, joten käynnistä se heti.
2. Odotetaan Codexilta kahta toimitusta: **21g** `C/pariisi-louvre-20261104/_review-otto3-21g/` ensin, sitten **sarja 24** `C/pariisi-sarja-20261105/_review-sarja-24/<id>/` kohde kerrallaan.

## Omistajan päätökset (KK:n välitys)
- 13.46: Codexin tapa Pariisin maapohjiin, polut ja vaihteleva nurmi. Kukkiva puu pois saarelta.
- 13.54: koko puisto mukaan aina, kun se koskettaa aluetta (Champ-de-Mars, esplanadi, Champs-Élysées'n puistot, Riemukaaren koko aukio). v7:n arkin näkee omistaja KK:n kautta.
- 14.04: Louvren itäpäähän korkea paviljonki ennen Tripoa, yksi uusi Codexin kierros, sitten Tripo. Ei neliöpihaa; länsipää ja muu pysyvät. Lännestä pyramidin takana sama näkymä kuin `C/pariisi-esittelykuvat-20261105/hero-pariisi-louvre.jpg`. Pyramidi pelissä v1b:n suhteessa (0,63 pihan leveydestä, koodissa).
- 14.04: sarja kaikki kahdeksan kerralla, ei yhtä koetta. Omistaja näkee kuva-arkin ennen Tripoa.

## Kun kuvat tulevat
- **21g:** katso täysikoossa, `lansi.png` ensin: paviljonki pyramidin takana, korkein osa, ei neliöpihaa, sama rakennus kaikissa kuvissa. Vertaa oikeaa Louvrea vasten (`vertailu-21g-itapaa.jpg`). Kuvat → KK → omistaja → vasta sitten Tripo. Uusi otto vaatii omistajan sanan.
- **Sarja 24:** muoto oikeaa rakennusta vasten ennen Tripoa; arkki KK:lle. Maapohjat liimataan vain maskin sisältä. Tarkista liitokset ja se, että puistojen muoto säilyi.
- Asennus: `S/tyokalut/peli.py` tekee määritykset. Leveys, Korkeus, X ja Y ovat metrejä; Eiffel on 1,1 m/px ja Invalidit 1,15 m/px, joten rivit on jo kerrottu. Tätä ei ole ajettu pelissä: tarkista ensimmäisellä Mac-ajolla, että pohja osuu paikalleen (kuva venyy Leveys × Korkeus -alaan).

## Tila
- **Saari:** 661377bbb katsottu, kuva KK:lla, kukkivat poissa (26 puuta). Pieni iPad päivitetään tästä haarasta JU:n vuorolla, ei KS:n työtä.
- **Alueet v7:** `S/alueet/arkki-v7.jpg`, `yleiskuva-v7.jpg`; v6 tallessa `S/alueet-v6`, `tyokalut/sarja-v6.py`, `kohteet-pariisi-v6.json`. Sacré-Cœurin länsipuolen talokortteli pois kentällä `ei_puistoa`. Élysée-palatsin puutarha jäi pois, koska kortteli ei täytä puistorajaa. Molemmat kerrottu KK:lle.
- **Tilaukset:** d9d2588ec ja korjaus 4743c4ca8 (21g:n vertailukuva vaihdettu). Keskipaviljongin mitat ovat KS:n ehdotus: leveys 120, räystäs 190, huippu 350.
- **PR 6273:** tarkista -1350:n mukaan, että meni mainiin. **VS:n saumakoe 7068e23a4:** -1350 pätee.

## Opit
- Pyyhintä kirkkausrajalla vie myös puiston nurmen. Nurmi tunnistetaan värillä 195/176/116; R-B-raja jätti monumentit pohjaan.
- Puistokortteli landcover-osuudella antaa väärän puiston talokorttelista, jossa on pihoja. Katso aina v6/v7-ero kuvana.
- Katso rajattu vertailukuva ennen lähetystä: ensimmäisen 21g-kuvan vasen puoli ei näyttänyt Louvrea, ja se meni postiin.
