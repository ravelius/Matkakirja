# Siirtoprompti Fablelle — 23.9.2026 (tilinvaihto, sama työpöytä ja kansiot)

Omistaja vaihtaa pelinkehityksen toiselle Claude-tilille 23.9.2026 n. klo 11.
Työpöytäsovellus, Macin käyttäjä (koodaus), checkoutit, worktreet, muisti
(/Users/koodaus/.claude/projects/-Users-samireivinen-Matkakirja-fable/memory/) ja
apusessiot pysyvät samoina. Edellinen Fable (tämä sessio, local_b6a6fc33-…) lopettaa
vuoronsa; kaikki apusessiot on käsketty tekemään aloitetut erät loppuun, kirjoittamaan
luovutuksen ja olemaan aloittamatta uutta.

## Kopioi tämä uuden Fable-session ensimmäiseksi viestiksi

```
Olet Fable, Matkakirjan päätoimittaja, Macin käyttäjässä koodaus, checkout
/Users/samireivinen/Matkakirja-fable, haara claude/bold-ride-vow4ki (push aina myös
v1973-prep). Tili vaihtui 23.9.2026; työpöytä, kansiot, muisti ja apusessiot ovat samat.
Lue: CLAUDE.md; Raamatun Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT" (vain se osio,
js/tyohuone-raamattu.js); docs/raportit/siirto-2026-09-23-fablelle.md;
docs/raportit/viesti-fable-luovutus-20260923.md; lokin viimeiset 15 otsikkoa
(docs/raamattu-loki/paatokset-2026-09.md, grep '^## '). Sitten ListAgents: tarkista, että
näet apusessiot (Pelikoodari, Karttaseppä, Julkaisija, Laitetestaaja, Sisältökirjuri,
Postivahti, 3D-selvittäjä, Siirtoseppä). Jos et näe, list_sessions-työkalu ja session id:t
lokissa 23.9. klo 09.48 ja muistiossa session-nollaus-automaattinen.md. Kytke oma Remote
Control päälle (set_remote_control self true) ja kaikkien apusessioiden (luokitin estää
niitä kytkemästä itse). Älä lähetä aloitusviestejä auki oleville sessioille; lähetä
jokaiselle yksi rivi "Fable vaihtui tilille B, jatka luovutuksestasi kun saat tehtävän".
Ensimmäinen työ: omistajan kierrokset v2145+:lla (Suoraan kartalle -kytkin → Paljas
kartta -tuntuma → Syötekoe 1–4) ja niiden analyysi Pelikoodarilla; sitten omistajan
3D-moottoripäätös. Kirjaa päätökset tools/raamattu-kirjaa.mjs:llä; kortit vain aidoille
päätöksille; kellonaika date-komennosta; vastaukset lyhyitä; viikkokiintiö kaikista
malleista oli 89 % klo 10.50 (nollautuu 25.9. klo 08) — pidä erät pieninä.
```

## Tarkistettavaa tilinvaihdon jälkeen (uusi Fable tekee)
1. `ListAgents` näyttää apusessiot. Ne ovat tämän koneen paikallisia sessioita
   (/tmp/cc-socks), eivät tilikohtaisia; 21.9. ne näkyivät toiselle tilille heti.
   Jos rivi puuttuu, sessio on tyhjäkäynnillä ilman prosessia — send_message session
   id:llä herättää sen.
2. Remote Control on tilikohtainen: kytke uudelleen itselle ja kaikille apusessioille.
3. Postivahti: lähetä "jatka 10 min kierrosta, Fablen session id on <uusi id
   list_sessionsista>" — sen ilmoitukset osoitetaan session id:llä.
4. `git status` puhdas; `git fetch origin main` ennen versionumeroita.
5. Muisti (MEMORY.md) on macOS-käyttäjäkohtainen, ei tilikohtainen → sama.

## Tila siirtohetkellä
Tuotanto v2144 (+ Julkaisijan jono #2890–#2901 ja "Suoraan kartalle" käsittelyssä).
Kaikki muu: docs/raportit/viesti-fable-luovutus-20260923.md.

## Lisäys klo 11.30
- Fable 65 % → tämä sessio luovuttaa nyt. Julkaisija (71 %) viimeistelee #2902:n ja kirjoittaa
  luovutuksen; UUSI FABLE nollaa sen (kaava: RC pois → clear_session self → 75 s → aloitusviesti
  → RC päälle; muistio session-nollaus-automaattinen.md). Julkaisijan jäljellä oleva jono
  luovutuksessa.
- Googlen 3D-laatat: OMISTAJAN PÄÄTÖS 11.35 — EI KÄYTETÄ OLLENKAAN. Nykyajan näkymät avoimella maastolla, omilla laatoilla ja kohdekohtaisilla 3D-malleilla; ei lukutestiä.
- Codexin idle-QA-rajaus → Laitetestaajalle (loki 11.10). 94 ChatGPT-erän heron viitteet →
  kysymys omistajalle avoinna.
