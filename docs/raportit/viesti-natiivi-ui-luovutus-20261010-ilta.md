# Natiivi-UI: luovutus 10.10.2026 klo 17.1x (PT:n nollausraja 51 %)

Työtila: proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-olavpeli (haarat natiivi-ui/<aihe>, nyt haarassa
natiivi-ui/latauspallo-tuuli-179), web-checkout /Users/Shared/Claude/Matkakirja-natiivi-ui (haara natiivi-ui-luovutus-20261005, vain
raportit). Muistio: natiivi-ui-tila-20261009.md. Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md (pätevät yhä).

## Runko

natiiviseppa/juna-179 9e24c67a1 (juna 178 = BUILD 178 master 9e10d4d33). Testit tänään: P456 / L1320 / K461.
Asettelutesti: `tyokalut/ui-asettelutesti.sh <haara> pallo|linna`, uutta: MATKAKIRJA_ASETTELU_KOOT="mac" tai
"iphone-pysty,iphone-pysty" (järjestys ja toistot), MATKAKIRJA_ASETTELU_NAKYMAT="maakortti" (vain ne isot näkymät, ilman
Kysy- ja HUD-vaiheita: nopea). Koko pallo-osa 4 koossa menee juuri yli 6 min:n rajan, joten aja enintään 3 kokoa kerrallaan.
Lukko on Julkaisijan NYT-vuorolla; ilmoita aina "lukko vapaa".

## Tänään junissa (kaikki PT:n kuittaamia, SHA:t Natiivisepällä)

- 178: pulu-pallovaisto 2c05d4700 (Pulu ei kiipeä palloja pitkin yläpalkkiin), paakaupungit-178-2 723a578f0 (pääkaupunkipisteet:
  KaupunkiMerkit.kevyet, NimiLadonta Kevyt + PaakaupunkiRajauksessa, napautus → Kartuscha.NaytaMaa), tahdet-iso-v4 3b7e3d8c1,
  museo-otsikko-178 9f7ea98ac (LS1:n museo2-kärjen mukana).
- 179: varivakiot-179 293eae603 (rungossa), paakaupungit-lahi-ita-179 79eb3c621 (datatesti; #4349-paketti v650 ulkona →
  lähetetty Natiivisepälle).

## KESKEN 1: maakortin pääkaupunkirivi (PT kuittasi suunnitelman, ei vielä SHA:ta junaan)

natiivi-ui/asettelutesti-mac-179-2 **f572720ab** (juna-179:n päällä):
84d3e3645 maakortin 1. rivi PÄÄKAUPUNKI / HALLINNON PAIKKA (asema "hallinnon paikka": ISR Jerusalem, PSE Ramallah; Pelikoodarin
kanssa sovittu sama linja webiin), 9c9ba93a6 Mac-koot asettelutestiin (UiRuutu.Koko.Mac → UiKerros.Mac ja MacSyote.Kaytossa
editorissa), f572720ab nimikesarake kortin leveimmän nimikkeen levyinen (väh. 78 pt, kuten webin grid auto; PT hyväksyi).
Todennus: ajo 17.00 (mac-1280x800) ei enää YLIVUOTOA maakortissa → korjaus toimii.
JÄLJELLÄ: (b) kuvapari PT:lle: `MATKAKIRJA_ASETTELU_KOOT="iphone-pysty,iphone-pysty,ipad-pysty,iphone-vaaka"
MATKAKIRJA_ASETTELU_NAKYMAT="maakortti" MATKAKIRJA_ASETTELU_KUVAT="maakortti Ranska,maakortti Israel" zsh
tyokalut/ui-asettelutesti.sh natiivi-ui/asettelutesti-mac-179-2 pallo` (Julkaisijan NYT). Kuvat kopiosta
proto-3d/Matkakirja-proto-kaannos/tulokset/asettelukuvat/*maakortti* heti ajon jälkeen. Samalla Israelin kortin toisto iPhone
pystyssä toisena peräkkäisenä (ajo 16.35: "ei avautunut"); jos toistuu kahdesti → oikea vika, rivi PT:lle ennen korjausta.
Sitten SHA f572720ab PT:lle → kuittauksen jälkeen Natiivisepälle (juna 179). Vanhat merkinnät, eivät vikoja: radiopiste
mastorivin päällä (tilavaraus), "nosto: lukunäkymä ei aukea" (satunnainen).
Mac-asettelutesti tehty: 2560 × 1440, 1440 × 900 ja 1280 × 800 ilman Mac-kohtaisia löydöksiä (raportoitu PT:lle 16.5x).

## KESKEN 2 / SEURAAVAKSI: omistajan pallopalaute (PT 16.5x, juna 179)

"Kuumailmapallon köysi pitää taipua aidosti ja pallo pitää liikkua selkeästi tuulessa heiluen" (kumoaa pallon osalta ±0,5–0,75°).
Tehty: natiivi-ui/latauspallo-tuuli-179 **e0eeafb4f** (juna-179:n päällä): LatausLiike.Profiili.Tuuli (puuskainen tuuli,
kupu ±2,5° / ±12 pt / 6 s kallistuen köysien kiinnityskohdan ympäri, kori sama tuuli 0,25 s myöhemmin ±1,6°),
LatausLiike.Ketjukayra (ankkuriköysi vakiopituinen, lepoetäisyys × 1,05, painuma seuraa koria), Latauskuva translate (sivu).
Testit L1320 (4 uutta), tarkista 0. Oma esikatselu oikeilla kerroskuvilla: scratchpad pallo/esikatselu.py →
arkki-iphone.png (näytti hyvältä: selvä heilunta, köysi kaarena). EI vielä PT:lle.
JÄLJELLÄ: PT haluaa videon tai kuva-arkin iPadilla ja iPhonella (pelin oma kuva, ei esikatselu) → pyydä Julkaisijalta
simuvuoro tai käännöspalvelun simukäännös tästä haarasta, tallenna iPhone + iPad pallon latauskuva (opas → kaupunki, jossa on
pallo; `ui opas …`), tarkista liike ruudusta ruutuun ja "kuva täyttää ruudun myös kierron jälkeen" → SHA + kuvat PT:lle → omistaja.

## Omat ajot

Ei käynnissä olevia ajoja eikä simulaattoreita; lukko vapautettu 17.06 (Julkaisijalle ilmoitettu).
