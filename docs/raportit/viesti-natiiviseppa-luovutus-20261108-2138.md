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

## LISÄYS 21.5x (2): JU:N MAC-AJO 92125fce1 VALMIS 21.42 (VOITTAA "ODOTTAA" yllä) – lokit/natiiviseppa-fpv-osa4/
rc 0, 7/7, shader 0, NRE 0, SIGSEGV 0; korkeushakuja 98, virheitä 0, ruudukko 1899 ruutua. Lento alkoi 46.30 6.865 (60 km maaston yllä, raja 28 km, ×15).
Tikku eteen → 330 626 km/h ja heti 2 törmäystä (45.851 6.865, maasto × 15 = 56,8 km; 45.854, 54,7 km) → alkuun. Pitkä ruutu 946 ms (GC 8×).
o-leijuu, o-eteen, o-lasku md5-identtiset (taivas, maasto alareunassa); o-kaantyi tasainen horisontti; o-manu-kallistus vino; o-fov120 piikkivuoret lähellä; o-pois OK.
NS:N ALUSTAVA TULKINTA (tarkista lokista ennen korjausta): törmäys on luultavasti OIKEA – silmä = alun maasto × 15 + 60 km (~70–75 km), ja etelässä
Mont Blancin massiivi × 15 + D = 56,8 + 28 ≈ 85 km > silmä. "maan yllä 56,4 km" oli alkupisteen rivi. Identtiset kuvat = drone palasi törmäyksestä
alkuun ennen kuvaa (eteen ja lasku), joten kuva = alkunäkymä leijuessa; kamera 30° ylös vaakalennossa → enimmäkseen taivasta (oikea FPV näyttää samoin).
TOIMET: (1) varmista lokista silmän korkeus ennen törmäystä (fpv-tilarivit) → jos silmä < maasto×15 + D, ei vikaa; (2) uusi skenaario: alku
korkeammalta (h 100 km) tai pohjoiseen päin pois massiivista, kuvat KESKEN liikkeen (odota 1, ei 4) ja ennen törmäystä; harkitse kameraa 15–20°
leijunnassa (kortti/PT, ei itse); (3) 946 ms ruutu: tarkista, onko alussa (ruudukon 1. haku / FpvLento.Aloita) vai lennon aikana – GC 8×:
FpvMaasto.Hae varaa GetRange + double3[] joka haku, PyydaRuudukko enintään 300 pistettä/kehys → listat uudelleenkäyttöön, jos lennon aikana.

## LISÄYS 21.5x (3): PT – MATALA PRIORITEETTI FPV:N JÄLKEEN (Linssiseppä levossa)
NRE pelin sulussa: MuseoSovitin.Sulje:797 → MuseoTekstuurit.Vapauta:504 (NUI:n Louvre-ajo 2f7df0ced, lokit/nui-louvre-valinta-1-*).
Korjaus: null-tarkistus Vapauta:504:ään (tai kutsupaikkaan), ei muuta. Haara 2f7df0ced:n päältä tai junan runko (tarkista ensin muiden haarat:
git log --all -S "Vapauta" -- '*MuseoTekstuurit.cs'). unity-tarkistus sh:lla, vihreä PR kaavan mukaan.

## LISÄYS 22.05 (5): PT – LISÄYKSEN 3 NRE PERUTTU
MuseoSovitin.Sulje:797 → MuseoTekstuurit.Vapauta:504 -NRE poistuu listalta: JU:n mukaan vanha (21.10. alkaen) ja syntyy vain editorin
sulkeutuessa museossa, ei pelaajalle. EI TEHDÄ.

## LISÄYS 22.1x (6): NS – OSA 4 -LOKI TARKISTETTU, FPV-TAIVAS KORJATTU e152a9959, OSA 4b JU:LLA (VOITTAA lisäyksen 2 TOIMET)
Cron "4 9 * * *" luotu uudelleen (2712a233). Lokin tulos: törmäykset 1–10 AITOJA (silmä ≈ alun maasto × 15 + 60 km ≈ 82 km < Mont Blanc 56,8 km + D 28 km;
lasku -1 vie 32 km ≈ 3,4 m oikeaa alle sekunnissa) → ei vikaa. 750–950 ms ruudut (6 kpl, GC 8×, "ulkona") = kuvakaappaukset, ei lennon aikana → ei korjausta.
VIKA kuvista: Karttataivaan liuku ruudun rivissä kiertoradan kallistuksesta (katse 5–89° alas), FPV-kamera 30° ylös → kerma täytti puoli taivasta
(raja 0,44, horisontti 0,95) ja raja pysyi vaakana rollissa (o-manu-kallistus). Korjaus e152a9959 (natiiviseppa/fpv-viat, natiivi-backup):
FPV:ssä t = (säteen korkeuskulma − horisontin painuma) / jänne 35°, kerrokset koko ruudulle; FpvLento kirjoittaa Karttataivas.FpvRajaRad/FpvYlos.
Komento "taivas kartta fpv 0|1|jänne". unity-tarkistus sh 0 virhettä (varjostinta ei käännetty).
ODOTTAA: JU:n Mac-ajo osa 4b (pyydetty 22.1x): _tyo/natiiviseppa/fpv-osa4b/sk-fpv-osa4b.txt → lokit/natiiviseppa-fpv-osa4b/ (11 kuvaa).
Tarkista: l-28km-lahi1 vs lahi0 (ruskea kivi = fpvlahi? → korjaa fpvlahi:n väri kohokartan paletille tai pois; pari PT:lle); l-leijuu vs
l-leijuu-vanha (raja horisontissa); l-manu-kallistus (liuku kallistuu); kesken-kuvat liikkeessä, ei törmäystä; shader-virheet 0.
Huom. omistajalle/PT:lle myöhemmin: jättiläisdronen silmä 80–120 km → horisontti painuu 9–11°, joten 30° ylös leijuessa maa ruudun alareunassa
(kamera 15–20° leijunnassa = kortti/PT, ei itse).
