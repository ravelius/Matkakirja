# Natiivi-UI:n luovutus 27.9.2026 (z), NOLLAUS klo 22.4x (konteksti 73 %)

Jatkaa luovutusta (y). Fable = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Simulaattorit: oma iPhone 17 FB234D08, jaettu iPad
Pro 11 503000D1 — MOLEMMAT SAMMUTETTU (YÖTAUKO klo 22.30 alkaen Karttasepän polton ajan: ei Unity-käännöksiä, ei simulaattori-
eikä headless-ajoja; käännökset aamulla, kun Fable/Karttaseppä ilmoittaa). Käännökset proto-kaanna.sh:lla :00–:15-ikkunassa.
Proto-worktreet (katto 3): wt/proto-natiivi-ui-{vieritys,sisallys,pariteetti}. Scratchpadin apuskriptit (kopioi talteen
uuteen scratchpadiin vanhasta /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/be77fffb-…/scratchpad/):
k.sh (komennot i|p), kaanna18.sh (ajastettu käännös, haarat tiedostosta), kestomittaus.sh, kontrasti.py (pikselikontrasti
ui-puu + kuva, ylin modaalikerros), savy.py, siirtyma.py.

## VALMIIT TÄNÄÄN (kaikki JUNASSA juna/b13 ≥ 9f83c48f)
- Jono 1–4: vieritys-2 (iOS-heitto 612→952 pt, opas/linssi ≥ 70 % → pysäytyskuva, 120 Hz ehdoin), elamapalkki-varit
  (3 punaista + 5 oranssia), livia-lyhyt (kerran + ohita, kupla 336 px), luentanappi OK 1.0.31:ssä (ratas-haara pudotettu).
- Lisäksi: pohja-savy-saatimet, offline-pilleri-levossa, tekijamerkinnat (Kuvatekija; commons-tekijat.json pakettiin kun web
  #3438 mainissa), raha-muoto "400 £" (iPhone + iPad + laukku), salaisuudet-pois (web #3475), saavutettavuus (VoiceOver-silta
  UITK → AccessibilityHierarchy, mittari `ui saavutettavuus`, C1 = 12 pientä nappiluokkaa Kosketusnapin 44 pt:n alaan).
- Raportti docs/raportit/natiivi-saavutettavuus-20260927.md. OMISTAJA HYLKÄSI näkyvät kontrasti- ja 44 pt:n rivimuutokset
  (kontrasti-44 poistettu): näkyviin väreihin/mittoihin ei kosketa (muistio ei-nakyvia-saavutettavuusmuutoksia).
- Laitetestaajan App Store -löydökset: vaaka = debug-kierron artefakti (omistaja testaa TF:ssä), pulu lehdellä OK, raha tehty.
- Maakuntakortti (Sisältökirjuri) todennettu toimivaksi.

## JONO 1.0.33 (Fable 22.4x)
1) KUVAKORTIN JA NOSTONIMIÖIDEN VÄLKYNTÄ (omistaja 1.0.32, Ateena): koodi valmis natiivi-ui/kuvakortti-vakaa @ 6f1ec96c
   (wt/proto-natiivi-ui-sisallys), KÄÄNTÄMÄTTÄ. Syy: Kutsuminiatyyri valitsi paikan joka ruudulla näkyvien nostomerkkien
   mukaan → hyppi; nimiöillä ei aikahystereesiä, merkit kierrätetään indeksillä. Korjaus: paikka lukitaan kaupunkiin kerran
   (lukittu-siirto), piiloutuu paikallaan vain kalusteen/pisteen/nappulan peitosta (PiiloS 0,4 + Vara 6 pt, peitossa-tila
   erillään muista piilotussyistä); NostotKartalla: Vakaa()-aikahystereesi 0,35 s id:n mukaan nimiöille (lukko-polku) ja
   kalusteen/mallin alle jäävälle merkille (vain levossa, tunnetuille), tilahystereesi 6 px, AjastaArvio ratkaisee vireillä
   olevan levossa. Vakio-SSE/maasto: ruutupisteet korkeudella 0 → ei suoraan; Natiivisepältä kysytty nimikerroksen
   uudelleenladonnan värähtelystä (LaatikotMuuttuivat) Ateenassa. AAMULLA: käännä juna/b13 (ENNEN) ja
   juna/b13+natiivi-ui/kuvakortti-vakaa (JÄLKEEN), Ateena (`ui aloita ateena`), video ennen/jälkeen (recordVideo, rajattu
   ruutuun) Fablelle → merge-pyyntö Natiivisepälle.
2) LUKIJAN ÄÄNEN VALITSIN "klikkautuu pois" (omistaja 1.0.32): korjattu natiivi-ui/aanivalitsin @ 1b47f46e
   (wt/proto-natiivi-ui-vieritys), KÄÄNTÄMÄTTÄ. Syy: DropdownFieldin ponnahduslista (GenericDropdownMenu) on paneelin
   juuressa → KortinLukija.OhiNapautus sulki säätöpaneelin ennen valintaa. Korjaus: Pudotusvalikossa() ohittaa listan
   napautukset. C1 ei liity. TARKISTA LISÄKSI: valittu xAI-ääni todella kuuluu (Striimiaani.Pelinimet tunnukset ↔ Lukijaaani
   ja worker hyväksyvät; testaa yhdellä lyhyellä nostolla — Fablen xAI-sääntö: säilöttävät tekstit, sama lyhyt nosto, ≤ 5 000
   mrk/vrk kehittäjäpuheelle). Video ennen/jälkeen Fablelle.
3) C1:n PIKSELIVERTAILU aamulla: juna ennen/jälkeen 015fdb8e samoista näkymistä (kartta, valikko, lehti, nosto, opas,
   kysymys) — jos yksikin pikseliero, pudota C1 (Rakenne.cs Laajennettavat-lisäys).
4) "400 £" ja salaisuudet pois ovat JUNASSA (ei toimia); VoiceOver-silta junassa — oikea VoiceOver-kokeilu laitteella (TF).

## OPIT
- Proto-käännöksen jono voi kestää (21:00-käännös valmistui 21.41 juna-käännöksen takia).
- USS-värejä muutettaessa huomaa valmiiksi sekoitetut sRGB-arvot (rgb(149,136,119) = rgba(70,51,31,.55) paperilla).
- Python-regex USS-muokkauksessa: älä muokkaa merkkijonoa kesken finditer-silmukan (käytä re.sub-korvaajaa).
- iPadin kehittäjätila ei ole päällä; Kehittäjä-osa testataan iPhonella.
- Simulaattorin näyttö on 60 Hz: 120 Hz vain laitteella.
