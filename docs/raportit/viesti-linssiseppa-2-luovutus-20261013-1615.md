# Linssiseppä 2 – luovutus 13.10.2026 klo 16.15 (Suomen aika), nollaus (PT: konteksti 51 %)

Luovuttaja: Linssiseppä 2 (Opus, high). Edellinen: viesti-linssiseppa-2-luovutus-20261013-1115.md.

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA).
2. Raamattu (`js/tyohuone-raamattu.js`): Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT".
3. Tämä raportti, KESKEN ylhäältä alas. Kööpenhaminan muistio: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/koopenhamina-kytkennat.md`.

## Tila
- Käännös- ja simuvuorot jakaa Julkaisija (KÄÄNNÖS NYT / SIMU NYT → LUKKO VAPAA / SIMU VAPAA). OMA iPad-simu A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4.
- Ajoja ei ole käynnissä. Kaikki on pushattu natiivi-backupiin.

## OLAVINLINNA (viisi tilaa) – VALMIS minulta, botti Siirtosepällä
- Haara `linssiseppa2/keittio-koehuone` (worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-koehuone`), kärki **dd7fbb2cc**:
  - bdd88fdaf: leikkausjsonin `rajaa_tilat` rajaa leivotun tilan (keskushallin pielet kuilussa, 242 kolmiota).
  - 301535da5: `Koehuone.KytkeOletukset` – viisi tilaa oletuksena ämpäristä `dioraama/olavinlinna/huoneet/<tila>/<versio>/`
    (`poikki koehuone pois` estää; poikki-komennot ohittavat).
  - dd7fbb2cc: pikkupiha → ajo11b (LR: E 102 -verhous vain suulta valolla, vanha käytävä sisempänä).
- Ämpärissä: LR:n paketti (902 t.), png-varakuvat (35 t.; SIMULAATTORI EI TUE ASTC:TÄ → ilman png:tä linnan avaus kaatuu
  latausvirheeseen), pikkupiha/ajo11b (98 t.). Polut muuttumattomia: uusi versio = uusi kansio.
- App `lokit/linssiseppa2-app-oletus3` (f11de1c12). PT kuittasi ajo11b:n (lokit/todistus-pp-ajo11b-20261013-1553). Muisti simulla +65 Mt.
- Seuraava (muut): Siirtosepän botti 17/17 oletus3:lla → NS:n juna 187 (keittio-koehuone kokonaisena, muistijuna: Release-laiteajo
  iPad Pro 13 ennen VIE:tä). Jos botti löytää vian: korjaus LR:lle uutena ajona, vienti uuteen polkuun, OletusHuoneet, käännös.
- Pieni velka linnan seuraavaan vaiheeseen: tuvan kuilun laen ja oviaukon ohut tumma viiva (x5; tuvan ja salin kalkkipinnat samassa
  pisteessä y 5,49).

## KÖÖPENHAMINA – KESKEN
- Haara `linssiseppa2/koopenhamina-kippi` (worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-koopenhamina`, natiiviseppa/juna-187:n päällä):
  - 53cd6393a (Opus-apuagentti): elävä kaupunki (KS:n liput, piiput ja parvet + PK:n äänipisteet; raitiotiet tyhjät = S-juna),
    muodot, julkisivuvalot, pilvet-v2 + vari-v2 (ämpärissä), Lisakohteet (Marmorikirkko, Gefion), Rajatut (Pieni merenneito),
    uusi `loppu.katse_suunta` (OpasSilmukka.AloitaLoppu). Linssit-testit 1712/1712.
  - 240b08db9: maakohtainen lipputaulukko `SavuJaLiput.Kuvat` (SE, FR, DK; varjostin lukee värit kärkiattribuuteista) + 339
    Dannebrogia. 1713/1713.
  - Huom: elava-koopenhamina.json ristiriidassa PK:n haaran kanssa → ota tämän haaran versio (sisältää PK:n datan).
- Ämpärissä: opas/historia-v1/koopenhamina.json, opas/pallokierros-v2/koopenhamina.json (16.08, ILMAN katsekenttiä) ja
  **opas/pallokierros-v3/koopenhamina.json** (16.10, KS:n katseet: loppu 335, Amalienborg 178/2, Nyhavn 15, silma_m kaikilla).
- SEURAAVAKSI:
  1. Kööpenhamina osoitetaan pallokierros-v3:een (kaupunkikohtainen versio tai Versio-ohitus Pallokierros.cs:ssä; katso EsittelyOsoite/
     OpasSovitin.cs:697). Lisää `"koopenhamina"` Pallokierros.Kaupungit-listaan (Pallokierros.cs:29) ja kopioi kultaiset testidatat
     (`Linssit-testit/kultaiset/pallokierros-v1/koopenhamina.json` – testit lukevat sieltä; ilman sitä 7 testiä kaatuu).
  2. PT 16.1x: **Kehityskaupungit.Lista-rivi ("koopenhamina", 55.67247, 12.53935) ja KaupunkiIntro.Aloitukset-rivi VIIMEISENÄ**, kun
     omistaja on hyväksynyt tekstit ja ne on äänitetty. Aloitukset-avain on PELIN tunnus: `["kobenhavn"] = A("kobenhavn", <William s>,
     <nopea s>, false)`.
  3. Simu: valmis skenaario `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/koopenhamina/sk-pallokierros-koopenhamina.txt`
     (LS1:n Praha-pohja, 13 kuvaa: avaus, 8 pysäkkiä, loppunousu 335°, yö). Ketju kuten `koehuone/ketju-oletus1.zsh`. Kuva-arkki PT:lle,
     ääninäytteestä tieto Pelikoodarille.
- Älä curlaa viemättömiä ämpäripolkuja (CDN tallentaa 404:n noin 5 minuutiksi).

## Ajopohjat ja työkalut (`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/`)
- `koehuone/ketju-*.zsh` + `sk-*.txt` (oletus1/3, pp-ajo11b, pal5/6), `mittaus/mediaani.py`, `mittaus/tumma2.py` (botin mittari:
  64 × 48, luma < 0,02 osuus; raja 60 %), `vienti/kokoa_png.py` (png-varakuvat), LR:n kokoaja
  `_valmiit/olavinlinna-kavely-v1/lahde/tyokalut-lr/kokoa_huoneet_vienti.py`.
