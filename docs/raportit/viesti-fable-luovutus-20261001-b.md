# Päätoimittajan luovutus 1.10.2026 klo 05.1x (konteksti 57 %, viikkokiintiö 92 %)

Sessio "Päätoimittaja (Opus, xhigh)", haara claude/bold-ride-vow4ki (pushattu), RC päällä. Edellinen: viesti-fable-luovutus-20261001.md.
Yön päätökset ja tilat lokissa docs/raamattu-loki/paatokset-2026-09.md (grep "1.10.2026").

## Omistajan linjaukset tänä yönä (lokissa, Raamattu-rivi haarassa)

- **Linnan ympäristö mukailee linnan kultakautta** (omistaja 00.4x): dioraaman aikakerros n1500 (1500-luvun alku, ennen Savonlinnaa 1639).
  Nykykaupunki, sillat, tiet ja moottoriveneet pois, tilalle luonnonranta, vanha metsä ja harkiten puurakennuksia. Linna, maasto ja vesi ennallaan.
  Raamatun AIKA-kohtaan lisätty rivi LINNAN DIORAAMA (commit 54d9bf847). **Ei vielä mainissa**: uusi Raamattu-PR, kun #3735 on mergetty.
- **Linnan maanpinta paremmaksi** (01.1x): splat-kerrokset (Siirtosepän varjostin), lähirannat avoimiksi noin 350 m (niitty, harva mänty, aitat, puulaituri).
- **Pulun chatissa ei ✕:ää missään** (12.8. linjaus; 30.9. lokin "sulje" = sulkutapa). Minipulun vanha ✕ poistui.

## Odottaa omistajaa (TOIMI TARVITAAN annettu chatissa, push lähetetty)

1. **Linnan osoitin**: `gh workflow run vie-dioraama.yml --repo ravelius/Matkakirja -f rakennus=olavinlinna -f kuiva=false -f osoitin=true`.
   Komento kokoaa paketin mainin kärjestä. **Omistajalle sanottu: aja vasta Päätoimittajan luvalla.** Julkaisija ajaa kuivan paketin klo 06.45
   (mainissa silloin #3746 v18 + #3755 v3c + #3756 v19 + puukortit, jos ehtivät), ja Siirtoseppä kuittaa sen puhtaalla asennuksella → anna lupa.
   Siirtoseppä kuittasi jo v18:n (98691896e7bf76b8), joten v17 ohitetaan.
   **Komento ei osaa osoittaa hashiin, vaan rakentaa mainin kärjestä.** Siksi klo 06.45 jälkeen linnan pakettiin vaikuttavat PR:t
   (dioraama/olavinlinna, blender.json, rakenna.mjs) ovat Julkaisijalla pidossa, kunnes omistaja on ajanut osoittimen.
   #3755 (v3c) mergettiin 05.11 (paketti 19f1ff3246be7386). **PÄIVITYS 05.3x: osoitin vasta TF 90:n jälkeen.** Siirtosepän esitarkistus:
   ympäristöpaketin kenttämuoto (puukortit png + puukortit_tiedot, orto .astcm, aluskasvit.kortit) on eri kuin natiivit 87–89 lukevat,
   joten ne näyttäisivät maaston ilman puita ja 2k-ortolla. Lukijakorjaus 3a28322a menee junaan 90. Jäädytys 06.45 ja kuiva-ajo peruttu.
   Kun TF 90 sisältää 3a28322a:n, Siirtoseppä kuittaa silloisen mainin kärjen paketin, ja vasta sitten omistajalle annetaan lupa.
2. **TF:n sisäinen ryhmä**: 85:n ajossa ASC ei palauttanut yhtään isInternalGroup-ryhmää (82:lla "Beta testaajat", automaattijako päällä).
   Julkaisijan testflight-sisainen.yml estyi luokittimeen. Omistaja tarkistaa ASC:stä tai sallii ajon Julkaisijan sessiossa.

## Vientejä ämpäriin tänä yönä (Päätoimittaja ajoi, kaikki blender.json 200)

v18 ae007b5d7789880a (#3746, mergetty) · ympäristö v2b 414b6ca005fdaac6, v3 5ebd437809bc4732, v3b 455641f26aeddf8d, **v3c 5f908cd39028daf7** (#3755) ·
**v19b 74cbb16a1214441f** (#3756: ponttonisilta pois, puulaituri vesiportilla, harmaantunut puu) · **puukortit v3 90c024a12714e713** (PR #3756:n perään).
Juurisyyt: harmaa "vesi" = natiivin lataaja luki glb:stä vain ensimmäisen mesh-solmun (Siirtoseppä korjasi 4316a3c1, junassa 87).

## TF ja junat

84 sisäinen (äänilista, EVA, Cupola) · 85 ladattu (Macin Ohita, kortin pienennys) · 86 ja 87 Applen beta-arviossa, Arvioijat-ryhmässä, julkinen linkki ·
88 PASS → TF (Pulun yhteinen chat, maakuntakortti, sijaintipallo, Ateenan kuvamerkki) · juna 89 auki: äänimikseri (omistajan 5 rivin ohje annettu chatissa,
toimii TF 89:stä), Pulun kysymysnapit vain nykyisestä kohteesta, Pulun turva-alue vaakana.

## Roolit (05.1x)

| Rooli | Nyt |
|---|---|
| Julkaisija | kuiva vie-dioraama 06.45 → hash Siirtosepälle; #3755 → #3756 → puukortit; TF 88 |
| Natiiviseppä | juna 89 (25f0ad40): mikseri, Pulun napit, turva-alue |
| Linnanrakentaja | puukortit-PR; seuraavaksi oma suositus |
| Siirtoseppä | kuiva paketin kuittaus; aluskasvien (LS2) katselmointi ja yhdistys |
| Linssiseppä | pallokorjaus 06822cb9 (tummat kehykset, vaakareuna) |
| Linssiseppä 2 | aluskasvit (UV-reunus korjattu); Helsinki 50 mm uudelleen, jos Euroopan mosaiikki ulottuu yli 64,2° N |
| Pelikoodari | mikseri junassa 89; Pulun reitit TF:ssä (Ihmisen matka); #3737 vuoto 0/24 |
| Natiivi-UI | linnakatselmus tehty; turva-alue b101553b junaan 89 |
| Karttaseppä | Euroopan S2-mosaiikki T7:llä, valmis noin klo 7; syvä-vaihe vahdin alla (40 Gt) |
| Sisältökirjuri | kuva2: C #3754, A #3738 CONFLICTING (yhdistää mainin), D ja E valmiina, F tekeillä |
| Laitetestaaja | savukkeet (87 PASS) |

## Huomiot

- Levy: poistin 14 mergettyä, puhdasta worktreetä (`tools/uusi-worktree.sh --poista`), vapaata 37 → 52 Gt. Simulaattorit 80 Gt; PRB-poistot tauolla;
  varalla rikkinäinen 503000D1 pois (Julkaisija), jos alle 40 Gt.
- 97 %:ssa (arviolta 07.30–08): muisti viikkoraja-97-siirtoprompti. Pohja: viesti-fable-siirtoprompti-20260929.md.
