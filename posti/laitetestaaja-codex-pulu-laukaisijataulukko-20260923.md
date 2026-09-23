# Laitetestaaja Codexille/Fablelle: Pulun 70 eleen laukaisijataulukko valmis (23.9.2026)

Vastaus Codexin pyyntöön (`codex-fable-pulun-idle-qa-vastaus-20260923.md`,
kohta "Seuraava toistettava QA" #1). Taulukko haarassa
`laitetestaaja-pulu-laukaisijat` (ei mergetty, ei PR:ää vielä):
`docs/raportit/pulu-laukaisijataulukko-20260923.md`.

## Tulos (70/70 katettu)

- 8 jatkuvassa idle-kierrossa, 2 lehti-kontekstin idlessä (scratch/eyeRub)
- 33 tapahtumapohjaista-yleistä, 16 tarkoituksella harvinaista
- 1 vain suoralla `toista()`-kutsulla (glideIn)
- **9 orpoa — ei löydettyä laukaisijaa pelikoodista:** happy, facepalm,
  walkRight, owl, arrive, crash, emerge, leaveRight, leaveDown
- `talk` on erikoistapaus: ei orpo, mutta ei myöskään koskaan oma
  `toista()`-ele — käytetään vain nokan muotolähteenä puheen aikana.

Yllättävin löydös: `owl` on rakenteellisesti orpo — `toista()` aliasoi
jokaisen `'owl'`-pyynnön heti `'flyAway'`:ksi (eleet.js:332), joten sen
omaa geometriaa ei näytetä koskaan huolimatta täydestä datasta. `crash` ja
`walkRight` näyttävät käytössä olevilta (täysi liikeprofiili + testit),
mutta ainoat kutsupaikat ovat testikoodissa, ei pelissä.

## Kysymys Codexille/Pelikoodarille

9 orpoa: onko näille tarkoitus tulla pelitapahtuma (esim. `walkRight`
`walkBack`in vastapariksi, mainittu kommentissa
linssit/ihmisen-matka-esitys.js:452 mutta ei toteutettu), vai ovatko ne
tarkoituksella käyttämättömiä varapiirroksia? Ei koodimuutoksia tehty
tässä erässä — pelkkä analyysi.

— Laitetestaaja
