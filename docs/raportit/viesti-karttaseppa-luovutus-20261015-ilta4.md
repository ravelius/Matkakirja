# Karttasepän luovutus 15.10.2026 klo 21.1x (Postivahti: KOVA RAJA 38 %; PT ja Postivahti)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261015-ilta3.md` (ac1de1d8b).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261015-ilta4.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. Jatka kohdasta 1.

## 1. AVOIN: web PR #4657 (aloituskartan 5 pienoismallia) → mergeä vihreänä (PT:n lupa)

https://github.com/ravelius/Matkakirja/pull/4657, haara `karttaseppa/vihjekuvat` (5d87d447a), worktree `/Users/Shared/Claude/wt/karttaseppa-vihjekuvat`.
Testit klo 21.16 vielä käynnissä (reitti pass). Tarkista `gh pr checks 4657`; vihreänä `gh pr merge 4657 --squash`, sitten
`git worktree remove /Users/Shared/Claude/wt/karttaseppa-vihjekuvat` ja rivi PT:lle (kuittaus junaan 196). Ei versionostoa (web ei käytä kuvia).
Paikallinen ajo: miniatyyrit, miniatyyrit-leikkaus, nahtavyydet, sw, vienti 51/0 (`tools/mittaa-miniatyyrit.mjs` tarvitsee sharpin:
linkitä tilapäisesti `ln -s /Users/Shared/Claude/Matkakirja-fable/node_modules <wt>/node_modules`, poista `unlink`illä ennen committia).

## 2. Tämän vuoron valmiit (kaikki kuitattu PT:lle)

| Erä | Toimitus |
|---|---|
| Hefaistos → Akropolis 53,5 s | EI maasto eikä reittikorkeus: kuvan 162° kääntö (Hefaistos katse 103 → Propylaia 235, KaantoPidennys), kesto hyppii epätasaisesti → LS1:n lentosääntö. `_tyo/karttaseppa/hefaistos-lento-20261015/LUEMINUT.md` |
| Karttapaletti kartan 3D-kohteille (omistaja 18.31) | natiivi bfe4e843b (runko 195 e27458d04): pallo, ISS-raketti, Olavinlinnan torni, Rijksmuseum; web tyylikirja `karttapaletti` PR #4639 MERGETTY e50b690d8. `_tyo/karttaseppa/karttapaletti-20261015/` (karttapaletti.py vaihtaa vain glb:n palettikuvan). HUOM: natiivin tyylikirjakopio on webiä edellä (gallerian leveät arvot) → Natiivi-UI:n synkka, en generoinut |
| Pallon lohkoton vienti T7:lle | 611 683/611 683 (vain 3 .DS_Store lisää), Julkaisija vei 19.32, ruudukko bfe2b2300 NS:n runkoon 195. Sisäisen levyn kopio `/Users/Shared/Claude/proto-3d/_valmiit/pallo-lohkoton-vienti-20261015` (8,2 Gt) PT:n siivoukselle (ei omaa työtilaa) |
| Aloituskartan vihjeet (omistaja 19.04 "Kyllä, kaikki 9"; rivit 20.24) | suunnitelma `_tyo/karttaseppa/aloituskartta-vihjeet-20261015/SUUNNITELMA-luonnos.md`; data natiivi karttaseppa/aloitusvihjeet-195 64207c0f9 → 57db72c6d (rivit) → a93815c2a (5 PNG 1000×500), kaikki NUI:n natiivi-ui/aloitus-195:ssä (8027364e0, LAHDE e51b351d5); kytkin `kaytossa` false. Codex tilaus 4 lisäys 3 valmis (posti #306 + #314, kuittaus d04bf0dbd). EHTO: ei Aarnia eikä luetteloa |
| ISS-ilmiöiden paras hetki (omistaja 20.05/20.07) | 9 hetkeä Siirtosepän haarassa siirtoseppa/iss-ilmiot-196 (b5b043b8d; oma 5ec4e8403 ei tarvitse mergeä). Valosepän tulivuoriajat (Tulivuoret.cs 477c2c8e4) hyväksytty yhdeksi totuudeksi → pyydetty Siirtoseppää päivittämään + Florencen ARVIO-merkintä lahde-kenttään (kuittaus ei vielä tullut: tarkista `git show siirtoseppa/iss-ilmiot-196:Assets/Matkakirja/Linssit/Resources/IssParasHetki/ilmiot.json`) |
| Euroopan albedotaulukko OSM-alaluokista | `_tyo/karttaseppa/vertailu/euroopan-albedo-luokat.md/.json` (25 luokkaa, 6 kohdetta, suositus IGN 0,2 m -mediaani, < 300 m² = EPÄVARMA), työkalu `tyokalu/euroopan-albedo.py`, selitys LUEMINUT.md lopussa; LR:lle ilmoitettu |

## 3. Worktreet

Jäljellä vain `wt/karttaseppa-vihjekuvat` (PR #4657). Natiivin worktreet poistettu (haarat natiivi-backupissa).

## Muistiinpanot

- Gateway to Astronaut Photography (eol.jsc.nasa.gov) palautti 15.10. "SQL failed"; ajat Commonsin EXIFistä ja NASA EO:sta.
- Koneella ei ole shapelyä/scipyä missään venvissä (luokat.py:n vanha venv hävisi scratchpadin mukana); euroopan-albedo.py toimii ilman.
- zsh: `git show "${B}:polku"` (ei `$B:polku`), globit `git add -- 'polku/*'` kun cwd ei ole worktree.
