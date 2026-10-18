# Karttasepän luovutus 18.10.2026 klo 06.0x (Postivahti: kova raja 38 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. Viestit AINA send_message id:llä `/Users/Shared/Claude/osoitekirja.md`:stä
(TILINVAIHTO 18.10.: kaikki id:t uusia), PT:lle ≤ 3 riviä. Käännökset ja simut VAIN Julkaisijan jonon kautta
(KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). Ruudut täysikokoisina ennen PT:tä. Edellinen: `-20261018-yo.md` (koko yön historia).
Työpuu: proto-wt `/Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198` haara **karttaseppa/kiina-paketti-200**
(peili `git push natiivi-backup karttaseppa/kiina-paketti-200:peili/proto/karttaseppa/kiina-paketti-200`). Skriptit `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-koko-linssi/`.

## Tila

- **Kiina v9 (cd7b1daa4) HYVÄKSYTTY junaan 201** (KK omistajan puolesta, PT 04.3x). Taistelukummut: rinnevalo suhteessa tasaiseen maahan,
  heittovarjo, normaali käännetty ylös, kumpujen väri LINEAARISENA (projekti linear color space: verteksiväri luetaan lineaarisena → sRGB-väri haalistui).
- **v10 = 5c59703d0** (PT:n 3 löydöstä v9-pätkästä): taistelunimi kumpujen päälle (IsoisaKerros.NimiJono), valopisteen nimi hehkun alle,
  siirtymä selkeässä (katoava häipyy kokonaisena lopussa, jono 2997, _Pehmea 0,05, märkä reuna pois), yläpalkki kohdepysäkin mukaan
  siirtymän alussa (KiinaKerros.OtsikkoKasittelija → AikajanaNakyma.KiinanOtsikko; NUI:lle kerrottu). Kiina-testit 48/48, tarkista.sh 0.
- **NS:lle annettu junaan 201:** kiina-paketti-200 @ 5c59703d0 + Nuuk 37f37a530 (karttaseppa/reykjavik-202 ⊇ Reykjavík 571fe9877; S2-indeksi v2h
  viety ämpäriin 01.52 ja tarkistettu). NS:lle sanottu: EI vielä 8effba503.
- **8effba503** (⊇ v10): KiinaKerros.TaisteluKummut oletuksena päällä → kummut kaikilla 5 taistelupysäkillä (−221 Changping, 250, 440 Fei-joki,
  1280 Yamen, 1644 Shanhai). QA `linssi kiina korkeus <vuosi>|kaikki|pois`.

## LISÄYS 06.0x (ennen nollausta)

- v10 ajettu 05.49 (todistus-kiina-taistelu-250-v10-20261018-0548, SIMU VAPAA kuitattu 05.54). Video alkoi 36 s myöhässä (jäätyminen):
  taistelu ~55–58 s, Chengdu-hehku ~61–69 s, siirtymä 250→440 ~71–72 s. Kuvaparit `…/kuvaparit/pari-v9-*-v10-*.png` → PT 06.0x.
- TULOS: siirtymä korjautui. Taistelunimi "208" ja Taolaisuus-nimi yhä osin kummun/hehkun alla → SEURAAJA: nimi ylemmäs kummun yli
  (Lat −1,4 → pohjoispuolelle tai korkeus kummun huipun yli) ja valopisteen nimi kauemmas / HehkuSade 0,95 → 0,6; uusi pari PT:lle.
  Kohta 1 alla on siis TEHTY (paitsi tämä jatko); kohta 2 (kaikki taistelut 8effba503) ennallaan, JU:n L1-jonossa PK:n jälkeen.

## ENSIN (seuraaja)

1. **v10 kuvaparit:** JU kääntää 5c59703d0 → `_tyo/karttaseppa/kiina-taistelu-250-v10-app` (L1 05.37–). SIMU NYT → aja SUORAAN
   `zsh …/kiina-koko-linssi/ajo-taistelu-250-v10.zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-taistelu-250-v10-app > …/ajo-taistelu-250-v10.out`
   taustalle (ÄLÄ odota-skriptiä: se vaatii koko sarjan tyhjäksi; iPhonet ovat muiden). Valmis → SIMU VAPAA JU:lle → `yhdista-video.zsh <todistus>` →
   kuvaparit v9|v10 koko videon kohdista 22,5 s (nimi), 30 s (hehku), 37,5 s (siirtymä 250→440). v9-video:
   `proto-3d/lokit/todistus-kiina-taistelu-250-v9-20261018-0240/kiina-koko-omistajalle.mp4`. Kuvat täysikokoisina → PT 3 riviä. EI videota.
2. **Kaikki taistelut:** KÄÄNNÖSPYYNTÖ 2 (8effba503 → `_tyo/karttaseppa/kiina-taistelut-kaikki-app`) JU:lla v10:n jälkeen. SIMU NYT (yksin, ~8 min) →
   `ajo-taistelut-kaikki.zsh` (skenaario sk-taistelut-kaikki.txt, kuva 30 s välein) → SIMU VAPAA → video → etsi jokainen taistelu (vuosi yläpalkista),
   tarkista: kummut näkyvät, eri värit, erillään, ei mustaa; Yamen (4 armeijaa, merellä?) ja Fei-joki (3) erityisesti → kuvapari/ruudut PT:lle →
   hyväksynnän jälkeen 8effba503 NS:lle junaan.
3. Avoimet ennallaan: main-data (ITÄTURKIT 589 44,3 N; NURGAN 1421 45,5/129,5; ETELÄINEN TANG 950 kahdelle riville; nykyinen-kiina.json nimiö;
   kiina-puherivit.json → main `data/linssit/kiinan-dynastiat/`).

## Opit

- Simu kuormassa (3 simua) jäätyi 31 s ja taistelupysäkki ohittui → pyydä aina simu YKSIN.
- Kiinan väestöpinnan verkon normaalit osoittavat alas (kolmiot a, etelä, itä); varjostin kääntää taistelutilassa.
- Paikallinen `.claude/settings.local.json` muutettu (ei omani, ei commitoida).
