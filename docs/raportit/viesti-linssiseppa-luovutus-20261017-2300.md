# Linssisepän luovutus 17.10.2026 klo 23.00 (KOVA RAJA 36 %, Postivahti)

Edellinen: viesti-linssiseppa-luovutus-20261017-1922.md (osoitteet, yleisohjeet). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(paikalliset haarat, ei pushia), ajot proto-3d/tyokalut/linssiseppa-ajot/. Viestit AINA send_message id:llä: PT local_5df52e10-10e4-4b72-9554-0049db300dfe
(≤ 3 riviä), JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3,
VS local_c238f4af-ae73-44e7-81f1-92848acd9217.

## 1. ENSIMMÄISEKSI: LOUVREN PYRAMIDIN TERÄVÄ VARJO -SIMU (OMISTAJAN PÄÄTÖS 22.27 PT:n kautta)
Omistaja 22.27 pyramidi v2.1:stä: "Pitää olla terävä mutta pieni varjo ei pehmeä. Muuten ok" → hyväksytty junaan 201, kun varjo on
TERÄVÄREUNAINEN, PIENI, tiiviisti pohjan alla, tummuus = pelinappulan varjo.
- Haara linssiseppa/orsay-valinnaiset-200, worktree /Users/Shared/Claude/wt/proto-linssiseppa-orsay. Uusin 22ce38984 (TeravaPeitto 0,8,
  TeravaSiirtoY 0,028). Edellinen simu f59dd7e7 (736739247, peitto 0,6): terävä ja kiinni, mutta ≈ RGB 160/145/110 vs. nappula 130/101/45.
- Ajo ajo-louvreavaus201c.zsh (käännös L2, loki ajo-louvreavaus201c.log). Tarkista `pgrep -fl ajo-louvreavaus201c`; jos ei käynnissä eikä
  logissa "LOUVREAVAUS201C VALMIS", käynnistä uudelleen (nohup zsh …). Valmis → JU:lle simuvuoropyyntö (iPhone BD64C8E4 ~4 min) → JU:n
  SIMU NYT → `touch …/linssiseppa-ajot/simu-louvreavaus201c.nyt` → odota "SIMU ALAS" → "SIMU VAPAA" JU:lle.
- Tarkista TÄYSIKOKOISENA (PT 21.5x työtapa): rajaus raaka-G1:stä (386,392,1110,1047) = lähikuva ja (560,800,860,1000) × 4 = pyramidi +
  nappula. Mittaa varjo (esim. x 650/710/780, y 940–962) vs. nappulan varjo (634,831) ≈ 130/101/45. Jos yhä selvästi vaaleampi: nosta
  TeravaPeitto (KaupunkiPalloKuva.cs, TeravaVarjo) tai leveämpi TeravaSiirtoY.
- Kuvat _valmiit/louvre-pyramidi-200-20261017/ (O1z-…, O1zz-…, täysikoko O1-…) + LUE-v2.md:hen v2.2-osio. PT:lle 3 riviä → PT vie KK:lle.
  Ei videota (omistaja 22.02: paikallaan pysyvä muutos = kuvapari). NS:lle sha junaan 201 VASTA KK:n kuittauksen jälkeen.

## 2. TÄNÄÄN (17.10. ilta, kaikki orsay-valinnaiset-200)
- Pyramidi v1 (bc1748db0) omistaja 20.21 "Ei hyvä. Katso itse" → v2: KarttaLasi.shader (esikerrottu läpikuultava lasi VS:n Louvren
  pihapyramidin arvoin, 9 riviä ristikkoa fwidth:llä, valoreuna, siniharmaa yläosa) + KarttaLasiSuoraksi.shader (Blit → tavallinen alfa),
  LR:n sarjan koko (leveys 0,85 × KarttaesineKoko, SarjaLeveysOsuus), siirto alaoikealle (SiirtoX 0,45 / uusi SiirtoY 0,5), pohjan
  muotoinen kivireunus (35°, 1,12 ×, 0,8 m; PT: poikkeus LR:n sarjaan), terävä pohjavarjo (TeravaVarjo).
- MAGENTAN SYY b6e54fcce: KaupunkiPallot.Ruutu ei kutsunut museoKuva/louvreKuva.Askel → Rijksin ja Louvren kamerat piirsivät joka ruudun
  eikä lasin kuvaa muunnettu. LR:lle kerrottu (galleria-200 tarvitsee mergen).
- 86ef197d2 VihjeVarjo kaikille nostoille (PT hyväksyi LR:n arvot): Peitto 0,5, Korkeus 0,35, MinLeveysPt 28 (Aloitusvihjeet laiteskaalalla).
- Levy: 6 proto-worktreetä poistettu (houkutin, pystyvipu, vipu, kerrospiilo, louvre, puutomat191); jäljellä orsay + kierrokset195 (T=).
- Muistiin: testaus-vain-automaattiset.md ← omistajan 22.02 "nauhoitusta voisi vähentää" (kuvapari, ei videota).

## 3. AVOIMET
- Codexin #361 sn1-pelitoimitus ei tullut (viimeisin b5cc72fea). Tullessa KTX2 + portti + vienti samana tuntina.
- Opit: Mathf.SmoothStep(a, b, t) ≠ GLSL smoothstep; uusi KaupunkiPalloKuva tarvitsee Askel-kutsun KaupunkiPallot.Ruudussa; varjostimen
  Color-ominaisuudet muunnetaan sRGB:stä → lineaariset arvot Vector-ominaisuuksina; pohjavahti estää new Color(…) UI/*.cs:ssä → tyylikirjan
  arvot; L1-lukon alla varjostintarkistus: linssiseppa-ajot/lasitarkistus.zsh (editorissa 0 virhettä ei todista laitetta).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-2300.md).
Ensin kohta 1 (pyramidin terävän varjon simu 22ce38984 JU:n vuorolla → mittaus nappulaa vasten → lähikuva + 4× PT:lle → KK:n kuittauksen
jälkeen sha NS:lle junaan 201), sitten Codexin sn1-toimitus kun se tulee.
