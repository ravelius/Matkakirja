# Julkaisija: luovutus 3.11.2026 klo 21.35 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-2020.md (d02690bcd).
Jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila). Kaikki ketjut nohup, kirjoittavat <nimi>.pid (TAPPO VAIN NIILLÄ).
Valmiiden tulokset on jo lähetetty tilaajille (PK, VS, NS, LAV, NUI, PT) – älä toista.

## !!! OPIT TÄLTÄ VUOROLTA
- iPad-lukko jäi kuolleelle pid:lle (keisari-iso3 37060) 20.16–21.02 → sulku odotti tunnin. Uudet ketjut: `trap` vapauttaa lukon.
  Tarkista aloituksessa: `cat /tmp/matkakirja-ipad.lukko/kuka` + `kill -0 <pid>`; oma kuollut → poista.
- Laitekäännös (laite-iso.zsh → laite-sha.sh, projekti /Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity67) EI ole linjalukon suojassa
  esikatseluajoja vastaan; kaksi laitekäännöstä samaan aikaan → "another Unity instance" (4397cf20d VIKA 21.20). Odota edellinen
  laitekäännös (KÄÄNNETTY/VIKA lokissa + `pgrep -f "projectPath /Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity67"` tyhjä).
- SULKURIVI-grep poimi peli-loki.txt:n vanhoja rivejä ("lehti ei ole auki") – NUI vahvisti sulun OK.
- PK:n aja-ipad.zsh "VIKA: 1" = grep osui "VIKA-raja"-otsikkoon (PK korjasi aja-ipad-2:ssa).
- editori-pelikamera katsoo alas: LAV:n kohdekuvat vaativat testikameran (`ui juoksupeli valo testikamera 3.0 6.88 10 45`);
  kapea kuva-ala → leveät kohteet kuvataan osissa.

## ISO PAKETTI (juna 218, wt /Users/Shared/Claude/wt/julkaisija-koe-218)
- ea2d6912f: kaatumistodistus OK (kortti auki 3659 Mt; sulku → lähizoom 3563 Mt, 0 varoitusta; keisarikuvat 4/4). PT kuittasi.
- 2ee44fed0 = ea2d6912f + NUI elävä kartta 20b21efee (PT junalupa). Ei ajettu laitteella (korvattu).
- **4397cf20d = 2ee44fed0 + NUI sali-aloitukset 40ed9da3c (PT junalupa 21.2x)** – nykyinen kärki (detached HEAD wt:ssä).
  Ketju paketti-ketju-4397cf20d.zsh (pid-tiedosto): odottaa koealueen laitekäännöksen → L1 laitekäännös → iPad koealueen jälkeen
  → mittaa-ilman-konsolia (kortti auki) + muistivahti → sali-ys-iso.zsh ('ui suora juoksupeli-sali-ys', kuvat 40/60 s;
  lokit/nui-lahizoom-20261103/iso-4397cf20d-sali-ys/) → 693cf437f takaisin. TULOS → PT + NUI (NUI luovuttanut PR 6217 → seuraaja).
- SEURAAVA KIERROS (PT junalupa): liitä NUI **7f0ccc451** (natiivi-ui/pohjat-218 kärki = 723f738c0 + trailerin soikio + tyylikirja;
  EI 723f738c0) 4397cf20d:n päälle vasta, kun 4397cf20d-laiteajo valmis; sitten sama savu + muistivahti → SHA PT + NUI.

## Käynnissä / jonossa (pid-tiedostot julkaisija-tyokalut/)
- iPad: laite-koealue-fb7ff2595 (VS k5 + NS esineet; käännös L1 alkoi 21.13, sitten iPad) → kuvat PT + VS + NS. Sitten 4397cf20d.
- L1: pk-palvelijat-v4-l1 (c35e3d150, alkoi 21.20) → PK | lav-aukiokuvat-219c (3c/3d/2d/2e/5d testikameralla) → LAV
  | ns-eb1749604 (k6-sk, kertoimet-vesi-218) → NS.
- L2: soikio-pari (simu iPad11, ennen 4397cf20d / jälkeen 7f0ccc451, sk natiivi-ui/soikio-20261103/skenaario-soikio.txt; NUI:
  jos otsikko ei osu Notre-Dameen, siirrä odotuksia samoina molemmille) → KUVAT PT:lle | pk-jalki-v3-l2 (9d02ae999, loki pk-jalki.log;
  taso1b "VIKA kuvia ei syntynyt" on normaali) → PK.

## LAV pronssit/aukiokuvat (pronssit-esi/aukiokuvat-219/, runko 5733b689d)
- 1–7 (pelikamera) valmiit; LAV: 4, 6, 7 OK. b/c-uusinta: 1b, 1c OK; 3b leijonat sivuilla, 5b seinässä, 5c rakennuksen takana
  → uusinta 2 (219c) jonossa. Skenaariot julkaisija-tyokalut/lav-aukiokuvat-219{,b,c}-sk.txt; `sijoita x z suunta [lattia]`,
  suunta 0 = pohjoinen, 90 = itä. Jalkojen alla olevaa kappaletta ei saa lokista (vain lattia).

## Valmiit tällä vuorolla (lähetetty)
keltakatot-v1 vienti 755/755 (TERM 20.19 → uusinta) | PK palvelijat v2, v3, jalki v1, v2, parit 219 (06+07), keisari-kk, keisari-kk2
| VS k6 8fc847bf4, k7 a1413d71c, k8 a1413d71c | NS a1413d71c (k6-sk) | LAV aukiokuvat 1–7 + b/c.
