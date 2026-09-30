# Päätoimittajan luovutus 30.9.2026 ilta (c)

Sessio "Päätoimittaja (Opus, xhigh)", haara claude/bold-ride-vow4ki, RC päällä. Edellinen: viesti-fable-luovutus-20260930-b.md.
Kaikki illan päätökset lokissa: docs/raamattu-loki/paatokset-2026-09.md (grep "30.9.2026 klo 19" ja "klo 2").
OPPI: nollaa itse 65 %:ssa (get_usage noin 10 vuoron välein).

## Omistajan odottavat asiat (kysytty, vastaus puuttuu)

1. **Kuunnelmien ja kertojan tekstit:** kysytty, liitetäänkö tekstit chattiin nyt (kuunnelmat noin 970 sanaa, kertoja + Pulu noin 440) vai kokeileeko omistaja
   linnan ensin 1.1 (77+):lla. Kaikki 11 hahmoääntä on valittu (loki 20.07 ja 20.41; Pelikoodarin aanikartta.json). Kokonaiset kuunnelmat vasta tekstihyväksynnän jälkeen.
2. **Kaiun määrä:** keittiödemo v2 (CC BY -vasteet) lähetetty; omistajan kommentti puuttuu.
3. **Senaatin tarkempi aineisto** (linnan laatusuunnitelman vaihe 1): kysytty "kirjoitanko viestiluonnoksen?", ei vastausta.
4. **Helsingin ISS-kameran esimerkkikuva:** Linssiseppä 2 kuvasi 21.16–21.22 (50/85 mm, filmi 0/1, siluetti 0/1); vie omistajalle, sitten päätös pilotista
   (25 paikkaa), julisteesta ja maksullisuudesta (suositus: 1 ilmainen kuva + euromääräiset paketit, ei krediittivaluuttaa; painettu juliste IAP:n ulkopuolella).
5. **Euroopan oma S2 L2A -mosaiikki z10 (~100 m):** Karttaseppä tekee työkalun + Alppikokeen (lon 5,5–13,5, lat 43,3–48,2); Linssiseppä kuvaa Cupolassa
   BMNG vs. S2 vs. NASA ISS067-E-286475 → omistaja päättää koko Euroopan yöajosta (6–8 h, 0,7–1 Gt).
6. **Pulun EVA-asu:** Codex e09b4467 + korjauspyyntö (posti/fable-codex-pulu-avaruuskavely-korjaus-20260930.md); Linssiseppä 2:n web #3728 ja natiivi 67d1b8e4
   luonnoksina; Cupola-kuvapari omistajalle korjattujen kuvien jälkeen, junaan vasta omistajan nähtyä.
7. **ElevenLabs v4 Turbo -ohje** (omistajalle-odottavat-ohjeet-20260930.md kohta 2): anna, kun worker #3710 on mainissa (76+ jo TF:ssä).
8. Vanhat avoimet: roolien viennit CI:hin (ehdotus), aloituksesta ensimmäiseen luentaan 49 s, linnan tavoitekuvat v2:n ilme.

## Julkaisu ja junat

- TF 1.1 (76), (77) ja (78) sisäisessä; 1.1 (75) Applen beta-arviossa (WAITING_FOR_REVIEW), 1.0.67–72 vanhennettu; Julkaisija lähettää uusimman, kun 75 on käsitelty.
- Juna 79 (Natiiviseppä niputtaa): Linssisepän horisontti + 3D-paneeli + vaakakorjaus ilman sivulevyjä (d3c18f16, fotorealismi A/B pois), pilvet 0 %,
  pölyt pois; Siirtosepän linnan kamerat a1abfa48; Natiivi-UI:n Kuori-nappi 8fb69ffd. Web #3721 (pilvet pois webissä) Julkaisijalle.
- Juna 80: Pelikoodarin Cupolan ääni (cupola-aani b735dbc0, todennus simulaattorissa ensin), mikseri (Pelikoodari aanimikseri + Natiivi-UI 50798bce + Siirtosepän koukut).
- Web-juna: #3710 (ElevenLabs-worker), #3702, #3714, #3706 (maalehdet → Sisältökirjuri odottaa), #3718, #3717 (detaljiosoitin, 691e2620 on 77:ssä), #3724 (kuori v16b).
- Olavinlinnan kuori v16b viety (Päätoimittaja): dioraama/olavinlinna/blender/7c470d2e110344eb/; osoitin PR #3724:n mergen ja Siirtosepän kuittauksen jälkeen. v17 = kaakon muurin juuri.

## Ämpäri (Päätoimittaja vei tänään, omistajan lupa 18.54)

aanet/cupola/v1/ (humina 90 s + EVA 38 -radio 23 min), aanet/mikseri/v1/ (18 keittiöstemiä), linssit/astronautin-kamera/iss-yovalot-20260930/
(Black Marble 2016 500 m, 2 × 2 × 4096²), dioraama/olavinlinna/blender/7c470d2e110344eb/. Kaikki immutable; muutokset uuteen versiokansioon.

## Roolit (SendMessage nimellä)

| Rooli | Nyt |
|---|---|
| Julkaisija | TF-jono, junat 79/80, web-juna; simulaattorivuorot yksi kerrallaan |
| Natiiviseppä | juna 79 |
| Linssiseppä | Cupola: fotorealismin viritys (ilmakehä 3,5, monisironta 0,45 a02c23e4), Black Marble 500 m kytketty (7186658c), NASA-parit pilvet 0 % + sama polttoväli; Alppikoe |
| Linssiseppä 2 | Helsingin kuvat → Päätoimittajalle; Pulun EVA (odottaa Codexia) |
| Pelikoodari | Cupolan äänen todennus → juna 80; äänimikseri (stemit, AaniMikseri-rajapinta) |
| Natiivi-UI | pariteettikatsaus 3 (web vs 1.1 (78), lista ≤ 8 riviä ensin); mikserin viimeistely äänien tultua |
| Siirtoseppä | linnan kamerat (juna 79), mikserin huonekoukut, kuoren puhtaan asennuksen kuittaukset |
| Linnanrakentaja | kuori v17 (kaakon muurin juuri: aukon täyttö, oma UV) |
| Karttaseppä | S2-mosaiikkityökalu + Alppikoe; raeton poltto taustalla |
| Sisältökirjuri | odottaa #3706:n mergeä, sitten luentojen PR |
| Laitetestaaja | savukkeet |
| Postivahti | kierto; worktree-muistutus (raja 20), PRB-poistot EI (levy > 35 Gt) |

## Illan tekniset havainnot

- Simulaattorikaatumiset ("system shell crashed"): vain iPad Pro 11 M5 503000D1 (SpringBoard FBSDisplayMonitor), ei PRB eikä CoreSimulator;
  tilalle AD119F7B (Natiivi-UI), vanha jää käyttämättä (poisto vaatisi omistajan luvan).
- Levy: TF vaatii ≥ 30 Gt; illalla siivottu → noin 50 Gt. Lokisiivous (yli 48 h kansiot, yli 24 h .app) on Päätoimittajan pysyvä oikeus (omistaja 26.9.).
