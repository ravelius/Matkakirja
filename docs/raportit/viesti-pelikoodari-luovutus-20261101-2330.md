# Pelikoodari: luovutus 1.11.2026 klo 23.30 (konteksti 25 %, pehmeä raja) – KIIRE: TF 217 odottaa korjauksiani

Edellinen: -20261101-1625. Muistin tila: pelikoodari-tila-20261018-aamu.md.

## Valmista tässä vuorossa
- Kivi-216b mergetty runkoon (juna-216). Tallenne leivotulla valolla 165033 → Meridiaaniportin kaari ei näy, PT KUITTASI portin.
  Botin uupumiskorjaus: PT EI (elinvoima-apu riittää).
- Worktree-siivous: v98c ja yhd-216 poistettu (proto-git `worktree remove`), Postivahdille kuitattu.
- OMISTAJAN VIDEO (PT 22.46): juna 217 runko 6ba27bf5b, Ultra → _tyo/pelikoodari/tallenne-217/20261101-224822-alku-ja-juoksu.mp4
  (KK:lle ja PT:lle). Omistaja 23.0x–23.2x: "Pelissä on paljon bugeja." + "eunukkeja on liikaa ja ne eivät tee mitään ja alun
  3 2 1 puuttuu sekä lähtö sisältä". PT:n tilaus junaan 217 (TF 217 odottaa): 1) eunukkeja vähemmän, jokaisella tehtävä (jahtaa/estää),
  2) 3-2-1 alkuun, 3) lähtö sisältä kujan perän ovesta (27.10. 08.26), 4) bugit, sitten uusi tallenne omistajalle (KK local_37f7c945…
  + kopio PT:lle).

## Haarat (proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, EI originia)
- pelikoodari/korjaus-217 (worktree wt/proto-pelikoodari-korjaus-217), pohja 6ba27bf5b: **35fe715be** NS:n kansionvaihto (rakennukset
  v91 → kielletty-rakennukset-v92, tausta v90 → kielletty-tausta-v91). NS: tee korjaukset SAMAAN haaraan, SHA NS:lle kun valmis;
  JU vie paketit v92/v91 ja kuittaa PK:lle (odota kuittaus ennen tallennetta).
- pelikoodari/tallenne-217 (worktree wt/proto-pelikoodari-kivi-216), 6ba27bf5b + tallennetuki (cherry-pick 1a94eac8b, 3d05d3640)
  + **7ddd353e8** Esikatselu: UI-kerrokset tallenteeseen (TallenneUi; aiempi tallenne oli ILMAN UI:ta → 3-2-1 ja kuvatekstit eivät näkyneet
  videossa, vaikka avaus: Laskenta3/2/1 lokissa). Editorityökalu, ei pelikoodia; kääntämätön ennen diagnostiikka-ajoa (katso tulos).
  Uutta tallennetta varten: merge korjaus-217 tähän (tai cherry-pick tallennetuki + 7ddd353e8 korjaus-217:n päälle).

## Ajotyökalut (_tyo/pelikoodari/tallenne-217/)
- aja-sk.zsh <skenaario> <nimi>: odottaa vapaan koneen, ESIKATSELU_LAATU=Ultra, ajaa pelikoodari/tallenne-217, tekee <aika>-<nimi>.mp4.
  HUOM: ajaa haaran tallenne-217 (vaihda haaran nimi, jos teet uuden). Simua ei tarvita (editori, esikatselulinja 2).
- sk-tallenne-217.txt = omistajan video (taso 0 = "entinen juoksu", botti pois latauksen ajan, `avaus nyt` tallenteen alussa).
- sk-taso1.txt = DIAGNOSTIIKKA taso 1 + opetus nollaa, UI mukana: ajossa 23.2x (lokit/esikatselu-20261101-23xxxx, aja-taso1.log).
  Tarkista: näkyykö ovesta lähtö (avaus: OviAukeaa), 3-2-1 videolla, eunukit.
- Video alkaa ~23 kuvaa vanhaa juoksua ennen avausta → leikkaa ffmpeg -start_number (ks. 224822: 24).

## LÖYDÖKSET
1. 3-2-1: tallenteen vika (UI puuttui), ei pelin; korjattu 7ddd353e8 (varmista diagnostiikasta).
2. Lähtö sisältä: tuotannossa JuoksuTaso.Nykyinen = null (= "entinen juoksu", JuoksuTaso.cs:44); taso 1 (työhuoneen ovesta kujalle,
   kurkistaja, opetus) vain QA:lla `taso 1`. Korjaus: `public static JuoksuTaso Nykyinen = Taso1;` (Taso1 määritelty ennen).
   Tarkista testit (Peli-testit), ja että taso 1:n Maali "6.4,-190.7" on hyväksytty (KK:n tavoite 27.10.: taso 1 = alkukohtaus,
   opetus, ulkokujat + aukio; loki paatokset-2026-10.md:2790).
3. Eunukit (Sonnet-kartoitus): "tekemättömät" = odottavat vartijapatsaat (JuoksuV4Maailma.cs:2741-2750 LisaaEnnakot, koko palatsi
   AlueSade 1200, piirto LahiRaja 120 m, idle 60 m) + näkymättöminä ohitetut (Nahty, JuoksuV4.cs:2233-2260) + sivuvartijat, jotka
   eivät kata kaistaa ("kierti"). Tiheys: JuoksuV4.cs Sisalto :1143-1175 (n<2 ei vartijoita; v<0.4 sivulta jos sivu auki,
   0.4–0.65 edestä; peilivartija 40 %), täydennys Taydenna :436-446 UusiVartijaOsuus 0.5. Ehdotus: harvenna (esim. vartija joka
   2.–3. täysikujalle, peilivartija pois, täydennys pois/0.25) JA vartija, joka ei lähde (ei nähty), ei saa seistä näkyvissä:
   piilota/poista se tai anna sille tehtävä (estää: seisoo keisarin kaistalla, pakottaa väistämään). Takaa-ajaja (yksi) = jahtaa.
4. Omistaja/PT: sivuaskel ~0.47 ja nykäisy ~0.39–0.44 videossa 224822 ("ollut aina"): kuvat 2185–2210 (peliaika ≈ 211 s): keisari
   loikkaa vasemmalle ulos kuvasta, kamera jää, sitten kuva hyppää toiselle kujalle (frame ~2215) = käännös sivukujaan tai
   uudelleensijoitus; pelin mittari EI havaitse (kamerahyppyjä 0). Selvitä: botin käännös/kaistanvaihto (JuoksuV4Saanto, autopilotti)
   ja kamera käännöksessä; tarkista myös pelaajan ohjaus.
5. KK 0.41: punainen seinäpala vasemmalla vinossa (kuva ~1975–2075, arkki scratch) → paikanna `ui juoksupeli mika x y`
   samasta hetkestä; jos malli → rivi Lavastajalle (nollautumassa, luovutus de01a325a).
6. KK:n koko bugilista (läpi meneminen, leijuminen, kameran hypyt, puuttuvat tekstuurit ja varjot, aikaleimat) tulee PT:ltä perässä.
   Lokissa: ETC-varoitukset p-kujaportti lod1 runko+palkit (1024×51) ja a-meridiaaniportti lod1 katto mip (128×122) → puuttuvat
   tekstuurit? → Lavastajalle (mitat 4:n monikerroiksi).

## Kesken / seuraava (järjestys)
1. Lue diagnostiikka-ajon tulos (sk-taso1) ja tee korjaus-217:ään: taso 1 oletukseksi (2), eunukit (3), bugit (4–6).
2. tarkista.sh + testit, SHA NS:lle (local_99130238-aa54-4a29-bcc9-7a023584944b) ja PT:lle.
3. Uusi tallenne omistajalle (taso 1, opetus kuten uudella pelaajalla, UI mukana) → KK + PT.

## Lisäys 23.3x (PT, omistaja nukkumassa, yölupa loki PR 5920)
TF 217 lähtee yöllä, kun korjaukset (taso 1 oletukseksi, eunukit harvemmiksi + tehtävä, 3-2-1, sivunykäykset, seinäpala 0.41) ovat
haarassa → SHA NS:lle runkoon ja uusi tallenne (UI mukana) PT:lle (EI KK:lle yöllä). PT katsoo videon ja tilaa TF:n.
