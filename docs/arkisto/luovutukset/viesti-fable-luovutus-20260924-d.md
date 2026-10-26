# Fablen luovutus 24.9.2026 klo 20.0x (tili B, sessio 14.50 → 20.0x)

Edellinen: viesti-fable-luovutus-20260924-c.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md
klo 14.53 → 20.0x (~120 otsikkoa). Raamattuun lisätty tänä sessiona: WEB ON MALLI, MITATTUNA (9ebc5784c, sitova
työjärjestys: web-kuva → mitat → koodi → kuvapari, ei mergeä ilman), NATIIVIN YLÄPALKKI iPHONELLA JA iPADILLA
(ruskea palkki takaisin, piiloutuu vierityksessä ja vaakatilassa, ☰ palauttaa; tarkennus klo 19.4x: matalampi, logo
pois, pilleri ja ☰ Dynamic Islandin riville, palkki taustalla), AVAUSTEKSTI ALOITUSNÄYTÖLLE JA LENNON KAMERAREITTI
(sivukylki läheltä → loittonee → kierto kohdekaupungin vastapuolelle → orbit laskuun; käsikirjoitus hyväksytty
proto-3d/lokit/kamerakasikirjoitus-lento-20260924.md, kesto 16–26 s), RADIOLINSSIN UUDISTUS NATIIVISSA (paneeli
kuvaputken tekstuureilla, VU + LCD samassa rivissä, hämärä kartta, 3D-mastot kolmessa koossa, vilkku VU:n tahdissa,
radioaallot, rahina, kamera-ajo; YÖN VALOT Black Marble, LINNUT boid-parvina; suunnitelma hyväksytty
docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md, omistajan palaute klo 20.0x: tummempi, valot kaikkialle,
enemmän hehkua → uusi havainnekuva), 5 h -kiintiön taukoraja 98 %, WORKTREE-KATTO 3 per rooli, SIMULAATTORIEN OMISTUS.

## Build-tila
- Build 10 = 1.0.0 (202609241607), proto b9755e9 (= f02376b + väliaikainen tiimihotfix, peruttu masterissa 82e1e8d),
  TestFlightissa klo 19.15. Omistajan löydökset build 10:stä: 44 (yläpalkki, Natiivi-UI), 45 (Liiku piiloon kerronnan
  ajaksi, Pelikoodari). Seuraavat numeroidaan 46 alkaen.
- Build 11 kokoontuu: proto-master 703eee8+ (radio 40/42/43, lehti-otsikot + leveä nostokortti, nimikerros 38 hyväksytty,
  harmaat suorakulmiot korjattu, kappalejako, b9755e9 peruttu). Jonossa: 44 saaririvi (Natiivi-UI, nollautuu), 45,
  kainalo (testi/b11h), hytinä 27, lennon kamerareitti (agentilla natiiviseppa/kamerareitti), fokuspohja on jo
  masterissa. Build 11 -SHA Natiivisepältä kun kamerareitti + 44 mukana; versio 1.0.11 (#3107, laskuri 10),
  -nographics, #3110, EI hakulistan vaihtoa (omistaja ajoi set-key-partition-list; 2RX77QMLHA:n poisto jäi).
- Build 12: radiouudistus (mastot, hämärä, yövalot, linnut), paneelin pinnat leivottu (linssiseppa/radio-mastot ef6918a).
- Tiimit: Developer = samireivinen@me.com RCD77XPB7M (kaikki käännökset ja TestFlight); F72JLS57C5 oli gmailin Personal
  Team, poistettu koodista. Kehitys-App ID fi.matkakirja.peli.kehitys; iso iPad 00008103-001819421413401E asennettu.

## Kuvaputki (Codex, claude/postilaatikko)
Tilattu: maamerkkien viitekuvat 70 kaupungille; renessanssisali (erä 1 toimitettu 30 maalausta Met/NGA, muotokuvat
16/18, erä 2 NGA + Mona Lisa tilattu; Uffizi/Accademia kielletty); galleria + ennenNyt 59 kaupungille (Sisältökirjuri);
radiopaneelin tekstuurit + viitekuvat (toimitettu, kuitattu). Yövalosarja Black Marble Z0–Z6: Karttaseppä ajaa 25.9.
klo 9 jälkeen. Kuittaukset posti/fable-vanha.md:n kärkeen.

## Sisältö ja web
Sisältökirjuri: 91 kaupungin sää/galleria/ennenNyt kierros valmis (N-erät #3097 #3098 #3101 #3104, kohdekartat 10 PR),
kuvatilaus postilaatikossa (847fcdc25), PR #3106; turistioppaan kaupunkilista inventaarion kohta 9. Web: #3078
Huippuvuoret v2196, #3093 periaatteet, #3096 worker-sallinta, #3105 fontti polttoon, aluenimet #3100, paketti 1.35
(#3081 mainissa; Julkaisijan väärä pidätys peruttu klo 20.0x — varmista osoitin v68). Julkaisijan jono: sää, kohdekartat,
#3099, #3100, #3103, #2913, #3094, #3111, #3113; perutut savukkeet uusittaviksi.

## Sessiot (10) ja tila
Julkaisija (Opus, nollattu 19.3x) local_9922c4b6-320f-4074-aed4-f2811a7c9640; Natiiviseppä local_860f922b-94b8-49da-975d-4233a993bbb8
(nollattu 15.5x); Pelikoodari local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 (nollattu 18.5x); Natiivi-UI
local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 (nollaus käsketty 20.0x, luovutus -i); Linssiseppä local_3273f209-099d-4ed3-830e-e4e1b40bcc7d
(nollattu 19.0x); Siirtoseppä local_7a1255c5-d525-4323-9438-70e7379ad2fe (nollattu 16.3x); Karttaseppä
local_445a5c7b-4317-4989-b65d-4cb81bd10056 (E28 klo 22, yövalot huomenna); Sisältökirjuri local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f
(nollattu 18.1x); Laitetestaaja local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 (nollattu 16.3x; simit 1572C658 + 3B4CDACB);
Postivahti local_6f3d4c35-be83-4985-82c7-8d641ad18f1d. Aloitusviesti aina uusimmasta origin-haarasta (git log --all).

## Opit tänään
- Fablen vertaisviestiraja: 10 lähtevää per omistajan UUSI VUORO tässä sessiossa (mid-turn-viesti ei nollaa); ei
  säädettävissä (anthropics/claude-code#94000). Niputa viestit; kun raja täynnä, pyydä omistajalta "ok".
- Luonnos-PR:n vapautusehto luetaan luovutuksesta sanatarkasti (#3081-sekaannus).
- Avainnipun hakulistan vaihto CI-ajossa katkaisee gh:n ja pushit kaikilta koodaus-sessioilta — kielletty.
- Lokikansioiden pysyvät poistot omistajalle skriptillä (Linssisepän vapauta-levy-linssiseppa-20260924.sh odottaa).

## Jono uudelle Fablelle
1. Varmista Julkaisijalta: 1.x-osoitin v68 (1.35) palautettu ja jono jatkuu.
2. Build 11 -SHA (Natiiviseppä) → Julkaisija build 11 (1.0.11); omistajalle yksi rivi. Löydökset 46…
3. Linssisepän uusi radiohavainnekuva → omistajalle; Natiivi-UI:n aloitusviesti (Postivahti).
4. Omistajalta: 2RX77QMLHA:n poisto (ei kiire), vapauta-levy-linssiseppa-skripti, Individual → Organization ennen App Storea.
5. Huomenna: Karttasepän yövalosarja klo 9 jälkeen, E28:n tulos, nightly klo 04 → Julkaisija Sonnetiin.
