# Päätoimittajan luovutus 1.10.2026 klo 11.0x (konteksti 75 %, uusi tili)

Sessio "Päätoimittaja (Opus, max)" local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, haara claude/bold-ride-vow4ki (pushattu), RC päällä.
Edellinen: viesti-fable-luovutus-20261001-b.md ja siirtoprompti-20261001.md. Päivän päätökset lokissa (grep "1.10.2026").

## Roolit (uusi tili, kaikki RC päällä)

| Rooli | Session id | Malli | Kärki nyt |
|---|---|---|---|
| Julkaisija | local_1325b8e8 | Opus high | web-juna (#3777 tietoturva, #3774 linna v22+ASTC, sitten #3723 #3768 #3770 Raamattu); kuiva vie-dioraama #3774:n jälkeen; TF 94 julki, juna 95 kääntyy |
| Natiiviseppä | local_04e2850b | Opus high | juna 95; merge-pyynnöt: korostus (Natiivi-UI), nosto-asettelu 87b541be, avain-otsakkeeseen 0beb31d4, linna ASTC-lukija |
| Natiivi-UI | local_e9fdc695 | Opus high | UI-pohjat valmis (odottaa omistajan OK:ta), sitten siirrot |
| Pelikoodari | local_242febe9 | Opus high | Sähkeen jäsenavain otsakkeeseen; vuosirullauksen vertailu web vs natiivi (omistajalle) |
| Linssiseppä | local_4b4b976c | Opus high | S2-erä (sävy varjostimessa, reunaliuku, Alppien kontrasti), sitten vuodenajat ja Cupolan yö |
| Linssiseppä 2 | local_ee961a2d | Opus high | ISS-KAMERA (pelaajan kuva, lisämaksullinen): ydin tehty; julistekuvat A–E; KUVAA-nappi |
| Linnanrakentaja | local_2cf16574 | Opus high | #3774 junassa; _valmiit-karsinta #3774:n jälkeen; ehdottaa seuraavan laatuaskeleen |
| Siirtoseppä | local_c264506b | Opus high | ensilataus v2 (ASTC-lukija), kuittaa #3774-paketin TF 94:llä |
| Karttaseppä | local_4bd7c316 | Opus high | S2-mosaiikki ~12–13 → vienti; S2-indeksi v1 ämpärissä |
| Sisältökirjuri | local_0c172ea0 | Sonnet 5.5 high | kuva2 D–F yksi kerrallaan |
| Laitetestaaja | local_3509b4ba | Sonnet 5.5 high | savukkeet junista |
| Postivahti | local_63227b57 | Sonnet 5.5 medium | kierto 10 min, kävijälaskuri |

## ODOTTAA OMISTAJAA (uusi pysyvä lista — älä pudota)

1. **UI-pohjien 9 kohdan OK-lista** (docs/raportit/ui-pohjat-kartoitus-20261001.md haarassa natiivi-ui-luovutus-m e8262ecac,
   mallikuvat lähetetty omistajalle 11.0x). Vastaus "ok" tai muutokset → Natiivi-UI siirtää (nostokortti + kortti ensin, myös web).
2. **EHDOTUS_AVAIN-vaihto** vasta kun #3777 on julki JA natiivin 0beb31d4 on TF-buildissa: yksirivinen komento (openssl rand -hex 24 →
   gh secret set EHDOTUS_AVAIN --repo ravelius/Matkakirja → gh workflow run ehdotukset-worker.yml --ref main → pbcopy); omistaja
   liittää avaimen webin ja iPadin Lukijoilta-kenttään.
3. **Linnan osoitin** seuraavaan pakettiin (#3742 puheet + #3766 ranta + #3774 v22/ASTC) Siirtosepän puhtaan kuittauksen jälkeen →
   kortti omistajalle → Julkaisija ajaa (sallinnat kunnossa). Sitten omistajalle: linnan esittely kokonaan kokeiltavissa.
4. **Juliste**: Linssiseppä 2:n kuvat A–E (proto-3d/lokit/linssiseppa2-juliste-20261001/) → kokoa julisteiksi pohjalla
   proto-3d/lokit/paatoimittaja-juliste-20261001/pysty3.html (v7: logo ylhäällä mustassa, datateksti vasen ala, tehtävämerkki
   merkki.svg oikea ala, renderöinti tee5.mjs-kaavalla) → omistajalle vertailuun.
5. **Vuosirullauksen vertailu** (Pelikoodari) omistajalle; muutos natiiviin vain luvalla.

## Omistajan linjaukset tänään (lokissa)

- UI-POHJAT sitoviksi (Raamattu-PR #3770, CLAUDE.md): uusi ominaisuus käyttää pohjia; puuttuvasta kysytään omistajalta.
- Pohjat natiiviin + webin nostoihin/kortteihin; Pulun chat ja kaksi taulupohjaa; kevyt tyylikirja kehittäjäsivuna.
- Ihmisen matkan tekstitys kuten webissä (kortti peittää); nostokortin 2 kuvaa: ensimmäinen koko leveys, toinen tekstin viereen.
- ISS-KAMERA: pelaaja rajaa Cupolasta vapaasti (veto/nipistys), kuva työstetään laitteella 10 m S2-datasta (indeksi R2:ssa),
  saa kestää, ~40 Mt OK; pysty 4:5 oletus; juliste = sähköinen tiedosto datatekstillä, logo + oma tehtävämerkki (ei NASA-logoja);
  50 huippupaikkaa esiasetuksin + oma sijainti (koordinaatit pyöristetään ~10 km); KUVAA korvaa OMA PAIKKA -napin.
- ISS-ohjaamon vuodenajat (S2 kevät–syksy, talvi BMNG). Apurahakortin lihavoitu muutosilmoitus (#3769 mergetty).
- Näyttö aina auki (LaunchAgent fi.matkakirja.naytto-auki). Komennot omistajalle aina YKSIRIVISINÄ bash-lohkoina.
- Chattiin vain omistajaa koskevat asiat; roolien tilat pois tai yksi lause.

## Huomiot

- Julkaisijan settings.local.json:ssa nyt gh pr merge/view/checks/list, gh run list/view/watch, gh workflow run ja junaskriptit
  (omistaja ajoi). Luokitin estää edelleen Päätoimittajalta mm. git diff -lukuja (Modify Shared Resources) ja toisten prosessien
  lopetuksen — ei kierretä.
- Raamattu-PR (LINNAN DIORAAMA -rivi ym. haarasta) jäi kesken luokitinesteen takia; #3770 vie UI-pohjat-säännön mainiin.
- Levy 68 Gt (Julkaisija poisti 503000D1:n ja PRB:t). Ämpärivienti: `source ~/.zshrc` ennen vie-blender.sh:ta.
- Worktree paatoimittaja-ui-pohjat-saanto poistetaan #3770:n mergen jälkeen.
