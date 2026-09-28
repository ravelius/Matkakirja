# Päätoimittajan (ent. Fable) luovutus 28.9.2026 klo 11.1x (konteksti 66 %)

Sessio local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 "Päätoimittaja (Opus, xhigh)". Kaikki päätökset lokissa
docs/raamattu-loki/paatokset-2026-09.md 28.9. klo 07.02 → 11.07. Edellinen luovutus -20260928.

## 1. Roolisessiot (tili vaihtui 28.9. aamulla; ÄLÄ luo uusia)

| Rooli | Session id | Effort | Kärki |
|---|---|---|---|
| Postivahti (Sonnet) | local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b | medium | kierto 10 min, kuormavalvonta klo 17 asti |
| Julkaisija (Opus) | local_24e63224-112c-449a-b6a3-e10e4ed43f4b | medium | juna: #3528+#3517+#3537+#3535 yhtenä, sitten #3526, sisältöjuna, #3530–#3540, #3527 |
| Karttaseppä (Opus) | local_16f80454-5b30-4180-ae9b-8c6d1edb6779 | high | pallopoltto + laattavienti SIGSTOP → SIGCONT klo 17.00 (jatka-17.sh); pohja 2026-09-27 viety osittain |
| Natiiviseppä (max) | local_fcc10552-5810-49bf-b0cf-188456f1231c | max | aloituslento v3e2 (~13.30), sitten v3f; 1.0.35-juna |
| Pelikoodari (Opus) | local_11aca9cd-eda6-4db9-9019-8a153c8b8795 | high | Geysir-nimitesti → xAI-reaaliaikapulu koenappi → selite-erä (#3526:n jälkeen) |
| Linssiseppä (max) | local_7a457b99-7ecd-4634-93a0-0c02b53e8d24 | max → high Cupolan jälkeen | Codex-tilaus Cupola (tumma kuva + siluetit), LIVE-pilleri, lippu ilman kokokattoa |
| Natiivi-UI (Opus) | local_c6d63773-0270-4873-96f8-63c66cf52794 | high | käännösjonossa: pehmea-nakyvyys 98bd4bbd, lukijan-valikko 0c7bffd6 → videot; sitten muut luentakohdat, v3f-nimiöt |
| Siirtoseppä (Opus) | local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 | high | #3530/#3531 junaan Natiivisepän kuittauksella |
| Sisältökirjuri (Sonnet) | local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708 | high | SRB #3536, ihmeet-14 + maalehti-historia odottavat #3529:n mergeä (tehty?), sitten UKR/muut |
| Laitetestaaja (Sonnet) | local_36a45147-8407-4cfb-bbdb-c20d5f684735 | high | odottaa 1.0.35-SHA:ta |

Nollauskaava ja viestintä: SendMessage NIMELLÄ kiireisille (id-viestit jonottavat vuoron loppuun; muisti kiireinen-sessio-sendmessage-nimella).
Effort-sallinta on settings.local.json:ssa (toimii).

## 2. AVOIN KYSYMYS OMISTAJALLE (vastaa ensin)

Omistaja 11.0x kysyi, voisiko Clauden työ käyttää täyttä tehoa kun kone on vapaa ja väistää heti kun hän tarvitsee.
Päätoimittajan suositus (odottaa omistajan kyllä/ei): OLETUS kaikki raskaat työt `nice -n 15` (käyttää kaikkia ytimiä, väistää
heti); Julkaisija lisää niceen CI-työnkulkuihin repossa; päiväsääntö "4 ydintä" poistuu; GPU- ja muistikilpailu rajataan
edelleen (savukkeita ≤ 2, simulaattori 1); kun omistaja ilmoittaa tarvitsevansa konetta → `taskpolicy -b` + GPU-rajat.
Kyllä → kirjaa Raamattuun (Ydinajatus kohta 2) + ohje Julkaisijalle ja Postivahdille.

## 3. Tila 11.1x

- **Omistaja käyttää Macia klo 17 asti:** Clauden kuorma ≤ puolet; pallopoltto + vienti SIGSTOP (SIGCONT 17.00, Karttaseppä),
  raskaat prosessit taskpolicy -b, savukkeet kevyessä tilassa (#3539, lippu /tmp/matkakirja-kevyt pois klo 17, Julkaisija).
  Omistajan Capture One -vienti takkusi: syy CI-savukeajo ~24 chromiumilla + simulaattori → Julkaisijaa pyydetty perumaan savukeajo.
  Omistajalle neuvottu Spotlight-tietosuojaan /Users/Shared/Claude (GUI). Levy 144 Gi (siivous tehty, muisti simulaattorien-prb-valimuisti).
- **Aloituslento:** v3e video lähetetty omistajalle esikatseluun; v3e2 (S-reitti + laattaraja) ~13.30 → omistajalle kortilla (OK → merge 1.0.35).
  v3f: päivä/yö, valomeri, kello + "Päivä 1/80" jo valinnassa, lentoajat +6/+12 h, valaistu aloitusnäkymä, pehmeä esikääntö, marssi A.
  v3g muut kaupungit. Kaikki omistajan sanatarkat palautteet lokissa 09.17–09.38.
- **Web junassa** (ks. taulukko): lukijan valikko (omistajan sanatarkka toive 08.56 + 10.26), latausrengas, häivytys #3540, kulmanauha #3532.
- **Natiivi 1.0.35 -juna (Natiiviseppä):** marssi 8409b0a6, varalaatat (PASS), RAE/PATINA, päivityslappu, ihme-kuvana, nimet-laskuri,
  Linssisepän erät 5+6 + astro-selain + joet-2026-09-28, Siirtosepän offline-kerrokset, pehmeä näkyvyys + lukijan valikko (Natiivi-UI).
- **Raamattu PR #3527** (pienennys tiiviiksi, tehtäväkohtainen effort + uusi tili tarkistaa sallinnan, striimilukijan kaksi nappia,
  Päätoimittaja = Fable) odottaa Julkaisijan junaa.
- **Omistajan päätökset tänään** (lokissa): uuden pohjan vienti vaiheet 1–3 ja joet hyväksytty; offline-maasto täytenä (~1,75 Gt);
  historian hetket kaikkiin puuttuviin Euroopan maihin (hetki vain maan omalla alueella); ihmeet 14 maahan (Codex toimitti, hyväksytty);
  marssi A; ISS Cupola Codexin kuvana + LIVE; natiivin lippu ilman kokokattoa; TestFlight Testattavaa yhdeksi riviksi; xAI-reaaliaikapulu
  koenappina; nimi Päätoimittaja; Codexille "viesti Claudelle".
- **Haaran nimenvaihto** claude/bold-ride-vow4ki → paatoimittaja: seuraavassa tilinvaihdossa (roolit luodaan silloin uudelleen), vanha haara aliakseksi.
- Viikko 17 %, 5 h -ikkuna 64 % (nollautuu 11.50).

## 4. Opit

- Omistajan palaute kiireiselle roolille aina SendMessage NIMELLÄ + rivikuittaus.
- set_session_effort toimii kun sallinta on asetuksissa; simctl erase ja /tmp-poistot estyvät → omistajalle komento.
- Kuorman lukema (load) on macOS:llä I/O-odotusta paljolti; katso myös R-tilan prosessit ja GPU.
