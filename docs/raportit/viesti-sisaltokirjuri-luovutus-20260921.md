# Luovutus: Sisältökirjuri — 2026-09-21 ilta

Sessio nollataan kontekstin (71 %) vuoksi. Kolme tehtävää tehty/käynnissä.

## 1. Visastandardi — VALMIS

Kaikki 29 maata, jotka olivat alle 1/3-visaosuudessa 20.9.2026 inventaariossa,
ovat nyt vähintään 1/3:ssa. Neljä erää, kaikki pushattu:

- `sisalto-visat-1` (jo mergetty, v2008, PR #2661): 40 visaa — BIH/CHE/GBR/ISL/NOR/RUS/TUR/UKR.
- `sisalto-visat-2`: 25 visaa — GRC/EST/DEU.
- `sisalto-visat-fokus`: poisti tests/fokusvirta.test.mjs:n GRC-vain-visakiellon (Fablen päätös: pilotin aikainen rajaus, ei yleinen linjaus).
- `sisalto-visat-3`: 43 visaa — LVA/LTU/ITA/FIN/SWE/BGR/HRV/ROU.
- `sisalto-visat-4`: 45 visaa — AUT/CZE/DNK/ESP/FRA/HUN/IRL/NLD/POL/PRT.

Menetelmä joka erässä: `node /tmp/lista-visattomat.mjs <ISOT>` (skripti
scratchpadissa, ei repossa — ks. alla uudelleenluontiohje) listasi
visattomat nostot maittain, valitsin tyyppidiversiteetin, dispatchsin
rinnakkaisia Sonnet-agentteja (yksi maa/agentti, 4-9 visaa per agentti),
tarkistin `node tools/tarkista-visakieli.mjs` + laajennettu oma
tarkistusskripti kaikille tiedostoille, `node --test tests/*.test.mjs`
0 fail, `node tools/tarkista-kaksoisavaimet.mjs`. Uusi erä pohjataan AINA
edellisen erän kärkeen (`git checkout -b sisalto-visat-N origin/sisalto-visat-(N-1)`
tai `origin/v1973-prep` kun edellinen jo mergetty) — Fablen korjaus, koska
visat-1/2 lisäsivät visan osittain samoihin kohteisiin toisistaan tietämättä.

## 2. Kadonneet monumentit, rappeutunut-luokka nykykuvat — VALMIS

Haara `sisalto-monumentit-nykykuvat`, viimeisin commit `1fe8b38a` (pushattu,
Julkaisijalle ilmoitettu, odottaa mergeä). 26 rappeutunut-kohdetta (paikka
olemassa mutta raunioitunut) kytketty 19 maahan + pilotti ESP Medina Azahara:
BEL, BGR, CZE, ESP, EST, FIN, HRV(2), HUN, IRL, LTU, LUX, LVA, NOR(2), POL(2),
PRT, ROU(2), RUS, SVK(2), SVN(2), UKR — lähde
`docs/raportit/havainnekuvat-codexille-eurooppa-20260921.md`.

Jokaisella: koordinaatit en-Wikipediasta/Wikidatasta, Millerin projektio
laudalle (kalibroitu Ateenalla joka kohteessa), aito PD/CC-Commons-valokuva
täydessä resoluutiossa R2:ssa, `ihme.osoite` on PLACEHOLDER-URL kaavalla
`https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-<slug>-loistoaika.jpg`
(404 kunnes Codex toimittaa). **Kytkentä Codexin kuvalle EI VAADI KOODIMUUTOSTA**
— kun Codex lataa kulta-aikakuvan täsmälleen tuohon R2-polkuun, se ilmestyy
automaattisesti. Julkaisija/seuraava sessio: kun Codex ilmoittaa toimituksesta,
riittää tarkistaa `curl -I` jokaiselle 26+4 (erä 1) `ihme.osoite`-URL:lle että
vastaa HTTP 200 — ei koodikytkentää.

Lisäkorjaus tässä haarassa: Karttaseppä havaitsi Bukarestin kohdekartalta
(`js/packs/maakartat.js`) puuttuvan `nosto: 'hahmotelma-curtea-veche'` -linkin
"Vanha ruhtinaanhovi" -pisteeltä (declutter-logiikka tarvitsee sen) — lisätty
commitissa `1fe8b38a`.

**Pienoismallit**: ei vielä toimitettu tätä kirjoittaessa — kun Julkaisija
ilmoittaa Codex-toimituksesta, tarkista postilaatikko/manifesti ja kytke
samalla periaatteella kuin muutkin generoidut kuvat (ei tarkempaa ohjetta
saatavilla vielä, koska toimitusta ei ole nähty).

## 3. 198 kuvatonta nostoa — VIRHEELLINEN LÄHTÖLUKU, TODELLISUUDESSA VALMIS

**TÄRKEÄ KORJAUS 21.9.2026 ilta, ennen luovutusta:** GRC-erän agentti löysi,
että `tools/nostoinventaario.mjs`:n kuvantunnistus (`kuvaTiedot()`, rivi ~117)
tarkisti vain `o.tiedosto`, `o.kuva?.osoite`, `o.kuvat?.length` ja
`o.herokuva` — EI `o.kuva?.tiedosto`, joka on `js/fokuskohteet.js`:n
(`valokuvaUrl(kuva.tiedosto, ...)`, rivit 5173/5266/5271/5760/5881/5890)
AKTIIVISESTI KÄYTTÄMÄ, täysin kelvollinen kuvakenttä (suora
Commons-tiedostoviite, ei R2-osoite — eri konventio kuin `kuva.osoite`,
mutta yhtä toimiva). Tool laski siis satoja aidosti kuvallisia nostoja
"kuvattomiksi". **Korjasin rivin 117 (lisäsin `Boolean(o.kuva?.tiedosto)`)
ja regeneroin inventaarion** (commit tässä haarassa, ks. alla).

**Todellinen kuvaton-luku koko Euroopassa fixin jälkeen: 8, ei 198.**
Kaikki 8 tarkistettu yksitellen (`ihme.kadonnut === true` jokaisella) —
kyseessä ovat KAIKKI täysin kadonneita antiikin/historian kohteita, joilla
on jo TARKOITUKSELLA vain generoitu `ihme`-havainnekuva eikä aitoa
valokuvaa (sama dokumentoitu linjaus 26.-27.8.2026 jonka GRC-agentti löysi
Rodoksen kolossin kommentista):

| Maa | Tiedosto | id | Nimi |
| --- | --- | --- | --- |
| TUR | fokuskohteet-tur.js | halikarnassos | Halikarnassoksen mausoleumi |
| TUR | fokuskohteet-tur.js | hippodromi | Konstantinopolin hippodromi |
| TUR | fokuskohteet-tur.js | pergamonin-alttari | Pergamonin alttari |
| GBR | fokuskohteet-gbr.js | crystal-palace | Crystal Palace |
| GBR | fokuskohteet-gbr.js | vanha-london-bridge | Vanha London Bridge |
| FRA | fokuskohteet-fra.js | tuileries | Tuileries'n palatsi |
| FRA | fokuskohteet-fra.js | bastilji | Bastilji |
| GRC | fokuskohteet-grc.js | rodoksen-kolossi | Rodoksen kolossi |

**JOHTOPÄÄTÖS: "198 kuvatonta nostoa" -tehtävä on jo käytännössä VALMIS —**
**ei vaadi lisätyötä**, koska jäljellä olevat 8 ovat kaikki tarkoituksella
kuvattomia (kadonnut-ihme-kohteita). GRC-erän agentti EI lisännyt yhtään
riviä koodiin (33/34 kohteesta oli jo kuva, 34. eli Rodoksen kolossi on
tarkoituksella ilman). Haara `sisalto-grc-kuvat` sisältää siis vain: tämän
luovutusdokumentin + `tools/nostoinventaario.mjs`-korjauksen + regeneroidun
raportin. EI mitään agenttierää tarvitse enää dispatchata tähän — jos
omistaja/Fable haluaa silti aidon kuvan noihin 8:aan (linjauksen kumoten),
se on pieni, ~8 kohteen erä, ei 198:n.

**Ennen tätä korjausta lähetetty visio "GRC 35, TUR 24, DEU 21..." oli**
**siis kokonaan virheellinen datan (inventaariotyökalun bugin) takia.**
Ilmoitettu Fablelle erikseen kriittisenä korjauksena.

## Muuta avointa

- Julkaisijan jonossa: `sisalto-visat-2`, `sisalto-visat-3`,
  `sisalto-visat-4`, `sisalto-visat-fokus`, `sisalto-monumentit-nykykuvat`
  (viimeisin commit 1fe8b38a) — kaikki testattu 0 fail, ei mergetty vielä.
- `sisalto-grc-kuvat` (käynnissä, ei vielä pushattu — ks. yllä).
