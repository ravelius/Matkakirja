# Karttaseppä: luovutus 5.11.2026 klo 19.27 (KS)
Syy: konteksti 26 % (7.37), tauko omistajan ja Tripon odotuksessa. **Lue tämä; Invalidien tausta -1911:stä (kärki 7c7dea0d3), Panthéon -1900:sta (8e7eb1201), Riemukaaren maapohja -1834:stä (7ab3a6399).** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 3b253ee87. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. Tarkista viestit ja posti: seuraavaksi tulevat Tripon mallit ja Codexin Sacré-Cœur.

## Valmis tässä vuorossa
- **Grand Palais:** lähiajo 0906b3c15 katsottu, suunta oikein ja rantatie ehjä. Kuvat `grand-palais-asennus/peli-etela.png` ja `peli-ita.png` KK:lla, tunnettu usvavika kerrottu. Ei muuta tehtävää.
- **Sarjan koot ovat tarkoituksella suurempia kuin oikeat:** `nahtavyyssarja/LUE.md` rivi 14 (Louvren hyväksytty suhde). `koko_m` voittaa `oikea_m`:n. Älä hälytä, vaikka malli on kartan rakennusta noin 30–100 % suurempi.

## Usva: omistajan pyyntö 19.30, koodi tehty, ajamatta
"Horisontissa näkyy eiffel vaikka ei ehkä pitäisi." Tehty 3b253ee87 (kärki): `Nahtavyysalue.PaivitaUsva` laskee peiton mallin jalasta kyltin kaavalla, `NotreDameKirkko.shader` häivyttää usvan väriin ja viimeisen neljänneksen pisteyttäen, `NotreDamePohja.shader` seuraa ruudun usvaa pikseleittäin, maavarjo pois peitossa 0,6. **Kääntämättä ja ajamatta.** KK: ajo vain, kun se on muutenkin tarpeen: **liitä `sk-pariisi-usva-eiffel.txt` seuraavaan malliajoon,** katso täysikoossa (myös pisteytys ja se, ettei kirkas malli katoa liian aikaisin) ja kuva KK:lle.

## Riemukaari 24g: otto 2 valittu (posti e1980ef06)
Otin kantaa Tripon postiin 51d99ee30. H/W 0,98 ja D/W 0,54 hyväksytty, koska oikea kaari on noin 1,10 ja 0,50 ja tilauksen 0,90 tuli kuvista. Tripo avaa kapeat kaaret paikallisesti, siistii jalustan ja ajaa aukkotestin uudelleen. Ei kolmatta generointia. KK:lle kerrottu, että malli on omistajan kuvaa korkeampi.
Odotetaan `riemukaari-3d-v1/`. Asennus: `riemukaari/pohja-siisti.png` omalla alfallaan. Kuva pelistä KK:lle.

## Montparnasse 24m: omistaja 19.28 "Kelpaa", Tripolta tilattu (posti f5fe06ac9, 19.30)
Tilaus `_tyo/codex/pariisi-sarja-20261105/TILAUS-24m-montparnasse-tripo.md`, syöte `montparnasse/tripo-syote/` (Front `etela`, Back `pohjoinen`, Left ja Right `lansi`). Odotetaan `montparnasse-3d-v1/`, viimeisenä jonossa. Akselit: etela +Z, leveys 177 m X:llä, korkeus noin 600 m (sama suhde kuin Eiffelin 795 m, KK:lle kerrottu).
Asennus: **Suunta noin -51** (etuosan atsimuutti 129° = 180 + Suunta), pohja `sarja24-opera-pantheon-montparnasse/montparnasse/pohja-siisti.png` omalla alfallaan. Tarkista katto, koska sivukuvat eivät näytä sitä. Kuva pelistä KK:lle. Omistajalle kerrottu: väri ei hehku kullalle, päädyt oikeaa pyöreämmät, viereen jää kartan rakennuksia.
**Grand Palais'n kyltti:** tulee Kylttikohteista itsestään (KK:lle kerrottu 19.30), mutta sitä ei ole nähty pelissä, koska ajo piilotti käyttöliittymän. Katso seuraavassa ajossa ilman `ui lentopiilo`:a. OMISTAJA 19.23: kyltit pienempinä ja vasta lähellä, NUI tekee; sama sääntö uusille kohteille.

## Invalidit 24l: Tripolla, maapohja valmis
Pohja **`_tyo/karttaseppa/invalides-asennus/pohja-siisti.png`, käytä omaa alfaa, älä maski.png:tä** (`tee-pohja.py`, tarkistus `tarkistus.jpg`, `kartalla.png`, katsottu kartan päällä, ei pelissä). Esplanadin laikut nurmeksi, kiveys rakennuksen alle, itäreuna Boulevard des Invalidesin länsireunaan, joten oikea tie ja korttelit jäävät kartasta. Pelissä tarkista länsireunan porras (x 540, y 688) ja eteläsiiven kohta (x 752).
Asennus: kupoli kartan px (706, 802), leveys 363 m, rakennus 543–858 × 561–919, Suunta noin 4,1. Korjaa `alue.json` ja jalanjälki (`jalanjalki-uusi.png`). Kuva pelistä KK:lle. Kansion `katso*`- ja `zoom*`-tiedostot ovat tilapäisiä.

## Odotetaan
- **Tripo:** Riemukaari 24g, Panthéon 24i (saa ohittaa Riemukaaren, Suunta 18,4 on pitkän sivun normaali, portiikki noin 288°), Opéra 24j (Suunta noin -16, pohja `opera/pohja-siisti.png` omalla alfallaan, kupoli ja näyttämötorni 15–20 % korkealla, katso valmiista), Invalidit 24l.
- **Codex:** Sacré-Cœur 24k, `_review-sarja-24/sacre-coeur-otto2/`. Mäki 420 × 200 m, kirkko noin 200 × 100 m. Kirkon koon muutos kerrottu KK:lle vasta tilauksen jälkeen; jos omistaja haluaa toisin, korjaa tilaus heti. Reunan sopivuus litteään karttaan on kokeilematta: katso arkissa ja kerro. Arkki KK:lle (`tee-arkit.py`), ennen Tripoa omistajan sana.
- Tuileries'n leike NUI:lla. Pieni iPad JU:lla. ND:n tornit: ei tehdä. Eiffelin kyltin napautus testaamatta, ND:n, Louvren ja Eiffelin pohjat eivät häivy usvaan, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen. Hook toistaa työlistan rivejä, joita en tiedä omikseni: PT kuittaa.

## Opit
- Lue uusin versio luovutuksesta: pyydetty sha voi olla vanhentunut (`git log -- <tiedosto>`).
- Laatan vaara: katso ensimmäisestä peliajosta jokaisen uuden pohjan rantatiet ja reunat.
- Vertaa ensin kartan omaan pohjaan. Tilausluvun kumpikin puoli voi olla väärin: tarkista, mistä luku tuli.
- Pihat eivät näy sivukuvista: pihallisille Tripon syöte viistoista.

## Lisäys: PT 19.3x
Usvan mittari: kohde ja maapohja samalla usvatasolla kuin kartta. Kun ajo on katsottu, rivi PT:lle: commit ja kuvapari (`grand-palais-asennus/peli-etela.png` vs. `usva-eiffel-270`); kuvat myös KK:lle. Jos häivytys vaatii kartan usvakoodin muutosta, sovi suoraan NS:n kanssa (local_c7344e20-fba8-433d-ba8e-184a325037ef). Nyt kartan usvakoodi on ennallaan.
