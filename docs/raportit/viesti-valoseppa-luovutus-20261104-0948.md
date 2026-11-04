# Valosepän luovutus 4.11.2026 klo 09.48

Syy: konteksti yli pehmeän rajan (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0916.md (lue sen Opit ja Työkalut). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-striimikartta-pohjaksi.md, osiot MUUTOS 2 ja MUUTOS 3.

## Linja nyt
- **OMISTAJA 09.27 ja PÄÄTÖS 09.33:** oikea striimikartta pohjaksi koko kartalle, väritys ensin. Sitten Codex piirtää isomman alueen uudelleen ja Tripon 3D-nähtävyys istutetaan siihen. c2:n hionta ja arkit seis.
- **Järjestys:** 1) VS väritys → KK → omistajalle kuva + kortti; 2) KS 19c hyväksytystä värityksestä; 3) Tripon kirkko ja iso iPad.
- **Ei pelihaaraa ennen kortin "kelpaa"-sanaa** (KK 09.4x). Jos suunta muuttuu, KK ilmoittaa.

## Tila (natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, haara linssiseppa2/pariisi-k49-koe, 873762394, puhdas)
- **k52** (_tyo/linssiseppa2/pariisi-tyyli/k52/): KK vie omistajalle.
- **k53** (k53/TULOS.md, kuvat, koe.diff) lähetetty KK:lle; vastausta ei vielä. Kohdat 1–4 tehty, korjaamatta jääneet TULOS.md:n kohdassa EI SAATU KORJATTUA: z12 vaalea (188 vs. z13 168), z12:n massa pilvimäinen ja palarajat heikosti näkyvissä, Tuileries ja Luxembourg c2:ta vaaleammat, metsät kovareunaisia.
- **Koodi ei ole haarassa:** k53/koe.diff sisältää k52:n muutokset, git apply k49:n päälle. ELAVA_S=1, ELAVA_S_PIENET=0. Kokeen koodia, ei pelikelpoinen.
- Data k52/data/: keski, reuna-518/519/520, lontoo (OpenFreeMap, pelin lähde; robots.txt palautti 403, ei kieltoa).
- k49:n peruminen: JU ei ole kuitannut; Julkaisijan viimeisen tunnin tiedostoista ei löytynyt k49:ää.

## Seuraavaksi
1. KK:n vastaus k53:sta. Jos KK pyytää jatkoa, ensin z12.
2. Värien "kelpaa" kortilta → KS tarvitsee saman kohdan Notre-Damen kehyksessä (alue.json, 1 m/px, pohjoinen ylhäällä). Ei vielä.
3. Sen jälkeen puhdas pelihaara: väritys koko kartalle, välimuistiversio, testit; muisti ja palan aika laitteelta.

## Opit
- k46/data/z10.rgb on tasaista harmaata (200,200,200), joten kaikki sen päällä ajetut paikalliskuvat (b, c2) eivät ole pelin pohjan päällä. Käytä k52/data/keski tai hae pohja sarjasta 2026-11-03-pohja-valitaso. Tarkista pohjakuva ennen kuin vertaat värejä.
- Pelin pohja: Suurenna(PuhdasPohja) + alkuperäinen; k52:n koe.diff tekee saman testissä.
- z13-palassa on rakennukset (yksi moniosainen kohde), z12-palassa ei. Maankäyttö ei kata Pariisin keskustaa.
- Valmis dll ajetaan ilman uudelleenkääntämistä: k53/aja.zsh.

## Työkalut
k53/aja.zsh <wt>, k53/kuvat.py (kuvat ja mittaukset), k53/inv.py <pbf> (kerrokset ja luokat), k52/hae.py (haku). Python tulivuoret/venv.
