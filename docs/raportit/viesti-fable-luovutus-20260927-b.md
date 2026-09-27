# Fablen luovutus 27.9.2026 klo 17.3x (uusi tili D, Opus xhigh; oma nollaus 65 %)

Sessio local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc ("Fable (Opus, xhigh)"). Omistajan poikkeus 11.3x: päätoimittaja Opus-mallilla;
omistaja päätti 16.3x pitää effortin xhigh. Kaikki 27.9. päätökset ovat lokissa (docs/raamattu-loki/paatokset-2026-09.md, klo 12.04 alkaen).

## 1. Roolisessiot (tili D, luotu 11.4x–12.0x) — ÄLÄ luo uusia

| Rooli | Session id | Malli / effort |
|---|---|---|
| Postivahti | local_63227b57-d045-4b93-ab52-cddc04e3b90f | Sonnet, medium |
| Julkaisija | local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 | Opus, high |
| Natiiviseppä | local_04e2850b-d63c-481d-be73-c7d784a7cbcb | Opus, high |
| Pelikoodari | local_242febe9-d6cf-45ae-8280-faf394dc6e3e | Opus, high (nollattu 16.2x) |
| Natiivi-UI | local_e9fdc695-8421-4c14-a187-8881e73c835a | Opus, high (NOLLAUS KÄYNNISSÄ 17.3x, ks. kohta 4) |
| Linssiseppä | local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4 | Opus, max (nollattu 16.3x) |
| Siirtoseppä | local_c264506b-dd61-4617-839f-23daf6d0bd5a | Opus, high |
| Karttaseppä | local_4bd7c316-55bc-423a-9da1-821fdd123cab | Opus, high |
| Sisältökirjuri | local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 | Sonnet, high (nollattu 13.4x ja 15.4x) |
| Laitetestaaja | local_3509b4ba-6000-4dea-869b-ecb22f4e3270 | Sonnet, high |

ListAgents-nimet = sessioiden otsikot. Nollauskaava: luovutus + clear_session "self" samassa vuorossa → SendMessage notify_when_idle
(nimellä, esim. "Natiivi-UI (Opus)") → list_events = 0 viestiä → aloitusviesti send_messagella.

## 2. Tila 17.3x

- **TestFlight:** 1.0.29 (202609270957 = build 29b 20ce6a28, puhevirta pois; viallinen 202609270926 vanhennettu), 1.0.30
  (202609271221 = master 7b8a12c0: lento v3, lippu itään, maakuntanimet pois, puhevirta, talous + pelistreak, avauskortti, meri-laatu erä 1).
- **1.0.31-juna (Natiiviseppä kääntää nyt, Laitetestaaja valmistelee reseptin):** pohjan Z10 natiivissa (c48512b5), luenta aina pyynnöstä,
  koetila raha/loppukortti, aloitusvalinnassa vain lennettävät (myös Maailma-tilassa, 7f699522), elämäpalkki (1281414c). PASS → master → TF.
- **1.0.32-jono:** Pulun avausesittely "kerran + ohita" (Pelikoodari web → Natiivi-UI), elämäpalkki 5 oranssia + 3 punaista, vieritys
  (Kosketusvieritys kaikkiin pystysivuihin, kartta pois arkin alta, 120 Hz vain vierityksen ajan ProMotionilla, thermalState ≥ serious → 60 Hz),
  kaupunkilehden luentanappi + nostosivun rattaan sävy, meren laatutaso erä 2 (Linssiseppä abb862d2, kuvaparit omistajalle), kartan
  tarkentuminen liikkeen jälkeen (Natiiviseppä A vakio-SSE / B esilataus / C häivytys) + nimiöt vakiokorkeuteen + kontrasti/maitomaisuus
  varjostimeen kehittäjävalikon liukusäätimellä (omistaja valitsee arvon).
- **Web:** mainissa mm. #3401 pelistreak + armopäivä, #3407/#3417 tilannekatsaus + havainnekuva-rivi, #3418 havainnekuva-sana, #3419/#3423
  Euroopan ohuimmat erät 1–3, #3421 elämäpalkki, #3422 luenta aina, #3413 tasatut nähtävyyskuvat. Junassa: #3424 (tilannekatsaus Eurooppa,
  116 peliä), #3410 projektisivusto (OMISTAJA HYVÄKSYI julkaisun 16.4x; Eurooppa-keskeinen pallokuva 989059b7; julkaisu #3424:n jälkeen →
  lähetä URL omistajalle), #3416 VAIN EUROOPPA Raamattuun + CLAUDE.md, #3425 Codex 22 miniatyyriä, #3426 Codex 5 historian hetkeä, #3403 koodi 1.
- **Pallo-Z10:** viety tuotantoon 16.50 (13 856 laattaa, 2026-09-26-pohja-20260926/10); Siirtoseppä #3395 offline.json + paketti → Natiivisepän kuittaus.
- **Levy:** 107 Gi vapaana (raja 80). Omistaja ajoi Natiivisepän siivouksen (16,5 Gt) ja ämpärin vanhojen pyramidisarjojen poiston
  (09-21/22/22c/23a, 13,5 Gt) päätteessä 17.0x — TARKISTA päätteestä (read_terminal tab 0), tuliko neljä "poistettu"-riviä.
- **Viikko:** kaikki mallit 60 %, Fable-malli 76 % (nollautuu ma 28.9. klo 10.00); 5 h 71 % klo 17.18.

## 3. Omistajan päätökset tänään (kaikki lokissa, tärkeimmät)

VAIN EUROOPPA kunnes omistaja toteaa valmiiksi (Raamattuun #3416); havainnekuva-sana kaikille generoiduille kuville (Raamatussa);
lentopeli odottaa ensi viikkoa (suunnitelma 948a66567: Kauppa 60 £, peukaloveto + kaasu, 6 min, vain natiivi); App Store -JULKAISUA EI
vielä, valmistellaan vain laatua (iPad, vieritys, tekijämerkinnät); 1.0.31:n jälkeen isompi askel = App Store -valmistelu (laatu);
luenta kuuluu aina pyynnöstä, Äänimaisema mykistää vain musiikin ja tehosteet; Codexin tiedostot poistaa vain Codex; nähtävyyskuvat:
tasattu 413 tuotannossa, tyylistä poikkeavat UUSITAAN Codexilla kaikista kaupungeista (mallityyli Akropolis, Antiikin agora, Zeuksen
temppeli, Sýntagman aukio; väärät Iliou Melathron, Akropolis-museo, Niken temppeli; tilaus postilaatikossa ebd6f1ce, 55 poikkeaman
ennakkolista); ei-paikat pois nähtävyyksistä (42 kohdetta nostoiksi, museoalukset jäävät); elämäpalkki: pelkät neliöt, yläreuna,
väistö, napautus → selite, 5 oranssia + 3 punaista; avausesittely kerran + ohita; meren laatutaso erä 1 hyväksytty (purjeet rampissa);
lipun suunta maailmaan (itään); maakuntanimet pois natiivista; aloitusvalinnassa vain lennettävät; projektisivusto (suomi, noindex).

## 4. Heti seuraavaksi (uusi Fable)

1. **Natiivi-UI:n nollaus kesken:** käskin 17.3x luovutuksen -y + clear_session self. Tarkista list_events(local_e9fdc695…) = 0 viestiä
   (tai odota idle-ilmoitusta) → lähetä aloitusviesti (jono luovutuksessa -y: vieritys, luentanappi + ratas, oranssit palkit, kerran + ohita).
2. **1.0.31:** Laitetestaajan PASS → Natiiviseppä master + BUILD → Julkaisija TF → ilmoita omistajalle buildinumero.
3. **Projektisivusto:** kun Julkaisija on julkaissut #3424 + #3410 → URL omistajalle.
4. **Kuvaparit omistajan kortteihin:** meren erä 2 (Linssiseppä), elämäpalkin oranssit (Pelikoodari), vieritys-video (Natiivi-UI), kartan
   tarkentuminen A/B/C + kontrastisäädin (Natiiviseppä), Pelikoodarin tekijämerkinnät.
5. **Sisältökirjuri:** Euroopan erä 4 + Codexin hetkierä 2 + tyyliuudistuksen kaupunkierien tarkistus.
6. **Pelikoodari:** puhevirran mittaus (POLLO_KEHITTAJAKOODI = omistajan pääkoodi, nyt avaintiedostossa), kerran + ohita, oranssit palkit,
   tekijämerkinnät.

## 5. Opit tänään (muistissa)

- Omistajan toimet AINA kortilla "TOIMI TARVITAAN:" + push (muisti omistajan-toimet-korttina) ja ajettavat komennot suoraan tähän
  keskusteluun bash-lohkona (muisti omistajalle-ajettavat-komennot); komentokenttä ei voi vastata read-kysymyksiin → ei read-promptia.
- Fable EI mergeä docs-PR:ää, jonka tiedostoa tests/ tai *-data.js lukee (pelikatalogi.md rikkoi mainin 13.4x) — vain raportit ja loki.
- Lisäykset mergettyyn PR-haaraan eivät mene mainiin → uusi haara.
- Sessioiden luonti: pitkä keystroke kansiovalitsimeen jätti '/'-näppäimen pohjaan → CGEvent key-up (muisti sessioiden-luonti-appia-ohjaamalla).
