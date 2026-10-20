# Fablen luovutus 24.9.2026 klo 10.5x (tili B, sessio 02.56 → 10.5x)

Edellinen: viesti-fable-luovutus-20260924.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md
klo 02.56 → 10.4x (~120 otsikkoa). Raamattuun lisätty tänä sessiona: KONTEKSTIN NOLLAUS -kaava korjattu
(sessio kutsuu clear_session self itse, Fable tarkistaa list_events = 0 ennen aloitusviestiä), VIIKKOKIINTIÖ
(ei pysäytä työtä, omistaja ajaa token resetin), TESTFLIGHT-BUILDIT KEHITYKSEN AIKANA (build aina
merkittävän erän jälkeen), MAAPALLON TILA -LINSSI (NASA/NSIDC, suunnitelma valmis, toteutus pariteetin
jälkeen), NATIIVIN iPHONE-ASETTELU (ei yläpalkkia, pilleri "300£ 1/80" ja ☰ Dynamic Islandin tasolla,
Liiku puoliläpinäkyvä, linssit pois laukusta; vain iPhone, web ei voi), LENNON ESITYS -tarkennukset
(kamera etuviistosta, vain kohdepiste, 3D-maasto + aurinko, sininen taivas, ALOITUSLENNON
KAMERAKÄSIKIRJOITUS lähelle konetta → kauemmas → kohdekaupungin kierto, TEMPO), KAMERA-AJOT (ease in/out,
tempon dramaturgia kaikkiin automaattisiin ajoihin, yhteinen käyräkirjasto), AVAIMET NATIIVISSA (vain
Keychain). Muistiot: session-nollaus-automaattinen (korjattu kaava), vertaisviestien-10-raja (uusi).

## Omistajan linjaukset tänä sessiona (sitovat)
1. Viikkokiintiö ei rajoita (token reset); 5 h 90 %-sääntö pysyy.
2. TestFlight-build aina merkittävän erän jälkeen; yöajo klo 04 varmistuksena.
3. Julkinen TestFlight-linkki vasta omistajan kokeilun jälkeen (kortti uudelleen). Isoisä 1873 erä 2 myöhemmin.
   Omistaja peruu itse varmenteen ACN2K38688 (säilytä PK8TVTL7Q8).
4. Maapallon tila -linssi: kyllä, pariteetin jälkeen (suunnitelma docs/raportit/linssi-maapallon-tila-suunnitelma-20260924.md).
5. Avausteksti pysyy nykyisenä; mattolaukku-luonnokset A/C lokissa klo 09.28.
6. iPhone-asettelu (löydökset 5–7 + Island-taso) vain natiiviin; iPad katsotaan erikseen.
7. Lennon esitys ja kamera-ajot: ks. Raamattu (klo 09.5x–10.2x). Aloitusnäyttö: pisteet pois, pallo täyttää ruudun, pyörii, sumennettu.
8. Cloudflare-tokeniin D1 Edit -oikeus: omistaja tekee ~klo 11.45 studiolla → Julkaisija ajaa sahke-worker.yml uudelleen.

## Build 5 (1.0.0 / 202609240615, proto 7878cbc) — omistajan löydökset 1–17 → BUILD 6
Lista ja tila lokissa (otsikot "OMISTAJAN BUILD 5 -LOYDOS"). Tarkistuslista docs/raportit/build6-tarkistuslista-20260924.md
(Laitetestaaja, PR #3034). Tila proto-master dbe90bc:
- Tehty masterissa: 1 nostot (kartta + merkit), 3 paikkakupla, 5–7 iPhonen yläosa/Liiku/laukku (Island-taso
  tilattu klo 10.43), 8–10 maapaneeli (Natiivi-UI:n erä), 11 kertojan laatikko, 12 avaruusavaus (kamera),
  13 offline-laatat, 15 selite, 16 chat (worker julkaistu klo 10.30, natiivin striimi + Keychain-koodi
  masterissa), 17 portin verho (sumennus Natiivisepältä), smootherstep-käyrät, koreografiakirjasto erä 1.
- Kesken (Natiiviseppä, uusi sessio klo 10.35): 2 sepiapohja + maan väritaso + ääriviiva (Karttasepän
  osoitteet tulleet), 4 lennon aikajana + tempo + sininen taivas + 3D-maasto auringolla, 14 navat,
  17 aloituspallon kamera/pyöritys/pisteet, aloitusvalinnan hehkurengas (web .target-ring.pick 2,6 s,
  #b08a3c→#e8b23c), PalloKierron trapetsi → smootherstep (tehty).
- Build 6 käsketään Julkaisijalle kun Natiiviseppä ilmoittaa SHA:n ja Laitetestaaja on ajanut tarkistuslistan.
  Sisältöpaketti 2.0 (PR #3030) vaihdetaan natiiviin omana buildina (aikaisintaan build 7).

## Muut tilat
- Web: v2162 tuotannossa; Julkaisijan jono: #3003 → ehdotukset-worker.yml, N13–N16 (#3021 #3022 #3025 #3026),
  #3023 #3014 #3024 #3038 (pidossa, Pelikoodarin DOM-ehdot) #3028 #3029 #3033 #3035 #3036 #3034 #3042 #3043
  #3045, Siirtoseppä #2918 #2932 #2948 #2993 #3030, Karttaseppä #2962 #2980 #2989 #3044, vanhemmat luovutuksen mukaan.
- Sisältö: 71/71 kaupunkilehteä ja 6 maalehteä PR:issä; laatukierros 77/77 (9 korjausta); lisenssiportti
  5856 kuvaa 0 NC/ND; sisältöinventaario #3045 (sää/galleria/ennenNyt/turistiopas/kohdekartta puuttuvat
  71:ltä → erät käynnissä säästä alkaen).
- Linssit natiivissa valmiit (9 + radio = web, regressio iPadilla); piikit 216 → 25 ms; ajo 5 kun koreografia
  masterissa. Huippuvuoret tarkistus kun #3030 tuotannossa.
- Kartat: syvä Ranska ja reliefi 24 ämpärissä; E28 syvät tasot ajastettu klo 22–00 (vahti 02.45); polton
  rinnakkaisuus päivällä 4.
- Levy: siivous-launchd asennettu (fi.matkakirja.siivous klo 03.00, siivoa-levy.sh); Postivahti hälyttää < 35 Gt.
- Pelikoodari: 10 viestin raja täyttyy usein → tila tiedostossa proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md;
  omistaja voi kirjoittaa sessioon "jatka". Puhe.TalletaKehittajakoodi → Keychain tilattu.
- Julkaisija Opus kunnes nightly 25.9. klo 04 on ajanut kerran → sitten Sonnet.

## Sessiot (10) ja id:t
Julkaisija (Opus) local_9922c4b6, Natiiviseppä local_860f922b, Pelikoodari local_7b5a6c65, Natiivi-UI
local_9ed5a7df, Linssiseppä local_3273f209, Siirtoseppä local_7a1255c5, Karttaseppä local_445a5c7b,
Sisältökirjuri local_e5685e4a, Laitetestaaja local_992b689f, Postivahti local_6f3d4c35. Fable local_742d1717.
Nollauksia tänään 12; kaikilla rooleilla ajantasainen viesti-<rooli>-aloitus.md. Nollauskaava: Raamattu
KONTEKSTIN NOLLAUS (sessio kutsuu clear_session self, Fable tarkistaa list_events = 0, sitten aloitusviesti).

## Jono uudelle Fablelle
1. Omistajan lisälöydökset build 5:stä → numeroi jatkoksi (18…), välitä, kirjaa.
2. Natiivisepän build 6 -kohdat (2, 4, 14, 17, hehkurengas) → kuvasarjat omistajalle → SHA → build 6 Julkaisijalle;
   Laitetestaaja ajaa tarkistuslistan ennen buildia.
3. Omistaja ilmoittaa D1-oikeuden (~11.45) → Julkaisija ajaa sahke-worker.yml.
4. Natiivi-UI: Island-tason kuva, pariteetin ERO-rivit, radiopaneelin repaint.
5. Julkisen TestFlight-ryhmän kortti omistajalle kun build 6 on kokeiltu.
6. Nightly 25.9. klo 04 → Julkaisija takaisin Sonnetiin.
