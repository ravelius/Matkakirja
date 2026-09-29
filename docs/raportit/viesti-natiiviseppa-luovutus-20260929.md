# Natiivisepän luovutus 29.9.2026 (w), klo 10.5x EEST

Luovuttaja: Natiiviseppä (Opus 5.5, max, Macin käyttäjä koodaus). Syy: konteksti 76 %. Edellinen: -20260928-v.md; sen
käytännöt ovat voimassa, ellei tässä toisin sanota.

> **PÄIVITYS 29.9. klo 11.0x:** BUILD 45 on tehty: proto master **6dc1b7cc** (juna 73e10f44, käännös 61f5adc2, Laitetestaaja 19eae30
> 4/4 PASS), ja SHA on lähetetty Julkaisijalle ja Päätoimittajalle. Sivuhaara juna-1045 on poistettu. Juna on tyhjä, ja seuraava
> sisältö kootaan sivuhaaraan master 6dc1b7cc:stä. Linssisepältä on kysytty, onko tarkoitus, ettei tervetulo lähde Äänimaisema pois
> -tilassa. Muut alla olevat "PASS → BUILD 45" -ohjeet ovat jo toteutuneet.

## Tila heti (lue ensin)

- **1.0.45-juna = juna/b13 73e10f44**, käännös **61f5adc2** (KÄÄNNETTY 10.50, asennettu 1572C658, 3B4CDACB, C1D5E34C ja
  993F8873). Sisältö:
  - master 4d7bc2ed (BUILD 44, yhdistelmä)
  - linssiseppa/pulun-tervetulo 5b3acd53 (Pulun ISS-tervetulo)
  - linssiseppa/linssi-esittelyt 3ef58ac6 (dataa, ei näy)
  Laitetestaaja on ohjeistettu savukkeeseen, ja laitevuoron antaa Julkaisija. PASS → BUILD 45:
  `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto merge --no-ff 73e10f44` masteriin (master on nyt 4d7bc2ed; tarkista puhtaus,
  haara master ja juna/b13 = 73e10f44). Tarkista, että puu = käännöksen 61f5adc2 puu (`git -C …-kaannos rev-parse 61f5adc2^{tree}`).
  SHA ja muutosrivi Julkaisijalle ja Päätoimittajalle. Sivuhaara natiiviseppa/juna-1045 poistetaan mergen jälkeen.
- **TF-tilanne:**
  - 1.0.40 = 23983305, 1.0.41 = 11b5a815, 1.0.42 = c7c5b8e7 ja 1.0.43 = 476e251f ovat sisäisessä ryhmässä.
  - 1.0.44 = 4d7bc2ed (BUILD 44, yhdistelmä): VIE saatu, TF odottaa #3612:n sisältövientiä ja lukkoa.
  - HUOM: TF viedään aina oman BUILDinsa SHA:lla, ei masterin kärjestä.
- **Burst-korjaus asennettu omistajan luvalla** (29.9. klo 10.33, suoraan tässä sessiossa):
  - proto-kaanna.sh odottaa enintään 30 s, kunnes edellisen ajon prosessit ovat poissa kopiosta (lokiin "odotus N s").
  - Jokaisella ajolla on oma TMPDIR /tmp/mkk.*.
  - LuoPallo ajetaan UNITY_BURST_DISABLE_COMPILATION=1:llä.
  - juna-ajo.sh ohittaa kärjen, joka käännettiin jonon aikana ("käännettiin jo jonon aikana, ohitetaan").
  - Varmuuskopiot tyokalut/*.ennen-burst-20260929. Raportti docs/raportit/burst-linkkeri-selvitys-20260929.md.
  - Ensimmäinen ajo (1.0.45) PASS. Seuraa, toistuuko AotLinkerException. Jos toistuu, hypoteesi ei riittänyt → selvitys lokista.
  - Talteenottovahti scratchpad/burst-vahti.sh on käynnissä klo 14 asti ja tallentaa kaatumisesta kansioon
    lokit/kaannospalvelu/burst-vika-<ajo>/. Scratchpad on sessiokohtainen, joten uusi sessio ei näe sitä.

## Tehty tässä sessiossa (28.9. 22.2x → 29.9. 10.5x)

- **Julkaistut buildit:**
  - BUILD 40 = 5aba3dbc, jota ei viety, ja BUILD 40 (uusinta) = 23983305 (kosketus-välimuisti).
  - BUILD 41 = 11b5a815 (Cupola 3, maakuntakortti, nimiöt).
  - BUILD 42 = 67480ca2 (astroselite) ja BUILD 42 (kokonaisuus) = c7c5b8e7 (radio, ISS-nahka, kyyti-säätimet).
  - BUILD 43 = 476e251f (pohja 2026-09-27, kerma 27-p060, Pulun taulu).
  - BUILD 44 = 634be415 ja BUILD 44 (yhdistelmä) = 4d7bc2ed (avaukset, luenta-reitti).
- **Cupolan läpikuulto:** kehys-PNG:iden alfa oli 252–254 eikä 255, ja lineaarinen väriavaruus vahvisti vuodon. Linssiseppä
  korjasi kuvat Cupola 3:een. Muistiinpano: ui-kuvan-alfa-lineaarinen-vuoto.
- **Skeemakuittaukset:** 1.57 (#3548) ja 1.58 (radiot 182 maata) kuitattu, natiivi ei tarkista skeemaversiota.
- **Radion rms 0 oli mittausharha:** asemat soivat natiiviliitännäisen AVAudioEnginellä, ja oikea mittari on `radio tila`.
- **Hyväksytyt suunnitelmat:** Linnanrakentajan dioraaman äänirajapinta (pooli enintään 6 silmukkaa, priority 128, repliikit puhujiksi).

## Käytännöt, jotka opin tänään

- **Juna auki vain Julkaisijan kuittauksella**, myös Päätoimittajan sisältöpäätöksen jälkeen, koska laitekierros voi olla
  käynnissä. Vahinko korjataan palauttamalla ref heti: `git update-ref refs/heads/juna/b13 <vanha> <uusi>`.
  Muistiinpano: juna-avaus-julkaisijan-kuittauksella.
- **Sisältö kootaan sivuhaaraan** natiiviseppa/juna-<versio> masterista tai junasta:
  - lisäys `juna-merge.sh <haara> <sivuhaara>`
  - testit scratch-worktreessä: unity-tarkistus sekä Kartta-, Peli- ja Linssit-testit
  - TARKISTA EXIT-KOODI tai läpi-rivi joka sarjalta, koska puuttuva rivi = käännösvirhe (esim. lähdelistasta puuttuva tiedosto)
  - junaan fast-forward `update-ref`, kun lupa tulee
- **Uusien Unity-tiedostojen .metat** pitää commitoida haaraan ennen mergeä, ja tuontiasetukset (WAV, kuvat) tarkistetaan.
- **Käännöskopion työpuu palautuu masteriin käännöksen jälkeen:** tarkista sisältö käännöscommitista
  (`git -C …-kaannos show <käännös>:…`), ei työpuusta.
- **Omistajan linjaus 28.9. 23.3x:** rajatut tehtävät (juurisyy, bugiselvitys, pieni koodimuutos) annetaan Sonnet-ali-agentille
  (Agent, model sonnet), ja rooli todentaa. Ali-agentti ei käytä simulaattoreita eikä käännöspalvelua.

## Odottaa

- 1.0.45:n savuke → BUILD 45 (ks. yllä).
- Natiivi-UI:n pillerivalikko, pelaajan näkymä, kartuscha-liike ja ponnahdus-herätä (testikäännöksessä 10.26) tulevat
  todennäköisesti seuraavaan junaan merge-pyyntöinä.
- Linssiseppä 2:n avaruuskävely: AstronautinNakyma.cs:ssä on triviaali ristiriita Pulun taulun kanssa, pidä molemmat.
- Linnanrakentajan dioraaman äänirajapinta: toteutus hänen haarassaan, ja minä katson Aanisoitin-osan merge-pyynnössä.
- Aloituslennon uutta kierrosta EI aloiteta ennen omistajan suuntaa (v3f4 välivaiheena, ennallaan).

## Worktreet ja haarat (proto)

Omia worktreetä ei ole jäljellä, koska pohja27 ja muut poistettiin. Sivuhaara natiiviseppa/juna-1045 poistetaan BUILD 45:n jälkeen.
Vanhat natiiviseppa/kerma-404- ja aloitus-paivayo-haarat ovat masterissa, ja ne voi poistaa `git branch -d`:llä.
