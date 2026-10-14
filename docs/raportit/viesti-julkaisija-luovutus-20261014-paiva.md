# Julkaisijan luovutus 14.10.2026 klo 13.3x (NOLLAUS, PT:n käsky, konteksti 54 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen luovutus `viesti-julkaisija-luovutus-20261014-aamu.md`;
käytännöt ja sääntö 0 `viesti-julkaisija-luovutus-20261013-ilta.md`.

## 0. UUDET SÄÄNNÖT TÄNÄÄN (omistaja/PT)

- **Osoitekirja** `/Users/Shared/Claude/osoitekirja.md`: viestit AINA `mcp__ccd_session_mgmt__send_message` session id:llä.
  PT = "PÄÄTOIMITTAJA (Opus, medium)" **local_74630a27-8c1b-4ac3-9143-538efab8cbcd**, viestit ≤ 3 riviä.
  local_593b89a1 = omistajan KESKUSTELUKANAVA: roolit EIVÄT viesti sinne. Nollaukset: luovutus + push → Postivahdille
  (local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7) "LUOVUTUS VALMIS <sha>".
- **Mykistys** (omistaja 10.5x): jokainen simu-, Mac-, TF-, muisti- ja Unity batch -ajo alkaa `aani mykistys`; Macin kaiuttimista ei mitään.
  Muistuta jokaisessa SIMU NYT / KÄÄNNÖS NYT -viestissä.
- Linssiseppä 2 = **Valoseppä** (sama sessio local_fc4fcc54…); Linssiseppä (LS1) = museot ja opas.
- **Ei shell -c eikä evalia** (oma virhe 12.09: lupakysely pysäytti jonon ~20–40 min). Kertaluonteiset ajot skriptitiedostoina.
- **CDN:** älä tarkista CDN:ää ennen onnistunutta vientiä (Cloudflare välimuistittaa 404:n png/jpg:lle ~5 min).

## 1. Juna 189 – VALMIS 5/5

OMISTAJA PYYSI JULKAISUA 10.05 (PT välitti). BUILD 189 = fecbb3c7e (NS). Web 6/6: #4573 e55db801e, #4572, #4571, #4578, #4580,
#4582 c08d87148 (korvasi ristiriitaisen #4576: esittelyt #4580:sta, rajat #4576:sta). Muutosloki #4583 0d56ec511 (PT:n 274 mrk
yhdistetty 3 lauseeksi). TF iOS 1. ajo OHITETTU levyn takia (25 < 30 Gt) → 2. ajo 38527264175 ✓ 10.24 → sisäinen 10.28 → vienti
→ ulkoinen 11.12 (Arvioijat + Beta-testaajat) → beta-arvio HYVÄKSYTTY 11.28 → 188 vanhennettu. Mac 1.1 (189) ✓ 10.12 (NS).

## 2. Juna 190 (kertyy)

- Web-lista: **#4588** (SK saapumisintron 40 Commons-kuvaa + Luxemburg/Nikosia, js/packs) PIDÄTETTY → merge vasta "OMISTAJA PYYSI
  JULKAISUA" (PT vahvisti). NS ylläpitää `proto-3d/tyokalut/natiiviseppa-skriptit/juna190/web-merget-190.txt`.
- NS-runko natiiviseppa/juna-190 (883bfe9ec / LT:n käännös 25aba7038). Pariisin muistiajo 190 valmis 11.53 (NS).
- Juna-vahti (launchd) kaatuu heti: ei lue T7:n L1-kopiota → NS kysyi PT:ltä (L1 sisäiselle vai vahti pois).

## 3. Käännös- ja simujono 13.34

Linjat: **L1** = PK uusi-peli-nollaus-190 800bb45c4 (omistajan Ateena-vika). **L2** = Valosepän vahti lontoo-korkeus-v2 5d6745971.
Simut (raja 2): **LT** telakointi190 iPad 3622D89D vaaka (app lokit/laitetestaaja-app-telakointi190, 25aba7038) + **NUI** intro190
d0a4874c0 (iPad vaaka, 2 ajoa). Vapautus vain tekijän SIMU VAPAA -viestistä.
Jono järjestyksessä:
1. **PK Ateena-vika** (omistaja, PT kiireellinen): 39644E75 vaaka → 3E6A1D4D peräkkäin, uusi-peli-nollaus-190 käännöksen jälkeen.
2. **NUI iss-palaute-190** (app natiivi-ui-app-isspalaute): iPhone → iPad peräkkäin yhdellä paikalla (isspalaute-simut.sh).
   PT mainitsi myös NUI:n faktalaatikko-simun — kysy NUI:lta.
3. **LS1 prahalontoo2** (~35 min iPad, ei käännöstä): luo lippu `proto-3d/tyokalut/linssiseppa-ajot/simu-prahalontoo2.nyt`.
4. **PK iss-palaute-190** dce4e2e99 (39644E75, Max Q -video, ääni vain sisäisenä kaappauksena).
5. **Valosepän vahti** pyytää itse (ks. 4).
Lippukäytäntö: LS1:n ketjut odottavat `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt` kansiossa `proto-3d/tyokalut/linssiseppa-ajot/`;
Valosepän käsiketjut `proto-3d/_tyo/linssiseppa2/lontoo-praha/simu-nyt-<nimi>`.

## 4. VALOSEPÄN VAHTI (omistaja 10.56 "Valoseppä ensin", uusi)

- `julkaisija-tyokalut/valoseppa-vahti.zsh`, käynnissä setsid-prosessina, pid `/tmp/matkakirja-valovahti.pid` (93533).
  Pysäytys `kill $(cat /tmp/matkakirja-valovahti.pid)`; käynnistys kuten skriptin otsakkeessa (perl setsid).
- Asetukset `julkaisija-tyokalut/valoseppa-haarat.txt`: kuvio `linssiseppa2/`, poissulut `!linssiseppa2/praha-ateena-kehitys`,
  `!linssiseppa2/valkoiset-laatat-diag`, `skenaario=` (Valosepän sk-vakio.txt), `vakio=` (Valosepän vakio.zsh → minun
  `valoseppa-vakiokuvat.zsh` = todistusajo-kääre, iPad A26BC7D0). Jono säilyy uudelleenkäynnistyksessä (`valoseppa-kasitellyt.txt`).
- Jokainen uusi kärki → 120 s hiljaisuus → käännös vapaalla linjalla (L2 ensin) → loki "SIMU-PYYNTÖ" → **Julkaisija antaa vuoron:
  `touch /tmp/matkakirja-valovahti-simu.nyt`** (odottaa max 60 min) → vakioajo (Lontoo + pallo + raketti→Cupola, ~9 min) →
  `proto-3d/lokit/valoseppa-uusin/` (kuva-arkki.png, nopeus.txt, todistus/). Tila `proto-3d/lokit/valoseppa-tila.txt`,
  loki `julkaisija-tyokalut/valoseppa-vahti.log`. Valmiista arkista rivi PT:lle (≤ 3 riviä) + Valosepälle.
- Siivous (PT 12.0x): app vain uusimmasta ajosta, 2 seuraavaa ilman appia, vanhemmat NAS
  `NAS-Homes/samireivinen/Matkakirja-arkisto/julkaisija/valoseppa-vahti/`.
- Ajot tänään: kupoli-yovalot bc6485eb8 (PUUTE: SHA-tarkistus, korjattu), lontoo 79c2e6185 OK 12.38, kupoli-yovalot befe97c86 OK 13.21.
- Pelikoodari tulee vahtiin mukaan, kun Valosepän vahti toimii (PT).

## 5. Viennit tänään (kaikki vie-paketti.sh, 0 virhettä, CDN tarkistettu `tarkista-cdn.zsh`:llä)

ilmakeha-lontoo-praha-ateena 63/63 (KS), opas-pallokierros-lontoo-v3 (KS), vesi-praha2-v22 (KS), opas-pallokierros-ateena-v1 + v2 (LS1),
iss-cupola-latauskuva (NUI), iss-yovalot-katuvalot 10/10 (Valoseppä, ensin hylätty ./-polut), andoya-kauko 2/2, iss-katuvalot-v2 5/5
(ensin hylätty: lisenssirivi puuttui).

## 6. Merget tänään (PT:n docs)

#4581, #4554, #4555, #4584, #4585, #4586, #4587 (testit uusittu: peruttu kuormassa), #4589, #4590. Työkalu
`julkaisija-tyokalut/odota-ja-mergea.zsh <PR>` (taustalle; mergeää vihreänä, kirjaa lokiin).

## 7. Levy

97 Gt vapaana 12.29 (LS2/Valoseppä siivosi 16 Gt; vahdin vanhat + linssiseppa2-app-lontoo4 → NAS). `lokit/linssiseppa-app` (LS1, 1 Gt)
siirto NAS:lle, kun LS1 ei käytä sitä (prahalontoo2 käyttää ateena190b-appia). TF-raja 30 Gt (proto3d-testflight.yml).

## 8. Avoimet

- Lukkovahti Monitorina: `zsh julkaisija-tyokalut/lukkovahti.zsh | grep -v juna/b17` (juna-vahdin pikakaatumiset pois).
- Ei omia TF-ketjuja käynnissä. Ei omia worktreetä.
