# Päätoimittajan luovutus 26.10.2026 klo 15.45 (talviaika EET; konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261026-1354 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47 (PT: luvut 7, 8, 9, 12, 14, 4.1).
Session alussa: Asemataulu open, Monitor odottajat-vahti.py + codex-posti-vahti.sh (Shared/Claude/hooks), git fetch origin claude/postilaatikko.
VIESTIT: send_message session-id:llä. Omistaja koneella (KK:n kortit). Viikko 95 % (nollautuu to 30.10. klo 07): vain junan 211 työtä.
Keskustelutallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-26-klo-1357-1538.md

## 0. TÄNÄÄN 13.58–15.45
- Merget: 5242 (luovutus), 5243 (oppi: Ison iPadin ajot yksi kerrallaan), 5244 (Raamattu 12.17 iPad-vuorolukko, JU), 5245 (oppi: omistajalle
  vain asennetusta versiosta todennettu). AUKI: PR 5246 (Raamattu 4.41 KOKO SIDOTTU KARTTAAN + loki 15.32) → JU mergeää vihreänä.
- Levy: siirra_t7 --aja 15.41 → 37,4 G T7:lle, vapaana 116 Gi.
- iPad-vuorolukko: NS d832f38a9 (tyokalut/ipad-lukko.sh kaari <rooli> -- <komento>); NS ohjeistaa roolit LT:n uusinnan jälkeen.

## 1. KESKEN NYT (seuraa näitä ensin)
- OMISTAJAN PYYNTÖ 14.32 (iPad Pro 11, UDID 00008142-0019686E02F3801C, suoraan ilman TF): ASENNETTU 15.04 af94882a9. VIRHE: 3D-sarja
  ei piirtynyt (Symbolimallit.Nollaa) → KK:lle oikaisu lähti. Korjaus 6922da400 → NS 847ea4b19 vihreä 15.37, EI asennettu (peli auki).
  Seuraava 114803c2e (+ PK palkisto 8909b463f + LR avoimet-v49) laitekäännöksessä. KETJU: NS ilmoittaa 114803c2e vihreäksi → välitä
  LT:lle (odottaa: simukuvat Eurooppa + Lontoo lähi, 3D-sarja näkyy) → PT tarkistaa 1:1 → KK:lle: "asennus sulkee pelin, milloin sopii?"
  → omistajan vastaus → NS:lle "ASENNA PAKOTA pieni" (ja iso). Asennuksen jälkeen rivi KK:lle vain todennetuista asioista.
- OMISTAJAN PALAUTE 15.32 kartasta (loki + työlistarivi "Tarkan kartan korjaukset iPadin palautteesta"): KS tekee 5 kohtaa (rautatiet
  hillitysti yhdeksi linjaksi, nappula ja piste lukittuina, 3D-kohteet karttaan sidottuina + pehmeä häivytys pienempään, panorointi
  sujuvaksi iPad Pro 11:llä, isot kaupungit kauempaa). Kuvat 3 zoomtasolta ennen/jälkeen + video → PT 1:1 → KK. Sitten asennus pieneen.
- Latauskuva (omistaja 13.32 + 14.13 "Vaakamuodossa pitää myös näkyä keisari kokonaan latautumiskuvassa."): Codexilla (posti 4dd682937 +
  7e5361656, vaaka 2560×1180, keisari keskimmäisen 55 %:n sisällä + rajat-JSON 5b439369b). PK tekee asettelun (koodi 2d0455df3 valmiina),
  NUI:n palkki 5abdf79e6 rungossa (vaakassa otsikon yläpuolella, seuraa VaakaOtsikkoa). Pelikuvat vaakana iPhone, iPad, Mac → PT → KK.

## 2. JUNA 211 (runko NS 847ea4b19 → 114803c2e; b6, Metal 440/0)
- Rungossa: elävä kartta koko maailmalle (KS 5dab5b434 + 6922da400), elävyyspaketti (PK; video EI vielä omistajalle: ääniraita puuttui,
  KUORMA, uusi video vasta kun v57-tausta rungossa), avoimet hallit b23fc0ccb, VS aukio acd2dac44, LR rakennukset-v48 79a7f3ad1,
  avoimet-v49 437f03035, NUI latauspalkki, lautaspöytä.
- LT: b6-reittiajon uusinta Isolla iPadilla, kun thermalState 0 ja vain LT komentaa (13.53-ajo hylätty: kuuma + PK:n rinnakkaisajo).
- VS: P43 osoitti, että porttihallin seinäkiilat ja aukion kaistat ovat v56-taustan LEIVOTTUA valoa (poistetun geometrian varjot);
  P44 ajossa. Uudelleenleivonta samaan tausta-v57:ään LR:n valkoisen viivan korjauksen kanssa (VS ja LR sopivat, yksi v57; pari PT:lle).
  Sitten muurikatteen raidat (k3-kattovarjostin) ja P44 kujan aurinko (havainne-pari 01).
- LR (nollattu 15.38, luovutus 4d513229d): tausta-v57 (lattian kiilaraot + leivonta VS:n kanssa), sitten sali VS P42:n mukaan.
- KS: 1) omistajan palaute 15.32, 2) Tripo-vertailu (c3dbcfea5: vain Colosseum vaihtui, Tripo-malli pystyssä, #812 akseli/pohjoinen;
  Matterhorn ja Kinderdijk toisella piirtopolulla). PT:n lupaus KK:lle: vertailukuva pelistä + YKSI kortti "tehdäänkö koko sarja Tripo-
  malleina". 3) Tasankojen pohja-ajo, kun Mac joutilas ≥ 10 min (resepti e6e71a013).
- PK: JONO TYHJÄ 15.4x (odottaa Codexin latauskuvaa ja v57:ää elävyysvideoon).
- NUI: latauspalkki valmis; seuraavaksi palkki uuteen vaakakuvaan PK:n kanssa.

## 3. ODOTTAA OMISTAJAA
- Asennushetki iPad Pro 11:een (kysytään KK:n kautta, kun 114803c2e todennettu).
- Näytettävät (PT tarkistaa 1:1 ensin): kartan korjaukset (kuvat + video), latauskuva vaakana 3 laitteelta, juoksijan elävyysvideo
  äänellä, Tripo-vertailu + kortti, Tanska-pari (tasangot).

## 4. Opit (lokissa 5243, 5245)
- Ison iPadin ajot yksi kerrallaan, vuorolukko kaaren kautta; uusinta vasta kylmällä laitteella.
- Omistajalle kerrotaan versiosta vain se, mikä on todennettu siitä käännöksestä (kuva), ei roolin muutoslistasta.
