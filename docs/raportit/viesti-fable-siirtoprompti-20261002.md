# Siirtoprompti tilinvaihtoa varten (Päätoimittaja 2.10.2026, viikkokiintiö 92 %)

Omistaja 2.10. klo 22.1x: "voidaan nyt tehdä siirto. eli lopeta sessiot ja anna prompti" (tilin raja oli 95 %, käyttö 92 %).
Kaikki roolit pushasivat lopullisen luovutuksen ja aloitusviestin (SHA:t kohdan 3 taulukossa), ja vanhan tilin sessiot pysähtyivät.
Tarkempi tila: docs/raportit/viesti-fable-luovutus-20261002-d.md (sama haara). Päätökset: docs/raamattu-loki/paatokset-2026-09.md (grep "2.10.2026").

## 1. Ensimmäinen viesti uuden tilin Päätoimittaja-sessioon

Omistaja avaa uuden session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, max) ja liittää:

> Olet Päätoimittaja (ent. Fable), Matkakirjan päätoimittaja. Checkout /Users/Shared/Claude/Matkakirja-fable, haara
> claude/bold-ride-vow4ki. Aja `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`. Lue CLAUDE.md,
> Raamatun Ydinajatus kohta 2, docs/raportit/viesti-fable-siirtoprompti-20261002.md KOKONAAN ja viesti-fable-luovutus-20261002-d.md.
> Muisti MEMORY.md (erityisesti omistajalle-vain-suomeksi, omistajan-toimet-korttina, kortti-pysayttaa-paatoimittajan,
> kuvat-kriittinen-tarkistus-ennen-omistajaa, sessioiden-luonti-appia-ohjaamalla, levyn-vapautus-mergetyt-worktreet,
> viikkoraja-97-siirtoprompti). Luo roolisessiot kohdan 3 taulukon mukaan, lähetä kullekin aloitusviesti, kytke oma
> Remote Control päälle ja jatka kohdan 2 jonosta. Kysy omistajalta kortilla tämän tilin viikkoraja (90, 95 vai 97 %).

## 2. Tila ja jono (2.10. klo 22.2x)

1. **TF:** 1.1 (129) = proto master e204abbe ladattu 21.29 (yläpalkki, nostoselain, valikko V2, kipsipäät erikoisnostot-3 54358623, ROOMA-korjaus). Käytössä 8/12.
   **Laskuri nollautuu 3.10. klo 12.30, ja aamuun säästetään 2 latausta** (omistaja 20.1x).
2. **Juna 130 (Natiiviseppä):** matalampi yläpalkki b725dffa + iPadin pillerin väli d00c7f8b (hyväksytty, Natiivi-UI todentaa), Julisteet/
   Aarteet yhteen ikkunaan (natiivi-ui/kokoelmat-ikkuna 5cfe7253), Topografian hampurilainen (Linssiseppä d99f62c5, kuvapari
   proto-3d/lokit/linssiseppa-topografia-20261002/kuvapari-topografia.png odottaa tarkistusta ja omistajaa),
   astro/ISS-erä (Linssiseppä 2, kesken), skin-moottori ja jalkavarjo (Siirtoseppä, 0592decd todentamatta).
3. **Web-juna (Julkaisija):** #3865 ajossa; #3870 ja #3877 jonossa; #3869, #3874 ja #3875 mainissa; #3850 CONFLICTING. Pelikoodari: webin
   Topografian hampurilainen ja Astronautin kameran AUTO-häivytys, ponnahdus, maapallokuvake ja sumu. Natiivi-UI: linssilista web #3878.
4. **Linnan hahmot:** Linnanrakentajan erä 1b (11 henkilöä, 16 esiintymää, peilit 275a2765 ja 5de728bc). Siirtoseppä kuvaa ne linnassa
   jalkavarjon kanssa → Päätoimittaja tarkistaa → omistaja → skin-osoitin (2abec0c9 tai seuraaja) vasta omistajan OK:lla.
5. **Astronautin kamera / ISS (Linssiseppä 2):** 2, 4 ja 5 tehty (a05878fc). Kesken: Pulun kasvot, maapallokuvake, Pulu vasempaan alakulmaan
   60 % varjokuvana ja kasvot loistavat, robottikäsi oikeaan reunaan, POISTU-nappi (× + POISTU), ohjainpaneeli pienenä alareunaan ja
   napautuksella kahdelle riville noin 2×-kokoon, ISS-kamera zoomaa sisään.
6. **Karttaseppä:** maailman S2-ketju ajaa irrotettuna (ketju 34482, mosaiikki 34487, viikonloppuvienti 99469). P-Afrikka noin klo 23–24,
   Amerikka la noin 14, Aasia su noin 10, tropiikki ma noin 0.
7. **Levy:** noin 76 Gt vapaana. Lokien .app-kopioista jätetään vain uusin (muisti levyn-vapautus-mergetyt-worktreet).
8. **Loki:** päätökset 20.00 jälkeen ovat vain Päätoimittajan haarassa → seuraava docs-PR mainiin samalla kaavalla kuin #3872.

## 3. Roolit (checkout /Users/Shared/Claude/…, haara, malli)

| Rooli | Checkout | Haara | Malli | Kärki |
|---|---|---|---|---|
| Postivahti | Matkakirja-posti | postivahti | Sonnet, medium | **0b3287a2d** · kierto 10 min, viikkorajan hälytykset (kysy raja), levy, kävijälaskuri |
| Julkaisija | Matkakirja-julkaisija | julkaisija-luovutus-20260928 | Opus, high | **44d8d414a** · web-juna ja TF 8/12, aamuun 2 |
| Natiiviseppä | Matkakirja-3d-selvittaja | selvittaja-3d-luovutus | Opus, high | **1dabb46f5** · juna 130 |
| Natiivi-UI | Matkakirja-natiivi-ui | natiivi-ui-luovutus-m | Opus, high | **b8d52344f** · d00c7f8b + 5cfe7253 käännös kesken, linssilista web #3878 |
| Pelikoodari | Matkakirja-pelikoodari | pelikoodari-tyo-20260923 | Opus, high | **7cca600e9** · astro B1, B2 ja B4 PR:ssä #3879 (koko testisarja ajamatta), B3 vain natiivi; webin Topografian hampurilainen aloittamatta; kuvaparit proto-3d/lokit/pelikoodari-astro-20261002/ |
| Linssiseppä | Matkakirja-linssiseppa | linssiseppa-tyo-20260923 | Opus, high | **1b11057e8** · Topografian hampurilainen d99f62c5 merge-pyynnössä |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | linssiseppa2-tyo-20260928 | Opus, high | **edfc220db** · astro/ISS-erä |
| Linnanrakentaja | Matkakirja-linnanrakentaja | linnanrakentaja-tyo-20260929 | Opus, high | **2de3e39c7** · erä 1b odottaa pelikuvia |
| Siirtoseppä | Matkakirja-siirtoseppa | siirtoseppa-luovutus | Opus, high | **309ae5622** · jalkavarjo ja hahmojen pelikuvat |
| Karttaseppä | Matkakirja-karttaseppa | karttaseppa-tyo-20260922 | Opus, high | **3cdcfae7b** · S2-ketju irrotettuna |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | sisalto-pelikatalogi-20260927 | Sonnet, high | **8e2fa5f36** · #3850 (kuva2 K) nyt MERGEABLE (0942a1d91), Julkaisija voi ottaa junaan |
| Laitetestaaja | Matkakirja-laitetestaaja | laitetestaaja-savukierros-b13 | Sonnet, high | **8f3d5e0a0** · simulaattorit sammutettu |

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md
omasta haarastasi sekä sen osoittama luovutus, ja jatka. Päätoimittaja on <uusi id>." Sessioiden luonti: muisti
sessioiden-luonti-appia-ohjaamalla (osascript; Trust = Tab + Return).

## 4. ODOTTAA OMISTAJAA

1. Linnan hahmot pelikuvina (10 henkilöä jalkavarjon kanssa) → OK → skin-osoitin.
2. Astronautin kamera / ISS -muutokset kuvina.
3. Topografian hampurilainen ja Julisteet/Aarteet yksi ikkuna natiivissa kuvapareina.
4. Aamupäivän lista: seuraava ajattelija (Platon), Marcuksen intromusiikki (Eroica), yövalojen natriumoranssi, Lukijoilta-avaimen
   syöttö webiin ja iPadiin, Ajattelijat pelaajille -lupa (Sokrateen elämä -lappu), Julisteet/Codex-tilaukset, Allymes (ei ennen nykyisiä).
5. Linssit-nappi vaakatilassa (Päätoimittaja päätti näkyväksi; omistaja voi kumota).

## 5. Omistajan linjaukset 2.10. illalla (kaikki lokissa)

Yläpalkki: logo optisesti keskelle, tasaleveä pilleri ("80 pv £9999" -mitta, lyhyellä tekstillä enemmän tyhjää), palkki matalampi
(nahkaa pillerin ylä- ja alapuolella yhtä paljon) · nostoselain ‹ NOSTOT ▾ › + AUTO keskellä · valikko V2 ilman ×:ää ja väliviivoja,
taso- ja päivärivi ÄÄNET-laatalla · kipsipäät irti nimistä ja korttien alla · linnan hahmot valmiista skinnatuista CC0-malleista,
kulkusuunta kasvot edellä, jalkavarjo, kampaukset n. 1500 · Julisteet ja Aarteet yhteen ikkunaan, ja kehittäjätilassa kaikki näkyvät ·
Topografiaan hampurilainen (Korkeustasot, Sulje linssi) · Astronautin kameran AUTO-tila ilman nappeja (napautus palauttaa), ISS:n paneeli laajenevaksi.
