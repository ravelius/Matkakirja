# Julkaisijan luovutus 15.10.2026 klo 21.2x (Postivahti: kova raja 35 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Edellinen: `viesti-julkaisija-luovutus-20261015-ilta2.md`.
Asemataulu (TÄMÄ TILI): https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm. Osoitekirja /Users/Shared/Claude/osoitekirja.md.

## 0. UUDET OPIT
- **Juna 195 vasta omistajan pyynnöstä** (ennallaan). **Ei iPad-todistusajoja junaan 195** (PT / omistaja 09.36 "Ei testejä junaan").
  Roolien kehityskäännökset ja omistajalle tehtävät kuvaparit/videot (juna 196) ovat sallittuja.
- **L2-jono = lukkokilpa**, ei FIFO: `proto-kaanna.sh` odottaa lukkoa (`/tmp/matkakirja-kaannospalvelu-2.lukko`, kuka-tiedosto
  kertoo käynnissä olevan) ja ottaa **haaran kärjen vasta lukon saatuaan** → "käännä uudempi kärki" -pyynnöt hoituvat itsestään,
  jos käännös ei ole vielä alkanut. Tarkista `cat /tmp/matkakirja-kaannospalvelu-2.lukko/kuka` ja `git -C proto-3d/Matkakirja-proto log -1 <haara>`.
- **Kääreskriptit** `julkaisija-tyokalut/*.zsh` (yksi per pyyntö; kopioi lähin). Lippukaava: `linssiseppa-kuvat196c.zsh` = käännös →
  onnistuessa lippu `proto-3d/tyokalut/linssiseppa-ajot/simu-*.nyt` (Linssisepän ajo odottaa sitä). Väärän lipun esto: tapa vain
  kääre-zsh (kill -9 kääre-pid), Unity-käännös jatkuu ilman lippua. Käytetyt liput poistetaan SIMU VAPAA -viestin jälkeen.
- **vie-paketti.sh hyväksyy vain `_valmiit/*-vienti-*`** -kansiot, ja polut SHA256SUMS:ssa = ämpäripolut. Roolien paketeissa usein
  `kuvat/…` ilman etuliitettä tai LAHTEET-rivi SHA256SUMS:ssa → kokoa uusi `*-vienti-*` -kansio oikeilla poluilla (älä muokkaa alkuperäistä).
- **vie-paketti-massa.zsh ei ole suoritettava** → aja `zsh …/vie-paketti-massa.zsh`.
- **Nimitörmäys**: kaksi roolia teki "opas-pallokierros-ateena-v12" → vie vain ensimmäinen, toinen v13:ksi; PT ratkaisi (PK:n v12 voimassa).
- **Kielivahdin kiertäminen** (merkkijonon pilkkominen) hyväksytty vain ei-juna-kuvahaaraan (Linssiseppä kuvat-196); junaan oikea korjaus.
- **T7-sarjaan luotu** `natiivi-ui-iPhone16` 123B4B25-36B7-4A76-B677-905621CD8F5A (iPhone 16, 393 pt, iOS 27.0) NUI:lle.
- **Poistot**: _valmiit/pallo-lohkoton-vienti-20261015 (8,2 Gt) ei enää tarpeen (T7 + CDN ok) → jätetty PT:n siivoukselle (ei poistoja oman työtilan ulkopuolelta).

## 1. Valmista tänään illalla
- **Pallo-lohkoton MASSAVIENTI VALMIS 19.32**: 611 676/611 676 (laatat 577 839 + kerma 33 837), CDN-otos OK; KS siirsi T7:lle (19.33). KS + PT kuitattu.
- **PR #4637** (Raamattu + loki + PT:n luovutus) MERGETTY 19.01 → main 216dccf91.
- **Lontoo junaan 195**: historiakuvat 16/16; aineistot.js lontoo → **PR #4636 ac82fef2a** (merge vasta OMISTAJA PYYSI JULKAISUA);
  opas/historia-v1/lontoo.json (ilman ääntä) + **opas/historia-v2/lontoo.json äänillä** (PT 18.4x; Äänittäjän aanet/pallokierros-lontoo-v1/ 9/9).
  PK vaihtoi natiivin osoittimen (pelikoodari/lontoo-historia-195, L2 KÄÄNNETTY 8fabe9809).
- **Viety ämpäriin**: maa-ateena-v3 2/2, vesi-ateena2-index-v25 3/3, opas-pallokierros-ateena-v11 (LS) ja v12 (PK, voimassa),
  taivas/kuvat jpg 11 + png 11 + Jupiter 1, linssit/astronautin-kamera/iss-yovalot-maailma-v1 31/31, kuvat/iss/kohokohta-*.jpg 2/2.
- **L2-käännöksiä ~25** (PK ISS, mika-tama-on, lontoo, iss-kamera ×4, iss-fakta, pulu-tekstit, pulu-chat; Valoseppä revontulet ×6, tulivuoret ×2;
  Linssiseppä yötaivas/kuvat ×7; Siirtoseppä, NUI asettelut ×2 itse). Kaikki SHA:t lokissa.
- Cron NAS-bundle 04.03 luotu (session-only) → **luo uudelleen** (`CronCreate "3 4 * * *"`, ks. aloitusviesti kohta 4).

## 2. KESKEN (L2-jono 21.20; lukolla Siirtoseppä 70883ee13+1cefa0f9b, hän ajaa itse)
Käynnissä olevat kääreet kirjoittavat tulosrivin lokiin `julkaisija-tyokalut/<nimi>.log`; tarkista ja ilmoita:
- **Pelikoodari** (local_7fcab04b…): `pelikoodari-enTunne195.log` (mika-en-tunne-195 f82aa303a, vain KÄÄNNETTY-rivi, hän vie NS:lle junaan 195);
  `pelikoodari-isspulu196.log` (iss-pulu-vastaukset-196 30e07d6f1 → app _tyo/pelikoodari/iss-pulu-vastaukset-196-app);
  `pelikoodari-isskamera195e.log` (iss-kamera-195 6d11ccf6f sRGB → asennus 39644E75 → **SIMU NYT 39644E75**, etsinvideo ~6 min).
- **Valoseppä** (local_c238f4af…): `valoseppa-tulivuoret196c.log` (tulivuoret-196 ⊇ 8f202fc4c → _tyo/linssiseppa2/tulivuoret/app) → **SIMU NYT A26BC7D0 ~6 min (k4)**.
- **Linssiseppä** (local_771b401b…): `linssiseppa-kuvat196c-k.log` (kuvat-196c da1aadc88, Yokuori.shader muuttui) → lippu simu-kuvat196c.nyt
  luodaan automaattisesti (SIMU 00CF62C2 ~6 min); VIKA → virherivi Linssisepälle. Poista lippu SIMU VAPAA:n jälkeen.
- **Siirtoseppä** (local_86d0c984…): kääntää itse → "käännös valmis" → **SIMU NYT 8362879F ~11 min**.
- **NUI** (local_44392b3c…): KÄÄNNÖS NYT annettu aloitus-195 2cd6b6428 (ajaa itse) → "käännös valmis" → **SIMULAATTORI NYT F7513985 ~10 min**;
  sen jälkeen nimet-196 0e26d1dee (ajaa itse) → **SIMULAATTORI NYT 123B4B25** (iPhone 16).
- **PR #4636** bf177452f + ac82fef2a: junaan 195, merge vasta OMISTAJA PYYSI JULKAISUA.

### 2b. Koko jono järjestyksessä (PT 21.2x – mikään ei saa pudota)
1. SS 70883ee13+1cefa0f9b (auringonnousu, Lappi v6, Pariisi) – L2 käynnissä 21.14 → SIMU 8362879F ~11 min.
2. PK mika-en-tunne-195 f82aa303a (vain KÄÄNNETTY) ja PK iss-pulu-vastaukset-196 30e07d6f1 (app-kopio).
3. NUI isoisän uni aloitus-195 2cd6b6428 (NUI ajaa) → SIMU F7513985 ~10 min (video äänineen omistajan päätökseen).
4. NUI nimet-196 0e26d1dee (NUI ajaa uni-käännöksen jälkeen) → SIMU 123B4B25 iPhone 16, 393 pt (omistajan 21.03 reunavika + "/c").
5. Valoseppä tulivuoret-196 ⊇ 8f202fc4c → SIMU A26BC7D0 ~6 min (k4).
6. LS1 kuvat-196c da1aadc88 (⊇ ce4492460 Black Marble -korjaus) → lippu simu-kuvat196c.nyt → SIMU 00CF62C2 ~6 min.
7. PK etsinvideo 2: iss-kamera-195 6d11ccf6f (sRGB) → asennus 39644E75 → SIMU 39644E75 ~6 min.
L2 on lukkokilpa: todellinen järjestys voi poiketa; tarkista kunkin lokit ja anna simuvuorot sitä mukaa.

**Juna 195 c84f140ef odottaa yhä "OMISTAJA PYYSI JULKAISUA"** (ei lukitusta, käännöstä, TF:ää eikä #4636-mergeä ennen sitä).

## 3. Linjat nyt
L1 vapaa. L2: jono yllä. Simut: kaikki vapaina 21.20 (A26BC7D0, 00CF62C2, 39644E75, 8362879F, F7513985, 123B4B25).
Levy ~62 Gi (raja 50 → pysäytä viennit ja ilmoita PT:lle).
