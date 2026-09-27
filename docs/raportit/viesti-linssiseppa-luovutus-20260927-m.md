# Linssisepän luovutus 27.9.2026 (m) — Linssiseppä (Opus, max) = myös Mallinseppä

*Kirjoitettu klo 11.3x Fablen pyynnöstä (viikkokiintiö 93 %, tilinvaihto noin 97 %:ssa). Edellinen -l.md (sama päivä, päivitykset
08.4x–11.2x). Fable local_5df52e10-10e4-4b72-9554-0049db300dfe, Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab, Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701,
Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832. S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/
1aa2bb77-7b88-4b65-ad2c-19a8462dfde5/scratchpad (skriptit ottavat S:n ympäristöstä; päivitä polku uudessa sessiossa).*

## 1. MERGE-PYYNNÖT NATIIVISEPÄLLÄ (1.0.29) — kaikki lähetetty, Fable kuitannut

| Haara | Kärki | Sisältö |
|---|---|---|
| `linssiseppa/meri-tuotanto` | **0a9fdba5** | 10 meren lajia (Linssit/Unity/MeriLajit/), lapset kallistuvat oman vesipisteensä ympäri, 1. näytös ei harvinainen |
| `linssiseppa/maakunta-taytto` | **abfb54e5** (ensin 643a5ff9) | pelikoodari/maailma-auki 7041fd0e:n päällä: herätys pois (Herays.cs pois, ElavaHerays tynkä), saapuminen = täyttö 0 s:sta + luovutus 1,6 s, pysyvät kerrokset (täyttö, rajat, nostot) näkyvissä koko ajan (Fable 10.3x), video ennallaan |
| `mallinseppa/lahitaso` | **be353929** | erikoismallit3 (Kinderdijk v3, Brugge, Hohensalzburg, Matterhorn v2, Colosseumin pääskyt) + natiiviseppa/lahitaso 1fee8dfa + Erikoismalli.Lahi 9 erikoismallille ja 14 symbolille + Stonehengen lampaat; korvaa erillisen erikoismallit3-pyynnön |

- Laitteella: käännökset c7ddef15 (09.03), a109dfdd (10.13) ja 2d04e085 (11.07), 0 poikkeusta; lähitaso kytkeytyy
  ("lähi 1 (3/3, kerroin ≥ 4 nyt, verkkoja 12)"). Kuvat Fablelle: proto-3d/lokit/mallinseppa-toimitus-20260927/
  (maakunta-saapuminen-ennen-jalkeen.png, *-laite.png, *-lahitaso*.png, matterhorn-v1-v2.png, meri-lajit-laitteella.png).
- **Mergen jälkeen:** ilmoita Pelikoodarille (poistaa PeliOhjain.MaakuntaHeraa/MaakuntaValmis; Natiiviseppä MaaKartta.Heraannyt/
  Herata), ja kun Natiivi-UI:n UiNakymat.cs asettaa ElavaKartta.KorttiAukiKysely/KuvapakkaLahtee suoraan, poista ElavaHerays.cs-tynkä.
  Poista worktreet (`git worktree remove`): /Users/Shared/Claude/wt/proto-lahitaso, proto-mallinseppa, proto-linssiseppa.
- Konfliktivinkki Natiivisepälle annettu: natiivi-ui/nostot-taysi b0994d53 muuttaa ElavaHerays.cs:ää → ota maakunta-taytto-haaran tiedosto.

## 2. AVOINNA MUILLA (seuraa, älä tee itse)

- Natiiviseppä: (a) lähikynnys pienissä maissa (LahiKerroin 4, mutta CHE/NLD/BEL/DNK ZoomKerroin ≤ 1,3 → ehdotus
  min(4, 0,9 × SuurinKerroin)); (b) noston/maastokohteen nimiö pois erikoismallin päältä (Matterhorn, Stonehenge, Brandenburg;
  Fablen päätös 10.3x); (c) Malja-symboli Kinderdijkin takarivin päällä. Kokokorjaus pienille maille on jo natiiviseppa/taso1-kynnys be33f310.
- **Todennettu 11.3x:** saapuminen v2 laitteella (2d04e085): nostot ja rajat näkyvät täytön aikana, täyttö 0,02 s, luovutus
  1,22 s, valmis 1,6 s, 0 poikkeusta, kehys mediaani 16,7 ms (yksi 150 ms:n piikki alussa); kuva
  proto-3d/lokit/mallinseppa-toimitus-20260927/maakunta-saapuminen-v2.png Fablelle. Odotustila (luento/kortti) todentamatta,
  koska testipelaaja on Marseillessa ("elava saapuminen ateena odota" peruuntuu); testaa pelaaja Kreikassa.

## 3. TEHDYT (agenttien tulokset, kaikki integroitu)

- Meri (10 lajia): purjelaiva 249, kalastusvene 83 (+ lokit), lautta 242, majakkalaiva 118 + keila (siemen 942), merihirviö 197
  (Harvinainen), delfiinit 178, lokit 91, jäävuori 107 (VahintaanLat 63). Laitteella näkyivät lautta, purjelaiva, delfiinit,
  merihirviö, lokit, jäävuori, merilaiva, valas; majakkalaiva ja kalastusvene vain esikatselussa.
- Erikoismallit: Kinderdijk v3 (900, 6 myllyä kahdessa rivissä kameraa kohti), Brugge (1 043), Hohensalzburg (1 053),
  Matterhorn v2 (843; peitto noin puolet v1:stä). Speksit docs/raportit/erikoismallit/{kinderdijk,brugge-belfry,hohensalzburg,matterhorn}.md.
- Lähitaso (Lahi, katto 3 000): Colosseum 2 946, MSM 2 839, Matterhorn 1 451, Brugge 2 135, Hohensalzburg 2 184, Stonehenge 1 653,
  Segovia 2 320, Brandenburg 2 476, Kinderdijk 1 004; symbolit Kaari 1 864, Kellotorni 1 258, Malja 2 560, Ratas 2 042, Ankkuri 1 758,
  Vuori 1 488, Tulivuori 2 350, Aallot 2 471, Kiekko 2 160, Salama 1 052, Tahti 264, Tassu 1 843, Tiimalasi 2 622, Vaaka 2 476.
  **Tarkista Fablelta:** Raamattu kirjasi "lähitaso 2–3 × kolmiot", mutta osa symboleista on 4–4,7 × (kaikki alle katon 3 000).
- Harnessit (proto-3d/tyokalut/): mallinseppa-esikatselu-{d,e,f,g,l1,l2,l3}, kategoria-esikatselu-{h,k1,k2,k3}, meri-esikatselu-{a,b,c};
  kehotteet $S/kehotteet/*.txt.

## 4. JONO (Fablen/omistajan päätösten mukaan; 97 %:ssa Fable pysäyttää — ei uutta työtä sen jälkeen)

1. **Seuraavat maat (erikoismallit, 3 kerrallaan, elämänidea ensin Fablen kautta omistajalle)** listan
   docs/raportit/arkkityypit-paletti-animaatio-20260926.md §3 ensimmäisestä sarakkeesta: **Tšekki Český Krumlov, Puola Malbork,
   Unkari Pannonhalma**; sitten Tanska Kronborg (pieni maa: koko- ja lähikynnys!), Ruotsi Visbyn muuri, Norja Nidarosin tuomiokirkko,
   Suomi Olavinlinna, Islanti Geysir, Irlanti Newgrange … Kaava: speksi → malli harnessissa (agentti, Opus) → esikatselu →
   integrointi haaraan juna/masterin päältä → käännös → laitekuvat (kulma + versio kuvaan) → Fable → merge-pyyntö.
   Lähitaso samalla (Lahi ≤ 3 000). Harnessipohja: kopioi mallinseppa-esikatselu-l1 ($S/pohjat.py tekee pohjan).
2. **Lento v3** (speksi docs/raportit/lento-v3-speksi.md, omistajan kortti 26.9. klo 23.5x): Linssisepän osa (kone + kamera) on
   proto-haarassa mallinseppa/tiger-moth **7b1bf9b9** (TigerMothKone, LennonV3.cs), EI masterissa → odottaa Natiivisepän
   integraatiota (käytävä + kytkin) ja Pelikoodarin ääntä. Tarkista Natiivisepältä, tarvitaanko muutoksia.
3. **LENTOPELI (omistajan idea, Raamattu 27.9., docs/pelikatalogi.md ja docs/raportit/talous-suunnitelma-20260927.md):**
   kaksitasokoneen (Tiger Moth, lento v3) lentämisestä oma peli: vapaa lento ja tehtäviä; polttoaine kuluu ja maksaa;
   lähtöpaikkaan palattava tai sakko; tehtävistä (esim. renkaan läpi lento) lisää polttoainetta. Odota Fablen työnjakoa —
   Linssisepän luonteva osa on kone, kamera ja tehtävärenkaat (lento v3:n pohjalta).
4. Korjausehdokkaat: Vuoren LOD0:n juuren käännetyt tahkot (k1-agentin löydös; LOD0 muutos → kuva Fablelle).

## 5. TYÖKALUT (proto-3d/tyokalut/linssiseppa-ajot/)

- `ajo-mallit.sh`: uutena VAIHE **S** (saapumisvideo, SAAPUMISET, SAAPUMISLISA=odota, SAAPUMISAIKA) ja **MERIRIVIT**
  ("MAA LAT LON laji,laji" — kamera lajin ankkuriin, ankkurit tila-riviltä `meri XXX (129 kohtaa): …`). Korjattu kirjaa|xargs-vika.
- `koosta_era2.py`: ODOTETTU-paikat kinderdijk, brugge-belfry, hohensalzburg, colosseum, matterhorn, stonehenge.
- $S: `integroi_meri.py` (merilaji → MeriLajit/ + Lajit-rivi), `pohjat.py` (lähitason harnessipohjat), `meri_paikat.py` (lajin paikka
  kehysten erotuksesta), `ajo-era*.sh` (käännös + ajo -mallit), kd3.py (Kinderdijk-esikatselu).
- Käännökset: yksi kerrallaan, rivi Karttasepälle ennen ja jälkeen, ikkuna :00–:15 (Fablen polttosääntö; tarkista onko voimassa),
  simulaattori vain kun booted < 2 (Natiivi-UI:n iPhone FB234D08 + iPad 503000D1, Laitetestaajan 1572C658); oma iPhone D0D2CD1E.
