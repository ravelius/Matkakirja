# Laitetestaaja: Olavinlinnan 8. kierros, 17 osaa kahdella simulla (v48k, 1cc476b26), 12.10.2026

**Tulos: YKSIKÄÄN OSA EI VIELÄ LÄPI. 6 osaa etenee osittain (laituri, porttikäytävä, kappeli, palatsi, sali, harja), 11 ei etene: kamera seinässä tai padan/ikkunan sisällä heti aloituksesta. Uutta hyvää: MetaHuman-hahmot näkyvät ja kasvot toimivat (palatsi, sali, keittiö, vene), keittiö/sisäpihat/paluu eivät ole enää mustia (ruskea valo, pata, tuli), soutajan airot ovat käsissä.** Pahin ennallaan: kamera seinän sisällä aloituskohdista (kirkkotorni, ampumakäytävä, muurikäytävä, tott-kammio, muuriportaat) ja keittiön padan sisällä (sisäpihat, paluu).

Ajo: kaksi simua rinnakkain Julkaisijan SIMULAATTORI NYT:llä, 07.00–07.23 (22 min videota/sim): **A** iPad Pro 13" `3622D89D` (osat laituri…tyrmä), **B** iPad Air 13" M4 `864EAA12` (osat porttikäytävä…paluu). App `proto-3d/lokit/olavinlinna-auto-1012-0645` (käännös 1cc476b26, linnahaara siirtoseppa/laituri-varoitus fa8fb26d1, linnapaketti v48k c58921fcb9d82780, 11 MetaHuman v2 -hahmoa). Kone aluksi kuormassa (load 457 → 40–70 ajon aikana), linna aukesi 1 min:ssa, appi ei pudonnut kertaakaan, konsolissa ei Exception-rivejä (vain "multisampled texture" -varoitus punaisena ruudun alareunassa). Mac mykistetty (`aani mykistys` OK), ääntä ei mitattu. Oikeat HID-kosketukset; kehittäjätila päällä; Pelit › Keskeneräiset › Olavinlinna › Pelaa → vene → laituri, sitten osat komennolla `poikki seikkailu aloitus <kohta>`, kustakin 8 kävelyaskelta (tatti vasen alakulma, askelkuva joka askeleen jälkeen). B-simun kosketuskoordinaatit skaalattu (1366×1024). Kaikki aloitukset onnistuivat ("aloitus <kohta> valmis" 4–15 s).

Kuva-arkit: `docs/raportit/kuvat/laitetestaaja-olavinlinna-kahdeksas-20261012/` (`kuva-arkki-A.jpg`, `kuva-arkki-B.jpg` = askeleet 1, 4, 8 per osa kolmen rivissä osajärjestyksessä; `taakse-yhteis.jpg` = peruutuskoe; `vene-soutaja.jpg`). Kaikki kuvat, lokit ja video: `proto-3d/lokit/laitetestaaja-olavinlinna-kahdeksas-20261012/` (`A/`, `B/`: `kuvat/v8-<osa>-arkki.jpg` täysi arkki, `logit/loki-<osa>.txt` lokiote osasta, `linssi-loki-kaikki.txt`; videot `A/kierros8-720.mp4`, `B/kierros8-720.mp4` 720p).

## Osat (yksi rivi per osa; kuvat v8-<osa>-1…8)
| Sim | Osa | Tulos | Havainto |
|---|---|---|---|
| A | laituri | OSITTAIN | 5 askelta etenee laiturilta kohti porttia (vene, Fogg, vartija portilla näkyvät); askeleista 6–8 kamera kiven/seinän sisässä (venyvä tekstuuri). Ei mustia lohkoja. |
| A | sisapihat | EI | Kamera padan vieressä/sisällä (pata riippuu ruudun keskellä), kaikki 8 kuvaa samat; ruskea valo, ei musta; "syke nopea (hälytys)" 18 s kohdalla. |
| A | kirkkotorni | EI | Seinä täyttää ruudun heti (vapaus 1,0 m, loki "ensiaskel päättyy seinään"), 8 samaa kuvaa; peruutus ei liikuta kameraa (pylväs + seinä). |
| A | kappeli | OSITTAIN | Kappelin sisätila näkyy (holvikaari, ristikkoikkunat, kynttilä, penkit, hyvä väri), etenee ~5 askelta; 7. askeleella kamera karmissa/seinässä. |
| A | palatsi | OSITTAIN | Sali + vouti/hoitaja + vartijat näkyvät, MetaHuman-kasvot (hupullinen mies, vihreä hupullinen mies), etenee ~5 askelta; 6.–8. ruskea seinä/tyhjä (kamera seinässä), hahmo hupun sisässä askeleessa 3. |
| A | ampumakaytava | EI | Kamera kaarevan kiviseinän sisässä (vapaus 0,45 m, "ensiaskel päättyy seinään"); eteen ei liiku; peruutus liikuttaa kameraa seinää pitkin mutta ei vapauta. |
| A | komero | EI | Aloitus "ulos komerosta" -86°: katse järvelle ikkuna-aukosta, ei liiku eteen eikä taakse; linnaa ei näy. |
| A | tyrma | EI | 1. kuva tyrmä (holvi, puuovi, kynttilä, valo OK), ensimmäinen eteen-askel vie kameran seinään (2–8 täynnä kiveä). Kehittäjän kiinniotto "kirkkotorni-portaat → tyrmä". |
| B | porttikaytava | OSITTAIN | Käytävä + portaat + pikkupiha (vartija lyhdyn kanssa) etenee 4 kuvaa; 5–8 kamera pilarin/seinän vieressä, ei etene. |
| B | keittio | EI | Keittiön sisätila valaistuna (pata, tuli, pöytä, kynttilä, ovi oikealla, kokki/hahmo kulkee), mutta kamera ei liiku 8 askeleella; ei mustaa. "syke nopea (hälytys)" 9 s kohdalla. |
| B | tott-kammio | EI | Seinä täyttää ruudun heti (vapaus 1,6 m, ensiaskel seinään); peruutus avaa pyöreän huoneen (tarjotin, 2 hahmoa): aloitus seinän sisässä. |
| B | muuriportaat | EI | Pyöreä huone näkyy 1. kuvassa, sitten seinä täyttää ruudun (2–8); vapaus 0,71 m. |
| B | sali | OSITTAIN | Sali + MetaHuman-hahmot (kaljupäinen sinitakkinen mies, punapukuinen nainen, kynttilä, pöytä) 2 kuvaa; sitten ruskea seinä/tyhjä (3–8). |
| B | muurikaytava | EI | Seinä alusta asti (vapaus 0,45 m; aloitussuunta vaihtuu −103° → 5°); peruutus liikuttaa kameraa seinää pitkin mutta ei vapauta. |
| B | harja | OSITTAIN | Aloitus seinässä (1), kierreportaat näkyvät 2. askeleesta (sinertävä kivi, tynnyri, nuolet), askeleet 4–8 samat portaiden alla, ei nouse. |
| B | pako | EI | Kuten komero: katse järvelle, ei liiku; linnaa ei näy. |
| B | paluu | EI | Aloitus keittiössä (tuli, pata, kokki), ensimmäinen askel vie kameran padan sisään (2–8 sama); kehittäjän kiinniotto "kirkkotorni-portaat → paluu". |

## Uutta katsottavaa (Siirtosepän lista)
| Kohta | Tulos |
|---|---|
| MetaHuman-hahmot (kasvot, hius- ja partakortit) | **Kasvot toimivat ja näkyvät**: palatsi (hupullinen mies lähikuvassa, vihreähuppuinen), sali (kaljupäinen mies, punapukuinen nainen), keittiö (hupullinen kokki), vene/laituri (soutaja, Fogg). Hiukset/parta: näkyvät vain hupun alta, lähikuvassa (palatsi 2) naamio/huppu peittää; erillistä hiuskorttien tarkastelua ei tehty tällä ajolla. |
| Soutajan ote airoista | **OK**: soutajalla on kaksi airoa käsissä, ote pysyy ja airot kääntyvät soudun mukana (`vene-soutaja.jpg`, video 5:50–6:25). |
| Salin portaan alapää (55/61) | **Ei saavutettu**: sali etenee vain 2 askelta, sitten seinä. |
| Kierreportaan sisäänkäynti (16) | **Näkyy harjan aloituksessa** (portaat, tynnyri, nuolet), mutta kamera pysähtyy portaiden alle; kirkkotorni-aloituksesta seinässä. |
| Harjan alku | **Osittain**: 1. kuva seinän sisässä, sitten portaat. |
| Keittiön ovi | **Näkyy** (puuovi oikealla), ei saavutettu: kamera ei liiku keittiössä. |
| Mustat tilat | **Parantunut**: sisäpihat, keittiö, paluu, palatsi, kappeli valaistuja (ruskea/oranssi), ampumakäytävä ja kirkkotorni vain seinää. Laiturin sivuilla sinimustat kiviröykkiöt ennallaan (laituri). |

## Peruutuskoe (kuusi jumiutunutta osaa, 6 askelta taakse)
`taakse-yhteis.jpg` (askeleet 1, 3, 6): kirkkotorni = ei liiku (pylväs + seinä); ampumakäytävä, muurikäytävä = liikkuu seinää pitkin, ei vapaudu; tott-kammio = **peruutus avaa huoneen** (aloituspaikka seinässä); komero, pako = ei liiku (ikkuna-aukko, katse järvelle).

## Löydökset PT:lle (tärkeysjärjestyksessä)
1. **Kamera seinän sisällä aloituskohdasta (11/17 osaa)**: kirkkotorni, ampumakäytävä, muurikäytävä, tott-kammio, muuriportaat, tyrmä (1. askel), sisäpihat/paluu (pata), keittiö (ei liiku) · v8-*-arkit · Siirtoseppä/Linnanrakentaja (aloituspaikka + törmäys). Loki: vapaus 0,45 m tai "ensiaskel päättyy seinään" aloituksissa ampumakaytava, kappeli, kirkkotorni, muuriportaat, harja, tott-kammio.
2. **Komero + pako: aloitus katsoo ulos järvelle, kamera ei liiku** (loki "aloitussuunta komero −86° (ulos komerosta, kiipeilyn loppu)") · A/v8-komero, B/v8-pako · Siirtoseppä.
3. **Sisäpihat ja paluu: aloituspaikka padan sisässä** (sama kuin 7. kierroksen paluu; 1. askel) · v8-sisapihat, v8-paluu · Linnanrakentaja (pata) / Siirtoseppä.
4. **Eteneminen loppuu 5–7 askeleen jälkeen seinään**: laituri, porttikäytävä, kappeli, palatsi, sali (OSITTAIN-osat) · Siirtoseppä (kamera/törmäys).
5. **Harja: kamera pysähtyy kierreportaiden alle** (ei nouse) · B/v8-harja 4–8 · Siirtoseppä.

## Ei testattu / rajaukset
- Ääntä ei mitattu (Mac mykistetty, kone kuormassa); hiuskortit/parta lähikuvassa ei tarkastettu.
- Koko ensikertalaisen läpipeluuta ei ajettu (PT:n ohje: vasta kun kaikki osat läpi).
- Kävely vain suoraan eteen (8 askelta); kierto/katseen suunta ei kokeiltu paitsi peruutus kuudelle jumiutuneelle osalle.
- Video: 22 min/sim (alle recordVideon 2,5 Gt:n rajan, 4,4–4,7 Gt raakana mutta toistettavissa; 720p-pakkaus `kierros8-720.mp4`).

Ei korjattu mitään (PT:n ohje).
