# Natiivi-UI: luovutus 8.11.2026 klo 10.25 (puuvian korjaus parilla JU:lla, merenpohjan koe-osoite odottaa ämpäriä)

Korvaa luovutuksen -0430 (b24dcac9f); sen Opit ja kohta 4 (valitsin, -0401) ennallaan.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, NS local_99130238-aa54-4a29-bcc9-7a023584944b, VS local_fa464945-e15d-4f98-aaad-00877a60f63a, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle ≤ 3 riviä.
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (puhdas, haaralla natiivi-ui/puut-nimet-221), etäpää natiivi-backup. Ajot vain JU:n vuorolla.

## PÄIVITYS 11.05: kohdat 0 ja 0b TEHTY, ajot JU:lla (pyynnöt 10.5x ja 11.0x)
- Lippu 4.42: 1f26c51b4 natiivi-ui/lippu-442-221 (juna 221 5d6967444 + 6834a6711/311eacd76 kumottu; Lipputanko.cs = 6834a6711~1). unity 0, 2261/710/871.
  Skenaario proto-3d/_tyo/natiivi-ui/sk-lippu-442-1.txt (keski, ala, ylä, reunat, käännetty 135/270; lipun jalka ~48,3 N 4,47 E, kaari 0.212), kansio proto-3d/lokit/nui-lippu-442-1-1f26c51b4.
- Kohokartta: b4e624cfe natiivi-ui/kohokartta-90-221 (juna 221 + PalloKierto.VapaaKallistus 90° kohokartassa, PlayerPrefs-oletus 1, kytkin ☰:n sisällä ylimpänä,
  Topografiassa yläpalkki + taikalasit piiloon, ☰ oikeaan yläkulmaan 12/12). 2262/710/871. Skenaario sk-kohokartta-90-1.txt (iPad + iPhone), kansio nui-kohokartta-90-1-b4e624cfe.
- SEURAAVAKSI: katso molemmat kuvasarjat → parit PT:lle (KK:lle), junaan PT:n sanalla; sitten puupari p2, merenpohjan parit (uusi osoite KS/JU:lta).

## 0. JONON KÄRKI (OMISTAJAN PÄÄTÖS klo 10.32 KK:n kortilla, PT:n kautta): lippu striimikartalla takaisin Raamattu 4.42:n mukaiseksi
- Tanko radiaalisesti poispäin ruudun keskeltä: ruudun alaosassa alaspäin, keskellä lähes näkymätön. Pohjaksi 6834a6711:tä EDELTÄVÄ toteutus; 6834a6711 + 311eacd76 (lippu pystyyn) rikkovat 4.42:n (palautetaan/kumotaan ne lipun osalta).
- Pari KK:lle (PT:n kautta): keski, ala, reuna ja kartta käännettynä; ajo JU:n vuorolla. Ennen merenpohjaa. Muisti: lippu Elsassissa ei vika (paikka), asento 4.42 ehtona.

## 0b. LIPUN JÄLKEEN, ENNEN MERENPOHJAN PAREJA (OMISTAJAN PYYNTÖ klo 10.36 KK:n kautta, PT): kohokartta
1) Kohokartassa kallistus 90°:een asti (muu peli ennallaan). 2) Topografialinssi avautuu OLETUKSENA kohokarttana; topokartta valikosta, valinta muistetaan
(PlayerPrefs linssi.topografia.kohokartta: oletus 1, kun avainta ei ole; Topografia.MuistettuKohokartta/LinssiOhjain, 9c5116526). 3) Vaihtokytkin ☰-valikon SISÄÄN
(omistajan sana ohittaa Raamatun 2.73:n sijoituksen; nyt LinssiUi kohoKytkin ☰:n vieressä). VS tekee sinertävän ilman ja rakeen.
Omistajan kuva Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261108/kohokartta-borneo-iphone.png. Yhteinen pari KK:lle: Borneo 60° ja 90°, Alpit, kytkin valikossa.
4) OMISTAJAN PÄÄTÖS klo 10.38 (KK:n kortti): Topografialinssissä yläpalkki (logo, päivä, rahat) piiloon, kohokartta koko ruudulle, ☰ oikeaan yläkulmaan
(vaihtokytkin ☰:n sisällä). Muu peli ennallaan. Kuva Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261108/kohokartta-ylapalkki-iphone.png. Pari KK:lle iPhonella ja iPadilla.
Pohja: juna 221 (kohokartta 5d6967444 siellä); merenpohjan haarat (97b4f29a9 / 7ea8d6ebc) yhdistetään myöhemmin.

## 1. KIIRE: puuvika (omistaja 09.49 TF 221 "Puut yms liikkuvat tai sammuvat panoroidessa"), korjaus tehty, pari JU:lla
- Omistajan kuvat (Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261108/puut-panorointi-1/-2.png) olivat sama tila ~90 px siirrolla: täysikokoisena nurmet ja puut samat (PT luki pienennöksestä beigeksi). Rajaus _tyo/natiivi-ui/omistaja-puut-petit-palais-rajaus.png.
- Diagnoosi lokit/nui-puut-panorointi-1-5d6967444 (iso iPad, sk-puut-panorointi-1.txt): `ui kartanelama tila` nimiltä 5 300–16 100 puuta pois, vaihtelee liikkeessä nimien mukana; puut pois -kuva: puistojen vihreä ON puita, piirroslaatan nurmi alla beige. Arkki _tyo/natiivi-ui/puut-panorointi-1-katsottu/arkki.jpg.
- KORJAUS 50200fb68 natiivi-ui/puut-nimet-221 (juna 221 5d6967444 + KartanElama: PuuJono 3077 → 2994 = nimien 2995 alle, varjojen 2993 ja nähtävyysalueen pohjan 2992 päälle; NimienVaisto = false). unity 0, 2261/2261, pohjavahti ok.
- JU:lle pyydetty 10.2x: sk-puut-panorointi-2.txt (sama reitti), kansio lokit/nui-puut-panorointi-2-50200fb68.
- SEURAAVAKSI: katso p2 (nimiltä 0, puumäärä tasainen liikkeessä; tarkista että nimet näkyvät latvusten päällä ja että rantaviiva/rajat eivät häiritse; vertaa p1:n kuviin samoista kohdista), tee pari p1 vs p2 (sama kohde kokonaan, esim. pp-liike-2 ja pp-lepo-louvre) → PT:lle (KK:lle ennen seuraavaa koeversiota), sitten junaan PT:n sanalla.

## 2. Kohokartta junassa 221 (OMISTAJAN PÄÄTÖS 09.39): valmis
- 5d6967444 natiivi-ui/kohokartta-juna-221 = juna 52e73d18b + kohokarttaketju + valinnan muisti 9c5116526 (+ 45c18a1ed KorkeusKerroin.Suurin 60). JU liitti ff 09.46, TF 1.1 (222) käännöksessä.
- v5-4 iPad (94b7e5c8d) katsottu: muisti OK (koho→koho, topo→topo), VIKA 0, huippu 3052 Mt. Raportti _tyo/natiivi-ui/raportti-kohokartta-v5-4-ipad-20261108.md. Huomio PT:lle: avaus kaupunkitasolta näyttää kaupunkipiirroksen reliefin päällä ja koho×15 tekee Montmartresta kielekkeen (vanha, omistajan arvioon).

## 3. Merenpohja 3D (PT:n suunnitelma 20261108-merenpohja-3d osa 4): NUI-osa valmis, koe-osoite puuttuu
- 20045ae66 (natiivi-ui/kohokartta-221): Topografia.KohokarttaMaasto + koukut VaihdaMaasto/MaastoValmis/MaastoEpaonnistui; peite odottaa rasterin JA maaston (avaus, topoon paluu, sulku: ISulkuOdottaa Linssirekisterissä); Epaonnistui → pelin maasto. Komento `linssi topografia maasto <layer.json>|pois`, `topografia peite` kertoo maaston. 6 testiä.
- Junahaara = VS 97b4f29a9 linssiseppa2/merenpohja-221 (sis. 20045ae66, NS 6ab673093, VS:n _MERI_PAINUU-avainsana); vahvistettu PT:lle. Oma e03b83c61 on sisällöltään sama, käyttämättä.
- PT 10.2x uusi: kohokartta koelaattoihin `julisteet/maasto/2026-11-08-kohokartta-merenpohja-koe/` (KS b300a8b68, RAPORTTI _tyo/karttaseppa/merenpohja-3d/RAPORTTI.md; vientipaketti _valmiit/kohokartta-merenpohja-koe-vienti-20261108). 10.24: https://media.matkakirja.app/julisteet/maasto/2026-11-08-kohokartta-merenpohja-koe/layer.json = 404 (JU ei vielä vienyt).
- 10.3x PÄIVITYS: osoite vastaa (JU 10.27, 200, 32 754 laattaa). KOEHAARA TEHTY 7ea8d6ebc natiivi-ui/merenpohja-koe (natiivi-backup) = VS 97b4f29a9 + KohokarttaMaastoOletus = koe-osoite, `linssi topografia maasto <url>|pois|oletus`; 2267/2267, unity 0. Seuraavaksi vain skenaario + JU-ajo + parit 1–5.
- PT 10.4x: koe-kansio on vanhaa polttoa (helmaraot). KS polttaa koko maailman korjattuna, JU vie UUTEEN kansioon: vaihda KohokarttaMaastoOletus (7ea8d6ebc) uuteen osoitteeseen (KS/JU kertoo) ENNEN pareja.
- (vanha) SEURAAVAKSI: kun osoite vastaa: koehaara 97b4f29a9 (+ KS b300a8b68, jos siinä C#-muutoksia) + Topografia.KohokarttaMaastoOletus = koe-osoite (tai skenaarioon `linssi topografia maasto <url>`), Mac-esikatselu/iPad JU:lla: avaus kohokartaksi, vaihto topoon, sulku (peite kestää, ei hyppyä; `topografia peite` lokiin). Parit 1–5 KK:lle PT:n kautta, kun VS, NS ja NUI valmiit.

## Opit (uudet)
- Omistajan kuvaparista ennen vikadiagnoosia kohdistus (siirto) ja täysikokoiset rajaukset samasta paikasta: pienennöksessä oliivinvihreä nurmi näyttää beigeltä.
- `ui kartanelama tila` → nimiltä N: puiden väistön määrä; liikkeessä tila 1 s välein näyttää vaihtelun.
- Kartan puiden jono suhteessa: nähtävyysalueen pohja 2992, KovaVarjo 2993, ohjelmakohteet 2994, nimet/maaraja 2995, rajat 2996, ranta 2997, mäki 3078, kirkot 3080.
