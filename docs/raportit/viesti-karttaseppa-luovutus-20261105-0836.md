# Karttaseppä: luovutus 5.11.2026 klo 08.36 (KS)
Syy: konteksti 25 % (7.37), F v1 ja A valmiit, B on uusi iso osa. **Lue tämä, sitten -0821 (d5dee27ab; sen Odottaa ja Opit pätevät, "Lähtöaineisto F:lle" on nyt tehty).** Python: /opt/homebrew/opt/python@3.14/bin/python3, ilman -I. S = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nahtavyyssarja (lue S/LUE.md). C = /Users/Shared/Claude/proto-3d/_tyo/codex.

## ENSIN
Käynnistä vahti Monitorilla (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko), käsitelty a66346394 asti; 08.36 ei uutta, 21f ei ole tullut. Vanha vahti.zsh poistettiin scratchpadin mukana: kirjoita uusi (K=HEAD, fetch, log K..FETCH_HEAD, sleep 60). Detached HEAD: ennen postia `git checkout --detach FETCH_HEAD`.

## Tehty
- **F v1:** S/tyokalut/sarja.py, arkki.py, peli.py, rak.py, mvt.py; kohdelista S/kohteet-pariisi.json. Kohde ei vaadi koodia. Peli-rivit ja neljän suunnan sk tulostuvat (S/alueet/maaritykset.cs.txt, sk-sarja.txt), mutta niitä ei ole ajettu: rivit odottavat malleja.
- **Kartan avoin ongelma ratkesi:** VS:n dll toimii ilman Unityä ja lukkoa ja tuotti Louvren palat tavulleen samoina; haki puuttuvat z14-palat OpenFreeMapista (pelin oma lähde).
- **A KK:lla 08.3x (viesti jonossa):** S/alueet/yleiskuva.jpg, arkki-v3.jpg. Kysytty KK:lta: kelpaavatko alueet, koot Eiffel 300 × 300, Grand Palais 380 × 252, Sacré-Cœur 420 × 200 (mäki), omat pohjat lähekkäisille (Opéra–Louvre 126 m, Panthéon–ND 102 m; poikkeaa 2.206:sta).
- Vanhat omat scratchpadit poistettu (8 Mt, PT:n pyyntö; ei mitään T7:lle).

## Seuraavaksi
1. **KK:n sana A:sta** → korjaa kohteet-pariisi.json ja aja sarja.py + arkki.py uudelleen.
2. **B: yksi Codex-tilaus koko sarjasta:** valmis pohja (oikean rakennuksen vertailu, Left/Right, mitat, ei maata; malli C/pariisi-louvre-20261104/TILAUS-21f-otto2.md ja -21c-tripo.md). Generoi kohdelistasta, lisää se F:ään. Montparnasse yhdellä kuvalla vähemmän, Sacré-Cœur mäki malliin. **Pysähtyy ennen Tripoa:** arkit (oikea rakennus | Codexin kuva | alue kartalla) KK:lle. Kun Codex kulkee yöllä, kerro PT:lle, mitä seuraavaksi tarvitaan.
3. **Eiffel B:hen vain vahvistettuna:** kysyin PT:ltä ristiriidasta (viesti "ei ennen korttia" vs. suunnitelman loppu "omistaja 08.19–08.20 Kyllä, kahdeksan kohdetta"). Vastausta ei ole; A:ssa mukana.
4. Työlistan rivi "Pariisin nähtävyyssarja" lisätty; päivitä se.

## Avoinna F:ssä
Usean palan kehys (Louvren v2 on 2 palaa, v1 laskee yhden); Invalidien suunta on asetettu käsin. Yö-tilan rivi Postivahdin aloitusviestissä oli eilisillan (22.32), joten en käyttänyt sitä hyväksyntänä.

## Opit
- Katu ja piha ovat kartalla samaa väriä (233/211/170): värillä poimittu "kortteli" on yksittäinen talo, joten raja rosoutuu. OSM-viivat antavat oikeat korttelit.
- Sillat katkaisevat Seinen paloiksi: pelkkä suurin vesialue jättää joen maskiin.
- `python3 -I` ei löydä numpyä tällä tulkilla.
