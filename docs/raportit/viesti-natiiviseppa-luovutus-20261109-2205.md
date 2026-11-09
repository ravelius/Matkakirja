# Natiivisepän luovutus 9.11.2026 klo 22.05

Edellinen: git show 2fd1d6dee:docs/raportit/viesti-natiiviseppa-luovutus-20261109-2110.md (kattokuvion historia); varjostimen regenerointi efbfcdb39:…-1709.md.
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 25 % (7.37).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").

## ENSISIJAINEN: PELIN KOKO OSA 2, TALOPALOJEN LUKIJA (omistaja 21.14, PT 21.4x)
Suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-pelin-koko.md. Rajapinta KS:n kanssa SOVITTU:
/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pelin-koko-talot/RAJAPINTA.md (ämpäri julisteet/talot/tiedostot/<sha>.gz, hakemisto buildissa
StreamingAssets/talot/<kaupunki>.json, kentät versio/z/palat[x,y,sha256,koko,raaka]). KS hyväksyi poikkeamat: laitekansio persistentDataPath/talot +
SetNoBackupFlag; siivous käynnistyksessä buildin hakemistojen mukaan.
- HAARA natiiviseppa/talolataus = b2273c132 (proto, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-talolataus; juna-224 b804a87d6 + omat + KS:n
  karttaseppa/talot-palvelimelle-ns e5f6fcf72 yhdistetty c4cd8a708; natiivi-backupissa). unity-tarkistus (sh) 0 virhettä.
  - TaloLataus.cs (uusi): hakemistot, levy, Esilataaja.Pyyda suoraan levylle, sha256-tarkistus, Pura (GZip, pala kerrallaan Task.Runissa),
    PyydaAlue (saapuminen), joutilaana koko kaupunki erissä (24), NUI:n Offline-kutsut LataaKaupunki/Peru/Tila/PoistaKaupunki, Hylkaa, Kaytossa.
  - TaloKerros: hakemistotila (puuttuva pala = litteä kartta + haku SeuraavaRuutu), lennon kohde PalloKierto.AjonLoppu → saapumisalue.
  - Komennot: talot ampari <kansio|url|0>, talot lataus [tyhjenna | kaupunki <id> | poista <id>].
  - b2273c132: Nahtavyysalue.cs astc-atlas puuttuu → 2×2-paikkakuva (KS:n ehdotus, osa 1). Rivi 1405 (ei verkkoa eikä .bytes:ia) jätetty JU:n tarkistukselle.
- AJO -1 (5a04c09f4) KATSOTTU: lataus 219/219, sha ok, saapuminen 14 palaa, joutilas koko kaupunki; PURKU KAATUI (persistentDataPath taustasäikeestä)
  → korjattu de2a713fd. Lokit/natiiviseppa-talolataus-1-mac-5a04c09f4.
- AJO -2: c4cd8a708-ajo katkesi uudelleenkäynnistykseen; UUSINTA PYYDETTY JU:lta 22.05: natiiviseppa-talolataus-2-mac-b2273c132,
  skenaario _tyo/natiiviseppa/talolataus/sk-talolataus-2.txt (ämpäri ampari-koe-2 = KS-muoto, oma testipakkaaja pakkaa.py). TARKISTA: lokista
  "talot tila: palat" > 0 ja ei "ei lue"; kuvat t-palais-4s (osa litteinä), t-palais-24s, t-nation-saapui; lopussa poista pariisi → False (Kaytossa),
  kaupunki pariisi → valmis True. Sitten PT:lle 3 riviä + NUI:lle tieto, että Offline-polku ajettu.
- SEURAAVAT: PT-kuittaus → JU yhdistää junaan (KS:n PR 6523 ensin, JU:n linjaus). Ämpäriin vienti JU (KS:n talot_paketti.py). Pariisin tarkistus
  iPadilla vasta "Pariisi valmis" -testeissä (2.209); vaihe 2:n tallenne pieneltä iPadilta suunnitelman mukaan.
- NUI (local_4b84cd90-…) rakentaa Offline-kartat kutsujeni päälle (kerrottu 6d829d2b7; tuoreempi b2273c132 sama rajapinta).
- Osat 3 (muu iso sisältö, NS lataaja; ISS 84 Mt sisältöä → palvelimelle) ja 4 (koodi) EIVÄT VIELÄ: odota PT:tä.

## TAUOLLA: KATTOKUVIO (koe, ei junaan ilman korttia)
natiiviseppa/kattokuvio d7fc2446d (liioiteltu: rivit 2,5 m, saumat 5 m, patina 0,24), ajo -2 PT ✓, pari KK:lla. KK:n palaute (PT 22.0x): tasakaton vino
ruudukko näyttää tikatulta tyynyltä → ruudukko katon reunojen suuntaan (palaan tarvitaan suunta: esim. talon pohjan pisin sivu kärkeen tai MT02:n
normaali-w:n viereen) ja viivat suoriksi (aaltoilu = katon pinta ei tasomainen; laske kuvio tasossa, ei p.y:stä). Pari samalla drone-rajauksella
(sk-kattokuvio-2.txt, lahizoomi 5, talot kansio) → PT → KK. Vasta pelin koon jälkeen.
