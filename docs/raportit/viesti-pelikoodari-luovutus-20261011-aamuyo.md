# Pelikoodarin luovutus 11.10.2026 klo 03.5x (nollaus 51 %, PT)

Edellinen: viesti-pelikoodari-luovutus-20261011-yo.md. Viestit SendMessage nimellä: "PÄÄTOIMITTAJA (Opus, max)", "Julkaisija (Opus, high)",
"Siirtoseppä (Opus, high)", "Linssiseppä (Opus, high)" (LS1), "Linssiseppä 2 (Opus, high)" (LS2), "Karttaseppä (Opus, high)".

## Tehty 11.10. 00.3x – 03.5x
- **Peili-404 #4379** MERGED de037a1f4, peilaus vihreä (liput 244, NAMA 200); worktree poistettu.
- **Natiivin kultaiset web #4380:lle** (Karttaseppä, Tukholma aloituskaupungiksi): proto pelikoodari/kultaiset-aloituskaupungit 73fc9be13
  (kysymys-, laatta-, pelijälki = PR:n tiivisteet; syötepaketti tuoreesta viennistä, Lontoo 51,507/−0,128; kaanna.sh 470/470).
  #4380 PIDOSSA kunnes TF 181 TestFlightissa → Julkaisija liittää junaan 182 (pidossa.txt). Worktree wt/proto-pelikoodari-kultaiset.
- **Soundly-kippi juna 182**: LS1 kytki jo (linssiseppa/soundly-kippi-182 229141f7c); tarkistettu 37/37 tunnusta, lyöntimäärät 11/9/4 (Oslo 4 lyöntiä
  103 s:n alkuperäisestä). Ei muutoksia minulta.
- **Olavinlinna (PT:n yösuunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/olavinlinna-yosuunnitelma-20261011.md)**, haara proto
  pelikoodari/olavinlinna-aanet (pohja siirtoseppa/botti-kavely 9c59fcf3b), worktree wt/proto-pelikoodari-olavi-aanet:
  - B3 äänet 25c6987fe (KUITATTU 181): tyrmän ääniympäristö (Ydin TyrmanAanet + SeikkailuTyrmaAanet: tipat kaivo-01…06, vartijan ohikulku,
    muunnelman ohjaava ääni), SeikkailuVartijat.VaroitusAlkoi (Action<Vector3>, varusteet + raapaisu; Siirtoseppä kutsuu A1:stä), riidan
    repliikit vain kerran (myöhemmin airon loiske), soutaja-2 ei heti veneen jälkeen (SeikkailuRepliikit.SoitostaS).
  - A4 vihjeet näkyviin (KUITATTU 181, v4 f94ff6d02): Ydin VihjeLento + SeikkailuVihjeKipina (kipinä katseen edestä kohteeseen, 1,3–2,4 s, perillä
    2 s kirkkaana, ruudun ulkopuolinen kohde → reunalla kohteen suunnassa, koko ≥ 4,5–6 % etäisyydestä), ValoVihje.Lopeta, kimalluksen
    volumetrinen savuhehku pois. Ei Pulua (omistaja 8.10.; PT vahvisti). Todiste lokit/pelikoodari-a4-video-v4/a4-vihjeet-kooste-v4.mp4.
  - 57309b1e8 (EI VIELÄ SIMULLA): Laitetestaajan uusinta 181d ei nähnyt kipinää, koska kamera oli tyrmän nurkassa seinää vasten (lähtö 1,6 m ja reuna
    2 m seinän takana). Reunalla ja lennon 0,5 s:n alussa kipinä nyt UI/Default + unity_GUIZTestMode = Always (seinien päällä).
  - Tyrmän taso: 6bdf28c69 (SeikkailuSade.TyrmaTippuminen 0,6, tipat 0,6–0,9) mitattu −38,6 dB (ennen −41,5). 32aa0e9b4: TyrmaTippuminen 1,0 +
    tyrmän pohja linna-tila-01 (Soundly "Underground, Dungeon … Constant Hum", pankissa kytkemättä) 0,9 2D-silmukkana → laskennallisesti ~−31,6 dB.
    TAVOITE (PT) −32…−30 dB.
- Levy: 8,4 Gt omia lokikansioita NAS:lle (Matkakirja-arkisto/lokit/, tarkistettu ilman ._-tiedostoja). Kolme eilistä orpoa recordVideo-prosessia lopetettu.

## KESKEN / JONO
1. **Tyrmän tasomittaus 32aa0e9b4** — IRROTETTU AJO KÄYNNISSÄ (perl setsid): scratchpad kaanna-ja-mittaa.sh = proto-kaanna.sh oman haaran
   (app lokit/pelikoodari-app-olavinlinna) → odota-ja-mittaa.sh (≤ 1 muu simu) → mittaa-tyrma.sh. Tulos: lokit/pelikoodari-tyrma-taso-<HHMM>/ajo.log
   (rivi mean_volume). Skriptit: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/fd21b7a3-c5ba-4df6-b374-5841a45db9af/scratchpad/
   (simu/k.sh, simu/sk = simkosketus, simu/ajo-a4.sh, simu/mittaa-tyrma.sh). Ilmoita Julkaisijalle KÄÄNNETTY + SHA ja SIMU VAPAA; luku PT:lle rivillä.
   Jos −32…−30 dB ei täyty: säädä PohjaTaso (SeikkailuTyrmaAanet) dB-erotuksella.
2. **Kipinän näkyvyys oikeilla kosketuksilla**: Laitetestaajan 3. kierros yhdistetyllä v6:lla (sisältää 57309b1e8 + 32aa0e9b4). Jos yhä ei näy, pyydä
   simuvuoro ja aja ajo-a4.sh (video + ääni + hetket) tyrmän nurkasta.
3. Kipin soittolista ja kaupunkimusiikin 7 koetta odottavat omistajan valintaa äänisivulla (ennallaan). Museon kertojan pisimmät: omistajan päätös (PT).
4. Vanhat: Freesound odottaa omistajan kirjautumista ti 13.10.

## Opit
- recordVideo: lopeta simctl-prosessi SIGINT:llä OMALLA pid:llä (pgrep -f polulla); kesken jäänyt nauhoitus jättää SimRenderin kirjoittamaan
  (2 Gt, "Host recording is already in progress") → vain simun sammutus lopettaa. Ruutukuvat (simctl screenshot ~1 s) ovat liian hitaita lyhyille
  efekteille: todiste aina videona.
- Testikomennolla (linssi poikki vene 1) aloitettu seikkailu ohittaa vihjejärjestelmän; pelaajan reitti: `ui ui seikkailutapit pala` (sama kuin
  valikon AvaaPelattavaPala). Natiivi-UI 181: kerran valittu menee suoraan veneeseen ilman Pelaa-korttia.
- Simun stdout-loki ei kirjoitu scratchpadiin → konsoliloki proto-3d/lokit/-kansioon. Kehittäjätila: `linssi kehittaja 1` (ei peli-kanava).
- NAS:lle kopioitaessa macOS luo ._-tiedostot: tarkistus ilman niitä.
- Sprites/Default noudattaa syvyyttä: ruudun reunan merkki seinän takana ei näy → UI/Default + unity_GUIZTestMode.

## Worktreet
wt/proto-pelikoodari-olavi-aanet (B3+A4, 32aa0e9b4; poista kun juna 181 lukittu), wt/proto-pelikoodari-kultaiset (#4380, juna 182),
wt/proto-pelikoodari-lataus (juna 181), wt/proto-pelikoodari-pulu, wt/pelikoodari-louvre (#4365).
