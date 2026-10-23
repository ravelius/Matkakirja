# Pelikoodarin luovutus 23.10.2026 klo 14.02 (tili vvi@vvi.fi)

Edellinen: viesti-pelikoodari-luovutus-20261023-1200.md. Rooli: Pelikoodari (Opus, high). Syy: Postivahdin KOVA RAJA 39 %.
Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (peili natiivi-backup peili/proto/pelikoodari/<haara>).

## TEHTY (23.10. 12.02–14.02)

- **Juoksupelin työlista 1–7 tarkistettu BUILD 209:ää (e51c33e0f) vasten** → PT: 1–6 valmiit (3 loputon sokkelo + arvottu siemen,
  5 Meridiaaniportti-maali + kokoelma + nimetyt paikat, 6 musiikki tasoille 2+ = tason 1 kappaleet + liuku). 7 Pelit-valikko: rivi on
  Keskeneräiset-osiossa (vain kehittäjä); OMISTAJA 12.25 "Odota grafiikkaa" → siirto pelaajille kysytään, kun Lavastajan k1b valmis.
- **Yhtenäiset napit, juoksupeliosuus: pelikoodari/yhtenaiset-210 = 49396daaf** (wt/proto-pelikoodari-yhtenaiset-210), NS:n
  rungossa (560dd9cd8). ☰ › Säännöt (yhteinen OpasNakyma.SaantoKortti + uusi tumma-parametri, oma ModaaliTaso, juoksu tauolla,
  QA `ui juoksupeli saannot [pois]`); näppäimistörivi vain näppäimistöllä (Mac aina, iPad/iPhone vasta näppäimen painalluksesta).
  EI ⚙:tä (Raamattu 2.201 "peleissä ei ole ratasta"; PT kuittasi). PT hyväksyi kuvat (todistus-juoksu-saannot-210b-20261023-1243).
  Sääntöteksti on Pelikoodarin; Sisältökirjurille kun herää (PT).
- **Alkulento (omistaja 13.32): pelikoodari/alkulento-210 = 7b73e0cbb** (wt/proto-pelikoodari-alkulento-210, juna-210 560dd9cd8:n
  päällä), EI vielä NS:llä:
  - 889b8261a: YleiskuvaS 10 → 5; Tahti(u) (lennon kello dt × Tahti: portti ×1,3, raju ×1,9 ennen keisarin lähtöä, =1 PuyiLahteesta);
    kaartelu (KaarteluPaino ajan mukaan, 5 m / 6,5 s) + keinunta koko lennon (LentoHuojunta 0,35); ohitus lähempää; kallistus × Tahti²;
    hehkun kesto TodellinenKesto; energiapalkit piiloon lennon ajaksi; Laskenta3…1-tapahtumat.
  - bff2ed55c (PT:n korjaukset 3–4): lähtölaskenta vasta pelikamerassa (KameraPaikalla = 29,5 + Y, Laskenta3 +0,2 s, ohjaus +3,2 s;
    lento 33,9 s todellista); lämmitettävät peukalokohdat ja maalin suunta LammitysPeitto 0,002 (portin seinien vaaleat läikät).
  - 7b73e0cbb: tekstit ja 3-2-1 JULISTE-pohjalla (uusi JuoksuAvausJuliste.cs + .meta, QA `ui juoksujuliste [teksti|3|2|1|pois]`);
    JuoksuKuvateksti palautettu ennalleen.
  - Testit Juoksu 96/96 (JuoksuAvaus 11/11: todellisessa ajassa nykäys 314 < 450 m/s³, nopeus ≤ 100, katse 129 °/s; uusi
    AlkulentoTahtiJaLaskenta), tarkista.sh 0. Ensimmäinen video: proto-3d/lokit/todistus-juoksu-alkulento-210-20261023-1350/
    (alkulento-lento.mp4; kuormassa 83).

## JONO (seuraava askel ensin)

1. **Alkulennon tekstit NUI:n neuvolla (14.0x), sitten kuva-arkki PT:lle, sitten NS:lle junaan 210.** NUI: juliste on tummaa mustetta
   paperille, EI sovi 3D:n päälle sellaisenaan. Tee JuoksuAvausJuliste.cs:ssä:
   - TEKSTIT: astroavaus-pohja (mk-astroavaus__otsikko), KIELLETTY KAUPUNKI, BEIJING ja 1923 kukin omalla rivillään nimityylillä
     mk-astroavaus__nimi (26 px, Kirjasin.KoneLihava), väliin mk-astroavaus__viiva, jokaiselle Latauskuva.Luettava; rivi kerrallaan
     (opacity + mk-astroavaus__otsikko--haipyy rivikohtaisesti kuten bff2ed55c:n JuoksuKuvateksti-versiossa, git show 889b8261a).
   - TUMMA PEHMEÄ TAUSTA tekstiryhmän taakse: Rakenne.Tausta(el, Kuviot.Soikio("juoksu-avaus", Kuviot.Alfalla(Tyylikirja.Himmennys.Kuva,
     keski), Kuviot.Alfalla(Tyylikirja.Himmennys.Kuva, 0f), 0.4f)) (malli Aloitusnakyma.cs ~217, aloitusportin soikio).
   - 3-2-1: juliste (44 px) TARVITSEE saman soikion taakseen (NUI); vaalea iso numero yli 26 px = uusi koko → kysy PT:ltä
     (UI-POHJAT). Ehdotus PT:lle kuvan kanssa: juliste-numero soikion päällä vai astroavaus 26 px.
   - Skenaario proto-3d/tyokalut/pelikoodari-ajot/sk-juoksupeli-alkulento-210.txt (iPad pysty, video + a1–a6). Käännös:
     `PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> zsh proto-3d/tyokalut/proto-kaanna.sh pelikoodari/alkulento-210` (ilman UDID:tä,
     vuoro JU:lta), ajo todistusajo.sh `--nyt` kun JU:n SIMULAATTORI NYT ja muita simuja käynnissä. SIMU VAPAA JU:lle heti.
   - Video lyhennetään: ffmpeg -fflags +igndts, latausjakso pois (lento alkaa ~65 s kohdalla kuormassa).
2. **Latauskuvan "Viimeinen keisari – karkuteillä" -logo** (PT 13.2x, omistaja 13.18): kun Codexin posti/keisari-logo-20261023/
   tulee → latauskuvaan karkuteillä-leiman tilalle (alaosaan, ei Puyin päälle) ja Pelit/Keskeneräiset-riville; ennen/jälkeen PT:lle.
3. Kupla 2 (keltainen-maljakko v2 Codexilta, ks. edellinen luovutus), yläreitti v2 (taso 2), juoksupeli pelaajille (k1b) – odottavat.

## AVOIMET MUUT

- NS: junan 210 J-GPU (15,9 ms s 466–480) rajaus; kerroin, että lohikäärme v3 ei lataudu sokkelossa ja kuplat ovat UI-kuvia.
- NUI:n logo-210 (mk-juliste--logo 64 px) ei vielä junassa.

## OPIT

- Nopeuden muutos ilman radan muutosta: aikavääristys (Tahti) pitää törmäystestin voimassa; testit simuloivat todellisessa ajassa.
- Korkeuteen sidottu paino (kaartelu) nykäisee sukelluksessa → paino ajan mukaan.
- Lämmityksen 0,02-peitto näkyy tummalla pinnalla; 0,002 riittää piirtoon.
- todistusajo pysähtyy "muita simulaattoreita käynnissä" → `--nyt` JU:n NYT-vuorolla.
