# Päätoimittajan luovutus 29.9.2026 klo 22.1x (oma nollaus, konteksti ~80 %)

Sessio local_593b89a1-2514-4d74-b956-2a73db862382 ("Päätoimittaja (Opus, xhigh)"), RC päällä, haara claude/bold-ride-vow4ki.
Tilinvaihto tehtiin klo 16.5x (siirtoprompti viesti-fable-siirtoprompti-20260929.md). Kaikki päätökset lokissa
(docs/raamattu-loki/paatokset-2026-09.md, grep "29.9.2026").

## Roolit (sessionimissä malli ja effort, omistajan linjaus; max vain kun oikeasti tarpeen)

| Rooli | id | Kärki nyt |
|---|---|---|
| Julkaisija (Opus, high) | local_22b29f10-7af8-43fc-a974-1d666f716c97 | TF 1.0.55 viennissä (BUILD 55 99fd971f), 1.0.56-juna auki; web-juna vain valmiit + sisältö; #3641 delta-vienti junaan |
| Natiiviseppä (Opus, high) | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 | 1.0.56 (radion omistajapalaute), natiivin deltasarja, junat ilman NYT-viestiä |
| Natiivi-UI (Opus, high) | local_33ba1387-d688-4e44-8e05-10951e61efc0 | nollattu 21.3x; valikot-yhtena 25885ed7 (pillerin päivärivi, Äänimaisema) seuraavaan junaan |
| Pelikoodari (Opus, high) | local_97810d35-a79c-484b-8573-660a4c40eaa6 | natiivin UI Natiivi-UI:n rinnalla; Pulu-chat valmis 1.0.54; GPU-käynnistysapu #3636 mergetty |
| Linssiseppä (Opus, high) | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | ISS (Cupola-hionta ff2f6e6e, Codexin kytkimet odottavat) |
| Linssiseppä 2 (Opus, high) | local_fc4fcc54-9fa1-4ba2-9de2-97a8ee884e10 | radio: 1.0.56 radio alemmas + maakuntanappi piiloon (71a0338c) |
| Linnanrakentaja (Opus, high) | local_08e82dfc-ac27-4a27-a62b-b0ff862022ae | elävä linna: luonnos B (muurinharja + vartija) kesken, sitten rakentaminen käsikirjoituksen mukaan omistajan OK:lla |
| Siirtoseppä (Opus, high) | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | linnan Unity-puoli (liekit, savu, leikkausikkuna, laatutasot, järvi, ASTC) |
| Karttaseppä (Opus, high) | local_37708e68-5a58-45ca-8dee-c13620993531 | jokipoltot PIDOSSA; delta-vienti valmis (#3641, −95 % PUT); R2-siivousskripti omistajalla |
| Sisältökirjuri (Sonnet 5.5, high) | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | maakuntajono 3 maata/PR (MKD+MNE+CYP …) |
| Laitetestaaja (Sonnet 5.5, high) | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | pikasavuke (≤ 5 min, kaikki kehittäjätilan linssit avataan kerran) |
| Postivahti (Sonnet 5.5, medium) | local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7 | kierto 10 min, konteksti 70 %, levy 50 Gi, viikko 94/97 % |

## Tämän illan sitovat linjaukset (kaikki lokissa)

- NATIIVI ENSIN, WEB RAJATUMPI (Raamattu, Ydinajatus): web-pelin käyttöliittymä tauolla, webin muutokset docs/web-jono.md:hen
  (Päätoimittaja ylläpitää); sisältö, kartta ja työkalut jatkuvat. Ei-pakolliset testit, jotka omistaja voi testata, ohitetaan.
- Vain ISS, linna ja radio työn alla; muut linssit tauolla (Tähtitaivas ja Yökartta valmiina kehittäjätilassa, Vesistöt tallessa).
- Pysyvä TF-vienti jokaiselle PASS-buildille (omistajan lupa Julkaisijan sessiossa); CI-pikatie; BUILD → TF-ryhmä ~40 min.
- Kevyt tila (/tmp/matkakirja-kevyt) kun omistaja tarvitsee konetta; ≤ 2 selain-/rakennusagenttia per rooli; lopetus vain
  pid:llä; GPU (--use-angle=metal) kaikissa selaintyökaluissa.
- Pulun ääni pois ISS-kohtauksesta; radio takaisin yksinkertaiseen paneeliin (tehty); maarajat kevyiksi + hento ranta (tehty).
- Olavinlinna vain natiiviin: Senaatti-kiinteistöjen fotogrammetria (CC BY 4.0) + Blender-sisätilat + Poly Haven CC0
  (omistaja OK); elävän linnan käsikirjoitus docs/raportit/linna-elava-kasikirjoitus-20260929.md (omistaja OK kortilla).
- Cloudflare syyskuu $40,92: pääsyy 4,9 M R2-PUTia täysistä karttavienneistä → delta-vienti; vanhojen pohjien poisto
  omistajalla (pyramidi-poltto/r2-siivous/poista-vanhat.sh, ajo taustalle nohupilla, loki poisto.log).

## Auki omistajalle

1. Elävä linna: rakennetaanko luonnosten (A, C, D pelistä + Blender) suunnalla? B tulossa.
2. R2-poisto: varsinainen ajo (nohup-komento annettu 22.0x) — seuraa poisto.log:ia ja kerro valmistuminen.
3. Jokipoltot pidossa, kunnes omistaja päästää (vienti deltana).
4. ISS-kytkinmoduulit: Codexin toimitus odottaa (posti/fable-codex-iss-kytkimet-20260929.md) → esikatselu omistajalle.

## Opit

- Tarkistin (luokitin) estää Päätoimittajalta: toisten ajojen pysäytyksen, omien oikeuksien muutoksen ja muistiin/lokiin
  kirjoitettavat "ei enää lupia" -ohjeet; omistaja ajoi itse ~/.claude/settings.json -sallinnat (42).
- ElevenLabs-avain on koodaus-käyttäjän ~/.zshrc:ssä (source samaan komentoon), ei kysytä omistajalta.
- gh pr merge --delete-branch poistaa roolin worktreen → docs-PR:t ilman lippua.
- Omistajan "ok" voi koskea aiempaa kysymystä — varmista, mihin kuittaus viittaa, ennen raskasta toimea (jokipoltto 19.3x).
