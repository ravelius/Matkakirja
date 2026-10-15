# Valoseppä – luovutus 15.10.2026 päivä (11.5x, tilinvaihto)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261015-aamu.md – sen jono on tehty (alla).
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_74630a27 (≤ 3 riviä + polut), NS local_bf20055b,
Julkaisija local_22b29f10, KS local_37708e68, Postivahti local_e6d70b5a. PT:n kuittaamat erät → NS:lle. Simuvuorot Julkaisijalta.
SEURAAVA JUNA ON 193 (PT 15.10.: -194-merkityt haarat kootaan 193:een).

## Valmista tänään – kaikki junan 193 rungossa (NS db5abdf0e, testit 1843/586/492, tarkista 0)
- vesi-varadata-194 6406b2f9d (Tower Bridgen kummut pois varadatalla).
- kuu-tele-194 708b1ae60: KUUN TELE-KUVA (PT kuittasi): TELE + Kuu Cupolan ikkunassa (ruudulla 4 %:n reunavaralla) → kuva Kuusta
  KuunKuva.Kentta 2,9° ≈ 475 mm (Kuu ~18 %), NASA SVS LROC -pinta (Resources/Kuu/kuu-lroc-1k.jpg, LAHTEET.md), maanvalo 0,002 kuvassa,
  ei Kehita-kontrastia; juliste "Kasvava sirppi 21 % · 403 094 km" (Kuu.VaiheNimi), tekninen rivi Kuun valotuksella (f/8 · 1/250 s · ISO 100).
  PalloKierto.KallistusKattoKuvauksessa (oletus 85; Kuu-kuva 179 → kamera horisontin yläpuolelle). A/B `astro kyyti kuvaa kuu 0|1`.
  Samassa: lähestymislokin kamera-askel logiikan kellosta (lyhyen lennon "20 %" oli mittarin harha, video jatkuva) ja Cupolan nimet
  pois kuvausputken ajaksi. Kuvat + LUEMINUT: proto-3d/lokit/valoseppa-kuutele-20261015/.
- vesi-v24-194 5e699a463: vesi index-v24 (KS:n praha5: Kaarlensillan pohjoispuolen "tumma seinä" = Googlen jokipinta oman veden yllä →
  aluenosto Kaarlensilta → Mánes +1,5 m; ämpäri tarkistettu, SHA sama) + YÖVESI: VesiPinta yöllä (_IlmMaailma.z) heijastus × 0,18 ilman
  hämärävalotusta ja ilman sinistä hetkeä; omat satunnaiset juovat pois (rantaetäisyys interpoloituu leveiden kolmioiden yli);
  KaupunkiYovalot v6:n vesijuovat 40 m pitkiksi ja kapeiksi. Viimeinen commit EI simussa (PT: omistaja arvioi TF:ssä).
  Kuvat: proto-3d/lokit/valoseppa-praha-yovesi-20261015/ (fa3fdd1e1: yö tumma 21/15/8, mutta viirut koko joella), valoseppa-praha5-vesi-20261015/ (A/B).
- Raketin irtoamisen siluetti: jo junassa 191 (Siirtoseppä e823b3bf2) – ei työtä.
- Lontoon 5,3 s Westminster-katko: ei enää näy vakioajossa.

## Jono: TYHJÄ (PT:lle ilmoitettu 11.4x)
Odottavat muilta: valaan luuranko (LR), Petřín-tavoiteluuppi (Codexin kuvat). Jos omistaja TF 193:ssa moittii Prahan yövettä:
seuraava askel olisi heijastukset oikeista lampuista (KaupunkiYovalot: _Vedet-maskin G-kanava = OSM-lamput) ja välkkeen kynnys.

## Työkalut (tämän päivän)
- Vahdin vakioskenaario _tyo/linssiseppa2/vahti/sk-vakio.txt ottaa Kuun TELE-kuvan (i3e; ei oleta-rivejä, ettei Kuu-koodittomat haarat VIKAudu).
- Albumikuvat simusta: zsh _tyo/linssiseppa2/kuutele/kopioi-albumi.zsh <todistuskansio> [n] (T7-simusarja).
- Prahan ketjut _tyo/linssiseppa2/lontoo-praha/ketju-*.zsh + sk-*.txt (praha3/4/4b/5 paikallisena, yovesi ämpäristä). Myöhemmissä kierroksissa
  `oleta-uusi` (oleta hyväksyy myös aiemman kierroksen rivin). Veden A/B: `doc kaupunki-kuva-asetukset.txt=vesi 0`.
- Vahdin poissulut (julkaisija-tyokalut/valoseppa-haarat.txt): vesi-varadata-194, kuu-tele-194, vesi-v24-194 (kaikki rungossa).

## Työtilat
- Erien worktreet poistettu (kuutele, vesiv24, lontoovesi). wt/proto-linssiseppa2-lontoo = PK:n.
- Levy siivottu PT:n pyynnöstä: 9 .app-kopiota pois _tyo/linssiseppa2:sta, vanhat todistukset NAS:lle (Matkakirja-arkisto/lokit/,
  mm. todistus-iss192-20261015-0239 ja VALOSEPPA-TIIVISTELMA.md).
