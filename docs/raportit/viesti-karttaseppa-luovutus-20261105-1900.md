# Karttaseppä: luovutus 5.11.2026 klo 19.00 (KS)
Syy: konteksti 27 % (7.37), tauko KK:n, Tripon ja Codexin odotuksessa. **Lue tämä, sitten -1845 (haara karttaseppa/luovutus-20261105-1845; sen Opéra-, Tripo- ja Tuileries-kohdat), sitten -1834:n Riemukaari.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 3505c7556. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (käsitelty-kohta tilassa).
2. Tarkista viestit: **KK:n sana Opéran syötteestä** ja **omistajan sana Sacré-Cœurista**. Molemmat lähetetty 18.5x.

## Omistajan päätös 18.52 (KK, kortit, arkit nähty)
Opéra ja Panthéon kelpaavat, Montparnasse uusi otto. Pohjat: pohja-siisti, Codexin puisto ei käytössä. Montparnassen viereen jää kartan rakennuksia (asema, lähin noin 6 m): kerrottu, ei kommenttia, jää toistaiseksi. **Kustakin mallista kuva pelistä KK:lle, kun malli on kartalla.**

## Tehty tässä vuorossa
- **Montparnasse:** TILAUS-24h, posti 6b21559cc. Odotetaan `_review-sarja-24/montparnasse-otto2/`. Kun tulee: täysikoossa, oikeaa kuvaa vasten, arkki KK:lle (`tee-arkit.py`, lisää kohde). Tripo vasta omistajan sanan jälkeen.
- **Panthéon:** TILAUS-24i, posti d24a07705. Syöte `pantheon/tripo-syote/`, Front lansi, Back ita, Left etela, Right pohjoinen. Odotetaan `pantheon-3d-v1/` (jonossa 24f:n ja 24g:n jälkeen). Asennuksessa Suunta 18,4 on pitkän sivun normaali; portiikki osoittaa noin 288°:een.
- **PR 6301:** mainissa (d3a7aa17e), worktree poissa.

## Opéra: odottaa KK:n sanaa, tilaus kirjoittamatta (24j)
Syöte `opera/tripo-syote/` (`tee-syotteet.py opera`), KK:lla lupauksen mukaan ennen Tripoa. Sivukupolien tornit jatkettu maahan etela.png:ssä, katsottu täysikoossa. Rajaus `sarja24-opera-pantheon-montparnasse/opera/tornit-jatkettu-rajaus.png`.
**Kun KK antaa sanan:** kirjoita TILAUS-24j TILAUS-24i:n pohjalta ja postita (malli `posti.py`:n tapaan: detached origin/claude/postilaatikko, commit polulla, push HEAD:claude/postilaatikko; lisää tilaus SHA256SUMS:iin).
- Front `etela.png`, Back `pohjoinen.png`, Left `lansi-peilattu.png` (itäpaikka: ita.png:ssä väärä päätykolmio), Right `lansi.png`. Tarkista, että Tripo hyväksyy peilikuvan, kuten Riemukaaressa.
- Left/Right-sääntö: Left on kohteen oma vasen, joten Left-kuvassa Front-pää on kuvan vasemmassa reunassa. Vahvistettu Grand Palais'n päätöksestä 969b2d6f4. Raakamallista tarkistus heti.
- Suhteet kuvista: pitkä 1,00; lyhyt 0,678; mitat `mitat.json`. Pelikoko 222 × 151 m, Suunta 74,1 (pitkän sivun normaali, etuosa noin 164°). Kerrottu omistajalle: etelän kupoli ja näyttämötorni 15–20 % liian korkealla (etelän korkeus 635, pohjoisen 564), sivukupolit hieman pohjoisessa: **ei korjata ennen mallia**, katsotaan valmiista.
- Maapohja `sarja24-opera-pantheon-montparnasse/opera/pohja-siisti.png` omalla alfallaan.

## Sacré-Cœur (#2098): arkki KK:lla, suositus otto 2, odottaa omistajan sanaa
Arkki `sarja24-opera-pantheon-montparnasse/sacre-coeur/arkki-omistajalle.jpg`, kartalla.png, pohja-siisti.png. Lähdekuvat `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/sarja24-sacre-coeur-2098-20261105/source/photos/`.
**Jos otto 2 (24k, 24e:n mallilla):**
- Kupolit suippoja ja kapeita (ei pyöreitä), lyhdyt hoikkia, tornin huippu suippo, kuten `ilmakuva-2015.jpg`:ssä (rajaus x 610–1230, y 610–1100, lounaasta).
- Väri lähes valkoinen kivi, ei persikkaa.
- Kellotorni kirkon akselilla pohjoispäässä kaikissa kuvissa: `ilmakuva.jpg` vahvistaa. Sivukuvat ovat oikein, viistot ja yläkuva väärin, ja pohjoiskuvassa torni 13 % matala.
- Rummun lista samalle korkeudelle joka sivulla (nyt 372–478 px).
- Itäkuvassa etujulkisivu reunalta, ei avattuna sivun tasoon; kuten lansi.png.
- Suhteet: pelin jalanjälki 420 × 200 pysyy. Leveyssuhteet sopivat siihen, vaikka tilauksen 96 × 50 × 83 antaa 25 % matalamman; Codex ei saanut 96 × 50:lle lähdettä. Kerroin KK:lle, etten muuttaisi suhteita.
- Ei uutta maapohjaa: Codexin puistorengas on keksitty, oikea puisto on vain etelässä kirkon alle jäävällä alueella.
**Jos omistaja sanoo kelpaa:** Right = lansi peilattuna, viistot ja yläkuva pois syötteestä, pohjoiskuvan torni korjattava.

## Odotetaan ja muu auki
Tripo: Grand Palais 24f käynnissä, Riemukaari 24g, Panthéon 24i. Kuva pelistä KK:lle jokaisesta. Codex: Invalidien otto 2 (24e), Montparnasse 24h. Tuileries'n leike NUI:lla (-1845). Pieni iPad JU:lla. ND:n tornit: ei tehdä. Eiffelin kyltin napautus testaamatta, ND:n ja Louvren pohjat eivät häivy usvaan, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen. Hook toistaa työlistan rivejä (Pariisin kartta, kallistus, 3D-kohteet): en muuttanut niitä, koska en tiedä, ovatko ne minun; kirjaa PT kuittaa.

## Opit
- Väriä näytteistäessä katso, ettei ruutu osu taustaan: ensimmäinen näyte oli harmaata taustaa ja torneista tuli sinertäviä. Katso aina täysikoossa.
- Oikea kuva lännestä tai lounaasta kertoo kupolien muodon, jota etelän alakuva ei kerro. Vertaa useampaan oikeaan kuvaan (Codexin `source/photos/`).
