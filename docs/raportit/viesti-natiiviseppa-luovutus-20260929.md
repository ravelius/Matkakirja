# Natiivisepän luovutus 29.9.2026 (w), klo 10.5x EEST — päivitetty 16.1x (tilinvaihto, BUILD 50)

Luovuttaja: Natiiviseppä (Opus 5.5, max, Macin käyttäjä koodaus). Syy: konteksti 76 %. Edellinen: -20260928-v.md; sen
käytännöt ovat voimassa, ellei tässä toisin sanota.

## PÄIVITYS 29.9. klo 16.1x (tilinvaihto, viikkokiintiö 94 %) — LUE TÄMÄ ENSIN

Tämä korvaa alla olevat tilatiedot. Vanhemmat osiot ovat historiaa, mutta niiden käytännöt ovat yhä voimassa.

### SEURAAVA JUNA (1.0.51): Linnanrakentajan keittiö — kesken tilinvaihdossa 16.2x

- **Merge-pyyntö:** proto `linnanrakentaja/keittio` **573ccecc** (myös natiivi-backupissa), 16 committia, 62 tiedostoa, noin 17 400
  riviä. Omistaja on hyväksynyt ("saa mennä"). Poikkileikkaus-linssi on hiomassa, joten Kesken = true ja se näkyy vain kehittäjätilassa.
  Sisältö: dioraamamoottori (Ydin/Dioraama, Unity/Dioraama*, 6 varjostintiedostoa, UI/Linssit/DioraamaTaulu), paketti ämpäristä
  (uusin.json), valot ja varjot, 3D-hahmot ja -liekit, kaarilennot sekä äänet.
- **Tehty:** sivuhaara **natiiviseppa/juna-1051 d49a3a7f** = master cbf78690 (BUILD 50) + 573ccecc. Yhdistyminen oli ristiriidaton.
  Metat ovat kunnossa, eikä yli 200 kt:n tiedostoja ole. Testit väliaikaisessa worktreessä /Users/Shared/Claude/wt/proto-natiiviseppa-juna1051:
  **kaikki exit 0: unity-tarkistus 0, Kartta 401/401, Peli 358/358, Linssit 484/484.** Worktree on poistettu.
- **Katselmointi, Aanisoitin-osa** (minun vastuullani, linja A hyväksytty aiemmin): pooli on enintään 6 silmukkaa (ylite lopettaa hiljaisimman), jokaisella
  oma AudioSource ja priority 128. Taso = pyyntö × Äänimaisema × TaustanKerroin × globaali väistö (650 ms). Repliikki toimii puhujana
  AaniTila.Puhe-reunalla. Kahvat eivät koskaan ole null, ja OnDestroy vapauttaa poolin. Rakenne on OK. Kysy Linnanrakentajalta ennen
  junaa, ei estettä:
  (a) SaneluAlkoi tauottaa vain Pohja- ja Maisema-kanavat, ei poolin silmukoita, joten dioraaman silmukat soivat sanelun aikana.
  (b) Kutsutaanko DioraamaAanet.cs:217:n `Repliikki(false)` varmasti linssin sulkeutuessa kesken repliikin? Muuten 5 kanavaa jäävät väistöön.
  (c) `static bool dioraamaRepliikkiPuhuu` jää voimaan, jos Aanisoitin-instanssi luodaan uudelleen (harvinainen reunatapaus).
- **Globaali renderöintitila** linssin ajaksi (URP-varjot 2048 ja etäisyys, lisävaloraja 8, ambient, RenderSettings.sun, muiden valojen
  cullingMask) palautetaan sulkiessa. Savukkeessa testataan sulku kolmella tavalla: ✕, toisen linssin avaus ja sovellus taustalle ja
  takaisin. Tämän jälkeen karttanäkymän valot ja varjot on tarkistettava ennallaan (vertaa BUILD 50:een).
- **Seuraavat askeleet:** Linnanrakentajan vastaukset kohtiin (a)–(c) → Julkaisijan lupa (juna/b13 ddf90f51 → d49a3a7f) → Monitor juna.log → KÄÄNNETTY →
  Laitetestaajan savuke.
  Savukkeen sisältö:
  - poikkileikkaus-linssi kehittäjätilassa (`poikki`-komennot, ks. LinssiOhjain `osat[0] == "poikki"` → DioraamaSovitin.Komento)
  - äänet ja repliikki
  - sulkutavat
  - regressio: kartta, Cupola, radio, nostokortin kaiutin
  PASS → BUILD 51 = merge --no-ff d49a3a7f.
- **Huom:** ämpärin paketti päivittyy erään 2b vasta, kun ravelius/Matkakirja#3621 on mergetty (Julkaisijan juna). Siihen asti linssi
  näyttää erän 2 paketin (kortit, oletusvalot), eikä se ole vika.

**Kärki:** proto master **cbf78690** = BUILD 50. Juna on tyhjä: juna/b13 = ddf90f51, joka sisältyy masteriin. Käännöksiä tai ajoja ei
ole käynnissä, eikä Natiivisepän omia worktreetä tai sivuhaaroja ole auki.

**Tänään tehdyt buildit (klo 12–16)** (puu = käännös todennettu jokaisesta, ja jokaisen SHA on lähetetty Julkaisijalle ja Päätoimittajalle):

| BUILD | proto master | juna | käännös | sisältö | savuke |
|---|---|---|---|---|---|
| 48 | 1c4a7eff | 73cdb113 | 39fc303b | pelaajan näkymä 9652f810 + avaruuskävely bdea89bf + radio-virta b68dcdd3 | c27e1fc 5/5 |
| 49 | 5ce37440 | c98f2cac | 6212c0ad | pillerivalikko 12ed8b69 (yläpalkki ja valikko) | 74710a2 4/4 + Natiivi-UI:n cl3 |
| 50 | cbf78690 | ddf90f51 | fc26b44c | yläpalkin nahka 5cdb457a + 44b742e5 (iOS 2048 px) | e4ef21d 5/5 |

**TF:** 1.0.47 = 329ffaf0 on viety. VIE:tä odottavat 1.0.48 = 1c4a7eff (sisältövienti #3620 uusittiin ETIMEDOUTin jälkeen),
1.0.49 = 5ce37440 ja 1.0.50 = cbf78690. Jokainen viedään oman BUILDinsa SHA:lla, ja viennin tekee Julkaisija.

**Auki olevat merge-pyynnöt:** ei yhtään. Tulossa ovat Linnanrakentajan dioraama (katso Aanisoitin-osa) ja Natiivi-UI:n seuraavat erät.
Natiivisepällä ei ole omia GitHub-PR:iä auki.

**Tarkistus uudessa sessiossa:**
- `tail -5 /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`: viimeisen rivin pitää olla "BUILD 50 = master cbf78690".
- `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto log --oneline -1 master`: cbf78690.
- `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto rev-parse --short juna/b13`: ddf90f51.
- `ps -axo pid,etime,command | grep -E 'proto-kaanna|juna-ajo|Unity.app/Contents/MacOS/Unity' | grep -v grep`: tyhjä, kun
  mitään ei käännetä.

**Kulku jokaiselle merge-pyynnölle:**
1. `git -C …/Matkakirja-proto branch natiiviseppa/juna-<versio> master`.
2. `tyokalut/juna-merge.sh <haara|SHA> natiiviseppa/juna-<versio>`.
3. Tarkista metat ja UI-kuvien alfa: peittävä kuva = 255. Tarkista myös, ettei tuonnin maxTextureSize ole kuvaa pienempi.
4. Aja testit väliaikaisessa worktreessä /Users/Shared/Claude/wt/proto-natiiviseppa-juna<versio>: `Linssit-testit/unity-tarkistus.sh`,
   `Kartta-testit/kaanna.sh`, `Peli-testit/kaanna.sh` ja `Linssit-testit/kaanna.sh`. Jokaisen exit-koodin pitää olla 0. Poista worktree.
5. Kysy Julkaisijalta lupa. Kun lupa tulee: `git update-ref refs/heads/juna/b13 <uusi> <vanha>` ja rivi juna.logiin.
6. Monitor juna.logiin. KÄÄNNETTY → Julkaisijalle SHA ja Laitetestaajalle savukeohje.
7. PASS → `merge --no-ff <juna>` masteriin. Tarkista, että puu = käännös (`git -C …-kaannos rev-parse <käännös>^{tree}`).
8. SHA:t ja muutosrivi-ehdotus Julkaisijalle, lyhyt viesti Päätoimittajalle. Poista sivuhaara ja päivitä aloitusviesti.

Laitetestaajan komennot: iPadin vaaka `ui kierto vaaka`, tekijätiedot logosta tai `ui tietoja`, pillerivalikko
`ui pilleri paa|linssit|aarteet [n]`, avaruuskävely `astro kavely [napauta|tila|pois]`, radio `radio tila` ja pelaajan näkymä
`kehittaja maailma|pelaaja 0|1` / `kehittaja nakyma`.

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
