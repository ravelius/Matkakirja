# Natiivi-UI: luovutus 14.10.2026 klo 13.0x (nollaus, PT:n pyyntö, konteksti 51 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261014-paiva.md (säännöt: PT
local_74630a27, viestit send_messagella id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md, PT:lle ≤ 3 riviä, ääni aina
mykistetty, nollaus Postivahdin kautta). Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012
(*-kuvat.sh = asettelutestit L2:lla irrotettuna perl setsid -kääreellä, pari-arkki.py / uusi-arkki.py). Arkit: proto-3d/lokit/natiivi-ui-arkit-189.

## Kuitattu tässä vuorossa (ei toimia)
- ISS AUTO natiivi-ui/iss-auto-189 8d66868f5 → NS junaan 190 (PT lähetti).
- ISS-kohdevalikko natiivi-ui/iss-kohdevalikko-190 f0b81abcc (ohjaamon yläpuolelle + uusinta-asettelu) → PK yhdistää iss-kupoli-190:een.
- Kertomuskuvat (isoisän ja Pulun kuvat 1,4 × + napautus → lisäkuvien Kuvasuurennos kokoruutuun) natiivi-ui/kertomuskuvat-190
  8d0bc0963 → NS junaan 190. Simulla varmistettu (todistus-kertomus-iphone-20261014-1247): pieni kuva näkyy oikein; asettelutestin
  valkoinen pieni kuva = editorikaappauksen ilmiö (myös masterissa), ei korjattavaa.
- Testihaara natiivi-ui/kertomus-testi-190 2ce55d706 (näkymät "kertomuskuva veljekset", vain testi, EI junaan). HUOM: worktree
  wt/proto-natiivi-ui-kertomuskuvat on nyt checkoutattuna tähän testihaaraan.

## Odottaa PT:n kuittausta
1. Metrokartta v2 natiivi-ui/metro-paperi-190 d9bf517fe: pergamentti (--tk-paperi-pergamentti), lista yläpalkin alle
   (OpasValikko.PalkinAlle: Ylapalkki.Varaus + Vali.S kuten hakunappi), iPadilla reuna 14 / ylä 16 pt. Arkki metrokartta-paperi-v2.jpg lähetetty.
2. Cupolan latausruutu raketin pohjalla natiivi-ui/cupola-latauskuva-190 63dac5092: NASA PD -kuva (Commons "ISS-43 Earth view from
   the cupola", Julkaisija VIETY julisteet/iss/cupola/20261014/cupola-latauskuva.jpg, LAHTEET _valmiit/iss-cupola-latauskuva-vienti-20261014),
   ISS + radan arvot raketin otsikkotyylillä alaosaan, nimilappu "Kuva: NASA" (ui.pro.kuva-tekija), asettelunäkymä "cupolan latauskuva".
   Ensimmäinen ajo: pysty + iPad vaaka hyvät, iPhone vaaka teksti kirkkaan Maan päällä → 63dac5092 kuva alareunaan leveällä ruudulla.
   KESKEN: ajo cupola-kuvat2.sh (iPhone) jonossa L2:lla → arkki (raketti | Cupola, kaava natiivi-ui-arkit-189/cupola-latausruutu-raketin-pohja.jpg) PT:lle.
3. ISS-palaute (omistaja 12.25, docs Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261014/iss-palaute-1225.md)
   natiivi-ui/iss-palaute-190, HEAD 0390f5786 (worktree wt/proto-natiivi-ui-isspalaute):
   - 5) Pulun rakettivinkki pois Cupolasta (AstronautinNakyma; ui.raketti.iss-vinkki poistettu). Ohjaamon "pois Pulua painamalla" -lappu jää.
   - 2) Lukema-pohja ja valikkorivit läpinäkyviksi: Codex-nahan 9-slice-kuvat readout + button-row EIVÄT ENÄÄ käytössä (IssOhjaus.LataaCodex),
     USS .mk-issohjaus__lukema / __rivinappi .mk-issnahka--perus,--codex = --tk-harmaa-kuulto-pinta + -nappi-reunus, .mk-isskyyti__teksti
     text-shadow. (Kuvat readout-*.png ja button-row-*.png jäivät Resourcesiin käyttämättöminä → poisto erikseen, kysy NS:ltä koosta.)
   - 4) RakettiNakyma uusiksi: alapaneeli pois, luvut AIKA/KORKEUS/NOPEUS/G-VOIMA otsikkoineen (lukema-teksti ilman laatikkoa, Mittari,
     Sovita lcd → kapiteeli, kapea < 560 pt = 2 × 2), alla Aikaselain-pohjan jana (.mk-aikaselain läpinäkyvä) tapahtumilla Max Q,
     1. vaihe irtoaa, Kiertorata, ISS (Nousu.Osuus(t) lisätty, RakettiLaukaisu kutsuu nakyma.Aikajana(t)), Käynnistä/Ohita IssOhjaus.Valikkorivi.
     Uudet avaimet ui.raketti.km/kmh/g/otsikko.*/tapahtuma.*. PT hyväksyi pohjat (lukema ilman laatikkoa + apuri-otsikot, aikajana, pienoispallo).
   - 6b) Pienoispallo Cupolaan: Sijaintipallo usealle instanssille (indeksi → 3D-paikka 10 × säde), YlaKulmaan(oikea, ylä) ilman kosketusta,
     AstronautinNakyma.KyytiPallo: oikea yläkulma ✕:n alle (12+34+8 pt), Kohteeseen(AstronauttiLinssi.AlusAlapiste()) 1 s välein (PK:n rajapinta).
     Asettelunäkymä "iss pienoispallo" (linna-osa).
   TEHTY 12.55: arkit iss-palaute-2-5-4-raketti.jpg (NYKYINEN | UUSI) + iss-palaute-6b-pienoispallo.jpg lähetetty PT:lle.
   Napit läpinäkyvät, otsikot ehjät, pallo oikealla ylhäällä. Faktalaatikko näkyy editorissa VALKOISENA laattana ilman tekstiä =
   pyöristetyn overflow-maskin editori-ilmiö (sama kuin kertomuskuvassa; ks. RakettiNakyma-kommentti) → varmista simulla
   (SIMU NYT Julkaisijalta; komento linssi raketti laukaise 0 auto, kuva alustalla). Jos simullakin valkoinen: mk-isskyyti__tieto overflow visible.
   (Vanha teksti:) ajo isspallo-kuvat.sh (linna "iss pienoispallo" + pallo "raketin paneeli*" HEADilla 0390f5786) → tulokset
   proto-3d/lokit/natiivi-ui-isspalaute-kuvat/{pallo,uusi2}; NYKYINEN = …/nyk (master). Ensimmäisessä UUSI-kuvassa (ennen 0390f5786)
   laatikko ja napit vielä tummat ja otsikot katkesivat — tarkista, että korjautui. → 2+5-arkki (iPhone pysty + iPad vaaka) PT:lle,
   sitten 4/6b-arkki (iPad vaaka + iPhone pysty). Junaan 190 kuittauksen jälkeen (SHA NS:lle; Nousu/RakettiLaukaisu-rivit tiedoksi PK:lle, hän teki Max Q -tärinän).

## JONO (PT:n järjestys)
1. Yllä olevat KESKEN-arkit (Cupola, ISS-palaute 2+5, 4/6b).
2. Tekstilaatikoiden läpinäkyvyys KAIKKIIN pohjiin (omistajan tyylipäätös 12.25: "myös tekstilaatikot läpinäkyviksi kaikissa peleissä ja
   linsseissä, ei pelkästään napit"): inventoi tekstilaatikkopohjat (lukema tehty; esim. opas-nimilappu, metrolinjan selite, nostot,
   linssien selitteet, kuplat) → ehdotus PT:lle listana ennen muutoksia (pohjat-taso, tyylikirja), arkki ennen/jälkeen.

## Opit
- Todistusajon skenaariossa EI riviä "aani mykistys 1": "aani" on äänikaappauskomento (kaatui, rivi 331). Mykistys on todistusajossa valmiina.
- ISS-ohjauksen oletusnahka on Codex (9-slice-kuvat koodista): USS-värimuutos --perus-luokkaan ei näy, ellei kuvaa poisteta (IssOhjaus.Kuva).
- Asettelutestin KUVAT-suodatin on tarkka näkymän nimi (NAKYMAT on alkuosa); "pallon kierros" on vaihe, ei näkymä → käytä "kierroksen kuvat".
- AsetteluTesti.cs (Editor) ei käänny tarkista.sh:ssa: apuri Myohemmin ei ole masterissa → schedule.Execute(...).StartingIn.
- Irrotetut ajot katkeavat session nollauksessa, ellei niitä käynnistetä perl setsid -kääreellä (issauto/kohdevalikko v4 kuolivat 11.4x).
- Levy: worktreet wt/proto-natiivi-ui-{issauto,kohdevalikko,kertomuskuvat} voi poistaa, kun NS/PK on ottanut SHA:t (git worktree remove).
