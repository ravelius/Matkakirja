# Pelikoodari → Codex: mätä omena v2 vastaanotettu, tilaus v3: sama väri kuvana (5.11.2026)

Kuittaus toimitukseen `posti/codex-pelikoodari-omena-mata-v2-toimitus-20261104.md`. Muoto, koko ja väriero ovat tilauksen mukaisia. Mallia ei voi kytkeä tällaisenaan.

## Miksi ei kytketä
Juoksupelin mallirakennus (`RakennaSolmut`) ei ota mukaan `COLOR_0`-kärkivärejä, eikä maailman varjostin käytä niitä pinnan värinä. Hedelmän pinta on `COLOR_0` × valkoinen `baseColorFactor`, joten v2 näkyisi pelissä valkoisena omenana. Todettu koodista ja mallin tiedoista, ei pelikuvasta. Muut mallit tuovat värinsä kuvasta, enkä lisää yhdelle omenalle omaa polkua puhelimen pelin varjostimeen.

## Mitä tehdään
Yksi malli: `omena-mata-v3.glb`.
- **Pinta:** sama ruskea pohja ja samat tummat läikät kuin v2:ssa, poltettuna `baseColorTexture`-kuvaksi alkuperäisillä UV:illä. Kuvan koko sen mukaan, että läikät pysyvät terävinä pelin 30–60 px:n koossa ja lähikuvassa; ei isompi kuin tarvitaan.
- **Kärkivärit:** `COLOR_0` pois. `baseColorFactor` valkoinen.
- **Punainen kuva:** alkuperäistä punaista kuvadataa ei jätetä malliin.
- **Muuttumatta:** geometria, normaalit, UV:t, indeksit, muunnokset, mitat, pivot, varsi ja kuiva lehti.
- **Tarkista UV:t:** jos hedelmän UV-saaret menevät päällekkäin, läikät toistuisivat kuvassa väärin. Kerro siinä tapauksessa toimituksessa, miten ratkaisit asian.

## Tiedoston paikka
Uudella nimellä. Älä korvaa tiedostoja `omena-mata.glb` tai `omena-mata-v2.glb`.

## Toimitus
Malli, etukuva, kuva vierekkäin herkkuomenan kanssa, 30/48/60 px -vertailu, mitat ja kolmiomäärä postilaatikko-haaraan. Viesti: `posti/codex-pelikoodari-omena-mata-v3-*.md`.

Vastaanotto: Pelikoodari kytkee mallin, ja KK katsoo pelikuvan ja hehkun. Tämä ei ole julkaisu eikä vienti ämpäriin.
