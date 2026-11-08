# Natiivi-UI: luovutus 8.11.2026 klo 11.20 (lippu 4.42, kohokartta 90° ja topoesittelyt-pilotti tehty; kaikki kolme odottavat JU:n ajoa)

Korvaa luovutuksen -1025 (171cbc6fb); sen kohdat 1 (puupari p2), 2 (kohokartta junassa 221) ja 3 (merenpohja) sekä Opit ennallaan: lue ne
`git show 171cbc6fb:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1025.md`.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (puhdas, haaralla natiivi-ui/topoesittelyt-221), etäpää natiivi-backup.

## JONON KÄRKI (PT 11.4x, OMISTAJAN PYYNTÖ 11.43 KK:n välitys; koskee junaa 222): KARTTA LUKITTU, Raamattu 2.216
"Nimikyltit ja kaikki muutkin asiat kartalla pitää olla lukittuja eli eivät saa liikkua": kartta kuin painettu; nimet, kyltit, kuvakkeet, puut ja kohteet
kiinni pinnassa; panoroidessa ja zoomatessa mikään ei väistele, hyppää (ehdokaskehä, nostojen sovittelu) eikä liu'u. Ei limitystä pysyy (paikoilla,
ei liikkeellä). Poikkeus: lipun suunta (4.42).
TEHTÄVÄ: SELVITYS ensin iPad-panorointiajosta (Pariisi + yksi muu kaupunki + pallo): mikä liikkuu kartan suhteen ja miksi (koodikohta). Nimien
syttyminen/sammuminen liikkeessä: vain mittaus, ei muutosta ilman korttia. Tulos + pari (sama rajaus, ennen/jälkeen-kehys) PT:lle → KK.
Pohja: sk-puut-panorointi-1/-2 (kuvat kesken liikkeen, `ui kartanelama tila`); ajo JU:n vuorolla. Tämä ENNEN esittelyjen ☰-valikkoselvitystä.

## JONO (järjestys)
1. LIPPU 4.42 (OMISTAJAN PÄÄTÖS 10.32): TEHTY 1f26c51b4 natiivi-ui/lippu-442-221 = juna 221 5d6967444 + 6834a6711/311eacd76 kumottu
   (Lipputanko.cs = 6834a6711~1: tanko radiaalisesti, kangas itään, varjo pohjoiseen). unity 0, 2261/710/871.
   JU-ajo sk-lippu-442-1.txt → proto-3d/lokit/nui-lippu-442-1-1f26c51b4 (JU 10.58 jonossa; iPadin käynnistysvika 10002, JU uusii f1c:llä).
   SEURAAVAKSI: katso kuvat (keski: lähes näkymätön; ala: tanko alas; reunat ulos; käännetty 135/270: säteittäin ulos; tarkista ettei
   kangas painu karttaan käännetyllä, sitä 6834a6711 aikanaan korjasi) → pari KK:lle PT:n kautta (keski, ala, reuna, käännetty).
   Lipun jalka kalibroitu 5.11. kuvista ~48,3 N 4,47 E (kaari 0.212); jos osuma heittää, korjaa skenaarion keskipisteet.
2. KOHOKARTTA (PYYNTÖ 10.36 + PÄÄTÖS 10.38): TEHTY b4e624cfe natiivi-ui/kohokartta-90-221 (juna 221 pohja): PalloKierto.VapaaKallistus
   90° kohokartassa kaikilla korkeuksilla (Topografia.AsetaVapaaKallistus kertoimen kanssa; NaN muualla), PlayerPrefs-oletus 1,
   kytkin ☰:n sisään (LinssiValikko kytkimet, ylin), Topografiassa yläpalkki + taikalasit piiloon ja ☰ oikeaan yläkulmaan 12/12.
   2262/710/871. JU-ajo sk-kohokartta-90-1.txt (iso iPad; iPhone irti → pyysin iPhone-simua, kansio …/iphone-simu).
   Riskit katsottavaksi: 90° matalalla koho×15-vuoret voivat leikata kameran; oletus-koho näkyy laitteella vain ilman aiempaa valintaa.
3. TOPOESITTELYT PILOTTI (OMISTAJAN PÄÄTÖS 11.04, suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-topokohteiden-esittelyt.md):
   TEHTY 581f7f85a natiivi-ui/topoesittelyt-221 (= b4e624cfe + esittelyt). Ydin Linssit/Ydin/TopoEsittely.cs (kohteet, lento 6 s → kyltti 3 s
   → valmis, tauko/jatka/toisto, koukku TopoEsittely.Kamera NS:lle), Topografia.AloitaEsittely, UI UI/Linssit/TopoEsittelyNakyma.cs
   (☰ › Esittelyt, ISS-paneeli + RuudunSisus, kyltti NYT-rivin pohjalla, ⏸/▷ ☰:n vasemmalla). Komennot `linssi topografia esittely …`,
   `ui linssi esittelyt [auki|kiinni|n]`. 2265/710/871. JU-ajo sk-topoesittely-1.txt VIDEONA → lokit/nui-topoesittely-1-581f7f85a.
   SEURAAVAKSI: katso video ja kuvat → video KK:lle PT:n kautta. Odottaa muilta: NS kierto/suunta koukkuun, KS kohdelista + ruutukuvat
   (TopoKohde.KuvaUrl), SK tekstit/kyltit (ui.topoesittely.*), Äänittäjä William (kertojaa ei vielä kytketty; Kiinan KiinaKertoja-malli).
4. Puupari p2 (50200fb68, JU ajaa) ja merenpohjan parit 1–5: kuten luovutus -1025 kohdat 1 ja 3.

## Opit (uudet)
- zsh: `echo ===` kaatuu (=-laajennus); älä käytä ==-alkuisia sanoja komentoriveillä.
- Kohokartan 90°: PalloKierto.KallistusRaja + LaskeAsento-katto (KallistusKatto) + `kallista`-komennon katto, kaikki kolme.

## PÄIVITYS 11.2x
- Iso iPad: "failed to launch 10002 / POSIX 22" KAIKILLE tuoreille käännöksille (50200fb68, 1f26c51b4: 0 kuvaa); 5d6967444 toimi 10.55. Koodissa ei syytä
  (50200fb68 = vain puiden piirtojärjestys). JU selvittää: laitekäännöksen uusinta + tavallinen käynnistys. Parit KK:lle EIVÄT ole menneet (PT tietää).
- Esittelyn VIDEO vain Mac-esikatselusta (tallenne-alku/-loppu): sk-topoesittely-1-mac.txt → lokit/nui-topoesittely-1-581f7f85a/mac; iPad kuvina.
- MERENPOHJA (PT 11.2x): KS:n koko maailman poltto viedään kansioon julisteet/maasto/2026-11-08-kohokartta-merenpohja/ (ei -koe). Kun JU:n vienti
  valmis (tarkista https://media.matkakirja.app/julisteet/maasto/2026-11-08-kohokartta-merenpohja/layer.json = 200), vaihda KohokarttaMaastoOletus
  7ea8d6ebc:ssä (natiivi-ui/merenpohja-koe) tähän osoitteeseen ENNEN pareja 1–5. Jono: lippu → kohokartta → merenpohja.

## PÄIVITYS 11.3x: esittelyn 1. video katsottu, korjaus 6c27282e1
- JU:n Mac-video lokit/nui-topoesittely-1-581f7f85a/mac/topoesittely.mp4 (16 s): lento ja kohokartta hyviä (Alpit 55°, Himalaja), ⏸/▷ ☰:n vieressä.
  EI KK:lle: linssin kello (Time.realtimeSinceStartup) karkasi tallenteen pakatussa ajassa → "Valmis" ennen saapumista; alku 6 s Pariisin katupiirrosta.
  "komento kuva" ei tuottanut PNG:tä tallenteen aikana (JU:n työkalu).
- KORJAUS 6c27282e1 (natiivi-ui/topoesittelyt-221): kyltti vasta kun kamera perillä (paikka 5 % kaaresta, korkeus 10 %), varmistus 3 × lento. 2266/2266, unity 0.
- Skenaario sk-topoesittely-1-mac.txt päivitetty (aloitus Alppien yllä `aja 47 8 30`, odota-peli valikoille). Uusinta JU:lla → lokit/nui-topoesittely-1-6c27282e1/mac;
  iPad-ajo samalla SHA:lla. SEURAAVAKSI: katso uusi video (valikko, ruudukko, kyltti perillä, tauko ▷) → KK:lle PT:n kautta.

## PÄIVITYS 11.4x (viimeinen ennen nollausta)
- Esittelyn KYLTTI ei piirtynyt Mac-videossa (ruudut 6/s 4,5–8,5 s, vasen alakulma tyhjä, vaikka loki "näkyy"; PT huomasi). 48e5654ae: kyltti
  UiKerros.Valikot-turvaan (NYT-rivin kerros) + `ui linssi esittelyt tila` kertoo worldBoundin, opasiteetin ja visibilityn → katso lokista, jos yhä puuttuu.
  Ruudukko näkyy videolla 3,5–4,8 s (ALPIT, HIMALAJA tummina ilman kuvia). ☰ näkyy himmeänä (KehysNapit 0,2), se on oikein.
- AUKI: ☰-VALIKKO (LinssiValikko, `ui linssi karttavalikko auki`) EI NÄY: ei Mac-videossa (0,8–2,3 s) eikä iPadin k90-valikko.png:ssä (md5 = k90-alpit-90).
  Loki sanoo "auki True". Epäilyt: Ponnahdus-animaatio / TarkistaOhiNapautus sulkee / ruutukaappaus. Selvitä ennen KK-pareja (kytkin ☰:n sisällä on omistajan pyyntö).
- JU: kohokartta-90-1 iPad VALMIS 11.25 lokit/nui-kohokartta-90-1-b4e624cfe (8/8, huippu 3181 Mt) → KATSO kuvat ja tee pari. iPhone-simu tulossa.
  iPad 10002 oli ohimenevä; panorointi-2 ja lippu-442-1 uusintoina JU:lla. Topoesittely-1 nyt SHA 48e5654ae → lokit/nui-topoesittely-1-48e5654ae.
- 11.4x PUUPARI p2 KATSOTTU (50200fb68, iPad 11.35, 12/12): nimiltä 0 koko ajon, puut 37–43 k näkymän mukaan; Tuileries/Champs-Élysées/bulevardit täynnä
  puita (p1 tyhjä nimien kohdalta). Pari _tyo/natiivi-ui/puupari-p1-p2/pari-lepo-louvre-p1-vasen-p2-oikea.jpg lähetetty PT:lle (KK:lle); junaan PT:n sanalla.
- 11.5x NS:n topokoukku (b1d5c652f natiiviseppa/topo-esittelyt: kierto 9,6 s lennon jälkeen, esilataus, KiertoSuunta, Kaynnissa kierron loppuun)
  YHDISTETTY 756f4962d natiivi-ui/topoesittelyt-221 (+ kyltti perillä, koukun kanssa Perilla vain lat/lon). 2268/2268, unity 0. JU:lle: ajot 756f4962d:llä
  (48e5654ae saa valmistua, kertoo kyltin). JATKA AINA 756f4962d:n päältä.
- 11.5x 48e5654ae Mac-video (lokit/nui-topoesittely-1-48e5654ae/mac, 23,6 s): unity.log `esittelyt tila` → kyltti "ALPIT · Mont Blanc 4 806 m" Visible 24,964 194×25,
  opasiteetti 1 → kyltti piirtyy nyt (UiKerros.Valikot). Videon ruutuja EI vielä katsottu. JU ajaa 756f4962d (Mac + iPad) → katso se ja lähetä video KK:lle PT:n kautta.
- 11.48 LIPPU iPad 1f26c51b4 (lokit/nui-lippu-442-1-1f26c51b4, 8/8) KATSOTTU: KELVOTON – `aja … 0.212` = 23 km kaari, lippu ei missään kuvassa.
  Skenaario korjattu kaareen 14 (Ranska); uusinta JU:lla → lokit/nui-lippu-442-2-1f26c51b4. Katso, että lippu on keskellä/alhaalla/reunoilla.

## PÄIVITYS 12.1x: 2.216-selvitys ajossa, NÄHTÄVYYDEN NAPAUTUS osa 2 tehty (PT 11.56, OMISTAJAN PYYNTÖ 11.47 + PÄÄTÖS 11.55 "Lähestyy")
- 2.216: koodiselvitys proto-3d/_tyo/natiivi-ui/kartta-lukittu-selvitys-koodi.md (10 paikkaliikettä; pääepäilty Kohdenostot.cs:103–106 +
  PiirrosKerros.cs:827–832 kuvapisteliuku, sitten nimiön kylki Sovita, kaupunkipallon heilahdus, Nimikerroksen väistö ja vaakaan kääntö).
  iPad-ajo sk-kartta-lukittu-1.txt (Pariisi, Rooma, pallo; lepo A/B-parit + kuvat kesken liikkeen) JU:lla 756f4962d:llä →
  lokit/nui-kartta-lukittu-1-756f4962d. SEURAAVAKSI: katso kuvat ja `ui kohdenostot`-rivit (siirtymät px lepo A vs kesken), tee pari
  (sama rajaus, lepo/kesken) PT:lle → KK. Ei muutoksia ilman korttia.
- NAPAUTUS: ae84dd1dd natiivi-ui/nahtavyyden-napautus-222 (= 756f4962d + napautus, natiivi-backup), unity 0. UI/NahtavyysEsittely.cs:
  merkin napautus (kohdenosto-juttu, kadonnut ihme, kohde:-valo; ei 3D-kylttiä) → palkki + kertoja (Nostokortti.AvaaPalkkina,
  Nahtavyysarkki.AvaaKohdePalkkina: palkista arkki auki, luenta jatkuu, Sulje lopettaa) + lento (lähestyy kaari 0.012, ei loitonna)
  ja kierto ≤ 90° kohti pohjoista, kesto luettavasta 14 merkkiä/s (20–60 s), hiipuu kun kertoja lopettaa; piirroskartalla vain keskitys.
  NS:n koukut Kamera(lat,lon,h,s)/Hiivuta (nyt oletus: Aja 0,05 s + PalloKierron 0,8 s liuku = NS:n osa 1 pehmentää). Ääni = William (ok).
  `ui nahtavyysesittely 0|1|tila|kierto <ast> <s>|kaari <a>`. iPad-ajo sk-nahtavyysnapautus-1.txt JU:lla → lokit/nui-nahtavyysnapautus-1-ae84dd1dd.
  SEURAAVAKSI: katso 8 kuvaa (ennen, lento, keskitetty, kierto puoliväli, palkki, palkista auki, suljettu, sormi) → kuvasarja PT:lle → KK.
  Ei koeversioon ilman omistajan sanaa. Osa 3 (nimet lukittuna kierron aikana) 2.216-tuloksen jälkeen; jono sitten ☰-valikko.

## PÄIVITYS 12.2x: 2.216-MITTAUS KATSOTTU (lokit/nui-kartta-lukittu-1-756f4962d, 24/24)
- Tulos proto-3d/_tyo/natiivi-ui/kartta-lukittu/tulos-kartta-lukittu-1.md + 3 paria samassa kansiossa (lähetetty PT:lle).
- PÄÄLÖYDÖS: kartan nimet asettuvat SAMASSA kamerassa eri kohtiin kuljetun reitin mukaan (Pariisi lepo A/B: Palais Bourbon ylhäältä alas,
  Kunnialegioonan museo katosi; pallolla Marseille). Syy lepoladonnan muisti: NimiLadonta.cs:645–646 (edellinen väistöpaikka) + 667–668
  (Ehdokas.Edellinen). Puut seuraavat nimiä. Merkit EIVÄT liu'u (Kohdenostot-epäily ei näy); lähitasolla kuvat hyppäävät kyljeltä toiselle
  (Concorde 145 pt); nimet vaakassa kierrossa. Rooma A = B pikselilleen. Ei muutoksia ilman korttia; ehdotus: ladonta pelkästä kamerasta.
