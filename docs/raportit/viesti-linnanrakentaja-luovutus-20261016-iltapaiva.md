# Linnanrakentajan luovutus 16.10.2026 klo 13.3x (Linnanrakentaja, Opus) – Postivahdin kova raja 36 %

Edellinen: `viesti-linnanrakentaja-luovutus-20261016-aamu.md`. Viestit AINA id:llä (`/Users/Shared/Claude/osoitekirja.md`): PT local_5df52e10…,
Valoseppä local_c238f4af…, Pelikoodari local_7fcab04b…, Julkaisija local_5cb16c00…, Postivahti local_a24c43c0…. PT:lle ≤ 3 riviä.

## 1. SEURAAVAKSI (PT 13.2x: raketti ensin, Louvre sen jälkeen)
1. **Raketin alusta yöllä (juna 196, Valosepän luuppi):** alusta v4 on jo luupissa (`linssiseppa2/iss-luuppi-196` sis. d78d313ea; luupin kärki
   1648a2231 = yöilme k6). Odota Valosepän kierrospyyntöjä. Tekemättä työnjaosta: **valaisinpäät kirkkaiksi** (RakettiLinssi.shader:
   valkoiset linssit nyt `_Vari.a × 3`; ehdotus × 5 ja/tai linssi 0,5 × 0,36 → 0,7 × 0,5 m alusta.py:ssä). Tee uusi haara Valosepän
   pyynnöstä SUORAAN luupin kärjestä (`linnanrakentaja/…` 1648a2231:n päältä), säilytä sen RakettiRunko-yöilme (alustan valosäde 55 m,
   kiilto 65 m, ranta × 0,45). Lentoestevalojen paikat: `_valmiit/iss-raketti-alusta-v4/glb-erillinen/valot-ja-vesi.json` `lentoestevalot`
   (mastojen huiput 96,15 ja 101,4 m = Valosepän RakettiYovalot-taulukon 101 m; välitasot 32/64 m; tornin kulmat 81,7 m + antenni 87,4 m
   + kulmat 43 m). Kerro Valosepälle, jos se haluaa myös välitasot meren heijastuksiin.
2. **Louvre L1–L3 (juna 197, omistajan lupa 12.17 "tasan 3 kuvaa"):** Codex-tilaus lähetetty `claude/postilaatikko` b83242614
   (`posti/louvre-lahikulmat-codex-tilaus.md`). **Pelikuvat puuttuvat**: Valoseppä lupasi ne ~13.45 → `_tyo/linssiseppa2/louvre1/lahi-L1-L3/
   {google,k36s}/L1–L3.jpg`; kopioi postiin nimillä `louvre-L<n>-peli-google.jpg` / `-peli-k36s.jpg` ja pushaa (worktree
   `/Users/Shared/Claude/wt/linnanrakentaja-posti-lahi`, detached; `git fetch origin claude/postilaatikko`, `git push origin HEAD:claude/postilaatikko`).
   Kun Codex palauttaa (`posti/louvre-lahikuvat-L1-L3/`): maskien IoU ≥ 95 % (`tavoite/iou.py`), PT hyväksyy kuvat, sitten luuppi kohti
   L1–L3 kuten K1–K7 (kamerat `_tyo/linnanrakentaja/louvre/tavoite/louvre-lahikulmat.json`, LiDAR `lahi/paketti`, k36 `lahi/k36`,
   `kuvaa_louvre.py … --kulmat louvre-lahikulmat.json --koko 1536x1024`). Kierrokset jatkavat k37:stä, kirjanpito VERTAILU.md.

## 2. TEHTY TÄNÄÄN (13.3x asti)
- **Louvre k36** (eteläinen pikkupyramidi 7,0 m) → omistaja hyväksyi 07.55 → Valoseppä paketoi **v6k20 = v6k19 + louvre** junaan 197,
  osoitin uusin-4 → v6k20 VASTA junan 197 lukituksessa (`_valmiit/louvre-v1/INTEGRAATIO-k36.md`). Ei natiivi-PR:ää (dataohjattu).
- **Raketin alusta** `linnanrakentaja/raketti-alusta-196` (natiivi-backup): 37cd85cdc laatat + saumat, noki, märkä kiilto, keilat maahan
  (RakettiRunko ALUSTA), a620d4959 valaan kehä + testi, 7b99eafbd merge juna-196, d78d313ea alusta v4 (puna-valkoiset mastot, 41
  lentoestevaloa, RakettiLinssi punainen). Linssit 1912/1912, unity 0. **Varjostimia ei ole käännetty editorissa.**
- **Kori v2** (omistaja 10.02, Codex havainne-kori-k1): paksu nahkapehmuste Ø 11 cm, paneelit 11,5 cm, ompeleet; R2
  `kartta/ilmapallo/v2/kori_nakyma.glb` (Julkaisija, sha e00d2249); Pelikoodari vaihtaa MalliOsoitteen kori-koydet-197:ssä (KoysiSidonta).
  Mitat: Rc 0,985, R 0,055, y 1,070, pivotit (±0,563; 1,082; −0,901). Lähde `_valmiit/ilmapallo-v2/kori/lahde/kori.py` (+ vertaa.py).
- Codex-posti-worktree `wt/linnanrakentaja-posti` poistettu gitistä (tyhjä kansio + .DS_Store jäi, harmiton). Levykierros 0 Gi.

## Opit
- Ennen uutta haaraa toisen roolin luuppiin: tarkista `git branch --contains <sha>` – Valoseppä oli jo mergennyt d78d313ea:n.
- PT:n "seuraava kulma" voi olla vanhaa tietoa: k = kierros, ei kulma; tarkista loki ennen työtä ja kysy lyhyesti.
- Blender-yökuva: pistevalot lamppukotelon sisällä eivät valaise (siirrä 2 m eteen); hehku ei saa valaista kohtausta (visible_diffuse off).
