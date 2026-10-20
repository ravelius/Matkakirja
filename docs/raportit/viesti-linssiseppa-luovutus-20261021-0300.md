# Linssisepän luovutus 21.10.2026 klo 03.00 (yöjono tehty)

Edellinen: viesti-linssiseppa-luovutus-20261021-0120.md. PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_a9af6995-1787-4508-8b86-964f59a11392,
JU local_f1add29f-e834-48da-a22a-0459dbc49994, Lavastaja local_c958bb12-f3e5-431f-a767-874471ee2889, Äänittäjä local_f8fe7e20-4700-42e5-91a0-f1227310dc0f.
Viestit send_message-varakanavalla.

## 0. VALMIIT (kaikki juna 209:n rungossa, NS e65a44df7)
- **Lentävä kamera kaikkiin museoihin** (omistaja 21.10. 00.40, PT 01.2x nopeampi): proto `linssiseppa/museo-lento-209` kärki ec1ae87e9.
  Kamera/Lentokaari.cs (Kaari-käyrä lyhyille; salista toiseen nopeussuunnittelu ≤ 9 m/s, mutkat √(2,4/κ), ≤ 3,7 m/s², nykäys 3 m/s³; pisin Louvre 46 m 13,8 s),
  Museo/MuseoKierros.Lento.cs (QA "museo lento 0|1|kallistus 0|1|tila"; SallittuLento, LentoHenkilot ≥ 0,8 m; ketju; tauko perille).
  Testit MuseoLentoTestit (koko kierros Louvre iPhone/iPad + Amsterdam, henkilöt, kävelijät 120 s), LentokaariTestit.
  Todiste (PT hyväksyi): LT:n laiteajo lt-tulos-9 (iPad: pehmeä, ei mustaa) + simuloki todistus-lento209-{iphone-0241,ipad-0250} (8 lentoa OK).
- **Kävelyn portti**: aikaraja 1,5 s todellisella kellolla (LT: laitteella lähtö odotti 19–33 s), QA "museo portti 0", odotus lokiin.
- **Saliäänet salin koon mukaan** (Äänittäjä, PT hyväksyi): Museo/MuseoSaliaani.cs + Aanisoitin.LinssiTaustat museo-sali-<luokka>.
- **Amsterdam Louvre-tasolle** (glb sali-v7 + kalusteet kirjastosta, esteet, penkit, penkit_malli, kyltit 64 + Orsay 23, lahestyminen alankomaat/),
  **MuseoPariteettiTestit**, **askeleet v7**.
- Pohjat: PR #5078, #5102, #5114, #5116 mergetty.

## 1. LÖYDÖKSET (välitetty)
- Simulla museon 3D piirtyy mustaksi: "PaniniProjection shader … stripped … PostProcessing render passes will not execute" → PT → Valoseppä.
- SK: Alankomaiden 27/64 teosta ilman kertojan kohtia (kohtazoom) → PT.
- MuseoTaukoKameraTestit.PysahdysRajaaKaikkiPaikat kaatuu yksin ajettuna (tilariippuvuus), Museo-sarjassa läpi.

## 2. AVOINNA
- Kulmakoristeet: Codexin PT733 aamulla. Lavastaja: K3 Mollienin kävelijä → KavelijatEivatKaarella-testi.
- Äänittäjä: kävijöiden askeleet (a) etäisyysvaimennus koodissa v7-näytteillä – kytkentä kun Lavastajan kävijät tulevat.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista Codexin PT733 (kulmakoristeet) ja Lavastajan uudet kävijät; muuten rivi PT:lle
"JONO TYHJÄ: Linssiseppä". Worktreet: vain proto-linssiseppa-kierrokset195 (todistusajo.sh – älä poista).
