# Karttaseppä: luovutus 5.11.2026 klo 19.11 (KS)
Syy: konteksti 26 % (7.37), tauko omistajan, Julkaisijan, Tripon ja Codexin odotuksessa. **Lue tämä; -1900 (8e7eb1201) vain Montparnassen ja Panthéonin kohdat, -1834:n (7ab3a6399) Riemukaari.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 0906b3c15. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. Tarkista viestit: **KK:n kortti Invalideista** (lähetetty 19.0x) ja **Julkaisijan ajo Grand Palais'sta**.

## Grand Palais: asennettu, ajo Julkaisijalla
- Hyväksytty Tripolle (posti d05c680ac), raaka `grand-palais.glb`, ei toista ottoa. Leveys 0,42 oli virheeni, koska luin sen yläkuvasta; sivukuvat antavat noin 0,35.
- Asennettu d5d2b9169, skripti `_tyo/karttaseppa/grand-palais-asennus/asenna.py`. **Suunta -0,9:** Front (+Z, GlbLukijan jälkeen -Z) etelään ja poikkisiipi länteen. Laskettu säännöstä etuosan atsimuutti = 180 + Suunta, jonka Notre-Dame vahvistaa (112 → 292°).
- Ajo d5d2b9169 katsottu (`lokit/julkaisija-grand-palais-d5d2b9169/`): **suunta oikein,** poikkisiipi lännessä, pääjulkisivu idässä. Vika: vaalea laatta katkaisi rantatien; korjattu 0906b3c15 (`grand-palais-asennus/korjaa-rantatie.py`).
- **Lähikuva-ajo pyydetty JU:lta (0906b3c15, `sk-pariisi-grand-palais-lahi.txt`, 4 kuvaa). Kun kuvat tulevat: katso täysikoossa, kuva KK:lle (luvattu omistajalle).** Kuvaa ei ole vielä lähetetty. Ensimmäinen ajo oli liian kaukaa.
- Sama laatan vaara muissa mallien pohjissa: katso rantatiet ja reunat ensimmäisestä ajosta.

## Invalidit otto 2 (#2114): KK:lla, suositus kelpaa
Arkki ja vertailu `_tyo/karttaseppa/sarja24-opera-pantheon-montparnasse/invalides/` (`arkki-omistajalle.jpg`, `pohja-vertailu.jpg`, `kartalla.png`, `tee-arkki.py`). Kuvat `_review-sarja-24/invalides-otto2/`. Codex antoi itse QA FAIL. Pihat ja J-siipi vastaavat kuitenkin kartan pohjaa, ja pihamäärä 3/4 oli tilauksessani väärin. Viat kerrottu KK:lle: kupoli noin 10 % matala, pohjoissiipi noin 10 % leveä, koillisen viisto lähes pohjoisesta.
**Jos omistaja sanoo kelpaa:**
- Tripo Louvren tapaan: Front `viisto-lounas.png`, Back `viisto-koillinen.png`, Left ja Right tyhjinä, koska pihat eivät näy sivukuvista (posti a401a94c3, be60d6665). Tarkista avoimet pihat; raakamalli, jos kevennys rikkoo UV:t. Kaksi epäonnistunutta → viesti minulle.
- Paikka: kupoli oikean kupolin kohdalle, kartan px (706, 802); yläkuvassa kupoli (765, 830). `alue.json`:n malli_px on noin 59 m idässä, eikä sitä käytetä. Koko: leveys 363 m (mittakaava 0,799 kartan px / yläkuvan px); rakennus 543–858 × 561–919, pitkä 412 m. Korjaa `alue.json` ja jalanjälki.
- Maapohja: otto 1:n `_review-sarja-24/invalides/pohja-uusi.png`, kaksi laikkua (x 650–700 / y 70–145, x 810–865 / y 45–185) nurmeksi `grand-palais-otto2/siisti-pohja.py`:n tavalla. **Älä käytä otto 2:n pohjaa,** se täytti puiston sisennyksen. Vanha kiveysalue x 587–926 ylittää Boulevard des Invalidesin siirron jälkeen: rajaa kiveys uuteen paikkaan, ja tie jää näkyviin.

## Tilaukset tässä vuorossa (posti 2aac98a31)
- **Opéra 24j, Tripo:** KK antoi sanan jatketuista torneista. Front `etela`, Back `pohjoinen`, Left `lansi-peilattu`, Right `lansi`. Odotetaan `opera-3d-v1/`, jonossa Panthéonin jälkeen. Pelikoko 222 × 151, etuosa noin 164°, siis Suunta noin -16. Pohja `opera/pohja-siisti.png` omalla alfallaan. Kerrottu: kupoli ja näyttämötorni 15–20 % korkealla, katsotaan valmiista.
- **Sacré-Cœur 24k, Codex:** omistaja 19.03 "Uusi otto"; Raamattu 2.206, mäki kuuluu malliin. Mäki täyttää 420 × 200 m, kirkko noin 200 × 100 m, kupolin kärki 170 m lattiasta, lakitasanne 60 m, kirkon keskipiste 60 m keskeltä pohjoiseen. Etelässä terassi, nurmirinteet ja portaat. Odotetaan `_review-sarja-24/sacre-coeur-otto2/`. **Kerroin KK:lle kirkon koon muutoksen vasta tilauksen jälkeen; jos omistaja haluaa toisin, korjaa tilaus heti.** Reunan sopivuus litteään karttaan on kokeilematta: katso arkissa ja kerro. Arkki KK:lle (`tee-arkit.py`, lisää kohde), ennen Tripoa omistajan sana.

## Odotetaan
Tripo: Riemukaari 24g käynnissä (b14be7b1), Panthéon 24i, Opéra 24j. Kuva pelistä KK:lle jokaisesta. Codex: Montparnasse 24h, Sacré-Cœur 24k. Riemukaaren asennus: -1834, käytä `riemukaari/pohja-siisti.png` omalla alfallaan. Panthéon: Suunta 18,4 on pitkän sivun normaali, portiikki noin 288°.
Tuileries'n leike NUI:lla. Pieni iPad JU:lla. ND:n tornit: ei tehdä. Eiffelin kyltin napautus testaamatta, ND:n ja Louvren pohjat eivät häivy usvaan, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen. Hook toistaa työlistan rivejä, joita en tiedä omikseni: PT kuittaa.

## Opit
- **Vertaa ensin kartan omaan pohjaan.** `alueet/<kohde>/pohja.png` näyttää oikean rakennuksen pihoineen. Se kertoi Invalideista enemmän kuin valokuva, ja se myös näyttää, osuuko `malli_px` oikeaan rakennukseen.
- Tilausluvun kumpikin puoli voi olla väärin: kun Codex tai Tripo raportoi poikkeaman, tarkista ensin, mistä luku tuli. 0,42 ja 3/4 pihaa olivat molemmat minun lukuvirheitäni.
- Pihat eivät näy sivukuvista: pihallisille kohteille Tripon syöte viistoista.
