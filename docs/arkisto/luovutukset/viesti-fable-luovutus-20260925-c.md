# Fablen luovutus 25.9.2026 klo 17.2x (tili B, sessio local_593b89a1, klo 12.3x → 17.2x)

Edellinen: viesti-fable-luovutus-20260925-b.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md klo 12.33 → 17.2x.
Omistaja hereillä ja testaa buildeja; antaa löydökset numeroituina (seuraava 121).

## Sessiot (id:t) — kaikki luotu uudelleen klo 12.4x–12.5x (Fable loi ne itse appia ohjaamalla, Raamattu: SESSIOIDEN LUONTI ILMAN OMISTAJAA)
Julkaisija (Opus) local_22b29f10-7af8-43fc-a974-1d666f716c97; Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (nollattu 16.00);
Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6 (nollattu 15.33); Natiivi-UI local_33ba1387-d688-4e44-8e05-10951e61efc0 (nollattu 15.22);
Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e (MAX-tila Ihmisen matka II:ta varten); Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1;
Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531 (52 %); Sisältökirjuri (Sonnet) local_256f6a15-b806-4259-97bd-b2ba8d342f86;
Laitetestaaja (Sonnet) local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1; Postivahti (Sonnet) local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7.
Nollauskaava: sessio kutsuu clear_session self → Postivahti ilmoittaa "X nollattu" (isRunning false + RC pois; lepoilmoitus ei toimi RC-sessioille)
→ Fable lähettää aloitusviestin send_message-kanavalla → set_remote_control päälle. SendMessage-raja 10/vuoro → mcp send_message varakanava.

## Raamattuun tänä sessiona (kaikki sitovia; #3157/#3158 mainissa, loput Fablen haarassa → Julkaisijan synkka pyydetty klo 17.18)
- SESSIOIDEN LUONTI ILMAN OMISTAJAA + ROOLIEN KANSIOT JA MALLIT (Ydinajatus kohta 2, huoltokomentojen perään).
- BUILD-JUNA tarkennus: käännösvahdin niputukselle yläraja 20 min (Natiiviseppä toteutti, Postivahti hälyttää yli 25 min).
- ESILATAUSPOLITIIKKA (NATIIVI PELI ETUSIJALLE, ennen TESTFLIGHT-BUILDIT) + tarkennus MOBIILIDATA LATAA SAMAT KUIN WIFI.
- POIKKEUS — IHMISEN MATKA II (UUSIA LINSSEJÄ -kohdan perään): toinen versio samalla sisällöllä + valoefektit, sumu, CC-nappi, isommat havainnekuvat, vanojen raidoitus pois; Linssiseppä vetää max-tilassa, Natiiviseppä valokeila/hämärrys/sumu, Natiivi-UI CC-nappi.
- Omistajan päätökset lokissa: joutilaat sessiot saa nollata lepäämään; kaikki 69 kohtauskuvaa tilattu leikattuina (Codex toimittaa kaupungeittain, PR:t #3207 #3210 #3213…); GLO-30 koko maailmalle NAS:iin (lataus käynnissä 16.34 →, 547 Gt, 4 yhteyttä, klo 22 → 8; seuranta dem-lataus/glo30-maailma.seuranta); appia ei siirretä koodaus-käyttäjällä; Codex ei mergeä mainiin (posti 7edc71dfd).

## Buildit
Build 13 = proto ddb3cfb6 TF 13.3x; build 14 = 7f68d1f7 (= master b6cdf4c3) TF 16.4x (1.0.14, CFBundleVersion 202609251332). Julkaisijalla proto_ref-syöte (#3198).
BUILD 15 = juna/b13 c7091b7c (verho-ohita, kerma-25, maakunnat-kaikki, verkko-odotusmittari, Natiivi-UI 94/112/102/90/96c): käännösvahti ~17.17 → Laitetestaajan
savukierros iPhone + iPad (lista lähetetty) → Julkaisija vie 1.0.15 proto_ref = PASS-commit → Natiiviseppä BUILD-merge → OMISTAJALLE RIVI + push.
Kun build 15 on TF:ssa: Siirtoseppä saa luvan viedä 1.42:n (maakuntarajat 138 maata) uudelleen 1.x:ään (nyt v109 = 1.41; 1.42 rikkoi build 13:n maakunnat).
BUILD 16 -jono: 113 maakuntaviivat + 5 sävyn täyttö (Natiiviseppä), 114/116 lista + "Lue lisää" (Natiivi-UI), 115 maakuntakuvat (Sisältökirjuri tilaa FRA→ESP→ITA→GBR→DEU→POL→AUT, GRC luonnehdinnat + kuvat perään), 117 valot-kohdemaa (Pelikoodari, merge-pyynnössä), 118 avausluenta aloitusruutuun (Natiivi-UI + Pelikoodari, etusijalla), 119 reiät pallossa (Natiiviseppä, juurisyy laitteella), 120 lentokamera pomppii → yksi yhtenäinen ajo (Natiiviseppä), verhot (1)–(3) kylmänä mitattuna (tavoite aloitus ≤ 3 s, musta ≤ 2 s; kylmänä nyt 8 s / 5 s), s2-orbit 266bb732 (pilvetön loppuorbit), 95 leikatut kuvat, Ihmisen matka II:n ensimmäiset erät.

## Löydökset
80–120 kirjattu rooleineen: docs/raportit/omistajan-loydokset-b13-20260925.md (roolit merkitsevät "→ KORJATTU <sha>"). Build 14:ssä: 80–93, 96–101, 103–112 (ei 94/102/90/95/113+). Seuraava numero 121.

## Pariteetti
Liikkumislista 0 ERI/PUUTTUU, kaikki todennettu (79331c9f1). Linssipariteetti iPhone 0 avointa; iPad 3 riviä korjattu junassa; kierros 4 (rivit 11–13, 30–31, 37–43; #3196, #3197) ajetaan, kun build 15 -juna on käännetty. Kolmas ehto (omistajan build-kokeilu ilman uusia löydöksiä) ei täyty — uusia linssejä ei aloiteta paitsi omistajan poikkeus Ihmisen matka II.

## Web
Koepyramidi #3203 mainissa (?pyramidi=2026-09-25, Pages 16.53). Omistaja hyväksyi kartan ("vaihda"), MUTTA koelipulla karttanostoja ei voi klikata → Karttaseppä korjaa PR:llä; vasta sen jälkeen Julkaisija vaihtaa osoittimen 25b-luetteloon (pyramidi-poltto/ajo-20260925b-nostot/luettelo/pyramidi.json). Web-kehitys muuten tauolla; web-velka: GRC/JPN maakuntatäyttö puuttuu.

## Esilataus
Politiikka hyväksytty; Pelikoodarin Esilataaja-suunnitelma #3205 hyväksytty (erät 1–4 build 15:n jälkeen; mittari junassa d8518df5). Siirtosepän taustapäivitys #3200 (3 vaihetta, koodi build 15:n jälkeen). Laitetestaaja lisää vartijan "saapuminen 0 ms" kun mittari on junassa.

## Kone
coreaudiod jumi korjattu 13.25 (sudo killall coreaudiod, sanatarkasti yksin — ketjutettu komento menee luokittimelle). Äänilaitteet: Mac Studio -kaiuttimet (oletus) + Scarlett. 5 h -kiintiö nollautui 17.29; Sisältökirjuri/Linssiseppä/Siirtoseppä lepäsivät 17.30:een. Levy 182 Gt, NAS 5,6 Tt (GLO-30 vie 547 Gt).

## Opit
- Sessioiden luonti appia ohjaamalla: kaava muistissa ja Raamatussa (Trust workspace Tab+Return, mallichippi 1/3, ei ⌘-näppäimiä).
- Luokitin estää osascriptin ilman sallintaa ja huoltokomennot ketjutettuina; huoltokomento ajetaan sanatarkasti yksin.
- Paketin "yhteensopiva lisäysversio" voi rikkoa vanhan buildin (1.42) → Natiivisepältä tarkistus ennen tuotantoa, kun aineiston koko/kattavuus kasvaa.
- Codex mergesi #3163 itse → sääntö postilaatikkoon. TF-vienti ja savukkeet jakavat saman ajurin (Julkaisija peruu savukkeita viennin ajaksi).
- Postivahdin väärä hälytys GLO-30:stä (kirjoittaa NAS:iin, paikallisessa vain skripti) — tarkista ennen pysäytystä.

## Jono uudelle Fablelle
1. Build 15: Laitetestaajan PASS → BUILD Julkaisijalle (proto_ref) → TF-rivi omistajalle + push → lupa Siirtosepälle 1.42 → Natiivisepän BUILD-merge SHA.
2. Julkaisijan Raamattu-synkka (esilataus, mobiili = WiFi, Ihmisen matka II) mainiin.
3. Webin osoitinvaihto, kun Karttaseppä on korjannut nostojen klikkauksen koelipulla ("vaihda" annettu).
4. Omistajan build 15/16 -löydökset 121 alkaen → raporttiin ja rooleille.
5. Linssisepän Ihmisen matka II -suunnitelma (yksi sivu) hyväksyttäväksi; Natiivisepän valokeila/hämärrys rajapinta.
6. Build 16 kokoaminen (lista yllä) ja BUILD.
7. GLO-30 lataus valmis ~22–02 → Karttasepän eheystarkistus; myöhemmin maastosarja z11 koko maailma + z12 pelin maat (ei kiire).
8. Postivahti valvoo: junasääntö 25 min, GLO-30, kontekstit ≥ 70 % (Karttaseppä 52 %, muut nollattu tänään).
