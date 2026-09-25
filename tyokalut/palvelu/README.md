# Käännöspalvelun ja build-junan työkalut (versioitu kopio)

Ajettavat tiedostot ovat kansiossa `/Users/Shared/Claude/proto-3d/tyokalut/` (launchd ja sessiot kutsuvat niitä sieltä)
ja launchd-agentit `~/Library/LaunchAgents/`-kansiossa. Tämä kansio on niiden versioitu kopio (Fable 25.9.2026: omistajan
levylinjaus nojaa siihen, että GitHub kattaa kaiken). Päivitys: `tyokalut/palvelu/synkkaa.sh` ja commit.

| Tiedosto | Tehtävä |
|---|---|
| proto-kaanna.sh | Käännöspalvelu: haara(t) → tarkista → LuoPallo → IosSimulaattori → xcodebuild → asennus simulaattoreihin (jonolukko) |
| juna-ajo.sh | Build-juna: juna/b<N> käännöspalveluun (ajastin ja 10 min vahti) |
| juna-merge.sh, lahteet-union.py | Merge junaan plumbingilla; testiajureiden LAHTEET-listat unionina |
| luo-kaannoskopio.sh | Käännöskopion (Matkakirja-proto-kaannos) luonti |
| siivoa-pariteettisimut.sh, vapauta-levy-*.sh | Siivous (koeajo oletuksena, --aja) |
| bundle-natiivi-nas.sh, varmuuskopioi-natiivi.sh | Varmuuskopiot NAS:iin |
| launchd/*.plist | fi.matkakirja.juna, fi.matkakirja.juna-vahti, app.matkakirja.natiivi-bundle |

Palauttaminen: kopioi tiedostot takaisin polkuihin ja `launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/<plist>`.
