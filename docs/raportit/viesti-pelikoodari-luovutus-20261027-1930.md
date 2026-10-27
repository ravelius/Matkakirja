# Pelikoodari: luovutus 27.10.2026 klo 19.30

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: 2652afd55 (-20261027-1805).

## Haara
- Proto `pelikoodari/c2-fg-212` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git, ei pushia), pää 7ac355ba4.
  Ketju 873a7ab66:n jälkeen: 4ff048800 kääntö pois → 46b3f424c huohotus pois → fe0ae5e6a testiraja → e7ad018b1 äänityyli → d26b87c8f
  keisari-2 pois → 7ac355ba4 jetsam-korjaus. Testit 761/761, unity-tarkistus 0 virhettä.

## Tehty (OMISTAJAN PÄÄTÖKSET KK:n kautta)
- **18.12 kääntö pois** (kumosi 17.48:n): KiinniKaanto = false; eunukin selkä peittää keisarin molemmissa otteissa ja Uuvuit-ruudussa.
  Riuhtaisu/kääntö jäävät QA:han (`ui juoksupeli kaanto 1`). Video v5 (rimpuiluvideo5-4ff048800.mp4) KK:lle, KK hyväksyi.
- **18.37 + 18.51 hengitys pois kaikkialta**: huohotus-1…4 ja oma kanava pois (46b3f424c; JuoksuAanet.Hetki ilman out-parametria),
  väistörepliikki keisari-2 "Huh!" ([gasps]) pois (d26b87c8f), äänityylin kuvauksesta "hengästynyt" pois (e7ad018b1). Muut tehosteet
  lähteiden mukaan viuhahduksia/tömähdyksiä. Junan 212 runko 80b1ea539 = NS poimi 46b3f424c:n; rungossa ei JuoksuOpetusta → keisari-2 ei
  koske junaa. Video v6 (rimpuiluvideo6-46b3f424c.mp4) KK:lle: ei huohotusta. Ämpärin huohotus-mp3:t JÄÄVÄT (PT: TF 211 viittaa; poisto
  omistajan luvalla, kun 212 ainoa TF; uusista vientipaketeista pois).
- **PT: Taso1PortiltaNopeaKaartoJaLaskenta** raja 4,5 → 4,85 s (PorttiKaartoS 4,8 pc-3-korjauksesta, fe0ae5e6a).
- **Eunukkien takapinta** (KK: selkä näyttää etupuolelta: kaulus, napit, ihonvärinen takaraivo): tilaus Codexille 1595d9c5d
  (claude/postilaatikko; 3 takaviitettä + 3 H3.1, ~135 kr, luuranko ja liikkeet ennallaan). Codex kuittasi da1ff277c, työn alla.
  0d4918f16 "tyhjät kasvot" oli väärä tulkinta (takaraivo).
- **LT A/B c2-rak**: kaiteet ilman mitattavaa kustannusta (≤ 0,1 ms) → PT kuittasi.

## Kesken: JETSAM (PT: ennen eunukkierää; junaan 213)
- LT: juoksupelin toinen avaus samassa istunnossa → signal 9 (iPad, runko ad9759bc6).
- Mittaus simulla (_tyo/pelikoodari/jetsam-20261027/: simu-muisti-kaksi-avausta.txt, muisti-tarkka.log, aja-jetsam-46b.zsh):
  ennen avausta fp ~1250 Mt / Unity used 1885, juoksussa ~2200 / 4281, sulkemisen jälkeen 1543 / 2025 (+300 Mt fp jäi; anon +296,
  VM-alueita +2000), toisen sulkemisen jälkeen 1648. GC + UnloadUnusedAssets ajettiin vasta toisen latauksen lopussa.
- Korjaus 7ac355ba4: GC + Resources.UnloadUnusedAssets JuoksupeliNakyma.Suljessa, katon palojen verkot (Palatsi.cs KattoPalat) omiin,
  JuoksuSokkeloMaailma.Tuhoa (solmut + DontSave-häivytyskopiot), reitin palatsistaattiset nollaan V4Maailma.Tuhoassa.
- TULOS 7ac355ba4 (simu 19.33, muisti-tarkka-7ac.log): Unity used ennen 1859 → 1. sulkemisen jälkeen 1925 (+66; ennen +140) → 2. jälkeen 1918
  (ei kasva). Footprint silti 1233 → 1578 → 1555 (+~330 Mt anon: varaajan/GPU:n pidätys, ei Unityn elävät oliot). PT:lle raportoitu 19.3x.
- SEURAAVA: LT iPadilla kaksi avausta jetsam-app-7ac:lla (pyydä JU:lta laite-app; muisti-tarkka.txt päällä; loki talteen ennen uutta
  käynnistystä). Jos kaatuu yhä: laske latauksen huippua (alla jatkoideat), koska sulkemisen jälkeen jää ~300 Mt.
- (Tehty) JU käänsi jetsam-app-7ac → SIMU NYT → `zsh .../jetsam-20261027/aja-jetsam-7ac.zsh` (jättää simun päälle; loki levyltä
  /Volumes/T7 4TB/Simulaattorit/Sarja/00CF62C2…/data/Containers/Data/Application/*/Documents/muisti-tarkka.log, sitten
  `xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" shutdown 00CF62C2-…`, SIMU VAPAA). Vertaa sulkemisen jälkeistä fp:tä
  (tavoite ≈ avausta edeltävä). Sitten LT: iPadilla kaksi avausta (muisti-tarkka.txt päällä, loki talteen ennen uutta käynnistystä!).
  Syy yhdellä rivillä PT:lle ja poiminta junaan 213 (NS).
- Jatkoideat, jos ei riitä: palatsiverkoille UploadMeshData(true) (CPU-kopio pois; KattoPalat tarvitsee luettavan verkon → kutsu
  pilkonnan jälkeen), esteiden GLB:t kertyvät saman avauksen aikana (PuraEsteet tuhoaa vain GameObjectit).

## Odottaa
0. Codexin toimitukset KUITATTU 3dd990948, tarkistus jetsamin jälkeen (PT): 18ff0e05c eunukkien takapinta (T7 juoksupeli-eunukit-20261027/
   rear-source-v2/review-v1, 6 eunukki-GLB:tä + 4 muuttumatonta) ja b984a22a7 perus-Puyin land_heavy-palautus (vain se leike; vastaa
   tuontitapakysymykseen 44de2de4). Lisäksi ce42f0076 pudottautuminen ja 2b5c241f8 tankosarja (parkour, lue).
1. Codexin eunukkien takapinnat → uusi hahmot-koejuuri (v8-koe + uudet eunukit) → v7 = simu-rimpuiluvideo6.txt + `ui juoksupeli hahmot
   juuri …` → ruututarkistus selästä → KK (omistajalle vasta v7).
2. Merge-pyyntö c2-fg-212 junaan 213 v7:n jälkeen (hahmot-v8-koe + uudet eunukit ämpäriin kerralla JU:lla).

## Opit
- Simun Documents-kansio löytyy sammutuksen jälkeenkin levyltä (get_app_container vaatii käynnissä olevan laitteen).
- todistusajo: `--doc muisti-tarkka.txt=500` käynnistää muistilokin; `--jata-paalle` jättää simun päälle.
- JSON-tauluun kirjoitettaessa "-lainausmerkit rikkovat merkkijonon → ”…”.
