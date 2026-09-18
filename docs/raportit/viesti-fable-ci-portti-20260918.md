# Viesti Fablelle: PR-portin seinäkello (A) ja testit Macille (B) — 18.9.2026

Opus-kehitysagentti, haara `claude/bold-ride-vow4ki-ci-portti` (pohja: main =
v1939, a43cf9fd). PR:ää EI avattu, versiota EI nostettu, Raamattuun EI koskettu.
Tehtävä: omistajan päätös 18.9.2026 (Raamattu, AGENTIT VAIN OPUS JA SONNET,
TARKENNUS 9 ja TARKENNUS 10 kohta 19).

---

## A) Neljä pisintä savuketta jaettu rinnakkaisiksi riveiksi

### Mekanismi: `#osa`-pääte sarjat.json:ssa

`tools/savukkeet/sarjat.json`:n `julkaisu`-listan ja `asetukset`-avaimen uusi
muoto `savuke-x.mjs#osa` ajaa SAMAN savukkeen useana rinnakkaisena rivinä:

- `tiedosto` = `#`:n vasen puoli (ajettava savuke)
- `nimiTunniste` = `savuke-x-osa` → kaappaus-, loki- ja artefaktipolut eivät törmää
- `nimi` = koko `savuke-x.mjs#osa` → yhteenvedon taulukossa puolikkaat erottuvat

Rajaus ITSE ajoon tulee rivin omasta `env`-lohkosta, ei savukkeen koodista.
`kaikki` ja mukautettu lista ajavat savukkeen yhä kokonaisena.

Muutetut tiedostot:

- `tools/savukkeet/rakenna-matriisi.mjs` — `#osa`-jäsennys, uusi `nimi`-kenttä,
  tiedoston olemassaolon tarkistus NYT myös julkaisusarjalle (ennen vain
  mukautetulle listalle) ja uusi virhe, jos sama rivi on sarjassa kahdesti.
- `tools/savukkeet/aja-sarja.mjs` — kiinteiden porttien tarkistus lukee
  tiedostonimen (ei enää `nimiTunniste`-pohjaista `${n}.mjs`, joka olisi
  kaatunut jaetulla rivillä), ja `tulos-*.json` kirjaa `nimi`-kentän.
- `.github/workflows/savukkeet.yml` — ubuntu-matriisin askeleen nimi ja
  "Tallenna tulos" käyttävät `matrix.nimi`ä.

### Jako ja rajausmuuttujat (kaikissa neljässä dokumentoitu alkukommenttiin)

| Savuke | Rivit | Muuttuja |
| --- | --- | --- |
| `savuke-astro-pallo.mjs` | `#puhelin`, `#tyopoyta`, `#vartija-a`, `#vartija-b` | `NAKYMAT` (oli jo; lisätty arvot `ei-vartija`, `vartija-a`, `vartija-b`) |
| `savuke-pariisi-lahizoom.mjs` | `#390`, `#1400` | `SAVUKE_RUUTU` (oli jo valmiina) |
| `savuke-satelliittilinssi.mjs` | `#isot` (tyopoyta, ipad, ipadvaaka), `#pienet` (puhelin, puhelinvaaka, pienivaaka) | `NAKYMAT` (oli jo; lisätty tuntemattoman näkymän FAIL-vartio) |
| `savuke-kaupunkipopup.mjs` | `#390`, `#1400` | `SAVUKE_RUUTU` (UUSI, sama nimi kuin pariisi-lähizoomissa) |

**astro-pallo jakautui neljään, ei kahteen.** Mittaus paljasti, että savukkeen
pisin osa ei ole näyttö vaan väitteen 9 vartijalohko: puhelinnäyttö yksin 87 s,
koko vartijalohko 294 s. Kaksi riviä olisi siis jäänyt ~5 minuuttiin. Siksi
savukkeeseen lisättiin `ei-vartija` (näyttörivi ei aja lohkoa, joka muuten
lähtisi `tyopoyta`-arvosta) ja vartijalohko jaettiin kahtia `vartija-a`
(vastakoe ilman estoa, kirjasto estetty, pinta estetty, Mac-kotelo) ja
`vartija-b` (Safarin rajat, kehykset poikki, musta pinta, kolme avausta).
`NAKYMAT=vartija` ajaa yhä molemmat, eli paikallinen uusinta ei muuttunut.

### Tunnetut punaiset kohdistettuina

- `pariisi-lahizoom#1400` — `7e. tyopoyta: kyltin laatikko on vapaa`.
  `#390` on ilman tunnettuja punaisia (mitattu vihreäksi, ks. alla).
- `satelliittilinssi#isot` — kaikki kolme `tunnetutPunaisetMac`-riviä
  (tyopoyta, ipadvaaka) + `pallon takapuolen merkki ei ota napautusta`.
- `satelliittilinssi#pienet` — vain `pallon takapuolen merkki ei ota
  napautusta`. **Tämä yksi rivi on tarkoituksella MOLEMMILLA puolikkailla**,
  koska raporteissa ei ole kirjattu, missä näkymässä se häilyy. Kun se
  seuraavan kerran nähdään, se pitää poistaa väärältä puolikkaalta —
  muuten se vaientaa väitteen siellä missä se ei koskaan laukea.
- `kaupunkipopup#390` — `tunnetutPunaisetMaara: 3`, `#1400` — `2`.

### Kaupunkipopupin lukumäärä kalibroitiin uudelleen (huomio Fablelle)

Vanha `tunnetutPunaisetMaara: 17` on v1927:n ajalta, jolloin savukkeessa oli 57
väitettä. PAATOKSET 34 muutti suuren osan vartioista INFO-riveiksi: savukkeessa
on nyt **13 väitettä per ruutu**, ja tämän päivän Mac-mittauksessa punaisia oli
390 px: 3 ja 1400 px: 2 (yhteensä 5, ei 17). Jätin lukumäärät mitattuihin
arvoihin (3 ja 2), koska 17 olisi vaiennut lähes kaiken. **Tämä kiristää
porttia** — jos ruudulla häilyy kuormassa vielä jokin vartio, se näkyy nyt
uutena punaisena. Se on riski, jonka kirjaan tässä: jos ensimmäinen Actions-ajo
antaa popupille uuden punaisen, kyse on todennäköisesti kalibroinnista eikä
regressiosta, ja luku nostetaan yhdellä.

### MITATUT KESTOT (Mac Studio, 18.9.2026)

Kaikki ajettu neljän rinnakkaisen savukkeen kuormassa (= sama tilanne kuin
`SAVUKE_RINNAKKAIN: '4'` Actionsissa). Yksi puolikas kustakin, plus popupin
molemmat (lukumäärän kalibrointia varten) ja astron vartijalohko erikseen.

| Rivi | Kesto | Tulos |
| --- | --- | --- |
| `savuke-astro-pallo.mjs#puhelin` (`NAKYMAT=puhelin`) | **87 s** | exit 0, kaikki vihreä |
| `savuke-astro-pallo.mjs` vartijalohko (`NAKYMAT=vartija`) | **294 s** | 27/27 läpi → jaettiin `#vartija-a` / `#vartija-b`, arvio ~150 s kumpikin |
| `savuke-pariisi-lahizoom.mjs#390` | **220 s** | exit 0, kaikki vihreä |
| `savuke-satelliittilinssi.mjs#isot` | **125 s** | 95/97, 2 tunnettua Mac-punaista (molemmat tyopoyta) |
| `savuke-kaupunkipopup.mjs#390` | **93 s** | 10/13, 3 punaista |
| `savuke-kaupunkipopup.mjs#1400` | **92 s** | 10/12, 2 punaista |

Vertailukohta ennen jakoa: astro-pallo 464 s, pariisi-lahizoom 440 s,
satelliittilinssi 242 s, kaupunkipopup 191 s.

**Pisin rivi jaon jälkeen: `pariisi-lahizoom#390`, 220 s (3 min 40 s)** — alle
tavoitteen 4 min. Vartijalohkon puolikkaita ei ehditty mitata erikseen
(aikakatto); ne on syytä varmistaa ensimmäisestä Actions-ajosta.

### Riskit kohdassa A

1. **Vartijalohkon puolikkaita ei ole mitattu erikseen.** Jos jako menee
   epätasan, `#vartija-a` tai `#vartija-b` voi jäädä yli 4 minuuttiin. Katso
   ensimmäisen ajon yhteenvetotaulukosta ja siirrä tarvittaessa yksi lohko
   (`ajaMacVastakoe` ↔ `ajaSafarinRajatMacissa`) toiseen puolikkaaseen —
   muutos on yksi rivi savukkeen lopussa.
2. **Rivejä on nyt 18 (oli 12), rinnakkaisuus on 4.** Seinäkello = pisin rivi
   TAI kokonaistyö / 4, kumpi suurempi. Kokonaistyö ei kasvanut (sama työ eri
   riveillä; vartijalohko ei enää duplikoidu, koska `ei-vartija` estää sen),
   mutta jos 6 min ei toteudu, nosta `SAVUKE_RINNAKKAIN` 4 → 6.
3. **Lista on pituusjärjestyksessä.** `aja-sarja.mjs` jakaa rivit työntekijöille
   listan järjestyksessä, joten pisin rivi ei saa valua lopuksi. Jos sarjaan
   lisätään pitkä savuke, se kuuluu listan alkuun.
4. **Kaksi PR:ää samalla koneella yhtä aikaa.** Yksi self-hosted-runner ajaa
   yhden jobin kerrallaan, joten toinen PR JONOTTAA — jaon jälkeen jono lyhenee
   samassa suhteessa. `aja-sarja.mjs` antaa kullekin riville oman portin
   (8800 + indeksi), mutta `savuke-kaupunkipopup` ja `savuke-pariisi-lahizoom`
   kuuntelevat `listen(0)`:lla eivätkä lue PORTTIa, joten törmäyksiä ei tule
   edes rinnakkaisissa jobeissa. Tuloskansio on `run_id`-kohtainen. Jos
   omistaja rekisteröi TOISEN runnerin (kohta B), kaksi savukeajoa voisi
   osua samalle koneelle yhtä aikaa — **labelit pitävät ne erillään** vain jos
   testit-runnerilla EI ole savukkeiden labelisarjaa. Alla oleva
   rekisteröintikomento antaa labelit `self-hosted,macOS,ARM64,testit`, joten
   savukkeet (jotka vaativat `[self-hosted, macOS, ARM64]`) voivat silti
   valua sille runnerille. **Suositus Fablelle:** kun testit-runneri on
   pystyssä, lisää savukkeet-työnkulun `runs-on`-listaan oma label
   (esim. `savukkeet`) ja anna se vain SamiMacStudio2:lle.

---

## B) Testit Macin runnerille — valmis, mutta KYTKIN on ubuntulla

`.github/workflows/testit.yml` kirjoitettiin uusiksi:

- Laukaisu: `pull_request` (ennallaan) **ja** `push` mainiin (uusi).
- `concurrency: testit-${{ github.ref }}` + `cancel-in-progress` — yksi
  self-hosted-runner ajaa yhden jobin kerrallaan, joten vanhentunut ajo ei saa
  viedä paikkaa tuoreelta (sama kaava kuin savukkeet.yml:ssä).
- Uusi `reitti`-jobi valitsee ajokoneen ja antaa sen `runs-on`-kenttään
  `fromJSON`illa. **Jobin nimi pysyy `testit`**, joten mainin haarasuojauksen
  pakollinen tarkistus "Testit / testit" ei katkea reitin vaihtuessa. (Tämä on
  syy siihen, ettei tehty kahta erillistä jobia savukkeet.yml:n tapaan:
  siellä check-nimen vaihtuminen ei haittaa, täällä haittaisi.)
- `actions/setup-node` ajetaan vain kun `runner.environment ==
  'github-hosted'`; Macilla node tulee polusta `/opt/homebrew/opt/node@22/bin`
  (lisätään `GITHUB_PATH`iin, ubuntulla polkua ei ole → vaaraton).
- Fork-PR ei pääse Macille koskaan: `reitti` vertaa
  `github.event.pull_request.head.repo.full_name`ia repoon.
- `timeout-minutes: 15`.

### KYTKIN

`reitti`-jobissa on yksi rivi:

```
REITTI=ubuntu   # KYTKIN: ubuntu | mac  (ks. tiedoston alku)
```

Vaihda `mac`, kun runneri on olemassa. **Älä vaihda ennen sitä:**
`timeout-minutes` EI kata jonotusta (se mittaa vasta ajoaikaa), joten
puuttuvan labelin takia jobi jäisi jonoon 24 tunniksi. Tämä on kirjoitettu
myös tiedoston alkukommenttiin. Tarkistus ennen vaihtoa:

```
gh api repos/ravelius/Matkakirja/actions/runners --jq '.runners[] | {name, status, labels: [.labels[].name]}'
```

### Omistajan komennot toisen runner-instanssin rekisteröintiin

Aja omistajan tunnuksella Mac Studiolla. Token on kertakäyttöinen ja
vanhenee tunnissa; sen arvoa ei kirjata mihinkään.

```sh
# 1) Uusi kansio (ÄLÄ käytä samaa kuin SamiMacStudio2 — yksi kansio = yksi instanssi)
mkdir -p ~/actions-runner-2 && cd ~/actions-runner-2

# 2) Sama runner-paketti kuin ensimmäisessä instanssissa
cp -R ~/actions-runner/* ~/actions-runner-2/ 2>/dev/null || true
rm -f ~/actions-runner-2/.runner ~/actions-runner-2/.credentials* 2>/dev/null || true
#    (tai lataa tuore paketti: https://github.com/actions/runner/releases)

# 3) Rekisteröintitoken (tulostuu ruudulle — älä kopioi mihinkään tiedostoon)
gh api -X POST repos/ravelius/Matkakirja/actions/runners/registration-token --jq .token

# 4) Rekisteröinti (liitä token edellisestä komennosta TOKEN-kohtaan)
./config.sh --unattended \
  --url https://github.com/ravelius/Matkakirja \
  --token TOKEN \
  --name SamiMacStudio2-testit \
  --labels self-hosted,macOS,ARM64,testit \
  --work _work \
  --replace

# 5) Palveluksi ja käyntiin
./svc.sh install
./svc.sh start

# 6) Tarkistus
gh api repos/ravelius/Matkakirja/actions/runners --jq '.runners[] | {name, status, labels: [.labels[].name]}'
```

Kun runneri näkyy `online`-tilassa labelilla `testit`, vaihda `testit.yml`:n
kytkin `REITTI=mac` ja aja yksi PR läpi kokeeksi.

---

## Tarkistukset tässä haarassa

- `node --test tests/*.test.mjs` → `# pass 3613`, `# fail 0` (3626 testiä,
  13 skipattu).
- `node tools/tarkista-savukkeet.mjs` → `savukkeet kunnossa: 2027
  ui-viittausta, 409 metodia, 540 kenttää, 31 lehtitilan kenttää`.
- `node tools/savukkeet/rakenna-matriisi.mjs julkaisu` → 18 riviä, jokaisella
  oma `nimiTunniste`, `env` ja tunnetut punaiset.
- `node --check` kaikille muutetuille .mjs-tiedostoille.

## Mitä EI tehty

- PR:ää ei avattu (Fable avaa), versiota ei nostettu, Raamattuun ei koskettu.
- Runneria ei rekisteröity eikä koneelle asennettu mitään (vain repon
  tiedostoja muutettu).
- `#vartija-a` / `#vartija-b` -puolikkaiden kestoja ei mitattu erikseen
  (aikakatto tuli vastaan) — ne luetaan ensimmäisestä Actions-ajosta.
