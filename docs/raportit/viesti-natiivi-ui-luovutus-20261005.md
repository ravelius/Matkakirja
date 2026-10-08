# Natiivi-UI:n luovutus 5.10.2026 klo 06.1x (viikkoraja 97 %, tilinvaihto n. 07.15)

Rooli: Natiivi-UI (Opus, high). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, haarat natiivi-ui/<aihe>,
worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-<aihe>. Käännös: lokit/natiivi-ui-1035/skriptit/kaanna-kopioi.sh
<haara[+haara]> vasta Julkaisijan "NYT käännös" -viestistä; .app kopioituu lokit/natiivi-ui-1035/app-<SHA>.
Simu vain Julkaisijan "SIMU NYT" -viestistä, oma iPhone FB234D08-4693-4496-9C7A-6C7C15B03963, iPad
AD119F7B-A2A2-43EE-8769-7326DD757F89; lopuksi sammutus ja "simu vapaa".

## TILA 8.10. klo 18.0x (JATKA TÄSTÄ)

Juna 167 (Natiiviseppä kirjannut): linna-latauskuva 24372c44d. KUITTAUSTA ODOTTAA: natiivi-ui/olavinlinna-peli dcbaf72d3
(juna-166:n päällä, worktree wt/proto-natiivi-ui-olavpeli): Pelit-välilehti LAUTAPELIT + VIDEOPELIT, Olavinlinna-rivi →
SeikkailuTapit.AvaaPelattavaPala; kysymys VideopelitKaikille (nyt vain kehittäjä). Pallon kerroksellinen latauskuva: MINÄ kytken
(LS1 sopi 17.5x, Kuvat.Hae R2:sta, juna 167) kun Codexin kerrokset tulevat. #4208 testit ajossa uudelleen (peruuntuivat) → mergeä.

## TILA 8.10. klo 17.3x (JATKA TÄSTÄ)

Junassa 165: säätila 9417aa6ae. Junassa 166 (kuitattu): latauskuvat-liike a7953991e (pallon still Ken Burns).
KUITTAUSTA ODOTTAA: natiivi-ui/linna-latauskuva 24372c44d (a7953991e:n päällä; Olavinlinnan nimiruutu: tausta+usva+vene R2
julisteet/olavinlinna-latauskuva/20261008, Codex 3910eb5c8; Latauskuva.TaustaLahentyy nyt koko juuri). Web-PR #4208
(kontekstikuvakkeiden käsi-verbit M-osa) — mergeä vihreänä. Luettelo docs/raportit/latauskuvat-liike-20261008.md (linja: vain
3D-maailmat, #4/#5 pois). Pallon kerrokset Codexilta → LS1 kytkee. Worktreet: wt/proto-natiivi-ui-tkpariteetti (linna-latauskuva),
wt/natiivi-ui-kontekstiverbit (poista #4208:n mergen jälkeen).

## 8.10. klo 11.0x: OLAVINLINNAN LATAUSKUVA (omistaja hyväksyi 10.5x) — ODOTTAA KUVIA

Sisältökirjuri tilaa Codexilta kerrokset (PÄIVITETTY Päätoimittaja 8.10.): tausta (linna 1499, salmi, ilman venettä; valinnainen
1499-viiri taustassa, EI sinikeltaista eikä Suomen lippua), VENE alfalla (kääntöpiste kölin keskeltä pikseleinä), valinnainen usva;
3 rajausta. Kun polut tulevat: DioraamaTaulu nimiruutu (mk-astroavaus) → Latauskuva-pohja nimiOtsikon alle, tausta TaustaLahentyy
(Ken Burns), vene Kerros keinunta ±0,6° ja nousu 2–3 pt, jakso 7–8 s (kääntö kölistä), usva ±0,5° / 3 pt / 8 s; sovitus
LatausLiike.Peita + kierto kuten pallossa. Ilman kuvia musta kuten nyt.
Omistaja: mustat palkit korjautuneet ainakin iPhonessa (39d43932a).

## TILA 8.10. klo 10.xx (JATKA TÄSTÄ)

PALLON SÄÄTILA (omistaja 8.10. 09.1x–09.2x, juna 166): proto natiivi-ui/saatila 9417aa6ae (worktree wt/proto-natiivi-ui-tkpariteetti;
⊇ 39d43932a + 0484007f2) — KUITATTU, menee JUNAAN 165 (Päätoimittaja: LS1:n osuus valmistui ennen käännöstä); SHA Natiivisepällä ja LS1:llä. Ydin Saatila (LIVE, AikaValinta/SaaValinta, LiveAika ← LS1, LiveSaa ← LS1:n
/opas/saa-haku, Muuttui, Tallenne) + SaaVihje (ensikerran vihje 15 s / 5 s); OpasValikko ☾-lista (LIVE-laatikko, AIKA, SÄÄ),
napin LIVE-tila (tila.live-kuulto) ja sääkulma; Ikonit.Viiva pilvi/sade/sumu/lumi/ukkonen; Lähteet: MET Norway CC BY 4.0.
Web-PR #4193 mergetty (75bb6a745), proton kopio = main 7185ab2dba8a.
LS1 kytkee 166-haaraan; Pelikoodarin worker PR #4194.

## TILA 8.10. klo 09.1x (JATKA TÄSTÄ)

JUNA 165 kuitattu ja Natiivisepällä: metro-kaksirivi 0484007f2, kasittely-veto cf66d2088 (Siirtoseppä kytki, historia-valot
5626b2bf8), latauskuva 39d43932a (LATAUSKUVA-pohja: UI/Latauskuva.cs, Ydin LatausLiike + 9 testiä; vähäeleinen ±0,5–0,75°,
ankkuriköysi; oppaan valokuvan Ken Burns Kuvasuurennos.Lahentyy; kierron korjaus pallon latauskuvaan, LatausLiike.Peita).
Web-PR #4188 (LATAUSKUVA tyylikirjaan, f0443998b): mergeä vihreänä (CI testit odotti ajuria), sitten tarkista että proton
kopio = mainin lähde. Luettelo: docs/raportit/latauskuvat-liike-20261008.md. Pallon osat (tausta, kupu, kori) Codexilta
Sisältökirjurin kautta → Linssiseppä kytkee (Latauskuva.Kerros/Koysi/Koysi.Ankkuri).
Kiertovika: 3D-näkymät (kartta, Olavinlinna) eivät toistuneet simussa (164koe, iPad11+iPhone); latauskuvaan ei päästy
testikomennoilla (opas toive ei käynnistä siirtymää). Päätoimittaja kysyy omistajalta näkymän. Simuskriptit scratchpadissa
(kierto*.zsh) → kopioi tarvittaessa lokit/natiivi-ui-1035/skriptit/.

## TILA 8.10. klo 08.xx (JATKA TÄSTÄ)

Junaan 164 Natiivisepän esirungossa (kuitattu): f2587529, 67727816f, b529268aa, 69e0b05ae (metro-otsikko), 7d366ce92
(tyylikirja-pariteetti; Natiiviseppä otti 7d366ce92:n Tyylikirja.cs/.uss-versiot → seikkailu-haaroissa generoi a9fe6aaa:sta).
JUNA 165 KUITATTU ja SHA:t Natiivisepälle: natiivi-ui/metro-kaksirivi 0484007f2 (pitkä korostettu nimi 2–3 riville iPhone pystyssä,
ei alle 18 pt) ja natiivi-ui/kasittely-veto 24d40fb9c (syötepuoli, Ydin KasittelyVeto + 6 testiä; SeikkailuTapit.KasittelyAlkaa/
Kasittely/OtaKasittely). Siirtoseppä kytki (historia-valot 10294000f, SeikkailuKasittely: tyrmän ovi). Ajoitusvika korjattu:
  kasittely-veto cf66d2088 (Aloita heti kosketuksesta) korvaa 24d40fb9c:n junassa 165 — KUITATTU, Natiivisepällä.
  Napautus käsiteltävään = aina toiminto (Siirtoseppä historia-valot 5626b2bf8, SeikkailuKasittely.Alla). Ei avoimia eriä.
Simut: T7-sarja 8.10. alkaen — omissa zsh-skripteissä `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2`;
uudet UDID:t iPhone 17 96044270-…, natiivi-ui-iPad11 F7513985-… (tyokalut/simusarja-udid.tsv).
  nohup/xargs/timeout/env ohittavat funktion → niissä `xcrun simctl --set "$MK_SIMSET" …` ja UDID `mk_kaanna <UDID>`.

## TILA 8.10. klo 07.4x (JATKA TÄSTÄ)

Junaan 164 Natiivisepälle: seikkailu-pulu-nappain f2587529 (KUITATTU, korvaa 8aa55e02), astrokuva-tauko-164 67727816f ja
giza-tekijat-164 b529268aa (KUITATTU; pudonneet erät poimittu BUILD 163:n päälle, Natiivisepän esirungossa juna-164 482f65f7f),
metro-otsikko 69e0b05ae (8b4659e9:n päällä, korvaa sen; KUITTAUSTA ODOTTAA; SHA myös Linssisepälle videokäännökseen ~10.00).
metro-otsikko: korostettu nimi yhdellä rivillä (SovitaKorostus, 44 pt → leveyteen, väh. väliotsikko), lisätila ei rajaudu kaistaan.
Web: #4070 mergetty (4a69d8db4), #4035 suljettu (sisältyi), #3832 → #4180 mergetty (98a4bb82e), #3832 suljettu. Worktree
wt/natiivi-ui-lautapeli-paperi poistetaan (tools/uusi-worktree.sh --poista natiivi-ui-lautapeli-paperi).

## 8.10. klo 07.3x: PULUN VIHJE NÄPPÄIMELLÄ (pelattavuusmalli kohta 6), kuittausta odottaa

natiivi-ui/seikkailu-pulu-nappain f2587529 (8aa55e02:n päällä, worktree wt/proto-natiivi-ui-seikkailutoiminto): Mac P ja
peliohjaimen Y toimivat seikkailussa kuten Pulun reunakuvan napautus (SeikkailuTapit.LuePuluNappain → PuluKaappaa). Testit läpi,
kuittauspyyntö lähetettiin Päätoimittajalle 07.3x. Kuittauksen jälkeen SHA Natiivisepälle seuraavaan junaan.

## 7.10. klo 21.4x: OMISTAJAN PARIISI-PALAUTE JUNAAN 162 (SHA Natiivisepälle 21.4x)

natiivi-ui/pariisi-otsikko a27f2e2c (natiiviseppa/juna-162-koe 8b3ffb91:n päällä; worktree wt/proto-natiivi-ui-otsikko):
kohdeotsikko metrolinjaan (OpasMetrolinja.Korostus/KorostusSelite, KierrosTaulu asettaa; nimi 44 pt + selite ~3 s), kuvakortit
pienemmiksi (iPad ≤ 1,15 × 56, puhelin 40) ja tummemmiksi (himmennys.kevyt). Ei laitetarkistusta; jos omistaja antaa TF:stä
palautetta koosta, säädä KorostusKoko / KuvaKoko.

## TILINVAIHTO 7.10. 23.4x: ei taustaajoja, ei avoimia eriä; kaikki erät kuitattu ja SHA:t Natiivisepällä (ks. aloitusviesti).

## 7.10. klo 22.1x: KUVIEN TEKIJÄT ☰ LÄHTEET -NÄKYMÄÄN (omistaja 22.5x, Päätoimittaja hyväksyi; juna 164)

natiivi-ui/opas-lahteet 8b4659e9 (a27f2e2c:n päällä, worktree wt/proto-natiivi-ui-otsikko): oppaan ☰ "Lähteet ›" -alanäkymä
(Kartta- ja maastoaineistot + kuvien tekijät kohteittain). LS1:n KuvaLahteet valmis (linssiseppa/kortti-teksti 7c4122bc9),
koeyhdistäminen puhdas, testit läpi; KUITATTU 164 ja SHA 8b4659e9 (havainnekuvarivi aina) Natiivisepälle 22.2x. Ei avoimia eriä.

## HUOMINEN 8.10.: PELATTAVUUSMALLI (Päätoimittaja 7.10. 19.1x, main #4163 docs/raportit/pelattavuusmalli-olavinlinna.md)

Lue kohdat 6 (ohjaus laitteittain) ja 12 (Natiivi-UI-sarake). Tavoite illan junaan: Olavinlinnan 1. persoonan pala
huoneet 1–5. Ei uusia pohjia. Työt SeikkailuTapit.cs:ään (haara cbc92a25:n päälle, worktree wt/proto-natiivi-ui-seikkailutoiminto):
1 aamupäivä: OIKEA VETO koko oikealla puoliskolla olemassa olevalla veto-pohjalla (0,30°/pt vaaka, 0,22°/pt pysty, ei
  liukumaa) → SeikkailuTapit.Oikea-arvon tilalle/rinnalle (sovi Siirtosepän kanssa luettava rajapinta); oikea TAPPI jää
  testikytkimeksi (oletus pois). NAPAUTUS MAAILMAAN (lattia = napautuskävely, esine < 1,2 m = toiminto) ja PULUN
  REUNAKUVAN napautus (vihje) kytketään Siirtosepän luokkiin heijastuksella (Pulu.NapautusKaappaa on jo olemassa).
2 iltapäivä: toimintonapin uudet tilat puhalla, avaa, kaada, aseta, anna tarjotin (Toimintonimet + Tila(); kysy Siirtosepältä
  Lahin-tunnukset) olemassa olevin kuvakkein.
3 alkuilta: testi "seikkailussa ei näkyvää tekstiä" (paitsi löytö- ja tietokerrospohjat; kohta 11).
TILA 7.10. 19.5x: vaihe 1 KUITATTU junaan 163 ja SHA Natiivisepälle = natiivi-ui/seikkailu-fp eb115fc3 (sisältää cbc92a25) (Pulun napautus →
  tietokerros tai SeikkailuPelaaja.PuluVihje() kytketty). VAIHE 2 KUITATTU 163 ja SHA Natiivisepälle: natiivi-ui/seikkailu-verbi 754f090b (sisältää eb115fc3 ja cbc92a25) (verbi SeikkailuEsineet.Toiminto). VAIHE 3 KUITATTU 163 ja SHA Natiivisepälle: natiivi-ui/seikkailu-tekstivahti 82decfa9 = JUNAN 163 NUI-KÄRKI (sisältää 754f090b, eb115fc3, cbc92a25) (SeikkailuTapit.Tekstivahti, testi ui seikkailutapit teksti). Kaikki 3 vaihetta tehty. LISÄKSI KUITATTU 163 ja SHA Natiivisepälle: natiivi-ui/seikkailu-jatka 6af3eb9f = JUNAN 163 NUI-KÄRKI (Jatka/Alusta-valinta Vahvistus-dialogilla,
  Vahvistus.Kysy kunPeruttu; SeikkailuTapit.AvaaPelattavaPala; Siirtoseppä vaihtoi Paavalikon rivin, ce5e596f).
  KONTEKSTIKUVAKKEET (omistaja hyväksyi 20.3x) KUITATTU 163 ja SHA Natiivisepälle: natiivi-ui/seikkailu-kuvakkeet 8aa55e02 = JUNAN 163 NUI-KÄRKI (0fe836d3 + isompi kaari) (Ikonit.Kasi/Heittokaari/Liekki,
  SeikkailuTapit.Kuvake(verbi)); tyylikirjarivi web-PR #4070 (natiivi-ui-tyylikirja-kulta 40be6b15, proton kopion lähde
  b28e77f1a682). Ei avoimia eriä. Aiempi: 680be26a (cbc92a25:n päällä): OtaKatse() (oikean puoliskon
  veto), oikea TAPPI testikytkin (OikeaTappi, oletus pois), napautus → SeikkailuPelaaja.Napautus(Vector2 px) (Siirtoseppä
  historia-fp d0f26d0b).
Kontekstikuvakkeet (käsi, kaari, liekki) = omistajan päätettävä 13.3; toteuta VASTA kuittauksesta.
Testaus: tarkista.sh + kaanna.sh-testit, kuittaus 1 rivillä Päätoimittajalta → SHA Natiivisepälle.

## TILA 7.10. klo 16.0x

JATKA TÄSTÄ: junaan 162 kuitattu apuraha-kuvat 3f07c49b (SHA Natiivisepälle 16.0x) ja seikkailu-tapit 34cf54b0 (16.2x, Päätoimittaja ilmoitti); metro 89d98b7e junassa 161.
OMISTAJA 15.5x + 16.0x: ei stillejä, savuja eikä omia iOS/Mac-käännöksiä; haaraan unity-tarkistus + kaanna.sh-testit
(Peli/Linssit/Kartta), kuittaus 1 rivillä Päätoimittajalta → Natiivisepälle. Simukäännös vain epäselvän vian syyhyn, ilmoitus
Päätoimittajalle ensin. Siirtymäruudun korjaus on LS1:n (pallo-latauskuva 810cda48).
Junaan 162 KUITATTU (Päätoimittaja 18.0x) ja SHA Natiivisepälle: natiivi-ui/seikkailu-toiminto f9f48082 (toimintonappi
poimi/heitä/laske/kynttilä/koputa/irrota/nosta + SeikkailuTapit.NaytaLoyto). AVOIN: omistajan ikonipäätös (avoin käsi, kaareva
nuoli, ehkä liekki; uudet 24×24-viivaikonit) → vaihda SeikkailuTapit.PoimiIkoni/HeitaIkoni uudessa haarassa → testit →
1 rivin kuittaus → Natiivisepälle.
JUNA 163 KUITATTU 18.1x ja SHA Natiivisepälle: natiivi-ui/seikkailu-tietokerros cbc92a25 (sama worktree
wt/proto-natiivi-ui-seikkailutoiminto, f9f48082:n päällä): TietokorttiAvautui (Pulun ele utelias), NaytaTietokerros (ele ilo,
KORTTI-kortisto vasta Pulun napautuksesta, Pulu.NapautusKaappaa).

## TILA 7.10. klo 15.0x

JATKA TÄSTÄ: metro 89d98b7e KUITATTU junaan 161, SHA lähetetty Natiivisepälle 15.0x. APURAHA v7 + VALMIIT LINSSIT =
natiivi-ui/apuraha-kuvat 3f07c49b (proto-git; sisältää kehittaja-tf:n yhdistettynä): kuvat kappaleen viereen (kuvat[].kappale
0-pohj., kuvat[].rivi 0-pohj. listarivi), kortti 760, palaute pois; ylätason valmiitLinssit {teksti,nappi,valmis,linssit}
(Pelikoodari #4147) → LinssiOhjain.AvaaValmiitLinssit → Linssirekisteri.Valmiit (ei kehittäjätilaa); vanha esittelylippu
poistetaan käynnistyksessä; testaajatila = LinssiOhjain.PaivitaKehittajatila (Asetukset.Muuttui). Julkaisijan jonossa ~15.45,
YKSI simu kerrallaan: skriptit/apuraha-v7.sh <UDID> <nimi> <app> [vaaka] (iPhone 17 FB234D08 pysty+vaaka, sitten iPad
AD119F7B) → tarkista 0-julkaistu-loppu (ei nappia), 8-nappi, 9-avattu + valittavissa ennen/jälkeen → Päätoimittajalle
(ehdot 1–3) + Pelikoodarille tunnusvahvistus → junaan 162. Mac-stillit Natiivisepän Mac-käännöksestä.

## TILA 7.10. klo 13.0x (TAUKO 13.45–15.00)

JATKA TÄSTÄ (tyhjästä kontekstista): UUSIN 14.2x: omistajan metropäätös (iPad vasen yläkulma + ☀A oikealle, iPhone vaaka
  Islandin oikealle ylös, nimet köyden päällä, iPhone pysty Island-rivit rajattu) = natiivi-ui/pariisi-esitys 89d98b7e. Jonossa
  Julkaisijalla (käännös ~14.33) → skriptit/vuoro-iphone-metro.sh <app> (iPhone 17, 18 Pro Max 46EC73E2, iPad; pysty+vaaka) →
  stillit Päätoimittajalle → kuittaus junaan 161 → SHA Natiivisepälle (esityserä). UUSIN 13.3x: omistaja haluaa iPhonen metrolinjan ruudun laitaan Dynamic Islandin
  viereen → natiivi-ui/pariisi-esitys 81aa5fea (omistajan tarkennukset: iPhone vaaka Islandin oikealle ylhäälle, iPad ihan vasempaan reunaan; skriptit/vuoro-iphone-metro.sh <app>, iPhone 18 Pro Max 46EC73E2 Julkaisijan luvalla; iPadin köysi EI toiminut daa70f22:lla – testi ui opasvalikko metro tulostaa köyden ruutualan, selvitä LS1:n kanssa). Tarvitaan
  KÄÄNNÖS + stillit iPhone pysty ja vaaka (myös uusin iPhone-malli, kysy Julkaisijalta lupa toiseen simuun) + iPad ennallaan →
  Päätoimittajalle. Köysiketjun (13.24) tulokset ketju-koysi.log kertovat iPadin köysikorjauksen. proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, skriptit lokit/natiivi-ui-1035/skriptit.
- 13.2x: köysikorjauksen still dd49fff5 EPÄONNISTUI (metrolinja katosi: LS1 KoriVasenKoysiNorm AABB liian leveä). Varmistus
  7239f7f5 (vain xMax ≤ 0,4 ja leveys ≤ 0,2). Pyydetty LS1:ltä tarkempi laskenta akselista → tauon jälkeen merge LS1:n kärki,
  KÄÄNNÖS NYT, skriptit/vuoro-koysi.sh, katso metrolinja näkyy köyden oikealla → 2 stilliä Päätoimittajalle.
- AVOIN 1 (kiireellisin): KÖYSIKORJAUS natiivi-ui/pariisi-esitys 5c3d45e6 (= 7239f7f5 + LS1 741625b8 tarkka köysi). 13.24 IRROTETTU KETJU skriptit/ketju-koysi.sh: käännös + vuoro-koysi.sh → katso lokit/natiivi-ui-1035/ketju-koysi.log ja pariisi-esitys/koysi-*.png; ilmoita Julkaisijalle lukko/simu vapaa jos ei vielä (metrolinja korin köyden oikealle, LS1 KoriVasenKoysiNorm;
  sis. LS1 esitys-giza 8ff8c0be + omistajan metropalaute KUITATTU b1c53bba). Pyydetty Julkaisijalta KÄÄNNÖS + simu ~6 min →
  skriptit/vuoro-koysi.sh <app> (iPhone vaaka + iPad; kori-GLB kopioidaan Documents/pallokori/) → 2 stilliä Päätoimittajalle
  → hän kuittaa koko esityserän (metro, Kysy-rivi, kori, opastus kerran) junaan 161 → SHA Natiivisepälle.
- JUNA 161 natiivi-ui/kehittaja-tf 767c70eb (KUITATTU, SHA Natiivisepällä; master BUILD 159): kehittäjätila koodilla myös App Storessa + TESTAAJATILA (oma koodi,
  vain tiiviste Asetukset.TestaajaTiiviste; kaikki linssit + maailmatila) + versionumero → Mitä uutta → "Kehittäjätila"-nappi.
  Natiiviseppä todentaa App Store -käännöksellä Päätoimittajan SHA-vahvistuksen jälkeen. Avoin kysymys Päätoimittajalle: sulkeutuvatko
  esittelylinssit, kun testaajatila kytketään pois (nyt eivät).
- JUNA 160 lähetetty Natiivisepälle: iss-jalka 7f262261 + apuraha-periaate d277c738 (kuitattu). Lippurivin web-korjaus PR #4134 (Pelikoodari).
- Juna 157b eb6f860f, 159 kaupunkiopas cf5e31b8 lähetetty. Seikkailutapit 34cf54b0 odottaa Päätoimittajan kuittausta Siirtosepän kuvista.
- Näyttö 2560×1440 on omistajan oikea asetus (ei mainita).
- Työkalut: skriptit/simkosketus (oikea tap), skriptit/hiiri (Mac CGEvent), arkki.py; kaanna-kopioi.sh <haara> vain KÄÄNNÖS NYT -viestistä.

## TILA 7.10. klo 10.3x

- ISS-JALKA (omistaja 10.5x, TF 159 iPad vaaka): natiivi-ui/iss-jalka 7f262261 (master BUILD 159 päällä, wt/proto-natiivi-ui-issjalka):
  jalka aina kun paneelin alle jää rakoa (ennen vain pysty), varoitus lokiin puuttuvasta kuvasta. Odottaa käännöstä + skriptit/
  vuoro-issjalka.sh <app> (iPhone pysty/vaaka, iPad vaaka/pysty) → stillit Päätoimittajalle ennen junaa.
- Pariisi: pariisi-esitys 6c153435 (vaakametro tapin oikealle). Juna 160 todennus LS1:n appilla linssiseppa-app-esitys-0bf208e9a
  (skriptit/lippurivi.sh, sis. kuvarivi-testi). Mac käynnistetään uudelleen ~11.05; herätys Päätoimittajalta.

- JUNA 160 natiivi-ui/apuraha-periaate 0261750e (kuumailmapallo-160 73ed2612 päällä): Elävä opas → Kuumailmapallo (KUITATTU),
  portin linkki pois (KUITATTU), apurahakortin loppuun lippurivi + palautelohko + © (odottaa: lippurivin rivitys 583fb158 ja ei tyhjiä
  kuvakehyksiä 0261750e → käännös ~11.15 + skriptit/lippurivi.sh, testiesittely skriptit/apuraha-testi.json). Todisteet apuraha-160/.
- PARIISIN KAUPUNKIESITYS natiivi-ui/pariisi-esitys 8a50da76 (apuraha + LS1 pallokori): Kysy-rivi kierroksen ajan (esitysRivi),
  METROLINJA-pohja (Pohjat/metrolinja.uss + OpasMetrolinja, omistaja hyväksyi 10.2x), Kysy = LS1 KysyKysymykset + Puhu/Kirjoita,
  Liikun Kaupunkikierros pois. LS1 kokoaa yhdistelmän linssiseppa/esitys-giza ja ottaa omistajan stillit.
- SEIKKAILUTAPIT natiivi-ui/seikkailu-tapit 34cf54b0: todennettu Siirtosepän V1-ajossa; Päätoimittaja kuittaa hänen kuvistaan, junaan
  vain historia-h0:n kanssa kehittäjäkytkimen takana → SHA Natiivisepälle kuittauksen jälkeen.
- Juna 159 kaupunkiopas cf5e31b8 lähetetty. Näyttö 2560×1440 on omistajan OIKEA asetus (12.0x), ei palauteta eikä mainita.

## TILA 7.10. klo 09.0x

- JUNA 157: Natiivisepän VIE-runkoon fdc7828c konflikti OpasOdotusTestit.cs → natiivi-ui/sallitut-157b eb6f860f (molemmat testit,
  Linssit-testit 796/796) lähetetty Natiivisepälle.
- JUNA 159 KAUPUNKIOPAS KUITATTU → SHA natiivi-ui/kaupunkiopas-158 cf5e31b8 Natiivisepälle (157b + LS1 kaupunkitila-159 1be5518d):
  kaupunkitilassa ei aloitusvalintaa eikä ☰:n Vaihda kohde. Todennettu LS2:n yhdistelmäappilla 7ec94828 (pallon oikea napautus,
  lokit/natiivi-ui-1035/kaupunkiopas-158/arkki-158.jpg; skriptit/kaupunkiopas-158.sh). VIE-ehto: LS2:n pallokorjaus samaan junaan.
- Ei avoimia eriä. Näyttö yhä 2560×1440 (omistaja palauttaa).

## TILA 7.10. klo 05.1x

- JUNA 157 KUITATTU → SHA natiivi-ui/sallitut-157 5cbfb919 Natiivisepälle (käännös cb9d828d; arkki lokit/natiivi-ui-1035/sallitut-157/
  arkki-157b.jpg). Korjattu simun 04.35 löydökset: nimitörmäykset (Granada NIC, Dublin USA, Barcelona VEN → Amerikat valikossa),
  lähiöt (46 → 36 riviä), suosikit vain sallituilta alueilta, torjunta kertojan laatikkoon. "Islanti › Islanti" korjataan datassa
  (Pelikoodari #4098 → Reykjavík). Kaikki junat 155–157 lähetetty; seuraavaksi lepo / Päätoimittajan uudet erät.
- Mac v2 6f849fc8 OK. Näyttö 2560×1440 on omistajan oikea asetus (12.0x); ei pyydetä muutosta.

## TILA 7.10. klo 03.5x

- JUNA 156 KUITATTU → SHA natiivi-ui/opas-156 db65c7ae Natiivisepälle (käännös bca847c5). ☰-osumavika: toisto 18/20 + 19/20,
  juurisyy ohi-napautus 40 pt worldBound → Kosketusnappi.ContainsPoint, jälkeen 20/20 + 20/20 (skriptit/osuma-156.sh, vuoro-156b.sh).
  Otsikko turva-alueen mukaan ☾A:n alle (KierrosTaulu.AsetteleOtsikko; testi ui opasvalikko otsikko 'nimi|alarivi'). Todisteet
  lokit/natiivi-ui-1035/opas-156/ (arkki-iphone/ipad/ipadvaaka/otsikko.jpg). Huom: iPad-vaakassa simkosketus = pystykoordinaatit.
- JUNA 157: natiivi-ui/sallitut-157 a56d9a03 (156 + LS1 sallitut 9c4d369f + VainSallitut + TorjuntaTeksti → PuluChat.Vastaa) odottaa
  käännös- ja simuvuoroa; testit ui opasvalikko sallitut|torjunta. Lista tyhjä, kunnes Pelikoodari julkaisee /opas/aineistot "sallitut".

## TILA 7.10. klo 01.3x

- JUNA 155 KUITATTU (Päätoimittaja 01.3x) → SHA natiivi-ui/ylarivi-155 73cac46a lähetetty Natiivisepälle. Käännös f84f11bf, stillit
  lokit/natiivi-ui-1035/ylarivi-155/arkki-m-{iphone,iphonevaaka,ipad,ipadvaaka}.jpg (skriptit/vuoro-155b.sh; ylarivi155.sh sulkee
  kortin ennen palkkia). Lisäkorjaus: Nostoselain tiivistysporras 4 (▾ pois; iPhonen vaakakortti 304 pt, MAAKUNNAT › AUTO −11 pt).
- JUNA 156: natiivi-ui/opas-156 9595d33c (wt/proto-natiivi-ui-opas156) = 155 + LS1 esilataus-156 + ohjainrivi ‖/▶ + ›| (Seuraava)
  oikean tapin alle (tauko pois ☰:n vierestä), tapit iPadilla sisemmäs/ylemmäs (17 %, 1/3), latauskuva KUVASUURENNOS 80 %
  (Kuvasuurennos.Osuus), ☰/tauko-lokit. Testit ui opasvalikko ohjain|seuraava on/off/auto|latauskuva [pois]. Odottaa käännöstä
  (Julkaisijan jono, levy ≥ 36 Gi) → skriptit/opas-156.sh <UDID> <nimi> <app> [vaaka] (iPhone + iPad): stillit + ☰-osuma 20 oikeaa
  napautusta (oikean yläkulman osumavika, toista ensin!) → Päätoimittaja.
- JUNA 157: natiivi-ui/sallitut-157 0f770be2 (wt/proto-natiivi-ui-sallitut157) = opas-156 + LS1 sallitut-157 (9c4d369f) + Vaihda kohde /
  aloitusvalikko vain OpasSovitin.SallitutKaupungit (nimi tai < 25 km; tyhjä = ei rajausta) + TorjuntaTeksti → PuluChat.Vastaa.
  Päätoimittaja A: suurennuslasi (LINSSIT-nappi) JÄÄ; "vapaa haku pois" = vain sallitut kaupungit. Testit ui opasvalikko sallitut|torjunta.
- GIZA: natiivi-ui/giza-tekijat be9347a6 (LS1 giza-omat-mallit päällä): CesiumOmatMallit.Tekijat omana 7 pt:n rivinä Googlen rivien
  alla; LS1 ottaa junaan, still LS1:ltä.
- MAC: v1 f5d0e029 kokonäyttö vaihtoi näytön 2560×1440:een (ei palautunut; omistajalle Päätoimittajan kautta, EI muuteta itse).
  v2 6f849fc8 OK (lokit/natiivi-ui-1035/mac-v2/). Työkalut scratchpadissa: hiiri (CGEvent klik/veto/rulla/ohjaus/nappain).

## TILA 6.10. klo 23.4x (TILINVAIHTO)

ALOITUSVIESTI uudelle sessiolle: "Olet Natiivi-UI (Opus, high). Lue docs/raportit/viesti-natiivi-ui-luovutus-20261005.md
(TILA 23.4x) ja jatka junan 155 todisteista. Käännös vain Julkaisijan KÄÄNNÖS NYT -viestistä, simu vain SIMU NYT -viestistä."

- JUNA 155 (omistaja: kaikki 155:een, yksi SHA Natiivisepälle): proto natiivi-ui/ylarivi-155 kärki f1f455e7 (worktree
  wt/proto-natiivi-ui-taulu148). Sisältö: pinnatun luennan juurisyy (Puhe.LueJatkona, toisto TF 154: "pinnattu korvattiin uudella
  luennalla" 1. palan jälkeen), KortinLukijan irrotettava ketju (jatkuu samasta kohdasta), koko luennan etenemisjana, taustatila
  (kartan valinta/AUTO vaihtaa palkin ja luennan, ensimmäinen kuva 3 s), palkki hakunapin rivillä / pitkä otsikko hakunapin alle,
  aina vaalea (.mk-nappi:active), otsikko kokonaan (85 %, rivitys), kategoria otsikon yläpuolelle, rivi ~8 pt kahvan alle, kolme
  oikeinta kuvaketta samalle linjalle (paikkavaraus 38), leveysbudjetti tiivis1–3 (maakuntakortti MAAKUNNAT).
  TODENNETTU app 2fadc15c (= b2b3eae5): luenta jatkuu palasta 3/4, taustatila ja kuva 3 s toimivat (lokit/natiivi-ui-1035/
  pin-luenta/pin-jalkeen-*), ylärivi ja maakunta iPhone/iPad pysty/vaaka (ylarivi-155/*-j-*, maakunnassa tiivis 2, väli 0).
  AVOIN: f1f455e7:n pitkän otsikon korjaus (stilleissä "elohopeakaiv/okset" 3 riviä 44 pt:n palkissa) → käännös + still
  (skriptit/vuoro-155.sh <app>, pin-luenta2.sh, ylarivi155.sh), sitten stillit + kuvakemittaus (skriptit/mittaa-ylarivi.py)
  Päätoimittajalle ja SHA Natiivisepälle. Puhe.cs:n LueJatkona kerrottava Pelikoodarille/Siirtosepälle.
- JUNA 156 (ei aloitettu): (1) oppaan tapit iPadilla sisemmäs ja ylemmäs (~15–20 % reunasta, 1/3 alhaalta), iPhone tarkistus;
  (2) Seuraava kohde -nappi ›| → LS1 linssiseppa/esilataus-156 fb677d83: OpasSovitin.Seuraava(), SeuraavaKaytettavissa, testi
  "opas seuraava"; (3) play/pause + Seuraava oikean tapin alle, ylänurkan tauko pois jos päällekkäinen (ehdota); (4) VIKA oikean
  yläkulman ≡/‖ huono osuma: toista simkosketuksella iPhone+iPad, tarkista osuma 44 pt / turva-alue / Cesium-syöte / vetokynnys,
  20 napautusta ennen/jälkeen; (5) LS1:n OpasSovitin.LatausKuva + LatausKuvaVaihtui → kuva Kuvasuurennoksen pohjalla 80 %.
- Muut haarat: ylarivi-154 850c34f6 (juna 154, Päätoimittajan kuittaama AUTO-korjaus), opas-valmis-153 68e50ae8, linssikuvat-154
  ee1764ce, nappirivi-154 98d13652 (kaikki ylarivi-155:ssä).

## TILA 6.10. klo 21.0x

- Juna 153 (Natiivisepälle, Päätoimittaja kuittasi): natiivi-ui/opas-valmis-153 68e50ae8 = ylarivi-153 b0db26db (ylärivi
  c5c1a24e, krediitit omina kopioina fc535e4a + testi `ui opasvalikko krediittivertailu`, ISS-jalka v3e d68a6b7f) + elävä opas
  pois keskeneräisistä. Todisteet lokit/natiivi-ui-1035/: krediitit-153/ (ennen 2 välähdystä, jälkeen 0, vertailu OK 50/50),
  aloituslogo-153/ (päivityspolku 150 → 152 → 153-koe d8747f20 + ABAB: musta ruutu ei eroa), ylarivi-153/, ohjaamo-jalka/.
- Juna 154: natiivi-ui/ylarivi-154 cd09c700 (wt/proto-natiivi-ui-taulu148) = nappirivi väkäsen alle + 56 pt kuvanappi
  (98d13652), linssikatalogin kuvat valikkoon ee1764ce (10 kpl; puuttuvat 7 Codexille, linssilista-20261006.md), rauhallinen
  ylärivi 28df183e + still-korjaukset b7da30b7/cd09c700. Odottaa: KÄÄNNÖS NYT (~21.10) + 8 min still-vuoro skriptit/vuoro-154b.sh
  <app> <tunniste> → stillit Päätoimittajalle ennen omistajaa.
- LS1:ltä pyydetty: KaupunkiKuva.VuorokausiPaalla oletus true (automaattinen paikallisen ajan sävy, juna 154).
- Skriptit: nappirivi.sh (<tapx> <tapy> [vaaka]; iPhone 200 545, iPad 570 78), krediitit-valahdys2.sh, paivitys-polku.sh,
  kylma-abab.sh, rapsahdys.py, vuoro-153b.sh.

## TILA 6.10. klo 13.4x

- Juna 148b (8a01ead5) yhteinen äänellinen video valmis: lokit/natiivi-ui-1035/juna148-yhteinen/juna148-yhteinen.mp4 + LUE.md
  (ääni +1,915 s Cupolan huminasta; napautukset simkosketuksella, MCP-tap ei toiminut: machPortNotConnected).
- Juna 148c: natiivi-ui/opas-148c b23ec051 (e2f60242 + lähdelistan monistuminen, tapit nappirivin yläpuolelle, kirjoitusrivi
  näppäimistön yläpuolelle, Liiku-listan tyhjät kuvapaikat pois) → Natiiviseppä.
- Juna 149: natiivi-ui/maakunta-149 fc38a9f5 (worktree wt/proto-natiivi-ui-taulu148): taulu-vaaka, maakunta nostokorttina
  (Nostoselain.MuuLista, MinikartanSuurennos), opas-napit 367a68ec (ion-logo Googlen yläpuolelle), lähderivi 40 %, Googlen
  virallinen outlined-logo (Resources/Krediitit + LAHTEET.md, omistajan lupa chatissa), 148c merge, pinnatun palkin 1. napautus.
- Odottaa: mykkä simuvuoro maakunnan ENNEN-kuviin 148b:stä (skripti skriptit/maakunta-kuvat.sh ennen|jalkeen), 149:n .app →
  JÄLKEEN-kuvat + logon 3×-still Päätoimittajalle. Mac-sovellus (TouchSimulation, minimikoko, skaalaus) 148:n jälkeen.

## TILA 6.10. klo 00.3x

- Juna 146: SHA natiivi-ui/iss-joystick 9256b8bd Natiivisepälle (joystickin keski piirretyn sauvan kohdalle, maanimet
  paikat.json "maanimet", täkyjen varapolku). Todennettu käännöksellä 472a6a0e (+ LS1 444cd016 Amsterdam-lento), kuvat
  lokit/natiivi-ui-1035/amsterdam/146koe-*. Amsterdam-valikko 5/5 (3244207f). Odottaa: pin-, +N- ja korttistillit
  appilla lokit/natiiviseppa-app-146toisto2-7ac47be9 seuraavalla SIMU NYT -vuorolla, ennen VIE 12.
- Juna 147 (01.5x): yksi haara natiivi-ui/koe-147 20a9680f (iss-kamera-lcd + pulu-kuvakonteksti + maakuntakortin väistö).
  Todennettu simussa (lokit/natiivi-ui-1035/juna147/1–10): objektiivi LAAJA/TELE, maakuntakortti → PINNATTU PALKKI
  (lappu piiloon mukana; Päätoimittajan kuittaus pyydetty), astrokuvan Pulu-sirut kuvan mukaan (Sarytšev/Tokio).
  AVOIN: LCD "KEHITETÄÄN…"-palkki ja "KUVA VALMIS" eivät näkyneet (UI piilossa renderöinnin ajan, meri ilman maata):
  odottaa LS2:n vastausta (nopein onnistuva kuva ja missä vaiheessa palkki näkyy).

## TILA 6.10. klo 11.4x

- Juna 146: VIE annettu 10.3x. Video osa 2 (pin + joystick) lokit/natiivi-ui-1035/juna146-video/, +N-stillit samassa.
- Juna 147 LÄHETETTY Natiivisepälle: natiivi-ui/koe-147 37df02f8 (Päätoimittajan kuittaus 11.33) = ohjaamo v3b, LCD-tausta 6 %,
  kulmat, nopeuslukema ja värit, portaaton kahva (LS2 c4f3aaed), heilunta Nopeustehoste.RuudunSiirtoPx:llä, pin-osuma ja
  -palautus (valo-id), maakuntalappu piiloon palkin ajaksi, oppaan lähderivi kokoruudussa + himmennys, Data sources 11 pt,
  LS1 kuvatekija 5b26d4c9, Pulun kuvasirut, maakuntakortin väistö, Liiku-nimiöväistö. Web-PR #4035 (tyylikirja).
  Todentamatta: LCD-tausta 6 %, portaaton kahva, lapun piilotus, Data sources, iPad → junan yhteinen video.
- Juna 148: vaakana "Minne katsotaan?" -valikko paneelin yläpuolelle (peittää nyt LAAJA/Poistu); Pulun ilmeet kertoimen
  mukaan (Codex b2736fa9c).

## TILA 6.10. klo 09.2x

- Juna 147 LÄHETETTY Natiivisepälle: natiivi-ui/koe-147 38100de1 + web-PR #4035 (tyylikirja: PINNATTU PALKKI, --tk-lcd-varoitus
  #ffb347 / --tk-lcd-vaara #ff5a4a). Päätoimittaja kuittasi. Sisältö: ohjaamo v3 (Linnanrakentaja), segmenttipalkki, LCD:n
  nopeuslukema 3 s (kerroin, oikea nopeus, % valon nopeudesta, värit), tärinä 1000×, alkuteksti kirjoittuen (VT323), LCD-
  matriisi, mikseri Pulun valikon Äänet-riviin, vaaka 30 %, Pulun kuvasirut, maakuntakortin väistö, Liiku-nimiöväistö.
  Todisteet lokit/natiivi-ui-1035/juna147/.
- Juna 148: portaaton nopeus 1–1000× (odottaa LS2:n AsetaKaasu(double); kaasu-1-kuva siirretään y-akselilla pykälien välillä),
  Pulun ilmeet kertoimen mukaan (Codexin kuvat, posti b2736fa9c).
- Proto-worktreet siivottu 9.00 (20 kpl); jäljellä proto-natiivi-ui-koe147. Web: wt/natiivi-ui-tyylikirja-sirurivi (#4035).

## TILA 6.10. klo 08.4x

- Juna 147: natiivi-ui/koe-147 ad4b7b35 (Natiivisepällä viimeksi 6de35578; lähetä uusin, kun v3 on sovitettu). Todennettu:
  segmenttipalkki oikealla kuvalla (37c74eac, juna147/segmentit-*), Stonehenge-väistö (a), Pulu-sirut, väistö, objektiivi.
  Omistajan ohjaamopalaute 08.3x: 1 välit 4 pt, 2 mikseri Pulun valikon Äänet-riviin, 4 LCD-matriisi, 5 vaaka kiinni
  alareunassa: koodattu, EI vielä simussa (Päätoimittaja: stillit vasta v3:n kanssa, yksi kierros iPhone pysty+vaaka, iPad).
- ODOTTAA: Linnanrakentajan ohjaamo v3 (kahva vasemmalla, LCD+kamera keskellä, joystick oikealla, rumpu pois, isompi LCD;
  ohjaamo.json + sauvaKeski + objektiivi). Kopioi kuvat Resources/IssOhjaamo/ (.metat), sovita, käännä, yksi still-kierros.
- Klo 10 junan 146 käännöksen jälkeen: poista 20 proto-worktreeta (git worktree remove; jätä proto-natiivi-ui-koe147).

## KEHITYSTAHTI (omistaja 5.10. 12.30, Raamattu kohta 2 #3992)
VIE-ikkunat klo 12 ja 20 (valmis + kuitattu lähtee, keskeneräinen odottaa). iPad-mittaus ei ole VIE-ehto. Toiminnallinen
rutiinierä kuitataan ENSIN Laitetestaajalla; Päätoimittajalle vain omistajalle näkyvä/maku/sisältö (esim. latauspalkki).
Todisteet todistusajolla (proto tyokalut/todistusajo/, TODISTUS.md merge-pyyntöön) VASTA kun Pelikoodari ilmoittaa
testimykistyksen käännöksessä ja OHJE.md valmiina.

## Juna 142 — Päätoimittaja kuittasi, merge-pyynnöt Natiivisepällä
- natiivi-ui/jatka-pulun-kuva 2f56284a — Jatka kuin Ohita; Puhe.Lue jatkohiljaisuuden portin taakse; Jatka-napautuksen
  irrotus ei päätä hiljaisuutta; Ohita näkyy aina automaattisen luennan aikana kartalla; maakuntakortin lisäkysymykset.
- natiivi-ui/vaaka-linssivalikko a4ce9696 — vaakavalikko turva-alueen alareunaan, KESKENERÄISET väkäsen takana,
  linna "Muurien sisällä", Ihmisen matka II keskeneräisiin.
- natiivi-ui/iss-taulu-vaaka eb9fd93b — ISS-taulun asettelusilmukka, taulun ✕ pois, AUTO sammuu vain AUTO-napista ja
  zoomi säilyy.
- natiivi-ui/lipputanko-kiintea 536783f0 — yksi kiinteä tangon paikka per maa, peitossa Lipputanko.Piilota.

## Juna 143 — avoinna
- natiivi-ui/chat-linna b38360f4 — KUITATTU, Natiiviseppä mergesi juna-143-koeen (3a6c994e).
- natiivi-ui/x-napit 9a688396 — ✕-inventaarion poistot, KAIKKI todennettu oikealla napautuksella (xt-arkki.jpg,
  xs3-6-sisallys-ohi.png, 06.53); KUITATTU junaan 143, merge-pyyntö lähetetty Natiivisepälle 06.5x.
  Natiiviseppä mergesi juna-143-koeen (a7cd8d44).
- natiivi-ui/x-siivous 121b0840 (07.5x, BUILD 142:n päällä) — siivous 16/20/21: IssKyytiNakyma sulkuVanha (näkyi vain
  avaruuskävelyllä, joka on pois valikosta), Linssivalitsin ylaSulje ja kuollut Muut-paneeli. unity-tarkistus 0 virhettä,
  pohjavahti ok, merge juna-143-koeen puhdas. Käännös 354fa015 (08.14), simussa todennettu 10.2x oikeilla napautuksilla
  (proto-3d/lokit/natiivi-ui-1035/xsiivous/xs-arkki.jpg); lähetetty Päätoimittajalle kuitattavaksi 10.3x → kuittauksen
  jälkeen merge-pyyntö Natiivisepälle. KUITATTU 10.4x, merge-pyyntö Natiivisepälle lähetetty 10.4x.
- POISTU-löydös selvitetty 10.5x kevyellä koneella: vain 0 s:n simutap (painallus ja irrotus samassa kehyksessä) pienentää
  pöydän (IssKytkinpoyta.Napautus PointerDown); 0,1 s toimii. Suositus Päätoimittajalle: ei korjausta junaan 144
  (xsiivous/xp-poistu-arkki.jpg). Todisteissa käytä kytkinpöydän painikkeille duration ≥ 0,1 s.
  Päätoimittaja 10.5x: hyväksytty, ei korjausta. TUNNETTU RISKI: alhaisella fps:llä nopea tap voi osua samaan kehykseen.
  Jos näkyy laitteella (Laitetestaaja kokeilee fyysisellä iPadilla), korjaus osumatestillä (onko painallus pöydän rajojen
  sisällä), EI kehysjärjestyksellä.
- natiivi-ui/iss-ohjaamo-lcd 0fdda21f — ohjaamo + LS2:n LCD-paikat; odottaa LS2:n maailmakuvia (Amazonia) ja S2-indeksiä.
- Myöhemmin (Päätoimittaja): ISS-kuvan vihreä nimilappu hukkuu kirkkaalle hiekalle (az-3667-a4).

## Juna 144 / Tavlin TF-ehto — avoinna (11.1x)
- natiivi-ui/kirjainvali-kerning 46b62059 (master) — ENSIN (Tavlin TF-ehto, Päätoimittaja 11.0x): harvennettu teksti ilman
  parikerrontaa (Kirjasimet.HaeHarva, Aseta valitsee letter-spacingin mukaan). Syy: TextCore nollaa letter-spacingin
  kerning-pareilta (IgnoreSpacingAdjustments, UnityCsReference TextGeneratorParsing.cs) → "TAVL I", "O TTO M A A N I E N".
  Todisteet: Tavli 3 lautaa, Mylly, Pelit-lista. Testikäännös yhdessä siirtoseppa/tavli ea02bae1:n kanssa.
- natiivi-ui/ei-linssia dba06119 (x-siivouksen päällä) — omistaja 11.0x: "Ei linssiä" -rivi vain kun linssi päällä.
  Todisteet: normaali kartta (rivi poissa) + topografialinssi (rivi näkyy ja palauttaa kartan).
- Testikäännös a8a860c7 (11.22), simussa todennettu 11.2x: proto-3d/lokit/natiivi-ui-1035/kirjainvali/
  (otsikko-ennen-jalkeen.jpg, kirjainvali-arkki.jpg, ei-linssia-arkki.jpg). Lähetetty Päätoimittajalle 11.3x kuitattavaksi;
  kysymys: Linssit-näkymän esikatseluikkuna "Ei linssiä" normaalilla kartalla (suositus: jätetään). Kuittauksen jälkeen
  merge-pyynnöt Natiivisepälle (kirjainvali-kerning Tavlin TF-ehtona, ei-linssia juna 144).
  KUITATTU molemmat 11.3x → merge-pyyntö Natiivisepälle junan 143 lisäerään (kirjainvali-kerning tavlin kanssa, ei-linssia
  samassa). Omistaja 11.35: esikatseluikkuna piiloon normaalilla kartalla → ei-linssia 7837ac54 (käännös db99e1f5,
  todennettu 11.4x, eilinssia/ei-linssia-v2-arkki.jpg); lähetetty Päätoimittajalle kuitattavaksi, Natiiviseppä pidättää
  ei-linssian siihen asti (muuten juna 144). KUITATTU 11.4x → merge-pyyntö 7837ac54 Natiivisepälle (143 lisäerä).
- SEURAAVA: lepo. ISS-ohjaamon paneeli (iss-ohjaamo-lcd 0fdda21f) junaan 144 LS2:n kuvien kanssa — Päätoimittaja
  pyytää, kun kuvaparit on hyväksytty. Worktreet: wt/proto-natiivi-ui-{xsiivous,eilinssia,kerning} poistetaan, kun
  haarat ovat masterissa (git worktree remove, omat).

## Latauspalkki (omistaja 5.10. 12.5x) — avoinna
- natiivi-ui/latauspalkki 36853057 (juna-143-koe 91220fb6:n päällä): Latauspalkki.cs (+.meta) EDISTYMINEN-pohjan kääre,
  pohjan kulma 0 (Päätoimittaja A 13.0x, koskee myös sisällön latauksen palkkia), .mk-edistyminen--latauspalkki 140×3,
  tk-teema-tumma. DioraamaTaulu: tekstit pois, palkki nimiruudun alle (esiin 1 s), DioraamaTaulu.LatausEdistyminen
  (Func<float>, Siirtoseppä kytkee). Testi `ui linnapalkki 0.35|pois`. Seuraava: käännös + stillit iPhone FB234D08 ja
  iPad AD119F7B (kesken ~0,35 ja lähes valmis ~0,92) → Päätoimittaja → omistaja ennen junaa.
  13.4x: haara nyt 688d6b4e (tyylikirja.json peruttu: luodaan webistä, tiivistetarkistus; luettelorivi Päätoimittajalle).
  Koehaara natiivi-ui/latauspalkki-koe 2ea2528f (+ kytkentärivi, EI mergetä) käännetty siirtoseppa/linna-143:n kanssa
  → b274b20c (MATKAKIRJA_KIRJASTOT=…/_lahteet/unity-paketit-siirtoseppa/kirjastot pakollinen Cinemachinen takia).
  Stillit latauspalkki/latauspalkki-arkki.jpg lähetetty Päätoimittajalle 13.4x (odottaa omistajaa). Löydös Siirtosepälle:
  LatausOsuus 99 % jo 13 s, avaus 27,6 s. Kytkentärivin lisää Siirtoseppä omaan haaraansa.
  Päätoimittaja 13.5x: ulkoasu hyvä, stillit omistajalla; 99 %-pysähdys Siirtosepälle. Tyylikirja: web-PR #3998
  (Julkaisija mergeää vihreänä), natiivin kopio latauspalkki 62bafb4a (lähde f3ec57932a52). Merge-pyyntö Natiivisepälle
  vasta, kun omistaja hyväksyy JA Siirtosepän ajoituskorjaus on mukana.
  14.04: ajoitus todennettu 1e32f0b1:llä (linna-143 3be07c30): 1. avaus 1→92 % 15 s, 100 % 15,4 s; 2. avaus 49→87 %,
  100 % 6,6 s (lq-alku-stdout.txt, q1/q2-kuvat). ODOTTAA vain omistajan hyväksyntää → merge-pyyntö latauspalkki 62bafb4a;
  kytkentärivi Siirtosepän haarassa.
  OMISTAJA HYVÄKSYI 14.0x → merge-pyyntö Natiivisepälle junaan 144 (latauspalkki 62bafb4a ensin, sitten linna-143
  kytkentärivillä). Web #3998 mergetty. Worktreet wt/natiivi-ui-tyylikirja-latauspalkki (web) ja proto latauspalkki
  poistetaan, kun juna 144 on masterissa.

## Versio Peli päivittyi -ruutuun (omistaja 5.10. 14.2x) — avoinna
- natiivi-ui/paivitys-versio ba181e97 (master a5a18288): MitaUutta.Dialogi lisää KORTIN kapiteelin "Versio 1.1 (144)"
  (Application.version + MitaUutta.Build() = rakennus.txt ← PlayerSettings.iOS.buildNumber, Rakennus.cs) molempiin
  dialogeihin; teksti näyttöhetkellä (PaivitaVersio). Simussa build = 0. Testi `ui mitauutta paivittyi`.
  Seuraava: käännös + stillit iPhone/iPad → Päätoimittaja → merge-pyyntö Natiivisepälle junaan 144.
  14.33 stillit versio/i-paivittyi.png, p-paivittyi.png; 878c7acd korjaa Mitä uutta -kortin napit (i-mitauutta-korjattu.png).
  Lähetetty Päätoimittajalle 15.07 (odottaa).

## PUHUJAKUVA (omistaja 5.10. 14.3x, kortti "Ensin kappelin koe") — avoinna
- natiivi-ui/puhujakuva 48535d12 (master a5a18288): UI/Linssit/Puhujakuva.cs (+.meta) kehyksetön kuva, ellipsimaski alfaan
  (GPU-kopio, 256 px), ankkuri maailmasta ruudulle joka ruudulla, häivytys 200 ms, ristiinhäivytys, leveys 22 % lyhyemmästä
  sivusta (72–140 pt). Linssit.uss .mk-puhujakuva. Paikkamerkit Resources/Puhujakuvat/*.png (11 kpl, Linnanrakentajan CC0
  rintakuvat _valmiit/linna-hahmot/rintakuvat-paikkamerkki, rajattu). Testi `ui puhujakuva <kuva> [x y]|pois`.
  Kytkentä Siirtosepälle (Ankkuri, Kamera, Viimeisin.Aseta(henkilö, ilme)); odottaa hänen SHA:taan → yhteiskäännös →
  still + video Päätoimittajalle. Myöhemmin: web tyylikirja.json PUHUJAKUVA-pohjan rivi (PR kuten #3998).
  15.0x KUVATTU fa912f5e:llä: puhujakuva/puhujakuva-arkki.jpg + puhujakuva-kappeli.mp4 → Päätoimittajalle (odottaa).

## Kohdekortti heiluu (omistajan bugi 5.10. 14.4x) — avoinna
- natiivi-ui/kutsu-paikallaan 4ae969b7 (master): syy Kutsuminiatyyri asettui UiKerros.JokaRuutu-vaiheessa (Update,
  järjestys määrittämätön PalloKierto.Updaten kanssa) → kortti jäi ruudun kamerasta. Korjaus: UiKerros.KameranJalkeen
  (UiKameranJalkeen, DefaultExecutionOrder 20: kameran jälkeen, ennen PreLateUpdaten UITK-päivitystä) + pikselikohdistus
  fyysisiin pikseleihin. Huom: kamera liikkuu myös korutiineissa (lennot) → niissä voi yhä jäädä ruutu. Todiste: oikea veto
  simuun, video ennen (app-736578a7 = master+versio) / jälkeen, ero kortti–kaupunki ≤ 0,5 pt ruuduittain.
- 15.0x: yhteiskäännös fa912f5e (kutsu + puhujakuva-koe a8f6465e + paivitys-versio 878c7acd). Kohdekortti EI näy Ateenassa
  masterissakaan (ui kutsu: piilossa) → todiste puuttuu. Haara nyt d7f859cf: UiKameranJalkeen omaan tiedostoon + ui kutsu
  kertoo piilon syyn (Syy()). Seuraava vuoro: syy → veto ennen/jälkeen, kutsu-ero.py (skriptit) mittaa kortti–nappula-eron.

## Tila 15.5x
- kutsu-paikallaan d7f859cf: todiste kutsu/kutsu-ennen-jalkeen.jpg + videot; vaakaero jälkeen ≤ 0,81 pt (180/197 ≤ 0,5),
  ennen ≤ 16,7 pt (skriptit/kutsu-ero.py). Lähetetty Päätoimittajalle kuitattavaksi.
- paivitys-versio 129a2513: merkinnät "1.1 (143)" ym. (versio/i-mitauutta-build.png) → kuitattavaksi.
- kortti-tiivis a7757d06 (linna-143 e7ad0d38 päällä, mukana siirtoseppa/puhujakuva-koe 1ae53205:ssä): Siirtoseppä todensi
  105c9ed8:lla; havainto: puhujakuva osuu tiivistetyn otsikkorivin päälle → korjattava (puhujakuva ei otsikkorivin alueelle).
- Puhujakuva ei junaan 144 (Codexin kuvat + omistajan kappelikoe).
- 15.5x KUITATTU junaan 144: kutsu-paikallaan d7f859cf ja paivitys-versio 129a2513 → merge-pyynnöt Natiivisepälle lähetetty.
- TUNNETTU (ei korjata nyt, Päätoimittaja): Ateenan kutsukortti voi jäädä piiloon, kun sen lukittu paikka on peitossa
  (Kutsuminiatyyri: paikka lukitaan kerran kaupunkia kohden; `ui kutsu` → "syy: peitossa (lukittu)"). Vanhaa toimintaa.

## Astronautin kuvanäkymä (omistaja 5.10. 16.1x, JUNA 145) — avoinna
- natiivi-ui/astrokuva-tauko 047844b1 (master): Kuvanakyma II-tauko (OHJAUSNAPPI lasi-avaruus, AUTOn viereen; Puhe.Tauko/
  Jatka luennan aikana, AUTOn laskuri seisoo, kuvan vaihto/sulku päättää), AstronauttiLinssi.TaustaJaatyy (kamera liukuu vain
  avauksessa; LS1+LS2 kuittasivat; testi päivitetty, Linssit-testit 625/625), .mk-astrokuva tausta 0,9, Sijaintipallo.Sykahda
  (1,4×: 0,4 s ylös, 1,5 s pito, 0,6 s alas). Pelikoodarille tiedoksi Tauko/Jatka. Seuraava: käännös + still/video iPhone+iPad
  (mykistys! AUTO-luenta = Puhe.Lue-striimi) → Päätoimittaja.

## Pulun chat yhdeksi pohjaksi (omistaja 5.10. 16.4x–16.5x, JUNA 145) — avoinna
- Inventaario docs/raportit/pulu-chat-inventaario-20261005.md (kaikki 8 paikkaa PuluChatissa; valmiit vastaukset ISS-taulu,
  Ihmisen matka, maakuntakortti, Ihmisen nostokortti).
- natiivi-ui/pulu-chat-yksi e035e5dc (juna-144-koe ec0038f4): VastaaValmiilla/VastaaLinssinValmiilla → Kysy + `taustatieto`
  (Pelikoodarin worker-rajapinta, `jatkot` takuulla 2), sirut avatessa Take(2), kaiutin kaksitilainen (Ikonit kaiutin-pois,
  `matkakirja-pollo-aani`), lukijan rivi piiloon chatissa. Odottaa: Pelikoodarin workerin julkaisu → käännös → kuvat kolmesta
  paikasta rinnakkain (kartta, astrokuva/ISS-taulu, maakuntakortti) Päätoimittajalle. Astrokohteiden 472 vastausta
  taustatiedoksi myöhemmin (AstronauttiAineisto, Linssiseppä).
  Päätoimittaja 16.5x HYVÄKSYI suunnitelman 1–4. Todisteet: kuvat rinnakkain ISS-taulu / maakuntakortti / kartan Pulu (avaus +
  yhden vastauksen jälkeen) + lyhyt ÄÄNELLINEN video kaiuttimesta (Auto lukee, viiva ei lue, tila säilyy paikasta toiseen;
  ääni Unityn kaappauksesta, skriptit/jatka-aani.sh-malli, ei kaiuttimia).
- Astrokuva: natiivi-ui/astrokuva-tauko-144 0062cd81 (junan 144 päällä; II lukijan kaiuttimen kanssa, Päätoimittaja hyväksyi)
  odottaa NYT käännös (~16.35) + simu iPhone/iPad → still + video. Vanha natiivi-ui/astrokuva-tauko 047844b1 vanhentunut.
  16.4x kuvattu 5294a748:lla (astrokuva/astrokuva-arkki.jpg + i-astrokuva.mp4), lähetetty Päätoimittajalle. Löydös → bc66e66d:
  AUTOn napit eivät piiloudu II-tauolla. Todennetaan seuraavassa käännöksessä ennen merge-pyyntöä (juna 145).

## Tila 17.1x
- astrokuva-tauko-144 bc66e66d: tauon napit todennettu (b88675a3) → MERGE-PYYNTÖ Natiivisepälle junaan 145 lähetetty.
- pulu-chat-yksi: todennettu b88675a3:lla ISS-taulu ja maakuntakortti (2 kysymystä, elävä vastaus, 2 korvaavaa jatkoa, kaiutin
  viivalla, tila säilyy). Löydös kartan Pulussa (uudelleen avaus → 4 sirua) korjattu 89e861e5; todennus seuraavassa käännöksessä,
  sitten merge-pyyntö (juna 145). Arkki puluchat/puluchat-arkki.jpg. Pelikoodari kuvaa elävän vastauksen videon (app-b88675a3).

## Tila 17.3x
- pulu-chat-yksi d1d1f0ee: + keskustelu paikoittain (c55f4c12) + sirut kiinni (d1d1f0ee); todennettu a8ab3018:lla
  (puluchat2/puluchat2-arkki.jpg) → MERGE-PYYNTÖ Natiivisepälle junaan 145 lähetetty. Avoin: astrokohteiden 472 vastausta
  taustatiedoksi (AstronauttiAineisto, Pelikoodari + Linssiseppä).
- Junaan 145 lähetetty myös astrokuva-tauko-144 bc66e66d.
- Lukematon: puhujakuvan ja tiivistetyn huonekortin otsikon päällekkäisyys (Siirtoseppä 15.4x) korjataan puhujakuvan kanssa.

## Elävä opas (Linssiseppä, Päätoimittaja 17.5x) — avoinna
- natiivi-ui/pulu-sieppaus bb27e664 (pulu-chat-yksi d1d1f0ee päällä): PuluChat.Sieppaa (Func<string,bool>) ja Vastaa(teksti,
  jatkot). Linssiseppä kytkee OpasSovittimesta (linssiseppa/lontoo). Ei uusia UI-elementtejä. Todennus yhteiskäännöksessä hänen
  haaransa kanssa; merge-pyyntö sen jälkeen.
- 18.0x KIIRE (omistaja, juna 144): natiivi-ui/pulu-sieppaus a65000ff: + PuluChat.AvaaOppaalle/SuljeOppaalta, OpasValikko
  (LinnaValikon pohja: Vaihda kohde › maanosa › maa › 12 suurinta kaupunkia; Poistu linssistä; KohdeValittu-koukku), paikat.json
  LS2:lta (87863aae, maanosa 6. sarake). Linssiseppä kytkee heijastuksella (linssiseppa/lontoo) ja kokoaa yhteiskäännöksen.
  Masterin päälle (Linssisepän pyyntö, Cinemachine-esitarkistus): natiivi-ui/opas-master 1ee62e19 (sama sisältö ilman
  pulu-chat-yksiä; puhdas lontoon ja juna-144-kokeen kanssa).

## ISS-ohjaamo junaan 144 (Päätoimittaja kuittasi, Natiiviseppä 18.3x)
- natiivi-ui/iss-ohjaamo-144 2bb26db8 = ec0038f4 + LS2 a2941f8f + iss-ohjaamo-lcd (sis. paneeli 125809dc); konfliktit ratkaistu,
  tyylikirja uudelleen web-lähteestä (lcd-tokenit) → web-PR #4010 (Julkaisija mergeää). tarkista.sh ok, Linssit 658/658,
  Kartta 444/444. SHA Natiivisepälle lähetetty.

## Testiskriptit (lokit/natiivi-ui-1035/skriptit)
jatka-aani.sh (ääniraita = Unityn tallenne.wav; JATKA_TAP=1 oikea napautus), aanitaso.py (puhe > −32 dB),
iss-taulu-vaaka.sh (TAP_OHI=1), auto-zoom.sh (TAP_SEUR=1), lippu-kaikki.sh, chat-linna.sh, kartoitus.sh (+ k:-etuliite
kartan komennoille), xn-tap-alku.sh + xn-k.sh (oikeat napautukset simulaattorityökalulla). `ui napauta` ohittaa
osumatestin → todisteisiin aina simun oikea napautus.

## Tila 5.10. klo 21.0x: elävä opas kevyeksi ja nykyaikaan (juna 144)

- Proto: natiivi-ui/opas-kevyt 6eacdf49 (master-pohja, wt/proto-natiivi-ui-opaskevyt) ja junakoe-haara
  natiivi-ui/opas-kevyt-144 2a94735f (7b21e41a + opas-kevyt, wt/proto-natiivi-ui-opaskevyt144), lähetetty Natiivisepälle.
- Sisältö: chat ei aukea itsestään, irrallinen sirurivi (2 vaihtoehtoa + puhu/kirjoita, sanelu), Näytä teksti valikkoon,
  ✕, yläpalkki ja Pulu pois, kuvakortti + kuvakytkin (OpasKuva, Pöllön "kuvat"), sirut krediittien yläpuolelle
  (CesiumKaupunki.KrediititKorkeusPt), Kirjasin Moderni (SF Pro) ja harmaa lasi (omistaja 20.5x).
- Web: #4014 (SIRURIVI IRRALLAAN) mergetty, #4020 (fontit.Moderni) Julkaisijalla.
- Kesken: Päätoimittajan iPhone (vaaka) ja iPad -kuvat Natiivisepän viimeisestä kokeesta (~21.45 jälkeen) skriptillä
  lokit/natiivi-ui-1035/skriptit/opas-kuvat.sh <UDID> <nimi> <app> vaaka; peitto: ui opasvalikko peitto.

## Tila 5.10. klo 22.5x: juna 144 lähti tunnetulla Amsterdam-vialla, korjaukset junaan 145

- TF 144 = Natiivisepän koe 4 (921a1a80 = 05be475a + b78ac2ae), omistajan VIE tunnetulla vialla: oppaan valikossa
  ensimmäinen napautus uudelleen rakennettuun ScrollView-listaan (Alankomaat → Amsterdam) katoaa, toinen toimii.
- Juna 145 -korjaus: natiivi-ui/opas-kevyt-144 74864d87 (vanhat rivit piiloon valikon lapsiksi + uudelleenohjaus
  sijainnin mukaan + UiKerros.MitatoiKosketusvalimuisti). EI vielä todennettu: käännös omalla vuorolla (~23.2x) ja simu
  FB234D08: ☰ (374,90) → Vaihda kohde (273,146) → Eurooppa (211,369) → Alankomaat (218,201) → Amsterdam (217,243),
  loki "opas: kohde Amsterdam"; 5/5 kaupunki, 5/5 maa, ☰ heti valinnan jälkeen.
- Juna 145 muut: natiivi-ui/opas-tapit b88785a5 (tapit + nimilappu + yllä oleva korjaus), natiivi-ui/puhujakuva-145
  6f733f2e (Codexin 4 kuvaa; Siirtosepän kappeli-145 0ca128fd kytkee ja tekee videon).

## Tila 6.10. klo 00.0x: juna 146 -ehdokas natiivi-ui/pin-palkki c7fb7875

- Sisältää: nimikyltit 3 s (Nimikyltti.cs; kartuscha, maakyltti, mastonimi, aikajanan ylärivi, pallon nimi, oppaan nimilappu),
  oppaan valikon maa/kaupunkiäänet ISO2:lla (OpasSovitin.MaaValittu / VaihdaKaupunki(…, iso), heijastuksella), Amsterdam-
  korjausyritys 3 (OpasValikko.Napautus: valikko ratkaisee rivin sijainnista TrickleDownissa ennen ScrollViewia; ScrollView
  Clamped + inertia 0), PIN-KUVAKE JA PINNATTU PALKKI (Pinnaus.cs; Nostokortti/PuluChat pin, Pelikoodarin Puhe.Pinnaa e7f981a4),
  tyylikirja PINNATTU PALKKI (web PR #4035). Lisäksi 146:een pollo-testitunnus 2a32671a.
- Amsterdam: BUILD 144 ja juna 145 (74864d87) molemmat 0/1 ensimmäisellä tapilla → 145:n muutoslokissa "tunnettu". Todennus
  junan 146 ensimmäisestä käännöksestä (5/5 kaupunki, maa, ☰) + Päätoimittajan pin-stillit (ikkuna + palkki, ui pinnaus palkki).
- Odottaa: Päätoimittajan kuittaus c7fb7875 Natiivisepälle; juna 146 kootaan TF 145:n päälle.

## Tila 6.10. klo 00.3x: junan 146 Natiivi-UI = natiivi-ui/opas-kuvat c29f57af (kuitattu, käännös klo 10)

c29f57af = opas-taky 7cd1b88d (pin-palkki, nimikyltit, ISO2-äänet, Amsterdam-korjaus 3, pause, täkyluettelo + LS1 5f4e8d56)
+ oppaan useat kuvat (+N-kuvalaskuri, Kuvasuurennos sarjana; Pelikoodari: "kuvat" enintään 8).

HETI klo 10:n käännöksen jälkeen (Julkaisijan SIMU NYT, FB234D08), stillit Päätoimittajalle ennen VIE 12:
1. Amsterdam 5/5 oikeilla tapeilla: ☰ (374,90) → Vaihda kohde (273,146) → täkynäkymä! (Vaihda kohde vie nyt täkyihin;
   maanosat ovat "TAI VALITSE PAIKKA" -osiossa vieritettävinä → ota koordinaatit kuvasta) → Eurooppa → Alankomaat →
   Amsterdam; loki "opas: valikon rivi" + "opas: kohde Amsterdam". Myös maataso ja ☰ heti valinnan jälkeen.
2. Täkyluettelo avautuessa (linssi opas → valikko aukeaa täkyihin), pause II/▶ (ui opasvalikko tauko), Tai valitse paikka.
3. Pin: nosto auki → pin-kuvake → kartan veto → palkki (myös `ui ui pinnaus palkki` kuvaksi).
4. Kuvat: `ui ui opasvalikko kuvasarja` → +2 kortti; napautus → selaus 2. kuvaan (pyyhkäisy) lähderiveineen.
Huom: testikomennot vaativat "ui "-etuliitteen tekstissä (xn-k.sh U ui "ui opasvalikko …").
