# Äänittäjän luovutus 20.10.2026 klo 17.11

**Tila: levossa, ei avoimia ajoja. Kaikki työ pushattu (aanittaja-tyo-20261011); mediat ämpärissä/`_valmiit`, ei gitissä.**

## Pysyvät säännöt (uudet tähän päivään)
- Musiikki VAIN Lyrialla, jokainen kutsu omistajan luvalla (täsmälleen N kutsua, ei uusintoja); äänitteistä rakennettu rytmi hylätty (omistaja 23.30) – `_valmiit/juoksupeli-rytmit-v2-20261019` merkitty HYLATTY.
- Gemini-sokko: yksittäinen < 1 s isku tunnistuu huonosti → 3×-nauha tai kontekstinauha (askeleet → ääni → askeleet); sokko 3 kuuntelua, ≥ 2/3; ristiriita = hylkäys (Raamattu 5.27). Wood-breakit eivät läpäise sokkoa lainkaan.
- Soundly-GUI vain kun omistaja pois (HIDIdleTime ≥ 2 min); vienti: rivi valitaan nuolinäppäimin (klikkaus ei valitse), Lähetä (1153,722) → `_tyo/soundly-saapuvat`, siirrä heti työkansioon.
- ElevenLabs/Lyria-avain: `source ~/.zshrc` samaan komentoon. Ämpäri: `aws s3 cp … s3://$AMPARI/… --endpoint-url $PAATE`, uudet avaimet, ei ylikirjoiteta.
- Koodia (Unity) en kirjoita; muutokset Linssiseppä/Pelikoodari/NUI.

## Ämpärissä (media.matkakirja.app) – kytketty tai kytkettävissä
- Juoksupeli: musiikki-taso1-v1 (a,b,c) ja v2 (a,b,c; PK käyttää v1+c); hurraa-taso1-v1 (A5 energia, B4 omena; LUKITTU omistaja 08.20); aanet-v3 (SFX 207: kaaretaulu, puu-2, metalli, kivi-jade, huonesavy-halli-1/2); kaanto-v1/kaanto-1.mp3 (Eleven otto #2, leike 0,20–0,55 s, kytketty 208); kaanto-eleven-v1 (raaka, 4 ottoa, lupa käytetty).
- Museo: taidemuseo-askeleet-v4 (pehmeä parkettikävely, LS kytki e3e6e95f0, kuiva + Hallway); Louvre-askelmitta OK (16 dB kertojan alla).
- Tekstitysdata 208 (museon ajat-muoto): pallokierros-praha-v2/lontoo-v1 `tekstitys/<id>.json`; audio/raketti-ajat/ (selostus, avaus, lähtölaskenta); seikkailu/olavinlinna/<repliikit-*>/ajat-tekstitys/ (tag-puhdas, 302 tiedostoa). Kiina, ISS kupoli/kamera/loppu: ajat jo olemassa (audio/<kansio>-ajat/<nimi>.json). Opas: NUI lukee Workerin merkki-indeksimuodon; avaruuskävely ei dataa.

## Hylätty / ei peliin
aanet-v3 käännös 1–4 ja puu-3…5; hurraa A6–A9, B6–B9 (`_valmiit/juoksupeli-hurraa-isommat-20261020`); kaanto-uusi-1…3 (kumilelu); rytmit-v2; Lyria-otot 4–6 (kevea-toisto) muut kuin v1/otto2/otto6.
Käännös: aito kengänhankaus ei löytynyt sokolla → Eleven-ääni (omistaja 08.22 "Eleven kelpaa").

## Auki
- Mittaus pelistä seuraavan junan käännöksestä (museon uusi askelkytkentä, käännösäänen taso 0,32×askel).
- Tason 2 musiikit: omistaja sanoi "etsitään myöhemmin" – ei lupaa uusiin Lyria-kutsuihin.
- Tuotantotyökalut (ei gitissä): `proto-3d/_tyo/juoksupeli-musiikki-nayte-20261019`, `juoksupeli-hurraa-20261019`, `juoksupeli-sfx-206-20261019`, `juoksupeli-kaanto-eleven-20261020`, `tekstitys-208-20261020`, `askeleet-pehmea-20261020` (Gemini-portti: `arvioi_sfx3.py`, `kuntele_*.py`). Raportit: docs/raportit/aanittaja-juoksu-206-tasapaino-20261019.md, aanittaja-juoksu-rytmit-v2-20261019.md (rytmit hylätty).
