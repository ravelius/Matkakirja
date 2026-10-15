# Linssisepän luovutus 16.10.2026 klo 01.05 (KOVA RAJA 36 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Worktreet: /Users/Shared/Claude/wt/proto-linssiseppa-korostusmaa
(nyt haaralla linssiseppa/kuvat-196f) ja /Users/Shared/Claude/wt/proto-linssiseppa-yotaivas (linssiseppa/revontulet-skanneri-196).
Ajot proto-3d/tyokalut/linssiseppa-ajot/. Tarkistus `zsh tyokalut/tarkista.sh`, testit `sh Linssit-testit/kaanna.sh [osa]` worktreessa.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217. Simu iPad 00CF62C2.

## 1. KESKEN: KUVAT-196F-SIMUAJO (KÄYNNISTÄ UUDELLEEN HETI – taustaskripti kuolee nollauksessa)
Julkaisijan L2-jonossa linssiseppa/kuvat-196f = b75618cae (juna-196 07bb2afde + revontulten nimi 02c25f84a + korostus-maa f9e449579 +
KS 4f8de7ea8 + kippi b43c288ce; Linssit 1895/1895, unity 0) → _tyo/linssiseppa/kuvat-196f-app, lippu simu-kuvat196f.nyt. Käynnistä:
  zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-kuvat196f.zsh > …/ajo-kuvat196f.log 2>&1   (run_in_background; odottaa lippua)
Ajaa ensin sk-kippi-ennen-196.txt vanhalla _tyo/linssiseppa/korostusmaa-kuvat-196-app:lla (8902d22c, vanha portti/köydet), sitten
sk-kuvat-196f.txt: R1 revontulten nimi, korostuksen kaista K0/K1 (Venceslas, Kallimarmaro, Akropolis; `opas korostus nayta 1`),
kippi jälkeen -video notre-jalkeen.mp4 + nopeusloki. Lopuksi SIMU VAPAA Julkaisijalle.
TOIMITA PT:lle: (a) R1-kuva, (b) kippi ennen/jälkeen-video + `python3 -I mittaa-kippi-nopeus.py <todistuskansio>` molemmista (seisonnat),
PT:n EHTO: perillä tarkka malli näkyy ennen kuin kerronta kuvaa kohdetta → näytä videossa; (c) kaistakuvat parina koosta_pari.py:llä.
Jos R1:ssä yhä ei nimeä: Tila-rivi kertoo "revontulten ehdokkaita N, nimelle ruudulla/ei" (astro kyyti yotaivas -tila).

## 2. VALMIIT TÄSSÄ VUOROSSA
- Revontulet: havainto aluksen näytetystä paikasta 98bb309f9 (Valoseppä tietää), nimi kirkkaimman ruudulla näkyvän verhon kohdalle 02c25f84a
  (haara linssiseppa/revontulet-skanneri-196). R2 ok: _valmiit/iss-revontuliskanneri-196d-20261015.
- Black Marble -pari Bangkok samalta etäisyydeltä PT:lle: _valmiit/iss-yovalot-bangkok-pari-196d-20261015.
- KIPPI b43c288ce (haara linssiseppa/kippi-196) – PT HYVÄKSYI (myös 14.10. Buckingham-säännön muutos): latausportti tasainen tahti
  60–90 %:lla (PalloPorttiTavoite, väh. 15 %, aikavakio 2 s, max 15 s, PalloPorttiLoppu 0,9), kerronta 5 s ennen arvioitua todellista
  saapumista, köydet korin reunaan (PalloKori.KoydetKoriin, `opas kori koydet 0|1`). Syy ei korkeuseste: korkeus omasta mallista.
- Korostus paikallisesta maasta 093ab13a5 + f9e449579 (haara linssiseppa/korostus-maa-196): DTM-ruudukko 32² (RHalf), lokissa toimii
  (Venceslas p5 −20,9 m, Akropolis p95 +29 m); ensimmäisen ajon kuvissa ero ei näkynyt (korostus heikko) → diagnostiikka 196f-ajossa.
- Josefov (PT:n hionta): liukutesti sallii vain katse ~320–0 → simulla sama kuva, ei uutta Praha-versiota (lokit/todistus-josefov196-*).
- Poistettu PT:n luvalla 6 vanhaa LS-simukäännöstä (~3,3 Gi). kulmat195 ja korostusmaa-kuvat-196-app pidetään.

## 3. AVOIMET
- REITIN KARKEA ESILATAUS (omistaja 00.17, junaan 196): ESTE ilmoitettu PT:lle 01.0x – CesiumKaupunki.cs:1120 Googlen ehtorajat
  (PT 7.10.: esikamera vain SEURAAVAAN pysähdykseen, "ÄLÄ LÖYSENNÄ ilman uutta tarkistusta"). Odota PT:n/omistajan päätös ennen koodia.
  Selvitys rakennuspalikoista: AsetaReittikamerat (ReittiNaytteet 0,15/0,4/0,65, ReittiSkaala 0,5), EsilatausEstetty, LahtoValmis;
  korkeus/este jo VAIN omasta mallista (ehto täyttyy).
- PT:n lisä: ISS → Lissabon -siirtymässä Blue Marble -Cesium-laatta ilmestyy ISS-pallon päälle ilman häivytystä (terävä lohko), kuva
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/iss-pulu-vastaukset-196/kelaus-kehys-ipad.png – häivytys/sekoitus. EI ALOITETTU.
- Karttasepän korostusehdotus kohta "Jäljelle" = korostus-maa (yllä); ennen/jälkeen-kuva PT:lle 196f-ajosta.
- Kun kaikki kuitattu: NS:lle junaan 196 erikseen revontulet-skanneri-196, kippi-196, korostus-maa-196 (kuvat-196f on vain kuvakäännös).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-0105.md).
Ensin kohta 1: käynnistä ajo-kuvat196f.zsh taustalle (odottaa lippua simu-kuvat196f.nyt), sitten kuvat ja video PT:lle.
