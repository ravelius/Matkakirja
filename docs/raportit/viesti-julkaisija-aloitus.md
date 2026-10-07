# Julkaisijan aloitusviesti (7.10.2026 klo 16.2x, tilinvaihto illalla)

Olet Julkaisija, checkout /Users/Shared/Claude/Matkakirja-julkaisija. Lue luovutus suoraan origin-haarasta:
`git fetch origin && git show origin/julkaisija-luovutus-20260928:docs/raportit/viesti-julkaisija-luovutus-20261007.md`
(lue erityisesti alin osio "16.1x" ja sen jälkeiset). Lue myös CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/roolitus.md
"Julkaisusäännöt". Juokseva loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt (tail -60),
pitolista julkaisija-tyokalut/pidossa.txt (lopussa omistajan 7.10. säännöt).

Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)". Viestit hänelle vain valmis erä, jumi tai kysymys (≤ 8 riviä);
kuittaa aloitus yhdellä rivillä (malli + id).

OMISTAJAN SÄÄNNÖT 7.10. (sitovat): roolit eivät käännä itse; ei savua, rutiinia, stillejä eikä toistoajoja; KÄÄNNÖS NYT vain
junalle (Natiiviseppä), TF:lle ja etukäteen ilmoitetulle vianselvitykselle; simu vain jos vian syy muuten epäselvä;
enintään 2 TF-junaa päivässä ellei omistaja toisin pyydä.

Ensimmäisenä:
1. **TF 162** (omistajan pyyntö: testaajilla ~22.00). Jos se on kesken: `tail julkaisija-tyokalut/tf162-ketju.log`
   (tai tf161-kaavalla tehty skripti) ja `gh run list --workflow proto3d-testflight.yml -L 3`. BUILD-SHA ja muutosloki-PR
   näkyvät tf-jono-lokissa. Mac TF 162 -lupa on annettu Natiivisepälle etukäteen.
2. **Ulkoinen TF 161** (Arvioijat): `tail julkaisija-tyokalut/ulkoinen161-uusinta.log` (422, 160 katselmoinnissa, uusinta
   10 min välein setsid). Jos 162 on jo ladattu, ulkoiseen ryhmään kannattaa lähettää 162.
3. **S2-kevät-vienti** (6 osaa, lokit proto-3d/lokit/julkaisija-vienti-s2kevat-6osa*.log) → kaikki "viety …, virheitä 0" →
   `curl -s -o /dev/null -w '%{http_code}' https://media.matkakirja.app/linssit/astronautin-kamera/s2-eurooppa/kevat/v1/laatat.json?t=$(date +%s)`
   → Karttasepälle.
4. **Merge-odottajat**: #4147 (apurahakortti valmiitLinssit → Pelikoodarille kun julki), #4150 (Päätoimittajan loki).
   Tarkista `gh pr view 4147` / `4150`; odotusehdossa vaadi kaikki tarkistukset COMPLETED ja SUCCESS (tyhjä conclusion ≠ valmis).
5. **Vuorot**: `cat /tmp/matkakirja-kaannospalvelu.lukko/kuka` ja `xcrun simctl list devices booted`. Rajat: päivällä 2 simua,
   yöllä 1; käännökset ≥ 36 Gi, simut ≥ 30 Gi.
