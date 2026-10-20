# Fablen luovutus 23.9.2026 klo 10.55 (Mac-käyttäjä koodaus, sessio 22.9. klo 20.13 → 23.9. klo 10.55)

Edellinen luovutus: viesti-fable-luovutus-20260922-ilta.md. Kaikki päätökset lokissa
docs/raamattu-loki/paatokset-2026-09.md (22.9. klo 20.14 → 23.9. klo 10.5x, ~80 otsikkoa).
Raamattua ei muutettu. Viikkokiintiö (kaikki mallit) 89 % klo 10.50, nollautuu 25.9. klo 08.

## Tuotanto: v2144 (klo 10.1x); Julkaisijan jono #2890–#2901 + "Suoraan kartalle"
Aamun sarja: v2141 Syötekoe-valikko (piirtokokeet pois, kosketuslipun korjaus), v2142 nimiölukko
(näkyvä nimiö ei vaihda kylkeä vedossa eikä zoomissa — omistajan sitova sääntö), v2143 paljas
kartta (Syötekoe 5–8), v2144 kerroskytkimet. Jonossa: #2893 kallistus koelippuna (v2145),
#2895/#2897/#2900 NC-korvaukset 23/23, #2898 äänten lisenssiportti (NC/ND ei soi, vartija),
#2901 lähderivit, raportit #2890 (siirtoputki + yhteinen sisältölähde), #2891/#2892 (3D),
#2896/#2899 (lisenssit). Tulossa etusijalla: Pelikoodarin "Suoraan kartalle" -kytkin (⚙).

## SULAVUUS (tärkein avoin)
- Poissuljettu: kehysaika, tekstuurilataukset (eivienti, vientibudjetti), puskurikirjoitukset,
  häivytys, pikselisuhde, alfakanava, 60/120 Hz. Ainoa myönteinen: ?koe=syotetouch "ehkä parempi".
- Valikossa Syötekoe 1–4 (oletus/kosketus suoraan/yhteinen kello/molemmat) + 5 Paljas kartta
  kerroskytkimin. Liikemittari p5 (rivit liike/syöte). OMISTAJAN KIERROS ODOTTAA: tila 5 ensin,
  sitten 1–4; jos touch tasaisin → Pelikoodari: touch oletukseksi kosketuslaitteilla.
- Sivulöydös: kirjaston pohja (~400 dc) piirtyy häivytyksen aikana ja kallistuksen usvan alla →
  oma erä (peittävä laatta / pohjan rajaus).

## NATIIVI PELI (omistajan suunta 23.9.)
Uusi natiivi iOS-peli rinnalle, maapallo ensin, sisältö siirretään; web ilmainen, App Store
maksullinen tai 3D-lisäosat IAP:na. Raportit: 3d-selvitys (suositus Unity 6.3 + Cesium; Google
3D-laatat ei EU:ssa, ei myöskään vanhalla projektilla), 3d-unreal-vs-unity (Unity), 3d-google-
laatat-eu, 3d-prototyypin-valmius (Xcode 27 riski, levy 68 Gt, git-lfs puuttuu, koodaus ilman
allekirjoitusta), sisallon-siirtoputki (vie-sisalto.mjs 391 moduulia, yhteinen sisältölähde:
CI vie paketin ämpäriin, web ei muutu; App Store: WKWebView-kuori 4.2-riski, IAP StoreKit 2,
Livia-chat 5.1.2(i)). OMISTAJA LUKEE RAPORTIT, moottoripäätös auki; prototyyppiä ei aloitettu.
Lisenssit: NC 23/23 korvattu; SA ~9 600 kuvaa (attribuutio, juristi ennen maksullista);
radiot pois uudesta pelistä (omistaja), pysyvät ilmaisessa; 394 herokuvaa Commons-viitteistä →
Siirtoseppä selvittää (johdannaisriski).

## Sessiot (8): Pelikoodari (67 %, luovutus tulossa), Karttaseppä, 3D-selvittäjä, Siirtoseppä
(Opus 5.5); Julkaisija, Laitetestaaja, Sisältökirjuri (51 %), Postivahti (Sonnet). Session id:t
lokissa 09.48. Luokitin estää sessioita kytkemästä omaa RC:tä → Fable kytkee. CI: WebKit-
savukkeet kaatuvat launch-aikakatkaisuun (ympäristö); koneen reboot omistajan kanssa tekemättä;
merget omistajan säännöllä. Laitetestaajan pulu-QA (v2138) tekemättä.

## Jono
1. Omistaja: "Suoraan kartalle" → Paljas kartta -tuntuma → Syötekoe 1–4 → 3D-päätös.
2. Pelikoodari (uusi): kierroksen analyysi; lahteet.js; Codexin Pulu-kohtaukset; pohjaerä.
3. Karttaseppä: kallistus vaihe 2 (lento, pelaajan liike, pohja usvan alta) omistajan kokeilun jälkeen;
   163 kaupungin lat/lon (Siirtosepän löydös); kartta 22c ja nostotason poltto odottavat omistajaa.
4. Laitetestaaja: pulu-QA v2138 + CI-reboot. 5. Julkaisija: 33 Commons-kuvaa ämpäriin (peilaa-media
   ei lue js/linssit). 6. Codex: kuittaukset postilaatikossa.

## Lisäys klo 11.05 (ennen tilinvaihtoa)
- v2145 tuotannossa (kallistus koelippuna); Julkaisija tekee jonoa: v2146 korit, #2902 Suoraan
  kartalle, #2895/#2897/#2898/#2901/#2904 → versiot Julkaisijan luovutuksessa.
- Luovutukset pushattu: 3D-selvittäjä (selvittaja-3d-luovutus), Karttaseppä (karttaseppa-tyo-
  20260922), Laitetestaaja (laitetestaaja 0edd6c8de), Pelikoodari (nollattu, odottaa tehtävää),
  Siirtoseppä (siirtoseppa-luovutus 032ff32a5). Julkaisijan luovutus tulossa.
- Herokuvat (#2904): 60/394 Commons-viitteillä (56 BY-SA), 94 omistajan ChatGPT-erän viitteet
  tuntemattomat → KYSYMYS OMISTAJALLE; suositus attribuutio + juristi (herot + SA + radiot).
- Pulu-QA v2138 osittain (postilaatikko); Codexin kaksi lisäkohtausta Pelikoodarin jonossa.
- Postivahti tietää tilinvaihdosta; uusi Fable antaa sille session id:nsä.
