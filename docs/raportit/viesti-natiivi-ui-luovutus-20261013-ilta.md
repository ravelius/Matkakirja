# Natiivi-UI: luovutus 13.10.2026 ilta (16.5x Suomen aikaa, jono tyhjä, lepo)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261013-aamupaiva.md
(pysyvät säännöt -20261012-ilta.md ja -20261010-aamu.md). Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012.

## Tila
- Kaikki tämän päivän erät ovat juna-187:ssä (natiiviseppa/juna-187 0461129b1), PT kuittasi ne:
  - kuvakkeet-187 8f574aa00 (Codexin 64 viivakuvaketta).
  - tieto-187 1fc4ad08d: "i"-seloste → Codexin tieto (Pikkuseloste.SelosteNappi; pikkuseloste, laukun tietäjä, Pro-rivi); i-piste r 1,2
    (Codexin r 0,35 täyttö jäi natiivissa näkymättömäksi).
  - kuvakkeet-korjaus-187 f9b0eb35f: Codexin korjatut TunnusRaha (kolikko + kruunu), PilleriJulisteet (kuva), matkamuisto
    (lumisadepallo); posti/kuvakkeet-20261013-korjaus d00e07240. Lentävän kolikon keskipiste (20, 20).
  - varivakiot-187 668bf9870: pohjavahdin vaiheet 1–3 juna-187:n päälle; pohjavahti vari 107 → 11 (loput = väridatan jäsennys ja
    tekstuurilaskenta, ei vakioita).
  - heksavarit-187 e5e3a55af: UI-C#:n heksavärit 55 erikois-tokeniksi (Kuviot.Heksa(token) merkkijonoväreille), Kartuscha.AiheenVari
    (käyttämätön) pois. Jäljellä vain Livian piirrospaletti (webin SVG 1:1) ja LinssiKomennot-testiselite (27 riviä).
- Web: ravelius/Matkakirja#4561 (natiivi-ui-heksavarit, pohja #4550) junan 187 pidätetyissä web-mergeissä
  (#4535 #4547 #4550 #4561) → merge vasta omistajan julkaisupyynnöstä.
- TF 186 -todisteet iPhone kuitattu (raha, Aloita kisa pelaajana, Googlen laatat pois): lokit/natiivi-ui-tf186-todisteet/.
- Asematauluun kirjatut kolme NUI-bugia (kaiutin, Macin vieritys, kehittäjätila) olivat jo korjattuja junassa 184 → PT siirsi Korjatut-listaan.
- SK:n museo-kysymykset: avaimet = 64 teosta + _museo, täsmäävät teokset.json:iin.
- Saapumisintro (PT:n tarkistus): natiivi lukee avauskuvat-listan sisältöpaketista → poistetut paikat 6 ja 8 eivät jätä aukkoja.

## Avoimet
- Pelinappula puuttui iPhonen kartalta satunnaisesti (a40f8a3d: 16.19 puuttui, 16.37 näkyi) → LS1 toistaa (nappula187c), ei NUI:n haara.
- Kuvat PT:lle: lokit/natiivi-ui-kuvakkeet187-pt/ (0–11).

## Opetukset
- Generoidut tyylikirjatiedostot (Tyylikirja.cs/.uss, tyylikirja.json): ristiriidassa ota uusin web-lähde (juna) ja tarkista
  `node tools/tyylikirja.mjs --tarkista --natiivi <proto>`; uusia tokeneita varten web-haara pohjaan, jossa natiivin nykyinen lähde on.
- tyylikirja.json-muokkaus tekstinä (json.dump muotoilee taulukot uudelleen).
- Kohdekartan − ja + ovat vain avauskortin kartassa (ui avauskortti <id> kartta); ui sulje ei sulje kohdekarttaa → viimeiseksi skenaariossa.
- Lentävät kolikot ehtivät kuormitetulla koneella ohi ennen stilliä → arkki tai video.
