# Natiivisepän luovutus 31.10.2026 klo 00.20 (konteksti ~32 %; Postivahti)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna214/jono-214.txt (loppu = uusin;
kattaa junat 214–216). Id:t: /Users/Shared/Claude/osoitekirja.md.

## TILA
- **Juna 215 ULKONA** (TF 215 iOS + Mac, lukittu c0b59f6b0). **Unity 6000.7.0b7 käytössä** (b6 poistettu koneelta → b6-rungot eivät käänny).
- **OMISTAJA 30.10. 22.27: EI junaa 217 – kaikki junaan 216** (valo VS/PK/LAV, STP/6.7-kokeet, Pariisin kartta, Tuileries + metro).
  TF vasta kun valo valmis ja omistaja hyväksynyt (ei lukitusta ennen omistajan pyyntöä).
- **Juna 216 runko natiiviseppa/juna-216 = 6677eaaa6c66ffd3a01802085a49d4433c7bbd39** (wt/proto-natiiviseppa-ehdokas, peili
  natiivi-backup peili/proto/natiiviseppa/juna-216). Testit VIHREÄT 2217/777/575, tarkista 0. PT:lle ilmoitettu.
  Sisältö 8d3bf122f:n jälkeen (kaikki PT:n kuittaamia): NUI juoksu-valmis 4fb9b3aa0; NS esikatselu-nollaus 70f507343; PK osasarja-v3
  9ae1b6277 + LAV pintalista 548440f01; PK osasarja-v5 a2d9e0c7b (+ esto-v23; korvaa v4:n, kujien 02/05 kivijalka → PT:n ehto täytetty);
  KS piirrokset c6a58d63f + aff20e3fb + 254cf53d4 (Metroasema-nimiö: web PR 5690 + sisältövienti odottavat junan julkaisua);
  VS valo-216 4b4a6d947 → 02953bc6e (varjokorjaus) → 5c4427345 (lähikaskadi 15 m + hahmon varjo); PK lahipuut-v12 290624e19.
  Ämpärissä (JU): esto-v22, osasarja-v5, esto-v23, lahipuut-v12.
- **Esikatselu (tyokalut/esikatselu.sh) nollaa nyt pysyvän tilan** ajon alussa (PlayerPrefs + datakansion tiedostot → <ajo>/tila-ennen/;
  ESIKATSELU_TILA=jata ohittaa). Työkalu ajetaan kutsujan puusta → PK/VS poimivat 70f507343:n (kerrottu molemmille).

## KESKEN
- **LT A/B lähikaskadi** (PT 00.1x): äppi lokit/natiiviseppa-app-216-lahikaskadi (6677eaaa6). LT mittaa `valo lahikaskadi 25|15`
  (kuja 02 + aukio, GPU + > 20 ms kehykset) KS:n 60 fps -mittauksen jälkeen; TULOS suoraan NS + PT + VS. **Jos 15 m hidastaa → oletus
  palaa 25:een** (VS:n commit, NS kokoaa).
- **KS 60 fps -mittaus** iPadilla äpillä lokit/natiiviseppa-app-216-ks-mittarit2 (koehaara natiiviseppa/ks-mittarit-216 a821ccbad =
  85767a5bf + KS e7caf9d1d + 4b9eb7b22; EI junaan). KS ilmoittaa iPadin vapaaksi → LT aloittaa.
- **Valo ei vielä valmis:** LAV:n uusintaleivonta ~05.30; VS:n korjaukset tulevat erillisinä commiteina valo-216:een → merge juna-216:een
  PT:n kuittauksella. Tuileries + metro (KS) odottavat Codexia.

## 6.7-KOE JA MUISTI (valmis, PT:lle 21.2x)
- Kooste: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/grafiikka67/KOOSTE.md. Jetsam ei 216-regressio (vain restart-toistossa, myös b6);
  appres ~5,1 Gt junasta 213 asti; STP 11,7 ms paras; kaskadit 2 iPadilla +6–12 ms → ei. Editoriparit eivät luotettavia (batch ei piirrä
  varjokarttaa) → laitekuvat ratkaisevat. iPad-varjokuvat 0cbe0ffbf: muurien varjot näkyvät (vertailu 0), hahmon varjo ei → VS 5c4427345.

## JATKOKOMENNOT
- Työtapa: merge --no-ff juna-216:een → push peiliin → testit → SHA PT:lle. LR-osoittimet vasta JU:n ämpäri-ilmoituksesta (tarkista CDN
  `curl -r 0-0 …?t=$(date +%s)`; juuri https://media.matkakirja.app/juoksupeli/maailma-v4/).
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh
  /Users/Shared/Claude/wt/proto-natiiviseppa-ehdokas`.
- Laitekäännös (L1, NS:n linja; muut pyytävät NS:ltä): `PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b7" zsh
  /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh <sha> <lokikansio>` (~8 min). Unityä yksi kerrallaan (PT):
  jos toinen Unity-ajo käynnissä, odota tai pysäytä oma ennen Unity-vaihetta.
- Taustaajoja ei ole; L1 vapaa. Cron Unity-beeta "4 9 * * *" (unity-julkaisut.py) luodaan uudelleen.
- ÄLÄ poista wt/proto-natiiviseppa-ehdokas eikä T7 proto-natiiviseppa-unity-b7.
