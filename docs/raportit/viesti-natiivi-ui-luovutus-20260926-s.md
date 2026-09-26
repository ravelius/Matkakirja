# Natiivi-UI:n luovutus 26.9.2026 (s), klo 14.3x

Jatkaa luovutusta (r). Proto-git `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (haarat natiivi-ui/<aihe> juna/b13:n
päälle, varmuuskopio `natiivi-backup`). Työkopiot: `wt/proto-natiivi-ui-{sisallys,nostot,pariteetti}` (puhtaita).
Simulaattorit: oma iPhone 17 FB234D08; iPad Pro 11 503000D1 jaettu Laitetestaajan kanssa (ilmoita ennen); iPad 13 =
Pelikoodarin pariteetti-iPad13 88939C12 (kysy lupa). Fable = local_5df52e10-10e4-4b72-9554-0049db300dfe,
Natiiviseppä local_674b9ec4, Julkaisija local_5cb16c00, Linssiseppä local_771b401b, Pelikoodari local_7fcab04b.

## Junassa tänään (juna/b13 38887fd3 → build 21)
- 155b (taso 1 kuvamerkki), 156 maakunnat-veto, 158 pikkukuva + pikkukuva-lahde, kuljettu-kytkin (☰ Kartta,
  ElavaMatka.NakyvissaKysely), pariteetti-kokoruutu, kuvat-kiinteat (LRU ei tuhoa mukana-kuvakkeita; `ui kuvat raja <Mt>`),
  lipputanko-161 (ankkuri `kartta/lippu_lonlat.json`), lippu-kiinnitys (Kuvat.Kiinnita + ankkurien FormatException-korjaus),
  ipad-visa, ipad-maalehti, ipad-sahke, ipad-nostokortti (≤ 620 pt, Fablen päätös).
- Linssisepän haarassa: ElavaHerays.KorttiAukiKysely (UiNakymat, saapumisen kortit), hän mergeää.
- 160 2D-piilotus: symbolit-160b 2486228c Natiivisepän haarassa (päätetty, junassa hänen kauttaan).

## Merge-pyynnössä
- natiivi-ui/jalki-mallin-alta 46d394f2: 3D-mallin alle osuvat löytämättömät merkit piiloon (kuvapari
  proto-3d/lokit/natiivi-ui-b21-jalki/). 153:n usvan opacity nyt PeitaMallienAlta:ssa vain muuttuessa.

## UI-pariteetti (Fablen OK, valmis)
Ajot `proto-3d/lokit/pariteetti-ajo/`: b20-ui-1 (iPhone), b21-ui-vaaka, b21-ui-ipad, b21-ui-ipad13(-2), uusinta
b21-uusinta-{pysty,vaaka}; kussakin luokittelu.md. Työkalu-PR #3324 mainissa (rivit 2/24/35). Rivi 2 (aloitusvalinnan
nimet vain 4) = Natiiviseppä. Jäljellä hyväksytyt poikkeamat; 24 kohtaaminen vaakana työkalun ajoitus.

## Linjaustarkistus (Fablelle raportoitu 14.3x)
Yläpalkki, ☰-valikko, laukun logo → tekijätiedot, kartan sumennus, linssien yläpalkki: todennettu (kuvat
natiivi-ui-b21-jalki/linjaus-*.png). AVOIN: ☰-valikon napit "Äänim…" ja "Kehitt…" katkeavat iPhonella; yläpalkin
piiloutuminen karttaa vieritettäessä todentamatta (kartta ei panoroinut simulaattorin touch_path-vedolla).
Fable tekee näistä seuraavan erän.

## Opit
- Testikomennot: peli-komento.txt, ui-komento.txt (rivit "ui …"), komento.txt (kuva, kartta), linssi-komento.txt.
  Konsoli: `simctl launch --terminate-running-process --stdout=<f> --stderr=<f>`.
- UI-puu ei näe tuhottua tekstuuria (== null): valkoinen neliö kartalla = tuhottu Texture2D.
- `siivoa-pariteettisimut.sh --aja` koskee KAIKKIA pariteetti-simulaattoreita → älä aja; uninstall + shutdown UDID:llä.
- Pariteettiajo: aja tools/ worktreestä (ei irrotetusta tools-kansiosta: web-puoli kaatuu). Sovellus vaatii ~20 s
  bootin jälkeen ennen launchia; tarkista ennen ajoa, ettei asennus ole kadonnut (listapps).
- Yksi käännös/ajo per simulaattori kerrallaan; päivällä enintään 2 simulaattoria; ilmoita Julkaisijalle päällä/pois.
