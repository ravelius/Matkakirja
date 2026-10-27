# Siirtoprompti tilinvaihtoa varten (PÄÄTOIMITTAJA 13.10.2026 klo 21.3x; omistaja: "siirrän toiselle tilille. tee luovutusprompti")

Vanha tili samireivinen@gmail.com: viikko 99 %. Tarkka tila: docs/raportit/viesti-fable-luovutus-20261013-ilta2.md (KOKONAAN) + alla oleva kohta 3 (muutokset 21.0x–21.3x). Roolit pyydetty 21.30 päivittämään luovutus + aloitusviesti ja pushaamaan (rivi PT:lle haara + SHA).

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

Omistaja avaa uudella tilillä session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, max) ja liittää:

> Olet PÄÄTOIMITTAJA (ent. Fable), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, max)".
> Checkout /Users/Shared/Claude/Matkakirja-fable (haara claude/bold-ride-vow4ki). Lue CLAUDE.md, docs/raportit/viesti-fable-siirtoprompti-20261013.md KOKONAAN ja
> docs/raportit/viesti-fable-luovutus-20261013-ilta2.md KOKONAAN sekä muistin MEMORY.md (fable-tila-20261013-ilta2, julkaisu-vasta-omistajan-pyynnosta,
> pt-hyvaksyy-codex-kuvat-20261013, kortti-pysayttaa-paatoimittajan, viikkoraja-97-siirtoprompti, talon-tila-lisaosa-pysyva). Ensin set_remote_control self true.
> Ota roolisessiot käyttöön siirtopromptin kohdan 2 taulukon mukaan (lähetä kullekin aloitusviesti; jos sessiota ei ole, luo se), kytke Remote Control kaikille,
> luo JONOKIERROS-ajastus (7,27,47) ja odottajavahti (kohta 4), tee tämän tilin Asemataulu (scratchpad/asemataulu/osoitteet.md, "Tilinvaihdossa") ja jatka.
> Kysy omistajalta kortilla tämän tilin viikkoraja ja kerro se Postivahdille. Omistaja on hereillä; älä kerro tilinvaihdon teknisiä yksityiskohtia.

## 2. Roolit

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Aja ensin git fetch origin, lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md omasta haarastasi (päivitetty 13.10. 21.30:n jälkeen) sekä sen osoittama luovutus kokonaan, ja jatka. Päätoimittajan session nimi on PÄÄTOIMITTAJA (Opus, max). Jos sait vanhoja PT:n viestejä, ne on jo tehty."

| Rooli | Checkout | Malli | Kärki |
|---|---|---|---|
| Postivahti | Matkakirja-posti | Sonnet 5.5, medium | kierros + mittarit/roolit/laitteet uuden tilin Asemataululle; uuden tilin viikkoraja |
| Asemataulu | Matkakirja-asemataulu | Sonnet 5.5, low | ohje scratchpad/asemataulu/ASEMATAULU-ROOLI.md; uuden tilin taulun osoite PT:ltä |
| Julkaisija | Matkakirja-julkaisija | Opus, high | käännösjono, juna 188 (julkaisu VAIN omistajan pyynnöstä), docs-PR:t |
| Natiiviseppä | Matkakirja-3d-selvittaja | Opus, high | juna 188 -runko (f9170af15 + kuitatut), web-merge-lista (+ #4569), iPadin muistiajot |
| Natiivi-UI | Matkakirja-natiivi-ui | Opus, high | ISS-Pulun siluetti (pulu-siluetti-188, kuvat PT:lle), nappien KESKITYS-testi |
| Linssiseppä | Matkakirja-linssiseppa | Opus, high | museopalaute 7 kohtaa (museo-palaute-188 f7679f89d, simu ~21.40 → kuva-arkki PT:lle), vesi v19 Sevilla KUITATTU 188 (8f6273082), Tampere odottaa KS v6, Ranskan museo sali-v2d + Kolme haamua a29af6561 |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | Opus, high | Rodin-sali + Kolme haamua (PT:n ehdot: repaleinen reuna jalustan sisään, selkäpuolen reiät piiloon, CC BY -krediitti SaschaGoto) |
| Linnanrakentaja | Matkakirja-linnanrakentaja | Opus, high | Ranskan museon puutarha liian pimeä; Kolmen haamun jalusta (rp-haamut) |
| Siirtoseppä | Matkakirja-siirtoseppa | Opus, high | levossa (Olavinlinna tauolla) |
| Karttaseppä | Matkakirja-karttaseppa | Opus, high | Tampereen vesi v6; pääkaupunkikartat Codexin seuraavasta erästä |
| Pelikoodari | Matkakirja-pelikoodari | Opus, high | odottaa SK:n kuittausta pääkaupunkiteksteistä (e04–e14 kytkentä) |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | Sonnet 5.5, high | Codex-posti 20 min; saapumisintro 95 → PR #4569 (kasvava, juna 188); korjauskierros 2; Kolmen haamun pysähdysteksti |
| Laitetestaaja | Matkakirja-laitetestaaja | Sonnet 5.5, high | levossa |
| Äänittäjä | Matkakirja-aanittaja | Sonnet 5.5, high | levossa; odottaa omistajan äänivalintoja äänisivulla |

## 3. Muutokset 21.0x–21.3x (luovutuksen -ilta2 jälkeen)

- CODEX (PT hyväksyy omistajan puolesta, "Voit hyväksyä puolestani"): saapumisintron 19 ensimmäistä kuvaa hyväksytty (posti 3128de98e; 13 Codexin omaa poisjättöä jää pois – kysy omistajalta uusintaa vasta kun koko 95 on käsitelty). Loput toimitukset tulevat erissä NAS:lle kuvatuotanto/eurooppa-introt-uudet68-loput-20261013 → katso täydellä tarkkuudella ja hyväksy postiin (malli: posti/fable-codex-saapumisintro-uudet-6-8-loput-hyvaksynta-1-20261013.md). SK kytkee hyväksytyt PR #4569:ään.
- PEKING v6 erä 1/5 hyväksytty välivaiheena (82b728e8a; huomiot: vallihauta ja järvet viimeistään erässä 2, koko takaisin noin v4 + 10 %). Codex jatkaa erään 2 itse.
- RODIN-KUVA: Codexin kuvapalvelu esti 0/2 (alaston patsas). Omistajan kortti 21.1x: "Patsas pienenä kaukana (Suositus)" → uusi tilaus 967ea3268 (museo + ruusutarha pääaiheena). Tarkista toimitus.
- PÄÄKAUPUNKITEKSTIEN korjauskierros 2: Codex kuittasi aloituksen (49341c405), ei toimitusta vielä.
- JUNA 188 kertyy; julkaisu VAIN sanatarkasta "OMISTAJA PYYSI JULKAISUA". Asemataulun junarivi päivitetty (Työn alla: Pulu, museo, Ranska, intro).
- LEVY: 39 → 53 Gi (lokit 14,6 Gi NAS:lle 21.2x; siirra-ika.py pysähtyy virheeseen natiiviseppa-app-183-laite → loput ajettiin --vain-listalla).
- Varmuuskopio: proto/master ei fast-forward 4.10. alkaen (peili/proto/* toimii) → NS:lle, kun aikaa.
- Viikko 99 % vanhalla tilillä; omistaja siirtyy uudelle tilille 21.3x.

## 4. Ajastukset uudessa sessiossa

- CronCreate 7,27,47: "JONOKIERROS (Päätoimittaja): lue ja toteuta tiedoston /Users/Shared/Claude/Matkakirja-fable/scratchpad/jonokierros-teksti.md kohdat 0–10 sellaisenaan".
- Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000, kuvaus "roolit odottavat omistajaa (lupakysely tai kysymys)"; uudelleen joka vanhenemisella.
- Codex-posti: scratchpad/posti-laheta.sh -malli PT:n scratchpadissa (git read-tree → hash-object → commit-tree → push "${C}:refs/heads/claude/postilaatikko").

## 5. Roolien luovutukset (rivi PT:lle 21.3x)

- LS1 origin/linssiseppa-tyo-20260923 c5dba4dd3 (luovutus -20261013-2130; v19-kuittaus kirjattu)
- LS2 linssiseppa2-tyo-20260928 12bfb8e2d (luovutus -20261013-2135; Rodin-sali a29af6561; rodin4 kuva-arkki lokit/todistus-rodin4-20261013-2128/kuva-arkki.png EI vielä kuittaukseen: puutarha päivänvalossa, Ajattelija ei siluetti; korjattava Balzacin ja Porvarien tumma alaosa)
- NUI natiivi-ui-luovutus-20261005 cd41b1618 (siluetti 56de0538a simu ~21.50; KESKITYS-löydökset lokit/natiivi-ui-keskitys188-loydokset.md, haara keskitys-188 e309de773: A-luokan aidot poikkeamat korjattavaksi, B-luokassa testi ensin; PT kuittaa listan ennen korjauksia)
- NS selvittaja-3d-luovutus bc7943eb0 (runko f9170af15; vesi-v19 8f6273082 yhdistettävä; web-merge #4569; iPad vapaa)
- Julkaisija julkaisija-luovutus-20260928 302b3b3e6 (simujono LS1 palaute188 → NUI siluetti → LS2 a29 + LS1 vesi19c; vienti vesi-v19 + Ranskan teokset ~1 Gt ei aloitettu)
- LR linnanrakentaja-tyo-20260929 16a2b4d89 (luovutus -20261013-myohaisilta)
- KS karttaseppa-tyo-20260922 77cbb084b (luovutus -20261013-ilta2; Tampere vesi-v6 LS1:n simussa)
- PK pelikoodari-luovutus-20261013-2130 1e0b93341 (juna 188: raketti-kehittaja 357069b3d)
- SK sisalto-pelikatalogi-20260927 33de53359 (luovutus -20261013-tilinvaihto; PR #4569, korjauskierros 2 odottaa Codexia). Avoin PT-päätös: tests/dokumentit.test.mjs punainen SK:n haarassa, koska docs/pelikatalogi.md ei ole Raamatun ohjekartalla → kartalle Raamattu-PR:llä (Julkaisija) tai arkistoon. Postivahti, Asemataulu, LT, Siirtoseppä, Äänittäjä: aloitusviestit ennallaan.
- Postivahti 21.41: NS:n konteksti 51 % (yli roolien 50 %:n nollausrajan) → uudella tilillä NS aloitusviestistä tyhjään sessioon.
- LS1 museopalaute 188 (museo-palaute-188 f7679f89d, kuvat lokit/palaute188-pt/): PT katsoi iPad-kuvat 21.5x → OK; kuittaa junaan 188, kun iPhone-kuvat (palaute188b) on katsottu. Vermeerin yläpuolen "Omakuva" EI ole virhe (taidehallin edellinen-teos-rivi; LS1 e9bce05a2). Kertoja: Yövartio-salin äänitteettömille teoksille tilataan äänitteet (SK tekstit → PT hyväksyy → Äänittäjä pysyvällä luvalla), ei koodiratkaisua. USS-laajennukset .mk-ohjausnappi__kirjain ja .mk-museo-astu hyväksytty omistajan palautteen toteutuksena.
- NUI ISS-Pulun siluetti (natiivi-ui/pulu-siluetti-188 56de0538a, käännös 24420556f) KUITATTU junaan 188 klo 21.5x (iPhone + iPad katsottu) → NS:n runkoon.
