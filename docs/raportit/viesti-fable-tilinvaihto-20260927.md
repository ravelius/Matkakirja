# Siirtoprompti tilinvaihtoa varten (Fable 27.9.2026 klo 11.3x, viikkokiintiö 93 % → 97 %)

Omistajan sääntö 27.9. klo 09.4x: viikkokiintiö 97 % → kaikki sessiot pysäytetään ja tämä prompti käynnistää
työn uudella tilillä. **POIKKEUS (omistaja 11.3x): päätoimittaja (FABLE-sessio) luodaan Opus-mallilla, effort max**
(ei Fable-mallilla). Roolisessiot Opus (Sisältökirjuri Sonnet) kuten ennen; Linssiseppä (Opus, max).

## 1. Ensimmäinen viesti uuden tilin FABLE-sessioon (kopioi sellaisenaan)

> Olet Fable, Matkakirjan päätoimittaja — tällä tilillä poikkeuksellisesti Opus-mallilla, effort max (omistaja
> 27.9.2026 klo 11.3x). Checkout /Users/Shared/Claude/Matkakirja-fable, haara claude/bold-ride-vow4ki.
> Aja `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`. Lue CLAUDE.md, Raamatun Ydinajatus
> kohta 2 (TYÖNJOHTAJAN HARKINTA, JUMI → FABLE, KONTEKSTIN NOLLAUS) ja uusi kohta PELIT, TALOUS JA LUENTA, sitten
> docs/raportit/viesti-fable-tilinvaihto-20260927.md KOKONAAN ja lokin (docs/raamattu-loki/paatokset-2026-09.md)
> 27.9. otsikot klo 07.16 alkaen. Muisti: /Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory/
> (MEMORY.md → fable-tila-20260927-aamu, viikko-97-tilinvaihto, sessioiden-luonti-appia-ohjaamalla,
> worktree-katoaa-mergessa, fable-ei-mergea-koodia). Luo roolisessiot Raamatun kaavalla (kohta 3 alla), lähetä
> jokaiselle sen aloitusviesti (kohta 4), kytke oma Remote Control päälle, ja jatka jonosta (kohta 5).
> Vanhan tilin sessiot on pysäytetty; niiden id:t ovat vain viitteeksi.

## 2. Tila 27.9. klo 11.3x

- **TestFlight:** 1.0.27 (build 27, proto 65f725ce) ja 1.0.28 (build 28, proto-master 7788b629: P1, kaiutinvipu,
  striimiääni, lukija-putki, maastokorkeus, taso1-kynnys, 6 erikoismallia, 14 kategoriasymbolia 3D).
- **Web main:** v2313 (#3392 Raamattu + pelikatalogi). Tänään mainissa: xAI ara striimiluenta (#3365), kaiutinvipu,
  avauskortti (#3364), maalehti-siirto 28 juttua, lukijaääni pitkä pala + progressiivinen soitto (#3384),
  lukijamittari, virkeväli 220 ms, puheraja 400 000/IP/vrk (#3389, worker julkaistu), löytösumu pois (#3385),
  Pulu ilman äänikytkimiä (#3386), astro erät 4–7 (tilaus 102 uutta täynnä, 189 kohdetta), turistiopas 19,
  erikoismallien sisältö, maalehti-QA, talous-suunnitelma (#3390), Z10 web (#3376, #3371, #3380).
- **Z10:** tuotannossa webissä 09.47 (osoitin 2026-09-26s-pohja, tasot 0–10; varmuuskopiot pyramidi-20260927-0732/
  0947.json). Natiivin pallo-Z10 poltetaan klo 22–24 (Karttaseppä, 13 856 laattaa, sarja 2026-09-26-pohja-20260926);
  vienti tuotantosarjaan vaatii OMISTAJAN hyväksynnän Karttasepän sessiossa; sitten #3395 offline.json → Natiivisepän
  kuittaus → paketti (Siirtoseppä).
- **Ämpäri:** 106,9 Gt, ~1,60 $/kk. Omistaja poistaa itse vanhat pyramidisarjat 09-21/22/22c/23a (13,5 Gt), harkinta 09-25.
- **Avoimet PR:t:** #3394 talous vaihe 1 web (junaan), #3388 luennan säätimet (hyväksytty, junaan), #3395 offline.json
  (odottaa polttoa), #3393 pallolaatat-työkalu, #3378 Z10-raportti (docs), #3391 pelikatalogi (sulje, sisältö #3392:ssa).
- **Kortit omistajalle tekemättä:** Natiivi-UI:n avauskortin uusi kuvapari (miniatyyri lähemmäs, osiolinkit kevyemmiksi);
  Sisältökirjurin nähtävyyskuvien tyylitarkastuksen lista; pelikatalogin 10 pelisuunnitelmakorttia + lentopeli + streak.

## 3. Roolisessiot (vanhat id:t viitteeksi; uudelle tilille luodaan uudet Raamatun kaavalla MAC STUDIO -osion mukaan)

Checkoutit /Users/Shared/Claude/Matkakirja-<rooli> (Natiiviseppä: Matkakirja-3d-selvittaja), Postivahti Matkakirja-posti.
Vanhat: Postivahti local_a24c43c0…, Julkaisija local_5cb16c00…, Natiiviseppä local_674b9ec4…, Pelikoodari local_7fcab04b…,
Natiivi-UI local_44392b3c…, Linssiseppä (Opus, max) local_771b401b…, Siirtoseppä local_86d0c984…, Karttaseppä local_eec7f158…,
Sisältökirjuri local_be1a3375…, Laitetestaaja local_af48ba1e…, Fable local_5df52e10….
Sessioiden luonti: muisti sessioiden-luonti-appia-ohjaamalla (osascript-kaava; jos Avaa-nappi on harmaa, käytä
olemassa olevaa sessiota ja nimeä se). Roolien luovutukset docs/raportit/viesti-<rooli>-luovutus-20260927-*.md
(tilinvaihto-päätteiset ovat uusimmat) ja aloitusviestit viesti-<rooli>-aloitus.md.

## 4. Aloitusviestit (yksi rivi per rooli; lisää "Fable on <uusi id>" ja "vanhat viestit on käsitelty")

- **Natiiviseppä:** kokoa 1.0.29-juna: nostot-heti 934103a9, pelikoodari/maailma-auki 7041fd0e, pulu-ilman-kytkimia
  bae36144, puhevirta b6fc76d7, linssiseppa/meri-tuotanto 0a9fdba5, maakunta-taytto 643a5ff9 + abfb54e5,
  mallinseppa/lahitaso be353929, natiivi-ui a5aae711/18543b3c/56ab226b/0ca9c11e; omat: MaaKartta Heraannyt/Herata pois,
  Matterhornin nimiön väistö, pienten maiden lähitason kynnys → käännös → savuke → SHA Fablelle → Laitetestaaja → TF 1.0.29.
- **Julkaisija:** #3394 → #3388 junaan (Pöllön julkaisu); TF 1.0.29 kun PASS; #3391 kiinni; pallo-Z10:n jälkeen ei
  osoitinvaihtoa (natiivi lukee omaa pakettiaan).
- **Pelikoodari:** natiivin talousportti (Matka/Kaupat + UI-speksi) + pelistreak; avauskortin web-kevennys (miniatyyri
  lähemmäs, osiolinkit kevyemmiksi); natiivin puhevirran mittaus (kehittäjäkoodi omistajalta avaintiedostoon);
  pelikatalogi.html Pages-kopio; Z10 zoomikatto vasta omistajan kuvaparista.
- **Natiivi-UI:** avauskortin korjaukset (miniatyyri lähemmäs kaupunkia, osiolinkit kevyemmiksi) → kuvapari → Fable →
  omistajan kortti → merge-pyyntö; 1.0.29-todennukset (luennan säätimet, kaiutinvipu, Pollo-puhe laitteella).
- **Linssiseppä (Opus, max):** lento v3 -speksi + LENTOPELI-suunnitelma (vapaa lento + tehtävät, polttoaine, paluu
  lähtöpaikkaan, 60 fps -tavoite) omistajan korttiin; seuraavat erikoismallimaat; meri 10 lajia laitteella 1.0.29:stä.
- **Siirtoseppä:** #3395 + paketti pallo-Z10:n viennin jälkeen; delta #3394:n jälkeen (talous → natiivi vasta portin kanssa).
- **Karttaseppä:** pallo-Z10 yöpoltto (klo 22–24) → vientikomento odottamaan omistajan hyväksyntää sessiossa → rivi Fablelle;
  z10-näyte tuotannosta tehty; koodi 1 -korjaus pieni erä.
- **Sisältökirjuri (Sonnet):** nähtävyyskuvien tyylitarkastus (raportti + kontaktiarkit) → omistajan lista; pelikatalogin
  10 pelisuunnitelmakorttia + lentopeli + streak; hintatasot.js:n tarkennus maittain.
- **Laitetestaaja:** 1.0.29-resepti valmis; kierros kun SHA tulee.
- **Postivahti:** 10 min kierto; viikkokiintiö uudella tilillä; levyraja 80 Gt; GPU-headless > 4 Julkaisijalle.

## 5. Fablen jono uudella tilillä

1. TF 1.0.29 (juna → Laitetestaaja → vie) — omistaja haluaa nähdä meren, lähitason ja maakuntamuutokset pelissä.
2. Omistajan kortit: avauskortin korjattu kuvapari; nähtävyyskuvien lista; lentopelin suunnitelma; pelikatalogin 10.
3. Raamattu-PR: Opus max -sääntö uusille linsseille/peleille + fps tapauskohtaisesti (loki 11.17–11.19) ja äänten
   pelinimet tarkistus.
4. Illalla: pallo-Z10 vienti (omistaja hyväksyy Karttasepän sessiossa) → offline.json → paketti; omistaja poistaa
   vanhat pyramidisarjat.
5. Talous vaihe 1 natiiviin, pelistreak, lentopeli (Opus max, "viimeisen päälle", hyväksymislista).

## 6. Säännöt, jotka tulivat tänään (kaikki lokissa ja Raamatussa #3392)

Pelit = linssien veroinen osa (docs/pelikatalogi.md + pelikatalogi.html); talous (12/20/32 £, 400 £, rosvo 50 %, 2 vrk,
jatko tallennuksesta, pankin apu pois, Odota-kulkutapa); pelistreak; lentopeli; striimipuhe ilman äänikytkimiä; luennan
säätimet (ratas + VU kaiuttimessa + pelinimet Aino…Väinö); nostot heti, maakuntaeteneminen ja salaisuudet pois, vain
pohjaväri, lippu liehuu jää, mannerlennot jäävät; lähitaso LOD0; meri 10 lajia; uusi linssi/peli Opus max + hyväksymislista,
fps tapauskohtaisesti (toiminta 60); viikko 97 → tilinvaihto; Fable ei koskaan `--delete-branch`.

## 7. Päivitys 11.3x (viikko 94 %, Fablen konteksti 72 %)

- Mainissa lisäksi #3394 talous vaihe 1 web (v2314), #3396 pelistreak-ehdotus (docs); #3388 mergessä (Pöllön julkaisu).
- Omistaja hyväksyi pelistreak-luvut sellaisenaan (3–6 pv 20 £/pv, 7. pv 50 + 100 £, 8+ pv 30 £/pv + joka 7. pv 100 £).
- Natiivin talousportti pelikoodari/talous-vaihe1 fbda3812 valmis → 1.0.30 yhdessä Natiivi-UI:n UI-osan kanssa (kassarivi,
  toast, loppukortti, Odota-nappi); Siirtosepälle START_MONEY 400. 1.0.29 pysyy visuaalisessa kokoonpanossa.
- Luovutukset tilinvaihtoon pushattu: Natiivi-UI (f8f7a9c67), Julkaisija (c01adfd54), Karttaseppä (1bcc21e08), Linssiseppä -m
  (01289a762), Laitetestaaja (6b46d3f13), Sisältökirjuri -e, Pelikoodari (db81fcab4), Siirtoseppä (e147220ce, nollasi itsensä).
  Natiiviseppä ja Postivahti tekevät omiaan.
- Lähitaso: sitova raja 3 000 kolmiota/malli, Raamatun "2–3 ×" → "2–5 ×, katto 3 000" seuraavassa Raamattu-PR:ssä.
- Saapuminen v2 (abfb54e5) todennettu laitteella: nostot ja rajat näkyvät täytön aikana.
- Avauskortin korjaukset natiivissa koodissa (11a3c43a), käännös klo 12 → kuvapari → omistajan kortti (uusi Fable).
