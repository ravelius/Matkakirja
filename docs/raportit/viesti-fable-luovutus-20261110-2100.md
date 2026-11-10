# PT:n luovutus 10.11.2026 klo 21.00 (PT local_8d8ebf72; konteksti 30 %)

Korvaa -1931:n. LINJAT voimassa: kolme kärkeä; Asemataulu jäädytetty (hookin asemataulu/junat.json-kehotuksia EI tehdä; työlista tyolista.py:llä); mittaukset vain isolla iPadilla. Date ennen aikaleimaa. Päätökset: tämän haaran paatokset-2026-11.md (20.13, 20.19, 20.23, 20.30, 20.51 lisätty; haara sisältää myös -1931:n kirjaukset) → PR mainiin.
Id:t /Users/Shared/Claude/osoitekirja.md. NS local_0f7f169f, NUI local_4b84cd90, PK local_d3bb1f78, KS local_7b57e35a, JU local_2a7d6c96, VS local_5ebb0658, Postivahti local_1f31f830, KK local_d5f31591.

## UUDET LINJAT TÄNÄ ILTANA (lokissa)
- 20.13 TYÖLISTA: KK pitää järjestyksen ja suunnitelman (scratchpad/keskustelukanava/jarjestys.md); PT ja roolit kirjaavat tilan (tilanne/valmis/este/jono). Viestillä jaettu työ → rivi tai rivi KK:lle. Asennussivun työosio päivittyy itse (JU:n vahti tyo-osio.py, 15 s). tyolista.py valmis --juna EI hyväksy 224.N → käytä ilman --junaa, versio tekstiin.
- 20.19 PARIISI KOODIMALLEIHIN: Tripo-mallit vaihtuvat koodimalleihin; vaihtamattomat Tripo 224.35-koossa; Tripo-koosta ei korttia. Järjestys: RK/ND/Eiffel (tehty 224.42) → Louvre, SC, Panthéon, Invalides, Opéra, Sainte-Chapelle (KS, Louvre työn alla) → ympäristöt.
- 20.23 OMISTAJA TESTAA ITSE kunnes iso iPad toimii (huomenna): iPad-ajoa odottavat → linkkiin Mac-oletustilan parilla + PT katsoo + "kokeiltava: …"-rivi JU:n viestiin; vika → linkki edelliseen. Ei mittauksia eikä TF:ää.
- 20.30 RAAMATUN KEVENNYS luvut 12 ja 7: tekijä KK heti tilinvaihdon jälkeen (poikkeus PT-sääntöön). Tilinvaihdossa: kerro KK:lle heti; muut roolit odottavat luvun 12 yhdistämistä, jos ~1 h; ohjeiden koe kerran sen jälkeen.
- 20.51 EROTTUVUUS kaukaa kokeiltavaksi (ei lopullinen; KK kysyy myöhemmin jääkö).

## JUNA 224 (liput /Users/Shared/Claude/julkaisija-tyokalut/linkki-224-uutta/; pt-ok sitoo SISÄLLÖN (sha tekstissä), JU siirtää numeroa linkkijärjestyksessä)
- Linkki 224.39 (tavoitepalkki), 224.40 tapit JU:lla (MR30).
- pt-ok kirjoitettu, JU:n jonossa: ovet 3eb33531c (224.41), KS Pariisi koodimallit 599b0150d (224.42; sis. 0f0f950a6 kaatuvan mallin suoja + NUI nimet/kontrasti + Tripo 224.35-koko), NS puut 5de74b863 (224.43), VS erottuvuus 593d09722 (224.44/45, KS:n päällä).
- 224.44.pt-ok.odottaa = PK osat 6+11 aae0ab729: testi LinjatOikeallaKartalla 904/905 punainen → korjautuu PK:n osan 5 kärjessä b744c680b (6+11+8+5 aukiot kokeena, 911/911). Odottaa JU:n Mac-paria (aukio 1 vs 0) → PT katsoo → yksi pt-ok koko kärjelle; kysy aukio-kytkimen oletus.

## LAITEVIKA (omistajan 18.53/19.30 pieni iPad)
- KS koodista: 18.53 "ei taloja" = ensihaku palvelimelta (219 palaa, 96 Mt) ILMAN latausmerkkiä (NS:n rivi "latausmerkki"); 19.30 ND puuttui = mallin luonti kaatui (suoja 224.42:ssa); jättinimet samasta polusta (NUI). Mac ei toista. Varmistus: omistajan kokeilu + iso iPad huomenna (NUI: iPad-pari 0f0f950a6/599b0150d + loki grep "NullReference|astc:|nähtävyyslataus").
- Beige aukko JU:n om1853-2-ajossa = kuva ennen 219/219 latausta (välimuisti vuorotteli 224.35/36), ei paketin vika.

## ROOLIT NYT
- KS (nollattu 7a5f3c8fa): Louvre koodimalliksi. NS: horisontin beige vyö (oma löytö, rivi KK:lle) + latausmerkki-rivi. NUI: kartan kohteet kolme lajia, vaihtoehdot kuvina (KK:n järjestys kohta 4). VS (nollattu 352177a20): erottuvuuden jatkohuomiot (rosoinen viiva, Louvre haalistuu), vesitäyttö odottaa isoa iPadia. PK (nollattu): osa 5 Mac-pari. JU: liput yllä; välimuistin esitäyttö pysyvä T/esikatselu-rungolla.zsh:ssa (tarkista ensimmäinen loki "välimuisti esitäytetty").
- ODOTTAA OMISTAJAA: ison iPadin uudelleenkäynnistys (huomenna).
- PT:n oppi: "koe, ei junaan" -commitmerkintä ei ole este, jos omistajan kortti koskee sitä (17.4x virhe). Katso kokonaisuus ennen "ei vika" -tulkintaa (20.2x virhe, KK korjasi).
