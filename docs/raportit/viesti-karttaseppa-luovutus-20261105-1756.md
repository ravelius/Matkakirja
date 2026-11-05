# Karttaseppä: luovutus 5.11.2026 klo 17.56 (KS)
Syy: konteksti 28 % (7.37), tauko Codexin toimituksia odottaessa. **Lue tämä, sitten -1706 (haara karttaseppa/luovutus-20261105-1706), -1651 ja -1628.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 9e8c8ab1e. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh a85fae8fb` (käsitelty-kohta on tilassa).
2. Tarkista list_events: KK:n sana Grand Palais'n arkista ja PT:n vastaus Wikidatan ja Wikipedian API:sta. Viestit ovat voineet tulla nollauksen aikana.
3. Codex tekee rinnakkain Montparnassen, Opéran, Panthéonin ja Riemukaaren, sitten Sacré-Cœurin ja Invalidien oton 2 (posti 649994d5e). Katso saapumisjärjestyksessä täysikoossa.

## Grand Palais otto 2: KELPAA, arkki KK:lla, odottaa omistajan sanaa
Toimitus d9d90657e, `_review-sarja-24/grand-palais-otto2/`. Codexin QA FAIL, mutta arkki on näyttämisen arvoinen, ja KK:lle kerrottu poikkeamat. Uutta ottoa ei tarvita. Kuittaus Codexille ae84ac494.
Arkki: `_tyo/karttaseppa/grand-palais-otto2/arkki-omistajalle.jpg`; kartalla: `paalla-kokeilu.png` samassa kansiossa. Skriptit katoavat scratchpadista: arkin sisältö on kuvattu tässä.
**SUUNTA, TÄRKEÄ:** TILAUS-24d:n ilmansuunnat olivat peilissä (virhe minun, ortokuvan ylälaita on länsi, ei itä). Oikeasti pääosa ja pylväät IDÄSSÄ, poikkiosa LÄNNESSÄ (ilmasta-P1180998.jpg, eiffelilta-34795361424.jpg, varjot). Muoto on pohjois-eteläsuunnassa symmetrinen, joten Codexin tiedostot kelpaavat nimet vaihtamalla ja malli **käännetään asennuksessa 180°** (Suunta). Älä muuta kohteet-pariisi.json:n suuntaa ennen kuin katsot, miten rak.py ja peli.py sen lukevat. Lisää 180° vasta asennusta tehdessä ja tarkista kuvasta. 24d ja LAHTEET.md on oikaistu, ja `ylakuva-pohjoinen-ylos.jpg` on käännetty oikein päin.
Oikea suunta → tiedosto:
- etelästä = `pohjoinen.png`, pohjoisesta = `etela.png`
- idästä (pääjulkisivu) = `lansi.png`, lännestä = `ita.png`
- viisto koillisesta = `viisto-lounas.png`
- viisto luoteesta = `viisto-koillinen.png`, joka on piirretty kaakosta eikä koillisesta (sitä Codex ei saanut varmistettua)
- `ylhaalta.png` käännetään 180°, joten sen pieni lippu on ylösalaisin
**Tripo-tilaus omistajan sanan jälkeen (tee Eiffelin 24c:n mallilla):** syöte vain neljä sivua. Sivukuvissa eri mittakaava (päälista maasta S/N 198 px, E/W 155 px): skaalaa samaan mittakaavaan ennen syötettä. Viistot ja yläkuva tarkistuslähteiksi, ei syötteeksi. Lippu paksu levy, masto paksu. Mallin omat akselit kirjataan, ja käännös tehdään asennuksessa. Tripo-sessiolle lupa vasta silloin; sama rinnakkaisuus muille (posti 1130c0368).
Tiedoksi KK:lle kerrottu: rakennus suhteessa noin 15 % korkeampi, poikkiosa noin neljänneksen kapeampi, eteläpää rantatien viivojen päällä kuten Eiffelillä.

## Invalidit
Otto 1 hylätty (0cc7ad898). **Otto 2 tilattu KK:n sanalla, TILAUS-24e, posti 489788225.** KK 1130c0368: saa alkaa heti, kun sessio riittää. Jos otto 2 ei kelpaa: omistajalle ennen kolmatta (KK). Oikea pohja on tilauksessa, eteläpuolisko epäsymmetrinen. Maapohja otto 1:stä, vain esplanadin korttelilaikut pois.
**Rajaus, KK vahvisti:** 2.210 koskee vain aloituslennon valokuvaa (kortti 11.26 kysyi noususta): kuva ei nouse, pyöreä merkki jää. 3D-malli ja maapohja jatkuvat sarjassa (2.206, 2.215). Tarkista kytkettäessä, miltä pyöreä merkki näyttää mallin kohdalla (Merkittavat.json Q188977, 48.855 2.3125).

## Commons: API seis (PT 17.5x)
Skriptattu `/w/api.php` on seis, koska robots kieltää `/w/`. Tiedostosivut ja kuvat vain sallituilta poluilta; robots ensin erillisellä komennolla; muuten omistaja lataa käsin tai lähde jää. Codexille 7f4172bc4; se raportoi aiemmat haut kohteittain.
**PT 18.0x: sama kielto on Wikidatassa ja Wikipediassa (PT luki robots.txt:t). Uudet skriptihaut ovat seis kaikista kolmesta, kunnes omistaja päättää KK:n kautta. Vanhaa aineistoa, Merkittavat.json mukaan lukien, ei poisteta eikä muuteta sillä välin.**
Skriptit `_tyo/karttaseppa/`-kansiossa, ÄLÄ AJA:
- Commons: `isoisan-kartta-20261102/tyokalut/haku.py`
- Wikidata: `kerrokset/unesco18.py`, `kerrokset/maailmanperinto.py`, `kerrokset/eurooppa-perinto.py`, `merkittavat/hae.py`, `paakaupungit-3d-198/skriptit/haku.py`, `paakaupungit-3d-20261016/skriptit/haku.py`
- en.wikipedia: `esittelypaikat-20261103/hae.py`
- `api.php` mainittu, kohdetta ei selvitetty: `merkittavat/kaupungit.py`, `merkittavat/suomeksi.py`, `tietokortit/linkita.py`; myös `paakaupungit-pilvi-20261013/e04/TILANNE.md` mainitsee sen
Lista on grepillä tehty, eikä siitä näe, milloin skripti on ajettu.

## Muiden kohteiden suuntatarkistus
Posti ae84ac494 kertoi Codexille: Opéra etelään, Panthéon länteen, Sacré-Cœur etelään, Riemukaaren kaaret Champs-Élysées'n akselilla, Invalidien kupoli etelässä. **Tarkista jokaisesta toimituksesta oikeaa kuvaa ja `pyyhitty.png`:n katuja vasten.** Väärä suunta ei yleensä vaadi uutta ottoa, jos muoto on symmetrinen. Epäsymmetrisessä uudesta otosta päättää KK.

## Muu auki (ennallaan -1706:sta)
Pieni iPad: JU:lla PT:n mukaan ensimmäisenä työnä, tarkistamatta loppuun. ND:n tornit: ei tehdä. Eiffelin kyltin napautus testaamatta, ND:n ja Louvren pohjat eivät häivy usvaan, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen.

## Oppi (PT kirjasi)
Ilmansuunta ja pääjulkisivu varmistetaan kahdesta lähteestä ennen tilausta: Commonsin ortokuvassa pohjoinen ei ole aina ylhäällä. Luovutuksen kohta "tarkista arkista" on tehtävä samassa vuorossa, kun arkki saapuu.
