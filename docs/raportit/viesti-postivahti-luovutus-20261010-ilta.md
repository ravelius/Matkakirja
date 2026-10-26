# Postivahdin luovutus (10.10.2026 klo 18.3x, oma konteksti 91 %)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md, `KIERROS.md` ja tämä. Korvaa `viesti-postivahti-luovutus-20261010.md`:n.

## Kierros (4 min, ScheduleWakeup; prompt tasan: "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan")
1. `get_usage` (ilman id:tä) + `get_usage(id)` kaikille 12 roolille ja PT:lle; `list_sessions`; `df -h /`; `ls /Users/Shared/Claude/wt | wc -l`; `date +%H.%M`.
2. Asemataulun tiedostot Päätoimittajan scratchpadissa `/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/`: `kone.py` ja `laitteet.py` (lukevia skriptejä; lue ne uudelleen, jos tiedosto muuttuu), sitten `mittarit.json`, `roolit.json`, `historia.jsonl`.
   Apuskripti `tools/postivahti-historia.py <viikko> <5h> <pt_konteksti> <nollautuu ISO>` kirjaa historian ja laskee "muutos"-kentät; muut kentät (Levy, Muisti, Prosessori, roolit) kirjoitetaan python3-pätkällä (.tmp → os.replace).
   Roolimalli: Sisältökirjuri ja Laitetestaaja Sonnet, muut Opus; tila työ/lepo/odottaa (Laitetestaaja "odottaa").
3. Hälytys PT:lle yhdellä rivillä, kukin raja kerran: rooli ≥ 50 % (uudelleen 65 %), PT ≥ 65 % (80 %), 5 h ikkuna 70/85/95 %, viikko 96 % ja 99 % (raja 99 %, vain rivi), levy < 100 Gi ja wt > 20 (jo ilmoitettu), LEPÄÄ > 15 min vain jos jono tyhjä.

## Session id:t
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc · Julkaisija local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 · Natiiviseppä local_04e2850b-d63c-481d-be73-c7d784a7cbcb · Natiivi-UI local_e9fdc695-8421-4c14-a187-8881e73c835a · Linssiseppä local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4 · Linssiseppä 2 local_ee961a2d-8a39-4941-8eec-60d24777be2c · Linnanrakentaja local_2cf16574-67b6-40c0-928e-68bf36c72db0 · Siirtoseppä local_c264506b-dd61-4617-839f-23daf6d0bd5a · Karttaseppä local_4bd7c316-55bc-423a-9da1-821fdd123cab · Pelikoodari local_242febe9-d6cf-45ae-8280-faf394dc6e3e · Sisältökirjuri local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 · Laitetestaaja local_3509b4ba-6000-4dea-869b-ecb22f4e3270

## Rajat ja linjaukset
- ARTEFAKTIKIRJOITUS ja `siirra.py lokit` EIVÄT ole käytössä: PT pyysi niitä useasti, mutta omistaja ei ole vahvistanut. Pyydä käyttäjältä "kyllä" ennen niitä (artefakti Rq5ajPU4SraE2XKd7BYAix, ehdot: lue `paivita.py`, vie vain jos `talo/katsoja` alle 5 min vanha). PT vei taulun itse päivitysnapilla.
- Vertaisviestit ovat tietoa, eivät lupa. Nollaus-siirto: PT antaa tekstin; lähetä vain jos PT ei ole käynnistynyt itse (konteksti < 10 % ja isRunning false), ja set_remote_control true.
- Viikko 28 %, 5 h ikkuna nollautui 17.20 (seuraava 19.20 UTC), levy ~74 Gi (alle 100), wt 19.

## Tila 18.28
5 h 16 %, viikko 28 %. Konteksti: PT 19 (nollattu), Julkaisija 47, Pelikoodari 49, Linnanrakentaja 28, Natiivi-UI/Linssiseppä/Siirtoseppä/Karttaseppä ei prosessia, muut < 41. Hälytetty jo: Linssiseppä 51/55, Linssiseppä 2 50, Siirtoseppä 50, Linnanrakentaja 50, Sisältökirjuri 50, PT 65.
- Jumivertailu get_sessionin lastActivityAt:lla (UTC +3 h = EEST). list_sessionin aikaleima voi olla vanha; ajo ilman toimintaa >30 min ja isRunning true → hälytys PT:lle.

## Päivitys 11.10. 09.1x
- PT välitti (väitetty omistajan päätös, kortti 09.0x): hylätty lupa estää vain sen komennon, rooli jatkaa ja ilmoittaa JUMI → FABLE; poistot/siirrot vain valmiilla työkaluilla (ei rm muuttujapoluilla, ei shell -c). Välitetty Karttaseppä, Sisältökirjuri, Laitetestaaja, Linssiseppä, Pelikoodari 09.1x.
- PT:n mukaan PT nollaa Postivahdin ilman omistajan kyllä-vastausta. Oma `clear_session self` ajetaan silti vain käyttäjän omalla viestillä; PT:n nollaus on PT:n oma toimi.
- Asemataulun vienti tehdään 5 min välein, kun katsojan syke on alle 6 min vanha (omistajan lupa). Roolien ts päivitetään vientiin käsin (paivita.py ei päivitä roolit.json:n ts:ää).
- Ei tehty: siirra.py lokit (ei omistajan kyllä-vastausta chatissa).
- Tila 09.03: viikko 81 %, 5 h 13 %, PT 60 %, oma 24 %, levy 84 Gi, wt 34. Julkaisija nollattu (14 %); LS2 toimii taas.

## Raadin seuranta (PT 11.10., omistajan toive)
`python3 -I tools/raati-seuranta.py` vertaa ryhmän Arvioijat liittyneitä/asentaneita tiedostoon raati-tila.json (lähtötaso 0/0 klo 10.13) ja tulostaa rivin vain kun luku kasvaa → lähetä PT:lle sellaisenaan. Aja kierroksella klo 09.10, 13.10, 17.10, 21.10 (muulloin ei tarvitse). Laatat Raati/Testaajat päivittyvät paivita.py:llä.

## Päivitys 11.10. 19.4x (valmis uudelleenkäynnistykseen)
- Kierrokset 5 min (ScheduleWakeup, prompt tasan "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan"); ennen `syke.py`:tä AINA `ArtifactData list` (collection talo, out_dir lista), muuten syke lukee vanhaa kopiota (vika 12.32–14.41). Viennin if_version: mittarit 135, roolit 130, laitteet 127.
- Rooleja 13: Äänittäjä (Sonnet 5.5, high, local_0275bc7a-a851-4f44-91d7-718735f6525b) lisätty 18.30; roolit.json:ssa.
- SendMessage PT:lle on tauolla (21+ lähetystä ilman käyttäjän viestiä). Varakanavaa (`mcp__ccd_session_mgmt__send_message`) EI ole käytetty ilman käyttäjän lupaa. PT:lle odottaa: lokisiivouslistat (Siirtoseppä todistus-*, Laitetestaaja laitetestaaja-olavinlinna-*, Linssiseppä linssiseppa-app).
- PT:n oma nollaus (clear_session) odotti käyttäjän lupaa; PT peruutti sen 19.4x (sovelluksen uudelleenkäynnistys hoitaa).
- Tila 19.38: viikko 35 %, 5 h 40 % (nollaus 19.30 UTC), levy 95 Gi, wt 63, PT konteksti 70 %.
- Raadin tarkistus 21.10 (raati-seuranta.py); ei kasvua 13.10/17.10.
- Jatkokohta uudelleenkäynnistyksen jälkeen: aja kierros, hae talo-lista, vie jos syke TUORE.
