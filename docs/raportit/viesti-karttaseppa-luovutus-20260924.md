# Karttasepän luovutus 24.9.2026 (sessio 7 → seuraava), päivitetty klo 11

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara
`karttaseppa-tyo-20260922` (EI mergetä). Erät vain
`sh /Users/Shared/Claude/Matkakirja-fable/tools/uusi-worktree.sh karttaseppa <aihe>`.
Suunnitelma ja arviot: `docs/raportit/karttaseppa-natiivi-ketju-20260923.md`.

## Ämpärissä nyt (natiivin osoitteet)

| Mitä | Osoite (media.matkakirja.app/…) | Huom. |
| --- | --- | --- |
| Maasto maailma | `julisteet/maasto/2026-09-24-maailma/layer.json` | 2 263 883 laattaa; z0–z10 maailma (z7+ vain maa, GLO-90), z11–z12 E28 (z12 GLO-30). Natiiviseppä vaihtaa MaastoUrl:n. |
| Maasto Ranska (vanha) | `julisteet/maasto/2026-09-23b/` | kaarevuuskorjattu; 23a:ssa mustat kiilat, älä käytä |
| Pallon sarja 23a | `julisteet/pallo/laatat/2026-09-23a-pohja-20260923a/` | natiivin pohja (Natiiviseppä 888e52d) |
| Rajaton sarja 23a | `…/2026-09-23a-pohja-20260923arajaton/` | ilman viivatasoa, isoisän linssille |
| Reliefisarja | `matkakirja/reliefipyramidi/20260920/pallo/` ja `pallo-k08/` (saturate 0,8) | Linssiseppä; lähteen päivämääräraja-aukko lon −179…−175 (ks. avoimet) |
| Isoisä 1873 | `matkakirja/linssit/isoisa-1873/20260921/` | json + LICENSE (GPL-3.0) + lähde |

## Poltto 23a

Valmis 23.9. (114/114 + 397/397). Osoitin-PR **#2957** (Julkaisijan jonon
kärjessä). Mergen jälkeen luettelo ämpäriin: **`ajo-20260923a/luettelo/pyramidi.json`**
(EI `ampari-luettelo.json`, se on vanha 22c-kopio).

## Seuraavaksi: syvä Ranska-sarja (DEM-reliefi z9–z10 + pallo Z9–Z11)

- Käynnistä kun ämpärin `julisteet/pyramidi/pyramidi.json` versio = `2026-09-23a-pohja`
  (sarja jatkaa ämpärin pohjaa). Sovi CPU-ikkuna (~20 min) Julkaisijan/Fablen kanssa.
- `cd /Users/Shared/Claude/pyramidi-poltto/ajo-20260923a-syva && zsh aja-syva.sh`
  (`--lista` tarkistaa; kuiva-ajo hyväksytty 23.9.: 16 + 8 + 48 shardia).
- Työkalu worktreessä `wt/karttaseppa-syvat-tasot` (PR **#2962**, vaatii versionoston;
  `PELIN_SYVIN_TASO` tuotantoon ennen kuin z9–z10:n sisältävä luettelo viedään —
  syvä sarja ei vie luetteloa). Pallon syvä sarja kansioon tunnisteella
  `20260923asyva`; kerro Natiivisepälle (erillinen kerros Z9–Z11, Ranska).
- Fablen päätös: z9–z10 ilman raja- ja rantaviivatasoa (natiivi piirtää vektoreina).

## Avoimet PR:t

#2957 (osoitin 23a), #2962 (syvät tasot), #2980 (reliefi jatko: täytesävy,
--kyllaisyys, --ilman-viivoja), #2989 (maasto maailma). Mergetty: #2943, #2950, #2954.

## Avoimet asiat

- Reliefipyramidi 20260920: arkin itäisin osittainen sarake (lon −179…−175)
  on tuottajan täytettä ja z7 sarakkeet 167–168 puuttuvat — paikkausajo
  `tools/tee-reliefipyramidi.mjs` (--alue), sitten sarjat pallo/ ja pallo-k08/
  uuteen versiokansioon ja molemmat osoitteet Linssisepälle.
- Pallon sarjan navan merisävy ilman käyriä (luvattu Natiivisepälle), vedos
  ensin (Grönlanti 83,6° N).
- Natiivin Biskajan rosoinen reunus: todennäköisesti kaksinkertainen varjostus;
  Natiiviseppä testaa valaistuksen kanssa LENNON ESITYS -erässä.
- E28 z9–z10 syvät tasot (GLO-30 E28 ladattu) Ranskan jälkeen.
- Ranska z13 vasta omistajan kokeilun jälkeen.

## Data ja ajokansiot

- DEM NAS:issa: `…/Matkakirja-arkisto/dem/copernicus-glo30/` (E28, 1 659 ruutua, 42,5 Gt)
  ja `…/copernicus-glo90/` (maailma, 26 475, 71,1 Gt); listat `/Users/Shared/Claude/dem-lataus/`.
  Siirtosepän kaupunkikorkeudet omassa kansiossa `dem/kaupunkikorkeudet/`.
- Maasto: `/Users/Shared/Claude/maasto-poltto/` (aja-maasto.sh, aja-maailma.sh,
  vie-maailma.sh, tyokalu*/); maailma-tuotos NAS:issa `koodaus/Claude/maasto-poltto/2026-09-24-maailma`.
  NAS:n `._*`-tiedostot: tarkistus ja vienti ohittavat ne.
- Relief: `/Users/Shared/Claude/reliefi-poltto/` (aja-sarja*.sh, lahde/ = reliefi 20260920 paikallisesti).
- Paikallinen levy ~34 Gt vapaana (97 %): isot tuotokset NAS:iin.

## Päivitys 24.9. klo 11

- **Syvä Ranska valmis:** pyramidi `2026-09-23a-pohja/z9–z10` (896 + 3 410) ja pallo
  `julisteet/pallo/laatat/2026-09-23a-pohja-20260923asyva/` Z9–Z11 (10 475, ilman viivoja).
  Virhevienti samasta ajosta polkuun `2026-09-22c-pohja/z9–z10` jätetty ämpäriin (loki
  `ajo-20260923a-syva/lokit/VIRHEVIENTI-22c-polku.log`); vartija #2962:ssa.
- **Reliefi 20260924** (päivämäärärajan kaistale paikattu) ämpärissä + pallo/ ja pallo-k08/;
  webin osoitin PR #3044.
- **Väritaso natiiville:** `julisteet/pallo/vari/2026-09-14b-tasoitus-k3/<ISO>/` Z5–Z9 RGBA,
  27 maata (PR #3054, pohjana #2980). Kierrokset ilman päätettä ja k2 hylätty.
- **E28 syvät tasot ajastettu** klo 22.00 (`pyramidi-poltto/ajo-20260924-e28-syva/aja.sh`,
  101 shardia + pallo 16 osaa), vahti pysäyttää 02.45 (levysiivous 03, TestFlight 04–05).
  Jatko samalla komennolla. Pallon kansio `…-20260924e28syva`; kerro Natiivisepälle.
- **Päivällä rinnakkaisuus 4** (`--ytimet 4`), täysi vain yöllä (Macin muisti loppui 12–16 Chromiumilla).
- Avoimet PR:t: #2962, #2980, #2989, #3044, #3054.
