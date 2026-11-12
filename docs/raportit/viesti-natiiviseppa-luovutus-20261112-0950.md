# Natiivisepän luovutus 12.11.2026 klo 09.50 (tiivis, Raamattu 7.37: ≤ 8 kt, ei lisäysketjua)

Korvaa luovutuksen -0925; vanhoja EI tarvitse lukea. Sessio local_0f7f169f, checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja.
Syy: kontekstivahti 25 %. Viestit mcp__ccd_session_mgmt__send_message TÄYDELLÄ session-id:llä (lyhyt id ei toimi):
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Kello: date ennen leimaa. Vahti: Bash run_in_background until-silmukka (loki.txt "valmis N s|LOPPU|ajo päättyi").

## AVOIMET (järjestyksessä)

1. MASKIALLAS 0865440d9 (natiivi-backup natiiviseppa/elava-maski, e09a3694f:n päällä, wt /Users/Shared/Claude/wt/proto-natiiviseppa-elava-maski):
   ElavaMaski-allas vahvana piirron ajan, heikoksi 20 s tauon tai Application.lowMemoryn jälkeen. Testi ElavaMaskiAllasTestit, Kartta-testit 790/790, unity 0.
   Mono-5 (koe 65ff16870, natiiviseppa/mono-5-koe, wt proto-natiiviseppa-tyokalu3) luettu ja KK:lle lähetetty klo 09.49:
   GC.Alloc 125,5 → 98,7 Mt / 20 s, Peitto pois kärjestä; mono 1014 → 1040 (taso noin 70 Mt korkeampi, allas). Kuvapari mono-4/mono-5 sama.
   → SULJETTU 09.5x (KK:n ehto ≤ +40 Mt ei täyty: MONO-KAYRAn keruun jälkeinen taso 698 vs. 976 Mt = +280). Allas pois, 0865440d9 EI junaan,
     LisaaRengas jää. Ei toimia.
2. LOD-B (10.00, JU:n jonossa → lokit/natiiviseppa-juoksu-pala3-lod-b, skenaario _tyo/natiiviseppa/pala3/sk-juoksu-pala3-lod-b.txt):
   PARI-C LUETTU 10.00: kujan koe-glb latautui (2048², unity.log 6756/9966), MUTTA kujan lattia on B:ssä yhä täysin valaistu (ei seinä- eikä
   puuvarjoja; B–C ero vain K7:ssä 8,4/255). Varjostin JuoksuLattia.shader tukee JUOKSU_LEIVOTTU-valoa → epäily pelissä: lattia lod1/lod2:lla
   (koe korvasi vain lod0:n, eikä niissä ole atlasta) tai valo putoaa materiaalilta. LOD-B = pari-c:n B-sarja + `valo lodtieto` + `valo tila`
   ennen jokaista kuvaa. LUE lodtieto-rivit K1/K7 → jos lod1/2: LOD-raja (JuoksuSokkeloMaailma.Palatsi.cs, LodTieto) NS korjaa / LAV leipoo
   lod1:n; jos lod0: materiaalin JUOKSU_LEIVOTTU-avain. LAV:lle kerrottu 10.00. Kolmikko KK:lle vasta kun koevarjo näkyy.
   (vanha) PARI-C: ajettu 09.49–09.59 → lokit/natiiviseppa-juoksu-pala3-pari-c.
   Skenaario _tyo/natiiviseppa/pala3/sk-juoksu-pala3-pari-c.txt = pari-b + B/C korvaa myös kk-tausta-kuja-1-3-lod0.glb → koe-b/ulos-{6.25,12.5}/.
   TAUSTA (pari-b luettu 09.29): kaikki kamerat (sijoita −136, 300–425) ovat kujaruudulla kuja-1-3 (rajat x −139,2…−132,4); pari-b korvasi vain 1-3 → B ≈ C.
   v134:n kujaleivonnasta puuttuvat seinävarjot (glb:n valo_rgbm purettu). LAV 09.5x: kujakoe 5,4 cm, 2048², suorassa valossa seinävarjo näkyy.
   Osasarja v15 pelissä ok (valoatlaksia kesken 0, ei "puuttuu"/"POIS"; kauko0 + karki.bin > 60 m). PUUTE 2 (aikaraja) vain sarjojen alussa.
   LUE: grep korvaus unity.log (1-3 ja kuja-1-3 molemmat, 4096²/2048²), ero A/B/C (/opt/homebrew/bin/python3 numpy+PIL),
   kuvat sips -Z 1000 ja Read. Jos koe näkyy: A|B|C samasta kamerasta (K1 tai K7) täysikoossa KK:lle + LAV:n selitys, kopio LAV.
   Apuskriptit: scratchpad dekoodaa.py (RGBM → kuva), glbkuvat.py (glb:n kuvat ulos), ero.py (A/B/C-erot) — kirjoita uudelleen tarvittaessa (10 riviä kukin).
3. SEURAAVA MONOKÄRKI (vain KK:n sanalla): mono-5 "valmis": LisaaRengas 8,1 Mt / 336 kpl (reunat-listan kasvu maskia kohden),
   Suurenna (ElavaTyyli.cs:82) 4,3 + 3,9 Mt, Laattapalvelin.Lataa 3,7 + 3,7 Mt.

## VALMIIT TÄNÄÄN

- Sumea-korjaus e09a3694f: KK:n junasana 09.38, pt-ok PT → JU (09.4x). Mono-4: GC.Alloc 178,8 → 125,5 Mt, kuvapari sama.
- ElavaHaku OHITETTU (KK 09.38): 23 Mt = ladattu palasisältö (downloadHandler.data, yksi per pala), jaettu välimuistille/levylle/purulle.
- Puuttuvien äänitteiden laskenta, äänitysjono PR 6591 mainissa, ennen-junaa.sh vaihe 5 linkissä 224.104 (ks. luovutus -0925, ei toimia).

## MUUT

- Muistin keventäminen: iPad-vahvistus + laattamuisti 1–3 KK:n iPad-erässä.
- Työkopiot: elava-maski (uusi), tyokalu3 (nyt mono-5-koe), elava-sumea, latausjono, kaupunkitaulu, pala3, kertoja-esilataus, tyokalut,
  natiiviseppa-aanitysjono (PR mainissa → voi poistaa), natiiviseppa-luovutus.
- Cron klo 9.04 (unity-julkaisut.py) on sessiokohtainen: luo uudelleen tarvittaessa.
