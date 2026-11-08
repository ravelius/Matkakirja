# Pelikoodari: luovutus 08.11.2026 klo 22.40

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Vanhat opit: `git show f0e5a3173:docs/raportit/viesti-pelikoodari-luovutus-20261108-0230.md` kohta 2.
Etävarasto natiivi-backup (proto-3d/Matkakirja-proto). Pelikoodarin checkout on haarassa koti/Matkakirja-pelikoodari: älä vaihda haaraa, luovutukset omaan haaraan worktreellä.

## 0. Valmis tänään (raportoitu PT:lle)
- FPV-lentomalli, haara pelikoodari/fpv-lentomalli (työpuu /Users/Shared/Claude/wt/proto-pelikoodari-fpv), kärki 703008c41. KK valitsi 14.32 oman mallin; valmista koodia ei oteta.
  e1d7c09c4 pienoismalli (AlinEtaisyys, Pienoismalli(D,d): Skaala = D/d) · ecf0116ce propwash (oma, liikemääräteoria) + rate-raja 1998 °/s;
  Betaflightin testiluvut pois (GPL-alkuperä) · 5a7b64bba FpvTila {Manuaali, Automaatti} (oletus Automaatti; vauhti 15 m/s, kallistus 55°),
  NopeusMaanYllaKmh, KorkeusMerenpinnasta · 703008c41 mittarit: pysty / Korostus, korkeus / Korostus, EI pienoismallilla (Mont Blanc 4 800 m).
  Rajapinta lähetetty NUI:lle (local_43962c89). Odottaa NS:n osaa 4 (KorkeusMaailmassa, Korostus, raja). Selvitykset: proto-3d/_tyo/pelikoodari/fpv/.
- glb-esihaku 9c40eb7e3: EI täytä hyväksyntää (−0,04 s, huippu +66 Mt) → jää QA:ksi, ei junaan. TULOS-3.txt 14.50. Raportoitu.

## 1. TYÖN ALLA: juoksupeli 1c–1g (PT 22.3x, omistajan pyynnöt 22.32; sanat ja kuvat Matkakirja-fable docs/raportit/kaappaukset/omistaja-20261108/2223-pyynnot.md)
Haara pelikoodari/juoksu-223 (84a91d530:stä), työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu. Mac-kuvat ja värinämittaus PT:lle ennen junaa (JU:n vuorolla).
- **1g LÄHETETTY PT:lle ja KK:lle (local_37f7c945) 22.5x, ODOTTAA KK:N PÄÄTÖSTÄ**: todennäköisesti seinäpysähdys, ei jumi (TF-lokia ei saa).
  "Uuvuit" 46 s:ssa vaatii noin 14 s kiinni (0,5/s vapaana, 6/s kiinni); keisari seisoi noin 10 s seinällä odottamassa pyyhkäisyä (4c4d6f297),
  takaa-ajaja otti kiinni. Suositus: ilman pyyhkäisyä 1 s:ssa keisari kääntyy itse avoimelle puolelle (muuttaa 2.11. "ei automaattisia käännöksiä").
  Tiedosto proto-3d/_tyo/pelikoodari/juoksu-223/1g-selvitys.md. Kun KK päättää: toteutus JuoksuV4Reitti/JuoksuV4Saanto (Odottaa, Kaanna),
  testit JuoksuKulkuKarttaTestit (SeinanEdessaPysahtyyEikaKaannyItsestaan muuttuu), JuoksuOpetus (ohje seinällä).
- **1f LÄHTÖ HETI**: sama juuri kuin 1g. Avauksessa keisari pysähtyy vastaseinälle (JuoksuAvaus.SeinaS = HuoneS, PorttiAikajana:
  seinä → huuto → eunukki → kamera kiertää → 3-2-1 → ohjaus). Odota KK:n 1g-päätöstä ja tee samalla linjalla (keisari juoksee ovelta suoraan kujaa).
- **1c VALMIS 9f2e57b71** (ei vielä PT:lle): JuoksuAvaus.KallistusKerroin 0,13 → 0,5, KallistusRaja 3 → 10°; ammattimittaus 2,4° → 9,4°, 20 °/s
  (taso 1: 7,7°); testiraja AmmattiRulla 10, AmmattiRullaNopeus 25. Testit 871/871, unity 0. Tarvitsee Mac-kuvat/videon (iPhone + iPad) PT:lle.
- **1d VARJOT KAUEMPAA (ei aloitettu, löydös)**: JuoksuV4Maailma.Valo.cs: kohde heittää varjon vain, kun etäisyys < HeittoK (40) × koko
  (1 m:n kohde 40 m:iin); lisäksi varjomatka (Valopohja.PeliVarjot, rajattu 5–300 m, oletus ValoKohteet.JuoksuVarjoMatkaM). Alkulennon ajan
  (AvausT, ennen OhjausPelaajalle) ehdotus: HeittoK isommaksi (esim. 120) ja varjomatka pidemmäksi, palautus ohjauksen alussa. QA: `valo heittok K`,
  `valo varjomatka M`. Mittaa GPU-aika Macilla ennen/jälkeen.
- **1e VÄRINÄ (ei aloitettu)**: tallenna alkulento (Mac-esikatselu JU:n vuorolla, kehysajat.jsonl + kuvat), etsi syy (aiemmat värinäkorjaukset:
  `valo siirto` varjon normaalisiirto, _JuoksuKuvaBias mip-siirtymä, räystäspalkki). Tulos KK:lle.

## 2. Muut (ennallaan)
Keisari c92dafe1f ja lataus ab113e0ac junassa 221; c (e59541a34) junassa 222. Lontoon maanpinta a7ad5fc24 kokeena. g-ajon kuolema (13:02:13) selvittämättä.
