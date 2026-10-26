# Päätoimittajan luovutus 10.10.2026 klo 17.0x (oma nollaus ~65 %)

Session local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (pysyy samana). Edellinen luovutus: viesti-fable-luovutus-20261010-iltapaiva.md. Muisti: fable-tila-20261010-ilta.
Työjonot: scratchpad/tyojonot.md (Päivitetty-rivi, JUNA 179 -osio ylimpänä). Kirjattavat: scratchpad/kirjattavat-20261006.md rivit 1032– EIVÄT ole lokissa → seuraava loki-PR
(rivit 1016–1031 ovat PR:ssä #4358). OMISTAJA ON HEREILLÄ ja muokkaa Asemataulua aktiivisesti. Kysymykset aina korttina. Rutiinivuoron loppuun vain "–".
KELLONAJAT AINA date-komennosta (tänään arvasin 17.xx, oikea oli 16.4x → korjattu PR:ään #4358).

## 1. Junat
- TF 178 TestFlightissa 16.40 iOS + Mac sisäisellä ryhmällä (iOS 834278eb, Mac 82c7a246; BUILD 178 = 9e10d4d33; muutosloki #4356). Ulkoinen ohitettu (pitossa).
- JUNA 179 kertyy: runko natiiviseppa/juna-179 37835358d (Natiiviseppä kokoaa). KUITATTU: Siirtoseppä 5f4b1f616, 187359ae0-ketju, 51029519e, 1f7429f6b, 0771b2e05;
  NUI 79eb3c621 + 293eae603; LS2 ilmakeha-kaikkialla d3885f6d1; Pelikoodari pulu-nor-svk-svn f31979deb. ODOTTAA: MUSEO2 (LS1 42cb5efb8: yksi korjaus — iPhone pystyssä
  Yövartion nimikyltin alarivi kehyksen päällä → kuvapari → kuittaus), NUI maakortin nimikesarake (korjaus 1, automaattinen leveys) + kuvapari, Pelikoodari #4357 (web-rivi),
  Olavinlinna v47 (LR vie uudelleen v45h:n pohjalta → Siirtoseppä kytkee + rannan kuvapari).
- !!! OMISTAJA 16.5x: "julkaise juna heti kun pariisin saapuminen ja kip korjattu" → JUNA 179 LÄHTEE HETI, kun LS1:n KIIRE-korjaus (Pariisin esittely saapuessa,
  ei kuvia kipin päälle) on PT:n kuittaama: Natiiviseppä lukitsee kuitatuista (myös LS2 peking-vesivari efc88563c), muutosloki PT:lle, Julkaisija TF iOS + Mac (4. TF).
  Valmistuttua omistajalle yksi rivi.

## 2. ASEMATAULU (https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix, versio 35, capabilities db + comments)
- Lähde scratchpad/talon-tila.html; skriptit scratchpad/asemataulu/{laitteet,kone,paivita}.py. Omistaja JAKOI sen muokkausoikeudella muille tileilleen → tilinvaihdossa sama osoite.
- Dokumentit (kokoelma talo): mittarit (Postivahti: + pt_konteksti, 5h nollautuu, Muisti/Prosessori), roolit (Postivahti), laitteet (laitteet.py), tehtavat (PT: roolin lyhyt
  tehtävä, näkyy "Työ käynnissä" -tilalla), junat (PT: uusin ensin, enintään 3, käännössä oranssi + edistys 0–5 + valmis_arvio), tyolista (PT: tila valmis + valmistui
  → Valmistuneet-lista), huom.
- PÄIVITYSNAPPI oikeassa yläkulmassa (näyttää vain iän): comments.sendToClaude "Päivitä Asemataulu" → herättää tämän session (artefaktin vahti, auto-replies armed) →
  `python3 -I scratchpad/asemataulu/paivita.py` → ArtifactData list (versiot) → batch set vienti/{mittarit,roolit,laitteet}.json if_version → ArtifactComments reply
  "Päivitetty." + resolve (TOIMII 17.00: automaattinen vastaus tulee ketjuun itsestään → älä vastaa uudelleen, vain päivitä + resolve). NOLLAUKSEN JÄLKEEN: julkaise sivu kerran samasta lähteestä url-parametrilla (arms auto-replies) ja tarkista `ArtifactComments watch` -listaus.
- TEKEMÄTTÄ: laitteet.py:n laajennus (omistajan kortti 16.4x: Unity-käännökset, Pilviajot, Simulaattorit, Codex-tilaukset + Blenderin prosessori kenttänä prosessori 0–100
  = %cpu / ytimet). Agentti pysähtyi omistajan keskeytykseen eikä kirjoittanut mitään → TEE ITSE (ei uutta agenttia ilman omistajan pyyntöä): Unity = Unity -batchmode +
  xcodebuild (actions-runner → "TestFlight-käännös (CI)"), Pilviajot = origin/pulu-*-pilvi alle 40 min vanhat commitit, Simulaattorit = `zsh /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh
  simctl list devices booted` (nimet → omistaja), Codex = claude/postilaatikko-haaran avoimet tilaukset. Sivu osaa jo näyttää rivit ja prosessoripalkit.
  Postivahti ajaa laitteet.py:n ja kone.py:n kierroksellaan.
- Raamattu-PR #4358 MERGED 16b9f65d3 (worktree poistettu); se sisälsi: Asemataulun täydennykset (junat, laitteet, valmistuneet, muisti/prosessori, jako muille tileille) + loki 17 kirjausta.
  PUUTTUU vielä Raamatusta (SEURAAVA DOCS-PR uudesta worktreestä): PÄIVITYSNAPPI + paivita.py + comments-kyky, BUGIKORJAUKSET-paketti työlistassa (versio 36),
  LATAUSKUVA-pallon uusi linja (köysi ketjukäyränä, selvä heilunta), tools/asemataulu/{asemataulu.html,paivita.py,laitteet.py}, kirjattavat 1032–.

## 3. Omistajan päätökset tänään (iltapäivä)
- ND v4d HYLÄTTY ("väri on liian kirkas ja keltainen", pystynousut tyhjät) → LR ND v5: kivi harmaammaksi, pystynousujen yksityiskohdat ensin tekstuureina, porttiin
  keltaisuusraja → LS2 pari oikea | v4d | v5 → PT → omistaja. Blender ajaa LR:n tekstuuriprojisointia.
- ILMAKEHÄ KAIKKIIN KAUPUNKEIHIN (kortti) → LS2 d3885f6d1 kuitattu 179.
- Krediitti kuluu (kortti) → Pulu jatkuu pilvessä. Pääkaupunkirivi maakorttiin (PT:n linjaus A, Väkiluku-rivipohja; ISR/PSE "Hallinnon paikka").
- ISS-kupoli 3D ei voittanut nykyistä → nykyinen jää (työlistalla "myöhemmin").

## 4. Käynnissä
- Pulu pilvessä: NOR/SVK/SVN HYVÄKSYTTY + kultaiset (f31979deb) → Julkaisija vie paketit; BIH/BEL/ISL valmiit (f04409dd5 / d61302d99 / 01a0fe070) → SK pistokoe →
  korjaukset `claude -p "$(cat ohje)" --cloud <session>` erillisinä komentoina → Julkaisija → Pelikoodari kultaiset; MLT session_01RENs8ZXpU9bcKikYo7iEqB ja LUX
  session_01Sgu6VQnhcYNa44qL6b7Ci9 käynnistetty 16.52. Seuraavaksi pienet maat.
- Codex: pääkaupunkikuvat 324/342 hyväksytty, uusintakierros 18 kuvaa (a24a96b49). Reykjavík/Tunis/Kotte (6 kuvaa) ylittää määrän → OMISTAJAN KORTTIIN.
- Kaupunkikappaleet: erä 1 (16) odottaa omistajan kuuntelua VANHAN TILIN äänisivulla (Qr7WvfZvKiNxGNwbFEeW2t, ei tällä tilillä) → kysy omistajalta, näkyykö sivu;
  tarvittaessa julkaise äänisivu tällä tilillä (työkalut vanhan session scratchpadissa .../scratchpad/aanisivu, tee_aanisivu.py). Erä 2 (46, ~3,7 $) kehotteet valmiina.
- Julkaisija: #4357 merge, #4354 sisältöpaketti (Aasia + Afrikka), Pulu-viennit, Pekingin vesiväri ämpärissä (0dd206f9), LS2 Peking-pari tulossa.
- Levy ~71–84 Gi (raja 100): siirra.py lokit 3 h välein (seuraava 18.00); wt 32 → Pelikoodari 7, Karttaseppä 6, Natiiviseppä 5 muistutettu.

- OMISTAJA 16.5x: "kuumailmapallon köysi pitää taipua aidosti ja pallo pitää liikkua selkeästi tuulessa heiluen." → N-UI (latauskuva, juna 179) ketjukäyräköysi +
  selvä heilunta (~±2–3°, ~±10–15 pt, 5–7 s, puuskat) → video/arkki PT:lle → omistajalle; Raamatun LATAUSKUVA-kohta päivitettävä (kumoaa vähäeleisen ±0,5–0,75°).

- !!! KIIRE OMISTAJA 16.5x (iPad, TF 178): Pariisin esittely ei ala saavuttaessa, vaan vasta kipin napautuksesta, ja kuvat tulevat kipin päälle → LS1 toistaa ja korjaa
  (epäily 92cda8472) → juna 179 → kysy omistajalta nopea TF, kun korjaus on kuitattu.

- NUI NOLLAUS (51 %, pyydetty 17.06): NUI tekee korjauksen 1 loppuun, luovutuksen viesti-natiivi-ui-luovutus-20261010-ilta.md ja clear_session self → SINÄ: tilaa
  lepoilmoitus (SendMessage notify_when_idle), tarkista get_usage < 10 %, lähetä aloitusviesti (docs/raportit/viesti-natiivi-ui-aloitus.md NUI:n checkoutissa) ja RC päälle.
- Siirtoseppä: 70 pisteen laaja testi juna 179:n rungolla → rivi PT:lle; sitten LR:n v45f-pohjaiset hashit + rannan kuvapari.

## 5. Omistajalle avoinna
- Kaupunkikappaleiden kuuntelu (ja lupa erälle 2), Reykjavík/Tunis/Kotte-kuvat. Tulossa: ND v5 -pari, Peking-pari, museo 179:ssä.

## 6. JONOKIERROS-kehote (CronCreate "7,27,47 * * * *")
Kuten 14b62637 tässä sessiossa (sanatarkka teksti: luo uudelleen samasta pohjasta; kohdat 0–8, ASEMATAULU TALTEEN SAMANA PÄIVÄNÄ, laitteet.json synkkaan).
