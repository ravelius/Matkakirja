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

## LISÄYS 22.4x (KK)
- KK vie 1g:n kortille omistajalle (suositus: keisari kääntyy itse ~1 s:n jälkeen); PÄÄTÖS TULEE SUORAAN PELIKOODARILLE.
- 1f: KK muistuttaa omistajan 2.11. 13.38 (a) "ovi ja huuto → nopea kierto taakse → 3-2-1". Vastasin KK:lle: TF 223 odottaa koodin mukaan
  linjan mukaisesti (seinä → huuto → kierto → 3-2-1 → ohjaus → pyyhkäisy), ei vika; laitteella ei todennettu. 1f tehdään 1g-päätöksen mukaan
  (itsekäännöksellä lähtö noin 1 s 3-2-1:n jälkeen). Jos juoksu ei lähde lainkaan pyyhkäisyn jälkeenkään → korjaa vikana. Ennen muuta muutosta kerro KK:lle.

## LISÄYS 22.4x – OMISTAJAN PÄÄTÖS klo 22.38 (KK): "Odottaa pyyhkäisyä"
2.11. linja pysyy: ei automaattisia käännöksiä, keisari odottaa seinällä pyyhkäisyä. **1g: ei korjausta.** 1f: lähtö pysyy linjan mukaisena
(seinä → huuto → kierto → 3-2-1 → pyyhkäisy); korjaa vain, jos juoksu ei lähde pyyhkäisyn jälkeen. 1c (valmis 9f2e57b71, kuvat puuttuvat), 1d ja 1e jatkuvat.

## LISÄYS 22.5x – ENSIMMÄISENÄ: 1g UUDELLEEN VIKANA (OMISTAJA 22.40, KK)
"Keisarin olisi pitänyt pystyä juoksemaan seinän viertä eteenpäin kiinniottopaikassa mutta keisari ei liikkunut eteenpäin."
Tiedot: Matkakirja-fable docs/raportit/kaappaukset/omistaja-20261108/2240-pyynnot.md + kuva 2223-1. 22.38 päätös pysyy (seinä EDESSÄ → odottaa),
mutta SIVUSEINÄ ei saa pysäyttää. Selvitä syy, korjaa, toista Macilla (JU:n vuoro) → kuvat KK:lle (local_37f7c945), rivi PT:lle.
Hypoteesi (koodista, ei todennettu): JuoksuV4.Vapaa.cs SuoraTila/Mahtuu tarkistavat keholeveyden (KehoM) molemmin puolin suoralla linjalla;
palatsin seinät ovat 2,3° vinossa (SeinaVara-kommentti), joten seinän viertä juostessa suora linja lähestyy sivuseinää ja kappale katkeaa
"seinän eteen", vaikka kiveys jatkuu. Korjausajatus: kun edessä on vain sivuseinä (suora tila jatkuu sivuttain siirretyllä linjalla),
jatka kappaletta siirtämällä jalkalinjaa seinästä poispäin (tai kallista suuntaa ≤ 3°) pysähtymättä; pysähdys vain, kun seinä on
kohtisuoraan edessä. Testi oikealla kartalla (JuoksuKulkuKarttaTestit, JuoksuKulku.bytes): juoksu vinon seinän vierustaa ei pysähdy.
Koetin: tason 1 vapaa reitti LuoVapaaTaso + SokkeloPalatsi (MK_JUURI=/Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-kk-pohja-v1d-pk8-vienti-20261031/juoksupeli/maailma-v4,
kk-pohja-v1d-pk8/pohja.json) – HUOM: koettimessani ensimmäisellä seinällä kaikki sivut näkyivät suljettuina, eli testiympäristöstä puuttui
jokin pelin asettama tieto (tarkista JuoksuV4Maailma, miten kartta ja palatsi kytketään ennen kuin luotat koettimeen).
