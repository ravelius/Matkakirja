# Linnanrakentajan luovutus 16.10.2026 klo 23.4x (Linnanrakentaja, Opus) – Postivahdin kova raja 38 %

Edellinen: `viesti-linnanrakentaja-luovutus-20261016-ilta.md`. Viestit AINA id:llä (`/Users/Shared/Claude/osoitekirja.md`): PT local_5df52e10…,
Valoseppä local_c238f4af…, Julkaisija local_5cb16c00…, NS local_674b9ec4…, Postivahti local_a24c43c0…. PT:lle ≤ 3 riviä, ABSOLUUTTISET polut.
Levy oli 0–3 Gi (Postivahti 23.4x): ei Blender-ajoja ennen kuin levyä on taas.

## 1. SEURAAVAKSI
1. **Oma pyramidi (omistaja 23.28 "Tehdään oma pyramidi", Raamattu #4738; EI junaan 197):** k59 tehty (`_valmiit/louvre-v1/lahde/
   louvre_pyramidi.py`, `OMA_PYRAMIDI = True` louvre.py:ssä; luuppi-vienti md5 aa4b469b/169b549f/cbace6e9, **leikkaus muuttui** – aukko pois).
   - **Codex-tilaus** (omistaja 23.35, raja 10): claude/postilaatikko **a1ac41f9e**, `posti/linnanrakentaja-codex-louvre-pyramidi-20261016.md`,
     9 kuvaa K1–K7 + L1 + L3 (L2:sta pyramidi ei näy). Kun vastaus tulee (`posti/louvre-pyramidi-20261016-vastaus/`): pyramidimaskin IoU
     ≥ 90 % (K2/K3 ≥ 80 %) omia maskeja vastaan `tavoite/pyramidi-tilaus/k59/<K>-pyramidi-maski.png`, rakennusmaski ≥ 95 % → kopioi
     `tavoite/codex-pyramidi/` → PT hyväksyy → luuppi kierros kerrallaan (kierros.py `--tavoite codex-pyramidi`, K-kulmat natiivina:
     `--kulmat pyramidi-tilaus/louvre-kulmat-natiivi.json`; tarkista kierros.py:n --koko-tuki ensin).
   - **Valoseppä k59s** (160°: L1b + L3 + pyramidin lähikulma ~60 m, päivä + yö) pysäytetty levyhädän takia; tulee
     `_tyo/linssiseppa2/louvre1/lahi-L1-L3/k59s/arkki.jpg` + `pari-pyramidi.jpg` → mittaa ja yksi rivi PT:lle (absoluuttinen polku).
     Jos lasi/vesi/hehku vaatii varjostinmuutoksen, Valoseppä tekee oman haaran.
2. **k58-havainto (Valoseppä 23.4x):** L2-etäisyydeltä karyatidit/päätykolmio eivät erotu k57:stä ja soran laikut tuskin näkyvät
   (Codexissa sora tasaisen rakeinen) → seuraavaksi joko laikut voimakkaammiksi tai lähempi kulma (kysy PT:ltä, kumpi).
3. **L3:n jalusta** tummanruskea (k56-albedo osui siihen) vs Codexin vaalea kalkkikivi → oma vaalea materiaali; L3-laatoitus keltaisempi
   kuin Codex (VERTAILU.md, k57s-havainto).
4. **Raketin valaisinpäät** odottavat Valosepän uutta haaraa seuraavaan junaan (ei 197; Valoseppä lähettää haaran + SHA).

## 2. TEHTY 20.0x–23.4x (kirjanpito `_valmiit/louvre-v1/VERTAILU.md`, kierrokset k53–k59)
- **Juna 197: Louvre k57** (KK omistajan puolesta 23.15) → `_valmiit/louvre-v1/glb` (k53 → `glb-k53/`, k48 → `glb-k48/`), INTEGRAATIO-k57.md,
  paketti **v6k22** (`_valmiit/omat-mallit-vienti-20261016-v6k22`, oma `rakenna-v6k22.py` Valosepän syvyys/glb-k57:stä, portti 0 virhettä)
  → Julkaisija vei 23.18, lukituslistassa uusin-4 → v6k22. Louvren aurinko 160° on natiivissa (juna-197 64fb0adff, Valoseppä).
  Aiemmin illalla k53 → v6k21 (Valosepän paketti, omistaja 20.44).
- k53 keskipaviljonkien AO (`AO_KEVENNYS`), k54 Horloge (kello, karyatidit, päätykolmio, syvennyspatsaat, sora/maa), k55 ¾-pylväät + listat
  + reliefit + `kello`-materiaali, k56 kivi ×0,65 (aurinko 135°), k57 kullanruskea (B −12 %), atsimuuttikoe → **160°** (PT kuittasi),
  k58 soran laikut + `karyatidi()` + palkkihahmot päätykolmioon, k59 oma pyramidi.

## Opit
- Aurinko ja albedo ovat kytköksissä: valotus korjataan VAIN yhdessä paikassa (PT 21.5x: albedolla), muuten tummuu kahdesti.
- Kun luuppi-vienti päivitetään kesken kuvauksen, Valoseppä voi kuvata vanhaa: kerro md5 joka viestissä ja tarkista se vastauksesta.
- Codex-tavoitteet ilman pyramidia → k59:n IoU putosi 96 → 87 % ilman mallivirhettä; tavoite vaihtuu pyramidikuviin.
- PT ei näe lyhennettyjä polkuja (proto-3d/…): anna aina absoluuttinen polku.
