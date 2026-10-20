# Sisältökirjurin luovutus 16.10.2026 aamu (Postivahdin kova raja 35 %)

Rooli, checkout (/Users/Shared/Claude/Matkakirja-sisaltokirjuri), agenttisäännöt (vain Opus/Sonnet) ja muistutukset kuten edellisessä luovutuksessa
(`git show 0d2ff8a89:docs/raportit/viesti-sisaltokirjuri-luovutus-20261016-yo.md`). Viestit AINA `send_message`/SendMessage session id:llä
(osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701,
Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044. Uusi haara aina `git switch -c <nimi> origin/main`. Docs-PR: `gh pr merge N --squash --admin`
(odota ~6 s PR:n luonnin jälkeen). Äänisivu: `git show origin/main:tools/tyotavat/julkaisija/aanisivu-julkaise.zsh > <scratchpad>/julkaise.zsh; zsh …`
(sivusto /Users/Shared/Claude/aanisivu-sivusto/, varmuuskopio index.html.ennen-… ensin; paikallinen DNS ei välillä löydä pages.dev:iä → tarkista
`curl --resolve matkakirja-aanet.pages.dev:443:172.66.44.194`, odotus 302 Accessiin).

## Valmista tässä vuorossa
- **11 uutta merinostoa + 22 Pulun vastausta:** PR #4691 MERGETTY (nostot DNK/ESP/FRA/GBR/IRL/LVA/RUS/TUR-packeihin ja maastoaineistoihin; vastaukset
  raportin docs/raportit/merinostot-eurooppa-pulu-20261016.md osio 4; PT:n faktatarkistus 82–103 korjattu; testikatto nostot-kartalla 62→63 / 57→58
  Bosporinsalmen takia). PT vie omistajalle (PULU-MERET-2-kortti).
- **Taidemuseon kohtazoom kaikkiin saleihin:** proto sisaltokirjuri/kohtazoom-196 9d5e51692, Pelikoodari otti taidemuseo-196:een (ac7fd17f0). NL 37 teosta/147
  kohtaa, Ranska 51/119; Pelikoodarin pääsalin v1-ajat korjattu v2:ksi (peli soittaa v2-ääniä). Auto Zoom oletuksena POIS, kytkentä omistajan videon jälkeen.
- **Pulun revontulikysymys** (docs #4699 + #4700, yhden lähteen lause pudotettu, 351 merkkiä) ja **Prahan + Ateenan 8+8 historiaosiota** ovat äänisivun
  Tekstit-osastossa odottamassa omistajaa (ei ääntä). Kierrosten kerronta (avaus/pysäkit) EI lisätty, koska PT pyysi vain historiaosiot.
- Levysiivous tehty (2 worktreetä + 16 vanhaa scratchpadia, ~3,8 Gi). Omia worktreitä ei jäljellä.

## AVOINNA seuraajalle
1. **PR #4685 (web-pack, fin/swe/ukr-korjaus):** CI vihreä (reitti + testit), EI mergetä itse: Julkaisija mergeää web-PR:t junan 196 lukitushetkellä. Pidä vihreänä.
2. **Hyväksyntää odottavat omistajalta (Tekstit-osasto):** Pulun 4 ISS-kysymystä, revontulikysymys, Prahan ja Ateenan historiaosiot (PT välittää).
3. **Pääkaupunkien esittelyt (11 pääkaupunkia: Bern, Vaduz, Monaco, Bratislava, Podgorica, Tirana, Skopje, Chișinău, Belgrad, Zagreb, Minsk):** EI esittelyä eikä
   kertojan ääntä. PT tilaa vain Karttasepän 3D-mittauksen läpäisseille ja antaa listan (~1–2 h luovutuksesta); 600–720 merkkiä, 2 kappaletta, kuten
   docs/kohtaukset/kaupunkiesittelyt/<tunnus>.json (malli praha.json), faktat kahdesta lähteestä.
4. **Kreeta (aarretehtävät):** valmis mainissa (erä 6, #4553); ei sisältöjäännöstä. Pääkaupunkitekstit 93/93 kytketty (#4573), esittelyt valmiit (#4663).
5. **Reykjanes ISS070 -kuva:** NASAn Gateway-tietokanta (eol.jsc.nasa.gov photo.pl) antoi 15.–16.10. "SQL failed"; Commons/NASA-haku ei löydä kuvaa. Kun toimii:
   tunnus, EXIF, lisenssi, palkki, vienti kuten tulivuori-astro-vienti-20261015, Valosepälle ja PT:lle.
6. VAIN EUROOPPA: Euroopan ulkopuolisia kaupunkikarttoja (48 lyhyttä) ei aloiteta.

## Huomiot
- Commits ei-pushattuna: ei. Committoimaton apukopio docs/kohtaukset/iss-yotaivas/ehdotus-kuvat-20261015.json voi jäädä (ei tarvita).
- Agenttiparvissa anna jokaiselle oma tulostiedosto (kaksi agenttia ajoi aiemmin toistensa skriptejä). Faktatarkistuksessa Britannica/UNESCO antavat usein 403 → "(hakutulos)".
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto; worktree `git -C … worktree add -b sisaltokirjuri/<aihe> /Users/Shared/Claude/wt/proto-sisaltokirjuri-<aihe> <pohja>`;
  peili `git push natiivi-backup HEAD:refs/heads/peili/proto/<haara>`; museo_kohtazoom.py käyttää v2-sana-aikoja (ajat-v2).
