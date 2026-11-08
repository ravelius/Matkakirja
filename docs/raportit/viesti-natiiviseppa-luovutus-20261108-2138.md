# Natiivisepän luovutus 8.11.2026 klo 21.38

KAIKKI VANHEMMAT LUOVUTUKSET; edellinen git show 9e23c0c70:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2040.md (tausta: FPV-viat,
karsinta, Karttataivas.MaastonTakana, D-ajo). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi.
Nollauksen syy: konteksti pehmeällä rajalla 25 % (7.37). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
Cron "4 9 * * *" (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py, ILMAN -I:tä;
UUSI-rivit → PT:lle "UNITY UUSI: …") luotu 21.2x (b4eb4ffb): LUO UUDELLEEN. Numpy/PIL: /opt/homebrew/bin/python3.14 -P skripti.py.

## TILA 8.11. 21.38 (VOITTAA kaikki vanhemmat)
Haara natiiviseppa/fpv-viat (natiivi-backup), wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpv. Kaikki koe, ei junaan.
1. KERMAKAISTA KORJATTU JA PT KUITTASI (21.3x, pari KK:lle): f69c5c04c usvakerrokset. Karttataivas maaston takana -tilassa 12 nelikulmiota
   sumun syvyyksille alku + k/N·(loppu − alku) (RenderSettings.fog), kerros k peittää p/N jäljellä olevasta → maa saa liu'un usvansa tahtiin,
   täysin usvainen maa = taivas. Komento "taivas kartta kerrokset N" (0 = vanha). JU:n Mac-ajo 21.31 10/10, ei varjostinvirheitä; 12 = 24.
   Kuittaus _tyo/natiiviseppa/fpv-kerma/kuittaus/ (MITTAUS.txt, parit).
2. FPV OSA 4 ENSIMMÄINEN VERSIO 92125fce1 (PT 21.3x "JATKA", Skaala = D/3, ×15 ennallaan, Mac iPad-koossa ensin):
   - Kartta/FpvLento.cs: PK:n FpvLentomalli (FpvParametrit.Pienoismalli(28000) → Skaala 9 333, AlinEtaisyys 28 km, Rates Kosketus)
     georeferenssin Unity-koordinaateissa (double, vasenkätinen). Origoa EI siirretä (maasto aina ≥ D:n päässä, float 0,5 m ei näy).
   - Kamera: PalloKierto.FpvOhjaa/FpvPaikka/FpvKierto (Aseta kirjoittaa ne kameraan); kiertorata samaan silmään FpvKuvaa:lla (sumu, lähitaso
     kuten drone-kuvassa, katse rajattu 5–89°). 30° ylös, vaakakuvakulma 100° (komento fpv kamera kulma fov).
   - Törmäys: FpvMaasto-korkeusruudukko 0,01° (SampleHeightMostDetailed, 200 pistettä/haku, yksi kerrallaan; dronen ympäristö + nopeuden suunta 2 s);
     silmä < maasto × kerroin + D (myös kehysten väli) → alkuun leijumaan. Tuntematon ruutu = ei törmäystä. fpvlahi-yksityiskohta ei ruudukossa.
   - Syöte: FpvLento.Syote (NUI:n tikut osa 3 kirjoittavat), komento "fpv syote k r p y [s]", Macin näppäimistö W/S A/D nuolet.
   - FpvNakyma.Update lukee FpvLento.Malli → tietorivi ja lentotilan nappi lentomallista.
   - Komennot: fpv lento 1 [lat lon h suunta] | lento 0 | syote … | tila auto|manu | d m | kamera kulma [fov] | tila. Loki "MATKAKIRJA fpv:" 2 s välein.
   - unity-tarkistus 0 virhettä; EI vielä ajettu Unityssä.

## ODOTTAA: JU:n Mac-ajo 92125fce1 (pyydetty 21.38)
Skenaario /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/fpv-osa4/sk-fpv-osa4.txt (7 kuvaa: o-leijuu, o-eteen, o-kaantyi, o-manu-kallistus, o-lasku,
o-fov120, o-pois) → lokit/natiiviseppa-fpv-osa4/. Ohje ajopyynto.md.
KUN VALMIS: katso kuvat ja konsoli. Tarkista: (a) kamera dronen paikassa eikä maan keskellä/hyppää; (b) leijuu Automaatissa (korkeus pysyy);
(c) tikku eteen liikuttaa, kierto kääntää; (d) Manuaali ei oikaise; (e) kaasu alas → törmäysrivi ja paluu alkuun; (f) ruudukko täyttyy
(hakuja > 0, virheitä 0); (g) lento pois palauttaa kartan kameran ja kuvakulman. Viat korjataan, sitten pari PT:lle ≤ 3 riviä.
Mahdolliset viat ensin: kvaternion käsisyys (roll väärään suuntaan → tarkista Kulmanopeus-merkit), Vaakaan-nokka, lähitaso (silmä vs kierto),
SampleHeightMostDetailed hidas (tarve > 0 pitkään).
SEURAAVAKSI (PT:n sanalla): NUI:n kosketustikut (osa 3) → FpvLento.Syote; Topografian ☰-valinta käynnistää FpvLento.Aloita + FpvNakyma.Aseta(true).

## LISÄYS 21.4x: PT (KK) – KAKSI UUTTA (VOITTAA "SEURAAVAKSI" yllä; osa 4:n ajon tarkistus ensin)
1. Omistajalla kortti auki: jättiläisdrone (Skaala ≈ 9 300, suositus) vai pienempi drone + vuorten loivennus dronen ympärillä → Skaala ja
   korkeuskerroin pysyvät osa 4:ssä PARAMETREINA, ei lukitusta. Nyt jo: "fpv d m" → Skaala = D/3 seuraavassa "fpv lento 1"; Korostus luetaan
   KorkeusKerroin.Arvo:sta joka kehys. Jos loivennus valitaan, ruudukon korkeus (FpvLento.MaastoK → KorkeusKerroin.Sovita) seuraa samaa kaavaa.
2. KK:n havainto 28 km:n kuvasta (lokit/natiiviseppa-fpv-d/d-28km.png ja fpv-kerma/k-28km.png): lähin kallio ruskeaa kivipintaa, kauempana huiput
   sileän oransseja. Omistaja 14.25 "vuoristo täsmälleen sama" → lähipinta samaa tyyliä kuin kauempana. SELVITÄ SYY: FPV B:n keksitty
   lähiyksityiskohta (fpvlahi, 5a8933619: värjäys/kalliopinta tileset-varjostimessa, KorkeusKerroin.FpvLahi) vai tarkempi laattataso.
   Koe: sama drone-kuva "fpvlahi 0" vs oletus → jos ruskea katoaa, korjaa fpvlahi:n väri kohokartan paletille (tai pois). Pari PT:lle ≤ 3 riviä.
   Tehdään osa 4:n rinnalla.

## LISÄYS 21.5x: OMISTAJAN PÄÄTÖS 21.54 (PT:n kautta) "Jättiläisdrone (Suositus)" (VOITTAA lisäyksen 21.4x kohdan 1)
FPV osa 4: Skaala = D/3 ≈ 9 333 (D 28 000 m), korostus ×15, EI loivennusta. Koko säädettävä myöhemmin lennon jälkeen (parametrit jäävät:
fpv d). Codex tekee dronekuvat (≈ 190 m). Osa 4:n oletukset (FpvLento.D = 28000, Pienoismalli) ovat jo näin – ei koodimuutosta.
