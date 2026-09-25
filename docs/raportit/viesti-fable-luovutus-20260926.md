# Fablen luovutus 26.9.2026 klo 01.1x (tili B, sessio local_593b89a1, klo 17.29 → 01.1x)

Edellinen: viesti-fable-luovutus-20260925-c.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md klo 17.31 → 01.1x.
Omistaja hereillä 23.5x asti, antoi löydökset 121–152 (seuraava 153) ja tilaukset; vaihtaa tilin kun viikkokiintiö täyttyy (tili B: 77 % klo 01.07, 5 h 92 %, 5 h nollautuu 03.30, viikko ti 29.9. klo 02).

## Sessiot (id:t ennallaan, kaikki nollattu tänään paitsi Julkaisija, Siirtoseppä, Laitetestaaja)
Julkaisija (Opus) local_22b29f10-7af8-43fc-a974-1d666f716c97; Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (high; luovutus -f käsketty 69 %:ssa);
Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6; Natiivi-UI local_33ba1387-d688-4e44-8e05-10951e61efc0; Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e (MAX videon ajan);
Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1; Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531; Sisältökirjuri (Sonnet) local_256f6a15-b806-4259-97bd-b2ba8d342f86;
Laitetestaaja (Sonnet) local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1; Postivahti (Sonnet) local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7 (nollattu 00.1x, viikko-% joka kierros, 85 % → push, 90 % → kaikille luovutuskäsky, 97 % → push "vaihda tili").
Aloitusviestit roolien origin-haaroissa (Raamattu ROOLIEN KANSIOT). Tilinvaihdossa sessiot luodaan uudelleen Raamatun kaavalla (SESSIOIDEN LUONTI ILMAN OMISTAJAA).

## Tuotannossa
Build 16 = 1.0.16 TF 21.22 (proto bf70290d, juna 1aa7c558): lämpöerä + lepopiirto, II erät 0–5, 113–120, pohja buildissa, Esilataaja 1–3. Web: peruskartta 2026-09-25 (v2233 + osoitinvaihto workflow_dispatch #3217, varmuuskopio pyramidi-20260925-1900.json), CI-näyttökorjaus #3243. Paketti 1.43 (v127), maakuntaerät 1–9 mainissa, GRC kokoluokat + salaisuudet (#3263), reitit 1873 (#3266). GLO-30 NAS:issa 589 Gt eheys OK.

## Raamattuun tänä sessiona (kaikki mainissa #3228/#3259/#3262 paitsi viimeiset lokirivit)
LÄMPÖ JA VIRRANKULUTUS NATIIVISSA; ALOITUSLENNON TARKENNUS (kone aina kuvassa, nousu näkyy, 12 s); KOHTAAMISEN AVAUS (1 oikea vastaus → vihreä piste); RESEPTI 2026-09-26 (meri vahvempi, poltto yöllä); ELÄVÄ KARTTA — ISOISÄN MUSTE (kohdat 1–5 videoksi; maakunnat etäisyysjärjestyksessä, ei keksittyä reittiä).

## Build 17 -jono (juna/b13; leikataan aamulla, Laitetestaajan kierros ennen)
Kehyksen hinnan korjaus (piilotettu blur-kerros 70 % GPU → ≤ 16 ms; idle-syke takaisin jatkuvaksi), 121–124 ja 138–140 junassa, 130–137/141–143/146 v2 (Natiivi-UI), 125–128 + 113 (Natiiviseppä; 128 kuvapari p080/p060/p045 omistajalle), 134/137/149/122 (Pelikoodari), 147/148/151/152 + pariteettiäänet (Linssiseppä), Esilataaja 4, laattaesilataus, II erä 3 sumu junassa. Musiikki- ja äänisuunnitelma (Pelikoodari) omistajan hyväksyntään ENNEN generointia.

## Odottaa omistajaa
128 huntu (kuvapari), elävän kartan video (Linssiseppä), musiikkisuunnitelma, build 17 -löydökset. 146 v2 hyväksytty toteutukseen.

## Opit
- clear_session säilyttää session id:n; rooli hiljaa 30 min → list_events; SendMessage 10/vuoro → mcp send_message.
- Omistaja: pieni valikko pysyy pienenä, ei koristeita; videot rajattuna laitteen ruutuun, kuvat ensisijaisia (soitin näyttää pystyvideot 1:4).
- Viikkokiintiö kuluu ~6 %/h täydellä setillä; iPad Mac Studion päällä → thermalState ei luotettava.
- macOS: ei setsid → nohup + disown; GLO-30 ~3 Mt/s per virta → 24 virtaa.

## Jono uudelle Fablelle
1. Aamulla: build 17 (kierros → BUILD → rivi omistajalle), sen jälkeen kuvapari 128 ja elävän kartan video omistajalle korttina.
2. Musiikkisuunnitelman PR → omistajan hyväksyntä → Lyria-generointi erissä.
3. Elävän kartan pelattava versio build 18:aan videon hyväksynnän jälkeen; Karttasepän delta-tila ja 26-sarjan osoitinvaihto (web + natiivi) kuvaparilla.
4. Löydökset 153 → raporttiin ja rooleille.
