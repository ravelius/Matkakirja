# Luovutus: Sisältökirjuri 27.9.2026 klo ~17.5x (kontekstin nollaus, 72 %)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927-g.md`. Tämä on
**kontekstinnollausluovutus** — Fable pysäytti tämän session 72 %:n
kontekstissa. Uusi sessio jatkaa samalla checkoutilla
(`/Users/Shared/Claude/Matkakirja-sisaltokirjuri`, haara
`sisalto-pelikatalogi-20260927`).

**HUOM tiedostonimestä:** Fablen ohje sanoi kirjoittaa `-f.md`, mutta
se tiedosto on jo olemassa (klo 14.0x, vanhempi kuin `-g.md` jota
tämä sessio luki alussa) — käytin seuraavaa vapaata kirjainta `-h.md`,
ettei vanha luovutus katoa.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. Päivitetty `docs/raportit/viesti-sisaltokirjuri-aloitus.md`

## 2. Tila — kolme Euroopan erää auki rinnakkain

**main liikkuu nopeasti** (useita sessioita rinnakkain) — aja
`git fetch origin main` ENNEN mitään versionumeron valintaa tai
rebasea, JUURI ENNEN pushia uudestaan.

| PR | Sisältö | Tila |
|---|---|---|
| #3397 | Pelisuunnitelmakortit 1–10 + Lentopeli + Pelistreak | **MERGETTY** |
| #3423 | Euroopan erä 3: Barcelona/Kiova/Edinburgh/Varsova/Dubrovnik | **MERGETTY** |
| #3429 | Euroopan erä 4: Vilna/Sarajevo/Odessa/Amsterdam/Tallinna | AVOIN, mergeable, CI:ssä |
| #3435 | Euroopan erä 5: Praha/Krakova/Moskova/Sevilla/Budapest | AVOIN, mergeable, CI:ssä |
| #3437 | Euroopan erä 6: Tampere/Granada/Firenze/Oslo/Kobenhavn | AVOIN, mergeable, juuri pushattu — CI ei ehtinyt vielä |
| #3428 | Codex: Ateenan miniatyyrien tyylikorjaus (ks. kohta 4) | AVOIN, odottaa päätöstä + kuittausta |

Kaikki kolme Eurooppa-PR:ää (4, 5, 6) ovat **itsenäisiä worktree-haaroja**
eri kaupungeista — ei päällekkäisyyttä keskenään. Kun yksi mergetään,
loput kaksi pitää rebasata ennen niiden omaa mergeä (js/muutokset.js +
js/main.js + sw.js -versiorivit konfliktoivat rutiininomaisesti, ks.
kohta 6 kaava).

Worktreet (poista `tools/uusi-worktree.sh --poista <haara>` kun
vastaava PR on mergetty):
- `/Users/Shared/Claude/wt/sisaltokirjuri-euroopan-era4`
- `/Users/Shared/Claude/wt/sisaltokirjuri-euroopan-era5`
- `/Users/Shared/Claude/wt/sisaltokirjuri-euroopan-era6`
- (era3-worktree jo poistettu, PR #3423 mergetty)

## 3. UUSI PYSYVÄ TYÖTAPA: ristiintarkistus ennen aiheen lukitsemista

Fable vahvisti tämän pysyväksi käytännöksi (kirjattu myös lokiin).
**Ennen kuin kirjoitat yhtään sanaa uudesta lehtiaiheesta**, tarkista
näiden kolmen aiemman erän oppien mukaisesti:

1. `js/packs/nahtavyysjutut.js` — onko kohde jo kaupungin
   kohdekartalla eri kulmasta kerrottuna?
2. `js/packs/maa-kategoriat.js` (`MAA_KATEGORIAT[ISO]`) — onko sama
   aihe jo maalehdellä? (Erä 4:ssä löytyi 3/5 päällekkäisyyttä
   JÄLKIKÄTEEN: Sarajevon salamurha oli jo kohdekartalla, Odessan
   Potjomkin-portaat jo kohdekartalla, Tallinnan laulava vallankumous
   jo Viron maalehdellä — kaikki kolme piti kirjoittaa uusiksi. Erissä
   5 ja 6 tarkistus tehtiin ENSIN, ei yhtään uudelleenkirjoitusta.)
3. Kaupungin omat muut `KULTTUURI_KATEGORIAT[kaupunki]`-aiheet (id-lista
   nopealla node-komennolla).

Menetelmä (node-komento, aja worktreessa):
```js
node -e "
import('./js/packs/kulttuuri-kategoriat.js').then(async m => {
  const K = m.KULTTUURI_KATEGORIAT;
  for (const c of ['kaupunki1','kaupunki2']) {
    console.log(c, K[c].map(x=>x.id));
  }
  const N = (await import('./js/packs/nahtavyysjutut.js')).NAHTAVYYSJUTUT;
  for (const c of ['kaupunki1','kaupunki2']) console.log('JUTUT', c, Object.keys(N[c]||{}));
  const M = (await import('./js/packs/maa-kategoriat.js')).MAA_KATEGORIAT;
  for (const iso of ['ISO1','ISO2']) console.log(iso, M[iso]?.map(c=>c.id+':'+c.nostot.map(n=>n.otsikko)));
});
"
```

## 4. Codex-tilaus: nähtävyyskuvien tyyliuudistus — erä 1/N valmis, odottaa

Omistajan tilaus (Ateenan kohdekartan kuvakaappaus, ks. tarkempi
tausta luovutuksen -g.md kohdasta ja tämän session peer-viesteistä):
osa nähtävyyskuvista on väärässä tyylissä (maisema/muotokuva
isometrisen pienoismallin sijaan). Tilaus lähetetty
`posti/sisaltokirjuri-kuvaputki-tyyliuudistus-20260927.md`
(claude/postilaatikko), liitteenä oma 55 poikkeaman ennakkolista
`posti/sisaltokirjuri-tyylilista-eurooppa-20260927.md`.

**Codex toimitti ensimmäisen kaupunkierän (Ateena) — PR #3428,
odottaa SINULTA:**
1. **Tarkista** PR #3428 kontaktiarkki
   (`docs/raportit/kuvat/ateena-miniatyyrit-ennen-jalkeen-20260927.jpg`)
   omistajan kalibrointia vasten (referenssit: Akropolis/Antiikin
   agora/Zeuksen temppeli/Sýntagman aukio; väärät jotka Codex uusi:
   Iliou Melathron/Akropolis-museo/Niken temppeli).
2. **Sisältöpäätös 4 kuvasta**, joita Codex EI generoinut uudelleen
   koska ne ovat tapahtuma/esine/henkilö eikä karttapaikka:
   `ateena-diogeneen-astia`, `ateena-elginin-marmorit`,
   `ateena-maratonhuijaus`, `ateena-louis-1896`. Päätä: poistetaanko
   nähtävyyskartalta vai siirretäänkö toiseen esitysmuotoon (esim.
   historian hetki tai lehtiaihe-nosto)? Codex huomautti myös, että
   Elginin marmorien nykyinen karttapaikka Ateenassa voi johtaa
   harhaan (marmorit ovat Lontoossa).
3. **Kuittaa** Codexille vastaanotto + päätös postilaatikkoon
   (`posti/sisaltokirjuri-kuittaus-...md`, malli: ks. aiempi kuittaus
   `posti/sisaltokirjuri-kuittaus-hetket-poikkeamat-20260927.md`).
4. Seuraavat kaupunkierät tulevat omina PR:inään — tarkista jokainen
   samalla kaavalla ennen Julkaisijalle kuittaamista (Fablen ohje).

Fablen priorisointi: kun Codexin tyyliuudistustoimitus tulee, se menee
Eurooppa-erien edelle.

## 5. Siirtosepän eheystarkistus #3434 — sinulle osoitetut löydökset

PR #3434 (mergetty) sisältää raportin
`docs/raportit/siirtoseppa-eurooppa-eheys-20260927.md`. Fable osoitti
seuraavat kohdat SINULLE (Sisältökirjurille), ei Siirtosepälle:

1. **3 kuvaa eivät löydy Commonsistakaan** (väärät tiedostonimet
   `kulttuuri-kategoriat.js`:ssä, Nouméa): "General View of Noumea, by
   Peace.jpg", "Noumea by Louise Michel.jpg", "Portrait de Louise
   Michel (1830-1905), pendant la Commune de Paris 1871…" — HUOM:
   Nouméa on merentakainen alue, EI Eurooppaa, joten tämä odottaa
   "VAIN EUROOPPA" -rajauksen päättymistä (ks. kohta 6). Lisäksi
   Antikytheran mekanismin kuva `kuvat/nama-machine-d-anticythere-1.jpg`
   puuttuu ämpäristä.
2. **23 miniatyyriä 404** osoitteessa `kohtaamiset/miniatyyrit/*.png`
   (esim. `berliini-lehman-hinnalla`, `berliini-berliinin-karhu`,
   `bukarest-szathmarin-studio`) — pyydä täysi lista Siirtosepältä
   ennen korjausta.
3. **7 TIFF-kuvaa** eivät näy natiivissa eikä Chromessa (Euroopassa):
   Alpit lisät/1, Luzern CHE/4, Dubrovnik Pilen portti + Lovrijenac,
   Ateena Schliemannin talo (täkynostot/2), FIN/0 nostot/1 Matti
   Jämsä, GRC/4 nostot/1 Theodorakis. Korjaus: vaihda JPG-versioon tai
   toiseen kuvaan.
4. **Luxemburgilla 0 nähtävyysjuttua** — ainoa kaupunki-tyypin piste
   ilman. TARKISTA ENSIN: PR #3419 (erä 3 aiempi, Valletta+Luxemburg)
   lisäsi Luxemburgille wiki-only-pisteitä — tämä löydös voi olla
   vanhentunut, jos #3419 on jo mergetty ja julkaistu tarkistushetkellä
   käytetyn haaran jälkeen. Tarkista `git log` ennen työn aloitusta.
5. **7 kuvaa alle 400 px lyhyempi sivu**: Lissabon Maria Severa, Praha
   Dvořák (HUOM: Praha on omassa erä 5:ssäni, PR #3435 — tarkista
   ettei tämä ole sama kuva jota jo käsittelin), Sofia vankila,
   Bukarest ×2, Islanti Laxness, Sisilia nuket. (+5 panoraamaa,
   raportin mukaan todennäköisesti ok sellaisenaan.)

Nämä eivät ole kiireellisiä (ei riko testejä), mutta kirjaa jonoon
kuvakorjauserinä kun Eurooppa-erät ja tyyliuudistuksen tarkistus ovat
edenneet.

## 6. VAIN EUROOPPA (omistaja 27.9.), maantieteellinen rajaus

Fable täsmensi: rajaus on **maantieteellinen**, ei vain "uusi
sisältö/kohdetyö" yleisesti — merentakaiset Euroopan alueet
(esim. Nouméa, joka on Ranskan merentakainen alue Tyynellämerellä)
EIVÄT kuulu "VAIN EUROOPPA" -piiriin, vaikka niillä olisi eurooppalainen
hallinnollinen yhteys. Älä aloita niiden korjaamista ennen kuin
omistaja/Fable vahvistaa rajauksen päättyneen.

## 7. Jono seuraavalle sessiolle (järjestyksessä)

1. **Codex-tyyliuudistuksen Ateena-erän tarkistus + päätös** (kohta 4)
   — PRIORITEETTI, koska Codex odottaa vastausta.
2. **Euroopan erä 7**: seuraavat 5 ohuinta mittarilla (DONE-lista
   kasvaa: lisää tähänastiset 30 kaupunkia excludeen, ks. kohdan 3
   node-komento pohjana laskukaavalle — käytä samaa
   aiheet+kulttuurinostot+jutut-summaa, alenevasti). **AINA
   ristiintarkistus ennen kirjoitusta** (kohta 3).
3. Kun Codex toimittaa seuraavan tyyliuudistuskaupungin, sen tarkistus
   menee Eurooppa-erien edelle (Fablen priorisointi).
4. Kun kaikki Codexin tyyliuudistuskaupungit on käyty läpi ja "VAIN
   EUROOPPA" päättyy: Siirtosepän löydökset (kohta 5) + Nouméan
   kuvakorjaus.

## 8. Sitovat käytännöt (ei muutoksia edellisestä)

- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan; isolation:"worktree"
  jos agentin pitää työskennellä erillään jaetusta checkoutista.
- Älä mergaa checkout-haaraa (`sisalto-pelikatalogi-20260927`) äläkä
  poista sitä.
- Skandaalikiintiö 2-3/maa (`js/packs/skandaalit.js`) — tarkista AINA
  ennen uutta skandaalia. Kaikki tähän mennessä käsitellyt 30
  Eurooppa-erän maata ovat jo 2-3/3 kiintiössä, joten uusia
  skandaaleja ei ole tarvittu eikä todennäköisesti tarvita seuraaviinkaan.
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  pushia, ei aiemmin. js/muutokset.js-konfliktit ovat rutiinia
  (versionumerorivit) — oma rivi ylimmäksi, numero main+1, main.js+sw.js
  samaan lukuun.
- Kuvien tarkistus AINA `tools/hae-commons.mjs`:llä ennen käyttöä (CC/PD).

## 9. Julkaisukaava (Eurooppa-sisältöerä)

```
git fetch origin main
node tools/uusi-versio.mjs "Muutosrivi"
node --test tests/*.test.mjs
node tools/tarkista-kaksoisavaimet.mjs
node tools/build-standalone.mjs
git add -A && git commit -m "..."
git fetch origin main   # UUSIKSI juuri ennen pushia
git rebase origin/main  # ratkaise js/muutokset.js + main.js + sw.js -konfliktit
git push -u origin <haara>
gh pr create ...
```

## 10. Aloitusviesti uudelle sessiolle

Ks. päivitetty `docs/raportit/viesti-sisaltokirjuri-aloitus.md`.
