# Siirtoprompti tilinvaihtoa varten (Päätoimittaja 5.10.2026, viikkokiintiö 99 %)

Tili saavutti 99 % (raja 99 %, omistaja 2.10.). Kaikki roolit pushasivat luovutuksen ja aloitusviestin (kärjet kohdan 3 taulukossa),
ja vanhan tilin sessiot pysäytettiin. Tarkempi tila: docs/raportit/viesti-fable-luovutus-20261004.md (alku "TILANNE 5.10."), sama haara.
Päätökset: docs/raamattu-loki/paatokset-2026-09.md (grep "5.10.2026").

## 1. Ensimmäinen viesti uuden tilin Päätoimittaja-sessioon

Omistaja avaa uuden session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, max) ja liittää:

> Olet Päätoimittaja (ent. Fable), Matkakirjan päätoimittaja. Checkout /Users/Shared/Claude/Matkakirja-fable, haara
> claude/bold-ride-vow4ki. Aja `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`. Lue CLAUDE.md,
> Raamatun Ydinajatus kohta 2, docs/raportit/viesti-fable-siirtoprompti-20261005.md KOKONAAN ja viesti-fable-luovutus-20261004.md
> (alku "TILANNE 5.10."). Muisti MEMORY.md (erityisesti omistajalle-vain-suomeksi, omistajan-toimet-korttina, kortti-pysayttaa-paatoimittajan,
> tarkistus-laitteella-aanen-kanssa, sessioiden-luonti-appia-ohjaamalla, levyn-vapautus-mergetyt-worktreet, viikkoraja-97-siirtoprompti,
> fable-tila-20261005-aamuyo). Luo roolisessiot kohdan 3 taulukon mukaan, lähetä kullekin aloitusviesti, kytke oma Remote Control
> päälle ja jatka kohdan 2 jonosta. Kysy omistajalta kortilla tämän tilin viikkoraja (95, 97 vai 99 %).

## 2. Tila ja jono (5.10. aamu)

1. **TF 1.1 (142) testaajilla 05.21** (master 62d5d1bb, muutosloki C). Laskuri 10/12.
2. **AAMUN KORTTI omistajalle** (docs/raportit/aamukortti-omistajalle-20261005.md, kohdat 1–11; kuvat SendUserFile:llä): Stylized Water 3 -osto;
   latausluvat Cinemachine 3.1.7 (+ splines 2.9.1) ja Steam Audio 4.8.1; Sisältökirjurin 6 rajatun NASA-kuvan ämpärilupa;
   linnan osoitin c116f02f → 27022c94 (avainsanat + uusi valo, suositus) tai 8f4eb611 (vain avainsanat) — kohdat 6, 9 ja 10 (A/B-kuvat, kilpatilannehuomio); linnan sävy/tilt-shift-makuvalinta (kohta 11); Xcode-välitiedostojen poisto (kohta 8); tiedoksi codex-*-kansiot omistajan tilillä.
3. **Juna 143 (Natiiviseppä kokoaa kuitatuista):** KUITATTU Brotli-purku ca4251f5, Pulun chatin läpäisy b38360f4, ✕-poistot
   63a4552e + 9a688396 (Natiivi-UI, oikeat simunapautukset). ODOTTAA: Siirtosepän linna-143 024a098d (Timeline oletus päälle, teardown
   bdd5be5e todistettu 5 × N, ristihäivytys da00c9c6) ja Tavli 9169187b (tekstit Sisältökirjurilta ennen TF:ää; ei Kumoa-nappia; osuma-ala
   ± 1 saraketta), kevennykset A+C iPad-mittauksen jälkeen (iPad 00008103, myös Brotli-purkuaika), linnan kuva (Linssiseppä e6fa10ea:
   omistajan valinta aamulla), ISS-ohjaamo (LS2 d227d4c9 + Karttasepän v2b/v2c → kuvaparit ennen juuren vaihtoa), Cinemachine ja
   Steam Audio vasta omistajan latausluvan jälkeen (akustiikkaverkot #3979 valmiit), vesi oston jälkeen. Linnan data: peili 27022c94
   (avainsanat + AO-B + 8k + tasoitus) → omistajan osoitinpäätös (A/B-kuvat kortissa); blender.json-PR mainiin ennen Run-riviä.
   Koko juna 143 tarkistetaan kokeesta kuvista JA ääniraidasta (positiivinen verrokki samassa istunnossa, "Laita äänet päälle").
4. **Karttaseppä:** tropiikki v2e T7:llä 55/196 (valmis ~15–16), v2b (sävytasaus) ~08–09, v2c-ehdokkaat ajossa (vaihe 2 jonossa).
5. **Levy** ~32 Gi (kova raja 30): scratchpad/siivoa-lokit.sh (zsh, --aja) tunnin välein; simulaattorit ~112 Gi; omistajan Run-rivi
   kortin kohdassa 8 vapauttaa ~7,9 Gi (Xcoden arkistovälitiedostot + Build/yo).
6. **Lokissa** kaikki yön päätökset (#3981). Lisäkirjattavaa uudelta tililtä: omistajan aamukortin vastaukset.

## 3. Roolit (checkout /Users/Shared/Claude/…, haara, malli)

| Rooli | Checkout | Haara | Malli | Kärki |
|---|---|---|---|---|
| Postivahti | Matkakirja-posti | postivahti | Sonnet, medium | **4e5ad2a5d** · kierto 10 min, viikkorajan hälytykset (kysy raja; 96 %:n hälytys jäi 5.10. tulematta), levy (kova raja 30 Gi) |
| Julkaisija | Matkakirja-julkaisija | julkaisija-luovutus-20260928 | Opus, high | **35c5d0dff** · TF 142 testaajilla, laskuri 10/12, simujono, osoitinvaihdot omistajan OK:lla (gh workflow run) |
| Natiiviseppä | Matkakirja-3d-selvittaja | selvittaja-3d-luovutus | Opus, high | **9c3e90113** · BUILD 142 = 62d5d1bb; juna 143 -koe 3a6c994e (Brotli + chat-linna); x-napit 63a4552e + 9a688396 kuitattu, yhdistämättä |
| Natiivi-UI | Matkakirja-natiivi-ui | natiivi-ui-luovutus-20261005 | Opus, high | **21223cdb8** · x-napit + chat-linna merge-pyynnöt Natiivisepälle; nimilapun kontrasti kirkkaalla kuvalla myöhemmin |
| Pelikoodari | Matkakirja-pelikoodari | pelikoodari-tyo-20260923 | Opus, high | **13761bea9** · ei avoimia eriä (Tavlin ja Myllyn äänet valmiit) |
| Linssiseppä | Matkakirja-linssiseppa | linssiseppa-tyo-20260923 | Opus, high | **794005d22** · proto linssiseppa/linna-kuva 9f37a9e9 (ruudukon juurisyy korjattu, simulla todentamatta; Neutral + tilt vain huoneissa -suositus omistajalle); kiilto 11–13 |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | linssiseppa2-tyo-20260928 | Opus, high | **a67b3a9f8** · proto linssiseppa2/iss-ohjaamo d227d4c9; v2-kuvat 10c31692; odottaa v2b/v2c |
| Linnanrakentaja | Matkakirja-linnanrakentaja | linnanrakentaja-tyo-20260929 | Opus, high | **e7ee8d7e9** · peili 27022c945fa48cc3 (avainsanat + AO-B + 8k + tasoitus, haara linnanrakentaja-kuori-ao-2); uusi osoitin-Run-rivi kun blender.json mainissa; välitaso 0,80 M valmiina |
| Siirtoseppä | Matkakirja-siirtoseppa | siirtoseppa-luovutus | Opus, high | **01f9803e0** · proto linna-143 024a098d (Timeline oletus päälle, teardown, ristihäivytys), tavli 9169187b; Cinemachine/Steam Audio odottavat latauslupaa |
| Karttaseppä | Matkakirja-karttaseppa | karttaseppa-tyo-20260922 | Opus, high | **139f8f79e** · tropiikki v2e T7:llä, v2b (sävytasaus) ~08, v2c (naapurien sama datatake) jonossa |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | sisalto-pelikatalogi-20260927 | Sonnet, high | **077464a70** · ISS-erä 5 (4 puhdasta + 6 rajattua, ämpärilupa omistajalta), Tavlin säännöt/historia-tekstit |
| Laitetestaaja | Matkakirja-laitetestaaja | laitetestaaja-savukierros-b13 | Sonnet, high | **408e1eb23** · ei ajoja; simulaattorit sammutettu |

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-<rooli>-aloitus.md
omasta haarastasi sekä sen osoittama luovutus, ja jatka. Päätoimittaja on <uusi id>." Sessioiden luonti: muisti
sessioiden-luonti-appia-ohjaamalla (osascript; Trust = Tab + Return).
