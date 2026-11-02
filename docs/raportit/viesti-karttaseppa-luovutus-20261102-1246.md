# Karttaseppä: luovutus 2.11.2026 klo 12.46 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-1011.md (käsitelty; PR 5967). Syy: kontekstivahti 26 %.
C = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`, V = `/Users/Shared/Claude/proto-3d/_valmiit/`.
Koko kulku: `C/lahitaso-20261101/MUISTIO.md` (merkinnät 12.4x ja 13.xx).

## TEHTY (12.27–12.46)
1. Tähtipaketti oli valmis jo 10.49 (`V/pariisi-tahdet-20261102/`, Codex kuitattu 2f6b37032) → ei toimia.
2. **Temple-haamu** (KK:n löydös): syy = Codexin G-pala r1c2 piirsi taloryhmän itse läpikuultavana + G–r06c11-kulman σ 20.
   `C/haamu-20261102/` (korjaa.py, haamu-gc.py, liitos-dump2.py) → koottu-69h → `V/pariisi-tasot-haamu-20261102-vienti-20261102`
   (TasoVersio haamu-20261102). PT kuittasi. JU:lle pyydetty vienti, sitten täsmennetty: korvautuu haamu2:lla.
3. **Haamuhaku kaikkiin saumoihin (PT:n erä):** `C/haamu-20261102/rengas2-3/`: kokoa-h1…h4.sh tallentavat jokaisen palan
   pohjan, palan ja maskin (dumpit scratchpadissa, eivät tarpeen uudelleen), haku.py (huiput-r1r2/r3r4.jpg) → haamuja kaikissa
   renkaissa → korjaa.py kaikki 61 palaa σ 4 samaan min-cut-leikkaukseen, veneet/aukio suojattu → koottu-70h → putki-70h.sh →
   kokoelma/G-tasot-70h-hill (26/54) → **`V/pariisi-tasot-haamu2-20261102-vienti-20261102`** (TasoVersio "haamu2-20261102",
   KORVAA haamu-20261102:n, kuiva-ajo ok). Parit PT:lle `rengas2-3/pari-huiput-0…3.jpg` (12.4x).

## AVOIN (järjestyksessä)
1. **PT:n kuittaus haamu2:sta** → JU vie haamu2 (JU:lle kerrottu: vasta PT:n kuittauksen jälkeen) → NUI vaihtaa TasoVersion
   "haamu2-20261102" (PT välittää; aiemmin pyydetty haamu-20261102 / aukio-20261102 korvautuvat).
2. Jäännökset (palojen omassa piirroksessa läpikuultavuus, kuten G r1c2): r06c09 3585,2787; r05c10 5066,1500 ja 4897,2215
   (koosteen px). Korjaus tarvittaessa haamu-gc.py:llä (ROI + ydin palalle, jolla puhdas piirros) → korjaa.py-ajoon
   (`rengas2-3/aja-korjaa.sh`, dumpit pitää ajaa uudelleen kokoa-h*.sh:lla, jos scratchpad on tyhjennetty) → uusi TasoVersio.
3. Postilaatikon worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko-veneet`: tähti valmis → voi poistaa
   `tools/uusi-worktree.sh … --poista` -tavalla, kun PT vahvistaa, ettei Codex-postia enää odoteta.
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; I monistus vasta kun Pariisi valmis; 7.48: muita Pariisin osia ei aloiteta
   ennen KK:n suunnitelmaa ja PT:n viestiä.
