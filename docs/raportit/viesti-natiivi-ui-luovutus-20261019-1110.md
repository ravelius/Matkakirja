# Natiivi-UI: luovutus 19.10.2026 klo 11.10 (Postivahti: kova raja 67 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1335:n (sen "Opit" yhä voimassa). Tili gmail, id:t /Users/Shared/Claude/osoitekirja.md
(PT local_8d8ebf72-…, JU local_24e63224-…, PK local_11aca9cd-…). Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen appit pois + simu kiinni
+ SIMU VAPAA. Udidit (T7-sarja, `zsh proto-3d/tyokalut/simusarja.sh simctl …`): iPhone 123B4B25-…, iPad F7513985-…. Ajoskriptit
proto-3d/tyokalut/natiivi-ui-ajot/*-204*; kuvaparit scratchpadin pari.py:llä (tekstit valkoiselle raidalle, raaka/-kuvista).

## KÄYNNISSÄ
- JU kääntää **C1e** RELEASE 945577013 → _tyo/julkaisija/juna204-logo-feidaus-e-release-app (L1 ~11.15), simu ~6 min VS:n jälkeen.
  Aja: `KOPIOT=<scratch> zsh proto-3d/tyokalut/natiivi-ui-ajot/ajo-logo-feidaus-204.zsh <e-release-app>` (kopio UUDELLA bundle-id:llä
  joka ajoon; konsolissa pitää näkyä "MATKAKIRJA käynnistys: startUnity 100 ms päähän"). Luokittele ruudut (ruudut/r*.png, aika =
  (i−1)·0,25 − 2 s): musta (M), logo (L, keskialueen max > 60), peli (P, keskiarvo > 40). Video PT:lle.

## C1 ALOITUSLOGO (omistaja 18.10. 17.55; PT 19.10.: musta → logo häivyttyy esiin ~1 s kohdalla NAPAUTUKSESTA LASKIEN → ulos aiemmin → peli)
Haara natiivi-ui/logo-feidaus-204 (wt/proto-natiivi-ui-logo-feidaus-204), kärki **945577013**:
- Rakennus.LogoLaunchScreen: käynnistysruutu musta (logo alpha 0, uusi nimi LaunchScreen-Feidaus-*).
- Plugins/iOS/MatkakirjaKaynnistysPeite.mm: peite + Core Animation -häivytys 1,0 s kohdalla (0,8 s); UUSI: ensimmäinen startUnity
  0,1 s:n päähän (method swizzle, NSLog). Aloitusverho jatkaa samasta peittävyydestä; logo ulos pallon 60 %:ssa, lyhyt musta, peli.
- JUURISYY: Unityn Release-trampoliini (UnityAppController.mm initUnityWithScene) kutsuu startUnityä synkronisesti ennen ensimmäistä
  näyttökertaa → iOS näyttää käynnistysruutua koko latauksen ajan (simussa 7–27 s). 18.10. "logo heti" näkyi vain, koska logo oli
  itse käynnistysruudussa. Kehityskäännöksessä Unity viivästää kutsun itse.
- Kokeillut (kaikki mustia Unityyn asti): UIView-animaatio 42faaca8e, CA 8a49bf26e (uudella bundle-id:llä 10.10 ja 10.33), Xcode-
  tiedoston muokkaus 182d74ed2 (ei todennettavissa; poistettu). Jos C1e on yhä musta: tarkista NSLog-rivi; jos rivi on, kokeile
  StartViive 0,3 s; jos ei ole, swizzle ei osunut (luokka/selektori).
- Testiappit G/H (kaynnistysruutu-testi/rakenna-gh.zsh) kaatuvat iOS 27:n scene-vaatimukseen → eivät todista mitään ilman UIScene-tukea.

## VALMIIT, KUITATTU tai NS:lle menossa (juna 204)
- **natiivi-ui/iss-otsikot-204** (wt/proto-natiivi-ui-iss-otsikot-204) kärki **858ee3470**: B3+B4 (1410ef1d7 kuitattu), sirut 12 pt (KK),
  6 paikkaa Ilmiöt → Luonto, 10 skannerin duplikaattia pois (v-kilimanjaro pidetty, k-kilimandzaro pois), B1 SK:n tekstit (1 182,
  tyokalut/iss-skanneri-tekstit.py → Resources/IssSkanneri/tekstit.json + lahteet.json), lähteet Tietoja-sivulle ("Avaruusaseman
  skanneri"), ei "ANGOLA · ANGOLA". Simu 10.14–10.24 OK (proto-3d/lokit/natiivi-ui-b1-skanneri-204/, natiivi-ui-b4-otsikot-204/).
  858ee3470 (vain otsikon maa) ilman omaa simua.
- **natiivi-ui/iss-ympyra-204** (wt/proto-natiivi-ui-iss-ympyra-204) kärki **98245be43**: B2 juliste 2:3 ympyräikkunalla
  (Resources/IssKamera/juliste-ympyraikkuna.png 1440×2160, nPOTScale 0), kuvan otto korttina, pienenee 3 s, Peruuta (PK Peruuta()),
  PK ef189ffba erillinen kuvauskamera yhdistetty → pysäytyskuva pois 3 s:ssa (NayttoElaa). Simu 10.24–10.33 OK
  (natiivi-ui-b2-ympyraikkuna-20261019/c-*.png). PK:n d1fcf02d6 (sama Peruuta-kytkentä) konfliktoi → junaan vain 98245be43.
- PT:lle raportoitu 10.4x; PT kuittaa NS:lle.

## Muut
- Työlistan "ISS: yksi ohjauspöytä alusta" -rivi on vanha (pöytä tehty junissa 201–203); PT:lle kerrottu.
- Worktreet: avoimet iss-otsikot-204, iss-ympyra-204, logo-feidaus-204 (poista mergen jälkeen `git worktree remove`, proto-repo).
  6 vanhaa poistettu 19.10. (haarat natiivi-backupissa). Tyhjät kansiot proto-natiivi-ui-kohdevalikko-201, -rakettikuva,
  natiivi-ui-tyylikirja-museo (.DS_Store) jätetty.
- _tyo/julkaisija: B2/B4/B1-appit JU siivoaa.

## Opit
- Käynnistysruudun simutodiste aina uudella bundle-id:llä (muisti simu-kaynnistysruutu-valimuisti) — lue muistio ennen johtopäätöstä.
- Unity Release: natiivi UI ei näy ennen startUnityä (synkroninen initUnityWithScenessä).
- simctl uninstall vaatii bootatun simun; todistusajo jättää appin asennetuksi → boot + uninstall + shutdown itse.
- Unity Resources -tekstuuri NPOT skaalautuu 2:n potenssiin ilman `nPOTScale: 0`.
- pohjavahti: fontSize-lausekkeessa ei numeroita (Tyylikirja.Koko.* tai nimetty vakio).
