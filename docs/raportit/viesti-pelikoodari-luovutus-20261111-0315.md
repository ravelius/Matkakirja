# Pelikoodari: luovutus 11.11.2026 klo 03.15 (SÄÄSTÖ, viikko 98 %: lepo, ei uusia töitä)

Edellinen: viesti-pelikoodari-luovutus-20261111-0245.md (e31eb39bf). TÄMÄ KORVAA SEN JONON.
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/seinat-taso1, kärki **028ec1d6f**:
3199b079a P1 → d63a93686 lahipuut-v16 → 77128fef8 lahipuut-v17 → b6cceaeb7 portaat kujakiveksi → 028ec1d6f lehti kivijalan päällä.
Mac-ajot käyttävät nyt JU:n välimuistikäärettä (julkaisija-tyokalut/esikatselu-valimuisti.zsh); verkkojumi poistunut (P1 9 min / 2 ajoa).

## TEHTY
- P1 (3199b079a): pari katsottu, KK 03.1x "KELPAA JUNAAN". Pushattu natiivi-backup pelikoodari/p1-kivijalkaovi (juna-224 + 1 commit).
  pt-ok-pyyntö PT:lle lähetetty 03.1x – ODOTTAA PT:N KUITTAUSTA.
- b6cceaeb7 (KK 02.5x LAV:n kautta): koneportaat = kopio V4_kujakivi_sokkeli-materiaalista (ilman leivottua valoa), UV0 kuten LAV:n penger2
  (u 0,5/m, v 0,316 + 0,567 (1,2 − y)). PorrasLaji 0 = kujakivi, QA `ovikoe porraslaji 18` palauttaa. Riski: lähdemallin purku → kuva katoaa (pari näyttää).
- 028ec1d6f (KK 03.1x): avoimen lehden kulma rajattu portaiden alkuun − 5 cm (5 ovea, kivijalka 0,25 m: 吉云楼, 房子21, 小房9, 平房22, 竹香馆).
  敬胜斋:n lehti oli jo kivijalan päällä (kärki 0,40 m, reuna 0,75 m) – vastattu KK:lle.
- Testit 912/912, unity 0 kaikissa.

## JONO JU:LLA (L2, tässä järjestyksessä) – katso kuvat, sitten:
1. v17: seinat-taso1/p2/aja-v17.zsh → kuvat p2-e, p2-i, p2-i-lahi, e3-e, p2-ylla, yleis-p KK:lle (mainitse v16:n +793 puuta + reittikerros), kopio PT:lle;
   KK:n katsottua pt-ok-pyyntö 77128fef8 (sisältää d63a93686).
2. porraskivi: seinat-taso1/porraskivi/aja-porraskivi.zsh (ennen 77128fef8 | jälkeen b6cceaeb7, LAV:n sk-penger2 + koejuuri-penger2).
   unity.log: "ovien portaat kujakiveksi" jälkeen-ajossa. Pari penger-* KK:lle, kopio PT:lle ja LAV:lle.
3. P1B (EI JONOSSA: JU 03.1x säästön takia, ajetaan vasta PT:n luvalla – pyydä PT:ltä säästön jälkeen): seinat-taso1/p1b/aja-p1b.zsh 2 028ec1d6f (ennen b6cceaeb7). e1–e7 = 7 ennalleen jäänyttä ovea (taso 1) → PAHIN YKSI KUVA KK:lle päätettäväksi;
   j1/j2 吉云楼 auki ennen|jälkeen → KK:lle.
Parikuvat: scratchpadin pari.py-tapa (vierekkäin, ≤ 2000 px), itse katsottaessa sips -Z 1000.

## ENNALLAAN
B1 bottijumi (−85; 500), eteläosan kartoitus; isolla iPadilla aukiovideo ja renkaiden uusinta. Penger LAV:lla (penger2 tehty).

## LISÄYS 03.2x: v17 ja porraskivi ajettu (JU 03.15/03.18), katsottu, parit KK:lla (kopio PT, LAV)
- v17: seinat-taso1/p2/v17/pari-*.png, rungot lehdessä, ei vikaa. KK:lta kysytty "kelpaako junaan" → kyllä = pt-ok-pyyntö 77128fef8 PT:lle.
- porraskivi: seinat-taso1/porraskivi/pari-*.png, kuvio = penger, mutta portaat vaaleammat (ei leivottua valoa). Ehdotettu KK:lle tummennus
  (oviPorrasKivi _BaseColor ≈ pengerin leivottu sävy, mittaa kuvasta) + uusi pari säästön jälkeen PT:n luvalla. Odottaa KK:n vastausta.
