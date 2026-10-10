# Natiivi-UI: luovutus 10.10.2026 klo 12.4x (TF 176 -korjaukset junaan 176 / build 177)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli (haarat natiivi-ui/<aihe>), web-checkout
/Users/Shared/Claude/Matkakirja-natiivi-ui (haara natiivi-ui-luovutus-20261005, vain raportit). Muistio: natiivi-ui-tila-20261009.md.
Säännöt, asettelutestin käyttö ja PIDOSSA: viesti-natiivi-ui-luovutus-20261010-aamu.md (pätevät yhä).

## Runko

natiiviseppa/juna-176 (Unity 6.7), uusin nähty 9bf070143. Uudet haarat sen päälle. Testit: P453 / L1299 / K454.
Editorikoodi: tyokalut/kaanna-editori.sh. tarkista.sh ajetaan zsh:lla (sh antaa print-virheitä).

## Tänään kuitattu junaan 176 (kaikki PT:n kuittaamia, SHA:t Natiivisepällä)

- kehittaja-pallot-176 c74736f7c (rungossa 51e42e7a6): kehittäjän maailmanäkymässä muun kuin kohdemaan kaupunkipallot 0,4 × koko
  (KaupunkiPalloMitat.KokoMaassa + Kartta-testi), osuma ≥ 44 pt säilyy.
- saapumisarkki-176 72cbff04b: omistajan TF 176 kohta 3, saapumisarkki koko ruudulle yläreunaa myöten (top 0).
- latauskuva-176 bf820d7fa: TF 176 kohta 1. Latauskuva.AsetaAlaosa (stillin tumma alaosa kerrostaustan saumasta alas: iPhone/iPad pysty
  0,73, vaaka 0,69; kuvat pikselilleen samat saumassa), ankkuriköyden maa-piste stillin köyden häipymiskohtaan (vino), heilunta
  pohjan ylärajoille (kupu 0,75°/4 pt, kori 0,6°/3 pt, 7 s), UiKerros.MerkitseMuutos liikkeen ajan (epäily: 6.7:ssä rotate/translate
  ei likaa paneelia → Ruudunpaivitys harvensi piirron 2 s:iin; EI toistettu laitteella), siirtymäruutuun Myllyn Poistu
  (mk-kortti__napit + mk-nappi--toiminto: SiirtymaPeru + SuljeLinssi).
- ikaraja-asetukset-176 4b36cb4ca: Ei nyt tallentaa "?" (ei kysytä uudelleen), Asetusten Muut-osioon "Ikäraja: <tila>" (valikkonapin
  toimintopohja) samaan korttiin, vain tiukempaan suuntaan (alle 18 lukittu → Tilarivi-viesti ui.ikaraja.lukittu), ui ikaraja nollaa
  poistaa myös "?". Säännöt Peli/IkarajaSaanto.cs (+ IkarajaTestit), asettelutestiin "pillerin asetukset".
- Asettelutesti 12.25 (pallo, kaikki viisi haaraa): pillerin asetukset OK 4/4; 2 VIKAA "nosto: lukunäkymä ei aukea" = tunnettu
  satunnaisvika (PT: ei estä junaa).

## Kesken muilla (TF 176 kohdat 2 ja 4 → LS1, local_45a869de-4d6b-4ed6-a6c9-30fd8442587e)

Lennon kohdemerkit irti pallosta ja kehittäjänäkymän kaupunkivalinta ei toimi. Laite todennäköisesti iOS-appi Macilla (~1,45:1).
NUI:n koodiluku lähetetty LS1:lle (KaupunkiMerkit: georeferenssin muunnos + kamera-säde, Osuma WorldToScreenPoint). Auta LS1:tä
UI-osissa pyydettäessä. Juna 177 odotti 12.4x vain näitä.

## Seuraavaksi

1) Karttasepän pääkaupungit (skeema 1.60, haara karttaseppa-maat-eurooppa): paakaupungit.json olemassa olevalla kaupunkimerkillä
   pienimmässä tärkeysluokassa, napautus olemassa olevaan maakorttiin perustiedoilla; ei uutta merkkiä (puuttuva → PT). Aloita, kun
   PR on mainissa tai Karttaseppä antaa SHA:n.
2) Oma suositus olemassa olevilla pohjilla PT:lle (PT 12.4x).
TILINVAIHTO: PT lykkäsi, kunnes TF 176 -viat on korjattu ja juna lähetetty.

## Omat ajot

Ei käynnissä olevia ajoja eikä simulaattoreita; käännöslukko vapautettu 12.3x.
