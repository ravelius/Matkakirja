# Natiivisepän luovutus 30.10.2026 klo 20.20 (KOVA RAJA 35 %; Postivahti)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna214/jono-214.txt (loppu = uusin;
kattaa junat 214–216). Id:t: /Users/Shared/Claude/osoitekirja.md.

## TILA
- **Juna 215 ULKONA:** omistajan päätös 07.26, lukittu c0b59f6b0267413147aee046c6205e514244644d, TF 215 iOS + Mac valmis 07.48 (JU),
  Mitä uutta PR 5639 (main e578e0d7e).
- **Unity 6000.7.0b7 käytössä** (PT 09.4x): asennus /Applications/Unity/Hub/Editor/6000.7.0b7 (revisio 74fb57f88838, iOS + Mac IL2CPP),
  unity-polku.sh + symlinkit /Users/Shared/Claude/unity/6000.7.0b7 ja kirjastot-6000.7.0b7 (→ T7 proto-natiiviseppa-unity-b7/Library).
  b6 poistettu (PT 10.0x): b6-rungot (≤ juna 215) eivät enää käänny ilman uudelleenasennusta. Laitekopio b7: T7 proto-natiiviseppa-unity-b7
  (worktree, haara natiiviseppa/unity-b7 cde0fab05); laite-sha.sh: `PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7"`.
- **Juna 216 runko natiiviseppa/juna-216 = 8d3bf122f57eab40f1e360721a5721751adb828f** (wt/proto-natiiviseppa-ehdokas, peili
  natiivi-backup peili/proto/natiiviseppa/juna-216). Testit VIHREÄT 2217/776/575, tarkista 0. PT:lle ilmoitettu.
  Sisältö c0b59f6b0:n päälle: unity-b7 cde0fab05; VS loiva-216 4b0476ca0; PK v98c-216 3f2f329f7 (LR v98c); NS v99-216 c8ec8b21b
  (LAV v99: tausta-v78, rakennukset-v85, c2-v24, c1-v9); PK esto-216 56ebe1851 (palatsi-esto-v20); NS v100-216 918e2bf9e (tausta-v79).
  LAHTEET.md on LAV:n paketissa/ämpärissä, ei pelin repossa.

## ODOTTAA (junaan 216 VAIN PT:n luvalla)
- PK osasarja-v3-216 (luovutuksen mukaan 88eed2939: osasarja-v4 + tausta-v81, muurikate-v29, c2-v26, esto v22) + LAV pintalista-kauko-216
  548440f01 SAMASSA yhteydessä – PT: "vasta luvallani parin ja mittareiden jälkeen". NS:n oma osasarja-v2-216 0760d3a7f HYLÄTTY.
- 6.7-grafiikkakoe (PT 19.4x, NS+VS): VS linssiseppa2/grafiikka67-217 b751f8f79 (proto paikallinen; QA `valo kaskadit <n> [atlas]|auto`,
  `valo stp 0|1`, oletukset ennallaan). Laiteäppi lokit/natiiviseppa-app-grafiikka67/Matkakirja3D.app (C# 0, Metal 444/0). LT mittaa isolla
  iPadilla A stp 0 (MSAA 4) vs B stp 1, C kaskadit 2 1024 vs 2 2048 (J/A ms, välkyntä-%, muisti) → TULOS-rivi (list_events LT) + VS:n
  editoriparit → kokoa PT:lle yhdeksi viestiksi. Päätös PT:lle lähetetty: iPad M = Ultra (4096, MSAA 4); kaskadit vain Mobile-tasolle;
  STP vaatii post päälle, MSAA 1, ei kamerapinoa (URP IsTemporalAAEnabled); AgX A/B värimittauksella; EI GRD/Forward+/APV/GTAO/SSR.
  NS:n kaskadit-216 8d21d23f7 hylätty (VS tekee).
- Työtapa jokaiselle erälle: merge --no-ff juna-216:een → push peiliin → testit → SHA PT:lle. LR-osoittimet vasta JU:n ämpäri-ilmoituksesta;
  NS voi tehdä osoitinmuutoksen itse (natiiviseppa/vNN-216), jos PK ei tee.

## SELVITETTY
- Linjan 2 JUMI (PK v4-pelikuvat 35 m): lukko toimi, ajot peräkkäin, PK:n ajoon ei tullut testikamera-riviä → ei korjausta (PT:lle).

## JATKOKOMENNOT
- Taustaajoja ei ole; L1 vapaa (JU:lle ilmoitettu 20.18). Testit: `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh
  /Users/Shared/Claude/wt/proto-natiiviseppa-ehdokas` (kansiossa natiiviseppa-skriptit).
- Cron Unity-beeta "4 9 * * *" (unity-julkaisut.py; b7 nähty) luodaan uudelleen.
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas eikä T7 proto-natiiviseppa-unity-b7.
