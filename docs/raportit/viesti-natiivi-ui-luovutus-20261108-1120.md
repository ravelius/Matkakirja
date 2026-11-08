# Natiivi-UI: luovutus 8.11.2026 klo 11.20 (lippu 4.42, kohokartta 90° ja topoesittelyt-pilotti tehty; kaikki kolme odottavat JU:n ajoa)

Korvaa luovutuksen -1025 (171cbc6fb); sen kohdat 1 (puupari p2), 2 (kohokartta junassa 221) ja 3 (merenpohja) sekä Opit ennallaan: lue ne
`git show 171cbc6fb:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1025.md`.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (puhdas, haaralla natiivi-ui/topoesittelyt-221), etäpää natiivi-backup.

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
