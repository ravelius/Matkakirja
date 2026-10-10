# Natiivi-UI: luovutus 10.10.2026 klo 11.5x (konteksti ~45 %, PT:n nollausraja 50 %)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli (haarat natiivi-ui/<aihe>), web-checkout
/Users/Shared/Claude/Matkakirja-natiivi-ui (haara natiivi-ui-luovutus-20261005, vain raportit). Muistio: natiivi-ui-tila-20261009.md.
Edellinen luovutus: viesti-natiivi-ui-luovutus-20261010-aamu.md (säännöt, asettelutestin käyttö ja PIDOSSA-osio pätevät yhä).

## Runko

natiiviseppa/juna-176 = **ea16f95a4** (Unity 6.7; sisältää EnhancedTouch-suojauksen 68f860e85 ja ITMS-korjauksen). Uudet haarat sen päälle.
Testit 6.7:llä: P449 / L1299 (LS1:n museohaaralla L1319) / K453. Editorikoodi: tyokalut/kaanna-editori.sh (tarkista.sh ei käännä Editor-kansiota).

## Tänään valmista ja junassa 176 (Natiivisepän rungossa ea16f95a4)

- pohjavahti-varit-175 31bac5ad0: 5 UI-C#:n väriä tyylikirjan tokeneiksi (Kehys.Kulta, MapInk78/32/16, Kuulto.Paper62), pohjavahti 67.
- ylapalkki-uiruutu-175 7b1352b76: Ylapalkki + Matkakirjakortti.Puhelin UiRuutu-arvoista (asettelutestissä puhelin = iPhone).
- ikakysely-176 86513b039: KURATOITU LIVE (Raamattu ALLE 18 KURATOITU). UI/Ikaraja.cs: KORTTI modaali + Lomake.Valinta syntymävuosi,
  tallentaa vain aikuinen k/e (PlayerPrefs matkakirja-aikuinen), Ei nyt = kuratoitu käynnistyksen ajan. Portti PuluChat.Kysy
  (ei valmiille vastauksille, myös opas) ja PuluRealtimeNappi. Otsake x-matkakirja-aikuinen 1/0 (PuluChat.Pyynto, PuluRealtime.TokenPyynto).
  Chatin ja oppaan keskustelun alkuun paikkarivi "Vastaukset tuottaa tekoäly (Claude) · Ilmoita ongelmasta" → Reaktiot.IlmoitaOngelmasta
  (chat:<paikka>, POST /laheta). Testikomento ui ikaraja kysy|aikuinen|kuratoitu|nollaa|sulje. Asettelutestissä näkymät ikäkortti, pulu-chat.
  Workerin puoli: Pelikoodarin PR #4337 (puuttuva otsake = live, kunnes PT kytkee PULU_PUUTTUVA_KURATOITU=1).

## Kuitattu junaan 176 myöhemmin (11.3x–11.4x, Natiivisepälle lähetetty)

- linssipalkki-turva-176 25f28c53b (asettelutestin saaririvipoikkeus; linna-osa 4/4 ea16f95a4:n päällä, EnhancedTouch 0).
- heksavarit-176 da28d281f (10 Kuviot.Vari-heksaa tokeneiksi; merkkijonovärit KaupunkiNostot/NostoMerkit jätetty tarkoituksella).

## Odottaa

- **museo-esittely-176 adec86179** (LS1:n linssiseppa/taidemuseo-176 1200f364e:n päällä): MuseoTaulun esittelykortti (KORTTI: kapiteeli
  taiteilija · vuosi, otsikko, alkuperäinen nimi, tekniikka/mitat, kuvateksti, lähde · lisenssi + Havainnekuva; KortinLukija, Esittele-nappi
  aloittaa luennan; ohinapautus + Esc; KAPEA alareunaan ≤ 45 %, muuten Pohja.Sivukortti yläpalkin alta) ja huone (tiivis huonekortti = nimi
  Nimikyltti 3 s + häivytys; teksti vain napautuksesta: kyltti tai Esittele ilman teosta → MuseoSovitin.HuoneKortti). PT kuittaa LS1:n
  kuva-arkista (kombo 81f012fdc Julkaisijalla). Kuittauksen jälkeen SHA Natiivisepälle yhdessä LS1:n haaran kanssa.
- **museo-huonelukija-176 b1b47d229** = adec86179 + huonekortin kaiutin (KortinLukija). PT kuittaa museon kanssa.
- PT:n linja odottaa: (2) ikärajan muutos Asetuksista samalla ikäkortilla, (3) UI-C#:n inline-fonttikoot Tyylikirja.Koko-vakioiksi
  + pohjavahdin C#-fonttilaskuri.

## Huomiot

- Editorin kuva-arkki ei piirrä kenttien sisätekstiä (TextField-vihje, DropdownField-arvo näkyvät tyhjinä) — ei vika pelissä.
- Asettelutestin kuvat: MATKAKIRJA_ASETTELU_KUVAT="nimi,…" toimii nyt kaikissa neljässä koossa (ajo 10.5x).
- Museon lähderivi "Rijksmuseum, Amsterdam · Public Domain Mark 1.0 (Rijksmuseum)" tulee LS1:n datasta sellaisenaan.

## PIDOSSA / seuraavaksi

Ei PT:n antamaa jonoa linna-ajon jälkeen; oma suositus olemassa olevilla pohjilla PT:lle. Sessiot: PT local_593b89a1-2514-4d74-b956-2a73db862382,
Natiiviseppä local_bf20055b-…, Julkaisija local_22b29f10-…, LS1 local_45a869de-4d6b-4ed6-a6c9-30fd8442587e, Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6.

## Omat ajot

Ei käynnissä olevia ajoja eikä simulaattoreita; käännöslukko ei ole minulla (linna-osa jonossa Julkaisijalla).
