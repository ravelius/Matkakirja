# Natiivisepän luovutus 14.10.2026 klo 13.5x (konteksti 64 %, PT:n nollauspyyntö)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot: natiiviseppa-skriptit/juna190/jono-190.txt (juna 190, KAIKKI tapahtumat SHA:ineen) ja juna189/jono-189.txt.
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (send_message): PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd
(EI local_593b89a1 = omistajan Keskustelukanava). Viestit PT:lle ≤ 3 riviä. Nollaukset hoitaa Postivahti (local_e6d70b5a…).

## TILA

- **BUILD 189 julkaistu** (OMISTAJA PYYSI JULKAISUA 14.10. 10.05): proto master fecbb3c7e (juna/b17 2e980dd33), lukituskäännös 8c87393fb (L1),
  iOS TF Julkaisijalla, Mac 1.1 (189) TF-ajo 38526635343 SUCCESS 10.12. Muistiajot 189: museo Ranska 2678/2441 Mt, raketti 3831/1288 Mt.
- **Master nyt 578d481d0** = BUILD 189 + kaksi AsetteluTesti-mykistyksen cherry-pickiä (5d1d800d4, 578d481d0; PT 14.10.: asettelutesti soitti kaiuttimista).
- **Juna 190 -runko** natiiviseppa/juna-190 (wt/proto-natiiviseppa-ehdokas) = **8cefa558b** (bbcebf1c9 vihreä 1777/585/491; 8cefa558b:n testit kesken,
  ks. alla). Yhdistetty (kaikki PT:n kuittaamia): PK suikale 41763f287, PK cupola-pinta a00fd0507, PK telakointi
  1858f8f53 (⊃ kevyt pallo 98d4de0f3), AsetteluTesti-mykistykset, NUI iss-auto-189 8d66868f5, PK alkulento-huntu 45748f3db, PK iss-valikko-juna-190
  3c5adf35a (ristiriita AsetteluTesti-näkymälistassa ratkaistu), NUI kertomuskuvat 8d0bc0963, NUI metro-paperi d9bf517fe, junavahdin taukolippu
  ef906526f, KS karttamerkit-kiinni 78f0e65be, LS1 ateena-pallo 67ecaa222, NUI cupola-latauskuva-190b b5872327d (= 59ab58bc4 cherry-pickinä),
  NUI intro-savy d0a4874c0, PK uusi-peli-nollaus 800bb45c4.
- **Pariisin muistiajo 190** (7c573c0a, A/B): 190 4242/877 Mt, 4 varoitusta; 189-vertailu 4358/761 Mt, 7 varoitusta → ei heikennä.
- **Web-merget 190**: juna190/web-merget-190.txt (#4588 SK saapumisintro Commons).
- **Junavahti TAUOLLA** (PT 12.4x): L1-kopio on T7:llä (Matkakirja-proto-kaannos → /Volumes/T7 4TB/koodaus/proto-kaannos-linja1), eikä launchd:n zsh
  saa lukea ulkoista levyä → pysyvä lippu lokit/kaannospalvelu/juna-tauko (juna-ajo.sh). Varmuuskopio jatkuu. Junakäännökset LT:n simuihin KÄSIN.
  Myös Mac-kopio on T7:llä (Matkakirja-proto-mac → proto-mac-kopio). Varmuuskopio: master EI enää proto/masteriin (omistajan 5.10. muutos jää).

## PYSÄYTETTY (HILJAINEN TUNTI omistaja 14.12 → klo 15.15; ei ajoja ennen sitä)

- **Runko 190 nyt 8cefa558b** (+ NUI iss-palaute-190 a9fbdf4d4 = 2f9b1297d + runko, ristiriidat NUI:n ratkaisemina). Sen testit190 PYSÄYTETTY kesken
  → aja 15.15 jälkeen `zsh juna190/testit190.sh` (edellinen vihreä bbcebf1c9: 1777/585/491).
- **Valosepän Cupolan yövalojen muistiajo** (yövalojen kuittausehto) PYSÄYTETTY kesken laitekäännöksen → 15.15 jälkeen pyydä Julkaisijalta
  KÄÄNNÖS NYT (L2) + LAITE NYT ja aja `PROTO_LINJA=2 zsh juna190/kupoli190.sh 44a598b42 8a61f1f09` run_in_backgroundilla (touch
  lokit/natiiviseppa-laitevuoro-ok vasta LAITE NYT:n jälkeen). laite-sha.sh uusii nyt viennin kerran T7:n "Directory not empty" -virheessä.
  Tulos (KUPOLI kup-yovalot vs kup-runko: fp huippu / vapaa min / varoitukset) → PT:lle ja Valosepälle.
- Uusi peli -todistus TEHTY ja PT kuittasi (lokit/natiiviseppa-uusipeli190-1358/kuvat/3-valinta.png). Simukopio rungosta bbcebf1c9:
  lokit/natiiviseppa-app-190-sim (PK käyttää telakointitodisteeseen).

## ODOTTAA PT:N KUITTAUSTA (ei runkoon ennen sitä)

Valosepän kauko / katuvalot (44a598b42, ehtona muistiajo yllä) / Cupolan nimet (kupoli-nimet-190 d5b07b2ed) / Kuu (5155cef3c testikomento),
valas, NUI iss-palaute-190 + iss-loppu, PK ISS 7–9. HUOM: haarat, jotka on tehty PK:n iss-kupoli-190- tai NUI:n iss-kohdevalikko-190-linjan päälle,
ristiriitaavat runkoa (sama sisältö eri SHA:illa) → pyydä tekijältä omat commitit cherry-pickinä natiiviseppa/juna-190:n päälle.

## JULKAISU 190 (ehdollinen pyyntö 13.41)

OMISTAJA PYYSI JULKAISUA (ehdollinen) 14.10. 13.41: "Junan voi julkaista, kun kaikki pyytämäni muutokset ovat valmiina. Ei tarvitse ajaa testejä."
+ kortti "Kaikki samaan junaan". LUKITSE 190 vasta PT:n merkistä. Lukituksessa: EI laitetestejä, MUTTA iPad Pro 13 Release-muistiajo Pariisissa
ennen VIE:tä (pohja juna190/pariisi190.sh; jetsam tai < 0,5 Gt vapaata pysäyttää). Valmiina: juna190/lukitse190-a.sh (KÄÄNNÖS NYT),
lukitse190-b.sh (master 578d481d0 → juna/b18; 4 argumenttia: runko, käännösrivi, muistirivi, testirivi), build190-viesti.txt (täytä __PYYNTO__ käsin),
mac190.sh <runko> (Mac L2 + TF heti; Julkaisijan TF NYT). Puuttuu: muutosloki-190.txt (PT, ≤ 280 merkkiä). Asemataulu: talo/eteneminen
(https://claude.ai/artifact/EekZDPMuAcsjT3awvn4jPb, get → update if_version).

## OMA JONO

- Keittiön alareunan valkoinen usva (Olavinlinna, näkyy 8-bit ja HDR, PT: ei estä).
- iPhonen musta yläpalkin pilleri (näkyi myös HDR-simukuvissa).
- Aloitusvalinnassa pelinappula peittää Pariisi-nimen alun ("riisi"; PT 14.10., ei lukituksen ehto) → PK/NUI:lle.
- Unity-beetaseuranta: CronCreate "4 9 * * *" (istuntokohtainen → luo uudelleen) + unity-julkaisut.py; viesti PT:lle id:llä.

## OPITUT 14.10. (sitovia)

- **T7 ja launchd**: launchd-palvelut (juna-ajo vahti) eivät saa lukea T7:ää → älä siirrä launchd:n käyttämiä polkuja ulkoiselle levylle.
- **Finderin .DS_Store** T7:llä: rsync-tarkistukseen --exclude .DS_Store; rm -rf voi epäonnistua kerran (Finder kirjoittaa kesken) → uusinta.
- **Unity-vienti "Directory not empty"** T7:n laitekäännöksessä = Finder; uusinta onnistuu.
- **Vertailuappi voi kadota lokit/-siirrossa** (PT siirsi > 8 h vanhat NAS:lle) → PT lupasi jättää natiiviseppa-* rauhaan; vertailuapit nyt
  T7:llä /Volumes/T7 4TB/koodaus/natiiviseppa-arkisto/lokit-20261014/ (189-laite-raketti ≈ BUILD 189) → VERTAILU=<polku>.
- **Haara, joka sisältää kuittaamattomia committeja**: tarkista `git log HEAD..<sha>` ennen yhdistystä ja kysy PT:ltä (raketti-lcd, telakointi).
- **Dioraaman HDR-kuva** (RGB111110Float) korjasi kirkkaat kohdat (juna 189); sama muisti.
